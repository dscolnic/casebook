/**
 * ControlRoomPanel — helm, depth control, course/speed, trim & ballast, and the
 * status board. Lets the player order depth/heading/speed; the SubmarineState
 * eases the actual values toward the ordered ones (control authority falls at low
 * speed — a coupling the later depth-control mission relies on).
 */
export class ControlRoomPanel {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
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
          <div class="console-sub">${this._trimNote(s.trim)}</div>
          <div class="console-sub" style="margin-top:6px;">Buoyancy: <b>${s.buoyancyState}</b></div>
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

    this.container = container;
    this._loop();
  }

  _trimNote(t) {
    if (Math.abs(t) < 0.3) return 'On an even keel.';
    return t > 0 ? 'Bow-down trend.' : 'Bow-up trend.';
  }

  _statusLine() {
    const s = this.state;
    return `Depth-control effort ${(Math.abs(s.trim) * 20 + (10 - Math.min(10, s.speed)) * 4).toFixed(0)}% · `
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
    set('#cr-ohdg', Math.round(s.orderedHeading));
    set('#cr-trim', `${s.trim.toFixed(1)}°`);
    set('#cr-status', this._statusLine());
    this._raf = requestAnimationFrame(() => this._loop());
  }

  dispose() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; }
}
