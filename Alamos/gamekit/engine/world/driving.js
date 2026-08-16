// driving.js — the parked vehicles start.
//
// Both outdoor games already had vehicles: Riverton's response trucks in the
// freight yard, Los Alamos's jeeps outside the motor pool. They were scenery
// with a collision box round them, which is a slightly annoying kind of prop —
// a car you cannot get into is a wall shaped like a car.
//
// This makes them driveable, in one place, because the alternative is writing
// it twice and having it work in one game (see the fork note in CLAUDE.md).
//
// ## How it works
//
// A vehicle is a group somebody else built. `driveable()` wraps one: it adds an
// invisible hit box so the raycast can find it, registers an interactable of
// type `vehicle`, and puts a collision box into the world's own array so the
// thing is still solid while nobody is in it.
//
// `createDriving()` returns the controller the entry point drives. While the
// player is in a vehicle:
//
//   · `updatePlayer` must not run — the camera is being placed by this module,
//     and two things writing the same position fight each other every frame;
//   · the vehicle's collision box is pulled out of the world array, because a
//     car that collides with itself cannot move;
//   · the camera sits in the driver's seat and the mouse still looks around
//     freely, so you can drive while reading a nameplate.
//
// Steering is speed-dependent, which is not a detail: a car that turns on the
// spot at zero speed feels like a shopping trolley, and one that turns at a
// fixed rate at speed cannot be driven down a street at all.
import * as THREE from 'three';

/**
 * Make an existing vehicle group driveable.
 *
 * @param group        the mesh group, already positioned and rotated in world space
 * @param opts.id      unique id — the interactable and the prompt use it
 * @param opts.label   what the prompt calls it ("jeep", "response truck")
 * @param opts.seat    driver's eye offset in the vehicle's own frame
 * @param opts.wheels  wheel meshes to spin, optional
 * @param opts.colliders / opts.interactables   the world's arrays
 */
