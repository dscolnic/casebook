/**
 * EquipmentInventory — the tools the player is physically carrying. Tools that
 * are not carried remain in their lockers/shelves in the world (the equipment
 * wheel only shows carried items). One tool is "active" (in-hand) at a time.
 *
 * Two classes of item share the list: instruments, which are read (F), and
 * damage-control gear, which is used against something in the world (E) and is
 * consumed when it is used up.
 */
export class EquipmentInventory {
  constructor(eventBus, save) {
    this.bus = eventBus;
    this.save = save;
    this.carried = new Map(); // itemId -> { id, name, kind }
    this.activeId = null;
  }

  has(id) { return this.carried.has(id); }

  add(id, name, kind = 'measure') {
    if (this.carried.has(id)) return false;
    this.carried.set(id, { id, name, kind });
    if (kind !== 'gear') this.save?.qualifyInstrument(id);
    this.bus.emit('inventory:changed', this.list());
    this.bus.emit('inventory:added', { id, name, kind });
    if (!this.activeId) this.setActive(id);
    return true;
  }

  /** Remove a consumed item (a patch that has been banded down, a pump that is set). */
  consume(id) {
    if (!this.carried.has(id)) return false;
    this.carried.delete(id);
    if (this.activeId === id) {
      const next = [...this.carried.keys()][0] ?? null;
      this.setActive(next);
    }
    this.bus.emit('inventory:changed', this.list());
    this.bus.emit('inventory:removed', { id });
    return true;
  }

  setActive(id) {
    if (id !== null && !this.carried.has(id)) return;
    this.activeId = id;
    this.bus.emit('inventory:active', id ? this.carried.get(id) : null);
  }

  /** Cycle to the next carried tool (mouse wheel / bracket keys). */
  cycle(dir = 1) {
    const ids = [...this.carried.keys()];
    if (!ids.length) return;
    let idx = ids.indexOf(this.activeId);
    idx = (idx + dir + ids.length) % ids.length;
    this.setActive(ids[idx]);
  }

  stow() { this.setActive(null); }

  clear() {
    this.carried.clear();
    this.activeId = null;
    this.bus.emit('inventory:changed', []);
    this.bus.emit('inventory:active', null);
  }

  list() { return [...this.carried.values()]; }
}
