// interiorBuilding.js — one room you can walk into, built from data.
//
// The outdoor games answered their questions at the door: you walked up to a
// building, a panel opened, and the building itself was a box you never got
// inside. This builds the inside — a single working room per area, with the
// instrument that area is about, the case that is live on it, and a way back
// out — so "go there and answer" becomes a place rather than a menu.
//
// ## Where the rooms are
//
// Not inside the exterior shells. Those are solid boxes standing on graded
// terrain, and hollowing them out means fighting the ground height function,
// the colliders and the shadow budget for no gain the player can see. Instead
// each interior is built once, lazily, in an **interior district** far along +x
// from the town, and entering one teleports you there:
//
//   · the floor is flat at y = 0, so the player's collision box — which is
//     built at a fixed height above the origin — lines up with the walls;
//   · the town is thousands of metres away, past the camera's far plane, so
//     nothing of it is visible and nothing of it is drawn;
//   · outdoor colliders and soft colliders are separated in x rather than in
//     y, which matters because the soft-collider test only looks at x and z.
//
// The caller swaps the player's ground function and bounds on the way in and
// back on the way out. `enterTransform` and `exitTransform` hand back the two
// positions to teleport between.
//
// ## What a room contains
//
// Shell, ceiling with lit panels, one real light (see the light budget in
// CLAUDE.md), a bench, the area's instrument with a live screen from
// screens.js, a printed case plate, a case stand that starts the question, and
// a door back to the town. The theme supplies what the instrument reads; this
// file never names an area.
import * as THREE from 'three';
import {
  mat, paintTexture, sheetFloorTexture, ceilingTileTexture, diffuserTexture, grainTexture,
  boardTexture,
} from './materials.js';
import { instrumentScreen, printedSheet, chalkboard, typedSheet } from './screens.js';
import { addCaseBeacon } from './caseBeacon.js';

/** Far enough along +x that the town is past the camera's far plane. */
export const DISTRICT_X = 4000;
const GAP = 60;               // between neighbouring rooms in the district

/**
 * How a room is built, as opposed to what is in it.
 *
 * Every interior in every game was the same room: white paint, sheet vinyl, a
 * suspended tile ceiling with lit diffusers. That is right for a Riverton
 * laboratory and wrong for a wooden building on a mesa in 1943, and a player
 * who walks into Project Y and recognises the Contaminated City's floor is a
 * player who has been told the two places are the same place.
 *
 * A theme sets `interiorStyle` in its manifest; `createInteriors` passes it
 * through. Nothing here names a game.
 */
const STYLES = {
  lab: {
    wall: '#e7e4dc', wallKind: 'paint',
    floor: 'sheet', floorTint: [206, 202, 192],
    ceiling: 'tiles', ceilingLight: 0xffffff,
    skirt: 0x5d6169, bench: 0xdedbd2, worktop: '#9aa0a6',
    instrument: 'screen',
  },
  // Board walls, a plank floor, open rafters and a hanging bulb: a wartime
  // building put up in a hurry, which is what every one of these was.
  timber: {
    wall: '#c8b088', wallKind: 'board',
    floor: 'plank', floorTint: '#8d6f4a',
    ceiling: 'rafters', ceilingLight: 0xffd9a0,
    skirt: 0x6b5334, bench: 0xa98b63, worktop: '#7d6242',
    instrument: 'chalk',
  },
  // Painted steel, deck matting, a low deckhead with strip lighting.
  steel: {
    wall: '#8d9a94', wallKind: 'paint',
    floor: 'sheet', floorTint: [92, 104, 100],
    ceiling: 'tiles', ceilingLight: 0xdfe9ff,
    skirt: 0x3c4a46, bench: 0x7c8a86, worktop: '#6b7772',
    instrument: 'screen',
  },
};

const DEFAULTS = {
  w: 13,        // across, as you look in from the door
  d: 11,        // deep
  h: 3.4,
  wall: 0.2,
  doorW: 1.6,
  doorH: 2.3,
};

/**
 * Build one interior. Returns everything the caller needs to enter it, collide
 * with it and take it down again — it registers nothing globally, because a
 * module that pushes into someone else's arrays is a module you cannot test.
 */
