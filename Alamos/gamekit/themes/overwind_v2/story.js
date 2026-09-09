// story.js — Kerrow No. 3 changing as the twelve days do.
//
// The bible is the most physical of the four: twelve `### Physical aftermath`
// blocks, each with a home fixture, a before and an exact after — "Ewan ties the
// superseded tag through the drawing clip", "Ruth clips the added cage-trace box
// beside the drum-check box", "Ewan pins the slower timetable above the
// crossed-out promise". Forty-one tallies on hooks in a lamp room nobody could
// enter. A gate that opens on day 12 with a shift waiting to go through it.
// See gamekit/STORY_DRESSING_PASS.md §2; the numbers below are its list.
//
// `storyOutdoors` runs from `decorate`; `dressRoom` runs when a room is built.
// Every word on a slip is the bible's own — the aftermath's After line, the
// State/output line, or the mission header.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, blink, patrol, spin } from '../../engine/world/animators.js';
import { statusPanel, slip, tallyRail, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

const STEEL = () => MATERIALS.paintedSteel(0x6a6f72);
const OXIDE = () => MATERIALS.paintedSteel(0x8a4a32);
const TIMBER = () => mat('kerrow.timber', () => new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.92 }));
const CHALK = () => mat('kerrow.chalk', () => new THREE.MeshStandardMaterial({ color: 0xd8d4c8, roughness: 0.95 }));

/** The bible's day header, verbatim. v1.3 writes "INSPECTION TODAY" for the last. */
const HEADER = (day) => day >= 12 ? 'DAY 12 OF 12 — INSPECTION TODAY'
  : `DAY ${day} OF 12 — INSPECTION IN ${12 - day} DAYS`;

function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r), new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

