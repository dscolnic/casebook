import * as THREE from 'three';
import { BILGE_DEPTH_CM } from './fittings.js';

/**
 * BilgeVisuals — the physical bilge under a removable deck plate: a recess sunk
 * below the deck, a water surface whose height tracks `state.bilgeLevels`, the
 * ruptured pipe stub, its jet, and the sheet of water that spreads across the deck
 * plates once the recess is full.
 *
 * The recess is only visible because SubmarineWorld cuts a matching hole in the
 * deck; lifting the plate is therefore a real physical discovery rather than a
 * label change.
 */
const RECESS_DEPTH = 1.0;   // metres from deck (y=0) to the bilge bottom

export class BilgeVisuals {
  /**
   * @param {object} opts
   * @param {THREE.Object3D} opts.parent
   * @param {object} opts.materials
   * @param {object} opts.hole { x1, x2, z1, z2 } world-space opening in the deck
   * @param {string} opts.compartment compartment id whose bilge level drives this
   */
  constructor({ parent, materials, hole, compartment, state }) {
    this.mat = materials;
    this.hole = hole;
    this.compartment = compartment;
    this.state = state;
    this.group = new THREE.Group();
    this.group.name = `bilge_${compartment}`;
    parent.add(this.group);
    this._t = 0;
    this._build();
  }

  get _w() { return this.hole.x2 - this.hole.x1; }
  get _d() { return this.hole.z2 - this.hole.z1; }
  get _cx() { return (this.hole.x1 + this.hole.x2) / 2; }
  get _cz() { return (this.hole.z1 + this.hole.z2) / 2; }