export function driveable(scene, group, opts = {}){
  // Not every vehicle in this repo is built facing the same way. The engine's
  // own `kit.vehicle` is laid out along -z, which is what the controller drives
  // along; Project Y's jeep was modelled along +x. Rather than rebuild a jeep,
  // a vehicle whose body points elsewhere is parented into a wrapper that does
  // point along -z, and the wrapper is what gets driven.
  if(opts.bodyYaw){
    const wrap = new THREE.Group();
    wrap.position.copy(group.position);
    wrap.rotation.y = group.rotation.y - opts.bodyYaw;
    const parent = group.parent ?? scene;
    group.position.set(0, 0, 0);
    group.rotation.y = opts.bodyYaw;
    parent.add(wrap);
    wrap.add(group);
    group = wrap;
  }
  const halfW = opts.halfWidth ?? 1.2;
  const halfL = opts.halfLength ?? 2.6;
  const height = opts.height ?? 2.0;
  const seat = opts.seat ?? { x: 0, y: 1.35, z: 0.2 };

  // The raycast target. The body is many small meshes and several of them are
  // thin plates, so a single box is both cheaper and far easier to aim at.
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(halfW * 2 + 0.4, height, halfL * 2 + 0.4),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.userData.ignoreAudit = true;
  group.add(hit);
  hit.position.set(0, height / 2, 0);

  // Something to steer by. Sitting in a seat with nothing in front of you, in a
  // vehicle whose body is mostly behind your head, leaves no way to tell which
  // way the thing is pointing until it moves. The wheel is that reference, and
  // it turns with the input, so a held turn is visible before the world moves.
  let steeringWheel = null;
  if(opts.steer){
    // The vehicle brought its own steering to turn — a scooter's handlebar,
    // which pivots about its stem rather than lying back like a car's wheel.
    steeringWheel = opts.steer;
  } else if(opts.wheel !== false){
    steeringWheel = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: 0x23272b, roughness: 0.45, metalness: 0.35 });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.019, 8, 22), metal);
    steeringWheel.add(rim);
    for(let i = 0; i < 3; i++){
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.19, 0.016), metal);
      spoke.position.y = -0.095;
      spoke.rotation.z = (i - 1) * 2.1;
      spoke.position.x = Math.sin((i - 1) * 2.1) * 0.095;
      spoke.position.y = -Math.cos((i - 1) * 2.1) * 0.095;
      steeringWheel.add(spoke);
    }
    const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 10), metal);
    boss.rotation.x = Math.PI / 2;
    steeringWheel.add(boss);
    // Arm's length forward, and *above* the deck. Dropped half a metre below
    // the eye it ends up inside the bodywork, where the only part of it you can
    // see is the boss poking through the bonnet.
    steeringWheel.position.set(
      opts.wheelAt?.x ?? seat.x,
      opts.wheelAt?.y ?? (seat.y - 0.42),
      opts.wheelAt?.z ?? (seat.z - 0.88));
    steeringWheel.rotation.x = -0.72;                // laid back, as a wheel is
    steeringWheel.userData.ignoreAudit = true;
    group.add(steeringWheel);
  }

  const record = {
    id: opts.id ?? `vehicle-${Math.round(group.position.x)}-${Math.round(group.position.z)}`,
    steeringWheel,
    steerAxis: opts.steerAxis ?? 'z',
    steerAmount: opts.steerAmount ?? 0.9,
    label: opts.label ?? 'vehicle',
    verb: opts.verb ?? 'Drive',
    group, hit, seat, halfW, halfL, height,
    wheels: opts.wheels ?? [],
    wheelRadius: opts.wheelRadius ?? 0.45,
    // What the bonnet clears and drives over rather than stopping against. A
    // kerb to a truck is a wall to a scooter with 115 mm wheels.
    clearance: opts.clearance ?? 0.55,
    topSpeed: opts.topSpeed ?? 11,
    // How it handles. The defaults are the truck the controller was written for;
    // a scooter is a tenth of its mass and is unrideable on them — it pulls away
    // like a loaded flatbed and needs a street's width to turn round.
    accel: opts.accel ?? 7,
    reverseAccel: opts.reverseAccel ?? 5,
    // S is a brake while still going forwards and reverse once stopped. They
    // were the same number, which is right for a truck and wrong for anything
    // that rolls: a scooter that reverses at walking pace still has to be able
    // to stop at a door.
    brake: opts.brake ?? opts.reverseAccel ?? 5,
    coastDrag: opts.coastDrag ?? 3.4,
    driveDrag: opts.driveDrag ?? 1.1,
    turn: opts.turn ?? 1.5,
    // The speed at which steering reaches full authority. A car that turns on
    // the spot feels like a shopping trolley; a scooter that does not is a car.
    gripAt: opts.gripAt ?? 4,
    reverseFrac: opts.reverseFrac ?? 0.45,
    sprint: opts.sprint ?? 1.35,
    // Radians of roll leant into a turn at full speed. Zero for anything with
    // four wheels, because a truck that leans is a truck rolling over.
    lean: opts.lean ?? 0,
    hint: opts.hint ?? null,
    // What this vehicle is parked *in*, and must not be stopped by. A scooter
    // stands 0.7 m from its rack and the rack's collider is wider than that, so
    // every direction out was blocked from the moment you got on: the vehicle
    // starts inside a collider, which is the same trap that welds a person in
    // place (house rule 16), reached from the other side.
    ignore: new Set(opts.ignore ?? []),
    box: null,
    colliders: opts.colliders ?? null,
  };
  record.box = boxFor(record);
  opts.colliders?.push(record.box);
  opts.interactables?.push({
    mesh: hit, type: 'vehicle', id: record.id,
    prompt: `E — ${record.verb} the ${record.label}`,
    vehicle: record,
  });
  return record;
}

/** The collision box for a vehicle where it currently stands. */
function boxFor(v){
  const c = Math.abs(Math.cos(v.group.rotation.y)), s = Math.abs(Math.sin(v.group.rotation.y));
  const ex = v.halfL * s + v.halfW * c;
  const ez = v.halfL * c + v.halfW * s;
  const p = v.group.position;
  return new THREE.Box3(
    new THREE.Vector3(p.x - ex, p.y, p.z - ez),
    new THREE.Vector3(p.x + ex, p.y + v.height, p.z + ez));
}

/**
 * The controller.
 *
 * @param camera        the player's camera — placed in the seat while driving
 * @param colliders     world collision boxes; the driven vehicle is removed from these
 * @param softColliders world cylinders (people, bins, poles)
 * @param groundHeight  the world's single height function
 * @param bounds        the town's leash
 * @param input         () => moveState, the player's own key state
 * @param player        { teleport, getPosition }
 */
