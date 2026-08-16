// props.js — what makes this a hospital in its third week of an emergency.
//
// `site.js` places the permanent buildings. Everything here is the temporary
// layer that has been built on top of them, and it is the whole reason this
// campus does not read as a town: triage marquees filling the courtyards,
// container laboratories in the car park, a decontamination tunnel you walk
// through, floodlight masts, crate stacks, and the fence that makes the campus
// a place with an inside and an outside.
//
// Rules obeyed here, each of which cost somebody hours:
//   · placement helpers take (x, z, y) — ground LAST;
//   · nothing within ten metres of the spawn at (0, 44);
//   · no real lights. The floodlights are emissive panels. Twenty-eight point
//     lights took a floor from 118 fps to 20 and the sun rig already spends
//     three of the six the contract allows.
import * as THREE from 'three';
import { MATERIALS, box, cyl, crateStack, fenceRun, sign } from '../../engine/world/kit.js';
import { canvasTex } from '../../engine/world/materials.js';

/**
 * A triage marquee: a ridge tent with open ends and a coloured band, which is
 * how a field hospital signs its zones.
 *
 * Built from two sloped planes rather than a prism, so the inside is visible
 * from the ends and the courtyard reads as occupied rather than blocked.
 */
function marquee(scene, x, z, y, opts = {}){
  // Steep, and not very wide. At a shallow pitch a marquee seen from eye level
  // is a shed with a coloured stripe; the pitch is what makes it read as canvas.
  const w = opts.w ?? 6.6, d = opts.d ?? 11, wall = opts.wall ?? 1.9, ridge = opts.ridge ?? 4.6;
  const facing = opts.facing ?? 0;
  const canvas = new THREE.MeshStandardMaterial({
    // A stop darker than white canvas looks on paper. Under a bright sky IBL a
    // near-white albedo blows straight out and the tents read as cut-outs.
    color: opts.colour ?? 0xbfb9a8, roughness: 0.95, metalness: 0,
    envMapIntensity: 0.3, side: THREE.DoubleSide,
  });
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = facing;

  // The tent runs along its local +z. Each roof slope is a thin box tilted
  // about the z axis, which is the one rotation that does what it reads as —
  // the first version rotated three axes in sequence and produced two flat
  // slabs standing across the courtyard.
  const rise = ridge - wall;
  const slopeLen = Math.hypot(w / 2, rise);
  const tilt = Math.atan2(rise, w / 2);
  for(const s of [-1, 1]){
    const roof = new THREE.Mesh(new THREE.BoxGeometry(slopeLen, 0.05, d), canvas);
    roof.position.set(s * (w / 4), (wall + ridge) / 2, 0);
    roof.rotation.z = -s * tilt;
    roof.castShadow = true;
    g.add(roof);
  }
  // Low side walls, so people under the tent are visible from the courtyard.
  for(const s of [-1, 1]){
    const side = new THREE.Mesh(new THREE.PlaneGeometry(d, wall), canvas);
    side.position.set(s * w / 2, wall / 2, 0);
    side.rotation.y = s * Math.PI / 2;
    g.add(side);
  }
  // The coloured zone band along the eaves. One single-sided face per side: a
  // band on a DoubleSide plane renders mirrored to anyone behind it.
  if(opts.band !== undefined){
    for(const s of [-1, 1]){
      const band = new THREE.Mesh(new THREE.PlaneGeometry(d, 0.45),
        new THREE.MeshStandardMaterial({ color: opts.band, roughness: 0.85, side: THREE.FrontSide }));
      band.position.set(s * (w / 2 + 0.03), wall - 0.3, 0);
      band.rotation.y = s * Math.PI / 2;
      g.add(band);
    }
  }
  // Gable ends, so the tent reads as a tent from the end you walk toward. Two
  // triangles per end, one facing each way — a DoubleSide triangle here shows
  // its back face through the canvas from inside.
  for(const sz of [-1, 1]){
    const tri = new THREE.BufferGeometry();
    tri.setAttribute('position', new THREE.Float32BufferAttribute([
      -w / 2, wall, 0,   w / 2, wall, 0,   0, ridge, 0,
    ], 3));
    tri.computeVertexNormals();
    const end = new THREE.Mesh(tri, canvas);
    end.position.z = sz * d / 2;
    g.add(end);
  }
  // Corner poles.
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, wall, 6), MATERIALS.steel());
    pole.position.set(sx * w / 2, wall / 2, sz * d / 2);
    g.add(pole);
  }
  scene.add(g);
  return { group: g, soft: { x, z, r: Math.max(w, d) * 0.40 } };
}

/**
 * A shipping-container laboratory: a container on blocks with a door, a step,
 * a vent and a stencilled code. These are how mobile capacity actually arrives.
 */
function containerLab(scene, x, z, y, opts = {}){
  const w = 2.5, h = 2.6, d = 6.1;
  const facing = opts.facing ?? 0;
  const shell = new THREE.MeshStandardMaterial({
    color: opts.colour ?? 0x2f6b62, roughness: 0.8, metalness: 0.25, envMapIntensity: 0.5,
  });
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = facing;
  const body = new THREE.Mesh(new THREE.BoxGeometry(d, h, w), shell);
  body.position.y = h / 2 + 0.35;
  body.castShadow = true; body.receiveShadow = true;
  g.add(body);
  // Corrugation: shallow ribs down the long faces.
  for(let i = -6; i <= 6; i++){
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.06, h * 0.86, w + 0.04), shell);
    rib.position.set(i * 0.44, h / 2 + 0.35, 0);
    g.add(rib);
  }
  // Blocks, door and step
  for(const s of [-1, 1]){
    const blk = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, w), MATERIALS.concrete());
    blk.position.set(s * (d / 2 - 0.6), 0.175, 0);
    g.add(blk);
  }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.0),
    new THREE.MeshStandardMaterial({ color: 0x1d2b2a, roughness: 0.7, side: THREE.FrontSide }));
  door.position.set(0, 1.35, w / 2 + 0.01);
  g.add(door);
  const step = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.35, 0.7), MATERIALS.steel());
  step.position.set(0, 0.18, w / 2 + 0.4);
  g.add(step);
  scene.add(g);
  return { soft: { x, z, r: 3.4 } };
}

/**
 * The decontamination tunnel: a short covered corridor between two courtyards
 * that the player walks through rather than around.
 *
 * It is the one piece of geometry here that changes how the campus is *moved
 * through* rather than how it looks — a pinch point on the main route, which no
 * other game in the set has.
 */
function deconTunnel(scene, x, z, y, opts = {}){
  const len = opts.len ?? 12, w = 3.2, h = 2.8;
  const facing = opts.facing ?? 0;
  const skin = new THREE.MeshStandardMaterial({
    color: 0xe8e6dd, roughness: 0.9, transparent: true, opacity: 0.55, side: THREE.DoubleSide,
  });
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = facing;
  // Hoops
  for(let i = 0; i <= 6; i++){
    const t = (i / 6 - 0.5) * len;
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.06, 6, 16, Math.PI), MATERIALS.steel());
    hoop.position.set(0, h - w / 2, t);
    hoop.rotation.y = Math.PI / 2;
    g.add(hoop);
  }
  // Skin over the top
  const cover = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, len, 16, 1, true, 0, Math.PI), skin);
  cover.position.set(0, h - w / 2, 0);
  cover.rotation.set(Math.PI / 2, 0, 0);
  g.add(cover);
  // Side curtains, waist height, so the corridor reads as enclosed
  for(const s of [-1, 1]){
    const curt = new THREE.Mesh(new THREE.PlaneGeometry(len, h - w / 2), skin);
    curt.position.set(s * w / 2, (h - w / 2) / 2, 0);
    curt.rotation.y = Math.PI / 2;
    g.add(curt);
  }
  scene.add(g);
  return { soft: { x, z, r: 0.8 } };
}

