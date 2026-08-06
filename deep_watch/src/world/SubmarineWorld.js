import * as THREE from 'three';
import { ProceduralProps } from '../graphics/ProceduralProps.js';
import { BilgeVisuals } from './BilgeVisuals.js';
import { VALVES } from '../simulation/FloodingSystem.js';

/**
 * SubmarineWorld — builds the one persistent boat: a single-deck interior running
 * bow (z=0) to stern (+z), divided into named compartments by bulkheads with
 * central hatches. Each compartment is furnished with recognizable props so the
 * player can navigate and identify spaces (not empty labeled boxes).
 *
 * The layout is data (LAYOUT) so the CompartmentManager, map, and missions share
 * one description of the boat. Station anchors and instrument pickups are recorded
 * as `interactables` for the InteractionSystem.
 */

export const HALF_W = 2.25;    // interior half-width (X)
export const CEIL = 2.45;      // ceiling height
const HATCH_HALF = 0.55;       // half-width of a hatch opening
const HATCH_H = 1.95;

// Fore-to-aft compartment plan. `len` metres along Z; zStart/zEnd filled in below.
export const LAYOUT = (() => {
  const plan = [
    { id: 'forward_equipment', name: 'Forward Equipment & Handling', len: 6.5, color: '#7a5a3a', section: 'Forward' },
    { id: 'sonar_electronics', name: 'Sonar-Array Electronics', len: 4.0, color: '#3a6a7a', section: 'Forward' },
    { id: 'sonar_room',        name: 'Sonar Room',               len: 5.5, color: '#2f8f8f', section: 'Operations' },
    { id: 'control_room',      name: 'Control Room',             len: 7.5, color: '#3f7fb6', section: 'Operations' },
    { id: 'radio_room',        name: 'Radio & Communications',   len: 3.5, color: '#6a5fb0', section: 'Operations' },
    { id: 'berthing_mess',     name: 'Berthing, Mess & Medical', len: 6.0, color: '#8a6a4a', section: 'Crew' },
    { id: 'machinery_control', name: 'Machinery Control Room',   len: 5.5, color: '#b0863a', section: 'Engineering' },
    { id: 'propulsion',        name: 'Propulsion Machinery',     len: 6.5, color: '#b0533a', section: 'Engineering' },
    { id: 'electrical',        name: 'Electrical Distribution',  len: 5.0, color: '#b0a03a', section: 'Engineering' },
    { id: 'auxiliary',         name: 'Auxiliary Machinery & Bilge', len: 5.5, color: '#6a8a4a', section: 'Engineering' },
  ];
  let z = 0;
  for (const c of plan) { c.zStart = z; c.zEnd = z + c.len; c.zMid = z + c.len / 2; z += c.len; }
  return plan;
})();

export const BOAT_LENGTH = LAYOUT[LAYOUT.length - 1].zEnd;

/**
 * Openings cut in the deck for bilge access. The deck plate over each opening is
 * a separate liftable lid, so removing it exposes a real recess below the deck
 * rather than swapping a texture.
 */
const FWD = LAYOUT.find((c) => c.id === 'forward_equipment');
const AUX = LAYOUT.find((c) => c.id === 'auxiliary');
export const DECK_OPENINGS = [
  { id: 'deckplate_fwd', compartment: 'forward_equipment', bilge: 'forward_equipment',
    x1: 0.55, x2: 1.75, z1: FWD.zStart + 3.6, z2: FWD.zStart + 5.0 },
  { id: 'deckplate_aft', compartment: 'auxiliary', bilge: 'auxiliary',
    x1: 0.15, x2: 1.45, z1: AUX.zEnd - 1.9, z2: AUX.zEnd - 0.5 },
];

/** Subtract rect `h` from rect `r`, returning the surviving pieces (0–4 rects). */
function subtractRect(r, h) {
  if (h.x2 <= r.x1 || h.x1 >= r.x2 || h.z2 <= r.z1 || h.z1 >= r.z2) return [r];
  const out = [];
  if (h.z1 > r.z1) out.push({ x1: r.x1, x2: r.x2, z1: r.z1, z2: h.z1 });
  if (h.z2 < r.z2) out.push({ x1: r.x1, x2: r.x2, z1: h.z2, z2: r.z2 });
  const zTop = Math.max(r.z1, h.z1), zBot = Math.min(r.z2, h.z2);
  if (h.x1 > r.x1) out.push({ x1: r.x1, x2: h.x1, z1: zTop, z2: zBot });
  if (h.x2 < r.x2) out.push({ x1: h.x2, x2: r.x2, z1: zTop, z2: zBot });
  return out;
}

export class SubmarineWorld {
  constructor({ scene, materials, collision, lighting, eventBus, settings }) {
    this.scene = scene;
    this.mat = materials;
    this.collision = collision;
    this.lighting = lighting;
    this.bus = eventBus;
    this.settings = settings;
    this.props = new ProceduralProps(materials);
    this.root = new THREE.Group();
    this.root.name = 'SubmarineWorld';
    scene.add(this.root);

    this.interactables = [];  // { object, type, id, prompt, data }
    this.hatches = [];        // { id, z, doorMesh, segIds, open }
    this.bilges = new Map();  // compartmentId -> BilgeVisuals
    this.fireSeats = new Map(); // seatId -> { group, ember }
    this.debris = new Map();    // compartmentId -> { group, segId, z }
  }

