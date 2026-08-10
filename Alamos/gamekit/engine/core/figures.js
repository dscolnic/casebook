// figures.js — inline SVG instruments for the question panel.
//
// A Diagnosis question asks the player to find the explanation that fits the
// *whole* panel of readings rather than the loudest one. That is unreadable as
// prose: it needs the traces, the limit line and the quiet zones on screen at
// once. The first three primitives cover the chemistry book's instruments — a
// trace over time, a separation trace with peaks, and a mass balance.
//
// The rest were added when every other question format was still a block of
// text with buttons under it. They are the faces those formats deserve:
//
//   readout        the number you just produced, on an instrument face
//   gauge          a banded dial; gaugeRow puts two or three side by side
//   estimateScale  your estimate against the true value on a log axis
//   timeline       an ordered sequence along an arrow
//   matchDiagram   two columns joined by lines, right joins and wrong ones
//   waveform       a repeating monitor trace — a machine face, not a chart
//
// All of them return the same self-contained SVG string, so anything that can
// print HTML can print an instrument: the question panel, the verdict card,
// and (via a canvas) the screens on the machines in a room.
//
// Rules these follow, and why (they are not stylistic):
//
//   · One y-axis, ever. Two scales on one chart is the most common way to make
//     a chart say something untrue.
//   · Colour is never the only channel. Every series is directly labelled at
//     its end, every reading carries a glyph and a status word, and every
//     figure ships the data table that produced it. The book requires this
//     ("all critical evidence must be available as text as well as colour")
//     and the palette needs it too — the aqua series sits below 3:1 on this
//     surface, so visible labels are the documented relief.
//   · Status colours are reserved for status. They never double as a series.
//
// Palette: categorical slots 1–3 and the fixed status ramp, validated for
// colour-vision deficiency against this modal's surface (#fbf9f4).

export const SERIES = ['#2a78d6', '#eb6834', '#1baf7a'];   // blue, orange, aqua
export const STATUS = {
  alarm:  { colour: '#d03b3b', glyph: '■', word: 'alarm' },
  high:   { colour: '#ec835a', glyph: '▲', word: 'high' },
  low:    { colour: '#fab219', glyph: '▼', word: 'low' },
  normal: { colour: '#0ca30c', glyph: '●', word: 'normal' },
  // Not a severity. A pack marks the readings the puzzle turns on, and those
  // are often the reassuring ones — "counts with the high voltage off: zero" is
  // what clears the electronics. Colouring them red said the opposite.
  key:    { colour: '#3b6fd0', glyph: '◆', word: 'key reading' },
};
const INK = '#1c1b19', MUTED = '#5f6368', GRID = '#ded8cc';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const round = (n) => Math.round(n * 10) / 10;

/**
 * Round a range out to human tick values. Padding a data range by a percentage
 * gives axes labelled 13.1 / 36.1 / 59 / 81.9 / 104.9, which nobody reads as a
 * temperature scale.
 */
function niceScale(lo, hi, ticks){
  const span = hi - lo || 1;
  const raw = span / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) ?? 10 * mag;
  return { lo: Math.floor(lo / step) * step, hi: Math.ceil(hi / step) * step, step };
}

/** Shared frame: axes, recessive grid, labels. Returns the scales too. */
function frame({ w, h, xMin, xMax, yMin, yMax, xLabel, yLabel, yTicks = 4, rightPad, topPad }){
  const nice = niceScale(yMin, yMax, yTicks);
  yMin = nice.lo; yMax = nice.hi;
  yTicks = Math.max(2, Math.round((yMax - yMin) / nice.step));
  // The right margin holds the direct labels, so it is sized from them. A
  // fixed 92px clipped "Secondary product" to "Secondary pro".
  const pad = { l: 48, r: rightPad ?? 92, t: topPad ?? 30, b: 34 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin || 1)) * iw;
  const sy = (y) => pad.t + ih - ((y - yMin) / (yMax - yMin || 1)) * ih;
  let g = '';
  for(let i = 0; i <= yTicks; i++){
    const v = yMin + (i / yTicks) * (yMax - yMin);
    const y = sy(v);
    g += `<line x1="${pad.l}" y1="${y}" x2="${pad.l + iw}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`
       + `<text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${round(v)}</text>`;
  }
  g += `<line x1="${pad.l}" y1="${pad.t + ih}" x2="${pad.l + iw}" y2="${pad.t + ih}" stroke="${MUTED}" stroke-width="1"/>`;
  if(xLabel) g += `<text x="${pad.l + iw / 2}" y="${h - 6}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(xLabel)}</text>`;
  // Horizontal, above the axis. Rotated y labels clip against the viewBox the
  // moment the label is longer than the plot is tall, which is most of them.
  if(yLabel) g += `<text x="6" y="12" font-size="11" fill="${MUTED}" font-weight="600">${esc(yLabel)}</text>`;
  return { g, sx, sy, pad, iw, ih };
}

