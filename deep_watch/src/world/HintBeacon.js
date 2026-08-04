import * as THREE from 'three';
import { DECK_OPENINGS } from './SubmarineWorld.js';

/**
 * HintBeacon — when the player asks for a hint (H), the boat shows them where to
 * go as well as telling them what to think about.
 *
 * Three cues, all temporary:
 *   1. a pulsing ring and soft light shaft on the thing itself;
 *   2. the target compartment's own lighting shifts toward the accent colour and
 *      brightens, so it reads as "the lit space" from down the passage;
 *   3. a trail of chevrons along the centreline from the player toward it, which
 *      updates as they walk and disappears when they arrive.
 *
 * It is a deliberate affordance, not a scan: it points at a location the objective
 * has already named. It never reveals an undiscovered fault, and it costs score
 * through `MissionRuntime.hint()` like any other hint.
 */
const DURATION = 22;          // seconds the beacon stays lit
const CHEVRON_SPACING = 1.6;  // metres between trail marks
const MAX_CHEVRONS = 10;

export class HintBeacon {
  constructor({ scene, lighting, layout, eventBus }) {
    this.scene = scene;
    this.lighting = lighting;
    this.layout = layout;
    this.bus = eventBus;

    this.active = false;
    this.remaining = 0;
    this.target = null;          // THREE.Vector3
    this.targetCompartment = null;
    this._savedLight = null;

    this.group = new THREE.Group();
    this.group.name = 'HintBeacon';
    this.group.visible = false;
    scene.add(this.group);

    const accent = 0x3fb6c2;

    // Ring on the deck (or at the object's own height) around the target.
    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.66, 40),
      new THREE.MeshBasicMaterial({
        color: accent, transparent: true, opacity: 0.9, side: THREE.DoubleSide,
        depthWrite: false, fog: false,
      }));
    this.ring.rotation.x = -Math.PI / 2;
    this.group.add(this.ring);

    // A second, tighter ring so the mark still reads at a distance.
    this.innerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.16, 0.22, 28),
      new THREE.MeshBasicMaterial({
        color: accent, transparent: true, opacity: 0.75, side: THREE.DoubleSide,
        depthWrite: false, fog: false,
      }));
    this.innerRing.rotation.x = -Math.PI / 2;
    this.group.add(this.innerRing);

    // A soft column so it is visible over consoles and through a hatch.
    // Tapers away to nothing so it marks the spot without curtaining it off.
    this.shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.42, 1.5, 18, 1, true),
      new THREE.MeshBasicMaterial({
        color: accent, transparent: true, opacity: 0.055,
        side: THREE.DoubleSide, depthWrite: false, fog: false,
      }));
    this.shaft.position.y = 0.75;
    this.group.add(this.shaft);

    this.light = new THREE.PointLight(accent, 0, 3.5, 2.0);
    this.light.position.y = 0.9;
    this.group.add(this.light);

    // The trail of chevrons, reused rather than rebuilt each frame.
    this.chevrons = [];
    const chevronGeo = this._chevronGeometry();
    for (let i = 0; i < MAX_CHEVRONS; i++) {
      const m = new THREE.Mesh(chevronGeo, new THREE.MeshBasicMaterial({
        color: accent, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
        depthWrite: false, fog: false,
      }));
      m.rotation.x = -Math.PI / 2;
      m.visible = false;
      scene.add(m);
      this.chevrons.push(m);
    }
  }

  _chevronGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.22, -0.12);
    shape.lineTo(0, 0.12);
    shape.lineTo(0.22, -0.12);
    shape.lineTo(0.22, -0.22);
    shape.lineTo(0, 0.02);
    shape.lineTo(-0.22, -0.22);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  /**
   * Light up a place.
   * @param {THREE.Vector3|{x,y,z}} position world position of the thing to reach
   * @param {string} compartmentId compartment the target is in
   */
  show(position, compartmentId) {
    if (!position) return;
    this.target = new THREE.Vector3(position.x, position.y ?? 0, position.z);
    this.targetCompartment = compartmentId || null;
    this.group.position.set(this.target.x, 0.02, this.target.z);
    // Ring sits on the deck for floor targets and at the object for raised ones.
    const y = Math.max(0.02, Math.min(1.6, this.target.y));
    const ringY = y > 0.4 ? y : 0.09;      // clear of the deck, no z-fighting
    this.ring.position.y = ringY;
    this.innerRing.position.y = ringY + 0.002;
    this.shaft.position.y = ringY + 0.75;
    this.group.visible = true;
    this.active = true;
    this.remaining = DURATION;
    this._liftCompartmentLight(compartmentId);
  }

  hide() {
    this.active = false;
    this.group.visible = false;
    this.light.intensity = 0;
    for (const c of this.chevrons) c.visible = false;
    this._restoreCompartmentLight();
  }

  _liftCompartmentLight(compartmentId) {
    this._restoreCompartmentLight();
    const light = this.lighting?.compartmentLights?.get(compartmentId);
    if (!light) return;
    this._savedLight = {
      light,
      color: light.color.clone(),
      intensity: light.intensity,
      base: light.userData.baseIntensity,
    };
    light.userData.hintBoost = true;
  }

  _restoreCompartmentLight() {
    const s = this._savedLight;
    if (!s) return;
    s.light.color.copy(s.color);
    s.light.intensity = s.intensity;
    s.light.userData.baseIntensity = s.base;
    delete s.light.userData.hintBoost;
    this._savedLight = null;
  }

  /** @param {THREE.Vector3} playerPos */
  update(dt, t, playerPos) {
    if (!this.active) return;
    this.remaining -= dt;
    if (this.remaining <= 0) { this.hide(); return; }

    // Fade out over the last two seconds.
    const fade = Math.min(1, this.remaining / 2);
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin(t * 2.4));

    this.ring.material.opacity = 0.85 * pulse * fade;
    this.ring.scale.setScalar(1 + Math.sin(t * 2.4) * 0.12);
    this.innerRing.material.opacity = 0.7 * (1 - (pulse - 0.55) / 0.9) * fade;
    this.innerRing.scale.setScalar(1 + Math.cos(t * 2.4) * 0.18);
    this.shaft.material.opacity = 0.075 * pulse * fade;
    this.light.intensity = 1.6 * pulse * fade;

    // The target compartment breathes with the same pulse.
    const s = this._savedLight;
    if (s) {
      s.light.color.setHex(0x8fe3ec);
      s.light.userData.baseIntensity = s.base;
      s.light.intensity = (s.intensity + 0.8 * pulse) * (0.4 + 0.6 * fade);
    }

    this._updateTrail(playerPos, fade, t);
  }

  /** Chevrons down the centreline from the player toward the target. */
  _updateTrail(playerPos, fade, t) {
    if (!playerPos) { for (const c of this.chevrons) c.visible = false; return; }
    const from = playerPos.z;
    const to = this.target.z;
    const dz = to - from;
    const dir = Math.sign(dz) || 1;
    const dist = Math.abs(dz);

    // Arrived: no trail, just the beacon.
    if (dist < 2.2) { for (const c of this.chevrons) c.visible = false; return; }

    const count = Math.min(MAX_CHEVRONS, Math.floor(dist / CHEVRON_SPACING));
    for (let i = 0; i < this.chevrons.length; i++) {
      const c = this.chevrons[i];
      if (i >= count) { c.visible = false; continue; }
      const z = from + dir * (1.4 + i * CHEVRON_SPACING);
      // Do not float a deck marking over an open bilge recess.
      if (DECK_OPENINGS.some((o) => z > o.z1 - 0.2 && z < o.z2 + 0.2)) { c.visible = false; continue; }
      c.visible = true;
      c.position.set(0, 0.03, z);
      c.rotation.z = dir > 0 ? Math.PI : 0;   // point the way you must walk
      const march = (Math.sin(t * 3 - i * 0.6) + 1) / 2;
      c.material.opacity = (0.18 + 0.42 * march) * fade;
    }
  }
}
