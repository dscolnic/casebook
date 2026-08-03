/**
 * FloodingSystem — the physical flooding simulation.
 *
 * A flooding source is a hole in a boundary. How much water it passes depends on
 * the head behind it (sea pressure at depth for a sea-connected line), how much of
 * the opening is still open (patch/clamp/wedges), and whether the line that feeds
 * it is still lined up to the sea (isolation valves). Water lands in a compartment
 * bilge of known plan area, so a measured rise rate converts directly to a volume
 * rate — which is exactly the estimate the player has to make.
 *
 * Everything this module computes is written into `SubmarineState`, so the trim,
 * depth, self-noise, and electrical couplings fall out of the shared state rather
 * than being special-cased by the mission.
 *
 * Content lineage: the candidate-fault set and the reading names are adapted from
 * the Diagnosis pack `nc_flooding_diag` ("The Water Keeps Rising",
 * navy_course_package/diagnosis/nc_flooding_playable.html): its hypotheses
 * (hull / firemain / cooling / ballastx / sensor / pumpfail / normal) and its
 * readings (level, salinity, firemain, cooling, isolation, list, ballast, pump,
 * redundant, adjacent) survive here as submarine systems and handheld/station
 * measurements instead of a single 2-D panel.
 */

/** Plan area of each compartment's bilge, m². Rise rate ÷ area = volume rate. */
export const BILGE_AREA = {
  forward_equipment: 11,
  sonar_electronics: 7,
  sonar_room: 9,
  control_room: 12,
  radio_room: 6,
  berthing_mess: 10,
  machinery_control: 9,
  propulsion: 11,
  electrical: 8,
  auxiliary: 9,
};

/** Depth of the bilge recess below the deck plates, cm. Above this, water is on deck. */
export const BILGE_DEPTH_CM = 90;

/** Height of the forward power panel's lower gland above the bilge bottom, cm. */
export const PANEL_THREAT_CM = 45;

/** Valves that appear on the forward seawater manifold (id → label + what it feeds). */
export const VALVES = {
  fwd_sw_supply_inbd: {
    label: 'FWD SEAWATER SUPPLY — INBOARD',
    feeds: 'Forward seawater supply header (inboard side of the rupture).',
    dependents: ['Forward seawater service', 'Sonar-array cooling (via the supply header)'],
  },
  fwd_sw_supply_outbd: {
    label: 'FWD SEAWATER SUPPLY — OUTBOARD (HULL)',
    feeds: 'Sea connection for the forward seawater header.',
    dependents: ['Everything downstream of the forward sea suction'],
  },
  sonar_cooling_supply: {
    label: 'SONAR-ARRAY COOLING SUPPLY',
    feeds: 'Cooling water to the sonar-array electronics cabinets.',
    dependents: ['Sonar-array electronics cooling'],
  },
  trim_drain: {
    label: 'TRIM & DRAIN CROSS-OVER',
    feeds: 'Trim system / drain main.',
    dependents: ['Trim transfer'],
  },
  sw_crossconnect: {
    label: 'SEAWATER CROSS-CONNECT (AFT SUPPLY)',
    feeds: 'Cross-connects the aft seawater header forward — an alternate cooling path.',
    dependents: ['Sonar-array cooling from the aft header'],
  },
};

/**
 * Candidate explanations for a rising forward bilge. Signature values use the
 * vocabulary of the source Diagnosis pack so the reasoning transfers: each
 * hypothesis must explain EVERY reading, including the calm ones.
 */
