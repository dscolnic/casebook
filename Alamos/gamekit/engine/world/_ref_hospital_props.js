// hospitalProps.js — the equipment that makes a room a hospital room.
//
// A ward reads as real from three things: the wall furniture nobody thinks
// about (sanitiser, glove boxes, oxygen outlets, call-light domes), the
// trolleys parked wherever there was space, and the fact that every room has
// a sink. Those are cheap boxes; the realism is in putting them where they
// actually go.
import * as THREE from 'three';
import { ROOMS, roomBounds, CORRIDOR, WALL, TILE_H, DOOR_W, DOOR_W_WIDE, WAITING_CHAIRS } from './plan.js';
import { srand, srandRange } from './interiorEnv.js';

let scene = null;
const softColliders = [];
const hardBoxes = [];

const M = {};
function initMaterials(){
  const std = (color, roughness, metalness = 0, envMapIntensity = 0.7) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, envMapIntensity });
  Object.assign(M, {
    steel:     std(0xb7bcc0, 0.32, 0.72, 1.0),
    steelDark: std(0x71777c, 0.4, 0.6, 0.9),
    chrome:    std(0xd8dde0, 0.14, 0.9, 1.2),
    laminate:  std(0xe4e0d6, 0.55, 0.02, 0.7),
    lamWarm:   std(0xd8c8a8, 0.6, 0.02, 0.6),
    vinylSeat: std(0x3f6f86, 0.62, 0.02, 0.6),
    vinylSeat2:std(0x7a8b52, 0.62, 0.02, 0.6),
    sheet:     std(0xf2f4f4, 0.9, 0, 0.5),
    blanket:   std(0x8fa8bb, 0.92, 0, 0.5),
    curtain:   std(0xbfd0d4, 0.95, 0, 0.4),
    screenOn:  new THREE.MeshStandardMaterial({ color: 0x0e1a1e, emissive: 0x1f6f6a, emissiveIntensity: 0.75, roughness: 0.25, metalness: 0.1 }),
    screenOff: std(0x1a1f22, 0.3, 0.3, 0.9),
    plastic:   std(0xdfe3e3, 0.6, 0.02, 0.6),
    plasticBlue: std(0x5b8fb0, 0.55, 0.02, 0.6),
    rubber:    std(0x24262a, 0.9, 0, 0.3),
    paperRoll: std(0xf6f5ef, 0.95, 0, 0.4),
    red:       std(0xa8352c, 0.6, 0.05, 0.7),
    yellow:    std(0xc9a227, 0.6, 0.05, 0.7),
    green:     std(0x3f7d5a, 0.6, 0.05, 0.7),
    wood:      std(0xb08c5e, 0.7, 0.02, 0.6),
    plant:     std(0x4d7a4a, 0.9, 0, 0.4),
  });
}

// ------------------------------------------------------------------ helpers
function box(w, h, d, x, y, z, material, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
function cyl(rt, rb, h, x, y, z, material, seg = 10, ry = 0){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
function soft(x, z, r){ softColliders.push({ x, z, r }); }
function hard(cx, cz, w, d, h = 1.0){
  hardBoxes.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(cx, h / 2, cz), new THREE.Vector3(w, h, d)
  ));
}

