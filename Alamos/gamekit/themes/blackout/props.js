// props.js — the objects that make Calder a power system.
//
// Generic furniture, building shells and street fittings come from
// engine/world/kit.js and are configured in site.js. What is here is the plant:
// the switchyard, the transmission towers that leave the map, the cooling tower,
// the wind ridge on the skyline, and the pole line along the apron.
//
// The switchyard is the whole silhouette. A power system does not read as one
// from buildings — offices look like offices — it reads from steel: horizontal
// busbars held up at three heights, disconnect switches standing on posts, and
// conductors sagging away north until they are too small to see.
//
// Nothing here is a real light. This is a daytime site and the light budget is
// spent on the sun rig; the two lit panels are emissive materials.

import * as THREE from 'three';
import {
  MATERIALS, box, cyl, post, sign, fenceRun, crateStack, tank, pipeRun, vehicle, displayBoard,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * A lattice transmission tower, and the conductors leaving it.
 *
 * Four legs battered inward, three cross-arms, and an earth peak. Drawn from
 * boxes rather than a truss because at the distance these are seen the silhouette
 * is the whole content, and a real truss is four hundred members nobody resolves.
 */
function tower(scene, x, z, y, h = 34){
  const g = new THREE.Group();
  const steel = MATERIALS.paintedSteel(0x646b71);
  const spread = 4.4, top = 1.1;
  for(const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
    // Each leg as three tapering segments, which is what gives the battered look.
    for(let i = 0; i < 3; i++){
      const f0 = i / 3, f1 = (i + 1) / 3;
      const r0 = spread + (top - spread) * f0, r1 = spread + (top - spread) * f1;
      const mid = (r0 + r1) / 2;
      box(g, 0.3, h / 3, 0.3, sx * mid, h * (f0 + f1) / 2, sz * mid, steel);
    }
    // Bracing, so the gap between legs is not empty at close range.
    for(let i = 1; i < 6; i++){
      const f = i / 6, r = spread + (top - spread) * f;
      box(g, r * 2, 0.16, 0.16, 0, h * f, sz * r, steel);
      box(g, 0.16, 0.16, r * 2, sx * r, h * f, 0, steel);
    }
  }
  // Cross-arms: two wide, one narrow, plus the earth peak above them.
  for(const [ay, aw] of [[h * 0.62, 13], [h * 0.79, 11], [h * 0.93, 8]]){
    box(g, aw, 0.34, 0.5, 0, ay, 0, steel);
    box(g, aw * 0.5, 0.2, 0.3, 0, ay + 1.4, 0, steel);
  }
  box(g, 0.3, 3.0, 0.3, 0, h + 1.2, 0, steel);
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/** A conductor between two towers, with the sag that makes it read as a wire. */
function span(scene, x0, z0, x1, z1, y0, y1, sag = 3.2, offset = 0){
  const pts = [];
  const N = 12;
  for(let i = 0; i <= N; i++){
    const t = i / N;
    const dip = Math.sin(Math.PI * t) * sag;
    pts.push(new THREE.Vector3(
      x0 + (x1 - x0) * t + offset,
      y0 + (y1 - y0) * t - dip,
      z0 + (z1 - z0) * t));
  }
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.075, 5, false);
  const m = new THREE.Mesh(geo, MATERIALS.paintedSteel(0x3f4348));
  scene.add(m);
  return m;
}

/** A wind turbine: tower, nacelle, three blades. Skyline only — never reachable. */
function turbine(scene, x, z, y, h = 62, r = 26, spin = 0){
  const g = new THREE.Group();
  const white = MATERIALS.panel();
  cyl(g, 1.9, h, 0, h / 2, 0, white, 1.1);
  box(g, 2.6, 2.4, 6.4, 0, h + 1.0, 0.6, white);
  const hub = new THREE.Group();
  for(let i = 0; i < 3; i++){
    const a = spin + i * (Math.PI * 2 / 3);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(1.5, r, 0.35), white);
    blade.position.set(Math.sin(a) * r / 2, Math.cos(a) * r / 2, 0);
    blade.rotation.z = -a;
    hub.add(blade);
  }
  hub.position.set(0, h + 1.0, -2.8);
  g.add(hub);
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, lightPanels, stateHooks } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels?.push(m); };

  // ======================================================= the city, south-east
  // The thing the job is about. Four million people are named on every card and
  // until now you could not see one of them: the horizon was a ring of hills in
  // every direction, on a game about keeping a city lit.
  //
  // site.js puts a flat-topped silhouette rank out at 900 m on this bearing.
  // What goes in front of it is the light — a field of small emissive panels at
  // the distance where a window is a dot, laid out in districts so that losing
  // one is legible from here.
  //
  // The districts go out as the campaign does. `stateHooks` runs on every state
  // change, and `state.week` is the day, so the fifth of the island shed on the
  // night the valley separates is a fifth of the skyline going dark, and the
  // restoration days bring it back in the order the room worked.
  {
    const R = 880, spread = 1.42, base = Math.PI / 4;   // SE, matching site.js
    const districts = [];
    const DISTRICTS = 5;
    for(let d = 0; d < DISTRICTS; d++){
      const group = new THREE.Group();
      const a0 = base - spread / 2 + (spread / DISTRICTS) * d;
      const a1 = a0 + (spread / DISTRICTS) * 0.92;
      // Windows, as one merged-looking cloud of small planes. Emissive only:
      // six real lights is the ceiling and this is nowhere near worth one.
      const mat = new THREE.MeshStandardMaterial({
        color: 0x2b2a26, emissive: new THREE.Color(0xffd9a0), emissiveIntensity: 1.0,
        roughness: 0.9, metalness: 0,
      });
      const geo = new THREE.PlaneGeometry(2.6, 1.6);
      const count = 150;
      const mesh = new THREE.InstancedMesh(geo, mat, count);
      const m = new THREE.Matrix4();
      for(let i = 0; i < count; i++){
        const t = (Math.sin(i * 12.9898 + d * 7.7) * 43758.5453) % 1;
        const u = (Math.sin(i * 78.233 + d * 3.1) * 24634.6345) % 1;
        const a = a0 + (a1 - a0) * Math.abs(t);
        const r = R - 40 * Math.abs(u);
        // Windows sit in the lower two thirds of the silhouette: a lit dot above
        // the roofline reads as a star in the wrong place.
        const h = 3 + 15 * Math.abs((Math.sin(i * 3.7 + d) + 1) / 2) ** 1.7;
        m.makeRotationY(-a + Math.PI / 2);
        m.setPosition(Math.cos(a) * r, h, Math.sin(a) * r);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      // Real bounds rather than `frustumCulled = false`. An instanced mesh whose
      // instances are all 900 m from its origin has a useless default bounding
      // sphere and vanishes; turning culling off fixes that by pushing it
      // through the renderer from every camera angle, which is the expensive
      // way to be correct.
      mesh.computeBoundingSphere();
      group.add(mesh);
      scene.add(group);
      districts.push({ mesh, mat, base: 1.0 });
      glow(mesh);
    }

    // Which districts are dark on which day. Day 8 is the night the corridor
    // trips and the valley islands; the restoration runs through day 10, and by
    // the report on day 15 everything is back. Anything the player has not
    // reached yet is a city that is simply lit.
    const OUT = (week) => {
      if(week >= 8 && week <= 9) return 2;      // the island, shed to hold frequency
      if(week === 10) return 1;                 // restoration, most of it back
      return 0;
    };
    stateHooks?.push((state) => {
      const out = OUT(Number(state?.week) || 1);
      districts.forEach((d, i) => {
        // Dark from the far end in, so the outage reads as a place rather than
        // as a flicker spread evenly over the whole skyline.
        const dark = i < out;
        d.mat.emissiveIntensity = dark ? 0.04 : d.base;
        d.mat.color.setHex(dark ? 0x24231f : 0x2b2a26);
      });
    });
  }

  // ============================================== the channel and the intake
  // Water for the cooling tower, which has stood here evaporating nothing since
  // the day this file was written. site.js cuts the bed; this is the bank.
  {
    const zc = -210, wY = -1.4;
    // Levee along the near bank, low and long, with a rip-rap toe.
    box(scene, 620, 2.6, 9, 0, y(0, zc + 44) + 1.0, zc + 44, MATERIALS.paintedSteel(0x6d6a5c));
    // Rip-rap on the toe: low broken stone, not crates.
    for(let x = -280; x <= 280; x += 11){
      const j = Math.abs(Math.sin(x * 3.1) );
      box(scene, 9, 0.5 + j * 0.5, 3.4 + j, x, y(x, zc + 38) + 0.25, zc + 38.5,
        MATERIALS.paintedSteel(0x605d55), j * 0.4);
    }
    // Screen house on the water, and the pipe that leaves it for the tower.
    const sx = 46, sz = zc + 30;
    box(scene, 9, 5.2, 7, sx, wY + 2.6, sz, MATERIALS.paintedSteel(0x8a8f92));
    box(scene, 10, 0.5, 8, sx, wY + 5.3, sz, MATERIALS.paintedSteel(0x5c6165));
    pipeRun(scene, { x0: sx, z0: sz + 4, x1: 34, z1: -120, y: y(40, -160) + 0.4,
      height: 2.2, r: 0.7, colour: 0x77807c });
    sign(scene, 'RAW WATER INTAKE', { x: sx + 8, y: y(sx + 8, sz + 10) + 2.4, z: sz + 10,
      facing: Math.PI, sub: 'Screens · travelling band', accent: 0x2f6f8f });
  }

  // ============================================================ the switchyard
  // Three bays across the north end, fenced, on a gravel pad. Busbars at three
  // heights is the detail that makes it a switchyard rather than a scrapyard.
  {
    const yardY = y(0, -96);
    const steel = MATERIALS.paintedSteel(0x646b71);
    box(scene, 160, 0.14, 46, 0, yardY + 0.07, -96, MATERIALS.paintedSteel(0x6c6862));

    // Gantries: portal frames carrying the busbars east to west.
    for(const bz of [-112, -96, -80]){
      const bh = bz === -96 ? 13.5 : bz === -112 ? 16 : 11;
      for(let i = -3; i <= 3; i++){
        const px = i * 24;
        for(const dz of [-1.6, 1.6]){
          box(scene, 0.5, bh, 0.5, px, yardY + bh / 2, bz + dz, steel);
        }
        box(scene, 0.5, 0.5, 4.0, px, yardY + bh, bz, steel);
        soft({ x: px, z: bz, r: 1.6 });
      }
      // The busbar itself: one long tube at the top of the frames.
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 156, 8), MATERIALS.paintedSteel(0x7c8288));
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, yardY + bh - 0.5, bz);
      scene.add(bar);
    }

    // Disconnect switches: porcelain stacks on a frame, in a row per bay.
    for(let i = -3; i <= 3; i++){
      for(const bz of [-104, -88]){
        const px = i * 24 + 12;
        const sY = y(px, bz);
        box(scene, 3.0, 0.5, 1.4, px, sY + 2.2, bz, steel);
        for(const dx of [-1.1, 1.1]){
          for(let k = 0; k < 4; k++){
            cyl(scene, 0.26, 0.5, px + dx, sY + 2.7 + k * 0.52, bz,
              MATERIALS.paintedSteel(0xa08e74), 0.24);
          }
        }
        soft({ x: px, z: bz, r: 2.0 });
      }
    }

    // Transformers on the south edge: tank, radiator banks, bushings.
    for(const tx of [-46, 0, 46]){
      const tY = y(tx, -70);
      box(scene, 9.0, 6.0, 6.5, tx, tY + 3.0, -70, MATERIALS.paintedSteel(0x53585d));
      for(const dx of [-5.2, 5.2]){
        for(let k = 0; k < 7; k++){
          box(scene, 0.3, 4.4, 0.9, tx + dx, tY + 2.9, -70 - 2.4 + k * 0.8,
            MATERIALS.paintedSteel(0x5d6368));
        }
      }
      // High-voltage bushings, leaning out at the top.
      for(const dx of [-2.6, 0, 2.6]){
        cyl(scene, 0.34, 4.2, tx + dx, tY + 8.0, -71.5, MATERIALS.paintedSteel(0xa08e74), 0.26);
      }
      // The conservator drum along the top, which is the giveaway detail.
      const drum = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 8, 10), MATERIALS.paintedSteel(0x53585d));
      drum.rotation.z = Math.PI / 2;
      drum.position.set(tx, tY + 6.8, -66.8);
      scene.add(drum);
      colliders.push(new THREE.Box3().setFromObject(
        new THREE.Mesh(new THREE.BoxGeometry(11, 7, 8)).translateX(tx).translateY(tY + 3.5).translateZ(-70)));
      soft({ x: tx, z: -70, r: 6.4 });
    }

    // The fence, and the one gate the switching crew uses.
    for(const [x0, z0, x1, z1] of [
      [-80, -120, -10, -120], [10, -120, 80, -120],
      [-80, -120, -80, -72], [80, -120, 80, -72],
      [-80, -72, -30, -72], [30, -72, 80, -72],
    ]){
      colliders.push(fenceRun(scene, { x0, z0, x1, z1, y: y((x0 + x1) / 2, (z0 + z1) / 2), height: 2.6 }));
    }
    sign(scene, 'DANGER — LIVE EQUIPMENT', {
      x: 0, z: -72, y: y(0, -72) + 2.6, w: 5.0, h: 1.2, facing: 0,
      sub: 'Authorised persons with a permit to work', accent: 0xc0392b,
    });
  }

  // ================================================ the corridor leaving north
  // Two circuits of towers marching away past the player's bound at 105, with
  // conductors sagging between them. This is the continuation edge: the system
  // visibly goes somewhere the player never gets to.
  {
    const line = [];
    for(let i = 0; i < 7; i++) line.push(-134 - i * 62);
    for(const cx of [-34, 34]){
      let prev = null;
      for(const cz of line){
        const tY = y(cx, cz);
        const h = 34;
        tower(scene, cx, cz, tY, h);
        if(prev !== null){
          // Three conductors per circuit, one per cross-arm height, plus earth.
          for(const [ay, off] of [[0.62, -5.6], [0.62, 5.6], [0.79, -4.6], [0.79, 4.6], [0.93, 0]]){
            span(scene, cx, prev, cx, cz, tY + h * ay, tY + h * ay, 3.4, off);
          }
        }
        prev = cz;
      }
      // The drop into the yard's take-off gantry.
      span(scene, cx, -134, cx, -112, y(cx, -134) + 34 * 0.62, y(cx, -112) + 15.5, 2.0, 0);
    }
  }

  // ==================================================== generation: the plant
  // A cooling tower and a stack, which is what says "thermal station" from the
  // far end of the site. The tower is the tallest thing at Calder by a long way.
  {
    const cY = y(-64, -34);
    // Hyperbolic shell, approximated by three tapered drums.
    cyl(scene, 13.0, 12, -64, cY + 6, -34, MATERIALS.paintedSteel(0x8b877d), 9.5);
    cyl(scene, 9.5, 14, -64, cY + 19, -34, MATERIALS.paintedSteel(0x8b877d), 8.4);
    cyl(scene, 8.4, 6, -64, cY + 29, -34, MATERIALS.paintedSteel(0x807c73), 9.2);
    // The plume, as stacked translucent slabs leaning downwind. No particles.
    for(let i = 0; i < 4; i++){
      box(scene, 12 + i * 5, 4.5, 12 + i * 5, -64 + i * 4, cY + 35 + i * 5, -34 - i * 2,
        MATERIALS.glass());
    }
    soft({ x: -64, z: -34, r: 14 });

    // The stack, thinner and taller-looking beside the machine hall.
    const sY = y(-14, -34);
    cyl(scene, 2.3, 44, -14, sY + 22, -34, MATERIALS.paintedSteel(0x8e8a80), 1.7);
    for(let k = 0; k < 3; k++){
      cyl(scene, 2.0 - k * 0.1, 1.2, -14, sY + 14 + k * 12, -34, MATERIALS.paintedSteel(0xc0392b));
    }
    soft({ x: -14, z: -34, r: 3.0 });

    // Fuel and feedwater: tanks and a pipe run into the hall.
    soft(tank(scene, -58, -8, y(-58, -8), { r: 4.6, h: 11, colour: 0xc4c0b6 }));
    soft(tank(scene, -48, -8, y(-48, -8), { r: 4.6, h: 11, colour: 0xbcc0c2 }));
    pipeRun(scene, { x0: -52, z0: -14, x1: -52, z1: -26, y: y(-52, -20), height: 3.2, colour: 0x7a8480 })
      .forEach(soft);
  }

  // ============================================== the wind ridge on the skyline
  // Far past the bound, on the western horizon. Mina Sarraf's fleet, which the
  // player hears about constantly and can never walk to.
  {
    for(let i = 0; i < 9; i++){
      const wx = -300 - (i % 3) * 46;
      const wz = -240 + i * 34;
      turbine(scene, wx, wz, y(wx, wz), 58 + (i % 3) * 6, 24, i * 0.7);
    }
  }

  // ================================================== the apron and the depot
  // A pole line down the apron, which is the distribution voltage arriving as a
  // thing you can stand next to — the same power, four hundred times smaller.
  {
    for(let i = -5; i <= 5; i++){
      const px = i * 20, pz = 68;
      if(Math.abs(px) < 8) continue;              // keep the spine clear
      const pY = y(px, pz);
      cyl(scene, 0.17, 9.5, px, pY + 4.75, pz, MATERIALS.paintedSteel(0x6b5a44));
      box(scene, 2.8, 0.2, 0.2, px, pY + 8.8, pz, MATERIALS.paintedSteel(0x6b5a44));
      for(const dx of [-1.2, 0, 1.2]){
        cyl(scene, 0.11, 0.34, px + dx, pY + 9.05, pz, MATERIALS.paintedSteel(0x4f5f52));
      }
      soft({ x: px, z: pz, r: 0.6 });
    }
    // Conductors between them, sagging.
    for(const dx of [-1.2, 0, 1.2]){
      for(let i = -5; i < 5; i++){
        const a = i * 20, b = (i + 1) * 20;
        if(Math.abs(a) < 8 || Math.abs(b) < 8) continue;
        span(scene, a, 68, b, 68, y(a, 68) + 9.2, y(b, 68) + 9.2, 0.9, dx);
      }
    }

    // A pole-mounted distribution transformer, the small grey drum on a pole.
    const dtY = y(60, 68);
    const dt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.6, 12), MATERIALS.paintedSteel(0x8d9298));
    dt.position.set(60, dtY + 6.4, 68.7);
    scene.add(dt);

    // Cable drums at the store, and the line truck the crews take out.
    for(const [cx, cz, r] of [[34, 92, 1.7], [38, 94, 1.4], [30, 95, 1.2]]){
      const dY = y(cx, cz);
      const drum = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, 1.5, 14), MATERIALS.paintedSteel(0x6b5a44));
      drum.rotation.x = Math.PI / 2;
      drum.position.set(cx, dY + r, cz);
      scene.add(drum);
      soft({ x: cx, z: cz, r: r + 0.4 });
    }
    soft(crateStack(scene, 46, 92, y(46, 92), { rows: 2, colour: 0x7d8388 }));

    const truck = vehicle(scene, 18, 92, y(18, 92), { facing: Math.PI / 2, colour: 0xd8b13a });
    driveable(scene, truck.group, {
      id: 'VEH_LINE', label: 'line truck',
      halfWidth: 1.25, halfLength: 2.9, height: 3.0,
      seat: { x: 0.52, y: 2.18, z: truck.cabZ },
      wheels: truck.wheels, topSpeed: 12,
      colliders, interactables,
    });
  }

  // ======================================================= two lit readouts
  // The system frequency, outside Operations, and the yard's own loading board.
  // Emissive panels, not lights.
  {
    const f = displayBoard(scene, 12, 40, y(12, 40), {
      facing: Math.PI, title: 'FREQUENCY 49.82 Hz', tint: 0xc0392b });
    soft(f.soft); glow(f.screen);
    interactables.push({
      mesh: f.screen, type: 'info', id: 'READOUT_FREQ',
      prompt: 'E — Read the system frequency display',
    });
    const l = displayBoard(scene, -20, -66, y(-20, -66), {
      facing: 0, title: 'CIRCUIT 2 — 108%', tint: 0xb0762a });
    soft(l.soft); glow(l.screen);
    interactables.push({
      mesh: l.screen, type: 'info', id: 'READOUT_YARD',
      prompt: 'E — Read the corridor loading board',
    });
  }
}

export default decorate;

// Present so the manifest can export the same three hook names whichever world
// it is wired to. Calder is outdoors, so the interior fit-out hooks do nothing.
export function fitOutRoom(){}
export function fitOutSpine(){}
