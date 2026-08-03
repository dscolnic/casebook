/**
 * NavigationTable — the in-world chart table. Shows the estimated (dead-reckoned)
 * track, the growing uncertainty ellipse, the last trusted fix, current set/drift,
 * a bottom-depth comparison, and a SOURCE-DEPENDENCY view. The true position is
 * NEVER displayed during play.
 *
 * Content lineage: dead-reckoning model from `dead_reckoning_three_chapter_course_
 * edition.html` (estimate `st.e`, uncertainty scalar `st.u`, current cells, fix
 * fusion resetting `u`) and the Casebook common-mode idea (`nc_greywake_case`):
 * two displays can agree because they share one degraded source. The
 * source-dependency panel makes that inspectable.
 */
export class NavigationTable {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this._raf = null;
  }

  render(container) {
    const s = this.state;
    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 3fr 2fr;">
        <div class="console-tile">
          <h4>Chart — Estimated Track &amp; Uncertainty</h4>
          <canvas class="chart-canvas" width="480" height="300"></canvas>
          <div class="console-sub">Ring = 1σ position uncertainty. It grows with time and speed until a trusted fix resets it.</div>
        </div>
        <div>
          <div class="console-tile" style="margin-bottom:12px;">
            <h4>Dead Reckoning</h4>
            <div class="console-sub">Heading <b>${Math.round(s.heading)}°</b> · Speed <b>${s.speed.toFixed(1)} kn</b></div>
            <div class="console-sub">Est. uncertainty <b>${s.navigationUncertainty.toFixed(2)} nm</b> (${this._confLabel(s.navigationUncertainty)})</div>
            <div class="console-sub">Last trusted fix <b>${s.lastTrustedFix.ageMin.toFixed(0)} min</b> ago</div>
            <div class="console-sub">Set/Drift <b>${Math.round(s.externalCurrent.set)}° / ${s.externalCurrent.drift.toFixed(1)} kn</b></div>
          </div>
          <div class="console-tile">
            <h4>Source-Dependency View</h4>
            <div class="console-sub" style="line-height:1.5;">
              Chart overlay ⟵ <b style="color:var(--accent-warm)">Inertial Nav A</b><br>
              Radar overlay ⟵ <b style="color:var(--accent-warm)">Inertial Nav A</b><br>
              Bottom contour ⟵ <b style="color:var(--ok)">Depth sounder (independent)</b>
            </div>
            <div class="console-sub" style="margin-top:8px;color:var(--accent-warm);">
              Two displays agree — but both inherit Inertial Nav A. Agreement here is not corroboration.
              An independent fix must not share that source.
            </div>
            <button class="station-btn" id="nav-fix" style="margin-top:8px;">Take independent depth fix</button>
          </div>
        </div>
      </div>`;

    this.chart = container.querySelector('.chart-canvas');
    this.cctx = this.chart.getContext('2d');
    container.querySelector('#nav-fix')?.addEventListener('click', () => this._takeFix());
    this._loop();
  }

  _confLabel(u) {
    if (u <= 0.5) return 'High';
    if (u <= 1.25) return 'Moderate';
    if (u <= 2.1) return 'Low';
    return 'Very low';
  }

  _takeFix() {
    // An independent fix resets uncertainty (mirrors dead_reckoning fuse/exactFix).
    this.state.navigationUncertainty = 0.25;
    this.state.lastTrustedFix.ageMin = 0;
    this.bus.emit('nav:fixTaken');
    this.bus.emit('notebook:concept', {
      concept: 'Independent fix',
      text: 'A depth-sounder fix does not share the inertial source, so it genuinely resets position uncertainty.',
    });
  }

  _loop() {
    this._drawChart();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _drawChart() {
    const ctx = this.cctx, w = this.chart.width, h = this.chart.height;
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, h);
    // Depth contours.
    ctx.strokeStyle = '#12303a';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(w * 0.2, h * 1.1, i * 60, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    }
    // Estimated track (dead-reckoned) leading to current estimate.
    const ex = w * 0.5, ey = h * 0.45;
    ctx.strokeStyle = '#3fb6c2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.8);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    // Last trusted fix marker.
    ctx.fillStyle = '#6bbf73';
    ctx.beginPath(); ctx.arc(w * 0.2, h * 0.8, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6bbf73'; ctx.font = '10px monospace';
    ctx.fillText('last trusted fix', w * 0.2 + 8, h * 0.8);
    // Estimate + uncertainty ring (scaled).
    const r = Math.min(120, 12 + this.state.navigationUncertainty * 40);
    ctx.strokeStyle = 'rgba(216,162,74,0.8)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.ellipse(ex, ey, r, r * 0.7, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#d8a24a';
    ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillText('estimated position', ex + 8, ey);
    // Current arrow.
    ctx.strokeStyle = '#8ea0ad';
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + 30, ey + 16); ctx.stroke();
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
