// story.js — Kesteven House changing, mission by mission, for fifteen days.
//
// The bible (../fpl_gpt/CHANGEOVER.md) writes the world as a situation that
// changes fifteen times: a `Physical aftermath` per mission with a home fixture,
// a before, an after and a trigger; the §7.1 ledger; three landmark-only spaces
// with a before and a visible change; and §8.1, the sixty seconds after the
// last decision — shutters up, old-note cages out, new notes in the trays, the
// street boards turning. Every one of those is a prop here, keyed to the
// mission that writes it.
//
// **Every word a player can read on these props is the bible's own** — the
// exact After action, the mission header, the sheet a person stamps or pins
// (`REAL OUTPUT: 685.2 BILLION`, `HOLD RATE`, `3.25% POLICY RATE`), the
// three tags on the AD–AS wall. Geometry, placement and motion are ours.
//
// HOW THE STATE REACHES A ROOM IN A TOWER. `engine/world/interiorTower.js`
// builds every floor's rooms through `theme.fitOutRoom(room, ctx)` and gives
// the theme no state hook — `ctx.stateHooks` exists only for outdoor props and
// for rooms built by `interiorBuilding.js`. So this theme's own `world.js`
// wraps the tower's `updateWorldFromState` and, after it, runs `applyStoryState`
// below over the hooks each room pushed while it was being fitted out. No engine
// file is touched: the theme's plan names `themes/changeover_v2/world.js` as its
// world, and that shim is where the wrapping happens.
//
// Coordinates: `fitOutRoom` builds into the floor's own holder group, so y = 0
// is that floor's floor and every position here is floor-local. `ctx.bounds`
// is the tower's `{ xInner, xOuter, z0, z1, cx, cz, sign }` and not the town
// room's `{ x0, x1, w, d, flip }`, so `fixturePlaces` does not apply here;
// `fixtureWorld` below repeats the one transform `interiorSite.js` uses to stand
// a fixture in a corridor room, so a slip lands beside the object the bible
// pins it to.
import * as THREE from 'three';
import { animate, patrol, bob, sway, scrollUV, blink } from '../../engine/world/animators.js';
import { statusPanel, slip, missionsAccepted } from '../../engine/world/paper.js';
import { markStructure } from '../../engine/world/interiorKit.js';
import { FIXTURES } from './fixtures.js';
import { MISSIONS } from './content/missions.js';

// ------------------------------------------------------------ the state hook
/** Every hook a room or the outdoors registered. `world.js` runs them. */
export const STATE_HOOKS = [];
export function registerStateHook(fn){ if(typeof fn === 'function') STATE_HOOKS.push(fn); }
export function clearStateHooks(){ STATE_HOOKS.length = 0; }
/** Run every hook with the state; one failing prop must not take the rest with it. */
export function applyStoryState(state){
  if(!state) return;
  for(const hook of STATE_HOOKS){
    try{ hook(state); }catch(err){ console.warn('[changeover story] a state hook failed', err); }
  }
}

/**
 * Which floor is active, asked of the tower through `world.js` rather than
 * imported from it: this file is loaded by the node-side checkers through
 * `props.js`, and the world module is for the browser.
 */
let floorProbe = () => null;
export function setFloorProbe(fn){ if(typeof fn === 'function') floorProbe = fn; }

const THEME_STUB = { content: { MISSIONS } };
/** Missions whose decision is accepted — the bible's `accepted_stop_4N`. */
const n = (state) => missionsAccepted(state, THEME_STUB);
const day = (state) => Math.max(1, Math.min(15, state?.week ?? 1));
const finale = (state) => state?.status === 'won' || n(state) >= 15;

/** The bible's mission briefing header, verbatim, one per mission. */
export function HEADER(state){
  if(state?.status === 'won') return 'MISSION 15 COMPLETE';
  const m = day(state);
  const left = 16 - m;
  return `MISSION ${m} - ${left} ${left === 1 ? 'DAY' : 'DAYS'} UNTIL CHANGEOVER.`;
}

// --------------------------------------------------------- the fifteen pages
/**
 * §7.1 and the fifteen `Physical aftermath` blocks, verbatim. `home` is the
 * bible's fixture id; `after` the exact action; `sheet` the words the action
 * itself puts on paper, where it names them; `problem` is our shape for "the
 * next problem, physically", which stands on the NEXT home from the mission
 * before and stays.
 */
export const AFTERMATH = [
  { m: 1,  home: 'queue-board',         after: 'Eli Voss clips the dated national figures beside the queue tally.' },
  { m: 2,  home: 'output-ledger',       after: 'Idris Pell stamps the corrected output sheet REAL OUTPUT: 685.2 BILLION.', sheet: 'REAL OUTPUT: 685.2 BILLION', problem: 'tray' },
  { m: 3,  home: 'price-history-board', after: 'Lina Saye pins the companion price measure beside the unchanged historical series.', problem: 'basket' },
  { m: 4,  home: 'wage-notice-rail',    after: 'Eli Voss clips the participation warning to the wage rail.', problem: 'notice' },
  { m: 5,  home: 'policy-wall',         after: 'Rhea Dane pins the 8.7-BILLION PURCHASE OPTION to the policy wall.', sheet: '8.7-BILLION PURCHASE OPTION', problem: 'order' },
  { m: 6,  home: 'ad-as-wall',          after: 'Rhea Dane pins the separate demand and supply responses to the model wall.', problem: 'pins' },
  { m: 7,  home: 'conversion-trays',    after: 'Eli Voss seals the counted old-note bundle with its deposit receipt.', problem: 'bundles' },
  { m: 8,  home: 'bond-panel',          after: 'Tomas Arendt clips the HOLD RATE decision beneath the bond-price rail.', sheet: 'HOLD RATE', problem: 'quote' },
  { m: 9,  home: 'payment-wires',       after: 'Nia Corren pins the paired financing and export-cost entries beside the payment wires.', problem: 'lamp' },
  { m: 10, home: 'price-history-board', after: 'Lina Saye pins the 2% LONG-RUN INFLATION estimate beside the shock record.', sheet: '2% LONG-RUN INFLATION', problem: 'strip' },
  { m: 11, home: 'threshold-rail',      after: 'Rhea Dane clips the temporary bridge and expiry rule onto the threshold rail.', problem: 'contract' },
  { m: 12, home: 'reserve-clock',       after: 'Tomas Arendt pins the verified 4.15 timing strip beneath the reserve clock.', sheet: '4.15' },
  { m: 13, home: 'policy-wall',         after: 'Rhea Dane replaces the full bridge order with the smaller temporary plan.', problem: 'folder' },
  { m: 14, home: 'threshold-rail',      after: 'Mara Venn pins the first-week cover card beside the emergency triggers.', problem: 'bulletin' },
  { m: 15, home: 'conversion-desk',     after: 'Mara Venn turns the counter-opening key.' },
];

/** The HUD line the bible prints when a mission's evidence is recorded — verbatim. */
const RECORDED = (m) => `MISSION ${m} EVIDENCE: RECORDED`;

