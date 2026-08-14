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
  tank, pipeRun, crateStack, vehicle, fenceRun, displayBoard, post, box, cyl, sign, MATERIALS,
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

  // ============================================================ the wider city
  //
  // Everything below is scenery. None of it is a stop, none of it is
  // interactable, and none of it is inside the player's bounds except where
  // said. It exists because ten buildings on a graded pad read as a campus, and
  // Riverton is supposed to be a working river city with an economy that made
  // the contamination possible.
  //
  // Four devices, used deliberately: mass across the water that cannot be
  // reached, an edge that leaves the map rather than stopping at it, one object
  // far taller than the buildings, and parked vehicles standing in for people.

  // ------------------------------------ the intake, downstream and in sight
  // "Nine hundred metres downstream of the outfall" is on the opening card and
  // was a number with nothing behind it. The intake now stands on the bank to
  // the east, in the sightline from the yard, so the distance between the thing
  // that spilled and the thing that drinks is something you can look at.
  {
    const ix = 168, iz = -104, iy = y(ix, iz);
    box(scene, 14, 6.4, 10, ix, iy + 3.2, iz, MATERIALS.paintedSteel(0x9aa0a2));
    box(scene, 16, 0.6, 12, ix, iy + 6.7, iz, MATERIALS.paintedSteel(0x6a7073));
    // Screen deck out over the water, on piles.
    for(const dx of [-5, 0, 5]) cyl(scene, 0.5, 5.5, ix + dx, iy - 1.0, iz - 9, MATERIALS.paintedSteel(0x6f6a5f));
    box(scene, 14, 0.5, 7, ix, iy + 1.6, iz - 9, MATERIALS.paintedSteel(0x7d8a86));
    pipeRun(scene, { x0: ix, z0: iz + 5, x1: ix - 40, z1: iz + 46, y: iy + 0.3,
      height: 2.0, r: 0.6, colour: 0x7f8a86 });
    sign(scene, 'CITY WATER INTAKE', { x: ix - 9, z: iz + 7, y: iy + 2.6, facing: Math.PI / 2,
      sub: 'Closed — see advisory', accent: 0xb03a2e });
  }

  // ------------------------------------------- the yard, still making smoke
  // The fire went out six hours ago and the wind direction is the subject of
  // three questions. A still drift, leaning east with the wind the questions
  // ask about, so the answer is readable from anywhere on the map.
  {
    const bx = -96, bz = -34;
    for(let i = 0; i < 7; i++){
      const t = i / 6;
      const w = 5 + t * 26;
      box(scene, w, 3.0 + t * 5, w * 0.7,
        bx + t * 58, y(bx, bz) + 7 + t * 15, bz + t * 16, MATERIALS.glass());
    }
  }

  // ------------------------------------------------ the far bank: grain elevator
  // The water runs from z −157 to −67 and the player is bounded at 105, so
  // anything past the far shore is permanently out of reach — which is the point.
  // A silo row is the cheapest large mass there is, and it gives the river
  // something to be wide *against*: without it the water reads as a texture at
  // the edge of the map rather than as a thing with another side.
  {
    const farY = 0;
    const silo = new THREE.Group();
    for(let i = 0; i < 6; i++){
      cyl(silo, 5.2, 34, -132 + i * 10.6, 17, -178, MATERIALS.concrete());
    }
    // The headhouse across the top is what makes a row of cylinders read as a
    // grain elevator instead of six tanks.
    box(silo, 68, 9, 13, -105, 38, -178, MATERIALS.concrete());
    box(silo, 68, 1.2, 15, -105, 43, -178, MATERIALS.paintedSteel(0x6d6a60));
    // A conveyor gallery running down to the water, so the silos have a reason to
    // be on a river at all.
    box(silo, 3.0, 2.2, 46, -105, 26, -152, MATERIALS.paintedSteel(0x7d7565), 0);
    silo.position.y = farY;
    scene.add(silo);
    // A second, smaller works further along, because one building on a shore
    // reads as a model and two read as a district.
    const works = new THREE.Group();
    box(works, 40, 14, 18, 96, 7, -184, MATERIALS.panel());
    cyl(works, 2.4, 30, 112, 15, -184, MATERIALS.concrete());
    box(works, 44, 1.0, 20, 96, 14.4, -184, MATERIALS.paintedSteel(0x5f6a6d));
    works.position.y = farY;
    scene.add(works);
  }

  // ------------------------------------------------------- barge and tug
  // Moored mid-river, past the bank the player cannot walk off. It explains how
  // bulk chemical arrives at a city like this, and a long low hull at middle
  // distance is what gives the water a readable scale.
  {
    const wl = -0.8;                     // site.water.level
    const barge = new THREE.Group();
    box(barge, 12, 2.2, 46, -34, 0.4, -94, MATERIALS.paintedSteel(0x4a4f52));
    box(barge, 10.6, 0.5, 43, -34, 1.6, -94, MATERIALS.paintedSteel(0x39424a));
    for(let i = 0; i < 3; i++){          // hopper coamings
      box(barge, 9.4, 1.5, 11, -34, 2.2, -110 + i * 15, MATERIALS.paintedSteel(0x5a5f60));
    }
    box(barge, 7, 3.4, 7, -34, 2.9, -68.5, MATERIALS.paintedSteel(0x8d8574));   // tug
    box(barge, 4.4, 3.0, 4.4, -34, 5.4, -68.5, MATERIALS.panel());
    cyl(barge, 0.5, 3.2, -34, 8.2, -70.5, MATERIALS.paintedSteel(0x2f3538));
    barge.position.y = wl;
    scene.add(barge);
  }

  // ------------------------------------------------------------ the levee walk
  // The bank is already a wall the player cannot cross. A levee crest with a
  // stage gauge on it turns that from an invisible limit into a place you are
  // obviously meant to stop — and a flood gauge is a measuring instrument, which
  // is what this whole game is about.
  {
    const leveeY = y(0, -62);
    box(scene, 250, 0.9, 5.0, 0, leveeY + 0.45, -62, MATERIALS.concrete());
    for(let i = -5; i <= 5; i++){
      soft(post(scene, i * 22, -64.4, leveeY + 0.9, 1.0, 0.07, 0xa8a294));
    }
    // The gauge: a staff with painted stage bands, tallest mark well over head
    // height, which is the detail that says this river has done it before.
    const gaugeY = y(-18, -64);
    cyl(scene, 0.18, 7.5, -18, gaugeY + 3.75, -64, MATERIALS.panel());
    for(let i = 0; i < 6; i++){
      box(scene, 0.62, 0.5, 0.5, -18, gaugeY + 1.1 + i * 1.2, -64,
        MATERIALS.paintedSteel(i >= 4 ? 0xb3462f : 0x2f3f4a));
    }
    soft({ x: -18, z: -64, r: 0.6 });
  }

  // ---------------------------------------------------------- the rail spur
  // The yard is "where it started" and a freight yard implies rail. The spur runs
  // east–west past the yard and keeps going to ±180, well past the player's
  // bound at 105: a line that leaves the map is the cheapest way to say the city
  // continues past what was built.
  {
    const railY = y(0, 104);
    for(const sx of [-1, 1]){
      box(scene, 180, 0.16, 0.14, sx * 92, railY + 0.24, 103.2, MATERIALS.steel());
      box(scene, 180, 0.16, 0.14, sx * 92, railY + 0.24, 104.8, MATERIALS.steel());
    }
    for(let i = -30; i <= 30; i++){      // sleepers
      box(scene, 0.9, 0.16, 2.6, i * 5.6, railY + 0.08, 104, MATERIALS.rubber());
    }
    // Two tank cars, parked clear of the yard gate at x = 0 so nothing blocks the
    // route north out of the yard.
    const car = (cx, tint) => {
      const g = new THREE.Group();
      box(g, 17, 1.0, 2.9, cx, 1.0, 104, MATERIALS.paintedSteel(0x4c4a46));
      cyl(g, 1.55, 15.4, cx, 2.9, 104, MATERIALS.paintedSteel(tint), 1.55);
      box(g, 1.2, 0.5, 1.2, cx, 4.6, 104, MATERIALS.steel());
      for(const dx of [-6.4, 6.4]) for(const dz of [-1.2, 1.2]){
        cyl(g, 0.45, 0.28, cx + dx, 0.5, 104 + dz, MATERIALS.rubber());
      }
      g.position.y = railY;
      scene.add(g);
      soft({ x: cx, z: 104, r: 8.6 });
    };
    car(-42, 0x8a8f8c);
    car(38, 0x6f6a62);
  }

  // ------------------------------------------------------------ the water tower
  // The tallest thing in Riverton, on the high side by the yard. The site has no
  // verticality at all otherwise — every building is one storey on a flat
  // floodplain — and a municipal water tower in a game about drinking water is
  // the one landmark that is also the subject.
  {
    const twrY = y(-74, 86);
    for(const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]){
      const lx = -74 + Math.sin(a) * 3.4, lz = 86 + Math.cos(a) * 3.4;
      cyl(scene, 0.22, 17, lx, twrY + 8.5, lz, MATERIALS.steel());
    }
    cyl(scene, 5.4, 6.2, -74, twrY + 20, 86, MATERIALS.panel());
    cyl(scene, 5.4, 2.4, -74, twrY + 24.2, 86, MATERIALS.panel(), 1.2);
    cyl(scene, 1.1, 17, -74, twrY + 8.5, 86, MATERIALS.steel());   // riser
    sign(scene, 'RIVERTON', { x: -74, y: twrY + 20.4, z: 80.4, w: 7.4, h: 2.2, facing: Math.PI });
    soft({ x: -74, z: 86, r: 4.2 });
  }

  // -------------------------------------------------- the press pen at Briefing
  // The Public Briefing Center's own subtitle is "What the city is told". Two
  // vans and a barriered pen give it an audience without rendering one.
  {
    const brY = y(86, 26);
    park(74, 14, { facing: 0, colour: 0xe4e1d8, label: 'news van', id: 'VEH_PRESS_A' });
    park(74, 38, { facing: Math.PI, colour: 0xd9d5c8, box: false, label: 'news van', id: 'VEH_PRESS_B' });
    for(let i = 0; i < 7; i++){
      soft(post(scene, 70 + i * 2.6, 26, brY, 1.05, 0.06, 0xc9bfa8));
    }
    box(scene, 18, 0.06, 0.06, 79, brY + 1.05, 26, MATERIALS.paintedSteel(0xb8b2a4));
  }

  // ------------------------------------------------ advisory boards on the avenue
  // Trailer-mounted message boards, angled to the avenue and kept off it: the
  // street is clear inside |x| < 5 and a prop over the route is the mistake that
  // welds a player in place. These date the scene to *during* the incident, which
  // nothing else on the avenue does.
  {
    for(const [bx, bz, facing] of [[8.5, 6, -Math.PI / 2], [-8.5, 48, Math.PI / 2]]){
      const bY = y(bx, bz);
      const trailer = new THREE.Group();
      box(trailer, 3.2, 0.4, 1.8, bx, 0.7, bz, MATERIALS.paintedSteel(0xb0762a));
      for(const dx of [-1.0, 1.0]){
        cyl(trailer, 0.42, 0.26, bx + dx, 0.42, bz + 0.95, MATERIALS.rubber());
      }
      trailer.position.y = bY;
      scene.add(trailer);
      const b = displayBoard(scene, bx, bz, bY + 1.5, { facing, title: 'BOIL WATER ADVISORY', tint: 0xb3462f });
      soft(b.soft);
      lightPanels.push(b.screen);
      soft({ x: bx, z: bz, r: 1.9 });
    }
  }

  // ------------------------------------------- the market that is not happening
  // A city mid-incident stops doing ordinary things, and a closed market says
  // that better than an open one would. Stalls folded, pallets of sandbags
  // waiting on the kerb, by the Records office where the cross street ends.
  {
    const mY = y(-86, 40);
    for(let i = 0; i < 5; i++){
      const sx = -96 + i * 5.2;
      // Folded trestles, stacked flat against their frames.
      box(scene, 0.5, 2.1, 3.4, sx, mY + 1.05, 42, MATERIALS.paintedSteel(0x8a7f6a), 0);
      box(scene, 0.16, 2.3, 0.16, sx, mY + 1.15, 40.2, MATERIALS.steel());
      soft({ x: sx, z: 42, r: 1.1 });
    }
    for(const [px, pz, rows] of [[-78, 44, 2], [-72, 44, 1], [-78, 50, 1]]){
      soft(crateStack(scene, px, pz, y(px, pz), { rows, colour: 0x8f8a72 }));
    }
  }

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
