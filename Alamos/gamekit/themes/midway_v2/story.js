// story.js — Corbin Park changing, mission by mission, the way the bible writes it.
//
// ../fpl_gpt/SAFETY.md writes the world's story in three shapes and this file
// builds every one of them:
//
//   · Fifteen `### Physical aftermath` blocks, one per mission, each with a Home
//     fixture, a Before, an After (an exact action — "Maya Hart clips the
//     predicted and measured stop strip to the brake drum") and a next problem
//     standing at the next Home. Every one is a `slip()` on the wall behind its
//     fixture, visible once that mission's decision is accepted, and the Before
//     is a prop that stands there from the mission before.
//   · The §3 landmark table — Ticket Court, Staff Room, Midway Walk — three
//     walkable, ungraded spaces with a Before and a visible change.
//   · §8.1, the final playable scene: the front gate opens onto the cleared
//     midway, six operating cards, the coaster dark beneath its closure card.
//
// Every word on a panel or a slip is the bible's — an After sentence, a caps
// label (`OPENS TOMORROW`, `FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S`), a mission
// header, a Correct-result line. Geometry, placement and motion are ours.
//
// `storyOutdoors` runs from the end of `decorate` in props.js; `dressRoom` runs
// when a room is built (theme.dressRoom → interiorBuilding's `spec.dress`).
// Both key everything on `missionsAccepted(state, theme)`, the engine's reading
// of the bible's `accepted_stop_N`.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, patrol, spin, scrollUV, flicker } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { site } from './site.js';
import { FIXTURES } from './fixtures.js';

const PI = Math.PI;
const PAINT = (hex) => MATERIALS.paintedSteel(hex);
const STEEL = () => MATERIALS.steel();
const DARK = () => MATERIALS.paintedSteel(0x3a3f45);
const CHALK = () => mat('corbin.chalk', () => new THREE.MeshStandardMaterial({ color: 0xd8d4c8, roughness: 0.95 }));
const TAPE = () => mat('corbin.tape', () => new THREE.MeshStandardMaterial({ color: 0xc9a13a, roughness: 0.8 }));
const CANVAS = () => mat('corbin.canvas', () => new THREE.MeshStandardMaterial({ color: 0x6f6a5e, roughness: 0.95 }));

/** The bible's mission header, verbatim: `MISSION 1 - 15 DAYS UNTIL THE PARK REVIEW.` */
const HEADER = (d) => {
  const m = Math.min(15, Math.max(1, d));
  const left = 16 - m;
  return `MISSION ${m} - ${left} DAY${left === 1 ? '' : 'S'} UNTIL THE PARK REVIEW.`;
};
const COMPLETE = (m) => `MISSION ${Math.min(15, Math.max(1, m))} COMPLETE`;

/** The bible's place names, from its §3 table. */
const RIDE_NAME = {
  WHEEL: 'Ferris Wheel', SHIP: 'Pirate Ship', CAROUSEL: 'Carousel', BUMPER: 'Bumper Cars',
  COASTER: 'Coaster', TOWER: 'Drop Tower', FLUME: 'Log Flume',
};
const RIDES = Object.keys(RIDE_NAME);

/**
 * What each ride's card says after `n` missions are accepted. Every line is a
 * caps label or a Correct-result clause from the bible: the milestone labels the
 * aftermaths hang (M1–M11), the verified-configuration tags of M12, the joint
 * rule set of M13 ("Three rotating-ride cards and corresponding festoon lights
 * activate"), the coaster's closure of M14 and the arm-nine inspection's PASS of
 * M15. `CLOSED` is the bible's word for a ride before anything is proved.
 */
function rideCard(id, n){
  const closed = { big: 'CLOSED', small: '', tone: 'plain' };
  switch(id){
    case 'WHEEL':
      if(n >= 15) return { big: 'PASS WITH OPERATING ENVELOPE', small: 'Wheel wind stop 8.0 m/s', tone: 'ok' };
      if(n >= 13) return { big: 'Wheel wind stop 8.0 m/s', small: 'EXTERNAL INSPECTION REQUIRED', tone: 'ok' };
      if(n >= 9) return { big: 'EXTERNAL INSPECTION REQUIRED', small: '', tone: 'warn' };
      if(n >= 1) return { big: 'PREDICTED STOP: 2.25 m', small: 'local pass', tone: 'warn' };
      return closed;
    case 'SHIP':
      if(n >= 13) return { big: 'Pirate Ship exclude 5.70-6.30 s', small: 'FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S', tone: 'ok' };
      if(n >= 8) return { big: 'FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S', small: '', tone: 'warn' };
      if(n >= 2) return { big: 'LOAD REMOVED: ZERO RETURNED', small: '', tone: 'warn' };
      return closed;
    case 'CAROUSEL':
      if(n >= 13) return { big: 'Carousel 4.20 m/s', small: 'RUN 4.00 M/S / STOP 4.20 M/S', tone: 'ok' };
      if(n >= 3) return { big: 'RUN 4.00 M/S / STOP 4.20 M/S', small: '', tone: 'warn' };
      return closed;
    case 'BUMPER':
      if(n >= 12) return { big: 'TESTED CONFIGURATIONS ONLY', small: 'Bumper open', tone: 'ok' };
      if(n >= 4) return { big: 'DRY-FLOOR RESULT ONLY', small: '', tone: 'warn' };
      return closed;
    case 'TOWER':
      if(n >= 12) return { big: 'TESTED CONFIGURATIONS ONLY', small: 'Tower open', tone: 'ok' };
      if(n >= 5) return { big: 'EMPTY TEST ONLY', small: 'LIMITED UNMANNED TEST', tone: 'warn' };
      return closed;
    case 'COASTER':
      if(n >= 14) return { big: 'CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED', small: 'Coaster closed', tone: 'alert' };
      if(n >= 10) return { big: 'EMPTY TEST ONLY', small: '', tone: 'warn' };
      return closed;
    case 'FLUME':
      if(n >= 13) return { big: '0.45 CUBIC METRES PER SECOND / 44.1 KW', small: 'Flume conditional', tone: 'ok' };
      if(n >= 11) return { big: '0.45 CUBIC METRES PER SECOND / 44.1 KW', small: '', tone: 'warn' };
      return closed;
    default: return closed;
  }
}

/** A status lamp's colour for a card tone. Text always accompanies it (bible §3). */
const LAMP = { plain: [0x7a2a24, 0.5], warn: [0xe0a030, 2.2], ok: [0x3fc060, 2.4], alert: [0xff3a2a, 3.0] };
function lamp(parent, x, y, z){
  const m = new THREE.MeshStandardMaterial({ color: 0x7a2a24, emissive: 0x7a2a24, emissiveIntensity: 0.5, roughness: 0.5 });
  const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), m);
  s.position.set(x, y, z); s.userData.ignoreAudit = true; parent.add(s);
  return {
    mesh: s,
    set(tone){ const [c, i] = LAMP[tone] ?? LAMP.plain; m.color.setHex(c); m.emissive.setHex(c); m.emissiveIntensity = i; },
  };
}

