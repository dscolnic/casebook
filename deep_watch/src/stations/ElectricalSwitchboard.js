import { guideStrip } from './StationGuide.js';

/**
 * ElectricalSwitchboard — buses, local panels, and the order power comes back in.
 *
 * Three jobs, in the order a fire actually needs them:
 *
 *   1. WHICH ZONE   a compartment is not fed by "the electrics", it is fed by a
 *                   named panel off a named bus. Until the player can say which,
 *                   there is nothing to isolate.
 *   2. ISOLATE      open it, and prove it is open somewhere other than here — an
 *                   indicator lamp is a lamp, not a measurement.
 *   3. RESTORE      afterwards, power comes back source → main bus → vital bus →
 *                   essential loads. Attempting a load whose upstream is dead fails
 *                   visibly, because that is what protection does.
 *
 * Source lineage: Sequence (`nc_sonar_path`) — the electrical-restoration chain,
 * where the order is the content and skipping a link is the mistake.
 */

/** Essential loads, and what has to be alive before each will hold in. */
const LOADS = {
  lighting: { name: 'Compartment lighting', needs: 'vital', why: 'People cannot fight what they cannot see.' },
  vent_fans: { name: 'Ventilation fans', needs: 'vital', why: 'Smoke does not clear itself. Fans first, then the atmosphere recovers.' },
  bilge_pump_aft: { name: 'After bilge pump', needs: 'stbdMain', why: 'Dewatering capacity, back on the board.' },
  sonar_array: { name: 'Sonar-array electronics', needs: 'portMain', why: 'The boat is deaf without it — but it is not what keeps anyone alive.' },
  galley: { name: 'Galley', needs: 'stbdMain', why: 'Not essential. Last, and only when everything else is up.' },
};

/** The order the loads SHOULD come back in. Life safety, then the ship, then comfort. */
const RESTORE_ORDER = ['lighting', 'vent_fans', 'bilge_pump_aft', 'sonar_array', 'galley'];

