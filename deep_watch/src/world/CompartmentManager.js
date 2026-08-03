/**
 * CompartmentManager — tracks which compartment the player currently occupies
 * (from their Z position along the boat), fires enter/exit events, and records
 * which compartments the player has "learned" (visited). Also owns per-compartment
 * metadata used by the map and HUD.
 */
export class CompartmentManager {
  constructor(eventBus, layout) {
    this.bus = eventBus;
    this.layout = layout;           // array of { id, name, zStart, zEnd, ... }
    this.currentId = null;
    this.visited = new Set();
  }

  compartmentAtZ(z) {
    for (const c of this.layout) {
      if (z >= c.zStart && z < c.zEnd) return c;
    }
    // Clamp to nearest end compartment.
    if (this.layout.length && z < this.layout[0].zStart) return this.layout[0];
    return this.layout[this.layout.length - 1] || null;
  }

  update(z) {
    const c = this.compartmentAtZ(z);
    if (!c) return;
    if (c.id !== this.currentId) {
      const prev = this.currentId;
      this.currentId = c.id;
      if (!this.visited.has(c.id)) {
        this.visited.add(c.id);
        this.bus.emit('compartment:learned', c);
      }
      this.bus.emit('player:enteredCompartment', { compartment: c, previous: prev });
    }
  }

  get current() {
    return this.layout.find((c) => c.id === this.currentId) || null;
  }

  byId(id) {
    return this.layout.find((c) => c.id === id) || null;
  }
}
