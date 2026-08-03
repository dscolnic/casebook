/**
 * EventBus — tiny synchronous pub/sub used to decouple systems.
 * Systems emit domain events ('flooding:levelChanged', 'mission:objectiveComplete',
 * 'player:enteredCompartment', …) and any other system can subscribe without a
 * direct reference. This keeps the simulation, world, UI and missions loosely wired.
 */
export class EventBus {
  constructor() {
    this._handlers = new Map();
  }

  on(event, handler) {
    if (!this._handlers.has(event)) this._handlers.set(event, new Set());
    this._handlers.get(event).add(handler);
    return () => this.off(event, handler);
  }

  once(event, handler) {
    const wrapped = (payload) => {
      this.off(event, wrapped);
      handler(payload);
    };
    return this.on(event, wrapped);
  }

  off(event, handler) {
    this._handlers.get(event)?.delete(handler);
  }

  emit(event, payload) {
    const set = this._handlers.get(event);
    if (!set) return;
    // Copy so handlers may unsubscribe during dispatch.
    for (const handler of [...set]) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[EventBus] handler for "${event}" threw:`, err);
      }
    }
  }

  clear() {
    this._handlers.clear();
  }
}
