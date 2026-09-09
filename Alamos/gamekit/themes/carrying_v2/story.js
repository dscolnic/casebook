// story.js — Vellan Island, changing as the fifteen days do.
//
// The bible (fpl_gpt/CARRYING.md) writes the world changing mission by mission:
// fifteen Physical-aftermath blocks, each with a home fixture, a Before, an
// exact After action and a trigger; a §7.1 persistent world-state ledger; three
// landmark-only spaces (the Quay Walk, the School Porch, the Net Shed) with a
// Before and a Visible change; and a §8.1 final scene in which the second ferry
// rounds the headland and ties up at the completed berth — or, on the hold
// branch, the berth stays fenced under HOLD SECOND SERVICE.
//
// `storyOutdoors` runs from `decorate`; `dressRoom` runs when a room is built;
// `storyExtras` is the alive layer nobody asked for. Every word printed on a
// panel or a slip is the bible's own — an After action, a caps label, a ledger
// state, a mission header, the ending card. Geometry, placement and motion are
// this file's.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, patrol, spin } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

// Albedos darker than they look — house rule 6. `mat` caches by key.
const TIMBER = () => mat('vellan.story.timber', () => new THREE.MeshStandardMaterial({ color: 0x5a4d3a, roughness: 0.94 }));
const PLANK = () => mat('vellan.story.plank', () => new THREE.MeshStandardMaterial({ color: 0x6b5e48, roughness: 0.92 }));
const ROPE = () => mat('vellan.story.rope', () => new THREE.MeshStandardMaterial({ color: 0x8a7c5e, roughness: 0.98 }));
const STEEL = () => MATERIALS.paintedSteel(0x6e767c);
const PAINT = (hex) => MATERIALS.paintedSteel(hex);
const NET = () => mat('vellan.story.net', () => new THREE.MeshStandardMaterial({ color: 0x2f3a36, roughness: 0.95, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
const CLOTH = (c) => mat(`vellan.story.cloth.${c}`, () => new THREE.MeshStandardMaterial({ color: c, roughness: 0.92, side: THREE.DoubleSide }));
const WRACK = () => mat('vellan.story.wrack', () => new THREE.MeshStandardMaterial({ color: 0x4a4030, roughness: 0.98 }));
const WATERY = () => mat('vellan.story.puddle', () => new THREE.MeshStandardMaterial({ color: 0x2a3238, roughness: 0.12, metalness: 0.35 }));
const CHALK = () => mat('vellan.story.chalk', () => new THREE.MeshBasicMaterial({ color: 0xd8d4c8 }));
const SMOKE = () => mat('vellan.story.smoke', () => new THREE.MeshBasicMaterial({ color: 0xb8bcb8, transparent: true, opacity: 0.16, depthWrite: false }));

/** The bible's mission header, verbatim: `MISSION 1 - 15 DAYS UNTIL THE VOTE.` … `MISSION 15 - 1 DAY UNTIL THE VOTE.` */
export const HEADER = (d) => {
  const m = Math.min(15, Math.max(1, d));
  const left = 16 - m;
  return `MISSION ${m} - ${left} ${left === 1 ? 'DAY' : 'DAYS'} UNTIL THE VOTE.`;
};

/**
 * The fifteen Physical aftermaths, one per mission — the bible's §7.1 ledger.
 * `before` is the second sentence of the bible's Before (the first is the same
 * "no accepted record" line on every block); `after` is the exact After action;
 * `label` is the caps text the action names, as the card itself. Every string
 * here is the bible's.
 */
export const AFTERMATHS = [
  { n: 1, room: 'HARB', fixture: 'landings-book',
    before: 'A damp catch slip sticks out of the closed sales book.',
    after: 'Tomas Reed clips the rejected-catch slip inside the landings book.', pin: 'clip' },
  { n: 2, room: 'WATER', fixture: 'rain-bench',
    before: 'The roof gauge ticks while a hand-kept rain book lies open beneath it.',
    after: 'Nkemdi Okafor pins the withdrawal card marked 136,800 CUBIC METRES PER YEAR above the rain book.',
    label: ['136,800 CUBIC METRES', 'PER YEAR'] },
  { n: 3, room: 'COMMON', fixture: 'nitrogen-bench',
    before: 'A torn feed sack spills beside a tray of bare roots.',
    after: 'Iona Vale ties a SURPLUS NITROGEN tag to the fertilizer sack.', label: ['SURPLUS NITROGEN'], pin: 'clip' },
  { n: 4, room: 'WATER', fixture: 'store-gauges',
    before: "The well needle sits below yesterday's chalk mark.",
    after: 'Nkemdi Okafor marks the gauge with STOP PUMPING AT 1.0 M OR BELOW.', label: ['STOP PUMPING AT', '1.0 M OR BELOW'] },
  { n: 5, room: 'HARB', fixture: 'landings-book',
    before: 'Wet gloves weigh down a page full of longer boat shifts.',
    after: 'Tomas Reed draws a red catch-limit line across the landings page.', redLine: true },
  { n: 6, room: 'HARB', fixture: 'fee-desk',
    before: 'A fresh permit stamp rests on top of an unpaid patrol rota.',
    after: 'Tomas Reed stamps the permit stack CAP AND CHECK REQUIRED.', label: ['CAP AND CHECK', 'REQUIRED'] },
  { n: 7, room: 'TIP', fixture: 'leachate-bench',
    before: 'A brown jar leaves a ring beside a clean pipe sample.',
    after: 'Mei Chen sets the leak jar in a tray marked LINER REPAIR REQUIRED.', label: ['LINER REPAIR', 'REQUIRED'] },
  { n: 8, room: 'SCHOOL', fixture: 'school-tap',
    before: 'Empty cups stand behind a DO NOT DRINK card.', beforeLabel: ['DO NOT DRINK'],
    after: 'Lena Costa removes the DO NOT DRINK card from the isolated school tap.' },
  { n: 9, room: 'COMMON', fixture: 'common-map',
    before: 'A runoff jar sits on the field map beside the school route.',
    after: 'Iona Vale pins the source-control plan across the runoff route.' },
  { n: 10, room: 'REEF', fixture: 'transect-bench',
    before: 'Nursery tiles lie beside two jars from the same warm week.',
    after: 'Rafi Noor pins the poor-year card marked CATCH CAP: 70 FISH above the nursery tiles.', label: ['CATCH CAP: 70 FISH'] },
  { n: 11, room: 'POWER', fixture: 'turbine-plate',
    before: "The turbine's big rating plate shines above a much smaller meter reading.",
    after: 'Elias Shaw rivets a 31% ANNUAL CAPACITY FACTOR plate below the rated output.', label: ['31% ANNUAL', 'CAPACITY FACTOR'], plate: true },
  { n: 12, room: 'WATER', fixture: 'load-board',
    before: 'The gearbox crate holds a delivery slip with its date crossed out.',
    after: 'Elias Shaw pins the 180 KW ESSENTIAL-LOAD PLAN to the load board.', label: ['180 KW', 'ESSENTIAL-LOAD PLAN'] },
  { n: 13, room: 'BERTH', fixture: 'quarantine-rack',
    before: 'A seed clings to the mud under a cargo crate.',
    after: 'Tomas Reed hangs a CHECK BEFORE SAILING tag on the cargo release hook.', label: ['CHECK BEFORE', 'SAILING'] },
  { n: 14, room: 'SCHOOL', fixture: 'register-desk',
    before: 'The same crew name appears on two tally sheets.',
    after: 'Lena Costa clips the corrected visitor tally beneath the drought-reserve card.', pin: 'clip' },
  { n: 15, room: 'CHAPEL', fixture: 'condition-board',
    before: 'The council seal waits beside the still-blank sailing permit.',
    after: 'Ada Pell pins the signed conditional ferry plan to the condition board.' },
];

/** §3 / §8.1 branch copy, verbatim. */
const HOLD = 'HOLD SECOND SERVICE';
const HOLD_CARD = 'The second berth stays fenced.';
const ENDING_LINE = 'The second ferry ties up beside the posted limits.';
const NO_BOARDING = 'no boarding access';
/** The posted limits: the four caps labels the ledger hangs on the island's fixtures. */
const POSTED_LIMITS = ['CATCH CAP: 70 FISH', 'STOP PUMPING AT 1.0 M OR BELOW', '180 KW ESSENTIAL-LOAD PLAN', 'CHECK BEFORE SAILING'];
/** Stop 20's correct result — the Net Shed's dated effort-limit card. */
const EFFORT_LIMIT = 'catch ceiling 100 fish/year, below 120 replacement';

/** The campaign is over and not won: the bible's hold branch. */
const isHold = (state) => state?.status === 'lost';
const isWon = (state, theme) => state?.status === 'won' || missionsAccepted(state, theme) >= 15;

function hardBox(colliders, x0, z0, x1, z1, y0 = -2, y1 = 2.5){
  const b = new THREE.Box3(new THREE.Vector3(Math.min(x0, x1), y0, Math.min(z0, z1)), new THREE.Vector3(Math.max(x0, x1), y1, Math.max(z0, z1)));
  colliders?.push(b);
  return b;
}

/** Anything deliberately standing in the water is not a placement mistake. */
function seaborne(obj){
  obj.traverse?.((o) => { o.userData.ignoreAudit = true; });
  return obj;
}

/** A gull: a body, a head, a beak, two wings that can beat. */
function gull(parent, colour = 0xd9d8d0){
  const g = new THREE.Group();
  const m = mat(`vellan.gull.${colour}`, () => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.9 }));
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), m); body.scale.set(1.6, 0.9, 1); g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), m); head.position.set(0.24, 0.08, 0); g.add(head);
  box(g, 0.1, 0.02, 0.02, 0.34, 0.06, 0, PAINT(0xc9962a));
  const wings = [];
  for(const s of [-1, 1]){
    const w = box(g, 0.32, 0.02, 0.5, 0, 0.06, s * 0.28, m);
    // The unit geometry is shared by every kit box: clone before translating.
    w.geometry = w.geometry.clone().translate(0, 0, s * 0.2);
    wings.push(w);
  }
  parent.add(g);
  return { g, wings };
}

