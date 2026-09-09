// story.js — Pellow Head, alive, and changing as the fifteen days do.
//
// The bible names nine "alive-world states" in §3 and fifteen prop states, one
// per mission, each at a named fixture: a bird feeding beside the sample cart,
// pond tanks that carry DAY and NIGHT readings and then read LOW OXYGEN, flowers
// near the nursery with few visitors while the dune trays stay visited, a held
// tissue tray behind a HOLD barrier, a ship that appears offshore on day 14 and
// a covered cart that goes to it on day 15 while the reserve shelf stays
// stocked. See gamekit/STORY_DRESSING_PASS.md §4; the numbers below are its list.
//
// `storyOutdoors` runs from `decorate`; `dressRoom` runs when a room is built.
// Every word on a label is the bible's own — a Physical action line, a Prop state,
// a State/output line, the mission header.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, patrol, spin } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

const TIMBER = () => mat('pellow.timber2', () => new THREE.MeshStandardMaterial({ color: 0x6b5a3e, roughness: 0.92 }));
const STEEL = () => MATERIALS.paintedSteel(0x7a8288);
const LEAF = (c) => mat(`pellow.leaf.${c}`, () => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }));
const PETAL = (c) => mat(`pellow.petal.${c}`, () => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }));

/** The bible's mission header, verbatim. */
const HEADER = (d) => `DAY ${Math.min(15, Math.max(1, d))} OF 15 — SHIP DEPARTS AFTER DAY 15`;

function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r), new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