/**
 * A trace over time (or over volume, for a titration). Series are labelled at
 * their right-hand end rather than in a legend box, so identity never depends
 * on matching a swatch.
 *
 * `limit` draws the decision threshold the readings are judged against — the
 * whole point of several of these panels is that a trace crosses it.
 * `marks` are vertical annotations ("cooling stopped").
 */
export function lineChart(spec, { w = 560, h = 220 } = {}){
  const all = spec.series.flatMap(s => s.points);
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const yLo = spec.yMin ?? Math.min(...ys, spec.limit?.at ?? Infinity);
  const yHi = spec.yMax ?? Math.max(...ys, spec.limit?.at ?? -Infinity);
  const padY = (yHi - yLo) * 0.12 || 1;
  // A concentration axis that starts at -20 is wrong, not merely untidy: these
  // quantities cannot be negative, so the padding stops at zero.
  const floorAtZero = spec.yMin === undefined && yLo >= 0;
  // ~6.1 px per character at 11px Inter, plus the marker, leader and a margin.
  const longest = Math.max(0, ...spec.series.map(s => s.name.length),
    ...(spec.limit ? [spec.limit.label.length] : []));
  const f = frame({ w, h, xMin: Math.min(...xs), xMax: Math.max(...xs),
    yMin: floorAtZero ? Math.max(0, yLo - padY) : yLo - padY,
    yMax: yHi + padY, xLabel: spec.xLabel, yLabel: spec.yLabel,
    rightPad: Math.min(200, Math.max(92, Math.round(longest * 6.1) + 22)) });

  let body = f.g;
  for(const m of spec.marks ?? []){
    const x = f.sx(m.x);
    body += `<line x1="${x}" y1="${f.pad.t}" x2="${x}" y2="${f.pad.t + f.ih}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>`
          + `<text x="${x + 4}" y="${f.pad.t + 11}" font-size="10" fill="${MUTED}">${esc(m.label)}</text>`;
  }
  if(spec.limit){
    const y = f.sy(spec.limit.at);
    body += `<line x1="${f.pad.l}" y1="${y}" x2="${f.pad.l + f.iw}" y2="${y}" stroke="${STATUS.alarm.colour}" stroke-width="2" stroke-dasharray="6 4"/>`
          + `<text x="${f.pad.l + f.iw + 6}" y="${y + 4}" font-size="11" fill="${STATUS.alarm.colour}" font-weight="700">${esc(spec.limit.label)}</text>`;
  }
  // Direct labels are the relief for the sub-3:1 series and the reason there is
  // no legend box — so they have to stay legible. Where two series end at
  // nearly the same value the labels overlap into mush, so they are nudged
  // apart after the fact rather than drawn where the line happens to land.
  const ends = spec.series.map((s, i) => {
    const last = s.points[s.points.length - 1];
    return { i, name: s.name, cx: f.sx(last[0]), cy: f.sy(last[1]), ly: f.sy(last[1]) };
  }).sort((a, b) => a.ly - b.ly);
  const MIN_GAP = 14;
  for(let n = 1; n < ends.length; n++){
    if(ends[n].ly - ends[n - 1].ly < MIN_GAP) ends[n].ly = ends[n - 1].ly + MIN_GAP;
  }
  const overflow = ends.length ? ends[ends.length - 1].ly - (f.pad.t + f.ih) : 0;
  if(overflow > 0) for(const e of ends) e.ly -= overflow;

  spec.series.forEach((s, i) => {
    const colour = SERIES[i % SERIES.length];
    const d = s.points.map((p, n) => `${n ? 'L' : 'M'}${round(f.sx(p[0]))},${round(f.sy(p[1]))}`).join(' ');
    const dash = i === 2 ? ' stroke-dasharray="7 4"' : i === 1 ? ' stroke-dasharray="2 3"' : '';
    // Dash pattern as well as hue: the third slot is the one below 3:1 here,
    // and a dashed line survives being printed or read by a colourblind player.
    body += `<path d="${d}" fill="none" stroke="${colour}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${dash}/>`;
    const e = ends.find(x => x.i === i);
    body += `<circle cx="${round(e.cx)}" cy="${round(e.cy)}" r="4.5" fill="${colour}" stroke="#fbf9f4" stroke-width="2"/>`;
    // A leader line where the label had to move, so it still reads as belonging
    // to its own trace.
    if(Math.abs(e.ly - e.cy) > 2){
      body += `<path d="M${round(e.cx + 5)},${round(e.cy)} L${round(e.cx + 10)},${round(e.ly - 4)}" fill="none" stroke="${colour}" stroke-width="1"/>`;
    }
    body += `<text x="${round(e.cx) + 12}" y="${round(e.ly)}" font-size="11" fill="${INK}" font-weight="600" dominant-baseline="middle">${esc(s.name)}</text>`;
  });
  return svg(body, w, h, spec.caption);
}

/**
 * A separation trace: peaks along a retention axis, some of them flagged. Used
 * where the science is "one peak is not automatically one compound".
 */
