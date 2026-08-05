import { InstrumentManager } from '../instruments/InstrumentManager.js';

/**
 * EquipmentLockerPanel — what is actually inside a damage-control locker, and the
 * act of choosing what to carry to a casualty.
 *
 * Source lineage: Spectrum Stack (`spectrum_stack.html`, `nc_spectrum_1`) is the
 * skill of mapping a situation to the right sensing modality under time pressure.
 * The falling blocks and the answer key are gone; what survives is the choice —
 * a locker full of plausible gear, no labels saying which item is "correct", and
 * a walk back down the boat if you picked wrong.
 */
const LOCKERS = {
  control: {
    title: 'DC Locker 0 — Control Room',
    note: 'The watchstander\'s locker: measuring gear and breathing protection close to hand.',
    // A spare acoustic probe is stowed here as well as on the shelf, so failing to
    // spot one small object on a bulkhead can never block the watch.
    items: ['acoustic_probe', 'sounding_tape', 'salinity_probe', 'gas_detector', 'eab', 'ext_co2'],
  },
  forward: {
    title: 'DC Locker 1 — Forward Equipment Space',
    note: 'The forward casualty locker. Repair gear, dewatering, and test equipment.',
    items: ['soft_patch', 'pipe_clamp', 'portable_pump', 'shoring', 'pressure_gauge', 'sounding_tape', 'salinity_probe', 'eab', 'ext_co2', 'ext_afff'],
  },
  machinery: {
    title: 'DC Locker 2 — Machinery Control',
    note: 'Engineering-side locker.',
    items: ['pipe_clamp', 'shoring', 'pressure_gauge', 'ir_thermometer', 'thermal_camera', 'multimeter', 'vibration_meter', 'eab', 'ext_co2', 'ext_afff', 'ext_dry'],
  },
  aft: {
    title: 'DC Locker 3 — Auxiliary Machinery',
    note: 'Aft casualty locker.',
    items: ['portable_pump', 'soft_patch', 'shoring', 'gas_detector', 'eab', 'ext_afff', 'ext_dry'],
  },
  escape: {
    title: 'Escape Trunk',
    note: 'Not a stowage locker — this is the forward escape route. Hood stowage and the lower hatch only.',
    items: [],
  },
};

export class EquipmentLockerPanel {
  constructor(ctx) {
    this.bus = ctx.bus;
    this.inventory = ctx.inventory;
    this.data = ctx.data || {};
  }

  render(container) {
    const key = this.data.contents || 'forward';
    const locker = LOCKERS[key] || LOCKERS.forward;
    this.locker = locker;
    this.container = container;
    container.innerHTML = `
      <div class="locker-note">${locker.note}</div>
      <div class="locker-grid" id="locker-grid"></div>
      <div class="console-sub" style="margin-top:14px;">
        Nothing in here is labelled "correct". Carry what the casualty in front of you needs;
        every trip back down the boat costs you water in the bilge.
      </div>`;
    this._renderItems();
  }

  _renderItems() {
    const grid = this.container.querySelector('#locker-grid');
    if (!this.locker.items.length) {
      grid.innerHTML = '<div class="notebook-empty">Empty.</div>';
      return;
    }
    grid.innerHTML = this.locker.items.map((id) => {
      const def = InstrumentManager.def(id);
      if (!def) return '';
      const carried = this.inventory.has(id);
      return `<div class="locker-item ${carried ? 'carried' : ''}">
        <div class="li-swatch" style="background:#${def.color.toString(16).padStart(6, '0')}"></div>
        <div class="li-text">
          <div class="li-name">${def.name}</div>
          <div class="li-blurb">${def.blurb || ''}</div>
        </div>
        <button class="station-btn" data-take="${id}" ${carried ? 'disabled' : ''}>${carried ? 'Carried' : 'Take'}</button>
      </div>`;
    }).join('');

    grid.querySelectorAll('[data-take]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.take;
      const def = InstrumentManager.def(id);
      this.inventory.add(id, def.name, def.kind);
      this.bus.emit('locker:taken', { id, name: def.name });
      this._renderItems();
    }));
  }

  dispose() {}
}
