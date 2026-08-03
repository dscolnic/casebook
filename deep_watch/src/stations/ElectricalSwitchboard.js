/**
 * ElectricalSwitchboard — breakers, buses, emergency bus, and local isolation.
 * Restoration must proceed source → bus → protection → essential loads (the
 * Sequence "electrical restoration" chain): attempting a downstream close before
 * its upstream bus is energized fails visibly here rather than silently.
 */
export class ElectricalSwitchboard {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
  }

  render(container) {
    const s = this.state;
    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(3,1fr);">
        ${Object.entries(s.electricalBuses).map(([id, b]) => `
          <div class="console-tile">
            <h4>${id}</h4>
            <div class="console-readout ${b.energized ? '' : ''}" style="color:${b.energized ? 'var(--ok)' : 'var(--danger)'}">
              ${b.energized ? b.voltage + ' V' : 'OPEN'}</div>
            <div class="console-sub">Source: ${b.source}</div>
            <button class="station-btn ${b.energized ? 'active' : ''}" data-bus="${id}">
              ${b.energized ? 'Trip breaker' : 'Close breaker'}</button>
          </div>`).join('')}
      </div>
      <div id="esb-msg" class="console-sub" style="margin-top:12px;"></div>
      <div class="console-sub" style="margin-top:6px;">Order matters: close the source and the main bus before any vital or dependent load, or protection re-opens.</div>`;

    container.querySelectorAll('[data-bus]').forEach((b) =>
      b.addEventListener('click', () => this._toggle(b.dataset.bus, container)));
  }

  _toggle(id, container) {
    const s = this.state;
    const bus = s.electricalBuses[id];
    const msg = container.querySelector('#esb-msg');
    if (bus.energized) {
      bus.energized = false;
      this.bus.emit('electrical:busChanged', { id, energized: false });
    } else {
      // Vital bus depends on a main bus being up first.
      if (id === 'vital' && !s.electricalBuses.portMain.energized && !s.electricalBuses.stbdMain.energized) {
        if (msg) msg.innerHTML = '<span style="color:var(--danger)">Vital bus tripped free — no upstream main bus energized. Restore a main bus first.</span>';
        return;
      }
      bus.energized = true;
      this.bus.emit('electrical:busChanged', { id, energized: true });
    }
    this.render(container);
  }

  dispose() {}
}