/**
 * An ambulance, parked. The single most legible object on a site like this: a
 * white box van in hi-vis with a blue bar on the roof says "emergency" before
 * the player has read one sign.
 *
 * Built rather than taken from `kit.vehicle` because that one is a flatbed or a
 * box truck with no livery, and the livery is the whole point — the checker
 * board down the flank, the red stripe, the light bar. Runs along its own +Z,
 * the way the rest of this file's rotations read.
 */
function ambulance(scene, x, z, y, opts = {}){
  const facing = opts.facing ?? 0;
  const g = new THREE.Group();
  const shell = MATERIALS.paintedSteel(0xeceae2);
  const trim = MATERIALS.paintedSteel(opts.trim ?? 0xc0392b);
  const dark = MATERIALS.paintedSteel(0x3b444c);

  // Chassis, cab, box body. The body is taller than the cab, which is the
  // silhouette that separates an ambulance from a delivery van at distance.
  box(g, 2.24, 0.55, 5.9, 0, 0.72, 0, dark);
  box(g, 2.20, 1.30, 1.90, 0, 1.62, 2.05, shell);              // cab
  box(g, 2.06, 0.85, 0.12, 0, 1.85, 3.02, MATERIALS.glass());  // windscreen
  for(const s of [-1, 1]) box(g, 0.10, 0.70, 1.20, s * 1.09, 1.75, 2.15, MATERIALS.glass());
  box(g, 2.26, 2.05, 4.10, 0, 2.02, -0.95, shell);             // patient compartment
  box(g, 2.30, 0.16, 4.20, 0, 3.10, -0.95, MATERIALS.paintedSteel(0xd8d5cb));
  // Rear doors, with a window band and the step somebody stands on to load.
  box(g, 2.10, 1.85, 0.10, 0, 1.95, -3.02, MATERIALS.paintedSteel(0xe4e1d8));
  box(g, 0.06, 1.85, 0.10, 0, 1.95, -3.08, dark);
  for(const s of [-1, 1]) box(g, 0.86, 0.52, 0.06, s * 0.52, 2.55, -3.09, MATERIALS.glass());
  box(g, 1.60, 0.10, 0.42, 0, 0.70, -3.28, MATERIALS.steel());

  // Battenburg down both flanks: alternating blocks, which is what makes it
  // read as a response vehicle rather than a bread van.
  for(const s of [-1, 1]){
    for(let i = 0; i < 7; i++){
      const zz = -2.7 + i * 0.92;
      box(g, 0.06, 0.52, 0.86, s * 1.15, i % 2 ? 1.60 : 1.60, zz,
        i % 2 ? MATERIALS.paintedSteel(0xd8d017) : trim);
    }
    box(g, 0.05, 0.22, 5.6, s * 1.16, 2.72, -0.6, trim);
  }

  // The light bar. Emissive panels, never real lights — the ceiling is six for
  // the whole scene and the sun rig already spends three.
  const bar = new THREE.Group();
  box(bar, 1.70, 0.10, 0.30, 0, 0, 0, dark);
  const lamps = [];
  for(let i = 0; i < 4; i++){
    const hex = i % 2 ? 0x2f6fe0 : 0xd23b2a;
    const lamp = box(bar, 0.36, 0.16, 0.26, -0.62 + i * 0.42, 0.08, 0,
      new THREE.MeshStandardMaterial({
        color: hex, emissive: new THREE.Color(hex), emissiveIntensity: 1.4, roughness: 0.5,
      }));
    lamps.push(lamp);
  }
  bar.position.set(0, 3.20, 0.6);
  g.add(bar);

  // What it says on the side, both flanks, and the unit number on the back.
  for(const side of [-1, 1]){
    sign(g, 'AMBULANCE', {
      x: side * 1.20, y: 2.30, z: -0.9, w: 2.6, h: 0.62,
      facing: side * Math.PI / 2, accent: 0xc0392b,
    });
  }
  if(opts.unit){
    sign(g, opts.unit, { x: 0, y: 3.28, z: -3.12, w: 1.1, h: 0.5, facing: Math.PI });
  }

  for(const dz of [2.0, -1.4]) for(const dx of [-1.0, 1.0]){
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.30, 12), MATERIALS.rubber());
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(dx * 1.05, 0.50, dz);
    g.add(wheel);
  }

  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);

  // A hard collider, not a soft one: an ambulance is not something a crowd
  // walks through, and the crowd's `blocked` reads this list.
  const along = Math.abs(Math.sin(facing)) > 0.5;
  const collider = new THREE.Box3(
    new THREE.Vector3(x - (along ? 3.2 : 1.3), y, z - (along ? 1.3 : 3.2)),
    new THREE.Vector3(x + (along ? 3.2 : 1.3), y + 3.4, z + (along ? 1.3 : 3.2)));
  return { collider, lamps };
}

/** A wheeled stretcher. Two by the doors of a bay says the bay is in use. */
function stretcher(scene, x, z, y, opts = {}){
  const g = new THREE.Group();
  const frame = MATERIALS.paintedSteel(0x9aa2a8);
  box(g, 0.70, 0.06, 2.00, 0, 0.72, 0, frame);
  box(g, 0.66, 0.14, 1.86, 0, 0.83, 0, MATERIALS.paintedSteel(opts.blanket ?? 0x36607f));
  // The backrest up, because a stretcher parked flat reads as a table.
  const back = box(g, 0.66, 0.12, 0.70, 0, 1.05, -0.72, MATERIALS.paintedSteel(opts.blanket ?? 0x36607f));
  back.rotation.x = -0.55;
  for(const dx of [-0.30, 0.30]) for(const dz of [-0.85, 0.85]){
    box(g, 0.05, 0.60, 0.05, dx, 0.42, dz, frame);
    cyl(g, 0.09, 0.06, dx, 0.09, dz, MATERIALS.rubber());
  }
  g.position.set(x, y, z);
  g.rotation.y = opts.facing ?? 0;
  scene.add(g);
  return { x, z, r: 1.1 };
}

/**
 * A clinical waste bin: yellow body, black lid, hazard band. Repetition of this
 * one object in every courtyard is the cheapest possible statement that
 * everything the campus touches now has to be burned.
 */
function wasteBin(scene, x, z, y, opts = {}){
  const h = opts.h ?? 1.05, r = opts.r ?? 0.42;
  cyl(scene, r, h, x, y + h / 2, z, MATERIALS.paintedSteel(0xd8b81c));
  cyl(scene, r * 1.06, 0.10, x, y + h + 0.05, z, MATERIALS.paintedSteel(0x2b2f33));
  cyl(scene, r * 1.02, 0.16, x, y + h * 0.62, z, MATERIALS.paintedSteel(0x2b2f33));
  return { x, z, r: r + 0.25 };
}

/**
 * A run of crowd-control barrier between two points, the thing every queue in
 * every response is made of. Soft colliders only: the player walking through
 * one is a smaller problem than a barrier fencing the route off.
 */
