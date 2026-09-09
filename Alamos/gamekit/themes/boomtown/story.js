// story.js — a mesa town six weeks into a boom, changing in public.
//
// The bible writes one world-state line per mission and they are a town
// visibly changing: a lunch queue that grows past the door, vacant-room cards
// that flip to available, forty application tokens that do not shrink, a
// freight board that loses twenty bookings, a ribbon that comes down, a job
// board that goes from three filled posts to four. Before this file the mesa
// looked the same on day 15 as on day 1. See gamekit/STORY_DRESSING_PASS.md §3;
// the numbers below are its list.
//
// `storyOutdoors` runs from `decorate`; `dressRoom` runs when an office is
// built. Every word on a card is the bible's — a mission title, a header, a
// State/output line, a World-state line.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign, bench, vehicle } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, patrol, scrollUV } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

const LUMBER = () => mat('boom.lumber2', () => new THREE.MeshStandardMaterial({ color: 0x6b5638, roughness: 0.9 }));
const PLY = () => mat('boom.ply2', () => new THREE.MeshStandardMaterial({ color: 0x8a7a5a, roughness: 0.92 }));
const STEEL = () => MATERIALS.paintedSteel(0x6f7378);

/** The bible's mission header, verbatim. */
const HEADER = (m) => `SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE ${Math.min(15, Math.max(1, m))} OF 15`;

/** Mission card titles, verbatim, for the fifteen agreement slots. */
const TITLES = ['THE MISSING BREAKFAST', 'THE QUEUE THAT GREW', 'THE EMPTY ROOMS', 'TOO MANY HANDS',
  'THE RENT PROMISE', 'WHO PAYS THE FEE', 'THE SHUTTERED SUPPLIER', 'A STREET FULL OF SIGNS',
  'THE ONLY BIG PAYROLL', 'THE EMPTY FREIGHT SLOT', 'TWO OFFERS, ONE GATE', 'THE WATER BELOW',
  'THE CHEAPER FILTER', 'THE LINE THAT PAYS FOR ITSELF', 'THE TOWN THAT STAYS'];

function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r), new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

