// story.js — Aster Station changing as the campaign does.
//
// The bible writes Whiteout as a situation that changes fifteen times: a rescue
// window counting down two hours a mission, a storm that never lifts, a rover
// that leaves the bay to become a relay, and a runway door that opens on the
// last decision with an aircraft behind it. Every one of those was a sentence on
// a card. This file is where they become the world — see
// gamekit/STORY_DRESSING_PASS.md §1; the numbers below are its list.
//
// Two halves. `storyOutdoors(scene, ctx)` runs from `decorate` and owns the
// storm, the clock, the drifts, the rover, the runway. `dressRoom(id, room, ctx)`
// runs when a room is first built and puts the bible's own board states on the
// fixtures the stops are asked at. Both read the campaign through
// `missionsAccepted`, so a prop keyed to mission n appears when mission n's
// decision is accepted and not before.
//
// Every line of text on a panel is the bible's — a `**World state:**` or
// `**State/output:**` line, or the mission header. Nothing here is composed.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign, fenceRun } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob, blink, scrollUV, patrol, spin } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

const SNOWM = () => MATERIALS.paintedSteel(0xd9e2ec);
const STEEL = () => MATERIALS.paintedSteel(0x6d747c);
const RED = () => MATERIALS.paintedSteel(0xb8452c);

/** The bible's mission header, verbatim: 36 hours on mission 1, two fewer each mission. */
const HEADER = (mission) => `RESCUE WINDOW — ABOUT ${Math.max(8, 38 - 2 * Math.min(15, Math.max(1, mission)))} HOURS REMAIN`;

