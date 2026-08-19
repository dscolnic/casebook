// playSurface.js — a canvas that redraws every frame, for the formats that move.
//
// `figures.js` draws a picture. It draws it once, from data, and hands back an
// SVG string: that is the right shape for a chart under a verdict and the wrong
// shape for a conveyor. Six of the formats now want a surface that repaints at
// frame rate and reads an input state — so this is that surface, and it is
// deliberately not an "arcade" module. Any format that wants a live readout can
// use it.
//
// It owns the four things that would otherwise be written six times and gone
// wrong in at least two of them:
//
//   1. **Device pixels.** A canvas sized in CSS pixels and drawn in CSS pixels
//      is soft on every laptop made since 2012. The backing store is scaled by
//      the device ratio and the 2D context is scaled to match, so a caller draws
//      in CSS units and never thinks about it.
//   2. **The background tab.** A background tab gets no requestAnimationFrame,
//      which is the single most expensive fact in this repo's history. A run
//      left in another tab does not end — it *freezes*, and a player coming back
//      to a stopped belt cannot tell that from a crash. So the loop pauses on
//      `visibilitychange`, says so on the canvas, and resumes on the next frame
//      after the tab is visible again with `dt` clamped rather than catching up.
//   3. **Teardown.** `bind()` returns nothing, so nothing has ever cancelled
//      anything in a panel. A frame loop nobody stopped keeps drawing into a
//      detached canvas for the rest of the session and keeps reading a keyboard
//      that now belongs to the world. `stop()` is called from `ctx.onClose`.
//   4. **Thumbs.** The casebook app opens on tablets. Keyboard and touch write
//      the *same* input object, which is the arrangement `touch.js` already uses
//      for the player — anything that satisfies the keys satisfies the panel.
//
// Nothing here touches `document` at module scope: `instruments.js` imports this
// and `engine/dev/instrumentGoals.mjs` imports *that*, in Node, where there is
// no DOM. All of it is inside functions on purpose.

/** Longest frame the caller is allowed to see, in seconds. */
const MAX_DT = 1 / 20;

/**
 * The four directions and the one button, under the names a panel wants.
 *
 * WASD and the arrows both, because the world uses WASD and a panel is read
 * with a hand on the mouse. Space and Enter both commit — Enter is what a
 * player whose pointer is unlocked reaches for.
 */
const KEYS = {
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  Space: 'fire', Enter: 'fire',
};

/** Below this a drag is a tap, not a swipe. In CSS pixels. */
const SWIPE_MIN = 24;

/**
 * A live canvas.
 *
 *   const surface = createPlaySurface(canvasEl, {
 *     step(dt, input){ … },        // advance the model. dt is seconds, clamped.
 *     paint(g, w, h){ … },         // draw it. g is a 2D context in CSS units.
 *   });
 *   surface.stop();                // from ctx.onClose
 *
 * `input` is the same object every frame, mutated in place:
 *
 *   input.held('up')      is the key or thumb down right now
 *   input.press('up')     was it pressed since the last time this was asked —
 *                         consumed, so a press is delivered exactly once
 *   input.axis()          {x, y} in -1..1; analogue from a thumb, ±1 from a key
 *   input.taps()          [{x, y}] in CSS units on the canvas, consumed
 *
 * The caller never sees a raw event, which is what keeps a format from growing
 * its own idea of what a swipe is.
 */