/** A person standing: the same shape `queues()` uses, so the street matches. */
function figure(parent, coat = 0x3f5a72, skin = 0xc9a882){
  const g = new THREE.Group();
  box(g, 0.42, 0.62, 0.24, 0, 1.05, 0, MATERIALS.paintedSteel(coat));
  box(g, 0.34, 0.5, 0.2, 0, 0.5, 0, MATERIALS.paintedSteel(0x2e3238));
  box(g, 0.22, 0.24, 0.2, 0, 1.48, 0, MATERIALS.paintedSteel(skin));
  parent.add(g);
  return g;
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);

  // 1–6. The town's own notice board, outside the advice office: the header, and
  //      fifteen slots that fill with a mission's card title as it is settled.
  {
    const x = -12, z = 48, y = at(x, z);
    for(const dx of [-2.2, 2.2]) box(scene, 0.14, 3.0, 0.14, x + dx, y + 1.5, z, LUMBER());
    box(scene, 4.8, 2.0, 0.1, x, y + 1.95, z, PLY());
    box(scene, 5.0, 0.2, 0.5, x, y + 3.05, z - 0.1, LUMBER());
    const header = statusPanel(scene, { x, y: y + 3.38, z: z - 0.02, rotY: Math.PI, w: 4.6, h: 0.5, title: 'Town notices', big: HEADER(1), tone: 'plain', lit: true });
    solid(colliders, x, z, y, 2.4, 3.2);
    const slots = TITLES.map((t, i) => slip(scene, {
      x: x + 1.9 - (i % 5) * 0.95, y: y + 2.55 - Math.floor(i / 5) * 0.6, z: z - 0.07, rotY: Math.PI,
      w: 0.82, h: 0.5, text: [t], sub: `Stage ${i + 1}`, visible: false, tilt: ((i * 7) % 3 - 1) * 0.03 }));
    const ribbon = slip(scene, { x: x + 2.0, y: y + 1.05, z: z - 0.07, rotY: Math.PI, w: 0.8, h: 0.3, text: ['SECOND RAIL LINE'], sub: 'proposed', visible: false, tone: 'card' });
    const ready = slip(scene, { x: x - 1.6, y: y + 1.05, z: z - 0.07, rotY: Math.PI, w: 1.2, h: 0.36, text: ['READY TO SIGN AFTER', 'RESOURCE CHECK'], visible: false });
    stateHooks?.push((state) => {
      const k = n(state);
      header.set({ big: HEADER(day(state)), tone: k >= 15 ? 'ok' : 'plain' });
      slots.forEach((s, i) => s.set({ visible: k > i }));
      ribbon.set({ visible: k >= 10, struck: k >= 14 });
      ready.set({ visible: day(state) >= 15, text: k >= 15 ? ['SIGNED'] : ['READY TO SIGN AFTER', 'RESOURCE CHECK'] });
    });
  }

  // 7. Two meal crates marked for the repair crew, on the diner's bench (M1).
  {
    const x = -22, z = 48, y = at(x, z);
    const crates = [0, 1].map(i => box(scene, 0.6, 0.45, 0.5, x + i * 0.7, y + 0.23, z, LUMBER()));
    const tag = slip(scene, { x: x + 0.35, y: y + 0.62, z: z + 0.27, rotY: 0, w: 0.4, h: 0.16, text: ['REPAIR CREW'], pin: false });
    stateHooks?.push((state) => { const k = n(state); crates.forEach(c => { c.visible = k >= 1; }); tag.set({ visible: k >= 1 }); });
    softColliders?.push({ x: x + 0.35, z, r: 0.8 });
  }

  // 9. The guesthouse gets a rate board by the door: the tested rate, then the
  //    earlier rate with the vacant-room cards flipped to available (M3).
  {
    const x = 10, z = -32.6, y = at(x, z);
    cyl(scene, 0.05, 1.6, x + 4, y + 0.8, z, STEEL());
    const rate = slip(scene, { x: x + 4, y: y + 1.75, z, rotY: 0, w: 0.6, h: 0.42, text: ['ROOMS $50'], sub: 'per night', tone: 'card' });
    const cards = [0, 1, 2].map(i => slip(scene, { x: x + 3.55 + i * 0.45, y: y + 1.3, z, rotY: 0, w: 0.34, h: 0.2, text: ['AVAILABLE'], visible: false, pin: 'clip' }));
    stateHooks?.push((state) => { const k = n(state); rate.set(k >= 3 ? { text: ['ROOMS $40'], sub: 'per night' } : { text: ['ROOMS $50'], sub: 'per night' }); cards.forEach(c => c.set({ visible: k >= 3 })); });
  }

  // 10/16. The job board outside the diner: one card, a second on hold (M4), and
  //        the filled count that goes from three to four (M9).
  {
    const x = -40, z = 46, y = at(x, z);
    for(const dx of [-0.9, 0.9]) box(scene, 0.1, 2.2, 0.1, x + dx, y + 1.1, z, LUMBER());
    box(scene, 2.0, 1.2, 0.08, x, y + 1.6, z, PLY());
    const filled = statusPanel(scene, { x, y: y + 2.45, z: z - 0.02, rotY: Math.PI, w: 1.9, h: 0.4, title: 'Job board', big: '3 FILLED POSTS', tone: 'plain', lit: true });
    const card1 = slip(scene, { x: x + 0.45, y: y + 1.65, z: z - 0.06, rotY: Math.PI, w: 0.5, h: 0.3, text: ['FOURTH COOK'], sub: 'vacancy', visible: false });
    const card2 = slip(scene, { x: x - 0.45, y: y + 1.65, z: z - 0.06, rotY: Math.PI, w: 0.5, h: 0.3, text: ['FIFTH PLACE'], stamp: 'HOLD', sub: 'HOLD FOR EQUIPMENT REVIEW', visible: false });
    solid(colliders, x, z, y, 1.1, 2.3);
    stateHooks?.push((state) => { const k = n(state); card1.set({ visible: k >= 4 }); card2.set({ visible: k >= 4 }); filled.set({ big: k >= 9 ? '4 FILLED POSTS' : '3 FILLED POSTS', tone: k >= 9 ? 'ok' : 'plain' }); });
  }

  // 11. The filled job draws a worker away from the bakery: one figure at the
  //     bakery stall until M4, then at the diner's stove side.
  {
    const baker = figure(scene, 0x8a7a4a, 0xd8ab84);
    baker.position.set(52, at(52, 18), 18); baker.rotation.y = Math.PI / 2;
    const cook = figure(scene, 0x8a7a4a, 0xd8ab84);
    cook.position.set(-24, at(-24, 50), 50); cook.rotation.y = 0; cook.visible = false;
    animate?.(sway(baker, 'x', 0.02, 0.5)); animate?.(sway(cook, 'x', 0.02, 0.6));
    stateHooks?.push((state) => { const k = n(state); baker.visible = k < 4; cook.visible = k >= 4; });
  }

  // 12. Forty application tokens that do not shrink, and a row of lease cards at
  //     reduced rent, outside the housing office (M5).
  {
    const x = -38, z = -3, y = at(x, z);
    for(const dz of [-1.0, 1.0]) box(scene, 0.1, 2.2, 0.1, x, y + 1.1, z + dz, LUMBER());
    box(scene, 0.08, 1.3, 2.2, x, y + 1.55, z, PLY());
    const tokens = [];
    const tokenMat = mat('boom.token', () => new THREE.MeshStandardMaterial({ color: 0xc4342a, roughness: 0.6 }));
    for(let i = 0; i < 40; i++){
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 10), tokenMat);
      t.rotation.z = Math.PI / 2;
      t.position.set(x + 0.06, y + 2.05 - Math.floor(i / 10) * 0.16, z - 0.9 + (i % 10) * 0.2);
      t.visible = false; scene.add(t); tokens.push(t);
    }
    const waiting = slip(scene, { x: x + 0.07, y: y + 1.25, z: z - 0.5, rotY: Math.PI / 2, w: 0.7, h: 0.22, text: ['40 WAITING'], visible: false });
    const leases = [0, 1, 2].map(i => slip(scene, { x: x + 0.07, y: y + 1.25, z: z + 0.25 + i * 0.3, rotY: Math.PI / 2, w: 0.26, h: 0.2, text: ['REDUCED', 'RENT'], visible: false, pin: 'clip' }));
    solid(colliders, x, z, y, 0.6, 2.3);
    stateHooks?.push((state) => { const k = n(state); tokens.forEach(t => { t.visible = k >= 5; }); waiting.set({ visible: k >= 5 }); leases.forEach(l => l.set({ visible: k >= 5 })); });
  }

  // 13/17. The freight yard's slot board: fifty slots, thirty lit after the fee
  //        loses twenty bookings (M6); the entry barrier goes up (M10); twenty
  //        pallets fewer in the yard.
  {
    const x = 56, z = 44, y = at(x, z);
    for(const dx of [-1.6, 1.6]) box(scene, 0.12, 3.0, 0.12, x + dx, y + 1.5, z, STEEL());
    box(scene, 3.4, 1.6, 0.1, x, y + 2.2, z, MATERIALS.paintedSteel(0x2a2f35));
    const lit = mat('boom.slotlit', () => new THREE.MeshStandardMaterial({ color: 0x3a4a2a, emissive: 0x9ad07a, emissiveIntensity: 1.2 }));
    const dark = mat('boom.slotdark', () => new THREE.MeshStandardMaterial({ color: 0x1c1f22, roughness: 0.8 }));
    const slots = [];
    for(let i = 0; i < 50; i++){
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.03), lit);
      s.position.set(x - 1.45 + (i % 10) * 0.32, y + 2.75 - Math.floor(i / 10) * 0.28, z + 0.07);
      scene.add(s); slots.push(s);
    }
    const label = statusPanel(scene, { x, y: y + 3.3, z: z + 0.02, rotY: 0, w: 3.2, h: 0.42, title: 'Freight terminal', big: '50 SLOTS', tone: 'plain', lit: true });
    solid(colliders, x, z, y, 1.8, 3.2);
    // The barrier across the yard entrance.
    const bx = 46, bz = 46, by = at(bx, bz);
    const arm = box(scene, 6, 0.12, 0.12, bx, by + 1.1, bz, MATERIALS.paintedSteel(0xc4342a));
    arm.geometry = arm.geometry.clone().translate(3, 0, 0); arm.visible = false;
    cyl(scene, 0.12, 1.2, bx, by + 0.6, bz, STEEL());
    const barrierBox = new THREE.Box3(); const shut = new THREE.Box3(new THREE.Vector3(bx, by, bz - 0.3), new THREE.Vector3(bx + 6, by + 1.4, bz + 0.3));
    colliders?.push(barrierBox);
    // Twenty pallets that leave with the bookings.
    const pallets = [];
    for(let i = 0; i < 20; i++){
      const px = 40 + (i % 5) * 1.6, pz = 30 + Math.floor(i / 5) * 1.5;
      pallets.push(box(scene, 1.2, 0.9, 1.0, px, at(px, pz) + 0.45, pz, PLY()));
    }
    stateHooks?.push((state) => {
      const k = n(state);
      slots.forEach((s, i) => { s.material = (k >= 6 && i >= 30) ? dark : lit; });
      label.set(k >= 10 ? { big: '30 UNUSED SLOTS', tone: 'warn' } : k >= 6 ? { big: '30 BOOKED', tone: 'plain' } : { big: '50 SLOTS', tone: 'plain' });
      arm.visible = k >= 10; if(k >= 10) barrierBox.copy(shut); else barrierBox.makeEmpty();
      pallets.forEach(p => { p.visible = k < 6; });
    });
  }

  // 14/15. The supplier's shopfront in the market row: shutter down until its
  //        lease is reviewed (M7); vendor permit placards on the stalls (M8).
  {
    const x = 50, z = 14, y = at(x, z);
    for(const dx of [-1.6, 1.6]) box(scene, 0.14, 2.6, 0.14, x + dx, y + 1.3, z, LUMBER());
    box(scene, 3.6, 0.14, 2.4, x, y + 2.6, z - 1.0, MATERIALS.paintedSteel(0x8a6921));
    box(scene, 3.2, 0.9, 1.6, x, y + 0.45, z - 1.0, LUMBER());
    const shutter = box(scene, 3.3, 2.2, 0.06, x, y + 1.45, z + 0.1, MATERIALS.paintedSteel(0x8a9298));
    const review = slip(scene, { x: x + 1.9, y: y + 1.7, z: z + 0.12, rotY: 0, w: 0.5, h: 0.3, text: ['LEASE REVIEW'], sub: 'next month', visible: false });
    const permits = [[-22, 51], [-16, 51], [48, 18], [54, 18]].map(([px, pz], i) =>
      slip(scene, { x: px, y: at(px, pz) + 1.9, z: pz, rotY: pz > 40 ? Math.PI : Math.PI / 2, w: 0.4, h: 0.26, text: ['VENDOR PERMIT'], visible: false, tone: 'card', tilt: (i % 2 - 0.5) * 0.08 }));
    solid(colliders, x, z - 1, y, 1.8, 2.6);
    stateHooks?.push((state) => { const k = n(state); shutter.visible = k < 7; review.set({ visible: k >= 7 }); permits.forEach(p => p.set({ visible: k >= 8 })); });
  }

  // 18. The pond itself: a discoloured inflow reach on the north shore and a
  //     sampling post with a dated photograph (M12).
  {
    const x = 3, z = -16.5, y = at(x, z);
    const stain = box(scene, 6, 0.03, 3.2, x - 2, at(x - 2, z + 1.2) - 0.3, z + 1.8, mat('boom.stain', () => new THREE.MeshStandardMaterial({ color: 0x5a4a2c, roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.7 })));
    stain.userData.ignoreAudit = true;
    cyl(scene, 0.06, 1.4, x, y + 0.7, z, STEEL());
    const photo = slip(scene, { x, y: y + 1.55, z: z + 0.02, rotY: 0, w: 0.42, h: 0.32, text: ['POND'], sub: '$40 per freight unit', tone: 'card', visible: false });
    const sample = slip(scene, { x, y: y + 1.2, z: z + 0.02, rotY: 0, w: 0.42, h: 0.18, text: ['SAMPLE POINT'], pin: false });
    stateHooks?.push((state) => { const k = n(state); photo.set({ visible: k >= 12 }); sample.set({ visible: true }); });
  }

  // 21. Freight arrives by road: a box truck and a pickup on the bridge road,
  //     checkpoint to the yard and back, headlights at dusk.
  {
    const route = [[16, 110], [16, 62], [30, 48], [46, 40], [44, 30], [30, 46], [16, 60]].map(([x, z]) => ({ x, y: at(x, z), z }));
    const truck = vehicle(scene, 16, 110, at(16, 110), { facing: 0, colour: 0xd8d3c4, box: true });
    const pickup = vehicle(scene, 16, 80, at(16, 80), { facing: 0, colour: 0x6e2a1e, box: false });
    const movers = [patrol(truck.group, route, 6.5), patrol(pickup.group, route.slice().reverse(), 8)];
    // The pickup starts halfway round.
    movers[1](0, 20);
    animate?.((t, dt) => { for(const m of movers) m(t, dt); for(const w of [...truck.wheels ?? [], ...pickup.wheels ?? []]) w.rotation.x += dt * 4; });
  }

  // 23. The clinic has a cross; 24. the modular homes have people in them:
  //     chairs out front, a washing line, a barbecue.
  {
    const x = 58, z = 32.9, y = at(58, 33);
    box(scene, 0.9, 0.24, 0.08, x, y + 4.6, z, MATERIALS.paintedSteel(0xc4342a));
    box(scene, 0.24, 0.9, 0.08, x, y + 4.6, z, MATERIALS.paintedSteel(0xc4342a));
    for(let i = 0; i < 3; i++){
      const hx = 24 + i * 5, hz = 31.2, hy = at(hx, hz);
      box(scene, 0.5, 0.05, 0.5, hx, hy + 0.45, hz, LUMBER()); box(scene, 0.5, 0.5, 0.05, hx, hy + 0.7, hz - 0.22, LUMBER());
      for(const [dx, dz] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]]) cyl(scene, 0.02, 0.45, hx + dx, hy + 0.22, hz + dz, LUMBER());
      softColliders?.push({ x: hx, z: hz, r: 0.5 });
    }
    const wy = at(36, 31);
    for(const wx of [34, 40]) cyl(scene, 0.05, 2.2, wx, wy + 1.1, 31.5, LUMBER());
    const line = cyl(scene, 0.015, 6, 37, wy + 2.1, 31.5, MATERIALS.steel()); line.rotation.z = Math.PI / 2;
    for(let i = 0; i < 4; i++){ const sh = box(scene, 0.03, 0.8, 0.6, 34.8 + i * 1.5, wy + 1.65, 31.5, mat('boom.wash', () => new THREE.MeshStandardMaterial({ color: 0x9aa8b8, roughness: 0.95 }))); animate?.(sway(sh, 'x', 0.14, 0.7 + i * 0.1, i)); }
    const bq = cyl(scene, 0.3, 0.5, 44, at(44, 31) + 0.55, 31, MATERIALS.paintedSteel(0x22262a)); void bq;
  }

  // 25. Parcel collection: a lean-to shelf whose parcels stack up by mission.
  {
    const x = 50, z = 18, y = at(x, z);
    void x; void z; void y;
    const px = 47, pz = 26, py = at(px, pz);
    for(const dx of [-1.2, 1.2]) box(scene, 0.12, 2.3, 0.12, px + dx, py + 1.15, pz, LUMBER());
    box(scene, 2.8, 0.08, 1.4, px, py + 2.3, pz - 0.4, MATERIALS.paintedSteel(0x6a6055));
    for(const sy of [0.5, 1.1, 1.7]) box(scene, 2.4, 0.06, 0.7, px, py + sy, pz - 0.3, LUMBER());
    const parcels = [];
    for(let i = 0; i < 15; i++){
      const p = box(scene, 0.34, 0.28, 0.3, px - 1.0 + (i % 6) * 0.4, py + 0.68 + Math.floor(i / 6) * 0.6, pz - 0.3, mat('boom.parcel', () => new THREE.MeshStandardMaterial({ color: 0xa8905e, roughness: 0.95 })));
      p.visible = false; parcels.push(p);
    }
    sign(scene, 'PARCEL COLLECTION', { x: px, y: py + 2.7, z: pz + 0.2, w: 2.6, h: 0.5, facing: 0 });
    solid(colliders, px, pz - 0.3, py, 1.4, 2.4);
    stateHooks?.push((state) => { const d = day(state); parcels.forEach((p, i) => { p.visible = i < d; }); });
  }

  // 29. The rim is the view: three benches on the mesa's edge, facing out.
  for(const [x, z, f] of [[86, 10, -Math.PI / 2], [-86, 14, Math.PI / 2], [12, -86, Math.PI]]){
    bench(scene, x, z, at(x, z), f);
    softColliders?.push({ x, z, r: 1.2 });
  }

  // 28. Dust on the mesa afternoons; the wind drops on the last day.
  stateHooks?.push((state) => {
    const d = day(state);
    weather?.set?.({ kind: 'dust', density: d >= 15 ? 0.08 : 0.3 + (d % 4) * 0.08, wind: { x: 2.8, z: 1.2 } });
  });
  storyExtras(scene, ctx);
  void scrollUV;
}

