// story.js — Ashfell Dam changing, mission by mission, and the release at the end.
//
// The bible (../fpl_gpt/HEADWATER.md) writes fifteen "Physical aftermath"
// blocks, one per mission, each with a home fixture, a before, an exact action
// and the next problem: Imani circles the repaired point marked 4.20 M, Mara
// pins the rate-alarm card beside the water curve, Tomas turns the hoist to the
// signed test notch, Arun ties a FAILED SHARED CABLE tag round the removed
// cable, Nia hangs RUNNER UNAVAILABLE over the blocked machine slot, Mara
// unlatches the crest access gate. Three landmark spaces — Crest Walk, Valley
// Lookout, Shift Kitchen — change with the campaign and carry no stop. §8.1 ends
// on the crest above a release already running: gates open in signed order,
// the spillway white, the level falling, four warning lamps green.
//
// Everything here is one of those, keyed to the mission that writes it through
// `registerStateHook` in world.js. Every word on a slip or panel is the bible's
// own — an After line, a card's capitals, the mission header — and nothing we
// composed. Place, props and motion are ours.
//
// Three entry points, all called from props.js:
//   dressRoom(id, room, ctx)   at the end of fitOutRoom — the aftermaths at
//                              their home fixtures, and the Shift Kitchen
//   storySpine(ctx)            at the end of fitOutSpine — rain on the glass, the
//                              storm board, the Valley Lookout and Crest Walk walls
//   storyExtras(scene, ctx)    at the end of decorate — the gated bays and their
//                              release, the level gauge, the valley, the crest
//                              access gate, the weather closing in
import * as THREE from 'three';
import { animate, spin, scrollUV } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { markStructure } from '../../engine/world/interiorKit.js';
import { FIXTURES } from './fixtures.js';
import { MISSIONS } from './content/missions.js';
import { registerStateHook } from './world.js';

// ------------------------------------------------------------------ the campaign

const THEME_FOR_COUNT = { content: { MISSIONS } };
/** Missions whose decision the player has accepted. */
const accepted = (state) => missionsAccepted(state, THEME_FOR_COUNT);
/** The mission the player is on. */
const dayOf = (state) => Math.max(1, Math.min(MISSIONS.length, state?.week ?? 1));
/** §8.1's completion gate, as far as the world can see it. */
const released = (state) => state?.status === 'won' || accepted(state) >= MISSIONS.length;

/**
 * The mission briefing header, verbatim from the bible, and the campaign's
 * closing header once the release is running.
 */
export function HEADER(state){
  if(released(state)) return 'CAMPAIGN COMPLETE - ASHFELL RELEASE RULES SIGNED';
  const d = dayOf(state);
  const left = 16 - d;
  return left === 1
    ? `MISSION ${d} - 1 WORK SHIFT REMAINS BEFORE THE STORM.`
    : `MISSION ${d} - ${left} WORK SHIFTS REMAIN BEFORE THE STORM.`;
}

/** The After lines, verbatim, by mission. Slips print these. */
const AFTER = {
  1: 'Imani Okoro circles the repaired point marked 4.20 M on the trace.',
  2: 'Mara Vale pins the rate-alarm card beside the water curve.',
  3: 'Tomas Wilkes clips the verified calibration strip to the discharge board.',
  4: 'Elise Baptiste pins the MINIMUM LEAD: 280 MINUTES card beside the village pin.',
  5: 'Mara Vale draws the MUST CROSS 4.6 M bracket between the endpoint marks.',
  6: 'Imani Okoro files the failed forecast under MISSED LATER CREST.',
  7: 'Leila Hassan pins the DRAW DOWN 5.28 MILLION CUBIC METRES card to the ledger.',
  8: 'Tomas Wilkes turns the hoist to the signed test notch.',
  9: 'Arun Mehta ties a FAILED SHARED CABLE tag around the removed cable.',
  10: 'Arun Mehta clips the BELOW 5.0 LITRES PER MINUTE clearance to the weir notebook.',
  11: 'Imani Okoro opens the sealed independent survey drawer.',
  12: 'Nia Chen hangs a RUNNER UNAVAILABLE card over the blocked machine slot.',
  13: 'Imani Okoro pins the independent clearance beside the corrected residual plot.',
  14: 'Elise Baptiste ticks the fourth warning acknowledgement box.',
  15: 'Mara Vale unlatches the crest access gate.',
};

/**
 * The reservoir, in metres, against the crest at 216.80 and the sill at 213.20
 * (the CREST notice in props.js). Read off the metric ledger's events rather
 * than a straight climb: it rises with the rain, dips on day 8 when the
 * turbine-and-gate schedule first takes a share, climbs again as Forecast B's
 * larger storm arrives, and falls through the staged release at the end.
 */
const LEVEL_BY_MISSION = [213.45, 213.6, 213.8, 213.95, 214.15, 214.3, 214.55, 214.75,
  214.5, 214.65, 214.8, 214.8, 214.6, 214.75, 214.95, 213.55];
const levelFor = (state) => LEVEL_BY_MISSION[Math.min(LEVEL_BY_MISSION.length - 1, accepted(state))];
const CREST_LEVEL = 216.8;

// ------------------------------------------------------------------ helpers

const mat = (spec) => new THREE.MeshStandardMaterial(spec);
const PAPER = () => mat({ color: 0xd9d3c3, roughness: 0.95 });
const TIMBER = () => mat({ color: 0x6b5a3e, roughness: 0.92 });
const STEEL = () => mat({ color: 0x6d757b, roughness: 0.44, metalness: 0.55 });
const BRASS = () => mat({ color: 0xb08a3a, roughness: 0.35, metalness: 0.8 });
const DARK = () => mat({ color: 0x2a2f33, roughness: 0.7 });
const RED = () => mat({ color: 0xb8352a, roughness: 0.6 });

/** Scenery: never counted by the placement or density audits. */
function quiet(m){ m.userData.ignoreAudit = true; markStructure([m], 'scenery'); return m; }

function box(parent, w, h, d, x, y, z, material, rotY = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z); m.rotation.y = rotY;
  parent.add(m);
  return quiet(m);
}
function cyl(parent, r, h, x, y, z, material, rTop = r){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, r, h, 14), material);
  m.position.set(x, y, z);
  parent.add(m);
  return quiet(m);
}
function ball(parent, r, x, y, z, material){
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), material);
  m.position.set(x, y, z);
  parent.add(m);
  return quiet(m);
}

/** A lamp that reads from across a room: dark red until it is green. */
function lamp(parent, x, y, z, rotY = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.06),
    mat({ color: 0x5a1f1a, emissive: 0x8a2a20, emissiveIntensity: 0.7, roughness: 0.4 }));
  m.position.set(x, y, z); m.rotation.y = rotY;
  parent.add(m); quiet(m);
  m.setOn = (on) => {
    m.material.color.setHex(on ? 0x1f6a3a : 0x5a1f1a);
    m.material.emissive.setHex(on ? 0x2fd36a : 0x8a2a20);
    m.material.emissiveIntensity = on ? 2.2 : 0.7;
  };
  return m;
}

/**
 * A painted plane with a `set(next)` that repaints. For the things paper.js
 * does not draw: a level chart, a hoist travel scale, a valley map, a staff
 * gauge. `paint(g, W, H, spec)` is ours; `unlit` for anything outside the glass.
 */