export class ElectricalSwitchboard {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.fire = ctx.fire;
    this.tab = 'buses';
    if (!this.state.restoredLoads) this.state.restoredLoads = [];
  }

  /**
   * The shell — guide strip, tab row, message line — is built ONCE. Only the body
   * is repainted when something changes. Rebuilding the tab buttons on every click
   * detaches the node the player (or a test) is halfway through clicking, which
   * silently drops the interaction.
   */
  render(container) {
    this.container = container;
    container.innerHTML = `
      <div id="esb-guide"></div>
      <div class="tab-row" style="margin-bottom:12px;">
        ${[['buses', 'Buses'], ['panels', 'Zones & panels'], ['loads', 'Restore loads']].map(([id, label]) =>
          `<button class="station-btn" data-etab="${id}">${label}</button>`).join('')}
      </div>
      <div id="esb-body"></div>
      <div id="esb-msg" class="console-sub" style="margin-top:12px;"></div>`;
    container.querySelectorAll('[data-etab]').forEach((b) =>
      b.addEventListener('click', () => { this.tab = b.dataset.etab; this._render(); }));
    this._render();
  }

  _guide() {
    const s = this.state;
    const fires = this.fire?.active ?? [];
    const live = fires.filter((f) => this.fire.isEnergized(f));
    let doNow;
    if (live.length) {
      const f = live[0];
      const panel = s.electricalPanels[f.energizedBy];
      doNow = `Something is burning in <b>${f.compartment.replace(/_/g, ' ')}</b> and it is still being fed. `
        + `Open <b>${panel ? panel.name : f.energizedBy}</b> — or the bus above it — before anyone puts an agent on it.`;
    } else if (fires.length) {
      doNow = 'The circuit is dead. Now the fire can be put out, and then cooled — do not restore anything until the seat is cold.';
    } else if (Object.values(s.electricalBuses).some((b) => !b.energized)) {
      doNow = 'Restore in order: a main bus, then the vital bus, then the essential loads on the Loads face — lighting and ventilation before anything else.';
    } else {
      doNow = 'The board is lined up normally. Every bus energized, no panels tripped.';
    }
    return guideStrip({
      what: 'The electrical board. Generators feed buses, buses feed panels, panels feed the equipment in each compartment.',
      doNow,
      why: 'An electrical fire is put out by de-energizing it. The extinguisher only removes what is burning at this instant; the fault keeps re-igniting until the circuit is dead.',
    });
  }

  _render() {
    const tab = this.tab;
    this.container.querySelector('#esb-guide').innerHTML = this._guide();
    this.container.querySelectorAll('[data-etab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.etab === tab));
    const msg = this.container.querySelector('#esb-msg');
    if (msg) msg.innerHTML = this._message || '';

    const body = this.container.querySelector('#esb-body');
    if (tab === 'buses') this._renderBuses(body);
    else if (tab === 'panels') this._renderPanels(body);
    else this._renderLoads(body);
  }

  _renderBuses(body) {
    const s = this.state;
    body.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(3,1fr);">
        ${Object.entries(s.electricalBuses).map(([id, b]) => `
          <div class="console-tile">
            <h4>${id}</h4>
            <div class="console-readout" style="color:${b.energized ? 'var(--ok)' : 'var(--danger)'}">
              ${b.energized ? `${b.voltage} V` : 'OPEN'}</div>
            <div class="console-sub">Source: ${b.source}</div>
            <div class="console-sub">Feeds: ${Object.values(s.electricalPanels)
              .filter((p) => p.fedFrom === id).map((p) => p.name).join(', ') || '—'}</div>
            <button class="station-btn ${b.energized ? 'active' : ''}" data-bus="${id}">
              ${b.energized ? 'Trip breaker' : 'Close breaker'}</button>
          </div>`).join('')}
      </div>
      <div class="console-sub" style="margin-top:10px;">
        Order matters: close a source and a main bus before any vital or dependent load, or protection re-opens.
      </div>`;
    body.querySelectorAll('[data-bus]').forEach((b) =>
      b.addEventListener('click', () => this._toggleBus(b.dataset.bus)));
  }

  /**
   * Zone identification: which panel feeds which compartment. This is the face a
   * player uses to answer "what is feeding the fire", and marking a zone is a
   * claim they make — the mission listens for it.
   */
  _renderPanels(body) {
    const s = this.state;
    body.innerHTML = `
      <div class="console-sub" style="margin-bottom:10px;">
        Each local panel feeds one compartment from one bus. To isolate a casualty you
        need the panel that feeds THAT compartment — not the nearest switch.
      </div>
      <table class="bearing-table">
        <tr><th>Panel</th><th>Compartment</th><th>Fed from</th><th>State</th><th></th><th></th></tr>
        ${Object.entries(s.electricalPanels).map(([id, p]) => {
          const feed = s.electricalBuses[p.fedFrom];
          const live = p.energized && !p.tripped && (!feed || feed.energized);
          return `<tr>
            <td>${p.name}</td>
            <td>${p.compartment.replace(/_/g, ' ')}</td>
            <td>${p.fedFrom || '—'}${feed && !feed.energized ? ' <span style="color:var(--warn)">(bus open)</span>' : ''}</td>
            <td style="color:${live ? 'var(--danger)' : 'var(--ok)'}">${
              p.tripped ? 'TRIPPED' : live ? 'ENERGIZED' : 'DEAD'}</td>
            <td><button class="station-btn" data-panel="${id}">${p.energized ? 'Open' : 'Close'}</button></td>
            <td><button class="station-btn" data-zone="${id}">Mark as the casualty zone</button></td>
          </tr>`;
        }).join('')}
      </table>`;

    body.querySelectorAll('[data-panel]').forEach((b) =>
      b.addEventListener('click', () => this._togglePanel(b.dataset.panel)));
    body.querySelectorAll('[data-zone]').forEach((b) =>
      b.addEventListener('click', () => this._markZone(b.dataset.zone)));
  }

  _renderLoads(body) {
    const s = this.state;
    const done = s.restoredLoads;
    body.innerHTML = `
      <div class="console-sub" style="margin-bottom:10px;">
        Bring loads back in order of what keeps people alive: lighting and ventilation
        first, then the ship's own systems, then everything else.
      </div>
      ${RESTORE_ORDER.map((id) => {
        const l = LOADS[id];
        const up = s.electricalBuses[l.needs]?.energized
          ?? (l.needs === 'vital' ? s.electricalBuses.vital.energized : false);
        const on = done.includes(id);
        return `<div class="ev-row">
          <span class="ev-key" style="min-width:190px;">${l.name}</span>
          <span class="ev-val ${on ? 'good' : up ? 'warn' : 'bad'}">${
            on ? 'restored' : up ? 'available' : `needs ${l.needs}`}</span>
          <button class="station-btn" data-load="${id}" ${on ? 'disabled' : ''}>Restore</button>
        </div>`;
      }).join('')}
      <div class="console-sub" style="margin-top:10px;">Restored so far: ${done.length ? done.map((d) => LOADS[d].name).join(' → ') : 'nothing'}</div>`;

    body.querySelectorAll('[data-load]').forEach((b) =>
      b.addEventListener('click', () => this._restore(b.dataset.load)));
  }

  /**
   * The board answers back. Held on the instance as well as written to the DOM,
   * because every action re-renders the face and would otherwise erase the
   * explanation of what just happened.
   */
  _msg(text, bad = false) {
    this._message = `<span style="color:${bad ? 'var(--danger)' : 'var(--ok)'}">${text}</span>`;
    const el = this.container.querySelector('#esb-msg');
    if (el) el.innerHTML = this._message;
  }

  _toggleBus(id) {
    const s = this.state;
    const bus = s.electricalBuses[id];
    if (bus.energized) {
      bus.energized = false;
      this.bus.emit('electrical:busChanged', { id, energized: false });
      this._msg(`${id} open. Everything fed from it is now dead — including anything you still needed.`);
    } else {
      if (id === 'vital' && !s.electricalBuses.portMain.energized && !s.electricalBuses.stbdMain.energized) {
        this._msg('Vital bus tripped free — no upstream main bus energized. Restore a main bus first.', true);
        return;
      }
      bus.energized = true;
      this.bus.emit('electrical:busChanged', { id, energized: true });
      this._msg(`${id} closed.`);
    }
    this._render();
  }

  _togglePanel(id) {
    const p = this.state.electricalPanels[id];
    if (!p) return;
    if (p.energized) {
      p.energized = false;
      p.tripped = false;
      this.bus.emit('electrical:panelSecured', { panelId: id, from: 'switchboard' });
      this._msg(`${p.name} opened at the board. Whatever it fed is dead — confirm that with a meter, not with this lamp.`);
    } else {
      p.energized = true;
      p.tripped = false;
      this.bus.emit('electrical:panelRestored', { panelId: id });
      this._msg(`${p.name} closed.`);
    }
    this._render();
  }

  _markZone(panelId) {
    const p = this.state.electricalPanels[panelId];
    if (!p) return;
    const fires = this.fire?.active ?? [];
    const correct = fires.some((f) => f.energizedBy === panelId || f.compartment === p.compartment);
    this.bus.emit('electrical:zoneIdentified', { panelId, compartment: p.compartment, correct });
    this._msg(correct
      ? `${p.name}, feeding ${p.compartment.replace(/_/g, ' ')} from ${p.fedFrom}. That is the zone. Open it, then prove it is dead.`
      : `${p.name} feeds ${p.compartment.replace(/_/g, ' ')} — that is not where the casualty is. Which compartment is actually burning?`,
      !correct);
    this._render();
  }

  _restore(loadId) {
    const s = this.state;
    const l = LOADS[loadId];
    const up = s.electricalBuses[l.needs]?.energized;
    if (!up) {
      this._msg(`${l.name} will not hold in: ${l.needs} is open. Close the upstream bus first — that is what protection is for.`, true);
      this.bus.emit('electrical:restoreRefused', { loadId, needs: l.needs });
      return;
    }
    // A live fire fed by this bus is a reason not to be restoring anything.
    const live = (this.fire?.active ?? []).filter((f) => this.fire.isEnergized(f));
    if (live.length) {
      this._msg('There is still a fire being fed on this board. Restoring loads now puts energy back into the fault.', true);
      this.bus.emit('electrical:restoreUnsafe', { loadId });
      return;
    }
    s.restoredLoads.push(loadId);
    const expected = RESTORE_ORDER.filter((x) => !s.restoredLoads.slice(0, -1).includes(x))[0];
    const inOrder = expected === loadId;
    this.bus.emit('electrical:loadRestored', {
      loadId, name: l.name, inOrder, order: [...s.restoredLoads],
    });
    this._msg(inOrder
      ? `${l.name} restored. ${l.why}`
      : `${l.name} restored — out of order. ${LOADS[expected].name} keeps people alive first.`, !inOrder);
    this._render();
  }

  dispose() {}
}

export { LOADS, RESTORE_ORDER };
