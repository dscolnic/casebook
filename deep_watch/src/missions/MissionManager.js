import { MissionRuntime } from './MissionRuntime.js';
import { mission01Walkdown } from './definitions/mission_01_walkdown.js';
import { mission04Flooding } from './definitions/mission_04_flooding.js';

/**
 * MissionManager — the campaign registry and launcher. It resolves a definition
 * by id, resets any casualty state left over from a previous attempt, and spins
 * up a MissionRuntime wired to every system a mission is allowed to touch.
 */
const REGISTRY = {
  mission_01_walkdown: mission01Walkdown,
  mission_04_flooding: mission04Flooding,
};

export class MissionManager {
  constructor(deps) {
    this.bus = deps.eventBus;
    this.deps = deps;
    this.current = null;
  }

  list() {
    return Object.values(REGISTRY).map((d) => ({ id: d.id, title: d.title, unit: d.unit }));
  }

  get(id) { return REGISTRY[id] || null; }

  start(id) {
    const def = REGISTRY[id];
    if (!def) { console.warn('[Mission] unknown', id); return null; }
    this.stop();
    this._resetWorldState();
    const d = this.deps;
    this.current = new MissionRuntime({
      definition: def,
      eventBus: this.bus,
      state: d.state,
      save: d.save,
      compartmentManager: d.compartmentManager,
      inventory: d.inventory,
      instruments: d.instruments,
      flooding: d.flooding,
      dc: d.damageControl,
      world: d.world,
      notebook: d.notebook,
    });
    this.current.start();
    return this.current;
  }

  /** Put the boat back to a clean pre-casualty condition between attempts. */
  _resetWorldState() {
    const d = this.deps;
    d.flooding?.reset();
    d.notebook?.clear();
    d.inventory?.clear();
    if (d.instruments) d.instruments.lastReadings.length = 0;
    if (d.damageControl) {
      d.damageControl.actions.length = 0;
      d.damageControl.reported = false;
      d.damageControl.reportedAt = null;
      d.damageControl.unnecessary = 0;
    }
    const s = d.state;
    if (s) {
      s.valveStates = { fwd_sw_supply_inbd: 'open', fwd_sw_supply_outbd: 'open',
        sonar_cooling_supply: 'open', trim_drain: 'shut', sw_crossconnect: 'shut' };
      s.electricalPanels.fwd_power_2f = { name: 'Forward Power Panel 2F', energized: true, tripped: false, compartment: 'forward_equipment' };
      s.pumpStates.bilgePumpFwd.on = false;
      s.pumpStates.bilgePumpAft.on = false;
      s.pumpStates.trimPump.on = false;
      s.pumpStates.portablePump = { on: false, capacity_m3h: 20, deployedIn: null, portable: true };
      s.trim = 0;
      s.compensatedMass_t = 0;
      s.compartmentTemperature.sonar_electronics = 26;
      s.machineryNoiseSources = s.machineryNoiseSources.filter((n) => n.id !== 'flood_flow');
      s.activeCasualties = [];
    }
    // Deck plates back down, pump hoses out.
    for (const [comp, bilge] of (d.world?.bilges ?? new Map())) {
      if (bilge.plateRecord?.data?.open) d.world.setDeckPlate(bilge.plateRecord.id, false);
      bilge.setPumpDeployed(false);
      void comp;
    }
  }

  stop() {
    this.current?.stop();
    this.current = null;
  }

  restart() {
    if (this.current) this.start(this.current.def.id);
  }

  hint() { return this.current?.hint(); }
}