function painted(parent, { x, y, z, rotY = 0, w, h, unlit = false, lit = 0.1, paint, spec: init = {} }){
  const W = 512, H = Math.max(64, Math.round(512 * (h / w)));
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const spec = { ...init };
  const repaint = () => { paint(g, W, H, spec); tex.needsUpdate = true; };
  repaint();
  const material = unlit
    ? new THREE.MeshBasicMaterial({ map: tex, fog: false })
    : mat({ map: tex, roughness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: lit });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  m.position.set(x, y, z); m.rotation.y = rotY;
  parent.add(m); quiet(m);
  m.set = (next) => { Object.assign(spec, next); repaint(); };
  return m;
}

/** Ease toward a target: `x += (target - x) * k`, clamped. */
const toward = (x, target, step) => Math.abs(target - x) <= step ? target : x + Math.sign(target - x) * step;

/**
 * The frame the room's fixtures were built in.
 *
 * `interiorSite.js` places a plan room's fixtures in an anchor at the middle of
 * the room, turned until local +z points out of the corridor (see its "THE
 * OBJECTS THE QUESTIONS ARE ASKED AT"). This builds the same anchor, so
 * `fixturePlaces(pseudo, fixture)` from paper.js answers in the frame the
 * fixture actually stands in — its wall, its face, the floor in front of it.
 * `toWorld` is for colliders, which are world x, z with y ignored.
 */
function roomFrame(room, ctx){
  const b = ctx.bounds;
  const anchor = new THREE.Group();
  anchor.position.set(b.cx, 0, b.cz);
  const theta = b.sign * Math.PI / 2;
  anchor.rotation.y = theta;
  ctx.scene.add(anchor);
  const w = Math.abs(room.z1 - room.z0), d = Math.abs(b.xOuter - b.xInner);
  const pseudo = { group: anchor, bounds: { w, d, x0: -w / 2, x1: w / 2, z0: -d / 2, z1: d / 2, wall: ctx.P?.wall ?? 0.18, flip: 1 } };
  const F = Object.fromEntries((FIXTURES[room.group ?? room.id] ?? []).map(f => [f.id, f]));
  const cos = Math.cos(theta), sin = Math.sin(theta);
  return {
    g: anchor, pseudo, F, w, d,
    at: (fid) => (F[fid] ? fixturePlaces(pseudo, F[fid]) : null),
    /** Unit normal out of the wall a placed spot faces from, in the frame. */
    normal: (rotY) => ({ x: Math.sin(rotY), z: Math.cos(rotY) }),
    toWorld: (lx, lz) => ({ x: b.cx + lx * cos + lz * sin, z: b.cz - lx * sin + lz * cos }),
  };
}

/** A slip on the wall above a fixture, printing a bible line. */
function afterSlip(frame, fid, mission, { text, dx = 0, y = 1.6, w = 0.44, h = 0.24, pin = true, stamp = '' } = {}){
  const a = frame.at(fid);
  if(!a) return null;
  return slip(frame.g, { ...a.face(dx, y), w, h, pin, stamp,
    text: text ?? [AFTER[mission]], sub: text ? AFTER[mission] : '', visible: false });
}

// ================================================================== the rooms