export const FLOOD_HYPOTHESES = [
  {
    id: 'sw_branch',
    label: 'Ruptured forward seawater-supply branch',
    claim: 'A sea-connected supply branch has failed below the forward deck plates; shutting both sides of the branch stops it.',
    sig: { level: 'rise', salinity: 'seawater', swPressure: 'low', trimPressure: 'normal', isolation: 'stops', trim: 'worsening', ballast: 'normal', pump: 'overwhelmed', redundant: 'agree', adjacent: 'dry' },
    action: 'Isolate the branch both sides, patch the rupture, then dewater.',
  },
  {
    id: 'hull',
    label: 'Hull breach below the waterline',
    claim: 'Seawater is entering through damaged shell plating and will not respond to isolating ship systems.',
    sig: { level: 'rise', salinity: 'seawater', swPressure: 'normal', trimPressure: 'normal', isolation: 'nochange', trim: 'worsening', ballast: 'normal', pump: 'overwhelmed', redundant: 'agree', adjacent: 'dry' },
    action: 'Set flooding boundaries, shore and patch the shell, control progressive flooding.',
    whyNot: 'A hull breach would leave the forward seawater header at normal pressure — this branch has lost pressure — and it would not care whether you isolated it.',
  },
  {
    id: 'trim_line',
    label: 'Ruptured trim & drain line',
    claim: 'The trim system line has failed and is discharging into the bilge.',
    sig: { level: 'rise', salinity: 'seawater', swPressure: 'normal', trimPressure: 'low', isolation: 'stops', trim: 'worsening', ballast: 'normal', pump: 'coping', redundant: 'agree', adjacent: 'dry' },
    action: 'Isolate the trim & drain cross-over.',
    whyNot: 'Trim & drain pressure is steady at its normal value; the pressure that collapsed is on the seawater supply header.',
  },
  {
    id: 'ballast',
    label: 'Uncommanded ballast transfer',
    claim: 'A ballast valve lineup is moving seawater into an unintended tank or overflow path.',
    sig: { level: 'rise', salinity: 'seawater', swPressure: 'normal', trimPressure: 'normal', isolation: 'stops', trim: 'shifting', ballast: 'offplan', pump: 'coping', redundant: 'agree', adjacent: 'dry' },
    action: 'Correct the ballast valve lineup and verify tank boundaries.',
    whyNot: 'Every ballast tank sounding is on plan and no transfer was ordered.',
  },
  {
    id: 'sensor',
    label: 'Bilge-level sensor fault',
    claim: 'The presenting level channel is rising without physical water behind it.',
    sig: { level: 'apparent', salinity: 'dry', swPressure: 'normal', trimPressure: 'normal', isolation: 'nochange', trim: 'stable', ballast: 'normal', pump: 'dry', redundant: 'disagree', adjacent: 'dry' },
    action: 'Verify locally with an independent measurement before taking flooding actions.',
    whyNot: 'You put a sounding tape and a salinity probe into real, salty water, and the trim is genuinely going bow-down. This is not a number problem.',
  },
  {
    id: 'pumpfail',
    label: 'Bilge-pump casualty with ordinary leakage',
    claim: 'Routine leakage is accumulating because the selected bilge pump is not producing discharge.',
    sig: { level: 'slow', salinity: 'mixed', swPressure: 'normal', trimPressure: 'normal', isolation: 'nochange', trim: 'stable', ballast: 'normal', pump: 'noflow', redundant: 'agree', adjacent: 'dry' },
    action: 'Shift bilge pumps and restore dewatering.',
    whyNot: 'The forward bilge pump is discharging at close to its rated capacity — and losing anyway. The source is stronger than ordinary leakage.',
  },
  {
    id: 'condensate',
    label: 'Condensate / documented drain-down',
    claim: 'A known finite drain is producing a small temporary rise that will stop on its own.',
    sig: { level: 'small', salinity: 'fresh', swPressure: 'normal', trimPressure: 'normal', isolation: 'complete', trim: 'stable', ballast: 'normal', pump: 'cycling', redundant: 'agree', adjacent: 'dry' },
    action: 'Monitor and keep dewatering available.',
    whyNot: 'Condensate is fresh water and finite. This water is seawater-salty and the level is still climbing after several minutes.',
  },
];

export const CORRECT_HYPOTHESIS = 'sw_branch';

/** How much of the opening each temporary repair closes, and whether it can hold pressure. */
const REPAIRS = {
  soft_patch: { name: 'Soft patch & band-it', close: 1.0, holdsPressure: false },
  pipe_clamp: { name: 'Split pipe clamp', close: 1.0, holdsPressure: true },
  shoring: { name: 'Shoring wedges & battens', close: 0.45, holdsPressure: true },
};

export class FloodingSystem {
  constructor({ state, eventBus, layout }) {
    this.state = state;
    this.bus = eventBus;
    this.layout = layout;
    /** @type {Array} active sources; each also lives in state.floodingSources */
    this.sources = [];
    this.peakLevelCm = 0;
    this.progressive = false;
    this._panelTimer = 0;
    this._history = [];    // { t, compartment, cm } sampled level history for trends
    this._elapsed = 0;
  }

  /** Seed a flooding source. `cfg.compartment` must have a BILGE_AREA entry. */
  addSource(cfg) {
    const src = {
      id: cfg.id,
      compartment: cfg.compartment,
      kind: cfg.kind || 'seawater_pipe',
      line: cfg.line || null,
      // Nominal volume rate at the reference depth, m³/h.
      nominal_m3h: cfg.nominal_m3h ?? 48,
      refDepth: cfg.refDepth ?? 60,
      // Residual weep once the branch is isolated (trapped section draining).
      isolatedFraction: cfg.isolatedFraction ?? 0.08,
      boundedBy: cfg.boundedBy || [],
      position: cfg.position || { x: 0, z: 0 },
      repair: null,             // { kind, appliedAt, holding }
      discovered: false,
      isolated: false,
      rate_m3h: 0,
    };
    this.sources.push(src);
    this.state.floodingSources.push(src);
    this.state.activeCasualties.push({ id: src.id, type: 'flooding', severity: 'major' });
    this.bus.emit('flooding:started', { id: src.id, compartment: src.compartment });
    return src;
  }