// ------------------------------------------------------------- wall furniture
/** Alcohol gel dispenser — beside every single door, without exception. */
function sanitiser(x, z, faceX){
  box(0.09, 0.24, 0.11, x + faceX * 0.055, 1.32, z, M.plastic);
  box(0.07, 0.05, 0.09, x + faceX * 0.07, 1.19, z, M.plasticBlue);
  box(0.12, 0.02, 0.14, x + faceX * 0.05, 1.455, z, M.steel);
}
/** Wall bracket holding three glove cartons, small / medium / large. */
function gloveBoxes(x, z, faceX){
  const cols = [0x6f8fa8, 0x9a7f9c, 0x7f9a86];
  for(let i = 0; i < 3; i++){
    box(0.075, 0.13, 0.24, x + faceX * 0.06, 1.42, z + (i - 1) * 0.27,
        new THREE.MeshStandardMaterial({ color: cols[i], roughness: 0.75, envMapIntensity: 0.6 }));
  }
  box(0.02, 0.16, 0.84, x + faceX * 0.022, 1.42, z, M.steelDark);
}
/** Call-light dome over the door: the little coloured lamp on every ward. */
function callDome(x, z, faceX, colour = 0xdfe3e3){
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.25, roughness: 0.5 })
  );
  dome.rotation.z = faceX > 0 ? -Math.PI / 2 : Math.PI / 2;
  dome.position.set(x + faceX * 0.04, 2.52, z);
  scene.add(dome);
}
/** Fire extinguisher in a recessed cabinet. */
function extinguisher(x, z, faceX){
  box(0.11, 0.62, 0.28, x + faceX * 0.07, 1.15, z, M.red);
  cyl(0.075, 0.075, 0.42, x + faceX * 0.11, 1.12, z, M.red, 10);
  box(0.02, 0.7, 0.34, x + faceX * 0.02, 1.15, z, M.steelDark);
}
/** Medical gas outlets — oxygen, air, suction — on a headwall rail. */
function gasOutlets(x, z, faceX, n = 3){
  const cols = [0x4f8f5a, 0xf0f0ee, 0xd8d8d0];
  box(0.05, 0.20, 0.72, x + faceX * 0.03, 1.42, z, M.laminate);
  for(let i = 0; i < n; i++){
    cyl(0.032, 0.032, 0.07, x + faceX * 0.075, 1.42, z + (i - (n - 1) / 2) * 0.2,
        new THREE.MeshStandardMaterial({ color: cols[i % 3], roughness: 0.4, metalness: 0.3 }), 8);
  }
}
/** Stainless scrub sink with a gooseneck and elbow taps. */
function sink(x, z, faceX){
  box(0.42, 0.14, 0.56, x + faceX * 0.24, 0.86, z, M.steel);
  box(0.36, 0.10, 0.46, x + faceX * 0.24, 0.83, z, M.steelDark);
  cyl(0.018, 0.018, 0.30, x + faceX * 0.07, 1.05, z, M.chrome, 8);
  const spout = cyl(0.016, 0.016, 0.20, x + faceX * 0.15, 1.19, z, M.chrome, 8);
  spout.rotation.z = Math.PI / 2 * faceX;
  for(const dz of [-0.13, 0.13]) box(0.13, 0.028, 0.028, x + faceX * 0.12, 1.02, z + dz, M.chrome);
  // paper towel and waste bin, which always follow a sink
  box(0.10, 0.26, 0.22, x + faceX * 0.06, 1.45, z + 0.45, M.steelDark);
  cyl(0.16, 0.14, 0.5, x + faceX * 0.36, 0.25, z + 0.6, M.plastic, 10);
  soft(x + faceX * 0.36, z + 0.6, 0.22);
  hard(x + faceX * 0.24, z, 0.5, 0.6, 0.95);
}
/** Sharps bin, always wall-mounted and always yellow. */
function sharps(x, z, faceX){
  box(0.14, 0.24, 0.19, x + faceX * 0.085, 1.28, z, M.yellow);
  box(0.15, 0.04, 0.20, x + faceX * 0.088, 1.41, z, M.red);
}

// ------------------------------------------------------------------ furniture
/** Waiting-room chair: tube frame, wipe-clean seat, linked arms. */
export function chair(x, z, ry, seatMat = M.vinylSeat){
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.46), seatMat);
  seat.position.y = 0.44; seat.castShadow = true; g.add(seat);
  const backRest = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.46, 0.08), seatMat);
  backRest.position.set(0, 0.70, -0.20); backRest.rotation.x = -0.10; backRest.castShadow = true; g.add(backRest);
  for(const sx of [-1, 1]){
    for(const sz of [-1, 1]){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.42, 6), M.chrome);
      leg.position.set(sx * 0.2, 0.21, sz * 0.19); g.add(leg);
    }
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.42), M.chrome);
    arm.position.set(sx * 0.24, 0.62, -0.02); g.add(arm);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.2, 6), M.chrome);
    post.position.set(sx * 0.24, 0.52, 0.16); g.add(post);
  }
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  soft(x, z, 0.34);
  return g;
}

/** Gurney / exam trolley: adjustable frame, mattress, side rails, castors. */
function gurney(x, z, ry, opts = {}){
  const g = new THREE.Group();
  const h = opts.height ?? 0.72;
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.10, 1.92), M.steelDark);
  base.position.y = h - 0.09; g.add(base);
  const mattress = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 1.88), M.sheet);
  mattress.position.y = h + 0.03; g.add(mattress);
  if(opts.blanket !== false){
    const bl = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.05, 1.05), M.blanket);
    bl.position.set(0, h + 0.12, 0.35); g.add(bl);
  }
  // raised backrest, as trolleys are almost always left
  const backRest = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.13, 0.62), M.sheet);
  backRest.position.set(0, h + 0.18, -0.66);
  backRest.rotation.x = -0.55; g.add(backRest);
  // side rails
  for(const sx of [-1, 1]){
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.30, 0.86), M.chrome);
    rail.position.set(sx * 0.36, h + 0.24, -0.16); g.add(rail);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.9, 6), M.chrome);
    top.rotation.x = Math.PI / 2;
    top.position.set(sx * 0.36, h + 0.38, -0.16); g.add(top);
  }
  // column and castors
  const col = new THREE.Mesh(new THREE.BoxGeometry(0.24, h - 0.24, 0.5), M.steel);
  col.position.y = (h - 0.24) / 2 + 0.1; g.add(col);
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 8), M.rubber);
    c.rotation.z = Math.PI / 2;
    c.position.set(sx * 0.26, 0.055, sz * 0.72); g.add(c);
  }
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  const along = Math.abs(Math.cos(ry));
  hard(x, z, 0.8 * along + 2.0 * (1 - along), 2.0 * along + 0.8 * (1 - along), 1.0);
  return g;
}

