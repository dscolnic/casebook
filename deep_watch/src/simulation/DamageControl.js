import { VALVES } from './FloodingSystem.js';

/**
 * DamageControl — turns the player's physical actions into changes in the
 * flooding simulation, and reports the consequence of each one.
 *
 * Every action here is available at any time, in any order. Nothing is greyed
 * out and nothing prints "wrong". Doing them in a poor order produces a physical
 * consequence instead: a soft patch on a live line blows off, shutting the wrong
 * valve secures cooling to a system you still need, running pumps raises the
 * self-noise floor and masks the contact sonar is trying to hold.
 *
 * Source lineage: this is the Protocol game's "match the stage to the correct
 * action / spot the decoy tool" skill (protocol.html, `nc_fire_protocol` set),
 * rebuilt as physical procedure with system feedback rather than action cards.
 */
export class DamageControl {
  constructor({ eventBus, state, flooding, inventory, world, compartmentManager, instruments }) {
    this.bus = eventBus;
    this.state = state;
    this.flooding = flooding;
    this.inventory = inventory;
    this.world = world;
    this.compartments = compartmentManager;
    this.instruments = instruments;

    /** Audit trail — every DC action, in order. Scoring and the debrief read this. */
    this.actions = [];
    this.reported = false;
    this.reportedAt = null;
    this.unnecessary = 0;

    this._wire();
  }

  log(kind, detail = {}) {
    const entry = { kind, ...detail, clock: this.state.formatClock(), t: this.state.clock.minutes };
    this.actions.push(entry);
    this.bus.emit('dc:action', entry);
    return entry;
  }

  did(kind) { return this.actions.some((a) => a.kind === kind); }

  _wire() {
    this.bus.on('interact:valve', (rec) => this.operateValve(rec.data.valveId));
    this.bus.on('interact:panel', (rec) => this.operatePanel(rec.data.panelId));
    this.bus.on('interact:rupture', (rec) => this.workOnRupture(rec.data.sourceId));
    this.bus.on('interact:sump', (rec) => this.setPumpSuction(rec.data.compartment));
    this.bus.on('interact:comms', () => this.report());
    this.bus.on('interact:deckplate', (rec) => this.operateDeckPlate(rec));
  }

  // ---- Deck plates -------------------------------------------------------
  operateDeckPlate(rec) {
    const open = !rec.data.open;
    this.world.setDeckPlate(rec.id, open);
    this.log(open ? 'liftDeckPlate' : 'replaceDeckPlate', { id: rec.id, compartment: rec.data.compartment });
    if (!open) return;

    const level = this.state.bilgeLevels[rec.data.bilge] ?? 0;
    const src = this.flooding.sources.find((s) => s.compartment === rec.data.bilge);
    if (src && !src.discovered) {
      src.discovered = true;
      this.bus.emit('flooding:discovered', { id: src.id, compartment: src.compartment, level });
    }
    if (level > 1) {
      this.bus.emit('hud:toast', {
        concept: 'Bilge',
        text: `The plate comes up on standing water — roughly ${level.toFixed(0)} cm and moving. Something is spraying down there.`,
      });
    } else {
      this.bus.emit('hud:toast', { concept: 'Bilge', text: 'The bilge below is dry.' });
    }
  }

  // ---- Valves ------------------------------------------------------------
  operateValve(valveId) {
    const now = this.state.valveStates[valveId] === 'shut' ? 'open' : 'shut';
    this.state.valveStates[valveId] = now;
    const def = VALVES[valveId];
    this.log('valve', { valveId, position: now });
    this.bus.emit('valve:changed', { valveId, position: now });

    const src = this.flooding.sources[0];
    const bounds = src ? src.boundedBy.includes(valveId) : false;
    const isolated = src ? this.flooding.isIsolated(src) : false;

    if (bounds && now === 'shut') {
      if (isolated) {
        this.bus.emit('hud:toast', {
          concept: 'Boundary shut',
          text: 'Both sides of the branch are shut. The spray drops to a trickle — what is left is the trapped section draining.',
        });
      } else {
        this.bus.emit('hud:toast', {
          concept: 'One side only',
          text: 'The flow eases but does not stop. A branch open to the sea at one end is still open to the sea — shut the other side too.',
        });
      }
    } else if (bounds && now === 'open' && src) {
      this.bus.emit('hud:toast', { concept: 'Boundary broken', text: 'You just opened a boundary valve on the ruptured branch. Flow is back up.' });
    } else if (now === 'shut' && def) {
      // A valve that does nothing for this casualty, but does something to the boat.
      this.unnecessary += 1;
      this.bus.emit('hud:toast', {
        concept: 'Dependent system',
        text: `${def.label} is shut. That does not change the flooding rate — and it secures: ${def.dependents.join('; ')}.`,
      });
    }
  }

  // ---- Local electrical panel -------------------------------------------
  operatePanel(panelId) {
    const panel = this.state.electricalPanels[panelId];
    if (!panel) return;
    if (panel.tripped && !panel.energized) {
      const level = this.state.bilgeLevels[panel.compartment] ?? 0;
      if (level > 30) {
        this.bus.emit('hud:toast', {
          concept: 'Not yet',
          text: 'The panel tripped on a ground fault and the water is still up around it. Dewater below 30 cm before you try to restore it.',
        });
        return;
      }
      panel.tripped = false;
      panel.energized = true;
      this.log('panelRestored', { panelId });
      this.bus.emit('hud:toast', { concept: 'Panel restored', text: 'Forward power panel reset and energized. The forward bilge pump can run again.' });
      this.bus.emit('electrical:panelRestored', { id: panelId });
      return;
    }
    panel.energized = !panel.energized;
    this.log(panel.energized ? 'panelEnergized' : 'panelSecured', { panelId });
    if (!panel.energized) {
      if (this.state.pumpStates.bilgePumpFwd.on) this.state.pumpStates.bilgePumpFwd.on = false;
      this.bus.emit('electrical:panelSecured', { id: panelId });
      this.bus.emit('hud:toast', {
        concept: 'Electrical boundary',
        text: 'Forward power panel secured at the handle. Water can rise past it now without finding a live conductor — but it also fed the forward bilge pump, so dewatering is on the portable pump.',
      });
    } else {
      this.bus.emit('electrical:panelEnergized', { id: panelId });
    }
  }

