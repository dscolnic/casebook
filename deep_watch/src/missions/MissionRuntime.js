/**
 * MissionRuntime — runs one data-driven mission definition. A definition is a
 * plain object with ordered `stages`; each stage exposes an `arm(rt)` that wires
 * whatever triggers advance it and returns a teardown function. The runtime keeps
 * NO mission logic of its own — missions are data + small arming closures, so we
 * avoid one giant switch statement (per the spec's data-driven architecture).
 *
 * Stage shape:
 *   { id, label, objective, arm(rt) => cleanupFn }
 * rt (runtime) exposes: bus, state, save, complete(), toast(concept,text),
 *   flags, and helpers.
 */
export class MissionRuntime {
  constructor({ definition, eventBus, state, save, compartmentManager }) {
    this.def = definition;
    this.bus = eventBus;
    this.state = state;
    this.save = save;
    this.compartments = compartmentManager;
    this.flags = {};
    this.stageIndex = -1;
    this._cleanup = null;
    this._active = false;
  }

  start() {
    this._active = true;
    if (this.def.onStart) this.def.onStart(this);
    this.bus.emit('mission:started', { id: this.def.id, title: this.def.title });
    this._advance();
  }

  get stage() {
    return this.def.stages[this.stageIndex] || null;
  }

  _advance() {
    // Tear down the previous stage's listeners.
    if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    this.stageIndex += 1;
    const stage = this.stage;
    if (!stage) return this._finish();
    this.bus.emit('mission:objective', { label: `Objective ${this.stageIndex + 1}/${this.def.stages.length}`, text: stage.objective });
    this.bus.emit('mission:stageStarted', { id: stage.id, index: this.stageIndex });
    // Arm the stage; it calls rt.complete() when satisfied.
    this._cleanup = stage.arm(this) || null;
  }

  /** Called by a stage when its trigger fires. */
  complete(note) {
    const stage = this.stage;
    if (!stage) return;
    this.bus.emit('mission:stageComplete', { id: stage.id, index: this.stageIndex, note });
    if (note) this.toast(stage.label || 'Qualified', note);
    this._advance();
  }

  _finish() {
    this._active = false;
    const score = this.def.scoring ? this.def.scoring(this) : 100;
    this.save?.markMissionComplete(this.def.id, { score, evidenceQuality: 0 });
    this.bus.emit('mission:complete', { id: this.def.id, title: this.def.title, score });
  }

  toast(concept, text) { this.bus.emit('hud:toast', { concept, text }); }

  stop() {
    if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    this._active = false;
  }

  // ---- Convenience arming helpers shared by mission definitions ----

  /** Complete when the player enters the named compartment. */
  onEnter(compartmentId, note) {
    return (rt) => {
      // Already there? Complete next tick.
      if (rt.compartments.currentId === compartmentId) { queueMicrotask(() => rt.complete(note)); return () => {}; }
      const off = rt.bus.on('player:enteredCompartment', ({ compartment }) => {
        if (compartment.id === compartmentId) rt.complete(note);
      });
      return off;
    };
  }

  /** Complete after N distinct interactions of a given type. */
  onInteractCount(type, count, note) {
    return (rt) => {
      const seen = new Set();
      const off = rt.bus.on(`interact:${type}`, (rec) => {
        seen.add(rec.id);
        rt.bus.emit('mission:progress', { have: seen.size, need: count });
        if (seen.size >= count) rt.complete(note);
      });
      return off;
    };
  }

  /** Complete when any of the listed events fires. */
  onEvent(eventName, note, predicate = null) {
    return (rt) => {
      const off = rt.bus.on(eventName, (payload) => {
        if (!predicate || predicate(payload)) rt.complete(note);
      });
      return off;
    };
  }
}