/** A small ro-ro ferry, bow at local +z so `patrol` carries it bow first. Local y = 0 is the waterline. */
function ferryHull(){
  const g = new THREE.Group();
  const HULL = PAINT(0x274a3a), BOOT = PAINT(0x5c2a22), WHITE = PAINT(0x9e988c), DECK = PAINT(0x53504a), DARK = PAINT(0x33302b);
  box(g, 8.4, 1.7, 23.0, 0, -0.85, 0, BOOT);
  box(g, 8.8, 2.1, 24.0, 0, 1.05, 0, HULL);
  box(g, 5.6, 2.1, 3.0, 0, 1.05, 13.5, HULL);                 // the bow, narrowed
  box(g, 8.3, 0.22, 22.4, 0, 2.16, -0.4, DECK);
  for(const s of [-1, 1]){
    box(g, 0.34, 1.05, 22.4, s * 4.2, 2.6, -0.4, HULL);
    box(g, 0.16, 0.09, 22.0, s * 4.2, 3.66, -0.4, DARK);
  }
  box(g, 5.2, 2.7, 4.6, 0, 3.6, -8.6, WHITE);                 // wheelhouse aft
  box(g, 5.3, 0.95, 4.7, 0, 4.35, -8.6, MATERIALS.glass());
  box(g, 5.6, 0.22, 5.0, 0, 5.05, -8.6, WHITE);
  cyl(g, 0.8, 2.8, 1.9, 6.5, -11.4, PAINT(0x7d4a30));
  cyl(g, 0.86, 0.5, 1.9, 7.85, -11.4, DARK);
  cyl(g, 0.1, 3.4, 0, 6.8, -8.6, DARK);
  box(g, 2.0, 2.1, 5.0, -2.1, 3.3, 3.0, PAINT(0x3d5a48));    // a van aboard
  box(g, 1.9, 1.0, 4.2, 1.9, 2.8, -2.6, PAINT(0x6a3830));    // a car
  // Bow ramp, hinged at the stem: up while under way, lowered at the berth.
  const hinge = new THREE.Group(); hinge.position.set(0, 2.2, 15.0); g.add(hinge);
  const plate = box(hinge, 5.4, 0.2, 6.0, 0, 3.0, 0, DECK);
  void plate;
  hinge.rotation.x = 0;                                        // vertical: up
  const lights = [];
  for(const [lx, ly, lz, c] of [[0, 10.4, -8.6, 0xffffff], [-4.2, 4.2, 6, 0xff4040], [4.2, 4.2, 6, 0x40ff60]]){
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 2 }));
    l.position.set(lx, ly, lz); g.add(l); lights.push(l);
  }
  return { g, ramp: hinge, lights };
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const SEA = theme?.site?.water?.level ?? -6.2;
  const BED = -9.0;
  let wet = true;   // for the puddles in storyExtras

  // ---------------------------------------------------------- the header
  // The bible's mission header, on its own post beside the Island Board at
  // (16, 66) — one face toward the apron and the spawn, one toward the road, so
  // the day is readable whichever way the board itself happens to face.
  // Weather per day rides the same hook: heavier on the rain day, clear for the
  // ferry on the fifteenth and once the campaign is won.
  {
    const x = 19.8, z = 66, y = at(x, z);
    for(const s of [-1, 1]) cyl(scene, 0.06, 2.9, x + s * 1.45, y + 1.45, z, STEEL());
    box(scene, 3.1, 0.06, 0.06, x, y + 2.92, z, STEEL());
    const faces = [0, Math.PI].map((rotY, i) => statusPanel(scene, {
      x, y: y + 2.55, z: z + (i ? -0.05 : 0.05), rotY, w: 3.0, h: 0.62,
      title: 'Island Board', big: HEADER(1), tone: 'plain', lit: true,
    }));
    softColliders?.push({ x, z, r: 1.7 });
    stateHooks?.push((state) => {
      const d = day(state);
      const won = isWon(state, theme);
      faces.forEach(f => f.set({ big: HEADER(d), tone: won ? 'ok' : d >= 14 ? 'warn' : 'plain' }));
      const clear = won || d >= 15;
      wet = !clear;
      weather?.set?.(clear ? null : { kind: 'drizzle', density: d === 2 ? 0.7 : 0.3, wind: { x: 1.6, z: -1.0 } });
    });
  }

  // ---------------------------------------------------------- the Quay Walk
  // `quay-walk`: "Ropes lie beside an unfinished second berth." After Stop 48
  // (mission 12) a fenced berth frame appears; after the final approval it is
  // complete, while a hold leaves the frame fenced. A boardwalk along the shore
  // between the slip (x = −30) and the quay (x = 18), piles in the water off it,
  // and the limit board the ending card puts the second ferry beside.
  const BERTH = { x: -6, z0: 136, z1: 152, w: 8 };
  let arrive = null;      // set by the final scene, read by the quay bell
  {
    for(let x = -22; x <= 12; x += 1.2){
      const y = at(x, 124);
      box(scene, 1.15, 0.05, 2.4, x, y + 0.04, 124, PLANK());
    }
    for(let x = -22; x <= 12; x += 3.4){
      const y = at(x, 125.4);
      cyl(scene, 0.06, 1.0, x, y + 0.5, 125.4, TIMBER());
    }
    box(scene, 34.4, 0.06, 0.06, -5, at(-5, 125.4) + 1.0, 125.4, TIMBER());
    sign(scene, 'Quay Walk', { x: -18, y: at(-18, 122) + 2.3, z: 122, w: 2.4, h: 0.6, facing: Math.PI });
    // Rope coils beside the unfinished berth.
    for(const [rx, rz, r] of [[-13.5, 123.3, 0.36], [-12.2, 123.1, 0.3], [1.8, 123.5, 0.34]]){
      const coil = new THREE.Mesh(new THREE.TorusGeometry(r, 0.11, 8, 20), ROPE());
      coil.rotation.x = Math.PI / 2; coil.position.set(rx, at(rx, rz) + 0.12, rz); scene.add(coil);
    }
    // The unfinished berth: six piles in the water, always there.
    const piles = [];
    for(const z of [BERTH.z0, (BERTH.z0 + BERTH.z1) / 2, BERTH.z1]) for(const s of [-1, 1]){
      const px = BERTH.x + s * BERTH.w / 2;
      piles.push(seaborne(cyl(scene, 0.3, SEA + 2.4 - BED, px, (SEA + 2.4 + BED) / 2, z, TIMBER())));
    }
    // The frame: beams across the piles and a fence at the shore end, from mission 12.
    const frame = new THREE.Group(); scene.add(frame); seaborne(frame);
    for(const s of [-1, 1]) box(frame, 0.3, 0.3, BERTH.z1 - BERTH.z0 + 0.6, BERTH.x + s * BERTH.w / 2, SEA + 2.55, (BERTH.z0 + BERTH.z1) / 2, TIMBER());
    for(const z of [BERTH.z0, (BERTH.z0 + BERTH.z1) / 2, BERTH.z1]) box(frame, BERTH.w + 0.6, 0.3, 0.3, BERTH.x, SEA + 2.55, z, TIMBER());
    frame.visible = false;
    const fence = new THREE.Group(); scene.add(fence);
    {
      const fz = 126.6, fy = at(BERTH.x, fz);
      for(let x = -13; x <= 1; x += 3.5) box(fence, 0.1, 2.0, 0.1, x, fy + 1.0, fz, STEEL());
      box(fence, 14.2, 0.06, 0.06, -6, fy + 1.9, fz, STEEL());
      box(fence, 14.2, 0.06, 0.06, -6, fy + 0.5, fz, STEEL());
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(14.0, 1.4), NET());
      mesh.position.set(-6, fy + 1.2, fz); fence.add(mesh);
    }
    fence.visible = false;
    const fenceBox = hardBox(colliders, -13.4, 126.2, 1.4, 127.0);
    void fenceBox;
    // The completed berth: a deck on the frame, when the plan is approved.
    const deck = new THREE.Group(); scene.add(deck); seaborne(deck);
    for(let z = BERTH.z0; z <= BERTH.z1; z += 1.1) box(deck, BERTH.w + 0.4, 0.08, 1.0, BERTH.x, SEA + 2.75, z, PLANK());
    for(const s of [-1, 1]) for(const z of [BERTH.z0 + 2, BERTH.z1 - 2]) cyl(deck, 0.2, 0.7, BERTH.x + s * (BERTH.w / 2 - 0.6), SEA + 3.1, z, PAINT(0x35322c), 0.26);
    deck.visible = false;
    // The limit board, on the walk at the berth's head, facing the land.
    const lx = BERTH.x, lz = 123.0, ly = at(lx, lz);
    for(const s of [-1, 1]) cyl(scene, 0.05, 2.4, lx + s * 0.8, ly + 1.2, lz, STEEL());
    const limit = statusPanel(scene, { x: lx, y: ly + 1.95, z: lz - 0.05, rotY: Math.PI, w: 1.7, h: 0.7, title: 'Ferry Berth', big: NO_BOARDING, tone: 'warn', lit: true });
    limit.visible = false;
    const limits = POSTED_LIMITS.map((text, i) => slip(scene, { x: lx - 0.6 + (i % 2) * 1.2, y: ly + 1.25 - Math.floor(i / 2) * 0.32, z: lz - 0.06, rotY: Math.PI, w: 0.56, h: 0.26, text: [text], pin: true, visible: false }));
    softColliders?.push({ x: lx, z: lz, r: 1.1 });
    // The quay bell on the rail, which sounds once as the ferry comes in — the
    // world has no audio hook for a prop, so it swings instead.
    const bell = new THREE.Group();
    cyl(bell, 0.16, 0.24, 0, -0.14, 0, PAINT(0x8a6a2a), 0.09);
    cyl(bell, 0.02, 0.1, 0, -0.3, 0, PAINT(0x3a3630));
    bell.position.set(-5.2, at(-5.2, 125.4) + 1.55, 125.4); scene.add(bell);
    cyl(scene, 0.05, 0.7, -5.2, at(-5.2, 125.4) + 1.35, 125.4, STEEL());
    let ring = 0;
    animate?.((t, dt) => {
      if(arrive && arrive.rung === false && arrive.t != null){ ring = 2.6; arrive.rung = true; }
      if(ring > 0){ ring -= dt; bell.rotation.z = Math.sin(t * 14) * 0.5 * Math.min(1, ring); }
      else bell.rotation.z = Math.sin(t * 0.8) * 0.02;
    });
    stateHooks?.push((state) => {
      const k = n(state), won = isWon(state, theme), hold = isHold(state);
      frame.visible = k >= 12;
      fence.visible = k >= 12 && !won;
      deck.visible = won;
      limit.visible = k >= 12;
      limit.set(won ? { big: ENDING_LINE, tone: 'ok', small: '' }
        : hold ? { big: HOLD, tone: 'alert', small: HOLD_CARD }
          : { big: NO_BOARDING, tone: 'warn', small: '' });
      limits.forEach(s => s.set({ visible: won }));
    });
  }

  // ---------------------------------------------------------- the final scene
  // §8.1: "The second ferry rounds the headland and ties up at the completed
  // berth." Absent all campaign; on the win it comes round the south-east head,
  // makes the berth bow-in over about forty seconds, and the ramp lowers after
  // its inspection. On the hold branch it never appears and the single ferry in
  // props.js keeps its Tuesdays and Fridays.
  {
    const { g: ship, ramp } = ferryHull();
    ship.position.set(210, SEA, 300); ship.visible = false; scene.add(ship); seaborne(ship);
    const berthZ = BERTH.z1 + 15.6;      // bow just off the deck's seaward end
    const track = [[210, 300], [150, 244], [70, 206], [10, 196], [BERTH.x, 188], [BERTH.x, berthZ]].map(([x, z]) => ({ x, y: SEA, z }));
    let mover = null, since = 0;
    animate?.((t, dt) => {
      if(!ship.visible) return;
      if(mover){
        mover(t, dt);
        if(Math.hypot(ship.position.x - BERTH.x, ship.position.z - berthZ) < 1.5){
          mover = null; since = 0;
          ship.position.set(BERTH.x, SEA, berthZ); ship.rotation.y = Math.PI;   // bow to the shore
          if(arrive){ arrive.t = t; arrive.rung = false; }
        }
      } else {
        since += dt;
        ship.position.y = SEA + Math.sin(t * 0.55) * 0.05;
        // The ramp lowers after its inspection, a few seconds alongside.
        const k = Math.max(0, Math.min(1, (since - 6) / 4));
        ramp.rotation.x = k * Math.PI / 2 * 0.92;      // forward, over the bow
      }
    });
    stateHooks?.push((state) => {
      const won = isWon(state, theme);
      if(won && !ship.visible){
        ship.visible = true; arrive = { t: null, rung: true };
        ship.position.set(210, SEA, 300); ramp.rotation.x = 0;
        // `patrol` closes its loop; the frame hook above stops it at the berth.
        mover = patrol(ship, [...track, ...track.slice().reverse()], 7.0);
      }
      if(!won && ship.visible){ ship.visible = false; mover = null; arrive = null; }
    });
  }

  // ---------------------------------------------------------- the School Porch
  // `school-porch`: "Small boots dry below a closed water hatch." After Stop 32
  // (mission 8) tested drinking water returns and the cups leave their box. The
  // school faces north (facing π), so its door is at z ≈ 18.2; the porch is the
  // strip outside it, kept clear of the doorway itself.
  {
    const wallZ = 18.5, x0 = 48;
    // Small boots in a row west of the door.
    for(let i = 0; i < 6; i++){
      const bx = 43.6 + i * 0.42, bz = wallZ - 0.6;
      const c = [0x7a2f2a, 0x2f4a6a, 0x3f6b34, 0x8a6a2a, 0x5a3a5a, 0x2f2f2f][i];
      box(scene, 0.14, 0.16, 0.22, bx, at(bx, bz) + 0.08, bz, PAINT(c));
      box(scene, 0.13, 0.12, 0.13, bx, at(bx, bz) + 0.21, bz - 0.04, PAINT(c));
    }
    // The water hatch east of the door: a framed panel that swings open on mission 8.
    const hx = 52.2, hz = wallZ - 0.12, hy = at(hx, hz) + 1.35;
    box(scene, 0.8, 0.8, 0.06, hx, hy, hz, STEEL());
    const hatch = new THREE.Group(); hatch.position.set(hx - 0.35, hy, hz - 0.06); scene.add(hatch);
    const leaf = box(hatch, 0.66, 0.66, 0.05, 0.35, 0, 0, PAINT(0x3d5a6a));
    void leaf;
    // A shelf under it; the cups' box on the ground; the cups on the shelf later.
    box(scene, 0.9, 0.05, 0.3, hx, hy - 0.55, hz - 0.2, PLANK());
    const crate = box(scene, 0.5, 0.36, 0.4, hx + 0.9, at(hx + 0.9, hz - 0.4) + 0.18, hz - 0.4, TIMBER());
    const cupsIn = [0, 1, 2].map(i => cyl(scene, 0.05, 0.1, hx + 0.75 + i * 0.15, at(hx + 0.9, hz - 0.4) + 0.4, hz - 0.4, PAINT(0xd8d3c4)));
    const cupsOut = [0, 1, 2, 3, 4].map(i => { const c = cyl(scene, 0.05, 0.1, hx - 0.3 + i * 0.15, hy - 0.47, hz - 0.2, PAINT(0xd8d3c4)); c.visible = false; return c; });
    softColliders?.push({ x: hx + 0.9, z: hz - 0.4, r: 0.5 });
    sign(scene, 'School Porch', { x: 55.2, y: at(55.2, wallZ) + 2.4, z: wallZ - 0.3, w: 2.2, h: 0.55, facing: Math.PI });
    stateHooks?.push((state) => {
      const open = n(state) >= 8;
      hatch.rotation.y = open ? -1.9 : 0;
      crate.visible = !open; cupsIn.forEach(c => { c.visible = !open; });
      cupsOut.forEach(c => { c.visible = open; });
    });
  }

  // ---------------------------------------------------------- the Net Shed
  // `net-shed`: "Longer trip hours are chalked beside the same catch weights."
  // After Stop 20 (mission 5) a dated effort-limit card stays beside the mended
  // nets. An open-fronted shed above the shore east of the quay walk, its back
  // to the sea wind and its front open to the road the player comes down, with
  // a chalk board on the back wall: two columns of strokes, one growing and one
  // not — the bible's sentence as tally marks.
  {
    const cx = 36, z0 = 108, z1 = 112, w = 6;
    const y = at(cx, 110);
    for(const [px, pz] of [[cx - w / 2, z0], [cx + w / 2, z0], [cx - w / 2, z1], [cx + w / 2, z1]]){
      cyl(scene, 0.09, 2.8, px, at(px, pz) + 1.4, pz, TIMBER());
      softColliders?.push({ x: px, z: pz, r: 0.3 });
    }
    box(scene, w + 0.4, 0.08, z1 - z0 + 0.8, cx, y + 2.85, (z0 + z1) / 2, PLANK()).rotation.x = 0.08;
    box(scene, w, 2.7, 0.16, cx, y + 1.35, z1, PLANK());          // the back wall, seaward
    hardBox(colliders, cx - w / 2, z1 - 0.15, cx + w / 2, z1 + 0.15);
    box(scene, 2.6, 1.3, 0.04, cx + 0.6, y + 1.7, z1 - 0.11, PAINT(0x1e2422));   // the chalk board
    // Chalk strokes: the left column lengthens (trip hours), the right stays the same (catch weights).
    for(let row = 0; row < 5; row++){
      const ry = y + 2.2 - row * 0.22;
      for(let i = 0; i < 3 + row; i++) box(scene, 0.02, 0.12, 0.01, cx + 1.1 - i * 0.09, ry, z1 - 0.135, CHALK());
      for(let i = 0; i < 4; i++) box(scene, 0.02, 0.12, 0.01, cx - 0.3 - i * 0.09, ry, z1 - 0.135, CHALK());
    }
    // Mended nets hung from the roof on the west side, and a heap on the floor.
    for(let i = 0; i < 3; i++){
      const net = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.0), NET());
      net.position.set(cx - 2.3 + i * 0.35, y + 1.6, z1 - 0.6 - i * 0.5); net.rotation.y = 0.3 * i; scene.add(net);
      animate?.(sway(net, 'z', 0.03, 0.9 + i * 0.2, i));
    }
    const heap = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), NET()); heap.scale.set(1.4, 0.45, 1.1); heap.position.set(cx - 1.8, y + 0.25, z0 + 1.0); scene.add(heap);
    sign(scene, 'Net Shed', { x: cx, y: y + 3.15, z: z0 - 0.3, w: 1.8, h: 0.5, facing: Math.PI });
    const card = slip(scene, { x: cx - 1.0, y: y + 1.75, z: z1 - 0.14, rotY: Math.PI, w: 0.5, h: 0.3, text: EFFORT_LIMIT, pin: true, visible: false });
    stateHooks?.push((state) => { card.set({ visible: n(state) >= 5 }); });
  }

  storyExtras(scene, ctx, { isWet: () => wet, SEA });
}

