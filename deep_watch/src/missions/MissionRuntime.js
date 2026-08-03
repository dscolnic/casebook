/**
 * MissionRuntime — runs one data-driven mission definition. A definition is a
 * plain object with ordered `stages`; each stage exposes an `arm(rt)` that wires
 * whatever triggers advance it and returns a teardown function. The runtime keeps
 * NO mission logic of its own — missions are data plus small arming closures, so
 * there is no giant switch statement anywhere.
 *
 * Stage shape:
 *   { id, label, objective, hints: [...], arm(rt) => cleanupFn }
 *
 * `rt` exposes the whole world a mission is allowed to touch: bus, state, save,
 * compartments, inventory, instruments, flooding, dc, world, notebook, plus
 * complete(), toast(), flags, and the arming helpers at the bottom.
 */
export class MissionRuntime {
  constructor({ definition, eventBus, state, save, compartmentManager, inventory,
                instruments, flooding, dc, world, notebook }) {
    this.def = definition;
    this.bus = eventBus;
    this.state = state;
    this.save = save;
    this.compartments = compartmentManager;
    this.inventory = inventory;
    this.instruments = instruments;
    this.flooding = flooding;
    this.dc = dc;
    this.world = world;
    this.notebook = notebook;

    this.flags = {};
    this.stageIndex = -1;
    this.hintsUsed = 0;
    this.hintIndex = 0;
    this.scoreParts = null;
    this._cleanup = null;
    this._subs = [];
    this._active = false;
  }

  start() {
    this._active = true;
    if (this.def.onStart) this.def.onStart(this);
    this.bus.emit('mission:started', { id: this.def.id, title: this.def.title, stages: this.def.stages.length });
    this._advance();
  }

  get stage() {
    return this.def.stages[this.stageIndex] || null;
  }

  /** Subscribe for the whole mission (torn down with the mission, not the stage). */
  subscribe(event, fn) {
    const off = this.bus.on(event, fn);
    this._subs.push(off);
    return off;
  }

  _advance() {
    if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    this.stageIndex += 1;
    this.hintIndex = 0;
    const stage = this.stage;
    if (!stage) return this._finish();
    this.bus.emit('mission:objective', {
      label: `Objective ${this.stageIndex + 1}/${this.def.stages.length}`,
      text: stage.objective,
      stageId: stage.id,
      hasHints: !!(stage.hints && stage.hints.length),
    });
    this.bus.emit('mission:stageStarted', { id: stage.id, index: this.stageIndex });
    this._cleanup = stage.arm(this) || null;
  }

  /** Called by a stage when its trigger fires. */
  complete(note) {
    const stage = this.stage;
    if (!stage || !this._active) return;
    this.bus.emit('mission:stageComplete', { id: stage.id, index: this.stageIndex, note });
    if (note) this.toast(stage.label || 'Qualified', note);
    this._advance();
  }

  /** Give the next hint for the current stage (H). Costs score. */
  hint() {
    const stage = this.stage;
    if (!stage) return null;
    const hints = stage.hints || [];
    if (!hints.length) {
      this.bus.emit('mission:hint', { text: 'No hint for this one — the boat is telling you everything you need.', free: true });
      return null;
    }
    const text = hints[Math.min(this.hintIndex, hints.length - 1)];
    this.hintIndex += 1;
    this.hintsUsed += 1;
    this.save?.noteHint(this.def.id);
    this.bus.emit('mission:hint', { text, index: this.hintIndex, total: hints.length });
    return text;
  }

  _finish() {
    this._active = false;
    const score = this.def.scoring ? this.def.scoring(this) : 100;
    const evidenceQuality = this.notebook ? this.notebook.entries.length : 0;
    this.save?.markMissionComplete(this.def.id, { score, evidenceQuality });
    this.bus.emit('mission:complete', {
      id: this.def.id,
      title: this.def.title,
      score,
      parts: this.scoreParts,
      objectives: this.def.learningObjectives || [],
      chain: this.notebook?.entries ?? [],
    });
  }

  toast(concept, text) { this.bus.emit('hud:toast', { concept, text }); }

  stop() {
    if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    for (const off of this._subs) off();
    this._subs.length = 0;
    this._active = false;
  }

  // ---- Convenience arming helpers shared by mission definitions ----

  /** Complete when the player enters the named compartment. */
  onEnter(compartmentId, note) {
    return (rt) => {
      if (rt.compartments.currentId === compartmentId) { queueMicrotask(() => rt.complete(note)); return () => {}; }
      return rt.bus.on('player:enteredCompartment', ({ compartment }) => {
        if (compartment.id === compartmentId) rt.complete(note);
      });
    };
  }

  /** Complete after N distinct interactions of a given type. */
  onInteractCount(type, count, note) {
    return (rt) => {
      const seen = new Set();
      return rt.bus.on(`interact:${type}`, (rec) => {
        seen.add(rec.id);
        rt.bus.emit('mission:progress', { have: seen.size, need: count });
        if (seen.size >= count) rt.complete(note);
      });
    };
  }

  /** Complete when the named event fires (optionally matching a predicate). */
  onEvent(eventName, note, predicate = null) {
    return (rt) => rt.bus.on(eventName, (payload) => {
      if (!predicate || predicate(payload)) rt.complete(note);
    });
  }
}