export function createPlaySurface(canvas, { step, paint, onPause, doc: docIn } = {}){
  // A format that draws in the DOM still needs the clock, the pause and the
  // keyboard — SPOT moves real buttons around a board and has nothing to paint.
  // So the canvas is optional, and everything that depends on one is skipped
  // rather than the whole surface refusing to exist.
  const doc = canvas?.ownerDocument ?? docIn ?? (typeof document !== 'undefined' ? document : null);
  if(!doc) return { stop(){}, input: null, isPaused: () => false };
  const g = canvas ? canvas.getContext('2d') : null;
  const win = doc.defaultView ?? globalThis;

  // ------------------------------------------------------------------ input
  const held = new Set();
  const pressed = new Set();
  const tapped = [];
  let stick = { x: 0, y: 0 };

  const input = {
    held: (name) => held.has(name),
    press(name){
      if(!pressed.has(name)) return false;
      pressed.delete(name);
      return true;
    },
    axis(){
      const kx = (held.has('right') ? 1 : 0) - (held.has('left') ? 1 : 0);
      const ky = (held.has('down') ? 1 : 0) - (held.has('up') ? 1 : 0);
      return { x: kx || stick.x, y: ky || stick.y };
    },
    taps(){
      const out = tapped.slice();
      tapped.length = 0;
      return out;
    },
  };

  const onKeyDown = (e) => {
    const name = KEYS[e.code];
    if(!name) return;
    // Arrows scroll the modal and space scrolls the page. Both are the panel's
    // now — a belt that jumps the card down 40 px on every sort is unplayable.
    e.preventDefault();
    if(e.repeat) return;
    held.add(name);
    pressed.add(name);
  };
  const onKeyUp = (e) => {
    const name = KEYS[e.code];
    if(name) held.delete(name);
  };

  // Touch. Nothing here is absolutely positioned from a clientX/clientY — the
  // canvas is laid out in the panel's normal flow — so the `#touchLayer` rule
  // does not bite. Coordinates are taken through getBoundingClientRect, which
  // is also what makes them survive the panel being scrolled.
  const local = (t) => {
    const r = canvas.getBoundingClientRect();
    return { x: (t.clientX - r.left) * (canvas.clientWidth / r.width),
             y: (t.clientY - r.top) * (canvas.clientHeight / r.height) };
  };
  let touchFrom = null;
  const onTouchStart = (e) => {
    const t = e.changedTouches?.[0];
    if(!t) return;
    e.preventDefault();
    touchFrom = { ...local(t), id: t.identifier };
  };
  const onTouchMove = (e) => {
    if(!touchFrom) return;
    const t = [...(e.changedTouches ?? [])].find(x => x.identifier === touchFrom.id);
    if(!t) return;
    e.preventDefault();
    const p = local(t);
    // An analogue stick out of a drag: how far from where the thumb landed,
    // saturating at 60 px. A half-pushed thumb is half a correction, which is
    // the one thing a key cannot say.
    stick = { x: Math.max(-1, Math.min(1, (p.x - touchFrom.x) / 60)),
              y: Math.max(-1, Math.min(1, (p.y - touchFrom.y) / 60)) };
  };
  const onTouchEnd = (e) => {
    if(!touchFrom) return;
    const t = [...(e.changedTouches ?? [])].find(x => x.identifier === touchFrom.id);
    if(!t) return;
    e.preventDefault();
    const p = local(t);
    const dx = p.x - touchFrom.x;
    const dy = p.y - touchFrom.y;
    if(Math.hypot(dx, dy) < SWIPE_MIN){
      tapped.push(p);
      pressed.add('fire');
    } else if(Math.abs(dy) >= Math.abs(dx)){
      pressed.add(dy < 0 ? 'up' : 'down');
    } else {
      pressed.add(dx < 0 ? 'left' : 'right');
    }
    stick = { x: 0, y: 0 };
    touchFrom = null;
  };
  const onMouseDown = (e) => {
    const r = canvas.getBoundingClientRect();
    tapped.push({ x: (e.clientX - r.left) * (canvas.clientWidth / r.width),
                  y: (e.clientY - r.top) * (canvas.clientHeight / r.height) });
  };

  win.addEventListener('keydown', onKeyDown);
  win.addEventListener('keyup', onKeyUp);
  if(canvas){
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
  }

  // ----------------------------------------------------------------- pixels
  let w = 0;
  let h = 0;
  function resize(){
    if(!canvas) return;
    const ratio = Math.min(win.devicePixelRatio || 1, 2);
    w = canvas.clientWidth || +canvas.getAttribute('width') || 640;
    h = canvas.clientHeight || +canvas.getAttribute('height') || 260;
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  // ------------------------------------------------------------------- loop
  let raf = 0;
  let last = 0;
  let stopped = false;
  let paused = false;

  function frame(now){
    if(stopped) return;
    raf = win.requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, MAX_DT) : 0;
    last = now;
    if(paused) return;
    if(canvas && (canvas.clientWidth !== w || canvas.clientHeight !== h)) resize();
    try {
      step?.(dt, input);
      if(g){
        g.clearRect(0, 0, w, h);
        paint?.(g, w, h);
      }
    } catch (err) {
      // A throw inside a frame loop is otherwise one error per frame for the
      // rest of the session, at sixty a second, with the panel frozen behind
      // the wall of them.
      stop();
      console.error('[playSurface] stopped on an error in the frame loop', err);
    }
  }

  // A background tab gets no frames, so the run does not end — it stops. Say
  // so, rather than leaving a still canvas that reads as a crash.
  function onVisibility(){
    const hidden = doc.visibilityState === 'hidden';
    if(hidden === paused) return;
    paused = hidden;
    // The first frame back must not be charged the whole time away.
    last = 0;
    onPause?.(paused);
    if(!paused || !g) return;
    g.save();
    g.fillStyle = 'rgba(16,18,20,0.72)';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#f2efe8';
    g.font = '600 15px Inter, system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('Paused — this tab is in the background.', w / 2, h / 2);
    g.restore();
  }
  doc.addEventListener('visibilitychange', onVisibility);

  function stop(){
    if(stopped) return;
    stopped = true;
    win.cancelAnimationFrame(raf);
    win.removeEventListener('keydown', onKeyDown);
    win.removeEventListener('keyup', onKeyUp);
    if(canvas){
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchcancel', onTouchEnd);
      canvas.removeEventListener('mousedown', onMouseDown);
    }
    doc.removeEventListener('visibilitychange', onVisibility);
    held.clear();
    pressed.clear();
  }

  resize();
  raf = win.requestAnimationFrame(frame);
  return { stop, input, isPaused: () => paused };
}

/**
 * A rounded rectangle, because every one of these draws one and the 2D context
 * only grew `roundRect` in 2023.
 */
export function roundRect(g, x, y, w, h, r){
  const rad = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
}

/**
 * Draw `text` inside `max` pixels, shrinking the face until it fits.
 *
 * An item name is authored by somebody who cannot see the canvas, and "Porcelain
 * insulator" at 15 px is 148 px wide against a 120 px tile. Clipping it reads as
 * a rendering bug; shrinking it reads as a small label.
 */
export function fitText(g, text, max, size, weight = '600'){
  let px = size;
  const face = (n) => `${weight} ${n}px Inter, system-ui, sans-serif`;
  g.font = face(px);
  while(px > 9 && g.measureText(text).width > max){
    px -= 1;
    g.font = face(px);
  }
  return px;
}