function barrierRun(scene, x0, z0, x1, z1, groundAt){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(1, Math.round(len / 2.1));
  const softs = [];
  const orange = MATERIALS.paintedSteel(0xd2762c);
  for(let i = 0; i < n; i++){
    const t0 = i / n, t1 = (i + 1) / n;
    const ax = x0 + (x1 - x0) * t0, az = z0 + (z1 - z0) * t0;
    const bx = x0 + (x1 - x0) * t1, bz = z0 + (z1 - z0) * t1;
    const mx = (ax + bx) / 2, mz = (az + bz) / 2;
    const yy = groundAt(mx, mz);
    const seg = Math.hypot(bx - ax, bz - az);
    const rot = Math.atan2(bx - ax, bz - az);
    for(const [px, pz] of [[ax, az], [bx, bz]]){
      box(scene, 0.07, 1.05, 0.07, px, groundAt(px, pz) + 0.52, pz, orange);
    }
    for(const hgt of [0.55, 0.95]){
      box(scene, 0.05, 0.07, seg, mx, yy + hgt, mz, orange, rot);
    }
    softs.push({ x: mx, z: mz, r: 0.5 });
  }
  return softs;
}

/** A traffic cone. */
function cone(scene, x, z, y){
  const c = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.72, 10),
    MATERIALS.paintedSteel(0xd2532c));
  c.position.set(x, y + 0.36, z);
  scene.add(c);
  box(scene, 0.52, 0.05, 0.52, x, y + 0.03, z, MATERIALS.paintedSteel(0x2b2f33));
  cyl(scene, 0.19, 0.10, x, y + 0.44, z, MATERIALS.paintedSteel(0xe8e4d6), 0.19);
  return { x, z, r: 0.4 };
}

/**
 * A warning beacon on a post: amber lamp, visible from across the campus and
 * the marker that says a boundary here is not a suggestion.
 */
function beacon(scene, x, z, y, opts = {}){
  const h = opts.h ?? 2.2;
  cyl(scene, 0.06, h, x, y + h / 2, z, MATERIALS.steel());
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8),
    new THREE.MeshStandardMaterial({
      color: opts.colour ?? 0xe8a020, emissive: new THREE.Color(opts.colour ?? 0xe8a020),
      emissiveIntensity: 1.5, roughness: 0.5,
    }));
  lamp.position.set(x, y + h + 0.10, z);
  scene.add(lamp);
  return { soft: { x, z, r: 0.35 }, glow: lamp };
}

/**
 * The biohazard trefoil, drawn rather than written, on a yellow placard.
 *
 * Two single-sided faces back to back, like `kit.sign` — a plaque on one
 * DoubleSide plane renders mirrored to anybody behind it, which for this symbol
 * is not even wrong, it just looks broken.
 */
function hazardPlacard(scene, x, z, y, opts = {}){
  const size = opts.size ?? 0.9;
  const tex = canvasTex(256, (g, s) => {
    g.fillStyle = '#e0c11c'; g.fillRect(0, 0, s, s);
    g.fillStyle = '#15181a';
    g.lineWidth = s * 0.035;
    g.strokeStyle = '#15181a';
    g.strokeRect(s * 0.04, s * 0.04, s * 0.92, s * 0.92);
    const cx = s / 2, cy = s * 0.47, R = s * 0.235;
    // Three rings on a triangle plus a small centre: the trefoil, near enough
    // to be unmistakable at four metres, which is the distance it is read from.
    for(let i = 0; i < 3; i++){
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 3);
      const px = cx + Math.cos(a) * R, py = cy + Math.sin(a) * R;
      g.beginPath(); g.arc(px, py, s * 0.155, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#e0c11c';
      g.beginPath(); g.arc(px, py, s * 0.072, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#15181a';
    }
    g.beginPath(); g.arc(cx, cy, s * 0.062, 0, Math.PI * 2); g.fill();
    g.font = `700 ${Math.round(s * 0.085)}px Inter, system-ui, sans-serif`;
    g.textAlign = 'center';
    g.fillText(opts.text ?? 'BIOHAZARD', cx, s * 0.90);
  });
  const geo = new THREE.PlaneGeometry(size, size);
  const g2 = new THREE.Group();
  for(const back of [false, true]){
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.8, side: THREE.FrontSide,
      emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.16,
    }));
    m.rotation.y = back ? Math.PI : 0;
    m.position.z = back ? -0.02 : 0.02;
    g2.add(m);
  }
  g2.position.set(x, y, z);
  g2.rotation.y = opts.facing ?? 0;
  scene.add(g2);
  return g2;
}

/**
 * A cot, with the drip stand and the monitor beside it. Under an open-sided
 * tent this is what the player sees from the courtyard, and a triage tent with
 * nothing under it is a marquee at a village fete.
 */
function cot(scene, x, z, y, opts = {}){
  const g = new THREE.Group();
  const frame = MATERIALS.paintedSteel(0x8f979c);
  box(g, 0.80, 0.06, 1.95, 0, 0.52, 0, frame);
  box(g, 0.76, 0.16, 1.80, 0, 0.63, 0, MATERIALS.paintedSteel(0xdcd8cc));   // mattress
  box(g, 0.76, 0.10, 1.10, 0, 0.73, -0.32, MATERIALS.paintedSteel(opts.blanket ?? 0x5f7f96));
  box(g, 0.50, 0.10, 0.34, 0, 0.76, 0.72, MATERIALS.paintedSteel(0xeceae2)); // pillow
  for(const dx of [-0.34, 0.34]) for(const dz of [-0.85, 0.85]){
    box(g, 0.05, 0.50, 0.05, dx, 0.26, dz, frame);
  }
  // Drip stand: the one vertical in the silhouette, and what makes a bed read
  // as a bed in use rather than a bed in storage.
  cyl(g, 0.03, 1.75, 0.55, 0.88, -0.55, MATERIALS.steel());
  cyl(g, 0.22, 0.03, 0.55, 0.02, -0.55, MATERIALS.steel(), 0.22);
  box(g, 0.14, 0.26, 0.10, 0.55, 1.62, -0.55, MATERIALS.paintedSteel(0xe4e9ea));
  if(opts.monitor){
    cyl(g, 0.04, 1.25, -0.60, 0.63, -0.60, MATERIALS.steel());
    box(g, 0.34, 0.26, 0.12, -0.60, 1.34, -0.60, MATERIALS.paintedSteel(0x2b3238));
    box(g, 0.28, 0.19, 0.02, -0.60, 1.34, -0.53,
      MATERIALS.emissive(0x4fd0a0, 0.7));
  }
  g.position.set(x, y, z);
  g.rotation.y = opts.facing ?? 0;
  scene.add(g);
  return { x, z, r: 1.1 };
}

/**
 * A ward under canvas: two rows of cots down a tent, the way a field hospital
 * lays one out. `facing` matches the marquee's, and the tent runs along its
 * own +z, so the rows are offset in x and the aisle is down the middle.
 */
function tentWard(scene, cx, cz, groundAt, opts = {}){
  const facing = opts.facing ?? 0;
  const rows = opts.rows ?? 3, gap = opts.gap ?? 2.6, off = opts.off ?? 1.5;
  const softs = [];
  for(let i = 0; i < rows; i++){
    const dz = (i - (rows - 1) / 2) * gap;
    for(const s of [-1, 1]){
      const lx = cx + Math.cos(facing) * s * off + Math.sin(facing) * dz;
      const lz = cz - Math.sin(facing) * s * off + Math.cos(facing) * dz;
      softs.push(cot(scene, lx, lz, groundAt(lx, lz), {
        facing: facing + (s > 0 ? Math.PI / 2 : -Math.PI / 2),
        blanket: opts.blanket,
        monitor: opts.monitor && i === 0,
      }));
    }
  }
  return softs;
}

/**
 * A hand-wash station: the tank on legs with a tap and a bucket under it. Four
 * of these across a site is the detail that says water had to be brought in.
 */
