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

  // ------------------------------------------------- the south court: triage
  // Three marquees with zone bands, filling the court between the clinical
  // wing and cell biology, and leaving the spine clear.
  soft(marquee(scene, -16, 30, y(-16, 30), { facing: 0, band: 0xc0392b, colour: 0xe2ded0 }).soft);
  soft(marquee(scene, 16, 30, y(16, 30), { facing: 0, band: 0xd4a017, colour: 0xe2ded0 }).soft);
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
  void colliders;
}

export default decorate;

// Present so the manifest can export the same three hook names whichever world
// it is wired to. This game is outdoors.
export function fitOutRoom(){}
export function fitOutSpine(){}
