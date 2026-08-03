import { MissionRuntime } from './MissionRuntime.js';
import { mission01Walkdown } from './definitions/mission_01_walkdown.js';

/**
 * MissionManager — the campaign registry and launcher. This foundation build
 * ships only Mission 1 (Boat Walkdown) so movement/interaction can be exercised;
 * the remaining missions land in later runs. It resolves a definition by id and
 * spins up a MissionRuntime.
 */
const REGISTRY = {
  mission_01_walkdown: mission01Walkdown,
};

export class MissionManager {
  constructor({ eventBus, state, save, compartmentManager }) {
    this.bus = eventBus;
    this.state = state;
    this.save = save;
    this.compartments = compartmentManager;
    this.current = null;
  }

  list() {
    return Object.values(REGISTRY).map((d) => ({ id: d.id, title: d.title, unit: d.unit }));
  }

  start(id) {
    const def = REGISTRY[id];
    if (!def) { console.warn('[Mission] unknown', id); return null; }
    this.stop();
    this.current = new MissionRuntime({
      definition: def,
      eventBus: this.bus,
      state: this.state,
      save: this.save,
      compartmentManager: this.compartments,
    });
    this.current.start();
    return this.current;
  }

  stop() {
    this.current?.stop();
    this.current = null;
  }

  restart() {
    if (this.current) this.start(this.current.def.id);
  }
}