/** Exam couch with a paper roll, which is the giveaway detail. */
function examCouch(x, z, ry){
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.55, 1.75), M.laminate);
  base.position.y = 0.28; g.add(base);
  const pad = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.14, 1.80), M.vinylSeat);
  pad.position.y = 0.63; g.add(pad);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.13, 0.55), M.vinylSeat);
  head.position.set(0, 0.72, -0.66); head.rotation.x = -0.42; g.add(head);
  // paper roll and the sheet running down the couch
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.62, 10), M.paperRoll);
  roll.rotation.z = Math.PI / 2;
  roll.position.set(0, 0.86, -0.92); g.add(roll);
  const paper = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.006, 1.5), M.paperRoll);
  paper.position.set(0, 0.705, -0.1); g.add(paper);
  // pull-out step
  const step = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.28), M.steelDark);
  step.position.set(0, 0.16, 0.98); g.add(step);
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  const along = Math.abs(Math.cos(ry));
  hard(x, z, 0.75 * along + 1.9 * (1 - along), 1.9 * along + 0.75 * (1 - along), 0.9);
  return g;
}

/** Vital-signs monitor on a rolling stand. */
function monitor(x, z, ry, onWall = false, wallFace = 1){
  if(onWall){
    box(0.10, 0.30, 0.40, x + wallFace * 0.06, 1.62, z, M.screenOff);
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.24), M.screenOn);
    s.position.set(x + wallFace * 0.115, 1.62, z);
    s.rotation.y = wallFace > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(s);
    return;
  }
  const g = new THREE.Group();
  cyl(0.028, 0.028, 1.25, 0, 0.62, 0, M.chrome, 8).parent && null;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1.25, 8), M.chrome);
  pole.position.y = 0.62; g.add(pole);
  const bodyM = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.28, 0.14), M.screenOff);
  bodyM.position.y = 1.32; g.add(bodyM);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.20), M.screenOn);
  face.position.set(0, 1.32, 0.075); g.add(face);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.04, 10), M.steelDark);
  foot.position.y = 0.03; g.add(foot);
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; } });
  scene.add(g);
  soft(x, z, 0.28);
}

/** IV pole with a bag hanging off it. */
function ivPole(x, z){
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 1.85, 8), M.chrome);
  pole.position.y = 0.93; g.add(pole);
  for(let i = 0; i < 4; i++){
    const a = i * Math.PI / 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 6), M.chrome);
    leg.position.set(Math.cos(a) * 0.13, 0.06, Math.sin(a) * 0.13);
    leg.rotation.z = Math.cos(a) * 0.9;
    leg.rotation.x = -Math.sin(a) * 0.9;
    g.add(leg);
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 5), M.rubber);
    c.position.set(Math.cos(a) * 0.22, 0.028, Math.sin(a) * 0.22); g.add(c);
  }
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.014, 0.014), M.chrome);
  hook.position.y = 1.84; g.add(hook);
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.26, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xdff0f4, roughness: 0.25, metalness: 0.05, transparent: true, opacity: 0.85 }));
  bag.position.set(0.08, 1.68, 0); g.add(bag);
  const line = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.9, 4), M.plastic);
  line.position.set(0.08, 1.1, 0.02); g.add(line);
  g.position.set(x, 0, z);
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
  soft(x, z, 0.24);
}

/** Computer on wheels — the workstation staff push around all day. */
function workstationCart(x, z, ry){
  const g = new THREE.Group();
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 1.0, 8), M.steel);
  col.position.y = 0.5; g.add(col);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.05, 0.40), M.laminate);
  deck.position.y = 1.02; g.add(deck);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.30, 0.035), M.screenOff);
  screen.position.set(0, 1.26, -0.10); screen.rotation.x = 0.14; g.add(screen);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.37, 0.25), M.screenOn);
  face.position.set(0, 1.262, -0.078); face.rotation.x = 0.14; g.add(face);
  const kb = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.02, 0.15), M.plastic);
  kb.position.set(0, 1.06, 0.09); g.add(kb);
  const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.34), M.plastic);
  drawer.position.y = 0.72; g.add(drawer);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.46), M.steelDark);
  foot.position.y = 0.05; g.add(foot);
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
  soft(x, z, 0.34);
}