/** A `THREE.Box3` collider for something the player must not walk through. */
function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r), new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders, lightPanels } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const n = (state) => missionsAccepted(state, theme);

  // 1. Be in the whiteout. Heavy snow and a close horizon for fourteen missions;
  //    the last mission lifts it to runway visibility and no further, because the
  //    ending card says the storm has not gone.
  const fog = theme?.look?.fog;
  stateHooks?.push((state) => {
    const last = day(state) >= 15;
    if(fog){ fog.near = last ? 120 : 40; fog.far = last ? 520 : 240; }
    weather?.set?.({ kind: 'snow', density: last ? 0.45 : 1.0, wind: { x: 3.2, z: 2.4 } });
  });

  // 3. Blowing-snow ground streamers: long low planes with a scrolling streak
  //    texture, so the ground itself moves. Unlit, half-transparent.
  {
    const c = document.createElement('canvas'); c.width = 256; c.height = 64;
    const g = c.getContext('2d');
    g.clearRect(0, 0, 256, 64);
    for(let i = 0; i < 60; i++){
      const x = Math.random() * 256, y = Math.random() * 64, len = 20 + Math.random() * 60;
      const grad = g.createLinearGradient(x, y, x + len, y);
      grad.addColorStop(0, 'rgba(255,255,255,0)'); grad.addColorStop(0.5, 'rgba(255,255,255,0.55)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad; g.fillRect(x, y, len, 1.5);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    for(const [x, z, w, d, yaw] of [[0, -10, 140, 26, 0.6], [-40, 30, 120, 22, 0.9], [50, -30, 130, 24, 0.5], [-90, 10, 60, 200, 1.4]]){
      const t = tex.clone(); t.needsUpdate = true; t.repeat.set(w / 12, d / 12);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.35, depthWrite: false }));
      m.rotation.x = -Math.PI / 2; m.rotation.z = yaw;
      m.position.set(x, at(x, z) + 0.18, z);
      m.userData.ignoreAudit = true;
      scene.add(m);
      animate?.(scrollUV(t, 1.6, 0.9));
    }
  }

  // 5. Flag lines whipping. The site's posts stand still; the cloth is ours, and it
  //    moves at storm rate so the route can be followed by eye.
  {
    const cloth = mat('aster.flag', () => new THREE.MeshStandardMaterial({ color: 0xb8352a, roughness: 0.9, side: THREE.DoubleSide }));
    const line = (x0, z0, x1, z1, count) => {
      for(let i = 0; i < count; i++){
        const x = x0 + (x1 - x0) * i / (count - 1), z = z0 + (z1 - z0) * i / (count - 1);
        const f = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.32), cloth);
        f.geometry.translate(0.28, 0, 0);
        f.position.set(x, at(x, z) + 2.45, z);
        f.rotation.y = 0.9;
        scene.add(f);
        animate?.(sway(f, 'y', 0.35, 3.1 + (i % 3) * 0.4, i * 0.7));
      }
    };
    line(9, 40, 9, -60, 14); line(-9, 40, -9, -60, 14); line(34, 22, 74, 22, 7);
  }

  // 6. Every window lit, warm, day and night: twenty-eight people are inside.
  //    Emissive strips at sill height along each module's long walls.
  {
    const glow = mat('aster.window', () => new THREE.MeshStandardMaterial({
      color: 0x3a3320, emissive: 0xffc98a, emissiveIntensity: 1.1, roughness: 0.4 }));
    for(const b of theme?.site?.buildings ?? []){
      const y = at(b.x, b.z) + 2.6;
      const along = b.w >= b.d;
      const len = (along ? b.w : b.d) * 0.62;
      for(const s of [-1, 1]){
        const m = new THREE.Mesh(new THREE.BoxGeometry(along ? len : 0.08, 0.7, along ? 0.08 : len), glow);
        m.position.set(b.x + (along ? 0 : s * (b.w / 2 + 0.05)), y, b.z + (along ? s * (b.d / 2 + 0.05) : 0));
        m.userData.ignoreAudit = true;
        scene.add(m);
      }
    }
  }

  // 7. The generator running: a stack on the plant and a shimmer plume out of it.
  {
    const x = -30, z = -40, y = at(x, z);
    cyl(scene, 0.32, 8.2, x, y + 4.1, z, STEEL());
    cyl(scene, 0.4, 0.5, x, y + 8.4, z, MATERIALS.paintedSteel(0x3a3f45));
    const plume = mat('aster.plume', () => new THREE.MeshBasicMaterial({ color: 0xe8ecf0, transparent: true, opacity: 0.16, depthWrite: false }));
    for(let i = 0; i < 4; i++){
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.7 + i * 0.35, 8, 6), plume);
      p.position.set(x + i * 0.5, y + 9 + i * 1.1, z + i * 0.4);
      p.userData.ignoreAudit = true;
      scene.add(p);
      animate?.(bob(p, 0.3, 0.5 + i * 0.1, i));
      animate?.(sway(p, 'x', 0.25, 0.4, i * 0.8));
    }
  }

  // 4. The rescue-window clock, on a post at the edge of the spawn clearing. The
  //    text is the bible's mission header and nothing else.
  {
    // Beside the route in from the spawn, turned to face it. It stood at (14, 34)
    // first and a snow pile there hid it from the one place everybody stands.
    const x = 13, z = 41, y = at(x, z);
    const face = Math.atan2(0 - x, 44 - z);
    for(const dx of [-1.3, 1.3]) box(scene, 0.12, 3.0, 0.12, x + Math.cos(face) * dx, y + 1.5, z - Math.sin(face) * dx, STEEL());
    const panel = statusPanel(scene, { x, y: y + 2.5, z, rotY: face, w: 2.9, h: 0.9,
      title: 'Aster Station', big: HEADER(1), tone: 'alert', lit: true });
    solid(colliders, x, z, y, 1.4, 3);
    stateHooks?.push((state) => panel.set({ big: HEADER(day(state)), tone: day(state) >= 15 ? 'ok' : 'alert' }));
  }

  // 2. Snow accumulating against the doors' lee walls: three tiers per module,
  //    shown by mission. Reads "shut in for a day and a half" without a word.
  {
    const rand = (() => { let s = 0xa57e; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
    const tiers = [[], [], []];
    for(const b of theme?.site?.buildings ?? []){
      const y = at(b.x, b.z);
      const dx = Math.sin(b.facing ?? 0), dz = Math.cos(b.facing ?? 0);
      // The wall opposite the door.
      const wx = b.x - dx * (b.w / 2 + 0.4), wz = b.z - dz * (b.d / 2 + 0.4);
      const len = dx ? b.d : b.w;
      for(let t = 0; t < 3; t++){
        const h = 0.5 + t * 0.55, out = 1.1 + t * 0.7;
        const m = new THREE.Mesh(new THREE.BoxGeometry(dx ? out : len * 0.9, h, dx ? len * 0.9 : out), SNOWM());
        m.position.set(wx - dx * out / 2, y + h / 2, wz - dz * out / 2);
        m.rotation.z = (rand() - 0.5) * 0.08;
        m.visible = t === 0;
        m.userData.ignoreAudit = true;
        scene.add(m);
        tiers[t].push(m);
      }
    }
    stateHooks?.push((state) => {
      const d = day(state);
      tiers[1].forEach(m => { m.visible = d >= 6; });
      tiers[2].forEach(m => { m.visible = d >= 11; });
    });
  }

  // 28. Room 7 stays occupied: one lit, numbered window on the habitat that
  //     never goes out (ledger 7).
  {
    const x = 32, z = -32, y = at(x, z);
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), mat('aster.room7', () =>
      new THREE.MeshStandardMaterial({ color: 0x2b3138, emissive: 0xffd9a0, emissiveIntensity: 1.3, roughness: 0.3 })));
    pane.position.set(x + 0.06, y + 2.4, z); pane.rotation.y = Math.PI / 2;
    scene.add(pane);
    const s = slip(scene, { x: x + 0.07, y: y + 3.1, z, rotY: Math.PI / 2, w: 0.5, h: 0.32, text: ['7'], pin: false });
    void s;
  }

  // 11/22. Rover Three. Parked at the bay door repeating MARKER 3 until mission 3
  //        repairs it; after mission 13 it drives the four-waypoint relay route out
  //        to the mast and back, the only moving vehicle on the plateau.
  {
    const rover = new THREE.Group();
    const body = MATERIALS.paintedSteel(0xc9702a);
    box(rover, 2.2, 0.9, 3.2, 0, 0.95, 0, body);
    box(rover, 1.6, 0.6, 1.2, 0, 1.7, -0.6, MATERIALS.paintedSteel(0x3a3f45));
    for(const [sx, sz] of [[-1.15, 1.1], [1.15, 1.1], [-1.15, -1.1], [1.15, -1.1]]){
      const w = cyl(rover, 0.42, 0.34, sx, 0.42, sz, MATERIALS.paintedSteel(0x22262a));
      w.rotation.z = Math.PI / 2;
    }
    cyl(rover, 0.03, 1.8, 0.6, 2.9, 0.4, STEEL());
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe6a0, emissiveIntensity: 2.5 }));
    lamp.position.set(0.6, 3.8, 0.4); rover.add(lamp);
    const status = statusPanel(rover, { x: 0, y: 1.75, z: 1.65, w: 1.3, h: 0.5, title: 'Rover Three', big: 'MARKER 3', tone: 'alert', lit: true });
    const px = -18, pz = -54;
    rover.position.set(px, at(px, pz), pz); rover.rotation.y = Math.PI / 2;
    scene.add(rover);
    const parked = solid(colliders, px, pz, at(px, pz), 1.8, 2.4);
    const shut = parked.clone();
    // The relay route: bay door → route → mast → back. Ground-following.
    const route = [[-18, -54], [0, -30], [40, 18], [90, 36], [96, 20], [40, 26], [0, -12]].map(([x, z]) => ({ x, y: at(x, z), z }));
    let mover = null;
    animate?.((t, dt) => { mover?.(t, dt); });
    animate?.(blink(lamp.material, 1.6, 0.3, { on: 2.5, off: 0.1 }));
    stateHooks?.push((state) => {
      const k = n(state);
      status.set(k >= 3 ? { big: 'HEALTHY / REPAIRED', tone: 'ok' } : { big: 'MARKER 3', tone: 'alert' });
      if(k >= 13 && !mover){ mover = patrol(rover, route, 3.2); parked.makeEmpty(); }
      if(k < 13 && mover){ mover = null; rover.position.set(px, at(px, pz), pz); rover.rotation.y = Math.PI / 2; parked.copy(shut); }
      if(k >= 13) status.set({ big: 'ROVER RELAY', tone: 'ok' });
    });
  }

  // 21. The mast ices after mission 12: white shells on the dish and aerials.
  {
    const ice = [];
    for(const [x, y, z, r] of [[94, 20.5, 38, 1.4], [94, 17, 38, 0.9], [94.6, 13, 38.4, 0.6]]){
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), SNOWM());
      m.position.set(x, at(94, 38) + y, z); m.scale.set(1, 0.55, 1); m.visible = false;
      m.userData.ignoreAudit = true; scene.add(m); ice.push(m);
    }
    stateHooks?.push((state) => { const k = n(state); ice.forEach(m => { m.visible = k >= 12 && k < 15; }); });
  }

  // 23–25. The runway: threshold markings, a wind sock, edge lights that come on
  //        for the landing, a gate across the spur that slides open on the last
  //        decision, and the aircraft that lands behind it.
  {
    const rx = -96;
    const dark = mat('aster.marking', () => new THREE.MeshStandardMaterial({ color: 0x2c3238, roughness: 0.95 }));
    for(const z of [104, -84]) for(let i = -3; i <= 3; i++){
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 9), dark);
      m.rotation.x = -Math.PI / 2; m.position.set(rx + i * 3.2, at(rx + i * 3.2, z) + 0.06, z);
      m.userData.ignoreAudit = true; scene.add(m);
    }
    // Wind sock at the threshold, hard over in the storm.
    {
      const x = rx + 18, z = 96, y = at(x, z);
      cyl(scene, 0.06, 4.2, x, y + 2.1, z, STEEL());
      const sock = new THREE.Mesh(new THREE.ConeGeometry(0.28, 2.2, 8, 1, true),
        mat('aster.sock', () => new THREE.MeshStandardMaterial({ color: 0xc9702a, roughness: 0.9, side: THREE.DoubleSide })));
      sock.geometry.translate(0, -1.1, 0);
      sock.rotation.z = Math.PI / 2 - 0.25; sock.rotation.y = 0.8;
      sock.position.set(x, y + 4.1, z); scene.add(sock);
      animate?.(sway(sock, 'x', 0.18, 2.6));
    }
    // Edge lights, both sides, every twenty metres.
    const lamps = [];
    for(let z = -84; z <= 104; z += 16) for(const s of [-1, 1]){
      const x = rx + s * 13.5;
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff1c0, emissiveIntensity: 0 }));
      l.position.set(x, at(x, z) + 0.35, z); l.userData.ignoreAudit = true;
      scene.add(l); lamps.push(l);
    }
    // The gate across the spur to the runway: two pylons, a sliding leaf, an
    // indicator. LOCKED until the canary gate passes; OPEN ON FINAL RELEASE after.
    const gx = -52, gz = 26, gy = at(gx, gz);
    fenceRun(scene, { x0: gx - 14, z0: gz, x1: gx - 3.2, z1: gz, y: gy, height: 2.4 });
    fenceRun(scene, { x0: gx + 3.2, z0: gz, x1: gx + 14, z1: gz, y: gy, height: 2.4 });
    for(const dx of [-3.2, 3.2]) box(scene, 0.5, 3.4, 0.5, gx + dx, gy + 1.7, gz, RED());
    const leaf = new THREE.Group();
    box(leaf, 6.2, 2.6, 0.12, 0, 1.4, 0, MATERIALS.paintedSteel(0x8a9298));
    for(let i = 0; i < 5; i++) box(leaf, 0.08, 2.6, 0.16, -2.6 + i * 1.3, 1.4, 0, STEEL());
    leaf.position.set(gx, gy, gz);
    scene.add(leaf);
    const gateBox = new THREE.Box3(new THREE.Vector3(gx - 3.2, gy, gz - 0.4), new THREE.Vector3(gx + 3.2, gy + 3, gz + 0.4));
    colliders?.push(gateBox);
    const shutBox = gateBox.clone();
    const indicator = statusPanel(scene, { x: gx + 3.2, y: gy + 3.0, z: gz + 0.3, rotY: 0, w: 1.6, h: 0.6,
      title: 'Runway Door', big: 'LOCKED', tone: 'alert', lit: true });
    sign(scene, 'RUNWAY DOOR', { x: gx, y: gy + 3.9, z: gz, w: 3.0, h: 0.6, facing: 0 });
    // The aircraft: a twin-engine ski plane, parked above the far threshold in the
    // sky until it is called, then flown down the runway once and stopped.
    const plane = new THREE.Group();
    const skin = MATERIALS.paintedSteel(0xd8dde2);
    box(plane, 1.6, 1.6, 11, 0, 1.9, 0, skin);
    box(plane, 14, 0.24, 2.2, 0, 2.5, 0.6, RED());
    box(plane, 4.6, 0.2, 1.6, 0, 2.6, -5.0, RED());
    box(plane, 0.2, 2.4, 1.8, 0, 3.4, -5.0, RED());
    for(const s of [-1, 1]){
      const eng = cyl(plane, 0.45, 1.6, s * 3.6, 2.3, 1.0, STEEL()); eng.rotation.x = Math.PI / 2;
      const prop = box(plane, 0.12, 2.4, 0.06, s * 3.6, 2.3, 1.9, MATERIALS.paintedSteel(0x22262a));
      animate?.(spin(prop, 'z', 22));
      box(plane, 0.5, 0.12, 2.6, s * 1.0, 0.36, 0.4, STEEL());   // skis
    }
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xff8080, emissive: 0xff2020, emissiveIntensity: 3 }));
    beacon.position.set(0, 4.8, -5); plane.add(beacon);
    animate?.(blink(beacon.material, 1.0, 0.15, { on: 3, off: 0 }));
    plane.visible = false;
    plane.position.set(rx, 60, 140); plane.rotation.y = Math.PI;
    scene.add(plane);
    // The landing: a one-shot flight from the sky at the far threshold to a stop
    // on the apron end. `progress` runs 0 → 1 over thirty seconds.
    let progress = -1;
    animate?.((t, dt) => {
      if(progress < 0 || progress >= 1) return;
      progress = Math.min(1, progress + dt / 30);
      const k = progress;
      const z = 140 - k * 200;                        // 140 → -60
      const h = k < 0.55 ? 60 * (1 - k / 0.55) ** 1.6 : 0;
      plane.position.set(rx, at(rx, z) + h, z);
      plane.rotation.x = k < 0.55 ? -0.06 : 0;
    });
    stateHooks?.push((state) => {
      const open = state?.status === 'won' || n(state) >= 15;
      leaf.position.x = open ? gx - 6.6 : gx;
      if(open) gateBox.makeEmpty(); else gateBox.copy(shutBox);
      indicator.set(open ? { big: 'OPEN ON FINAL RELEASE', tone: 'ok' } : { big: 'LOCKED', tone: 'alert' });
      for(const l of lamps) l.material.emissiveIntensity = open ? 2.2 : 0;
      if(open && progress < 0){ progress = 0; plane.visible = true; }
      if(!open && progress >= 0){ progress = -1; plane.visible = false; }
    });
    softColliders?.push({ x: rx + 18, z: 96, r: 0.5 });
    void lightPanels;
  }
}

