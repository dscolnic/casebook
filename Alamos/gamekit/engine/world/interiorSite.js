// interiorSite.js — builds an interior from a plan, for any theme.
//
// Generalised out of the hospital build. The topology it produces — a spine
// with rooms down both sides, glazing at the ends, a suspended ceiling and a
// staffed open counter — is also an airport concourse, a lab corridor and a
// visitor centre. Only the fit-out changes, and that is the theme's job.
//
// A plan is data (see themes/_template/plan.js). Everything here derives from
// it: walls, doorways, doors, ceiling grid, signage, lighting and collision.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  paintTexture, sheetFloorTexture, ceilingTileTexture, diffuserTexture,
  grainTexture, mat, glassMaterial, srand, srandRange,
} from './materials.js';

export const DEFAULTS = {
  corridorHalfWidth: 1.8,
  roomDepth: 7.6,
  wall: 0.18,
  ceilingH: 3.0,
  tileH: 2.75,
  doorW: 1.25,
  doorWideW: 1.85,
  doorH: 2.15,
  palette: {
    floorSpine: [212, 206, 194],
    floorRoom:  [206, 210, 206],
    wall:  '#e9e7df',
    base:  '#5d6169',
    rail:  '#8d9299',
    frame: '#b9bcc0',
    door:  '#a98b63',
    signBand: '#25506b',
  },
};

/** Geometry helpers for a plan. Pure functions, safe for themes to use. */
export function makePlanGeometry(plan){
  const P = { ...DEFAULTS, ...plan.metrics };
  const envelope = {
    x0: -(P.corridorHalfWidth + P.roomDepth),
    x1:  (P.corridorHalfWidth + P.roomDepth),
    z0: plan.spine.z0,
    z1: plan.spine.z1,
  };
  const bounds = (r) => {
    const inner = r.side === 'w' ? -P.corridorHalfWidth : P.corridorHalfWidth;
    const outer = r.side === 'w' ? envelope.x0 : envelope.x1;
    return {
      xInner: inner, xOuter: outer,
      z0: r.z0, z1: r.z1,
      cx: (inner + outer) / 2, cz: (r.z0 + r.z1) / 2,
      sign: r.side === 'w' ? -1 : 1,          // outward, into the room
    };
  };
  const entry = (r) => {
    const b = bounds(r);
    return { x: b.xInner + b.sign * 1.6, z: b.cz };
  };
  const doorWidth = (r) => (r.door === 'wide' ? P.doorWideW : P.doorW);
  return { P, envelope, bounds, entry, doorWidth };
}

/**
 * Builds the shell and returns the pieces the engine's world module needs.
 * `hooks.fitOutRoom(room, ctx)` and `hooks.fitOutSpine(ctx)` are where a theme
 * puts its own equipment.
 */