export function peaks(spec, { w = 560, h = 220 } = {}){
  const xMax = spec.xMax ?? Math.max(...spec.peaks.map(p => p.at)) * 1.15;
  const yMax = Math.max(...spec.peaks.map(p => p.height)) * 1.25;
  const traceNames = (spec.traces ?? []).map(t => t.name.length);
  const f = frame({ w, h, xMin: 0, xMax, yMin: 0, yMax, xLabel: spec.xLabel, yLabel: spec.yLabel,
    rightPad: Math.min(200, Math.max(92, Math.round(Math.max(0, ...traceNames) * 6.1) + 22)),
    topPad: 52 });
  let body = f.g;
  // Gaussian-ish peaks sampled into one baseline path per trace.
  const base = f.sy(0);
  for(const [ti, trace] of (spec.traces ?? [{ name: spec.name ?? 'Sample', peaks: spec.peaks }]).entries()){
    const colour = SERIES[ti % SERIES.length];
    let d = `M${f.pad.l},${base}`;
    for(let px = 0; px <= f.iw; px++){
      const x = (px / f.iw) * xMax;
      let y = 0;
      for(const p of trace.peaks) y += p.height * Math.exp(-((x - p.at) ** 2) / (2 * (p.width ?? 0.18) ** 2));
      d += ` L${round(f.pad.l + px)},${round(f.sy(y))}`;
    }
    body += `<path d="${d}" fill="none" stroke="${colour}" stroke-width="2"${ti ? ' stroke-dasharray="2 3"' : ''}/>`;
    body += `<text x="${f.pad.l + f.iw + 6}" y="${f.pad.t + 12 + ti * 16}" font-size="11" fill="${INK}" font-weight="600">${esc(trace.name)}</text>`;
  }
  // Peak annotations sit above the trace and run into each other as soon as two
  // peaks are close, so they alternate between two rows. Without this the three
  // labels on the chromatogram read as one run-on string.
  const labelled = spec.peaks.filter(p => p.label).sort((a, b) => a.at - b.at);
  let prevRight = -Infinity, row = 0;
  for(const p of labelled){
    const x = f.sx(p.at), y = f.sy(p.height);
    const st = STATUS[p.status] ?? null;
    const text = `${st ? st.glyph + ' ' : ''}${p.label}`;
    const halfWidth = text.length * 2.9;              // ~5.8 px per char at 10px
    row = x - halfWidth < prevRight ? 1 - row : 0;
    prevRight = x + halfWidth;
    const ly = f.pad.t - 18 + row * 12;
    body += `<line x1="${x}" y1="${y - 6}" x2="${x}" y2="${ly + 4}" stroke="${st ? st.colour : MUTED}" stroke-width="1" stroke-dasharray="2 2"/>`
          + `<text x="${x}" y="${ly}" text-anchor="middle" font-size="10" fill="${st ? st.colour : MUTED}" font-weight="700">${esc(text)}</text>`;
  }
  return svg(body, w, h, spec.caption);
}

/**
 * A mass balance: what went in, what came out, and the gap. Bars share one
 * scale and one baseline; the gap is drawn as its own bar rather than implied,
 * because "where did the rest go" is the question being asked.
 */
export function bars(spec, { w = 560, h = 210 } = {}){
  const yMax = Math.max(...spec.bars.map(b => b.value)) * 1.2;
  const f = frame({ w, h, xMin: 0, xMax: spec.bars.length, yMin: 0, yMax,
    xLabel: spec.xLabel, yLabel: spec.yLabel });
  let body = f.g;
  const slot = f.iw / spec.bars.length;
  const bw = Math.min(64, slot - 14);            // a 2px+ gap between fills
  spec.bars.forEach((b, i) => {
    const st = STATUS[b.status] ?? null;
    const colour = st ? st.colour : SERIES[0];
    const x = f.pad.l + i * slot + (slot - bw) / 2;
    const y = f.sy(b.value), hh = f.sy(0) - y;
    body += `<rect x="${round(x)}" y="${round(y)}" width="${round(bw)}" height="${round(hh)}" rx="4" fill="${colour}"/>`
          + `<text x="${round(x + bw / 2)}" y="${round(y - 6)}" text-anchor="middle" font-size="11" fill="${INK}" font-weight="700">${esc(b.display ?? b.value)}</text>`
          + `<text x="${round(x + bw / 2)}" y="${f.sy(0) + 15}" text-anchor="middle" font-size="10" fill="${MUTED}">${esc(b.name)}</text>`;
    if(st) body += `<text x="${round(x + bw / 2)}" y="${f.sy(0) + 27}" text-anchor="middle" font-size="10" fill="${st.colour}" font-weight="700">${st.glyph} ${st.word}</text>`;
  });
  return svg(body, w, h, spec.caption);
}

/**
 * A big instrument readout: the number the player just produced, in the units
 * it is in. Used live while a Ballpark estimate is being assembled.
 *
 * It deliberately shows no target and no scale. The moment a target appears the
 * question stops being an estimate and becomes a game of nudging a needle until
 * it turns green.
 */
