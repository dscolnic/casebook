import { BILGE_AREA, FLOOD_HYPOTHESES, CORRECT_HYPOTHESIS, VALVES } from '../simulation/FloodingSystem.js';
import { SOUNDING_INTERVAL_MIN } from '../instruments/InstrumentManager.js';

/**
 * DamageControlBoard — the plotting board in the forward space. Three faces:
 *
 *  ESTIMATE     Ballpark, rebuilt as a real DC calculation. Two independent
 *               routes to the inflow (a measured bilge rise, and head × hole
 *               area) and the pump capacity you actually have. Source lineage:
 *               ballpark.html / `nc_bp_depth` — order-of-magnitude reasoning,
 *               choosing the values that matter, combining factors, accepting a
 *               range rather than one exact number.
 *
 *  DIAGNOSIS    The Diagnosis panel, distributed. Source lineage:
 *               navy_course_package/diagnosis/nc_flooding_playable.html,
 *               pack `nc_flooding_diag`. The candidate faults are the pack's
 *               hypotheses; the evidence rows are readings the player physically
 *               took somewhere in the boat, not gauges on one screen. Calling a
 *               fault you have not gathered evidence for is allowed — and the
 *               board tells you how thin the call is.
 *
 *  BOUNDARIES   Which valves bound the branch, and what else depends on them.
 *               You are meant to read this BEFORE you shut anything.
 */
const G = 9.81;
const BORES = [
  { mm: 25, label: '25 mm (1")' },
  { mm: 40, label: '40 mm (1½")' },
  { mm: 65, label: '65 mm (2½")' },
  { mm: 100, label: '100 mm (4")' },
];
const OPENINGS = [
  { f: 0.125, label: 'hairline split — ⅛ of the bore' },
  { f: 0.25, label: 'open crack — ¼ of the bore' },
  { f: 0.5, label: 'half the pipe section' },
  { f: 1.0, label: 'full-bore separation' },
];

