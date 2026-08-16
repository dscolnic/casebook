// touch.js — the same game, played with thumbs.
//
// Every game in this repo is keyboard-and-mouse: WASD writes `moveState`, and
// PointerLockControls turns mouse deltas into camera rotation. Neither half
// exists on an iPad. Touch fires no `keydown`, so the walk keys are inert, and
// iPadOS Safari has no Pointer Lock API, so `controls.lock()` never resolves —
// which matters more than it looks, because `updatePlayer` and the interaction
// raycast are both gated on `isLocked`. A tablet therefore renders the world
// perfectly and leaves the player welded to the spawn point, which is exactly
// the failure house rule 8 is about, arriving through a different door.
//
// This module is the other input path. It writes the *same* `moveState` the
// keys write, which is why it drives a scooter and flies a helicopter without
// knowing either exists: `driving.js` and `flying.js` both read the player's
// key state through an `input()` callback, so anything that satisfies WASD
// satisfies them. Everything else — use, map, summary, collective — is sent as
// a synthetic KeyboardEvent on `window`, so the wiring in `main.js` stays the
// single description of what each control does. A touch button that called
// `activate()` directly would be a second copy of that decision, and the repo
// has paid for second copies.
//
// Look is done here rather than through PointerLockControls because its own
// `onMouseMove` returns early unless *its* `isLocked` is true, and that flag is
// owned by the browser. The maths below is lifted from it verbatim so that a
// drag and a mouse move produce identical rotation.

import * as THREE from 'three';
import { wantsTouch } from '../device.js';

// Re-exported because `player.js` asks this module the question and there is no
// reason for it to know the predicate moved out.
export { wantsTouch };

const _euler = new THREE.Euler(0, 0, 0, 'YXZ');
const _PI_2 = Math.PI / 2;

// Radians per pixel dragged. PointerLockControls uses 0.002 per unit of
// `movementX`, but a thumb travels far less distance than a mouse for the same
// intended turn, so this is deliberately faster.
const LOOK_SPEED = 0.0038;

// How far from where the thumb landed counts as full deflection. The stick
// floats — it is drawn wherever the thumb goes down rather than at a fixed
// spot — because a fixed stick has to be found by looking, and looking away
// from the world is the thing a first-person game cannot ask for.
const STICK_RADIUS = 54;

// A tap in the look zone counts as "use whatever the crosshair is on" only if
// the thumb barely moved and barely stayed. Anything looser fires E in the
// middle of turning around.
const TAP_SLOP = 11;      // px
const TAP_TIME = 320;     // ms

function key(code, type){
  window.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
}
/** Press and release, for the controls that are a single action. */
function tapKey(code){ key(code, 'keydown'); key(code, 'keyup'); }

/**
 * @param opts.camera     the player camera — look rotates it directly
 * @param opts.moveState  the object WASD writes; this writes the same fields
 * @returns null on a desktop, otherwise a handle the frame loop calls
 */