// ------------------------------------------------------------- materials
const M = {
  post:   new THREE.MeshStandardMaterial({ color: 0x4a4d52, roughness: 0.55, metalness: 0.5 }),
  board:  new THREE.MeshStandardMaterial({ color: 0x5a4a38, roughness: 0.85 }),
  cork:   new THREE.MeshStandardMaterial({ color: 0x8a6e4a, roughness: 0.95 }),
  tray:   new THREE.MeshStandardMaterial({ color: 0x3a3d40, roughness: 0.6, metalness: 0.3 }),
  paper:  new THREE.MeshStandardMaterial({ color: 0xd9d3c3, roughness: 0.95 }),
  red:    new THREE.MeshStandardMaterial({ color: 0xb8352a, roughness: 0.6 }),
  bundle: new THREE.MeshStandardMaterial({ color: 0x6f7a5a, roughness: 0.9 }),
  crown:  new THREE.MeshStandardMaterial({ color: 0x2f7a72, roughness: 0.8 }),
  cloth:  new THREE.MeshStandardMaterial({ color: 0x6b6a5e, roughness: 1.0 }),
  brass:  new THREE.MeshStandardMaterial({ color: 0xb08a3a, roughness: 0.35, metalness: 0.8 }),
  wicker: new THREE.MeshStandardMaterial({ color: 0x7a5a34, roughness: 0.95 }),
  steel:  new THREE.MeshStandardMaterial({ color: 0x7a8288, roughness: 0.5, metalness: 0.6 }),
  wire:   new THREE.MeshStandardMaterial({ color: 0x8a8f94, roughness: 0.5, metalness: 0.5, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
  lamp:   new THREE.MeshStandardMaterial({ color: 0xffd080, emissive: 0xffb040, emissiveIntensity: 0 }),
  chalk:  new THREE.MeshStandardMaterial({ color: 0xd8d6cc, roughness: 1 }),
  chalk2: new THREE.MeshStandardMaterial({ color: 0xe0c060, roughness: 1 }),
  slate:  new THREE.MeshStandardMaterial({ color: 0x2c3034, roughness: 0.9 }),
  mug:    new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: 0.6 }),
  feather:new THREE.MeshStandardMaterial({ color: 0x5c5f66, roughness: 0.95 }),
  dial:   new THREE.MeshStandardMaterial({ color: 0xe6e0d0, roughness: 0.7 }),
  hand:   new THREE.MeshStandardMaterial({ color: 0x1e2126, roughness: 0.6 }),
  hand2:  new THREE.MeshStandardMaterial({ color: 0x2f6b8a, roughness: 0.6 }),
};

/** A plain box in a group, in local coordinates. Own geometry, so no shared-unit trap. */
function bx(parent, w, h, d, x, y, z, mat, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  m.userData.ignoreAudit = true;
  parent.add(m);
  return m;
}
function cy(parent, r, h, x, y, z, mat, rTop = r){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, r, h, 12), mat);
  m.position.set(x, y, z);
  m.userData.ignoreAudit = true;
  parent.add(m);
  return m;
}
/** A blank sheet of paper: a slip with no words on it and no pin. */
function paper(parent, x, y, z, rotY, opts = {}){
  return slip(parent, { x, y, z, rotY, w: opts.w ?? 0.26, h: opts.h ?? 0.18, text: '', pin: false, tone: opts.tone, tilt: opts.tilt ?? 0, visible: opts.visible });
}

// ------------------------------------------------------- where a fixture is
/**
 * The tower's own placement of a declared fixture, in floor coordinates.
 *
 * `interiorSite.js` puts an anchor at the room's middle, turns it so local +z
 * points out of the corridor (`sign * π/2`), and calls `fixtureSpot` with the
 * room's own bounds in that frame: `back` is the outer wall — which in this
 * building is the glass — `left`/`right` the two cross-walls. This is that
 * transform again, so a holder can stand beside the object rather than on it.
 */
function fixtureWorld(room, b, fx, wallT = 0.18){
  const w = Math.abs(room.z1 - room.z0), d = Math.abs(b.xOuter - b.xInner);
  const inset = wallT / 2 + 0.95;
  const wall = fx.wall ?? 'back';
  const along = fx.along ?? 0;
  let lx, lz, lyaw;
  if(wall === 'left'){ lx = -w / 2 + inset; lz = along * (d / 2 - 1.6); lyaw = Math.PI / 2; }
  else if(wall === 'right'){ lx = w / 2 - inset; lz = along * (d / 2 - 1.6); lyaw = -Math.PI / 2; }
  else { lx = along * (w / 2 - 1.6); lz = d / 2 - inset; lyaw = Math.PI; }
  const s = b.sign;
  const toWorld = (LX, LZ) => ({ x: b.cx + LZ * s, z: b.cz - LX * s });
  return { ...toWorld(lx, lz), yaw: lyaw + s * Math.PI / 2, wall, lx, lz, w, d, toWorld };
}

/**
 * Where the fixture's evidence holder stands: against the same wall, 1.6 m
 * along it, on whichever side is clear of the other fixtures on that wall —
 * the price room's history board and calculating desk are a metre apart.
 */
function holderSpot(room, b, fixtures, fx){
  const f = fixtureWorld(room, b, fx);
  const others = fixtures.filter(o => o !== fx && (o.wall ?? 'back') === f.wall).map(o => fixtureWorld(room, b, o));
  const HOLD_INSET = 0.75;
  const pick = (dir) => {
    if(f.wall === 'back'){
      const lx = f.lx + dir * 1.6, lz = f.d / 2 - HOLD_INSET;
      return { lx, lz, clear: Math.min(Infinity, ...others.map(o => Math.abs(o.lx - lx))) };
    }
    const lz = f.lz + dir * 1.6;
    const lx = f.wall === 'left' ? -f.w / 2 + HOLD_INSET : f.w / 2 - HOLD_INSET;
    return { lx, lz, clear: Math.min(Infinity, ...others.map(o => Math.abs(o.lz - lz))) };
  };
  const a = pick(1), c = pick(-1);
  // Never past the room's ends, and prefer the side furthest from a neighbour.
  const inside = (p) => f.wall === 'back'
    ? Math.abs(p.lx) < f.w / 2 - 1.0
    : Math.abs(p.lz) < f.d / 2 - 1.0;
  const best = [a, c].filter(inside).sort((p, q) => q.clear - p.clear)[0] ?? a;
  return { ...f.toWorld(best.lx, best.lz), yaw: f.yaw };
}

/**
 * The bible's "dated evidence holder": a stand beside the fixture with a cork
 * board for the accepted record and a shelf for whatever the last mission left
 * there. `slots` is how many sheets the board has to hold; a fixture that is
 * home to two missions (the policy wall, the threshold rail, the history
 * board) gets a wider board, because later pages never erase earlier ones.
 */
function evidenceHolder(parent, { x, z, yaw, slots = 1, soft }){
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = yaw;
  const W = Math.max(0.5, slots * 0.36 + 0.14);
  cy(g, 0.03, 1.5, 0, 0.75, -0.05, M.post);
  bx(g, 0.5, 0.04, 0.32, 0, 0.02, -0.05, M.post);                 // foot
  bx(g, W, 0.62, 0.03, 0, 1.55, 0, M.board);                       // frame
  bx(g, W - 0.06, 0.56, 0.012, 0, 1.55, 0.012, M.cork);            // cork
  bx(g, 0.5, 0.02, 0.3, 0, 0.98, 0.06, M.board);                   // the shelf
  parent.add(g);
  markStructure([g], 'holder');
  soft?.(x, z, 0.32);
  /** The face position of slot i (0-based, left to right), for a slip 0.3 wide. */
  const slot = (i) => ({ x: -W / 2 + 0.07 + 0.18 + i * 0.36, y: 1.55, z: 0.025, rotY: 0 });
  return { g, slot, shelf: { y: 1.0, z: 0.06 } };
}