// =============================================================== the rooms
//
// Each fixture the bible changes gets its state on the wall beside it. `n` is
// how many missions' decisions are accepted; the bible's own lines are keyed to
// the mission that writes them.

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const panelAt = (fid, side, spec) => {
    if(!F[fid]) return null;
    const at = fixturePlaces(room, F[fid]);
    return statusPanel(group, { ...at.wallPanel(side, spec.y ?? 1.95), w: 1.5, h: 0.85, lit: true, ...spec });
  };
  const slipAt = (fid, where, spec) => {
    if(!F[fid]) return null;
    const at = fixturePlaces(room, F[fid]);
    const pos = where === 'top' ? at.top(spec.dx ?? 0, spec.dz ?? 0) : at.face(spec.dx ?? 0, spec.y ?? 1.5);
    return slip(group, { ...pos, flat: where === 'top', ...spec });
  };
  const hooks = [];

  switch(id){
    case 'OPS': {
      // 9. The systems map is the station's status wall: the next problem, in the
      //    bible's words, the moment the last one closes.
      const NEXT = [
        '', 'SCRUBBER: 2 COMMANDS / 1 SENSOR', 'MARKER 3', 'normalizeState', 'C17 / P02',
        '08:07 / 08:0', 'ROOM 7: 4.1°C / 20.9°C', 'SHIFT LOG: EVERY SECOND LINE', 'CREVASSE [0][1] / [1][0]',
        '1,024 SORTED RECORDS', 'P02 = H04: WARNING 7', '10 SECOND BURST', 'PRIMARY ANTENNA ICING',
        'ADJACENT CASES: UNTESTED', 'LIVE STABLE / RECOVERY UNVERIFIED', 'OPEN ON FINAL RELEASE'];
      const map = panelAt('systems-map', -1, { title: 'Systems map', big: 'HEAT EMERGENCY', tone: 'alert', y: 2.0 });
      // 20. The incident console: ALL GREEN, then the line that revokes it.
      const inc = panelAt('incident-console', 1, { title: 'Incident console', big: 'INCIDENT OPEN', tone: 'alert' });
      // 19. The rescue board: the window, the burst budget, the struck restart.
      const res = panelAt('rescue-board', -1, { title: 'Rescue board', big: HEADER(1), tone: 'alert' });
      const burst = slipAt('rescue-board', 'face', { dx: -0.4, y: 1.65, text: ['10 SECOND', 'BURST'], visible: false });
      const sendTags = ['WEATHER', 'POWER', 'RUNWAY', 'MEDICAL'].map((t, i) =>
        slipAt('rescue-board', 'face', { dx: -0.45 + i * 0.3, y: 1.3, w: 0.26, h: 0.18, text: [t, 'SEND'], visible: false, pin: 'clip' }));
      const local = ['PII', 'DEBUG'].map((t, i) =>
        slipAt('rescue-board', 'face', { dx: 0.25 + i * 0.3, y: 1.65, w: 0.26, h: 0.18, text: [t, 'LOCAL ONLY'], visible: false, pin: 'clip' }));
      const restart = slipAt('rescue-board', 'face', { dx: 0.4, y: 1.3, w: 0.36, h: 0.2, text: ['FULL RESTART'], struck: true, visible: false });
      // 16. The shift log: six records, every second one missing until mission 8.
      const records = [0, 1, 2, 3, 4, 5].map(i =>
        slipAt('shift-log-desk', 'top', { dx: -0.6 + i * 0.24, dz: 0.05, w: 0.2, h: 0.28, text: [String.fromCharCode(65 + i)], pin: false, tilt: (i % 2) * 0.1 }));
      hooks.push((state) => {
        const k = n(state);
        map?.set({ big: k === 0 ? 'HEAT EMERGENCY' : NEXT[k] ?? NEXT[15], tone: k >= 15 ? 'ok' : k >= 14 ? 'warn' : 'alert' });
        inc?.set(k >= 14 ? { big: 'LIVE STABLE / RECOVERY UNVERIFIED', tone: 'warn' }
          : k >= 13 ? { big: 'ALL GREEN', tone: 'ok' } : { big: 'INCIDENT OPEN', tone: 'alert' });
        res?.set({ big: HEADER(day(state)), tone: k >= 15 ? 'ok' : 'alert', small: k >= 14 ? 'MECHANISM VERIFIED' : '' });
        burst?.set({ visible: k >= 11 });
        sendTags.forEach(s => s?.set({ visible: k >= 12 }));
        local.forEach(s => s?.set({ visible: k >= 12 }));
        restart?.set({ visible: k >= 15 });
        records.forEach((r, i) => r?.set({ visible: k >= 8 || i % 2 === 0 }));
      });
      break;
    }
    case 'CODE': {
      // 12. The code review wall, which carries thirteen stops and the campaign's
      //     three best lines.
      const wall = panelAt('code-review-wall', -1, { title: 'Code review wall', big: 'SOURCE MIRROR', tone: 'plain', y: 2.0 });
      const pinned = slipAt('code-review-wall', 'face', { dx: -0.45, y: 1.75, w: 0.34, h: 0.2, text: ['A C D F'], visible: false });
      const order = slipAt('code-review-wall', 'face', { dx: 0.4, y: 1.75, w: 0.5, h: 0.24,
        text: ['STABLE PRIORITY ORDER:', 'WEATHER, POWER,', 'RUNWAY, MEDICAL'], visible: false });
      // 13. The version rack: two objects with two labels, then the shared arrow gone.
      const c17 = slipAt('version-rack', 'face', { dx: -0.4, y: 1.7, w: 0.34, h: 0.22, text: ['C17', 'SIMULATION OBJECT'], visible: false });
      const p02 = slipAt('version-rack', 'face', { dx: 0.4, y: 1.7, w: 0.34, h: 0.22, text: ['P02', 'LIVE OBJECT'], visible: false });
      const shared = slipAt('version-rack', 'face', { dx: 0, y: 1.72, w: 0.4, h: 0.2, text: ['SHARED STATE SUSPECT'], stamp: '', visible: false });
      const inst = slipAt('version-rack', 'face', { dx: 0, y: 1.72, w: 0.4, h: 0.2, text: ['INSTANCE STATE VERIFIED'], visible: false });
      // The test bench: EMPTY INPUT in the regression set, ALL GREEN, then the
      // held-out failure.
      const bench = panelAt('test-bench', 1, { title: 'Test bench', big: 'ISOLATED', tone: 'plain' });
      const empty = slipAt('test-bench', 'top', { dx: -0.5, w: 0.3, h: 0.2, text: ['EMPTY INPUT'], pin: false, visible: false });
      const build = panelAt('build-console', 1, { title: 'Build console', big: 'SIMULATION', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        wall?.set(k >= 14 ? { big: 'MECHANISM VERIFIED', tone: 'ok' }
          : k >= 13 ? { big: 'BASE CASE n==0 · PROGRESS n-1', tone: 'ok' }
          : k >= 10 ? { big: '3 → 5 → 4', tone: 'ok' }
          : k >= 6 ? { big: 'substring(11,16)', tone: 'ok' }
          : k >= 4 ? { big: 'normalizeState(...)', tone: 'warn', small: 'NOT GUARANTEED' }
          : { big: 'SOURCE MIRROR', tone: 'plain', small: '' });
        pinned?.set({ visible: k >= 8 });
        order?.set({ visible: k >= 12 });
        c17?.set({ visible: k >= 5 }); p02?.set({ visible: k >= 5 });
        shared?.set({ visible: k >= 10 && k < 11 }); inst?.set({ visible: k >= 11 });
        bench?.set(k >= 14 ? { big: 'HELD-OUT FAILURE — FORWARD ROLLBACK', tone: 'alert', small: 'BACKWARD 5/5' }
          : k >= 13 ? { big: 'ALL GREEN', tone: 'ok', small: '' }
          : k >= 4 ? { big: 'REGRESSION SET', tone: 'plain', small: 'EMPTY INPUT' } : { big: 'ISOLATED', tone: 'plain', small: '' });
        empty?.set({ visible: k >= 4 });
        build?.set(k >= 6 ? { big: 'PARSER VERIFIED', tone: 'ok' } : k >= 5 ? { big: 'live → P02', tone: 'ok' } : { big: 'SIMULATION', tone: 'plain' });
      });
      break;
    }
    case 'POWER': {
      // 8. The load board, red until mission 1 clears it.
      const load = panelAt('load-board', -1, { title: 'Load board', big: 'HEAT EMERGENCY', tone: 'alert', y: 2.0 });
      const gen = panelAt('generator-controller', 1, { title: 'Generator controller', big: 'HEAT EMERGENCY', tone: 'alert' });
      const pred = slipAt('load-board', 'face', { dx: 0.45, y: 1.3, w: 0.3, h: 0.18, text: ['PREDICTED 83.0%'], visible: false });
      hooks.push((state) => {
        const k = n(state);
        load?.set(k >= 14 ? { big: 'BACKWARD ROLLBACK', tone: 'ok', small: 'A C D F' }
          : k >= 1 ? { big: 'OUTPUT 83 kW / SOFTWARE ALARM CLEARED', tone: 'ok', small: '' }
          : { big: 'HEAT EMERGENCY', tone: 'alert', small: 'SOFTWARE VALUE = 0; PHYSICAL OUTPUT UNCHANGED' });
        gen?.set(k >= 11 ? { big: 'INSTANCE STATE VERIFIED', tone: 'ok' }
          : k >= 10 ? { big: 'SHARED STATE SUSPECT', tone: 'warn' }
          : k >= 5 ? { big: 'P02 PATCHED VIA LIVE REFERENCE', tone: 'ok' }
          : k >= 1 ? { big: 'OUTPUT 83 kW', tone: 'ok' } : { big: 'HEAT EMERGENCY', tone: 'alert' });
        pred?.set({ visible: k >= 1 });
      });
      break;
    }
    case 'HAB': {
      // 10. The alarm cabinet's command counter: 2, then 1.
      const alarm = panelAt('alarm-cabinet', 1, { title: 'Alarm cabinet', big: '2', small: 'DUPLICATE SENSOR?', tone: 'alert' });
      const scrub = panelAt('scrubber-console', -1, { title: 'Scrubber console', big: 'SHUTDOWN ×2', tone: 'alert', y: 2.0 });
      // 15. The sensor wall: four rooms, one of them wrong for one mission.
      const wall = panelAt('sensor-wall', 1, { title: 'Sensor wall', big: 'ROOMS 4–7', tone: 'plain', y: 2.0 });
      const probe = slipAt('sensor-probe-rack', 'face', { dx: 0, y: 1.6, w: 0.34, h: 0.2, text: ['ROOM 7', '20.9°C'], visible: false });
      const tag = slipAt('sensor-wall', 'face', { dx: 0.4, y: 1.3, w: 0.36, h: 0.2, text: ['VALUE FROM ROOM 6 /', 'INDEX SHIFT'], visible: false });
      hooks.push((state) => {
        const k = n(state);
        alarm?.set(k >= 2 ? { big: '1', small: 'CONTROL FLOW CONFIRMED', tone: 'ok' } : { big: '2', small: 'DUPLICATE SENSOR?', tone: 'alert' });
        scrub?.set(k >= 2 ? { big: 'ONE READING → ONE SELECTED ACTION', tone: 'ok' } : k >= 1 ? { big: 'SCRUBBER: 2 COMMANDS / 1 SENSOR', tone: 'alert' } : { big: 'SHUTDOWN ×2', tone: 'alert' });
        wall?.set(k >= 7 ? { big: 'ROOM 7 · 20.9°C', tone: 'ok', small: 'ROOM 6 · 4.1°C' }
          : k >= 6 ? { big: 'ROOM 7 · 4.1°C', tone: 'alert', small: 'independent local reading 20.9°C' }
          : { big: 'ROOMS 4–7', tone: 'plain', small: '' });
        probe?.set({ visible: k >= 6 });
        tag?.set({ visible: k >= 7 });
      });
      break;
    }
    case 'VEH': {
      // 11. Rover Three's status, on the cart and the planning board.
      const cart = panelAt('rover-diagnostic-cart', 1, { title: 'Rover Three', big: 'MARKER 3', tone: 'alert' });
      const plan = panelAt('route-planning-board', -1, { title: 'Route planning', big: 'MARKER 3', tone: 'alert', y: 2.0 });
      // 17. The route table: the crevasse one column out, then home.
      const table = panelAt('route-table', -1, { title: 'Route table', big: 'SURVEY GRID', tone: 'plain' });
      const idx = slipAt('route-planning-board', 'face', { dx: 0.4, y: 1.3, w: 0.28, h: 0.18, text: ['index++'], visible: false });
      hooks.push((state) => {
        const k = n(state);
        const rover = k >= 13 ? { big: 'ROVER RELAY', tone: 'ok', small: 'four-waypoint route' }
          : k >= 3 ? { big: 'HEALTHY / REPAIRED', tone: 'ok', small: '' }
          : k >= 2 ? { big: 'MARKER 3', tone: 'alert', small: 'repeating' } : { big: 'STANDBY', tone: 'plain', small: '' };
        cart?.set(rover); plan?.set(rover);
        idx?.set({ visible: k >= 3 });
        table?.set(k >= 9 ? { big: '[0][1] CREVASSE', tone: 'ok', small: 'row-major' }
          : k >= 8 ? { big: '[1][0] CREVASSE', tone: 'alert', small: 'survey says [0][1]' } : { big: 'SURVEY GRID', tone: 'plain', small: '' });
      });
      break;
    }
    case 'COMMS': {
      // 14. Two clocks a character apart, then agreeing; then the frequency lock.
      const packet = panelAt('packet-monitor', -1, { title: 'Packet monitor', big: 'LINK UP', tone: 'plain', y: 2.0 });
      const wallClock = panelAt('packet-monitor', 1, { title: 'Wall display', big: '--:--', tone: 'plain', y: 2.0 });
      const queue = panelAt('message-queue-board', 1, { title: 'Message queue', big: 'IDLE', tone: 'plain' });
      const mast = panelAt('weather-mast-console', -1, { title: 'Weather mast', big: 'MAST WEATHER AND ICING', tone: 'plain' });
      const link = panelAt('link-console', 1, { title: 'Link console', big: 'PRIMARY', tone: 'plain' });
      hooks.push((state) => {
        const k = n(state);
        packet?.set(k >= 10 ? { big: 'RESCUE 122.3 MHz', tone: 'ok', small: 'raw 08:07' }
          : k >= 5 ? { big: 'raw 08:07', tone: k >= 6 ? 'ok' : 'warn', small: k >= 6 ? 'TRANSPORT ON TIME' : 'DISPLAY MISMATCH DOWNSTREAM' }
          : { big: 'LINK UP', tone: 'plain', small: '' });
        wallClock?.set(k >= 6 ? { big: '08:07', tone: 'ok' } : k >= 5 ? { big: '08:0', tone: 'alert' } : { big: '--:--', tone: 'plain' });
        queue?.set(k >= 12 ? { big: 'FOUR-ITEM BURST ACKNOWLEDGED', tone: 'ok', small: '' }
          : k >= 10 ? { big: 'RESCUE 122.3 MHz', tone: 'ok', small: '3 → 5 → 4' }
          : k >= 9 ? { big: 'LINEAR: up to 1024 / BINARY: about 10', tone: 'warn', small: '1,024 sorted records' }
          : { big: 'IDLE', tone: 'plain', small: '' });
        mast?.set(k >= 15 ? { big: 'MAST WEATHER AND ICING', tone: 'ok' } : k >= 12 ? { big: 'PRIMARY ANTENNA ICING', tone: 'alert' } : { big: 'MAST WEATHER AND ICING', tone: 'plain' });
        link?.set(k >= 15 ? { big: 'CANARY COMMAND: PRIMARY + ROVER RELAY', tone: 'ok' } : k >= 13 ? { big: 'PRIMARY + ROVER RELAY', tone: 'ok' } : { big: 'PRIMARY', tone: 'plain' });
      });
      break;
    }
    case 'MESS': {
      // 26. Twenty-eight people wait it out: bunks, coats, a long table.
      const b = room.bounds;
      const blanket = mat('aster.blanket', () => new THREE.MeshStandardMaterial({ color: 0x5a3a2c, roughness: 0.95 }));
      const frame = MATERIALS.paintedSteel(0x8a9298);
      for(let i = 0; i < 6; i++){
        const z = b.z0 + 2.4 + i * 1.3;
        if(z > b.z1 - 1.2) break;
        for(const lvl of [0.45, 1.35]){
          box(group, 0.9, 0.12, 2.0, b.x0 + 1.1, lvl, z, frame);
          box(group, 0.86, 0.14, 1.9, b.x0 + 1.1, lvl + 0.13, z, blanket);
        }
        for(const dz of [-0.95, 0.95]) box(group, 0.06, 1.8, 0.06, b.x0 + 1.1 - 0.42, 0.9, z + dz, frame);
      }
      ctx.solid?.(b.x0 + 1.1, (b.z0 + b.z1) / 2, 1.0, 1.9, (b.z1 - b.z0) - 3);
      // Coats on hooks along the right wall.
      const coat = mat('aster.coat', () => new THREE.MeshStandardMaterial({ color: 0xb8452c, roughness: 0.9 }));
      for(let i = 0; i < 8; i++){
        const z = b.z0 + 2.0 + i * 0.7;
        if(z > b.z1 - 1.5) break;
        box(group, 0.14, 0.9, 0.45, b.x1 - 0.35, 1.35, z, coat);
      }
      break;
    }
    case 'MED': {
      // 27. What cold and bad air do: two occupied cots, an oxygen bottle, a
      //     temperature board.
      const b = room.bounds;
      const sheet = mat('aster.sheet', () => new THREE.MeshStandardMaterial({ color: 0xc9d2cf, roughness: 0.95 }));
      for(const z of [b.z0 + 2.6, b.z0 + 5.0]){
        if(z > b.z1 - 1) break;
        box(group, 0.95, 0.5, 2.0, b.x0 + 1.2, 0.25, z, MATERIALS.paintedSteel(0x8a9298));
        box(group, 0.9, 0.22, 1.9, b.x0 + 1.2, 0.6, z, sheet);
        box(group, 0.7, 0.28, 0.9, b.x0 + 1.2, 0.85, z - 0.2, sheet);   // somebody under it
        ctx.solid?.(b.x0 + 1.2, z, 0.6, 1.1, 2.2);
      }
      cyl(group, 0.14, 1.1, b.x1 - 0.8, 0.55, b.z0 + 3.0, MATERIALS.paintedSteel(0x2f6f5a));
      // The room-7 reading the habitat argues about, on the bay's own board.
      const board = statusPanel(group, { x: 0, y: 2.0, z: b.z1 - 0.1, rotY: Math.PI, w: 1.4, h: 0.8, title: 'Medical bay', big: 'ROOM 7', tone: 'plain', lit: true });
      hooks.push((state) => { const k = n(state); board.set(k >= 7 ? { big: 'ROOM 7 · 20.9°C', tone: 'ok' } : k >= 6 ? { big: 'ROOM 7 · 4.1°C', tone: 'alert' } : { big: 'ROOM 7', tone: 'plain' }); });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list: the bible's own setting line is "Aster Station,
// Antarctica, during polar night", and the station was lit like a June
// afternoon. `theme.js` now runs a five-hour window of low sun and a long dark;
// this is what the dark has in it.
export function storyExtras(scene, ctx){
  const { groundHeight, stateHooks, animate, colliders } = ctx;
  const at = (x, z) => groundHeight(x, z);

  // Aurora: three tall curtains far out over the plateau, additive, unlit, that
  // ripple slowly and are only there when the sky is dark.
  {
    const c = document.createElement('canvas'); c.width = 64; c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(120,255,170,0)'); grad.addColorStop(0.25, 'rgba(120,255,170,0.55)');
    grad.addColorStop(0.55, 'rgba(90,200,255,0.35)'); grad.addColorStop(0.8, 'rgba(180,80,220,0.18)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 256);
    for(let i = 0; i < 64; i += 3){ g.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.08})`; g.fillRect(i, 0, 1, 256); }
    const tex = new THREE.CanvasTexture(c); tex.wrapS = THREE.RepeatWrapping;
    const curtains = [];
    for(const [x, z, w, yaw] of [[-120, -420, 520, 0.3], [260, -300, 420, -0.9], [-380, 120, 380, 1.4]]){
      const t = tex.clone(); t.needsUpdate = true; t.repeat.set(w / 40, 1);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 110, 24, 1),
        new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
      m.position.set(x, 150, z); m.rotation.y = yaw;
      m.userData.ignoreAudit = true; scene.add(m);
      curtains.push(m);
      animate?.(scrollUV(t, 0.02, 0));
      const pos = m.geometry.attributes.position;
      const base = Float32Array.from(pos.array);
      animate?.((tt) => {
        for(let i = 0; i < pos.count; i++){ pos.array[i * 3 + 2] = base[i * 3 + 2] + Math.sin(tt * 0.4 + base[i * 3] * 0.02) * 12; }
        pos.needsUpdate = true;
      });
    }
    let target = 0;
    stateHooks?.push((state) => {
      const h = ((state?.timeHours ?? 12) % 24 + 24) % 24;
      target = (h < 8 || h > 17.5) ? 0.85 : 0;
    });
    animate?.((t, dt) => { for(const m of curtains) m.material.opacity += (target - m.material.opacity) * Math.min(1, dt * 0.4); });
  }

  // Runway Control: a hut by the runway gate with a rotating beacon on its roof,
  // which is the one light a pilot looks for. The hut is in site.js; the beacon
  // is here because it turns.
  {
    const x = -72, z = 40, y = at(x, z) + 4.2;
    cyl(scene, 0.18, 1.2, x, y + 0.6, z, STEEL());
    const head = new THREE.Group(); head.position.set(x, y + 1.35, z); scene.add(head);
    for(const [s, c] of [[1, 0xffffff], [-1, 0xff3030]]){
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.2), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 2.4 }));
      l.position.set(s * 0.25, 0, 0); head.add(l);
    }
    animate?.(spin(head, 'y', 2.2));
    // Its beam, two thin additive planes turning with the head.
    for(const s of [1, -1]){
      const beam = new THREE.Mesh(new THREE.PlaneGeometry(60, 1.4), new THREE.MeshBasicMaterial({ color: s > 0 ? 0xffffff : 0xff6060, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
      beam.geometry.translate(s * 30, 0, 0); head.add(beam);
    }
    solid(colliders, x, z, at(x, z), 4.2, 4.5);
  }
}
