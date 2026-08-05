/**
 * GameLoop — requestAnimationFrame loop with a clamped delta and a fixed-step
 * accumulator for the simulation, so physics stays stable regardless of frame
 * rate. The render/update callback receives the real (clamped) dt; the fixed
 * callback receives a constant step.
 */
export class GameLoop {
  constructor({ update, fixedUpdate, fixedStep = 1 / 30 }) {
    this.update = update;
    this.fixedUpdate = fixedUpdate;
    this.fixedStep = fixedStep;
    this._acc = 0;
    this._last = 0;
    this._raf = null;
    this.running = false;
    this._tick = this._tick.bind(this);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._last = performance.now();
    this._raf = requestAnimationFrame(this._tick);
  }

  stop() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  _tick(now) {
    if (!this.running) return;
    let dt = (now - this._last) / 1000;
    this._last = now;
    if (dt > 0.1) dt = 0.1;   // clamp big stalls (tab switch)
    // …and never trust a negative one. `start()` stamps `_last` with
    // performance.now(), but the first rAF callback carries the timestamp of the
    // frame that was already in flight, which is EARLIER — by however long the
    // synchronous world build took. Left unclamped that lands a second or more of
    // debt in the accumulator and the simulation sits frozen while it pays it off,
    // which is exactly what happened when panel placement got more expensive.
    if (dt < 0) dt = 0;

    this._acc += dt;
    let guard = 0;
    while (this._acc >= this.fixedStep && guard < 5) {
      this.fixedUpdate(this.fixedStep);
      this._acc -= this.fixedStep;
      guard++;
    }
    this.update(dt, now / 1000);
    this._raf = requestAnimationFrame(this._tick);
  }
}
