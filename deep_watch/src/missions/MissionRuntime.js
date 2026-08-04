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
                instruments, flooding, dc, world, notebook, sonar, nav, crew, voyage }) {
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
    this.sonar = sonar;
    this.nav = nav;
    this.crew = crew;
    this.voyage = voyage;

    this.flags = {};
    this.stageIndex = -1;
    this.hintsUsed = 0;
    this.skipped = 0;
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
    // Every stage gets its own token. A stage's `complete()` is bound to that
    // token, so work a stage scheduled before it finished — a queued microtask, a
    // timer, an in-flight callback — cannot complete the NEXT stage by accident.
    // (Unsubscribing in the teardown is not enough: a queued microtask has already
    // escaped the bus.)
    const stage = this.stage;
    if (!stage) return this._finish();
    this._stageToken = Symbol(stage.id);

    this.bus.emit('mission:objective', {
      label: `Objective ${this.stageIndex + 1}/${this.def.stages.length}`,
      text: stage.objective,
      stageId: stage.id,
      hasHints: !!(stage.hints && stage.hints.length),
    });
    this.bus.emit('mission:stageStarted', { id: stage.id, index: this.stageIndex });
    this._cleanup = stage.arm(this._scopeFor(this._stageToken)) || null;
  }

  /**
   * The `rt` a stage actually receives: everything on the runtime, but with a
   * `complete()` that only fires for the stage it was armed for.
   */
  _scopeFor(token) {
    const scoped = Object.create(this);
    scoped.complete = (note) => this.completeStage(token, note);
    return scoped;
  }

  /** Called by a stage when its trigger fires; ignored once that stage is over. */
  completeStage(token, note) {
    if (token !== this._stageToken) return;
    this.complete(note);
  }

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
    if (!hints.length && !stage.target) {
      this.bus.emit('mission:hint', { text: 'No hint for this one — the boat is telling you everything you need.', free: true });
      return null;
    }
    // A stage with a place but no written hint still gets the beacon: showing
    // someone where to stand is worth more than another paragraph.
    const text = hints.length
      ? hints[Math.min(this.hintIndex, hints.length - 1)]
      : 'Where you need to be is marked out for you.';
    this.hintIndex += 1;
    this.hintsUsed += 1;
    this.save?.noteHint(this.def.id);
    // `stage.target` names the place the objective is talking about — an
    // interactable id and/or a compartment. The Game turns it into a lit beacon.
    this.bus.emit('mission:hint', {
      text, index: hints.length ? this.hintIndex : 0, total: hints.length,
      target: stage.target || null,
    });
    return text;
  }

  /**
   * Step over the current objective. A practice aid, not a cheat: the boat is not
   * touched, so whatever the stage asked for is simply left undone and the
   * simulation carries on from wherever it actually is. Recorded and shown in the
   * debrief so a skipped run never reads as a clean one.
   */
  skipStage() {
    if (!this._active || !this.stage) return false;
    this.skipped += 1;
    this.complete('Objective skipped — the boat is unchanged, so anything this step would have done is still undone.');
    return true;
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
