import * as THREE from 'three';

/**
 * PlayerController — first-person walker with pointer-lock mouse-look, WASD,
 * crouch, limited sprint, subtle head-bob/inertia, and circle-vs-world collision.
 *
 * Movement is deliberately confined: modest speed, real collision against consoles
 * and bulkheads, a low ceiling and crouch, so the boat feels cramped — not an
 * arcade corridor. The camera eye height drops when crouching.
 */
const EYE_STAND = 1.68;
const EYE_CROUCH = 1.15;
const RADIUS = 0.32;

/**
 * Third-person boom. The camera stays on the player's own line of sight — no
 * shoulder offset — because the crosshair has to keep meaning "what I am pointing
 * at", and a lateral offset breaks that at close range. Instead it rides high
 * enough to look over the watchstander's head rather than at the back of it.
 */
const BOOM_BACK = 2.8;
const BOOM_UP = 0.55;
const BOOM_MIN = 1.15;

export class PlayerController {
  constructor({ camera, domElement, collision, settings, eventBus }) {
    this.camera = camera;
    this.dom = domElement;
    this.collision = collision;
    this.settings = settings;
    this.bus = eventBus;

    this.yaw = 0;
    this.pitch = 0;
    this.position = new THREE.Vector3(0, EYE_STAND, 3);
    this.velocity = new THREE.Vector3();
    this.crouch = false;
    this.enabled = false;
    this.locked = false;

    this.keys = new Set();
    this._bobPhase = 0;
    this._bobOffset = 0;
    this._eye = EYE_STAND;

    // 'first' or 'third'. In third person the camera rides a boom behind the
    // watchstander, pulled in whenever a bulkhead is in the way — which, on a
    // submarine, is most of the time.
    this.view = 'first';
    this._boom = BOOM_BACK;

    this._onKeyDown = (e) => this._key(e, true);
    this._onKeyUp = (e) => this._key(e, false);
    this._onMouseMove = (e) => this._mouse(e);
    this._onLockChange = () => this._lockChange();
    this._onClick = () => { if (this.enabled && !this.locked) this.requestLock(); };
  }

