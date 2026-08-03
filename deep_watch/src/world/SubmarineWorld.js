import * as THREE from 'three';
import { ProceduralProps } from '../graphics/ProceduralProps.js';

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
  }

  build() {
    this._buildShell();
    this._buildBulkheadsAndHatches();
    this._furnishCompartments();
    return { layout: LAYOUT, interactables: this.interactables };
  }

  // ---- Hull shell: floor, ceiling, curved-ish side walls, end caps ----
  _buildShell() {
    const L = BOAT_LENGTH;

    // Floor (deck plates).
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(HALF_W * 2, L), this.mat.deckPlate());
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, L / 2);
    floor.receiveShadow = true;
    this.root.add(floor);

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

  // ---- Per-compartment furnishing + lights + station anchors ----
  _furnishCompartments() {
    for (const c of LAYOUT) {
      // One pooled light per compartment.
      this.lighting.addCompartmentLight(c.id, 0, CEIL - 0.15, c.zMid);
      // Deck matting accent so compartments read differently.
      const mat = new THREE.Mesh(new THREE.PlaneGeometry(HALF_W * 1.6, c.len - 0.6),
        this.mat.emissive(new THREE.Color(c.color).getHex(), 0.02));
      mat.rotation.x = -Math.PI / 2;
      mat.position.set(0, 0.01, c.zMid);
      this.root.add(mat);

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

  _placeLocker(c, x, z, label = 'DC LOCKER') {
    const locker = this.props.dcLocker(label);
    locker.position.set(x, 0, z);
    locker.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    this.root.add(locker);
    this.collision.addBoxFromObject(locker, 0.05);
    this.interactables.push({
      object: locker, type: 'locker', id: `locker_${c.id}_${z.toFixed(0)}`,
      prompt: 'Open DC locker', data: { compartment: c.id },
    });
  }

  _furnish_forward_equipment(c) {
    // Equipment racks + hydraulic machinery + valve manifolds + DC lockers + escape trunk.
    for (let i = 0; i < 3; i++) {
      const rack = this.props.equipmentRack({ screen: 0x1c6b52 });
      rack.position.set(-HALF_W + 0.45, 0, c.zStart + 1.2 + i * 1.4);
      this.root.add(rack);
      this.collision.addBoxFromObject(rack, 0.05);
    }
    const hyd = this.props.machineryHousing({ length: 1.6, radius: 0.4, colorHex: 0x5a5545 });
    hyd.position.set(HALF_W - 0.7, 0.55, c.zStart + 1.6);
    hyd.rotation.y = Math.PI / 2;
    this.root.add(hyd);
    this.collision.addBoxFromObject(hyd, 0.05);

    const man = this.props.valveManifold(4);
    man.position.set(HALF_W - 0.4, 1.1, c.zStart + 3.4);
    man.rotation.y = -Math.PI / 2;
    this.root.add(man);

    this._placeLocker(c, HALF_W - 0.25, c.zEnd - 1.0, 'DC LOCKER 1');
    this._placeLocker(c, -HALF_W + 0.25, c.zEnd - 1.0, 'ESCAPE TRUNK');

    // A removable deck plate (bilge access) — interactable inspection point.
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.9), this.mat.deckPlate());
    plate.position.set(0.4, 0.03, c.zStart + 4.6);
    this.root.add(plate);
    this.interactables.push({
      object: plate, type: 'deckplate', id: 'deckplate_fwd',
      prompt: 'Lift deck plate', data: { compartment: c.id, bilge: 'fwd_bilge' },
    });
    // Instruments live in the forward space too.
    this._placeInstrumentPickup(c, 'acoustic_probe', 'Acoustic Probe', 0xd8a24a, -HALF_W + 0.3, c.zStart + 2.2);
  }

  _furnish_sonar_electronics(c) {
    for (let i = 0; i < 4; i++) {
      const rack = this.props.equipmentRack({ screen: 0x2f6f8f, h: 1.9 });
      const side = i % 2 === 0 ? -1 : 1;
      rack.position.set(side * (HALF_W - 0.45), 0, c.zStart + 0.9 + Math.floor(i / 2) * 1.6);
      rack.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.root.add(rack);
      this.collision.addBoxFromObject(rack, 0.05);
    }
    // Cooling loop pipe with valve.
    const cool = this.props.pipeRun({ length: c.len - 1, axis: 'z', colorHex: 0x3a6a7a, valveAt: 0 });
    cool.position.set(HALF_W - 0.25, 1.6, c.zMid);
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
    // Command plot: a central table.
    const plot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.0), this.mat.cabinetGrey());
    plot.position.set(0.2, 0.45, c.zMid);
    this.root.add(plot);
    const plotTop = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.9), this.mat.screenGlass(0x123b40));
    plotTop.position.set(0.2, 0.92, c.zMid);
    this.root.add(plotTop);
    this.collision.addBoxFromObject(plot, 0.05);
    // Navigation table (own station).
    this._placeStation(c, 'navigation', 'Navigation Table', HALF_W - 0.5, c.zEnd - 2.0, 0x14324a);
    // Alarm / status board on the aft bulkhead corner.
    const board = this.props.equipmentRack({ screen: 0xb0863a });
    board.position.set(HALF_W - 0.45, 0, c.zStart + 1.4);
    board.rotation.y = -Math.PI / 2;
    this.root.add(board);
    this.collision.addBoxFromObject(board, 0.05);
    this._placeInstrumentPickup(c, 'multimeter', 'Multimeter', 0x3fb6c2, -HALF_W + 0.3, c.zEnd - 0.9);
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
    }
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
    this._placeLocker(c, HALF_W - 0.25, c.zEnd - 0.9, 'DC LOCKER 2');
  }

  _furnish_propulsion(c) {
    // Long motor/turbine housing on centerline + shaft aft.
    const motor = this.props.machineryHousing({ length: 3.0, radius: 0.6, colorHex: 0x4a545c });
    motor.position.set(0.2, 0.7, c.zStart + 2.2);
    motor.rotation.y = Math.PI / 2;
    this.root.add(motor);
    this.collision.addBoxFromObject(motor, 0.1);
    // Shaft continuing aft.
    const shaft = this.props.pipeRun({ length: 3, axis: 'z', radius: 0.12, colorHex: 0x6a6a6a });
    shaft.position.set(0.2, 0.7, c.zEnd - 1.6);
    this.root.add(shaft);
    // Access panels + vibration/temperature sensor pucks (visual).
    for (let i = 0; i < 3; i++) {
      const puck = this.props.instrumentPickup(0xd8a24a);
      puck.position.set(0.2 + 0.62, 0.9, c.zStart + 1.4 + i * 0.9);
      this.root.add(puck);
    }
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
  }

  _furnish_auxiliary(c) {
    // Pumps, compressors, heat exchangers + a lower bilge access.
    for (let i = 0; i < 3; i++) {
      const pump = this.props.machineryHousing({ length: 1.0, radius: 0.35, colorHex: 0x4a6a4a });
      pump.position.set(-HALF_W + 0.6, 0.4, c.zStart + 1.0 + i * 1.3);
      pump.rotation.y = Math.PI / 2;
      this.root.add(pump);
      this.collision.addBoxFromObject(pump, 0.05);
    }
    const hx = this.props.machineryHousing({ length: 2.0, radius: 0.45, colorHex: 0x6a8a4a });
    hx.position.set(HALF_W - 0.7, 0.6, c.zMid);
    hx.rotation.y = Math.PI / 2;
    this.root.add(hx);
    this.collision.addBoxFromObject(hx, 0.05);
    // Lower bilge access plate.
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.9), this.mat.deckPlate());
    plate.position.set(0.3, 0.03, c.zEnd - 1.2);
    this.root.add(plate);
    this.interactables.push({
      object: plate, type: 'deckplate', id: 'deckplate_aft',
      prompt: 'Lift deck plate', data: { compartment: c.id, bilge: 'aft_bilge' },
    });
    this._placeInstrumentPickup(c, 'gas_detector', 'Gas Detector', 0x6bbf73, HALF_W - 0.3, c.zStart + 0.9);
  }

  dispose() {
    this.props.dispose();
  }
}
