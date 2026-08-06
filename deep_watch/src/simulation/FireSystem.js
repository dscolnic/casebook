/**
 * FireSystem — fire as a physical process with an electrical cause.
 *
 * The single idea Mission 5 exists to teach: an electrical fire is not put out by
 * the agent, it is put out by DE-ENERGIZING. The agent only removes what is
 * burning right now. Leave the circuit alive and the fault keeps depositing energy
 * into the same insulation, and it lights again — which the simulation does, on a
 * timer, rather than telling anyone off.
 *
 * The fire triangle is modelled as three separable things, because each one is a
 * different action for the player:
 *
 *   IGNITION SOURCE   the energized fault. Removed at the switchboard, not the fire.
 *   FUEL              cable insulation. Consumed slowly; it is what reflashes.
 *   OXYGEN            the compartment atmosphere. The fire eats it and gives back
 *                     carbon monoxide, smoke and heat — which is why the fire is
 *                     also an atmosphere casualty and a habitability clock.
 *
 * Heat additionally runs through the bulkheads into the neighbouring compartments,
 * so "boundaries" is a real reading on an IR thermometer rather than a checkbox.
 *
 * Lineage: Protocol (protocol.html, `nc_fire_protocol`) — order-sensitive procedure
 * where the wrong tool fails through system behaviour rather than a red label.
 */

/**
 * Suppression agents. `conductive` is the property that matters on an energized
 * circuit: water and foam carry current back to whoever is holding the nozzle, and
 * they ground the fault as well.
 */
export const AGENTS = {
  co2: {
    id: 'co2', name: 'CO₂ extinguisher', conductive: false, knockdown: 1.0, residue: false,
    good: ['electrical'],
    note: 'Displaces oxygen and leaves nothing conductive behind. The right bottle for electrics — and it takes your oxygen too.',
  },
  dry_chem: {
    id: 'dry_chem', name: 'Dry chemical', conductive: false, knockdown: 0.9, residue: true,
    good: ['electrical', 'oil'],
    note: 'Interrupts the flame chemistry. Non-conductive, but the residue wrecks the equipment it saves.',
  },
  afff: {
    id: 'afff', name: 'AFFF foam', conductive: true, knockdown: 1.0, residue: true,
    good: ['oil'],
    note: 'Blankets burning liquid so vapour cannot rise. Water-based, so it conducts.',
  },
  water: {
    id: 'water', name: 'Water hose', conductive: true, knockdown: 0.8, residue: false,
    good: ['ordinary'],
    note: 'The best heat sink there is, and a conductor. Never on a live circuit.',
  },
};

/** Above this the compartment is not survivable without breathing gear. */
export const SMOKE_MASK_REQUIRED = 0.25;
/** Reflash watch: the seat has to be below this before a fire is really out. */
export const REFLASH_TEMP_C = 90;
/** An energized electrical fire relights this many seconds after knockdown. */
export const REFLASH_DELAY_S = 22;

export class FireSystem {
  constructor({ state, eventBus, layout, atmosphere }) {
    this.state = state;
    this.bus = eventBus;
    this.layout = layout;
    this.atmosphere = atmosphere;
    this.fires = [];
    this._elapsed = 0;
    state.activeFires = this.fires;
  }

  /**
   * Start a fire. `energizedBy` names the electrical source keeping it alive: a
   * local panel id, or a bus id. While that source is live the fire cannot be
   * permanently extinguished, only knocked down.
   */
  add({ id, compartment, kind = 'electrical', energizedBy = null, seat = 'cable run',
        seatId = null, intensity = 0.25 }) {
    const fire = {
      id, compartment, kind, energizedBy, seat, seatId,
      intensity,                 // 0..1
      fuel: 1,                   // 0..1, what is left to burn
      seatTempC: 180,
      knockedDownAt: null,
      reflashAt: null,
      extinguished: false,
      agentsUsed: [],
      reflashes: 0,
    };
    this.fires.push(fire);
    this.state.activeCasualties.push({ id, type: 'fire', severity: 'major', compartment });
    this.bus.emit('fire:started', { ...fire });
    return fire;
  }

