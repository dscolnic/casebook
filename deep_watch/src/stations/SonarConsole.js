/**
 * SonarConsole — the in-world sonar watch station. Renders a live broadband
 * waterfall (bearing × time), a narrowband frequency strip, a bearing-time
 * history, and a contact list with classification confidence.
 *
 * Content lineage: contact types and per-type harmonic signatures are adapted
 * from Sonar Spy (`silent_watch_hunt_mvp.html`), specifically `freqMap`
 * (Submarine [46,92,138,185], Merchant [20,41,82,123,164], Fishing [28,57,79,
 * 109,149], Biologics [12,31,52]) and `bearingTo()`. Presented here as a real
 * console rather than an arcade waterfall — the reasoning (detect → classify from
 * incomplete signature → use bearing history) is preserved.
 */
const FREQ_MAP = {
  Submarine: [46, 92, 138, 185],
  Merchant: [20, 41, 82, 123, 164],
  Fishing: [28, 57, 79, 109, 149],
  Biologics: [12, 31, 52],
};

// A small default picture so the station is populated even before a mission
// seeds contactTracks. Bearings are relative to own-ship.
const DEFAULT_CONTACTS = [
  { id: 'S01', bearing: 312, type: 'Merchant', confidence: 0.7, note: 'Steady blade rate, slow bearing drift right.' },
  { id: 'S02', bearing: 47, type: 'Biologics', confidence: 0.55, note: 'Low-frequency chorus, no propulsion lines.' },
  { id: 'S03', bearing: 158, type: 'Unknown', confidence: 0.2, note: 'Faint; intermittent tonal near 90 Hz.' },
];

export class SonarConsole {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this._raf = null;
    this._t = 0;
  }

  render(container) {
    const contacts = (this.state.contactTracks && this.state.contactTracks.length)
      ? this.state.contactTracks : DEFAULT_CONTACTS;

    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 2fr 1fr;">
        <div class="console-tile">
          <h4>Broadband Waterfall — Bearing × Time</h4>
          <canvas class="waterfall-canvas" width="520" height="220"></canvas>
          <div class="console-sub">Vertical streaks = steady bearings (contacts). Own-ship self-noise floor: <b>${Math.round(this.state.sonarNoiseFloor)} dB</b>.</div>
        </div>
        <div class="console-tile">
          <h4>Contact List</h4>
          <div id="sonar-contacts"></div>
          <h4 style="margin-top:14px;">Narrowband (selected)</h4>
          <canvas class="btr-canvas" width="240" height="110"></canvas>
          <div class="console-sub" id="sonar-narrow-note">Harmonic lines identify the source class.</div>
        </div>
      </div>
      <div style="margin-top:12px;" class="console-sub">
        Own-ship reference: running pumps and shaft rpm raise the noise floor and can mask weak contacts —
        a quiet boat hears more.
      </div>`;

    this.waterfall = container.querySelector('.waterfall-canvas');
    this.wctx = this.waterfall.getContext('2d');
    this.narrow = container.querySelector('.btr-canvas');
    this.nctx = this.narrow.getContext('2d');
    this.contactsEl = container.querySelector('#sonar-contacts');
    this.contacts = contacts;
    this.selected = contacts[0];

    this._renderContacts();
    this._loop();
  }

  _renderContacts() {
    this.contactsEl.innerHTML = this.contacts.map((c) => {
      const cls = c.type.toLowerCase().replace('biologics', 'biologic');
      const conf = Math.round((c.confidence ?? 0) * 100);
      return `<div class="contact-row" data-id="${c.id}" style="cursor:pointer;">
        <span>${c.id} · ${Math.round(c.bearing)}°</span>
        <span class="cls-${cls === 'unknown' ? 'unknown' : cls}">${c.type} ${conf}%</span>
      </div>`;
    }).join('');
    this.contactsEl.querySelectorAll('.contact-row').forEach((row) => {
      row.addEventListener('click', () => {
        this.selected = this.contacts.find((c) => c.id === row.dataset.id);
        const note = document.getElementById('sonar-narrow-note');
        if (note) note.textContent = this.selected.note || '';
      });
    });
  }

  _loop() {
    this._t += 1;
    this._drawWaterfall();
    this._drawNarrowband();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _drawWaterfall() {
    const ctx = this.wctx, w = this.waterfall.width, h = this.waterfall.height;
    // Scroll down by 1px: copy existing image and shift.
    const img = ctx.getImageData(0, 0, w, h - 1);
    ctx.putImageData(img, 0, 1);
    // New top row: noise + bright pixels at each contact bearing.
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, 1);
    const noise = (this.state.sonarNoiseFloor - 40) / 30; // 0..1 masking
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
      ctx.fillStyle = `rgb(${bright * 0.4},${bright},${bright})`;
      ctx.fillRect(x + jitter, 0, 2, 1);
    }
    // Bearing scale.
    ctx.fillStyle = '#2a3a44';
    for (let b = 0; b <= 360; b += 90) {
      const x = (b / 360) * w;
      ctx.fillRect(x, h - 3, 1, 3);
    }
  }

  _drawNarrowband() {
    const ctx = this.nctx, w = this.narrow.width, h = this.narrow.height;
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, h);
    const type = this.selected?.type;
    const freqs = FREQ_MAP[type] || [];
    ctx.strokeStyle = '#3fb6c2';
    ctx.fillStyle = '#3fb6c2';
    const maxF = 200;
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
    ctx.fillText(type ? `${type} tonals` : 'no selection', 6, 12);
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