export function createDriving({
  camera, colliders, softColliders, groundHeight, bounds, input, player, onDrive,
}){
  // Two of the three entry points assign their camera inside initPlayer, which
  // runs *after* this is built — so a camera passed by value is undefined here
  // and stays undefined. A getter is accepted for exactly that reason.
  const cameraOf = () => (typeof camera === 'function' ? camera() : camera);
  let current = null;          // the vehicle being driven
  let speed = 0;               // metres per second, signed
  let yaw = 0;
  let travelled = 0;

  const seatWorld = new THREE.Vector3();

  /** Would the vehicle's footprint at (x, z, yaw) hit anything solid? */
  function blocked(v, x, z, heading){
    if(Math.abs(x) > bounds || Math.abs(z) > bounds) return true;
    const cos = Math.cos(heading), sin = Math.sin(heading);
    const y = groundHeight(x, z);
    // Corners plus the middle of each side: a car is long enough that testing
    // four corners alone lets a bollard pass straight through the doors.
    const pts = [
      [ v.halfW,  v.halfL], [-v.halfW,  v.halfL],
      [ v.halfW, -v.halfL], [-v.halfW, -v.halfL],
      [ v.halfW, 0], [-v.halfW, 0], [0, v.halfL], [0, -v.halfL],
    ];
    for(const [lx, lz] of pts){
      const px = x + lx * cos + lz * sin;
      const pz = z - lx * sin + lz * cos;
      for(const b of colliders){
        if(b === v.box || v.ignore.has(b)) continue;
        if(px < b.min.x || px > b.max.x || pz < b.min.z || pz > b.max.z) continue;
        // A kerb or a low plinth is not a wall. Anything the bonnet clears is
        // driven over rather than stopped against.
        if(b.max.y > y + (v.clearance ?? 0.55)) return true;
      }
    }
    // People and poles are circles, and sampling eight points along a six-metre
    // body misses them: a pedestrian fits between two samples, which is what
    // "the car drives through people" looks like from the seat. Test the whole
    // footprint instead, by putting each circle into the vehicle's own frame —
    // exact, and one comparison per soft collider.
    if(softColliders){
      for(const c of softColliders){
        if(c.r <= 0 || v.ignore.has(c)) continue;
        const dx = c.x - x, dz = c.z - z;
        const lx = dx * cos - dz * sin;
        const lz = dx * sin + dz * cos;
        if(Math.abs(lx) < v.halfW + c.r && Math.abs(lz) < v.halfL + c.r) return true;
      }
    }
    return false;
  }

  /**
   * Somewhere beside the vehicle a person can actually stand.
   *
   * This is the step that welded people in place. The collision box a vehicle
   * gets is axis-aligned, so a car parked diagonally has a box far wider than
   * the car — up to its full diagonal — and a dismount point measured from the
   * car's own width landed *inside* that box. The player was then standing in a
   * collider with every direction out blocked, which renders perfectly and does
   * not respond to W.
   *
   * So the test includes the vehicle's own box, uses the player's width as the
   * margin, and works outwards until it finds room.
   */
  function dismountSpot(v, pad = 0.6){
    const cos = Math.cos(v.group.rotation.y), sin = Math.sin(v.group.rotation.y);
    const p = v.group.position;
    const clearAt = (x, z) => {
      if(Math.abs(x) > bounds || Math.abs(z) > bounds) return false;
      const y = groundHeight(x, z);
      for(const b of colliders){
        if(x > b.min.x - pad && x < b.max.x + pad && z > b.min.z - pad && z < b.max.z + pad
           && b.max.y > y + 0.4) return false;
      }
      if(softColliders){
        for(const c of softColliders){
          if(c.r <= 0) continue;
          const dx = x - c.x, dz = z - c.z;
          if(dx * dx + dz * dz < (c.r + pad) * (c.r + pad)) return false;
        }
      }
      return true;
    };
    // Out of the driver's door first, then the other side, then fore and aft,
    // each at increasing distance. The box is at most its own diagonal wide, so
    // starting from that is what makes the first try usually work.
    const reach = Math.hypot(v.halfW, v.halfL);
    for(const step of [reach + 0.9, reach + 1.8, reach + 3.0]){
      for(const [ux, uz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]){
        const lx = ux * step, lz = uz * step;
        const x = p.x + lx * cos + lz * sin;
        const z = p.z - lx * sin + lz * cos;
        if(clearAt(x, z)) return { x, z };
      }
    }
    // Nothing anywhere: better to stand somewhere odd than inside the bodywork.
    return { x: p.x + reach + 2.4, z: p.z };
  }

  return {
    get active(){ return !!current; },
    get vehicle(){ return current; },

    enter(v){
      if(!v || current) return false;
      current = v;
      speed = 0;
      travelled = 0;
      yaw = v.group.rotation.y;
      // A car cannot collide with itself, and it is about to be somewhere else
      // anyway. The box goes back, in the new place, on the way out.
      const i = colliders.indexOf(v.box);
      if(i >= 0) colliders.splice(i, 1);
      return true;
    },

    exit(){
      if(!current) return false;
      const v = current;
      current = null;
      speed = 0;
      v.box = boxFor(v);
      colliders.push(v.box);
      const spot = dismountSpot(v);
      player.teleport({ x: spot.x, z: spot.z });
      // Straighten the rig back up: the vehicle was leaning with the ground and
      // nothing else resets those two axes.
      v.group.rotation.x = 0;
      v.group.rotation.z = 0;
      onDrive?.(travelled);
      travelled = 0;
      return true;
    },

    /** Metres driven since getting in — the entry point may charge for them. */
    get travelled(){ return travelled; },

    update(delta){
      if(!current) return;
      const v = current;
      const m = input() ?? { forward: 0, right: 0, sprint: false };

      // Throttle and brake. Reverse is deliberately slow: this is a town, and
      // a vehicle that reverses as fast as it drives is one nobody can park.
      const accel = m.forward > 0 ? v.accel
        : m.forward < 0 ? -(speed > 0.1 ? v.brake : v.reverseAccel) : 0;
      const drag = m.forward === 0 ? v.coastDrag : v.driveDrag;
      speed += accel * delta;
      speed -= Math.sign(speed) * drag * delta;
      if(Math.abs(speed) < 0.06 && m.forward === 0) speed = 0;
      const top = v.topSpeed * (m.sprint ? v.sprint : 1);
      speed = Math.max(-top * v.reverseFrac, Math.min(top, speed));

      // Steering scales with how fast the wheels are actually turning, and
      // reverses when reversing, which is what makes reverse parking work.
      if(m.right && Math.abs(speed) > 0.15){
        const grip = Math.min(1, Math.abs(speed) / v.gripAt);
        yaw -= m.right * v.turn * grip * delta * Math.sign(speed);
      }

      const nx = v.group.position.x - Math.sin(yaw) * speed * delta;
      const nz = v.group.position.z - Math.cos(yaw) * speed * delta;
      if(blocked(v, nx, nz, yaw)){
        // Stop dead rather than bounce: a bounce at a wall in a heavy vehicle
        // reads as a bug, and reversing out is the player's job.
        speed = 0;
      } else {
        travelled += Math.abs(speed) * delta;
        v.group.position.x = nx;
        v.group.position.z = nz;
      }
      v.group.position.y = groundHeight(v.group.position.x, v.group.position.z);
      v.group.rotation.y = yaw;

      // Sit on the ground rather than through it: sample fore and aft, and
      // across, so a jeep on a graded street leans the way the street does.
      const cos = Math.cos(yaw), sin = Math.sin(yaw);
      const at = (lx, lz) => groundHeight(
        v.group.position.x + lx * cos + lz * sin,
        v.group.position.z - lx * sin + lz * cos);
      const pitch = Math.atan2(at(0, v.halfL) - at(0, -v.halfL), v.halfL * 2);
      const ground = Math.atan2(at(v.halfW, 0) - at(-v.halfW, 0), v.halfW * 2);
      // Two wheels lean into the corner; four do not, and `lean` is 0 for them.
      const roll = ground + v.lean * m.right * Math.min(1, Math.abs(speed) / top);
      v.group.rotation.x += (-pitch - v.group.rotation.x) * Math.min(1, delta * 6);
      v.group.rotation.z += (roll - v.group.rotation.z) * Math.min(1, delta * 6);

      for(const w of v.wheels) w.rotation[w.userData.spinAxis ?? 'x'] -= speed * delta / v.wheelRadius;
      if(v.steeringWheel){
        const want = -m.right * v.steerAmount;
        const ax = v.steerAxis;
        v.steeringWheel.rotation[ax] += (want - v.steeringWheel.rotation[ax]) * Math.min(1, delta * 9);
      }

      // The camera goes in the seat. Its rotation is left alone — the mouse
      // still looks around, so you can drive past a nameplate and read it.
      seatWorld.set(v.seat.x, v.seat.y, v.seat.z);
      v.group.localToWorld(seatWorld);
      cameraOf()?.position.copy(seatWorld);
    },
  };
}

/** For an entry point that wants to know where the player really is. */
export function seatPosition(v, out = new THREE.Vector3()){
  out.set(v.seat.x, v.seat.y, v.seat.z);
  v.group.localToWorld(out);
  return out;
}
