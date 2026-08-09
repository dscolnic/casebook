// props.js — the objects that make Riverton recognisable as this place.
//
// Generic furniture (benches, bins, bollards, signs, building shells) comes from
// engine/world/kit.js and is configured in site.js. What is left here is the
// dozen or so things the design book actually asks for: every location should
// carry "one visual data display, one interactive instrument or evidence
// object, one operator who explains the local constraint, and one route clue".
//
// The displays are emissive panels, not lights. The site already spends its
// whole light budget on ambient + sun + hemisphere; a readout per location
// would be the 28-point-light mistake in a different setting.

import * as THREE from 'three';
import {
  tank, pipeRun, crateStack, vehicle, fenceRun, displayBoard, post, box, cyl, MATERIALS,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/** What each area's display shows, and the tint that identifies it at range. */
const READOUTS = {
  IDENT:  { title: 'Spectra & Identity', tint: 0x7a4fa3 },
  GASES:  { title: 'Wind & Plume', tint: 0x2f7fa8 },
  WATER:  { title: 'Intake Chemistry', tint: 0x1f7a6b },
  QUANT:  { title: 'Calibration & Limits', tint: 0xb0762a },
  ENERGY: { title: 'Vessel Temperature', tint: 0xb3462f },
  TREAT:  { title: 'Treatment Train', tint: 0x4a5b6e },
};

/**
 * Called by engine/world/outdoorTown.js once the ground, the buildings and the
 * street furniture exist.
 *
 * ctx = { groundHeight, colliders, softColliders, interactables, blocked,
 *         sign, MATERIALS, lightPanels }
 */
export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, lightPanels, areaScreens } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  /**
   * A parked vehicle the player can take. `vehicle()` hands back its group and
   * its wheels along with the collision box; `driveable()` does the rest.
   */
  const park = (x, z, opts = {}) => {
    const box = vehicle(scene, x, z, y(x, z), opts);
    return driveable(scene, box.group, {
      id: opts.id, label: opts.label ?? 'vehicle',
      halfWidth: 1.25, halfLength: 2.9, height: 3.0,
      // In the cab, on the left, looking out over the bonnet. Seated behind the
      // load instead — which is what a positive z put you — the whole vehicle
      // is in front of you and you cannot see where you are going.
      seat: { x: 0.52, y: 2.18, z: box.cabZ },
      wheels: box.wheels, topSpeed: 12,
      colliders, interactables,
    });
  };

  // ---------------------------------------------------------- area readouts
  // One beside each area entrance, offset to the side so it never stands in the
  // doorway the player is walking through.
  const spots = [
    ['WATER',  -34, -22, 0],
    ['GASES',   33, -22, 0],
    ['IDENT',  -39, 16, 0],
    ['QUANT',   40, 16, 0],
    ['ENERGY', -28, 64, Math.PI],
    ['TREAT',   29, 64, Math.PI],
  ];
  for(const [id, x, z, facing] of spots){
    const r = READOUTS[id];
    // (x, z, y) — ground last, like every other kit placer.
    const b = displayBoard(scene, x, z, y(x, z), { facing, title: r.title, tint: r.tint });
    soft(b.soft);
    lightPanels.push(b.screen);
    // The world's channel for 'this area still owes an answer'.
    areaScreens?.set(id, b.screen);
    interactables.push({
      mesh: b.screen, type: 'info', id: `READOUT_${id}`,
      prompt: `E — Read the ${r.title.toLowerCase()} display`,
    });
  }

  // ------------------------------------------------------- treatment plant
  // Vertical tanks and a pipe run are what make a plant read as a plant from
  // across the yard, before any sign is legible.
  const plantY = y(44, 76);
  soft(tank(scene, 62, 88, plantY, { r: 3.0, h: 9.5, colour: 0xc9c6bd }));
  soft(tank(scene, 70, 88, plantY, { r: 3.0, h: 9.5, colour: 0xbfc4c6 }));
  soft(tank(scene, 66, 98, plantY, { r: 2.2, h: 6.5, colour: 0xc9c6bd }));
  pipeRun(scene, { x0: 58, z0: 84, x1: 58, z1: 66, y: plantY, height: 3.6, colour: 0x6f7f7b })
    .forEach(soft);
  pipeRun(scene, { x0: 58, z0: 84, x1: 74, z1: 84, y: plantY, height: 4.2, colour: 0x8a6f5a })
    .forEach(soft);

  // The intake pipeline: the corrosion story runs from the plant to the river.
  pipeRun(scene, { x0: -34, z0: -44, x1: -34, z1: -62, y: y(-34, -52), height: 2.6, r: 0.34, colour: 0x7a6a5c })
    .forEach(soft);

  // -------------------------------------------------------- the freight yard
  // Where the fire was. Damaged containers, still cordoned.
  const yardY = y(0, 92);
  colliders.push(fenceRun(scene, { x0: -30, z0: 78, x1: 30, z1: 78, y: yardY, height: 2.4 }));
  colliders.push(fenceRun(scene, { x0: -30, z0: 78, x1: -30, z1: 104, y: yardY, height: 2.4 }));
  colliders.push(fenceRun(scene, { x0: 30, z0: 78, x1: 30, z1: 104, y: yardY, height: 2.4 }));
  // Parked parallel to the fence, never across the gate — and driveable, which
  // is why they are registered rather than pushed straight into `colliders`.
  // Riverton is two hundred metres across and the clock is the whole game.
  park(-20, 98, { facing: Math.PI / 2, colour: 0xb33a2c, label: 'response truck', id: 'VEH_YARD_A' });
  park(20, 98, { facing: Math.PI / 2, colour: 0xd8b13a, box: false, label: 'utility pickup', id: 'VEH_YARD_B' });

  // Three more along the avenue, so there is nearly always one within a short
  // walk of wherever the mission has left you. All parked with the street —
  // never across it — and none within ten metres of the spawn at (0, 36) or of
  // a doorway, which is the prop mistake that welds a player in place.
  park(-11, 30, { facing: 0, colour: 0x39607a, box: false, label: 'city sedan', id: 'VEH_AVE_A' });
  park(12, -6, { facing: Math.PI, colour: 0x5b6f52, label: 'sampling van', id: 'VEH_AVE_B' });
  park(-13, 62, { facing: 0, colour: 0x7b5f3a, box: false, label: 'works pickup', id: 'VEH_AVE_C' });
  soft(crateStack(scene, -12, 100, yardY, { rows: 2, colour: 0x8c7a4e }));
  soft(crateStack(scene, 12, 100, yardY, { rows: 1, colour: 0x6f7a52 }));

  // The unlabelled drums themselves — the evidence object of Mission 1.
  const drums = new THREE.Group();
  for(let i = 0; i < 7; i++){
    const dx = -6 + (i % 4) * 3.4 + (i > 3 ? 1.7 : 0);
    const dz = 86 + Math.floor(i / 4) * 2.6;
    const tint = i === 2 || i === 5 ? 0x6d5f4a : 0x8e8272;   // two are scorched
    cyl(drums, 0.52, 1.5, dx, 0.75, dz, MATERIALS.paintedSteel(tint));
    cyl(drums, 0.55, 0.08, dx, 1.48, dz, MATERIALS.steel());
    soft({ x: dx, z: dz, r: 0.85 });
  }
  drums.position.y = yardY;
  scene.add(drums);
  const drumHit = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 6),
    new THREE.MeshBasicMaterial({ visible: false }));
  drumHit.position.set(-2, yardY + 1, 87);
  scene.add(drumHit);
  interactables.push({
    mesh: drumHit, type: 'info', id: 'DRUMS',
    prompt: 'E — Inspect the damaged containers',
  });

  // ------------------------------------------------------------- the river
  // A sampling dock, reachable from the riverfront road, standing off the bank.
  const dockY = y(24, -60);
  const dock = box(scene, 4.5, 0.35, 14, 24, dockY + 0.35, -60, MATERIALS.concrete());
  colliders.push(new THREE.Box3().setFromObject(dock));
  for(const dz of [-66, -60, -54]){
    soft(post(scene, 26.6, dz, dockY, 1.05, 0.09, 0xb8b2a4));
    soft(post(scene, 21.4, dz, dockY, 1.05, 0.09, 0xb8b2a4));
  }
  const dockHit = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 14),
    new THREE.MeshBasicMaterial({ visible: false }));
  dockHit.position.set(24, dockY + 1.2, -60);
  scene.add(dockHit);
  interactables.push({
    mesh: dockHit, type: 'info', id: 'DOCK',
    prompt: 'E — Look at the river sampling point',
  });

  // ------------------------------------------------------- the weather mast
  // The Mobile Weather Station of Mission 2, as the tallest thing on the site,
  // which also makes it a landmark from anywhere on the avenue.
  const mastY = y(64, -34);
  cyl(scene, 0.16, 14, 64, mastY + 7, -34, MATERIALS.steel());
  box(scene, 1.6, 0.12, 0.12, 64, mastY + 13.4, -34, MATERIALS.paintedSteel(0xd8d3c8));
  for(const a of [0, Math.PI / 2]){
    box(scene, 0.9, 0.06, 0.06, 64 + Math.sin(a) * 0.7, mastY + 12.6, -34 + Math.cos(a) * 0.7,
      MATERIALS.paintedSteel(0xd8d3c8), a);
  }
  soft({ x: 64, z: -34, r: 0.8 });
}

export default decorate;