/** What the mission before left on the shelf — the bible's "next problem, physically". */
function problemProp(kind, g, shelf){
  const P = new THREE.Group();
  P.position.set(0, shelf.y, shelf.z);
  g.add(P);
  const sheet = (x, z, tilt = 0, tone) => paper(P, x, 0.09, z, 0, { w: 0.2, h: 0.14, tilt, tone });
  switch(kind){
    case 'tray': {      // a stock-sale slip in the same tray as factory orders
      bx(P, 0.36, 0.03, 0.24, 0, 0.015, 0, M.tray);
      bx(P, 0.34, 0.01, 0.22, 0, 0.035, 0, M.paper);
      sheet(0.04, 0.02, 0.15); bx(P, 0.06, 0.012, 0.03, -0.1, 0.05, 0.05, M.red);
      break;
    }
    case 'basket': {    // an old basket beside a crossed-out shopping list
      cy(P, 0.11, 0.14, -0.1, 0.07, 0, M.wicker, 0.13);
      bx(P, 0.03, 0.03, 0.12, -0.1, 0.18, 0, M.wicker);
      const list = sheet(0.12, 0.0, -0.08);
      bx(P, 0.18, 0.006, 0.02, 0.12, 0.1, 0.0, M.red); void list;
      break;
    }
    case 'notice': {    // a job notice curls over an empty search card
      sheet(-0.06, 0.0, 0.3); sheet(0.08, 0.02, -0.05, 'card');
      break;
    }
    case 'order': {     // an unsigned spending order under a press deadline
      sheet(0, 0, 0.05); bx(P, 0.04, 0.05, 0.04, 0.12, 0.03, -0.02, M.brass);
      break;
    }
    case 'pins': {      // two red pins pull the wall's tracks apart
      for(const s of [-1, 1]){
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 6), M.red);
        p.position.set(s * 0.09, 0.06, 0); P.add(p);
        bx(P, 0.008, 0.06, 0.008, s * 0.09, 0.03, 0, M.steel);
      }
      bx(P, 0.24, 0.004, 0.004, 0, 0.005, 0.02, M.red);
      break;
    }
    case 'bundles': {   // old-crown bundles fill a tray beside deposit receipts
      bx(P, 0.36, 0.03, 0.24, 0, 0.015, 0, M.tray);
      for(let i = 0; i < 3; i++) bx(P, 0.09, 0.05, 0.16, -0.11 + i * 0.1, 0.055, -0.02, M.bundle);
      sheet(0.14, 0.06, 0.1);
      break;
    }
    case 'quote': {     // a loan quote beside the expected-price sheet
      sheet(-0.07, 0, -0.1); sheet(0.08, 0.01, 0.08);
      break;
    }
    case 'lamp': {      // a payment lamp lights while an export order is crossed out
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), M.lamp.clone());
      lamp.position.set(-0.1, 0.06, 0); P.add(lamp);
      lamp.material.emissiveIntensity = 1.8;
      cy(P, 0.02, 0.03, -0.1, 0.015, 0, M.steel);
      sheet(0.08, 0, 0.1); bx(P, 0.16, 0.006, 0.02, 0.08, 0.1, 0, M.red);
      break;
    }
    case 'strip': {     // the long money-growth strip lies beneath today's fuel alert
      bx(P, 0.4, 0.004, 0.08, 0, 0.002, 0, M.paper);
      sheet(0.02, -0.01, 0.1, 'card'); bx(P, 0.14, 0.008, 0.03, 0.02, 0.1, -0.03, M.red);
      break;
    }
    case 'contract': {  // a wage contract's six-week date extends past changeover day
      sheet(0, 0, -0.05); bx(P, 0.03, 0.01, 0.03, 0.06, 0.1, 0.03, M.red);
      break;
    }
    case 'folder': {    // loan refusals and lost export orders share the spending folder
      bx(P, 0.3, 0.03, 0.22, 0, 0.015, 0, M.board);
      sheet(-0.04, -0.02, 0.06); sheet(0.05, 0.03, -0.08);
      break;
    }
    case 'bulletin': {  // a fuel bulletin lands beside a completed conversion test
      sheet(-0.08, 0, 0.12); bx(P, 0.12, 0.008, 0.02, -0.08, 0.1, -0.03, M.red);
      sheet(0.08, 0, -0.04, 'card');
      break;
    }
    default: break;
  }
  return P;
}

// ------------------------------------------------------ rain, pigeons, boards
/** Streaks for the glass. */
function rainTexture(){
  const c = document.createElement('canvas'); c.width = 128; c.height = 256;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 128, 256);
  let s = 7;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  for(let i = 0; i < 70; i++){
    const x = rnd() * 128, y = rnd() * 256, l = 12 + rnd() * 60;
    g.strokeStyle = `rgba(220,230,240,${0.25 + rnd() * 0.4})`; g.lineWidth = 1 + rnd();
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + 1, y + l); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
/** Rain on a pane: a streaked plane just inside the glass, shown on the wet days. */
function rainPane(parent, { x, y, z, rotY, w, h }){
  const tex = rainTexture(); tex.repeat.set(Math.max(1, Math.round(w / 1.5)), Math.max(1, Math.round(h / 3)));
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }));
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.userData.ignoreAudit = true; markStructure([m], 'weather');
  m.visible = false;
  parent.add(m);
  animate(scrollUV(tex, 0, 0.7));
  registerStateHook((state) => { m.visible = wetDay(state); });
  return m;
}
/** Which days it rains: the second of every three. The fifteenth is dry. */
const wetDay = (state) => state?.status !== 'won' && day(state) % 3 === 2 && day(state) < 15;

/** A pigeon: a body, a head that pecks, and a turn now and then. */
function pigeon(parent, x, y, z, yaw, phase){
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = yaw;
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), M.feather); body.scale.set(1.5, 1, 1); body.position.y = 0.1; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.045, 7, 5), M.feather); head.position.set(0.14, 0.17, 0); g.add(head);
  bx(g, 0.04, 0.012, 0.012, 0.19, 0.16, 0, M.brass);
  parent.add(g);
  const hy = head.position.y;
  animate((t) => {
    head.position.y = hy - Math.max(0, Math.sin(t * 2.6 + phase)) * 0.07;
    g.rotation.y = yaw + Math.sin(t * 0.23 + phase) * 0.6;
  });
  return g;
}

/**
 * The reserve clock: a dial with the payment mark at twelve and two hands —
 * required and actual — that come round to it from opposite sides as the
 * fortnight goes on. Mission 12 settles them on the mark.
 */
function reserveDial(parent, { x, y, z, rotY }){
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rotY;
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 32), M.dial);
  face.rotation.x = Math.PI / 2; g.add(face);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 8, 32), M.brass); rim.position.z = 0.0; g.add(rim);
  bx(g, 0.05, 0.09, 0.012, 0, 0.36, 0.02, M.red);                            // the payment mark
  for(let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2; bx(g, 0.012, 0.05, 0.008, Math.sin(a) * 0.36, Math.cos(a) * 0.36, 0.018, M.hand, 0).rotation.z = -a; }
  const hand = (mat, len, wdt, zz) => {
    const h = new THREE.Group(); h.position.z = zz;
    const b = bx(h, wdt, len, 0.01, 0, len / 2 - 0.03, 0, mat);
    void b; g.add(h); return h;
  };
  const required = hand(M.hand, 0.32, 0.03, 0.03);
  const actual = hand(M.hand2, 0.27, 0.035, 0.04);
  cy(g, 0.03, 0.05, 0, 0, 0.04, M.brass).rotation.x = Math.PI / 2;
  parent.add(g);
  markStructure([g], 'clock');
  registerStateHook((state) => {
    const k = Math.min(1, n(state) / 12);
    // rotation.z positive turns the hand anticlockwise as seen from the front.
    required.rotation.z = (1 - k) * 1.3;
    actual.rotation.z = -(1 - k) * 1.7;
  });
  return g;
}

