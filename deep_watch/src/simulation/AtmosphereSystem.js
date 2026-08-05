/**
 * AtmosphereSystem — the air, compartment by compartment.
 *
 * A submarine's atmosphere is not one number. It is a set of connected volumes
 * with people breathing in them, machinery heating them, and a ventilation system
 * that only mixes the ones whose dampers are open. That structure is the whole
 * teaching point of Mission 6: a compartment can be going bad while the ship
 * average looks fine, and the panel that tells you about it is a sensor — which
 * can fail — while the gas detector in your hand is a measurement.
 *
 * Physical model, deliberately simple but honest about the direction of every
 * effect:
 *
 *   production   people make CO₂ and consume O₂ in proportion to how many of them
 *                are in the compartment; a fire makes CO, smoke and heat and burns
 *                O₂ much faster than people do
 *   removal      the scrubber removes CO₂ and the generator adds O₂, but ONLY from
 *                compartments the ventilation actually reaches
 *   mixing       adjacent compartments exchange air through open dampers, so a bad
 *                compartment slowly contaminates its neighbours and a good one
 *                slowly rescues it
 *   sensing      installed sensors are a separate layer from the truth, so one can
 *                be biased or dead while the air is fine, and vice versa
 *
 * Lineage: the independence-of-evidence idea comes from Casebook (`nc_greywake_case`)
 * — an installed sensor and its repeat are one witness — and the multi-compartment
 * measurement discipline from Diagnosis (`nc_flooding_diag`).
 */

/** Sea-level air, and the limits that matter aboard. */
export const NORMAL = { o2: 20.9, co2: 0.4, co: 0 };
export const O2_DEFICIENT = 19.5;      // % — the standard oxygen-deficiency line
export const CO2_UNCOMFORTABLE = 1.0;  // % — headache, slower thinking
export const CO2_ROUTINE = 0.5;        // % — normal at sea, tolerated for a patrol
export const CO_ALARM_PPM = 50;        // ppm — action level
export const CO_DANGER_PPM = 200;      // ppm — leave, on air

/** Who is normally in each compartment. People are the CO₂ source. */
export const OCCUPANCY = {
  forward_equipment: 0,
  sonar_electronics: 0,
  sonar_room: 2,
  control_room: 4,
  radio_room: 1,
  berthing_mess: 6,
  machinery_control: 2,
  propulsion: 1,
  electrical: 1,
  auxiliary: 0,
};

/** One person, roughly: 0.02 m³/h of CO₂ into a compartment of a few hundred m³. */
const CO2_PER_PERSON = 0.0055;   // % per minute, per person, per compartment
const O2_PER_PERSON = 0.0060;    // % per minute consumed
const SCRUBBER_CO2 = 0.05;       // % per minute removed from ventilated air
const O2GEN_RATE = 0.030;        // % per minute added to ventilated air
const CO_BURN_RATE = 0.9;        // ppm per minute removed by the CO burner
const MIX_RATE = 0.35;           // fraction per minute exchanged through an open damper

export class AtmosphereSystem {
  constructor({ state, eventBus, layout }) {
    this.state = state;
    this.bus = eventBus;
    this.layout = layout;
    this._elapsed = 0;
    this._alarmed = new Set();

    // Truth, per compartment.
    state.atmosphere = {};
    // Dampers: an open damper means ventilation reaches this compartment.
    state.ventDampers = {};
    // The installed sensing layer, which is NOT the truth.
    state.atmosphereSensors = {};

    for (const c of layout) {
      state.atmosphere[c.id] = { o2: NORMAL.o2, co2: NORMAL.co2, co: 0, smoke: 0, tempC: 24 };
      state.ventDampers[c.id] = 'open';
      state.atmosphereSensors[c.id] = { failed: false, bias: { o2: 0, co2: 0, co: 0 }, frozenAt: null };
      state.compartmentTemperature[c.id] = 24;
      state.smokeLevel[c.id] = 0;
    }
  }

  air(compartment) { return this.state.atmosphere[compartment]; }

  /** True conditions, as a handheld instrument would measure them. */
  measure(compartment) {
    const a = this.air(compartment);
    if (!a) return null;
    return { o2: a.o2, co2: a.co2, co: a.co, smoke: a.smoke, tempC: a.tempC, source: 'handheld' };
  }

  /**
   * What the INSTALLED sensor for a compartment reports. A failed sensor freezes
   * at the value it had when it failed; a biased one is offset. Neither knows it
   * is wrong, which is exactly why a handheld reading is worth taking.
   */
  sensorReading(compartment) {
    const a = this.air(compartment);
    const s = this.state.atmosphereSensors[compartment];
    if (!a || !s) return null;
    if (s.failed && s.frozenAt) return { ...s.frozenAt, source: 'installed', suspect: false };
    return {
      o2: a.o2 + s.bias.o2,
      co2: Math.max(0, a.co2 + s.bias.co2),
      co: Math.max(0, a.co + s.bias.co),
      smoke: a.smoke,
      tempC: a.tempC,
      source: 'installed',
    };
  }

  /** Break a sensor: freeze it, or give it an offset it cannot know about. */
  failSensor(compartment, { frozen = false, bias = null } = {}) {
    const s = this.state.atmosphereSensors[compartment];
    if (!s) return;
    s.failed = frozen;
    if (frozen) s.frozenAt = { ...this.measure(compartment) };
    if (bias) s.bias = { o2: 0, co2: 0, co: 0, ...bias };
    this.bus.emit('atmosphere:sensorFailed', { compartment, frozen, bias });
  }

