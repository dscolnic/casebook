/**
 * HUD — the always-on overlay: current objective, compartment name, urgent boat
 * status, active instrument, the interaction prompt, transient toasts (short
 * lesson cards), and the handheld instrument read-out. It only reflects state via
 * EventBus subscriptions; it never drives simulation.
 */
import { resolveScienceKey } from '../content/scienceNotes.js';

export class HUD {
  constructor({ eventBus, state, flooding, crew, voyage }) {
    this.bus = eventBus;
    this.state = state;
    this.flooding = flooding;
    this.crew = crew;
    this.voyage = voyage;
    this.el = {
      hud: document.getElementById('hud'),
      objective: document.getElementById('hud-objective'),
      compartment: document.getElementById('hud-compartment'),
      status: document.getElementById('hud-status'),
      instrument: document.getElementById('hud-instrument'),
      prompt: document.getElementById('hud-prompt'),
      toast: document.getElementById('hud-toast'),
      casualty: document.getElementById('hud-casualty'),
      hint: document.getElementById('hud-hint'),
      patrol: document.getElementById('hud-patrol'),
      veil: document.getElementById('fatigue-veil'),
    };
    this._toastTimer = null;
    this._objective = { label: 'Objective', text: '', hasHints: false, detail: null };
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
      this._objective = { ...obj, progress: null, detail: null };
      this._renderObjective();
    });
    this.bus.on('mission:progress', (p) => {
      this._objective.progress = `${p.have} of ${p.need}`;
      this._objective.detail = p.detail || null;
      this._renderObjective();
    });
    this.bus.on('mission:hint', (h) => this._showHint(h.text, h.index, h.total));
    this.bus.on('mission:hintLocation', (l) => this._addHintLocation(l.where));
    this.bus.on('interaction:prompt', (p) => {
      if (!p) { this.el.prompt.hidden = true; return; }
      this.el.prompt.hidden = false;
      // If the thing under the crosshair has a science entry, say so here — that
      // is the only place a player is reliably looking when they wonder what a
      // piece of equipment actually does. A wall panel is skipped because E on it
      // already opens the explanation.
      const sci = p.type !== 'display' && resolveScienceKey(p.type, p.id);
      this.el.prompt.innerHTML = `<span class="key">E</span>${p.prompt}`
        + (sci ? `<span class="prompt-sci"><span class="key">G</span>How it works</span>` : '');
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

  _renderObjective() {
    const o = this._objective;
    this.el.objective.innerHTML = `<span class="obj-label">${o.label || 'Objective'}</span>${o.text || ''}`
      + (o.progress ? `<span class="obj-progress">${o.progress}</span>` : '')
      + (o.detail ? `<span class="obj-detail">${o.detail}</span>` : '')
      + (o.hasHints ? `<span class="obj-hint-key">H for a hint</span>` : '');
  }

  _showHint(text, index, total) {
    const el = this.el.hint;
    if (!el) return;
    el.hidden = false;
    el.innerHTML = `<span class="hint-label">Hint${index && total ? ` ${index}/${total}` : ''}</span>${text}`;
    clearTimeout(this._hintTimer);
    this._hintTimer = setTimeout(() => { el.hidden = true; }, 14000);
  }

  /** Appended by the Game once it has resolved where the hint is pointing. */
  _addHintLocation(where) {
    const el = this.el.hint;
    if (!el || el.hidden || !where) return;
    el.insertAdjacentHTML('beforeend', `<span class="hint-where">${where}</span>`);
  }

  _showReadout(r) {
    if (!r) { this.readout.classList.add('hidden'); return; }
    const lvl = r.level && r.level !== 'ok' ? r.level : '';
    this.readout.className = 'instrument-readout';
    this.readout.innerHTML = `
      <div class="ir-name">${r.name}</div>
      <div class="ir-value ${lvl}">${r.value}<span class="ir-unit">${r.unit || ''}</span></div>
      ${r.detail ? `<div class="ir-detail">${r.detail.join('<br>')}</div>` : ''}
      ${r.note ? `<div class="ir-note">${r.note}</div>` : ''}`;
    clearTimeout(this._readoutTimer);
    this._readoutTimer = setTimeout(() => this.readout.classList.add('hidden'), 12000);
  }

  /** Dismiss the current toast early (SPACE). */
  dismissToast() {
    const t = this.el.toast;
    if (!t || t.hidden) return false;
    clearTimeout(this._toastTimer);
    t.style.opacity = '0';
    setTimeout(() => { t.hidden = true; }, 250);
    return true;
  }

  toast(concept, text) {
    const t = this.el.toast;
    t.hidden = false;
    t.style.opacity = '1';
    t.innerHTML = `${concept ? `<span class="toast-concept">${concept}</span>` : ''}${text}`;
    clearTimeout(this._toastTimer);
    // Long enough to read a three-line casualty message without hurrying, and
    // dismissable with SPACE if you have already read it.
    this._toastTimer = setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => { t.hidden = true; }, 400);
    }, 13000);
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
      <span class="stat ${this.state.sonarNoiseFloor > 50 ? 'warn' : ''}">Self-noise <b>${s.selfNoise} dB</b></span>
      <span class="stat ${warnO2}">O₂ <b>${s.o2}%</b></span>
      <span class="stat ${warnCO2}">CO₂ <b>${s.co2}%</b></span>`;
    this._updateCasualty();
    this._updatePatrol();
  }

  /**
   * The patrol clock, the day, how long the watchstander has been awake, and how
   * far along the crossing they are. This is the slow layer of the game and it
   * needs somewhere permanent to live.
   */
  _updatePatrol() {
    const el = this.el.patrol;
    if (!el || !this.crew) return;
    const awake = this.crew.hoursAwake;
    const f = this.crew.fatigue01;
    const tired = awake >= 18;
    el.innerHTML = `
      <span class="hp-time">${this.crew.formatPatrolTime()}</span>
      <span class="hp-day">Patrol day ${this.crew.day}</span>
      <span class="hp-awake ${f > 0 ? 'bad' : tired ? 'warn' : ''}">${awake.toFixed(1)} h awake${
        f > 0 ? ' — get your head down' : ''}</span>
      ${this.voyage ? `<span class="hp-voyage">${(this.voyage.progress01 * 100).toFixed(1)}% across ·
        ${this.voyage.daysRemaining().toFixed(0)} days to landfall</span>` : ''}`;

    // Fatigue does not tell you you are tired; it makes the watch harder to read.
    const veil = this.el.veil;
    if (!veil) return;
    if (f <= 0) { veil.hidden = true; return; }
    veil.hidden = false;
    veil.style.backdropFilter = `blur(${(f * 4.5).toFixed(2)}px)`;
    veil.style.webkitBackdropFilter = veil.style.backdropFilter;
    veil.style.opacity = String(0.25 + f * 0.5);
  }

  /** A casualty banner appears only once the player has actually found the water. */
  _updateCasualty() {
    const el = this.el.casualty;
    if (!el) return;
    const src = this.state.floodingSources.find((f) => f.discovered);
    if (!src) { el.hidden = true; return; }
    const level = this.state.bilgeLevels[src.compartment] ?? 0;
    const rate = this.flooding?.riseRateCmPerMin(src.compartment) ?? 0;
    const rising = rate > 0.05;
    el.hidden = false;
    el.className = `hud-casualty ${rising ? 'rising' : 'falling'}`;
    el.innerHTML = `<span class="hc-title">Flooding — ${src.compartment.replace(/_/g, ' ')}</span>
      <span class="hc-level">${level.toFixed(0)} cm</span>
      <span class="hc-rate">${rate > 0 ? '+' : ''}${rate.toFixed(1)} cm/min</span>
      <span class="hc-state">${src.isolated ? 'isolated' : 'source open'}${src.repair?.holding ? ' · patched' : ''}</span>`;
  }
}
