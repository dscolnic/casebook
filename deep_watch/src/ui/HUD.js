/**
 * HUD — the always-on overlay: current objective, compartment name, urgent boat
 * status, active instrument, the interaction prompt, transient toasts (short
 * lesson cards), and the handheld instrument read-out. It only reflects state via
 * EventBus subscriptions; it never drives simulation.
 */
export class HUD {
  constructor({ eventBus, state }) {
    this.bus = eventBus;
    this.state = state;
    this.el = {
      hud: document.getElementById('hud'),
      objective: document.getElementById('hud-objective'),
      compartment: document.getElementById('hud-compartment'),
      status: document.getElementById('hud-status'),
      instrument: document.getElementById('hud-instrument'),
      prompt: document.getElementById('hud-prompt'),
      toast: document.getElementById('hud-toast'),
    };
    this._toastTimer = null;
    this._ensureReadout();
    this._wire();
  }

  _ensureReadout() {
    this.readout = document.createElement('div');
    this.readout.className = 'instrument-readout hidden';
    document.body.appendChild(this.readout);
  }

  _wire() {
    this.bus.on('player:enteredCompartment', ({ compartment }) => {
      this.el.compartment.innerHTML = `<span class="comp-label">Compartment</span><br><span class="comp-name">${compartment.name}</span>`;
    });
    this.bus.on('mission:objective', (obj) => {
      this.el.objective.innerHTML = `<span class="obj-label">${obj.label || 'Objective'}</span>${obj.text}`;
    });
    this.bus.on('interaction:prompt', (p) => {
      if (p) { this.el.prompt.hidden = false; this.el.prompt.innerHTML = `<span class="key">E</span>${p.prompt}`; }
      else { this.el.prompt.hidden = true; }
    });
    this.bus.on('inventory:active', (item) => {
      this.el.instrument.innerHTML = item
        ? `In hand: <span class="instr-name">${item.name}</span> · <span style="opacity:.7">F to use</span>`
        : `<span style="opacity:.6">No instrument in hand · [ ] to cycle</span>`;
    });
    this.bus.on('instrument:readout', (r) => this._showReadout(r));
    this.bus.on('hud:toast', (t) => this.toast(t.concept, t.text));
    this.bus.on('notebook:concept', (c) => this.toast(c.concept, c.text));
  }

  _showReadout(r) {
    if (!r) { this.readout.classList.add('hidden'); return; }
    const lvl = r.level && r.level !== 'ok' ? r.level : '';
    this.readout.className = 'instrument-readout';
    this.readout.innerHTML = `
      <div class="ir-name">${r.name}</div>
      <div class="ir-value ${lvl}">${r.value}<span class="ir-unit">${r.unit || ''}</span></div>
      ${r.note ? `<div class="ir-note">${r.note}</div>` : ''}`;
    clearTimeout(this._readoutTimer);
    this._readoutTimer = setTimeout(() => this.readout.classList.add('hidden'), 6000);
  }

  toast(concept, text) {
    const t = this.el.toast;
    t.hidden = false;
    t.style.opacity = '1';
    t.innerHTML = `${concept ? `<span class="toast-concept">${concept}</span>` : ''}${text}`;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => { t.hidden = true; }, 400);
    }, 5200);
  }

  show(on) { this.el.hud.hidden = !on; }

  updateStatus() {
    const s = this.state.snapshot();
    const warnO2 = this.state.oxygenLevel < 19.5 ? 'warn' : '';
    const warnCO2 = this.state.carbonDioxideLevel > 1.0 ? 'warn' : '';
    this.el.status.innerHTML = `
      <span class="stat">Depth <b>${s.depth} m</b></span>
      <span class="stat">Head <b>${s.heading}°</b></span>
      <span class="stat">Speed <b>${s.speed} kn</b></span>
      <span class="stat ${Math.abs(this.state.trim) > 1 ? 'warn' : ''}">Trim <b>${s.trim}°</b></span>
      <span class="stat ${warnO2}">O₂ <b>${s.o2}%</b></span>
      <span class="stat ${warnCO2}">CO₂ <b>${s.co2}%</b></span>`;
  }
}