// =============================================================== the rooms

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.face(spec.dx ?? 0, spec.y ?? 1.5), ...spec }) : null; };
  const onWall = (fid, side, spec) => { const a = at(fid); return a ? slip(group, { ...a.wallPanel(side, spec.y ?? 1.75, spec.gap ?? 1.1), ...spec }) : null; };
  const panel = (fid, side, spec) => { const a = at(fid); return a ? statusPanel(group, { ...a.wallPanel(side, spec.y ?? 1.95), w: 1.4, h: 0.8, lit: true, ...spec }) : null; };
  const hooks = [];

  switch(id){
    case 'T': {
      // 1–5. The public notice board: fifteen labelled agreement slots behind a
      //      clear cover, filling one per mission; the receipts; the revoked stamp.
      const slots = TITLES.map((t, i) => onFace('public-notice-board', { dx: -0.5 + (i % 5) * 0.25, y: 1.78 - Math.floor(i / 5) * 0.27, w: 0.22, h: 0.2, text: [t], visible: false, pin: false, tilt: ((i * 7) % 3 - 1) * 0.03 }));
      const header = panel('public-notice-board', 1, { title: 'Public notices', big: HEADER(1), tone: 'plain', w: 1.6 });
      const oldPrice = onFace('budget-desk', { dx: -0.35, y: 1.6, w: 0.34, h: 0.24, text: ['OLD-PRICE', 'ORDER COUNT'], visible: false });
      const receipt = onFace('budget-desk', { dx: 0.35, y: 1.6, w: 0.34, h: 0.24, text: ['NEW SALES', 'RECEIPT'], visible: false });
      const shortage = onFace('budget-desk', { dx: 0, y: 1.25, w: 0.4, h: 0.2, text: ['90 − 60 = 30 lunches per day'], visible: false, pin: 'clip' });
      const pact = onFace('hearing-table', { dx: -0.35, y: 1.6, w: 0.42, h: 0.26, text: ['GUARANTEED SERVICE'], sub: 'pact forecast', visible: false });
      const conditional = onFace('hearing-table', { dx: 0.35, y: 1.6, w: 0.36, h: 0.22, text: ['CONDITIONAL'], visible: false, tone: 'card' });
      const map = panel('town-map', -1, { title: 'Town map', big: 'SERVICES AND ACCESS', tone: 'plain' });
      const signed = onFace('hearing-table', { dx: 0, y: 1.25, w: 0.5, h: 0.24, text: ['READY TO SIGN AFTER', 'RESOURCE CHECK'], visible: false });
      hooks.push((state) => {
        const k = n(state);
        slots.forEach((s, i) => s?.set({ visible: k > i }));
        header?.set({ big: HEADER(day(state)), tone: k >= 15 ? 'ok' : 'plain' });
        oldPrice?.set({ visible: k >= 2 }); receipt?.set({ visible: k >= 2 }); shortage?.set({ visible: k >= 2 });
        pact?.set({ visible: k >= 10, struck: k >= 11 }); conditional?.set({ visible: k >= 11 });
        map?.set(k >= 14 ? { big: 'ACCESS RETROFIT', tone: 'ok', small: 'full-range test' } : k >= 12 ? { big: '30 FREIGHT UNITS', tone: 'warn', small: 'corrected efficiency target' } : k >= 5 ? { big: 'TENANT RELIEF', tone: 'plain', small: 'not a promise of a home for all' } : { big: 'SERVICES AND ACCESS', tone: 'plain', small: '' });
        signed?.set({ visible: day(state) >= 15, text: k >= 15 ? ['SIGNED'] : ['READY TO SIGN AFTER', 'RESOURCE CHECK'] });
      });
      break;
    }
    case 'CM': {
      // 7/14/15. The completed-work tag; the supplier's lease review and permit
      //          placards; staffing counters that go from three to four.
      const tag = onFace('cost-ledger-desk', { dx: 0.4, y: 1.3, w: 0.34, h: 0.2, text: ['COMPLETED WORK'], sub: '2 meal boxes per repair hour', visible: false, pin: 'clip' });
      const review = onFace('supplier-shelves', { dx: -0.4, y: 1.6, w: 0.4, h: 0.26, text: ['LEASE REVIEW'], sub: 'next month', visible: false });
      const permits = [0, 1].map(i => onFace('supplier-shelves', { dx: 0.2 + i * 0.32, y: 1.6, w: 0.28, h: 0.22, text: ['VENDOR', 'PERMIT'], visible: false, tone: 'card' }));
      const counters = [0, 1, 2, 3, 4].map(i => onFace('kitchen-planning-table', { dx: -0.5 + i * 0.25, y: 1.3, w: 0.2, h: 0.16, text: [`COOK ${i + 1}`], visible: i < 3, pin: false }));
      const order = panel('order-terminal', 1, { title: 'Order terminal', big: 'ORDERS', tone: 'plain' });
      const fifth = onFace('kitchen-planning-table', { dx: 0.5, y: 1.3, w: 0.2, h: 0.16, text: ['COOK 5'], stamp: 'HOLD', visible: false, pin: false });
      hooks.push((state) => {
        const k = n(state);
        tag?.set({ visible: k >= 1 }); review?.set({ visible: k >= 7 }); permits.forEach(p => p?.set({ visible: k >= 8 }));
        counters.forEach((c, i) => c?.set({ visible: i < 3 || (i === 3 && k >= 4) }));
        fifth?.set({ visible: k >= 4 });
        order?.set(k >= 9 ? { big: '4 × $30 = $120', tone: 'ok', small: 'wage bill' } : k >= 6 ? { big: '4 × 30 = $120 per day', tone: 'plain', small: 'taxed deliveries' } : k >= 4 ? { big: '12 × 5 = $60 per shift', tone: 'ok', small: 'fourth cook' } : k >= 1 ? { big: '2 × 4 = 8 boxes', tone: 'ok', small: '' } : { big: 'ORDERS', tone: 'plain', small: '' });
      });
      break;
    }
    case 'E': {
      // 13/17. The freight wall map's thirty lit slots; the booking terminal's
      //        model; the pact's stamp on the contract table.
      const map = panel('freight-wall-map', 1, { title: 'Freight wall map', big: '50 SLOTS', tone: 'plain' });
      const booking = panel('booking-terminal', -1, { title: 'Booking terminal', big: 'ARCHIVE', tone: 'plain' });
      const pact = onFace('contract-table', { dx: -0.3, y: 1.6, w: 0.44, h: 0.28, text: ['PACT'], sub: '40 + 40 = 80 thousand dollars daily', visible: false });
      const stamp = onFace('contract-table', { dx: 0.35, y: 1.6, w: 0.34, h: 0.22, text: ['GUARANTEED SERVICE'], visible: false, tone: 'card' });
      const dispatch = onFace('dispatch-desk', { dx: 0, y: 1.3, w: 0.44, h: 0.2, text: ['P = 100 − 2 × 20 = $60 per slot'], visible: false, pin: 'clip' });
      hooks.push((state) => {
        const k = n(state);
        map?.set(k >= 10 ? { big: '30 UNUSED SLOTS', tone: 'warn', small: 'entry barrier' } : k >= 6 ? { big: '30 BOOKED', tone: 'plain', small: '20 bookings lost' } : { big: '50 SLOTS', tone: 'plain', small: '' });
        booking?.set(k >= 14 ? { big: 'RETROFIT: 15', tone: 'ok', small: 'net resource benefit' } : k >= 10 ? { big: 'MR = MC · Q = 20 · P = 60', tone: 'warn', small: 'capacity 50 − 20 = 30' } : { big: 'ARCHIVE', tone: 'plain', small: '' });
        pact?.set({ visible: k >= 10 }); stamp?.set({ visible: k >= 10, struck: k >= 11, sub: k >= 11 ? 'REVOKED · CONDITIONAL' : '' });
        dispatch?.set({ visible: k >= 10 });
      });
      break;
    }
    case 'P': {
      // 12/16. Lease cards at reduced rent and forty tokens waiting; the job board;
      //        the co-op's confirmed funding on the meeting table.
      const leases = [0, 1, 2, 3].map(i => onFace('lease-desk', { dx: -0.45 + i * 0.3, y: 1.7, w: 0.26, h: 0.2, text: ['REDUCED', 'RENT'], visible: false, pin: 'clip' }));
      const waiting = onFace('lease-desk', { dx: 0, y: 1.3, w: 0.5, h: 0.22, text: ['40 APPLICATIONS WAITING'], visible: false });
      const jobs = panel('job-board', -1, { title: 'Job board', big: '3 FILLED POSTS', tone: 'plain' });
      const card1 = onFace('job-board', { dx: -0.3, y: 1.62, w: 0.36, h: 0.24, text: ['FOURTH COOK'], visible: false });
      const card2 = onFace('job-board', { dx: 0.3, y: 1.62, w: 0.36, h: 0.24, text: ['FIFTH PLACE'], stamp: 'HOLD', sub: 'HOLD FOR EQUIPMENT REVIEW', visible: false });
      const funded = onFace('meeting-table', { dx: 0, y: 1.6, w: 0.5, h: 0.28, text: ['120 + 30 = $150 daily'], sub: 'confirmed funding · plan cost $150', visible: false });
      hooks.push((state) => {
        const k = n(state);
        leases.forEach(l => l?.set({ visible: k >= 5 })); waiting?.set({ visible: k >= 5 });
        jobs?.set({ big: k >= 9 ? '4 FILLED POSTS' : '3 FILLED POSTS', tone: k >= 9 ? 'ok' : 'plain' });
        card1?.set({ visible: k >= 4 }); card2?.set({ visible: k >= 4 });
        funded?.set({ visible: k >= 15 });
      });
      break;
    }
    case 'X': {
      // 18–20. The measured damage cost beside the pond photograph; the corrected
      //        target on the catchment map; the untaxed filter quote pinned to the
      //        compliance plan and the tariff transfers' own column; the retrofit's
      //        full-range test label.
      const photo = onFace('water-record-desk', { dx: -0.4, y: 1.62, w: 0.36, h: 0.28, text: ['POND'], sub: 'sample photograph', tone: 'card' });
      const cost = onFace('water-record-desk', { dx: 0.35, y: 1.62, w: 0.4, h: 0.26, text: ['$40 PER FREIGHT UNIT'], sub: 'private 20 + external 20', visible: false });
      const catchment = panel('catchment-map', 1, { title: 'Catchment map', big: 'WITHDRAWALS', tone: 'plain' });
      const quote = onFace('planning-terminal', { dx: -0.35, y: 1.62, w: 0.4, h: 0.26, text: ['UNTAXED FILTER QUOTE'], sub: 'compliance plan', visible: false });
      const transfers = onFace('planning-terminal', { dx: 0.35, y: 1.62, w: 0.36, h: 0.26, text: ['TARIFF', 'TRANSFERS'], sub: 'own column', visible: false, tone: 'card' });
      const retrofit = onFace('permit-counter', { dx: 0, y: 1.6, w: 0.46, h: 0.26, text: ['ACCESS RETROFIT'], sub: 'FULL-RANGE TEST', visible: false });
      hooks.push((state) => {
        const k = n(state);
        cost?.set({ visible: k >= 12 }); photo?.set({ visible: true });
        catchment?.set(k >= 12 ? { big: 'Q = 30', tone: 'ok', small: '100 − 2Q = 20 + 20' } : k >= 10 ? { big: 'Q = 40', tone: 'warn', small: 'no-harm benchmark' } : { big: 'WITHDRAWALS', tone: 'plain', small: '' });
        quote?.set({ visible: k >= 13 }); transfers?.set({ visible: k >= 13 });
        retrofit?.set({ visible: k >= 14 });
      });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list. A town six weeks into a boom has a crane over its
// building site, a food truck where the queue is, cook-fires at the tent row
// after dark, and ravens over the pond.
export function storyExtras(scene, ctx){
  const { groundHeight, animate, colliders, softColliders, stateHooks } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // The crane over the build site at the housing office: a mast, a jib that
  // swings slowly, a hook on a cable.
  {
    const x = -60, z = 4, y = at(x, z);
    box(scene, 2.2, 0.6, 2.2, x, y + 0.3, z, MATERIALS.concrete());
    const mast = MATERIALS.paintedSteel(0xc9962a);
    for(const [dx, dz] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) box(scene, 0.12, 16, 0.12, x + dx, y + 8.3, z + dz, mast);
    for(let i = 1; i < 8; i++){ box(scene, 1.1, 0.06, 0.06, x, y + i * 2.1, z - 0.5, mast); box(scene, 1.1, 0.06, 0.06, x, y + i * 2.1, z + 0.5, mast); }
    const jib = new THREE.Group(); jib.position.set(x, y + 16.4, z); scene.add(jib);
    box(jib, 14, 0.5, 0.5, 5.5, 0, 0, mast); box(jib, 4.5, 0.5, 0.5, -3.0, 0, 0, mast);
    box(jib, 1.6, 1.0, 1.4, -4.6, 0.2, 0, MATERIALS.concrete());          // counterweight
    box(jib, 1.2, 1.1, 1.0, 0.9, -0.9, 0, MATERIALS.paintedSteel(0x3a3f45)); // cab
    const cable = cyl(jib, 0.02, 9, 10, -4.5, 0, MATERIALS.steel());
    const hook = box(jib, 0.5, 0.5, 0.5, 10, -9.2, 0, MATERIALS.paintedSteel(0x3a3f45));
    box(jib, 1.6, 1.0, 1.2, 10, -10.0, 0, LUMBER());                        // a load
    animate?.((t, dt) => { jib.rotation.y = Math.sin(t * 0.08) * 1.2; cable.scale.y = 1 + Math.sin(t * 0.21) * 0.25; hook.position.y = -9.2 - Math.sin(t * 0.21) * 2.2; });
    solid(colliders, x, z, y, 1.4, 17);
  }

  // A food truck at the head of the lunch queue: awning, counter, a lit strip.
  {
    const x = 14, z = -16, y = at(x, z);
    const v = vehicle(scene, x, z, y, { facing: Math.PI / 2, colour: 0xe0c060, box: true });
    void v;
    const awning = box(scene, 4.2, 0.08, 1.8, x, y + 2.7, z + 2.0, mat('boom.awning', () => new THREE.MeshStandardMaterial({ color: 0xb8352a, roughness: 0.9 })));
    awning.rotation.x = 0.18;
    for(const dx of [-1.9, 1.9]) cyl(scene, 0.04, 2.2, x + dx, y + 1.5, z + 2.8, STEEL());
    const strip = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.12, 0.06), mat('boom.strip', () => new THREE.MeshStandardMaterial({ color: 0xffe9b0, emissive: 0xffd080, emissiveIntensity: 1.6 })));
    strip.position.set(x, y + 2.55, z + 1.2); scene.add(strip);
    box(scene, 4.0, 0.9, 0.5, x, y + 1.0, z + 1.3, LUMBER());
    softColliders?.push({ x, z: z + 1.5, r: 2.6 });
  }

  // Cook-fires at the tent row: a ring of stones, embers that pulse, and smoke.
  {
    const embers = new THREE.MeshStandardMaterial({ color: 0x3a1a10, emissive: 0xff6a20, emissiveIntensity: 1.2 });
    const smoke = mat('boom.smoke', () => new THREE.MeshBasicMaterial({ color: 0x8a8378, transparent: true, opacity: 0.16, depthWrite: false }));
    for(const [x, z] of [[-99, 10], [-99, 34], [-99, 58]]){
      const y = at(x, z);
      for(let i = 0; i < 8; i++){ const a = (i / 8) * Math.PI * 2; box(scene, 0.3, 0.2, 0.3, x + Math.cos(a) * 0.6, y + 0.1, z + Math.sin(a) * 0.6, MATERIALS.concrete()); }
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.3, 7, 5), embers); e.scale.y = 0.4; e.position.set(x, y + 0.1, z); scene.add(e);
      for(let i = 0; i < 3; i++){ const p = new THREE.Mesh(new THREE.SphereGeometry(0.3 + i * 0.2, 6, 5), smoke); p.position.set(x + i * 0.3, y + 1.2 + i * 0.9, z); p.userData.ignoreAudit = true; scene.add(p); animate?.(bob(p, 0.25, 0.4 + i * 0.1, i)); }
      // Two people at each fire, which is what makes a camp a camp.
      for(const s of [-1, 1]){ const f = figure(scene, s > 0 ? 0x47603f : 0x6b4a3a); f.position.set(x + s * 1.2, y, z + 0.4); f.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2; animate?.(sway(f, 'x', 0.02, 0.5 + s * 0.1)); }
      softColliders?.push({ x, z, r: 1.8 });
    }
    animate?.((t) => { embers.emissiveIntensity = 0.9 + Math.sin(t * 6) * 0.25 + Math.sin(t * 13) * 0.15; });
  }

  // Ravens over the pond: three that circle and one on the jetty post.
  {
    const dark = mat('boom.raven', () => new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.9 }));
    const bird = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 5), dark); b.scale.set(1.5, 0.8, 1); g.add(b); const w = [box(g, 0.3, 0.02, 0.42, 0, 0.04, 0.25, dark), box(g, 0.3, 0.02, 0.42, 0, 0.04, -0.25, dark)]; return { g, w }; };
    const flock = [0, 1, 2].map(i => { const b = bird(); scene.add(b.g); return { ...b, phase: i * 2.1, r: 9 + i * 3 }; });
    animate?.((t) => { flock.forEach((b, i) => { const a = t * 0.35 + b.phase; b.g.position.set(Math.cos(a) * b.r, at(0, -8) + 7 + Math.sin(t * 0.9 + i) * 1.5, -8 + Math.sin(a) * b.r); b.g.rotation.y = -a + Math.PI / 2; b.w.forEach((w, k) => { w.rotation.x = (k ? -1 : 1) * Math.sin(t * 8 + i) * 0.5; }); }); });
    const sitter = bird(); sitter.g.position.set(6.4, at(6, -3) + 1.1, -3); sitter.g.rotation.y = 2.2; scene.add(sitter.g);
  }
  void stateHooks;
}
