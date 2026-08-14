// headless.mjs — enough of a browser for the world builders to run in node.
//
// The world modules are not written for node: they paint their textures onto a
// 2D canvas, they read `devicePixelRatio`, and one of them constructs a
// WebGLRenderer. None of that is needed to know what a builder *placed* — the
// scene graph is plain JavaScript and three.js does not touch the GPU until
// something renders — so a stub canvas and a stub renderer are enough to build a
// place in a checker and measure it.
//
// This exists so a dev check can ask questions about a room without a browser,
// a dev server and a screenshot. It is not a rendering test and cannot be one:
// anything about how a place *looks* still needs an actual screenshot, which is
// the most expensive lesson in this repo and is not being unlearned here.

/** A 2D context that accepts every call and returns something plausible. */
function stubContext(){
  return new Proxy({}, {
    get(_, k){
      if(k === 'measureText') return () => ({ width: 10 });
      if(k === 'createLinearGradient' || k === 'createRadialGradient'){
        return () => ({ addColorStop(){} });
      }
      if(k === 'createPattern') return () => ({});
      // Both directions: `getImageData(x, y, w, h)` and `createImageData(w, h)`.
      if(k === 'getImageData' || k === 'createImageData'){
        return (a, b, c, d) => {
          const w = c === undefined ? (a ?? 1) : c;
          const h = d === undefined ? (b ?? 1) : d;
          return { width: w, height: h, data: new Uint8ClampedArray(Math.max(4, w * h * 4)) };
        };
      }
      if(k === 'canvas') return { width: 1024, height: 1024 };
      return () => {};
    },
    set(){ return true; },
  });
}

/** Install the globals the world modules reach for. Idempotent. */
export function installDom(){
  if(globalThis.__gamekitHeadless) return;
  const canvas = () => ({
    width: 1024, height: 1024, style: {},
    getContext: () => stubContext(),
    toDataURL: () => 'data:,',
    addEventListener(){}, removeEventListener(){},
  });
  globalThis.document = {
    createElement: (t) => (t === 'canvas' ? canvas() : { style: {}, appendChild(){}, classList: { add(){}, remove(){} } }),
    body: { appendChild(){}, style: {} },
    getElementById: () => null,
    addEventListener(){},
    documentElement: { style: { setProperty(){} } },
  };
  globalThis.window = globalThis;
  globalThis.devicePixelRatio = 1;
  globalThis.innerWidth = 1280;
  globalThis.innerHeight = 800;
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => {};
  globalThis.__gamekitHeadless = true;
}

/**
 * A renderer stand-in.
 *
 * `buildInteriorLighting` asks for `capabilities.maxTextureSize` to size a shadow
 * map and hands the renderer to PMREMGenerator, which does need real GL — so a
 * checker builds the shell and skips the lighting.
 */
export function stubRenderer(){
  return {
    capabilities: { maxTextureSize: 8192 },
    shadowMap: { enabled: false },
    setPixelRatio(){}, setSize(){}, render(){}, setAnimationLoop(){},
    getContext: () => ({}),
    domElement: { style: {} },
  };
}
