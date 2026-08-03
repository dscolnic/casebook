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
    this._raf = null;
  }

  render(container) {
    const s = this.state;
    const busRows = Object.entries(s.electricalBuses).map(([id, b]) =>
      `<div class="contact-row"><span>${id}</span><span class="${b.energized ? 'cls-biologic' : 'cls-warship'}">${b.energized ? b.voltage + ' V · ' + b.source : 'DE-ENERGIZED'}</span></div>`).join('');
    const pumpRows = Object.entries(s.pumpStates).map(([id, p]) =>
      `<div class="contact-row"><span>${id}</span>
        <span><button class="station-btn ${p.on ? 'active' : ''}" data-pump="${id}">${p.on ? 'RUNNING' : 'stopped'}</button></span></div>`).join('');
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
      const levels = Object.entries(this.state.bilgeLevels);
      el.textContent = levels.length
        ? levels.map(([k, v]) => `${k}: ${v.toFixed(0)} cm`).join(' · ')
        : 'Bilges dry.';
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  dispose() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; }
}