export function initTouch({ camera, moveState } = {}){
  if(!camera || !moveState || !wantsTouch()) return null;

  const layer = document.createElement('div');
  layer.id = 'touchLayer';
  // The stick is a child of the layer, not of the zone it is dragged in. Both
  // are absolutely positioned, and the zone is anchored to the bottom left —
  // so inside it, `left`/`top` are measured from a corner 62% of the way down
  // the screen, while a Touch reports where it is from the top. Parented there
  // the ring drew several hundred pixels below the window, which is invisible
  // and reads exactly like the stick not working at all.
  layer.innerHTML = `
    <div id="touchMove"></div>
    <div id="touchLook"></div>
    <div id="touchStick"><i></i></div>
    <div id="touchPad">
      <button id="tbLift" class="touchBtn small" type="button" hidden>Climb</button>
      <button id="tbDrop" class="touchBtn small" type="button" hidden>Descend</button>
      <button id="tbRun" class="touchBtn small" type="button">Run</button>
      <button id="tbUse" class="touchBtn big" type="button">Use</button>
    </div>
    <div id="touchTools">
      <button id="tbMap" class="touchBtn small" type="button">Map</button>
      <button id="tbTab" class="touchBtn small" type="button">Summary</button>
    </div>`;
  document.body.appendChild(layer);
  document.body.classList.add('touch');

  const moveZone = layer.querySelector('#touchMove');
  const lookZone = layer.querySelector('#touchLook');
  const stick    = layer.querySelector('#touchStick');

  // ------------------------------------------------------------------ stick
  // Tracked by `Touch.identifier`, not by "the first touch": the whole point
  // of two zones is that a thumb is walking while the other is looking, and
  // `touches[0]` is whichever of them started first.
  let stickId = null, stickX = 0, stickY = 0;

  const stopMoving = () => {
    stickId = null;
    moveState.forward = 0;
    moveState.right = 0;
    stick.classList.remove('on');
  };

  moveZone.addEventListener('touchstart', (e) => {
    if(stickId !== null) return;
    const t = e.changedTouches[0];
    stickId = t.identifier;
    stickX = t.clientX; stickY = t.clientY;
    stick.style.left = `${stickX}px`;
    stick.style.top  = `${stickY}px`;
    stick.style.setProperty('--nx', '0px');
    stick.style.setProperty('--ny', '0px');
    stick.classList.add('on');
    e.preventDefault();
  }, { passive: false });

  moveZone.addEventListener('touchmove', (e) => {
    for(const t of e.changedTouches){
      if(t.identifier !== stickId) continue;
      const dx = t.clientX - stickX, dy = t.clientY - stickY;
      const len = Math.hypot(dx, dy) || 1;
      // Clamp to the ring, then normalise: the analogue value falls out of the
      // same arithmetic, so a half-pushed stick walks at half speed where a key
      // only ever says 1.
      const k = Math.min(1, len / STICK_RADIUS) / len;
      const nx = dx * k * STICK_RADIUS, ny = dy * k * STICK_RADIUS;
      stick.style.setProperty('--nx', `${nx}px`);
      stick.style.setProperty('--ny', `${ny}px`);
      // Screen-up is forward; screen-right is the same value D writes.
      moveState.right   =  nx / STICK_RADIUS;
      moveState.forward = -ny / STICK_RADIUS;
    }
    e.preventDefault();
  }, { passive: false });

  for(const ev of ['touchend', 'touchcancel']){
    moveZone.addEventListener(ev, (e) => {
      for(const t of e.changedTouches) if(t.identifier === stickId) stopMoving();
    }, { passive: false });
  }

  // ------------------------------------------------------------------- look
  let lookId = null, lastX = 0, lastY = 0, downAt = 0, drifted = 0;

  lookZone.addEventListener('touchstart', (e) => {
    if(lookId !== null) return;
    const t = e.changedTouches[0];
    lookId = t.identifier;
    lastX = t.clientX; lastY = t.clientY;
    downAt = performance.now();
    drifted = 0;
    e.preventDefault();
  }, { passive: false });

  lookZone.addEventListener('touchmove', (e) => {
    for(const t of e.changedTouches){
      if(t.identifier !== lookId) continue;
      const dx = t.clientX - lastX, dy = t.clientY - lastY;
      lastX = t.clientX; lastY = t.clientY;
      drifted += Math.abs(dx) + Math.abs(dy);
      // Verbatim from PointerLockControls.onMouseMove, so a drag and a mouse
      // move are the same rotation.
      _euler.setFromQuaternion(camera.quaternion);
      _euler.y -= dx * LOOK_SPEED;
      _euler.x -= dy * LOOK_SPEED;
      _euler.x = Math.max(-_PI_2 + 1e-3, Math.min(_PI_2 - 1e-3, _euler.x));
      camera.quaternion.setFromEuler(_euler);
    }
    e.preventDefault();
  }, { passive: false });

  for(const ev of ['touchend', 'touchcancel']){
    lookZone.addEventListener(ev, (e) => {
      for(const t of e.changedTouches){
        if(t.identifier !== lookId) continue;
        // A tap that never became a drag is "use the thing I am looking at".
        // The explicit button below exists too; this is the one that makes
        // walking up to somebody and engaging feel like one gesture.
        if(ev === 'touchend' && drifted < TAP_SLOP && performance.now() - downAt < TAP_TIME){
          tapKey('KeyE');
        }
        lookId = null;
      }
    }, { passive: false });
  }

  // ---------------------------------------------------------------- buttons
  const btn = (id, onDown, onUp) => {
    const el = layer.querySelector(`#${id}`);
    el.addEventListener('touchstart', (e) => {
      e.preventDefault(); e.stopPropagation();
      el.classList.add('down');
      onDown();
    }, { passive: false });
    for(const ev of ['touchend', 'touchcancel']){
      el.addEventListener(ev, (e) => {
        e.preventDefault(); e.stopPropagation();
        el.classList.remove('down');
        onUp?.();
      }, { passive: false });
    }
    return el;
  };

  btn('tbUse', () => tapKey('KeyE'));
  btn('tbMap', () => tapKey('KeyM'));
  btn('tbTab', () => tapKey('Tab'));

  // Run is a toggle, not a hold. Holding it costs a third thumb, and the two
  // the player has are already on the stick and the look zone.
  const runBtn = layer.querySelector('#tbRun');
  btn('tbRun', () => {
    moveState.sprint = !moveState.sprint;
    runBtn.classList.toggle('latched', moveState.sprint);
  });

  // The collective is two held keys rather than a toggle, because a helicopter
  // that keeps climbing after you take your thumb off is a helicopter you cannot
  // land. `main.js` owns what R and F mean; this only presses them.
  const liftBtn = btn('tbLift', () => key('KeyR', 'keydown'), () => key('KeyR', 'keyup'));
  const dropBtn = btn('tbDrop', () => key('KeyF', 'keydown'), () => key('KeyF', 'keyup'));

  // ----------------------------------------------------------- panels close it
  // Every panel covers the screen at a higher stacking level, so they already
  // swallow the taps — but a thumb still resting on the stick when one opens
  // would keep walking behind it, and the day's clock is running. This zeroes
  // the stick and takes the layer out of the way, which also stops the pads
  // being drawn over the title card before the game has started.
  //
  // The list is the same one `app.js` panelUp() uses, plus the title blocker.
  // `.show` is how the sheets and the modal say they are up; the blocker says
  // it with `.hidden`, the other way round, which is why this reads a computed
  // predicate per element rather than one class name.
  const panels = [
    ['blocker',         el => !el.classList.contains('hidden')],
    ['overlay',         el =>  el.classList.contains('show')],
    ['verdictOverlay',  el =>  el.classList.contains('show')],
    ['statsOverlay',    el =>  el.classList.contains('show')],
    ['mapOverlay',      el =>  el.classList.contains('show')],
    ['settingsOverlay', el =>  el.classList.contains('show')],
  ].map(([id, up]) => [document.getElementById(id), up]).filter(([el]) => el);

  const sync = () => {
    const open = panels.some(([el, up]) => up(el));
    layer.classList.toggle('off', open);
    if(open){ stopMoving(); lookId = null; }
  };
  const watch = new MutationObserver(sync);
  for(const [el] of panels) watch.observe(el, { attributes: true, attributeFilter: ['class'] });
  sync();

  // The Controls note in Settings describes a keyboard nobody on this device
  // has. It is one paragraph and it is the only place the controls are written
  // down, so it is rewritten rather than appended to.
  const help = document.querySelector('.controlsHelp p');
  if(help){
    help.innerHTML = '<b>Left thumb</b> walk · <b>right side</b> drag to look · '
      + '<b>Use</b> opens the room, the person or the vehicle you are facing — '
      + 'tapping what you are looking at does the same · <b>Run</b> stays on until you tap it again.';
  }

  return {
    el: layer,
    /**
     * Called from the frame loop. The collective only exists in the air, and a
     * button for a control the player does not have is a button they will press.
     */
    setMode(mode){
      const flying = mode === 'fly';
      liftBtn.hidden = !flying;
      dropBtn.hidden = !flying;
    },
  };
}