  build(state) {
    this.state = state;
    this._buildShell();
    this._buildBulkheadsAndHatches();
    this._buildBilgeAccess();
    this._furnishCompartments();
    return { layout: LAYOUT, interactables: this.interactables };
  }

  // ---- Hull shell: floor, ceiling, curved-ish side walls, end caps ----
  _buildShell() {
    const L = BOAT_LENGTH;

    // Deck, cut around the bilge openings so the recesses below are really visible.
    let rects = [{ x1: -HALF_W, x2: HALF_W, z1: 0, z2: L }];
    for (const h of DECK_OPENINGS) rects = rects.flatMap((r) => subtractRect(r, h));
    for (const r of rects) {
      const w = r.x2 - r.x1, d = r.z2 - r.z1;
      if (w <= 0.001 || d <= 0.001) continue;
      const piece = new THREE.Mesh(new THREE.PlaneGeometry(w, d), this.mat.deckPlate());
      piece.rotation.x = -Math.PI / 2;
      piece.position.set((r.x1 + r.x2) / 2, 0, (r.z1 + r.z2) / 2);
      piece.receiveShadow = true;
      this.root.add(piece);
    }

    // Ceiling.
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HALF_W * 2, L), this.mat.ceiling());
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, CEIL, L / 2);
    this.root.add(ceil);

    // Side walls (long boxes, slightly angled top to suggest a hull curve).
    for (const sx of [-1, 1]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.2, CEIL, L), this.mat.hullSteel());
      wall.position.set(sx * HALF_W, CEIL / 2, L / 2);
      wall.receiveShadow = true;
      this.root.add(wall);
      // A curved overhead fillet strip to soften the box look.
      const fillet = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, L), this.mat.hullSteel());
      fillet.position.set(sx * (HALF_W - 0.2), CEIL - 0.15, L / 2);
      fillet.rotation.z = sx * Math.PI / 4;
      this.root.add(fillet);
      this.collision.addSegment(sx * HALF_W, 0, sx * HALF_W, L, `side_${sx}`);
    }

    // End caps (bow & stern) — domed look via a flattened sphere.
    for (const [z, name] of [[0, 'bow'], [L, 'stern']]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(HALF_W * 2, CEIL, 0.3), this.mat.hullSteel());
      cap.position.set(0, CEIL / 2, z + (name === 'bow' ? -0.15 : 0.15));
      this.root.add(cap);
      this.collision.addSegment(-HALF_W, z, HALF_W, z, `cap_${name}`);
    }

    // Overhead pipe & cable runs the length of the boat (reused pipe kit).
    for (const [x, col] of [[-1.6, 0x6f7a54], [-1.2, 0x8a8a8a], [1.5, 0x557a6f], [1.1, 0x555f43]]) {
      const run = this.props.pipeRun({ length: L - 1, axis: 'z', radius: 0.05, colorHex: col });
      run.position.set(x, CEIL - 0.25 - Math.random() * 0.15, L / 2);
      this.root.add(run);
    }
  }

  // ---- Bulkheads between compartments, each with a central hatch ----
  _buildBulkheadsAndHatches() {
    for (let i = 0; i < LAYOUT.length - 1; i++) {
      const z = LAYOUT[i].zEnd;
      // Two wall panels leaving a central hatch gap.
      for (const side of [-1, 1]) {
        const innerX = side * HATCH_HALF;
        const outerX = side * HALF_W;
        const w = Math.abs(outerX - innerX);
        const panel = new THREE.Mesh(new THREE.BoxGeometry(w, CEIL, 0.18), this.mat.paintedBulkhead());
        panel.position.set((innerX + outerX) / 2, CEIL / 2, z);
        panel.castShadow = true; panel.receiveShadow = true;
        this.root.add(panel);
        this.collision.addSegment(innerX, z, outerX, z, `blk_${i}_${side}`);
      }
      // Header above the hatch.
      const header = new THREE.Mesh(new THREE.BoxGeometry(HATCH_HALF * 2, CEIL - HATCH_H, 0.18), this.mat.paintedBulkhead());
      header.position.set(0, HATCH_H + (CEIL - HATCH_H) / 2, z);
      this.root.add(header);

      // Hatch frame (oval-ish ring) + swing door (starts open, folded to the side).
      const frame = new THREE.Mesh(
        new THREE.TorusGeometry(0.62, 0.06, 8, 20),
        this.mat.brass());
      frame.scale.set(1, HATCH_H / 1.24, 1);
      frame.position.set(0, HATCH_H / 2, z);
      this.root.add(frame);

      const door = new THREE.Mesh(new THREE.BoxGeometry(HATCH_HALF * 2, HATCH_H, 0.06), this.mat.cabinetGrey());
      // Open state: rotate door to lie along the bulkhead (out of the passage).
      door.position.set(HATCH_HALF, HATCH_H / 2, z + 0.12);
      door.rotation.y = -Math.PI / 2 * 0.92;
      this.root.add(door);

      // Hatch wheel — the interactable that opens/closes the hatch.
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 8, 16), this.mat.valveRed());
      wheel.position.set(0.0, 1.05, z + 0.1);
      this.root.add(wheel);

      const hatch = {
        id: `hatch_${i}`,
        z,
        door,
        wheel,
        segId: `hatchseg_${i}`,
        open: true,
        between: [LAYOUT[i].id, LAYOUT[i + 1].id],
      };
      // Collision segment for the closed door (inactive while open).
      const seg = this.collision.addSegment(-HATCH_HALF, z, HATCH_HALF, z, hatch.segId);
      seg.active = false;
      this.hatches.push(hatch);

      this.interactables.push({
        object: wheel,
        type: 'hatch',
        id: hatch.id,
        prompt: 'Operate hatch',
        data: hatch,
      });

      // Compartment sign hanging on the header.
      const sign = this.props.sign(LAYOUT[i + 1].name.split(' ')[0]);
      sign.position.set(0, HATCH_H + 0.22, z + 0.11);
      this.root.add(sign);
    }
  }

  setHatch(hatchId, open) {
    const h = this.hatches.find((x) => x.id === hatchId);
    if (!h) return;
    h.open = open;
    this.collision.setSegmentActive(h.segId, !open);
    // Animate door: open → folded aside; closed → across the passage.
    h.door.rotation.y = open ? -Math.PI / 2 * 0.92 : 0;
    h.door.position.x = open ? HATCH_HALF : 0;
    h.door.position.z = h.z + (open ? 0.12 : 0);
    this.bus.emit('hatch:changed', { id: hatchId, open });
  }

  // ---- Bilge access: recess, water, liftable deck plate, rupture, sump ----
  _buildBilgeAccess() {
    for (const opening of DECK_OPENINGS) {
      const bilge = new BilgeVisuals({
        parent: this.root, materials: this.mat, hole: opening,
        compartment: opening.bilge, state: this.state,
      });
      this.bilges.set(opening.bilge, bilge);
      for (const lip of bilge.lips) this.collision.addBoxFromObject(lip, 0.02);

      const w = opening.x2 - opening.x1, d = opening.z2 - opening.z1;
      const cx = (opening.x1 + opening.x2) / 2, cz = (opening.z1 + opening.z2) / 2;

      // The liftable plate itself.
      const plate = new THREE.Mesh(new THREE.BoxGeometry(w + 0.14, 0.05, d + 0.14), this.mat.deckPlate());
      plate.position.set(cx, 0.055, cz);
      plate.castShadow = true;
      this.root.add(plate);
      // Two lifting-ring handles so it reads as removable.
      for (const dz of [-d * 0.3, d * 0.3]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.014, 6, 12), this.mat.brass());
        ring.position.set(cx, 0.09, cz + dz);
        ring.rotation.x = Math.PI / 2;
        this.root.add(ring);
        plate.userData.rings = plate.userData.rings || [];
        plate.userData.rings.push(ring);
      }

      const record = {
        object: plate, type: 'deckplate', id: opening.id,
        prompt: () => (record.data.open ? 'Replace deck plate' : 'Lift deck plate'),
        data: { compartment: opening.compartment, bilge: opening.bilge, open: false, home: plate.position.clone(), opening },
      };
      this.interactables.push(record);
      bilge.plateRecord = record;

      if (opening.bilge !== 'forward_equipment') continue;

      // The failure point — only reachable once the plate is off.
      this.interactables.push({
        object: bilge.collar, type: 'rupture', id: 'rupture_fwd_sw',
        prompt: 'Work on the ruptured line',
        data: { sourceId: 'fwd_sw_rupture', compartment: opening.compartment },
      });

      // The sump the portable pump's suction goes into.
      const sump = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), this.mat.panelDark());
      sump.position.set(cx + 0.28, -0.96, cz - 0.2);
      this.root.add(sump);
      this.interactables.push({
        object: sump, type: 'sump', id: 'sump_fwd',
        prompt: 'Set portable pump suction',
        data: { compartment: opening.compartment },
      });
    }
  }

  /** Lift or replace a deck plate. */
  setDeckPlate(id, open) {
    const rec = this.interactables.find((r) => r.type === 'deckplate' && r.id === id);
    if (!rec) return;
    rec.data.open = open;
    const home = rec.data.home;
    const o = rec.data.opening;
    const w = o.x2 - o.x1;
    if (open) {
      // Laid flat on the deck beside the opening, where you actually put it.
      rec.object.position.set(home.x - w * 0.5 - 0.5, 0.04, home.z);
      rec.object.rotation.z = 0.04;
    } else {
      rec.object.position.copy(home);
      rec.object.rotation.z = 0;
    }
    for (const ring of rec.object.userData.rings || []) ring.visible = !open;
    this.bus.emit('deckplate:changed', { id, open, bilge: o.bilge });
  }

  /** Per-frame animation of the bilge water/jets. */
  update(dt, t) {
    for (const b of this.bilges.values()) b.update(dt, t);
  }

  // ---- Per-compartment furnishing + lights + station anchors ----
  _furnishCompartments() {
    for (const c of LAYOUT) {
      // One pooled light per compartment.
      this.lighting.addCompartmentLight(c.id, 0, CEIL - 0.15, c.zMid);
      // Deck matting accent so compartments read differently — cut around any
      // bilge opening in this compartment, or it would lie over the hole and the
      // recess below would be invisible.
      let matRects = [{ x1: -HALF_W * 0.8, x2: HALF_W * 0.8, z1: c.zStart + 0.3, z2: c.zEnd - 0.3 }];
      for (const h of DECK_OPENINGS) matRects = matRects.flatMap((r) => subtractRect(r, h));
      for (const r of matRects) {
        const w = r.x2 - r.x1, d = r.z2 - r.z1;
        if (w <= 0.02 || d <= 0.02) continue;
        const mat = new THREE.Mesh(new THREE.PlaneGeometry(w, d),
          this.mat.emissive(new THREE.Color(c.color).getHex(), 0.02));
        mat.rotation.x = -Math.PI / 2;
        mat.position.set((r.x1 + r.x2) / 2, 0.01, (r.z1 + r.z2) / 2);
        this.root.add(mat);
      }

      // Every compartment gets the two fittings a casualty needs: somewhere to
      // plug a mask in, and a hose to cool a bulkhead from the cool side. They are
      // low-profile and go on the port side, clear of the display bays.
      this._placeEabManifold(`eab_${c.id}`, c, -HALF_W + 0.22, 1.5, c.zStart + 0.85, Math.PI / 2);
      this._placeHoseReel(`hose_${c.id}`, c, -HALF_W + 0.28, 1.05, c.zEnd - 0.75, Math.PI / 2);
      this._placeDamper(`damper_${c.id}`, c, HALF_W - 0.24, 1.85, c.zStart + 0.8, -Math.PI / 2);

      const build = this[`_furnish_${c.id}`];
      if (build) build.call(this, c);
    }
  }

  _placeStation(c, type, name, x, z, screenColor) {
    const console = this.props.console({ screen: screenColor, label: name });
    console.position.set(x, 0, z);
    console.rotation.y = x > 0 ? -Math.PI / 2 : (x < 0 ? Math.PI / 2 : 0);
    this.root.add(console);
    this.collision.addBoxFromObject(console, 0.1, `station_${type}`);
    this.interactables.push({
      object: console,
      type: 'station',
      id: type,
      prompt: `Man ${name}`,
      data: { station: type, name, compartment: c.id },
    });
    return console;
  }

  _placeInstrumentPickup(c, instrumentId, name, color, x, z) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.3), this.mat.cabinetGrey());
    shelf.position.set(x, 1.0, z);
    shelf.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    this.root.add(shelf);
    const pickup = this.props.instrumentPickup(color);
    pickup.position.set(x, 1.06, z);
    this.root.add(pickup);
    this.interactables.push({
      object: pickup,
      type: 'instrument',
      id: instrumentId,
      prompt: `Take ${name}`,
      data: { instrumentId, name },
    });
  }

  _placeLocker(c, x, z, label = 'DC LOCKER', contents = null) {
    const locker = this.props.dcLocker(label);
    locker.position.set(x, 0, z);
    locker.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    this.root.add(locker);
    this.collision.addBoxFromObject(locker, 0.05);
    // Stable id keyed on the stowage, so missions and the hint beacon can name a
    // specific locker without depending on where it happens to sit.
    this.interactables.push({
      object: locker, type: 'locker', id: `locker_${contents || c.id}`,
      prompt: 'Open DC locker', data: { compartment: c.id, label, contents },
    });
  }

  /** One hand-operated valve on a manifold; each is separately interactable. */
  _placeValve(valveId, x, y, z, rotY = -Math.PI / 2) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), this.mat.pipe(0x555f43));
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.028, 8, 16), this.mat.valveRed());
    wheel.position.y = 0.14;
    wheel.rotation.x = Math.PI / 2;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 6), this.mat.brass());
    stem.position.y = 0.09;
    const tag = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.11),
      this.mat.labelMaterial(valveId.replace(/_/g, ' ').toUpperCase().slice(0, 22), { bg: '#20282c', fg: '#e6d7a8' }));
    tag.position.set(0, -0.16, 0.1);
    g.add(body, wheel, stem, tag);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    const record = {
      object: g, type: 'valve', id: valveId,
      prompt: () => `${this.state?.valveStates?.[valveId] === 'shut' ? 'Open' : 'Shut'} ${VALVES[valveId]?.label ?? valveId}`,
      data: { valveId, wheel },
    };
    this.interactables.push(record);
    return g;
  }

  /** A local power/lighting panel with a main breaker handle. */
  _placePanel(panelId, name, x, y, z, rotY = Math.PI / 2) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.2), this.mat.cabinetGrey()));
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.6, 0.03), this.mat.panelDark());
    face.position.z = 0.11;
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.06), this.mat.emissive(0x6bbf73, 0.9));
    handle.position.set(0, -0.1, 0.15);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.1), this.mat.labelMaterial(name, { bg: '#2a2118', fg: '#f0d9a2' }));
    label.position.set(0, 0.22, 0.13);
    g.add(face, handle, label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'panel', id: panelId,
      prompt: () => (this.state?.electricalPanels?.[panelId]?.energized ? 'De-energize panel' : 'Energize panel'),
      data: { panelId, handle },
    });
    return g;
  }

  /** An announcing-circuit handset — how a casualty gets reported to Control. */
  _placeHandset(id, x, y, z, rotY = -Math.PI / 2) {
    const g = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.12), this.mat.panelDark());
    const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.2, 0.08), this.mat.cabinetGrey());
    cradle.position.set(0, 0, 0.09);
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.01), this.mat.emissive(0xd8a24a, 1.4));
    led.position.set(0.07, 0.11, 0.07);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.06), this.mat.labelMaterial('7MC', { bg: '#1a2228', fg: '#cfe0e6' }));
    label.position.set(0, -0.12, 0.07);
    g.add(box, cradle, led, label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'comms', id, prompt: 'Report on the 7MC', data: { circuit: '7MC' },
    });
    return g;
  }

  /**
   * A cable-run junction box: ordinary equipment most of the time, and the seat of
   * an electrical fire when a mission puts one there. It is always present and
   * always interactable, so the compartment does not suddenly grow a new object
   * the moment something goes wrong.
   */
  _placeFireSeat(id, c, x, y, z, rotY = Math.PI / 2) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.44, 0.24), this.mat.cabinetGrey()));
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.36, 0.03), this.mat.panelDark());
    face.position.z = 0.13;
    const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), this.mat.pipe(0x6a6a6a));
    conduit.position.set(0, 0.62, 0.02);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.09),
      this.mat.labelMaterial('CABLE RUN 2F-J', { bg: '#2a2118', fg: '#f0d9a2' }));
    label.position.set(0, -0.16, 0.15);
    // The glow only means anything once something is burning behind it.
    const ember = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.26), this.mat.emissive(0xd1594e, 2.2));
    ember.position.set(0, 0.02, 0.155);
    ember.visible = false;
    g.add(face, conduit, label, ember);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.fireSeats.set(id, { group: g, ember });
    this.interactables.push({
      object: g, type: 'fire_seat', id,
      prompt: 'Fight the fire at this seat',
      data: { compartment: c.id, seat: 'cable run 2F-J' },
    });
    return g;
  }

  /** An emergency-air manifold: where you plug a mask in. */
  _placeEabManifold(id, c, x, y, z, rotY = -Math.PI / 2) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.14), this.mat.pipe(0x2f8f8f)));
    for (const dx of [-0.07, 0.07]) {
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.12, 6), this.mat.brass());
      nozzle.position.set(dx, -0.13, 0.02);
      g.add(nozzle);
    }
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.07), this.mat.labelMaterial('EAB', { bg: '#12333a', fg: '#bfe9ee' }));
    label.position.set(0, 0.16, 0.08);
    g.add(label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'eab_manifold', id,
      prompt: () => (this.state?.playerOnAir ? 'Come off air' : 'Plug in and go on air'),
      data: { compartment: c.id },
    });
    return g;
  }

  /** A firemain hose reel — used for boundary cooling from the cool side. */
  _placeHoseReel(id, c, x, y, z, rotY = -Math.PI / 2) {
    const g = new THREE.Group();
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12), this.mat.pipe(0xb0433a));
    drum.rotation.z = Math.PI / 2;
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.3), this.mat.cabinetGrey());
    bracket.position.x = -0.12;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.08), this.mat.labelMaterial('FIREMAIN', { bg: '#2a1818', fg: '#f0c0b0' }));
    label.position.set(0, -0.3, 0.02);
    g.add(drum, bracket, label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'hose_reel', id,
      prompt: 'Run a hose on the bulkhead (boundary cooling)',
      data: { compartment: c.id },
    });
    return g;
  }

  /** A ventilation damper: the thing that decides whether air reaches a space. */
  _placeDamper(id, c, x, y, z, rotY = -Math.PI / 2) {
    const g = new THREE.Group();
    const duct = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.32, 0.22), this.mat.pipe(0x5a6a72));
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.05), this.mat.emissive(0x6bbf73, 0.9));
    handle.position.set(0.1, 0, 0.14);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.08), this.mat.labelMaterial('VENT DAMPER', { bg: '#20282c', fg: '#cfe0e6' }));
    label.position.set(0, -0.22, 0.12);
    g.add(duct, handle, label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'damper', id,
      prompt: () => (this.state?.ventDampers?.[c.id] === 'shut' ? 'Open the vent damper' : 'Shut the vent damper'),
      data: { compartment: c.id },
    });
    return g;
  }

  /**
   * Stores that have come adrift and blocked a passage. Built once, hidden until a
   * mission needs it — and when it is there it is a real collider, so "blocked"
   * means the player genuinely cannot get past rather than being told not to.
   */
  _placeDebris(id, c, z) {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const crate = new THREE.Mesh(
        new THREE.BoxGeometry(0.5 + (i % 3) * 0.15, 0.42, 0.44),
        this.mat.pipe(i % 2 ? 0x6a5a3a : 0x54604a));
      crate.position.set(-0.7 + (i % 3) * 0.62, 0.22 + Math.floor(i / 3) * 0.44, (i % 2) * 0.18);
      crate.rotation.y = (i - 2) * 0.16;
      g.add(crate);
    }
    const strap = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.06), this.mat.valveRed());
    strap.position.set(0, 0.52, 0.2);
    g.add(strap);
    g.position.set(0, 0, z);
    g.visible = false;
    this.root.add(g);
    this.debris.set(c.id, { group: g, segId: `debris_${c.id}`, z });
    this.collision.addSegment(-HATCH_HALF - 0.6, z, HATCH_HALF + 0.6, z, `debris_${c.id}`).active = false;
    this.interactables.push({
      object: g, type: 'debris', id,
      prompt: 'Shift the stores blocking the passage',
      data: { compartment: c.id },
    });
    return g;
  }

  /** Block or clear a compartment's passage. */
  setPassageBlocked(compartmentId, blocked) {
    const d = this.debris.get(compartmentId);
    if (!d) return false;
    d.group.visible = blocked;
    this.collision.setSegmentActive(d.segId, blocked);
    this.bus.emit('world:passage', { compartment: compartmentId, blocked });
    return true;
  }

  /** A wall-mounted board that opens a station overlay (e.g. the DC plotting board). */
  _placeWallStation(stationId, name, x, y, z, rotY = Math.PI / 2, screen = 0x123b40) {
    const g = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.85, 0.07), this.mat.cabinetGrey());
    const face = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.75, 0.02), this.mat.screenGlass(screen));
    face.position.z = 0.05;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.13), this.mat.labelMaterial(name, { bg: '#20282c', fg: '#cfe0e6' }));
    label.position.set(0, 0.5, 0.05);
    g.add(board, face, label);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.root.add(g);
    this.interactables.push({
      object: g, type: 'station', id: stationId,
      prompt: `Use ${name}`, data: { station: stationId, name },
    });
    return g;
  }

  _furnish_forward_equipment(c) {
    // Equipment racks along the port side (clear of the bilge opening aft of them).
    for (let i = 0; i < 3; i++) {
      const rack = this.props.equipmentRack({ screen: 0x1c6b52 });
      rack.position.set(-HALF_W + 0.45, 0, c.zStart + 1.0 + i * 1.2);
      this.root.add(rack);
      this.collision.addBoxFromObject(rack, 0.05);
    }
    const hyd = this.props.machineryHousing({ length: 1.6, radius: 0.4, colorHex: 0x5a5545 });
    hyd.position.set(HALF_W - 0.7, 0.55, c.zStart + 1.6);
    hyd.rotation.y = Math.PI / 2;
    this.root.add(hyd);
    this.collision.addBoxFromObject(hyd, 0.05);

    // The forward seawater manifold: five separately-operable valves on the
    // starboard side, each with its own tag. The two SUPPLY valves bound the
    // branch that runs under the deck plates.
    const manZ = c.zStart + 4.3;
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 2.5), this.mat.pipe(0x555f43));
    block.position.set(HALF_W - 0.32, 1.16, manZ);
    this.root.add(block);
    const risers = this.props.pipeRun({ length: 1.5, axis: 'z', radius: 0.07, colorHex: 0x4b6470 });
    risers.position.set(HALF_W - 0.32, 0.4, manZ);
    risers.rotation.z = Math.PI / 2;
    this.root.add(risers);

    const valveZ = {
      fwd_sw_supply_inbd: manZ - 1.0,
      fwd_sw_supply_outbd: manZ - 0.5,
      sonar_cooling_supply: manZ,
      trim_drain: manZ + 0.5,
      sw_crossconnect: manZ + 1.0,
    };
    for (const [id, z] of Object.entries(valveZ)) {
      this._placeValve(id, HALF_W - 0.42, 1.28, z);
    }

    // Forward power panel — sits low on the port bulkhead, in the water's way.
    this._placePanel('fwd_power_2f', 'FWD PWR 2F', -HALF_W + 0.32, 1.15, c.zStart + 4.9);

    // Announcing-circuit handset by the aft hatch: how you report a casualty.
    this._placeHandset('handset_fwd', -HALF_W + 0.3, 1.45, c.zEnd - 1.9);

    // The damage-control plotting board (the estimation station).
    this._placeWallStation('dc_board', 'DC PLOTTING BOARD', HALF_W - 0.3, 1.55, c.zEnd - 1.5, -Math.PI / 2, 0x1a3a2a);

    this._placeLocker(c, HALF_W - 0.25, c.zEnd - 0.6, 'DC LOCKER 1', 'forward');
    this._placeLocker(c, -HALF_W + 0.25, c.zEnd - 0.6, 'ESCAPE TRUNK', 'escape');
  }

  _furnish_sonar_electronics(c) {
    // This is the smallest compartment on the boat (4 m) and it used to have four
    // 1.9 m cabinets and a full-length cooling run at panel height, which left
    // nowhere a mimic panel could be seen from. The cabinets now sit forward and
    // the run stops short, keeping the after starboard bulkhead clear as a
    // display bay. Same equipment, arranged so the space can be read.
    const rackSpots = [[-1, 0.75], [-1, 1.6], [-1, 2.45], [1, 0.75]];
    for (const [side, dz] of rackSpots) {
      const rack = this.props.equipmentRack({ screen: 0x2f6f8f, h: 1.9 });
      rack.position.set(side * (HALF_W - 0.45), 0, c.zStart + dz);
      rack.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.root.add(rack);
      this.collision.addBoxFromObject(rack, 0.05);
    }
    // Cooling loop pipe with valve — forward half only, clear of the display bay.
    const coolLen = 1.7;
    const cool = this.props.pipeRun({ length: coolLen, axis: 'z', colorHex: 0x3a6a7a, valveAt: 0 });
    cool.position.set(HALF_W - 0.25, 1.6, c.zStart + 0.3 + coolLen / 2);
    this.root.add(cool);
    this._placeInstrumentPickup(c, 'ir_thermometer', 'IR Thermometer', 0xd1594e, HALF_W - 0.3, c.zEnd - 1.0);
  }

  _furnish_sonar_room(c) {
    // Three sonar consoles: broadband waterfall, narrowband, bearing-time history.
    this._placeStation(c, 'sonar', 'Sonar Broadband', -HALF_W + 0.5, c.zStart + 1.6, 0x0e5a3a);
    this._placeStation(c, 'sonar', 'Sonar Narrowband', -HALF_W + 0.5, c.zStart + 3.4, 0x0e3a5a);
    this._placeStation(c, 'sonar', 'Bearing-Time History', HALF_W - 0.5, c.zStart + 2.5, 0x0e4a5a);
    // Own-ship noise reference cabinet.
    const ref = this.props.equipmentRack({ screen: 0x2f8f8f });
    ref.position.set(HALF_W - 0.45, 0, c.zEnd - 1.0);
    ref.rotation.y = -Math.PI / 2;
    this.root.add(ref);
    this.collision.addBoxFromObject(ref, 0.05);
    this._placeInstrumentPickup(c, 'flashlight', 'Flashlight', 0xdfe8ee, -HALF_W + 0.3, c.zEnd - 0.8);
  }

  _furnish_control_room(c) {
    // Helm + depth control forward, command plot center, nav table on stbd.
    this._placeStation(c, 'control', 'Helm & Depth Control', -HALF_W + 0.5, c.zStart + 1.8, 0x1a4a6a);
    this._placeStation(c, 'control', 'Ship Control Panel', -HALF_W + 0.5, c.zStart + 3.6, 0x1a4a6a);
    // Command plot: a chart table set against the starboard side so the central
    // fore-aft passage (through the hatches) stays walkable.
    const plot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.0), this.mat.cabinetGrey());
    plot.position.set(1.25, 0.45, c.zMid);
    this.root.add(plot);
    const plotTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.9), this.mat.screenGlass(0x123b40));
    plotTop.position.set(1.25, 0.92, c.zMid);
    this.root.add(plotTop);
    this.collision.addBoxFromObject(plot, 0.05);
    // Navigation table (own station).
    this._placeStation(c, 'navigation', 'Navigation Table', HALF_W - 0.5, c.zEnd - 2.0, 0x14324a);
    // The passage plot: the whole crossing, on the after bulkhead of Control.
    this._placeWallStation('command_board', 'COMMAND BOARD', -HALF_W + 0.3, 1.55, c.zStart + 1.6,
      Math.PI / 2, 0x3a2a4a);
    this._placeWallStation('passage_chart', 'PASSAGE PLOT', -HALF_W + 0.3, 1.55, c.zEnd - 0.9,
      Math.PI / 2, 0x123b40);

    // Alarm / status board on the aft bulkhead corner.
    const board = this.props.equipmentRack({ screen: 0xb0863a });
    board.position.set(HALF_W - 0.45, 0, c.zStart + 1.4);
    board.rotation.y = -Math.PI / 2;
    this.root.add(board);
    this.collision.addBoxFromObject(board, 0.05);
    this._placeInstrumentPickup(c, 'multimeter', 'Multimeter', 0x3fb6c2, -HALF_W + 0.3, c.zEnd - 0.9);
    // The acoustic probe lives in Control, where the watch actually stands, so a
    // casualty starts with a real "go and fetch the right instrument" leg.
    this._placeInstrumentPickup(c, 'acoustic_probe', 'Acoustic Probe', 0xd8a24a, -HALF_W + 0.3, c.zEnd - 1.6);
    this._placeLocker(c, HALF_W - 0.25, c.zStart + 0.55, 'DC LOCKER 0', 'control');
  }

  _furnish_radio_room(c) {
    this._placeStation(c, 'radio', 'Radio Console', -HALF_W + 0.5, c.zMid, 0x3a2f6a);
    for (let i = 0; i < 2; i++) {
      const rack = this.props.equipmentRack({ screen: 0x6a5fb0 });
      rack.position.set(HALF_W - 0.45, 0, c.zStart + 1.0 + i * 1.3);
      rack.rotation.y = -Math.PI / 2;
      this.root.add(rack);
      this.collision.addBoxFromObject(rack, 0.05);
    }
  }

  _furnish_berthing_mess(c) {
    // Bunks along port, mess table + galley starboard, medical corner.
    for (let i = 0; i < 2; i++) {
      const b = this.props.bunks();
      b.position.set(-HALF_W + 0.75, 0, c.zStart + 1.2 + i * 1.6);
      this.root.add(b);
      this.collision.addBoxFromObject(b, 0.02);
      // The forward stack is yours. You can turn in.
      if (i === 0) {
        this.interactables.push({
          object: b, type: 'bunk', id: 'bunk_own',
          prompt: 'Turn in (6 hours)', data: { compartment: c.id },
        });
      }
    }

    // The fold-down study desk where qualification questions are posted.
    const desk = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.5), this.mat.cabinetGrey());
    top.position.y = 0.78;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.04), this.mat.panelDark());
    back.position.set(0, 1.12, -0.22);
    const card = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.34),
      this.mat.labelMaterial('QUAL CARD', { bg: '#1d2a1e', fg: '#cfe6cf' }));
    card.position.set(0, 1.14, -0.19);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 0.09), this.mat.emissive(0xd8c98a, 1.2));
    lamp.position.set(0.24, 1.44, -0.14);
    desk.add(top, back, card, lamp);
    desk.position.set(-HALF_W + 0.55, 0, c.zEnd - 1.3);
    desk.rotation.y = Math.PI / 2;
    this.root.add(desk);
    this.collision.addBoxFromObject(desk, 0.05);
    this.interactables.push({
      object: desk, type: 'station', id: 'study_desk',
      prompt: 'Work the qualification card', data: { station: 'study_desk', name: 'Qualification Card' },
    });
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.7), this.mat.cabinetGrey());
    table.position.set(HALF_W - 1.0, 0.75, c.zStart + 1.6);
    this.root.add(table);
    const galley = this.props.equipmentRack({ screen: 0x8a6a4a });
    galley.position.set(HALF_W - 0.45, 0, c.zEnd - 1.2);
    galley.rotation.y = -Math.PI / 2;
    this.root.add(galley);
    this.collision.addBoxFromObject(galley, 0.05);
    // Emergency breathing manifold on the wall.
    const ebm = this.props.pipeRun({ length: c.len - 1, axis: 'z', colorHex: 0x2f8f8f });
    ebm.position.set(-HALF_W + 0.2, 1.7, c.zMid);
    this.root.add(ebm);
  }

  _furnish_machinery_control(c) {
    this._placeStation(c, 'engineering', 'Machinery Control', HALF_W - 0.5, c.zStart + 2.0, 0x6a4a1a);
    this._placeStation(c, 'engineering', 'Electric Plant Control', HALF_W - 0.5, c.zStart + 3.8, 0x6a4a1a);
    // Trend / mimic board port side.
    const mimic = this.props.equipmentRack({ screen: 0xb0863a, w: 1.2, h: 1.7 });
    mimic.position.set(-HALF_W + 0.5, 0, c.zMid);
    mimic.rotation.y = Math.PI / 2;
    this.root.add(mimic);
    this.collision.addBoxFromObject(mimic, 0.05);
    this._placeInstrumentPickup(c, 'vibration_meter', 'Vibration Meter', 0xd8a24a, -HALF_W + 0.3, c.zEnd - 0.9);
    this._placeLocker(c, HALF_W - 0.25, c.zEnd - 0.9, 'DC LOCKER 2', 'machinery');
    // Ventilation and atmosphere control lives with the engineering watch.
    this._placeWallStation('atmosphere_control', 'ATMOSPHERE & VENT', -HALF_W + 0.3, 1.55, c.zStart + 1.4,
      Math.PI / 2, 0x2f6f4a);
  }

  _furnish_propulsion(c) {
    // Motor/turbine housing and its shaft, set to STARBOARD rather than on the
    // centreline. On the centreline it sits directly in line with the forward
    // hatch: you step through and walk straight into it, which reads as the
    // compartment being blocked even though there is a lane down either side.
    const motor = this.props.machineryHousing({ length: 3.0, radius: 0.6, colorHex: 0x4a545c });
    motor.position.set(1.3, 0.7, c.zStart + 2.4);
    motor.rotation.y = Math.PI / 2;
    this.root.add(motor);
    this.collision.addBoxFromObject(motor, 0.08);
    // Shaft continuing aft on the same line.
    const shaft = this.props.pipeRun({ length: 3, axis: 'z', radius: 0.12, colorHex: 0x6a6a6a });
    shaft.position.set(1.3, 0.7, c.zEnd - 1.5);
    this.root.add(shaft);
    // Access panels + sensor pucks on the inboard face, where a watchstander can
    // actually reach them.
    for (let i = 0; i < 3; i++) {
      const puck = this.props.instrumentPickup(0xd8a24a);
      puck.position.set(0.62, 0.9, c.zStart + 1.6 + i * 0.9);
      this.root.add(puck);
    }
    // Stores that Command Episode 2 shakes loose across the passage.
    this._placeDebris('debris_propulsion', c, c.zStart + 1.1);
    // Lube-oil / cooling pipe kit down the port side.
    const lube = this.props.pipeRun({ length: c.len - 1, axis: 'z', colorHex: 0x8a7a3a, valveAt: 1 });
    lube.position.set(-HALF_W + 0.3, 0.9, c.zMid);
    this.root.add(lube);
  }

  _furnish_electrical(c) {
    // Switchboards line both sides.
    for (const side of [-1, 1]) {
      const sb = this.props.switchboard();
      sb.position.set(side * (HALF_W - 0.35), 0, c.zStart + 1.6);
      sb.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.root.add(sb);
      this.collision.addBoxFromObject(sb, 0.05);
    }
    // Emergency bus + transformer block.
    const xfmr = this.props.machineryHousing({ length: 1.2, radius: 0.45, colorHex: 0x555555 });
    xfmr.position.set(-HALF_W + 0.6, 0.5, c.zEnd - 1.2);
    xfmr.rotation.y = Math.PI / 2;
    this.root.add(xfmr);
    this.collision.addBoxFromObject(xfmr, 0.05);
    this._placeStation(c, 'electrical', 'Electrical Switchboard', HALF_W - 0.5, c.zEnd - 1.2, 0xb0a03a);
    // The cable-run junction that Mission 5 sets alight, and the panel feeding it.
    this._placeFireSeat('fire_seat_electrical', c, HALF_W - 0.28, 1.35, c.zStart + 3.3, -Math.PI / 2);
    this._placePanel('aft_dist_2a', 'AFT DIST 2A', -HALF_W + 0.32, 1.25, c.zStart + 3.3);
  }

  _furnish_auxiliary(c) {
    // Pumps, compressors, heat exchangers + a lower bilge access.
    for (let i = 0; i < 3; i++) {
      const pump = this.props.machineryHousing({ length: 1.0, radius: 0.32, colorHex: 0x4a6a4a });
      pump.position.set(-HALF_W + 0.45, 0.4, c.zStart + 1.1 + i * 1.2);
      pump.rotation.y = Math.PI / 2;
      this.root.add(pump);
      this.collision.addBoxFromObject(pump, 0.05);
    }
    const hx = this.props.machineryHousing({ length: 1.6, radius: 0.42, colorHex: 0x6a8a4a });
    hx.position.set(HALF_W - 0.52, 0.6, c.zStart + 1.5);
    hx.rotation.y = Math.PI / 2;
    this.root.add(hx);
    this.collision.addBoxFromObject(hx, 0.05);
    // (The lower bilge access plate + recess are built by _buildBilgeAccess.)
    this._placeInstrumentPickup(c, 'gas_detector', 'Gas Detector', 0x6bbf73, HALF_W - 0.3, c.zStart + 0.9);
    this._placeLocker(c, -HALF_W + 0.25, c.zStart + 0.8, 'DC LOCKER 3', 'aft');
  }

  dispose() {
    this.props.dispose();
  }
}