  byId(id) { return this.fires.find((f) => f.id === id); }
  inCompartment(comp) { return this.fires.filter((f) => f.compartment === comp && !f.extinguished); }
  get active() { return this.fires.filter((f) => !f.extinguished && f.intensity > 0.02); }

  /** Is the thing feeding this fire still live? */
  isEnergized(fire) {
    const src = fire.energizedBy;
    if (!src) return false;
    const panel = this.state.electricalPanels[src];
    if (panel) {
      // A panel is only live if it is closed AND something upstream is feeding it,
      // so the fire can be killed at the handle or at the switchboard.
      const feed = panel.fedFrom ? this.state.electricalBuses[panel.fedFrom] : null;
      return panel.energized && !panel.tripped && (!feed || feed.energized);
    }
    const bus = this.state.electricalBuses[src];
    if (bus) return bus.energized;
    return false;
  }

  /**
   * De-energizing is done at the switchboard or the panel, not here — this just
   * reports what that meant for the fire, and starts the clock on the fuel that is
   * still hot.
   */
  noteIsolation(fire) {
    this.bus.emit('fire:deenergized', { id: fire.id, compartment: fire.compartment });
  }

  /**
   * Put an agent on a fire. The outcome is physics, not a verdict:
   *  - a conductive agent on a live circuit grounds it: the breaker trips, the
   *    player gets a shock hazard, and the fire is still there;
   *  - a correct agent knocks the fire down, always;
   *  - if the source is still energized it relights, because nothing removed the
   *    ignition source.
   */
  applyAgent(fireId, agentId) {
    const fire = this.byId(fireId);
    const agent = AGENTS[agentId];
    if (!fire || !agent) return { ok: false, reason: 'unknown' };
    if (fire.extinguished) return { ok: true, already: true };

    fire.agentsUsed.push(agentId);
    const live = this.isEnergized(fire);

    if (agent.conductive && live) {
      // Water or foam onto live electrics. The circuit faults to ground through
      // the stream; the protection trips, which is NOT the same as isolating.
      const panel = this.state.electricalPanels[fire.energizedBy];
      if (panel) { panel.tripped = true; panel.energized = false; }
      fire.intensity = Math.min(1, fire.intensity + 0.1);
      this.bus.emit('fire:shockHazard', {
        id: fire.id, agent: agentId, compartment: fire.compartment,
        note: `${agent.name} on a live circuit. The stream conducted, the protection tripped, and you were holding the nozzle. The fire is still burning.`,
      });
      return { ok: false, shock: true, agent: agentId };
    }

    if (!agent.good.includes(fire.kind)) {
      fire.intensity = Math.max(0.05, fire.intensity - 0.1);
      this.bus.emit('fire:wrongAgent', {
        id: fire.id, agent: agentId,
        note: `${agent.name} is not the agent for a ${fire.kind} fire. It knocks the flame back and it comes straight up again.`,
      });
      return { ok: false, wrongAgent: true, agent: agentId };
    }

    // Correct agent: the flame goes out. Whether it STAYS out is a different question.
    fire.intensity = Math.max(0, fire.intensity - agent.knockdown);
    fire.knockedDownAt = this._elapsed;
    if (live) {
      fire.reflashAt = this._elapsed + REFLASH_DELAY_S;
      this.bus.emit('fire:knockedDown', {
        id: fire.id, energized: true,
        note: 'Flame out — but that circuit is still live and the fault is still there. You have bought seconds, not a fix.',
      });
      return { ok: true, knockdown: true, energized: true };
    }
    fire.reflashAt = null;
    this.bus.emit('fire:knockedDown', {
      id: fire.id, energized: false,
      note: 'Flame out on a dead circuit. Now watch the seat temperature — hot insulation relights itself.',
    });
    return { ok: true, knockdown: true, energized: false };
  }