/** A gull or a pigeon: a body, a head, two wings that can beat. */
function bird(parent, colour = 0xe8e6df, scale = 1){
  const g = new THREE.Group();
  const m = mat(`corbin.bird.${colour}`, () => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.9 }));
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), m); body.scale.set(1.6, 0.9, 1); g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), m); head.position.set(0.24, 0.08, 0); g.add(head);
  box(g, 0.1, 0.02, 0.02, 0.34, 0.06, 0, PAINT(0xc9962a));
  const wings = [];
  for(const s of [-1, 1]){
    const w = box(g, 0.32, 0.02, 0.5, 0, 0.06, s * 0.28, m);
    w.geometry = w.geometry.clone().translate(0, 0, s * 0.2);
    wings.push(w);
  }
  g.scale.setScalar(scale);
  parent.add(g);
  return { g, head, wings };
}

/** A person-shaped figure for a crowd: legs, coat, head. No collider — it moves. */
function figure(parent, coat, tall = 1.7){
  const g = new THREE.Group();
  cyl(g, 0.16, tall * 0.45, 0, tall * 0.225, 0, PAINT(0x33383d));
  cyl(g, 0.24, tall * 0.42, 0, tall * 0.66, 0, PAINT(coat), 0.2);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12 * (tall / 1.7), 8, 6), PAINT(0xc9a27a));
  head.position.y = tall * 0.93; g.add(head);
  parent.add(g);
  return g;
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, theme, colliders, softColliders, certified } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const won = (state) => state?.status === 'won' || n(state) >= 15;
  const hooks = [];

  // ------------------------------------------------ the status board by the gate
  // The bible's mission header, and MISSION n COMPLETE once the day's decision
  // is accepted. Twelve metres from the spawn at (0, 58), facing it.
  {
    const x = -11, z = 52, y = at(x, z);
    const rotY = Math.atan2(0 - x, 58 - z);
    for(const s of [-1, 1]){
      const px = x + Math.cos(rotY) * s * 1.5, pz = z - Math.sin(rotY) * s * 1.5;
      cyl(scene, 0.07, 3.2, px, y + 1.6, pz, STEEL());
    }
    softColliders?.push({ x, z, r: 1.6 });
    const header = statusPanel(scene, { x, y: y + 2.7, z, rotY, w: 3.0, h: 0.55, title: 'Corbin Park', big: HEADER(1), tone: 'plain', lit: true });
    const done = statusPanel(scene, { x, y: y + 1.95, z, rotY, w: 3.0, h: 0.55, title: 'Reopening Board', big: COMPLETE(1), tone: 'ok', lit: true });
    done.visible = false;
    hooks.push((state) => {
      const d = day(state), k = n(state);
      header.set({ big: won(state) ? 'CAMPAIGN COMPLETE' : HEADER(d), tone: won(state) ? 'ok' : 'plain' });
      done.visible = !won(state) && k >= d;
      done.set({ big: COMPLETE(d) });
    });
  }

  // --------------------------------------- the operating cards and midway lights
  // One card on each ride's station, beside its door, with a lamp and a run of
  // bulbs along the eaves: "Three operating cards print and the corresponding
  // midway lights switch on" (M13), the verified-configuration tags (M12), the
  // coaster's closure (M14). Bulbs light when the card's tone is `ok`.
  const cards = {};
  for(const b of site.buildings){
    if(!b.group || !RIDE_NAME[b.group]) continue;
    const f = b.facing ?? 0;
    const fx = b.x + Math.sin(f) * b.d / 2, fz = b.z + Math.cos(f) * b.d / 2;   // front face centre
    const ax = Math.cos(f), az = -Math.sin(f);                                   // along the face
    const ox = Math.sin(f), oz = Math.cos(f);                                    // out of the wall
    const y = at(fx, fz);
    const cx = fx + ax * 3.0 + ox * 0.3, cz = fz + az * 3.0 + oz * 0.3;
    const panel = statusPanel(scene, { x: cx, y: y + 2.5, z: cz, rotY: f, w: 1.8, h: 0.9, title: RIDE_NAME[b.group], big: 'CLOSED', tone: 'plain', lit: true });
    const lp = lamp(scene, cx + ax * 1.15, y + 2.5, cz + az * 1.15);
    const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffd9a0, emissive: 0xffd9a0, emissiveIntensity: 0.05, roughness: 0.6 });
    const half = b.w / 2 - 0.6;
    for(let i = 0; i < 9; i++){
      const t = -half + (i / 8) * half * 2;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 5), bulbMat);
      bulb.position.set(fx + ax * t + ox * 0.35, y + b.h - 0.35, fz + az * t + oz * 0.35);
      bulb.userData.ignoreAudit = true;
      scene.add(bulb);
    }
    cards[b.group] = { panel, lamp: lp, bulbMat };
  }

  // ----------------------------------------------- the Midway Walk (landmark)
  // "Dark ride signs face the silent coaster track. Milestone cards gain status
  // lamps as tests pass; final opening brings music and moving cleared rides
  // while the coaster stays dark." Seven signs down the west side of the avenue,
  // facing the coaster, a lamp on each; string lights over them for the finale.
  const walkSigns = {};
  {
    const order = ['WHEEL', 'SHIP', 'CAROUSEL', 'BUMPER', 'TOWER', 'FLUME', 'COASTER'];
    const zs = [-14, -20, -40, -46, -58, -66, -72];
    const x = -11.5;
    const stringMat = new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffe0b0, emissiveIntensity: 0.05, roughness: 0.6 });
    order.forEach((id, i) => {
      const z = zs[i], y = at(x, z);
      cyl(scene, 0.06, 3.4, x, y + 1.7, z, STEEL());
      softColliders?.push({ x, z, r: 0.4 });
      // A dark backing so the sign reads from the avenue too; the face is west.
      box(scene, 0.08, 1.35, 1.7, x + 0.05, y + 2.35, z, DARK());
      sign(scene, RIDE_NAME[id], { x: x - 0.06, y: y + 3.15, z, w: 1.6, h: 0.5, facing: -PI / 2 });
      const panel = statusPanel(scene, { x: x - 0.06, y: y + 2.2, z, rotY: -PI / 2, w: 1.6, h: 0.75, title: RIDE_NAME[id], big: 'CLOSED', tone: 'plain', lit: true });
      const lp = lamp(scene, x, y + 3.6, z);
      walkSigns[id] = { panel, lamp: lp };
      // The string lights, sagging from post to post.
      if(i < order.length - 1){
        const z1 = zs[i + 1];
        for(let k = 1; k < 6; k++){
          const t = k / 6, zz = z + (z1 - z) * t;
          const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), stringMat);
          bulb.position.set(x, at(x, zz) + 3.4 - Math.sin(t * PI) * 0.35, zz);
          bulb.userData.ignoreAudit = true; scene.add(bulb);
        }
      }
    });
    hooks.push((state) => { stringMat.emissiveIntensity = won(state) ? 1.8 : 0.05; });
  }

  hooks.push((state) => {
    const k = n(state);
    for(const id of RIDES){
      const c = rideCard(id, k);
      cards[id]?.panel.set(c); cards[id]?.lamp.set(c.tone);
      if(cards[id]) cards[id].bulbMat.emissiveIntensity = c.tone === 'ok' ? 1.6 : 0.05;
      walkSigns[id]?.panel.set(c); walkSigns[id]?.lamp.set(c.tone);
    }
  });

  // ------------------------------------------- the Workshop door: OPENS TOMORROW
  // M4's closing panel text, hung on the sealed Workshop door for the one evening
  // it is true — the door itself opens on day 5 (access.js).
  {
    const w = site.buildings.find(b => b.id === 'WORKSHOP');
    const f = w.facing, fx = w.x + Math.sin(f) * w.d / 2, fz = w.z + Math.cos(f) * w.d / 2;
    const ax = Math.cos(f), az = -Math.sin(f);
    const y = at(fx, fz);
    const marker = slip(scene, { x: fx + Math.sin(f) * 0.12 + ax * 1.3, y: y + 1.75, z: fz + Math.cos(f) * 0.12 + az * 1.3, rotY: f, w: 0.7, h: 0.32, text: ['OPENS TOMORROW'], pin: true, visible: false });
    hooks.push((state) => marker.set({ visible: n(state) === 4 }));
  }

  // ------------------------------------------ arm nine: the barricade and crane
  // "The barricade around arm nine is the visible scene component of
  // `arm-nine-file`" — it stays through mission 9 and comes down only after Stop
  // 59 funds the outside inspection, which returns PASS WITH OPERATING ENVELOPE.
  // The scaffold at (-6, 40) is props.js's; the barrier ring and the crane are
  // here. The crane stays parked (its collider is hard); the barrier goes.
  {
    const cx = -6, cz = 40;
    const barricade = new THREE.Group();
    for(let i = 0; i < 8; i++){
      const a = (i / 8) * PI * 2, bx = cx + Math.cos(a) * 3.6, bz = cz + Math.sin(a) * 3.6;
      const y = at(bx, bz);
      const board = new THREE.Group();
      box(board, 1.6, 0.26, 0.05, 0, 0.9, 0, PAINT(i % 2 ? 0xc4342a : 0xe6e0d0));
      box(board, 1.6, 0.26, 0.05, 0, 0.55, 0, PAINT(i % 2 ? 0xe6e0d0 : 0xc4342a));
      for(const s of [-1, 1]) cyl(board, 0.03, 1.05, s * 0.7, 0.52, 0, STEEL());
      board.position.set(bx, y, bz); board.rotation.y = -a + PI / 2;
      barricade.add(board);
    }
    scene.add(barricade);
    // The chalked inspection mark on the A-frame leg nearest the barricade.
    const my = at(-12, 39.5);
    for(const r of [0.7, -0.7]){ const m = box(scene, 0.04, 0.5, 0.03, -11.1, my + 2.4, 39.0, CHALK()); m.rotation.z = r; }
    // The card Hart clips to the sleeve (M9), and the inspection's verdict (M15).
    const card = slip(scene, { x: cx + 3.68, y: at(cx + 3.6, cz) + 1.25, z: cz, rotY: PI / 2, w: 0.5, h: 0.28, text: ['EXTERNAL INSPECTION', 'REQUIRED'], pin: 'clip', visible: false });
    const pass = slip(scene, { x: -11.0, y: my + 1.7, z: 39.0, rotY: PI / 2, w: 0.6, h: 0.3, text: ['PASS WITH', 'OPERATING ENVELOPE'], pin: 'clip', visible: false });
    // The crane: a truck body, an outrigger each side, and a boom up toward the wheel.
    {
      const x = -10.5, z = 43, y = at(x, z);
      const g = new THREE.Group();
      box(g, 2.4, 1.0, 6.0, 0, 0.9, 0, PAINT(0xc9962a));
      box(g, 2.3, 1.5, 1.8, 0, 1.9, 2.0, PAINT(0x33383d));
      cyl(g, 0.9, 0.8, 0, 1.8, -1.0, PAINT(0x7a7f86));
      const boom = box(g, 0.5, 0.5, 9.0, 0, 2.2, -1.0, PAINT(0xc9962a));
      boom.geometry = boom.geometry.clone().translate(0, 0, -4.5);
      boom.rotation.x = -0.9; boom.rotation.y = -0.6;
      const hook = cyl(g, 0.03, 3.0, -3.2, 5.2, -4.4, STEEL());
      void hook;
      for(const [wx, wz] of [[1.2, 2.0], [-1.2, 2.0], [1.2, -2.0], [-1.2, -2.0]]){
        const w = cyl(g, 0.5, 0.35, wx, 0.5, wz, MATERIALS.rubber()); w.rotation.z = PI / 2;
      }
      for(const s of [-1, 1]) box(g, 3.6, 0.25, 0.3, 0, 0.35, s * 1.6, PAINT(0x33383d));
      g.position.set(x, y, z); scene.add(g);
      colliders?.push(new THREE.Box3(new THREE.Vector3(x - 1.9, y, z - 3.1), new THREE.Vector3(x + 1.9, y + 3.6, z + 3.1)));
    }
    hooks.push((state) => {
      const k = n(state);
      barricade.visible = k < 15;
      card.set({ visible: k >= 9 && k < 15 });
      pass.set({ visible: k >= 15 });
    });
  }

  // ----------------------------------------------- the Ticket Court (landmark)
  // "Shut ticket windows face a row of stacked queue rails. After Stop 52, the
  // rails form the approved opening route; after Stop 60, the public gate opens."
  // The stack sits in the car-park corner off the approach; the route is two
  // lanes running behind the booth blocks to the turnstiles. The gate leaves are
  // on the car-park face of the gate building, and swing open on the finale.
  const gateLeaves = [];
  {
    const sx = -26, sz = 92, sy = at(sx, sz);
    const stack = new THREE.Group();
    for(let i = 0; i < 6; i++){
      const r = box(stack, 0.05, 0.05, 3.0, (i % 2) * 0.5 - 0.25, 0.25 + Math.floor(i / 2) * 0.28, 0, PAINT(0x8a8577));
      r.rotation.y = 0.15;
      for(const s of [-1, 1]) cyl(stack, 0.045, 1.05, (i % 2) * 0.5 - 0.25 + s * 0.5, 0.25 + Math.floor(i / 2) * 0.28, s * 1.4, PAINT(0x8a8577)).rotation.x = PI / 2;
    }
    stack.position.set(sx, sy, sz); scene.add(stack);
    softColliders?.push({ x: sx, z: sz, r: 1.8 });
    const route = new THREE.Group();
    for(const side of [-1, 1]){
      for(const lx of [24.5, 27.5]){
        const x = side * lx;
        for(let z = 96; z >= 80; z -= 4){
          cyl(route, 0.045, 1.05, x, at(x, z) + 0.52, z, PAINT(0x8a8577));
          if(z > 80) box(route, 0.04, 0.04, 4, x, at(x, z - 2) + 1.0, z - 2, PAINT(0x8a8577));
        }
      }
    }
    route.visible = false; scene.add(route);
    // The gate leaves: two iron gates hinged at x = ±6 on the car-park face.
    const gb = site.buildings.find(b => b.id === 'GATE');
    const gz = gb.z + gb.d / 2 + 1.2, gy = at(0, gz);
    for(const s of [-1, 1]){
      cyl(scene, 0.14, 3.2, s * 6, gy + 1.6, gz, PAINT(0x33383d));
      const leaf = new THREE.Group();
      for(let i = 0; i <= 10; i++) cyl(leaf, 0.03, 2.6, -s * i * 0.58, 1.3, 0, PAINT(0x33383d));
      box(leaf, 5.9, 0.08, 0.06, -s * 2.95, 2.5, 0, PAINT(0x33383d));
      box(leaf, 5.9, 0.08, 0.06, -s * 2.95, 0.4, 0, PAINT(0x33383d));
      leaf.position.set(s * 6, gy, gz); scene.add(leaf);
      gateLeaves.push({ leaf, s });
    }
    const gatePanel = statusPanel(scene, { x: 0, y: gy + 3.6, z: gz - 0.9, rotY: 0, w: 2.4, h: 0.7, title: 'Front Gate', big: 'CLOSED', tone: 'plain', lit: true });
    // M15's aftermath: "Maya Hart turns the front-gate key." No room stands behind
    // the gate (nothing is asked at `certificate-table`), so the slip is on the
    // hinge post, where the key would be.
    const key = slip(scene, { x: 6.2, y: gy + 1.5, z: gz + 0.16, rotY: 0, w: 0.6, h: 0.34, text: 'Maya Hart turns the front-gate key.', pin: 'clip', visible: false });
    let swing = 0;
    animate?.((t, dt) => {
      const target = gateLeaves.open ? 1 : 0;
      swing += (target - swing) * Math.min(1, dt * 0.8);
      // Outward, toward the car park — inward puts the leaf through the gate's wall.
      for(const { leaf, s } of gateLeaves) leaf.rotation.y = s * swing * (PI / 2 + 0.1);
    });
    hooks.push((state) => {
      const k = n(state);
      stack.visible = k < 13;
      route.visible = k >= 13;
      gateLeaves.open = won(state);
      gatePanel.set(won(state) ? { big: 'CAMPAIGN COMPLETE', tone: 'ok' } : { big: 'CLOSED', tone: 'plain' });
      key.set({ visible: won(state) });
    });
  }

  // ------------------------------------------------- the families at the gate
  // M14's next problem: "families wait beyond a gate with seven unsigned ride
  // rows." On the finale they come through the turnstiles and walk the midway —
  // §8.1's "the player walks past the turning Carousel, Ferris Wheel, and Pirate
  // Ship". Figures, not crowd.js people: nothing here is a collider.
  {
    const coats = [0x6b4a8a, 0xc4342a, 0x2f6b4a, 0xc9962a, 0x466f7e, 0xa2853f, 0x8a5a49, 0x3f6f6b];
    const loop = [[0, 96], [12, 92], [24, 88], [24, 80], [14, 78], [14, 72], [10, 62], [8, 44], [8, 10], [0, -4],
      [-8, 10], [-8, 44], [-10, 62], [-14, 72], [-14, 78], [-24, 80], [-24, 88], [-12, 92]];
    const pts = loop.map(([x, z]) => ({ x, y: at(x, z), z }));
    const people = [];
    for(let i = 0; i < 14; i++){
      const tall = i % 4 === 3 ? 1.15 : 1.6 + (i % 3) * 0.08;     // every fourth is a child
      const g = figure(scene, coats[i % coats.length], tall);
      const hx = -4 + (i % 5) * 2 + (i % 2) * 0.6, hz = 90 + Math.floor(i / 5) * 2.4;
      g.position.set(hx, at(hx, hz), hz); g.rotation.y = PI + (i % 3 - 1) * 0.3; g.visible = false;
      // Each starts the same loop at a different corner, so they arrive as a stream.
      const start = (i * 3) % pts.length;
      people.push({ g, home: { x: hx, z: hz }, walk: patrol(g, pts.slice(start).concat(pts.slice(0, start)), 1.1 + (i % 3) * 0.15), bobPhase: i });
    }
    let walking = false;
    animate?.((t, dt) => {
      if(!walking) return;
      for(const p of people){ p.walk(t, dt); p.g.position.y += Math.abs(Math.sin(t * 6 + p.bobPhase)) * 0.04; }
    });
    hooks.push((state) => {
      const k = n(state), go = won(state);
      for(const p of people){
        p.g.visible = k >= 14;
        if(!go){ p.g.position.set(p.home.x, at(p.home.x, p.home.z), p.home.z); }
      }
      walking = go;
    });
  }

  // ---------------------------------------------------- the Staff Room (landmark)
  // "Seasonal staff uniforms hang in covers beside an old group photo. After Stop
  // 32, Hart's card gets its verified explanation; after Stop 60, staff collect
  // uniforms for the cleared rides." An open-fronted hut east of the arcade — a
  // landmark with no door has nothing for access.js to seal.
  {
    const x = 60, z = 50, y = at(x, z);
    const W = 6, D = 4, H = 3.0;
    box(scene, W, 0.18, D, x, y + 0.09, z, PAINT(0x6f6a60));
    box(scene, 0.2, H, D, x + W / 2, y + H / 2, z, PAINT(0x8d7f6a));                  // back wall (east)
    for(const s of [-1, 1]) box(scene, W, H, 0.2, x, y + H / 2, z + s * D / 2, PAINT(0x8d7f6a));
    box(scene, W + 0.6, 0.2, D + 0.6, x, y + H + 0.1, z, PAINT(0x4a4038));
    colliders?.push(new THREE.Box3(new THREE.Vector3(x + W / 2 - 0.2, y, z - D / 2), new THREE.Vector3(x + W / 2 + 0.2, y + H, z + D / 2)));
    for(const s of [-1, 1]) colliders?.push(new THREE.Box3(new THREE.Vector3(x - W / 2, y, z + s * D / 2 - 0.2), new THREE.Vector3(x + W / 2, y + H, z + s * D / 2 + 0.2)));
    sign(scene, 'Staff Room', { x: x - W / 2 - 0.1, y: y + H - 0.4, z, w: 2.2, h: 0.5, facing: -PI / 2 });
    // The rail along the back wall and seven covered uniforms on it.
    box(scene, 0.04, 0.04, D - 1.0, x + W / 2 - 0.7, y + 2.2, z, STEEL());
    const covers = [];
    for(let i = 0; i < 7; i++){
      const cz = z - 1.4 + i * 0.45;
      cyl(scene, 0.015, 0.25, x + W / 2 - 0.7, y + 2.08, cz, STEEL());
      covers.push(box(scene, 0.22, 1.2, 0.4, x + W / 2 - 0.7, y + 1.4, cz, CANVAS()));
    }
    // The group photo, framed, at the north end of the back wall.
    box(scene, 0.04, 0.7, 0.9, x + W / 2 - 0.12, y + 1.9, z + 1.5, PAINT(0x4a4038));
    box(scene, 0.02, 0.58, 0.78, x + W / 2 - 0.15, y + 1.9, z + 1.5, PAINT(0x9a958a));
    // Hart's card, with its verified explanation, pinned beside the photo (M8).
    const card = slip(scene, { x: x + W / 2 - 0.16, y: y + 1.35, z: z + 1.5, rotY: -PI / 2, w: 0.5, h: 0.3, text: ['ACTION VERIFIED', 'EFFECT NOT HARMFUL HERE'], sub: 'Choice 2 - near-resonant timing; Hart\'s override was protective.', pin: true, visible: false });
    hooks.push((state) => {
      const k = n(state);
      card.set({ visible: k >= 8 });
      // Six cleared rides' crews collect theirs; the coaster's stays on the rail.
      covers.forEach((c, i) => { c.visible = k < 15 || i === 6; });
    });
  }

  // ------------------------------------------------------------- the finale
  // §8.1: the rides run their signed configurations — props.js turns each from
  // the day it is certified; the coaster stays parked there for good — and the
  // festoon is already at full with seven signed. What is added here is the gate,
  // the crowd, the string lights and the cards above; and the header reads
  // CAMPAIGN COMPLETE. Weather: the bible sets none, so none is set.
  storyExtras(scene, { ...ctx, certified });
  for(const h of hooks) stateHooks?.push(h);
}