/** Linen / supply trolley, parked against a corridor wall. */
function supplyCart(x, z, ry, tone = M.plastic){
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.88, 0.98), tone);
  body.position.y = 0.56; g.add(body);
  for(let i = 0; i < 3; i++){
    const dr = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.9), M.steelDark);
    dr.position.set(0.29, 0.30 + i * 0.27, 0); g.add(dr);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.04, 1.02), M.laminate);
  top.position.y = 1.02; g.add(top);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.55, 6), M.chrome);
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 1.06, 0.53); g.add(handle);
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 8), M.rubber);
    c.rotation.z = Math.PI / 2;
    c.position.set(sx * 0.22, 0.045, sz * 0.4); g.add(c);
  }
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
  const along = Math.abs(Math.cos(ry));
  hard(x, z, 0.65 * along + 1.1 * (1 - along), 1.1 * along + 0.65 * (1 - along), 1.05);
}

/** Wheelchair parked where someone left it. */
function wheelchair(x, z, ry){
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.06, 0.42), M.rubber);
  seat.position.y = 0.50; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.46, 0.05), M.rubber);
  back.position.set(0, 0.74, -0.20); g.add(back);
  for(const sx of [-1, 1]){
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.022, 6, 18), M.rubber);
    wheel.position.set(sx * 0.27, 0.30, -0.02); g.add(wheel);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.012, 5, 16), M.chrome);
    rim.position.set(sx * 0.30, 0.30, -0.02); g.add(rim);
    const cast = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 5, 12), M.rubber);
    cast.position.set(sx * 0.20, 0.09, 0.40); g.add(cast);
    const push = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 6), M.chrome);
    push.position.set(sx * 0.22, 0.94, -0.24); g.add(push);
    const rest = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.03, 0.2), M.steelDark);
    rest.position.set(sx * 0.16, 0.16, 0.46); g.add(rest);
  }
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
  soft(x, z, 0.42);
}

/**
 * Base cabinet run with a worktop — the spine of every clinical room.
 * `wallX` is the face of the wall it stands against and `inward` points from
 * that wall toward the middle of the room. The run is *offset* from the wall by
 * half its depth; mirroring the group with a negative scale instead left half
 * the carcass buried in the wall and pushed the wall cupboards into the room.
 */
function casework(wallX, z, len, inward){
  const depth = 0.58;
  const x = wallX + inward * (depth / 2);
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(depth, 0.86, len), M.laminate);
  body.position.y = 0.43; g.add(body);
  const top = new THREE.Mesh(new THREE.BoxGeometry(depth + 0.05, 0.045, len + 0.04), M.lamWarm);
  top.position.y = 0.885; g.add(top);
  const n = Math.max(2, Math.round(len / 0.6));
  for(let i = 0; i < n; i++){
    const dz = -len / 2 + len * (i + 0.5) / n;
    const pull = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.2), M.chrome);
    pull.position.set(inward * (depth / 2 - 0.02), 0.66, dz); g.add(pull);
    // door shadow gap between carcasses
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.84, 0.01), M.steelDark);
    line.position.set(inward * (depth / 2 + 0.002), 0.43, dz + len / n / 2); g.add(line);
  }
  // Wall cupboards, hung back against the wall with a valance under them so
  // they read as boxes with a bottom rather than a floating panel.
  const upDepth = 0.34;
  const upper = new THREE.Mesh(new THREE.BoxGeometry(upDepth, 0.7, len * 0.82), M.laminate);
  upper.position.set(wallX + inward * (upDepth / 2) - x, 1.85, 0); g.add(upper);
  const valance = new THREE.Mesh(new THREE.BoxGeometry(upDepth + 0.03, 0.05, len * 0.84), M.steelDark);
  valance.position.set(wallX + inward * (upDepth / 2) - x, 1.48, 0); g.add(valance);
  g.position.set(x, 0, z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  hard(x, z, depth + 0.1, len, 0.95);
}

/** Cubicle curtain hanging from a ceiling track. */
function curtain(x0, z0, x1, z1, closed = 0.6){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const ry = Math.atan2(x1 - x0, z1 - z0);
  const track = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, len), M.steel);
  track.position.set((x0 + x1) / 2, TILE_H - 0.35, (z0 + z1) / 2);
  track.rotation.y = ry;
  scene.add(track);
  const drapeLen = len * closed;
  const geo = new THREE.PlaneGeometry(drapeLen, 1.85, Math.max(8, Math.round(drapeLen * 6)), 1);
  const pos = geo.attributes.position;
  for(let i = 0; i < pos.count; i++){
    // gathered folds, so the curtain is not a flat card
    pos.setZ(i, Math.sin(pos.getX(i) * 7.5) * 0.055);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const drape = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0xbfd0d4, roughness: 0.96, side: THREE.DoubleSide, envMapIntensity: 0.4,
  }));
  const t = (drapeLen / 2) / len;
  drape.position.set(x0 + (x1 - x0) * t, 1.42, z0 + (z1 - z0) * t);
  drape.rotation.y = ry + Math.PI / 2;
  drape.castShadow = true;
  scene.add(drape);
}