function washStation(scene, x, z, y){
  box(scene, 0.62, 0.72, 0.62, x, y + 1.20, z, MATERIALS.paintedSteel(0x3f7fa8));
  for(const dx of [-0.24, 0.24]) for(const dz of [-0.24, 0.24]){
    box(scene, 0.06, 0.84, 0.06, x + dx, y + 0.42, z + dz, MATERIALS.steel());
  }
  cyl(scene, 0.03, 0.16, x, y + 0.78, z + 0.30, MATERIALS.steel());
  cyl(scene, 0.24, 0.30, x, y + 0.15, z + 0.30, MATERIALS.paintedSteel(0xd8d5cb), 0.26);
  box(scene, 0.30, 0.20, 0.05, x, y + 1.62, z + 0.32, MATERIALS.paintedSteel(0xe0c11c));
  return { x, z, r: 0.7 };
}

/** A portable toilet. Three in a row, because one is a joke and three is a site. */
function portaloo(scene, x, z, y, facing = 0){
  box(scene, 1.15, 2.25, 1.15, x, y + 1.12, z, MATERIALS.paintedSteel(0x3f6e57), facing);
  box(scene, 1.22, 0.10, 1.22, x, y + 2.28, z, MATERIALS.paintedSteel(0x2f5343), facing);
  box(scene, 0.70, 1.90, 0.06, x + Math.sin(facing) * 0.60, y + 1.05, z + Math.cos(facing) * 0.60,
    MATERIALS.paintedSteel(0x35604c), facing);
  return { x, z, r: 0.95 };
}

/** A cylinder trolley: six oxygen bottles chained to a frame. */
function cylinderTrolley(scene, x, z, y, facing = 0){
  const g = new THREE.Group();
  box(g, 1.5, 0.10, 0.8, 0, 0.16, 0, MATERIALS.steel());
  box(g, 1.5, 1.30, 0.06, 0, 0.80, -0.38, MATERIALS.paintedSteel(0x7d858a));
  for(let i = 0; i < 3; i++) for(const dz of [-0.16, 0.16]){
    cyl(g, 0.11, 1.25, -0.5 + i * 0.5, 0.83, dz, MATERIALS.paintedSteel(0x2f6f8f));
    cyl(g, 0.05, 0.14, -0.5 + i * 0.5, 1.52, dz, MATERIALS.steel());
  }
  for(const dx of [-0.6, 0.6]) cyl(g, 0.12, 0.08, dx, 0.08, 0.34, MATERIALS.rubber());
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return { x, z, r: 1.0 };
}

/**
 * The zone painted on the ground under a tent — red, yellow, green. Flat, thin,
 * and the one piece of signage that still works when the sign is behind you.
 */
function zonePaint(scene, cx, cz, w, d, groundAt, hex, facing = 0){
  box(scene, w, 0.02, d, cx, groundAt(cx, cz) + 0.015, cz,
    new THREE.MeshStandardMaterial({ color: hex, roughness: 0.95, metalness: 0 }), facing);
}

/**
 * A sign on two legs.
 *
 * `kit.sign` draws a panel and nothing else, which is right on the face of a
 * building and wrong in the middle of a courtyard — a floating slab of text
 * over a queue is the single most artificial thing on the site. Everything
 * free-standing here goes through this.
 */
function postedSign(scene, text, x, z, groundAt, opts = {}){
  const w = opts.w ?? 3.6, h = opts.h ?? 1.05;
  const top = opts.top ?? 3.0;                      // the top edge of the panel
  const yy = groundAt(x, z);
  const facing = opts.facing ?? 0;
  const legOff = Math.max(0.4, w / 2 - 0.35);
  for(const s of [-1, 1]){
    const lx = x + Math.cos(facing) * s * legOff;
    const lz = z - Math.sin(facing) * s * legOff;
    cyl(scene, 0.055, top, lx, groundAt(lx, lz) + top / 2, lz, MATERIALS.steel());
  }
  sign(scene, text, {
    x, z, y: yy + top - h / 2, w, h, facing,
    sub: opts.sub ?? '', accent: opts.accent ?? null,
  });
  return { x, z, r: 0.45 };
}

/**
 * A queue, marked on the ground. Two metres apart, painted on the tarmac, and
 * by itself it says what the disease does — people who have to stand apart.
 */
function spacingMarks(scene, x0, z0, x1, z1, groundAt, n = 6){
  for(let i = 0; i < n; i++){
    const t = n === 1 ? 0 : i / (n - 1);
    const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
    const y = groundAt(x, z);
    box(scene, 0.62, 0.02, 0.62, x, y + 0.02, z, MATERIALS.paintedSteel(0xd8c53c),
      Math.PI / 4);
  }
}

/** A floodlight mast. Emissive head, never a real light. */
function floodMast(scene, x, z, y, height = 7.5){
  cyl(scene, 0.12, height, x, y + height / 2, z, MATERIALS.steel());
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.4),
    new THREE.MeshStandardMaterial({
      color: 0xfff6e0, emissive: 0xfff2d0, emissiveIntensity: 1.5, roughness: 0.4,
    }));
  head.position.set(x, y + height, z);
  head.rotation.x = 0.35;
  scene.add(head);
  return { soft: { x, z, r: 0.5 }, glow: head };
}