  /** Boundary cooling: a hose on the far side of the bulkhead. */
  coolBoundary(compartment) {
    let cooled = false;
    for (const f of this.fires) {
      const idx = this.layout.findIndex((c) => c.id === f.compartment);
      const here = this.layout.findIndex((c) => c.id === compartment);
      if (Math.abs(idx - here) === 1) { f.boundaryCooled = true; cooled = true; }
    }
    if (cooled) this.bus.emit('fire:boundaryCooled', { compartment });
    return cooled;
  }

  /** Bulkhead temperature in a compartment next to a fire, °C. */
  boundaryTempC(compartment) {
    const here = this.layout.findIndex((c) => c.id === compartment);
    let t = this.atmosphere?.air(compartment)?.tempC ?? 24;
    for (const f of this.fires) {
      const idx = this.layout.findIndex((c) => c.id === f.compartment);
      if (Math.abs(idx - here) !== 1) continue;
      const conducted = f.seatTempC * 0.22 * (f.boundaryCooled ? 0.45 : 1);
      t = Math.max(t, 24 + conducted * Math.max(0.15, f.intensity + 0.15));
    }
    return t;
  }

  /** A fire is out when it is cold as well as dark. */
  isSafe(fire) {
    return fire.extinguished && fire.seatTempC < REFLASH_TEMP_C;
  }

  update(dt) {
    if (dt <= 0) return;
    this._elapsed += dt;
    const dtMin = dt / 60;

    for (const fire of this.fires) {
      const live = this.isEnergized(fire);
      const air = this.atmosphere?.air(fire.compartment);
      const oxygen = air ? Math.max(0, Math.min(1, (air.o2 - 14) / 6.9)) : 1;

      if (fire.intensity > 0.02) {
        // Growth needs fuel and oxygen; an energized fault also keeps feeding it.
        const growth = (0.16 + (live ? 0.12 : 0)) * oxygen * Math.min(1, fire.fuel * 2);
        fire.intensity = Math.min(1, fire.intensity + growth * dtMin);
        fire.fuel = Math.max(0, fire.fuel - fire.intensity * 0.05 * dtMin);
        fire.seatTempC += (180 + fire.intensity * 520 - fire.seatTempC) * Math.min(1, dtMin * 1.6);

        // Products into the air: this is why a fire is a habitability problem.
        // Products, per minute at full intensity. These outrun the ventilation on
        // purpose: a fire the fans can clear faster than it burns is not a fire,
        // and the smoke is what forces the player onto air.
        this.atmosphere?.inject(fire.compartment, {
          co: 150 * fire.intensity * dtMin,
          smoke: 1.4 * fire.intensity * dtMin,
          heat: 35 * fire.intensity * dtMin,
          o2burn: 0.9 * fire.intensity * dtMin,
        });
      } else {
        // Knocked down: the seat cools, faster if the boundary is being cooled.
        const cool = fire.boundaryCooled ? 2.4 : 1.4;
        fire.seatTempC += (24 - fire.seatTempC) * Math.min(1, dtMin * cool);
      }

      // Reflash: the fault is still live, so it lights again. Not a punishment —
      // the same physics that made it burn the first time.
      if (fire.reflashAt != null && this._elapsed >= fire.reflashAt && fire.intensity <= 0.02) {
        if (this.isEnergized(fire) && fire.fuel > 0.05) {
          fire.intensity = 0.3;
          fire.reflashAt = null;
          fire.reflashes += 1;
          this.bus.emit('fire:reflash', {
            id: fire.id, compartment: fire.compartment, count: fire.reflashes,
            note: 'It is back. Nothing removed the ignition source — the circuit is still energized and the fault is still faulting.',
          });
        } else {
          fire.reflashAt = null;
        }
      }

      // Out, and cold: only now is it a fire that has been put out.
      if (!fire.extinguished && fire.intensity <= 0.02 && !this.isEnergized(fire)
          && fire.seatTempC < REFLASH_TEMP_C) {
        fire.extinguished = true;
        const i = this.state.activeCasualties.findIndex((c) => c.id === fire.id);
        if (i >= 0) this.state.activeCasualties.splice(i, 1);
        this.bus.emit('fire:out', { id: fire.id, compartment: fire.compartment, reflashes: fire.reflashes });
      }
    }
  }
}