/** The chalked shift rota: a slate, a grid of names in chalk, and three gaps. */
function rotaBoard(parent, { x, y, z, rotY }){
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rotY;
  bx(g, 1.5, 1.0, 0.03, 0, 0, 0, M.board);
  bx(g, 1.4, 0.9, 0.012, 0, 0, 0.012, M.slate);
  const gaps = new Set([5, 11, 16]);
  const cover = [];
  for(let r = 0; r < 4; r++){
    for(let c = 0; c < 5; c++){
      const i = r * 5 + c;
      const px = -0.56 + c * 0.28, py = 0.3 - r * 0.2;
      bx(g, 0.05, 0.05, 0.006, px - 0.09, py, 0.02, M.chalk);                 // the day
      if(gaps.has(i)){
        const m = bx(g, 0.14, 0.018, 0.006, px + 0.04, py, 0.02, M.chalk2);   // temporary cover, another hand
        m.visible = false; cover.push(m);
      } else {
        bx(g, 0.14, 0.018, 0.006, px + 0.04, py, 0.02, M.chalk);
      }
    }
  }
  bx(g, 1.3, 0.008, 0.006, 0, 0.42, 0.02, M.chalk);
  parent.add(g);
  markStructure([g], 'board');
  registerStateHook((state) => { for(const m of cover) m.visible = n(state) >= 11; });
  return g;
}

/**
 * A shopfront price board on Vend Street, seen from a hundred and eighty metres
 * up: three states — hurried stickers, both measures, the new currency with the
 * official conversion — and a flip when the last one arrives.
 */
