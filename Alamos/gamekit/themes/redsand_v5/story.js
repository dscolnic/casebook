// story.js — Arcadia Rise changing as the fifteen shifts do.
//
// The bible writes Red Sand as a situation that changes fifteen times: a slip
// clipped into the carbon ledger, a tag hung on the reactor-branch port, a
// damaged cartridge set in a HALIDE DAMAGE tray, a BATCH C: HOLD tag over the
// loading release, and on the last shift a crew gate that opens and a vehicle
// whose lights come on. Every one of those was a sentence on a card. This file
// is where they become the world — the `### Physical aftermath` blocks, the
// §7.1 ledger, the three landmark-only spaces and §8.1's final scene.
//
// Two halves. `storyOutdoors(scene, ctx)` runs from `decorate` and owns the
// shift board, the dust, the reactor branch, the farm gauge, the pad walk and
// the finale. `dressRoom(id, room, ctx)` runs when a room is first built and puts
// each aftermath's slip on the wall behind its home fixture. Both read the
// campaign through `missionsAccepted`, so a prop keyed to mission n appears when
// mission n's decision is accepted and not before.
//
// Every line of text on a panel or slip is the bible's — an `After — exact
// action` label, a `**Header:**` line, a §3 landmark phrase, a §8.1 board state
// or NO-GO reason, or a cast name. Nothing here is composed. Geometry, placement
// and motion are ours.
//
// `animate` is imported from animators.js rather than read off `ctx`, the way
// props.js does it: `reachable.mjs` runs `decorate` headless with a ctx that has
// no `animate`, `weather` or `theme`, and every use of those three is guarded.
import * as THREE from 'three';
import { box, cyl, MATERIALS, fenceRun } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { animate, sway, blink, spin, wander, patrol } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { deliveryProgress } from '../../engine/core/delivery.js';
import { FIXTURES } from './fixtures.js';
import { site } from './site.js';

const STEEL = () => MATERIALS.paintedSteel(0x6d747c);
const DARK = () => MATERIALS.paintedSteel(0x3a3f45);
/** Dust-coated white, the same shade props.js lags the tanks and the vehicle in. */
const SUIT = () => mat('arcadia.suit', () => new THREE.MeshStandardMaterial({ color: 0xcabfb2, roughness: 0.9 }));
const VISOR = () => mat('arcadia.visor', () => new THREE.MeshStandardMaterial({ color: 0x7a5a22, roughness: 0.25, metalness: 0.8 }));
const CANVAS = () => mat('arcadia.canvas', () => new THREE.MeshStandardMaterial({ color: 0x5a5148, roughness: 0.95 }));

/** The bible's mission header, verbatim, and the post-mission one. */
const HEADER = (d, won = false) => won ? 'MISSION 15 COMPLETE'
  : d >= 15 ? 'MISSION 15 - 1 WORK SHIFT REMAINS BEFORE LAUNCH.'
  : `MISSION ${Math.max(1, d)} - ${16 - Math.max(1, d)} WORK SHIFTS REMAIN BEFORE LAUNCH.`;

/** The six, as the bible names them. */
const CREW = ['ABIOLA', 'SUNDQVIST', 'HERRERA', 'CHO', 'ACHEBE', 'DEMIR'];

/**
 * §7.1, one row per mission: the home fixture, the label on what gets clipped
 * there, and who clips it. `text` is the caps label out of the After sentence;
 * `who` is the cast name in the same sentence, printed small under it.
 */
const AFTERMATH = [
  { n: 1,  room: 'GIBBS',  home: 'ledger',                 text: 'CARBON ACCOUNTED FOR: 99.8%',       who: 'Commander Laila Abiola', pin: 'clip' },
  { n: 2,  room: 'INTAKE', home: 'compressor-log-desk',    text: 'CO2 CAPACITY: 2405 KG METHANE',     who: 'Ingrid Sundqvist' },
  { n: 3,  room: 'HSTORE', home: 'gas-sampling-ports',     text: 'NITROGEN AFTER REGULATOR',          who: 'Dr. Tomás Herrera', pin: 'clip' },
  { n: 4,  room: 'KINET',  home: 'separation-cartridge',   text: 'LOCAL MAINTENANCE',                 who: 'Mei-Ling Cho', tone: 'card' },
  { n: 5,  room: 'SOIL',   home: 'water-report',           text: 'SHARED BAD STANDARD',               who: 'Rosalind Achebe', pin: 'clip' },
  { n: 6,  room: 'GIBBS',  home: 'evidence-board',         text: 'HYDROGEN-LINE REPAIR',              who: 'Commander Laila Abiola' },
  { n: 7,  room: 'PHASE',  home: 'phase-radiator',         text: '2.7 MJ RETAINED',                   who: 'Dr. Tomás Herrera', pin: 'clip' },
  { n: 8,  room: 'GIBBS',  home: 'verification-panel',     text: ['RATE DROP VERIFIED /', 'MOTIVE UNRESOLVED'], who: 'Ingrid Sundqvist' },
  { n: 9,  room: 'KINET',  home: 'bed',                    text: 'HALIDE DAMAGE',                     who: 'Mei-Ling Cho', tone: 'card' },
  { n: 10, room: 'EQUIL',  home: 'analyser',               text: 'OVERRIDE PREVENTED RUNAWAY',        who: 'Commander Laila Abiola' },
  { n: 11, room: 'GIBBS',  home: 'operating-point-board',  text: ['LOWER TEMPERATURE /', 'HIGHER PRESSURE /', 'WATER REMOVAL'], who: 'Ingrid Sundqvist' },
  { n: 12, room: 'ELEC',   home: 'stack-accounting-panel', text: 'WATER RETURN: 80 KMOL RECOVERED',   who: 'Yusuf Demir', pin: 'clip' },
  { n: 13, room: 'GIBBS',  home: 'loadboard',              text: 'PROTECTED-LOAD SCHEDULE',           who: 'Yusuf Demir' },
  { n: 14, room: 'ASSAY',  home: 'assay-review-board',     text: 'BATCH C: HOLD',                     who: 'Rosalind Achebe', pin: 'clip' },
];

/**
 * §8.1's gate, read off the state. GO when the engine says the campaign is won,
 * or when all fifteen decisions are accepted and every bar stands at 100. HOLD
 * otherwise once the last mission is in, with the bible's exact reason for every
 * failing bar. `state.metrics.bars` is what `engine/core/metrics.js` writes.
 */
