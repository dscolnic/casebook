import * as THREE from 'three';
import { HandheldViewmodel } from '../player/HandheldViewmodel.js';

/**
 * InstrumentManager — owns the handheld instrument definitions and the act of
 * taking a measurement. Each instrument is EVIDENCE, not an answer: it reports a
 * physical quantity that depends on the submarine state and the player's current
 * compartment. The player presses F to take a reading with the active tool.
 *
 * This is the framework the later missions extend; the foundation build wires the
 * six core instruments the spec's Phase 4 requires so pickups are functional and
 * the "retrieve an instrument / take a reading" loop is testable.
 */
const DEFS = {
  flashlight: {
    name: 'Flashlight', color: 0xdfe8ee, unit: '', kind: 'light',
  },
  multimeter: {
    name: 'Multimeter', color: 0x3fb6c2, unit: 'V', kind: 'measure',
    measure: (state, comp) => {
      const bus = state.electricalBuses.portMain;
      const v = bus.energized ? bus.voltage + (Math.random() * 4 - 2) : 0;
      return { value: v.toFixed(0), unit: 'V', level: bus.energized ? 'ok' : 'alarm',
        note: bus.energized ? `Port main bus energized (${bus.source}).` : 'No voltage — bus de-energized.' };
    },
  },
  vibration_meter: {
    name: 'Vibration Meter', color: 0xd8a24a, unit: 'mm/s', kind: 'measure',
    measure: (state, comp) => {
      const near = comp === 'propulsion' || comp === 'auxiliary';
      const base = near ? 4.2 : 1.1;
      const src = state.machineryNoiseSources.find((s) => s.compartment === comp);
      const v = base + (src ? src.level * 0.5 : 0);
      return { value: v.toFixed(1), unit: 'mm/s', level: v > 6 ? 'warn' : 'ok',
        note: src ? `Repeating tone near ${Math.round(src.freqHz)} Hz.` : 'Broadband, no dominant tone.' };
    },
  },
  acoustic_probe: {
    name: 'Acoustic Probe', color: 0xd8a24a, unit: 'dB', kind: 'measure',
    measure: (state, comp) => {
      const flood = state.floodingSources.find((f) => !f.isolated);
      const strong = flood && (comp === 'forward_equipment' || comp === 'sonar_electronics');
      const v = strong ? 74 : 46 + Math.random() * 4;
      return { value: v.toFixed(0), unit: 'dB', level: strong ? 'warn' : 'ok',
        note: strong ? 'Strong continuous flow noise beneath the deck plates.' : 'Ambient machinery flow only.' };
    },
  },
  gas_detector: {
    name: 'Gas Detector', color: 0x6bbf73, unit: '', kind: 'measure',
    measure: (state, comp) => {
      const co2 = state.carbonDioxideLevel;
      const co = state.toxicGasLevel;
      const level = co > 35 ? 'alarm' : co2 > 1.0 ? 'warn' : 'ok';
      return { value: `O₂ ${state.oxygenLevel.toFixed(1)}% · CO₂ ${co2.toFixed(2)}% · CO ${co.toFixed(0)}ppm`,
        unit: '', level, note: level === 'ok' ? 'Atmosphere within limits.' : 'Atmosphere trending out of limits.' };
    },
  },
  ir_thermometer: {
    name: 'IR Thermometer', color: 0xd1594e, unit: '°C', kind: 'measure',
    measure: (state, comp) => {
      const t = state.compartmentTemperature[comp] ?? (comp === 'propulsion' ? 41 : 24);
      return { value: t.toFixed(0), unit: '°C', level: t > 55 ? 'alarm' : t > 40 ? 'warn' : 'ok',
        note: t > 40 ? 'Elevated surface temperature.' : 'Nominal surface temperature.' };
    },
  },
  thermal_camera: {
    name: 'Thermal Camera', color: 0xd1594e, unit: '', kind: 'measure',
    measure: (state, comp) => {
      const t = state.compartmentTemperature[comp] ?? 24;
      return { value: `Peak ${(t + 6).toFixed(0)}°C`, unit: '', level: t > 45 ? 'warn' : 'ok',
        note: t > 45 ? 'Hot spot visible on a fixed pattern.' : 'Even thermal field, no hot spot.' };
    },
  },
};

export class InstrumentManager {
  constructor({ camera, scene, eventBus, inventory, state, compartmentManager, notebook }) {
    this.camera = camera;
    this.bus = eventBus;
    this.inventory = inventory;
    this.state = state;
    this.compartments = compartmentManager;
    this.notebook = notebook;
    this.viewmodel = new HandheldViewmodel(camera);

    // Flashlight spot attached to the camera.
    this.flashlight = new THREE.SpotLight(0xfdf6e3, 0, 12, Math.PI / 6, 0.4, 1.4);
    this.flashlight.position.set(0, 0, 0);
    this.flashlightTarget = new THREE.Object3D();
    this.flashlightTarget.position.set(0, 0, -1);
    camera.add(this.flashlight);
    camera.add(this.flashlightTarget);
    this.flashlight.target = this.flashlightTarget;

    this.bus.on('inventory:active', (item) => this._onActive(item));
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyF') this.useActive();
    });
  }

  _onActive(item) {
    const def = item ? DEFS[item.id] : null;
    this.viewmodel.show(item?.id, def?.color ?? 0x3fb6c2);
    this.flashlight.intensity = item?.id === 'flashlight' ? 2.2 : 0;
    if (!def || def.kind !== 'measure') this.bus.emit('instrument:readout', null);
  }

  /** Take a measurement with the active tool (F). */
  useActive() {
    const item = this.inventory.activeId ? this.inventory.carried.get(this.inventory.activeId) : null;
    if (!item) return;
    const def = DEFS[item.id];
    if (!def) return;
    if (def.kind === 'light') {
      this.flashlight.intensity = this.flashlight.intensity > 0 ? 0 : 2.2;
      return;
    }
    const compId = this.compartments.currentId;
    const reading = def.measure(this.state, compId);
    const compName = this.compartments.byId(compId)?.name ?? compId;
    this.bus.emit('instrument:readout', { name: def.name, ...reading });
    // Offer the reading to the notebook.
    this.notebook?.record({
      compartment: compName,
      instrument: def.name,
      measurement: `${reading.value}${reading.unit ? ' ' + reading.unit : ''}`,
      observation: reading.note,
      clock: this.state.formatClock(),
    });
    this.bus.emit('instrument:measured', { instrument: item.id, reading, compartment: compId });
  }

  update(dt, moving) {
    this.viewmodel.update(dt, moving);
  }
}
