import * as THREE from 'three';

/**
 * HandheldViewmodel — a small tool mesh pinned to the lower-right of the view,
 * parented to the camera so it tracks head movement. Purely cosmetic feedback
 * that the player is holding the active instrument; each tool gets a tinted body.
 */
export class HandheldViewmodel {
  constructor(camera) {
    this.camera = camera;
    this.group = new THREE.Group();
    this.group.position.set(0.28, -0.28, -0.6);
    camera.add(this.group);
    this.current = null;
    this._sway = 0;
  }

  show(instrumentId, colorHex = 0x3fb6c2) {
    this.clear();
    if (!instrumentId) return;
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.07, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x1a2228, roughness: 0.5, metalness: 0.4 }));
    g.add(body);
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.045, 0.005),
      new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 1.3 }));
    screen.position.set(0, 0.02, 0.092);
    g.add(screen);
    // Flashlight gets a little barrel instead.
    if (instrumentId === 'flashlight') {
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.035, 0.16, 12),
        new THREE.MeshStandardMaterial({ color: 0x30383d, roughness: 0.4, metalness: 0.7 }));
      barrel.rotation.x = Math.PI / 2;
      g.clear();
      g.add(barrel);
    }
    this.group.add(g);
    this.current = g;
  }

  clear() {
    if (this.current) { this.group.remove(this.current); this.current = null; }
  }

  update(dt, moving) {
    // Subtle idle sway + walk bob so the tool feels handheld.
    this._sway += dt * (moving ? 8 : 2);
    this.group.position.x = 0.28 + Math.sin(this._sway) * (moving ? 0.01 : 0.003);
    this.group.position.y = -0.28 + Math.abs(Math.sin(this._sway)) * (moving ? 0.012 : 0.004);
  }
}
