import * as THREE from 'three';

/**
 * ProceduralProps — reusable geometry kits (racks, consoles, pipes, valves,
 * lockers, ladders, bunks, signs). Everything is built from a handful of shared
 * box/cylinder geometries and the shared materials, so the whole boat stays cheap.
 *
 * Each factory returns a THREE.Group positioned at the origin; callers place it.
 * Props that the player can interact with are tagged via userData.interactable so
 * the InteractionSystem can pick them up with a raycast.
 */
export class ProceduralProps {
  constructor(materials) {
    this.mat = materials;
    // Cache a few geometries to reuse.
    this._box = new THREE.BoxGeometry(1, 1, 1);
    this._cyl = new THREE.CylinderGeometry(1, 1, 1, 12);
    this._torus = new THREE.TorusGeometry(0.18, 0.05, 8, 16);
  }

  _mesh(geo, mat, sx, sy, sz, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(geo, mat);
    m.scale.set(sx, sy, sz);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  /** Equipment rack / electronics cabinet with a few glowing indicator strips. */
  equipmentRack({ w = 0.7, h = 1.9, d = 0.6, screen = 0x1c6b52 } = {}) {
    const g = new THREE.Group();
    g.add(this._mesh(this._box, this.mat.cabinetGrey(), w, h, d, 0, h / 2, 0));
    // Face panel (slightly proud).
    g.add(this._mesh(this._box, this.mat.panelDark(), w * 0.92, h * 0.9, 0.04, 0, h / 2, d / 2));
    // Indicator strips.
    for (let i = 0; i < 3; i++) {
      const led = this._mesh(this._box, this.mat.emissive(screen, 1.4), w * 0.6, 0.03, 0.02,
        0, h * (0.3 + i * 0.2), d / 2 + 0.02);
      g.add(led);
    }
    return g;
  }

  /** An angled operator console with a glowing screen and a keyboard shelf. */
  console({ w = 1.2, screen = 0x123b40, label } = {}) {
    const g = new THREE.Group();
    const body = this._mesh(this._box, this.mat.cabinetGrey(), w, 0.95, 0.7, 0, 0.475, 0);
    g.add(body);
    // Angled screen.
    const scr = this._mesh(this._box, this.mat.screenGlass(screen), w * 0.85, 0.5, 0.05, 0, 1.15, 0.12);
    scr.rotation.x = -0.35;
    g.add(scr);
    // Screen frame.
    const frame = this._mesh(this._box, this.mat.panelDark(), w * 0.92, 0.58, 0.06, 0, 1.15, 0.08);
    frame.rotation.x = -0.35;
    g.add(frame);
    // Keyboard shelf.
    g.add(this._mesh(this._box, this.mat.panelDark(), w * 0.9, 0.05, 0.28, 0, 0.95, 0.42));
    if (label) g.userData.label = label;
    return g;
  }

  /** A run of pipe along an axis with optional valve wheel. Reusable pipe kit. */
  pipeRun({ length = 3, radius = 0.06, axis = 'z', colorHex = 0x6f7a54, valveAt = null } = {}) {
    const g = new THREE.Group();
    const pipe = new THREE.Mesh(this._cyl, this.mat.pipe(colorHex));
    pipe.scale.set(radius, length, radius);
    if (axis === 'z') pipe.rotation.x = Math.PI / 2;
    if (axis === 'x') pipe.rotation.z = Math.PI / 2;
    pipe.castShadow = true;
    g.add(pipe);
    if (valveAt !== null) {
      const wheel = new THREE.Mesh(this._torus, this.mat.valveRed());
      const off = valveAt;
      if (axis === 'z') { wheel.position.z = off; wheel.rotation.y = Math.PI / 2; }
      else if (axis === 'x') { wheel.position.x = off; }
      g.add(wheel);
    }
    return g;
  }

  /** A stand-alone valve manifold (several wheels on a block). */
  valveManifold(count = 3) {
    const g = new THREE.Group();
    g.add(this._mesh(this._box, this.mat.pipe(0x555f43), 0.9, 0.25, 0.25, 0, 0, 0));
    for (let i = 0; i < count; i++) {
      const wheel = new THREE.Mesh(this._torus, this.mat.valveRed());
      wheel.position.set(-0.3 + i * 0.3, 0.25, 0);
      wheel.rotation.x = Math.PI / 2;
      g.add(wheel);
    }
    return g;
  }

  /** Red damage-control locker with a stencilled front. */
  dcLocker(label = 'DC LOCKER') {
    const g = new THREE.Group();
    g.add(this._mesh(this._box, this.mat.lockerRed(), 0.8, 1.4, 0.4, 0, 0.7, 0));
    // Sign.
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.18), this.mat.labelMaterial(label, { bg: '#3a1512', fg: '#f0d9d2' }));
    sign.position.set(0, 1.15, 0.21);
    g.add(sign);
    // Latch.
    g.add(this._mesh(this._box, this.mat.brass(), 0.06, 0.2, 0.05, 0.3, 0.7, 0.21));
    return g;
  }

  /** Vertical ladder between decks (visual; climbing handled by controller zones). */
  ladder({ height = 2.2 } = {}) {
    const g = new THREE.Group();
    const railMat = this.mat.brass();
    g.add(this._mesh(this._cyl, railMat, 0.03, height, 0.03, -0.2, height / 2, 0));
    g.add(this._mesh(this._cyl, railMat, 0.03, height, 0.03, 0.2, height / 2, 0));
    const rungs = Math.floor(height / 0.3);
    for (let i = 1; i < rungs; i++) {
      const r = new THREE.Mesh(this._cyl, railMat);
      r.scale.set(0.025, 0.42, 0.025);
      r.rotation.z = Math.PI / 2;
      r.position.set(0, i * 0.3, 0);
      g.add(r);
    }
    return g;
  }

  /** A stack of two bunks with mattresses (berthing). */
  bunks() {
    const g = new THREE.Group();
    const frame = this.mat.cabinetGrey();
    const mat = this.mat.emissive(0x2a3a44, 0.05);
    for (const y of [0.4, 1.15]) {
      g.add(this._mesh(this._box, frame, 1.9, 0.06, 0.7, 0, y, 0));
      g.add(this._mesh(this._box, mat, 1.85, 0.12, 0.62, 0, y + 0.09, 0));
    }
    g.add(this._mesh(this._box, frame, 0.05, 1.3, 0.7, -0.95, 0.65, 0));
    g.add(this._mesh(this._box, frame, 0.05, 1.3, 0.7, 0.95, 0.65, 0));
    return g;
  }

  /** Cylindrical machinery housing (motor/turbine/compressor) with end bells. */
  machineryHousing({ length = 2.4, radius = 0.55, colorHex = 0x4a545c } = {}) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(this._cyl, new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5, metalness: 0.7 }));
    body.scale.set(radius, length, radius);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    g.add(body);
    // End bells.
    for (const x of [-length / 2, length / 2]) {
      const bell = new THREE.Mesh(this._cyl, this.mat.cabinetGrey());
      bell.scale.set(radius * 1.1, 0.15, radius * 1.1);
      bell.rotation.z = Math.PI / 2;
      bell.position.x = x;
      g.add(bell);
    }
    // Mounting feet.
    g.add(this._mesh(this._box, this.mat.hullSteel(), length, 0.12, radius * 2.2, 0, -radius - 0.02, 0));
    return g;
  }

  /** Electrical switchboard with breaker handles. */
  switchboard() {
    const g = new THREE.Group();
    g.add(this._mesh(this._box, this.mat.cabinetGrey(), 2.0, 1.9, 0.5, 0, 0.95, 0));
    g.add(this._mesh(this._box, this.mat.panelDark(), 1.9, 1.8, 0.05, 0, 0.95, 0.26));
    // Breaker handles grid.
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const on = (r + c) % 4 !== 0;
        const h = this._mesh(this._box, this.mat.emissive(on ? 0x6bbf73 : 0xd1594e, 0.8),
          0.12, 0.18, 0.06, -0.75 + c * 0.37, 0.5 + r * 0.5, 0.29);
        g.add(h);
      }
    }
    return g;
  }

  /** A compartment sign that hangs above a hatch. */
  sign(text) {
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.28), this.mat.labelMaterial(text));
    return sign;
  }

  /** A physical instrument on a shelf that the player can pick up. */
  instrumentPickup(colorHex = 0x3fb6c2) {
    const g = new THREE.Group();
    g.add(this._mesh(this._box, this.mat.panelDark(), 0.16, 0.09, 0.05, 0, 0, 0));
    g.add(this._mesh(this._box, this.mat.emissive(colorHex, 1.4), 0.1, 0.05, 0.01, 0, 0.01, 0.03));
    return g;
  }

  dispose() {
    this._box.dispose();
    this._cyl.dispose();
    this._torus.dispose();
  }
}