function shopBoardTexture(stage){
  const c = document.createElement('canvas'); c.width = 128; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#2a2622'; g.fillRect(0, 0, 128, 64);
  if(stage === 0){
    let s = 3; const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
    for(let i = 0; i < 9; i++){ g.fillStyle = i % 3 ? '#e2c85a' : '#e8e0c0'; g.fillRect(6 + rnd() * 96, 6 + rnd() * 40, 14 + rnd() * 12, 10 + rnd() * 6); }
  } else if(stage === 1){
    g.fillStyle = '#e2c85a'; g.fillRect(6, 8, 52, 48);
    g.fillStyle = '#e8e6dc'; g.fillRect(70, 8, 52, 48);
  } else {
    g.fillStyle = '#2f8a7a'; g.fillRect(4, 4, 120, 56);
    g.fillStyle = '#f4f1e8'; g.font = '900 34px Inter, Helvetica, Arial, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('4.15', 64, 34);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ================================================================= rooms
/**
 * Dress one room of the tower. Called from `props.fitOutRoom` before the
 * generic furniture goes in; returns `{ keepClear }` so the furniture pass
 * leaves the story's own objects room to be walked up to.
 *
 * `ctx` is the tower's fit-out context — `scene` is the floor's holder group.
 */
export function dressRoom(id, room, ctx){
  const { scene: parent, bounds: b, soft, hard, floor } = ctx;
  const s = b.sign;
  const keep = [];
  const fixtures = FIXTURES[room.group ?? id] ?? FIXTURES[id] ?? [];
  const homes = AFTERMATH.filter(a => fixtures.some(f => f.id === a.home));

  // ---- the fifteen pages: an evidence holder beside every home fixture in this room.
  const byHome = new Map();
  for(const a of homes){ if(!byHome.has(a.home)) byHome.set(a.home, []); byHome.get(a.home).push(a); }
  for(const [homeId, pages] of byHome){
    const fx = fixtures.find(f => f.id === homeId);
    const spot = holderSpot(room, b, fixtures, fx);
    const slots = pages.reduce((k, a) => k + (a.sheet ? 2 : 1), 0);
    const H = evidenceHolder(parent, { ...spot, slots, soft });
    keep.push({ x: spot.x, z: spot.z, r: 1.1 });
    let i = 0;
    for(const a of pages){
      const action = slip(H.g, { ...H.slot(i++), w: 0.3, h: 0.24, text: a.after, sub: RECORDED(a.m), pin: 'clip', visible: false });
      const sheet = a.sheet ? slip(H.g, { ...H.slot(i++), w: 0.3, h: 0.24, text: [a.sheet], pin: true, tone: 'card', visible: false, tilt: 0.04 }) : null;
      const prob = a.problem ? problemProp(a.problem, H.g, H.shelf) : null;
      if(prob) prob.visible = false;
      registerStateHook((state) => {
        const k = n(state);
        action.set({ visible: k >= a.m });
        sheet?.set({ visible: k >= a.m });
        // The problem the mission before left here: from the moment that
        // mission is accepted, and it stays — later pages never erase evidence.
        if(prob) prob.visible = k >= a.m - 1;
      });
    }
  }

  // ---- rain on this room's glass, on the wet days. The outer wall is glass in
  //      every room; the plate's two ends are glass where a room reaches them.
  {
    const L = room.z1 - room.z0;
    rainPane(parent, { x: b.xOuter - s * 0.1, y: 1.55, z: b.cz, rotY: s > 0 ? -Math.PI / 2 : Math.PI / 2, w: L - 0.3, h: 2.7 });
    const plate = ctx.plan?.spine ?? { z0: -12, z1: 14 };
    for(const zz of [room.z0, room.z1]){
      if(Math.abs(zz - plate.z0) < 0.06 || Math.abs(zz - plate.z1) < 0.06){
        rainPane(parent, { x: b.cx, y: 1.55, z: zz - Math.sign(zz - b.cz) * 0.1, rotY: 0, w: Math.abs(b.xOuter - b.xInner) - 0.3, h: 2.7 });
      }
    }
  }

  switch(id){
    // ------------------------------------------------ 45 · the counter room
    case 'COUNTER': {
      // The days-to-changeover board on the cross-wall, printing the mission
      // header verbatim, over the wage rail.
      const days = statusPanel(parent, { x: b.cx, y: 2.5, z: room.z1 - 0.12, rotY: Math.PI, w: 2.6, h: 0.5, title: 'Changeover', big: 'MISSION 1 - 15 DAYS UNTIL CHANGEOVER.', tone: 'plain', lit: true });
      registerStateHook((state) => days.set({ big: HEADER(state), tone: state?.status === 'won' ? 'ok' : day(state) >= 13 ? 'warn' : 'plain' }));

      // The exchange counter and its shutter — "scene components of
      // `conversion-desk`" (§3). Closed for fourteen days; the new notes wait
      // under a cloth behind it from mission 14; the shutter rises on the last
      // decision, and the notes come out.
      const cx = b.xOuter - s * 2.4, cz = room.z0 + 2.7;
      const C = new THREE.Group(); C.position.set(cx, 0, cz); parent.add(C);
      bx(C, 2.4, 0.95, 0.7, 0, 0.475, 0, M.board);
      bx(C, 2.5, 0.05, 0.8, 0, 0.98, 0, M.brass);
      for(const dx of [-1.2, 1.2]) bx(C, 0.08, 2.35, 0.08, dx, 1.175, -0.2, M.steel);
      bx(C, 2.56, 0.3, 0.3, 0, 2.5, -0.2, M.steel);                             // the shutter box
      const leaf = bx(C, 2.3, 1.3, 0.04, 0, 1.66, -0.2, M.steel);                // the shutter, down
      for(let i = 0; i < 6; i++) bx(leaf, 2.2, 0.03, 0.05, 0, -0.55 + i * 0.22, 0.0, M.post);
      const cloth = bx(C, 0.9, 0.32, 0.5, -0.4, 0.16 + 0.98, -0.65, M.cloth); cloth.visible = false;
      const notes = new THREE.Group(); notes.position.set(-0.4, 0.98, -0.65); C.add(notes); notes.visible = false;
      for(let i = 0; i < 4; i++) bx(notes, 0.16, 0.07, 0.3, -0.3 + i * 0.2, 0.035, 0, M.crown);
      for(let i = 0; i < 4; i++) bx(notes, 0.16, 0.012, 0.31, -0.3 + i * 0.2, 0.08, 0, M.paper);
      const trayOut = new THREE.Group(); trayOut.position.set(0.5, 1.0, 0.1); C.add(trayOut); trayOut.visible = false;
      bx(trayOut, 0.36, 0.03, 0.24, 0, 0.015, 0, M.tray); for(let i = 0; i < 2; i++) bx(trayOut, 0.14, 0.05, 0.2, -0.09 + i * 0.18, 0.05, 0, M.crown);
      hard(cx, cz, 2.6, 0.9, 1.0);
      keep.push({ x: cx, z: cz, r: 2.0 });
      let rise = 0;
      animate((t, dt) => {
        const target = leaf.userData.open ? 1 : 0;
        if(rise === target) return;
        rise += Math.sign(target - rise) * dt / 6;
        rise = Math.max(0, Math.min(1, rise));
        leaf.position.y = 1.66 + rise * 0.8;
        leaf.scale.y = 1 - rise * 0.9;
      });
      registerStateHook((state) => {
        const k = n(state), done = finale(state);
        cloth.visible = k >= 14 && !done;
        notes.visible = done; trayOut.visible = done;
        leaf.userData.open = done;
      });

      // Pigeons on the ledge outside the glass, at the slab edge.
      for(const [dz, ph] of [[-3.2, 0], [-2.5, 1.7], [2.8, 3.1]]) pigeon(parent, b.xOuter + s * 0.35, 0.36, b.cz + dz, s > 0 ? -Math.PI / 2 : Math.PI / 2, ph);
      break;
    }

    // -------------------------------------- 45 · the note room: the trays
    case 'NOTES': {
      // New notes reach the trays on the last day: teal-banded stacks on a
      // trolley beside the conversion trays, where the old bundles were.
      const fx = fixtures.find(f => f.id === 'conversion-trays');
      const at = fx ? fixtureWorld(room, b, fx) : { x: b.cx, z: b.cz + 3, toWorld: null };
      const p = at.toWorld ? at.toWorld(at.lx + 2.4, at.lz - 0.2) : { x: at.x, z: at.z };
      const T = new THREE.Group(); T.position.set(p.x, 0, p.z); parent.add(T);
      bx(T, 0.9, 0.05, 0.6, 0, 0.75, 0, M.steel);
      for(const [dx, dz] of [[-0.4, -0.25], [0.4, -0.25], [-0.4, 0.25], [0.4, 0.25]]) cy(T, 0.03, 0.72, dx, 0.36, dz, M.post);
      for(const [dx, dz] of [[-0.38, -0.22], [0.38, -0.22], [-0.38, 0.22], [0.38, 0.22]]) cy(T, 0.06, 0.04, dx, 0.02, dz, M.hand).rotation.x = Math.PI / 2;
      const fresh = new THREE.Group(); fresh.position.y = 0.78; T.add(fresh); fresh.visible = false;
      for(let i = 0; i < 6; i++){ bx(fresh, 0.24, 0.1, 0.16, -0.3 + (i % 3) * 0.3, 0.05, -0.15 + Math.floor(i / 3) * 0.3, M.paper); bx(fresh, 0.25, 0.02, 0.17, -0.3 + (i % 3) * 0.3, 0.06, -0.15 + Math.floor(i / 3) * 0.3, M.crown); }
      soft(p.x, p.z, 0.5); keep.push({ x: p.x, z: p.z, r: 1.0 });
      registerStateHook((state) => { fresh.visible = finale(state); });
      break;
    }

    // -------------------------------------- 45 · the clerks' break room
    case 'CASHIER': {
      // "Tea goes cold beside a chalked shift rota." The rota on the cross-wall;
      // after Stop 44 temporary cover fills the gaps; after Stop 60 the opening
      // team returns its night-shift mugs.
      rotaBoard(parent, { x: b.cx, y: 1.75, z: room.z0 + 0.12, rotY: 0 });
      const tx = b.xOuter - s * 2.7, tz = b.cz - 0.6;
      const T = new THREE.Group(); T.position.set(tx, 0, tz); parent.add(T);
      bx(T, 1.1, 0.05, 2.2, 0, 0.74, 0, M.board);
      for(const [dx, dz] of [[-0.45, -1.0], [0.45, -1.0], [-0.45, 1.0], [0.45, 1.0]]) bx(T, 0.06, 0.72, 0.06, dx, 0.36, dz, M.post);
      const mug = (x, z, mat = M.mug) => { const m = cy(T, 0.04, 0.09, x, 0.81, z, mat); bx(T, 0.015, 0.05, 0.02, x + 0.05, 0.81, z, mat); return m; };
      mug(-0.3, -0.7); mug(0.25, -0.2); mug(-0.2, 0.6);
      cy(T, 0.09, 0.14, 0.3, 0.84, 0.75, M.steel, 0.07);                          // the pot
      const night = [];
      for(const [x, z] of [[0.35, -0.75], [-0.35, 0.05], [0.3, 0.3], [-0.05, 0.95]]){ const m = mug(x, z); m.visible = false; night.push(m); }
      hard(tx, tz, 1.2, 2.3, 0.8); keep.push({ x: tx, z: tz, r: 1.6 });
      registerStateHook((state) => { for(const m of night) m.visible = finale(state); });

      // Extra: the coffee machine on the counter by the door wall, steaming.
      const mx = b.xInner + s * 1.6, mz = room.z0 + 0.7;
      bx(parent, 0.7, 0.9, 0.6, mx, 0.45, mz, M.board);
      bx(parent, 0.36, 0.5, 0.36, mx, 1.15, mz, M.steel);
      bx(parent, 0.3, 0.08, 0.3, mx, 0.94, mz + 0.05, M.slate);
      const puffs = [];
      const puffMat = new THREE.SpriteMaterial({ color: 0xdedbd2, transparent: true, opacity: 0.3, depthWrite: false });
      for(let i = 0; i < 3; i++){ const sp = new THREE.Sprite(puffMat.clone()); sp.userData.ignoreAudit = true; sp.position.set(mx, 1.45, mz); sp.scale.set(0.12, 0.12, 1); parent.add(sp); puffs.push({ sp, age: i * 0.6 }); }
      animate((t, dt) => { for(const p of puffs){ p.age = (p.age + dt) % 1.8; const k = p.age / 1.8; p.sp.position.set(mx + Math.sin(t + k * 6) * 0.03, 1.42 + k * 0.5, mz); p.sp.scale.set(0.1 + k * 0.2, 0.1 + k * 0.2, 1); p.sp.material.opacity = 0.32 * (1 - k); } });
      hard(mx, mz, 0.8, 0.7, 1.0); keep.push({ x: mx, z: mz, r: 1.0 });
      break;
    }

    // -------------------------------------- 45 · the cash loading bay
    case 'STRONG': {
      // "Empty cages wait for sealed old-note bundles." Four wire cages along the
      // cross-wall and the goods hoist at the end of the row. After Stop 28 old
      // notes fill tagged cages; on the last day the cages roll out through the
      // hoist as new notes reach the trays.
      const wallZ = room.z0 + 0.9;
      const hx = b.xOuter - s * 1.3;
      // The hoist: a dark opening in the cross-wall with a grille.
      bx(parent, 1.9, 2.3, 0.2, hx, 1.2, room.z0 + 0.2, M.slate);
      for(let i = 0; i < 5; i++) bx(parent, 0.03, 2.2, 0.03, hx - 0.8 + i * 0.4, 1.2, room.z0 + 0.32, M.steel);
      bx(parent, 2.1, 0.12, 0.3, hx, 2.42, room.z0 + 0.25, M.post);
      hard(hx, room.z0 + 0.25, 2.0, 0.4, 2.4);
      const cages = [];
      for(let i = 0; i < 4; i++){
        const x = b.xInner + s * (1.1 + i * 1.35);
        const g = new THREE.Group(); g.position.set(x, 0, wallZ); parent.add(g);
        for(const [dx, dz] of [[-0.6, -0.5], [0.6, -0.5], [-0.6, 0.5], [0.6, 0.5]]) bx(g, 0.05, 1.8, 0.05, dx, 0.95, dz, M.steel);
        bx(g, 1.3, 0.05, 1.1, 0, 0.08, 0, M.steel); bx(g, 1.3, 0.05, 1.1, 0, 1.85, 0, M.steel);
        for(const [dx, dz, ry] of [[0, -0.5, 0], [0, 0.5, 0], [-0.6, 0, Math.PI / 2], [0.6, 0, Math.PI / 2]]) bx(g, 1.2, 1.7, 0.01, dx, 0.95, dz, M.wire, ry);
        for(const [dx, dz] of [[-0.5, -0.4], [0.5, -0.4], [-0.5, 0.4], [0.5, 0.4]]) cy(g, 0.07, 0.05, dx, 0.03, dz, M.hand).rotation.x = Math.PI / 2;
        const load = new THREE.Group(); load.position.y = 0.11; g.add(load); load.visible = false;
        for(let r = 0; r < 3; r++) for(let c = 0; c < 4; c++) bx(load, 0.26, 0.3, 0.42, -0.42 + c * 0.28, 0.15 + r * 0.32, (r % 2 ? 0.22 : -0.22), M.bundle);
        const tag = slip(g, { x: 0.35, y: 1.35, z: 0.53, rotY: 0, w: 0.16, h: 0.11, text: '', pin: false, tone: 'card', visible: false });
        soft(x, wallZ, 0.75); keep.push({ x, z: wallZ, r: 1.3 });
        cages.push({ g, load, tag, home: x, moving: false, gone: false, delay: i * 4 });
      }
      // The trolley of new notes at the hoist, for when the cages have gone.
      const fresh = new THREE.Group(); fresh.position.set(hx - s * 2.2, 0, wallZ + 0.4); parent.add(fresh); fresh.visible = false;
      bx(fresh, 0.9, 0.05, 0.6, 0, 0.75, 0, M.steel); for(const [dx, dz] of [[-0.4, -0.25], [0.4, -0.25], [-0.4, 0.25], [0.4, 0.25]]) cy(fresh, 0.03, 0.72, dx, 0.36, dz, M.post);
      for(let i = 0; i < 6; i++){ bx(fresh, 0.24, 0.1, 0.16, -0.3 + (i % 3) * 0.3, 0.83, -0.15 + Math.floor(i / 3) * 0.3, M.paper); bx(fresh, 0.25, 0.02, 0.17, -0.3 + (i % 3) * 0.3, 0.84, -0.15 + Math.floor(i / 3) * 0.3, M.crown); }
      let clock = 0, out = false;
      animate((t, dt) => {
        if(!out) return;
        clock += dt;
        for(const c of cages){
          if(c.gone || clock < c.delay) continue;
          const to = hx;
          const d = to - c.g.position.x;
          if(Math.abs(d) < 0.15){ c.gone = true; c.g.visible = false; continue; }
          c.g.position.x += Math.sign(d) * Math.min(Math.abs(d), dt * 0.9);
          c.g.position.y = Math.sin(t * 14) * 0.006;
        }
        fresh.visible = cages.every(c => c.gone);
      });
      registerStateHook((state) => {
        const k = n(state);
        for(const c of cages){ c.load.visible = k >= 7 && !c.gone; c.tag.set({ visible: k >= 7 && !c.gone }); }
        const done = finale(state);
        if(done && !out){ out = true; clock = 0; }
        if(!done && out){ out = false; for(const c of cages){ c.gone = false; c.g.visible = true; c.g.position.x = c.home; } fresh.visible = false; }
      });
      break;
    }

    // ------------------------------------------------ 46 · the ledger hall
    case 'BANKS': {
      // The reserve clock proper, on the solid cross-wall, and PASS under it
      // from mission 12 (the bible's own word for what the clock then shows).
      const wz = room.z1 - 0.12;
      reserveDial(parent, { x: b.cx, y: 2.15, z: wz, rotY: Math.PI });
      const pass = statusPanel(parent, { x: b.cx, y: 1.45, z: wz, rotY: Math.PI, w: 1.0, h: 0.4, title: 'Reserve clock', big: 'PASS', tone: 'ok', lit: true });
      pass.visible = false;
      registerStateHook((state) => { pass.visible = n(state) >= 12; });
      for(const [dz, ph] of [[-2.0, 0.4], [3.1, 2.2]]) pigeon(parent, b.xOuter + s * 0.35, 0.36, b.cz + dz, s > 0 ? -Math.PI / 2 : Math.PI / 2, ph);
      break;
    }

    // ------------------------------------------------ 47 · the press room
    case 'PRESS': {
      // A ticker over the cross-wall running the mission header, verbatim.
      const c = document.createElement('canvas'); c.width = 1024; c.height = 64;
      const g = c.getContext('2d');
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping;
      const paint = (text) => { g.fillStyle = '#15181c'; g.fillRect(0, 0, 1024, 64); g.fillStyle = '#f2c14e'; g.font = '800 40px Inter, Helvetica, Arial, sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillText(`${text}     ·     `, 12, 32); tex.needsUpdate = true; };
      paint('MISSION 1 - 15 DAYS UNTIL CHANGEOVER.');
      const tk = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.2), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.5, roughness: 0.6 }));
      tk.position.set(b.cx, 2.45, room.z0 + 0.12); tk.userData.ignoreAudit = true; parent.add(tk);
      bx(parent, 3.3, 0.28, 0.05, b.cx, 2.45, room.z0 + 0.1, M.slate);
      animate(scrollUV(tex, 0.05, 0));
      let last = '';
      registerStateHook((state) => { const h = HEADER(state); if(h !== last){ last = h; paint(h); } });
      break;
    }

    // ------------------------------------------------ 48 · the rate room
    case 'RATE': {
      // The rate itself, on the wall over the policy-wall holder, from the last
      // decision: "Post 3.25% POLICY RATE beside 4.15 CONVERSION" (§3).
      const fx = fixtures.find(f => f.id === 'policy-wall');
      const at = fx ? fixtureWorld(room, b, fx) : null;
      if(at){
        // High on the glass line is not allowed; the panel stands on its own
        // post beside the holder instead, a metre and a half up.
        const p = at.toWorld(at.lx + 1.6, at.d / 2 - 0.75);
        const rate = statusPanel(parent, { x: p.x, y: 2.35, z: p.z, rotY: at.yaw, w: 1.3, h: 0.5, title: 'Rate Book', big: '3.25% POLICY RATE', small: '4.15 CONVERSION', tone: 'ok', lit: true });
        rate.visible = false;
        registerStateHook((state) => { rate.visible = finale(state); });
      }
      // The Rate Book on a lectern by the signing desk, gaining a signed page a mission.
      const lx = b.xOuter - s * 1.8, lz = room.z0 + 1.3;
      const L = new THREE.Group(); L.position.set(lx, 0, lz); L.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2; parent.add(L);
      bx(L, 0.5, 1.05, 0.4, 0, 0.525, 0, M.board);
      const top = bx(L, 0.56, 0.04, 0.44, 0, 1.08, 0, M.board); top.rotation.x = -0.35;
      const book = new THREE.Group(); book.position.set(0, 1.12, 0); book.rotation.x = -0.35; L.add(book);
      bx(book, 0.42, 0.02, 0.3, 0, 0, 0, M.slate);
      const pages = [];
      for(let i = 0; i < 15; i++){
        const pg = bx(book, 0.38, 0.004, 0.27, 0, 0.012 + i * 0.005, 0, M.paper);
        const sig = bx(book, 0.1, 0.002, 0.012, 0.08, 0.015 + i * 0.005, 0.08, M.hand); sig.rotation.y = 0.3;
        pg.visible = false; sig.visible = false; pages.push([pg, sig]);
      }
      hard(lx, lz, 0.6, 0.5, 1.1); keep.push({ x: lx, z: lz, r: 1.0 });
      registerStateHook((state) => { const k = n(state); pages.forEach(([pg, sig], i) => { pg.visible = i < k; sig.visible = i < k; }); });
      for(const [dz, ph] of [[-4.0, 0.9], [-3.3, 2.6]]) pigeon(parent, b.xOuter + s * 0.35, 0.36, b.cz + dz, s > 0 ? -Math.PI / 2 : Math.PI / 2, ph);
      break;
    }

    // ------------------------------------------------ 48 · the street balcony
    case 'LOOKOUT': {
      // The header again, where the whole city is in view — and where the
      // shop boards turn on the last day.
      const days = statusPanel(parent, { x: b.cx, y: 2.45, z: room.z0 + 0.12, rotY: 0, w: 2.6, h: 0.5, title: 'Changeover', big: 'MISSION 1 - 15 DAYS UNTIL CHANGEOVER.', tone: 'plain', lit: true });
      registerStateHook((state) => days.set({ big: HEADER(state), tone: state?.status === 'won' ? 'ok' : day(state) >= 13 ? 'warn' : 'plain' }));
      break;
    }

    // ------------------------------------------------ 49 · the statistics floor
    case 'STATS': {
      // The AD–AS wall's three tags, the bible's words: PROFITEERING clears on
      // mission 6; SRAS SHOCK and ROUNDING remain active. They hang on the
      // ad-as-wall holder's post side, from mission 5 when the red pins land.
      const fx = fixtures.find(f => f.id === 'ad-as-wall');
      if(fx){
        const spot = holderSpot(room, b, fixtures, fx);
        const T = new THREE.Group(); T.position.set(spot.x, 0, spot.z); T.rotation.y = spot.yaw; parent.add(T);
        bx(T, 0.9, 0.03, 0.03, 0, 2.12, 0, M.post);
        const tags = ['PROFITEERING', 'SRAS SHOCK', 'ROUNDING'].map((t, i) => slip(T, { x: -0.3 + i * 0.3, y: 2.0, z: 0.02, rotY: 0, w: 0.26, h: 0.14, text: [t], pin: true, tone: 'card', visible: false }));
        registerStateHook((state) => { const k = n(state); tags.forEach((t, i) => t.set({ visible: k >= 5, struck: i === 0 && k >= 6 })); });
      }
      // The basket table splits fixed and current-weight views from mission 3.
      const bt = fixtures.find(f => f.id === 'basket-table');
      if(bt){
        const at = fixtureWorld(room, b, bt);
        // Its wall is the cross-wall at z1 (solid); two small panels above it.
        const wz = room.z1 - 0.12;
        const fixed = statusPanel(parent, { x: at.x - 0.75, y: 2.3, z: wz, rotY: Math.PI, w: 1.2, h: 0.42, title: 'Basket table', big: 'FIXED', tone: 'plain', lit: true });
        const cur = statusPanel(parent, { x: at.x + 0.75, y: 2.3, z: wz, rotY: Math.PI, w: 1.2, h: 0.42, title: 'Basket table', big: 'CURRENT-WEIGHT', tone: 'warn', lit: true });
        fixed.visible = cur.visible = false;
        registerStateHook((state) => { fixed.visible = cur.visible = n(state) >= 3; });
      }
      break;
    }

    default: break;
  }
  void floor;
  return { keepClear: keep };
}