/** A gull or wader: a body, a head, two wings that can beat. */
function bird(parent, colour = 0xe8e6df){
  const g = new THREE.Group();
  const m = mat(`pellow.bird.${colour}`, () => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.9 }));
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), m); body.scale.set(1.6, 0.9, 1); g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), m); head.position.set(0.24, 0.08, 0); g.add(head);
  const beak = box(g, 0.1, 0.02, 0.02, 0.34, 0.06, 0, MATERIALS.paintedSteel(0xc9962a));
  void beak;
  const wings = [];
  for(const s of [-1, 1]){
    const w = box(g, 0.32, 0.02, 0.5, 0, 0.06, s * 0.28, m);
    w.geometry = w.geometry.clone().translate(0, 0, s * 0.2);
    wings.push(w);
  }
  for(const s of [-1, 1]) cyl(g, 0.012, 0.18, 0.02, -0.19, s * 0.05, MATERIALS.paintedSteel(0xc9962a));
  parent.add(g);
  return { g, wings };
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);

  // 24. The Field Notice Board: tide, nesting and visiting hours, and the day
  //     header over it. 27. Sea haze most mornings, clear on the fifteenth.
  {
    const x = 10, z = 54, y = at(x, z);
    const header = statusPanel(scene, { x, y: y + 3.3, z: z + 0.16, rotY: 0, w: 3.0, h: 0.5, title: 'Field Notice Board', big: HEADER(1), tone: 'plain', lit: true });
    const tide = slip(scene, { x: x - 1.0, y: y + 1.35, z: z + 0.16, rotY: 0, w: 0.6, h: 0.36, text: ['TIDE'], sub: 'high 06:40 · 19:05', pin: true });
    const nesting = slip(scene, { x: x, y: y + 1.35, z: z + 0.16, rotY: 0, w: 0.6, h: 0.36, text: ['NESTING'], sub: 'eggs · keep to the boardwalk', pin: true });
    const hours = slip(scene, { x: x + 1.0, y: y + 1.35, z: z + 0.16, rotY: 0, w: 0.6, h: 0.36, text: ['VISITING HOURS'], sub: '10:00 – 16:00', pin: true });
    void tide; void hours;
    stateHooks?.push((state) => {
      const d = day(state);
      header.set({ big: HEADER(d), tone: d >= 15 ? 'ok' : 'plain' });
      nesting.set({ sub: d >= 11 ? 'chicks · keep to the boardwalk' : d >= 6 ? 'hatching · keep to the boardwalk' : 'eggs · keep to the boardwalk' });
      weather?.set?.(d >= 15 ? null : { kind: 'drizzle', density: d % 4 === 1 ? 0.3 : 0.08, wind: { x: 1.4, z: 2.0 } });
    });
  }

  // 1. A bird feeds beside the sample cart from mission 1.
  {
    const { g } = bird(scene, 0xe8e6df);
    const x = -12.4, z = 31.2;
    g.position.set(x, at(x, z), z); g.rotation.y = 2.4; g.visible = false;
    animate?.((t) => { g.rotation.x = Math.max(0, Math.sin(t * 2.2)) * 0.5; });
    stateHooks?.push((state) => { g.visible = n(state) >= 1; });
  }

  // 20. Birds that fly and land: a flock circles the marsh, settles on it, and
  //     lifts when the player comes near.
  {
    const cx = -78, cz = -150, y0 = at(cx, cz);
    const flock = [];
    for(let i = 0; i < 9; i++){
      const b = bird(scene, i % 3 ? 0xe8e6df : 0x5a5f66);
      b.g.position.set(cx + (i % 3) * 2 - 2, y0 + 0.1, cz + Math.floor(i / 3) * 2 - 2);
      b.g.rotation.y = i;
      flock.push({ ...b, home: b.g.position.clone(), phase: i * 0.7 });
    }
    let mode = 'settled', clock = 0;
    animate?.((t, dt, eye) => {
      clock += dt;
      const near = eye ? Math.hypot(eye.x - cx, eye.z - cz) < 22 : false;
      if(mode === 'settled' && (near || clock > 40)){ mode = 'flying'; clock = 0; }
      if(mode === 'flying' && clock > 24 && !near){ mode = 'settled'; clock = 0; }
      flock.forEach((b, i) => {
        if(mode === 'flying'){
          const a = t * 0.5 + b.phase, r = 14 + (i % 3) * 3;
          b.g.position.set(cx + Math.cos(a) * r, y0 + 6 + Math.sin(t * 0.9 + b.phase) * 1.5, cz + Math.sin(a) * r);
          b.g.rotation.y = -a; b.g.rotation.z = 0.25;
          b.wings.forEach((w, k) => { w.rotation.x = (k ? -1 : 1) * Math.sin(t * 9 + b.phase) * 0.6; });
        } else {
          b.g.position.lerp(b.home, Math.min(1, dt * 1.5));
          b.g.rotation.z = 0;
          b.wings.forEach(w => { w.rotation.x *= 0.9; });
        }
      });
    });
  }

  // 3/25. Flowers on the outdoor beds after mission 5, and the insect clusters
  //       thin over the nursery while the dune trays stay visited.
  {
    const petals = [0xd9c33a, 0xc75a7a, 0xe8e3d8];
    const flowers = [];
    for(let b = 0; b < 8; b++){
      if(b % 2) continue;
      const x = 30 + (b % 2) * 5.2, z = 8 - 10 + Math.floor(b / 2) * 5.4;
      for(let i = 0; i < 10; i++){
        const fx = x - 1.7 + i * 0.38, fz = z + (i % 2 ? 0.3 : -0.3);
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), PETAL(petals[(i + b) % 3]));
        f.position.set(fx, at(fx, fz) + 0.72, fz); f.visible = false; scene.add(f); flowers.push(f);
      }
    }
    // Dune trays: staggered flower trays out by the grazing enclosure, kept.
    const duneTrays = [];
    for(let i = 0; i < 4; i++){
      const x = -30 + i * 1.6, z = -46, y = at(x, z);
      box(scene, 1.3, 0.14, 0.7, x, y + 0.5, z, TIMBER());
      for(let k = 0; k < 5; k++){
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), PETAL(petals[(i + k) % 3]));
        f.position.set(x - 0.5 + k * 0.25, y + 0.7, z); scene.add(f); duneTrays.push(f);
      }
      slip(scene, { x, y: y + 0.95, z: z + 0.36, rotY: 0, w: 0.3, h: 0.16, text: [i < 2 ? 'EARLY' : 'LATE'], pin: false, tone: 'card' });
    }
    box(scene, 6.4, 0.08, 0.08, -27.6, at(-27.6, -46) + 0.42, -46, TIMBER());
    softColliders?.push({ x: -27.6, z: -46, r: 3.4 });
    // Insects over the dune trays, four clusters, always there.
    const duneBugs = [];
    for(let i = 0; i < 4; i++){
      const g = new THREE.Group();
      for(let k = 0; k < 4; k++) box(g, 0.05, 0.05, 0.05, (k % 2) * 0.3 - 0.15, k * 0.08, (k % 3) * 0.2 - 0.2, mat('pellow.insect2', () => new THREE.MeshBasicMaterial({ color: 0x2f2a1e })));
      const x = -30 + i * 1.6, z = -46;
      g.position.set(x, at(x, z) + 1.2, z); scene.add(g);
      animate?.((t) => { g.position.set(x + Math.sin(t * 0.9 + i) * 0.6, at(x, z) + 1.1 + Math.sin(t * 1.7 + i) * 0.3, z + Math.cos(t * 0.7 + i) * 0.6); });
      duneBugs.push(g);
    }
    // One thin cluster over the nursery flowers from mission 5 — "few visitors".
    const thin = new THREE.Group();
    box(thin, 0.05, 0.05, 0.05, 0, 0, 0, mat('pellow.insect2', () => new THREE.MeshBasicMaterial({ color: 0x2f2a1e })));
    thin.position.set(30, at(30, 0) + 1.2, 0); thin.visible = false; scene.add(thin);
    animate?.((t) => { thin.position.set(30 + Math.sin(t * 0.8) * 1.4, at(30, 0) + 1.1 + Math.sin(t * 1.5) * 0.3, Math.cos(t * 0.6) * 1.4); });
    stateHooks?.push((state) => { const k = n(state); flowers.forEach(f => { f.visible = k >= 4; }); thin.visible = k >= 5; });
    void duneTrays;
  }

  // 21/22. The fenced nesting patch in the dune grass, its state sign, and the
  //        wrack's dated survey stakes with counts that change on days 10 and 13.
  {
    const cx = 40, cz = -110, y = at(cx, cz);
    for(let i = 0; i < 12; i++){
      const a = (i / 12) * Math.PI * 2, px = cx + Math.cos(a) * 7, pz = cz + Math.sin(a) * 5;
      cyl(scene, 0.04, 0.9, px, at(px, pz) + 0.45, pz, TIMBER());
      const b = (((i + 1) % 12) / 12) * Math.PI * 2, qx = cx + Math.cos(b) * 7, qz = cz + Math.sin(b) * 5;
      const mx = (px + qx) / 2, mz = (pz + qz) / 2;
      box(scene, 0.02, 0.02, Math.hypot(qx - px, qz - pz), mx, at(mx, mz) + 0.8, mz, MATERIALS.steel(), Math.atan2(qx - px, qz - pz));
    }
    const grass = mat('pellow.dunegrass', () => new THREE.MeshStandardMaterial({ color: 0x8a8a52, roughness: 0.95, side: THREE.DoubleSide }));
    for(let i = 0; i < 30; i++){
      const a = Math.random() * Math.PI * 2, r = Math.random() * 5.5;
      const gx = cx + Math.cos(a) * r, gz = cz + Math.sin(a) * r * 0.7;
      const bl = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.7), grass);
      bl.position.set(gx, at(gx, gz) + 0.35, gz); bl.rotation.y = a; scene.add(bl);
      animate?.(sway(bl, 'x', 0.18, 1.4 + (i % 3) * 0.3, i));
    }
    softColliders?.push({ x: cx, z: cz, r: 7.6 });
    const nest = slip(scene, { x: cx, y: y + 1.35, z: cz + 5.6, rotY: 0, w: 0.7, h: 0.4, text: ['NESTING PATCH'], sub: 'eggs', pin: false, tone: 'card' });
    cyl(scene, 0.05, 1.2, cx, y + 0.6, cz + 5.6, TIMBER());
    const stakes = [[-40, -200], [0, -201], [48, -199]].map(([sx, sz], i) => {
      const sy = at(sx, sz);
      cyl(scene, 0.04, 1.0, sx, sy + 0.5, sz, TIMBER());
      return slip(scene, { x: sx, y: sy + 1.1, z: sz, rotY: 0, w: 0.34, h: 0.22, text: ['WRACK SURVEY'], sub: `count ${[14, 22, 9][i]}`, pin: false, tone: 'card' });
    });
    stateHooks?.push((state) => {
      const d = day(state);
      nest.set({ sub: d >= 11 ? 'chicks' : d >= 6 ? 'hatching' : 'eggs' });
      stakes.forEach((s, i) => s.set({ sub: `count ${[14, 22, 9][i] + (d >= 13 ? 9 : d >= 10 ? 4 : 0)}` }));
    });
  }

  // 19. Tide. A moving sheet over the beach read as a flood rather than a tide,
  //     so the tide is on the notice board (item 24) and in the strand line.
  // 23. The generator house's quiet running set: exhaust and a hum you can see.
  {
    const x = 32.4, z = 34, y = at(x, z);
    cyl(scene, 0.12, 1.8, x, y + 5.0, z, STEEL());
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 6), mat('pellow.exhaust', () => new THREE.MeshBasicMaterial({ color: 0xc8ccc8, transparent: true, opacity: 0.18, depthWrite: false })));
    puff.position.set(x, y + 6.2, z); puff.userData.ignoreAudit = true; scene.add(puff);
    animate?.((t) => { const k = (t % 1.4) / 1.4; puff.scale.setScalar(0.5 + k * 1.2); puff.position.y = y + 6.0 + k * 1.0; puff.material.opacity = 0.2 * (1 - k); });
  }

  // 8/9. The ship. Absent until mission 14, then offshore at anchor with its
  //      lights on; on day 15 the covered cart goes down to it and the reserve
  //      stays ashore. The coaster in props.js is hidden by this hook.
  {
    const ship = new THREE.Group();
    box(ship, 8.0, 3.4, 30, 0, 1.7, 0, MATERIALS.paintedSteel(0x2b3a44));
    box(ship, 8.2, 0.5, 30.4, 0, 3.5, 0, MATERIALS.paintedSteel(0x8a5a3a));
    box(ship, 5.4, 3.2, 7.0, 0, 5.1, -9, MATERIALS.paintedSteel(0xd8d3c4));
    box(ship, 5.0, 1.0, 0.1, 0, 5.7, -12.55, MATERIALS.glass());
    cyl(ship, 0.55, 3.6, 0, 7.3, -7, MATERIALS.paintedSteel(0xc4342a));
    cyl(ship, 0.12, 9, 0, 8.5, 6, STEEL());
    const lights = [];
    for(const [lx, ly, lz, c] of [[0, 13.2, 6, 0xffffff], [-4.2, 4.2, -9, 0xff4040], [4.2, 4.2, -9, 0x40ff60], [0, 7.4, -12.6, 0xffe9b0]]){
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 2 }));
      l.position.set(lx, ly, lz); ship.add(l); lights.push(l);
    }
    const sx = 60, sz = -262;
    const sea = theme?.site?.water?.level ?? -3.4;
    ship.position.set(sx, sea + 0.6, sz); ship.rotation.y = 0.35; ship.visible = false;
    scene.add(ship);
    animate?.(bob(ship, 0.12, 0.3)); animate?.(sway(ship, 'z', 0.015, 0.25));
    // The covered cart, at the store until day 15; then down the track to the jetty.
    const cart = new THREE.Group();
    box(cart, 1.7, 0.12, 1.1, 0, 0.62, 0, TIMBER());
    for(const [cx, cz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){ const w = cyl(cart, 0.26, 0.08, cx * 0.75, 0.26, cz * 0.45, MATERIALS.paintedSteel(0x3a3a38)); w.rotation.z = Math.PI / 2; }
    box(cart, 1.6, 0.6, 1.0, 0, 1.0, 0, mat('pellow.cover', () => new THREE.MeshStandardMaterial({ color: 0x3f6b5a, roughness: 0.9 })));
    slip(cart, { x: 0, y: 1.05, z: 0.52, rotY: 0, w: 0.5, h: 0.2, text: ['COVERED PILOT CART'], pin: false });
    const home = { x: -40, z: 46 };
    cart.position.set(home.x, at(home.x, home.z), home.z);
    scene.add(cart);
    softColliders?.push({ x: home.x, z: home.z, r: 1.3 });
    const track = [[-40, 46], [-20, 52], [0, 40], [4, -30], [4, -110], [20, -160], [30, -190], [30, -204]].map(([x, z]) => ({ x, y: at(x, z), z }));
    let mover = null, arrived = false;
    animate?.((t, dt) => {
      if(!mover || arrived) return;
      mover(t, dt);
      if(Math.hypot(cart.position.x - 30, cart.position.z + 204) < 1.2){ arrived = true; cart.position.set(30, at(30, -204) + 0.7, -204); cart.rotation.y = Math.PI; }
    });
    stateHooks?.push((state) => {
      const k = n(state);
      ship.visible = k >= 14 || day(state) >= 14;
      if(k >= 15 && !mover){ mover = patrol(cart, [...track, ...track.slice().reverse()], 3.0); }
      if(k < 15 && mover){ mover = null; arrived = false; cart.position.set(home.x, at(home.x, home.z), home.z); cart.rotation.y = 0; }
    });
    // The jetty end, so the ship's boat has somewhere to take the cart from.
    for(let i = 0; i < 6; i++){ const z = -196 - i * 2.2; for(const dx of [-1.6, 1.6]) cyl(scene, 0.16, 2.4, 30 + dx, at(30, z) - 0.2, z, TIMBER()); box(scene, 4.0, 0.14, 2.1, 30, at(30, z) + 0.7, z, TIMBER()); }
  }

  // 26. The quarantine porch has a threshold: a sign and a boot line at the door.
  {
    const x = -18, z = 29.2, y = at(x, z);
    sign(scene, 'QUARANTINE — BOOT WASH', { x, y: y + 2.5, z, w: 2.6, h: 0.5, facing: 0 });
    box(scene, 2.4, 0.03, 0.08, x, y + 0.02, z - 0.4, MATERIALS.paintedSteel(0xc9962a));
  }
  storyExtras(scene, ctx);
  void solid;
}