/** A miner: enough of a figure to read as one at ten metres, with a lamp. */
function miner(parent, colour = 0x3a3630){
  const g = new THREE.Group();
  const cloth = mat(`kerrow.miner.${colour}`, () => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.95 }));
  const skin = mat('kerrow.skin', () => new THREE.MeshStandardMaterial({ color: 0x9a7358, roughness: 0.9 }));
  cyl(g, 0.26, 0.9, 0, 1.15, 0, cloth);
  for(const s of [-1, 1]) cyl(g, 0.11, 0.75, s * 0.14, 0.38, 0, cloth);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), skin); head.position.y = 1.78; g.add(head);
  const hat = cyl(g, 0.19, 0.12, 0, 1.9, 0, MATERIALS.paintedSteel(0xc9a23f));
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe9b0, emissiveIntensity: 2.2 }));
  lamp.position.set(0, 1.86, 0.19); g.add(lamp);
  void hat;
  parent.add(g);
  return g;
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);

  // 25/26. The inspection countdown over the shift board, and moor weather that
  //        clears for the inspector.
  {
    const x = 14, z = 52, y = at(x, z);
    const panel = statusPanel(scene, { x, y: y + 3.35, z: z + 0.15, rotY: 0, w: 3.0, h: 0.55,
      title: 'Kerrow No. 3', big: HEADER(1), tone: 'warn', lit: true });
    stateHooks?.push((state) => {
      const d = day(state);
      panel.set({ big: HEADER(d), tone: d >= 12 ? 'ok' : 'warn' });
      weather?.set?.(d >= 12 ? null : { kind: 'drizzle', density: d % 3 === 0 ? 0.15 : 0.45, wind: { x: 2.2, z: -1.4 } });
    });
  }

  // 15. Nobody goes below until day 12: the shift waits outside the chained gate,
  //     on the timber stack and the change-house step. 14. Then it walks through.
  {
    const waiting = new THREE.Group();
    const spots = [[-5, 20], [-3.4, 21.5], [5.2, 20.5], [7, 22], [3, 23.5], [24, 50], [21, 50.5], [30, 50.2]];
    spots.forEach(([x, z], i) => {
      const m = miner(waiting, [0x3a3630, 0x4a4238, 0x2e3438][i % 3]);
      m.position.set(x, at(x, z), z); m.rotation.y = Math.atan2(0 - x, -4 - z);
      softColliders?.push({ x, z, r: 0.45 });
    });
    scene.add(waiting);
    // The shift: eight miners in a file, change house to the cage, on a loop.
    const walking = new THREE.Group(); walking.visible = false; scene.add(walking);
    const route = [[26, 40], [18, 30], [8, 22], [0, 17], [0, 8], [0, 0], [-4, -1], [-8, 6], [-4, 14], [6, 26], [18, 38]]
      .map(([x, z]) => ({ x, y: at(x, z), z }));
    const movers = [];
    for(let i = 0; i < 8; i++){
      const m = miner(walking, [0x3a3630, 0x4a4238, 0x2e3438][i % 3]);
      const start = i * 2.2;
      // Stagger along the route by leading each walker a few metres.
      const shifted = route.map((p, k) => route[(k + Math.floor(start / 3)) % route.length] ?? p);
      movers.push(patrol(m, shifted, 1.25 + (i % 3) * 0.08));
      animate?.(bob(m, 0.03, 6 + i * 0.3, i));
    }
    animate?.((t, dt) => { if(walking.visible) for(const mv of movers) mv(t, dt); });
    stateHooks?.push((state) => { const k = n(state); waiting.visible = k < 12; walking.visible = k >= 12; });
  }

  // 22/23. The tip: ore on the belt, a belt that trips until the staged chute is
  //        fitted, and the chute itself — chalk outline on day 6, steel by day 8.
  {
    const bins = [[30, -22], [38, -22]];
    const lumps = [];
    const ore = mat('kerrow.ore', () => new THREE.MeshStandardMaterial({ color: 0x2a2724, roughness: 0.95 }));
    // The gallery runs from (40,-34) rising; ore rides it toward the bins.
    const belt = [];
    for(let i = 10; i >= 0; i--){ const x = 40 + i * 7.5, z = -34 - i * 1.6; belt.push({ x, y: at(x, z) + 4.2 + i * 0.55 + 0.45, z }); }
    belt.push({ x: 34, y: at(34, -26) + 4.6, z: -26 }, { x: 34, y: at(34, -26) + 1.4, z: -24 });
    for(let i = 0; i < 12; i++){
      const l = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28 + (i % 3) * 0.08, 0), ore);
      scene.add(l); lumps.push({ mesh: l, mover: patrol(l, belt, 2.4), lead: i * 9 });
    }
    // Pre-roll each lump so they are spread along the belt from the first frame.
    for(const l of lumps) l.mover(0, l.lead);
    let tripped = false, clock = 0, tripsOn = true;
    animate?.((t, dt) => {
      clock += dt;
      if(tripsOn){ if(!tripped && clock > 34){ tripped = true; clock = 0; } if(tripped && clock > 5){ tripped = false; clock = 0; } }
      else tripped = false;
      if(tripped) return;
      for(const l of lumps) l.mover(t, dt);
    });
    // Puffs where the ore drops into the bin.
    const dust = mat('kerrow.dust', () => new THREE.MeshBasicMaterial({ color: 0x9a8f80, transparent: true, opacity: 0.18, depthWrite: false }));
    for(let i = 0; i < 3; i++){
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.6 + i * 0.3, 7, 5), dust);
      p.position.set(34 + i * 0.4, at(34, -24) + 3.6 + i * 0.5, -24); p.userData.ignoreAudit = true; scene.add(p);
      animate?.(bob(p, 0.3, 0.8 + i * 0.2, i));
    }
    // The chute: outline first, then two steel steps above the bin.
    const outline = new THREE.Group(); outline.visible = false; scene.add(outline);
    const steel = new THREE.Group(); steel.visible = false; scene.add(steel);
    for(const [bx, bz] of bins){
      const y = at(bx, bz);
      const o = box(outline, 2.6, 0.06, 1.6, bx, y + 3.45, bz, CHALK()); o.userData.ignoreAudit = true;
      const s1 = box(steel, 2.6, 0.18, 1.6, bx, y + 4.4, bz + 0.6, STEEL()); s1.rotation.x = 0.55;
      const s2 = box(steel, 2.4, 0.18, 1.4, bx, y + 3.7, bz - 0.4, STEEL()); s2.rotation.x = -0.55;
      for(const s of [-1, 1]) box(steel, 0.12, 1.5, 0.12, bx + s * 1.25, y + 4.1, bz, STEEL());
    }
    const tag = slip(scene, { x: 33.5, y: at(33.5, -19.6) + 1.5, z: -19.6, rotY: 0, w: 0.5, h: 0.3, text: ['INSTALL', 'STAGED CHUTE'], visible: false });
    stateHooks?.push((state) => {
      const k = n(state);
      tripsOn = k < 6;
      outline.visible = k >= 6 && k < 8; tag.visible = k >= 6 && k < 8;
      steel.visible = k >= 8;
    });
  }

  // 21. The wreck on the moor gets its meaning: a fenced ring and a dated plate.
  {
    const x = -8, z = -168, y = at(x, z);
    for(let i = 0; i < 8; i++){
      const a = (i / 8) * Math.PI * 2, px = x + Math.cos(a) * 4.2, pz = z + Math.sin(a) * 4.2;
      cyl(scene, 0.05, 1.1, px, at(px, pz) + 0.55, pz, TIMBER());
      const b = (((i + 1) % 8) / 8) * Math.PI * 2, qx = x + Math.cos(b) * 4.2, qz = z + Math.sin(b) * 4.2;
      const mx = (px + qx) / 2, mz = (pz + qz) / 2;
      box(scene, 0.03, 0.03, Math.hypot(qx - px, qz - pz), mx, at(mx, mz) + 0.95, mz, STEEL(), Math.atan2(qx - px, qz - pz));
    }
    cyl(scene, 0.06, 1.5, x + 4.9, y + 0.75, z + 1.0, TIMBER());
    slip(scene, { x: x + 4.9, y: y + 1.55, z: z + 1.0, rotY: 0.4, w: 0.42, h: 0.26, text: ['MARCH'], sub: 'Kerrow No. 3', pin: false, tone: 'card' });
  }

  // 27. The compressor house breathes: a puff every two seconds from its stack.
  {
    const x = 44, z = 18, y = at(x, z);
    cyl(scene, 0.22, 2.6, x, y + 6.7, z, STEEL());
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6),
      mat('kerrow.puff', () => new THREE.MeshBasicMaterial({ color: 0xdadfdc, transparent: true, opacity: 0.22, depthWrite: false })));
    puff.position.set(x, y + 8.2, z); puff.userData.ignoreAudit = true; scene.add(puff);
    animate?.((t) => { const k = (t % 2) / 2; puff.scale.setScalar(0.4 + k * 1.6); puff.position.y = y + 8.0 + k * 1.4; puff.material.opacity = 0.26 * (1 - k); });
  }

  // 18. The depth indicator on the bank's outside wall follows the cage — the same
  //     clock `motion()` drives it with.
  {
    const x = -9, z = 0.6, y = at(x, z);
    const dial = cyl(scene, 0.55, 0.08, x, y + 3.0, z, MATERIALS.paintedSteel(0xe8e2d2));
    dial.rotation.x = Math.PI / 2;
    const needle = box(scene, 0.05, 0.48, 0.03, x, y + 3.0, z + 0.06, MATERIALS.paintedSteel(0xb8352a));
    needle.geometry = needle.geometry.clone().translate(0, 0.22, 0);
    animate?.((t) => {
      const p = (Math.sin(t * 0.22) + 1) / 2;
      const eased = p < 0.12 ? 0 : (p > 0.88 ? 1 : (p - 0.12) / 0.76);
      needle.rotation.z = Math.PI - eased * Math.PI * 1.6;
    });
    sign(scene, 'DEPTH', { x, y: y + 3.85, z: z + 0.1, w: 1.2, h: 0.32, facing: 0 });
  }
  storyExtras(scene, ctx);
  void colliders; void spin;
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
    case 'BANK': {
      // 1. ow-start-sheet: the fast-start proposal posted, then clipped behind the
      //    restricted sheet. 9. ow-two-trace-slip: a cage-trace box beside the drum box.
      const proposal = onFace('signal-board', { dx: -0.35, y: 1.6, w: 0.4, h: 0.28, text: ['FAST START', 'PROPOSAL'], sub: 'a = 2 m/s²' });
      const restricted = onFace('signal-board', { dx: -0.35, y: 1.6, w: 0.42, h: 0.3, text: ['RESTRICTED'], sub: 'retain the slower schedule', visible: false, tone: 'card' });
      const drumBox = onFace('signal-board', { dx: 0.3, y: 1.35, w: 0.3, h: 0.22, text: ['DRUM CHECK'], pin: 'clip' });
      const cageBox = onFace('signal-board', { dx: 0.62, y: 1.35, w: 0.3, h: 0.22, text: ['CAGE TRACE'], pin: 'clip', visible: false });
      const header = panel('signal-board', 1, { title: 'Shift', big: HEADER(1), tone: 'warn' });
      // The depth indicator's fixture gets a live needle too.
      const a = at('depth-dial');
      if(a){
        const p = a.face(0, 1.55, 0.12);
        const needle = box(group, 0.04, 0.4, 0.02, p.x, p.y, p.z, MATERIALS.paintedSteel(0xb8352a), p.rotY);
        needle.geometry = needle.geometry.clone().translate(0, 0.18, 0);
        animate?.((t) => { const k = (Math.sin(t * 0.22) + 1) / 2; needle.rotation.z = Math.PI - k * Math.PI * 1.6; });
      }
      hooks.push((state) => {
        const k = n(state);
        proposal?.set({ visible: k < 1 }); restricted?.set({ visible: k >= 1 });
        cageBox?.set({ visible: k >= 9 }); drumBox?.set({ visible: true });
        header?.set({ big: HEADER(day(state)), tone: day(state) >= 12 ? 'ok' : 'warn' });
      });
      break;
    }
    case 'WIND': {
      // 2. ow-drum-tag: SUPERSEDED tied through the drawing clip.
      const drawing = onWall('drum', 1, { y: 1.7, w: 0.6, h: 0.42, text: ['DRUM DRAWING'], sub: 'solid disk · I = MR²/2', tone: 'card' });
      const superseded = onWall('drum', 1, { y: 1.52, gap: 1.25, w: 0.3, h: 0.16, text: ['SUPERSEDED'], stamp: '', visible: false, tilt: -0.3 });
      // 4. ow-load-envelope: the accepted card clipped to the system drawing.
      const envelope = onTop('winder-desk', { dx: -0.5, w: 0.32, h: 0.22, text: ['LOAD ENVELOPE'], sub: '176000 N at s = 1200 m', pin: false, visible: false, tilt: 0.1 });
      // 8. ow-power-sheet: the power-only proposal, BRAKE PAGE OPEN across it.
      const power = onWall('winder-desk', -1, { y: 1.85, w: 0.5, h: 0.34, text: ['3.5 m/s', 'POWER-ONLY PROPOSAL'], visible: false });
      const brakeOpen = onWall('winder-desk', -1, { y: 1.85, gap: 1.1, w: 0.52, h: 0.2, text: ['BRAKE PAGE OPEN'], visible: false, tilt: -0.18 });
      // 12. ow-shift-sheet: the slower timetable pinned above the crossed-out promise.
      const promise = onWall('winder-desk', 1, { y: 1.7, w: 0.5, h: 0.34, text: ['OVERTIME', 'PROMISED'], sub: 'faster passenger timetable' });
      const slower = onWall('winder-desk', 1, { y: 2.12, w: 0.5, h: 0.3, text: ['2 m/s · 1 m/s² START'], sub: 'signed range · unoccupied acceptance', visible: false });
      // 17. The start control gains a tested acceleration stop on day 4.
      const a = at('winder-desk');
      let stop = null;
      if(a){
        const p = a.wallAbove(1.25);
        const quad = box(group, 0.7, 0.35, 0.06, p.x, p.y, p.z, MATERIALS.paintedSteel(0x3a3f45), p.rotY);
        const lever = box(group, 0.05, 0.5, 0.05, p.x, p.y + 0.15, p.z, STEEL(), p.rotY);
        lever.geometry = lever.geometry.clone().translate(0, 0.2, 0); lever.rotation.z = -0.5;
        stop = box(group, 0.08, 0.12, 0.1, p.x + Math.cos(p.rotY) * 0.22, p.y + 0.16, p.z - Math.sin(p.rotY) * 0.22, MATERIALS.paintedSteel(0xb8352a), p.rotY);
        stop.visible = false;
        void quad;
      }
      // 11. ow-range-sleeve on the test wind trace (from day 11).
      const sleeve = onFace('test-trace', { dx: 0, y: 1.65, w: 0.4, h: 0.26, text: ['TESTED RANGE', 'AND ASSUMPTIONS'], sub: 'warm surrogate', visible: false, tone: 'card' });
      hooks.push((state) => {
        const k = n(state);
        superseded?.set({ visible: k >= 2 }); drawing?.set({ struck: k >= 2 });
        envelope?.set({ visible: k >= 4 });
        power?.set({ visible: k >= 8 }); brakeOpen?.set({ visible: k >= 8 && k < 12 });
        promise?.set({ struck: k >= 11 }); slower?.set({ visible: k >= 12 });
        if(stop) stop.visible = k >= 4;
        sleeve?.set({ visible: k >= 11 });
      });
      break;
    }
    case 'ROPE': {
      // 3. ow-rope-tags: four length tags loose, then each on its sample record.
      const loose = [0, 1, 2, 3].map(i => onTop('rope-bench', { dx: -0.6 + i * 0.12, dz: 0.22, w: 0.14, h: 0.1, text: [`${[6, 9, 12, 15][i]} m`], pin: false, tilt: (i - 1.5) * 0.35 }));
      const fixed = [0, 1, 2, 3].map(i => onTop('rope-bench', { dx: -0.55 + i * 0.36, dz: -0.15, w: 0.24, h: 0.16, text: [`${[6, 9, 12, 15][i]} m`], sub: 'sample record', pin: false, visible: false }));
      const limit = onWall('rope-bench', -1, { y: 1.8, w: 0.5, h: 0.32, text: ['12,000 kg ROPE', 'PULL LIMIT'], sub: 'T = 176000 N at s = 1200 m', visible: false });
      // 19. A hanging test mass that keeps bouncing after its support is still —
      //     at the bible's own ω = 1.25 rad/s, from day 9.
      const a = at('rope-bench');
      let mass = null, rope = null;
      if(a){
        const p = a.wallPanel(1, 2.3, 0.9);
        box(group, 0.5, 0.06, 0.3, p.x, p.y, p.z, STEEL(), p.rotY);
        rope = cyl(group, 0.012, 1.0, p.x, p.y - 0.5, p.z, MATERIALS.steel());
        mass = cyl(group, 0.09, 0.16, p.x, p.y - 1.05, p.z, MATERIALS.paintedSteel(0x3a3f45));
        rope.visible = mass.visible = false;
        animate?.((t) => { const dy = Math.sin(t * 1.25) * 0.12; mass.position.y = p.y - 1.05 + dy; rope.position.y = p.y - 0.5 + dy / 2; rope.scale.y = 1 + dy; });
      }
      const marchTag = onWall('rope-bench', 1, { y: 1.75, gap: 0.5, w: 0.4, h: 0.22, text: ['INCOMPLETE MODEL'], sub: 'drum-only stop prediction', visible: false });
      hooks.push((state) => {
        const k = n(state);
        loose.forEach(s => s?.set({ visible: k < 3 })); fixed.forEach(s => s?.set({ visible: k >= 3 }));
        limit?.set({ visible: k >= 3 });
        if(mass){ mass.visible = rope.visible = k >= 8; }
        marchTag?.set({ visible: k >= 9 });
      });
      break;
    }
    case 'CAGE': {
      // 5. ow-brake-slip: the cold-test slip clipped to the worn-pad tray, and the
      //    energy page accepted while the brake page stays open.
      const cold = onTop('pad-bench', { dx: -0.4, w: 0.32, h: 0.22, text: ['COLD TEST'], sub: 'limits visible', pin: false, visible: false });
      const energy = onWall('body-bench', -1, { y: 1.85, w: 0.46, h: 0.3, text: ['ENERGY PAGE'], sub: 'Wtotal = 120000000 J · ACCEPTED', visible: false });
      const brake = onWall('body-bench', -1, { y: 1.85, gap: 1.6, w: 0.46, h: 0.3, text: ['BRAKE PAGE'], sub: 'OPEN', visible: false });
      // 20. The sealed inquiry drawer, until day 10; then Ada's signed check under
      //     the two traces on the March board.
      const seal = onFace('march-drawer', { dx: 0, y: 1.02, w: 0.36, h: 0.14, text: ['SEALED — MARCH INQUIRY'], pin: false, tone: 'card' });
      const check = onFace('march-board', { dx: 0.35, y: 1.22, w: 0.36, h: 0.24, text: ['SIGNED CHECK'], sub: 'drum-stop lamp · March', visible: false });
      const traces = onFace('march-board', { dx: -0.3, y: 1.7, w: 0.5, h: 0.3, text: ['xmax = v0/ω = 1.60 m', 't ≈ 1.26 s'], visible: false });
      // 11. The empty-test approval narrowed to its tested load.
      const narrowed = onTop('pad-bench', { dx: 0.4, w: 0.34, h: 0.22, text: ['EMPTY PASS'], sub: 'load and warm-pad limits', pin: false, visible: false });
      hooks.push((state) => {
        const k = n(state);
        cold?.set({ visible: k >= 5 }); energy?.set({ visible: k >= 5 }); brake?.set({ visible: k >= 5, sub: k >= 11 ? 'CLOSED — 2 m/s' : 'OPEN' });
        seal?.set({ visible: day(state) < 10 });
        check?.set({ visible: k >= 10 }); traces?.set({ visible: k >= 10 });
        narrowed?.set({ visible: k >= 11 });
      });
      break;
    }
    case 'TIP': {
      // 6. ow-chute-tag: the staged-feed tag beside the fracture photographs.
      const photos = [0, 1].map(i => onWall('weightometer', 1, { y: 1.9 - i * 0.02, gap: 1.0 + i * 0.36, w: 0.3, h: 0.24, text: ['BOLT ' + (i + 1)], sub: 'fracture', tone: 'card', tilt: (i - 0.5) * 0.1 }));
      const chuteTag = onWall('weightometer', 1, { y: 1.55, gap: 1.18, w: 0.4, h: 0.22, text: ['STAGED FEED'], sub: 'F = ṁv = 1000 N', visible: false });
      const cap = onWall('weightometer', -1, { y: 1.85, w: 0.46, h: 0.3, text: ['CRUISE 3.5 m/s'], sub: 'until braking is tested', visible: false });
      hooks.push((state) => {
        const k = n(state);
        chuteTag?.set({ visible: k >= 6 }); cap?.set({ visible: k >= 8 });
        photos.forEach(p => p?.set({ visible: true }));
      });
      break;
    }
    case 'GRAV': {
      // 7. ow-survey-tab: the reference tab against the corrected entry, the
      //    original left unerased.
      const book = onTop('level-book', { dx: 0, w: 0.5, h: 0.34, text: ['9.82 m/s² at 10:00', 'ref +0.02'], pin: false });
      const tab = onTop('level-book', { dx: 0.34, dz: 0.1, w: 0.14, h: 0.1, text: ['9.80'], pin: false, visible: false, tone: 'card' });
      hooks.push((state) => { const k = n(state); tab?.set({ visible: k >= 7 }); book?.set({ sub: k >= 7 ? 'corrected field value 9.80 m/s²' : '' }); });
      break;
    }
    case 'LAMP': {
      // 13. Forty-one numbered lamps record who is below. Forty-one tallies on
      //     hooks until day 12; then the shift goes down and the hooks are bare.
      //     Tallies on the right wall, the charging rack on the left: the back
      //     wall carries the room's own screen and the front wall is the door.
      const b = room.bounds;
      const len = Math.min(b.d - 3.6, 8);
      const zc = (b.z0 + b.z1) / 2 + 0.6;
      const rail = tallyRail(group, { x: b.x1 - 0.14, y: 1.7, z: zc, rotY: -Math.PI / 2, w: len, count: 41, rows: 3 });
      for(const [i, txt] of [['1–14', 0], ['15–28', 1], ['29–41', 2]].map((v) => v))
        slip(group, { x: b.x1 - 0.14, y: 1.7 - i * 0.34, z: zc + len / 2 + 0.35, rotY: -Math.PI / 2, w: 0.22, h: 0.16, text: [txt], pin: false });
      // The charging rack opposite: lamps in rows, lit.
      const glow = mat('kerrow.lampglow', () => new THREE.MeshStandardMaterial({ color: 0xfff1c0, emissive: 0xffe9b0, emissiveIntensity: 1.4 }));
      for(let r = 0; r < 3; r++){
        box(group, 0.3, 0.05, len, b.x0 + 0.5, 0.7 + r * 0.45, zc, STEEL());
        for(let i = 0; i < 14; i++){
          const z = zc - len / 2 + (i + 0.5) * (len / 14);
          cyl(group, 0.05, 0.14, b.x0 + 0.5, 0.8 + r * 0.45, z, MATERIALS.paintedSteel(0x3a3f45));
          const l = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), glow); l.position.set(b.x0 + 0.58, 0.92 + r * 0.45, z); group.add(l);
        }
      }
      ctx.solid?.(b.x0 + 0.5, zc, 0.5, 1.6, len);
      const finn = slip(group, { x: b.x1 - 0.14, y: 2.35, z: zc, rotY: -Math.PI / 2, w: 0.6, h: 0.3, text: ['41 TALLIES ON THE HOOKS'], sub: 'no one boards for a test', pin: false });
      hooks.push((state) => {
        const k = n(state);
        rail.set(() => k < 12);
        finn.set(k >= 12 ? { text: ['SHIFT BELOW'], sub: 'signed range · passenger gate open' } : { text: ['41 TALLIES ON THE HOOKS'], sub: 'no one boards for a test' });
      });
      break;
    }
    case 'CHANGE': {
      // 16. Rows of pegs with coats hung high on chains, the real thing.
      const b = room.bounds;
      const cloth = mat('kerrow.coat', () => new THREE.MeshStandardMaterial({ color: 0x3a3630, roughness: 0.95 }));
      const cols = Math.floor((b.w - 2) / 0.8);
      for(let i = 0; i < cols; i++){
        const x = b.x0 + 1.2 + i * 0.8;
        cyl(group, 0.01, 1.1, x, b.wall ? 2.4 : 2.4, 0, MATERIALS.steel());
        box(group, 0.36, 0.7, 0.2, x, 1.55, 0, cloth);
        cyl(group, 0.08, 0.06, x, 1.15, 0.02, MATERIALS.paintedSteel(0xc9a23f));
      }
      for(const z of [b.z0 + 2.2, b.z1 - 1.6]){
        box(group, b.w - 2.4, 0.08, 0.35, 0, 0.45, z, TIMBER());
        for(const s of [-1, 1]) box(group, 0.08, 0.45, 0.3, s * (b.w / 2 - 1.4), 0.22, z, TIMBER());
      }
      ctx.solid?.(0, b.z0 + 2.2, b.w - 2.4, 0.5, 0.4); ctx.solid?.(0, b.z1 - 1.6, b.w - 2.4, 0.5, 0.4);
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list. A pit yard in drizzle has puddles; a headframe has
// crows on it and a warning lamp at the top; a compressor house has a chimney.
export function storyExtras(scene, ctx){
  const { groundHeight, animate } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // Puddles on the yard, dark and a little reflective, where the ground is worn.
  {
    const wet = mat('kerrow.puddle', () => new THREE.MeshStandardMaterial({ color: 0x1e2226, roughness: 0.12, metalness: 0.3, envMapIntensity: 0.9, transparent: true, opacity: 0.85 }));
    for(const [x, z, w, d, r] of [[4, 34, 3.2, 1.8, 0.4], [-6, 22, 2.4, 1.6, 1.2], [10, 12, 4.0, 2.2, 0.2], [-24, 20, 2.8, 1.5, 0.8], [26, -10, 3.4, 2.0, 0.5], [-2, 56, 2.0, 1.3, 1.6]]){
      const p = new THREE.Mesh(new THREE.CircleGeometry(1, 14), wet);
      p.scale.set(w, d, 1); p.rotation.x = -Math.PI / 2; p.rotation.z = r;
      p.position.set(x, at(x, z) + 0.03, z); p.receiveShadow = false; p.userData.ignoreAudit = true;
      scene.add(p);
    }
  }

  // Crows on the headframe: four that sit on the sheave beam and one that
  // circles, and every so often the sitters lift and settle again.
  {
    const dark = mat('kerrow.crow', () => new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.9 }));
    const crow = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 7, 5), dark); b.scale.set(1.5, 0.8, 1); g.add(b); const w1 = box(g, 0.28, 0.02, 0.4, 0, 0.04, 0.24, dark); const w2 = box(g, 0.28, 0.02, 0.4, 0, 0.04, -0.24, dark); return { g, wings: [w1, w2] }; };
    const top = at(0, -4) + 33.6;
    const sitters = [-1.4, -0.5, 0.5, 1.4].map((x, i) => { const c = crow(); c.g.position.set(x, top, -0.6 + (i % 2) * 1.2); c.g.rotation.y = i; scene.add(c.g); return c; });
    const flyer = crow(); scene.add(flyer.g);
    let lift = 0;
    animate?.((t, dt) => {
      const a = t * 0.7;
      flyer.g.position.set(Math.cos(a) * 9, top + 4 + Math.sin(t * 1.3) * 1.2, -4 + Math.sin(a) * 9);
      flyer.g.rotation.y = -a + Math.PI / 2;
      flyer.wings.forEach((w, k) => { w.rotation.x = (k ? -1 : 1) * Math.sin(t * 10) * 0.5; });
      lift = Math.max(0, lift - dt);
      if(Math.random() < dt / 45) lift = 6;
      sitters.forEach((c, i) => {
        const up = lift > 0 ? Math.sin(Math.min(1, lift / 6) * Math.PI) * (3 + i) : 0;
        c.g.position.y = top + up;
        c.wings.forEach((w, k) => { w.rotation.x = up > 0.1 ? (k ? -1 : 1) * Math.sin(t * 9 + i) * 0.5 : 0; });
      });
    });
    // The warning lamp on the frame.
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshStandardMaterial({ color: 0xff6060, emissive: 0xff2020, emissiveIntensity: 2 }));
    lamp.position.set(0, top + 1.2, -4); scene.add(lamp);
    animate?.(blink(lamp.material, 1.4, 0.4, { on: 2.6, off: 0.1 }));
  }

  // The compressor house's chimney: brick, with a thin brown plume that leans
  // with the wind.
  {
    const x = 36, z = 24, y = at(x, z);
    cyl(scene, 0.7, 11, x, y + 5.5, z, MATERIALS.paintedSteel(0x6a4a3a));
    cyl(scene, 0.85, 0.5, x, y + 11.1, z, MATERIALS.paintedSteel(0x4a3a30));
    const smoke = mat('kerrow.smoke', () => new THREE.MeshBasicMaterial({ color: 0x6a645c, transparent: true, opacity: 0.2, depthWrite: false }));
    for(let i = 0; i < 6; i++){
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.6 + i * 0.45, 7, 5), smoke);
      p.position.set(x + i * 1.6, y + 11.8 + i * 1.3, z - i * 1.1); p.userData.ignoreAudit = true; scene.add(p);
      animate?.(bob(p, 0.4, 0.25 + i * 0.05, i)); animate?.(sway(p, 'x', 0.3, 0.3, i));
    }
  }
}
