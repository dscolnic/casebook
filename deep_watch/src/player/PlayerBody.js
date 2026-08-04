import * as THREE from 'three';

/**
 * PlayerBody — the watchstander you are playing, visible in third person.
 *
 * A submarine interior is cramped and low, so this is a deliberately compact
 * figure in coveralls: no cape, no bulk, nothing that would clip a bulkhead the
 * camera can already barely clear. Limbs swing from the player's actual speed
 * rather than from a canned animation, so walking, crouching and standing still
 * all read correctly without an animation system.
 *
 * The body is hidden in first person (you would only ever see the inside of your
 * own head) and shown in third.
 */
const COVERALL = 0x2e3f4a;
const SKIN = 0xb08968;

export class PlayerBody {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.name = 'PlayerBody';
    this.group.visible = false;
    scene.add(this.group);

    const cloth = new THREE.MeshStandardMaterial({ color: COVERALL, roughness: 0.85, metalness: 0.05 });
    const skin = new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.7 });
    const boot = new THREE.MeshStandardMaterial({ color: 0x15191c, roughness: 0.9 });

    const box = (w, h, d, mat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.castShadow = true;
      return m;
    };

    // Hips are the origin; everything hangs off them so crouch just lowers the group.
    this.hips = new THREE.Group();
    this.group.add(this.hips);

    this.torso = box(0.42, 0.6, 0.24, cloth);
    this.torso.position.y = 0.30;
    this.hips.add(this.torso);

    // A hint of a life-jacket collar so the silhouette is not a plain block.
    const collar = box(0.44, 0.1, 0.28, new THREE.MeshStandardMaterial({ color: 0x7a3a2e, roughness: 0.9 }));
    collar.position.y = 0.56;
    this.hips.add(collar);

    this.head = box(0.2, 0.22, 0.21, skin);
    this.head.position.y = 0.72;
    this.hips.add(this.head);

    const hair = box(0.21, 0.07, 0.22, new THREE.MeshStandardMaterial({ color: 0x241c17, roughness: 1 }));
    hair.position.y = 0.82;
    this.hips.add(hair);

    // Arms and legs pivot from their tops, so rotation swings them properly.
    const limb = (w, h, d, mat, x, y) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, 0);
      const mesh = box(w, h, d, mat);
      mesh.position.y = -h / 2;
      pivot.add(mesh);
      this.hips.add(pivot);
      return pivot;
    };
    this.armL = limb(0.11, 0.5, 0.13, cloth, -0.27, 0.55);
    this.armR = limb(0.11, 0.5, 0.13, cloth, 0.27, 0.55);
    this.legL = limb(0.14, 0.52, 0.16, cloth, -0.11, 0.02);
    this.legR = limb(0.14, 0.52, 0.16, cloth, 0.11, 0.02);

    for (const [leg, sx] of [[this.legL, -0.11], [this.legR, 0.11]]) {
      const b = box(0.16, 0.09, 0.24, boot);
      b.position.set(0, -0.50, 0.03);
      leg.add(b);
      void sx;
    }

    this._phase = 0;
  }

  setVisible(on) { this.group.visible = on; }

  /**
   * @param {THREE.Vector3} position player eye position
   * @param {number} yaw player heading, radians
   * @param {number} speed horizontal speed, m/s
   * @param {number} eyeHeight current eye height (drops when crouching)
   */
  update(dt, position, yaw, speed, eyeHeight) {
    // The eye sits at the top of the head; the hips hang below it.
    this.group.position.set(position.x, position.y - eyeHeight, position.z);
    this.group.rotation.y = yaw;
    // Crouching squashes the stance rather than shrinking the whole figure.
    const stance = Math.max(0.55, eyeHeight / 1.68);
    this.hips.position.y = eyeHeight - 0.86 * stance;
    this.hips.scale.y = stance;

    const moving = speed > 0.15;
    this._phase += dt * (moving ? 2.2 + speed * 1.6 : 0);
    const swing = moving ? Math.sin(this._phase) * Math.min(0.7, 0.22 + speed * 0.12) : 0;
    const settle = moving ? 0 : 0.06 * Math.sin(performance.now() / 900);   // breathing
    this.legL.rotation.x = swing;
    this.legR.rotation.x = -swing;
    this.armL.rotation.x = -swing * 0.8 + settle;
    this.armR.rotation.x = swing * 0.8 - settle;
  }
}
