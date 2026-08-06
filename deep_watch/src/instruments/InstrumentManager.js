import * as THREE from 'three';
import { HandheldViewmodel } from '../player/HandheldViewmodel.js';
import { BILGE_DEPTH_CM } from '../simulation/FloodingSystem.js';

/**
 * InstrumentManager — the handheld instruments and the act of taking a reading.
 *
 * Every instrument reports EVIDENCE, never an answer. A reading is a physical
 * quantity that depends on the submarine state, the compartment the player is
 * standing in, and — for the acoustic probe — how far they are from the thing
 * making the noise. Nothing here names a fault; the player combines readings at
 * the plotting board.
 *
 * `measure(ctx)` receives:
 *   { state, compartment, compartmentName, position, layout, flooding, world,
 *     previous, clock }
 * and returns { value, unit, level: 'ok'|'warn'|'alarm', note, numeric?, tag? }.
 */
/**
 * Two soundings this far apart (watch minutes) count as a rate. Shorter than this
 * and the level has not moved enough to divide by the interval. Shared with the
 * mission and the plotting board so one number governs the whole idea.
 */
export const SOUNDING_INTERVAL_MIN = 0.4;

const DEFS = {
  // ---- Light ----
  flashlight: { name: 'Flashlight', color: 0xdfe8ee, unit: '', kind: 'light' },

  // ---- Measuring instruments ----
  multimeter: {
    name: 'Multimeter', color: 0x3fb6c2, unit: 'V', kind: 'measure',
    blurb: 'Bus and panel voltage.',
    measure: ({ state, compartment }) => {
      const panel = Object.values(state.electricalPanels || {}).find((p) => p.compartment === compartment);
      if (panel) {
        const live = panel.energized && !panel.tripped;
        return {
          value: live ? (118 + Math.random() * 4).toFixed(0) : '0', unit: 'V',
          numeric: live ? 120 : 0,
          level: live ? 'ok' : 'warn',
          note: live
            ? `${panel.name} is energized — live conductors near the deck.`
            : `${panel.name} is dead${panel.tripped ? ' (tripped on ground fault)' : ' (secured at the handle)'}.`,
        };
      }
      const bus = state.electricalBuses.portMain;
      const v = bus.energized ? bus.voltage + (Math.random() * 4 - 2) : 0;
      return { value: v.toFixed(0), unit: 'V', numeric: v, level: bus.energized ? 'ok' : 'alarm',
        note: bus.energized ? `Port main bus energized (${bus.source}).` : 'No voltage — bus de-energized.' };
    },
  },

  vibration_meter: {
    name: 'Vibration Meter', color: 0xd8a24a, unit: 'mm/s', kind: 'measure',
    blurb: 'Machinery velocity and dominant tone.',
    measure: ({ state, compartment }) => {
      const near = compartment === 'propulsion' || compartment === 'auxiliary';
      const base = near ? 4.2 : 1.1;
      const src = state.machineryNoiseSources.find((s) => s.compartment === compartment && s.id !== 'flood_flow');
      const v = base + (src ? src.level * 0.5 : 0);
      return { value: v.toFixed(1), unit: 'mm/s', numeric: v, level: v > 6 ? 'warn' : 'ok',
        note: src ? `Repeating tone near ${Math.round(src.freqHz)} Hz.` : 'Broadband, no dominant tone.' };
    },
  },

  acoustic_probe: {
    name: 'Acoustic Probe', color: 0xd8a24a, unit: 'dB', kind: 'measure',
    blurb: 'Structure-borne sound level — walk it toward the loudest point.',
    measure: (ctx) => {
      const { state, compartment, position, layout, flooding, previous } = ctx;
      const ambient = 43 + (state.sonarNoiseFloor - 44) * 0.25 + Math.random() * 1.2;
      let excess = 0;
      let flowing = false;
      for (const src of (flooding?.sources ?? [])) {
        const rate = src.rate_m3h ?? 0;
        if (rate < 0.6) continue;
        flowing = flowing || rate > 1.5;
        const sx = src.position?.x ?? 0, sz = src.position?.z ?? 0;
        const d = Math.hypot((position?.x ?? 0) - sx, (position?.z ?? 0) - sz);
        const gain = Math.min(34, 8 + rate * 0.55);
        // Bulkheads between the player and the source attenuate structure-borne sound.
        const ci = layout.findIndex((c) => c.id === compartment);
        const si = layout.findIndex((c) => c.id === src.compartment);
        const penalty = Math.abs(ci - si) * 1.5;
        let e = gain * Math.exp(-d / 10) - penalty;
        // Standing over an open deck plate you hear it directly, not through steel.
        const plateOpen = ctx.world?.bilges?.get(src.compartment)?.plateRecord?.data?.open;
        if (plateOpen && d < 2.6) e += 5;
        excess = Math.max(excess, e);
      }
      excess = Math.max(0, excess);
      const v = ambient + excess;
      let note;
      if (excess > 22) note = 'Loud continuous flow noise — you are on top of it.';
      else if (excess > 10) note = 'Strong continuous rushing, close by and below the deck.';
      else if (excess > 3) note = 'A steady rushing tone above the machinery bed, stronger forward.';
      else note = flowing ? 'Ambient machinery flow only at this frame.' : 'Ambient machinery flow only.';
      if (previous && previous.instrument === 'acoustic_probe' && previous.compartment !== compartment) {
        const delta = v - previous.numeric;
        note += ` ${Math.abs(delta) < 1.5 ? 'About the same as' : delta > 0 ? 'Louder than' : 'Quieter than'} `
          + `your last reading (${previous.numeric.toFixed(0)} dB in ${previous.compartmentName}).`;
      }
      return { value: v.toFixed(0), unit: 'dB', numeric: v, tag: 'acoustic',
        level: excess > 18 ? 'alarm' : excess > 6 ? 'warn' : 'ok', note };
    },
  },

  sounding_tape: {
    name: 'Sounding Tape', color: 0xb08d4a, unit: 'cm', kind: 'measure',
    blurb: 'Weighted tape — the independent, physical bilge level.',
    measure: ({ state, compartment, compartmentName, world, previous, clock }) => {
      const open = world?.bilges?.get(compartment)?.plateRecord?.data?.open;
      if (!world?.bilges?.has(compartment)) {
        return { value: '—', unit: '', level: 'warn',
          note: 'No bilge access in this compartment. Sound the bilge where there is a deck plate to lift.' };
      }
      if (!open) {
        return { value: '—', unit: '', level: 'warn',
          note: 'The deck plate is still down. Lift it before you can put a tape into the bilge.' };
      }
      const cm = state.bilgeLevels[compartment] ?? 0;
      const read = Math.max(0, cm + (Math.random() - 0.5) * 0.8);
      let note = cm > BILGE_DEPTH_CM
        ? 'Water is over the deck plates — the recess is full.'
        : 'Wetted length read off the weighted tape.';
      if (previous && previous.instrument === 'sounding_tape'
          && previous.compartment === compartment && previous.valid) {
        const gap = (state.clock.minutes - previous.minutes);
        note += ` Previous sounding here: ${previous.numeric.toFixed(1)} cm at ${previous.clock}.`;
        // A rate needs a baseline AND an interval. Sounding twice in the same
        // breath gives you two numbers and no rate — say so, rather than letting
        // the player think the instrument is broken.
        note += gap < SOUNDING_INTERVAL_MIN
          ? ` That is only ${Math.round(gap * 60)} s after the last one — too close together to give a rate. Let the level move for about half a minute, then sound again.`
          : ` ${(read - previous.numeric >= 0 ? 'Up' : 'Down')} ${Math.abs(read - previous.numeric).toFixed(1)} cm in ${gap.toFixed(1)} min.`;
      }
      return { value: read.toFixed(1), unit: 'cm', numeric: read, tag: 'sounding',
        level: cm > 45 ? 'alarm' : cm > 8 ? 'warn' : 'ok', note, clock };
    },
  },

  salinity_probe: {
    name: 'Salinity Probe', color: 0x6bbf73, unit: 'PSU', kind: 'measure',
    blurb: 'Conductivity — seawater ingress or fresh condensate?',
    measure: ({ state, compartment, world }) => {
      const open = world?.bilges?.get(compartment)?.plateRecord?.data?.open;
      const cm = state.bilgeLevels[compartment] ?? 0;
      if (!open || cm < 0.8) {
        return { value: '—', unit: '', level: 'warn',
          note: open ? 'The probe is dry — there is no standing water on it.' : 'Lift the deck plate to reach the water.' };
      }
      const psu = 31 + Math.random() * 1.6;
      return { value: psu.toFixed(1), unit: 'PSU', numeric: psu, tag: 'salinity', level: 'alarm',
        note: 'Seawater-like: above 28 PSU. This is not condensate and it is not a dry sensor.' };
    },
  },

  pressure_gauge: {
    name: 'Pressure Gauge', color: 0x3fb6c2, unit: 'psi', kind: 'measure',
    blurb: 'Test-point pressures on local piping branches.',
    measure: ({ state, compartment }) => {
      const MANIFOLDS = {
        forward_equipment: [
          { key: 'swPressure', label: 'FWD SEAWATER SUPPLY', normal: '40–50 psi',
            read: () => (state.valveStates.fwd_sw_supply_outbd === 'shut' ? 0 : 18 + Math.random() * 2) },
          { key: 'trimPressure', label: 'TRIM & DRAIN', normal: '135–165 psi', read: () => 147 + Math.random() * 3 },
          { key: 'sonarCooling', label: 'SONAR-ARRAY COOLING', normal: '40–50 psi',
            read: () => (state.valveStates.sonar_cooling_supply === 'shut' ? 0 : 44 + Math.random() * 2) },
        ],
        machinery_control: [
          { key: 'swPressure', label: 'AFT SEAWATER SUPPLY', normal: '40–50 psi', read: () => 46 + Math.random() * 2 },
          { key: 'trimPressure', label: 'TRIM & DRAIN', normal: '135–165 psi', read: () => 149 + Math.random() * 3 },
        ],
        auxiliary: [
          { key: 'swPressure', label: 'AUX SEAWATER', normal: '40–50 psi', read: () => 45 + Math.random() * 2 },
        ],
      };
      const rows = MANIFOLDS[compartment];
      if (!rows) {
        return { value: '—', unit: '', level: 'warn',
          note: 'No piping test point here. Try a compartment with a seawater manifold.' };
      }
      const vals = rows.map((r) => ({ ...r, v: r.read() }));
      const low = vals.find((r) => /SEAWATER SUPPLY/.test(r.label) && r.v > 0 && r.v < 35);
      const shut = vals.find((r) => r.v === 0);
      return {
        value: vals.map((r) => `${r.label.split(' ')[0]} ${r.v.toFixed(0)}`).join(' · '),
        unit: 'psi', tag: 'pressure', numeric: vals[0].v,
        level: low ? 'alarm' : 'ok',
        detail: vals.map((r) => `${r.label}: ${r.v.toFixed(0)} psi (normal ${r.normal})`),
        note: low
          ? `${low.label} has lost pressure — normal is ${low.normal}. The other branches read normal.`
          : shut ? `${shut.label} reads zero: that branch is shut in.` : 'All local branches at normal pressure.',
      };
    },
  },

  gas_detector: {
    name: 'Gas Detector', color: 0x6bbf73, unit: '%', kind: 'measure',
    blurb: 'O₂ / CO₂ / CO where you are standing — the truth, not what the panel believes.',
    measure: ({ state, compartment, compartmentName }) => {
      // The compartment you are IN, not a ship average. That distinction is the
      // whole of Mission 6: a boat's atmosphere is a set of connected volumes, and
      // the installed sensor for one of them can be lying.
      const air = state.atmosphere?.[compartment];
      if (!air) {
        return { value: '—', unit: '', level: 'warn', note: 'No reading here.' };
      }
      const level = air.co > 35 ? 'alarm' : air.co2 > 1.0 || air.o2 < 19.5 ? 'warn' : 'ok';
      const sensor = state.atmosphereSensors?.[compartment];
      const shown = sensor
        ? { o2: (sensor.failed && sensor.frozenAt) ? sensor.frozenAt.o2 : air.o2 + sensor.bias.o2,
            co2: (sensor.failed && sensor.frozenAt) ? sensor.frozenAt.co2 : air.co2 + sensor.bias.co2 }
        : null;
      const disagrees = shown && (Math.abs(shown.co2 - air.co2) > 0.15 || Math.abs(shown.o2 - air.o2) > 0.3);
      return {
        value: `O₂ ${air.o2.toFixed(1)}% · CO₂ ${air.co2.toFixed(2)}% · CO ${air.co.toFixed(0)}ppm`,
        unit: '%', numeric: air.co2, tag: 'gas', level,
        detail: [`${compartmentName}: measured by hand, independent of the installed sensor.`],
        note: disagrees
          ? `This does NOT match what the installed sensor for ${compartmentName} is reporting (CO₂ ${shown.co2.toFixed(2)} %). One of them is wrong, and it is not this one.`
          : level === 'ok'
            ? 'Atmosphere within limits here.'
            : air.co2 > 1.0
              ? 'CO₂ above 1 % — that is a thinking problem before it is a breathing one.'
              : 'Atmosphere out of limits here.',
      };
    },
  },

  ir_thermometer: {
    name: 'IR Thermometer', color: 0xd1594e, unit: '°C', kind: 'measure',
    blurb: 'Surface temperature of a cabinet or bearing.',
    measure: ({ state, compartment }) => {
      const t = state.compartmentTemperature[compartment] ?? (compartment === 'propulsion' ? 41 : 24);
      return { value: t.toFixed(0), unit: '°C', numeric: t, tag: 'temperature',
        level: t > 55 ? 'alarm' : t > 40 ? 'warn' : 'ok',
        note: t > 55 ? 'Cabinet surfaces are hot — cooling has been lost.'
          : t > 40 ? 'Elevated surface temperature.' : 'Nominal surface temperature.' };
    },
  },

  thermal_camera: {
    name: 'Thermal Camera', color: 0xd1594e, unit: '', kind: 'measure',
    blurb: 'Thermal field — finds hot spots and cold water lines.',
    measure: ({ state, compartment }) => {
      const t = state.compartmentTemperature[compartment] ?? 24;
      return { value: `Peak ${(t + 6).toFixed(0)}°C`, unit: '', numeric: t + 6, level: t > 45 ? 'warn' : 'ok',
        note: t > 45 ? 'Hot spot visible on a fixed pattern.' : 'Even thermal field, no hot spot.' };
    },
  },

  // ---- Damage-control gear (carried, used against the world, not read) ----
  portable_pump: {
    name: 'Portable Pump', color: 0xd8a24a, kind: 'gear',
    blurb: 'P-100 portable dewatering pump, 20 m³/h. Set its suction in a sump.',
    useHint: 'Set this in a bilge sump (E on the sump), then start it.',
  },
  soft_patch: {
    name: 'Soft Patch & Band-It', color: 0xb0433a, kind: 'gear',
    blurb: 'Rubber sheet, marline, and band-it for a temporary seal.',
    useHint: 'Apply at the rupture (E). It will not hold against a pressurised line.',
  },
  pipe_clamp: {
    name: 'Split Pipe Clamp', color: 0x8a8a8a, kind: 'gear',
    blurb: 'Bolted split clamp with a gasket — holds pressure on a pipe rupture.',
    useHint: 'Fit at the rupture (E).',
  },
  shoring: {
    name: 'Shoring Wedges & Battens', color: 0x7a5a3a, kind: 'gear',
    blurb: 'Timber shoring for hull damage and plate patches.',
    useHint: 'Can be driven against a leak (E) — slows it, does not stop a pipe rupture.',
  },
  eab: {
    name: 'Emergency Air Mask', color: 0x3fb6c2, kind: 'gear',
    blurb: 'Emergency air breathing mask for smoke or toxic atmospheres.',
    useHint: 'Nothing here needs breathing protection.',
  },
  // Three bottles, three different chemistries. Which one is right depends on
  // what is burning AND on whether the circuit is still live: the two water-based
  // agents conduct, so on live electrics they fault the circuit through the stream
  // you are holding. Nothing here is labelled "correct".
  ext_co2: {
    name: 'CO₂ Extinguisher', color: 0xd1594e, kind: 'gear', agent: 'co2',
    blurb: 'Portable CO₂ bottle. Non-conductive, no residue — and it displaces your oxygen too.',
    useHint: 'Discharge at the seat of a fire (E).',
  },
  ext_afff: {
    name: 'AFFF Extinguisher', color: 0xd8a24a, kind: 'gear', agent: 'afff',
    blurb: 'Aqueous film-forming foam. Blankets burning liquid — water-based, so it conducts.',
    useHint: 'Discharge at the seat of a fire (E).',
  },
  ext_dry: {
    name: 'Dry Chemical Extinguisher', color: 0xdfe8ee, kind: 'gear', agent: 'dry_chem',
    blurb: 'Interrupts the flame chemistry. Non-conductive; the residue ruins what it saves.',
    useHint: 'Discharge at the seat of a fire (E).',
  },
  // Kept as the generic bottle for missions that predate the three-agent choice.
  extinguisher: {
    name: 'CO₂ Extinguisher', color: 0xd1594e, kind: 'gear', agent: 'co2',
    blurb: 'Portable CO₂ bottle for electrical fires.',
    useHint: 'Nothing is burning.',
  },
};