  _build() {
    const w = this._w, d = this._d, cx = this._cx, cz = this._cz;
    // Painted bilge walls: deliberately lighter than the water, so a dark
    // reflective pool reads against them from deck level.
    const wall = new THREE.MeshStandardMaterial({ color: 0x4a5258, roughness: 0.9, metalness: 0.25 });

    // Recess: four inner walls plus a bottom, so the player looks into a real box.
    const bottom = new THREE.Mesh(new THREE.PlaneGeometry(w, d), wall);
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.set(cx, -RECESS_DEPTH, cz);
    bottom.receiveShadow = true;
    this.group.add(bottom);

    for (const [sx, sz, ww, hh] of [
      [cx, this.hole.z1, w, 0], [cx, this.hole.z2, w, 0],
    ]) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(ww, RECESS_DEPTH), wall);
      p.position.set(sx, -RECESS_DEPTH / 2, sz);
      if (sz === this.hole.z1) p.rotation.y = 0; else p.rotation.y = Math.PI;
      this.group.add(p);
    }
    for (const hx of [this.hole.x1, this.hole.x2]) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(d, RECESS_DEPTH), wall);
      p.position.set(hx, -RECESS_DEPTH / 2, cz);
      p.rotation.y = hx === this.hole.x1 ? Math.PI / 2 : -Math.PI / 2;
      this.group.add(p);
    }

    // Coaming lip around the opening — also the collider that stops the player
    // walking out over a hole in the deck.
    const lipMat = this.mat.hullSteel();
    this.lips = [];
    const t = 0.09, h = 0.1;
    for (const [px, pz, sx, sz] of [
      [cx, this.hole.z1 - t / 2, w + t * 2, t],
      [cx, this.hole.z2 + t / 2, w + t * 2, t],
      [this.hole.x1 - t / 2, cz, t, d],
      [this.hole.x2 + t / 2, cz, t, d],
    ]) {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(sx, h, sz), lipMat);
      lip.position.set(px, h / 2, pz);
      this.group.add(lip);
      this.lips.push(lip);
    }

    // A dim bilge light, switched on with the plate. It is genuinely gloomy down
    // there — the flashlight still helps — but the water has to be legible.
    this.bilgeLight = new THREE.PointLight(0xa8d8e0, 0, 3.2, 2.0);
    this.bilgeLight.position.set(cx, -0.28, cz);
    this.group.add(this.bilgeLight);

    // Water surface inside the recess.
    this.water = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.02, d - 0.02, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x123c42, roughness: 0.06, metalness: 0.85,
        transparent: true, opacity: 0.93,
        emissive: 0x1c6f78, emissiveIntensity: 1.15,
      }));
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.set(cx, -RECESS_DEPTH, cz);
    this.water.visible = false;
    this.group.add(this.water);
    this._waterBase = this.water.geometry.attributes.position.array.slice();

    // Sheet of water across the deck once the recess overflows.
    this.deckSheet = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 4.5),
      new THREE.MeshStandardMaterial({
        color: 0x21646a, roughness: 0.15, metalness: 0.4, transparent: true, opacity: 0,
      }));
    this.deckSheet.rotation.x = -Math.PI / 2;
    this.deckSheet.position.set(cx, 0.016, cz);
    this.deckSheet.visible = false;
    this.group.add(this.deckSheet);

    // The ruptured pipe stub low on the inboard side of the recess.
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x4b6470, roughness: 0.5, metalness: 0.75 });
    const stub = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, d * 0.9, 10), pipeMat);
    stub.rotation.x = Math.PI / 2;
    stub.position.set(this.hole.x1 + 0.22, -RECESS_DEPTH + 0.42, cz);
    this.group.add(stub);
    this.rupturePoint = new THREE.Vector3(this.hole.x1 + 0.22, -RECESS_DEPTH + 0.42, cz + 0.15);

    // A torn flange collar marks the failure.
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 6, 14), this.mat.valveRed());
    collar.position.copy(this.rupturePoint);
    collar.rotation.y = Math.PI / 2;
    this.group.add(collar);
    this.collar = collar;

    // The jet: a stretched translucent cone that shivers while the leak runs.
    this.jet = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.8, 10, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0xdff4f8, transparent: true, opacity: 0.45, roughness: 0.05,
        emissive: 0x8fd8e4, emissiveIntensity: 1.6, side: THREE.DoubleSide,
      }));
    this.jet.rotation.z = -Math.PI / 2;
    this.jet.position.set(this.rupturePoint.x + 0.46, this.rupturePoint.y, this.rupturePoint.z);
    this.group.add(this.jet);

    // Its own light, so a running leak is visible from deck level even in the dark.
    this.jetLight = new THREE.PointLight(0x9fe4ee, 0, 2.4, 2.2);
    this.jetLight.position.copy(this.jet.position);
    this.group.add(this.jetLight);

    // Where it lands: a bright disturbed ring on the water.
    this.splash = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.15, 20),
      new THREE.MeshStandardMaterial({
        color: 0xeafaff, transparent: true, opacity: 0.38,
        emissive: 0xbdeef6, emissiveIntensity: 1.2, side: THREE.DoubleSide,
      }));
    this.splash.rotation.x = -Math.PI / 2;
    this.splash.visible = false;
    this.group.add(this.splash);

    // Portable pump suction hose, dropped in once the pump is set (hidden at first).
    this.suction = new THREE.Group();
    const hose = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, RECESS_DEPTH + 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x2c2c30, roughness: 0.9 }));
    hose.position.set(cx + 0.28, -RECESS_DEPTH / 2 + 0.25, cz - 0.2);
    const strainer = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 8), this.mat.brass());
    strainer.position.set(cx + 0.28, -RECESS_DEPTH + 0.08, cz - 0.2);
    this.suction.add(hose, strainer);
    this.suction.visible = false;
    this.group.add(this.suction);

    // The deck plate lid itself is owned by SubmarineWorld (it is the interactable).
  }

  setPumpDeployed(on) { this.suction.visible = on; }

  /** Hide the jet once the leak is isolated/patched. */
  update(dt, t) {
    this._t += dt;
    const levelCm = this.state.bilgeLevels[this.compartment] ?? 0;
    const src = this.state.floodingSources.find((f) => f.compartment === this.compartment);
    const flowing = !!src && src.rate_m3h > 1.5;

    // Bilge lighting follows the deck plate.
    const plateOpen = !!this.plateRecord?.data?.open;
    this.bilgeLight.intensity = plateOpen ? 1.5 : 0;

    // Water surface height and gentle chop.
    let waterY = -RECESS_DEPTH;
    if (levelCm > 0.3) {
      this.water.visible = true;
      const y = -RECESS_DEPTH + Math.min(BILGE_DEPTH_CM, levelCm) / 100;
      this.water.position.y = y;
      waterY = y;
      const pos = this.water.geometry.attributes.position;
      const amp = flowing ? 0.018 : 0.006;
      for (let i = 0; i < pos.count; i++) {
        const bx = this._waterBase[i * 3], bz = this._waterBase[i * 3 + 1];
        pos.array[i * 3 + 2] = Math.sin(t * 2.4 + bx * 3.1 + bz * 2.2) * amp;
      }
      pos.needsUpdate = true;
    } else {
      this.water.visible = false;
    }

    // Overflow sheet across the deck.
    const over = Math.max(0, levelCm - BILGE_DEPTH_CM);
    if (over > 0.2) {
      this.deckSheet.visible = true;
      this.deckSheet.material.opacity = Math.min(0.72, 0.12 + over * 0.02);
      this.deckSheet.position.y = 0.016 + Math.min(0.12, over * 0.004);
    } else {
      this.deckSheet.visible = false;
    }

    // Jet, its light, and where it lands.
    this.jet.visible = flowing;
    this.jetLight.intensity = flowing ? 1.1 : 0;
    this.collar.visible = true;
    if (flowing) {
      const s = 0.85 + Math.sin(t * 17) * 0.12;
      this.jet.scale.set(s, 1 + Math.sin(t * 11) * 0.08, s);
      this.jet.material.opacity = 0.48 + Math.abs(Math.sin(t * 9)) * 0.2;
      this.splash.visible = levelCm > 0.3 && waterY < this.jet.position.y;
      this.splash.position.set(this.jet.position.x + 0.28, waterY + 0.012, this.jet.position.z);
      const rs = 1 + Math.abs(Math.sin(t * 6)) * 0.35;
      this.splash.scale.set(rs, rs, 1);
    } else {
      this.splash.visible = false;
    }
  }
}