export function dressRoom(id, room, ctx){
  if(!ctx?.scene || !ctx.bounds) return;
  const hooks = [];
  const fr = roomFrame(room, ctx);
  const { g, at } = fr;

  switch(id){
    // ---------------------------------------------------------------- STORE
    case 'STORE': {
      // M1 at level-desk: the repaired point circled. A ring on the trace, and
      // the line beside it.
      const m1 = afterSlip(fr, 'level-desk', 1, { text: ['4.20 M'], dx: 0.35 });
      const ld = at('level-desk');
      let ring = null;
      if(ld){
        const p = ld.face(-0.25, 1.6);
        ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 6, 20), RED());
        ring.position.set(p.x, p.y, p.z); ring.rotation.y = p.rotY; ring.visible = false;
        g.add(ring); quiet(ring);
      }
      // The level chart over the storage board: the blue storage curve, the
      // brass ruler, three pencilled flood marks. The next tick runs above the
      // ruler after M1; two endpoint marks sit either side of a red line after
      // M4; the MUST CROSS 4.6 M bracket joins them after M5.
      const sb = at('storage-board');
      let chart = null;
      if(sb){
        const p = sb.wallAbove(2.62);
        chart = painted(g, { ...p, w: 1.7, h: 0.8, spec: { n: 0 }, paint: (gc, W, H, s) => {
          gc.fillStyle = '#e4e0d4'; gc.fillRect(0, 0, W, H);
          gc.strokeStyle = 'rgba(60,60,70,0.25)'; gc.lineWidth = 1;
          for(let i = 1; i < 8; i++){ gc.beginPath(); gc.moveTo(0, H * i / 8); gc.lineTo(W, H * i / 8); gc.stroke(); }
          for(let i = 1; i < 12; i++){ gc.beginPath(); gc.moveTo(W * i / 12, 0); gc.lineTo(W * i / 12, H); gc.stroke(); }
          // three pencilled flood marks
          gc.strokeStyle = 'rgba(70,70,80,0.6)'; gc.lineWidth = 2;
          for(const f of [0.22, 0.31, 0.38]){ gc.beginPath(); gc.moveTo(W * 0.04, H * f); gc.lineTo(W * 0.96, H * f); gc.stroke(); }
          // the ruler
          gc.fillStyle = '#b08a3a'; gc.fillRect(W * 0.04, H * 0.52, W * 0.92, 5);
          // the blue storage curve, climbing
          gc.strokeStyle = '#2f6f9f'; gc.lineWidth = 6; gc.beginPath();
          const pts = 40;
          for(let i = 0; i <= pts; i++){
            const t = i / pts, x = W * (0.05 + 0.85 * t);
            const y = H * (0.88 - 0.36 * t - 0.16 * t * t);
            if(i === 0) gc.moveTo(x, y); else gc.lineTo(x, y);
          }
          gc.stroke();
          if(s.n >= 1){
            // the next tick, above the ruler
            gc.fillStyle = '#1e2126'; gc.beginPath(); gc.arc(W * 0.93, H * 0.44, 7, 0, Math.PI * 2); gc.fill();
          }
          if(s.n >= 4){
            gc.strokeStyle = '#c9342a'; gc.lineWidth = 4; gc.beginPath(); gc.moveTo(W * 0.04, H * 0.47); gc.lineTo(W * 0.96, H * 0.47); gc.stroke();
            gc.fillStyle = '#1e2126';
            gc.beginPath(); gc.arc(W * 0.30, H * 0.64, 8, 0, Math.PI * 2); gc.fill();
            gc.beginPath(); gc.arc(W * 0.78, H * 0.33, 8, 0, Math.PI * 2); gc.fill();
          }
          if(s.n >= 5){
            gc.strokeStyle = '#1e2126'; gc.lineWidth = 4; gc.beginPath();
            gc.moveTo(W * 0.30, H * 0.72); gc.lineTo(W * 0.30, H * 0.78); gc.lineTo(W * 0.78, H * 0.78); gc.lineTo(W * 0.78, H * 0.72); gc.stroke();
          }
        } });
      }
      const m2 = afterSlip(fr, 'storage-board', 2, { text: ['Rate-alarm card'], dx: -1.15, y: 1.6 });
      const m5 = afterSlip(fr, 'storage-board', 5, { text: ['MUST CROSS 4.6 M'], dx: 1.15, y: 1.6 });
      hooks.push((state) => {
        const n = accepted(state);
        m1?.set({ visible: n >= 1 }); if(ring) ring.visible = n >= 1;
        chart?.set({ n });
        m2?.set({ visible: n >= 2 }); m5?.set({ visible: n >= 5 });
      });
      break;
    }
    // ---------------------------------------------------------------- INFLOW
    case 'INFLOW': {
      // forecast-drawer: a sealed high-ground trace rests under the old forecast
      // (after M5); filed under MISSED LATER CREST (M6), the seal broken.
      const fd = at('forecast-drawer');
      let roll = null, seal = null;
      if(fd){
        const p = fd.face(0, 1.35); const nrm = fr.normal(p.rotY);
        box(g, 0.6, 0.03, 0.16, p.x + nrm.x * 0.08, p.y - 0.06, p.z + nrm.z * 0.08, STEEL(), p.rotY);
        roll = cyl(g, 0.04, 0.5, p.x + nrm.x * 0.08, p.y, p.z + nrm.z * 0.08, PAPER());
        roll.rotation.z = Math.PI / 2; roll.rotation.y = p.rotY; roll.visible = false;
        seal = box(g, 0.08, 0.1, 0.09, p.x + nrm.x * 0.08, p.y, p.z + nrm.z * 0.08, RED(), p.rotY); seal.visible = false;
      }
      const m6 = afterSlip(fr, 'forecast-drawer', 6, { text: ['MISSED LATER CREST'], dx: 0.55, y: 1.75 });
      // water-ledger: the storage allowance, and the storm total that runs past
      // it (after M6); the DRAW DOWN card (M7).
      const wl = at('water-ledger');
      let strip = null;
      if(wl){
        const a = wl.face(-0.25, 1.45); box(g, 0.7, 0.07, 0.02, a.x, a.y, a.z, mat({ color: 0x7a7f86, roughness: 0.8 }), a.rotY);
        const t = wl.face(0.0, 1.7); strip = box(g, 1.2, 0.07, 0.02, t.x, t.y, t.z, mat({ color: 0x2f6f9f, roughness: 0.8 }), t.rotY); strip.visible = false;
      }
      const m7 = afterSlip(fr, 'water-ledger', 7, { text: ['DRAW DOWN 5.28', 'MILLION CUBIC METRES'], dx: 0.85, y: 1.45, w: 0.5, h: 0.28 });
      hooks.push((state) => {
        const n = accepted(state);
        if(roll) roll.visible = n >= 5; if(seal) seal.visible = n >= 5 && n < 6;
        m6?.set({ visible: n >= 6 }); if(strip) strip.visible = n >= 6;
        m7?.set({ visible: n >= 7 });
      });
      break;
    }
    // ---------------------------------------------------------------- GATES
    case 'GATES': {
      // discharge-board: fresh grease marks that stop short of an old notch
      // (after M2); the verified calibration strip clipped to it (M3).
      const db = at('discharge-board');
      const grease = [];
      if(db){
        for(let i = 0; i < 3; i++){
          const p = db.face(-1.0 + i * 0.12, 1.55 + (i % 2) * 0.1);
          const m = box(g, 0.05, 0.16, 0.01, p.x, p.y, p.z, DARK(), p.rotY); m.visible = false; grease.push(m);
        }
        const p = db.face(-0.55, 1.7);
        box(g, 0.03, 0.22, 0.01, p.x, p.y, p.z, BRASS(), p.rotY);      // the old notch
      }
      const m3 = afterSlip(fr, 'discharge-board', 3, { text: ['Verified calibration strip'], dx: 1.0, y: 1.6, pin: 'clip', w: 0.5, h: 0.2 });
      // hoist-stand: the travel scale on the wall behind it, a pointer at the
      // baseline mark, and the handwheel. M8 turns the wheel and the pointer
      // climbs to the signed test notch.
      const hs = at('hoist-stand');
      let pointer = null, wheel = null;
      const hoistY = { base: 0, test: 0 };
      if(hs){
        const p = hs.wallAbove(2.35);
        painted(g, { ...p, w: 0.42, h: 1.1, paint: (gc, W, H) => {
          gc.fillStyle = '#d6dad6'; gc.fillRect(0, 0, W, H);
          gc.fillStyle = '#3f474b'; gc.fillRect(W * 0.42, H * 0.05, W * 0.06, H * 0.9);
          for(let i = 0; i <= 10; i++){
            const y = H * (0.08 + 0.84 * i / 10);
            gc.fillRect(W * 0.3, y - 2, W * 0.3, 4);
          }
          gc.fillStyle = '#b08a3a'; gc.fillRect(W * 0.2, H * 0.92 - 4, W * 0.6, 8);   // baseline mark
          gc.fillStyle = '#1e2126'; gc.fillRect(W * 0.2, H * 0.50 - 4, W * 0.6, 8);   // the test notch
          gc.fillStyle = 'rgba(60,60,70,0.55)'; gc.fillRect(W * 0.25, H * 0.62 - 3, W * 0.5, 6); // an old notch
        } });
        hoistY.base = p.y - 0.55 * 0.84; hoistY.test = p.y;
        const nrm = fr.normal(p.rotY);
        pointer = box(g, 0.14, 0.05, 0.05, p.x + nrm.x * 0.05, hoistY.base, p.z + nrm.z * 0.05,
          mat({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.8 }), p.rotY);
        const q = hs.face(0.75, 1.45); const qn = fr.normal(q.rotY);
        wheel = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 8, 24), STEEL());
        wheel.position.set(q.x + qn.x * 0.12, q.y, q.z + qn.z * 0.12); wheel.rotation.y = q.rotY; g.add(wheel); quiet(wheel);
        for(const a of [0, Math.PI / 2]){
          const spoke = box(wheel, 0.38, 0.03, 0.03, 0, 0, 0, STEEL());
          spoke.rotation.z = a;
        }
        cyl(g, 0.03, 0.14, q.x + qn.x * 0.06, q.y, q.z + qn.z * 0.06, STEEL()).rotation.set(Math.PI / 2, 0, q.rotY);
      }
      const m8 = afterSlip(fr, 'hoist-stand', 8, { dx: -0.7, y: 1.5 });
      // trigger-board: four acknowledged warning slips and the gate order (M14),
      // the storm clock and the final status (M15), and the crest access latch.
      const acks = [0, 1, 2, 3].map(i => { const a = at('trigger-board'); return a ? slip(g, { ...a.face(-0.75 + i * 0.26, 1.35), w: 0.2, h: 0.14, text: [''], pin: true, visible: false }) : null; });
      const order = afterSlip(fr, 'trigger-board', 14, { text: ['Gate order'], dx: 0.65, y: 1.35, w: 0.4, h: 0.22 });
      const tb = at('trigger-board');
      const status = tb ? statusPanel(g, { ...tb.wallPanel(1, 2.0, 1.3), w: 1.4, h: 0.7, lit: true, title: 'Trigger board', big: '', tone: 'warn' }) : null;
      let latch = null;
      if(tb){
        const p = tb.face(-0.2, 1.85); const nrm = fr.normal(p.rotY);
        box(g, 0.16, 0.16, 0.04, p.x + nrm.x * 0.02, p.y, p.z + nrm.z * 0.02, DARK(), p.rotY);
        latch = box(g, 0.04, 0.22, 0.03, p.x + nrm.x * 0.06, p.y, p.z + nrm.z * 0.06, RED(), p.rotY);
      }
      const m15 = afterSlip(fr, 'trigger-board', 15, { text: ['Crest access'], dx: 0.25, y: 1.85, w: 0.34, h: 0.18 });
      let wheelTurn = 0;
      animate((t, dt) => {
        if(!pointer) return;
        const target = wheelTurn ? hoistY.test : hoistY.base;
        pointer.position.y = toward(pointer.position.y, target, dt * 0.12);
        if(wheel) wheel.rotation.z = toward(wheel.rotation.z, wheelTurn ? Math.PI * 1.5 : 0, dt * 1.2);
        if(latch) latch.rotation.z = toward(latch.rotation.z, wheelTurn >= 2 ? -1.2 : 0, dt * 1.5);
      });
      hooks.push((state) => {
        const n = accepted(state);
        grease.forEach(m => { m.visible = n >= 2; });
        m3?.set({ visible: n >= 3 });
        m8?.set({ visible: n >= 8 }); wheelTurn = released(state) ? 2 : n >= 8 ? 1 : 0;
        acks.forEach(a => a?.set({ visible: n >= 14 })); order?.set({ visible: n >= 14 });
        status?.set({ big: HEADER(state), tone: released(state) ? 'ok' : n >= 14 ? 'warn' : 'plain' });
        m15?.set({ visible: n >= 15 });
      });
      break;
    }
    // ---------------------------------------------------------------- SAFE
    case 'SAFE': {
      // arrival-map: a school pin just downstream of a road crossing (after M3),
      // the MINIMUM LEAD: 280 MINUTES card beside the village pin (M4).
      const am = at('arrival-map');
      const pins = [];
      if(am){
        const road = am.face(-0.5, 1.6); box(g, 0.02, 0.5, 0.01, road.x, road.y, road.z, DARK(), road.rotY);
        const river = am.face(0.0, 1.45); box(g, 1.3, 0.02, 0.01, river.x, river.y, river.z, mat({ color: 0x2f6f9f }), river.rotY);
        const school = am.face(-0.32, 1.5); const s = ball(g, 0.03, school.x, school.y, school.z, RED()); s.visible = false; pins.push(s);
        const village = am.face(0.55, 1.5); ball(g, 0.03, village.x, village.y, village.z, mat({ color: 0xf2c14e }));
      }
      const m4 = afterSlip(fr, 'arrival-map', 4, { text: ['MINIMUM LEAD:', '280 MINUTES'], dx: 0.95, y: 1.75, w: 0.46, h: 0.26 });
      // warning-list: four acknowledgement boxes beside a running clock. Two are
      // empty after M13; Elise ticks the fourth on M14.
      const wl = at('warning-list');
      const boxes = [];
      let clock = null;
      if(wl){
        for(let i = 0; i < 4; i++){
          const p = wl.face(-0.5 + i * 0.26, 1.55); const nrm = fr.normal(p.rotY);
          box(g, 0.18, 0.18, 0.02, p.x, p.y, p.z, DARK(), p.rotY);
          const inner = box(g, 0.12, 0.12, 0.02, p.x + nrm.x * 0.012, p.y, p.z + nrm.z * 0.012,
            mat({ color: 0x1f6a3a, emissive: 0x2fd36a, emissiveIntensity: 1.6 }), p.rotY);
          inner.visible = false; boxes.push(inner);
        }
        const c = wl.face(0.7, 1.55); const cn = fr.normal(c.rotY);
        const face = cyl(g, 0.16, 0.03, c.x + cn.x * 0.02, c.y, c.z + cn.z * 0.02, PAPER());
        face.rotation.set(Math.PI / 2, 0, c.rotY);
        clock = new THREE.Group(); clock.position.set(c.x + cn.x * 0.045, c.y, c.z + cn.z * 0.045); clock.rotation.y = c.rotY; g.add(clock);
        const hand = box(clock, 0.02, 0.13, 0.01, 0, 0.06, 0, DARK());
        void hand;
        clock.visible = false;
        animate(spin(clock, 'z', -0.35));
      }
      const m14 = afterSlip(fr, 'warning-list', 14, { dx: 0.0, y: 1.9, w: 0.5, h: 0.2 });
      // settlement-circuits: four lamps that go green.
      const sc = at('settlement-circuits');
      const lamps = [];
      if(sc){
        for(let i = 0; i < 4; i++){ const p = sc.face(-0.45 + i * 0.3, 1.85); lamps.push(lamp(g, p.x, p.y, p.z, p.rotY)); }
      }
      hooks.push((state) => {
        const n = accepted(state);
        pins.forEach(p => { p.visible = n >= 3; });
        m4?.set({ visible: n >= 4 });
        boxes.forEach((b, i) => { b.visible = n >= 14 || (n >= 13 && i < 2); });
        if(clock) clock.visible = n >= 13;
        m14?.set({ visible: n >= 14 });
        lamps.forEach((l, i) => l.setOn(n >= 14 || (n >= 13 && i < 2)));
      });
      break;
    }
    // ---------------------------------------------------------------- STRUCT
    case 'STRUCT': {
      // uplift-wall: two blank gauge faces beside a live independent trace
      // (after M8); the removed cable with its FAILED SHARED CABLE tag (M9).
      const uw = at('uplift-wall');
      const blanks = [];
      let trace = null, coil = null;
      if(uw){
        for(const dx of [-0.85, -0.55]){
          const p = uw.face(dx, 1.6); const nrm = fr.normal(p.rotY);
          const f = cyl(g, 0.11, 0.03, p.x + nrm.x * 0.02, p.y, p.z + nrm.z * 0.02, DARK());
          f.rotation.set(Math.PI / 2, 0, p.rotY); f.visible = false; blanks.push(f);
        }
        const t = uw.face(0.1, 1.6);
        trace = box(g, 0.5, 0.02, 0.01, t.x, t.y, t.z, mat({ color: 0x2fd36a, emissive: 0x2fd36a, emissiveIntensity: 1.2 }), t.rotY);
        trace.visible = false;
        const c = uw.face(1.0, 1.45); const cn = fr.normal(c.rotY);
        coil = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.035, 8, 20), DARK());
        coil.position.set(c.x + cn.x * 0.04, c.y, c.z + cn.z * 0.04); coil.rotation.y = c.rotY; coil.visible = false; g.add(coil); quiet(coil);
      }
      const m9 = afterSlip(fr, 'uplift-wall', 9, { text: ['FAILED SHARED CABLE'], dx: 1.0, y: 1.9, w: 0.42, h: 0.2, pin: 'clip' });
      // weir-bench: the weir bucket, and drops that strike it at a slowing pace.
      const wb = at('weir-bench');
      const drops = [];
      let bucket = null;
      if(wb){
        const f = wb.floor(0.8, 0.9);
        bucket = cyl(g, 0.17, 0.3, f.x, 0.15, f.z, STEEL(), 0.15);
        const wpos = fr.toWorld(f.x, f.z);
        ctx.soft?.(wpos.x, wpos.z, 0.26);
        const dm = mat({ color: 0xcfe6ee, emissive: 0x9dc4d4, emissiveIntensity: 0.6, roughness: 0.2 });
        for(let i = 0; i < 4; i++){ const d = ball(g, 0.018, f.x, 1.4, f.z, dm); d.visible = false; drops.push({ m: d, ph: i / 4 }); }
      }
      const m10 = afterSlip(fr, 'weir-bench', 10, { text: ['BELOW 5.0 LITRES', 'PER MINUTE'], dx: 0.6, y: 1.6, w: 0.44, h: 0.26, pin: 'clip' });
      // Extras: a dipper on the weir channel, and the bay's own ceiling drips
      // into a puddle. A seepage gallery is never quite dry.
      const b = ctx.bounds;
      {
        const chX = b.xOuter - b.sign * 0.8;
        const wz = b.cz + 1.9;
        const bird = new THREE.Group();
        const local = { x: wz - b.cz, z: b.cx - chX };
        bird.position.set(local.x, 0.58, local.z);
        const fm = mat({ color: 0x3a3230, roughness: 0.9 });
        const body = ball(bird, 0.06, 0, 0, 0, fm); body.scale.set(1.5, 0.9, 1);
        ball(bird, 0.035, 0.09, 0.04, 0, fm);
        box(bird, 0.06, 0.04, 0.05, 0, -0.01, 0, mat({ color: 0xe8e6df }));   // the white bib
        box(bird, 0.04, 0.01, 0.01, 0.13, 0.04, 0, mat({ color: 0xc9962a }));
        bird.rotation.y = 0.4;
        g.add(bird);
        animate((t) => { bird.position.y = 0.58 + Math.max(0, Math.sin(t * 5.5)) * 0.03; bird.rotation.x = Math.sin(t * 5.5) * 0.12; });
      }
      const ceilDrops = [];
      {
        const dm = mat({ color: 0xcfe6ee, emissive: 0x9dc4d4, emissiveIntensity: 0.5, roughness: 0.2 });
        for(const [lx, lz] of [[-1.6, 1.4], [1.3, 2.2]]){
          const puddle = cyl(g, 0.3, 0.006, lx, 0.004, lz, mat({ color: 0x232c31, roughness: 0.08, metalness: 0.15 }));
          void puddle;
          ceilDrops.push({ m: ball(g, 0.016, lx, 3.0, lz, dm), ph: Math.random() });
        }
      }
      let period = 0.45;
      animate((t) => {
        for(const d of drops){
          const k = ((t / period) + d.ph) % 1;
          d.m.visible = !!bucket && k < 0.8;
          d.m.position.y = 1.45 - k * 1.15;
        }
        for(const d of ceilDrops){
          const k = ((t / 2.6) + d.ph) % 1;
          d.m.visible = k < 0.9;
          d.m.position.y = 3.05 - k * 3.0;
        }
      });
      hooks.push((state) => {
        const n = accepted(state);
        blanks.forEach(m => { m.visible = n >= 8; }); if(trace) trace.visible = n >= 8;
        if(coil) coil.visible = n >= 9; m9?.set({ visible: n >= 9 });
        period = n >= 10 ? 1.9 : n >= 9 ? 1.0 : 0.45;
        m10?.set({ visible: n >= 10 });
      });
      break;
    }
    // ---------------------------------------------------------------- POWER
    case 'POWER': {
      // machine-board: RUNNER UNAVAILABLE over the blocked machine slot (M12).
      // The crate itself is built by storyExtras, which owns a collider.
      const m12 = afterSlip(fr, 'machine-board', 12, { text: ['RUNNER UNAVAILABLE'], dx: -0.7, y: 1.75, w: 0.46, h: 0.24 });
      hooks.push((state) => { m12?.set({ visible: accepted(state) >= 12 }); });
      break;
    }
    // ---------------------------------------------------------------- ARCHIVE
    case 'ARCHIVE': {
      // holdout-drawer: a fresh sonar roll crowds the old 2003 drawing (after
      // M10); Imani opens the sealed drawer (M11) — the front slides out, the
      // paper seal with her initials is gone.
      const hd = at('holdout-drawer');
      let front = null, seal = null, sonar = null, frontHome = null, frontOut = null;
      if(hd){
        const p = hd.face(0.15, 1.5); const nrm = fr.normal(p.rotY);
        box(g, 0.62, 0.3, 0.3, p.x + nrm.x * 0.16, p.y, p.z + nrm.z * 0.16, STEEL(), p.rotY);
        frontHome = { x: p.x + nrm.x * 0.32, z: p.z + nrm.z * 0.32 };
        frontOut = { x: p.x + nrm.x * 0.55, z: p.z + nrm.z * 0.55 };
        front = box(g, 0.58, 0.26, 0.04, frontHome.x, p.y, frontHome.z, TIMBER(), p.rotY);
        seal = box(g, 0.08, 0.3, 0.005, p.x + nrm.x * 0.345, p.y, p.z + nrm.z * 0.345, PAPER(), p.rotY);
        const d = hd.face(-0.6, 1.8); box(g, 0.34, 0.24, 0.01, d.x, d.y, d.z, PAPER(), d.rotY);      // the old 2003 drawing
        const r = hd.face(-0.35, 1.8); const rn = fr.normal(r.rotY);
        sonar = cyl(g, 0.035, 0.3, r.x + rn.x * 0.04, r.y, r.z + rn.z * 0.04, PAPER()); sonar.visible = false;
      }
      const m11 = afterSlip(fr, 'holdout-drawer', 11, { dx: 0.9, y: 1.75, w: 0.5, h: 0.22 });
      // residual-plot: the new survey and the old fit on separate hooks (after
      // M12); the independent clearance pinned beside the corrected plot (M13).
      const rp = at('residual-plot');
      let newRoll = null;
      if(rp){
        for(const [dx, isNew] of [[-0.75, false], [-0.45, true]]){
          const h = rp.face(dx, 1.95); const hn = fr.normal(h.rotY);
          cyl(g, 0.012, 0.06, h.x + hn.x * 0.03, h.y, h.z + hn.z * 0.03, STEEL());
          const roll = cyl(g, 0.03, 0.34, h.x + hn.x * 0.04, h.y - 0.2, h.z + hn.z * 0.04, PAPER());
          if(isNew){ roll.visible = false; newRoll = roll; }
        }
      }
      const m13 = afterSlip(fr, 'residual-plot', 13, { text: ['Independent clearance'], dx: 0.85, y: 1.6, w: 0.48, h: 0.22 });
      let open = false;
      animate((t, dt) => {
        if(!front) return;
        const to = open ? frontOut : frontHome;
        front.position.x = toward(front.position.x, to.x, dt * 0.25);
        front.position.z = toward(front.position.z, to.z, dt * 0.25);
      });
      hooks.push((state) => {
        const n = accepted(state);
        if(sonar) sonar.visible = n >= 10;
        open = n >= 11; if(seal) seal.visible = n < 11; m11?.set({ visible: n >= 11 });
        if(newRoll) newRoll.visible = n >= 12; m13?.set({ visible: n >= 13 });
      });
      break;
    }
    // ---------------------------------------------------------------- REST
    case 'REST': {
      // The Shift Kitchen. "A kettle sits among unused lunch tins and wet coats."
      // After Stop 24 the night-watch rota fills; after Stop 60 the coats come
      // off the pegs as the relief crew arrives.
      const zWall = fr.d / 2 - 0.09;
      const b = ctx.bounds;
      // the counter, against the back wall
      box(g, 1.6, 0.9, 0.6, 0, 0.45, zWall - 0.3, mat({ color: 0x8a9096, roughness: 0.5, metalness: 0.3 }));
      box(g, 1.62, 0.04, 0.62, 0, 0.92, zWall - 0.3, mat({ color: 0xd6dad6, roughness: 0.4 }));
      { const w = fr.toWorld(0, zWall - 0.3); ctx.hard?.(w.x, w.z, 0.6, 1.6, 0.95); }
      // the kettle, and its steam
      const kettle = cyl(g, 0.11, 0.2, 0.35, 1.04, zWall - 0.32, STEEL(), 0.08);
      box(g, 0.03, 0.12, 0.03, 0.48, 1.1, zWall - 0.32, STEEL()).rotation.z = -0.5;   // the spout
      void kettle;
      const steam = [0, 1, 2].map(i => { const s = ball(g, 0.03, 0.48, 1.2, zWall - 0.32, mat({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 1 })); s.userData.ph = i / 3; return s; });
      animate((t) => {
        for(const s of steam){
          const k = ((t / 2.2) + s.userData.ph) % 1;
          s.position.set(0.48 + Math.sin(t + s.userData.ph * 6) * 0.02, 1.2 + k * 0.45, zWall - 0.32);
          s.material.opacity = 0.35 * (1 - k); s.scale.setScalar(1 + k * 1.6);
        }
      });
      // lunch tins, unused
      for(let i = 0; i < 3; i++) cyl(g, 0.06, 0.09, -0.25 - i * 0.18, 0.985, zWall - 0.3 + (i % 2) * 0.12, mat({ color: i ? 0x9fb6c2 : 0xc9962a, roughness: 0.4, metalness: 0.5 }));
      // wet coats on pegs, by the door end of the back wall
      const coats = [];
      for(let i = 0; i < 3; i++){
        const x = -1.1 - i * 0.3;
        cyl(g, 0.015, 0.08, x, 1.78, zWall - 0.04, STEEL()).rotation.x = Math.PI / 2;
        const c = box(g, 0.3, 0.8, 0.14, x, 1.34, zWall - 0.12, mat({ color: i === 1 ? 0x2f4148 : 0x3a3a2e, roughness: 0.95 }));
        coats.push(c);
      }
      // the night-watch rota: a board and its seven rows, filled after M6
      box(g, 0.5, 0.62, 0.02, 1.15, 1.75, zWall - 0.02, DARK());
      const rota = [0, 1, 2, 3, 4, 5, 6].map(i => slip(g, { x: 1.15, y: 1.99 - i * 0.08, z: zWall - 0.035, rotY: Math.PI, w: 0.4, h: 0.06, text: [''], pin: false, visible: false }));
      void b;
      hooks.push((state) => {
        const n = accepted(state);
        rota.forEach(r => r.set({ visible: n >= 6 }));
        coats.forEach(c => { c.visible = n < 15 && state?.status !== 'won'; });
      });
      break;
    }
    // ---------------------------------------------------------------- BRIEF
    case 'BRIEF': {
      // The storm board, over the briefing room's back wall.
      const zWall = fr.d / 2 - 0.09;
      const board = statusPanel(g, { x: 0, y: 2.45, z: zWall - 0.04, rotY: Math.PI, w: 3.0, h: 0.7, lit: true, title: 'Briefing Room', big: '', tone: 'plain' });
      hooks.push((state) => board.set({ big: HEADER(state), tone: released(state) ? 'ok' : dayOf(state) >= 13 ? 'alert' : dayOf(state) >= 8 ? 'warn' : 'plain' }));
      break;
    }
    default: break;
  }
  for(const h of hooks) registerStateHook(h);
}

