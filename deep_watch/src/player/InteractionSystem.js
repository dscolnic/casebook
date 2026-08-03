import * as THREE from 'three';

/**
 * InteractionSystem — raycasts from the camera each frame against registered
 * interactable objects, surfaces a contextual prompt for the nearest one in range,
 * and dispatches an 'interact' when the player presses E.
 *
 * Interactables are plain records: { object, type, id, prompt, data }. Types used:
 * 'hatch', 'station', 'instrument', 'locker', 'deckplate'. Systems subscribe to
 * 'interact:<type>' or the generic 'interact'.
 */
const MAX_DISTANCE = 2.6;

export class InteractionSystem {
  constructor({ camera, eventBus }) {
    this.camera = camera;
    this.bus = eventBus;
    this.interactables = [];
    this.ray = new THREE.Raycaster();
    this.ray.far = MAX_DISTANCE;
    this.current = null;
    this.enabled = false;
    this._objIndex = new Map(); // Object3D (and descendants) -> record

    document.addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      if (e.code === 'KeyE') this.tryInteract();
    });
  }

  register(record) {
    this.interactables.push(record);
    record.object.traverse((o) => this._objIndex.set(o, record));
    this._objIndex.set(record.object, record);
  }

  registerAll(records) {
    for (const r of records) this.register(r);
  }

  /** Remove a record (e.g. an instrument the player just picked up). */
  unregister(record) {
    const i = this.interactables.indexOf(record);
    if (i >= 0) this.interactables.splice(i, 1);
    record.object.traverse((o) => this._objIndex.delete(o));
    this._objIndex.delete(record.object);
    if (this.current === record) this._setCurrent(null);
  }

  clear() {
    this.interactables.length = 0;
    this._objIndex.clear();
    this.current = null;
  }

  setEnabled(on) {
    this.enabled = on;
    if (!on) this._setCurrent(null);
  }

  update() {
    if (!this.enabled) return;
    this.ray.setFromCamera({ x: 0, y: 0 }, this.camera);
    const objects = this.interactables.map((r) => r.object);
    const hits = this.ray.intersectObjects(objects, true);
    let found = null;
    if (hits.length) {
      // Walk up to the registered record.
      let o = hits[0].object;
      while (o && !this._objIndex.has(o)) o = o.parent;
      if (o) found = this._objIndex.get(o);
    }
    this._setCurrent(found);
  }

  /** A record's `prompt` may be a string or a function, so it can reflect state
   *  (open/shut, energized/de-energized, what the player is carrying). */
  static promptText(record) {
    return typeof record.prompt === 'function' ? record.prompt(record) : record.prompt;
  }

  _setCurrent(record) {
    const text = record ? InteractionSystem.promptText(record) : null;
    if (record === this.current && text === this._lastPrompt) return;
    this.current = record;
    this._lastPrompt = text;
    this.bus.emit('interaction:prompt', record ? { prompt: text, type: record.type, id: record.id } : null);
  }

  tryInteract() {
    if (!this.current) return;
    const r = this.current;
    this.bus.emit('interact', r);
    this.bus.emit(`interact:${r.type}`, r);
  }
}