export function readout(spec, { w = 560, h = 108 } = {}){
  const value = String(spec.value ?? '—');
  const units = spec.units ? ` ${spec.units}` : '';
  // The digits shrink as they lengthen, so "1.2" and "4.06e-3 mol" both sit on
  // one line inside the same panel.
  const size = value.length > 9 ? 30 : value.length > 6 ? 38 : 46;
  const body =
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="10" fill="#14181c" stroke="#2b3238"/>` +
    `<text x="18" y="26" font-size="11" fill="#7f9aa8" font-weight="700" letter-spacing="1.4">${esc(spec.label || 'ESTIMATE')}</text>` +
    `<text x="18" y="${h - 26}" font-size="${size}" fill="${spec.dim ? '#5f7280' : '#67e0a3'}" font-weight="800" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(value + units)}</text>` +
    (spec.note ? `<text x="${w - 18}" y="${h - 22}" text-anchor="end" font-size="11" fill="#7f9aa8">${esc(spec.note)}</text>` : '');
  return svg(body, w, h, spec.caption);
}

/**
 * A dial with banded zones. One pointer, one scale, bands behind it — the
 * shape every pressure, temperature and flow instrument in these settings
 * actually has.
 *
 * Bands carry a status, so they are named as well as coloured, and the value
 * is printed under the dial. Nothing here depends on reading a hue.
 */
export function gauge(spec, { w = 260, h = 168 } = {}){
  const lo = spec.min ?? 0, hi = spec.max ?? 100;
  const cx = w / 2, cy = h - 44, r = Math.min(w, h * 1.5) / 2 - 30;
  // A 240° sweep, opening downward: the usual instrument face, and it leaves
  // room under the pivot for the value without overlapping the arc.
  const A0 = Math.PI * 0.86, A1 = Math.PI * 2.14;
  const ang = (v) => A0 + ((clampN(v, lo, hi) - lo) / (hi - lo || 1)) * (A1 - A0);
  const pt = (a, rad) => [round(cx + Math.cos(a) * rad), round(cy + Math.sin(a) * rad)];
  const arc = (from, to, rad, colour, width) => {
    const [x0, y0] = pt(ang(from), rad), [x1, y1] = pt(ang(to), rad);
    const large = ang(to) - ang(from) > Math.PI ? 1 : 0;
    return `<path d="M${x0},${y0} A${rad},${rad} 0 ${large} 1 ${x1},${y1}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="butt"/>`;
  };
  let body = arc(lo, hi, r, GRID, 12);
  for(const b of spec.bands ?? []){
    const st = STATUS[b.status] ?? STATUS.normal;
    body += arc(b.from, b.to, r, st.colour, 12);
  }
  for(let i = 0; i <= 4; i++){
    const v = lo + (i / 4) * (hi - lo);
    const [x0, y0] = pt(ang(v), r - 9), [x1, y1] = pt(ang(v), r - 15);
    const [tx, ty] = pt(ang(v), r - 27);
    body += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${MUTED}" stroke-width="1.5"/>`
          + `<text x="${tx}" y="${ty + 4}" text-anchor="middle" font-size="10" fill="${MUTED}">${round(v)}</text>`;
  }
  if(Number.isFinite(spec.value)){
    const [nx, ny] = pt(ang(spec.value), r - 20);
    body += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
          + `<circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>`;
  }
  const st = spec.status ? STATUS[spec.status] : null;
  body += `<text x="${cx}" y="22" text-anchor="middle" font-size="11" fill="${MUTED}" font-weight="700">${esc(spec.label || '')}</text>`
        + `<text x="${cx}" y="${h - 18}" text-anchor="middle" font-size="15" fill="${INK}" font-weight="800">${esc(spec.display ?? `${round(spec.value)}${spec.units ? ' ' + spec.units : ''}`)}</text>`
        + (st ? `<text x="${cx}" y="${h - 4}" text-anchor="middle" font-size="10" fill="${st.colour}" font-weight="700">${st.glyph} ${st.word}</text>` : '');
  return svg(body, w, h, spec.caption);
}

/**
 * An order-of-magnitude scale: your estimate against the true value, on a log
 * axis, with the accepted band drawn.
 *
 * This is the verdict for a Ballpark, and it is a picture rather than a
 * sentence because "you were out by a factor of thirty" is a *distance*. Told
 * in prose it reads the same as being out by a factor of three.
 */