// =============================================================== the rooms

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme, animate } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.face(spec.dx ?? 0, spec.y ?? 1.5), ...spec }) : null; };
  const onTop = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.top(spec.dx ?? 0, spec.dz ?? 0), flat: true, ...spec }) : null; };
  const onWall = (fid, side, spec) => { const a = at(fid); return a ? slip(group, { ...a.wallPanel(side, spec.y ?? 1.75, spec.gap ?? 1.1), ...spec }) : null; };
  const panel = (fid, side, spec) => { const a = at(fid); return a ? statusPanel(group, { ...a.wallPanel(side, spec.y ?? 1.95), w: 1.4, h: 0.8, lit: true, ...spec }) : null; };
  const hooks = [];

  switch(id){
    case 'CLINIC': {
      // 10/11. feed-tin and rinse-bottle: the withdrawn side and the active tray.
      const a = at('sample-bench');
      if(a){
        const t = a.top(-0.55, 0.1); box(group, 0.5, 0.02, 0.3, t.x, 0.955, t.z, MATERIALS.paintedSteel(0x8a3a30), t.rotY);
        const t2 = a.top(0.55, 0.1); box(group, 0.5, 0.02, 0.3, t2.x, 0.955, t2.z, MATERIALS.paintedSteel(0x2f6b4a), t2.rotY);
      }
      const withdrawn = onTop('sample-bench', { dx: -0.55, dz: 0.28, w: 0.3, h: 0.14, text: ['WITHDRAWN'], pin: false, tone: 'card' });
      const active = onTop('sample-bench', { dx: 0.55, dz: 0.28, w: 0.3, h: 0.14, text: ['ACTIVE TRAY'], pin: false, tone: 'card' });
      void withdrawn; void active;
      let tin = null, tin2 = null, bottle = null, bottle2 = null;
      if(a){
        const p = a.top(0.45, 0.05); tin = cyl(group, 0.09, 0.14, p.x, 1.04, p.z, MATERIALS.paintedSteel(0xc9962a));
        const q = a.top(-0.45, 0.05); tin2 = cyl(group, 0.09, 0.14, q.x, 1.04, q.z, MATERIALS.paintedSteel(0x8a7a5a)); tin2.visible = false;
        const r = a.top(0.68, -0.05); bottle = cyl(group, 0.05, 0.26, r.x, 1.1, r.z, MATERIALS.paintedSteel(0x9fb6c2));
        const s = a.top(-0.68, -0.05); bottle2 = cyl(group, 0.05, 0.26, s.x, 1.1, s.z, MATERIALS.paintedSteel(0x6f7a72)); bottle2.visible = false;
      }
      const feedTag = onTop('sample-bench', { dx: 0.45, dz: -0.22, w: 0.22, h: 0.12, text: ['TESTED MIX'], pin: false, visible: false });
      const rinseTag = onTop('sample-bench', { dx: 0.68, dz: -0.3, w: 0.24, h: 0.12, text: ['MATCHED RINSE'], pin: false, visible: false });
      // 4. held-tissue-box behind the HOLD barrier on the culture rack.
      const hold = onFace('culture-rack', { dx: 0, y: 1.55, w: 0.5, h: 0.22, text: ['HOLD'], sub: 'original line label attached', visible: false, tone: 'card' });
      let tape = null;
      const c = at('culture-rack');
      if(c){ const f = c.face(0, 1.2, 0.36); tape = box(group, 1.4, 0.05, 0.02, f.x, f.y, f.z, MATERIALS.paintedSteel(0xc4342a), f.rotY); tape.visible = false; }
      // 12. partner-box: tested plant-partner samples closed in, field soil excluded.
      const partner = onFace('care-board', { dx: -0.35, y: 1.6, w: 0.42, h: 0.26, text: ['TESTED PLANT PARTNERS'], sub: 'untested field soil excluded', visible: false });
      const care = panel('care-board', 1, { title: 'Care board', big: 'PALE NEW LEAVES', tone: 'warn' });
      hooks.push((state) => {
        const k = n(state);
        if(tin){ tin.visible = k < 1; tin2.visible = k >= 1; }
        if(bottle){ bottle.visible = k < 2; bottle2.visible = k >= 2; }
        feedTag?.set({ visible: k >= 1 }); rinseTag?.set({ visible: k >= 2 });
        hold?.set({ visible: k >= 6 }); if(tape) tape.visible = k >= 6;
        partner?.set({ visible: k >= 12 });
        care?.set(k >= 6 ? { big: 'ONE LINE HELD', tone: 'warn', small: 'unusual division counts' } : k >= 2 ? { big: 'MATCHED RINSE ISSUED', tone: 'ok', small: '' } : k >= 1 ? { big: 'INCOMPLETE FEED WITHDRAWN', tone: 'ok', small: 'root cells swell after a fresh-water rinse' } : { big: 'PALE NEW LEAVES', tone: 'warn', small: '' });
      });
      break;
    }
    case 'GROW': {
      // 2/8. The pond tanks with DAY and NIGHT readings; LOW OXYGEN at dawn on
      //      mission 14, with the night-hold seal and the correction card under it.
      const a = at('pond-tanks');
      const dayP = panel('pond-tanks', -1, { title: 'Pond tank · DAY', big: '—', tone: 'plain', w: 1.2, h: 0.7 });
      const nightP = panel('pond-tanks', 1, { title: 'Pond tank · NIGHT', big: '—', tone: 'plain', w: 1.2, h: 0.7 });
      const seal = onFace('pond-tanks', { dx: 0, y: 1.9, w: 0.42, h: 0.22, text: ['NIGHT HOLD'], sub: 'sealed until full-cycle evidence', visible: false, tone: 'card' });
      const correction = onFace('pond-tanks', { dx: 0, y: 1.62, w: 0.42, h: 0.22, text: ['TESTED CORRECTION'], sub: 'oxygen supply', visible: false });
      void a;
      // 12. vent-lids on the growth bench pots; 13. TRIAL ONLY on the light panel,
      //     four lamps lit and the rest dark.
      const lids = [0, 1, 2].map(i => { const t = at('growth-bench'); if(!t) return null; const p = t.top(-0.5 + i * 0.5, 0.1); const pot = cyl(group, 0.13, 0.22, p.x, 1.07, p.z, MATERIALS.paintedSteel(0x7a5a3a)); const lid = cyl(group, 0.14, 0.03, p.x, 1.2, p.z, MATERIALS.paintedSteel(0xd8d3c4)); lid.visible = false; void pot; return lid; });
      const trial = onFace('light-panel', { dx: 0, y: 1.6, w: 0.36, h: 0.2, text: ['TRIAL ONLY'], visible: false, tone: 'card' });
      const lamps = [];
      const l = at('light-panel');
      if(l){
        for(let i = 0; i < 8; i++){
          const p = l.face(-0.5 + i * 0.14, 1.95, 0.05);
          const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: 0x2a2f33, emissive: 0xffd9a0, emissiveIntensity: 0 }));
          lamp.position.set(p.x, p.y, p.z); lamp.rotation.y = p.rotY; group.add(lamp); lamps.push(lamp);
        }
      }
      // 5. Two pots, one family card, two leaf forms; the shape-only tags gone
      //    after mission 9.
      const g = at('growth-bench');
      let lobed = null, entire = null;
      if(g){
        const p1 = g.top(0.75, -0.1), p2 = g.top(1.0, -0.1);
        cyl(group, 0.1, 0.16, p1.x, 1.04, p1.z, MATERIALS.paintedSteel(0x7a5a3a)); cyl(group, 0.1, 0.16, p2.x, 1.04, p2.z, MATERIALS.paintedSteel(0x7a5a3a));
        lobed = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09, 0), LEAF(0x3f6b34)); lobed.position.set(p1.x, 1.24, p1.z); group.add(lobed);
        entire = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), LEAF(0x4a7a3a)); entire.scale.set(1, 0.5, 1.4); entire.position.set(p2.x, 1.24, p2.z); group.add(entire);
      }
      const family = onTop('growth-bench', { dx: 0.87, dz: 0.22, w: 0.3, h: 0.14, text: ['FAMILY 4'], pin: false, tone: 'card' });
      const shapeTag1 = onTop('growth-bench', { dx: 0.72, dz: -0.34, w: 0.16, h: 0.1, text: ['LOBED'], pin: false });
      const shapeTag2 = onTop('growth-bench', { dx: 1.02, dz: -0.34, w: 0.16, h: 0.1, text: ['ENTIRE'], pin: false });
      const condition = onTop('growth-bench', { dx: 0.87, dz: -0.34, w: 0.3, h: 0.12, text: ['CONDITION NOTE'], pin: false, visible: false });
      void family;
      hooks.push((state) => {
        const k = n(state);
        dayP?.set(k >= 14 ? { big: 'DAY · O₂ HIGH', tone: 'ok' } : k >= 3 ? { big: 'DAY', tone: 'ok', small: 'daylight balance positive' } : { big: '—', tone: 'plain' });
        nightP?.set(k >= 14 ? { big: 'LOW OXYGEN', tone: 'alert', small: 'dawn animals at the surface' } : k >= 3 ? { big: 'NIGHT', tone: 'warn', small: 'controls checked' } : { big: '—', tone: 'plain' });
        seal?.set({ visible: k >= 14 }); correction?.set({ visible: k >= 14 });
        lids.forEach(ld => { if(ld) ld.visible = k >= 3; });
        trial?.set({ visible: k >= 4 });
        lamps.forEach((lm, i) => { lm.material.emissiveIntensity = k >= 4 && i < 4 ? 1.4 : 0; });
        shapeTag1?.set({ visible: k < 9 }); shapeTag2?.set({ visible: k < 9 }); condition?.set({ visible: k >= 9 });
      });
      break;
    }
    case 'SEED': {
      // 15. family-clips: each card clipped to its packet. 17. reserve-jars: the
      //     reserve shelf stays stocked while the travel jars go.
      const packets = [0, 1, 2, 3].map(i => onTop('seed-table', { dx: -0.6 + i * 0.4, dz: 0, w: 0.26, h: 0.18, text: [`PACKET ${i + 1}`], pin: false, tone: 'card' }));
      const clips = [0, 1, 2, 3].map(i => onTop('seed-table', { dx: -0.6 + i * 0.4, dz: -0.2, w: 0.22, h: 0.12, text: [`FAMILY ${i + 1}`], pin: 'clip', visible: false }));
      const reserve = onFace('storage-rack', { dx: -0.4, y: 1.6, w: 0.34, h: 0.2, text: ['RESERVE'], sub: 'stays ashore', visible: false, tone: 'card' });
      const travel = onFace('storage-rack', { dx: 0.4, y: 1.6, w: 0.34, h: 0.2, text: ['TRAVEL'], sub: 'several screened families', visible: false, tone: 'card' });
      const jars = [];
      const r = at('storage-rack');
      if(r){
        for(let i = 0; i < 10; i++){
          const p = r.face(-0.5 + (i % 5) * 0.25 + (i >= 5 ? 0.0 : 0), 1.25 + (i >= 5 ? 0 : 0.5), 0.36);
          const j = cyl(group, 0.06, 0.14, p.x, p.y, p.z, MATERIALS.paintedSteel(i >= 5 ? 0x9fb6c2 : 0xc9b23c));
          jars.push(j);
        }
      }
      const ancestry = onFace('family-board', { dx: 0, y: 1.6, w: 0.5, h: 0.26, text: ['ANCESTRY LABELS'], sub: 'appearance-only labels removed', visible: false });
      const board = panel('family-board', 1, { title: 'Family board', big: 'FAMILY LABELS', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        clips.forEach(c => c?.set({ visible: k >= 7 })); packets.forEach(p => p?.set({ visible: true }));
        reserve?.set({ visible: k >= 11 }); travel?.set({ visible: k >= 11 });
        // Travel jars leave with the cart on day 15; the reserve row stays.
        jars.forEach((j, i) => { j.visible = i < 5 || k < 15; });
        ancestry?.set({ visible: k >= 9 });
        board?.set(k >= 11 ? { big: 'SEVERAL SCREENED FAMILIES', tone: 'ok', small: 'reserve kept' } : k >= 9 ? { big: 'ANCESTRY, NOT APPEARANCE', tone: 'ok', small: '' } : k >= 7 ? { big: 'TEST CROSS APPROVED', tone: 'ok', small: '' } : { big: 'FAMILY LABELS', tone: 'plain', small: '' });
      });
      break;
    }
    case 'GENE': {
      // 16. enzyme-sleeve: the archived tube sleeved with its sequence and activity
      //     card, LEAD — CAUSE NOT COMPLETE.
      const sleeve = onTop('dna-bench', { dx: 0.3, dz: 0.05, w: 0.4, h: 0.2, text: ['LEAD — CAUSE NOT COMPLETE'], pin: false, visible: false, tone: 'card' });
      let tube = null;
      const d = at('dna-bench');
      if(d){ const p = d.top(0.3, 0.05); tube = cyl(group, 0.03, 0.2, p.x, 1.08, p.z, MATERIALS.paintedSteel(0x9fb6c2)); }
      void tube;
      const records = panel('records-board', -1, { title: 'Records board', big: 'FAMILY RECORDS', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        sleeve?.set({ visible: k >= 8 });
        records?.set(k >= 11 ? { big: 'p = (2AA + Aa)/(2N)', tone: 'ok', small: 'reference model checked' } : k >= 8 ? { big: 'ALTERED CODONS READ', tone: 'warn', small: 'environmental comparison requested' } : k >= 6 ? { big: 'ONE LINE HELD', tone: 'warn', small: '' } : { big: 'FAMILY RECORDS', tone: 'plain', small: '' });
      });
      break;
    }
    case 'PLAN': {
      // The release board carries the campaign's decision line; the manifest is
      // signed on day 15.
      const release = panel('release-board', 1, { title: 'Release board', big: 'SHIP BOOKED', tone: 'plain' });
      const manifest = onFace('release-board', { dx: 0, y: 1.25, w: 0.5, h: 0.24, text: ['LIVING MANIFEST'], sub: 'pause and return path', visible: false });
      hooks.push((state) => {
        const k = n(state);
        release?.set(k >= 15 ? { big: 'CORRECTED PILOT APPROVED', tone: 'ok', small: 'the island keeps a reserve' } : k >= 14 ? { big: 'EXPANSION HALTED', tone: 'alert', small: 'oxygen-supply correction added' } : k >= 13 ? { big: 'RECEIVING PLOTS PREPARED', tone: 'ok', small: 'instrumented contained pilot only' } : k >= 12 ? { big: 'TESTED PARTNERS ADDED', tone: 'ok', small: 'field soil stays on the island' } : { big: 'SHIP BOOKED', tone: 'plain', small: HEADER(day(state)) });
        manifest?.set({ visible: k >= 15, text: k >= 15 ? ['LIVING MANIFEST — SIGNED'] : ['LIVING MANIFEST'] });
      });
      break;
    }
    case 'MARSH': {
      // 6. emergence-strips pinned in generation order with the archive span left
      //    visible. 14. staggered-trays under their date cards. 18. two soil cores.
      const strips = [0, 1, 2, 3, 4, 5].map(i => onFace('habitat-board', { dx: -0.5 + i * 0.2, y: 1.6, w: 0.16, h: 0.42, text: [`G${i + 1}`], sub: i < 4 ? 'archive' : '', pin: true, visible: false }));
      const early = onTop('field-bench', { dx: -0.5, dz: 0.05, w: 0.3, h: 0.16, text: ['EARLY'], sub: 'flower tray', pin: false, visible: false, tone: 'card' });
      const late = onTop('field-bench', { dx: 0.5, dz: 0.05, w: 0.3, h: 0.16, text: ['LATE'], sub: 'flower tray', pin: false, visible: false, tone: 'card' });
      const cores = [0, 1].map(i => { const f = at('field-bench'); if(!f) return null; const p = f.top(-0.1 + i * 0.25, -0.22); const c = cyl(group, 0.04, 0.32, p.x, 1.12, p.z, MATERIALS.paintedSteel(i ? 0x8a7a5a : 0x3a2f24)); c.visible = false; return c; });
      const coreTag = onTop('field-bench', { dx: 0.05, dz: -0.4, w: 0.34, h: 0.12, text: ['SITE PREPARATION RECORD'], pin: false, visible: false });
      const water = panel('water-rack', -1, { title: 'Water rack', big: 'SHORE SAMPLES', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        strips.forEach(s => s?.set({ visible: k >= 10 }));
        early?.set({ visible: k >= 5 }); late?.set({ visible: k >= 5 });
        cores.forEach(c => { if(c) c.visible = k >= 13; }); coreTag?.set({ visible: k >= 13 });
        water?.set(k >= 15 ? { big: 'NIGHT MARGIN CORRECTED', tone: 'ok' } : k >= 13 ? { big: 'LESS USABLE NITROGEN', tone: 'warn', small: 'receiving site' } : k >= 12 ? { big: 'FOOD WEB BUDGETED', tone: 'ok' } : { big: 'SHORE SAMPLES', tone: 'plain' });
      });
      break;
    }
    case 'GEN': {
      // A quiet running set: two generators, one turning over.
      const b = room.bounds;
      for(const [x, on] of [[b.x0 + 2.2, true], [b.x0 + 5.0, false]]){
        box(group, 2.2, 1.4, 1.1, x, 0.7, b.z1 - 1.6, MATERIALS.paintedSteel(on ? 0x2f6b4a : 0x5a5f5a));
        const fan = box(group, 0.05, 0.8, 0.8, x + 1.15, 0.8, b.z1 - 1.6, MATERIALS.paintedSteel(0x22262a));
        if(on) animate?.(spin(fan, 'x', 9));
        ctx.solid?.(x, b.z1 - 1.6, 2.4, 1.6, 1.3);
      }
      statusPanel(group, { x: 0, y: 2.0, z: b.z1 - 0.1, rotY: Math.PI, w: 1.4, h: 0.6, title: 'Generator House', big: 'SET 1 RUNNING · SET 2 STANDBY', tone: 'ok', lit: true });
      break;
    }
    case 'STORE': {
      // The covered release cart's bay and the final loading gate, staged for the
      // ship on the fifteenth.
      const b = room.bounds;
      const gate = new THREE.Group();
      for(const s of [-1, 1]) box(gate, 0.1, 2.2, 0.1, s * 1.3, 1.1, 0, STEEL());
      const bar = box(gate, 2.5, 0.08, 0.08, 0, 1.0, 0, MATERIALS.paintedSteel(0xc4342a));
      gate.position.set(0, 0, b.z1 - 2.4); group.add(gate);
      const label = statusPanel(group, { x: 0, y: 2.1, z: b.z1 - 0.1, rotY: Math.PI, w: 1.6, h: 0.6, title: 'Loading gate', big: 'CLOSED', tone: 'warn', lit: true });
      const crates = [0, 1, 2, 3].map(i => box(group, 0.6, 0.5, 0.5, b.x0 + 1.2 + i * 0.75, 0.25, b.z0 + 2.0, TIMBER()));
      ctx.solid?.(b.x0 + 2.3, b.z0 + 2.0, 3.2, 0.6, 0.6);
      hooks.push((state) => {
        const k = n(state);
        bar.rotation.z = k >= 15 ? Math.PI / 2 : 0; bar.position.set(k >= 15 ? -1.3 : 0, k >= 15 ? 2.2 : 1.0, 0);
        label.set(k >= 15 ? { big: 'CLEARED', tone: 'ok' } : { big: 'CLOSED', tone: 'warn' });
        crates.forEach((c, i) => { c.visible = i < Math.ceil(day(state) / 4); });
      });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list. A headland has a lighthouse on it; a shore has seals
// on the rocks and a buoy off it; dunes have rabbits.
export function storyExtras(scene, ctx){
  const { groundHeight, animate, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // The lighthouse on the crest: a white tower with a red band, a lantern room,
  // and a beam that turns all day and reads from the whole island.
  {
    const x = 130, z = -192, y = at(x, z);
    const white = MATERIALS.paintedSteel(0xd8d6cc), red = MATERIALS.paintedSteel(0xb8352a);
    cyl(scene, 2.4, 1.0, x, y + 0.5, z, MATERIALS.concrete());
    cyl(scene, 1.9, 6, x, y + 4, z, white, 2.2);
    cyl(scene, 1.75, 3, x, y + 8.5, z, red, 1.9);
    cyl(scene, 1.6, 5, x, y + 12.5, z, white, 1.75);
    cyl(scene, 2.2, 0.4, x, y + 15.2, z, MATERIALS.paintedSteel(0x3a3f45));       // gallery
    for(let i = 0; i < 8; i++){ const a = (i / 8) * Math.PI * 2; cyl(scene, 0.03, 1.1, x + Math.cos(a) * 2.1, y + 15.9, z + Math.sin(a) * 2.1, MATERIALS.steel()); }
    const lantern = cyl(scene, 1.3, 2.2, x, y + 16.5, z, MATERIALS.glass());
    void lantern;
    cyl(scene, 1.5, 0.6, x, y + 17.8, z, MATERIALS.paintedSteel(0x3a3f45), 0.4);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff3c0, emissiveIntensity: 3 }));
    lamp.position.set(x, y + 16.5, z); scene.add(lamp);
    const head = new THREE.Group(); head.position.set(x, y + 16.5, z); scene.add(head);
    for(const s of [1, -1]){
      const beam = new THREE.Mesh(new THREE.PlaneGeometry(160, 2.4), new THREE.MeshBasicMaterial({ color: 0xfff3c0, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
      beam.geometry = beam.geometry.clone().translate(s * 80, 0, 0); head.add(beam);
      const beamV = beam.clone(); beamV.rotation.x = Math.PI / 2; head.add(beamV);
    }
    animate?.(spin(head, 'y', 0.6));
    const bx = new THREE.Box3(new THREE.Vector3(x - 2.4, y, z - 2.4), new THREE.Vector3(x + 2.4, y + 18, z + 2.4));
    colliders?.push(bx);
    // The keeper's cottage beside it, and a path to it.
    box(scene, 7, 3.2, 5, x - 8, y + 1.6, z + 2, white);
    box(scene, 7.6, 0.4, 5.6, x - 8, y + 3.4, z + 2, MATERIALS.paintedSteel(0x4a4038));
    box(scene, 1.0, 2.0, 0.1, x - 8, y + 1.0, z + 4.55, MATERIALS.paintedSteel(0x2f4a52));
    colliders?.push(new THREE.Box3(new THREE.Vector3(x - 11.5, y, z - 0.5), new THREE.Vector3(x - 4.5, y + 3.6, z + 4.5)));
  }

  // Seals on the shore rocks: grey ellipsoids that lift a head now and then.
  {
    const grey = mat('pellow.seal', () => new THREE.MeshStandardMaterial({ color: 0x5a5c5e, roughness: 0.6 }));
    for(const [x, z, r] of [[-64, -212, 0.4], [-60, -214, 2.1], [72, -210, 1.2], [76, -213, 2.8], [-8, -216, 0.9]]){
      const y = at(x, z);
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 7), grey); body.scale.set(2.2, 0.7, 1); body.position.set(x, y + 0.75, z); body.rotation.y = r; scene.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), grey); head.position.set(x + Math.cos(r) * 1.1, y + 0.95, z - Math.sin(r) * 1.1); scene.add(head);
      const hy = head.position.y;
      animate?.((t) => { head.position.y = hy + Math.max(0, Math.sin(t * 0.3 + r * 3)) * 0.35; });
    }
  }

  // A buoy off the shore, bobbing, with a light that blinks after dark.
  {
    const x = -20, z = -246, y = (ctx.theme?.site?.water?.level ?? -3.4) + 0.2;
    const buoy = new THREE.Group(); buoy.position.set(x, y, z); scene.add(buoy);
    cyl(buoy, 0.9, 1.2, 0, 0.6, 0, MATERIALS.paintedSteel(0xc9962a), 0.6);
    cyl(buoy, 0.08, 2.4, 0, 2.4, 0, STEEL());
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshStandardMaterial({ color: 0xff8080, emissive: 0xff2020, emissiveIntensity: 2.5 }));
    l.position.set(0, 3.7, 0); buoy.add(l);
    animate?.(bob(buoy, 0.35, 0.6)); animate?.(sway(buoy, 'z', 0.12, 0.5)); animate?.(sway(buoy, 'x', 0.09, 0.7, 1));
    animate?.((t) => { l.material.emissiveIntensity = (t % 3) < 0.4 ? 3 : 0.1; });
  }

  // Rabbits on the dunes: six that hop a few metres and stop.
  {
    const fur = mat('pellow.rabbit', () => new THREE.MeshStandardMaterial({ color: 0x8a7a62, roughness: 0.95 }));
    for(let i = 0; i < 6; i++){
      const hx = -70 + i * 22, hz = -70 - (i % 3) * 14;
      const g = new THREE.Group();
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), fur); b.scale.set(1.3, 0.9, 1); b.position.y = 0.16; g.add(b);
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.09, 7, 5), fur); h.position.set(0.2, 0.3, 0); g.add(h);
      for(const s of [-1, 1]) box(g, 0.04, 0.16, 0.03, 0.22, 0.44, s * 0.04, fur);
      scene.add(g);
      let ax = hx, az = hz, tx = hx, tz = hz, wait = i * 0.7;
      animate?.((t, dt) => {
        if(wait > 0){ wait -= dt; return; }
        const d = Math.hypot(tx - ax, tz - az);
        if(d < 0.05){ tx = hx + (Math.random() - 0.5) * 8; tz = hz + (Math.random() - 0.5) * 8; wait = 1.5 + Math.random() * 3; return; }
        const step = Math.min(d, dt * 2.2);
        ax += (tx - ax) / d * step; az += (tz - az) / d * step;
        g.position.set(ax, at(ax, az) + Math.abs(Math.sin(t * 9)) * 0.18, az);
        g.rotation.y = Math.atan2(tx - ax, tz - az) - Math.PI / 2;
      });
      g.position.set(hx, at(hx, hz), hz);
    }
  }
  void softColliders;
}