  bySource(id) { return this.sources.find((s) => s.id === id); }

  /** Both bounding valves shut = the branch is isolated from the sea. */
  isIsolated(src) {
    if (!src.boundedBy.length) return false;
    return src.boundedBy.every((v) => this.state.valveStates[v] === 'shut');
  }

  /**
   * Apply a temporary repair. A soft patch cannot hold against a pressurised line:
   * if the branch has not been isolated first, it blows off after a few seconds.
   * That is the consequence the spec asks for — the system punishes the order
   * error, not a red "wrong" label.
   */
  applyRepair(src, kind) {
    const def = REPAIRS[kind];
    if (!def) return { ok: false, reason: 'unknown repair' };
    const pressurised = !this.isIsolated(src);
    src.repair = { kind, close: def.close, appliedAt: this._elapsed, holding: true, pressurised };
    this.bus.emit('flooding:repairApplied', { id: src.id, kind, name: def.name, pressurised });
    if (pressurised && !def.holdsPressure) {
      // Scheduled failure — handled in update() so it is deterministic in tests.
      src.repair.willFailAt = this._elapsed + 14;
    }
    return { ok: true, pressurised };
  }

  removeRepair(src) {
    src.repair = null;
  }

  /** Current inflow for one source, m³/h. */
  sourceRate(src) {
    const depthFactor = Math.sqrt(Math.max(5, this.state.depth) / src.refDepth);
    let rate = src.nominal_m3h * depthFactor;
    if (this.isIsolated(src)) rate *= src.isolatedFraction;
    if (src.repair && src.repair.holding) rate *= (1 - src.repair.close);
    return rate;
  }

  /** Total dewatering capacity serving a compartment, m³/h. */
  removalFor(compartment) {
    const p = this.state.pumpStates;
    let cap = 0;
    if (compartment === 'forward_equipment' || compartment === 'sonar_electronics') {
      if (p.bilgePumpFwd?.on && this._pumpPowered('bilgePumpFwd')) cap += p.bilgePumpFwd.capacity_m3h;
    } else if (p.bilgePumpAft?.on) {
      cap += p.bilgePumpAft.capacity_m3h;
    }
    const port = p.portablePump;
    if (port?.on && port.deployedIn === compartment) cap += port.capacity_m3h;
    return cap;
  }

  _pumpPowered(pumpId) {
    // The forward bilge pump is fed from the forward power panel.
    if (pumpId !== 'bilgePumpFwd') return true;
    const panel = this.state.electricalPanels?.fwd_power_2f;
    return !panel || (panel.energized && !panel.tripped);
  }

  /** Suction can only lift water that is actually there. */
  _effectiveRemoval(compartment, levelCm, capacity) {
    if (levelCm <= 0.4) return 0;
    // Below ~4 cm the suction starts to lose prime and tails off.
    const prime = Math.min(1, levelCm / 4);
    return capacity * prime;
  }