export function estimateScale(spec, { w = 560, h = 150 } = {}){
  const vals = [spec.yours, spec.target].filter(v => Number.isFinite(v) && v > 0);
  if(!vals.length) return '';
  const lo10 = Math.floor(Math.log10(Math.min(...vals))) - 1;
  const hi10 = Math.ceil(Math.log10(Math.max(...vals))) + 1;
  const pad = { l: 26, r: 26, t: 54, b: 40 };
  const iw = w - pad.l - pad.r, axisY = h - pad.b;
  const sx = (v) => pad.l + ((Math.log10(v) - lo10) / (hi10 - lo10 || 1)) * iw;
  let body = '';
  for(let d = lo10; d <= hi10; d++){
    const x = sx(Math.pow(10, d));
    body += `<line x1="${round(x)}" y1="${pad.t}" x2="${round(x)}" y2="${axisY}" stroke="${GRID}" stroke-width="1"/>`
          + `<text x="${round(x)}" y="${axisY + 16}" text-anchor="middle" font-size="10" fill="${MUTED}">10<tspan font-size="7" dy="-4">${d}</tspan></text>`;
  }
  body += `<line x1="${pad.l}" y1="${axisY}" x2="${pad.l + iw}" y2="${axisY}" stroke="${MUTED}" stroke-width="1"/>`;
  if(Number.isFinite(spec.tolerance) && spec.tolerance > 0 && Number.isFinite(spec.target)){
    const bLo = Math.max(Math.pow(10, lo10), spec.target - spec.tolerance);
    const bHi = spec.target + spec.tolerance;
    body += `<rect x="${round(sx(bLo))}" y="${pad.t}" width="${round(Math.max(3, sx(bHi) - sx(bLo)))}" height="${round(axisY - pad.t)}" fill="${STATUS.normal.colour}" opacity="0.14"/>`;
  }
  const marker = (v, colour, label, above) => {
    if(!Number.isFinite(v) || v <= 0) return '';
    const x = round(sx(v)), y = above ? pad.t - 8 : axisY;
    return `<line x1="${x}" y1="${pad.t}" x2="${x}" y2="${axisY}" stroke="${colour}" stroke-width="2.5"/>`
      + `<circle cx="${x}" cy="${above ? pad.t : axisY}" r="5" fill="${colour}"/>`
      + `<text x="${x}" y="${above ? pad.t - 12 : axisY + 32}" text-anchor="middle" font-size="11" fill="${colour}" font-weight="700">${esc(label)}</text>`;
  };
  body += marker(spec.target, STATUS.normal.colour, spec.targetLabel ?? 'true value', false);
  body += marker(spec.yours, SERIES[1], spec.yoursLabel ?? 'your estimate', true);
  if(Number.isFinite(spec.yours) && Number.isFinite(spec.target) && spec.yours > 0 && spec.target > 0){
    const factor = spec.yours / spec.target;
    const out = factor >= 1 ? factor : 1 / factor;
    // `headline` exists because landing on the number is not the same as being
    // right: a Ballpark is also graded on which quantities went into it, and a
    // panel reading "on the money" above a rejected verdict is a contradiction.
    const word = spec.headline ?? (out < 1.3 ? 'on the money'
      : `out by a factor of ${out < 10 ? round(out) : Math.round(out)} — ${factor > 1 ? 'too high' : 'too low'}`);
    body += `<text x="${w / 2}" y="20" text-anchor="middle" font-size="12" fill="${INK}" font-weight="700">${esc(word)}</text>`;
  }
  return svg(body, w, h, spec.caption ?? 'Estimate against the true value, on a log scale');
}

/**
 * An ordered sequence as a strip along an arrow. Steps are numbered and the
 * arrow gives the list a direction, which a bulleted list does not: the whole
 * point of the format is that step two depends on step one having happened.
 */
export function timeline(spec, { w = 560 } = {}){
  const steps = spec.steps ?? [];
  if(!steps.length) return '';
  const rowH = 44, h = 42 + steps.length * rowH;
  const x = 26;
  let body = `<line x1="${x}" y1="30" x2="${x}" y2="${28 + steps.length * rowH - 14}" stroke="${GRID}" stroke-width="3"/>`
    + `<path d="M${x - 5},${28 + steps.length * rowH - 14} L${x + 5},${28 + steps.length * rowH - 14} L${x},${30 + steps.length * rowH - 4} Z" fill="${GRID}"/>`
    + `<text x="${x + 16}" y="16" font-size="11" fill="${MUTED}" font-weight="700">${esc(spec.label || 'Earliest first')}</text>`;
  steps.forEach((s, i) => {
    const y = 34 + i * rowH;
    const st = s.status ? STATUS[s.status] : null;
    const colour = st ? st.colour : SERIES[0];
    body += `<circle cx="${x}" cy="${y + 8}" r="11" fill="${colour}"/>`
      + `<text x="${x}" y="${y + 12}" text-anchor="middle" font-size="11" fill="#fff" font-weight="800">${i + 1}</text>`
      + `<text x="${x + 22}" y="${y + 6}" font-size="12" fill="${INK}" font-weight="600">${esc(clip(s.label, 72))}</text>`
      + (s.note ? `<text x="${x + 22}" y="${y + 22}" font-size="10.5" fill="${MUTED}">${esc(clip(s.note, 86))}</text>` : '');
  });
  return svg(body, w, h, spec.caption);
}

/**
 * Two columns joined by lines: which situation the player matched to which
 * response, and which of those joins hold.
 *
 * A wrong Protocol used to be reported as a semicolon-separated string of eight
 * clauses. Drawn, a crossed pair of lines is the mistake, visible at a glance.
 */