/** Backlit X-ray viewer with a film clipped to it. */
function lightBox(x, z, faceX){
  box(0.07, 0.62, 0.86, x + faceX * 0.05, 1.55, z, M.steel);
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.55),
    new THREE.MeshStandardMaterial({ color: 0xf2f6f8, emissive: 0xdfeaf0, emissiveIntensity: 0.9, roughness: 0.4 })
  );
  panel.position.set(x + faceX * 0.09, 1.55, z);
  panel.rotation.y = faceX > 0 ? -Math.PI / 2 : Math.PI / 2;
  scene.add(panel);
  // a film, darker than the panel
  const film = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.46),
    new THREE.MeshStandardMaterial({ color: 0x2c3a44, emissive: 0x44606e, emissiveIntensity: 0.4, roughness: 0.5 })
  );
  film.position.set(x + faceX * 0.095, 1.55, z + 0.16);
  film.rotation.y = faceX > 0 ? -Math.PI / 2 : Math.PI / 2;
  scene.add(film);
}

/** Snellen eye chart — instantly readable as an eye clinic. */
function eyeChart(x, z, faceX){
  const c = document.createElement('canvas');
  c.width = 256; c.height = 384;
  const g = c.getContext('2d');
  g.fillStyle = '#fbfbf8'; g.fillRect(0, 0, 256, 384);
  g.fillStyle = '#15181b';
  g.textAlign = 'center';
  const rows = [['E', 64], ['F P', 44], ['T O Z', 34], ['L P E D', 26], ['P E C F D', 20], ['E D F C Z P', 15]];
  let y = 78;
  rows.forEach(([txt, size]) => {
    g.font = `700 ${size}px Helvetica, Arial, sans-serif`;
    g.fillText(txt, 128, y);
    y += size + 22;
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.63),
    new THREE.MeshStandardMaterial({ map: t, roughness: 0.85, envMapIntensity: 0.5 })
  );
  m.position.set(x + faceX * 0.055, 1.55, z);
  m.rotation.y = faceX > 0 ? -Math.PI / 2 : Math.PI / 2;
  scene.add(m);
}

/** Open shelving stacked with folded linen and boxes. */
function shelving(x, z, len, faceX){
  for(let s = 0; s < 4; s++){
    box(0.46, 0.03, len, x + faceX * 0.26, 0.42 + s * 0.48, z, M.steel);
  }
  for(const sz of [-1, 1]){
    box(0.05, 1.95, 0.05, x + faceX * 0.26, 0.98, z + sz * (len / 2 - 0.03), M.steelDark);
  }
  const tones = [0xe8e6df, 0xd4dde2, 0xdfe6d8, 0xe6dcd2];
  for(let s = 0; s < 4; s++){
    for(let i = 0; i < Math.floor(len / 0.42); i++){
      if(srand() < 0.22) continue;
      const w = srandRange(0.22, 0.36);
      box(0.34, srandRange(0.14, 0.3), w,
          x + faceX * 0.26, 0.42 + s * 0.48 + 0.12, z - len / 2 + 0.24 + i * 0.42,
          new THREE.MeshStandardMaterial({ color: tones[(i + s) % tones.length], roughness: 0.85, envMapIntensity: 0.5 }));
    }
  }
  hard(x + faceX * 0.26, z, 0.55, len, 2.0);
}

