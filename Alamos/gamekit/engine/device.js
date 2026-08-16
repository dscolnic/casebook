// device.js — what kind of machine is this being played on.
//
// One question, asked in two places that must agree: `core/touch.js` decides
// whether to build a thumb layer, and `world/materials.js` decides how hard to
// push the renderer. Neither layer imports the other — nothing under
// `engine/world` has ever imported from `engine/core` — so the predicate lives
// above both rather than being answered twice.

/**
 * Is this a device that has to be played with thumbs?
 *
 * `maxTouchPoints > 0` is not the question — a touchscreen laptop answers yes
 * and has a mouse. The question is whether there is a fine pointer to lock, so
 * this asks for a coarse pointer that cannot hover, which is a tablet or a
 * phone and not a Surface with a trackpad. `?touch=1` and `?touch=0` override
 * it, because the only way to iterate on the touch layer — or to see what the
 * renderer does under its mobile budget — is to force it on at a desk.
 *
 * Every capability here is asked for rather than assumed: the headless builders
 * in engine/dev stub a canvas and a renderer but not a browser.
 */
export function wantsTouch(){
  if(typeof window === 'undefined' || typeof document === 'undefined') return false;
  const forced = typeof location === 'undefined'
    ? null : new URLSearchParams(location.search || '').get('touch');
  if(forced === '1') return true;
  if(forced === '0') return false;
  return window.matchMedia?.('(pointer: coarse) and (hover: none)').matches === true;
}
