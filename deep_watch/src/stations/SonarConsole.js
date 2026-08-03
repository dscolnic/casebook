/**
 * SonarConsole — the in-world sonar watch station: a live broadband waterfall
 * (bearing × time), a narrowband frequency strip, a contact list with
 * classification confidence, and the own-ship self-noise reference.
 *
 * Content lineage: contact types and per-type harmonic signatures are adapted
 * from Sonar Spy (`silent_watch_hunt_mvp.html`), specifically `freqMap`
 * (Submarine [46,92,138,185], Merchant [20,41,82,123,164], Fishing [28,57,79,
 * 109,149], Biologics [12,31,52]) and `bearingTo()`. Presented here as a real
 * console rather than an arcade waterfall — the reasoning (detect → classify from
 * an incomplete signature → use bearing history) is preserved.
 *
 * The console also carries the first symptom of an internal casualty. A source
 * that is aboard your own boat holds a CONSTANT RELATIVE bearing while the true
 * bearing swings with own-ship's head; a source in the water does the opposite.
 * That distinction is the whole of the first mission stage, and it is made here
 * out of bearing history rather than by a label.
 */
const FREQ_MAP = {
  Submarine: [46, 92, 138, 185],
  Merchant: [20, 41, 82, 123, 164],
  Fishing: [28, 57, 79, 109, 149],
  Biologics: [12, 31, 52],
  'Own-ship': [24, 48, 90, 120],
};

const DEFAULT_CONTACTS = [
  { id: 'S01', bearing: 312, type: 'Merchant', confidence: 0.7, note: 'Steady blade rate, slow bearing drift right.' },
  { id: 'S02', bearing: 47, type: 'Biologics', confidence: 0.55, note: 'Low-frequency chorus, no propulsion lines.' },
  { id: 'S03', bearing: 158, type: 'Unknown', confidence: 0.2, note: 'Faint; intermittent tonal near 90 Hz. Weak — masked easily by own-ship noise.' },
];

/** A contact this faint disappears once the boat gets loud enough. */
const FAINT_THRESHOLD_DB = 50;