function holdReasons(state){
  const bars = state?.metrics?.bars ?? {};
  const r = [];
  if((bars.flight_ready_methane ?? 100) < 100) r.push('FUEL ASSAY NOT PASSED');
  if((bars.ascent_oxygen ?? 100) < 100) r.push('OXYGEN INCOMPLETE');
  if((bars.power_reserve ?? 100) < 100) r.push('POWER RESERVE INCOMPLETE');
  if((bars.plant_integrity ?? 100) < 100) r.push('PLANT INTEGRITY INCOMPLETE');
  return r;
}
function verdict(state, theme){
  const k = missionsAccepted(state, theme);
  const won = state?.status === 'won';
  const reasons = holdReasons(state);
  const go = won || (k >= 15 && reasons.length === 0);
  const hold = !go && k >= 15;
  return { k, go, hold, won, reasons: hold && !reasons.length ? ['RECOVERY INCOMPLETE'] : reasons };
}

/** The vehicle's fill, the same reading the gauge in props.js draws. */
function fillPct(state, theme){
  try{
    const { got, total } = deliveryProgress(theme, state);
    return Math.round((0.59 + 0.41 * (total ? got / total : 0)) * 100);
  }catch{ return 59; }
}

/** A `THREE.Box3` collider for something the player must not walk through. */
function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r), new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

/** A suited crew member: enough of a figure to read as one at ten metres. Faces +z. */
function crewFigure(parent){
  const g = new THREE.Group();
  cyl(g, 0.27, 0.85, 0, 1.15, 0, SUIT());
  for(const s of [-1, 1]) cyl(g, 0.12, 0.75, s * 0.15, 0.38, 0, SUIT());
  for(const s of [-1, 1]) cyl(g, 0.09, 0.7, s * 0.37, 1.15, 0, SUIT());
  const helm = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), SUIT()); helm.position.y = 1.83; g.add(helm);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), VISOR()); visor.position.set(0, 1.85, 0.1); visor.scale.set(1, 0.8, 0.6); g.add(visor);
  box(g, 0.4, 0.55, 0.25, 0, 1.25, -0.3, MATERIALS.paintedSteel(0x8f9aa0));
  parent.add(g);
  return g;
}