// ================================================================= corridor
/**
 * Extras in a floor's corridor: the lift's floor indicator over the car door
 * on every floor, rain on the two glazed ends, and a cleaner's cart on 46.
 */
export function storySpine(ctx){
  const { scene: parent, plan, P, soft, floor } = ctx;
  const sp = plan.spine ?? { z0: -12, z1: 14 };
  const hw = P.corridorHalfWidth;
  const L = plan.lift ?? { side: 'w', z0: 0.4, z1: 4.8 };
  const lz = (L.z0 + L.z1) / 2;
  const side = L.side === 'w' ? -1 : 1;
  const count = plan.floors?.length ?? 4;

  // Lift indicator: one lamp per floor over the car opening; the lit one is
  // the floor the car — and the player — is on.
  const lamps = [];
  for(let i = 0; i < count; i++){
    const m = bx(parent, 0.04, 0.1, 0.1, side * (hw - 0.07), 2.7, lz + (i - (count - 1) / 2) * 0.16,
      new THREE.MeshStandardMaterial({ color: 0x3a3d40, emissive: 0xf2c14e, emissiveIntensity: 0 }));
    lamps.push(m);
  }
  bx(parent, 0.05, 0.16, count * 0.16 + 0.1, side * (hw - 0.04), 2.7, lz, M.slate);
  animate(() => { const a = floorProbe(); lamps.forEach((m, i) => { m.material.emissiveIntensity = i === a ? 1.6 : 0.03; }); });

  // Rain on the two glazed corridor ends.
  for(const zz of [sp.z0 + 0.1, sp.z1 - 0.1]) rainPane(parent, { x: 0, y: 1.55, z: zz, rotY: 0, w: hw * 2 - 0.3, h: 2.7 });

  // A cleaner's cart on the measurement floor, parked by the north window.
  if(floor?.id === 1){
    const x = 1.7, z = -6.2;
    const g = new THREE.Group(); g.position.set(x, 0, z); parent.add(g);
    bx(g, 0.5, 0.6, 0.8, 0, 0.45, 0, new THREE.MeshStandardMaterial({ color: 0xc9962a, roughness: 0.7 }));
    bx(g, 0.52, 0.04, 0.82, 0, 0.77, 0, M.steel);
    cy(g, 0.02, 1.4, 0.15, 0.9, -0.3, M.steel); bx(g, 0.18, 0.06, 0.1, 0.15, 1.62, -0.3, M.chalk);
    for(const [dx, dz] of [[-0.2, -0.3], [0.2, -0.3], [-0.2, 0.3], [0.2, 0.3]]) cy(g, 0.06, 0.04, dx, 0.06, dz, M.hand).rotation.x = Math.PI / 2;
    soft(x, z, 0.55);
  }
}