export function buildInterior(scene, renderer, plan, hooks = {}){
  const geo = makePlanGeometry(plan);
  const { P, envelope, bounds, doorWidth } = geo;
  const colliders = [];
  const softColliders = [];
  const interactables = [];
  const lightPanels = [];
  const stopMeshes = new Map();
  /** roomId -> the flat hit target in its doorway, group room or not. A room
   *  with no lesson still has a sign to read, and the world module needs
   *  something to hang that interaction on. */
  const roomDoors = new Map();

  const M = {
    wall:  mat('wall',  () => new THREE.MeshStandardMaterial({ map: paintTexture(P.palette.wall), roughness: 0.92, envMapIntensity: 0.5 })),
    base:  mat('base',  () => new THREE.MeshStandardMaterial({ color: P.palette.base, roughness: 0.55, metalness: 0.02, envMapIntensity: 0.6 })),
    rail:  mat('rail',  () => new THREE.MeshStandardMaterial({ color: P.palette.rail, roughness: 0.45, metalness: 0.25, envMapIntensity: 0.9 })),
    frame: mat('frame', () => new THREE.MeshStandardMaterial({ color: P.palette.frame, roughness: 0.4, metalness: 0.55, envMapIntensity: 1.0 })),
    glass: mat('glass', () => glassMaterial()),
    leaf:  mat('leaf',  () => new THREE.MeshStandardMaterial({ map: grainTexture(P.palette.door), roughness: 0.55, envMapIntensity: 0.7 })),
  };

  const box = (w, h, d, x, y, z, material, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.castShadow = true; m.receiveShadow = true;
    scene.add(m);
    return m;
  };
  const collide = (cx, cz, w, d, h = P.ceilingH) => {
    colliders.push(new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(cx, h / 2, cz), new THREE.Vector3(w, h, d)));
  };

  /** Partition with a coved base and, on spine runs, a crash rail. */
  function wall(x0, z0, x1, z1, opts = {}){
    const h = opts.height ?? P.ceilingH;
    const alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    const len = alongX ? Math.abs(x1 - x0) : Math.abs(z1 - z0);
    if(len < 0.01) return null;
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    const w = alongX ? len : P.wall;
    const d = alongX ? P.wall : len;
    const m = box(w, h, d, cx, h / 2, cz, opts.material ?? M.wall);
    if(!opts.noCollide) collide(cx, cz, w, d, h);
    if(opts.base !== false){
      const bh = 0.11;
      for(const s of (opts.baseSides ?? [-1, 1])){
        const b = box(alongX ? len : P.wall + 0.028, bh, alongX ? P.wall + 0.028 : len,
          cx + (alongX ? 0 : s * 0.014), bh / 2, cz + (alongX ? s * 0.014 : 0), M.base);
        b.castShadow = false;
      }
    }
    if(opts.rail){
      for(const s of (opts.railSides ?? [-1, 1])){
        box(alongX ? len : 0.055, 0.13, alongX ? 0.055 : len,
          cx + (alongX ? 0 : s * (P.wall / 2 + 0.03)), 0.92,
          cz + (alongX ? s * (P.wall / 2 + 0.03) : 0), M.rail);
      }
    }
    return m;
  }

  // ------------------------------------------------------------------ shell
  const spineFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(P.corridorHalfWidth * 2, envelope.z1 - envelope.z0),
    new THREE.MeshStandardMaterial({
      map: sheetFloorTexture(P.palette.floorSpine, 0.55),
      roughness: 0.34, metalness: 0.02, envMapIntensity: 0.55,
    }));
  spineFloor.rotation.x = -Math.PI / 2;
  spineFloor.position.set(0, 0.002, (envelope.z0 + envelope.z1) / 2);
  spineFloor.receiveShadow = true;
  scene.add(spineFloor);

  const roomFloorMat = new THREE.MeshStandardMaterial({
    map: sheetFloorTexture(P.palette.floorRoom, 0.5),
    roughness: 0.36, metalness: 0.02, envMapIntensity: 0.55,
  });
  for(const side of [-1, 1]){
    const w = envelope.x1 - P.corridorHalfWidth;
    const f = new THREE.Mesh(new THREE.PlaneGeometry(w, envelope.z1 - envelope.z0), roomFloorMat);
    f.rotation.x = -Math.PI / 2;
    f.position.set(side * (P.corridorHalfWidth + w / 2), 0.001, (envelope.z0 + envelope.z1) / 2);
    f.receiveShadow = true;
    scene.add(f);
  }

  wall(envelope.x0, envelope.z0, envelope.x1, envelope.z0, { baseSides: [1] });
  wall(envelope.x0, envelope.z1, envelope.x1, envelope.z1, { baseSides: [-1] });
  wall(envelope.x0, envelope.z0, envelope.x0, envelope.z1, { baseSides: [1] });
  wall(envelope.x1, envelope.z0, envelope.x1, envelope.z1, { baseSides: [-1] });

  // End glazing — the daylight source and the only view out.
  const winMat = new THREE.MeshStandardMaterial({
    color: 0xdfeaf0, emissive: 0xdfeaf0, emissiveIntensity: 0.85, roughness: 0.1, metalness: 0.1,
  });
  for(const [zz, ry] of [[envelope.z0 + 0.11, 0], [envelope.z1 - 0.11, Math.PI]]){
    for(const dx of [-5.4, -1.8, 1.8, 5.4]){
      const w = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.7), winMat);
      w.position.set(dx, 1.65, zz); w.rotation.y = ry;
      scene.add(w);
      lightPanels.push(w);
      box(3.12, 1.82, 0.05, dx, 1.65, zz + (ry ? -0.03 : 0.03), M.frame).castShadow = false;
    }
  }

  // Suspended ceiling on a 600 mm grid.
  const ceilTex = ceilingTileTexture();
  ceilTex.repeat.set((envelope.x1 - envelope.x0) / 2.4, (envelope.z1 - envelope.z0) / 2.4);
  const ceil = new THREE.Mesh(
    new THREE.PlaneGeometry(envelope.x1 - envelope.x0, envelope.z1 - envelope.z0),
    new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.96, envMapIntensity: 0.4 }));
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, P.tileH, (envelope.z0 + envelope.z1) / 2);
  ceil.receiveShadow = true;
  scene.add(ceil);

  // Recessed fixtures, air grilles and sprinklers. These are *emissive panels*,
  // not lights: see rule 1 in THEME_CONTRACT.md.
  const diffTex = diffuserTexture();
  const troffMat = new THREE.MeshStandardMaterial({
    map: diffTex, emissive: 0xffffff, emissiveMap: diffTex, emissiveIntensity: 1.0, roughness: 0.5,
  });
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0xd6d8d6, roughness: 0.6, metalness: 0.3 });
  for(let z = envelope.z0 + 3; z < envelope.z1; z += 3.0){
    for(const dx of [0, -5.4, 5.4]){
      const t = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), troffMat);
      t.rotation.x = Math.PI / 2;
      t.position.set(dx, P.tileH - 0.012, z + (dx ? 1.5 : 0));
      scene.add(t);
      lightPanels.push(t);
    }
    const gr = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.58), grilleMat);
    gr.rotation.x = Math.PI / 2;
    gr.position.set(srandRange(-1.2, 1.2), P.tileH - 0.008, z + 1.5);
    scene.add(gr);
    const spr = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.02, 0.07, 6), M.rail);
    spr.position.set(srandRange(-1.4, 1.4), P.tileH - 0.045, z - 0.9);
    scene.add(spr);
  }

  // ------------------------------------------------------------------ rooms
  function partition(r){
    const b = bounds(r);
    const x = b.xInner;
    if(r.open){
      const nib = 0.9;
      wall(x, r.z0, x, r.z0 + nib, { rail: true });
      wall(x, r.z1 - nib, x, r.z1, { rail: true });
      box(P.wall, 0.55, (r.z1 - nib) - (r.z0 + nib), x, P.ceilingH - 0.275, b.cz, M.wall);
      return null;
    }
    const dw = doorWidth(r), cz = b.cz;
    wall(x, r.z0, x, cz - dw / 2 - 0.06, { rail: true });
    wall(x, cz + dw / 2 + 0.06, x, r.z1, { rail: true });
    box(P.wall, P.ceilingH - P.doorH, dw + 0.12, x, P.doorH + (P.ceilingH - P.doorH) / 2, cz, M.wall);
    return { x, cz, dw };
  }

  function door(r, opening){
    const { x, cz, dw } = opening;
    const s = bounds(r).sign;
    const leaf = new THREE.Group();
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.045, P.doorH - 0.04, dw - 0.03), M.leaf);
    panel.position.z = -(dw - 0.03) / 2;
    leaf.add(panel);
    const vp = new THREE.Mesh(new THREE.PlaneGeometry(dw * 0.34, 0.62), M.glass);
    vp.rotation.y = Math.PI / 2;
    vp.position.set(0.024, P.doorH * 0.30, -(dw - 0.03) / 2);
    leaf.add(vp);
    const vpF = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.70, dw * 0.40), M.frame);
    vpF.position.set(0, P.doorH * 0.30, -(dw - 0.03) / 2);
    leaf.add(vpF);
    const kick = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.26, dw - 0.06), M.rail);
    kick.position.set(0, -P.doorH / 2 + 0.16, -(dw - 0.03) / 2);
    leaf.add(kick);
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.035, 0.035), M.rail);
    lever.position.set(s * 0.08, 0, -(dw - 0.20));
    leaf.add(lever);
    leaf.position.set(x, P.doorH / 2, cz + dw / 2);
    leaf.rotation.y = s * 0.30;                     // left ajar, so it reads as enterable
    leaf.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
    scene.add(leaf);

    // frame
    for(const sz of [-1, 1]){
      box(P.wall + 0.05, P.doorH + 0.09, 0.09, x, (P.doorH + 0.09) / 2, cz + sz * (dw / 2 + 0.045), M.frame);
    }
    box(P.wall + 0.05, 0.09, dw + 0.18, x, P.doorH + 0.045, cz, M.frame);

    // A flat target in the opening, reliable whichever way the leaf swung.
    const hit = new THREE.Mesh(new THREE.PlaneGeometry(dw, P.doorH),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
    hit.position.set(x, P.doorH / 2, cz);
    hit.rotation.y = Math.PI / 2;
    scene.add(hit);
    return { leaf, hit };
  }

  const ctx = {
    scene, plan, geo, P, box, wall, collide,
    materials: M,
    soft: (x, z, r) => softColliders.push({ x, z, r }),
    hard: (cx, cz, w, d, h) => collide(cx, cz, w, d, h),
    addInteractable: (i) => interactables.push(i),
    lightPanels,
  };

  for(const r of plan.rooms){
    const b = bounds(r);
    const opening = partition(r);
    wall(b.xInner, r.z0, b.xOuter, r.z0, { baseSides: [-1, 1] });   // cross-wall

    if(opening){
      const d = door(r, opening);
      roomDoors.set(r.id, d.hit);
      if(r.group){
        stopMeshes.set(r.group, {
          room: r, doorMesh: d.hit, leaf: d.leaf,
          pos: new THREE.Vector3(b.cx, 0, b.cz),
          entry: geo.entry(r),
          sign: b.sign,
        });
      }
      ctx.doorHit = d.hit;
    } else {
      ctx.doorHit = null;
    }
    if(hooks.fitOutRoom) hooks.fitOutRoom(r, { ...ctx, bounds: b, opening });
  }
  // close the far end of the last room each side
  for(const side of ['w', 'e']){
    const last = plan.rooms.filter(r => r.side === side).pop();
    if(last){
      const b = bounds(last);
      wall(b.xInner, last.z1, b.xOuter, last.z1, { baseSides: [-1, 1] });
    }
  }
  if(hooks.fitOutSpine) hooks.fitOutSpine(ctx);

  return { geo, colliders, softColliders, interactables, stopMeshes, roomDoors,
           lightPanels, groundHeight: () => 0 };
}