export function matchDiagram(spec, { w = 560 } = {}){
  const left = spec.left ?? [], right = spec.right ?? [];
  const rowH = 46, h = 30 + Math.max(left.length, right.length) * rowH;
  const lx = 8, rx = w - 8, colW = Math.min(232, w / 2 - 40);
  const ly = (i) => 26 + i * rowH + 16;
  let body = '';
  const box = (x, y, text, tag, anchor) =>
    `<rect x="${x}" y="${y - 15}" width="${colW}" height="34" rx="7" fill="#fff" stroke="${GRID}"/>`
    + `<text x="${x + 9}" y="${y - 1}" font-size="10" fill="${MUTED}" font-weight="800">${esc(tag)}</text>`
    + `<text x="${x + 9}" y="${y + 12}" font-size="10.5" fill="${INK}">${esc(clip(text, 38))}</text>`;
  left.forEach((t, i) => { body += box(lx, ly(i), t, String(i + 1) + '.', 'start'); });
  right.forEach((t, i) => { body += box(rx - colW, ly(i), t, String.fromCharCode(65 + i) + '.', 'end'); });
  for(const link of spec.links ?? []){
    if(link.from == null || link.to == null || link.to < 0) continue;
    const y0 = ly(link.from), y1 = ly(link.to);
    const x0 = lx + colW, x1 = rx - colW;
    const colour = link.ok === false ? STATUS.alarm.colour : link.ok === true ? STATUS.normal.colour : SERIES[0];
    const mid = (x0 + x1) / 2;
    body += `<path d="M${x0},${y0} C${mid},${y0} ${mid},${y1} ${x1},${y1}" fill="none" stroke="${colour}" stroke-width="2"${link.ok === false ? ' stroke-dasharray="5 4"' : ''}/>`
      + `<circle cx="${x0}" cy="${y0}" r="3.5" fill="${colour}"/><circle cx="${x1}" cy="${y1}" r="3.5" fill="${colour}"/>`;
  }
  return svg(body, w, h, spec.caption);
}

/**
 * A repeating monitor trace. Not a data chart — a machine face, for the screens
 * in a room and for questions whose subject is "what is this monitor showing".
 *
 * `kind` picks the shape: a heart trace, a breathing trace, or a plain
 * oscillation. `rate` is beats or breaths across the window.
 */
export function waveform(spec, { w = 560, h = 140 } = {}){
  const kind = spec.kind ?? 'ecg';
  const rate = Math.max(1, spec.rate ?? (kind === 'resp' ? 3 : 6));
  const mid = h / 2 + 6, amp = (h - 52) / 2;
  const st = spec.status ? STATUS[spec.status] : null;
  const colour = st ? st.colour : STATUS.normal.colour;
  const N = 480;
  let d = '';
  for(let i = 0; i <= N; i++){
    const x = 10 + (i / N) * (w - 20);
    const p = (i / N) * rate % 1;               // phase within one beat
    let y = 0;
    if(kind === 'ecg'){
      // P wave, QRS spike, T wave — the shape people recognise, not a sine.
      y = 0.12 * bump(p, 0.16, 0.045)
        - 0.22 * bump(p, 0.30, 0.014)
        + 1.00 * bump(p, 0.34, 0.012)
        - 0.30 * bump(p, 0.38, 0.018)
        + 0.26 * bump(p, 0.58, 0.05);
    } else if(kind === 'resp'){
      y = Math.sin(p * Math.PI * 2) * 0.85;
    } else {
      y = Math.sin(p * Math.PI * 2);
    }
    d += `${i ? 'L' : 'M'}${round(x)},${round(mid - y * amp)}`;
  }
  const body =
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="10" fill="#0f1418" stroke="#242c31"/>` +
    `<path d="${d}" fill="none" stroke="${colour}" stroke-width="2" stroke-linejoin="round"/>` +
    `<text x="16" y="22" font-size="11" fill="#7f9aa8" font-weight="700" letter-spacing="1.2">${esc(spec.label || kind.toUpperCase())}</text>` +
    (spec.display ? `<text x="${w - 16}" y="24" text-anchor="end" font-size="16" fill="${colour}" font-weight="800">${esc(spec.display)}</text>` : '') +
    (st ? `<text x="${w - 16}" y="${h - 12}" text-anchor="end" font-size="10" fill="${colour}" font-weight="700">${st.glyph} ${st.word}</text>` : '');
  return svg(body, w, h, spec.caption);
}
function bump(p, at, width){
  const d = p - at;
  return Math.exp(-(d * d) / (2 * width * width));
}
function clampN(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }
function clip(s, n){ const t = String(s ?? ''); return t.length > n ? t.slice(0, n - 1) + '…' : t; }

function svg(body, w, h, caption){
  return `<div class="figure"><svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;margin:0 auto" role="img" `
    + `aria-label="${esc(caption || 'instrument panel')}" preserveAspectRatio="xMidYMid meet">${body}</svg>`
    + (caption ? `<div class="figureCaption">${esc(caption)}</div>` : '') + `</div>`;
}