  update(dt) {
    const s = this.state;
    this._elapsed += dt;

    // 1. Repairs that were applied to a pressurised line let go.
    for (const src of this.sources) {
      const r = src.repair;
      if (r && r.holding && r.willFailAt != null && this._elapsed >= r.willFailAt) {
        r.holding = false;
        this.bus.emit('flooding:repairFailed', { id: src.id, kind: r.kind });
        this.bus.emit('hud:toast', {
          concept: 'Patch blown off',
          text: 'The soft patch let go. A patch cannot hold against a line that is still lined up to the sea — isolate the branch first, then patch.',
        });
        src.repair = null;
      }
      const nowIsolated = this.isIsolated(src);
      if (nowIsolated !== src.isolated) {
        src.isolated = nowIsolated;
        this.bus.emit('flooding:isolationChanged', { id: src.id, isolated: nowIsolated });
      }
    }

    // 2. Inflow and removal per compartment.
    const inflow = {};
    for (const src of this.sources) {
      src.rate_m3h = this.sourceRate(src);
      inflow[src.compartment] = (inflow[src.compartment] || 0) + src.rate_m3h;
    }

    const dtH = dt / 3600;
    const compartments = new Set([...Object.keys(inflow), ...Object.keys(s.bilgeLevels)]);
    for (const comp of compartments) {
      const area = BILGE_AREA[comp] ?? 8;
      const level = s.bilgeLevels[comp] ?? 0;
      const capacity = this.removalFor(comp);
      const removal = this._effectiveRemoval(comp, level, capacity);
      let dV = ((inflow[comp] || 0) - removal) * dtH;   // m³ this step

      // Progressive flooding: once the recess is full, water crosses the boundary
      // into the next compartment aft rather than piling up without limit.
      let next = 0;
      if (level >= BILGE_DEPTH_CM && dV > 0) {
        next = dV * 0.45;
        dV -= next;
      }
      const newLevel = Math.max(0, level + (dV / area) * 100);
      s.bilgeLevels[comp] = newLevel;

      if (next > 0) {
        const adj = this._adjacentAft(comp);
        if (adj) {
          const aArea = BILGE_AREA[adj] ?? 8;
          s.bilgeLevels[adj] = (s.bilgeLevels[adj] ?? 0) + (next / aArea) * 100;
          if (!this.progressive) {
            this.progressive = true;
            this.bus.emit('flooding:progressive', { from: comp, to: adj });
            this.bus.emit('hud:toast', {
              concept: 'Progressive flooding',
              text: `Water is over the deck plates and crossing the boundary into ${adj.replace(/_/g, ' ')}. The casualty is no longer contained to one compartment.`,
            });
          }
        }
      }
      if (newLevel > this.peakLevelCm) this.peakLevelCm = newLevel;
    }

    // 3. Mass, trim moment and depth: water is weight, and it is weight in a place.
    let mass = 0;
    for (const [comp, cm] of Object.entries(s.bilgeLevels)) {
      const area = BILGE_AREA[comp] ?? 8;
      mass += (cm / 100) * area * 1.025;    // tonnes of seawater
    }
    s.floodMass_t = mass;

    // 4. Flow noise: an open, unisolated hole is a loud broadband source.
    const worst = this.sources.reduce((m, x) => Math.max(m, x.rate_m3h), 0);
    const idx = s.machineryNoiseSources.findIndex((n) => n.id === 'flood_flow');
    if (worst > 1.5) {
      const entry = {
        id: 'flood_flow',
        freqHz: 90,
        level: Math.min(16, worst * 0.3),
        compartment: this.sources[0]?.compartment ?? 'forward_equipment',
        label: 'Continuous flow noise (internal)',
      };
      if (idx >= 0) s.machineryNoiseSources[idx] = entry; else s.machineryNoiseSources.push(entry);
    } else if (idx >= 0) {
      s.machineryNoiseSources.splice(idx, 1);
    }

    // 5. Once the source is stopped and the compartment is dry, Control stops
    //    compensating trim — the boat no longer needs the help, and securing the
    //    trim pump is 3 dB back off the self-noise floor.
    if (this.stopped && (s.bilgeLevels[this.sources[0]?.compartment] ?? 0) < 5 && s.pumpStates.trimPump.on) {
      s.pumpStates.trimPump.on = false;
      s.compensatedMass_t = 0;
      this.bus.emit('hud:toast', {
        concept: 'Compensation secured',
        text: 'Control has stopped compensating and secured the trim pump — the boat is back in its own trim.',
      });
    }

    // 6. Electrical threat: water climbing to the forward power panel's gland.
    this._updateElectricalThreat(dt);

    // 6. Cooling dependency: shutting the forward seawater header also secures
    //    cooling to the sonar-array electronics unless the cross-connect is open.
    this._updateSonarCooling(dt);

    // 7. Trend history (used by the DC plotting board and the verification stages).
    if (this._history.length === 0 || this._elapsed - this._history[this._history.length - 1].t > 5) {
      this._history.push({ t: this._elapsed, level: s.bilgeLevels.forward_equipment ?? 0 });
      if (this._history.length > 240) this._history.shift();
    }
  }

  _adjacentAft(comp) {
    const i = this.layout.findIndex((c) => c.id === comp);
    return i >= 0 && i + 1 < this.layout.length ? this.layout[i + 1].id : null;
  }