// ================================================================== the spine

/**
 * Per level: rain on the glass; on the machine floor the Valley Lookout wall;
 * on the lookout the Crest Walk wall. `ctx.plan` is this level's own plan.
 */
export function storySpine(ctx){
  const sp = ctx.plan?.spine;
  if(!sp || !ctx.scene) return;
  const P = ctx.P ?? {};
  const glassX = (P.corridorHalfWidth ?? 2.6) + (P.roomDepth ?? 7.4);
  const len = sp.z1 - sp.z0, zc = (sp.z0 + sp.z1) / 2;
  const hooks = [];

  // Rain on the glass. A tile of short bright dashes, scrolled down the pane
  // just inside the mullions; heavier as the storm nears. Unlit and
  // transparent — it is on a window, not in the room.
  {
    const c = document.createElement('canvas'); c.width = 128; c.height = 512;
    const g = c.getContext('2d'); g.clearRect(0, 0, 128, 512);
    let s = 7;
    const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    for(let i = 0; i < 90; i++){
      const x = rnd() * 128, y = rnd() * 512, l = 6 + rnd() * 26;
      g.fillStyle = `rgba(230,240,245,${(0.25 + rnd() * 0.5).toFixed(2)})`;
      g.fillRect(x, y, 1.5, l);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace;
    tex.repeat.set(Math.max(1, Math.round(len / 3)), 2);
    const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.22, depthWrite: false, fog: false });
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(len, 3.05), m);
    pane.position.set(glassX - 0.12, 1.55, zc); pane.rotation.y = -Math.PI / 2;
    ctx.scene.add(pane); quiet(pane);
    animate(scrollUV(tex, 0.004, 0.9));
    hooks.push((state) => { m.opacity = 0.14 + 0.022 * dayOf(state); });
  }

  /** The valley map: the river reach, four settlements, the low road; the
   *  warning route posted after Stop 16. */
  const valleyMap = (x, y, z, rotY) => painted(ctx.scene, { x, y, z, rotY, w: 1.5, h: 1.0, spec: { route: false }, paint: (g, W, H, s) => {
    g.fillStyle = '#d9d3c3'; g.fillRect(0, 0, W, H);
    g.strokeStyle = '#2f6f9f'; g.lineWidth = 9; g.beginPath();
    g.moveTo(W * 0.08, H * 0.12); g.lineTo(W * 0.3, H * 0.3); g.lineTo(W * 0.45, H * 0.55); g.lineTo(W * 0.7, H * 0.7); g.lineTo(W * 0.94, H * 0.9); g.stroke();
    g.strokeStyle = '#5b5f66'; g.lineWidth = 5; g.beginPath();
    g.moveTo(W * 0.05, H * 0.5); g.lineTo(W * 0.4, H * 0.62); g.lineTo(W * 0.62, H * 0.58); g.lineTo(W * 0.95, H * 0.75); g.stroke();
    g.fillStyle = '#1e2126';
    for(const [px, py] of [[0.34, 0.24], [0.5, 0.47], [0.72, 0.62], [0.9, 0.82]]){ g.beginPath(); g.arc(W * px, H * py, 8, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = '#c9342a'; g.fillRect(W * 0.46, H * 0.38, 14, 14);   // the school roof
    if(s.route){
      g.strokeStyle = '#c9342a'; g.lineWidth = 4; g.setLineDash?.([10, 8]); g.beginPath();
      g.moveTo(W * 0.34, H * 0.24); g.lineTo(W * 0.5, H * 0.47); g.lineTo(W * 0.72, H * 0.62); g.lineTo(W * 0.9, H * 0.82); g.stroke();
      g.setLineDash?.([]);
    }
  } });

  // The Valley Lookout: the machine floor's closed south end. "A school roof and
  // one low road sit below the dam" is outside the glass (storyExtras); on the
  // wall, the storm board, the valley map and the four acknowledgement lamps.
  if(sp.z0 < 0){
    const z = sp.z0 + 0.12;
    const header = statusPanel(ctx.scene, { x: 1.2, y: 2.55, z, rotY: 0, w: 2.8, h: 0.6, lit: true, title: 'Valley Lookout', big: '', tone: 'plain' });
    const map = valleyMap(4.6, 1.75, z, 0);
    const lamps = [0, 1, 2, 3].map(i => lamp(ctx.scene, 3.95 + i * 0.44, 1.05, z + 0.03, 0));
    hooks.push((state) => {
      const n = accepted(state);
      header.set({ big: HEADER(state), tone: released(state) ? 'ok' : dayOf(state) >= 13 ? 'alert' : dayOf(state) >= 8 ? 'warn' : 'plain' });
      map.set({ route: n >= 4 });
      lamps.forEach((l, i) => l.setOn(n >= 14 || (n >= 13 && i < 2)));
    });
  }

  // The Crest Walk: the lookout's closed north end, past the crest access gate
  // (storyExtras). §8.1: "Four warning lamps stay green above the valley map."
  if(sp.z1 > 120){
    const z = sp.z1 - 0.12;
    const header = statusPanel(ctx.scene, { x: 1.2, y: 2.6, z, rotY: Math.PI, w: 2.8, h: 0.6, lit: true, title: 'Crest Walk', big: '', tone: 'plain' });
    const map = valleyMap(4.6, 1.55, z, Math.PI);
    const lamps = [0, 1, 2, 3].map(i => lamp(ctx.scene, 3.95 + i * 0.44, 2.25, z - 0.03, Math.PI));
    hooks.push((state) => {
      const n = accepted(state);
      header.set({ big: HEADER(state), tone: released(state) ? 'ok' : 'plain' });
      map.set({ route: n >= 4 });
      lamps.forEach((l, i) => l.setOn(n >= 14 || (n >= 13 && i < 2)));
    });
  }

  for(const h of hooks) registerStateHook(h);
}

// ================================================================== outside

/**
 * Outside the glass and across the levels. `ctx.gated` is the two gated bays
 * from props.decorate — their water meshes, leaf and lugs; `ctx.geom` the
 * gorge's numbers; `ctx.colliders` the world's Box3 list.
 */
export function storyExtras(scene, ctx){
  const { geom: G, gated = [], colliders, put } = ctx;
  if(!scene || !G) return;
  const hooks = [];

  // ---- 1. The gated bays: dry until the release, then open in signed order.
  //
  // Each leaf is seated on the sill and its water hidden. When the completion
  // gate is met the first leaf rises over twelve seconds, the second starts as
  // the first passes half travel, and the water in each bay appears as its
  // leaf clears the sill. Nothing here runs before the accepted decision.
  {
    const CLOSED = G.CREST_Y + 2.4, TRAVEL = 2.8;
    const bays = gated.map((b, i) => ({ ...b, p: 0, order: i }));
    for(const b of bays){
      if(b.leaf) b.leaf.position.y = CLOSED;
      b.lugs.forEach(l => { l.position.y = CLOSED + 2.8; });
      b.water.forEach(m => { m.visible = false; });
    }
    let open = false;
    animate((t, dt) => {
      bays.forEach((b, i) => {
        const may = open && (i === 0 || bays[i - 1].p > 0.5);
        b.p = toward(b.p, may ? 1 : 0, dt / 12);
        const e = b.p * b.p * (3 - 2 * b.p);
        if(b.leaf) b.leaf.position.y = CLOSED + TRAVEL * e;
        b.lugs.forEach(l => { l.position.y = CLOSED + 2.8 + TRAVEL * e; });
        const wet = b.p > 0.3;
        b.water.forEach(m => { if(m.visible !== wet) m.visible = wet; });
      });
    });
    hooks.push((state) => { open = released(state); });
  }

  // ---- 2. The level gauge on the pier between the gated bays, facing the
  // tower: a staff gauge marked 206 to 216 with the crest at the top, three
  // old flood marks down it, and the lake line — a lit bar that follows the
  // ledger up through the fortnight and down through the release.
  {
    const pz = 90, faceX = G.FALL_X - G.BAY / 2 - 1.5 - 0.1;   // the pier's west face, from props.js
    const top = G.CREST_Y, bottom = G.CREST_Y - 12;
    painted(scene, { x: faceX, y: (top + bottom) / 2, z: pz, rotY: -Math.PI / 2, w: 2.6, h: top - bottom, unlit: true, paint: (g, W, H) => {
      g.fillStyle = '#c9cfcf'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#1e2126';
      for(let m = 205; m <= 216; m++){
        const y = H * (1 - (m - (CREST_LEVEL - 12)) / 12);
        if(y < 0 || y > H) continue;
        g.fillRect(W * 0.3, y - 3, W * 0.4, 6);
        g.font = '800 40px Inter, Helvetica, Arial, sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle';
        g.fillText(String(m), W * 0.72, y);
        for(let k = 1; k < 5; k++){ const yy = y - (H / 12) * k / 5; g.fillRect(W * 0.38, yy - 2, W * 0.24, 4); }
      }
      g.fillStyle = 'rgba(40,40,50,0.7)';
      for(const f of [214.1, 215.3, 215.9]){ const y = H * (1 - (f - (CREST_LEVEL - 12)) / 12); g.fillRect(W * 0.05, y - 3, W * 0.22, 6); }
      g.fillStyle = '#c9342a'; g.fillRect(0, 0, W, 10);      // the crest
    } });
    const line = put ? put(0.3, 0.14, 3.4, faceX - 0.14, top - 3, pz,
      new THREE.MeshBasicMaterial({ color: 0xbfe4f2, fog: false })) : null;
    let target = LEVEL_BY_MISSION[0];
    animate((t, dt) => {
      if(!line) return;
      const y = top - (CREST_LEVEL - target);
      line.position.y = toward(line.position.y, y, dt * 0.12);
      line.material.color.setHSL(0.53, 0.6, 0.8 + 0.06 * Math.sin(t * 2.2));
    });
    hooks.push((state) => { target = released(state) ? LEVEL_BY_MISSION[LEVEL_BY_MISSION.length - 1] : levelFor(state); });
  }

  // ---- 3. The valley below the dam, downstream past the plunge pool: the
  // river running on, one low road, a school roof, a few houses. After Stop 16
  // the warning route is posted along the road; after Stop 56 all four
  // acknowledgement lamps are lit on the siren posts. One car uses the road.
  if(put){
    const floorY = G.POOL - 3, zc = G.Z0 - 70;
    const ground = mat({ color: 0x3a4436, roughness: 0.98 });
    put(90, 2, 130, 40, floorY, zc, ground);
    put(10, 92, 130, G.ROCK_X + 5, 0, zc, mat({ color: 0x30363a, roughness: 0.96 }));
    // the river, on down the valley, moving
    const riverTex = (() => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 128;
      const g = c.getContext('2d'); g.fillStyle = '#6f8f9b'; g.fillRect(0, 0, 128, 128);
      let s = 11; const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
      for(let i = 0; i < 120; i++){ g.fillStyle = rnd() > 0.5 ? 'rgba(214,232,238,0.12)' : 'rgba(30,58,68,0.12)'; g.beginPath(); g.arc(rnd() * 128, rnd() * 128, 3 + rnd() * 12, 0, Math.PI * 2); g.fill(); }
      const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace; tex.repeat.set(2, 14); return tex;
    })();
    put(18, 1.4, 130, G.FALL_X + 9, G.POOL - 1.6, zc, mat({ map: riverTex, color: 0x2b4a52, emissive: 0x16323a, emissiveIntensity: 0.25, roughness: 0.14 }));
    animate(scrollUV(riverTex, 0.0, -0.25));
    // the low road, and the car on it
    const roadX = 24;
    put(5, 0.2, 116, roadX, floorY + 1.05, zc, mat({ color: 0x2c2f31, roughness: 0.95 }));
    const car = put(1.7, 1.2, 3.8, roadX + 1.2, floorY + 1.75, G.Z0 - 20, mat({ color: 0xc4442f, roughness: 0.5, metalness: 0.2 }));
    let dir = -1, cz = G.Z0 - 20;
    animate((t, dt) => {
      cz += dir * dt * 6;
      if(cz < G.Z0 - 120){ dir = 1; car.position.x = roadX - 1.2; }
      if(cz > G.Z0 - 18){ dir = -1; car.position.x = roadX + 1.2; }
      car.position.z = cz;
    });
    // the school roof, and houses
    const walls = mat({ color: 0xc9c2b2, roughness: 0.9 }), roof = mat({ color: 0x6b3f2e, roughness: 0.85 });
    put(14, 4, 9, 40, floorY + 3, G.Z0 - 52, walls);
    put(15.5, 0.5, 10.5, 40, floorY + 5.2, G.Z0 - 52, roof);
    for(const [x, z] of [[36, G.Z0 - 70], [42, G.Z0 - 82], [35, G.Z0 - 96], [44, G.Z0 - 108]]){
      put(6, 3, 6, x, floorY + 2.5, z, walls);
      put(6.8, 0.4, 6.8, x, floorY + 4.15, z, roof);
    }
    // the warning route: three posted boards along the road, after M4
    const posts = [];
    for(const z of [G.Z0 - 30, G.Z0 - 62, G.Z0 - 94]){
      const p = put(0.12, 2.4, 0.12, roadX + 3.4, floorY + 2.2, z, STEEL());
      const bd = put(1.2, 0.8, 0.08, roadX + 3.4, floorY + 3.6, z, new THREE.MeshBasicMaterial({ color: 0xe8e6df, fog: false }));
      p.visible = bd.visible = false; posts.push(p, bd);
    }
    // four siren posts with lamps
    const sirens = [];
    for(const z of [G.Z0 - 40, G.Z0 - 58, G.Z0 - 78, G.Z0 - 104]){
      put(0.18, 7, 0.18, 46, floorY + 4.5, z, STEEL());
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), new THREE.MeshBasicMaterial({ color: 0x8a2a20, fog: false }));
      l.position.set(46, floorY + 8.2, z); l.userData.ignoreAudit = true; markStructure([l], 'scenery'); scene.add(l);
      sirens.push(l);
    }
    hooks.push((state) => {
      const n = accepted(state);
      posts.forEach(p => { p.visible = n >= 4; });
      sirens.forEach((l, i) => l.material.color.setHex(n >= 14 || (n >= 13 && i < 2) ? 0x2fd36a : 0x8a2a20));
    });
  }

  // ---- 4. The crest access gate, across the lookout gallery at z = 118.6:
  // rails to the glass, a latched leaf in the middle, the crest rail beyond.
  // Latched all fortnight; Mara unlatches it on the last accepted decision and
  // the leaf swings. Colliders are world x, z with y ignored — so at y 0.
  {
    const y0 = 21.6, gz = 118.6, x0 = -2.6, x1 = 10.0, leafA = 4.6, leafB = 7.6;
    const rail = STEEL();
    for(const x of [x0 + 0.1, 1.6, leafA, leafB, x1 - 0.15]) box(scene, 0.08, 1.1, 0.08, x, y0 + 0.55, gz, rail);
    for(const [a, b] of [[x0 + 0.1, leafA], [leafB, x1 - 0.15]]){
      for(const h of [0.55, 1.05]) box(scene, b - a, 0.06, 0.06, (a + b) / 2, y0 + h, gz, rail);
      colliders?.push(new THREE.Box3(new THREE.Vector3(a, 0, gz - 0.12), new THREE.Vector3(b, 1.4, gz + 0.12)));
    }
    const hinge = new THREE.Group(); hinge.position.set(leafA, y0, gz); scene.add(hinge);
    const leafW = leafB - leafA - 0.1;
    for(const h of [0.5, 1.0]) box(hinge, leafW, 0.06, 0.06, leafW / 2 + 0.05, h, 0, rail);
    for(let i = 1; i < 6; i++) box(hinge, 0.04, 0.6, 0.04, i * leafW / 6 + 0.05, 0.75, 0, rail);
    const latch = box(hinge, 0.14, 0.12, 0.1, leafW + 0.02, 1.0, 0, RED());
    const leafBox = new THREE.Box3(new THREE.Vector3(leafA, 0, gz - 0.12), new THREE.Vector3(leafB, 1.4, gz + 0.12));
    colliders?.push(leafBox);
    let unlatched = false;
    animate((t, dt) => {
      hinge.rotation.y = toward(hinge.rotation.y, unlatched ? -1.45 : 0, dt * 0.6);
      latch.rotation.x = toward(latch.rotation.x, unlatched ? 1.1 : 0, dt * 2);
      if(unlatched && !leafBox.isEmpty()) leafBox.makeEmpty();
      if(!unlatched && leafBox.isEmpty()) leafBox.set(new THREE.Vector3(leafA, 0, gz - 0.12), new THREE.Vector3(leafB, 1.4, gz + 0.12));
    });
    hooks.push((state) => { unlatched = released(state); });
  }

  // ---- 5. The runner crate that blocks one of the two machine bays, in the
  // powerhouse from mission 11 — timber, strapped, in front of machine 2 on
  // the aisle side, with a collider that exists only while the crate does.
  {
    const cx = -4.2, cz = 10.1;
    const crate = new THREE.Group(); crate.position.set(cx, 0, cz); scene.add(crate);
    box(crate, 1.5, 1.25, 1.3, 0, 0.625, 0, TIMBER());
    for(const dz of [-0.4, 0.4]) box(crate, 1.54, 0.06, 0.05, 0, 0.625, dz, DARK());
    for(const dx of [-0.5, 0.5]) box(crate, 0.05, 1.29, 1.34, dx, 0.625, 0, DARK());
    crate.visible = false;
    const crateBox = new THREE.Box3();
    crateBox.makeEmpty();
    colliders?.push(crateBox);
    hooks.push((state) => {
      const here = accepted(state) >= 11;
      crate.visible = here;
      if(here) crateBox.set(new THREE.Vector3(cx - 0.8, 0, cz - 0.7), new THREE.Vector3(cx + 0.8, 1.3, cz + 0.7));
      else crateBox.makeEmpty();
    });
  }

  // ---- 6. Lightning far up the catchment, more often as the storm nears: a
  // sheet behind the far wall of the gorge that flashes and flickers. Unlit,
  // additive, never a real light.
  {
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(220, 90),
      new THREE.MeshBasicMaterial({ color: 0xeef3ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide }));
    flash.position.set(G.ROCK_X + 70, 78, G.Z1 + 60); flash.rotation.y = -3 * Math.PI / 4;
    flash.frustumCulled = false; scene.add(flash); quiet(flash);
    let day = 1, next = 12, since = 0, burst = 0;
    animate((t, dt) => {
      since += dt;
      if(since > next){ since = 0; burst = 0.42; next = Math.max(6, 58 - 3.4 * day) * (0.6 + Math.random() * 0.8); }
      if(burst > 0){
        burst -= dt;
        const k = burst / 0.42;
        flash.material.opacity = (k > 0.7 || (k < 0.45 && k > 0.3)) ? 0.55 * k + 0.2 : 0.08 * k;
      } else flash.material.opacity = 0;
    });
    hooks.push((state) => { day = dayOf(state); });
  }

  for(const h of hooks) registerStateHook(h);
}
