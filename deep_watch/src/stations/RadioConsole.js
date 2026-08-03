/**
 * RadioConsole — abstract comms: incoming message queue, antenna availability,
 * transmission status, message priority, and emissions-control (EMCON) state.
 * Deliberately fictional: no real authentication or cryptographic process is
 * modelled. Transmitting raises exposure — an information-vs-exposure tradeoff
 * the command episodes reuse.
 */
export class RadioConsole {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
  }

  render(container) {
    const c = this.state.communicationState;
    container.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(2,1fr);">
        <div class="console-tile">
          <h4>Emissions Control</h4>
          <div class="console-readout">EMCON ${c.emconState}</div>
          <div class="console-sub">A = full silence · C = restricted · D = unrestricted</div>
          <div style="margin-top:8px;">
            ${['A', 'C', 'D'].map((st) => `<button class="station-btn ${c.emconState === st ? 'active' : ''}" data-emcon="${st}">EMCON ${st}</button>`).join('')}
          </div>
        </div>
        <div class="console-tile">
          <h4>Antenna &amp; Transmission</h4>
          <div class="console-sub">Antenna: <b>${c.antennaAvailable ? 'available (at PD)' : 'unavailable (deep)'}</b></div>
          <div class="console-sub">Pending messages: <b>${c.pendingMessages}</b></div>
          <button class="station-btn" id="radio-tx" ${c.emconState === 'A' || !c.antennaAvailable ? 'disabled' : ''}>Transmit outgoing</button>
          <div id="radio-msg" class="console-sub" style="margin-top:8px;"></div>
        </div>
      </div>
      <div class="console-sub" style="margin-top:12px;">Coming to periscope depth to raise an antenna exposes the boat. Transmitting emits. Weigh the message priority against acoustic and visual exposure.</div>`;

    container.querySelectorAll('[data-emcon]').forEach((b) =>
      b.addEventListener('click', () => { c.emconState = b.dataset.emcon; this.render(container); }));
    container.querySelector('#radio-tx')?.addEventListener('click', () => {
      const msg = container.querySelector('#radio-msg');
      if (msg) msg.innerHTML = '<span style="color:var(--accent-warm)">Transmission complete — emission logged; exposure risk raised for this window.</span>';
      this.bus.emit('radio:transmitted');
    });
  }

  dispose() {}
}
