import { FIX_SOURCES, ROUTES, bottomDepth } from '../simulation/NavigationSystem.js';

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
    body.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 3fr 2fr;">
        <div class="console-tile">
          <h4>Chart — Estimated Track &amp; Uncertainty</h4>
          <canvas class="chart-canvas" width="480" height="320"></canvas>
          <div class="console-sub">Ring = 1σ position uncertainty. It grows with time and speed until a
            fix from an independent source resets it. Shaded band is the bank.</div>
        </div>
        <div class="console-tile">
          <h4>Position</h4>
          <div class="console-readout" id="nav-u">${s.navigationUncertainty.toFixed(2)} nm</div>
          <div class="console-sub">1σ uncertainty · confidence <b>${this._confLabel(s.navigationUncertainty)}</b></div>
          <div class="console-sub" style="margin-top:8px;">Estimated
            <b>${s.estimatedPosition.x.toFixed(2)} E / ${s.estimatedPosition.y.toFixed(2)} N</b> nm</div>
          <div class="console-sub">Last trusted fix <b id="nav-age">${s.lastTrustedFix.ageMin.toFixed(0)} min</b> ago</div>
          <div class="console-sub">Heading <b>${Math.round(s.heading)}°</b> · Speed <b>${s.speed.toFixed(1)} kn</b></div>
          <div class="console-sub">Set/Drift <b>${Math.round(fc.set)}° / ${fc.drift.toFixed(1)} kn</b></div>
          <button class="station-btn" id="nav-record" style="margin-top:10px;">Record last trusted position</button>
        </div>
      </div>`;
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
      <div class="console-tile">
        <h4>Routes out of the area</h4>
        <div class="console-sub">Your position ring is <b>${s.navigationUncertainty.toFixed(2)} nm</b>. On a bank
          that shoals about ${shoalingPerNm} m per nautical mile, that ring is not an abstraction — it is
          water you might not have.</div>
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

  _drawChart() {
    const ctx = this.cctx, w = this.chart.width, h = this.chart.height;
    const s = this.state;
    const fc = s.forecastCurrent || s.externalCurrent;
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, h);

    // Chart frame: 16 nm across, centred a little south-west of the estimate.
    const spanNm = 16;
    const cx = s.estimatedPosition.x, cy = s.estimatedPosition.y + 3;
    const toPx = (x, y) => [w / 2 + ((x - cx) / spanNm) * w, h / 2 - ((y - cy) / spanNm) * w];

    // Bottom shading: sample a coarse grid and tint the shallow water.
    const step = 10;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const x = cx + ((px - w / 2) / w) * spanNm;
        const y = cy - ((py - h / 2) / w) * spanNm;
        const d = bottomDepth(x, y);
        if (d > 150) continue;
        const t = Math.max(0, Math.min(1, (150 - d) / 120));
        ctx.fillStyle = `rgba(${40 + t * 120},${60 - t * 20},${50 - t * 20},${0.15 + t * 0.5})`;
        ctx.fillRect(px, py, step, step);
      }
    }

    // Last trusted fix → estimate.
    const [fx, fy] = toPx(s.lastTrustedFix.x, s.lastTrustedFix.y);
    const [ex, ey] = toPx(s.estimatedPosition.x, s.estimatedPosition.y);
    ctx.strokeStyle = '#3fb6c2';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(ex, ey); ctx.stroke();

    ctx.fillStyle = '#6bbf73';
    ctx.beginPath(); ctx.arc(fx, fy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = '10px monospace';
    ctx.fillText('last trusted fix', fx + 8, fy);

    // Uncertainty ring, to scale on the chart.
    const r = (s.navigationUncertainty / spanNm) * w;
    ctx.strokeStyle = 'rgba(216,162,74,0.85)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(ex, ey, Math.max(4, r), 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#d8a24a';
    ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillText('estimated position', ex + 8, ey);

    // Routes.
    for (const route of ROUTES) {
      ctx.strokeStyle = this.nav?.routeChosen?.id === route.id ? '#3fb6c2' : 'rgba(142,160,173,0.35)';
      ctx.lineWidth = this.nav?.routeChosen?.id === route.id ? 2 : 1;
      ctx.beginPath();
      route.waypoints.forEach((wp, i) => {
        const [px, py] = toPx(s.estimatedPosition.x + wp[0], s.estimatedPosition.y + wp[1]);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Current arrow.
    const setRad = (fc.set * Math.PI) / 180;
    ctx.strokeStyle = '#8ea0ad';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex + Math.sin(setRad) * 28, ey - Math.cos(setRad) * 28);
    ctx.stroke();
    ctx.fillStyle = '#8ea0ad';
    ctx.fillText(`set ${Math.round(fc.set)}°`, ex + Math.sin(setRad) * 32, ey - Math.cos(setRad) * 32);
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
