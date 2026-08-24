// flying.js — a helicopter, for a campaign whose sites are kilometres apart.
//
// This is `driving.js` with a third axis, and it is a separate module rather
// than a mode inside that one for a reason: the two share the parts that are
// already shared (an interactable, a collision box, a camera handoff) and
// disagree about the two things that matter. A car is pinned to the ground and
// collides with everything standing on it. A helicopter has its own altitude
// and, above a roof, is entitled to ignore it.
//
// ## What it is not
//
// It is not a flight model. Cyclic, collective, tail rotor and torque are a
// game in themselves and this one is about asteroids. What is here is: pitch
// forward to go, altitude on two keys, yaw on two more, and a settling descent
// when you stop asking for lift. Enough to fly a ridge at night and land on a
// pad you can see from four hundred metres away.
//
// ## The rules it does keep
//
//   · Altitude is real and gravity is real. Let go of everything and it sinks.
//   · You can only get out on the ground, because the alternative is stepping
//     out at sixty metres.
//   · Collision is altitude-aware: a dome is solid at ten metres and irrelevant
//     at fifty. `driving.js` compares against ground height, which would have
//     the aircraft bouncing off buildings it is a hundred feet above.
//   · A ceiling, because the world is built to be seen from the ridge and from
//     three hundred metres up you are looking at the edge of the terrain mesh.
import * as THREE from 'three';

/**
 * Make an existing aircraft group flyable.
 *
 * @param group        the mesh group, positioned in world space
 * @param opts.id      unique id for the interactable and the prompt
 * @param opts.label   what the prompt calls it
 * @param opts.seat    pilot's eye offset in the aircraft's own frame
 * @param opts.rotors  { main, tail } meshes to spin
 * @param opts.colliders / opts.interactables   the world's arrays
 */
export function flyable(scene, group, opts = {}){
  const halfW = opts.halfWidth ?? 1.6;
  const halfL = opts.halfLength ?? 5.2;
  const height = opts.height ?? 3.2;
  const seat = opts.seat ?? { x: 0, y: 1.9, z: -1.4 };

  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(halfW * 2 + 0.6, height, halfL * 2 + 0.6),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.userData.ignoreAudit = true;
  hit.position.set(0, height / 2, 0);
  group.add(hit);

  const record = {
    id: opts.id ?? `aircraft-${Math.round(group.position.x)}-${Math.round(group.position.z)}`,
    label: opts.label ?? 'helicopter',
    // See driving.js: the sort of thing rather than this one's name. An aircraft
    // defaults to its own kind because it already is one — nothing that flies is
    // interchangeable with anything that does not.
    kind: opts.kind ?? 'aircraft',
    group, hit, seat, halfW, halfL, height,
    rotors: opts.rotors ?? {},
    cruise: opts.cruise ?? 30,        // metres a second, flat out
    ceiling: opts.ceiling ?? 120,     // above ground level
    light: opts.light ?? null,        // landing light, switched on in flight
    // The pilot sits inside the machine, so the machine's own shell is between
    // the eye and everything else: at 70 metres over base camp the view was a
    // black disc with a ridge visible around the edges of it. These meshes are
    // hidden while somebody is aboard and put back when they get out.
    cockpitHide: opts.cockpitHide ?? [],
    box: null,
    colliders: opts.colliders ?? null,
  };
  record.box = boxFor(record);
  opts.colliders?.push(record.box);
  opts.interactables?.push({
    mesh: hit, type: 'aircraft', id: record.id, kind: record.kind,
    prompt: `E — Fly the ${record.label}`,
    aircraft: record,
  });
  return record;
}

function boxFor(a){
  const c = Math.abs(Math.cos(a.group.rotation.y)), s = Math.abs(Math.sin(a.group.rotation.y));
  const ex = a.halfL * s + a.halfW * c;
  const ez = a.halfL * c + a.halfW * s;
  const p = a.group.position;
  return new THREE.Box3(
    new THREE.Vector3(p.x - ex, p.y, p.z - ez),
    new THREE.Vector3(p.x + ex, p.y + a.height, p.z + ez));
}

/**
 * The controller the entry point drives.
 *
 * `input()` is the player's own key state — the same object `updatePlayer`
 * reads — plus `up` and `down`, which the entry point sets from the collective
 * keys. Everything else matches driving.js so the two can be wired the same way.
 */