export function decorate(scene, ctx){
  const { groundHeight, softColliders, colliders, lightPanels } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels.push(m); };

  // ================================================ the town outside the fence
  // Three weeks into an outbreak in a town, and the town was not there: hills
  // in every direction and a fence around an empty campus. Rooftops now press
  // against the south fence, close enough to read as houses and too far to
  // reach — which is what the fence is for, and what every transmission
  // question is about.
  {
    const seedy = (n) => { const v = Math.sin(n * 12.9898) * 43758.5453; return v - Math.floor(v); };
    for(let i = 0; i < 34; i++){
      const x = -150 + i * 9.2 + seedy(i) * 4;
      const z = 138 + seedy(i + 40) * 30;
      const h = 4.5 + seedy(i + 90) * 4.5;
      const gy = y(x, z);
      box(scene, 7 + seedy(i + 7) * 4, h, 7 + seedy(i + 11) * 4, x, gy + h / 2, z,
        MATERIALS.paintedSteel(0x6f6a60));
      // Pitched roofs, alternating ridge direction so the row is not a barracks.
      box(scene, 8 + seedy(i + 7) * 4, 0.7, 8 + seedy(i + 11) * 4, x, gy + h + 0.35, z,
        MATERIALS.paintedSteel(0x574f46), seedy(i + 3) > 0.5 ? Math.PI / 2 : 0);
    }
    // A church tower and a water tank, so the skyline has two things in it that
    // are not houses.
    box(scene, 5, 16, 5, -46, y(-46, 150) + 8, 150, MATERIALS.paintedSteel(0x77716a));
    box(scene, 6, 2.2, 6, -46, y(-46, 150) + 17, 150, MATERIALS.paintedSteel(0x4f4841));
  }

  // =========================================== the second hospital, still lit
  // The one the transfer questions keep naming, across town: too far to walk
  // to, lit all night, and also full. A pair of emissive slabs is enough at
  // this distance.
  {
    const hx = 118, hz = 168, hy = y(hx, hz);
    box(scene, 26, 20, 16, hx, hy + 10, hz, MATERIALS.paintedSteel(0x6b6f74));
    const lit = new THREE.MeshStandardMaterial({
      color: 0x2c2e30, emissive: new THREE.Color(0xffe6b4), emissiveIntensity: 0.9,
      roughness: 0.9, metalness: 0,
    });
    for(let f = 0; f < 5; f++){
      const w = box(scene, 24, 1.1, 0.3, hx, hy + 3 + f * 3.6, hz - 8.2, lit);
      glow?.(w);
    }
    // Red obstruction light on the roof, and the pad marking beside it.
    box(scene, 1.0, 0.8, 1.0, hx + 11, hy + 20.6, hz - 6, new THREE.MeshStandardMaterial({
      color: 0x3a1512, emissive: new THREE.Color(0xd23b2a), emissiveIntensity: 1.2, roughness: 1 }));
  }

  // ============================================== the floodplain to the north
  // Why the field station is the long hike it is: the ground drops to a river
  // meadow and a levee runs along the top of the fall.
  {
    const zc = -196;
    box(scene, 520, 2.4, 8, 0, y(0, zc) + 1.1, zc, MATERIALS.paintedSteel(0x6b6a5c));
    for(let x = -240; x <= 240; x += 60){
      box(scene, 2.0, 1.6, 2.0, x, y(x, zc + 6) + 0.8, zc + 6, MATERIALS.paintedSteel(0x8d8778));
    }
    sign(scene, 'FLOOD BANK', { x: 26, z: zc + 9, y: y(26, zc + 9) + 2.4, facing: Math.PI,
      sub: 'No vehicles beyond this point', accent: 0x2f6f8f });
  }


  // ------------------------------------------------- the south court: triage
  // Three marquees with zone bands, filling the court between the clinical
  // wing and cell biology, and leaving the spine clear.
  // x = ±11.5, not ±16: the clinical wing runs out to x = -15 and cell biology
  // starts at +17, so a 6.6 m tent centred on 16 has four metres of itself
  // inside a building — which renders perfectly and reads, from the court, as
  // canvas growing out of brickwork.
  soft(marquee(scene, -11.5, 30, y(-11.5, 30), { facing: 0, band: 0xc0392b, colour: 0xe2ded0 }).soft);
  soft(marquee(scene, 11.5, 30, y(11.5, 30), { facing: 0, band: 0xd4a017, colour: 0xe2ded0 }).soft);
  soft(marquee(scene, 17, 6, y(17, 6), { facing: Math.PI / 2, band: 0x2e8b57, w: 8, d: 11 }).soft);

  // ------------------------------------------ the north court: sampling line
  soft(marquee(scene, -17, -62, y(-17, -62), { facing: 0, band: 0x2f6fa8, w: 8, d: 12 }).soft);
  soft(marquee(scene, 17, -62, y(17, -62), { facing: 0, band: 0x6b4c9a, w: 8, d: 12 }).soft);

  // ------------------------------------------------------ container labs
  // In the car park east of the apron, in a row, because that is how they are
  // craned off the lorry.
  for(let i = 0; i < 4; i++){
    soft(containerLab(scene, 30 + i * 4.2, 56, y(30, 56), { facing: Math.PI / 2, colour: i % 2 ? 0x2f6b62 : 0x8a5a2b }).soft);
  }

  // ------------------------------------------------------- the decon tunnel
  // On the spine, between the two courts. The route through the campus goes
  // through it.
  soft(deconTunnel(scene, 0, 8, y(0, 8), { facing: 0, len: 12 }));

  // ------------------------------------------------------------ floodlights
  for(const [x, z] of [[-20, 8], [20, 8], [-20, -60], [20, -60], [0, 52]]){
    const f = floodMast(scene, x, z, y(x, z));
    soft(f.soft); glow(f.glow);
  }

  // ------------------------------------------------------- stores and crates
  for(const [x, z] of [[-40, 44], [-36, 46], [42, -30], [-44, -56]]){
    crateStack(scene, x, z, y(x, z), { rows: 3 });
    soft({ x, z, r: 1.4 });
  }

  // ------------------------------------------------------------- the fence
  // The campus has an inside and an outside, and that is the point: the gate is
  // the only way north to the field station.
  const fence = [
    [-96, -70, -12, -70], [12, -70, 96, -70],     // north run, with the gate between
    [96, -70, 96, 80], [-96, -70, -96, 80],       // sides
    [-96, 80, -30, 80], [30, 80, 96, 80],         // south run, service gate
  ];
  for(const [x0, z0, x1, z1] of fence){
    fenceRun(scene, { x0, z0, x1, z1, y: y((x0 + x1) / 2, (z0 + z1) / 2), height: 2.4 });
  }
  sign(scene, 'CONTROLLED AREA', {
    x: -6, z: -70, y: y(-6, -70) + 2.4, w: 4.2, h: 1.1, facing: 0,
    sub: 'Screening beyond this point', accent: 0xc0392b,
  });

  // ================================================== three weeks of logistics
  //
  // The campus already reads as improvised-upon. What it did not show is that
  // everything holding it up arrived on a lorry: bulk oxygen, power, water,
  // refrigeration. All of this is scenery on the service side and outside the
  // fence, clear of the spine and of both courts.

  // ---------------------------------------------------------- the oxygen farm
  // The truest detail of a respiratory surge: hospitals ran out of the capacity
  // to *deliver* oxygen, not out of oxygen. A bulk liquid tank, a vaporiser bank
  // and a tanker parked against the fill point, on the service side east of the
  // clinical wing. The vapour is the only moving thing on this side of the site.
  {
    const oxY = y(52, 30);
    // Horizontal bulk tank on saddles.
    lying(scene, 2.1, 11, 52, oxY + 3.0, 30, MATERIALS.panel());
    for(const dz of [-3.4, 3.4]){
      box(scene, 1.2, 2.0, 2.6, 52, oxY + 1.0, 30 + dz, MATERIALS.concrete());
    }
    // The vaporiser: a finned block, which is what actually frosts over.
    for(let i = 0; i < 6; i++){
      box(scene, 0.22, 4.2, 2.4, 57 + i * 0.55, oxY + 2.1, 30, MATERIALS.paintedSteel(0xd8dde0));
    }
    box(scene, 4.6, 0.5, 3.0, 58.4, oxY + 0.25, 30, MATERIALS.concrete());
    // Frost plume, as stacked translucent slabs rather than a particle system:
    // there is no animation budget here and a still drift reads correctly.
    for(let i = 0; i < 4; i++){
      const s = 1.6 + i * 0.9;
      box(scene, s, 0.5, s, 58.4 + i * 0.8, oxY + 0.5 + i * 0.45, 30 + i * 0.5,
        MATERIALS.glass());
    }
    soft({ x: 52, z: 30, r: 6.4 });
    soft({ x: 58.4, z: 30, r: 3.0 });
    sign(scene, 'MEDICAL OXYGEN', { x: 52, z: 24.2, y: oxY + 2.6, w: 4.0, h: 1.0,
      facing: 0, sub: 'No smoking · no oil', accent: 0x2f6fa8 });
    tanker(scene, 62, 44, y(62, 44), { facing: 0 });
  }

  // ------------------------------------------- refrigerated trailers, cabled up
  // Grim but accurate, and there is nothing to see but plant: three reefer boxes
  // on legs behind the clinical wing, each with its condenser running. No bodies,
  // no gurneys — the machinery is the whole statement.
  {
    for(let i = 0; i < 3; i++){
      const tx = -58, tz = 26 + i * 9;
      const tY = y(tx, tz);
      box(scene, 10.5, 3.0, 2.9, tx, tY + 2.3, tz, MATERIALS.panel());
      box(scene, 1.3, 1.5, 2.4, tx + 5.6, tY + 3.1, tz, MATERIALS.paintedSteel(0x40474b));
      // Landing legs and bogie, so it reads as a trailer and not a shed.
      for(const dx of [-4.2, 4.4]) box(scene, 0.3, 1.0, 0.3, tx + dx, tY + 0.5, tz, MATERIALS.steel());
      for(const dx of [-3.0, -1.6]) for(const dz of [-1.2, 1.2]){
        cyl(scene, 0.48, 0.3, tx + dx, tY + 0.48, tz + dz, MATERIALS.rubber());
      }
      soft({ x: tx, z: tz, r: 5.6 });
    }
  }

  // ------------------------------------------------ generators and cable runs
  // Container labs, marquees and reefers all need power from somewhere. The
  // cables are the point: a run of them taped across the service road ties
  // separate objects into one installation, which is what makes a site read as
  // bigger than the sum of its boxes.
  {
    const gY = y(-46, 62);
    for(let i = 0; i < 2; i++){
      const gx = -46 + i * 7;
      box(scene, 6.0, 2.4, 2.6, gx, gY + 1.7, 62, MATERIALS.paintedSteel(0x6a6f5e));
      box(scene, 5.4, 0.35, 2.2, gx, gY + 3.05, 62, MATERIALS.steel());
      cyl(scene, 0.2, 1.6, gx + 2.4, gY + 3.8, 62, MATERIALS.paintedSteel(0x33383a));
      soft({ x: gx, z: 62, r: 3.4 });
    }
    // Cable bundles: flat, wide, dark, hugging the ground — from the gensets to
    // the container row and up to the north court.
    const run = (x0, z0, x1, z1) => {
      const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
      const len = Math.hypot(x1 - x0, z1 - z0);
      const ang = Math.atan2(x1 - x0, z1 - z0);
      box(scene, 0.62, 0.12, len, mx, y(mx, mz) + 0.06, mz, MATERIALS.rubber(), ang);
    };
    run(-40, 62, 28, 58);
    run(-44, 60, -44, 34);
    run(-42, 62, -18, -58);
  }

  // ------------------------------------------------- the container row, doubled
  // They ran out of ground, so the second row went on top of the first. An
  // external stair is what says that was not the plan.
  {
    for(let i = 0; i < 3; i++){
      const cx = 31 + i * 4.2, cz = 56;
      const base = y(cx, cz);
      box(scene, 3.6, 2.9, 11.5, cx, base + 4.5, cz, MATERIALS.paintedSteel(i % 2 ? 0x8a5a2b : 0x2f6b62));
      soft({ x: cx, z: cz, r: 2.6 });
    }
    const sY = y(41, 56);
    for(let i = 0; i < 7; i++){
      box(scene, 2.6, 0.12, 0.5, 41, sY + 0.6 + i * 0.45, 61 - i * 0.55, MATERIALS.steel());
    }
    box(scene, 0.1, 1.0, 4.6, 42.2, sY + 3.4, 58.6, MATERIALS.steel());
  }

  // ------------------------------------------------ the press pen and the wall
  // Outside the fence, north of the gate, which is where a fence stops being an
  // invisible limit and starts having an outside. The ribbon wall is the one
  // human image on this side of the site.
  {
    const pY = y(-30, -78);
    for(let i = 0; i < 9; i++){
      box(scene, 0.08, 1.05, 0.08, -38 + i * 2.0, pY + 0.53, -78, MATERIALS.steel());
    }
    box(scene, 17, 0.07, 0.07, -30, pY + 1.05, -78, MATERIALS.paintedSteel(0xb8b2a4));
    // Two broadcast vans, angled to the gate.
    tanker(scene, -46, -80, y(-46, -80), { facing: Math.PI / 2, van: true, colour: 0xe4e1d8 });
    tanker(scene, -46, -88, y(-46, -88), { facing: Math.PI / 2, van: true, colour: 0xd6d2c6 });
    // Ribbons tied to the fence scrim, east of the gate.
    for(let i = 0; i < 26; i++){
      const rx = 16 + (i % 13) * 2.2, rz = -70;
      const hue = [0xc0392b, 0x2f6fa8, 0xd4a017, 0xe2ded0][i % 4];
      box(scene, 0.1, 0.6, 0.05, rx, y(rx, rz) + 1.5 - (i > 12 ? 0.5 : 0), rz + 0.16,
        MATERIALS.paintedSteel(hue));
    }
  }

  // ----------------------------------------------------- staff caravan park
  // Staff who cannot go home is a real feature of a long outbreak, and it puts a
  // second small neighbourhood inside the map on the far service side.
  {
    for(let i = 0; i < 5; i++){
      const vx = -74 + (i % 3) * 9, vz = 52 + Math.floor(i / 3) * 8;
      const vY = y(vx, vz);
      box(scene, 6.4, 2.5, 2.6, vx, vY + 1.75, vz, MATERIALS.panel());
      box(scene, 6.6, 0.3, 2.8, vx, vY + 3.1, vz, MATERIALS.paintedSteel(0xa9a294));
      box(scene, 0.3, 0.9, 0.3, vx - 2.8, vY + 0.45, vz, MATERIALS.steel());
      // A line of washing between two of them, which is the detail that says
      // people are living here rather than storing something.
      if(i === 1){
        box(scene, 9.0, 0.04, 0.04, vx + 4.5, vY + 2.2, vz + 2.2, MATERIALS.steel());
        for(let k = 0; k < 6; k++){
          box(scene, 0.5, 0.7, 0.03, vx + 1.4 + k * 1.3, vY + 1.85, vz + 2.2,
            MATERIALS.paintedSteel([0xe8e4d8, 0x7fa8c0, 0xd8d2c0][k % 3]));
        }
      }
      soft({ x: vx, z: vz, r: 3.6 });
    }
  }

  // -------------------------------------------------- bowsers and laundry skips
  // Consumables at surge scale. Repetition of one simple object is the cheapest
  // way to say volume.
  {
    for(let i = 0; i < 3; i++){
      const bx = 46 + i * 5.2, bz = -34;
      const bY = y(bx, bz);
      cyl(scene, 1.35, 4.2, bx, bY + 1.5, bz, MATERIALS.panel(), 1.35);
      box(scene, 3.4, 0.4, 2.2, bx, bY + 0.2, bz, MATERIALS.steel());
      soft({ x: bx, z: bz, r: 1.9 });
    }
    for(const [sx, sz] of [[-58, -34], [-52, -34], [-58, -40], [-52, -40], [-58, -46]]){
      const sY = y(sx, sz);
      box(scene, 4.2, 1.7, 2.4, sx, sY + 0.95, sz, MATERIALS.paintedSteel(0x4d6a55));
      box(scene, 4.3, 0.15, 2.5, sx, sY + 1.85, sz, MATERIALS.paintedSteel(0x3c5344));
      soft({ x: sx, z: sz, r: 2.4 });
    }
  }

  // ------------------------------------------------------- the closed playground
  // A general hospital has one, and taped off it carries the whole situation in
  // a single image without a word of explanation or a hint of gore.
  {
    const gx = 74, gz = 8, pgY = y(gx, gz);
    // Frame, slide, two swings — read as a playground from silhouette alone.
    for(const dx of [-3, 3]) box(scene, 0.16, 2.6, 0.16, gx + dx, pgY + 1.3, gz, MATERIALS.paintedSteel(0x2f6fa8));
    box(scene, 6.4, 0.16, 0.16, gx, pgY + 2.6, gz, MATERIALS.paintedSteel(0x2f6fa8));
    for(const dx of [-1.6, 1.6]){
      box(scene, 0.06, 1.3, 0.06, gx + dx, pgY + 1.9, gz, MATERIALS.steel());
      box(scene, 0.7, 0.08, 0.3, gx + dx, pgY + 1.25, gz, MATERIALS.paintedSteel(0xd4a017));
    }
    box(scene, 0.9, 0.1, 4.0, gx + 5.4, pgY + 1.1, gz + 1.4, MATERIALS.paintedSteel(0xc0392b), 0.32);
    // Hazard tape on stakes, right around it.
    const tape = [[-7, -6], [7, -6], [7, 6], [-7, 6]];
    tape.forEach(([ax, az], i) => {
      const [bx2, bz2] = tape[(i + 1) % 4];
      box(scene, 0.08, 1.1, 0.08, gx + ax, pgY + 0.55, gz + az, MATERIALS.steel());
      const mx = gx + (ax + bx2) / 2, mz = gz + (az + bz2) / 2;
      const len = Math.hypot(bx2 - ax, bz2 - az);
      box(scene, 0.1, 0.12, len, mx, pgY + 0.95, mz, MATERIALS.paintedSteel(0xd4a017),
        Math.atan2(bx2 - ax, bz2 - az));
    });
    soft({ x: gx, z: gz, r: 7.4 });
  }

  // ================================================== the response, made visible
  //
  // Everything above is the infrastructure of a response: tents, containers,
  // oxygen, power. What it did not show is the response *happening* — the
  // vehicles that bring people in, the queues they stand in when they arrive,
  // and the signs that tell everybody which side of a line they are on. That is
  // what a player reads in the first ten seconds, and none of it was here.

  // ------------------------------------------------------- the ambulance apron
  // Two bays either side of the spine, nosed in off the apron, plus one that has
  // just come through the gate and one out at the field station. Hard colliders:
  // an ambulance is not something the crowd walks through.
  {
    const bays = [
      { x: -40, z: 40, facing: 0, unit: 'A-114' },
      { x: -33, z: 40, facing: 0, unit: 'A-121' },
      { x: 34, z: 40, facing: 0, unit: 'A-107' },
      { x: 41, z: 40, facing: 0, unit: 'A-133' },
      { x: 52, z: 34, facing: Math.PI / 2, unit: 'A-140' },   // waiting on the apron
      { x: 11, z: -80, facing: Math.PI / 2, unit: 'A-118' },  // just outside the gate
      { x: 3, z: -182, facing: Math.PI / 2, unit: 'A-126' },  // the field station run
    ];
    for(const b of bays){
      const a = ambulance(scene, b.x, b.z, y(b.x, b.z), b);
      colliders.push(a.collider);
      for(const lamp of a.lamps) glow(lamp);
    }
    // Bay markings and the cones that keep the bays clear.
    for(const bx of [-40, -33, 34, 41]){
      for(const dx of [-1.6, 1.6]) soft(cone(scene, bx + dx, 36.4, y(bx + dx, 36.4)));
      box(scene, 0.16, 0.02, 7.0, bx - 1.7, y(bx, 40) + 0.02, 40, MATERIALS.paintedSteel(0xd8c53c));
      box(scene, 0.16, 0.02, 7.0, bx + 1.7, y(bx, 40) + 0.02, 40, MATERIALS.paintedSteel(0xd8c53c));
    }
    // Clear of the crate stacks at (-40, 44) and (-36, 46) — the first pass put
    // this panel straight through them, which is the same defect `placement`
    // fires rays for indoors and cannot see out here.
    postedSign(scene, 'AMBULANCE ONLY', -46.5, 40, y, {
      w: 4.0, h: 1.1, facing: -Math.PI / 2,
      sub: 'Bays 1–2 · Handover to the charge nurse', accent: 0xc0392b,
    });
    postedSign(scene, 'AMBULANCE ONLY', 47.5, 42, y, {
      w: 4.0, h: 1.1, facing: Math.PI / 2,
      sub: 'Bays 3–4 · Handover to the charge nurse', accent: 0xc0392b,
    });
    // Trolleys waiting at the bays and one at the ward door.
    soft(stretcher(scene, -36.5, 36.0, y(-36.5, 36.0), { facing: Math.PI / 2 }));
    soft(stretcher(scene, 37.5, 36.0, y(37.5, 36.0), { facing: Math.PI / 2, blanket: 0x6b7f5a }));
    soft(stretcher(scene, -25.5, 12.5, y(-25.5, 12.5), { facing: 0 }));
  }

  // ------------------------------------------------------------- the queues
  // Barrier lanes and two-metre marks on the tarmac. The marks are the disease
  // stated as a floor plan: people who may not stand together.
  {
    // Every one of these is inside the open court, not inside a wall: the
    // clinical wing runs to x = -15 and cell biology from x = +17, the two
    // north-court buildings end at z = -51.5, and the spine is x = ±4. The
    // first pass had four lanes standing in a building, which renders
    // perfectly and reads as a barrier growing out of the brickwork.
    const lanes = [
      [-13.5, 26, -13.5, 15.5], [-6.5, 26, -6.5, 15.5],   // red triage
      [6.5, 26, 6.5, 15.5], [13.5, 26, 13.5, 15.5],       // yellow triage
      [-21, -54, -21, -60], [-13, -54, -13, -60],         // the swab line
      [13, -54, 13, -60], [21, -54, 21, -60],
      [-10, -75, -2.5, -75], [2.5, -75, 10, -75],         // screening, outside the gate
    ];
    for(const [x0, z0, x1, z1] of lanes){
      for(const s of barrierRun(scene, x0, z0, x1, z1, y)) soft(s);
    }
    spacingMarks(scene, -10, 25, -10, 15.5, y, 6);
    spacingMarks(scene, 10, 25, 10, 15.5, y, 6);
    spacingMarks(scene, -17, -54, -17, -60, y, 4);
    spacingMarks(scene, 17, -54, 17, -60, y, 4);
    spacingMarks(scene, -6, -74, -6, -66, y, 4);
    spacingMarks(scene, 6, -74, 6, -66, y, 4);
  }

  // ------------------------------------------------ what every sign has to say
  // Zone before hazard before instruction, which is the order somebody walking
  // in reads them in.
  {
    // Free-standing, on legs.
    const S = (text, x, z, opts = {}) => soft(postedSign(scene, text, x, z, y, opts));
    S('TRIAGE — RED', -12.5, 23.4, { sub: 'Resuscitation · staff in suits only', accent: 0xc0392b });
    S('TRIAGE — YELLOW', 12.5, 23.4, { sub: 'Assessment · wait to be called', accent: 0xd4a017 });
    S('AMBULATORY — GREEN', 17, -2.2, { sub: 'Walk-in assessment', accent: 0x2e8b57 });
    S('SWAB CLINIC', -17, -54.2, { sub: 'One at a time · keep two metres', accent: 0x2f6fa8 });
    S('SPECIMEN DROP', 17, -54.2, { sub: 'Sealed transport boxes only', accent: 0x6b4c9a });
    S('PPE REQUIRED BEYOND THIS POINT', 5.6, 15.6,
      { sub: 'Suit, gloves, visor · checked at the door', accent: 0xc0392b, w: 4.6, top: 2.9 });
    S('DOFFING — REMOVE PPE HERE', 5.6, 0.8,
      { sub: 'Gloves first · hands · visor · suit last', accent: 0xd4a017, w: 4.6, facing: Math.PI, top: 2.9 });
    S('STAFF SCREENING', -7.5, -64.5, { sub: 'Temperature and symptom check, every shift', accent: 0x2f6fa8 });
    S('CLINICAL WASTE', -55, -30.5, { sub: 'Incineration only · do not open', accent: 0xd4a017 });
    S('OXYGEN — NO NAKED FLAME', 46, -6.0, { sub: 'Bulk liquid store', accent: 0x2f6fa8 });
    S('PRESS BRIEFING 1600', 14, -86, { sub: 'City Health Command · daily', facing: Math.PI });
    S('CASE DEFINITION — REVISION 4', 9.5, -24.0,
      { sub: 'Fever, cough, exposure within 14 days', accent: 0x1f5c4d, facing: Math.PI / 2, w: 4.4 });

    // On the two ward faces, proud of the wall rather than in it: the clinical
    // wing and cell biology both front the south court at z = 13.5.
    sign(scene, 'ISOLATION WARD', {
      x: -30, z: 13.2, y: y(-30, 13.2) + 4.2, w: 4.2, h: 1.15, facing: Math.PI,
      sub: 'No entry without an escort', accent: 0xc0392b,
    });
    sign(scene, 'SPECIMEN RECEPTION', {
      x: 30, z: 13.2, y: y(30, 13.2) + 4.2, w: 4.2, h: 1.15, facing: Math.PI,
      sub: 'Chain of custody signed at the hatch', accent: 0x2f6fa8,
    });
  }

  // ------------------------------------------------------------- the placards
  // The trefoil, on everything the campus is not allowed to touch: the fence
  // either side of the gate, both zone tents, the tunnel, the waste line, the
  // container labs and the reefers.
  {
    const placards = [
      [-60, -70, 0], [-24, -70, 0], [24, -70, 0], [60, -70, 0],   // the fence
      [-13.2, 24.6, 0], [13.2, 24.6, 0],                          // triage tents
      [-1.75, 14.4, 0, 2.35], [1.75, 14.4, 0, 2.35],              // the tunnel mouth
      [-55, -28.6, 0], [-49, -34, Math.PI / 2],                   // waste line
      [27.6, 52, -Math.PI / 2], [27.6, 60, -Math.PI / 2],         // container labs
      [-40, 30.5, Math.PI],                                       // the reefer line
    ];
    for(const [px, pz, facing, lift] of placards){
      hazardPlacard(scene, px, pz, y(px, pz) + (lift ?? 1.75), { facing });
    }
  }

  // ------------------------------------------------ waste, doffing and beacons
  // A bin every place somebody takes gloves off, which on this campus is every
  // place somebody stops walking.
  {
    for(const [bx, bz] of [
      [-11.5, 27.5], [11.5, 27.5], [24, 2], [-6.2, 2.5], [6.2, 2.5],
      [-13.2, -57], [13.2, -57], [-25.5, 14.5], [25.5, 14.5], [-7.5, -62],
      [-49, -30.5], [27.5, 47],
    ]) soft(wasteBin(scene, bx, bz, y(bx, bz)));

    // Doffing stations: a table, a box of fresh suits, two bins. One at each end
    // of the tunnel and one at the gate.
    for(const [dx, dz, facing] of [[-6.4, 12.6, 0], [6.4, 3.2, Math.PI], [-9.5, -68, 0]]){
      const dY = y(dx, dz);
      box(scene, 2.2, 0.08, 0.8, dx, dY + 0.86, dz, MATERIALS.panel(), facing);
      for(const s of [-0.9, 0.9]) box(scene, 0.08, 0.86, 0.08, dx + s, dY + 0.43, dz, MATERIALS.steel());
      box(scene, 0.6, 0.4, 0.5, dx - 0.6, dY + 1.10, dz, MATERIALS.paintedSteel(0xe4e1d6), facing);
      box(scene, 0.6, 0.4, 0.5, dx + 0.2, dY + 1.10, dz, MATERIALS.paintedSteel(0x6f9ec6), facing);
      soft({ x: dx, z: dz, r: 1.4 });
    }

    for(const [bx, bz] of [[-6.5, -70], [6.5, -70], [-5.2, 15.2], [5.2, 15.2], [-30, 33], [30, 33]]){
      const b = beacon(scene, bx, bz, y(bx, bz));
      soft(b.soft); glow(b.glow);
    }
  }

  // ------------------------------------------------------- under the canvas
  // Cots, two rows to a tent. An open-sided marquee with nothing under it is a
  // marquee at a village fete; the beds are what make it a ward, and they are
  // visible from the courtyard through the low side walls, which is why the
  // tent was built open-sided in the first place.
  {
    for(const s of tentWard(scene, -11.5, 30, y, { facing: 0, rows: 3, blanket: 0xb4574c, monitor: true })) soft(s);
    for(const s of tentWard(scene, 11.5, 30, y, { facing: 0, rows: 3, blanket: 0xc9a94a })) soft(s);
    for(const s of tentWard(scene, 17, 6, y, { facing: Math.PI / 2, rows: 3, gap: 2.4, blanket: 0x5f8f70 })) soft(s);
    for(const s of tentWard(scene, -17, -62, y, { facing: 0, rows: 2, gap: 3.4, blanket: 0x5f7f96 })) soft(s);

    // The zone under each one, painted on the tarmac. Signage that still works
    // when the sign is behind you.
    zonePaint(scene, -11.5, 30, 7.4, 11.6, y, 0x8f3b33);
    zonePaint(scene, 11.5, 30, 7.4, 11.6, y, 0x9a7f2a);
    zonePaint(scene, 17, 6, 11.6, 8.8, y, 0x2f6b4e);
    zonePaint(scene, -17, -62, 8.8, 12.6, y, 0x2f5876);
    zonePaint(scene, 17, -62, 8.8, 12.6, y, 0x4a3f78);
  }

  // --------------------------------------------- water, sanitation, cylinders
  // What a site needs when it has been standing for three weeks and none of it
  // is plumbed in.
  {
    for(const [wx, wz] of [[-8.0, 25.5], [8.0, 25.5], [-8.0, -58], [8.0, -58], [-11, -68]]){
      soft(washStation(scene, wx, wz, y(wx, wz)));
    }
    for(let i = 0; i < 3; i++){
      const px = 52 + i * 1.6, pz = 12;
      soft(portaloo(scene, px, pz, y(px, pz), -Math.PI / 2));
    }
    for(let i = 0; i < 3; i++){
      const px = -52 + i * 1.8, pz = 8;
      soft(portaloo(scene, px, pz, y(px, pz), Math.PI / 2));
    }
    // Cylinders at the tents and at both ward doors: the surge is a delivery
    // problem, and this is the delivery.
    for(const [cx2, cz2, f] of [
      [-14.4, 27, Math.PI / 2], [14.4, 27, -Math.PI / 2],
      [-22, 12.6, 0], [22, 12.6, 0], [24.5, 10.5, Math.PI / 2],
    ]) soft(cylinderTrolley(scene, cx2, cz2, y(cx2, cz2), f));
  }
  void colliders;
}

