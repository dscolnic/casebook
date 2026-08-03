/**
 * SubmarineState — the single source of truth for the boat's physical condition.
 *
 * Every subsystem (flooding, electrical, atmosphere, navigation, sonar, machinery)
 * reads and writes fields here, and subsystems influence one another through the
 * `integrate()` step rather than by referencing each other directly. The spec's
 * required field list is reproduced in full; not all are exercised yet in this
 * foundation build, but the model is complete so later systems can plug in.
 */
export class SubmarineState {
  constructor() {
    // --- Motion / depth ---
    this.depth = 60;              // metres
    this.orderedDepth = 60;
    this.verticalRate = 0;        // m/min (+down)
    this.heading = 275;           // degrees true
    this.orderedHeading = 275;
    this.speed = 4;               // knots
    this.trim = 0;                // degrees (+bow down)
    this.buoyancyState = 'neutral';

    // --- Navigation (true position is hidden from the player) ---
    this.estimatedPosition = { x: 0, y: 0 };   // chart units (nm)
    this.navigationUncertainty = 0.3;          // nm radius (grows with time)
    this.truePosition = { x: 0, y: 0 };        // never displayed during play
    this.externalCurrent = { set: 210, drift: 1.2 }; // deg, knots
    this.lastTrustedFix = { x: 0, y: 0, ageMin: 0 };

    // --- Electrical ---
    this.electricalBuses = {
      portMain: { energized: true, voltage: 450, source: 'battery' },
      stbdMain: { energized: true, voltage: 450, source: 'battery' },
      vital: { energized: true, voltage: 120, source: 'battery' },
    };
    this.activeLoads = {};        // loadId -> busId
    this.emergencyPower = false;

    // --- Propulsion / machinery ---
    this.propulsionState = { online: true, shaftRpm: 60, mode: 'motor' };
    this.coolingLoops = {
      primary: { flow: 1.0, tempC: 34, pumpOn: true },
      secondary: { flow: 1.0, tempC: 28, pumpOn: true },
    };
    this.pumpStates = {
      trimPump: { on: false, capacity_m3h: 20 },
      bilgePumpFwd: { on: false, capacity_m3h: 25 },
      bilgePumpAft: { on: false, capacity_m3h: 25 },
      seawaterPump: { on: true, capacity_m3h: 60 },
    };
    this.valveStates = {};        // valveId -> 'open' | 'shut'

    // --- Flooding / bilge ---
    this.bilgeLevels = {};        // compartmentId -> cm
    this.floodingSources = [];    // { compartment, rate_m3h, isolated, patched }

    // --- Atmosphere ---
    this.compartmentTemperature = {}; // compartmentId -> °C
    this.smokeLevel = {};             // compartmentId -> 0..1
    this.oxygenLevel = 20.9;          // %
    this.carbonDioxideLevel = 0.4;    // %
    this.toxicGasLevel = 0;           // ppm CO
    this.ventilationRoutes = { supply: true, exhaust: true, scrubber: true, o2gen: true };

    // --- Acoustics / sonar ---
    this.sonarNoiseFloor = 42;        // dB (own-ship self-noise reference)
    this.machineryNoiseSources = [];  // { id, freqHz, level, compartment }
    this.contactTracks = [];          // populated by SonarSystem

    // --- Comms ---
    this.communicationState = { emconState: 'A', antennaAvailable: true, pendingMessages: 0 };

    // --- Crew / mission ---
    this.crewStatus = {};             // crewId -> { role, station, condition }
    this.activeCasualties = [];       // { id, type, severity }
    this.missionFlags = {};           // arbitrary boolean/string flags per mission

    // Bookkeeping
    this.clock = { minutes: 8 * 60 + 40 }; // 08:40 watch time
  }

  /**
   * Advance coupled physics by dt seconds. Subsystems register their own
   * per-step logic; this method handles the cross-system couplings that the
   * spec calls for (flooding→trim, machinery→self-noise, ventilation→atmosphere).
   * Detailed subsystem modules refine these; here we keep it coherent.
   */
  integrate(dt) {
    const dtMin = dt / 60;
    this.clock.minutes += dtMin;

    // Navigation uncertainty grows with time and speed until a fix resets it.
    this.navigationUncertainty += dtMin * (0.004 + this.speed * 0.0006);

    // Machinery self-noise: running pumps and higher shaft rpm raise the floor.
    let noise = 40;
    if (this.propulsionState.online) noise += this.propulsionState.shaftRpm * 0.06;
    for (const p of Object.values(this.pumpStates)) if (p.on) noise += 3;
    for (const s of this.machineryNoiseSources) noise += s.level * 0.5;
    // Smooth toward target so it does not jump.
    this.sonarNoiseFloor += (noise - this.sonarNoiseFloor) * Math.min(1, dt);

    // Trim responds to net forward/aft bilge water (flooding→mass→trim).
    let fwdWater = 0, aftWater = 0;
    for (const [comp, cm] of Object.entries(this.bilgeLevels)) {
      if (comp.startsWith('fwd') || comp.includes('forward') || comp.includes('sonar')) fwdWater += cm;
      else aftWater += cm;
    }
    const targetTrim = (fwdWater - aftWater) * 0.02;
    this.trim += (targetTrim - this.trim) * Math.min(1, dt * 0.5);

    return this;
  }

  /** Formatted watch clock, e.g. "08:42". */
  formatClock() {
    const total = Math.floor(this.clock.minutes) % (24 * 60);
    const h = String(Math.floor(total / 60)).padStart(2, '0');
    const m = String(total % 60).padStart(2, '0');
    return `${h}:${m}`;
  }

  /** A compact snapshot for the HUD / debug. */
  snapshot() {
    return {
      depth: Math.round(this.depth),
      heading: Math.round(this.heading),
      speed: this.speed.toFixed(1),
      trim: this.trim.toFixed(1),
      o2: this.oxygenLevel.toFixed(1),
      co2: this.carbonDioxideLevel.toFixed(2),
      selfNoise: Math.round(this.sonarNoiseFloor),
      navUncert: this.navigationUncertainty.toFixed(2),
    };
  }
}