export class SonarConsole {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.notebook = ctx.notebook;
    this._raf = null;
    this._t = 0;
  }

  /** Anything aboard shows up here with a bearing that does not move with own-ship. */
  _anomaly() {
    const flow = this.state.machineryNoiseSources.find((n) => n.id === 'flood_flow');
    if (!flow || flow.level < 1) return null;
    const relative = 15;
    return {
      id: 'N01',
      relativeBearing: relative,
      bearing: (this.state.heading + relative) % 360,
      type: 'Unknown',
      confidence: 0.35,
      level: flow.level,
      note: 'Broad, continuous, low-frequency. No blade rate, no harmonic family — this does not look like a ship.',
      internal: true,
    };
  }

  render(container) {
    this.container = container;
    const base = (this.state.contactTracks && this.state.contactTracks.length)
      ? this.state.contactTracks : DEFAULT_CONTACTS;
    this.baseContacts = base;

    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 2fr 1fr;">
        <div class="console-tile">
          <h4>Broadband Waterfall — Bearing × Time</h4>
          <canvas class="waterfall-canvas" width="520" height="220"></canvas>
          <div class="console-sub">Vertical streaks = steady bearings. Own-ship self-noise floor:
            <b id="sn-floor">${Math.round(this.state.sonarNoiseFloor)} dB</b>
            <span id="sn-mask"></span></div>
        </div>
        <div class="console-tile">
          <h4>Contact List</h4>
          <div id="sonar-contacts"></div>
          <h4 style="margin-top:14px;">Narrowband (selected)</h4>
          <canvas class="btr-canvas" width="240" height="110"></canvas>
          <div class="console-sub" id="sonar-narrow-note">Harmonic lines identify the source class.</div>
        </div>
      </div>
      <div class="console-grid" style="grid-template-columns: 1fr 1fr; margin-top:14px;">
        <div class="console-tile">
          <h4>Bearing history — selected track</h4>
          <table class="bearing-table" id="bearing-table"></table>
          <div class="console-sub" id="bearing-note"></div>
        </div>
        <div class="console-tile">
          <h4>Own-ship noise reference</h4>
          <div id="ownship-sources"></div>
          <div class="console-sub" style="margin-top:8px;">
            Running pumps and shaft rpm raise the floor and mask weak contacts — a quiet boat hears more.
          </div>
          <div id="anomaly-call" style="margin-top:10px;"></div>
        </div>
      </div>`;

    this.waterfall = container.querySelector('.waterfall-canvas');
    this.wctx = this.waterfall.getContext('2d');
    this.narrow = container.querySelector('.btr-canvas');
    this.nctx = this.narrow.getContext('2d');
    this.contactsEl = container.querySelector('#sonar-contacts');

    this._history = [];
    this._rebuild();
    this._loop();
  }

  _contacts() {
    const list = this.baseContacts.map((c) => ({ ...c }));
    const anom = this._anomaly();
    if (anom) list.unshift(anom);
    const masked = this.state.sonarNoiseFloor > FAINT_THRESHOLD_DB;
    return list.filter((c) => !(masked && (c.confidence ?? 1) < 0.3 && !c.internal));
  }

  _rebuild() {
    this.contacts = this._contacts();
    if (!this.selected || !this.contacts.some((c) => c.id === this.selected.id)) {
      this.selected = this.contacts[0];
    } else {
      this.selected = this.contacts.find((c) => c.id === this.selected.id);
    }
    this._renderContacts();
    this._renderBearingHistory();
    this._renderOwnShip();
  }

  _renderContacts() {
    this.contactsEl.innerHTML = this.contacts.map((c) => {
      const cls = c.internal ? 'ownship' : c.type.toLowerCase().replace('biologics', 'biologic');
      const conf = Math.round((c.confidence ?? 0) * 100);
      return `<div class="contact-row ${this.selected?.id === c.id ? 'selected' : ''}" data-id="${c.id}" style="cursor:pointer;">
        <span>${c.id} · ${Math.round(c.bearing)}°${c.internal ? ` <span class="console-sub">(rel ${c.relativeBearing.toString().padStart(3, '0')})</span>` : ''}</span>
        <span class="cls-${cls === 'unknown' ? 'unknown' : cls}">${c.internal ? 'Unclassified' : c.type} ${conf}%</span>
      </div>`;
    }).join('');
    this.contactsEl.querySelectorAll('.contact-row').forEach((row) => {
      row.addEventListener('click', () => {
        this.selected = this.contacts.find((c) => c.id === row.dataset.id);
        this._renderContacts();
        this._renderBearingHistory();
        const note = document.getElementById('sonar-narrow-note');
        if (note) note.textContent = this.selected?.note || '';
      });
    });
  }

  /**
   * The decisive display. Own-ship's head has wandered over the last few minutes;
   * a track's TRUE bearing follows it if the source is aboard, and stays put if
   * the source is out in the water.
   */
  _renderBearingHistory() {
    const table = this.container.querySelector('#bearing-table');
    const noteEl = this.container.querySelector('#bearing-note');
    if (!table || !this.selected) return;
    const c = this.selected;
    const heads = [];
    const hdg = this.state.heading;
    for (let i = 5; i >= 0; i--) heads.push({ minsAgo: i * 2, heading: (hdg - i * 4 + 360) % 360 });

    const rows = heads.map((h) => {
      const trueB = c.internal
        ? (h.heading + c.relativeBearing) % 360
        : c.bearing;
      const relB = c.internal ? c.relativeBearing : ((c.bearing - h.heading + 360) % 360);
      return `<tr><td>-${h.minsAgo} min</td><td>${Math.round(h.heading).toString().padStart(3, '0')}°</td>
        <td>${Math.round(trueB).toString().padStart(3, '0')}°</td>
        <td class="${c.internal ? 'cls-ownship' : ''}">${Math.round(relB).toString().padStart(3, '0')}°</td></tr>`;
    }).join('');
    table.innerHTML = `<thead><tr><th>Time</th><th>Own head</th><th>True brg</th><th>Rel brg</th></tr></thead><tbody>${rows}</tbody>`;
    noteEl.textContent = c.internal
      ? 'Own-ship head has come round 20° in ten minutes. This track came round with it — the relative bearing has not moved a degree.'
      : 'This track holds its true bearing while own-ship head changes.';
  }

  _renderOwnShip() {
    const el = this.container.querySelector('#ownship-sources');
    if (!el) return;
    const s = this.state;
    const rows = [
      { name: 'Shaft', v: `${Math.round(s.propulsionState.shaftRpm)} rpm`, warn: false },
      ...Object.entries(s.pumpStates).filter(([, p]) => p.on)
        .map(([id, p]) => ({ name: id.replace(/([A-Z])/g, ' $1').toLowerCase(), v: `running · +3 dB`, warn: true })),
      ...s.machineryNoiseSources.map((n) => ({
        name: n.label || n.id, v: `${n.level.toFixed(0)} dB @ ${Math.round(n.freqHz)} Hz`, warn: true,
      })),
    ];
    el.innerHTML = rows.map((r) => `<div class="contact-row"><span>${r.name}</span>
      <span class="${r.warn ? 'cls-merchant' : 'cls-biologic'}">${r.v}</span></div>`).join('');

    const call = this.container.querySelector('#anomaly-call');
    const anom = this._anomaly();
    if (!call) return;
    if (!anom) {
      call.innerHTML = '<div class="console-sub">No unexplained broadband source on the bearing plot.</div>';
      return;
    }
    if (this._called) return;
    call.innerHTML = `<div class="console-sub">Track N01 is unexplained. Classify it:</div>
      <button class="station-btn" data-call="external">Contact in the water</button>
      <button class="station-btn" data-call="internal">Source aboard own-ship</button>`;
    call.querySelectorAll('[data-call]').forEach((b) => b.addEventListener('click', () => {
      const internal = b.dataset.call === 'internal';
      this._called = true;
      this.notebook?.record({
        compartment: 'Sonar Room', instrument: 'Broadband / bearing history',
        measurement: `N01 rel ${anom.relativeBearing.toString().padStart(3, '0')}, ${anom.level.toFixed(0)} dB`,
        observation: internal
          ? 'Constant relative bearing through a 20° course change, no blade rate, no harmonic family: the source is aboard.'
          : 'Called as a contact in the water.',
        clock: this.state.formatClock(), kind: 'observation', tag: 'sonar_anomaly',
      });
      this.bus.emit('sonar:anomalyClassified', { internal, id: 'N01' });
      call.innerHTML = internal
        ? `<div class="console-sub cls-ownship">Logged: source aboard own-ship. Broadband with no blade rate and a locked relative bearing is a flow noise, not a ship.</div>`
        : `<div class="console-sub cls-warship">Logged as an external contact — but nothing in the water holds a relative bearing through a course change. Look again at the bearing history.</div>`;
      if (!internal) this._called = false;
    }));
  }

  _loop() {
    this._t += 1;
    if (this._t % 30 === 0) this._rebuild();
    this._drawWaterfall();
    this._drawNarrowband();
    const floor = this.container?.querySelector('#sn-floor');
    if (floor) floor.textContent = `${Math.round(this.state.sonarNoiseFloor)} dB`;
    const mask = this.container?.querySelector('#sn-mask');
    if (mask) {
      mask.innerHTML = this.state.sonarNoiseFloor > FAINT_THRESHOLD_DB
        ? ' — <span class="cls-warship">weak contacts are being masked</span>'
        : ' — <span class="cls-biologic">quiet enough to hold weak contacts</span>';
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _drawWaterfall() {
    const ctx = this.wctx, w = this.waterfall.width, h = this.waterfall.height;
    const img = ctx.getImageData(0, 0, w, h - 1);
    ctx.putImageData(img, 0, 1);
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, 1);
    const noise = (this.state.sonarNoiseFloor - 40) / 30;
    for (let x = 0; x < w; x++) {
      if (Math.random() < 0.06 + noise * 0.15) {
        const g = 20 + Math.random() * 40;
        ctx.fillStyle = `rgb(${g * 0.4},${g},${g})`;
        ctx.fillRect(x, 0, 1, 1);
      }
    }
    for (const c of this.contacts) {
      const x = Math.round((c.bearing / 360) * w);
      const bright = 120 + (c.confidence ?? 0.3) * 120 - noise * 60;
      const jitter = Math.round((Math.random() - 0.5) * 3);
      // An internal flow noise smears across bearing instead of being a clean line.
      const width = c.internal ? 9 : 2;
      ctx.fillStyle = c.internal
        ? `rgba(216,162,74,${0.5 + Math.random() * 0.3})`
        : `rgb(${bright * 0.4},${bright},${bright})`;
      ctx.fillRect(x + jitter - (width >> 1), 0, width, 1);
    }
    ctx.fillStyle = '#2a3a44';
    for (let b = 0; b <= 360; b += 90) ctx.fillRect((b / 360) * w, h - 3, 1, 3);
  }

  _drawNarrowband() {
    const ctx = this.nctx, w = this.narrow.width, h = this.narrow.height;
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, h);
    const c = this.selected;
    const maxF = 200;
    if (c?.internal) {
      // Broadband hash: no harmonic family at all. That absence is the evidence.
      ctx.fillStyle = 'rgba(216,162,74,0.5)';
      for (let x = 0; x < w; x++) {
        const amp = (h - 26) * (0.35 + 0.3 * Math.sin(x * 0.06 + this._t * 0.03)) * (0.6 + Math.random() * 0.4);
        ctx.fillRect(x, h - amp, 1, amp);
      }
      ctx.fillStyle = '#8ea0ad';
      ctx.font = '10px monospace';
      ctx.fillText('no discrete lines — broadband', 6, 12);
      return;
    }
    const freqs = FREQ_MAP[c?.type] || [];
    ctx.strokeStyle = '#3fb6c2';
    for (const f of freqs) {
      const x = (f / maxF) * w;
      const wobble = Math.sin(this._t * 0.1 + f) * 3;
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x, 20 + wobble);
      ctx.stroke();
    }
    ctx.fillStyle = '#8ea0ad';
    ctx.font = '10px monospace';
    ctx.fillText(c?.type ? `${c.type} tonals` : 'no selection', 6, 12);
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