  // ---- The rupture itself ------------------------------------------------
  workOnRupture(sourceId) {
    const src = this.flooding.bySource(sourceId) || this.flooding.sources[0];
    if (!src) return;
    const plateOpen = this.world.bilges.get(src.compartment)?.plateRecord?.data?.open;
    if (!plateOpen) {
      this.bus.emit('hud:toast', { concept: 'Access', text: 'Lift the deck plate first — you cannot reach the line through the deck.' });
      return;
    }

    const order = ['pipe_clamp', 'soft_patch', 'shoring'];
    const carried = order.find((id) => this.inventory.has(id));
    if (!carried) {
      this.bus.emit('hud:toast', {
        concept: 'No repair gear',
        text: 'Nothing in your hands will seal a pipe rupture. A soft patch or a split clamp is in the forward DC locker.',
      });
      return;
    }
    if (src.repair && src.repair.holding && carried !== 'shoring') {
      this.bus.emit('hud:toast', { concept: 'Already sealed', text: 'The repair on this line is holding.' });
      return;
    }

    const res = this.flooding.applyRepair(src, carried);
    this.inventory.consume(carried);
    this.log('repair', { kind: carried, pressurised: res.pressurised, sourceId: src.id });

    if (carried === 'shoring') {
      this.bus.emit('hud:toast', {
        concept: 'Partial',
        text: 'Wedges and battens bite into the tear and cut the flow, but timber will not seal a split pipe. The leak continues at a lower rate.',
      });
    } else if (res.pressurised) {
      this.bus.emit('hud:toast', {
        concept: 'Under pressure',
        text: 'You are working against a live line — the patch is bulging as you band it down.',
      });
    } else {
      this.bus.emit('hud:toast', {
        concept: 'Rupture sealed',
        text: `${carried === 'pipe_clamp' ? 'Clamp bolted up' : 'Soft patch banded down'} on a dead line. The inflow stops.`,
      });
      this.bus.emit('flooding:sealed', { id: src.id, kind: carried });
    }
  }

  // ---- Portable pump -----------------------------------------------------
  setPumpSuction(compartment) {
    const pump = this.state.pumpStates.portablePump;
    if (!this.inventory.has('portable_pump') && pump.deployedIn !== compartment) {
      this.bus.emit('hud:toast', {
        concept: 'No pump',
        text: 'You are not carrying the portable pump. It is stowed in the forward damage-control locker.',
      });
      return;
    }
    if (pump.deployedIn === compartment) {
      // Already set: this is the start/stop control.
      pump.on = !pump.on;
      this.log(pump.on ? 'pumpStarted' : 'pumpStopped', { pump: 'portablePump' });
      this.bus.emit('pump:toggled', { id: 'portablePump', on: pump.on });
      this.bus.emit('hud:toast', {
        concept: pump.on ? 'Pump running' : 'Pump secured',
        text: pump.on
          ? 'Portable pump running — 20 m³/h off the sump. It is also about 3 dB of extra self-noise, and sonar will feel that.'
          : 'Portable pump secured. The boat is quieter again.',
      });
      return;
    }
    pump.deployedIn = compartment;
    pump.on = true;
    this.inventory.consume('portable_pump');
    this.world.bilges.get(compartment)?.setPumpDeployed(true);
    this.log('pumpDeployed', { compartment });
    this.bus.emit('pump:deployed', { compartment });
    this.bus.emit('pump:toggled', { id: 'portablePump', on: true });
    this.bus.emit('hud:toast', {
      concept: 'Portable pump set',
      text: 'Suction hose into the sump, discharge run outboard. 20 m³/h — press E on the sump again to stop it.',
    });
  }

  // ---- Reporting ---------------------------------------------------------
  report() {
    const src = this.flooding.sources[0];
    if (this.reported) {
      this.bus.emit('hud:toast', { concept: '7MC', text: 'Control already has the report. Give them a follow-up when the boundary is set.' });
      this.bus.emit('dc:reportRepeated', {});
      return;
    }
    this.reported = true;
    this.reportedAt = this.state.clock.minutes;
    const discovered = src?.discovered;
    this.log('report', { discovered });
    this.bus.emit('dc:reported', { discovered, compartment: src?.compartment });
    this.bus.emit('hud:toast', {
      concept: 'Report made',
      text: discovered
        ? '"Flooding in the forward equipment space, from a seawater line beneath the deck plates." Control acknowledges, orders the boundary set and a pump rigged, and starts compensating trim.'
        : '"Investigating in the forward equipment space." Control acknowledges — but you have not told them what is actually happening yet.',
    });
    if (discovered) {
      // Control starts pumping trim/compensating, which limits the depth excursion.
      this.state.compensatedMass_t = Math.max(this.state.compensatedMass_t, 1.2);
      this.state.pumpStates.trimPump.on = true;
    }
  }
}