/** Dispatch on `kind`, so a pack only ever supplies data. */
export function renderFigure(fig){
  if(!fig) return '';
  if(Array.isArray(fig)) return fig.map(renderFigure).join('');
  if(fig.kind === 'line') return lineChart(fig);
  if(fig.kind === 'peaks') return peaks(fig);
  if(fig.kind === 'bars') return bars(fig);
  if(fig.kind === 'gauge') return gauge(fig);
  if(fig.kind === 'gauges') return gaugeRow(fig.gauges ?? []);
  if(fig.kind === 'readout') return readout(fig);
  if(fig.kind === 'scale') return estimateScale(fig);
  if(fig.kind === 'timeline') return timeline(fig);
  if(fig.kind === 'match') return matchDiagram(fig);
  if(fig.kind === 'waveform') return waveform(fig);
  return '';
}

/** Two or three dials side by side — an instrument bay rather than one dial. */
export function gaugeRow(specs){
  if(!specs.length) return '';
  return `<div class="gaugeRow">${specs.map(s => gauge(s, { w: 240, h: 168 })).join('')}</div>`;
}

/**
 * The reading panel. This is the object of the exercise, so it is a real
 * panel: every zone visible at once, quiet readings included, each carrying a
 * glyph and a status word beside its colour.
 */
export function readingsPanel(readings = []){
  if(!readings.length) return '';
  const row = (r) => {
    const st = STATUS[r.status] ?? STATUS.normal;
    return `<div class="reading ${r.status === 'alarm' ? 'isAlarm' : ''}">`
      + `<div class="readingZone">${esc(r.zone)}</div>`
      + `<div class="readingLabel">${esc(r.label)}</div>`
      + `<div class="readingValue">${esc(r.value)}</div>`
      + readingBar(r)
      + `<div class="readingStatus" style="color:${st.colour}"><span aria-hidden="true">${st.glyph}</span> ${st.word}</div>`
      + (r.note ? `<div class="readingNote">${esc(r.note)}</div>` : '')
      + `</div>`;
  };
  return `<div class="readingPanel">${readings.map(row).join('')}</div>`;
}

/**
 * A one-line scale under a reading: where this value sits, and where the
 * normal band is. Drawn only when the pack supplies `min`/`max` (and ideally
 * `normal: [lo, hi]`), because a bar without a scale is decoration.
 *
 * The value itself is parsed out of the display string when it is not given
 * separately, so `value: "38.9 °C"` still places a marker. It is a strict
 * leading-number parse: "trace" and "not detected" produce no bar rather than
 * a marker at zero, which would read as a measurement that was made.
 */