export class DamageControlBoard {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.instruments = ctx.instruments;
    this.notebook = ctx.notebook;
    this.flooding = ctx.flooding;
    this.tab = ctx.boardTab || 'estimate';
    this.bore = 65;
    this.openFrac = 0.25;
  }

  render(container) {
    this.container = container;
    container.innerHTML = `
      <div class="tab-row">
        <button class="station-btn" data-tab="estimate">Estimate</button>
        <button class="station-btn" data-tab="diagnosis">Diagnosis</button>
        <button class="station-btn" data-tab="boundaries">System boundaries</button>
      </div>
      <div id="board-body"></div>`;
    container.querySelectorAll('[data-tab]').forEach((b) =>
      b.addEventListener('click', () => { this.tab = b.dataset.tab; this._renderTab(); }));
    this._renderTab();
  }

  _renderTab() {
    this.container.querySelectorAll('[data-tab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.tab === this.tab));
    const body = this.container.querySelector('#board-body');
    if (this.tab === 'estimate') this._renderEstimate(body);
    else if (this.tab === 'diagnosis') this._renderDiagnosis(body);
    else this._renderBoundaries(body);
  }

  // ================= ESTIMATE =================
  _soundings() {
    return (this.instruments?.readingsTagged('sounding') ?? [])
      .filter((r) => r.compartment === 'forward_equipment');
  }

  _renderEstimate(body) {
    const soundings = this._soundings();
    const area = BILGE_AREA.forward_equipment;
    const pumps = this._pumpRows();
    const capacity = pumps.reduce((s, p) => s + (p.available ? p.cap : 0), 0);

    if (soundings.length < 2) {
      body.innerHTML = `
        <div class="console-tile">
          <h4>Rate of rise</h4>
          <div class="console-sub">
            You have ${soundings.length} sounding${soundings.length === 1 ? '' : 's'} of the forward bilge.
            A rate needs two: sound the bilge, wait, and sound it again. The tape is the independent
            measurement — the panel alarm is not.
          </div>
        </div>
        ${this._pumpTile(pumps, capacity)}`;
      return;
    }

    const opts = soundings.map((r, i) =>
      `<option value="${i}">${r.clock} — ${r.numeric.toFixed(1)} cm</option>`).join('');
    body.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="console-tile">
          <h4>Route A — measured rise</h4>
          <div class="settings-row"><label>First sounding</label>
            <select id="est-a">${opts}</select></div>
          <div class="settings-row"><label>Second sounding</label>
            <select id="est-b">${opts}</select></div>
          <div class="console-sub">Forward bilge plan area: <b>${area} m²</b></div>
          <div class="console-readout" id="est-a-out">—</div>
          <div class="console-sub" id="est-a-work"></div>
        </div>
        <div class="console-tile">
          <h4>Route B — head and hole</h4>
          <div class="settings-row"><label>Line bore</label>
            <select id="est-bore">${BORES.map((b) => `<option value="${b.mm}" ${b.mm === this.bore ? 'selected' : ''}>${b.label}</option>`).join('')}</select></div>
          <div class="settings-row"><label>Opening</label>
            <select id="est-open">${OPENINGS.map((o) => `<option value="${o.f}" ${o.f === this.openFrac ? 'selected' : ''}>${o.label}</option>`).join('')}</select></div>
          <div class="console-sub">Sea pressure head at <b>${Math.round(this.state.depth)} m</b>.</div>
          <div class="console-readout" id="est-b-out">—</div>
          <div class="console-sub" id="est-b-work"></div>
        </div>
      </div>
      ${this._pumpTile(pumps, capacity)}
      <div class="console-tile" style="margin-top:14px;">
        <h4>The call</h4>
        <div class="console-sub" id="est-verdict-note">Two independent routes that agree are worth more than one exact number.</div>
        <div style="margin-top:10px;">
          <button class="station-btn" data-verdict="hold">Dewatering can hold this — keep pumping</button>
          <button class="station-btn" data-verdict="cannot">Dewatering cannot hold this — stop the source</button>
        </div>
      </div>`;

    const selA = body.querySelector('#est-a'), selB = body.querySelector('#est-b');
    selA.value = '0';
    selB.value = String(soundings.length - 1);
    const recalcA = () => {
      const a = soundings[+selA.value], b = soundings[+selB.value];
      const dt = b.minutes - a.minutes;
      const dl = b.numeric - a.numeric;
      const out = body.querySelector('#est-a-out'), work = body.querySelector('#est-a-work');
      if (dt < SOUNDING_INTERVAL_MIN) {
        out.textContent = '—';
        work.textContent = `Those two soundings are only ${Math.round(Math.max(0, dt) * 60)} s apart — too close to divide by. Sound the bilge again after about ${Math.round(SOUNDING_INTERVAL_MIN * 60)} s.`;
        this._routeA = null;
        return;
      }
      const rate = dl / dt;                       // cm/min
      const q = (rate / 100) * area * 60;         // m³/h
      this._routeA = q;
      out.textContent = `${q >= 0 ? '' : '−'}${Math.abs(q).toFixed(0)} m³/h`;
      work.innerHTML = `${dl >= 0 ? '+' : ''}${dl.toFixed(1)} cm in ${dt.toFixed(1)} min `
        + `= ${rate.toFixed(1)} cm/min × ${area} m² × 60 = <b>${q.toFixed(0)} m³/h</b> ${q < 0 ? 'net (the level is falling)' : 'net into the bilge'}.`;
      this._updateVerdictNote(body, capacity);
    };
    const recalcB = () => {
      this.bore = +body.querySelector('#est-bore').value;
      this.openFrac = +body.querySelector('#est-open').value;
      const bore_m = this.bore / 1000;
      const areaHole = Math.PI * (bore_m / 2) ** 2 * this.openFrac;
      const v = Math.sqrt(2 * G * this.state.depth);
      const q = 0.62 * areaHole * v * 3600;
      this._routeB = q;
      body.querySelector('#est-b-out').textContent = `${q.toFixed(0)} m³/h`;
      body.querySelector('#est-b-work').innerHTML =
        `v = √(2 × 9.81 × ${Math.round(this.state.depth)}) = <b>${v.toFixed(0)} m/s</b>; `
        + `hole ≈ ${(areaHole * 1e4).toFixed(1)} cm²; Q ≈ 0.62 × A × v = <b>${q.toFixed(0)} m³/h</b>.`;
      this._updateVerdictNote(body, capacity);
    };
    selA.addEventListener('change', recalcA);
    selB.addEventListener('change', recalcA);
    body.querySelector('#est-bore').addEventListener('change', recalcB);
    body.querySelector('#est-open').addEventListener('change', recalcB);
    recalcA(); recalcB();

    body.querySelectorAll('[data-verdict]').forEach((b) => b.addEventListener('click', () => {
      const verdict = b.dataset.verdict;
      const inflow = this._routeA != null && this._routeA > 0
        ? (this._routeB != null ? (this._routeA + this._routeB) / 2 : this._routeA)
        : (this._routeB ?? 0);
      const trueInflow = this.flooding.totalInflow('forward_equipment');
      const withinRange = Math.abs(inflow - trueInflow) <= trueInflow * 0.45;
      const correct = verdict === 'cannot';
      this.notebook?.record({
        compartment: 'Forward Equipment & Handling',
        instrument: 'DC plotting board',
        measurement: `${inflow.toFixed(0)} m³/h in vs ${capacity.toFixed(0)} m³/h out`,
        observation: correct
          ? 'Estimated inflow exceeds every pump available. Dewatering alone cannot stabilise this — the source has to be stopped.'
          : 'Called that dewatering could hold the casualty.',
        clock: this.state.formatClock(),
        kind: 'estimate', tag: 'estimate',
      });
      this.bus.emit('estimate:submitted', { inflow, capacity, verdict, correct, withinRange, trueInflow });
      this.bus.emit('hud:toast', {
        concept: correct ? 'Estimation' : 'Check that again',
        text: correct
          ? `About ${inflow.toFixed(0)} m³/h in against ${capacity.toFixed(0)} m³/h of pumping. Pumps buy you time; they do not fix a hole. Stop the source.`
          : `Your own numbers say ${inflow.toFixed(0)} m³/h in against ${capacity.toFixed(0)} m³/h out. Work the subtraction again before you bet the compartment on it.`,
      });
    }));
  }

  _pumpRows() {
    const p = this.state.pumpStates;
    const panel = this.state.electricalPanels.fwd_power_2f;
    const fwdPowered = panel.energized && !panel.tripped;
    return [
      { id: 'bilgePumpFwd', name: 'Installed forward bilge pump', cap: p.bilgePumpFwd.capacity_m3h,
        available: fwdPowered, why: fwdPowered ? 'fed from the forward power panel' : 'NO POWER — forward panel is secured/tripped' },
      { id: 'portablePump', name: 'Portable pump (P-100)', cap: p.portablePump.capacity_m3h,
        available: p.portablePump.deployedIn === 'forward_equipment' || true,
        why: p.portablePump.deployedIn ? `set in ${p.portablePump.deployedIn.replace(/_/g, ' ')}` : 'in the forward DC locker, not yet rigged' },
      { id: 'bilgePumpAft', name: 'Installed after bilge pump', cap: p.bilgePumpAft.capacity_m3h,
        available: false, why: 'suction is in the after bilge — it cannot reach this compartment' },
    ];
  }

  _pumpTile(pumps, capacity) {
    return `<div class="console-tile" style="margin-top:14px;">
      <h4>Dewatering capacity available to this compartment</h4>
      ${pumps.map((p) => `<div class="contact-row">
        <span>${p.name} — ${p.cap} m³/h</span>
        <span class="${p.available ? 'cls-biologic' : 'cls-unknown'}">${p.available ? 'available' : 'not available'} · ${p.why}</span>
      </div>`).join('')}
      <div class="console-readout" style="margin-top:8px;">${capacity} m³/h total</div>
    </div>`;
  }

  _updateVerdictNote(body, capacity) {
    const el = body.querySelector('#est-verdict-note');
    if (!el) return;
    const a = this._routeA, b = this._routeB;
    if (a == null && b == null) return;
    const spread = (a != null && b != null) ? Math.abs(a - b) : null;
    el.innerHTML = spread != null && spread < Math.max(a, b) * 0.5
      ? `The two routes agree to within ${spread.toFixed(0)} m³/h. That is what a good estimate looks like — two ways of getting there, same order of magnitude. Compare with <b>${capacity} m³/h</b> of pumping.`
      : `The two routes disagree. One of your assumptions is off — check the bore, the opening, or which soundings you picked. Pumping available: <b>${capacity} m³/h</b>.`;
  }

  // ================= DIAGNOSIS =================
  _evidence() {
    const taken = (tag) => (this.instruments?.readingsTagged(tag) ?? []);
    const notes = this.notebook?.entries ?? [];
    const hasNote = (tag) => notes.some((n) => n.tag === tag);
    const soundings = taken('sounding').filter((r) => r.compartment === 'forward_equipment');
    const pressures = taken('pressure').filter((r) => r.compartment === 'forward_equipment');
    const adjacent = taken('sounding').filter((r) => r.compartment !== 'forward_equipment');
    const src = this.flooding.sources[0];
    return [
      { key: 'level', name: 'Bilge level (physical sounding)', have: soundings.length > 0,
        value: soundings.length ? `${soundings[soundings.length - 1].numeric.toFixed(1)} cm and ${soundings.length > 1 && soundings[soundings.length - 1].numeric > soundings[0].numeric ? 'rising' : 'measured once'}` : null,
        obs: 'rise', missing: 'Sound the forward bilge with the tape.' },
      { key: 'salinity', name: 'Bilge conductivity', have: taken('salinity').length > 0,
        value: taken('salinity').length ? `${taken('salinity')[0].numeric.toFixed(1)} PSU — seawater` : null,
        obs: 'seawater', missing: 'Put the salinity probe in the water.' },
      { key: 'swPressure', name: 'Forward seawater supply pressure', have: pressures.length > 0,
        value: pressures.length ? pressures[pressures.length - 1].note : null,
        obs: 'low', missing: 'Gauge the manifold test points.' },
      { key: 'trimPressure', name: 'Trim & drain pressure', have: pressures.length > 0,
        value: pressures.length ? 'normal, 135–165 psi band' : null,
        obs: 'normal', missing: 'Gauge the manifold test points.' },
      { key: 'trim', name: 'Ship trim / depth-control effort', have: hasNote('control_indications'),
        value: hasNote('control_indications') ? `${this.state.trim.toFixed(1)}° bow-down, effort ${Math.round(this.state.depthControlEffort())}%` : null,
        obs: 'worsening', missing: 'Read the indications at Ship Control.' },
      { key: 'ballast', name: 'Ballast tank soundings', have: hasNote('control_indications'),
        value: hasNote('control_indications') ? 'all tanks on plan, no transfer ordered' : null,
        obs: 'normal', missing: 'Read the indications at Ship Control.' },
      { key: 'redundant', name: 'Independent level channel', have: hasNote('control_indications') && soundings.length > 0,
        value: 'panel alarm repeat and your physical tape agree',
        obs: 'agree', missing: 'Compare the panel alarm with a physical sounding.' },
      { key: 'adjacent', name: 'Adjacent compartment boundary', have: adjacent.length > 0,
        value: adjacent.length ? `${adjacent[adjacent.length - 1].compartmentName}: ${adjacent[adjacent.length - 1].numeric.toFixed(1)} cm` : null,
        obs: 'dry', missing: 'Sound the next compartment to check the boundary.' },
      { key: 'isolation', name: 'Isolation response', have: !!src && src.isolated,
        value: src && src.isolated ? 'ingress collapsed when both sides of the branch were shut' : null,
        obs: 'stops', missing: 'This one is an action, not a gauge — you find out by shutting the boundary.' },
    ];
  }

  _renderDiagnosis(body) {
    const ev = this._evidence();
    const have = ev.filter((e) => e.have).length;
    body.innerHTML = `
      <div class="console-grid" style="grid-template-columns: 1.1fr 1fr;">
        <div class="console-tile">
          <h4>Evidence on the board — ${have} of ${ev.length}</h4>
          ${ev.map((e) => `<div class="contact-row">
            <span>${e.name}</span>
            <span class="${e.have ? 'cls-biologic' : 'cls-unknown'}">${e.have ? e.value : '— ' + e.missing}</span>
          </div>`).join('')}
          <div class="console-sub" style="margin-top:8px;">
            A cause has to explain every line, including the calm ones. A reading that is
            <i>normal</i> is often what kills a hypothesis.
          </div>
        </div>
        <div class="console-tile">
          <h4>Candidate causes</h4>
          <div id="hyp-list">
            ${FLOOD_HYPOTHESES.map((h) => `<div class="hyp-row">
              <div class="hyp-label">${h.label}</div>
              <div class="hyp-claim">${h.claim}</div>
              <button class="station-btn" data-call="${h.id}">Call it</button>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div id="hyp-feedback"></div>`;

    body.querySelectorAll('[data-call]').forEach((b) => b.addEventListener('click', () => {
      this._call(b.dataset.call, have, ev.length, body);
    }));
  }

  _call(id, have, total, body) {
    const hyp = FLOOD_HYPOTHESES.find((h) => h.id === id);
    const correct = id === CORRECT_HYPOTHESIS;
    const fb = body.querySelector('#hyp-feedback');
    this.notebook?.record({
      compartment: 'Forward Equipment & Handling',
      instrument: 'DC plotting board',
      measurement: `Called: ${hyp.label}`,
      observation: correct ? 'Accepted — it explains every reading on the board.' : hyp.whyNot,
      clock: this.state.formatClock(),
      kind: 'hypothesis', tag: 'hypothesis',
    });
    this.bus.emit('diagnosis:called', { id, correct, evidenceCount: have, evidenceTotal: total });

    if (correct) {
      fb.innerHTML = `<div class="console-tile lesson-tile" style="margin-top:14px;">
        <h4>Ruptured forward seawater-supply branch</h4>
        <p>Salty water is rising in the compartment and the trim is going with it, so the water is real.
        The forward seawater supply header has lost pressure while trim &amp; drain sits in its normal
        band and every ballast tank is on plan — so the water is coming out of that one branch, not
        through the shell and not out of the ballast system.</p>
        <p class="console-sub"><b>What the calm readings did:</b> normal trim &amp; drain pressure and
        on-plan tank soundings removed two whole seawater paths without you touching a valve.</p>
        <div class="chain">${['Seawater supply branch fails below the deck plates',
          'Sea pressure drives water into the forward bilge',
          'Isolating both sides of the branch removes the head; a patch then holds',
          'Dewatering finally gains once the source is stopped'].map((s) => `<span>${s}</span>`).join('<i>→</i>')}</div>
        <p class="console-sub">Next: read <b>System boundaries</b> before you shut anything.</p>
      </div>`;
    } else {
      fb.innerHTML = `<div class="console-tile" style="margin-top:14px;border-color:var(--danger);">
        <h4>${hyp.label} — does not fit</h4>
        <p>${hyp.whyNot}</p>
        ${have < total - 1 ? `<p class="console-sub">You are calling this on ${have} of ${total} readings. Go and get the rest.</p>` : ''}
      </div>`;
    }
  }

  // ================= BOUNDARIES =================
  _renderBoundaries(body) {
    const src = this.flooding.sources[0];
    const bounding = src?.boundedBy ?? [];
    body.innerHTML = `
      <div class="console-tile">
        <h4>Forward seawater branch — valve boundaries</h4>
        <div class="console-sub" style="margin-bottom:10px;">
          To isolate a branch you have to shut it at <b>both</b> ends. One valve leaves the branch
          still open to the sea at the other end.
        </div>
        <div class="pipe-diagram">
          <span class="pd-node">SEA</span><i>→</i>
          <span class="pd-valve ${this.state.valveStates.fwd_sw_supply_outbd === 'shut' ? 'shut' : ''}">OUTBD</span><i>→</i>
          <span class="pd-node rupture">RUPTURE</span><i>→</i>
          <span class="pd-valve ${this.state.valveStates.fwd_sw_supply_inbd === 'shut' ? 'shut' : ''}">INBD</span><i>→</i>
          <span class="pd-node">FWD SW HEADER</span>
        </div>
      </div>
      <div class="console-tile" style="margin-top:14px;">
        <h4>What each valve takes with it</h4>
        ${Object.entries(VALVES).map(([id, v]) => `<div class="contact-row">
          <span>${bounding.includes(id) ? '● ' : ''}${v.label}
            <span class="console-sub">${v.feeds}</span></span>
          <span class="${this.state.valveStates[id] === 'shut' ? 'cls-warship' : 'cls-biologic'}">
            ${this.state.valveStates[id] === 'shut' ? 'SHUT' : 'OPEN'} · depends: ${v.dependents.join(', ')}
          </span>
        </div>`).join('')}
        <div class="console-sub" style="margin-top:10px;">
          Shutting the forward supply header also secures cooling water to the sonar-array
          electronics. That is acceptable for a few minutes — the cabinets will heat up — and the
          aft cross-connect will restore it once the rupture is sealed.
        </div>
        <button class="station-btn" id="ack-bounds" style="margin-top:10px;">Acknowledge the dependent systems</button>
      </div>`;
    body.querySelector('#ack-bounds').addEventListener('click', () => {
      this.notebook?.record({
        compartment: 'Forward Equipment & Handling',
        instrument: 'DC plotting board',
        measurement: 'Valve boundaries identified',
        observation: 'Branch bounded by FWD SEAWATER SUPPLY inboard and outboard. Shutting it also secures sonar-array cooling; the aft cross-connect can restore that afterwards.',
        clock: this.state.formatClock(), kind: 'plan', tag: 'boundaries',
      });
      this.bus.emit('boundaries:acknowledged', { valves: bounding });
      this.bus.emit('hud:toast', { concept: 'Boundaries set', text: 'Boundary valves identified and dependent systems understood. Go and shut both sides of the branch.' });
    });
  }

  dispose() {}
}
