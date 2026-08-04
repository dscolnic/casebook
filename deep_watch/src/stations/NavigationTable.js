import { FIX_SOURCES, ROUTES, bottomDepth } from '../simulation/NavigationSystem.js';
import { guideStrip, caption } from './StationGuide.js';

/**
 * NavigationTable — the chart table. Estimated track, the uncertainty ring, the
 * last trusted fix, set and drift, the bottom-contour comparison, the fix sources
 * and what each one actually depends on, and the route choice.
 *
 * The true position is NEVER drawn. The player closes the gap by reasoning, not
 * by being shown the answer.
 *
 * Content lineage: Dead Reckoning (`nc_dr_1`) for estimate-vs-truth, set and
 * drift, and a ring that only a fix resets; Ballpark (`nc_bp_depth`) for the
 * distance-run and offset arithmetic, done by the player; Casebook
 * (`nc_greywake_case`) for the two displays that agree because both are fed by
 * one drifting inertial unit.
 */
export class NavigationTable {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.nav = ctx.nav;
    this.notebook = ctx.notebook;
    this.tab = 'plot';
    this._raf = null;
  }

  render(container) {
    this.container = container;
    container.innerHTML = `
      <div class="tab-row">
        <button class="station-btn" data-ntab2="plot">Plot</button>
        <button class="station-btn" data-ntab2="dr">Dead reckoning</button>
        <button class="station-btn" data-ntab2="sources">Fix sources</button>
        <button class="station-btn" data-ntab2="route">Route</button>
      </div>
      <div id="nav-body"></div>`;
    container.querySelectorAll('[data-ntab2]').forEach((b) =>
      b.addEventListener('click', () => { this.tab = b.dataset.ntab2; this._renderTab(); }));
    this._renderTab();
    this._loop();
  }

  /**
   * The four faces in the order a navigator actually uses them, with the next
   * action worked out from the live state rather than written down in advance.
   */
  _guide() {
    const s = this.state;
    const tookIndependent = this.nav?.fixes.some((f) => f.independent);
    const tookAny = (this.nav?.fixes.length ?? 0) > 0;
    const steps = [
      '1 · Record the datum — when did our position last come from a measurement?',
      '2 · Advance the plot — distance run, then the current on top of it',
      '3 · Check your sources — which displays are actually independent?',
      '4 · Choose a route the position ring can survive',
    ];
    const active = !this.nav?.routeChosen
      ? (tookIndependent ? 3 : tookAny ? 2 : (this.nav?.driftApplied ? 2 : 1))
      : 3;

    const FACES = {
      plot: {
        what: 'The chart. The amber dot is where the plot THINKS we are; the dashed circle is how wrong that could be.',
        doNow: s.lastTrustedFix.ageMin > 30
          ? `Our last real position measurement is ${this._age(s.lastTrustedFix.ageMin)} old. Record the datum, then work out how far we have moved since.`
          : 'Position is recent. Keep an eye on the ring — it grows the whole time you are not measuring.',
        why: 'A dead-reckoned position is a calculation, not an observation. It is only as good as the assumptions underneath it.',
      },
      dr: {
        what: 'Dead reckoning: course and speed give distance run; the current adds a sideways offset the plot never sees.',
        doNow: this.nav?.driftApplied
          ? 'Now sound the bottom and compare it with what the chart says should be under the estimated position.'
          : 'Work the distance run, then enter the forecast set and drift and apply it to the plot.',
        why: 'The boat goes where it is pointed AND where the water takes it. Only one of those is in the plot.',
      },
      sources: {
        what: 'Where each position display gets its numbers from.',
        doNow: tookIndependent
          ? 'You have an independent fix. Go to Route and pick a way out.'
          : tookAny
            ? 'Notice the ring shrank but the position did not move. Now take the bottom-contour fix and watch the difference.'
            : 'Take a fix from the inertial navigator, then look at what actually changed.',
        why: 'Two displays that share a source agree even when they are both wrong. Corroboration means independence, not agreement.',
      },
      route: {
        what: 'Ways out of the area, each with the shallowest water the chart promises along it.',
        doNow: `Your ring is ${s.navigationUncertainty.toFixed(2)} nm. Pick the route that still has water under us if we are at the WORST edge of it.`,
        why: 'A position uncertainty is not an abstraction. On a bank that shoals, it converts directly into metres you may not have.',
      },
    };
    const f = FACES[this.tab] || FACES.plot;
    return guideStrip({ ...f, steps, activeStep: active });
  }

  _renderTab() {
    this.container.querySelectorAll('[data-ntab2]').forEach((b) =>
      b.classList.toggle('active', b.dataset.ntab2 === this.tab));
    const body = this.container.querySelector('#nav-body');
    if (this.tab === 'plot') this._renderPlot(body);
    else if (this.tab === 'dr') this._renderDR(body);
    else if (this.tab === 'sources') this._renderSources(body);
    else this._renderRoute(body);
  }

  _confLabel(u) {
    if (u <= 0.5) return 'High';
    if (u <= 1.25) return 'Moderate';
    if (u <= 2.1) return 'Low';
    return 'Very low';
  }

  // ---------------- PLOT ----------------
  _renderPlot(body) {
    const s = this.state;
    const fc = s.forecastCurrent || s.externalCurrent;
    const danger = Math.round(s.depth + 15);
    body.innerHTML = `
      ${this._guide()}
      <div class="console-tile">
        <h4>Chart</h4>
        <canvas class="chart-canvas" width="900" height="430"></canvas>
        <div class="chart-legend">
          <span><i style="background:#5c6b3a"></i>under 40 m</span>
          <span><i style="background:#2f6f66"></i>40–60 m</span>
          <span><i style="background:#1a5468"></i>60–100 m</span>
          <span><i style="background:#124057"></i>100–150 m</span>
          <span><i style="background:#0a2233"></i>deep water</span>
          <span><i class="hatch"></i>shallower than ${danger} m — no room for us</span>
        </div>
        ${caption('the sea bottom in depth bands, our dead-reckoned track, and the three ways out.',
          'the amber dot (where we think we are), the dashed circle around it (how wrong that could be), and whether that circle reaches any red hatching.')}
      </div>
      <div class="stat-chips">
        <div class="chip ${s.navigationUncertainty > 1 ? 'bad' : s.navigationUncertainty > 0.5 ? 'warn' : 'good'}">
          <span class="chip-k">How wrong we could be</span>
          <span class="chip-v" id="nav-u">${s.navigationUncertainty.toFixed(2)} nm</span>
          <span class="chip-n">${this._confLabel(s.navigationUncertainty)} confidence</span>
        </div>
        <div class="chip ${s.lastTrustedFix.ageMin > 60 ? 'bad' : 'warn'}">
          <span class="chip-k">Since a real measurement</span>
          <span class="chip-v" id="nav-age">${this._age(s.lastTrustedFix.ageMin)}</span>
          <span class="chip-n">everything since is calculated</span>
        </div>
        <div class="chip">
          <span class="chip-k">Where the plot says</span>
          <span class="chip-v">${s.estimatedPosition.x.toFixed(2)} E / ${s.estimatedPosition.y.toFixed(2)} N</span>
          <span class="chip-n">heading ${Math.round(s.heading)}° at ${s.speed.toFixed(1)} kn</span>
        </div>
        <div class="chip">
          <span class="chip-k">Water pushing us</span>
          <span class="chip-v">${Math.round(fc.set)}° / ${fc.drift.toFixed(1)} kn</span>
          <span class="chip-n">forecast — not measured</span>
        </div>
      </div>
      <button class="station-btn" id="nav-record" style="margin-top:12px;">Record last trusted position</button>
`;
    this.chart = body.querySelector('.chart-canvas');
    this.cctx = this.chart.getContext('2d');
    body.querySelector('#nav-record').addEventListener('click', () => {
      const s2 = this.state;
      this.notebook?.record({
        compartment: 'Control Room', instrument: 'Chart table',
        measurement: `Last trusted fix ${s2.lastTrustedFix.x.toFixed(2)} E / ${s2.lastTrustedFix.y.toFixed(2)} N, ${s2.lastTrustedFix.ageMin.toFixed(0)} min old`,
        observation: 'Everything after this point is dead reckoning: course and speed only, with no measurement of where the water has taken us.',
        clock: s2.formatClock(), kind: 'observation', tag: 'nav_last_fix',
      });
      this.bus.emit('nav:lastFixRecorded', { ageMin: s2.lastTrustedFix.ageMin });
      this.bus.emit('hud:toast', { concept: 'Datum recorded',
        text: `Last trusted fix is ${s2.lastTrustedFix.ageMin.toFixed(0)} minutes old. From here the plot is an assumption, not an observation.` });
    });
  }

  // ---------------- DEAD RECKONING ----------------
  _renderDR(body) {
    const s = this.state;
    const fc = s.forecastCurrent || s.externalCurrent;
    const mins = s.lastTrustedFix.ageMin;
    body.innerHTML = `
      ${this._guide()}
      <div class="console-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="console-tile">
          <h4>Distance run</h4>
          <div class="console-sub">Speed × time is the whole of a dead-reckoned advance.</div>
          <div class="console-readout">${(s.speed * mins / 60).toFixed(2)} nm</div>
          <div class="console-sub">${s.speed.toFixed(1)} kn × ${mins.toFixed(0)} min ÷ 60</div>
        </div>
        <div class="console-tile">
          <h4>What the water has been doing</h4>
          <div class="console-sub">A ${fc.drift.toFixed(1)} kn set of ${Math.round(fc.set)}°
            over ${mins.toFixed(0)} minutes puts you off track by:</div>
          <div class="console-readout">${(fc.drift * mins / 60).toFixed(2)} nm</div>
          <div class="console-sub">and the plot knows nothing about it until you tell it.</div>
          <div class="settings-row" style="margin-top:10px;">
            <label>Set °</label><input id="dr-set" type="number" value="${Math.round(fc.set)}" style="width:80px">
            <label>Drift kn</label><input id="dr-drift" type="number" step="0.1" value="${fc.drift.toFixed(1)}" style="width:80px">
          </div>
          <button class="station-btn" id="dr-apply" style="margin-top:8px;">Apply the current to the plot</button>
          <div class="console-sub" id="dr-out" style="margin-top:8px;"></div>
        </div>
      </div>
      <div class="console-tile" style="margin-top:14px;">
        <h4>Bottom contour</h4>
        <div class="console-sub">The chart says the water under the estimated position should be
          <b>${bottomDepth(s.estimatedPosition.x, s.estimatedPosition.y).toFixed(0)} m</b>.</div>
        <button class="station-btn" id="dr-sound">Sound the bottom</button>
        <div class="console-sub" id="dr-sound-out" style="margin-top:8px;"></div>
      </div>`;

    body.querySelector('#dr-apply').addEventListener('click', () => {
      const set = +body.querySelector('#dr-set').value;
      const drift = +body.querySelector('#dr-drift').value;
      const res = this.nav.applyCurrentCorrection(set, drift, mins);
      body.querySelector('#dr-out').innerHTML = res.improved
        ? `<span class="cls-biologic">Plot advanced ${res.dist.toFixed(2)} nm for the current. That is the ballpark right.</span>`
        : `<span class="cls-merchant">Plot advanced ${res.dist.toFixed(2)} nm. Check the set and the drift against what the table is telling you.</span>`;
      this.notebook?.record({
        compartment: 'Control Room', instrument: 'Chart table',
        measurement: `Current applied: ${set}° / ${drift.toFixed(1)} kn over ${mins.toFixed(0)} min = ${res.dist.toFixed(2)} nm`,
        observation: 'Dead reckoning advanced for set and drift.',
        clock: s.formatClock(), kind: 'estimate', tag: 'nav_current',
      });
    });

    body.querySelector('#dr-sound').addEventListener('click', () => {
      const sounded = this.nav.soundBottom();
      const charted = this.nav.chartedDepthAtEstimate();
      const diff = sounded - charted;
      body.querySelector('#dr-sound-out').innerHTML =
        `Sounded <b>${sounded.toFixed(0)} m</b> against <b>${charted.toFixed(0)} m</b> charted at the estimate — `
        + (Math.abs(diff) < 8
          ? '<span class="cls-biologic">they agree. The along-track estimate is good.</span>'
          : `<span class="cls-warship">${Math.abs(diff).toFixed(0)} m ${diff > 0 ? 'deeper' : 'shallower'} than the chart says. The plot is not where the boat is.</span>`);
      this.notebook?.record({
        compartment: 'Control Room', instrument: 'Fathometer',
        measurement: `${sounded.toFixed(0)} m sounded vs ${charted.toFixed(0)} m charted`,
        observation: Math.abs(diff) < 8
          ? 'Sounding matches the charted contour at the estimated position.'
          : 'Sounding disagrees with the chart at the estimated position — an independent measurement says the plot is wrong.',
        clock: s.formatClock(), kind: 'measurement', tag: 'nav_sounding',
      });
      this.bus.emit('nav:sounded', { sounded, charted, diff });
    });
  }

  // ---------------- FIX SOURCES ----------------
  _renderSources(body) {
    body.innerHTML = `
      ${this._guide()}
      <div class="console-tile">
        <h4>What each display is actually fed by</h4>
        <div class="dep-graph" style="margin:12px 0;">
          <span class="dep-node">Chart overlay</span>
          <span class="dep-node">Electronic plot repeat</span>
          <span class="dep-join">┐<br>├──</span>
          <span class="dep-source">Inertial navigator A</span>
        </div>
        <div class="console-sub">Those two agree. They will always agree — they are one solution drawn twice.
          If the inertial unit has walked, both are wrong together and neither will tell you.</div>
        <div class="dep-graph" style="margin:12px 0;">
          <span class="dep-node">Bottom-contour comparison</span>
          <span class="dep-join">─</span>
          <span class="dep-source" style="border-color:var(--ok);color:var(--ok)">Fathometer (independent)</span>
        </div>
      </div>
      <div class="console-tile" style="margin-top:14px;">
        <h4>Take a fix</h4>
        ${Object.entries(FIX_SOURCES).map(([id, f]) => `<div class="contact-row">
          <span>${f.name} <span class="console-sub">${f.note}</span></span>
          <span><button class="station-btn" data-fix="${id}">Fix</button></span>
        </div>`).join('')}
        <div class="console-sub" id="fix-out" style="margin-top:10px;"></div>
      </div>`;

    body.querySelectorAll('[data-fix]').forEach((b) => b.addEventListener('click', () => {
      const res = this.nav.takeFix(b.dataset.fix);
      const out = body.querySelector('#fix-out');
      out.innerHTML = res.independent
        ? '<span class="cls-biologic">Independent fix. The plot moved, and the ring genuinely reset.</span>'
        : '<span class="cls-warship">The ring shrank and the plot did not move at all. That is what a fix from the source that is already wrong looks like: more confidence, no more accuracy.</span>';
      this.notebook?.record({
        compartment: 'Control Room', instrument: res.name,
        measurement: `Fix taken · uncertainty now ${this.state.navigationUncertainty.toFixed(2)} nm`,
        observation: res.independent
          ? 'Independent of the inertial solution, so it is a real correction.'
          : 'Shares the inertial source with the plot it was meant to check — precision without accuracy.',
        clock: this.state.formatClock(), kind: 'observation', tag: 'nav_fix',
      });
      if (!res.independent) {
        this.notebook?.addDependency({
          id: 'nav_inertial_chain',
          title: 'Two navigation displays, one inertial unit',
          displays: ['Chart overlay', 'Electronic plot repeat'],
          sharedSource: 'Inertial navigator A',
          note: 'Both are renderings of one solution. Their agreement carries no information about whether that solution is right.',
          independent: 'a bottom-contour comparison off the fathometer.',
        });
      }
    }));
  }

  // ---------------- ROUTE ----------------
  _renderRoute(body) {
    const s = this.state;
    const shoalingPerNm = 95;
    body.innerHTML = `
      ${this._guide()}
      <div class="console-tile">
        <h4>Routes out of the area</h4>
        <div class="console-sub">Read each row as: <b>if we are exactly where we think</b> the chart promises the
          "charted least" depth — but if we are at the far edge of our
          <b>${s.navigationUncertainty.toFixed(2)} nm</b> ring, on a bank shoaling about ${shoalingPerNm} m per
          nautical mile, we could instead get the "worst case" depth. We are at
          <b>${Math.round(s.depth)} m</b> and want at least 15 m under the keel.</div>
        ${ROUTES.map((r) => {
          const worst = r.chartedLeastDepth - s.navigationUncertainty * shoalingPerNm;
          const clear = worst - s.depth;
          return `<div class="contact-row">
            <span><b>${r.name}</b> · ${r.lengthNm} nm · course ${r.course}°
              <span class="console-sub">${r.exposure}</span></span>
            <span class="${clear > 15 ? 'cls-biologic' : 'cls-warship'}">
              charted least ${r.chartedLeastDepth} m · worst case ${worst.toFixed(0)} m ·
              ${clear > 15 ? `${clear.toFixed(0)} m under the keel` : 'NOT ENOUGH WATER'}
            </span></div>`;
        }).join('')}
        <div style="margin-top:10px;">
          ${ROUTES.map((r) => `<button class="station-btn" data-route="${r.id}">Take the ${r.name.toLowerCase()}</button>`).join('')}
        </div>
        <div class="console-sub" id="route-out" style="margin-top:10px;"></div>
      </div>`;

    body.querySelectorAll('[data-route]').forEach((b) => b.addEventListener('click', () => {
      const res = this.nav.chooseRoute(b.dataset.route);
      body.querySelector('#route-out').innerHTML = res.safe
        ? `<span class="cls-biologic">${res.name}: ${res.clearance.toFixed(0)} m under the keel even at the edge of the ring. Course ${res.course}° ordered.</span>`
        : `<span class="cls-warship">${res.name}: at the edge of your position ring that is ${res.worstDepth.toFixed(0)} m of water under a boat at ${Math.round(this.state.depth)} m. Shrink the ring first, or take more water.</span>`;
      this.state.orderedHeading = res.course;
      this.notebook?.record({
        compartment: 'Control Room', instrument: 'Chart table',
        measurement: `Route: ${res.name}`,
        observation: res.safe
          ? `Charted least depth ${res.chartedLeastDepth} m; worst case with the ring ${res.worstDepth.toFixed(0)} m; ${res.clearance.toFixed(0)} m clearance.`
          : `Rejected as unsafe for a ${s.navigationUncertainty.toFixed(2)} nm ring.`,
        clock: s.formatClock(), kind: 'plan', tag: 'nav_route',
      });
    }));
  }

  _loop() {
    if (this.tab === 'plot' && this.cctx) {
      this._drawChart();
      const u = this.container?.querySelector('#nav-u');
      if (u) u.textContent = `${this.state.navigationUncertainty.toFixed(2)} nm`;
      const age = this.container?.querySelector('#nav-age');
      if (age) age.textContent = `${this.state.lastTrustedFix.ageMin.toFixed(0)} min`;
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  /**
   * The chart. Everything on it is labelled where it sits, because a legend you
   * have to cross-reference is a legend nobody reads.
   *
   * Depth is drawn as filled bands with their contour values printed on them, and
   * anything shallower than the boat plus a safety margin is hatched red — so
   * "where can I not go" is answered by looking, not by arithmetic.
   */
  _drawChart() {
    const ctx = this.cctx, w = this.chart.width, h = this.chart.height;
    const s = this.state;
    const fc = s.forecastCurrent || s.externalCurrent;

    // Frame: 11 nm across, the estimate a little below centre so the ground ahead
    // (which is where the player is going) gets the room.
    const spanNm = 11;
    const cx = s.estimatedPosition.x + 0.4, cy = s.estimatedPosition.y + 1.35;
    const pxPerNm = w / spanNm;
    const toPx = (x, y) => [w / 2 + (x - cx) * pxPerNm, h / 2 - (y - cy) * pxPerNm];

    ctx.fillStyle = '#061119';
    ctx.fillRect(0, 0, w, h);

    // ---- Depth bands ----
    const BANDS = [
      { min: 200, fill: '#0a2233' },
      { min: 150, fill: '#0d3145' },
      { min: 100, fill: '#124057' },
      { min: 60, fill: '#1a5468' },
      { min: 40, fill: '#2f6f66' },
      { min: 0, fill: '#5c6b3a' },
    ];
    const danger = s.depth + 15;
    const step = 4;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const x = cx + ((px - w / 2) / pxPerNm);
        const y = cy - ((py - h / 2) / pxPerNm);
        const d = bottomDepth(x, y);
        const band = BANDS.find((b) => d >= b.min) || BANDS[BANDS.length - 1];
        ctx.fillStyle = band.fill;
        ctx.fillRect(px, py, step, step);
        // Water the boat cannot use, hatched.
        if (d < danger && ((px + py) / step) % 6 === 0) {
          ctx.fillStyle = 'rgba(209,89,78,0.55)';
          ctx.fillRect(px, py, step, step);
        }
      }
    }

    ctx.font = '10px "Courier New", monospace';

    // ---- Contour values, printed where that depth actually crosses the chart ----
    for (const depth of [200, 150, 100, 60, 40]) {
      for (let px = 30; px < w - 60; px += 5) {
        const x = cx + ((px - w / 2) / pxPerNm);
        const yRow = cy - ((h * 0.32 - h / 2) / pxPerNm);
        const dA = bottomDepth(x, yRow);
        const dB = bottomDepth(x + 5 / pxPerNm, yRow);
        if ((dA - depth) * (dB - depth) < 0) {
          this._tag(ctx, `${depth} m`, px - 12, h * 0.32, 'rgba(215,226,234,0.85)');
          break;
        }
      }
    }

    // ---- 1 nm grid ----
    ctx.strokeStyle = 'rgba(142,160,173,0.13)';
    ctx.lineWidth = 1;
    for (let n = Math.ceil(cx - spanNm / 2); n <= cx + spanNm / 2; n++) {
      const [px] = toPx(n, 0);
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
    }
    for (let n = Math.ceil(cy - (h / pxPerNm) / 2); n <= cy + (h / pxPerNm) / 2; n++) {
      const [, py] = toPx(0, n);
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
    }

    // ---- Routes, each labelled with its own name and least depth ----
    for (const route of ROUTES) {
      const chosen = this.nav?.routeChosen?.id === route.id;
      const worst = route.chartedLeastDepth - s.navigationUncertainty * 95;
      const safe = worst - s.depth > 15;
      ctx.strokeStyle = chosen ? '#3fb6c2' : safe ? 'rgba(107,191,115,0.8)' : 'rgba(209,89,78,0.8)';
      ctx.lineWidth = chosen ? 3 : 1.5;
      ctx.setLineDash(chosen ? [] : [6, 4]);
      ctx.beginPath();
      route.waypoints.forEach((wp, i) => {
        const [px, py] = toPx(s.estimatedPosition.x + wp[0], s.estimatedPosition.y + wp[1]);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      const mid = route.waypoints[1] || route.waypoints[route.waypoints.length - 1];
      const [lx, ly] = toPx(s.estimatedPosition.x + mid[0], s.estimatedPosition.y + mid[1]);
      this._tag(ctx,
        `${route.name.toUpperCase()} · least ${route.chartedLeastDepth} m · ${
          safe ? 'enough water for us' : 'NOT ENOUGH WATER at this ring'}`,
        Math.min(w - 320, Math.max(6, lx + 10)), Math.max(16, ly),
        chosen ? '#3fb6c2' : safe ? '#6bbf73' : '#d1594e');
    }

    // ---- Dead-reckoned track: last trusted fix → estimate ----
    const [fx, fy] = toPx(s.lastTrustedFix.x, s.lastTrustedFix.y);
    const [ex, ey] = toPx(s.estimatedPosition.x, s.estimatedPosition.y);
    ctx.strokeStyle = '#3fb6c2';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 5]);
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]);
    this._tag(ctx, 'DEAD-RECKONED TRACK — no measurements since the fix',
      Math.min(w - 300, (fx + ex) / 2 + 8), (fy + ey) / 2, '#3fb6c2');

    // ---- Last trusted fix ----
    ctx.strokeStyle = '#6bbf73'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(fx, fy, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fx - 9, fy); ctx.lineTo(fx + 9, fy);
    ctx.moveTo(fx, fy - 9); ctx.lineTo(fx, fy + 9);
    ctx.stroke();
    this._tag(ctx, `LAST TRUSTED FIX · ${this._age(s.lastTrustedFix.ageMin)} ago`, fx + 12, fy + 16, '#6bbf73');

    // ---- Uncertainty ring, drawn to the chart's own scale ----
    const r = Math.max(5, s.navigationUncertainty * pxPerNm);
    ctx.fillStyle = 'rgba(216,162,74,0.12)';
    ctx.beginPath(); ctx.arc(ex, ey, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#d8a24a';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.arc(ex, ey, r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#d8a24a';
    ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();
    // Labels go outside the ring, so they never sit on the thing they describe.
    this._tag(ctx, 'WHERE WE THINK WE ARE', ex + 10, ey - r - 10, '#d8a24a');
    this._tag(ctx, `could be anywhere in this circle · ${s.navigationUncertainty.toFixed(2)} nm across`,
      ex + 10, ey + r + 16, 'rgba(216,162,74,0.95)');

    // ---- Current arrow ----
    const setRad = (fc.set * Math.PI) / 180;
    const ax = ex + Math.sin(setRad) * 46, ay = ey - Math.cos(setRad) * 46;
    ctx.strokeStyle = '#9fd8ff'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ax, ay); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - Math.sin(setRad - 0.4) * 11, ay + Math.cos(setRad - 0.4) * 11);
    ctx.lineTo(ax - Math.sin(setRad + 0.4) * 11, ay + Math.cos(setRad + 0.4) * 11);
    ctx.closePath(); ctx.fillStyle = '#9fd8ff'; ctx.fill();
    this._tag(ctx, `CURRENT PUSHING US ${Math.round(fc.set)}° at ${fc.drift.toFixed(1)} kn`,
      Math.min(w - 220, ax + 8), ay, '#9fd8ff');

    // ---- North arrow ----
    ctx.strokeStyle = '#d7e2ea'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w - 26, 48); ctx.lineTo(w - 26, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 32, 28); ctx.lineTo(w - 26, 16); ctx.lineTo(w - 20, 28);
    ctx.closePath(); ctx.fillStyle = '#d7e2ea'; ctx.fill();
    ctx.fillText('N', w - 30, 62);

    // ---- Scale bar ----
    const barPx = 2 * pxPerNm;
    ctx.strokeStyle = '#d7e2ea'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(16, h - 18); ctx.lineTo(16 + barPx, h - 18);
    ctx.moveTo(16, h - 23); ctx.lineTo(16, h - 13);
    ctx.moveTo(16 + barPx, h - 23); ctx.lineTo(16 + barPx, h - 13);
    ctx.stroke();
    ctx.fillStyle = '#d7e2ea';
    ctx.fillText('2 nautical miles', 16, h - 28);

  }

  /** A small label with a dark plate behind it, so text never sits on noise. */
  _tag(ctx, text, x, y, colour) {
    ctx.font = '10px "Courier New", monospace';
    const wpx = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(4,10,14,0.8)';
    ctx.fillRect(x - 3, y - 9, wpx + 6, 13);
    ctx.fillStyle = colour;
    ctx.fillText(text, x, y);
  }

  _age(mins) {
    const hrs = Math.floor(mins / 60), m = Math.round(mins % 60);
    return hrs ? `${hrs}h ${m}m` : `${m}m`;
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