export function createFlying({
  camera, colliders, groundHeight, bounds, input, player, onFlight,
}){
  const cameraOf = () => (typeof camera === 'function' ? camera() : camera);
  let current = null;
  let speed = 0;              // forward, m/s
  let climb = 0;              // vertical, m/s
  let yaw = 0;
  let spin = 0;               // rotor phase
  let travelled = 0;

  const GRAVITY = 9.0;        // sink rate authority, not real gravity
  const LIFT = 11.0;
  const CLEAR = 3.0;          // metres of air kept under the skids

  /**
   * Is this point flyable at this altitude?
   *
   * The altitude test is the whole difference from the car: a collider whose
   * top is below the aircraft is scenery, not an obstacle.
   */
  function clear(x, z, y){
    for(const b of colliders){
      if(x < b.min.x - 1.4 || x > b.max.x + 1.4) continue;
      if(z < b.min.z - 1.4 || z > b.max.z + 1.4) continue;
      if(b.max.y > y - 0.6) return false;      // we are not above it yet
    }
    return true;
  }

  return {
    get active(){ return !!current; },
    get aircraft(){ return current; },
    /** Metres flown since take-off, for whoever wants to charge for them. */
    get travelled(){ return travelled; },
    /** Height above the ground right now — the HUD wants it. */
    get altitude(){
      if(!current) return 0;
      const p = current.group.position;
      return Math.max(0, p.y - groundHeight(p.x, p.z));
    },
    get airborne(){ return !!current && this.altitude > 1.2; },

    enter(a){
      if(!a || current) return false;
      current = a;
      speed = 0; climb = 0; travelled = 0;
      yaw = a.group.rotation.y;
      const i = colliders.indexOf(a.box);
      if(i >= 0) colliders.splice(i, 1);
      if(a.light) a.light.visible = true;
      for(const m of a.cockpitHide) m.visible = false;
      return true;
    },

    /**
     * Get out. Only on the ground — stepping out at altitude is the one thing
     * this must not allow, and refusing is better than inventing a parachute.
     */
    exit(){
      if(!current) return false;
      if(this.altitude > 1.6) return false;
      const a = current;
      current = null;
      speed = 0; climb = 0;
      a.group.rotation.x = 0;
      a.group.rotation.z = 0;
      a.box = boxFor(a);
      colliders.push(a.box);
      if(a.light) a.light.visible = false;
      for(const m of a.cockpitHide) m.visible = true;
      const reach = Math.hypot(a.halfW, a.halfL) + 1.6;
      player.teleport({ x: a.group.position.x + reach, z: a.group.position.z });
      onFlight?.(travelled);
      travelled = 0;
      return true;
    },

    update(delta){
      if(!current) return;
      const a = current;
      const m = input() ?? { forward: 0, right: 0, sprint: false, up: 0, down: 0 };

      // ---- collective. Holding neither is a slow settle, which is what makes
      // landing a thing you do rather than a thing that happens to you.
      const demand = (m.up ? 1 : 0) - (m.down ? 1 : 0);
      climb += (demand * LIFT - GRAVITY * (demand <= 0 ? 1 : 0.25)) * delta;
      climb = Math.max(-9, Math.min(9, climb));
      climb *= 1 - Math.min(1, delta * 1.6);       // damping, or it porpoises

      // ---- cyclic and pedals
      const push = m.forward > 0 ? 1 : m.forward < 0 ? -0.45 : 0;
      const top = a.cruise * (m.sprint ? 1 : 0.62);
      speed += (push * top - speed) * Math.min(1, delta * (push ? 0.55 : 1.2));
      if(Math.abs(speed) < 0.05 && !push) speed = 0;
      // Yaw authority falls off with speed, so a fast run does not spin on the
      // spot, and a hover turns as fast as the player expects.
      yaw -= m.right * delta * (1.5 - Math.min(1.1, Math.abs(speed) / a.cruise));

      const p = a.group.position;
      const groundY = groundHeight(p.x, p.z);
      const nx = p.x - Math.sin(yaw) * speed * delta;
      const nz = p.z - Math.cos(yaw) * speed * delta;
      const ny = Math.max(groundY, Math.min(groundY + a.ceiling, p.y + climb * delta));

      // Bounds are the world's leash, same as the player's.
      const inBounds = Math.abs(nx) < bounds && Math.abs(nz) < bounds;
      if(inBounds && clear(nx, nz, ny)){
        travelled += Math.hypot(nx - p.x, nz - p.z);
        p.x = nx; p.z = nz;
      } else {
        speed *= 0.3;
      }

      // Never below the ground, and never *through* it on a slope: the skids
      // stop on the hillside they are flown into.
      p.y = Math.max(groundHeight(p.x, p.z), ny);
      if(p.y <= groundHeight(p.x, p.z) + 0.02 && climb < 0){ climb = 0; speed *= 0.86; }

      // ---- attitude. Nose down with speed, roll into the turn: this is the
      // only cue the player has that the machine is doing anything.
      const targetPitch = Math.min(0.30, (speed / a.cruise) * 0.30);
      const targetRoll = -m.right * 0.26 * Math.min(1, Math.abs(speed) / (a.cruise * 0.5));
      a.group.rotation.order = 'YXZ';
      a.group.rotation.y = yaw;
      a.group.rotation.x += (targetPitch - a.group.rotation.x) * Math.min(1, delta * 3);
      a.group.rotation.z += (targetRoll - a.group.rotation.z) * Math.min(1, delta * 3);

      // ---- rotors. They spin whenever somebody is aboard.
      spin += delta * 26;
      if(a.rotors.main) a.rotors.main.rotation.y = spin;
      if(a.rotors.tail) a.rotors.tail.rotation.x = spin * 1.7;

      // ---- the camera rides in the seat, and the mouse still looks freely.
      const cam = cameraOf();
      if(cam){
        const s = a.seat;
        const cos = Math.cos(yaw), sin = Math.sin(yaw);
        cam.position.set(
          p.x + s.x * cos + s.z * sin,
          p.y + s.y,
          p.z - s.x * sin + s.z * cos);
      }
    },
  };
}
