/**
 * ControlRoomPanel — helm, depth control, course/speed, trim & ballast, and the
 * status board. Orders here set the ordered values; `SubmarineState.integrate()`
 * eases the actual values toward them with an authority that falls off at low
 * speed.
 *
 * It is also where a casualty is first visible to the watch: depth creeping past
 * the ordered depth with the planes doing nothing unusual, trim going bow-down,
 * speed steady, ballast on plan. Those four together say "the boat is getting
 * heavier forward" without naming why — which is the point. The player logs them
 * into the notebook as evidence and takes them to the plotting board.
 */
export class ControlRoomPanel {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.notebook = ctx.notebook;
    this._raf = null;
  }

  render(container) {
    const s = this.state;
    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(3,1fr);">
        <div class="console-tile">
          <h4>Depth</h4>
          <div class="console-readout" id="cr-depth">${Math.round(s.depth)} m</div>
          <div class="console-sub">Ordered <b id="cr-odepth">${Math.round(s.orderedDepth)}</b> m · rate <span id="cr-rate">${s.verticalRate.toFixed(1)}</span> m/min</div>
          <div style="margin-top:8px;">
            <button class="station-btn" data-depth="-20">Shallower 20</button>
            <button class="station-btn" data-depth="20">Deeper 20</button>
          </div>
        </div>
        <div class="console-tile">
          <h4>Course &amp; Speed</h4>
          <div class="console-readout"><span id="cr-hdg">${Math.round(s.heading)}</span>° · <span id="cr-spd">${s.speed.toFixed(1)}</span> kn</div>
          <div class="console-sub">Ordered heading <b id="cr-ohdg">${Math.round(s.orderedHeading)}</b>°</div>
          <div style="margin-top:8px;">
            <button class="station-btn" data-hdg="-10">Port 10</button>
            <button class="station-btn" data-hdg="10">Stbd 10</button>
            <button class="station-btn" data-spd="-2">Slow</button>
            <button class="station-btn" data-spd="2">Ahead</button>
          </div>
        </div>
        <div class="console-tile">
          <h4>Trim &amp; Ballast</h4>
          <div class="console-readout" id="cr-trim">${s.trim.toFixed(1)}°</div>
          <div class="console-sub" id="cr-trimnote">${this._trimNote(s.trim)}</div>
          <div class="console-sub" style="margin-top:6px;">Buoyancy: <b>${s.buoyancyState}</b></div>
        </div>

        <div class="console-tile" style="grid-column: span 3;">
          <h4>Watch indications</h4>
          <div id="cr-indications"></div>
          <button class="station-btn" id="cr-log" style="margin-top:10px;">Log these indications in the notebook</button>
          <button class="station-btn" id="cr-report">Report a casualty to damage control</button>
        </div>
        <div class="console-tile" style="grid-column: span 3;">
          <h4>Status Board</h4>
          <div class="console-sub" id="cr-status">${this._statusLine()}</div>
        </div>
      </div>`;

    container.querySelectorAll('[data-depth]').forEach((b) =>
      b.addEventListener('click', () => { s.orderedDepth = Math.max(20, s.orderedDepth + +b.dataset.depth); }));
    container.querySelectorAll('[data-hdg]').forEach((b) =>
      b.addEventListener('click', () => { s.orderedHeading = (s.orderedHeading + +b.dataset.hdg + 360) % 360; }));
    container.querySelectorAll('[data-spd]').forEach((b) =>
      b.addEventListener('click', () => { s.speed = Math.max(0, Math.min(20, s.speed + +b.dataset.spd)); }));

    container.querySelector('#cr-log').addEventListener('click', () => this._log());
    container.querySelector('#cr-report').addEventListener('click', () => {
      this.bus.emit('interact:comms', { id: 'control_report', data: { circuit: 'control' } });
    });

    this.container = container;
    this._renderIndications();
    this._loop();
  }

  _indications() {
    const s = this.state;
    const flooded = s.floodMass_t > 0.2;
    const alarm = (s.bilgeLevels.forward_equipment ?? 0) > 5;
    return [
      { name: 'Depth', v: `${s.depth.toFixed(1)} m against ${Math.round(s.orderedDepth)} m ordered`,
        odd: s.depth > s.orderedDepth + 1.5, why: 'making depth with nothing ordered' },
      { name: 'Planes', v: 'commanded and responding normally', odd: false, why: '' },
      { name: 'Speed', v: `${s.speed.toFixed(1)} kn, steady`, odd: false, why: '' },
      { name: 'Trim', v: `${s.trim.toFixed(2)}° ${s.trim > 0 ? 'bow-down' : 'bow-up'}`,
        odd: Math.abs(s.trim) > 0.3, why: 'weight coming on forward' },
      { name: 'Depth-control effort', v: `${Math.round(s.depthControlEffort())} %`,
        odd: s.depthControlEffort() > 30, why: 'the planes are working to hold depth' },
      { name: 'Main ballast', v: 'all tanks on plan; no transfer ordered', odd: false, why: '' },
      { name: 'Bilge alarm repeat (fwd)', v: alarm ? 'FWD EQUIP BILGE — ALARM' : 'no alarms',
        odd: alarm, why: 'one channel from one sensor' },
      { name: 'Compensating', v: flooded && s.compensatedMass_t > 0 ? `trim pump running, ${s.compensatedMass_t.toFixed(1)} t compensated` : 'not compensating', odd: false, why: '' },
    ];
  }

  _renderIndications() {
    const el = this.container?.querySelector('#cr-indications');
    if (!el) return;
    el.innerHTML = this._indications().map((i) => `<div class="contact-row">
      <span>${i.name}</span>
      <span class="${i.odd ? 'cls-merchant' : 'cls-biologic'}">${i.v}${i.odd && i.why ? ` <span class="console-sub">— ${i.why}</span>` : ''}</span>
    </div>`).join('');
  }

  _log() {
    const ind = this._indications();
    this.notebook?.record({
      compartment: 'Control Room',
      instrument: 'Ship control indications',
      measurement: `${this.state.depth.toFixed(1)} m / trim ${this.state.trim.toFixed(2)}° / effort ${Math.round(this.state.depthControlEffort())}%`,
      observation: 'Depth increasing with nothing ordered, bow-down trim increasing, planes and speed normal, ballast on plan. The boat is getting heavier forward.',
      detail: ind.map((i) => `${i.name}: ${i.v}`),
      clock: this.state.formatClock(), kind: 'observation', tag: 'control_indications',
    });
    // Casebook: two indications that look independent but are not.
    this.notebook?.addDependency({
      id: 'bilge_level_chain',
      title: 'Forward bilge level — two indications, one sensor',
      displays: ['Bilge alarm panel (control)', 'Forward bilge level repeat'],
      sharedSource: 'the same float switch in the forward bilge',
      note: 'Both of these light from one sensor. Two agreeing displays are one measurement repeated — they cannot confirm each other.',
      independent: 'a physical sounding with the tape, and the salinity of the water itself.',
    });
    this.bus.emit('control:indicationsLogged', { trim: this.state.trim, depth: this.state.depth });
    this.bus.emit('hud:toast', {
      concept: 'Indications logged',
      text: 'Depth making with nothing ordered, bow-down trim, planes and speed normal, ballast on plan. Note the bilge alarm and its repeat come off one sensor — that is one measurement, not two.',
    });
  }

  _trimNote(t) {
    if (Math.abs(t) < 0.3) return 'On an even keel.';
    return t > 0 ? 'Bow-down trend.' : 'Bow-up trend.';
  }

  _statusLine() {
    const s = this.state;
    return `Depth-control effort ${Math.round(s.depthControlEffort())}% · `
      + `embarked water ${s.floodMass_t.toFixed(1)} t · `
      + `self-noise ${Math.round(s.sonarNoiseFloor)} dB · O₂ ${s.oxygenLevel.toFixed(1)}%`;
  }

  _loop() {
    const s = this.state;
    const set = (id, v) => { const el = this.container?.querySelector(id); if (el) el.textContent = v; };
    set('#cr-depth', `${Math.round(s.depth)} m`);
    set('#cr-odepth', Math.round(s.orderedDepth));
    set('#cr-rate', s.verticalRate.toFixed(1));
    set('#cr-hdg', Math.round(s.heading));
    set('#cr-spd', s.speed.toFixed(1));
    set('#cr-ohdg', Math.round(s.orderedHeading));
    set('#cr-trim', `${s.trim.toFixed(1)}°`);
    set('#cr-trimnote', this._trimNote(s.trim));
    set('#cr-status', this._statusLine());
    this._renderIndications();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  dispose() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; }
}