/** A material nothing else holds, for anything that is animated or state-driven. */
const ownEmissive = (c, k = 0) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: k, roughness: 0.6 });

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const n = (state) => missionsAccepted(state, theme);

  // ------------------------------------------------ the shift board and the dust
  // The bible's mission header, on a two-post stand at the edge of the spawn
  // clearing, turned to face it. Off the habitat spur (z > 47.5) and thirteen
  // metres from the spawn point.
  {
    const x = -12, z = 58, y = at(x, z);
    const face = Math.atan2(0 - x, 52 - z);
    for(const dx of [-1.4, 1.4]) box(scene, 0.12, 3.2, 0.12, x + Math.cos(face) * dx, y + 1.6, z - Math.sin(face) * dx, STEEL());
    const board = statusPanel(scene, { x, y: y + 2.7, z, rotY: face, w: 3.1, h: 0.8,
      title: 'Arcadia Rise', big: HEADER(1), tone: 'warn', lit: true });
    solid(colliders, x, z, y, 1.5, 3.2);
    stateHooks?.push((state) => {
      const d = day(state), won = state?.status === 'won';
      board.set({ big: HEADER(d, won), tone: won ? 'ok' : d >= 14 ? 'alert' : 'warn' });
      // Dust by shift. Missions 7–8 are the dust-obstructed radiators and 10–13
      // the dust-limited array; the last shift is launch weather. The wind is the
      // site's own, so the drift, the streaks and the dune horns keep agreeing.
      const dense = (d >= 10 && d <= 13) ? 0.85 : (d >= 7 && d <= 8) ? 0.7 : d >= 15 ? 0.15 : 0.45;
      weather?.set?.({ kind: 'dust', density: Math.min(1, dense), wind: site.weather?.wind ?? { x: 3.4, z: 2.6 } });
    });
  }

  // ------------------------------------------- the intake: M1's next problem, M2's card
  // Frost rims the intake's vent after mission 1, and the CO2 CAPACITY card goes
  // up on the module face after mission 2, big enough to read from the track.
  {
    const b = site.buildings.find(v => v.id === 'INTAKE');
    if(b){
      const y = at(b.x, b.z);
      const sx = b.x + (b.w / 2) * 0.55, sz = b.z - (b.d / 2) * 0.4, top = y + 0.35 + b.h + 4.1;
      const frost = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.66, 0.34, 16, 1, true),
        new THREE.MeshStandardMaterial({ color: 0xe6eef0, roughness: 0.95, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
      frost.position.set(sx, top + 0.05, sz); frost.visible = false; frost.userData.ignoreAudit = true; scene.add(frost);
      const px = b.x + b.w / 2 + 4.5, pz = b.z + 3;
      cyl(scene, 0.07, 3.6, px, y + 1.8, pz, STEEL());
      const panel = statusPanel(scene, { x: px, y: y + 3.2, z: pz, rotY: Math.PI / 2, w: 1.8, h: 0.62,
        title: 'Atmosphere Intake', big: '—', tone: 'plain', lit: true });
      stateHooks?.push((state) => {
        const k = n(state);
        frost.visible = k >= 1;
        panel.set(k >= 2 ? { big: 'CO2 CAPACITY: 2405 KG METHANE', tone: 'ok' } : { big: '—', tone: 'plain' });
      });
    }
  }

  // ------------------------------------- the reactor branch: yellow as nitrogen rises
  // The hydrogen store feeds the reactor along a branch that runs west from the
  // store to the east spine, in the corridor between the electrolysis hall's berm
  // and the catalyst bay's. Its own material, so the colour can move: grey until
  // mission 3 finds nitrogen after the regulator, then the bible's tag goes up
  // on the branch and the pipe goes to a dull yellow.
  {
    const z = 8, x0 = 14, x1 = 40, y = at(27, z) + 2.2;
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x7f7264, roughness: 0.55, metalness: 0.4 });
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, x1 - x0, 12), pipeMat);
    pipe.rotation.z = Math.PI / 2; pipe.position.set((x0 + x1) / 2, y, z); pipe.castShadow = true; scene.add(pipe);
    for(let x = x0 + 2; x < x1; x += 6){ cyl(scene, 0.07, 2.2, x, y - 1.1, z, STEEL()); softColliders?.push({ x, z, r: 0.25 }); }
    const panel = statusPanel(scene, { x: x0 + 2.5, y: y + 0.85, z: z + 0.6, rotY: -Math.PI / 2, w: 1.7, h: 0.6,
      title: 'Hydrogen Store', big: '—', tone: 'plain', lit: true });
    const tag = slip(scene, { x: x0 + 8, y: y - 0.5, z: z - 0.25, rotY: -Math.PI / 2, w: 0.5, h: 0.26,
      text: ['NITROGEN AFTER REGULATOR'], pin: 'clip', visible: false });
    const grey = new THREE.Color(0x7f7264), yellow = new THREE.Color(0x9c8a2c);
    stateHooks?.push((state) => {
      const k = n(state);
      pipeMat.color.copy(k >= 3 ? yellow : grey);
      tag.set({ visible: k >= 3 });
      panel.set(k >= 3 ? { big: 'NITROGEN AFTER REGULATOR', tone: 'warn' } : { big: '—', tone: 'plain' });
    });
  }

  // ------------------------------------------------ the tank farm: gauge and release
  // The farm gauges read the same fill the vehicle does; FULL is an amount
  // milestone at mission 13, and mission 14 hangs BATCH C: HOLD over the loading
  // release — the umbilical that leaves the farm for the pad.
  {
    const x = 31, z = -70, y = at(x, z);
    cyl(scene, 0.07, 3.4, x, y + 1.7, z, STEEL());
    const gauge = statusPanel(scene, { x: x - 0.1, y: y + 3.0, z, rotY: -Math.PI / 2, w: 1.7, h: 0.66,
      title: 'Farm gauges', big: '59%', tone: 'plain', lit: true });
    // The release: a valve wheel on the spur into the farm, with room for a tag.
    const rx = 13.5, rz = -75, ry = at(rx, rz) + 2.2;
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 8, 20), MATERIALS.paintedSteel(0x9a3a2a));
    wheel.position.set(rx + 0.45, ry, rz); wheel.rotation.y = Math.PI / 2; scene.add(wheel);
    const release = slip(scene, { x: rx + 0.5, y: ry - 0.55, z: rz, rotY: Math.PI / 2, w: 0.44, h: 0.24,
      text: ['BATCH C: HOLD'], pin: 'clip', visible: false });
    stateHooks?.push((state) => {
      const v = verdict(state, theme);
      release.set({ visible: v.k >= 14 && !v.go });
      gauge.set(v.go ? { big: 'GO / FUEL VERIFIED', tone: 'ok', small: '' }
        : v.k >= 14 ? { big: 'BATCH C: HOLD', tone: 'alert', small: 'FULL' }
        : v.k >= 13 ? { big: 'FULL', tone: 'ok', small: '' }
        : { big: `${fillPct(state, theme)}%`, tone: 'plain', small: '' });
    });
  }

  // ---------------------------------------------------------------- the pad walk
  // §3: "A dark ascent vehicle stands beyond a locked crew gate." The gate stands
  // in the blast berm's gap, east of the track, so the road itself stays open;
  // fence runs from it into the dirt on both sides and two tall posts flank the
  // road. Its board follows the fill, reads HOLD after mission 14, and on GO the
  // leaf swings into the pad, the vehicle lights come on, six suited figures walk
  // from the gate to the vehicle and the countdown begins — §8.1's sixty seconds.
  {
    const gz = -97, gy = at(7.4, gz);
    // Road posts with lamps, off the track's 5.5 m half-width.
    const roadLamps = [];
    for(const x of [-6.2, 6.2]){
      box(scene, 0.3, 3.4, 0.3, x, gy + 1.7, gz, STEEL());
      const lm = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), ownEmissive(0xff4a30, 0.2));
      lm.position.set(x, gy + 3.55, gz); lm.userData.ignoreAudit = true; scene.add(lm); roadLamps.push(lm);
      solid(colliders, x, gz, gy, 0.3, 3.4);
    }
    // Fences into the berm on both sides; the crew gate is the first bay east.
    // Angled back into the berm's first lumps, so each run ends in the dirt
    // rather than in the air a metre in front of it.
    fenceRun(scene, { x0: 8.6, z0: gz, x1: 13.5, z1: gz - 4, y: gy, height: 2.4 });
    fenceRun(scene, { x0: -6.4, z0: gz, x1: -13.5, z1: gz - 4, y: gy, height: 2.4 });
    box(scene, 0.25, 2.7, 0.25, 8.6, gy + 1.35, gz, STEEL());
    solid(colliders, 8.6, gz, gy, 0.2, 2.7);
    // The leaf, hinged on the road post at x = 6.2, 2.2 m to the next pylon.
    const leaf = new THREE.Group();
    for(const yy of [0.4, 1.2, 2.0]) box(leaf, 2.2, 0.06, 0.06, 1.1, yy, 0, STEEL());
    for(let i = 0; i <= 5; i++) box(leaf, 0.05, 2.2, 0.05, 0.15 + i * 0.4, 1.2, 0, STEEL());
    box(leaf, 0.08, 2.3, 0.08, 2.1, 1.15, 0, DARK());
    leaf.position.set(6.35, gy, gz); scene.add(leaf);
    const leafBox = new THREE.Box3(new THREE.Vector3(6.2, gy, gz - 0.3), new THREE.Vector3(8.6, gy + 2.6, gz + 0.3));
    colliders?.push(leafBox);
    const shutBox = leafBox.clone();
    const board = statusPanel(scene, { x: 8.7, y: gy + 3.15, z: gz + 0.28, rotY: 0, w: 1.7, h: 0.64,
      title: 'Pad Walk', big: '59%', tone: 'plain', lit: true });
    slip(scene, { x: 7.4, y: gy + 2.45, z: gz + 0.06, rotY: 0, w: 0.5, h: 0.22, text: ['PAD WALK'], pin: false, tone: 'card' });

    // Pad lighting: three flood towers, twelve edge lamps round the base, four
    // cabin ports and a nose beacon. All off until GO — the pad stays dark.
    const vx = 0, vz = -132, vy = at(vx, vz);
    const floods = [];
    for(const [tx, tz] of [[14, -118], [14, -146], [-14, -146]]){
      const ty = at(tx, tz);
      cyl(scene, 0.16, 9, tx, ty + 4.5, tz, STEEL(), 0.12);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.5), ownEmissive(0xfff1cf, 0));
      head.position.set(tx, ty + 9.2, tz); head.lookAt(vx, vy + 12, vz); head.userData.ignoreAudit = true;
      scene.add(head); floods.push(head);
      solid(colliders, tx, tz, ty, 0.5, 9.5);
    }
    const edge = [];
    for(let i = 0; i < 12; i++){
      const a = (i / 12) * Math.PI * 2, ex = vx + Math.cos(a) * 7.5, ez = vz + Math.sin(a) * 7.5;
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), ownEmissive(0xfff1c0, 0));
      l.position.set(ex, at(ex, ez) + 0.35, ez); l.userData.ignoreAudit = true; scene.add(l); edge.push(l);
    }
    const ports = [];
    for(let i = 0; i < 4; i++){
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const p = new THREE.Mesh(new THREE.CircleGeometry(0.28, 14), ownEmissive(0xffe3b0, 0));
      p.position.set(vx + Math.cos(a) * 2.45, vy + 26 * 0.88, vz + Math.sin(a) * 2.45);
      p.lookAt(vx + Math.cos(a) * 10, vy + 26 * 0.88, vz + Math.sin(a) * 10);
      p.userData.ignoreAudit = true; scene.add(p); ports.push(p);
    }
    const beaconMat = ownEmissive(0xff3020, 0);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), beaconMat);
    beacon.position.set(vx, vy + 26 * 1.12 + 0.3, vz); beacon.userData.ignoreAudit = true; scene.add(beacon);
    // The amount gauge at the base, with the two assay seals beside it, and the
    // countdown board on the approach.
    const gaugeX = 3.2, gaugeZ = -124.5, gaugeY = at(gaugeX, gaugeZ);
    for(const dx of [-0.9, 0.9]) box(scene, 0.1, 2.2, 0.1, gaugeX + dx, gaugeY + 1.1, gaugeZ, STEEL());
    const amount = statusPanel(scene, { x: gaugeX, y: gaugeY + 1.9, z: gaugeZ + 0.06, rotY: 0, w: 1.7, h: 0.62,
      title: 'Amount gauge', big: '59%', tone: 'plain', lit: true });
    const seals = [-0.5, 0.5].map(dx => slip(scene, { x: gaugeX + dx, y: gaugeY + 1.25, z: gaugeZ + 0.08, rotY: 0, w: 0.4, h: 0.24,
      text: ['ASSAY SEAL'], stamp: '', pin: 'clip', visible: false }));
    solid(colliders, gaugeX, gaugeZ, gaugeY, 1.0, 2.2);
    const cdX = -4.2, cdZ = -121, cdY = at(cdX, cdZ);
    for(const dx of [-1.0, 1.0]) box(scene, 0.12, 3.0, 0.12, cdX + dx, cdY + 1.5, cdZ, STEEL());
    const countdown = statusPanel(scene, { x: cdX, y: cdY + 2.55, z: cdZ + 0.07, rotY: 0, w: 2.0, h: 0.8,
      title: 'Countdown', big: '—', tone: 'plain', lit: true });
    countdown.visible = false;
    solid(colliders, cdX, cdZ, cdY, 1.1, 3.0);

    // The crew. Hidden until GO; then each walks the same line from the gate to a
    // spot at the foot of the vehicle, one after the other, and stands.
    const figures = CREW.map((_, i) => { const f = crewFigure(scene); f.visible = false; return f; });
    const route = [[7.4, gz + 2.2], [7.4, gz - 3], [3.0, -112], [0.8, -122]];
    const stands = CREW.map((_, i) => { const a = Math.PI * 0.35 + (i / (CREW.length - 1)) * Math.PI * 0.3; return [vx + Math.cos(a) * 6.4, vz + Math.sin(a) * 6.4]; });
    const lines = figures.map((_, i) => {
      const pts = [[route[0][0], route[0][1] + i * 0.9], ...route, stands[i]];
      const seg = []; let total = 0;
      for(let k = 1; k < pts.length; k++){ const d = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); seg.push({ a: pts[k - 1], b: pts[k], d, s0: total }); total += d; }
      return { seg, total };
    });
    const placeOn = (i, dist, t) => {
      const { seg, total } = lines[i];
      const f = figures[i];
      const s = Math.min(dist, total);
      const k = seg.find(g => s <= g.s0 + g.d) ?? seg[seg.length - 1];
      const u = k.d ? Math.min(1, (s - k.s0) / k.d) : 1;
      const x = k.a[0] + (k.b[0] - k.a[0]) * u, z = k.a[1] + (k.b[1] - k.a[1]) * u;
      const moving = dist < total;
      f.position.set(x, at(x, z) + (moving ? Math.abs(Math.sin(t * 7 + i)) * 0.05 : 0), z);
      f.rotation.y = moving ? Math.atan2(k.b[0] - k.a[0], k.b[1] - k.a[1]) : Math.atan2(vx - x, vz - z);
    };

    let goAt = -1, held = false, clock = 0, shown = '';
    const SPEED = 1.5;
    animate((t, dt) => {
      void dt;
      clock = t;
      if(goAt < 0) return;
      const ph = t - goAt;
      // 0–15 s: the leaf swings in, the lights come up.
      const k = Math.min(1, ph / 15);
      leaf.rotation.y = 1.45 * k;
      for(const h of floods) h.material.emissiveIntensity = 2.6 * k;
      for(const l of edge) l.material.emissiveIntensity = 2.2 * k;
      for(const p of ports) p.material.emissiveIntensity = 1.6 * k;
      beaconMat.emissiveIntensity = (t % 1.2) < 0.15 ? 3.2 * k : 0.1 * k;
      for(const l of roadLamps) l.material.emissiveIntensity = 0.2 + 1.8 * k * ((t % 1.6) < 0.2 ? 1 : 0.1);
      // 15–40 s: the crew walks to the vehicle.
      figures.forEach((f, i) => { f.visible = true; placeOn(i, Math.max(0, ph - 15 - i * 1.6) * SPEED, t); });
      // 40 s on: the countdown begins. Ten minutes, so it is still running when
      // somebody walks back out to look.
      if(ph >= 40){
        const left = Math.max(0, 600 - (ph - 40));
        const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(Math.floor(left % 60)).padStart(2, '0');
        const big = `T-${mm}:${ss}`;
        // Repaint the canvas only when the second changes, not every frame.
        if(big !== shown){ shown = big; countdown.set({ big, tone: 'ok', small: 'GO / FUEL VERIFIED' }); }
      }
    });
    // The vehicle's own boil-off is in props.js; the slow leaf-and-lights
    // reset below is what happens if a save is loaded back before the last shift.
    const reset = () => {
      goAt = -1; leaf.rotation.y = 0; leafBox.copy(shutBox);
      for(const h of floods) h.material.emissiveIntensity = 0;
      for(const l of edge) l.material.emissiveIntensity = 0;
      for(const p of ports) p.material.emissiveIntensity = 0;
      beaconMat.emissiveIntensity = 0;
      for(const l of roadLamps) l.material.emissiveIntensity = 0.2;
      for(const f of figures) f.visible = false;
    };
    stateHooks?.push((state) => {
      const v = verdict(state, theme);
      const pct = fillPct(state, theme);
      if(v.go){
        if(goAt < 0){ goAt = clock; shown = ''; leafBox.makeEmpty(); }
        board.set({ big: 'GO / FUEL VERIFIED', tone: 'ok', small: '' });
        amount.set({ big: 'FULL', tone: 'ok', small: '' });
        seals.forEach(s => s.set({ visible: true, stamp: 'PASSED' }));
        countdown.visible = true;
        if(!held) countdown.set({ big: 'GO / FUEL VERIFIED', tone: 'ok', small: '' });
        held = true;
        return;
      }
      if(goAt >= 0) reset();
      held = false;
      seals.forEach(s => s.set({ visible: v.k >= 14, stamp: '' }));
      if(v.hold){
        board.set({ big: 'HOLD', tone: 'alert', small: v.reasons.join(' · ') });
        countdown.visible = true; countdown.set({ big: 'HOLD', tone: 'alert', small: v.reasons.join(' · ') });
        amount.set({ big: 'FULL', tone: 'warn', small: '' });
      } else if(v.k >= 14){
        board.set({ big: 'HOLD', tone: 'alert', small: 'BATCH C: HOLD' });
        countdown.visible = true; countdown.set({ big: 'HOLD', tone: 'alert', small: 'BATCH C: HOLD' });
        amount.set({ big: 'FULL', tone: 'warn', small: '' });
      } else if(v.k >= 13){
        board.set({ big: 'FULL', tone: 'ok', small: '' }); amount.set({ big: 'FULL', tone: 'ok', small: '' });
        countdown.visible = false;
      } else {
        board.set({ big: `${pct}%`, tone: 'plain', small: '' }); amount.set({ big: `${pct}%`, tone: 'plain', small: '' });
        countdown.visible = false;
      }
    });
    // A windsock on the pad apron, hard over in the dust.
    {
      const x = 12, z = -114, y = at(x, z);
      cyl(scene, 0.06, 4.0, x, y + 2.0, z, STEEL());
      const sock = new THREE.Mesh(new THREE.ConeGeometry(0.26, 2.0, 8, 1, true),
        mat('arcadia.sock', () => new THREE.MeshStandardMaterial({ color: 0xc4712c, roughness: 0.9, side: THREE.DoubleSide })));
      sock.geometry.translate(0, -1.0, 0);
      const w = site.weather?.wind ?? { x: 3.4, z: 2.6 };
      sock.rotation.z = Math.PI / 2 - 0.3; sock.rotation.y = Math.atan2(w.x, w.z) - Math.PI / 2;
      sock.position.set(x, y + 3.9, z); scene.add(sock);
      animate(sway(sock, 'x', 0.16, 2.2));
      softColliders?.push({ x, z, r: 0.3 });
    }
  }

  storyExtras(scene, ctx);
}

