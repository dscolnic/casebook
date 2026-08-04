/**
 * SubmarineState — the single source of truth for the boat's physical condition.
 *
 * Every subsystem (flooding, electrical, atmosphere, navigation, sonar, machinery)
 * reads and writes fields here, and subsystems influence one another through the
 * `integrate()` step rather than by referencing each other directly. The spec's
 * required field list is reproduced in full; not all are exercised yet in this
 * foundation build, but the model is complete so later systems can plug in.
 */

/**
 * Trim moment arm per compartment (+ forward). Water forward of the centre of
 * buoyancy pulls the bow down; water aft pulls it up. Unknown keys fall back to a
 * forward/aft name test so ad-hoc bilge ids still behave sensibly.
 */
const TRIM_ARM = {
  forward_equipment: 1.0,
  sonar_electronics: 0.8,
  sonar_room: 0.55,
  control_room: 0.2,
  radio_room: -0.05,
  berthing_mess: -0.3,
  machinery_control: -0.55,
  propulsion: -0.75,
  electrical: -0.9,
  auxiliary: -1.0,
};

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
      bilgePumpFwd: { on: false, capacity_m3h: 25, poweredFrom: 'fwd_power_2f' },
      bilgePumpAft: { on: false, capacity_m3h: 25 },
      seawaterPump: { on: true, capacity_m3h: 60 },
      // Carried to the casualty and set in a sump by hand; not fed from the panel.
      portablePump: { on: false, capacity_m3h: 20, deployedIn: null, portable: true },
    };
    // valveId -> 'open' | 'shut'. The forward seawater manifold is lined up
    // normally at the start of a patrol.
    this.valveStates = {
      fwd_sw_supply_inbd: 'open',
      fwd_sw_supply_outbd: 'open',
      sonar_cooling_supply: 'open',
      trim_drain: 'shut',
      sw_crossconnect: 'shut',
    };

    // Local power/lighting panels that water can reach before it reaches a bus.
    this.electricalPanels = {
      fwd_power_2f: { name: 'Forward Power Panel 2F', energized: true, tripped: false, compartment: 'forward_equipment' },
    };

    // --- Flooding / bilge ---
    this.bilgeLevels = {};        // compartmentId -> cm
    this.floodingSources = [];    // { compartment, rate_m3h, isolated, repair }
    this.floodMass_t = 0;         // tonnes of embarked water (drives trim + depth)
    this.compensatedMass_t = 0;   // tonnes the trim/ballast system has compensated for

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

    // Bookkeeping. TWO clocks, on purpose:
    //  clock     the WATCH clock, real time, drives every rate, reading and interval.
    //  dayClock  the PATROL clock, an hour a real minute, drives days, fatigue and
    //            the crossing. See simulation/CrewClock.js for why they are separate.
    this.clock = { minutes: 8 * 60 + 40 };      // 08:40 watch time
    this.dayClock = { hours: 6 };               // 06:00 on patrol day 1
    this.fatigue = { hoursAwake: 2.5, lastSleepAt: 0 };
    this.voyage = { nmMadeGood: 0, arrived: false };
  }

  /**
   * Advance coupled physics by dt seconds. Subsystems (FloodingSystem and friends)
   * write their own quantities into this object first; `integrate()` then applies
   * the cross-system couplings the spec calls for: water→mass→trim and depth,
   * machinery+flow→self-noise, speed→control authority, time→nav uncertainty.
   *
   * All of it lives here (rather than in the Game loop) so the couplings can be
   * exercised by a test that owns nothing but a SubmarineState.
   */
  integrate(dt) {
    const dtMin = dt / 60;
    this.clock.minutes += dtMin;

    // Navigation uncertainty grows with time and speed until a fix resets it.
    this.navigationUncertainty += dtMin * (0.004 + this.speed * 0.0006);

    // Machinery self-noise: running pumps, shaft rpm, and any flow noise source
    // (e.g. an open flooding path) raise the floor and mask weak contacts.
    this.sonarNoiseFloor += (this.noiseFloorTarget() - this.sonarNoiseFloor) * Math.min(1, dt);

    // Trim responds to where the water is, not just how much: each compartment
    // has a moment arm about the centre of buoyancy.
    let moment = 0;
    for (const [comp, cm] of Object.entries(this.bilgeLevels)) {
      moment += cm * (TRIM_ARM[comp] ?? (/^fwd|forward|sonar/.test(comp) ? 1 : -1));
    }
    const targetTrim = moment * 0.02;
    this.trim += (targetTrim - this.trim) * Math.min(1, dt * 0.5);

    // Depth: the planes ease the boat toward ordered depth with an authority that
    // falls off at low speed, and embarked water makes the boat heavy so it sinks
    // through the ordered depth until the water is removed or compensated.
    const authority = 0.3 + Math.min(1, this.speed / 6) * 0.7;
    const heavy = Math.max(0, this.floodMass_t - this.compensatedMass_t);
    const sinkRate = (heavy * 0.12) / Math.max(0.4, authority);   // m/min
    const dDepth = this.orderedDepth - this.depth;
    this.verticalRate = dDepth * 0.5 * authority + sinkRate;
    this.depth = Math.max(10, this.depth + this.verticalRate * dtMin);

    // Heading eases toward ordered with the same authority.
    const dh = ((this.orderedHeading - this.heading + 540) % 360) - 180;
    this.heading = (this.heading + dh * 0.02 * authority * Math.min(1, dt * 30) + 360) % 360;

    this.lastTrustedFix.ageMin += dtMin;
    return this;
  }

  /** The self-noise floor the plant as currently lined up actually implies, dB. */
  noiseFloorTarget() {
    let noise = 40;
    if (this.propulsionState.online) noise += this.propulsionState.shaftRpm * 0.06;
    for (const p of Object.values(this.pumpStates)) if (p.on) noise += 3;
    for (const s of this.machineryNoiseSources) noise += s.level * 0.5;
    return noise;
  }

  /**
   * Snap the floor to what the plant implies, with no settling lag. Missions call
   * this after they line the plant up: a "rig for quiet" objective must not be
   * able to satisfy itself during the second it takes the smoothed floor to catch
   * up with the pumps that are actually running.
   */
  settleNoise() {
    this.sonarNoiseFloor = this.noiseFloorTarget();
    return this.sonarNoiseFloor;
  }

  /**
   * How hard the watch is working to hold depth, 0–100 %. Rises with off-trim
   * angle, embarked water, and low speed. This is the number the control room
   * uses to confirm that a casualty has actually been fixed, not just masked.
   */
  depthControlEffort() {
    const heavy = Math.max(0, this.floodMass_t - this.compensatedMass_t);
    const v = Math.abs(this.trim) * 18 + heavy * 9 + (10 - Math.min(10, this.speed)) * 3;
    return Math.max(0, Math.min(100, v));
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
      floodMass: this.floodMass_t.toFixed(1),
      effort: Math.round(this.depthControlEffort()),
    };
  }
}
