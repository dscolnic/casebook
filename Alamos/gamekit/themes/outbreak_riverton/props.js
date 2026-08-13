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
