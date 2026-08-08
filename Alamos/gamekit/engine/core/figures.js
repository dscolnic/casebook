// figures.js — inline SVG instruments for the question panel.
//
// A Diagnosis question asks the player to find the explanation that fits the
// *whole* panel of readings rather than the loudest one. That is unreadable as
// prose: it needs the traces, the limit line and the quiet zones on screen at
// once. These three primitives cover every instrument the chemistry book asks
// for — a trace over time, a separation trace with peaks, and a mass balance.
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

function svg(body, w, h, caption){
  return `<div class="figure"><svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;margin:0 auto" role="img" `
    + `aria-label="${esc(caption || 'instrument panel')}" preserveAspectRatio="xMidYMid meet">${body}</svg>`
    + (caption ? `<div class="figureCaption">${esc(caption)}</div>` : '') + `</div>`;
}

/** Dispatch on `kind`, so a pack only ever supplies data. */
export function renderFigure(fig){
  if(!fig) return '';
  if(fig.kind === 'line') return lineChart(fig);
  if(fig.kind === 'peaks') return peaks(fig);
  if(fig.kind === 'bars') return bars(fig);
  return '';
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
      + `<div class="readingStatus" style="color:${st.colour}"><span aria-hidden="true">${st.glyph}</span> ${st.word}</div>`
      + (r.note ? `<div class="readingNote">${esc(r.note)}</div>` : '')
      + `</div>`;
  };
  return `<div class="readingPanel">${readings.map(row).join('')}</div>`;
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