export function buildInteriorBuilding(scene, spec){
  const P = { ...DEFAULTS, ...spec.metrics };
  const S = { ...STYLES.lab, ...(STYLES[spec.style] ?? {}), ...(spec.styleOverrides ?? {}) };
  // Declared here because the fit-out is built before the instrument is, and
  // every fitting in the room asks the same question: chalk, or a screen?
  const isChalk = S.instrument === 'chalk';
  const index = spec.index ?? 0;
  const ox = DISTRICT_X + index * GAP;      // room origin, x
  const oz = 0;
  const accent = new THREE.Color(spec.colour ?? 0x5b6068);

  const group = new THREE.Group();
  group.position.set(ox, 0, oz);
  scene.add(group);
  const colliders = [];
  const interactables = [];
  const add = (m) => { group.add(m); return m; };

  const x0 = -P.w / 2, x1 = P.w / 2, z0 = -P.d / 2, z1 = P.d / 2;

  // ---------------------------------------------------------------- shell
  const floorTex = S.floor === 'plank'
    ? grainTexture(S.floorTint)
    : sheetFloorTexture(S.floorTint, 0.55);
  floorTex.repeat.set(P.w / 2.4, P.d / 2.4);
  const floor = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.w, P.d),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.82, metalness: 0.0, envMapIntensity: 0.35 })
  ));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const wallMat = () => mat(`int-wall-${S.wallKind}-${S.wall}`, () => new THREE.MeshStandardMaterial({
    map: S.wallKind === 'board' ? boardTexture(S.wall) : paintTexture(S.wall),
    roughness: 0.92, metalness: 0.0, envMapIntensity: 0.3,
  }));
  const baseMat = () => mat(`int-base-${S.skirt}`, () => new THREE.MeshStandardMaterial({
    color: S.skirt, roughness: 0.7, metalness: 0.05, envMapIntensity: 0.3,
  }));

  /** A wall panel with its collider. `skip` leaves a doorway hole. */
  const wallRun = (ax, az, bx, bz) => {
    const len = Math.hypot(bx - ax, bz - az);
    const cx = (ax + bx) / 2, cz = (az + bz) / 2;
    const along = Math.abs(bx - ax) > Math.abs(bz - az);
    const m = add(new THREE.Mesh(
      new THREE.BoxGeometry(along ? len : P.wall, P.h, along ? P.wall : len), wallMat()));
    m.position.set(cx, P.h / 2, cz);
    m.receiveShadow = true;
    const bw = along ? len : P.wall, bd = along ? P.wall : len;
    colliders.push(new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(ox + cx, P.h / 2, oz + cz), new THREE.Vector3(bw, P.h, bd)));
    // Skirting, so the wall meets the floor in a line rather than a seam.
    const sk = add(new THREE.Mesh(
      new THREE.BoxGeometry(along ? len : P.wall + 0.02, 0.14, along ? P.wall + 0.02 : len), baseMat()));
    sk.position.set(cx, 0.07, cz);
    return m;
  };

  // Three solid walls and a front wall split around the doorway. The door is
  // on -z, which is where the player arrives facing +z, into the room.
  wallRun(x0, z1, x1, z1);
  wallRun(x0, z0, x0, z1);
  wallRun(x1, z0, x1, z1);
  const half = (P.w - P.doorW) / 2;
  wallRun(x0, z0, x0 + half, z0);
  wallRun(x1 - half, z0, x1, z0);
  // Header over the doorway, so the opening reads as a door and not a gap.
  const header = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.doorW, P.h - P.doorH, P.wall), wallMat()));
  header.position.set(0, P.doorH + (P.h - P.doorH) / 2, z0);

  // Ceiling. A suspended tile grid with lit diffusers for a laboratory or a
  // boat; open rafters and a hanging bulb for a building that was put up in a
  // fortnight in 1943. Both are emissive rather than lit — see the light budget
  // in CLAUDE.md — so neither costs a real light.
  if(S.ceiling === 'rafters'){
    const boardTex = grainTexture(typeof S.floorTint === 'string' ? S.floorTint : '#7a6244');
    boardTex.repeat.set(P.w / 2.4, P.d / 2.4);
    const deck = add(new THREE.Mesh(
      new THREE.PlaneGeometry(P.w, P.d),
      new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.96, envMapIntensity: 0.16 })));
    deck.rotation.x = Math.PI / 2;
    deck.position.y = P.h - 0.06;
    const beamMat = mat(`int-beam-${S.skirt}`, () => new THREE.MeshStandardMaterial({
      color: S.skirt, roughness: 0.85, envMapIntensity: 0.2 }));
    for(let i = -2; i <= 2; i++){
      const beam = add(new THREE.Mesh(new THREE.BoxGeometry(P.w - 0.1, 0.16, 0.12), beamMat));
      beam.position.set(0, P.h - 0.16, i * (P.d / 5));
    }
    // One bulb on a flex, which is the whole lighting installation.
    const flex = add(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 6),
      new THREE.MeshStandardMaterial({ color: 0x2b2620, roughness: 0.9 })));
    flex.position.set(0, P.h - 0.45, 0);
    const bulb = add(new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10),
      new THREE.MeshStandardMaterial({ color: 0xfff0d0, emissive: S.ceilingLight,
        emissiveIntensity: 2.2, roughness: 0.4 })));
    bulb.position.set(0, P.h - 0.72, 0);
    const shade = add(new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.18, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x3a3229, roughness: 0.8, side: THREE.DoubleSide })));
    shade.position.set(0, P.h - 0.6, 0);
  } else {
    const ceilTex = ceilingTileTexture(4);
    ceilTex.repeat.set(P.w / 2.4, P.d / 2.4);
    const ceiling = add(new THREE.Mesh(
      new THREE.PlaneGeometry(P.w, P.d),
      new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.95, envMapIntensity: 0.2 })
    ));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = P.h - 0.35;
    const panelMat = new THREE.MeshStandardMaterial({
      map: diffuserTexture(), emissive: S.ceilingLight, emissiveIntensity: 1.15,
      color: 0xffffff, roughness: 0.6,
    });
    for(const pz of [-P.d / 4, P.d / 4]){
      const p = add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), panelMat));
      p.rotation.x = Math.PI / 2;
      p.position.set(0, P.h - 0.352, pz);
    }
  }
  // No point light at all: a hemisphere, a little ambient and whatever the
  // ceiling is emitting. One real light hung in a room this small burns a
  // bright pool into the surface directly above it.
  const light = new THREE.HemisphereLight(
    S.ceiling === 'rafters' ? 0xf3e3c6 : 0xf6f8fa, 0x8f8d86,
    S.ceiling === 'rafters' ? 0.95 : 1.15);
  add(light);
  const fill = new THREE.AmbientLight(0xfff3e2, S.ceiling === 'rafters' ? 0.42 : 0.35);
  add(fill);

  // ------------------------------------------------------------- fit-out
  // Bench along the back wall, with a worktop and a colour band in the area's
  // own colour, so the room is placeable at a glance from the doorway.
  const benchZ = z1 - 0.62;
  const carcass = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.4, 0.86, 0.72),
    new THREE.MeshStandardMaterial({ color: S.bench, roughness: 0.7, envMapIntensity: 0.3 })));
  carcass.position.set(0, 0.43, benchZ);
  carcass.castShadow = true;
  const top = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.3, 0.06, 0.8),
    new THREE.MeshStandardMaterial({ map: grainTexture(S.worktop), roughness: 0.45, envMapIntensity: 0.4 })));
  top.position.set(0, 0.89, benchZ);
  // The area's colour, as a painted band along the bench, so a room is
  // placeable at a glance. Knocked back toward the timber where the room is
  // 1943: a saturated stripe reads as modern colour-coding.
  const bandColour = isChalk
    ? accent.clone().lerp(new THREE.Color(0x6b4f30), 0.5)
    : accent;
  const band = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.4, 0.07, 0.02),
    new THREE.MeshStandardMaterial({ color: bandColour, roughness: isChalk ? 0.85 : 0.6 })));
  band.position.set(0, 0.80, benchZ - 0.37);
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(ox, 0.45, oz + benchZ), new THREE.Vector3(P.w - 2.3, 0.9, 0.9)));

  // Sample crates and a rack: the room should look worked in, not delivered.
  for(let i = 0; i < 3; i++){
    const c = add(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.36, 0.42),
      new THREE.MeshStandardMaterial({
        color: isChalk ? (i % 2 ? 0x8a6a44 : 0x74563a) : (i % 2 ? 0xb4b8bd : 0xa4aab0),
        map: isChalk ? grainTexture('#8a6a44') : null,
        roughness: isChalk ? 0.9 : 0.8 })));
    c.position.set(x0 + 0.9, 0.18 + (i % 2) * 0.37, z1 - 1.9 - i * 0.55);
    c.castShadow = true;
  }
  for(let i = 0; i < 6; i++){
    const v = add(new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.13, 8),
      new THREE.MeshStandardMaterial({
        color: isChalk ? (i % 3 ? 0xd8cfae : 0xbfae86) : (i % 3 ? 0xc2434b : 0xd8c94a),
        roughness: isChalk ? 0.6 : 0.4 })));
    v.position.set(-1.4 + i * 0.17, 0.985, benchZ - 0.1);
  }

  for(const sx of [-2.1, -3.2]){
    const seat = add(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.06, 12),
      new THREE.MeshStandardMaterial({ color: isChalk ? 0x8a6a44 : 0x3f4b55, roughness: isChalk ? 0.88 : 0.6 })));
    seat.position.set(sx, 0.62, benchZ - 1.0);
    // A wooden stool has legs, not a chromed column.
    if(isChalk){
      for(const [lx, lz] of [[-0.12, -0.12], [0.12, -0.12], [-0.12, 0.12], [0.12, 0.12]]){
        const leg = add(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.6, 6),
          new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.88 })));
        leg.position.set(sx + lx, 0.31, benchZ - 1.0 + lz);
      }
    } else {
      const stem = add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 })));
      stem.position.set(sx, 0.31, benchZ - 1.0);
    }
  }
  const cart = add(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.9, 0.46),
    isChalk
      ? new THREE.MeshStandardMaterial({ map: grainTexture('#7a5c3c'), roughness: 0.9 })
      : new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 0.55, metalness: 0.15 })));
  cart.position.set(x0 + 1.5, 0.45, -1.4);
  cart.castShadow = true;

  // ------------------------------------------------------- the instrument
  // On the back wall above the bench: the first thing in view from the door.
  // What it *is* depends on the theme. A laboratory or a submarine gets a lit
  // panel; a 1943 building gets a blackboard, because there was nothing else to
  // put a number on and a glowing display would be the loudest anachronism in
  // the game.
  const screen = isChalk
    ? chalkboard({ ...(spec.station ?? {}), patient: spec.caseName }, { w: 512, h: 320 })
    : instrumentScreen({ ...(spec.station ?? {}), patient: spec.caseName }, { w: 512, h: 320 });
  const SW = isChalk ? 2.6 : 1.9, SH = SW * (320 / 512);
  const face = add(new THREE.Mesh(
    new THREE.PlaneGeometry(SW, SH),
    isChalk
      ? new THREE.MeshStandardMaterial({ map: screen.texture, roughness: 0.96, metalness: 0.0,
                                         envMapIntensity: 0.18 })
      : new THREE.MeshStandardMaterial({
          map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
          emissiveIntensity: 0.6, roughness: 0.28, envMapIntensity: 0.25,
        })));
  face.position.set(0, 1.95, z1 - P.wall / 2 - 0.06);
  face.rotation.y = Math.PI;                 // faces -z, into the room
  const bezel = add(new THREE.Mesh(
    new THREE.BoxGeometry(SW + (isChalk ? 0.16 : 0.09), SH + (isChalk ? 0.16 : 0.09), 0.06),
    new THREE.MeshStandardMaterial({
      color: isChalk ? 0x6b4f30 : 0x20262b,
      roughness: isChalk ? 0.85 : 0.5, metalness: isChalk ? 0.0 : 0.3 })));
  bezel.position.set(0, 1.95, z1 - P.wall / 2 - 0.02);
  if(isChalk){
    // A chalk rail, with chalk on it. Nothing else says blackboard so quickly.
    const rail = add(new THREE.Mesh(new THREE.BoxGeometry(SW + 0.16, 0.05, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.85 })));
    rail.position.set(0, 1.95 - SH / 2 - 0.07, z1 - P.wall / 2 - 0.08);
    for(let i = 0; i < 3; i++){
      const stick = add(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 6),
        new THREE.MeshStandardMaterial({ color: 0xf2f0e6, roughness: 0.95 })));
      stick.rotation.z = Math.PI / 2;
      stick.position.set(-0.35 + i * 0.28, 1.95 - SH / 2 - 0.03, z1 - P.wall / 2 - 0.1);
    }
    const duster = add(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.07),
      new THREE.MeshStandardMaterial({ color: 0x4a4038, roughness: 0.95 })));
    duster.position.set(SW / 2 - 0.24, 1.95 - SH / 2 - 0.02, z1 - P.wall / 2 - 0.1);
  }

  // The case plate, under the screen. Paper, because it is the one thing in
  // the room about a situation rather than a measurement.
  const sheet_ = isChalk ? typedSheet : printedSheet;
  const plate = sheet_({
    accent: '#' + accent.getHexString(), tag: spec.code ?? '', title: 'Case',
    heading: spec.caseName ?? spec.name ?? '', body: spec.caseLine ?? '',
    footer: spec.caption ?? '',
  }, { w: 512, h: 320 });
  const PW = 0.9, PH = PW * (320 / 512);
  const sheet = add(new THREE.Mesh(
    new THREE.PlaneGeometry(PW, PH),
    new THREE.MeshStandardMaterial({ map: plate.texture, roughness: 0.6, envMapIntensity: 0.35 })));
  sheet.position.set(0, 1.95 - SH / 2 - PH / 2 - 0.09, z1 - P.wall / 2 - 0.06);
  sheet.rotation.y = Math.PI;

  // ---------------------------------------------------------- the case table
  // This used to be a podium: a chromed post with a clipboard tilted on top of
  // it, which is a lectern, and nobody in a laboratory or a wartime office ever
  // read a case off a lectern. It is a work table now, with the papers left on
  // it the way papers are left — the case sheet square-ish in the middle, the
  // rest fanned around it at whatever angle they landed.
  //
  // Off to one side of the room's centre line so it does not stand between the
  // player and the board they are meant to read first, but close enough to be
  // in frame from the doorway: at 2.6 m out it sat outside a 66° field and
  // nobody ever saw it.
  const standX = 2.3, standZ = 0.4;
  const TABLE_H = 0.76, TABLE_W = 1.15, TABLE_D = 0.78;
  const timberTable = isChalk;
  const legMat = () => timberTable
    ? new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.88 })
    : new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 });
  const topMat = timberTable
    ? new THREE.MeshStandardMaterial({ map: grainTexture('#8a6a44'), roughness: 0.86 })
    : new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 0.5, metalness: 0.1 });

  const tableTop = add(new THREE.Mesh(new THREE.BoxGeometry(TABLE_W, 0.05, TABLE_D), topMat));
  tableTop.position.set(standX, TABLE_H, standZ);
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  const apron = add(new THREE.Mesh(new THREE.BoxGeometry(TABLE_W - 0.12, 0.07, TABLE_D - 0.12), legMat()));
  apron.position.set(standX, TABLE_H - 0.07, standZ);
  for(const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
    const leg = add(new THREE.Mesh(new THREE.BoxGeometry(0.055, TABLE_H - 0.05, 0.055), legMat()));
    leg.position.set(standX + lx * (TABLE_W / 2 - 0.07), (TABLE_H - 0.05) / 2, standZ + lz * (TABLE_D / 2 - 0.07));
    leg.castShadow = true;
  }

  // The case itself: one sheet, face up, a little askew.
  const chart = sheet_({
    accent: '#' + accent.getHexString(), tag: spec.code ?? '', title: 'Notes',
    heading: spec.name ?? '', body: spec.standLine ?? 'Waiting for a call on this one.',
    footer: 'Press E to take the case',
  }, { w: 384, h: 512 });
  const caseSheet = add(new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.4),
    new THREE.MeshStandardMaterial({ map: chart.texture, roughness: 0.82, envMapIntensity: 0.3 })));
  caseSheet.rotation.set(-Math.PI / 2, 0, 0.12);
  caseSheet.position.set(standX - 0.05, TABLE_H + 0.028, standZ + 0.02);

  // The rest of the desk: loose paper, a folder, a pencil. Deterministic, so a
  // room looks the same every time it is entered — a table that reshuffles
  // itself is a table the player notices for the wrong reason.
  const paperMat = mat(`int-paper-${timberTable}`, () => new THREE.MeshStandardMaterial({
    color: timberTable ? 0xece2c8 : 0xf6f4ee, roughness: 0.94, envMapIntensity: 0.25 }));
  const LOOSE = [
    [-0.34, -0.14, 0.55, 0.20, 0.26],
    [ 0.30, -0.18, -0.42, 0.19, 0.25],
    [ 0.36,  0.16, 0.22, 0.21, 0.27],
    [-0.28,  0.20, -0.85, 0.18, 0.24],
    [ 0.02, -0.26, 1.25, 0.20, 0.26],
  ];
  LOOSE.forEach(([dx, dz, rot, pw, ph], i) => {
    const sheet = add(new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), paperMat));
    sheet.rotation.set(-Math.PI / 2, 0, rot);
    sheet.position.set(standX + dx, TABLE_H + 0.026 + i * 0.0015, standZ + dz);
  });
  const folder = add(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.34),
    new THREE.MeshStandardMaterial({ color: timberTable ? 0xa8763f : 0x9aa3ad, roughness: 0.9 })));
  folder.rotation.y = -0.34;
  folder.position.set(standX + 0.36, TABLE_H + 0.031, standZ - 0.02);
  const pencil = add(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.17, 6),
    new THREE.MeshStandardMaterial({ color: 0xd8b13a, roughness: 0.7 })));
  pencil.rotation.set(Math.PI / 2, 0, 0.5);
  pencil.position.set(standX - 0.18, TABLE_H + 0.034, standZ - 0.26);

  const standHit = add(new THREE.Mesh(
    new THREE.BoxGeometry(TABLE_W + 0.3, 1.5, TABLE_D + 0.3), new THREE.MeshBasicMaterial({ visible: false })));
  standHit.position.set(standX, 0.85, standZ);
  interactables.push({
    mesh: standHit, type: 'case', id: spec.id,
    prompt: `E — Take the case in ${spec.name}`,
  });
  // The table is the only thing in the room that starts a question, and from
  // the doorway it is a table with paper on it. Mark it.
  const beacon = addCaseBeacon(group, {
    x: standX, z: standZ, colour: accent.getHex(),
    label: 'Take the case · E', height: 2.25,
  });

  // ------------------------------------------------------------ the door
  const doorHit = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.doorW, P.doorH),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })));
  doorHit.position.set(0, P.doorH / 2, z0 + 0.42);
  interactables.push({
    mesh: doorHit, type: 'roomexit', id: spec.id,
    prompt: 'E — Step back outside',
  });
  // A lit exit sign, because a windowless room with one way out needs one.
  const exitSign = add(new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x1d7a4a, emissive: 0x1d7a4a, emissiveIntensity: 0.8 })));
  exitSign.position.set(0, P.doorH + 0.22, z0 + 0.12);

  return {
    id: spec.id,
    group, colliders, interactables, light, screen, plate, chart, beacon,
    /** Light the marker only while there is actually a case waiting here. */
    setCaseOpen(on){ beacon.setActive(on); },
    /** Where the player stands on entering: just inside, facing the room. */
    enterTransform: { x: ox, y: 0, z: oz + z0 + 1.5, yaw: Math.PI },
    origin: { x: ox, z: oz },
    /** Flat floor. The caller hands this to the player while inside. */
    groundHeight: () => 0,
    setVisible(on){
      group.visible = on;
      light.visible = on;
      fill.visible = on;
    },
    update(delta, camera){ screen.update(delta); beacon.update(delta, camera); },
  };
}