// =============================================================== the rooms

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

/**
 * The fifteen aftermaths, keyed by mission. `card` is the caps label the bible
 * has somebody clip or pin (lines as they break on a card); `after` is the
 * After action, verbatim, on the record slip beside it.
 */
const AFTERMATH = {
  1:  { room: 'WHEEL',    home: 'brake-drum',               pin: 'clip', card: ['PREDICTED STOP: 2.25 m'],
        after: 'Maya Hart clips the predicted and measured stop strip to the brake drum.' },
  2:  { room: 'SHIP',     home: 'arm-trestles',             card: ['LOAD REMOVED:', 'ZERO RETURNED'],
        after: 'Ruth Brennan pins the LOAD REMOVED: ZERO RETURNED record beside the support model.' },
  3:  { room: 'CAROUSEL', home: 'chain-rig',                pin: 'clip', card: ['RUN 4.00 M/S', 'STOP 4.20 M/S'],
        after: 'Tunde Idowu clips the RUN 4.00 M/S / STOP 4.20 M/S card to the chain rig.' },
  4:  { room: 'BUMPER',   home: 'floor-console',            card: ['DRY-FLOOR', 'RESULT ONLY'],
        after: 'Linh Chen pins the DRY-FLOOR RESULT ONLY strip beside the floor console.' },
  5:  { room: 'WORKSHOP', home: 'configuration-desk',       pin: 'clip', card: ['EMPTY TEST ONLY'],
        after: 'Ana Silva clips the EMPTY TEST ONLY procedure into the configuration folder.' },
  6:  { room: 'WORKSHOP', home: 'workshop-diagnosis-board', card: ['INSTALLED', 'AFTER OCTOBER'],
        after: 'Tunde Idowu pins the INSTALLED AFTER OCTOBER date strip beside the crate record.' },
  7:  { room: 'WORKSHOP', home: 'casebook-table',           card: ['ACTION VERIFIED', 'EFFECT NOT HARMFUL HERE'],
        after: 'Maya Hart places the recovered October card in the evidence sleeve.' },
  8:  { room: 'SHIP',     home: 'timing-trace',             card: ['FORBIDDEN DRIVE BAND:', '5.70 TO 6.30 S'],
        after: 'Ruth Brennan pins the FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S card to the trace.' },
  9:  { room: 'WHEEL',    home: 'arm-nine-file',            pin: 'clip', card: ['EXTERNAL INSPECTION', 'REQUIRED'],
        after: 'Maya Hart clips the EXTERNAL INSPECTION REQUIRED card to the arm-nine sleeve.' },
  10: { room: 'COASTER',  home: 'profile-drawing',          card: ['EMPTY TEST ONLY'],
        after: 'Priya Nair pins the EMPTY TEST ONLY card over the passenger release line.' },
  11: { room: 'FLUME',    home: 'pump-curve',               pin: 'clip', card: ['0.45 CUBIC METRES', 'PER SECOND', '44.1 KW'],
        after: 'Mateo Ruiz clips the 0.45 CUBIC METRES PER SECOND / 44.1 KW card to the pump curve.' },
  12: { room: 'TOWER',    home: 'witness-sheet',            card: ['TESTED', 'CONFIGURATIONS ONLY'],
        after: 'Linh Chen pins the TESTED CONFIGURATIONS ONLY clearance to the witness sheet.' },
  13: { room: 'PLANT',    home: 'motor-plate',              card: ['Carousel 4.20 m/s', 'Pirate Ship exclude 5.70-6.30 s', 'Wheel wind stop 8.0 m/s'],
        after: 'Maya Hart pins the joint operating schedule beneath the motor plate.' },
  14: { room: 'COASTER',  home: 'crown-tape',               card: ['CLOSED:', '9.40 M/S AVAILABLE', '9.52 M/S REQUIRED'],
        after: 'Priya Nair hangs a CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED tag on the coaster release.' },
  // 15 is `certificate-table` at the Front Gate, which has no room: nothing is
  // asked there, so the gate never builds one. It is outdoors, on the gate itself.
};

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme, animate, solid } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  const proud = (p, d = 0.03) => ({ ...p, x: p.x + Math.sin(p.rotY) * d, z: p.z + Math.cos(p.rotY) * d });
  /** A slip on the wall behind a fixture, above the object (see fixturePlaces.face). */
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.face(spec.dx ?? 0, spec.y ?? 1.5), ...spec }) : null; };
  /** A wall-mounted box (a chalk mark, a tape strip, a shelf) at face height `y`, `dx` along the wall. */
  const onWallBox = (fid, dx, y, w, h, d, material, { rotZ = 0, out = 0 } = {}) => {
    const a = at(fid); if(!a) return null;
    const p = proud(a.face(dx, 1.3), d / 2 + out);      // face() at y 1.3 lands at 2.05; y is overridden
    const m = box(group, w, h, d, p.x, y, p.z, material, p.rotY);
    m.rotation.z = rotZ;
    return m;
  };
  /** A floor object beside a fixture, tight to its wall. */
  const onFloor = (fid, dx, out, build) => { const a = at(fid); if(!a) return null; const p = a.floor(dx, out); return build(p); };
  const hooks = [];

  // The aftermaths whose Home is in this room: the card clipped, the record
  // pinned beside it, both from the mission's acceptance on.
  for(const [m, spec] of Object.entries(AFTERMATH)){
    if(spec.room !== id) continue;
    const k = Number(m);
    const card = spec.card ? onFace(spec.home, { dx: -0.36, y: 1.55, w: 0.5, h: 0.3, text: spec.card, pin: spec.pin ?? true, tone: 'card', visible: false, tilt: 0.03 }) : null;
    const record = onFace(spec.home, { dx: spec.card ? 0.36 : 0, y: 1.55, w: 0.62, h: 0.3, text: spec.after, pin: spec.pin ?? true, visible: false, tilt: -0.02 });
    hooks.push((state) => { const v = n(state) >= k; card?.set({ visible: v }); record?.set({ visible: v }); });
  }

  // The Befores — "the next problem, physically" — standing at the next Home
  // from the mission before, and staying: later pages never erase earlier evidence.
  const show = (objs, from) => hooks.push((state) => { const v = n(state) >= from; for(const o of objs) if(o) o.visible = v; });
  const showSlips = (slips, from) => hooks.push((state) => { const v = n(state) >= from; for(const s of slips) s?.set({ visible: v }); });

  switch(id){
    case 'WHEEL': {
      // M1 Before: three old traces beside a drum with one fresh stop mark.
      const traces = [-1.15, -0.9, -0.65].map((dx, i) => onFace('brake-drum', { dx, y: 1.2, w: 0.2, h: 0.36, text: '', pin: true, tone: 'card', tilt: (i - 1) * 0.05 }));
      void traces;
      onWallBox('brake-drum', 0.55, 1.75, 0.03, 0.4, 0.02, CHALK());
      // M9 Before: the chalked inspection mark under the arm-nine file.
      const chalk = [0.6, -0.6].map(r => onWallBox('arm-nine-file', 0, 2.75, 0.03, 0.45, 0.02, CHALK(), { rotZ: r }));
      show(chalk, 8);
      // "Ferris brake lamp red to amber" (M1) on the wall above the drum.
      const lp = lamp(group, 0, 0, 0);
      const a = at('brake-drum');
      if(a){ const p = proud(a.wallAbove(2.6), 0.16); lp.mesh.position.set(p.x, p.y, p.z); }
      hooks.push((state) => lp.set(n(state) >= 1 ? 'warn' : 'plain'));
      break;
    }
    case 'SHIP': {
      // M2 Before: a load bag on the trestles beside an old October photograph.
      const bag = onFloor('arm-trestles', -1.1, 0.45, (p) => { const b = box(group, 0.7, 0.5, 0.5, p.x, 0.25, p.z, CANVAS(), p.rotY); solid?.(p.x, p.z, 0.8, 0.6, 0.5); return b; });
      const photo = onWallBox('arm-trestles', 0.9, 2.3, 0.5, 0.38, 0.03, PAINT(0x4a4038));
      const photoIn = onWallBox('arm-trestles', 0.9, 2.3, 0.42, 0.3, 0.02, PAINT(0x9a958a), { out: 0.02 });
      show([bag, photo, photoIn], 1);
      // M8 Before: the drive ticks line up with the ship's free swing marks.
      const ticks = [];
      for(let i = 0; i < 7; i++){
        ticks.push(onWallBox('timing-trace', -0.6 + i * 0.2, 2.62, 0.02, 0.12, 0.02, CHALK()));
        ticks.push(onWallBox('timing-trace', -0.6 + i * 0.2, 2.45, 0.02, 0.12, 0.02, PAINT(0xc4342a)));
      }
      show(ticks, 7);
      break;
    }
    case 'CAROUSEL': {
      // M3 Before: the chair chain hangs beside a tilted platform mark.
      const chain = onWallBox('chain-rig', -0.9, 1.9, 0.03, 1.6, 0.03, STEEL(), { out: 0.08 });
      const bracket = onWallBox('chain-rig', -0.9, 2.72, 0.12, 0.06, 0.2, STEEL(), { out: 0.05 });
      const tilt = onWallBox('chain-rig', 0.9, 2.5, 0.6, 0.03, 0.02, CHALK(), { rotZ: 0.14 });
      if(chain) animate?.(sway(chain, 'z', 0.02, 0.9));
      show([chain, bracket, tilt], 2);
      // M6 (bible §11): the crate receives NOT INSTALLED — the crate is at the
      // controller-crate rack in this room.
      const notInstalled = onFace('controller-crate', { dx: 0, y: 1.5, w: 0.44, h: 0.24, text: ['NOT INSTALLED'], pin: true, tone: 'card', visible: false });
      showSlips([notInstalled], 6);
      break;
    }
    case 'BUMPER': {
      // M4 Before: a dry-floor test mark stops before three copied speed strips.
      const mark = onFloor('floor-console', 0, 1.6, (p) => box(group, 0.12, 0.01, 2.0, p.x, 0.006, p.z, CHALK(), p.rotY));
      const strips = [-1.2, -0.95, -0.7].map(dx => onFace('floor-console', { dx, y: 1.2, w: 0.2, h: 0.34, text: '', pin: true, tone: 'card' }));
      show([mark], 3); showSlips(strips, 3);
      break;
    }
    case 'WORKSHOP': {
      // M5 Before: eleven notebooks open, on a shelf over the configuration desk.
      const shelf = onWallBox('configuration-desk', 0, 2.55, 1.3, 0.04, 0.24, PAINT(0x8d7f6a), { out: 0.02 });
      const books = [];
      for(let i = 0; i < 11; i++) books.push(onWallBox('configuration-desk', -0.58 + i * 0.116, 2.68, 0.09, 0.22, 0.2, PAINT([0x4a5560, 0x7a4a35, 0x2f4a44][i % 3]), { out: 0.02 }));
      show([shelf, ...books], 4);
      // M6 Before: a sealed controller crate under an October report.
      const crate = onFloor('workshop-diagnosis-board', -1.2, 0.5, (p) => { const c = box(group, 0.7, 0.6, 0.6, p.x, 0.3, p.z, PAINT(0x8a7f6a), p.rotY); solid?.(p.x, p.z, 0.8, 0.8, 0.6); return c; });
      const seal = onFloor('workshop-diagnosis-board', -1.2, 0.5, (p) => box(group, 0.72, 0.06, 0.62, p.x, 0.5, p.z, TAPE(), p.rotY));
      const report = onFace('workshop-diagnosis-board', { dx: -1.1, y: 1.3, w: 0.4, h: 0.5, text: '', pin: true, tone: 'card' });
      show([crate, seal], 5); showSlips([report], 5);
      // M7 Before: a worn operator card beneath the padded-stop force trace.
      const trace = onFace('casebook-table', { dx: 1.05, y: 1.3, w: 0.5, h: 0.3, text: '', pin: true });
      const traceLine = onWallBox('casebook-table', 1.05, 2.05, 0.4, 0.02, 0.02, PAINT(0xc4342a), { rotZ: -0.25, out: 0.01 });
      const worn = onFace('casebook-table', { dx: 1.05, y: 1.0, w: 0.3, h: 0.18, text: '', pin: 'clip', tone: 'card', tilt: 0.08 });
      showSlips([trace, worn], 6); show([traceLine], 6);
      break;
    }
    case 'COASTER': {
      // M10 Before: a taped-over track drawing beside the independent axle sensor.
      const drawing = onFace('profile-drawing', { dx: 1.1, y: 1.45, w: 0.6, h: 0.42, text: '', pin: false, tone: 'card' });
      const tapes = [[0.92, 0.45], [1.28, -0.45]].map(([dx, r]) => onWallBox('profile-drawing', dx, 2.12, 0.16, 0.04, 0.02, TAPE(), { rotZ: r, out: 0.012 }));
      const sensor = onFloor('profile-drawing', 1.3, 0.4, (p) => box(group, 0.3, 0.3, 0.3, p.x, 0.15, p.z, PAINT(0x466f7e), p.rotY));
      showSlips([drawing], 9); show([...tapes, sensor], 9);
      // M14 Before: the crown tape lies across a drawing whose curve no longer matches.
      const tape = onWallBox('crown-tape', 1.0, 2.2, 0.9, 0.05, 0.02, TAPE(), { rotZ: 0.1, out: 0.014 });
      const drawing2 = onFace('crown-tape', { dx: 1.0, y: 1.5, w: 0.62, h: 0.42, text: '7.4 m', pin: false, tone: 'card' });
      show([tape], 13); showSlips([drawing2], 13);
      break;
    }
    case 'FLUME': {
      // M11 Before: the flume header pulses beside the shared motor plate.
      const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16), new THREE.MeshStandardMaterial({ color: 0xc6e6ee, emissive: 0xc6e6ee, emissiveIntensity: 0.6 }));
      const a = at('pump-curve');
      if(a){ const p = proud(a.face(0.9, 1.3), 0.04); gauge.position.set(p.x, 2.5, p.z); gauge.rotation.x = PI / 2; gauge.rotation.z = p.rotY; group.add(gauge); animate?.(flicker(gauge.material, 0.8, 0.6, 3.2)); }
      gauge.userData.ignoreAudit = true;
      const plate = onFace('pump-curve', { dx: 0.9, y: 1.05, w: 0.3, h: 0.16, text: ['55 kW'], pin: false, tone: 'card' });
      show([gauge], 10); showSlips([plate], 10);
      break;
    }
    case 'TOWER': {
      // M12 Before: two test dummies sit beside the signed parts list.
      const dummies = [-1.3, -0.9].map(dx => onFloor('witness-sheet', dx, 0.45, (p) => { const g = new THREE.Group(); cyl(g, 0.16, 0.9, 0, 0.45, 0, PAINT(0xc9962a), 0.12); const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), PAINT(0xc9962a)); h.position.y = 1.02; g.add(h); g.position.set(p.x, 0, p.z); group.add(g); return g; }));
      const parts = onFace('witness-sheet', { dx: 0.9, y: 1.3, w: 0.4, h: 0.5, text: '', pin: true });
      if(dummies[0]){ const p = at('witness-sheet').floor(-1.1, 0.45); solid?.(p.x, p.z, 0.9, 1.1, 0.5); }
      show(dummies, 11); showSlips([parts], 11);
      break;
    }
    case 'PLANT': {
      // M13 Before: three start requests hang under one 55 kW plate.
      const plate = onFace('motor-plate', { dx: 0, y: 2.2, w: 0.4, h: 0.2, text: ['55 kW'], pin: false, tone: 'card' });
      const requests = ['Carousel', 'Pirate Ship', 'Ferris Wheel'].map((r, i) => onFace('motor-plate', { dx: -0.9 + i * 0.32, y: 0.9, w: 0.28, h: 0.2, text: [r], pin: 'clip', tilt: (i - 1) * 0.06 }));
      void plate;
      showSlips(requests, 12);
      break;
    }
    case 'REOPENIN': {
      // "Seven rows show which ride decisions have enough proof to sign": one
      // slip a ride beside the certificate board, carrying the ride's card line.
      const rows = RIDES.map((rid, i) => onFace('certificate-board', { dx: -1.05 + i * 0.35, y: 1.6, w: 0.3, h: 0.22, text: [RIDE_NAME[rid]], sub: 'CLOSED', pin: true }));
      hooks.push((state) => { const k = n(state); rows.forEach((s, i) => s?.set({ sub: rideCard(RIDES[i], k).big })); });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list, the things a lakeside park has whether or not it is
// open: pigeons on the wheel's frame, flags and bunting in the lake wind, a
// popcorn cart nobody has wheeled away, puddles on the asphalt, gulls over the
// water, the flume's water actually running once its pump does, and a
// maintenance cart on the service road.
export function storyExtras(scene, ctx){
  const { groundHeight, animate, softColliders, certified } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // Pigeons on the wheel's A-frame beam, heads bobbing; one lifts off now and then.
  {
    const beamY = at(-18, 34) + (14 + 3.4) * 0.55;
    for(let i = 0; i < 6; i++){
      const b = bird(scene, i % 2 ? 0x6a6d72 : 0x8a8d90, 0.55);
      const x = -22.5 + i * 1.8, z = 28.5 + (i % 2 ? 0.1 : -0.1);
      b.g.position.set(x, beamY + 0.15, z); b.g.rotation.y = (i % 2 ? 1 : -1) * PI / 2;
      const hy = b.head.position.y;
      animate?.((t) => {
        b.head.position.y = hy - Math.max(0, Math.sin(t * 3 + i * 1.3)) * 0.04;
        if(i === 5){ const k = Math.max(0, Math.sin(t * 0.25)); b.g.position.y = beamY + 0.15 + k * 3; b.g.position.x = x + k * 4; b.wings.forEach((w, s) => { w.rotation.x = k > 0.01 ? (s ? -1 : 1) * Math.sin(t * 12) * 0.7 : 0; }); }
      });
    }
  }

  // Flags on the carousel roof and the tower head, and bunting between the
  // stalls either side of the avenue, all swaying.
  {
    /**
     * A flag on a staff, on a roof.
     *
     * THREE THINGS WRONG WITH THE FIRST CUT, all of them visible from the
     * ground. The staff was 3 cm across at nine metres up, which is under a
     * pixel at walking distance — so the cloth read as hanging in the air with
     * nothing holding it. It swayed on TWO axes at 2.1 and 3.3 rad/s, which is
     * three flaps a second: a flag in a lake breeze moves at about a fifth of
     * that, and the z sway tipped the whole flag up and down rather than
     * rippling it. And it swayed about the flag's own centre, so the corner at
     * the staff swung away from the staff.
     *
     * So: a staff you can see, one slow sway about the staff, and the cloth's
     * geometry translated so the pivot is its luff rather than its middle.
     */
    const flag = (x, y, z, colour) => {
      cyl(scene, 0.06, 2.4, x, y + 1.2, z, STEEL());
      const f = box(scene, 0.9, 0.5, 0.02, x, y + 1.9, z, PAINT(colour));
      f.geometry = f.geometry.clone().translate(0.45, 0, 0);   // pivot at the luff
      animate?.(sway(f, 'y', 0.14, 0.55, x));
    };
    flag(-44, at(-44, -16) + 9.5, -16, 0xc4342a);
    flag(44, at(44, -74) + 45.7, -74, 0xe6e0d0);
    flag(-44, at(-44, 8) + 10.3, 8, 0xc9962a);
    const colours = [0xc4342a, 0xe6e0d0, 0xc9962a, 0x466f7e];
    for(const [x0, z0, x1, z1] of [[-14, 48, 14, 48], [-14, 36, 14, 34], [-14, 4, 14, -6], [-14, -34, 14, -40]]){
      const y0 = at(x0, z0) + 3.6, y1 = at(x1, z1) + 3.6;
      const g = new THREE.Group();
      for(let i = 1; i < 14; i++){
        const t = i / 14, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t, y = y0 + (y1 - y0) * t - Math.sin(t * PI) * 0.9;
        const tri = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.36, 3), PAINT(colours[i % 4]));
        tri.position.set(x, y - 0.2, z); tri.rotation.x = PI; g.add(tri);
      }
      scene.add(g);
      animate?.(sway(g, 'x', 0.02, 1.7, x0 + z0));
    }
  }

  // A popcorn cart, left where the season ended.
  {
    const x = 16, z = 28, y = at(x, z);
    const g = new THREE.Group();
    box(g, 1.2, 0.9, 0.8, 0, 0.75, 0, PAINT(0xc4342a));
    box(g, 1.1, 0.7, 0.7, 0, 1.55, 0, MATERIALS.glass());
    box(g, 1.3, 0.08, 0.9, 0, 1.95, 0, PAINT(0xe6e0d0));
    for(let i = -2; i <= 2; i++) box(g, 0.24, 0.08, 0.9, i * 0.26, 1.955, 0, PAINT(i % 2 ? 0xc4342a : 0xe6e0d0));
    for(const s of [-1, 1]){ const w = cyl(g, 0.3, 0.06, s * 0.5, 0.3, 0.45, MATERIALS.rubber()); w.rotation.x = PI / 2; }
    box(g, 0.04, 0.04, 0.9, -0.62, 1.0, -0.6, STEEL());
    g.position.set(x, y, z); g.rotation.y = 0.5; scene.add(g);
    softColliders?.push({ x, z, r: 1.1 });
  }

  // Puddles: dark glossy discs on the asphalt off the avenue.
  {
    const wet = mat('corbin.puddle', () => new THREE.MeshStandardMaterial({ color: 0x2a3036, roughness: 0.08, metalness: 0.2 }));
    for(const [x, z, r] of [[-20, 40, 1.4], [18, 14, 1.1], [-24, -30, 1.8], [20, -44, 1.2], [-10, -80, 1.5], [26, 60, 1.3], [-36, 30, 1.0], [12, 72, 1.6]]){
      const p = new THREE.Mesh(new THREE.CircleGeometry(r, 18), wet);
      p.rotation.x = -PI / 2; p.position.set(x, at(x, z) + 0.015, z); p.scale.set(1, 0.7, 1); p.userData.ignoreAudit = true;
      scene.add(p);
    }
  }

  // The flume's water running: a rippled sheet over the splash pool and the
  // return channel, scrolling while the pump is on (props.js's `certified.FLUME`).
  {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = '#5f8a92'; g.fillRect(0, 0, 128, 128);
    g.strokeStyle = 'rgba(220,240,245,0.55)'; g.lineWidth = 3;
    for(let i = 0; i < 6; i++){ g.beginPath(); g.moveTo(0, i * 22 + 4); g.bezierCurveTo(40, i * 22 - 8, 90, i * 22 + 16, 128, i * 22 + 4); g.stroke(); }
    const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(6, 4); tex.colorSpace = THREE.SRGBColorSpace;
    const water = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85 });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 8.6), water);
    pool.rotation.x = -PI / 2; pool.position.set(-16, at(-16, -116) + 0.92, -116); pool.userData.ignoreAudit = true; pool.visible = false;
    scene.add(pool);
    const run = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 21), water);
    run.rotation.x = -PI / 2; run.position.set(-26, at(-26, -99) + 1.4 + 0.24, -99); run.userData.ignoreAudit = true; run.visible = false;
    scene.add(run);
    const scroll = scrollUV(tex, 0.05, -0.25);
    animate?.((t, dt) => { const on = !!certified?.FLUME; pool.visible = on; run.visible = on; if(on) scroll(t, dt); });
  }

  // A maintenance cart on the service road behind the rides, all day.
  {
    const g = new THREE.Group();
    box(g, 1.3, 0.5, 2.4, 0, 0.55, 0, PAINT(0x3f6f5a));
    box(g, 1.2, 0.5, 1.0, 0, 1.05, 0.5, PAINT(0x33383d));
    box(g, 1.4, 0.06, 2.5, 0, 1.75, 0, PAINT(0xe6e0d0));
    for(const [sx, sz] of [[-0.6, 0.9], [0.6, 0.9], [-0.6, -0.9], [0.6, -0.9]]) cyl(g, 0.04, 1.1, sx, 1.2, sz, STEEL());
    for(const [wx, wz] of [[0.6, 0.8], [-0.6, 0.8], [0.6, -0.8], [-0.6, -0.8]]){ const w = cyl(g, 0.25, 0.18, wx, 0.25, wz, MATERIALS.rubber()); w.rotation.z = PI / 2; }
    const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshStandardMaterial({ color: 0xffb040, emissive: 0xffb040, emissiveIntensity: 2 }));
    strobe.position.set(0, 1.9, -0.4); g.add(strobe);
    scene.add(g);
    const route = [[-64, 50], [-64, -56], [-67, -56], [-67, 50]].map(([x, z]) => ({ x, y: at(x, z), z }));
    g.position.set(route[0].x, route[0].y, route[0].z);
    animate?.(patrol(g, route, 2.6));
    animate?.((t) => { strobe.material.emissiveIntensity = (t % 1.0) < 0.15 ? 3 : 0.2; });
  }

  // Gulls over the lake, circling and dipping.
  {
    for(let i = 0; i < 7; i++){
      const b = bird(scene, 0xe8e6df, 0.9);
      const cx = -10 + (i % 3) * 14, cz = -140 - (i % 2) * 20, r = 14 + i * 2, h = 12 + (i % 4) * 2.5;
      animate?.((t) => {
        const a = t * (0.32 + (i % 3) * 0.05) + i * 0.9;
        b.g.position.set(cx + Math.cos(a) * r, h + Math.sin(t * 0.7 + i) * 1.8, cz + Math.sin(a) * r);
        b.g.rotation.y = -a; b.g.rotation.z = 0.22;
        const beat = Math.sin(t * 7 + i) * (0.4 + 0.3 * Math.max(0, Math.sin(t * 0.5 + i)));
        b.wings.forEach((w, s) => { w.rotation.x = (s ? -1 : 1) * beat; });
      });
    }
  }
  void bob; void spin;
}