export class InstrumentManager {
  constructor({ camera, scene, eventBus, inventory, state, compartmentManager, notebook, player, flooding, world, layout }) {
    this.camera = camera;
    this.bus = eventBus;
    this.inventory = inventory;
    this.state = state;
    this.compartments = compartmentManager;
    this.notebook = notebook;
    this.player = player;
    this.flooding = flooding;
    this.world = world;
    this.layout = layout;
    this.viewmodel = new HandheldViewmodel(camera);
    this.lastReadings = [];   // chronological log of every reading taken

    this.flashlight = new THREE.SpotLight(0xfdf6e3, 0, 12, Math.PI / 6, 0.4, 1.4);
    this.flashlight.position.set(0, 0, 0);
    this.flashlightTarget = new THREE.Object3D();
    this.flashlightTarget.position.set(0, 0, -1);
    camera.add(this.flashlight);
    camera.add(this.flashlightTarget);
    this.flashlight.target = this.flashlightTarget;

    this.bus.on('inventory:active', (item) => this._onActive(item));
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyF' && !/INPUT|SELECT|TEXTAREA/.test(e.target?.tagName || '')) this.useActive();
    });
  }

  static def(id) { return DEFS[id]; }
  static defs() { return DEFS; }

  _onActive(item) {
    const def = item ? DEFS[item.id] : null;
    this.viewmodel.show(item?.id, def?.color ?? 0x3fb6c2);
    this.flashlight.intensity = item?.id === 'flashlight' ? 2.2 : 0;
    if (!def || def.kind !== 'measure') this.bus.emit('instrument:readout', null);
  }

  /** The most recent reading taken with a given instrument (for trend notes). */
  previousFor(instrumentId) {
    for (let i = this.lastReadings.length - 1; i >= 0; i--) {
      if (this.lastReadings[i].instrument === instrumentId) return this.lastReadings[i];
    }
    return null;
  }

  /** Take a measurement with the active tool (F). */
  useActive() {
    const item = this.inventory.activeId ? this.inventory.carried.get(this.inventory.activeId) : null;
    if (!item) return null;
    const def = DEFS[item.id];
    if (!def) return null;
    if (def.kind === 'light') {
      this.flashlight.intensity = this.flashlight.intensity > 0 ? 0 : 2.2;
      return null;
    }
    if (def.kind === 'gear') {
      this.bus.emit('hud:toast', { concept: def.name, text: def.useHint || 'Use this against something in the world (E).' });
      return null;
    }

    const compId = this.compartments.currentId;
    const compName = this.compartments.byId(compId)?.name ?? compId;
    const reading = def.measure({
      state: this.state,
      compartment: compId,
      compartmentName: compName,
      position: this.player?.position,
      layout: this.layout,
      flooding: this.flooding,
      world: this.world,
      previous: this.previousFor(item.id),
      clock: this.state.formatClock(),
    });

    const record = {
      instrument: item.id,
      instrumentName: def.name,
      compartment: compId,
      compartmentName: compName,
      clock: this.state.formatClock(),
      minutes: this.state.clock.minutes,
      numeric: reading.numeric ?? null,
      tag: reading.tag ?? null,
      value: reading.value,
      unit: reading.unit,
      note: reading.note,
      valid: reading.value !== '—',
    };
    this.lastReadings.push(record);

    this.bus.emit('instrument:readout', { name: def.name, ...reading });
    this.notebook?.record({
      compartment: compName,
      instrument: def.name,
      measurement: `${reading.value}${reading.unit ? ' ' + reading.unit : ''}`,
      observation: reading.note,
      clock: record.clock,
      detail: reading.detail || null,
      kind: 'measurement',
    });
    this.bus.emit('instrument:measured', { ...record, reading });
    return record;
  }

  /** All valid readings of a given tag, oldest first. */
  readingsTagged(tag) {
    return this.lastReadings.filter((r) => r.tag === tag && r.valid);
  }

  update(dt, moving) {
    this.viewmodel.update(dt, moving);
  }
}