// ------------------------------------------------------------- room fit-outs
function fitRoom(r){
  const b = roomBounds(r);
  const f = b.sign;                  // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;    // just inside the corridor wall
  const outX = b.xOuter - f * 0.5;   // against the exterior wall
  const cz = b.cz;

  switch(r.kind){
    case 'reception': {
      // A counter you queue at, with a low accessible section.
      const cxA = b.xInner + f * 2.4;
      box(1.0, 1.05, 4.2, cxA, 0.525, cz - 0.6, M.laminate);
      box(1.18, 0.06, 4.3, cxA, 1.08, cz - 0.6, M.lamWarm);
      box(1.18, 0.06, 1.6, cxA, 0.78, cz + 2.2, M.lamWarm);   // low section
      box(1.0, 0.76, 1.6, cxA, 0.38, cz + 2.2, M.laminate);
      hard(cxA, cz, 1.2, 6.0, 1.1);
      for(let i = 0; i < 2; i++){
        const zz = cz - 1.6 + i * 2.0;
        const scr = box(0.30, 0.26, 0.04, cxA - f * 0.2, 1.24, zz, M.screenOff, 0);
        scr.rotation.y = f > 0 ? 0.3 : -0.3;
        const face = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.20), M.screenOn);
        face.position.set(cxA - f * 0.222, 1.24, zz);
        face.rotation.y = f > 0 ? -Math.PI / 2 + 0.3 : Math.PI / 2 - 0.3;
        scene.add(face);
      }
      shelving(outX, cz + 2, 3.0, -f);
      break;
    }
    case 'waiting': {
      // Seats first, from the shared layout, so anyone sitting has a chair.
      WAITING_CHAIRS.forEach(([cx, cz2, ry], i) =>
        chair(cx, cz2, ry, i % 2 ? M.vinylSeat2 : M.vinylSeat));
      box(0.7, 0.42, 0.7, b.xInner + f * 3.0, 0.21, cz + 3.0, M.wood);   // low table
      box(0.3, 0.02, 0.22, b.xInner + f * 3.0, 0.43, cz + 3.0, M.sheet);  // magazine
      // water cooler
      cyl(0.16, 0.16, 0.95, outX, 0.475, cz - 2.4, M.plastic, 10);
      cyl(0.13, 0.11, 0.42, outX, 1.2, cz - 2.4,
          new THREE.MeshStandardMaterial({ color: 0xcfe6ee, roughness: 0.2, metalness: 0.05, transparent: true, opacity: 0.8 }), 10);
      soft(outX, cz - 2.4, 0.24);
      // wall-mounted television on a bracket
      box(0.06, 0.46, 0.82, outX + 0.4 * -f * -1, 1.9, cz + 1.2, M.screenOff);
      const tv = new THREE.Mesh(new THREE.PlaneGeometry(0.76, 0.42), M.screenOn);
      tv.position.set(b.xOuter - f * 0.06, 1.9, cz + 1.2);
      tv.rotation.y = f > 0 ? Math.PI / 2 : -Math.PI / 2;
      scene.add(tv);
      // a pot plant, because every waiting room has one
      cyl(0.17, 0.13, 0.32, outX, 0.16, cz + 4.0, M.lamWarm, 10);
      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), M.plant);
      bush.position.set(outX, 0.56, cz + 4.0);
      bush.scale.set(1, 1.25, 1);
      bush.castShadow = true;
      scene.add(bush);
      soft(outX, cz + 4.0, 0.3);
      break;
    }
    case 'ed': {
      // Two trolley bays behind curtains, with headwall services.
      for(let i = 0; i < 2; i++){
        const zz = r.z0 + 2.6 + i * 4.2;
        gurney(outX - f * 0.4, zz, f > 0 ? -Math.PI / 2 : Math.PI / 2);
        gasOutlets(b.xOuter, zz - 0.9, -f, 3);
        monitor(b.xOuter - f * 0.55, zz - 1.5, 0, true, -f);
        ivPole(outX - f * 1.3, zz + 0.9);
        curtain(b.xInner + f * 0.8, zz + 2.0, b.xOuter - f * 0.4, zz + 2.0, 0.55);
      }
      sink(b.xOuter, r.z1 - 1.4, -f);
      workstationCart(inX + f * 0.6, r.z0 + 1.4, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      sharps(b.xOuter, r.z0 + 1.2, -f);
      break;
    }
    case 'exam': {
      examCouch(b.cx + f * 0.6, cz, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      casework(b.xOuter, cz + 2.2, 2.6, -f);
      sink(b.xOuter, cz + 3.6, -f);
      gasOutlets(b.xOuter, cz - 1.4, -f, 2);
      monitor(b.xInner + f * 1.2, cz - 2.4, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      chair(b.xInner + f * 1.3, cz + 1.4, f > 0 ? -Math.PI / 2 : Math.PI / 2, M.vinylSeat2);
      // stool, blood-pressure cuff, height rule
      cyl(0.17, 0.15, 0.06, b.cx - f * 0.9, 0.55, cz - 0.6, M.vinylSeat, 10);
      cyl(0.03, 0.03, 0.5, b.cx - f * 0.9, 0.28, cz - 0.6, M.chrome, 8);
      soft(b.cx - f * 0.9, cz - 0.6, 0.2);
      box(0.09, 0.20, 0.13, b.xOuter - f * 0.06, 1.45, cz - 0.2, M.plasticBlue);
      sharps(b.xOuter, cz + 0.6, -f);
      break;
    }
    case 'imaging': {
      // X-ray table with a tube column, a lead screen, and rehab bars beyond.
      box(0.78, 0.68, 2.1, b.cx + f * 0.4, 0.34, r.z0 + 3.0, M.laminate);
      box(0.84, 0.10, 2.2, b.cx + f * 0.4, 0.73, r.z0 + 3.0, M.sheet);
      const column = box(0.22, 2.2, 0.22, b.cx + f * 0.4, 1.1, r.z0 + 1.4, M.steel);
      box(0.5, 0.24, 0.5, b.cx + f * 0.4, 1.85, r.z0 + 2.3, M.steelDark);
      hard(b.cx + f * 0.4, r.z0 + 3.0, 1.0, 2.3, 0.85);
      // lead screen with a viewing window
      box(0.10, 1.95, 0.9, b.xInner + f * 1.0, 0.98, r.z0 + 5.4, M.steelDark);
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.42),
        new THREE.MeshStandardMaterial({ color: 0x9fb8bf, roughness: 0.12, metalness: 0.3, transparent: true, opacity: 0.55 }));
      win.position.set(b.xInner + f * 1.06, 1.5, r.z0 + 5.4);
      win.rotation.y = f > 0 ? -Math.PI / 2 : Math.PI / 2;
      scene.add(win);
      hard(b.xInner + f * 1.0, r.z0 + 5.4, 0.3, 1.0, 2.0);
      lightBox(b.xOuter, r.z0 + 5.6, -f);
      // parallel bars for rehab
      for(const sz of [-1, 1]){
        box(0.06, 0.06, 2.8, b.cx + f * 0.2 + sz * 0.5, 0.92, r.z1 - 2.4, M.wood);
        for(const dz of [-1.3, 1.3]){
          cyl(0.035, 0.04, 0.9, b.cx + f * 0.2 + sz * 0.5, 0.45, r.z1 - 2.4 + dz, M.steel, 8);
        }
      }
      break;
    }
    case 'senses': {
      eyeChart(b.xOuter, r.z0 + 2.0, -f);
      chair(b.cx, r.z0 + 5.2, f > 0 ? Math.PI / 2 : -Math.PI / 2, M.vinylSeat);
      // audiometry booth: a small glazed box in the corner
      box(1.9, 2.1, 1.9, b.xOuter - f * 1.0, 1.05, r.z1 - 1.6, M.laminate);
      const bw = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1b2126, roughness: 0.08, metalness: 0.8, envMapIntensity: 1.1 }));
      bw.position.set(b.xOuter - f * 1.0 - f * 0.96, 1.35, r.z1 - 1.6);
      bw.rotation.y = f > 0 ? -Math.PI / 2 : Math.PI / 2;
      scene.add(bw);
      hard(b.xOuter - f * 1.0, r.z1 - 1.6, 2.0, 2.0, 2.1);
      casework(b.xOuter, r.z0 + 4.2, 2.0, -f);
      sink(b.xOuter, r.z0 + 5.6, -f);
      lightBox(b.xInner, r.z0 + 3.0, f);
      break;
    }
    case 'lab': {
      casework(b.xOuter, cz - 1.0, 3.4, -f);
      casework(b.xInner, cz + 2.0, 2.2, f);
      sink(b.xOuter, cz + 2.4, -f);
      // microscopes on the bench
      for(let i = 0; i < 3; i++){
        const zz = cz - 2.2 + i * 1.2;
        const bx = b.xOuter - f * 0.32;
        cyl(0.09, 0.13, 0.10, bx, 0.96, zz, M.steelDark, 10);
        box(0.06, 0.26, 0.07, bx - f * 0.02, 1.12, zz, M.steelDark);
        const eye = cyl(0.028, 0.028, 0.16, bx - f * 0.10, 1.27, zz, M.steel, 8);
        eye.rotation.z = f * 0.5;
        soft(bx, zz, 0.12);
      }
      // sample racks and a biohazard bin
      for(let i = 0; i < 8; i++){
        cyl(0.011, 0.011, 0.09, b.xOuter - f * 0.5, 0.95, cz + 0.6 + i * 0.05,
            new THREE.MeshStandardMaterial({ color: i % 3 ? 0xc2434b : 0xd8c94a, roughness: 0.4 }), 6);
      }
      cyl(0.17, 0.15, 0.55, inX, 0.275, cz - 2.6, M.yellow, 10);
      soft(inX, cz - 2.6, 0.22);
      break;
    }
    case 'pharmacy': {
      // Service window onto the corridor, shelving behind.
      const wx = b.xInner;
      box(WALL + 0.04, 0.9, 1.6, wx, 0.45, cz, M.laminate);
      box(0.5, 0.05, 1.7, wx + f * 0.16, 0.93, cz, M.lamWarm);
      shelving(b.xOuter, cz, 4.0, -f);
      shelving(b.cx + f * 0.9, cz + 1.6, 2.4, -f);
      workstationCart(b.cx, cz - 2.0, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      break;
    }
    case 'station': {
      // High counter facing the corridor, low working desk behind it.
      const cxA = b.xInner + f * 1.1;
      box(0.7, 1.15, 5.0, cxA, 0.575, cz, M.laminate);
      box(0.86, 0.06, 5.1, cxA, 1.18, cz, M.lamWarm);
      hard(cxA, cz, 0.9, 5.1, 1.2);
      box(0.7, 0.74, 4.2, b.xInner + f * 2.6, 0.37, cz, M.laminate);
      box(0.8, 0.05, 4.3, b.xInner + f * 2.6, 0.76, cz, M.lamWarm);
      for(let i = 0; i < 3; i++){
        const zz = cz - 1.5 + i * 1.5;
        const scr = box(0.05, 0.30, 0.44, b.xInner + f * 2.35, 0.94, zz, M.screenOff);
        const face = new THREE.Mesh(new THREE.PlaneGeometry(0.40, 0.26), M.screenOn);
        face.position.set(b.xInner + f * 2.32, 0.94, zz);
        face.rotation.y = f > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(face);
      }
      shelving(b.xOuter, cz, 4.0, -f);
      workstationCart(b.xInner + f * 3.6, cz - 2.4, 0);
      break;
    }
    case 'supply': {
      shelving(b.xOuter, cz, Math.min(3.2, r.z1 - r.z0 - 0.8), -f);
      shelving(b.xInner, cz, Math.min(3.2, r.z1 - r.z0 - 0.8), f);
      supplyCart(b.cx, cz, 0);
      break;
    }
    case 'quiet': {
      for(let i = 0; i < 3; i++){
        chair(b.xOuter - f * 0.7, r.z0 + 1.6 + i * 0.95, f > 0 ? -Math.PI / 2 : Math.PI / 2, M.vinylSeat2);
      }
      cyl(0.18, 0.14, 0.34, b.cx, 0.17, r.z1 - 1.6, M.lamWarm, 10);
      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 0), M.plant);
      bush.position.set(b.cx, 0.6, r.z1 - 1.6);
      bush.castShadow = true;
      scene.add(bush);
      soft(b.cx, r.z1 - 1.6, 0.3);
      box(0.7, 0.4, 0.7, b.xInner + f * 1.2, 0.2, r.z0 + 2.4, M.wood);
      break;
    }
  }

  // Every room gets a sink except stores and the quiet room, and every room
  // that opens off the corridor gets a dome light and gel by the door.
  if(!r.open){
    const dw = r.door === 'wide' ? DOOR_W_WIDE : DOOR_W;
    sanitiser(b.xInner, cz - dw / 2 - 0.34, -f);   // corridor side
    callDome(b.xInner, cz, -f);
  }
}