  attach() {
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onLockChange);
    this.dom.addEventListener('click', this._onClick);
  }

  detach() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onLockChange);
    this.dom.removeEventListener('click', this._onClick);
  }

  setEnabled(on) {
    this.enabled = on;
    if (!on) this.keys.clear();
  }

  requestLock() {
    this.dom.requestPointerLock?.();
  }

  exitLock() {
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  _lockChange() {
    this.locked = document.pointerLockElement === this.dom;
    this.bus.emit('player:pointerLock', this.locked);
  }

  _key(e, down) {
    // Let the pause/menu layer handle Escape; ignore when typing in inputs.
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
    const code = e.code;
    if (down) this.keys.add(code); else this.keys.delete(code);
    if (down && code === 'ControlLeft') this.crouch = true;
    if (!down && code === 'ControlLeft') this.crouch = false;
    if (down && code === 'KeyC') this.crouch = !this.crouch;
  }

  _mouse(e) {
    if (!this.locked || !this.enabled) return;
    const s = this.settings.get('mouseSensitivity');
    const invert = this.settings.get('invertY') ? -1 : 1;
    this.yaw -= e.movementX * s;
    this.pitch -= e.movementY * s * invert;
    const lim = Math.PI / 2 - 0.05;
    this.pitch = Math.max(-lim, Math.min(lim, this.pitch));
  }

  /** Switch between looking out of the watchstander's eyes and looking at them. */
  toggleView(mode) {
    this.view = mode || (this.view === 'first' ? 'third' : 'first');
    this.bus.emit('player:viewChanged', this.view);
    return this.view;
  }

  /** Where the player's eyes are, regardless of where the camera is. */
  get eyePosition() { return this.position; }

  /** Teleport the player (used at mission start). */
  setPose(x, z, yawDeg) {
    this.position.set(x, EYE_STAND, z);
    if (yawDeg != null) this.yaw = THREE.MathUtils.degToRad(yawDeg);
  }

  update(dt) {
    if (!this.enabled) { this._applyCamera(); return; }

    // Desired horizontal move in yaw-relative space.
    const forward = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const strafe = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const sprint = this.keys.has('ShiftLeft') && !this.crouch;

    let speed = this.crouch ? 1.5 : 2.5;
    if (sprint) speed = 3.6;

    // Move relative to where the camera looks. With YXZ rotation, the camera's
    // forward (look) direction is (-sin yaw, -cos yaw) and its right is
    // (cos yaw, -sin yaw). W (forward=+1) must go along the look direction.
    const sinY = Math.sin(this.yaw), cosY = Math.cos(this.yaw);
    let mx = (strafe * cosY) + (forward * -sinY);
    let mz = (strafe * -sinY) + (forward * -cosY);
    const len = Math.hypot(mx, mz);
    if (len > 0) { mx /= len; mz /= len; }

    const moving = len > 0;
    const targetVX = mx * speed;
    const targetVZ = mz * speed;
    // Smooth acceleration for a touch of inertia.
    const accel = moving ? 12 : 10;
    this.velocity.x += (targetVX - this.velocity.x) * Math.min(1, accel * dt);
    this.velocity.z += (targetVZ - this.velocity.z) * Math.min(1, accel * dt);

    let nx = this.position.x + this.velocity.x * dt;
    let nz = this.position.z + this.velocity.z * dt;

    // Collision resolve in XZ.
    const resolved = this.collision.resolve(nx, nz, RADIUS);
    this.position.x = resolved.x;
    this.position.z = resolved.z;

    // Eye height easing (crouch) + head bob.
    const targetEye = this.crouch ? EYE_CROUCH : EYE_STAND;
    this._eye += (targetEye - this._eye) * Math.min(1, 10 * dt);
    if (moving && this.settings.get('headBob')) {
      this._bobPhase += dt * speed * 2.4;
      this._bobOffset = Math.sin(this._bobPhase) * 0.035;
    } else {
      this._bobOffset *= 0.9;
    }
    this.position.y = this._eye + this._bobOffset;

    this._applyCamera();
    this.bus.emit('player:moved', this.position);
  }

  _applyCamera() {
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');

    if (this.view === 'third') {
      // Boom straight back along the look direction, then shortened until it is
      // clear of the structure. Collision is solved in XZ, which is all that
      // matters in a single-deck boat.
      const sinY = Math.sin(this.yaw), cosY = Math.cos(this.yaw);
      const back = Math.cos(this.pitch);
      let want = BOOM_BACK;
      for (let d = BOOM_BACK; d >= BOOM_MIN; d -= 0.15) {
        const cxp = this.position.x + sinY * d * back;
        const czp = this.position.z + cosY * d * back;
        const res = this.collision.resolve(cxp, czp, 0.28);
        if (Math.hypot(res.x - cxp, res.z - czp) < 0.02) { want = d; break; }
        want = d;
      }
      // Ease so the camera does not snap when it clears a doorway.
      this._boom += (want - this._boom) * 0.25;
      const d = this._boom;
      this.camera.position.set(
        this.position.x + sinY * d * back,
        Math.min(2.32, this.position.y + BOOM_UP + Math.sin(this.pitch) * -d),
        this.position.z + cosY * d * back);
      // If the structure has squeezed the boom right in, we are inside the
      // watchstander's head; hide them rather than render the inside of a skull.
      this._bodyVisible = d > 1.0;
    } else {
      this.camera.position.copy(this.position);
      this._bodyVisible = false;
    }

    const fov = this.settings.get('fov');
    if (this.camera.fov !== fov) { this.camera.fov = fov; this.camera.updateProjectionMatrix(); }
  }
}
