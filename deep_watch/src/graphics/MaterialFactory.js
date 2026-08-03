import * as THREE from 'three';

/**
 * MaterialFactory — shared, cached materials so the whole boat draws from a small
 * palette (important for performance: fewer unique materials → fewer draw calls,
 * and instanced props can share one material). Colours evoke worn painted steel,
 * rubber deck matting, and glowing instrument faces.
 */
export class MaterialFactory {
  constructor() {
    this.cache = new Map();
  }

  _get(key, make) {
    if (!this.cache.has(key)) this.cache.set(key, make());
    return this.cache.get(key);
  }

  hullSteel() {
    return this._get('hullSteel', () =>
      new THREE.MeshStandardMaterial({ color: 0x3a444c, roughness: 0.72, metalness: 0.55 }));
  }

  paintedBulkhead() {
    return this._get('paintedBulkhead', () =>
      new THREE.MeshStandardMaterial({ color: 0x5b6b63, roughness: 0.85, metalness: 0.2 }));
  }

  deckPlate() {
    return this._get('deckPlate', () =>
      new THREE.MeshStandardMaterial({ color: 0x23282b, roughness: 0.9, metalness: 0.3 }));
  }

  ceiling() {
    return this._get('ceiling', () =>
      new THREE.MeshStandardMaterial({ color: 0x2b3238, roughness: 0.8, metalness: 0.25 }));
  }

  cabinetGrey() {
    return this._get('cabinetGrey', () =>
      new THREE.MeshStandardMaterial({ color: 0x4a545c, roughness: 0.6, metalness: 0.5 }));
  }

  pipe(colorHex = 0x6f7a54) {
    return this._get('pipe_' + colorHex, () =>
      new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5, metalness: 0.7 }));
  }

  valveRed() {
    return this._get('valveRed', () =>
      new THREE.MeshStandardMaterial({ color: 0xb0433a, roughness: 0.5, metalness: 0.6 }));
  }

  brass() {
    return this._get('brass', () =>
      new THREE.MeshStandardMaterial({ color: 0xb08d4a, roughness: 0.4, metalness: 0.85 }));
  }

  screenGlass(colorHex = 0x123b40) {
    return this._get('screen_' + colorHex, () =>
      new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.3,
        metalness: 0.1,
        emissive: new THREE.Color(colorHex).multiplyScalar(0.6),
        emissiveIntensity: 1.0,
      }));
  }

  panelDark() {
    return this._get('panelDark', () =>
      new THREE.MeshStandardMaterial({ color: 0x1a2228, roughness: 0.6, metalness: 0.4 }));
  }

  lockerRed() {
    return this._get('lockerRed', () =>
      new THREE.MeshStandardMaterial({ color: 0x8a3b32, roughness: 0.7, metalness: 0.3 }));
  }

  emissive(colorHex, intensity = 1) {
    return this._get(`emissive_${colorHex}_${intensity}`, () =>
      new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: intensity,
        roughness: 0.4,
        metalness: 0.1,
      }));
  }

  /** A simple label texture drawn to a canvas — used for stencilled compartment signs. */
  labelMaterial(text, { bg = '#11181d', fg = '#cfe0e6', w = 512, h = 128 } = {}) {
    const key = `label_${text}`;
    return this._get(key, () => {
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#3fb6c2';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, w - 12, h - 12);
      ctx.fillStyle = fg;
      ctx.font = 'bold 46px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.toUpperCase(), w / 2, h / 2);
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 4;
      return new THREE.MeshBasicMaterial({ map: tex, transparent: false });
    });
  }

  dispose() {
    for (const m of this.cache.values()) {
      if (m.map) m.map.dispose();
      m.dispose?.();
    }
    this.cache.clear();
  }
}