// ================================================================= the city
/**
 * The city out of the glass, as the visible state of the campaign: the queue on
 * Vend Street restaged by mission, the shop price boards repricing, the old
 * bank's lights, the old-note cages leaving the podium on the last day, and the
 * street signs turning. `ctx` is `decorate`'s; `ctx.setQueue` is the queue in
 * props.js, handed over so one draw routine owns the crowd.
 */
export function storyOutdoors(scene, ctx){
  const PLAZA_Y = ctx.plazaY ?? -180;
  const put = (w, h, d, x, y, z, mat, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.rotation.y = ry;
    m.castShadow = m.receiveShadow = false;
    m.userData.ignoreAudit = true; markStructure([m], 'scenery');
    scene.add(m); return m;
  };

  // ---- the queue: one rope lane at M1, two at M4, an assisted-service lane
  //      at M11, and an orderly moving queue at M15 (§3, crowd staging).
  registerStateHook((state) => {
    const k = n(state);
    const shape = finale(state) ? { count: 64, lanes: 1, period: 1.1 }
      : k >= 11 ? { count: 118, lanes: 3, period: 2.4 }
      : k >= 4 ? { count: 136, lanes: 2, period: 2.9 }
      : { count: 150, lanes: 1, period: 3.4 };
    ctx.setQueue?.(shape);
  });

  // ---- shop price boards along both sides of Vend Street.
  {
    const boards = [];
    const texes = [shopBoardTexture(0), shopBoardTexture(1), shopBoardTexture(2)];
    for(let i = 0; i < 9; i++){
      const x = -56 - i * 13;
      const north = i % 2 === 0;
      const z = north ? -11.5 : 23.5;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(7, 3.5), new THREE.MeshBasicMaterial({ map: texes[0], side: THREE.DoubleSide }));
      m.position.set(x, PLAZA_Y + 5.2, z); m.rotation.y = north ? 0 : Math.PI;
      m.userData.ignoreAudit = true; markStructure([m], 'scenery');
      scene.add(m);
      boards.push({ m, stage: 0, flip: 0, delay: i * 0.35 });
    }
    let want = 0, flipping = false, clock = 0;
    animate((t, dt) => {
      if(!flipping) return;
      clock += dt;
      let done = true;
      for(const bd of boards){
        const k = Math.max(0, Math.min(1, (clock - bd.delay) / 1.6));
        if(k < 1) done = false;
        bd.m.scale.y = Math.abs(Math.cos(k * Math.PI)) + 0.02;
        if(k >= 0.5 && bd.stage !== want){ bd.stage = want; bd.m.material.map = texes[want]; bd.m.material.needsUpdate = true; }
      }
      if(done) flipping = false;
    });
    registerStateHook((state) => {
      const k = n(state);
      const stage = finale(state) ? 2 : k >= 3 ? 1 : 0;
      if(stage === want) return;
      want = stage;
      if(stage === 2){ flipping = true; clock = 0; }
      else for(const bd of boards){ bd.stage = stage; bd.m.material.map = texes[stage]; bd.m.material.needsUpdate = true; bd.m.scale.y = 1; }
    });
  }

  // ---- the old bank on Ferrand Row: its lights, on late once the rate is held.
  {
    const band = new THREE.MeshBasicMaterial({ color: 0x2a2a28 });
    put(58, 2.6, 0.6, 52, PLAZA_Y + 9, 214 - 20.4, band);
    put(58, 2.6, 0.6, 52, PLAZA_Y + 16, 214 - 20.4, band);
    registerStateHook((state) => { const k = n(state); band.color.setHex(k >= 12 ? 0xf2dca0 : k >= 8 ? 0xb8a878 : 0x2a2a28); });
  }

  // ---- the sealed cages leaving the podium on the last day, west along Vend
  //      Street to the loading bay (§8.1, 0–15 s).
  {
    const cageMat = new THREE.MeshLambertMaterial({ color: 0x8e948e });
    const cages = [];
    for(let i = 0; i < 5; i++){
      const g = new THREE.Group();
      const c = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 2.2), cageMat); c.position.y = 1.2; g.add(c);
      g.traverse(o => { o.userData.ignoreAudit = true; }); markStructure(g.children, 'scenery');
      g.position.set(-38 - i * 5, PLAZA_Y + 0.3, 17.5); g.visible = false;
      scene.add(g); cages.push(g);
    }
    const run = cages.map((g, i) => patrol(g, [{ x: -38 - i * 5, y: PLAZA_Y + 0.3, z: 17.5 }, { x: -168 - i * 5, y: PLAZA_Y + 0.3, z: 17.5 }, { x: -168 - i * 5, y: PLAZA_Y + 0.3, z: 27 }, { x: -38 - i * 5, y: PLAZA_Y + 0.3, z: 27 }], 3.2));
    let out = false;
    animate((t, dt) => { if(out) run.forEach(fn => fn(t, dt)); });
    registerStateHook((state) => { out = finale(state); cages.forEach(g => { g.visible = out; }); });
  }

  // ---- extras: traffic lights cycling far below, and a window cleaner's cradle.
  {
    const lit = (hex) => new THREE.MeshBasicMaterial({ color: hex });
    const RED = lit(0xd8402a), GREEN = lit(0x3ac060);
    const sets = [];
    for(const [x, z] of [[-42, -9], [-42, 21], [2, 44], [-170, -150], [-172, -46], [300, -150], [-300, -150]]){
      const a = put(2.6, 2.6, 2.6, x, PLAZA_Y + 7, z, RED), b = put(2.6, 2.6, 2.6, x + 4, PLAZA_Y + 7, z + 4, GREEN);
      put(0.6, 6, 0.6, x, PLAZA_Y + 3, z, M.post); put(0.6, 6, 0.6, x + 4, PLAZA_Y + 3, z + 4, M.post);
      sets.push({ a, b, phase: (x * 7 + z * 3) % 9 });
    }
    animate((t) => { for(const s of sets){ const k = ((t + s.phase) % 12) < 6; s.a.material = k ? RED : GREEN; s.b.material = k ? GREEN : RED; } });

    const plate = ctx.plate ?? { x: 10.6, z0: -12, z1: 14 };
    const topY = (ctx.floors?.[ctx.floors.length - 1]?.y ?? 13.2) + 3.5;
    const cradle = new THREE.Group();
    const c = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 0.9), new THREE.MeshLambertMaterial({ color: 0x4a5058 })); c.position.y = 0.5; cradle.add(c);
    const man = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.6, 0.4), new THREE.MeshLambertMaterial({ color: 0xc9962a })); man.position.set(0.6, 1.5, 0); cradle.add(man);
    for(const dx of [-1.3, 1.3]){ const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 60, 6), M.steel); cable.position.set(dx, 30.5, -0.3); cradle.add(cable); }
    cradle.traverse(o => { o.userData.ignoreAudit = true; }); markStructure(cradle.children, 'scenery');
    cradle.position.set(plate.x + 1.2, 2.0, 6.5);
    scene.add(cradle);
    animate((t) => { cradle.position.y = topY - 8 - (Math.sin(t * 0.06) * 0.5 + 0.5) * 24; });
    animate(sway(cradle, 'z', 0.02, 0.7));
    void bob; void blink;
  }
}