// =============================================================== the rooms
//
// Each aftermath's slip goes on the wall behind its home fixture — never on the
// fixture, which is built only on the day a call is asked at it. Room-specific
// "before" props and the panels that change are in the switch below. `n` is how
// many missions' decisions are accepted.

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.face(spec.dx ?? 0, spec.y ?? 1.5), ...spec }) : null; };
  const panel = (fid, side, spec) => { const a = at(fid); return a ? statusPanel(group, { ...a.wallPanel(side, spec.y ?? 1.95), w: 1.4, h: 0.8, lit: true, ...spec }) : null; };
  /** A small object on the wall behind a fixture, where `face` would put paper. */
  const onWallAt = (fid, dx, y, make) => { const a = at(fid); if(!a) return null; const p = a.face(dx, y); const m = make(); m.position.set(p.x, p.y, p.z); m.rotation.y = p.rotY; group.add(m); return m; };
  const hooks = [];

  // The fifteen aftermaths, wherever their home is in this room.
  const slips = AFTERMATH.filter(a => a.room === id && F[a.home]).map(a => ({
    n: a.n,
    mesh: onFace(a.home, { dx: 0.45, y: 1.6, w: 0.46, h: 0.26, text: Array.isArray(a.text) ? a.text : [a.text],
      sub: a.who, pin: a.pin ?? true, tone: a.tone, visible: false }),
  }));
  hooks.push((state) => { const k = n(state); for(const s of slips) s.mesh?.set({ visible: k >= s.n }); });

  const b = room.bounds;
  switch(id){
    case 'GIBBS': {
      // The ledger's magnet, DO NOT EXPLAIN YET, until the first sheet is clipped
      // in. The evidence board bare, then covered in gas labels, water totals and
      // carbon slips after mission 5, then the repair order across them. Herrera's
      // sheet out of its folder from mission 7; the habitat breaker tags beside the
      // climbing gauge from mission 12; the loadboard's readings.
      const magnet = onFace('ledger', { dx: -0.45, y: 1.6, w: 0.42, h: 0.2, text: ['DO NOT EXPLAIN YET'], pin: false, tone: 'card' });
      const covers = [['GAS', -0.5], ['WATER', -0.15], ['CARBON', 0.2]].map(([t, dx]) =>
        onFace('evidence-board', { dx, y: 1.25, w: 0.26, h: 0.18, text: [t], pin: true, visible: false, tilt: (dx * 0.3) }));
      const sheet = onFace('verification-panel', { dx: -0.45, y: 1.6, w: 0.4, h: 0.26, text: ['Dr. Tomás Herrera'], pin: false, visible: false, tilt: 0.08 });
      const breakers = [-0.55, -0.25].map(dx => onFace('loadboard', { dx, y: 1.25, w: 0.24, h: 0.16, text: ['HABITAT'], pin: 'clip', visible: false }));
      const load = panel('loadboard', 1, { title: 'Loadboard', big: '—', tone: 'plain' });
      const op = panel('operating-point-board', -1, { title: 'Operating point board', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        magnet?.set({ visible: k < 1 });
        covers.forEach(c => c?.set({ visible: k >= 5 }));
        sheet?.set({ visible: k >= 7 });
        breakers.forEach(t => t?.set({ visible: k >= 12 }));
        load?.set(k >= 13 ? { big: 'FULL', tone: 'ok', small: 'PROTECTED-LOAD SCHEDULE' } : { big: `${fillPct(state, theme)}%`, tone: k >= 12 ? 'warn' : 'plain', small: '' });
        op?.set(k >= 11 ? { big: 'LOWER TEMPERATURE / HIGHER PRESSURE / WATER REMOVAL', tone: 'ok' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'INTAKE': {
      // Frost rims the compressor glass after mission 1.
      const rim = onWallAt('compressors', 0, 1.7, () => new THREE.Mesh(new THREE.RingGeometry(0.22, 0.34, 20),
        new THREE.MeshStandardMaterial({ color: 0xe6eef0, roughness: 0.95, transparent: true, opacity: 0.9 })));
      const glass = onWallAt('compressors', 0, 1.7, () => new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), MATERIALS.glass()));
      if(rim){ rim.visible = false; rim.userData.ignoreAudit = true; }
      if(glass) glass.userData.ignoreAudit = true;
      const log = panel('compressor-log-desk', 1, { title: 'Compressor log', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        if(rim) rim.visible = k >= 1;
        log?.set(k >= 2 ? { big: 'CO2 CAPACITY: 2405 KG METHANE', tone: 'ok' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'HSTORE': {
      // The pressure needle holds steady while a sample vial changes its label;
      // then the tag on the reactor-branch port, and the ports' board goes yellow.
      const vial = onWallAt('gas-sampling-ports', -0.5, 1.4, () => cyl(new THREE.Group(), 0.04, 0.22, 0, 0, 0, MATERIALS.paintedSteel(0x9fb6c2)).parent);
      const ports = panel('gas-sampling-ports', 1, { title: 'Gas sampling ports', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        if(vial) vial.visible = k >= 2;
        ports?.set(k >= 3 ? { big: 'NITROGEN AFTER REGULATOR', tone: 'warn', small: '' } : { big: '—', tone: 'plain', small: '' });
      });
      break;
    }
    case 'KINET': {
      // A blue swab beside a clear cartridge from mission 3; the residue in its
      // LOCAL MAINTENANCE tray from 4. An inlet sample beside a cleaner outlet
      // sample from 8; the damaged inlet cartridge in the HALIDE DAMAGE tray from 9.
      const blue = mat('arcadia.residue', () => new THREE.MeshStandardMaterial({ color: 0x2a4a9a, roughness: 0.7 }));
      const swab = onWallAt('separation-cartridge', -0.5, 1.3, () => new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.03), blue));
      const tray = onWallAt('separation-cartridge', 0.45, 1.25, () => { const g = new THREE.Group(); box(g, 0.36, 0.05, 0.05, 0, 0, 0.03, DARK()); const r = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), blue); r.position.set(0, 0.06, 0.04); g.add(r); return g; });
      const inlet = onWallAt('bed', -0.55, 1.3, () => cyl(new THREE.Group(), 0.04, 0.2, 0, 0, 0, MATERIALS.paintedSteel(0x4a3a2a)).parent);
      const outlet = onWallAt('bed', -0.3, 1.3, () => cyl(new THREE.Group(), 0.04, 0.2, 0, 0, 0, MATERIALS.paintedSteel(0xc9c3b6)).parent);
      const halide = onWallAt('bed', 0.45, 1.25, () => { const g = new THREE.Group(); box(g, 0.36, 0.05, 0.05, 0, 0, 0.03, DARK()); const c = cyl(g, 0.05, 0.26, 0, 0.06, 0.04, MATERIALS.paintedSteel(0x4a3a2a)); c.rotation.z = Math.PI / 2; return g; });
      const bed = panel('bed-log', 1, { title: 'Bed log', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        if(swab) swab.visible = k >= 3 && k < 4; if(tray) tray.visible = k >= 4;
        if(inlet) inlet.visible = k >= 8; if(outlet) outlet.visible = k >= 8; if(halide) halide.visible = k >= 9;
        bed?.set(k >= 9 ? { big: 'HALIDE DAMAGE', tone: 'alert' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'SOIL': {
      // A sealed field vial apart from three matching printouts from mission 4;
      // the SHARED BAD STANDARD finding beside the normal field result from 5.
      const prints = [-0.65, -0.45, -0.25].map(dx => onFace('water-report', { dx, y: 1.25, w: 0.18, h: 0.24, text: [''], pin: true, visible: false }));
      const vial = onWallAt('water-report', 0.25, 1.3, () => cyl(new THREE.Group(), 0.035, 0.2, 0, 0, 0, MATERIALS.paintedSteel(0x9fb6c2)).parent);
      const report = panel('water-report', 1, { title: 'Water report', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        prints.forEach(p => p?.set({ visible: k >= 4 })); if(vial) vial.visible = k >= 4;
        report?.set(k >= 5 ? { big: 'SHARED BAD STANDARD', tone: 'alert' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'PHASE': {
      // A heat strip that ends above its limit beside a folded override sheet
      // from mission 6; the 2.7 MJ RETAINED ledger clipped to the board from 7.
      const strip = onWallAt('phase-radiator', -0.55, 1.4, () => new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.02), ownEmissive(0xc9342a, 0.9)));
      const limit = onWallAt('phase-radiator', -0.55, 1.62, () => new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.015, 0.02), MATERIALS.paintedSteel(0xe8ebe6)));
      const override = onFace('phase-radiator', { dx: -0.25, y: 1.3, w: 0.3, h: 0.2, text: ['OVERRIDE'], sub: 'Dr. Tomás Herrera', pin: false, visible: false, tilt: -0.35 });
      const rad = panel('phase-radiator', 1, { title: 'Phase radiator', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        if(strip) strip.visible = k >= 6; if(limit) limit.visible = k >= 6;
        override?.set({ visible: k >= 6 });
        rad?.set(k >= 7 ? { big: '2.7 MJ RETAINED', tone: 'ok' } : k >= 6 ? { big: '—', tone: 'alert' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'EQUIL': {
      // The sealed old run — Herrera's 612 K record — under the blame model from
      // mission 9; OVERRIDE PREVENTED RUNAWAY pinned beside it from 10.
      const sealed = onFace('analyser', { dx: -0.45, y: 1.6, w: 0.4, h: 0.26, text: ['612 K'], stamp: 'SEALED', pin: 'clip', visible: false });
      const analyser = panel('analyser', 1, { title: 'Reactor analyser', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        sealed?.set({ visible: k >= 9, stamp: k >= 10 ? '' : 'SEALED' });
        analyser?.set(k >= 10 ? { big: 'OVERRIDE PREVENTED RUNAWAY', tone: 'ok' } : k >= 9 ? { big: '612 K', tone: 'warn' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'ELEC': {
      // An 80 kmol gap in the water-return column from mission 11; the entry
      // clipped into the stack ledger from 12.
      const acct = panel('stack-accounting-panel', 1, { title: 'Stack accounting panel', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        acct?.set(k >= 12 ? { big: 'WATER RETURN: 80 KMOL RECOVERED', tone: 'ok', small: '' } : k >= 11 ? { big: '80 KMOL', tone: 'alert', small: '' } : { big: '—', tone: 'plain', small: '' });
      });
      break;
    }
    case 'ASSAY': {
      // A fresh vial beneath a gauge that still says FULL from mission 13; the
      // BATCH C: HOLD tag from 14; GO / FUEL VERIFIED when the gate passes.
      const vial = onWallAt('assay-review-board', -0.5, 1.3, () => cyl(new THREE.Group(), 0.035, 0.2, 0, 0, 0, MATERIALS.paintedSteel(0x9fb6c2)).parent);
      const review = panel('assay-review-board', 1, { title: 'Assay review board', big: '—', tone: 'plain' });
      hooks.push((state) => {
        const v = verdict(state, theme);
        if(vial) vial.visible = v.k >= 13;
        review?.set(v.go ? { big: 'GO / FUEL VERIFIED', tone: 'ok' } : v.k >= 14 ? { big: 'BATCH C: HOLD', tone: 'alert' } : v.k >= 13 ? { big: 'FULL', tone: 'ok' } : { big: '—', tone: 'plain' });
      });
      break;
    }
    case 'PAD': {
      // The certification console's GO / NO-GO panel, the key Abiola turns, the
      // crew's bags behind the door from mission 14, and the signed operating
      // conditions that remain beside the final status.
      const console_ = panel('certification-console', 1, { title: 'Certification console', big: '—', tone: 'plain', w: 1.6, h: 0.9 });
      const key = onWallAt('certification-console', -0.45, 1.4, () => { const g = new THREE.Group(); cyl(g, 0.09, 0.04, 0, 0, 0.02, DARK()).rotation.x = Math.PI / 2; const k = box(g, 0.03, 0.12, 0.02, 0, 0.06, 0.05, MATERIALS.paintedSteel(0xc9a23f)); k.geometry = k.geometry.clone().translate(0, -0.06, 0); k.position.set(0, 0, 0.05); g.userData.key = k; return g; });
      const signed = onFace('certification-console', { dx: -0.45, y: 1.85, w: 0.46, h: 0.26, text: ['LOWER TEMPERATURE /', 'HIGHER PRESSURE /', 'WATER REMOVAL'], sub: 'signed operating conditions', pin: 'clip', visible: false });
      const bags = [0, 1, 2].map(i => box(group, 0.55, 0.36, 0.3, b.x1 - 1.0 - i * 0.62, 0.18, b.z0 + 1.9, CANVAS()));
      bags.forEach(bag => { bag.visible = false; });
      hooks.push((state) => {
        const v = verdict(state, theme);
        bags.forEach(bag => { bag.visible = v.k >= 14 && !v.go; });
        signed?.set({ visible: v.k >= 15 });
        if(key?.userData.key) key.userData.key.rotation.z = v.go ? -Math.PI / 2 : 0;
        console_?.set(v.go ? { big: 'GO / FUEL VERIFIED', tone: 'ok', small: '' }
          : v.hold ? { big: 'HOLD', tone: 'alert', small: v.reasons.join(' · ') }
          : v.k >= 14 ? { big: 'HOLD', tone: 'alert', small: 'BATCH C: HOLD' }
          : { big: '—', tone: 'plain', small: '' });
      });
      break;
    }
    case 'TANKS': {
      // The farm gauges and the tag over the loading release.
      const gauges = panel('farm-gauges', 1, { title: 'Farm gauges', big: '—', tone: 'plain' });
      const tag = onFace('umbilical', { dx: 0.45, y: 1.6, w: 0.44, h: 0.24, text: ['BATCH C: HOLD'], sub: 'Rosalind Achebe', pin: 'clip', visible: false });
      hooks.push((state) => {
        const v = verdict(state, theme);
        tag?.set({ visible: v.k >= 14 && !v.go });
        gauges?.set(v.go ? { big: 'GO / FUEL VERIFIED', tone: 'ok' } : v.k >= 14 ? { big: 'BATCH C: HOLD', tone: 'alert' } : v.k >= 13 ? { big: 'FULL', tone: 'ok' } : { big: `${fillPct(state, theme)}%`, tone: 'plain' });
      });
      break;
    }
    case 'HAB': {
      // §3 `habitat-mess`: family photos stand behind mugs strapped to the table;
      // after mission 6 a repaired-feed notice replaces the leak watch; after 14
      // packed bags wait under HOLD. Along the left wall, clear of the instrument.
      const tx = b.x0 + 1.3, tz = b.z0 + 3.6;
      box(group, 2.4, 0.06, 0.9, tx, 0.78, tz, MATERIALS.paintedSteel(0x8a8378));
      for(const [dx, dz] of [[-1.1, -0.38], [1.1, -0.38], [-1.1, 0.38], [1.1, 0.38]]) box(group, 0.06, 0.76, 0.06, tx + dx, 0.38, tz + dz, STEEL());
      ctx.solid?.(tx, tz, 2.5, 0.85, 1.0);
      const strap = MATERIALS.paintedSteel(0x2c3136);
      for(let i = 0; i < 6; i++){
        const mx = tx - 1.0 + i * 0.4;
        cyl(group, 0.05, 0.11, mx, 0.865, tz + 0.15, MATERIALS.paintedSteel([0xc4712c, 0x9fb6c2, 0xd8d3c4, 0x3f6b5a, 0xb8352a, 0xc9a23f][i]));
        box(group, 0.13, 0.015, 0.02, mx, 0.86, tz + 0.21, strap);
        // A photo standing behind each mug.
        box(group, 0.16, 0.13, 0.012, mx, 0.885, tz - 0.25, MATERIALS.paintedSteel(0x3a3f45));
        box(group, 0.13, 0.1, 0.006, mx, 0.885, tz - 0.242, MATERIALS.paintedSteel([0xb08a6a, 0x7a9a7a, 0x9a7a8a, 0xa89a7a, 0x8a9aa8, 0xb0a080][i]));
      }
      const notice = slip(group, { x: b.x0 + 0.08, y: 1.7, z: tz, rotY: Math.PI / 2, w: 0.5, h: 0.28, text: ['LEAK WATCH'], pin: true });
      const bags = [0, 1, 2].map(i => box(group, 0.55, 0.36, 0.3, b.x1 - 1.0 - i * 0.62, 0.18, b.z0 + 1.9, CANVAS()));
      bags.forEach(bag => { bag.visible = false; });
      const hold = slip(group, { x: b.x1 - 0.08, y: 1.5, z: b.z0 + 1.9, rotY: -Math.PI / 2, w: 0.36, h: 0.22, text: ['HOLD'], pin: true, visible: false, tone: 'card' });
      hooks.push((state) => {
        const k = n(state);
        notice.set(k >= 6 ? { text: ['HYDROGEN-LINE REPAIR'] } : { text: ['LEAK WATCH'] });
        bags.forEach(bag => { bag.visible = k >= 14; }); hold.set({ visible: k >= 14 });
      });
      break;
    }
    case 'LOCKER': {
      // §3 `suit-locker`: empty boots line up under crew names; after mission 13
      // suit checks fill the tags; on final GO the crew takes the suits to the pad.
      const suits = [], checks = [];
      CREW.forEach((name, i) => {
        const z = b.z0 + 1.8 + i * 0.8, x = b.x0 + 0.32;
        slip(group, { x: b.x0 + 0.08, y: 2.05, z, rotY: Math.PI / 2, w: 0.44, h: 0.18, text: [name], pin: false, tone: 'card' });
        for(const dz of [-0.12, 0.12]) box(group, 0.28, 0.14, 0.12, x + 0.1, 0.07, z + dz, DARK());
        const suit = new THREE.Group();
        cyl(suit, 0.2, 0.9, 0, 1.25, 0, SUIT());
        for(const s of [-1, 1]) cyl(suit, 0.07, 0.6, 0, 0.55, s * 0.12, SUIT());
        const helm = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), SUIT()); helm.position.y = 1.85; suit.add(helm);
        suit.position.set(x, 0, z); group.add(suit); suits.push(suit);
        box(group, 0.05, 0.05, 0.4, b.x0 + 0.12, 1.75, z, STEEL());       // its hook rail
        checks.push(slip(group, { x: b.x0 + 0.08, y: 1.55, z: z + 0.32, rotY: Math.PI / 2, w: 0.22, h: 0.14, text: ['SUIT CHECK'], pin: 'clip', visible: false }));
      });
      ctx.solid?.(b.x0 + 0.35, b.z0 + 3.8, 0.7, 2.0, 5.0);
      hooks.push((state) => {
        const v = verdict(state, theme);
        suits.forEach(s => { s.visible = !v.go; });
        checks.forEach(c => c.set({ visible: v.k >= 13 }));
      });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list: what a plant on this plain has around it that no card
// mentions. A second moon, a dust devil close enough to watch, the ice haul
// running, a cover flapping on the antenna, frost that comes and goes on the cold
// end, and a beacon on every vent stack.
export function storyExtras(scene, ctx){
  const { groundHeight, stateHooks } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // Deimos: the outer moon, a third the size of Phobos, crossing the other way
  // and far slower — it takes two and a half sols to cross this sky.
  {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), MATERIALS.emissive(0xb8ada0, 0.4));
    m.scale.set(3.4, 2.8, 3.0); m.userData.ignoreAudit = true; scene.add(m);
    animate((t) => {
      const a = 1.9 - t * 0.0016;
      m.position.set(Math.cos(a) * 500, 240 + Math.sin(a) * 50, 320 + Math.sin(a) * 90);
      m.rotation.x += 0.0002;
    });
  }

  // A dust devil on the east flats, near enough to see it turn. Unlit, no depth
  // write, wandering forty metres either way — props.js keeps its three far out.
  {
    const h = 48, r = 2.2;
    const d = new THREE.Mesh(new THREE.CylinderGeometry(r * 2.2, r * 0.4, h, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xc79a72, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, fog: true }));
    d.position.set(175, at(175, 70) + h / 2, 70); d.rotation.z = 0.05; d.userData.ignoreAudit = true; scene.add(d);
    animate(spin(d, 'y', 2.6)); animate(wander(d, 40, 0.03, 1.3));
  }

  // The ice haul: a rover that runs the long track out to the cut and back, six
  // metres off the graded line, headlights and an amber beacon on. No collider;
  // it is moving.
  {
    const rover = new THREE.Group();
    const skin = MATERIALS.paintedSteel(0x8f9aa4);
    box(rover, 2.4, 0.9, 3.6, 0, 1.0, 0, skin);
    const hull = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 3.0, 12), skin); hull.rotation.x = Math.PI / 2; hull.position.set(0, 2.3, 0.6); rover.add(hull);
    for(const [sx, sz] of [[-1.25, 1.2], [1.25, 1.2], [-1.25, -1.2], [1.25, -1.2]]){ const w = cyl(rover, 0.46, 0.3, sx, 0.46, sz, DARK()); w.rotation.z = Math.PI / 2; }
    box(rover, 2.0, 0.6, 1.2, 0, 1.2, -2.2, MATERIALS.paintedSteel(0x6f4a35));     // a load of cut regolith
    for(const sx of [-0.8, 0.8]){ const l = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.06), ownEmissive(0xfff1cf, 2.4)); l.position.set(sx, 1.1, 1.85); l.userData.ignoreAudit = true; rover.add(l); }
    const lampMat = ownEmissive(0xffb03a, 0.4);
    const lamp = cyl(rover, 0.08, 0.14, 0, 3.55, 0.6, lampMat); lamp.userData.ignoreAudit = true;
    animate(blink(lampMat, 1.6, 0.14, { on: 2.4, off: 0.06 }));
    const route = [[-97, -60], [-97, -150], [-97, -240], [-97, -150]].map(([x, z]) => ({ x, y: at(x, z), z }));
    rover.position.set(route[0].x, route[0].y, route[0].z);
    scene.add(rover);
    const mover = patrol(rover, route, 4.2);
    animate((t, dt) => mover(t, dt));
  }

  // The antenna's cover, a canvas flap on the dish rim that never quite stays put.
  {
    const x = 88, z = 44, y = at(x, z);
    const flap = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.1), mat('arcadia.cover', () => new THREE.MeshStandardMaterial({ color: 0x8a7a62, roughness: 0.95, side: THREE.DoubleSide })));
    flap.geometry.translate(0, -0.55, 0);
    flap.position.set(x + 2.3, y + 7.4, z + 0.6); flap.rotation.y = 0.6;
    scene.add(flap);
    animate(sway(flap, 'x', 0.35, 2.4)); animate(sway(flap, 'z', 0.12, 3.1, 1.1));
  }

  // Frost on the cold end that comes with the night and goes by mid-morning: a
  // white skin over the lower fins of its radiator bank and on its vent stack,
  // faded in and out on the clock the state carries.
  {
    const frostMat = new THREE.MeshStandardMaterial({ color: 0xe8f0f2, roughness: 0.95, transparent: true, opacity: 0, depthWrite: false });
    const fins = box(scene, 5.6, 1.3, 9.2, 42, at(42, -44) + 1.75, -44, frostMat); fins.userData.ignoreAudit = true; fins.castShadow = false;
    const b = site.buildings.find(v => v.id === 'PHASE');
    if(b){
      const sx = b.x + (b.w / 2) * 0.55, sz = b.z - (b.d / 2) * 0.4, top = at(b.x, b.z) + 0.35 + b.h + 2.4;
      const stack = cyl(scene, 0.38, 3.0, sx, top, sz, frostMat); stack.userData.ignoreAudit = true; stack.castShadow = false;
    }
    let target = 0;
    stateHooks?.push((state) => {
      const h = ((state?.timeHours ?? 12) % 24 + 24) % 24;
      target = (h < 9.5 || h > 18.5) ? 0.6 : 0;
    });
    animate((t, dt) => { frostMat.opacity += (target - frostMat.opacity) * Math.min(1, dt * 0.25); });
  }

  // A red beacon on every module's vent stack, each on its own phase, so the
  // station reads as a station from the plain after dark.
  {
    site.buildings.forEach((b, i) => {
      const sx = b.x + (b.w / 2) * 0.55, sz = b.z - (b.d / 2) * 0.4, top = at(b.x, b.z) + 0.35 + b.h + 4.1;
      const m = ownEmissive(0xff3a2a, 0.3);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), m);
      l.position.set(sx, top + 0.45, sz); l.userData.ignoreAudit = true; scene.add(l);
      cyl(scene, 0.03, 0.4, sx, top + 0.2, sz, STEEL());
      animate(blink(m, 2.4, 0.1, { on: 2.6, off: 0.15, phase: i * 0.37 }));
    });
  }
}