  _updateElectricalThreat(dt) {
    const s = this.state;
    const panel = s.electricalPanels?.fwd_power_2f;
    if (!panel) return;
    const level = s.bilgeLevels.forward_equipment ?? 0;
    if (level >= PANEL_THREAT_CM && panel.energized && !panel.tripped) {
      this._panelTimer += dt;
      if (this._panelTimer > 6) {
        panel.tripped = true;
        panel.energized = false;
        s.pumpStates.bilgePumpFwd.on = false;
        this.bus.emit('electrical:panelTripped', { id: 'fwd_power_2f' });
        this.bus.emit('hud:toast', {
          concept: 'Ground fault',
          text: 'Water reached the forward power panel. It tripped — and it was feeding the forward bilge pump, which just stopped. Secure threatened electrical equipment before the water gets to it.',
        });
      }
    } else if (level < PANEL_THREAT_CM - 5) {
      this._panelTimer = 0;
    }
    // Warn once while there is still time to act.
    if (!this._warnedPanel && panel.energized && !panel.tripped
        && level > PANEL_THREAT_CM - 18 && level < PANEL_THREAT_CM) {
      this._warnedPanel = true;
      this.bus.emit('hud:toast', {
        concept: 'Electrical boundary',
        text: 'The forward power panel\'s lower gland is about 45 cm above the bilge bottom. The water is close to it.',
      });
    }
  }

  _updateSonarCooling(dt) {
    const s = this.state;
    const supply = s.valveStates.fwd_sw_supply_inbd === 'open' && s.valveStates.sonar_cooling_supply === 'open';
    const cross = s.valveStates.sw_crossconnect === 'open' && s.valveStates.sonar_cooling_supply === 'open';
    const cooled = supply || cross;
    const cur = s.compartmentTemperature.sonar_electronics ?? 26;
    const target = cooled ? 26 : 63;
    const rate = cooled ? 0.05 : 0.022;      // recovers faster than it heats
    s.compartmentTemperature.sonar_electronics = cur + (target - cur) * Math.min(1, rate * dt);
    s.coolingLoops.sonarArray = {
      flow: cooled ? 1 : 0,
      tempC: s.compartmentTemperature.sonar_electronics,
      pumpOn: cooled,
    };
    if (!cooled && !this._warnedCooling && s.compartmentTemperature.sonar_electronics > 40) {
      this._warnedCooling = true;
      this.bus.emit('hud:toast', {
        concept: 'Dependent system',
        text: 'Sonar-array electronics cooling came from the header you shut. Cabinet temperature is climbing — open the aft seawater cross-connect to restore it.',
      });
    }
  }

  /** Instantaneous rise rate in the forward bilge, cm/min (negative = falling). */
  riseRateCmPerMin(comp = 'forward_equipment') {
    const area = BILGE_AREA[comp] ?? 8;
    let inflow = 0;
    for (const src of this.sources) if (src.compartment === comp) inflow += src.rate_m3h;
    const level = this.state.bilgeLevels[comp] ?? 0;
    const removal = this._effectiveRemoval(comp, level, this.removalFor(comp));
    return ((inflow - removal) / area) * 100 / 60;
  }

  totalInflow(comp = 'forward_equipment') {
    let inflow = 0;
    for (const src of this.sources) if (src.compartment === comp) inflow += src.rate_m3h;
    return inflow;
  }

  /** The reading vocabulary the Diagnosis panel is judged against. */
  observedSignature() {
    const s = this.state;
    const src = this.sources[0];
    const level = s.bilgeLevels.forward_equipment ?? 0;
    return {
      level: level > 8 ? 'rise' : level > 0 ? 'small' : 'apparent',
      salinity: 'seawater',
      swPressure: 'low',
      trimPressure: 'normal',
      isolation: 'stops',
      trim: s.trim > 0.4 ? 'worsening' : 'stable',
      ballast: 'normal',
      pump: src && this.removalFor('forward_equipment') > 0 && this.riseRateCmPerMin() > 0 ? 'overwhelmed' : 'coping',
      redundant: 'agree',
      adjacent: (s.bilgeLevels.sonar_electronics ?? 0) > 1 ? 'wet' : 'dry',
    };
  }

  /** True once the casualty is stopped at the source (not merely being pumped). */
  get stopped() {
    return this.sources.every((src) => this.isIsolated(src) && src.repair && src.repair.holding);
  }

  reset() {
    for (const src of this.sources) {
      const i = this.state.floodingSources.indexOf(src);
      if (i >= 0) this.state.floodingSources.splice(i, 1);
    }
    this.sources.length = 0;
    this.state.activeCasualties = this.state.activeCasualties.filter((c) => c.type !== 'flooding');
    this.state.bilgeLevels = {};
    this.state.floodMass_t = 0;
    this.peakLevelCm = 0;
    this.progressive = false;
    this._panelTimer = 0;
    this._warnedPanel = false;
    this._warnedCooling = false;
    this._history.length = 0;
    this._elapsed = 0;
    const i = this.state.machineryNoiseSources.findIndex((n) => n.id === 'flood_flow');
    if (i >= 0) this.state.machineryNoiseSources.splice(i, 1);
  }
}