function readingBar(r){
  const min = Number(r.min), max = Number(r.max);
  if(!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return '';
  const n = Number.isFinite(Number(r.n)) ? Number(r.n)
    : Number((String(r.value ?? '').match(/^-?\d+(\.\d+)?/) || [])[0]);
  if(!Number.isFinite(n)) return '';
  const pos = (v) => `${round(((clampN(v, min, max) - min) / (max - min)) * 100)}%`;
  const band = Array.isArray(r.normal) && r.normal.length === 2
    ? `<span class="readingBandNormal" style="left:${pos(r.normal[0])};right:calc(100% - ${pos(r.normal[1])})"></span>` : '';
  const st = STATUS[r.status] ?? STATUS.normal;
  return `<div class="readingBar" role="presentation">${band}`
    + `<span class="readingBarMark" style="left:${pos(n)};background:${st.colour}"></span></div>`;
}

/** The table behind the picture. Required, not optional — see the header. */
export function dataTable(fig, readings){
  const rows = [];
  if(fig?.kind === 'line'){
    for(const s of fig.series) rows.push([s.name, s.points.map(p => `${p[0]}: ${p[1]}`).join(' · ')]);
  } else if(fig?.kind === 'bars'){
    for(const b of fig.bars) rows.push([b.name, String(b.display ?? b.value)]);
  } else if(fig?.kind === 'peaks'){
    for(const p of fig.peaks) rows.push([p.label || `peak at ${p.at}`, `height ${p.height}`]);
  }
  for(const r of readings ?? []) rows.push([`${r.zone} — ${r.label}`, `${r.value} (${(STATUS[r.status] ?? STATUS.normal).word})`]);
  if(!rows.length) return '';
  return `<details class="dataTable"><summary>Show the numbers behind the panel</summary>`
    + `<table><tbody>${rows.map(([a, b]) =>
        `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></details>`;
}

/**
 * A match question you can actually work — the diagram *is* the interface.
 *
 * The old Protocol panel printed the same question three times: a picture of
 * two columns you could not touch, a grid of `<select>` menus repeating every
 * word of it, and then "Choices in full" repeating them once more. It read like
 * a form because it was one.
 *
 * This is one object. Click a situation, click an explanation, a line is drawn.
 * Click a joined node to break it. Nothing is written twice, and the thing the
 * player looks at is the thing they operate.
 *
 * Grading marks are optional: pass `links[].ok` and the verdict can redraw the
 * same board with the player's joins in green and red.
 *
 * `spec`  { left, right, links:[{from,to,ok}], selected:{side,i}, accent }
 */
export function matchBoard(spec, { w = 620 } = {}){
  const left = spec.left ?? [], right = spec.right ?? [];
  const accent = spec.accent || SERIES[0];
  const colW = 244, gap = w - colW * 2 - 16;
  const CHARS = 30;
  const wrapL = left.map(t => wrap(t, CHARS)), wrapR = right.map(t => wrap(t, CHARS));
  const lineH = 13, padY = 11;
  const boxH = (lines) => padY * 2 + lines.length * lineH + 4;
  const hL = wrapL.map(boxH), hR = wrapR.map(boxH);
  // Rows are laid out independently down each column and centred against each
  // other, so a three-line explanation does not drag its situation off-screen.
  const stack = (hs) => { let y = 26, out = []; for(const h of hs){ out.push(y); y += h + 12; } return { tops: out, total: y }; };
  const L = stack(hL), R = stack(hR);
  const h = Math.max(L.total, R.total) + 8;
  const offL = (h - L.total) / 2, offR = (h - R.total) / 2;
  const yL = (i) => offL + L.tops[i] + hL[i] / 2, yR = (i) => offR + R.tops[i] + hR[i] / 2;
  const x0 = 8, x1 = w - 8 - colW;

  const node = (side, i, x, y, hh, lines, tag, linked, sel) => {
    const fill = sel ? '#fff8e6' : linked ? '#f4f8fd' : '#fff';
    const stroke = sel ? '#c8901b' : linked ? accent : GRID;
    let t = '';
    lines.forEach((ln, n) => {
      t += `<text x="${x + 30}" y="${y - hh / 2 + padY + 10 + n * lineH}" font-size="11.5" fill="${INK}">${esc(ln)}</text>`;
    });
    return `<g class="mbNode${sel ? ' sel' : ''}${linked ? ' linked' : ''}" data-side="${side}" data-i="${i}" tabindex="0" role="button">`
      + `<rect x="${x}" y="${y - hh / 2}" width="${colW}" height="${hh}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="${sel ? 2 : 1.2}"/>`
      + `<circle cx="${x + 16}" cy="${y}" r="10" fill="${linked || sel ? accent : '#eceade'}"/>`
      + `<text x="${x + 16}" y="${y + 3.6}" font-size="10.5" font-weight="800" text-anchor="middle" fill="${linked || sel ? '#fff' : MUTED}">${esc(tag)}</text>`
      + t + `</g>`;
  };

  const linkOf = (i) => (spec.links ?? []).find(l => l.from === i);
  const rightLinked = new Set((spec.links ?? []).map(l => l.to));
  let body = `<text x="${x0}" y="14" font-size="10" font-weight="800" fill="${MUTED}">SITUATION</text>`
    + `<text x="${x1 + colW}" y="14" font-size="10" font-weight="800" text-anchor="end" fill="${MUTED}">RESPONSE</text>`;
  // Joins first, so a line never crosses over the text of a box.
  for(const l of spec.links ?? []){
    if(l.from == null || l.to == null || l.to < 0) continue;
    const a = x0 + colW, b = x1, ya = yL(l.from), yb = yR(l.to);
    const colour = l.ok === false ? STATUS.alarm.colour : l.ok === true ? STATUS.normal.colour : accent;
    const mid = (a + b) / 2;
    body += `<path d="M${a},${ya} C${mid},${ya} ${mid},${yb} ${b},${yb}" fill="none" stroke="${colour}" stroke-width="2.4"`
      + `${l.ok === false ? ' stroke-dasharray="6 4"' : ''}/>`
      + `<circle cx="${a}" cy="${ya}" r="4" fill="${colour}"/><circle cx="${b}" cy="${yb}" r="4" fill="${colour}"/>`;
  }
  left.forEach((t, i) => {
    const lk = linkOf(i);
    body += node('l', i, x0, yL(i), hL[i], wrapL[i], String(i + 1),
      !!lk, spec.selected?.side === 'l' && spec.selected.i === i);
  });
  right.forEach((t, i) => {
    body += node('r', i, x1, yR(i), hR[i], wrapR[i], String.fromCharCode(65 + i),
      rightLinked.has(i), spec.selected?.side === 'r' && spec.selected.i === i);
  });
  return `<div class="matchBoard"><svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px" `
    + `role="group" aria-label="${esc(spec.caption || 'matching board')}" preserveAspectRatio="xMidYMid meet">${body}</svg></div>`;
}

/** Greedy word wrap for SVG text, which has no line box of its own. */
function wrap(text, chars){
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for(const word of words){
    const test = line ? `${line} ${word}` : word;
    if(test.length > chars && line){ lines.push(line); line = word; } else line = test;
  }
  if(line) lines.push(line);
  return lines.length ? lines : [''];
}