  /** Does the installed sensor disagree with the truth by more than a hair? */
  sensorDisagrees(compartment, tol = { o2: 0.3, co2: 0.15, co: 10 }) {
    const t = this.measure(compartment), s = this.sensorReading(compartment);
    if (!t || !s) return false;
    return Math.abs(t.o2 - s.o2) > tol.o2
      || Math.abs(t.co2 - s.co2) > tol.co2
      || Math.abs(t.co - s.co) > tol.co;
  }

  setDamper(compartment, open) {
    if (!(compartment in this.state.ventDampers)) return false;
    this.state.ventDampers[compartment] = open ? 'open' : 'shut';
    this.bus.emit('atmosphere:damper', { compartment, open });
    return true;
  }

  setRoute(route, on) {
    if (!(route in this.state.ventilationRoutes)) return false;
    this.state.ventilationRoutes[route] = on;
    this.bus.emit('atmosphere:route', { route, on });
    return true;
  }

  /** Fire and other casualties push their products in through here. */
  inject(compartment, { co = 0, smoke = 0, heat = 0, o2burn = 0, co2 = 0 }) {
    const a = this.air(compartment);
    if (!a) return;
    a.co += co;
    a.smoke = Math.min(1, a.smoke + smoke);
    a.tempC += heat;
    a.o2 = Math.max(0, a.o2 - o2burn);
    a.co2 += co2;
  }

  /** Ventilated means the supply fan is running and this compartment's damper is open. */
  isVentilated(compartment) {
    return !!this.state.ventilationRoutes.supply && this.state.ventDampers[compartment] === 'open';
  }

  /** The compartment in the worst condition, by whichever measure is worst. */
  worst() {
    let bad = null;
    for (const c of this.layout) {
      const a = this.air(c.id);
      const score = Math.max(
        (a.co2 - CO2_ROUTINE) / CO2_ROUTINE,
        (NORMAL.o2 - a.o2) / 1.4,
        a.co / CO_ALARM_PPM,
      );
      if (!bad || score > bad.score) bad = { id: c.id, score, air: a };
    }
    return bad;
  }

  update(dt) {
    const dtMin = dt / 60;
    if (dtMin <= 0) return;
    this._elapsed += dtMin;
    const vent = this.state.ventilationRoutes;

    // 1. Production and removal, per compartment.
    for (const c of this.layout) {
      const a = this.air(c.id);
      const people = OCCUPANCY[c.id] ?? 0;
      a.co2 += people * CO2_PER_PERSON * dtMin;
      a.o2 -= people * O2_PER_PERSON * dtMin;

      if (this.isVentilated(c.id)) {
        if (vent.scrubber) a.co2 = Math.max(0.02, a.co2 - SCRUBBER_CO2 * dtMin);
        if (vent.o2gen) a.o2 = Math.min(NORMAL.o2, a.o2 + O2GEN_RATE * dtMin);
        // Smoke and CO are carried away with the air, at a rate the fans set.
        a.co = Math.max(0, a.co - CO_BURN_RATE * dtMin * 4);
        a.smoke = Math.max(0, a.smoke - 0.10 * dtMin * 4);
      } else {
        // Sealed: CO decays only slowly, smoke hangs.
        a.co = Math.max(0, a.co - CO_BURN_RATE * dtMin * 0.2);
        a.smoke = Math.max(0, a.smoke - 0.01 * dtMin);
      }

      // Heat leaks to the sea through the hull, so temperature comes home slowly.
      a.tempC += (24 - a.tempC) * Math.min(1, dtMin * 0.35);
      this.state.compartmentTemperature[c.id] = a.tempC;
      this.state.smokeLevel[c.id] = a.smoke;
    }

    // 2. Mixing between neighbours whose dampers are both open. Air is a fluid:
    //    a bad compartment contaminates the next one, and a good one dilutes it.
    for (let i = 0; i < this.layout.length - 1; i++) {
      const A = this.layout[i].id, B = this.layout[i + 1].id;
      if (this.state.ventDampers[A] !== 'open' || this.state.ventDampers[B] !== 'open') continue;
      const k = Math.min(0.5, MIX_RATE * dtMin * (vent.supply ? 1 : 0.25));
      const a = this.air(A), b = this.air(B);
      for (const key of ['o2', 'co2', 'co', 'smoke', 'tempC']) {
        const d = (b[key] - a[key]) * k;
        a[key] += d;
        b[key] -= d;
      }
    }

    // 3. Ship-wide figures the HUD and the older panels already read. Control is
    //    where the watch is, so that is the number that gets reported.
    const ctrl = this.air('control_room');
    this.state.oxygenLevel = ctrl.o2;
    this.state.carbonDioxideLevel = ctrl.co2;
    this.state.toxicGasLevel = Math.max(...this.layout.map((c) => this.air(c.id).co));

    // 4. Alarms, once per compartment per excursion.
    for (const c of this.layout) {
      const a = this.air(c.id);
      const bad = a.o2 < O2_DEFICIENT || a.co2 > CO2_UNCOMFORTABLE || a.co > CO_ALARM_PPM;
      if (bad && !this._alarmed.has(c.id)) {
        this._alarmed.add(c.id);
        this.bus.emit('atmosphere:alarm', {
          compartment: c.id,
          o2: a.o2, co2: a.co2, co: a.co,
          why: a.co > CO_ALARM_PPM ? 'carbon monoxide'
            : a.o2 < O2_DEFICIENT ? 'oxygen deficiency' : 'carbon dioxide',
        });
      } else if (!bad && this._alarmed.has(c.id)) {
        this._alarmed.delete(c.id);
        this.bus.emit('atmosphere:cleared', { compartment: c.id });
      }
    }
  }
}