/**
 * Interior light rig: ambient plus hemisphere carry the room, one directional
 * does every contact shadow on the floor, and a small number of point lights
 * give pooling. See rule 1 — a fixture per troffer is unaffordable.
 */
export function buildInteriorLighting(scene, renderer, plan, opts = {}){
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.04);
  scene.environment = envRT.texture;
  scene.userData.envRT = envRT;
  pmrem.dispose();

  const ambient = new THREE.AmbientLight(opts.ambientColour ?? 0xdfe6ea, opts.ambient ?? 0.95);
  const hemi = new THREE.HemisphereLight(0xf2f6f7, 0x9aa0a4, opts.hemi ?? 0.55);
  scene.add(ambient, hemi);

  const key = new THREE.DirectionalLight(0xf4f6f2, opts.key ?? 1.35);
  const midZ = (plan.spine.z0 + plan.spine.z1) / 2;
  key.position.set(2.5, 24, midZ);
  key.target.position.set(0, 0, midZ);
  key.castShadow = true;
  const res = renderer.capabilities.maxTextureSize >= 8192 ? 4096 : 2048;
  key.shadow.mapSize.set(res, res);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 46;
  key.shadow.camera.left = -12; key.shadow.camera.right = 12;
  key.shadow.camera.top = (plan.spine.z1 - plan.spine.z0) / 2 + 6;
  key.shadow.camera.bottom = -key.shadow.camera.top;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key.target, key);

  const fixtures = [];
  const n = opts.pointLights ?? 4;               // hard ceiling: see rule 1
  const span = plan.spine.z1 - plan.spine.z0;
  for(let i = 0; i < n; i++){
    const l = new THREE.PointLight(0xeaf2f4, 5.5, 17, 2);
    l.position.set(0, (plan.metrics?.tileH ?? DEFAULTS.tileH) - 0.15,
                   plan.spine.z0 + span * (i + 0.5) / n);
    scene.add(l);
    fixtures.push(l);
  }

  const day = new THREE.DirectionalLight(0xfff0d8, 0.85);
  day.position.set(0, 6, plan.spine.z0 - 14);
  day.target.position.set(0, 1.4, plan.spine.z0 + 12);
  scene.add(day.target, day);

  scene.userData.ambient = ambient;
  scene.userData.hemi = hemi;
  scene.userData.key = key;
  scene.userData.day = day;
  scene.userData.fixtures = fixtures;
  return { ambient, hemi, key, day, fixtures };
}

