import { AGENTS, SMOKE_MASK_REQUIRED } from './FireSystem.js';
import { InstrumentManager } from '../instruments/InstrumentManager.js';
import { CO_DANGER_PPM, O2_DEFICIENT } from './AtmosphereSystem.js';

/**
 * FireControl — the player's physical actions against a fire, and what the boat
 * does back.
 *
 * The same rule as DamageControl: nothing is greyed out, nothing prints "wrong".
 * Putting a water-based agent on a live circuit is allowed, and what happens is
 * that the stream conducts, the protection trips and you are still standing in
 * front of a fire. Working in smoke without going on air is allowed too, and what
 * happens is that you stop being able to read anything.
 */
export class FireControl {
  constructor({ eventBus, state, fire, atmosphere, inventory, world, compartmentManager }) {
    this.bus = eventBus;
    this.state = state;
    this.fire = fire;
    this.atmosphere = atmosphere;
    this.inventory = inventory;
    this.world = world;
    this.compartments = compartmentManager;

    /** Seconds the player has spent in an atmosphere they should not be breathing. */
    this.exposureS = 0;
    this.actions = [];
    state.playerOnAir = false;

    this.bus.on('interact:fire_seat', (rec) => this.attack(rec.data.compartment));
    this.bus.on('interact:eab_manifold', () => this.toggleAir());
    this.bus.on('interact:hose_reel', (rec) => this.coolBoundary(rec.data.compartment));
    this.bus.on('interact:damper', (rec) => this.operateDamper(rec.data.compartment));
  }

  log(kind, detail = {}) {
    const entry = { kind, ...detail, clock: this.state.formatClock() };
    this.actions.push(entry);
    this.bus.emit('dc:action', entry);
    return entry;
  }

  /** Plug into the emergency air manifold, or come off it. */
  toggleAir() {
    const on = !this.state.playerOnAir;
    this.state.playerOnAir = on;
    this.log(on ? 'donEAB' : 'doffEAB');
    this.bus.emit('atmosphere:onAir', { onAir: on });
    this.bus.emit('hud:toast', {
      concept: on ? 'On air' : 'Off air',
      text: on
        ? 'Mask on and plugged into the manifold. You are breathing ship\'s air, not compartment air — and you are tethered, so moving means unplugging and plugging in again at the next manifold.'
        : 'Off air and breathing the compartment. Fine in a clean space; a short career in a smoke-filled one.',
    });
    return on;
  }

  /**
   * Discharge whatever extinguisher is in hand at the seat of the fire in this
   * compartment. Which bottle you are carrying is the whole decision.
   */
  attack(compartment) {
    const fires = this.fire.inCompartment(compartment);
    if (!fires.length) {
      this.bus.emit('hud:toast', { concept: 'Cable run', text: 'A cable-run junction box. Warm, ordinary, and not on fire.' });
      return { ok: false, noFire: true };
    }
    const activeId = this.inventory.activeId;
    const def = activeId ? InstrumentManager.def(activeId) : null;
    const agentId = def?.agent;
    if (!agentId) {
      this.bus.emit('hud:toast', {
        concept: 'Nothing to fight it with',
        text: 'You are not holding an extinguisher. There are bottles in the damage-control lockers — and which one you bring matters.',
      });
      return { ok: false, noAgent: true };
    }

    const fire = fires[0];
    const res = this.fire.applyAgent(fire.id, agentId);
    this.log('fireAgent', { agent: agentId, compartment, ok: res.ok });

    if (res.shock) {
      this.bus.emit('hud:toast', {
        concept: 'Conductive agent on a live circuit',
        text: `${AGENTS[agentId].name} conducts. The stream earthed the fault through the nozzle you are holding, the breaker tripped, and the fire is still burning. De-energize FIRST, at the switchboard.`,
      });
    } else if (res.wrongAgent) {
      this.bus.emit('hud:toast', {
        concept: 'Wrong agent',
        text: `${AGENTS[agentId].name} knocks the flame back and it comes straight up again. ${AGENTS[agentId].note}`,
      });
    } else if (res.energized) {
      this.bus.emit('hud:toast', {
        concept: 'Knocked down, not out',
        text: 'The flame is out and that circuit is still live. Nothing has removed the ignition source, so watch what happens next.',
      });
    } else if (res.knockdown) {
      this.bus.emit('hud:toast', {
        concept: 'Flame out',
        text: 'Out, on a dead circuit. Now it has to get COLD — hot insulation relights itself. Read the seat with the IR thermometer before you call it.',
      });
    }
    return res;
  }

  /** Boundary cooling from the compartment next door. */
  coolBoundary(compartment) {
    const cooled = this.fire.coolBoundary(compartment);
    this.log('boundaryCooling', { compartment, effective: cooled });
    this.bus.emit('hud:toast', {
      concept: 'Boundary cooling',
      text: cooled
        ? 'Hose on the bulkhead. The steel on this side is coming down, which keeps the fire in one compartment instead of two.'
        : 'Hose run, but nothing on the other side of this bulkhead is burning. Boundary cooling is for the compartment NEXT to a fire.',
    });
    return cooled;
  }

  operateDamper(compartment) {
    const open = this.state.ventDampers[compartment] !== 'open';
    this.atmosphere.setDamper(compartment, open);
    this.log('damper', { compartment, open });
    this.bus.emit('hud:toast', {
      concept: open ? 'Damper open' : 'Damper shut',
      text: open
        ? 'Ventilation reaches this compartment again: the scrubber can take its CO₂ and the fans can carry smoke away.'
        : 'This compartment is sealed off from the ventilation. Nothing gets in — and nothing gets scrubbed out either.',
    });
    return open;
  }

  /**
   * Per-frame: what the atmosphere is doing to the person standing in it, and the
   * ember glow on any seat that is actually burning.
   */
  update(dt) {
    for (const [id, seat] of this.world?.fireSeats ?? []) {
      const f = this.fire.fires.find((x) => x.seatId === id || `fire_seat_${x.compartment}` === id);
      const burning = f && !f.extinguished && f.intensity > 0.05;
      seat.ember.visible = !!burning;
      if (burning) seat.ember.material.opacity = Math.min(1, 0.4 + f.intensity * 0.6);
    }

    const here = this.compartments?.currentId;
    const air = here ? this.atmosphere.air(here) : null;
    if (!air) return;

    const unbreathable = air.smoke > SMOKE_MASK_REQUIRED
      || air.co > CO_DANGER_PPM
      || air.o2 < O2_DEFICIENT;
    if (unbreathable && !this.state.playerOnAir) {
      this.exposureS += dt;
      if (this.exposureS > 6 && !this._warned) {
        this._warned = true;
        this.bus.emit('hud:toast', {
          concept: 'You cannot breathe this',
          text: 'Smoke and carbon monoxide. Your eyes are streaming and you are getting a headache — go on air at an EAB manifold before you try to read anything.',
        });
      }
    } else {
      this.exposureS = Math.max(0, this.exposureS - dt * 0.6);
      if (this.exposureS < 1) this._warned = false;
    }
    // 0..1 — drives the smoke veil, and how badly the player can read a gauge.
    this.state.smokeImpairment = Math.min(1, this.exposureS / 25)
      * (this.state.playerOnAir ? 0.25 : 1)
      + (air.smoke > 0.1 && !this.state.playerOnAir ? Math.min(0.5, air.smoke * 0.5) : 0);
  }
}