/**
 * A cylinder on its side, along +Z. `kit.cyl` only builds them upright, and a
 * bulk tank standing on end is a silo, not a tank — which is what the first pass
 * at the oxygen farm rendered.
 */
function lying(parent, r, len, x, y, z, material){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 14), material);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

/**
 * A road tanker, or a box van with `van: true`. Both are the same shape at this
 * scale — cab, chassis, body — and the site needs several of each without
 * pulling in the driveable-vehicle machinery, because none of these can be taken.
 */
function tanker(scene, x, z, y = 0, { facing = 0, van = false, colour = 0xb9bcc0 } = {}){
  const g = new THREE.Group();
  box(g, 2.5, 1.4, 4.6, 0, 1.5, 3.4, MATERIALS.paintedSteel(van ? colour : 0x4a5460));   // cab
  box(g, 2.3, 0.9, 2.2, 0, 2.6, 4.2, MATERIALS.glass());
  box(g, 2.6, 0.5, 12, 0, 0.9, -2.4, MATERIALS.steel());                                  // chassis
  if(van) box(g, 2.6, 3.0, 11, 0, 2.6, -2.4, MATERIALS.panel());
  else lying(g, 1.3, 10.6, 0, 2.4, -2.4, MATERIALS.panel());
  for(const dz of [4.0, -1.2, -3.0, -6.4]) for(const dx of [-1.15, 1.15]){
    cyl(g, 0.52, 0.34, dx, 0.55, dz, MATERIALS.rubber());
  }
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

export default decorate;

// Present so the manifest can export the same three hook names whichever world
// it is wired to. This game is outdoors.
export function fitOutRoom(){}
export function fitOutSpine(){}
