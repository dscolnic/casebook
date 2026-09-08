// animators.js — the one list of things that move.
//
// For most of this engine's life the only motion in a world was the waypoint
// ring turning and the board screens breathing. A coaster stood in its station,
// a sixty-metre mast never blinked, a dust devil ninety metres tall hung in the
// air like a photograph, and a waterfall was a stack of pale boxes. Every one of
// those props had a `decorate` hook that could build it and no hook that could
// move it, so nothing was built to move.
//
// This is that hook. A theme's props layer registers a function; every world
// module calls `runAnimators` from its own `updateWorldAnimation`, once a frame,
// with the wall-clock time, the frame delta and where the player's eye is. That
// is all a prop needs to spin, blink, sway, drift or scroll.
//
//   import { animate, spin, blink, sway } from '../../engine/world/animators.js';
//   const blade = ...;
//   animate(spin(blade, 'z', 0.9));                    // radians per second
//   animate(blink(strobe.material, 1.2, 0.08));        // period, duty
//   animate((t, dt, eye) => { ... });                  // anything else
//
// Two rules, both learned from `stateHooks`:
//
//   · A throwing animator is disabled, not fatal. One prop's arithmetic must
//     never take the frame loop down with it — the world keeps moving and the
//     console says which one stopped.
//   · `dt` is clamped. A background tab gets no animation frame for minutes at
//     a time, and the first frame back hands the loop a delta of the whole gap;
//     a wheel that turns a hundred radians in one frame reads as a glitch.
//
// Nothing here imports from `engine/core`: the frame loop passes the eye in, so
// this module owes nothing to the player or the camera.

const list = [];
let lastT = null;

/**
 * Register something to run every frame. Returns a function that removes it.
 *
 * `fn(t, dt, eye)` — `t` seconds since page load, `dt` seconds since the last
 * frame (clamped to 0.1), `eye` the player's position `{ x, y, z }` or null
 * when the world does not know it yet.
 */
export function animate(fn){
  if(typeof fn !== 'function') return () => {};
  const entry = { fn, dead: false };
  list.push(entry);
  return () => { entry.dead = true; };
}

/** Run every registered animator. Called once a frame by the world module. */
export function runAnimators(t, eye = null){
  const dt = lastT === null ? 0 : Math.max(0, Math.min(0.1, t - lastT));
  lastT = t;
  for(let i = list.length - 1; i >= 0; i--){
    const a = list[i];
    if(a.dead){ list.splice(i, 1); continue; }
    try{ a.fn(t, dt, eye); }
    catch(err){
      a.dead = true;
      console.warn('[animators] an animator threw and was stopped', err);
    }
  }
}

/** Forget everything. A world rebuilt from scratch starts with no animators. */
export function clearAnimators(){ list.length = 0; lastT = null; }

/** How many are running — for the dev handle, and for the selftest. */
export function animatorCount(){ return list.filter(a => !a.dead).length; }

// ------------------------------------------------------------------ helpers
// The half-dozen motions every place needs. Each returns an animator; register
// it with `animate(...)`. None of them allocates per frame.

/** Turn an object about one of its own axes at a constant rate. */
export function spin(obj, axis = 'y', radPerSec = 1){
  return (t, dt) => { obj.rotation[axis] += radPerSec * dt; };
}

/**
 * A strobe or a warning lamp: on for `duty` of every `period` seconds. Sets
 * `emissiveIntensity` between `off` and `on`; the material keeps its colour.
 */
export function blink(material, period = 1.2, duty = 0.1, { on = 3.0, off = 0.08, phase = 0 } = {}){
  return (t) => {
    const k = ((t + phase) % period) / period;
    material.emissiveIntensity = k < duty ? on : off;
  };
}

/**
 * A slow drift of `emissiveIntensity` around a mean — a bulb on a long cable, a
 * lit window, a screen. Nothing dramatic: ±`depth` of the base.
 */
export function flicker(material, base = 1.0, depth = 0.12, rate = 1.7, phase = 0){
  return (t) => {
    material.emissiveIntensity = base * (1 + depth * (Math.sin(t * rate + phase) * 0.6
      + Math.sin(t * rate * 2.7 + phase * 1.3) * 0.4));
  };
}

/** Rock an object about an axis: a gondola, a hanging sign, a moored boat. */
export function sway(obj, axis = 'z', amplitude = 0.05, rate = 0.8, phase = 0){
  const rest = obj.rotation[axis];
  return (t) => { obj.rotation[axis] = rest + Math.sin(t * rate + phase) * amplitude; };
}

/** Bob an object up and down about where it was placed. */
export function bob(obj, amplitude = 0.08, rate = 1.6, phase = 0){
  const rest = obj.position.y;
  return (t) => { obj.position.y = rest + Math.sin(t * rate + phase) * amplitude; };
}

/**
 * Slide a texture's offset — water over a weir, a conveyor, dust streaming past.
 * `du`, `dv` are texture repeats per second.
 */
export function scrollUV(texture, du = 0, dv = -0.4){
  return (t, dt) => {
    texture.offset.x = (texture.offset.x + du * dt) % 1;
    texture.offset.y = (texture.offset.y + dv * dt) % 1;
  };
}

/**
 * Carry an object along a closed loop of points at a constant speed, facing the
 * way it goes. `points` is an array of `{ x, y, z }`; the loop closes itself.
 */
export function patrol(obj, points, speed = 2){
  if(!points || points.length < 2) return () => {};
  let seg = 0, along = 0;
  const segLen = (i) => {
    const a = points[i], b = points[(i + 1) % points.length];
    return Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z) || 1e-6;
  };
  return (t, dt) => {
    along += speed * dt;
    let len = segLen(seg);
    while(along > len){ along -= len; seg = (seg + 1) % points.length; len = segLen(seg); }
    const a = points[seg], b = points[(seg + 1) % points.length];
    const k = along / len;
    obj.position.set(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, a.z + (b.z - a.z) * k);
    obj.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
  };
}

/**
 * Drift an object around a home point on a slow wander — a dust devil, a moon,
 * a gull. `radius` metres, `rate` in cycles per minute or so.
 */
export function wander(obj, radius = 20, rate = 0.02, phase = 0){
  const hx = obj.position.x, hz = obj.position.z;
  return (t) => {
    const a = t * rate + phase;
    obj.position.x = hx + Math.cos(a) * radius + Math.cos(a * 2.3) * radius * 0.3;
    obj.position.z = hz + Math.sin(a * 0.7) * radius;
  };
}
