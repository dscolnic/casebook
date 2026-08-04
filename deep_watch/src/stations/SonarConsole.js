import { SonarSystem, FREQ_MAP, DISPLAYS, CLASSES } from '../simulation/SonarSystem.js';
import { guideStrip, caption } from './StationGuide.js';

/**
 * SonarConsole — the sonar watch station.
 *
 * Four faces of one picture, and the point of the station is that they are not
 * four independent opinions: the broadband waterfall, the auto-detect list and
 * the bearing-time record all run off the same beamformer. The narrowband
 * analyser is a separate chain, and turning the boat is not a processing product
 * at all. When the player logs a classification they must say what they are
 * leaning on, and the console tells them if they have cited one measurement twice.
 *
 * Content lineage: Sonar Spy (`silent_watch_hunt_mvp.html`) for the harmonic
 * families and bearing history; Casebook (`nc_greywake_case`) for the shared-source
 * trap, moved from informant cards onto processing chains.
 */
export class SonarConsole {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.notebook = ctx.notebook;
    this.sonar = ctx.sonar;
    this._raf = null;
    this._t = 0;
    this._cited = new Set();
  }

  /** The next thing to do, worked out from the state of the picture. */
  _guide() {
    const audible = this._audible();
    const held = this.sonar ? this.sonar.tracks.size : 0;
    const unclassified = audible.filter((c) => !this.sonar?.tracks.get(c.id)?.classifiedAs);
    const loud = this.state.sonarNoiseFloor > 50;

    let doNow;
    if (loud) {
      doNow = `Our own boat is making ${Math.round(this.state.sonarNoiseFloor)} dB and that is drowning out anything weak. `
        + 'Secure machinery you do not need (Machinery Control) or slow down, then come back and look again.';
    } else if (held === 0) {
      doNow = `${audible.length} source${audible.length === 1 ? '' : 's'} on the display. Click one in the auto-detect list, then press <b>Designate</b> to start holding it as a track.`;
    } else if (unclassified.length) {
      const next = unclassified[0];
      doNow = `Track <b>${next.id}</b> has no call against it yet. Select it, read the narrowband analyser and the bearing history, then use <b>Classify</b> — and tick the displays your call actually rests on.`;
    } else {
      doNow = 'Every track is classified. Check that each call is backed by two displays on DIFFERENT chains, then report the picture to Control.';
    }

    return guideStrip({
      what: 'The sonar watch. You are listening, not looking: every source out there arrives as energy on a bearing, and it is your job to say what it is and how sure you are.',
      doNow,
      why: 'Three of these displays come from one beamformer. Two of them agreeing is one measurement shown twice — corroboration has to come from a different chain.',
      steps: [
        '1 · Quiet the boat enough to hear',
        '2 · Designate what you can hear as tracks',
        '3 · Classify each — or say Unknown if the signature will not carry it',
        '4 · Back each call with two INDEPENDENT displays',
      ],
      activeStep: loud ? 0 : held === 0 ? 1 : unclassified.length ? 2 : 3,
    });
  }

  render(container) {
    this.container = container;
    container.innerHTML = `
      <div id="sonar-guide"></div>
      <div class="console-grid" style="grid-template-columns: 2fr 1fr;">
        <div class="console-tile">
          <h4>Broadband Waterfall — Bearing × Time <span class="chain-tag">beamformer A</span></h4>
          <canvas class="waterfall-canvas" width="620" height="235"></canvas>
          ${caption('energy against bearing (000° to 360° left to right), newest at the top, scrolling down over time.',
            'the labelled arrows along the top — each one marks a track\'s column, so you can match a bearing in the list to a streak here. A wide fuzzy smear is usually our own boat.')}
          <div class="console-sub">Own-ship self-noise floor:
            <b id="sn-floor">${Math.round(this.state.sonarNoiseFloor)} dB</b><span id="sn-mask"></span></div>
        </div>
        <div class="console-tile">
          <h4>Auto-detect List <span class="chain-tag">beamformer A</span></h4>
          <div id="sonar-contacts"></div>
          ${caption('anything the detector thinks is above the noise, with its signal strength in dB.',
            'a strong number means a clear signal — it does NOT mean the contact is close or important.')}
        </div>
      </div>

      <div class="console-grid" style="grid-template-columns: 1fr 1fr; margin-top:14px;">
        <div class="console-tile">
          <h4>Narrowband Analyser <span class="chain-tag alt">analyser B</span></h4>
          <canvas class="btr-canvas" width="240" height="110"></canvas>
          <div class="console-sub" id="sonar-narrow-note"></div>
          ${caption('the discrete frequencies coming from the selected track.',
            'an evenly spaced FAMILY of lines means a turning propeller, and the spacing says what kind of ship. One lonely line means nothing yet. No lines at all means it is not a ship.')}
        </div>
        <div class="console-tile">
          <h4>Bearing-Time Record <span class="chain-tag">beamformer A</span></h4>
          <table class="bearing-table" id="bearing-table"></table>
          <div class="console-sub" id="bearing-note"></div>
          ${caption('how the bearing has moved while our own heading changed.',
            'if TRUE bearing stays put, it is out in the water. If RELATIVE bearing stays put while we turn, it is bolted to our own hull.')}
        </div>
      </div>

      <div class="console-grid" style="grid-template-columns: 1fr 1fr; margin-top:14px;">
        <div class="console-tile">
          <h4>Own-ship Noise Reference</h4>
          <div id="ownship-sources"></div>
          <div class="console-sub" style="margin-top:8px;">
            Running pumps and shaft rpm raise the floor and mask weak contacts — a quiet boat hears more.
          </div>
          <div id="anomaly-call" style="margin-top:10px;"></div>
        </div>
        <div class="console-tile">
          <h4>Classify the Selected Track</h4>
          <div id="classify-panel"></div>
        </div>
      </div>`;

    this.waterfall = container.querySelector('.waterfall-canvas');
    this.wctx = this.waterfall.getContext('2d');
    this.narrow = container.querySelector('.btr-canvas');
    this.nctx = this.narrow.getContext('2d');
    this.contactsEl = container.querySelector('#sonar-contacts');

    this._rebuild();
    this._loop();
  }

  _audible() { return this.sonar ? this.sonar.audible() : []; }

  _rebuild() {
    this.contacts = this._audible();
    if (!this.selected || !this.contacts.some((c) => c.id === this.selected.id)) {
      this.selected = this.contacts[0] ?? null;
    } else {
      this.selected = this.contacts.find((c) => c.id === this.selected.id);
    }
    const g = this.container?.querySelector('#sonar-guide');
    if (g) g.innerHTML = this._guide();
    this._renderContacts();
    this._renderBearingHistory();
    this._renderOwnShip();
    this._renderClassify();
  }

  /**
   * The evidence on the selected track, in sentences. The numbers are already on
   * the displays; what a trainee is missing is what those numbers MEAN, so this
   * says it out loud without ever naming the answer.
   */
  _evidenceSummary(c) {
    if (!c) return '';
    const rows = [];
    const q = this.sonar.tonalQuality(c);
    rows.push(q === 'family'
      ? ['Narrowband', 'a full family of evenly spaced lines — something with a turning propeller', 'good']
      : q === 'partial'
        ? ['Narrowband', 'one or two lines and no family — suggestive, but it will not name a class', 'warn']
        : q === 'broadband'
          ? ['Narrowband', 'no discrete lines at all — broad hiss. Not a propeller.', 'warn']
          : ['Narrowband', 'nothing resolvable above the noise', 'bad']);

    rows.push(c.internal
      ? ['Bearing', 'holds the same RELATIVE bearing while we turn — it is moving with the boat', 'warn']
      : Math.abs(c.bearingRate ?? 0) > 0.4
        ? [`Bearing`, `moving about ${Math.abs(c.bearingRate).toFixed(1)}° per minute — it is going somewhere`, 'good']
        : ['Bearing', 'nearly steady in true bearing — either far away, or heading at us', 'warn']);

    rows.push(['Strength', `${(c.snr ?? 0).toFixed(0)} dB above our own noise floor`,
      (c.snr ?? 0) > 12 ? 'good' : (c.snr ?? 0) > 5 ? 'warn' : 'bad']);
    rows.push(['Blade rate', c.bladeRate || 'not established', 'warn']);

    return `<div class="evidence-list">${rows.map(([k, v, s]) =>
      `<div class="ev-row"><span class="ev-key">${k}</span><span class="ev-val ${s}">${v}</span></div>`).join('')}</div>`;
  }

  _renderContacts() {
    if (!this.contacts.length) {
      this.contactsEl.innerHTML = '<div class="console-sub">No contacts held. The floor may be too high to hear anything weak.</div>';
      return;
    }
    this.contactsEl.innerHTML = `
      <table class="detect-table">
        <thead><tr><th>Track</th><th>Bearing</th><th>Rel</th><th>Strength</th><th>Call</th></tr></thead>
        <tbody>${this.contacts.map((c) => {
          const track = this.sonar?.tracks.get(c.id);
          const called = track?.classifiedAs;
          const cls = (called || 'unknown').toLowerCase().replace('biologics', 'biologic').replace('own-ship', 'ownship');
          const rel = c.internal
            ? String(c.relativeBearing).padStart(3, '0')
            : String(Math.round(((c.bearing - this.state.heading) % 360 + 360) % 360)).padStart(3, '0');
          return `<tr class="detect-row ${this.selected?.id === c.id ? 'selected' : ''}" data-id="${c.id}">
            <td class="dt-id">${c.id}</td>
            <td class="dt-brg">${Math.round(c.bearing).toString().padStart(3, '0')}°</td>
            <td class="dt-rel">${rel}°</td>
            <td>${(c.snr ?? 0).toFixed(0)} dB</td>
            <td class="cls-${['merchant', 'biologic', 'ownship', 'submarine', 'fishing'].includes(cls) ? cls : 'unknown'}">
              ${called || (track ? 'held, no call' : 'not held')}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <button class="station-btn" id="designate" style="margin-top:10px;" ${
        this.selected && !this.sonar?.tracks.has(this.selected.id) ? '' : 'disabled'}>
        Designate ${this.selected?.id ?? ''} as a track</button>`;

    this.contactsEl.querySelectorAll('.detect-row').forEach((row) => {
      row.addEventListener('click', () => {
        this.selected = this.contacts.find((c) => c.id === row.dataset.id);
        this._rebuild();
      });
    });
    this.contactsEl.querySelector('#designate')?.addEventListener('click', () => {
      if (!this.selected) return;
      this.sonar.designate(this.selected.id);
      this.notebook?.record({
        compartment: 'Sonar Room', instrument: 'Broadband / auto-detect',
        measurement: `${this.selected.id} designated · ${Math.round(this.selected.bearing)}° · ${(this.selected.snr ?? 0).toFixed(0)} dB`,
        observation: this.selected.note || 'Track designated.',
        clock: this.state.formatClock(), kind: 'observation', tag: 'sonar_track',
      });
      this._rebuild();
    });
  }

  /**
   * The decisive display for anything aboard: own-ship's head has wandered, so a
   * source in the water holds its TRUE bearing while a source aboard holds its
   * RELATIVE one.
   */
  _renderBearingHistory() {
    const note = this.container.querySelector('#sonar-narrow-note');
    if (note && this.selected) {
      const q = this.sonar.tonalQuality(this.selected);
      note.innerHTML = q === 'family'
        ? '<span class="cls-biologic">A family of lines. This is enough to name a class.</span>'
        : q === 'partial'
          ? '<span class="cls-merchant">One or two lines. Not a family — not enough to name anything.</span>'
          : q === 'broadband'
            ? '<span class="cls-ownship">Broad hiss, no lines. Flow noise, not machinery under way.</span>'
            : '<span class="cls-warship">Nothing resolvable. Quieten the boat and try again.</span>';
    }
    const table = this.container.querySelector('#bearing-table');
    const noteEl = this.container.querySelector('#bearing-note');
    if (!table) return;
    const c = this.selected;
    if (!c) { table.innerHTML = ''; noteEl.textContent = ''; return; }

    const track = this.sonar?.tracks.get(c.id);
    const rows = (track?.history?.length ? track.history.slice(-6) : this._syntheticHistory(c));
    table.innerHTML = `<thead><tr><th>Time</th><th>Own head</th><th>True brg</th><th>Rel brg</th></tr></thead><tbody>`
      + rows.map((r) => `<tr><td>${r.clock ?? '—'}</td>
        <td>${Math.round(r.ownHeading).toString().padStart(3, '0')}°</td>
        <td>${Math.round(r.trueBearing).toString().padStart(3, '0')}°</td>
        <td class="${c.internal ? 'cls-ownship' : ''}">${Math.round(r.relativeBearing).toString().padStart(3, '0')}°</td></tr>`).join('')
      + '</tbody>';

    const spanTrue = rows.length > 1 ? Math.abs(rows[rows.length - 1].trueBearing - rows[0].trueBearing) : 0;
    noteEl.textContent = c.internal
      ? 'Own-ship head has come round through this window. This track came round with it — the relative bearing has not moved a degree.'
      : spanTrue > 0.4
        ? `True bearing has moved ${spanTrue.toFixed(1)}° while own head changed. That is a real bearing rate: something out there is moving.`
        : 'True bearing steady while own head changes — the source is in the water, not aboard.';
  }

  /** Before a track is designated there is still a history to look at. */
  _syntheticHistory(c) {
    const out = [];
    const hdg = this.state.heading;
    for (let i = 5; i >= 0; i--) {
      const ownHeading = (hdg - i * 4 + 360) % 360;
      const trueBearing = c.internal
        ? (ownHeading + c.relativeBearing) % 360
        : (c.bearing - (c.bearingRate ?? 0) * i * 2 + 360) % 360;
      out.push({
        clock: '—', ownHeading, trueBearing,
        relativeBearing: ((trueBearing - ownHeading) % 360 + 360) % 360,
      });
    }
    return out;
  }

  _renderOwnShip() {
    const el = this.container.querySelector('#ownship-sources');
    if (!el) return;
    const s = this.state;
    const rows = [
      { name: 'shaft', v: `${Math.round(s.propulsionState.shaftRpm)} rpm`, warn: false },
      ...Object.entries(s.pumpStates).filter(([, p]) => p.on)
        .map(([id]) => ({ name: id.replace(/([A-Z])/g, ' $1').toLowerCase(), v: 'running · +3 dB', warn: true })),
      ...s.machineryNoiseSources.map((n) => ({
        name: n.label || n.id, v: `${n.level.toFixed(0)} dB @ ${Math.round(n.freqHz)} Hz`, warn: true })),
    ];
    el.innerHTML = rows.map((r) => `<div class="contact-row"><span>${r.name}</span>
      <span class="${r.warn ? 'cls-merchant' : 'cls-biologic'}">${r.v}</span></div>`).join('');

    // The quick own-ship call, used by the flooding mission's first objective.
    const call = this.container.querySelector('#anomaly-call');
    const anom = this.contacts.find((c) => c.internal);
    if (!call) return;
    if (!anom) {
      call.innerHTML = '<div class="console-sub">No unexplained broadband source on the bearing plot.</div>';
      return;
    }
    if (this._called) return;
    call.innerHTML = `<div class="console-sub">Track ${anom.id} is unexplained. Classify it:</div>
      <button class="station-btn" data-call="external">Contact in the water</button>
      <button class="station-btn" data-call="internal">Source aboard own-ship</button>`;
    call.querySelectorAll('[data-call]').forEach((b) => b.addEventListener('click', () => {
      const internal = b.dataset.call === 'internal';
      this._called = true;
      this.sonar?.designate(anom.id);
      this.sonar?.classify(anom.id, internal ? 'Own-ship' : 'Merchant', ['btr', 'narrowband']);
      this.notebook?.record({
        compartment: 'Sonar Room', instrument: 'Broadband / bearing history',
        measurement: `${anom.id} rel ${String(anom.relativeBearing).padStart(3, '0')}, ${(anom.snr ?? 0).toFixed(0)} dB`,
        observation: internal
          ? 'Constant relative bearing through a course change, no blade rate, no harmonic family: the source is aboard.'
          : 'Called as a contact in the water.',
        clock: this.state.formatClock(), kind: 'observation', tag: 'sonar_anomaly',
      });
      this.bus.emit('sonar:anomalyClassified', { internal, id: anom.id });
      call.innerHTML = internal
        ? '<div class="console-sub cls-ownship">Logged: source aboard own-ship. Broadband with no blade rate and a locked relative bearing is a flow noise, not a ship.</div>'
        : '<div class="console-sub cls-warship">Logged as an external contact — but nothing in the water holds a relative bearing through a course change. Look again at the bearing history.</div>';
      if (!internal) this._called = false;
    }));
  }

  /** Classification with an explicit statement of what the call rests on. */
  _renderClassify() {
    const el = this.container.querySelector('#classify-panel');
    if (!el) return;
    const c = this.selected;
    const track = c ? this.sonar?.tracks.get(c.id) : null;
    if (!c) { el.innerHTML = '<div class="console-sub">No track selected.</div>'; return; }
    if (!track) {
      el.innerHTML = `${this._evidenceSummary(c)}
        <div class="console-sub" style="margin-top:8px;">
          <b>Designate ${c.id} first.</b> A designated track gets a bearing history kept on it, and
          bearing history is most of what tells you what something is. A watch holds tracks, not blips.
        </div>`;
      return;
    }
    const quality = this.sonar.tonalQuality(c);
    el.innerHTML = `
      ${this._evidenceSummary(c)}
      <div class="console-sub" style="margin-top:8px;">Track <b>${c.id}</b> · narrowband shows
        <b class="${quality === 'family' ? 'cls-biologic' : quality === 'partial' ? 'cls-merchant' : 'cls-warship'}">
        ${quality === 'family' ? 'a full harmonic family' : quality === 'partial' ? 'one or two lines, no family' : 'no discrete lines'}</b>
        · ${c.bladeRate ?? ''}</div>
      <div class="settings-row" style="margin-top:8px;">
        <label for="cls-select">Call it</label>
        <select id="cls-select">${CLASSES.map((k) =>
          `<option value="${k}" ${track.classifiedAs === k ? 'selected' : ''}>${k}</option>`).join('')}</select>
      </div>
      <div class="console-sub" style="margin-top:10px;">
        <b>Cite what the call rests on.</b> Tick two whose chain tags are DIFFERENT — two things
        off <i>beamformer A</i> are one measurement, not two.
      </div>
      <div class="cite-list">${Object.entries(DISPLAYS).map(([id, d]) =>
        `<label class="cite-item"><input type="checkbox" data-cite="${id}" ${this._cited.has(id) ? 'checked' : ''}>
          <span>${d.name} <span class="chain-tag ${d.chain === 'analyser_B' ? 'alt' : d.chain === 'geometry' ? 'geo' : ''}">${d.chain.replace('_', ' ')}</span></span></label>`).join('')}
      </div>
      <button class="station-btn" id="log-class" style="margin-top:10px;">Log classification</button>
      <div id="class-feedback" class="console-sub" style="margin-top:8px;"></div>`;

    el.querySelectorAll('[data-cite]').forEach((b) => b.addEventListener('change', () => {
      if (b.checked) this._cited.add(b.dataset.cite); else this._cited.delete(b.dataset.cite);
    }));
    el.querySelector('#log-class').addEventListener('click', () => {
      const kind = el.querySelector('#cls-select').value;
      const res = this.sonar.classify(c.id, kind, [...this._cited]);
      const fb = el.querySelector('#class-feedback');
      const bits = [];
      if (res.shared) bits.push(`<span class="cls-warship">${res.shared}</span>`);
      if (!res.independent) bits.push('<span class="cls-merchant">This call rests on one processing chain. Corroborate it from a different one — or from the boat\'s own manoeuvre.</span>');
      if (res.independent && res.correct) bits.push('<span class="cls-biologic">Two independent chains agree, and the call fits the evidence.</span>');
      if (res.independent && !res.correct) {
        bits.push(res.quality === 'family'
          ? '<span class="cls-warship">Independent evidence, but it does not say this. Look at which harmonic family is actually there.</span>'
          : '<span class="cls-warship">There is not enough signature here to name a class. "Unknown" is a real answer.</span>');
      }
      fb.innerHTML = bits.join('<br>');
      this.notebook?.record({
        compartment: 'Sonar Room', instrument: 'Sonar classification',
        measurement: `${c.id} called ${kind}`,
        observation: `${res.independent ? 'Cited independent chains' : 'Cited one chain only'}: ${
          [...this._cited].map((d) => DISPLAYS[d].name).join(', ') || 'nothing'}.`,
        clock: this.state.formatClock(), kind: 'hypothesis', tag: 'sonar_class',
      });
      if (res.shared) {
        this.notebook?.addDependency({
          id: 'sonar_chain_A',
          title: 'Three sonar displays, one beamformer',
          displays: ['Broadband waterfall', 'Auto-detect list', 'Bearing-time record'],
          sharedSource: 'beamformer A',
          note: 'All three are renderings of one beam output. If the beamformer is wrong, all three are wrong together.',
          independent: 'the narrowband analyser (its own chain), and manoeuvring own-ship.',
        });
      }
      this._renderContacts();
    });
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
      mask.innerHTML = this.state.sonarNoiseFloor > 50
        ? ' — <span class="cls-warship">weak contacts are being masked</span>'
        : ' — <span class="cls-biologic">quiet enough to hold weak contacts</span>';
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  /**
   * The waterfall, with a bearing axis and the track IDs printed over their own
   * columns. Without those, the auto-detect list can say "S01 bears 312" and the
   * player still has no way to tell which streak that is — which is exactly the
   * gap a trainee falls into.
   *
   * Layout: a fixed marker strip at the top, the scrolling history in the middle,
   * and a labelled bearing scale at the bottom. Only the middle scrolls.
   */
  _drawWaterfall() {
    const ctx = this.wctx, w = this.waterfall.width, h = this.waterfall.height;
    const TOP = 15, AXIS = 20;
    const histTop = TOP, histH = h - TOP - AXIS;
    const bearingToX = (b) => (b / 360) * w;

    // Scroll only the history band.
    const img = ctx.getImageData(0, histTop, w, histH - 1);
    ctx.putImageData(img, 0, histTop + 1);
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, histTop, w, 1);

    const noise = Math.max(0, (this.state.sonarNoiseFloor - 40) / 30);
    for (let x = 0; x < w; x++) {
      if (Math.random() < 0.06 + noise * 0.15) {
        const g = 20 + Math.random() * 40;
        ctx.fillStyle = `rgb(${g * 0.4},${g},${g})`;
        ctx.fillRect(x, histTop, 1, 1);
      }
    }
    for (const c of this.contacts) {
      const x = Math.round(bearingToX(c.bearing));
      const bright = 110 + (c.confidence ?? 0.3) * 130 - noise * 50;
      const jitter = Math.round((Math.random() - 0.5) * 3);
      const width = c.internal ? 9 : 2;
      ctx.fillStyle = c.internal
        ? `rgba(216,162,74,${0.5 + Math.random() * 0.3})`
        : `rgb(${bright * 0.4},${bright},${bright})`;
      ctx.fillRect(x + jitter - (width >> 1), histTop, width, 1);
    }

    // Marker strip: which column is which track.
    ctx.fillStyle = '#071119';
    ctx.fillRect(0, 0, w, TOP);
    ctx.font = 'bold 10px "Courier New", monospace';
    ctx.textAlign = 'center';
    for (const c of this.contacts) {
      const x = bearingToX(c.bearing);
      const sel = this.selected?.id === c.id;
      const col = c.internal ? '#d8a24a' : sel ? '#3fb6c2' : '#8fd6de';
      // A guide line down the whole display for the selected track.
      if (sel) {
        ctx.strokeStyle = 'rgba(63,182,194,0.5)';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, TOP); ctx.lineTo(x, h - AXIS); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(x, TOP - 1); ctx.lineTo(x - 4, TOP - 6); ctx.lineTo(x + 4, TOP - 6);
      ctx.closePath(); ctx.fill();
      ctx.fillText(c.id, Math.max(14, Math.min(w - 14, x)), TOP - 7);
    }

    // Bearing scale.
    ctx.fillStyle = '#071119';
    ctx.fillRect(0, h - AXIS, w, AXIS);
    ctx.strokeStyle = '#2a3a44';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h - AXIS + 0.5); ctx.lineTo(w, h - AXIS + 0.5); ctx.stroke();
    for (let b = 0; b <= 360; b += 15) {
      const x = bearingToX(b);
      const major = b % 45 === 0;
      ctx.strokeStyle = major ? '#5d7482' : '#2a3a44';
      ctx.beginPath();
      ctx.moveTo(x, h - AXIS);
      ctx.lineTo(x, h - AXIS + (major ? 7 : 4));
      ctx.stroke();
      if (major && b < 360) {
        ctx.fillStyle = '#8ea0ad';
        ctx.font = '10px "Courier New", monospace';
        ctx.fillText(String(b).padStart(3, '0'), Math.max(12, Math.min(w - 12, x)), h - 4);
      }
    }
    ctx.textAlign = 'left';
  }

  _drawNarrowband() {
    const ctx = this.nctx, w = this.narrow.width, h = this.narrow.height;
    ctx.fillStyle = '#04090c';
    ctx.fillRect(0, 0, w, h);
    const c = this.selected;
    if (!c) return;
    const maxF = 200;
    if (c.internal) {
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
    const freqs = this.sonar ? this.sonar.tonalsFor(c) : (FREQ_MAP[c.truth] || []);
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
    const q = this.sonar ? this.sonar.tonalQuality(c) : 'family';
    ctx.fillText(q === 'family' ? `${freqs.length} lines — a family`
      : q === 'partial' ? `${freqs.length} line(s) — no family`
      : 'nothing above the floor', 6, 12);
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}

export { SonarSystem };
