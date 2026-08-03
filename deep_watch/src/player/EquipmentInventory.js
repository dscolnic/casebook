/**
 * EquipmentInventory — the tools the player is physically carrying. Tools that
 * are not carried remain in their lockers/shelves in the world (the equipment
 * wheel only shows carried items). One tool is "active" (in-hand) at a time.
 */
export class EquipmentInventory {
  constructor(eventBus, save) {
    this.bus = eventBus;
    this.save = save;
    this.carried = new Map(); // instrumentId -> { id, name }
    this.activeId = null;
  }

  has(id) { return this.carried.has(id); }

  add(id, name) {
    if (this.carried.has(id)) return false;
    this.carried.set(id, { id, name });
    this.save?.qualifyInstrument(id);
    this.bus.emit('inventory:changed', this.list());
    this.bus.emit('inventory:added', { id, name });
    if (!this.activeId) this.setActive(id);
    return true;
  }

  setActive(id) {
    if (id !== null && !this.carried.has(id)) return;
    this.activeId = id;
    this.bus.emit('inventory:active', id ? this.carried.get(id) : null);
  }

  /** Cycle to the next carried tool (mouse wheel / number keys). */
  cycle(dir = 1) {
    const ids = [...this.carried.keys()];
    if (!ids.length) return;
    let idx = ids.indexOf(this.activeId);
    idx = (idx + dir + ids.length) % ids.length;
    this.setActive(ids[idx]);
  }

  stow() { this.setActive(null); }

  list() { return [...this.carried.values()]; }
}