// =============================================================== the rooms

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

/**
 * Each aftermath at its home fixture, on the wall behind it (a fixture is built
 * only on the day its call is asked — `fixturePlaces.face`). Two things per
 * aftermath: the Before, as a clipped card that appears when the previous
 * mission is accepted and goes when this one is; the After, as a lit panel
 * printing the action with the caps label as its big line, and the card itself
 * pinned beside it. Two aftermaths at one fixture stack upward.
 */
export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const hooks = [];
  const stacked = {};

  for(const A of AFTERMATHS.filter(a => a.room === id)){
    const fx = F[A.fixture];
    if(!fx) continue;
    const at = fixturePlaces(room, fx);
    const i = stacked[A.fixture] = (stacked[A.fixture] ?? 0);
    stacked[A.fixture] += 1;
    const yBase = 2.32 + i * 0.52;
    const left = { ...at.face(-0.55), y: yBase };
    const right = { ...at.face(0.45), y: yBase };

    const before = slip(group, { ...left, w: 0.6, h: 0.36, text: A.beforeLabel ?? A.before, sub: A.beforeLabel ? A.before : '', tone: 'card', pin: 'clip', visible: A.n === 1 });
    const after = statusPanel(group, { ...right, w: 1.2, h: 0.46, title: `MISSION ${A.n}`, big: A.label ? A.label.join(' ') : A.after, small: A.label ? A.after : '', tone: 'ok', lit: true });
    after.visible = false;
    let card = null;
    if(A.label && A.plate){
      card = statusPanel(group, { ...left, w: 0.6, h: 0.3, title: '', big: A.label.join(' '), tone: 'plain' });
      card.visible = false;
    } else if(A.label){
      card = slip(group, { ...left, w: 0.6, h: 0.36, text: A.label, pin: A.pin ?? true, visible: false });
    }
    let redLine = null;
    if(A.redLine){
      redLine = box(group, 0.62, 0.035, 0.01, left.x, left.y, left.z, PAINT(0xb8352a), left.rotY);
      redLine.visible = false;
    }
    hooks.push((state) => {
      const k = n(state);
      before.set({ visible: k >= A.n - 1 && k < A.n });
      after.visible = k >= A.n;
      if(card){ if(card.set && card.isMesh) card.visible = k >= A.n; else card.set({ visible: k >= A.n }); }
      if(redLine) redLine.visible = k >= A.n;
    });
  }

  switch(id){
    case 'HARB': {
      // The tide board carries berth arrivals: the mission header, day by day.
      const tb = F['tide-board'] ? fixturePlaces(room, F['tide-board']) : null;
      if(tb){
        const p = statusPanel(group, { ...tb.wallPanel(1, 2.0, 1.15), w: 1.3, h: 0.6, title: 'Tide times', big: HEADER(1), tone: 'plain', lit: true });
        hooks.push((state) => p.set({ big: HEADER(day(state)) }));
      }
      break;
    }
    case 'CHAPEL': {
      // The condition board's final status: the ledger's last line, the ending
      // line on the win, HOLD SECOND SERVICE on the hold.
      const cb = F['condition-board'] ? fixturePlaces(room, F['condition-board']) : null;
      if(cb){
        const p = statusPanel(group, { ...cb.wallPanel(1, 2.0, 1.2), w: 1.4, h: 0.7, title: 'Proposed caps', big: '', tone: 'plain', lit: true });
        p.visible = false;
        hooks.push((state) => {
          const k = n(state), won = isWon(state, theme), hold = isHold(state);
          p.visible = k >= 14;
          p.set(hold ? { big: HOLD, small: HOLD_CARD, tone: 'alert' }
            : won ? { big: ENDING_LINE, small: 'The signed operating conditions remain beside the final status.', tone: 'ok' }
              : k >= 15 ? { big: 'The signed operating conditions remain beside the final status.', small: '', tone: 'ok' }
                : { big: 'The council seal waits beside the still-blank sailing permit.', small: '', tone: 'warn' });
        });
      }
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list: what an island of ninety-one people looks like when
// somebody lives on it. Gulls over the harbour that circle and land; a boat
// working the ground off the point; washing out behind the school; a school
// bell; the wrack line the tide leaves; smoke from two chimneys; a weathervane;
// puddles on the apron while it rains.
export function storyExtras(scene, ctx, opts = {}){
  const { groundHeight, animate, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const SEA = opts.SEA ?? -6.2;
  const isWet = opts.isWet ?? (() => true);

  // Gulls: eight that sit on the quay's coping and lift when the player comes
  // down to the quay root or every forty seconds, circle the harbour, and settle.
  {
    const cx = 10, cz = 150, deck = -1.6 + 0.34 + 0.12;
    const flock = [];
    for(let i = 0; i < 8; i++){
      const b = gull(scene, i % 4 ? 0xd9d8d0 : 0x6a6f74);
      const px = 18 + (i % 2 ? 3.7 : -3.7), pz = 146 + Math.floor(i / 2) * 9;
      b.g.position.set(px, deck, pz); b.g.rotation.y = i * 1.3;
      b.g.traverse(o => { o.userData.ignoreAudit = true; });
      flock.push({ ...b, home: b.g.position.clone(), phase: i * 0.8 });
    }
    let mode = 'settled', clock = 0;
    animate?.((t, dt, eye) => {
      clock += dt;
      const near = eye ? Math.hypot(eye.x - 18, eye.z - 128) < 16 : false;
      if(mode === 'settled' && (near || clock > 40)){ mode = 'flying'; clock = 0; }
      if(mode === 'flying' && clock > 26 && !near){ mode = 'settled'; clock = 0; }
      flock.forEach((b, i) => {
        if(mode === 'flying'){
          const a = t * 0.45 + b.phase, r = 16 + (i % 3) * 4;
          b.g.position.set(cx + Math.cos(a) * r, 5 + Math.sin(t * 0.8 + b.phase) * 1.6, cz + Math.sin(a) * r);
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

  // A boat working the ground off the south-east head, on a slow loop.
  {
    const g = new THREE.Group();
    const hull = PAINT(0x2a3c4a), boot = PAINT(0x5c2a22), house = PAINT(0x9c968a);
    box(g, 2.8, 1.2, 8.0, 0, -0.6, 0, boot);
    box(g, 3.0, 1.2, 8.4, 0, 0.6, 0, hull);
    box(g, 1.3, 1.2, 2.0, 0, 0.6, 4.8, hull);
    box(g, 3.2, 0.16, 8.6, 0, 1.28, 0, TIMBER());
    box(g, 1.8, 1.5, 2.2, 0, 2.0, -1.6, house);
    box(g, 1.85, 0.5, 2.25, 0, 2.4, -1.6, MATERIALS.glass());
    cyl(g, 0.08, 4.0, 0, 3.2, 0.6, TIMBER());
    for(let i = 0; i < 3; i++) box(g, 0.7, 0.45, 1.0, -0.8 + i * 0.8, 1.55, -3.4, PAINT(0x4d4433));
    g.position.set(60, SEA, 215); scene.add(g); seaborne(g);
    const loop = [[60, 215], [130, 240], [160, 300], [110, 330], [50, 270]].map(([x, z]) => ({ x, y: SEA, z }));
    const go = patrol(g, loop, 2.2);
    animate?.((t, dt) => { go(t, dt); g.position.y = SEA + Math.sin(t * 0.7) * 0.12; g.rotation.z = Math.sin(t * 0.5) * 0.03; });
  }

  // Washing out behind the school: two posts, a line and six things on it.
  {
    const x0 = 62.5, x1 = 69.5, z = 34;
    for(const x of [x0, x1]){ cyl(scene, 0.05, 2.2, x, at(x, z) + 1.1, z, TIMBER()); softColliders?.push({ x, z, r: 0.3 }); }
    const ly = (at(x0, z) + at(x1, z)) / 2 + 2.1;
    box(scene, x1 - x0, 0.02, 0.02, (x0 + x1) / 2, ly, z, ROPE());
    const colours = [0xb8b2a4, 0x2f4a6a, 0x8a3a30, 0xd8d3c4, 0x3f6b34, 0x9a8ab0];
    colours.forEach((c, i) => {
      const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.7 + (i % 2) * 0.25), CLOTH(c));
      cloth.geometry = cloth.geometry.clone().translate(0, -(0.35 + (i % 2) * 0.125), 0);
      cloth.position.set(x0 + 0.8 + i * 1.1, ly - 0.02, z); scene.add(cloth);
      animate?.(sway(cloth, 'x', 0.22, 1.1 + i * 0.13, i));
    });
  }

  // The school bell, on a post west of the porch, stirring in the wind.
  {
    const x = 42.4, z = 15.4, y = at(x, z);
    cyl(scene, 0.07, 2.6, x, y + 1.3, z, TIMBER());
    box(scene, 0.06, 0.06, 0.6, x, y + 2.55, z + 0.25, STEEL());
    const bell = new THREE.Group(); bell.position.set(x, y + 2.5, z + 0.5); scene.add(bell);
    cyl(bell, 0.2, 0.3, 0, -0.17, 0, PAINT(0x8a6a2a), 0.1);
    cyl(bell, 0.025, 0.12, 0, -0.36, 0, PAINT(0x3a3630));
    softColliders?.push({ x, z, r: 0.35 });
    animate?.((t) => { const gust = Math.max(0, Math.sin(t * 0.13)) ** 6; bell.rotation.x = Math.sin(t * 5.5) * 0.35 * gust + Math.sin(t * 0.9) * 0.02; });
  }

  // The wrack line along the south shore, either side of the harbour works.
  {
    let s = 0x1f2d;
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    for(let i = 0; i < 46; i++){
      const x = i < 23 ? -112 + rnd() * 66 : 30 + rnd() * 84;
      const z = 128.5 + rnd() * 2.2;
      if(Math.abs(x - 18) < 8 || Math.abs(x + 30) < 9 || (x > -25 && x < 14)) continue;
      const clump = new THREE.Mesh(new THREE.SphereGeometry(0.35 + rnd() * 0.4, 7, 5), WRACK());
      clump.scale.set(1.6 + rnd(), 0.28, 0.8 + rnd() * 0.6);
      clump.position.set(x, at(x, z) + 0.06, z); clump.rotation.y = rnd() * Math.PI; scene.add(clump);
    }
  }

  // Smoke from the Harbour Office and the Chapel, and a weathervane on the first.
  {
    const stacks = [
      { x: 15.2, z: 44.6, top: at(15.2, 44.6) + 0.35 + 7.2 + 1.2, vane: true },
      { x: -41.5, z: 18.2, top: at(-41.5, 18.2) + 0.35 + 8.4 + 1.0, vane: false },
    ];
    stacks.forEach((s, i) => {
      box(scene, 0.7, 2.4, 0.7, s.x, s.top - 1.2, s.z, PAINT(0x5a4e44));
      box(scene, 0.9, 0.16, 0.9, s.x, s.top, s.z, PAINT(0x3a3630));
      const puffs = [0, 1, 2].map(k => { const p = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 6), SMOKE()); p.userData.ignoreAudit = true; p.position.set(s.x, s.top + 0.4, s.z); scene.add(p); return { p, off: k / 3 }; });
      animate?.((t) => {
        puffs.forEach(({ p, off }) => {
          const k = ((t * 0.35 + off + i * 0.2) % 1);
          p.position.set(s.x + k * 1.6, s.top + 0.3 + k * 2.6, s.z - k * 1.0);
          p.scale.setScalar(0.6 + k * 1.8); p.material.opacity = 0.16 * (1 - k);
        });
      });
      if(s.vane){
        cyl(scene, 0.02, 1.2, s.x, s.top + 0.7, s.z, STEEL());
        const arrow = new THREE.Group(); arrow.position.set(s.x, s.top + 1.25, s.z); scene.add(arrow);
        box(arrow, 0.9, 0.03, 0.03, 0, 0, 0, STEEL());
        box(arrow, 0.22, 0.03, 0.14, 0.45, 0, 0, STEEL());
        box(arrow, 0.12, 0.03, 0.26, -0.4, 0, 0, STEEL());
        arrow.rotation.y = 2.1;
        animate?.(sway(arrow, 'y', 0.22, 0.31, 0.7));
      }
    });
  }

  // Puddles on the apron while it rains — dark discs, gone on the clear day.
  {
    const spots = [[-40, 58], [-31, 62.5], [30, 57.5], [43, 62], [7, 57], [-7, 63]];
    const discs = spots.map(([x, z], i) => {
      const d = new THREE.Mesh(new THREE.CircleGeometry(0.9 + (i % 3) * 0.4, 18), WATERY());
      d.rotation.x = -Math.PI / 2; d.scale.set(1.5, 1, 0.8 + (i % 2) * 0.5);
      d.position.set(x, at(x, z) + 0.015, z); d.userData.ignoreAudit = true; scene.add(d);
      return d;
    });
    animate?.(() => { const w = isWet(); discs.forEach(d => { d.visible = w; }); });
  }

  void bob; void spin;
}