/** Day / evening / night for a building that never fully goes dark. */
export function updateInteriorTimeOfDay(scene, renderer, hours, lightPanels = []){
  const u = scene.userData;
  if(!u.key) return;
  const h = (((hours ?? 8) % 24) + 24) % 24;
  const isNight = h < 6.5 || h >= 19.5;
  const dusk = (h >= 17.5 && h < 19.5) || (h >= 6.5 && h < 8);
  const level = isNight ? 0.42 : dusk ? 0.78 : 1.0;

  u.key.intensity = (u.key.userData.base ??= u.key.intensity) * level;
  u.ambient.intensity = (u.ambient.userData.base ??= u.ambient.intensity) * (isNight ? 0.55 : 1);
  if(u.hemi) u.hemi.intensity = (u.hemi.userData.base ??= u.hemi.intensity) * (isNight ? 0.5 : 1);
  (u.fixtures || []).forEach((l, i) => {
    const base = (l.userData.base ??= l.intensity);
    l.intensity = (isNight && i % 2 === 1) ? 0 : base * level;   // half switched off overnight
  });
  u.day.intensity = isNight ? 0.05 : dusk ? 0.45 : 0.85;
  u.day.color.setHex(dusk ? 0xffd9a8 : 0xfff0d8);
  lightPanels.forEach(p => {
    if(p.material?.emissiveIntensity !== undefined){
      p.material.emissiveIntensity = (p.userData.base ??= p.material.emissiveIntensity) * level;
    }
  });
  renderer.toneMappingExposure = isNight ? 1.22 : 1.0;
  return { isNight, dusk, level };
}
