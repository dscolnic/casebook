/**
 * EngineeringPanel — machinery control: electrical distribution overview,
 * propulsion status, cooling loops, pump status, tank/bilge indications, trends,
 * and load-priority. Toggling pumps here changes acoustic self-noise (coupling
 * used by the self-noise mission) and dewaters bilges (flooding mission).
 */
export class EngineeringPanel {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.flooding = ctx.flooding;
    this._raf = null;
  }

  render(container) {
    const s = this.state;
    const busRows = Object.entries(s.electricalBuses).map(([id, b]) =>
      `<div class="contact-row"><span>${id}</span><span class="${b.energized ? 'cls-biologic' : 'cls-warship'}">${b.energized ? b.voltage + ' V · ' + b.source : 'DE-ENERGIZED'}</span></div>`).join('');
    const panel = s.electricalPanels?.fwd_power_2f;
    const pumpRows = Object.entries(s.pumpStates).map(([id, p]) => {
      const unpowered = id === 'bilgePumpFwd' && panel && (!panel.energized || panel.tripped);
      const unrigged = p.portable && !p.deployedIn;
      const note = unpowered ? 'no power — fwd panel secured'
        : unrigged ? 'not rigged — set its suction by hand'
        : p.portable ? `rigged in ${p.deployedIn.replace(/_/g, ' ')}` : `${p.capacity_m3h} m³/h`;
      return `<div class="contact-row"><span>${id} <span class="console-sub">${note}</span></span>
        <span><button class="station-btn ${p.on ? 'active' : ''}" data-pump="${id}"
          ${unpowered || unrigged ? 'disabled' : ''}>${p.on ? 'RUNNING' : 'stopped'}</button></span></div>`;
    }).join('');
    const coolRows = Object.entries(s.coolingLoops).map(([id, c]) =>
      `<div class="contact-row"><span>${id}</span><span class="${c.tempC > 45 ? 'cls-warship' : 'cls-biologic'}">${c.tempC.toFixed(0)}°C · flow ${(c.flow * 100).toFixed(0)}%</span></div>`).join('');

    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(2,1fr);">
        <div class="console-tile"><h4>Electrical Distribution</h4>${busRows}</div>
        <div class="console-tile"><h4>Propulsion</h4>
          <div class="console-sub">Mode <b>${s.propulsionState.mode}</b> · ${s.propulsionState.online ? 'online' : 'OFFLINE'}</div>
          <div class="console-readout">${Math.round(s.propulsionState.shaftRpm)} rpm</div>
          <div class="console-sub">Shaft self-noise contribution rises with rpm.</div>
        </div>
        <div class="console-tile"><h4>Cooling Loops</h4>${coolRows}</div>
        <div class="console-tile"><h4>Pumps &amp; Bilge</h4>${pumpRows}
          <div class="console-sub" id="eng-bilge" style="margin-top:6px;"></div>
        </div>
      </div>
      <div class="console-sub" style="margin-top:12px;">Running a pump dewaters its bilge but adds ~3 dB to the self-noise floor. Silence and safety compete.</div>`;

    container.querySelectorAll('[data-pump]').forEach((b) =>
      b.addEventListener('click', () => {
        const p = s.pumpStates[b.dataset.pump];
        p.on = !p.on;
        this.bus.emit('pump:toggled', { id: b.dataset.pump, on: p.on });
        this.render(container); // re-render to reflect state
      }));

    this.container = container;
    this._loop();
  }

  _loop() {
    const el = this.container?.querySelector('#eng-bilge');
    if (el) {
      const levels = Object.entries(this.state.bilgeLevels).filter(([, v]) => v > 0.2);
      const rate = this.flooding?.riseRateCmPerMin?.();
      el.innerHTML = levels.length
        ? levels.map(([k, v]) => `${k.replace(/_/g, ' ')}: <b>${v.toFixed(0)} cm</b>`).join(' · ')
          + (rate != null ? ` · <span class="${rate > 0 ? 'cls-warship' : 'cls-biologic'}">${rate > 0 ? '+' : ''}${rate.toFixed(1)} cm/min</span>` : '')
        : 'Bilges dry.';
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  dispose() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; }
}
