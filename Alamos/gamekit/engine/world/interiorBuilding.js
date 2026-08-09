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
} from './materials.js';
import { instrumentScreen, printedSheet } from './screens.js';
import { addCaseBeacon } from './caseBeacon.js';

/** Far enough along +x that the town is past the camera's far plane. */
export const DISTRICT_X = 4000;
const GAP = 60;               // between neighbouring rooms in the district

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
  const floorTex = sheetFloorTexture([206, 202, 192], 0.55);
  floorTex.repeat.set(P.w / 2.4, P.d / 2.4);
  const floor = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.w, P.d),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.82, metalness: 0.0, envMapIntensity: 0.35 })
  ));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const wallMat = () => mat('int-wall', () => new THREE.MeshStandardMaterial({
    map: paintTexture('#e7e4dc'), roughness: 0.92, metalness: 0.0, envMapIntensity: 0.3,
  }));
  const baseMat = () => mat('int-base', () => new THREE.MeshStandardMaterial({
    color: 0x5d6169, roughness: 0.7, metalness: 0.05, envMapIntensity: 0.3,
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

  // Ceiling: a tiled grid with two lit diffuser panels. Emissive panels do the
  // work that a row of point lights would otherwise do, at no light cost.
  const ceilTex = ceilingTileTexture(4);
  ceilTex.repeat.set(P.w / 2.4, P.d / 2.4);
  const ceiling = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.w, P.d),
    new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.95, envMapIntensity: 0.2 })
  ));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = P.h - 0.35;
  const panelMat = new THREE.MeshStandardMaterial({
    map: diffuserTexture(), emissive: 0xffffff, emissiveIntensity: 1.15,
    color: 0xffffff, roughness: 0.6,
  });
  for(const pz of [-P.d / 4, P.d / 4]){
    const p = add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), panelMat));
    p.rotation.x = Math.PI / 2;
    p.position.set(0, P.h - 0.352, pz);
  }
  // No point light at all. One hung anywhere below the ceiling burns a bright
  // pool into the tiles directly above it — the room is small enough that its
  // falloff cannot avoid them — and the light budget in CLAUDE.md is six for a
  // whole scene. A hemisphere, a little ambient and the lit panels give an even
  // room with no real light spent.
  const light = new THREE.HemisphereLight(0xf6f8fa, 0x8f8d86, 1.15);
  add(light);
  const fill = new THREE.AmbientLight(0xfff3e2, 0.35);
  add(fill);

  // ------------------------------------------------------------- fit-out
  // Bench along the back wall, with a worktop and a colour band in the area's
  // own colour, so the room is placeable at a glance from the doorway.
  const benchZ = z1 - 0.62;
  const carcass = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.4, 0.86, 0.72),
    new THREE.MeshStandardMaterial({ color: 0xdedbd2, roughness: 0.7, envMapIntensity: 0.3 })));
  carcass.position.set(0, 0.43, benchZ);
  carcass.castShadow = true;
  const top = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.3, 0.06, 0.8),
    new THREE.MeshStandardMaterial({ map: grainTexture('#9aa0a6'), roughness: 0.45, envMapIntensity: 0.4 })));
  top.position.set(0, 0.89, benchZ);
  const band = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.w - 2.4, 0.07, 0.02),
    new THREE.MeshStandardMaterial({ color: accent, roughness: 0.6 })));
  band.position.set(0, 0.80, benchZ - 0.37);
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(ox, 0.45, oz + benchZ), new THREE.Vector3(P.w - 2.3, 0.9, 0.9)));

  // Sample crates and a rack: the room should look worked in, not delivered.
  for(let i = 0; i < 3; i++){
    const c = add(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.36, 0.42),
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0xb4b8bd : 0xa4aab0, roughness: 0.8 })));
    c.position.set(x0 + 0.9, 0.18 + (i % 2) * 0.37, z1 - 1.9 - i * 0.55);
    c.castShadow = true;
  }
  for(let i = 0; i < 6; i++){
    const v = add(new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.13, 8),
      new THREE.MeshStandardMaterial({ color: i % 3 ? 0xc2434b : 0xd8c94a, roughness: 0.4 })));
    v.position.set(-1.4 + i * 0.17, 0.985, benchZ - 0.1);
  }

  for(const sx of [-2.1, -3.2]){
    const seat = add(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.06, 12),
      new THREE.MeshStandardMaterial({ color: 0x3f4b55, roughness: 0.6 })));
    seat.position.set(sx, 0.62, benchZ - 1.0);
    const stem = add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 })));
    stem.position.set(sx, 0.31, benchZ - 1.0);
  }
  const cart = add(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.9, 0.46),
    new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 0.55, metalness: 0.15 })));
  cart.position.set(x0 + 1.5, 0.45, -1.4);
  cart.castShadow = true;

  // ------------------------------------------------------- the instrument
  // On the back wall above the bench: the first thing in view from the door.
  const screen = instrumentScreen({ ...(spec.station ?? {}), patient: spec.caseName }, { w: 512, h: 320 });
  const SW = 1.9, SH = SW * (320 / 512);
  const face = add(new THREE.Mesh(
    new THREE.PlaneGeometry(SW, SH),
    new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.6, roughness: 0.28, envMapIntensity: 0.25,
    })));
  face.position.set(0, 1.95, z1 - P.wall / 2 - 0.06);
  face.rotation.y = Math.PI;                 // faces -z, into the room
  const bezel = add(new THREE.Mesh(
    new THREE.BoxGeometry(SW + 0.09, SH + 0.09, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x20262b, roughness: 0.5, metalness: 0.3 })));
  bezel.position.set(0, 1.95, z1 - P.wall / 2 - 0.02);

  // The case plate, under the screen. Paper, because it is the one thing in
  // the room about a situation rather than a measurement.
  const plate = printedSheet({
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

  // ---------------------------------------------------------- case stand
  // Off to one side of the room's centre line, so it does not stand between
  // the player and the screen they are meant to read first.
  // Close enough to the centre line to be in frame when you walk in — at
  // 2.6 m off centre it sat outside a 66° field and nobody ever saw it — and
  // far enough across not to stand between the player and the screen.
  const standX = 2.3, standZ = 0.4;
  const foot = add(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 14),
    new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 })));
  foot.position.set(standX, 0.02, standZ);
  const post = add(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.034, 1.05, 10),
    new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 })));
  post.position.set(standX, 0.53, standZ);
  const chart = printedSheet({
    accent: '#' + accent.getHexString(), tag: spec.code ?? '', title: 'Notes',
    heading: spec.name ?? '', body: spec.standLine ?? 'Waiting for a call on this one.',
    footer: 'Press E to take the case',
  }, { w: 384, h: 512 });
  const board = add(new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.56, 0.02),
    [null, null, null, null,
     new THREE.MeshStandardMaterial({ map: chart.texture, roughness: 0.7, envMapIntensity: 0.35 }),
     null].map(m => m ?? new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.55 }))));
  board.position.set(standX, 1.2, standZ);
  board.rotation.set(-0.3, Math.PI, 0);      // tilted back, facing the doorway
  board.castShadow = true;
  const standHit = add(new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.5, 0.8), new THREE.MeshBasicMaterial({ visible: false })));
  standHit.position.set(standX, 0.9, standZ);
  interactables.push({
    mesh: standHit, type: 'case', id: spec.id,
    prompt: `E — Take the case in ${spec.name}`,
  });
  // The stand is the only thing in the room that starts a question, and from
  // the doorway it looks like the rest of the paper in the room. Mark it.
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