// -------------------------------------------------------------- corridor kit
function fitCorridor(){
  const HW = CORRIDOR.halfWidth;
  // Wayfinding stripes let-in to the floor — the coloured lines you follow.
  const stripes = [
    { colour: 0x2f6f9e, x: -0.55, z0: -5, z1: 24 },
    { colour: 0x7d9a4a, x: -0.35, z0: -5, z1: 34 },
    { colour: 0xb0603f, x: -0.15, z0: -5, z1: 44 },
  ];
  stripes.forEach(s => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(0.075, s.z1 - s.z0),
      new THREE.MeshStandardMaterial({ color: s.colour, roughness: 0.35, metalness: 0.02, envMapIntensity: 0.5 })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(s.x, 0.006, (s.z0 + s.z1) / 2);
    scene.add(m);
  });

  // Things parked against the walls, alternating sides so the corridor stays
  // passable — which is exactly how a real ward corridor ends up.
  supplyCart(-HW + 0.42, 9.0, Math.PI / 2);
  supplyCart(HW - 0.42, 21.5, -Math.PI / 2, M.plasticBlue);
  supplyCart(-HW + 0.42, 35.0, Math.PI / 2);
  gurney(HW - 0.5, 14.5, Math.PI / 2, { blanket: false });
  gurney(-HW + 0.5, 29.0, -Math.PI / 2);
  wheelchair(HW - 0.45, 4.5, -Math.PI / 2 + 0.3);
  wheelchair(-HW + 0.45, 43.0, Math.PI / 2 - 0.2);
  workstationCart(HW - 0.45, 31.0, -Math.PI / 2);
  ivPole(-HW + 0.4, 17.5);
  ivPole(HW - 0.4, 37.0);

  // Wall furniture down both sides
  for(const [x, faceX] of [[-CORRIDOR.halfWidth, 1], [CORRIDOR.halfWidth, -1]]){
    extinguisher(x, faceX > 0 ? 6.4 : 26.4, faceX);
    gloveBoxes(x, faceX > 0 ? 19.0 : 12.0, faceX);
    gloveBoxes(x, faceX > 0 ? 37.0 : 33.0, faceX);
    for(let z = -2; z < 46; z += 11){
      // waste and recycling pairs
      cyl(0.16, 0.14, 0.6, x + faceX * 0.3, 0.3, z, M.plastic, 10);
      cyl(0.16, 0.14, 0.6, x + faceX * 0.3, 0.3, z + 0.42, M.plasticBlue, 10);
      soft(x + faceX * 0.3, z, 0.2);
      soft(x + faceX * 0.3, z + 0.42, 0.2);
    }
  }
}

/**
 * Fits out the whole floor.
 * @returns {{soft: Array, hard: Array}} collision data for world.js / player.js
 */
export function buildProps(targetScene){
  scene = targetScene;
  softColliders.length = 0;
  hardBoxes.length = 0;
  initMaterials();

  for(const r of ROOMS) fitRoom(r);
  fitCorridor();

  return { soft: softColliders.slice(), hard: hardBoxes.slice() };
}

export { M as PROP_MATERIALS };
