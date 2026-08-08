// world.js — builds the hospital floor from plan.js.
//
// The game API is unchanged from the Los Alamos build so main.js, player.js,
// npcs.js and interactions.js keep working: initWorld / scene / renderer /
// colliders / interactables / buildingMeshes / updateWorldFromState /
// getBuildingPosition / waypoint helpers / updateDayNight.
import * as THREE from 'three';
import { GROUP_DEFS } from './divisions.js';
import { getState } from './gameState.js';
import {
  def, groupPct, getCurrentMission, nextMissionStopIndex,
  completedMissionStops, missionStopForGroup,
} from './simulation.js';
import { renderCentralBoardTexture } from './dashboard.js';
import {
  CORRIDOR, ENVELOPE, ROOMS, ROOM_BY_GROUP, WALL, CEILING_H, TILE_H,
  DOOR_W, DOOR_W_WIDE, DOOR_H, roomBounds, doorCentre, roomEntryPoint,
} from './plan.js';
import { buildProps } from './hospitalProps.js';
import { chair as buildChair } from './hospitalProps.js';
import {
  buildLighting, addRoomLight, vinylFloorTexture, paintTexture, ceilingTileTexture,
  diffuserTexture, doorTexture, mat, clearMaterialCache, PALETTE,
  srand, srandRange, resetSeed,
} from './interiorEnv.js';

export let scene, renderer, centralBoardMesh, centralBoardCanvas, centralBoardTexture;
export const buildingMeshes = new Map();   // group id -> door / sign / lamp / board
export const interactables = [];
export const colliders = [];
export const softColliders = [];           // {x,z,r} — carts, poles, chairs
const lightPanels = [];                    // troffer diffusers, dimmed at night
const roomMeshes = new Map();              // room id -> { floor, lights }

const WALL_H = CEILING_H;

// --------------------------------------------------------------- room copy
const ROOM_INFO = {
  RECEPTION:'<b>Reception &amp; Registration</b> — Every visit starts here. The clerk checks who you are, why you came, and how urgent it is, then sends you to the right place. Writing things down carefully is part of medicine: the next person on the team has to be able to read it.',
  WAITING:'<b>Family Waiting</b> — Families wait here while the team works. Good hospitals explain what is happening in short, kind sentences, because waiting without information is the hardest part. Notice the hand-sanitiser station by the door — everyone uses it, visitors included.',
  QUIET:'<b>Quiet Room</b> — A small room with soft chairs and no monitors, for families who need a moment away from noise. Hospitals are loud, and rest is part of care.',
  PHARM:'<b>Pharmacy</b> — Licensed pharmacists prepare medicines behind the window and check every one twice. Junior doctors watch and ask questions here; they never handle medicine themselves.',
  LAB:'<b>Clean Laboratory</b> — Microscopes, slides and charts. Samples are handled only by trained staff wearing gloves. What you can do here is read the results and think about what they mean.',
  STATION:'<b>Nurses’ Station</b> — The centre of the floor. From here the team can see the whole corridor, watch the monitors, and answer call bells. The whiteboard lists every patient and which room they are in.',
  SUPPLY:'<b>Clean Supply</b> — Gowns, gloves, dressings and linen, stacked so the cleanest things sit highest. Anything that leaves this room and is not used cannot come back in.',
  TRI:'<b>Emergency &amp; Triage</b> — Where the team decides who needs help first. Trouble breathing comes before almost everything else, then heavy bleeding, then injuries that hurt but are stable. Sorting is not about who arrived first.',
  RESP:'<b>Respiratory &amp; Cardiology</b> — Lungs bring oxygen in; the heart pumps it around. A cough, a wheeze, or a very fast pulse points to this pair of systems working harder than usual.',
  NUTR:'<b>Nutrition &amp; Kidney Care</b> — Food becomes fuel, and the kidneys keep the body’s water in balance. Tummy aches, thirst, and changes in how much someone drinks all belong here.',
  MOVE:'<b>Imaging &amp; Rehab</b> — X-rays make pictures of bones without opening anyone up. Next door, the rehab gym rebuilds the muscles and joints that move those bones.',
  BRAIN:'<b>Neurology &amp; Senses</b> — The brain, the spinal cord and the nerves carry signals fast. Eyes and ears collect the signals; the brain turns them into a picture and a sound.',
  DEF:'<b>Infection &amp; Immunology</b> — How the body keeps germs out and fights the ones that get in. Skin is the wall, white blood cells are the team, and washing your hands is the single best thing anyone can do.',
};

// ---------------------------------------------------------------- primitives
function box(w, h, d, x, y, z, material, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
function addCollider(cx, cz, w, d, h = WALL_H){
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(cx, h / 2, cz), new THREE.Vector3(w, h, d)
  ));
}

const wallMat = () => mat('wall', () => new THREE.MeshStandardMaterial({
  map: paintTexture(PALETTE.wall), roughness: 0.92, metalness: 0, envMapIntensity: 0.5,
}));
const baseMat = () => mat('base', () => new THREE.MeshStandardMaterial({
  color: PALETTE.base, roughness: 0.55, metalness: 0.02, envMapIntensity: 0.6,
}));
const railMat = () => mat('rail', () => new THREE.MeshStandardMaterial({
  color: PALETTE.rail, roughness: 0.45, metalness: 0.25, envMapIntensity: 0.9,
}));
const frameMat = () => mat('frame', () => new THREE.MeshStandardMaterial({
  color: PALETTE.frame, roughness: 0.4, metalness: 0.55, envMapIntensity: 1.0,
}));
const glassMat = () => mat('glass', () => new THREE.MeshStandardMaterial({
  color: PALETTE.glass, roughness: 0.06, metalness: 0.85, envMapIntensity: 1.2,
}));

/**
 * A partition with a coved vinyl base and, on corridor runs, a crash rail.
 * Straight along x or z only, which is all this plan needs.
 */
function wall(x0, z0, x1, z1, opts = {}){
  const h = opts.height ?? WALL_H;
  const alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
  const len = alongX ? Math.abs(x1 - x0) : Math.abs(z1 - z0);
  if(len < 0.01) return null;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const w = alongX ? len : WALL;
  const d = alongX ? WALL : len;
  const m = box(w, h, d, cx, h / 2 + (opts.y ?? 0), cz, opts.material ?? wallMat());
  if(!opts.noCollide) addCollider(cx, cz, w, d, h);

  if(opts.base !== false){
    // Coved base curls 100 mm up the wall — the detail that says "hospital"
    const bh = 0.11;
    for(const s of (opts.baseSides ?? [-1, 1])){
      const bw = alongX ? len : WALL + 0.028;
      const bd = alongX ? WALL + 0.028 : len;
      const bx = cx + (alongX ? 0 : s * 0.014);
      const bz = cz + (alongX ? s * 0.014 : 0);
      const b = box(bw, bh, bd, bx, bh / 2, bz, baseMat());
      b.castShadow = false;
    }
  }
  if(opts.rail){
    // Crash rail at 0.9 m, on the corridor face only
    for(const s of (opts.railSides ?? [-1, 1])){
      const rw = alongX ? len : 0.055;
      const rd = alongX ? 0.055 : len;
      const rx = cx + (alongX ? 0 : s * (WALL / 2 + 0.03));
      const rz = cz + (alongX ? s * (WALL / 2 + 0.03) : 0);
      box(rw, 0.13, rd, rx, 0.92, rz, railMat());
    }
  }
  return m;
}

/**
 * Corridor wall for one room: two returns and a header, leaving a doorway.
 * Rooms flagged `open` get a full-height opening instead (lobby, station).
 */
function partitionWithDoor(r){
  const b = roomBounds(r);
  const x = b.xInner;
  if(r.open){
    // Open frontage: just a nib of wall at each end, and a bulkhead overhead
    const nib = 0.9;
    wall(x, r.z0, x, r.z0 + nib, { rail: true });
    wall(x, r.z1 - nib, x, r.z1, { rail: true });
    const openLen = (r.z1 - nib) - (r.z0 + nib);
    box(WALL, 0.55, openLen, x, WALL_H - 0.275, (r.z0 + r.z1) / 2, wallMat());
    return null;
  }
  const dw = r.door === 'wide' ? DOOR_W_WIDE : DOOR_W;
  const cz = b.cz;
  wall(x, r.z0, x, cz - dw / 2 - 0.06, { rail: true });
  wall(x, cz + dw / 2 + 0.06, x, r.z1, { rail: true });
  // header over the opening
  box(WALL, WALL_H - DOOR_H, dw + 0.12, x, DOOR_H + (WALL_H - DOOR_H) / 2, cz, wallMat());
  return { x, cz, dw };
}

/** Door leaf, pressed-steel frame, vision panel, lever, kick plate. */
function makeDoor(r, opening){
  const { x, cz, dw } = opening;
  const b = roomBounds(r);
  const s = b.sign;                        // outward normal, into the room
  const leafMat = mat('doorLeaf', () => new THREE.MeshStandardMaterial({
    map: doorTexture(PALETTE.doorLeaf), roughness: 0.55, metalness: 0.02, envMapIntensity: 0.7,
  }));

  // frame: two jambs plus a head
  const jambD = 0.09;
  for(const sz of [-1, 1]){
    box(WALL + 0.05, DOOR_H + 0.09, jambD, x, (DOOR_H + 0.09) / 2, cz + sz * (dw / 2 + jambD / 2), frameMat());
  }
  box(WALL + 0.05, 0.09, dw + jambD * 2, x, DOOR_H + 0.045, cz, frameMat());

  // leaf, hung slightly ajar so rooms read as enterable
  const swing = 0.30;
  const leaf = new THREE.Group();
  const halfW = dw / 2;
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.045, DOOR_H - 0.04, dw - 0.03), leafMat);
  panel.position.set(0, 0, -(dw - 0.03) / 2);
  panel.castShadow = true; panel.receiveShadow = true;
  leaf.add(panel);
  // vision panel — wired glass, so you can see someone coming the other way
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(dw * 0.34, 0.62), glassMat());
  vp.rotation.y = Math.PI / 2;
  vp.position.set(0.024, DOOR_H * 0.30, -(dw - 0.03) / 2);
  leaf.add(vp);
  const vpFrame = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.70, dw * 0.40), frameMat());
  vpFrame.position.set(0, DOOR_H * 0.30, -(dw - 0.03) / 2);
  leaf.add(vpFrame);
  // stainless kick plate
  const kick = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.26, dw - 0.06), railMat());
  kick.position.set(0, -DOOR_H / 2 + 0.16, -(dw - 0.03) / 2);
  leaf.add(kick);
  // lever handle
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.035, 0.035), railMat());
  lever.position.set(s * 0.08, 0, -(dw - 0.20));
  leaf.add(lever);

  leaf.position.set(x, DOOR_H / 2, cz + dw / 2);
  leaf.rotation.y = s * swing;
  scene.add(leaf);

  // A flat interaction target in the opening — reliable to hit with the
  // crosshair whichever way the leaf happens to be swung.
  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(dw, DOOR_H),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
  );
  hit.position.set(x, DOOR_H / 2, cz);
  hit.rotation.y = Math.PI / 2;
  scene.add(hit);
  return { leaf, hit };
}

// ------------------------------------------------------------------- signage
function signTexture(title, sub, accent, code){
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 320;
  const g = c.getContext('2d');
  g.fillStyle = '#f7f7f4'; g.fillRect(0, 0, 1024, 320);
  g.fillStyle = accent; g.fillRect(0, 0, 1024, 74);
  if(code){
    g.fillStyle = '#ffffff';
    g.font = '800 40px Inter, Helvetica, Arial, sans-serif';
    g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillText(code, 26, 39);
  }
  g.fillStyle = '#1b1e22';
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  let fs = 66;
  g.font = `800 ${fs}px Inter, Helvetica, Arial, sans-serif`;
  while(g.measureText(title).width > 950 && fs > 30){ fs -= 2; g.font = `800 ${fs}px Inter, Helvetica, Arial, sans-serif`; }
  g.fillText(title, 26, 176);
  if(sub){
    g.fillStyle = '#5b6068';
    g.font = '600 34px Inter, Helvetica, Arial, sans-serif';
    g.fillText(sub, 26, 232);
  }
  // Braille dot strip, as every real room sign carries. Kept faint — at sign
  // scale a strong dot row reads as a smudge under the text.
  g.fillStyle = 'rgba(150,158,166,0.55)';
  for(let i = 0; i < 30; i++){
    const bx = 26 + i * 17;
    for(let k = 0; k < 3; k++){
      if(Math.random() > 0.5){ g.beginPath(); g.arc(bx, 276 + k * 10, 2.2, 0, 6.3); g.fill(); }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Wall-mounted room sign beside the door, at the standard 1.5 m. */
function addRoomSign(r, accent, code){
  const b = roomBounds(r);
  const tex = signTexture(r.name, r.group ? 'Department' : '', accent, code || '');
  const w = 0.82, h = w * 0.3125;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, metalness: 0.05, envMapIntensity: 0.8 })
  );
  // Open frontages have no wall beside the opening, so their sign goes on the
  // nib at the south end rather than floating in the middle of the corridor.
  const z = r.open
    ? r.z0 + 0.45
    : b.cz + (r.door === 'wide' ? DOOR_W_WIDE : DOOR_W) / 2 + 0.62;
  sign.position.set(b.xInner - b.sign * (WALL / 2 + 0.012), 1.5, z);
  sign.rotation.y = b.sign > 0 ? -Math.PI / 2 : Math.PI / 2;
  scene.add(sign);
  // Slim backing tray. Built thin on x already — rotating it as well turned it
  // into a slab standing across the corridor.
  const tray = box(0.02, h + 0.03, w + 0.03,
    b.xInner - b.sign * (WALL / 2 + 0.004), 1.5, z, frameMat());
  tray.castShadow = false;
  return sign;
}

/**
 * Overhead blade sign hanging in the corridor, the way wayfinding works.
 * Two single-sided faces rather than one double-sided plane: a double-sided
 * map shows the legend mirrored — and the arrows pointing the wrong way —
 * to anyone approaching from the other direction.
 */
function bladeFace(westText, eastText){
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#25506b'; g.fillRect(0, 0, 1024, 256);
  g.fillStyle = '#ffffff';
  g.font = '700 44px Inter, Helvetica, Arial, sans-serif';
  g.textBaseline = 'middle';
  g.textAlign = 'left';  g.fillText('← ' + westText, 34, 128);
  g.textAlign = 'right'; g.fillText(eastText + ' →', 990, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
function addBladeSign(z, westText, eastText){
  // Facing north (+z), world east falls on your left-hand side; facing south it
  // falls on your right. Each face therefore points its arrows differently.
  const faces = [
    { ry: Math.PI, tex: bladeFace(eastText, westText) },  // read when heading north
    { ry: 0,       tex: bladeFace(westText, eastText) },  // read when heading south
  ];
  faces.forEach(({ ry, tex }, i) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 0.82),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, envMapIntensity: 0.7 })
    );
    m.position.set(0, TILE_H - 0.62, z + (i ? 0.012 : -0.012));
    m.rotation.y = ry;
    scene.add(m);
  });
  for(const dx of [-1.5, 1.5]){
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 6), railMat());
    rod.position.set(dx, TILE_H - 0.25, z);
    scene.add(rod);
  }
}

// ------------------------------------------------------------ shell + ceiling
function buildShell(){
  const { x0, x1, z0, z1 } = ENVELOPE;

  // Floor: corridor runs a different vinyl from the rooms, as it always does.
  const corridorFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(CORRIDOR.halfWidth * 2, z1 - z0),
    new THREE.MeshStandardMaterial({
      map: vinylFloorTexture(PALETTE.floorCorridor, 0.55),
      roughness: 0.34, metalness: 0.02, envMapIntensity: 0.55,
    })
  );
  corridorFloor.rotation.x = -Math.PI / 2;
  corridorFloor.position.set(0, 0.002, (z0 + z1) / 2);
  corridorFloor.receiveShadow = true;
  scene.add(corridorFloor);

  const roomFloorMat = new THREE.MeshStandardMaterial({
    map: vinylFloorTexture(PALETTE.floorRoom, 0.5),
    roughness: 0.36, metalness: 0.02, envMapIntensity: 0.55,
  });
  for(const side of [-1, 1]){
    const f = new THREE.Mesh(new THREE.PlaneGeometry(x1 - CORRIDOR.halfWidth, z1 - z0), roomFloorMat);
    f.rotation.x = -Math.PI / 2;
    f.position.set(side * (CORRIDOR.halfWidth + (x1 - CORRIDOR.halfWidth) / 2), 0.001, (z0 + z1) / 2);
    f.receiveShadow = true;
    scene.add(f);
  }

  // Exterior envelope
  wall(x0, z0, x1, z0, { baseSides: [1] });          // south end (entrance)
  wall(x0, z1, x1, z1, { baseSides: [-1] });         // north end
  wall(x0, z0, x0, z1, { baseSides: [1] });          // west
  wall(x1, z0, x1, z1, { baseSides: [-1] });         // east

  // End glazing: the daylight source, and the only view out.
  const winMat = new THREE.MeshStandardMaterial({
    color: 0xdfeaf0, emissive: 0xdfeaf0, emissiveIntensity: 0.85,
    roughness: 0.1, metalness: 0.1,
  });
  for(const [zz, ry] of [[z0 + 0.11, 0], [z1 - 0.11, Math.PI]]){
    for(const dx of [-5.4, -1.8, 1.8, 5.4]){
      const w = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.7), winMat);
      w.position.set(dx, 1.65, zz);
      w.rotation.y = ry;
      scene.add(w);
      const mull = box(3.12, 1.82, 0.05, dx, 1.65, zz + (ry ? -0.03 : 0.03), frameMat());
      mull.castShadow = false;
      lightPanels.push(w);
    }
  }

  // Suspended ceiling
  const ceilTex = ceilingTileTexture();
  ceilTex.repeat.set((x1 - x0) / 2.4, (z1 - z0) / 2.4);
  const ceil = new THREE.Mesh(
    new THREE.PlaneGeometry(x1 - x0, z1 - z0),
    new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.96, metalness: 0, envMapIntensity: 0.4 })
  );
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set((x0 + x1) / 2, TILE_H, (z0 + z1) / 2);
  ceil.receiveShadow = true;
  scene.add(ceil);

  // Troffers, air diffusers and sprinklers on the grid
  const diffTex = diffuserTexture();
  const troffMat = new THREE.MeshStandardMaterial({
    map: diffTex, emissive: 0xffffff, emissiveMap: diffTex,
    emissiveIntensity: 1.0, roughness: 0.5, metalness: 0,
  });
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0xd6d8d6, roughness: 0.6, metalness: 0.3 });
  for(let z = z0 + 3; z < z1; z += 3.0){
    // corridor run
    const t = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), troffMat);
    t.rotation.x = Math.PI / 2;
    t.position.set(0, TILE_H - 0.012, z);
    scene.add(t);
    lightPanels.push(t);
    // room fixtures either side
    for(const side of [-1, 1]){
      const t2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), troffMat);
      t2.rotation.x = Math.PI / 2;
      t2.position.set(side * 5.4, TILE_H - 0.012, z + 1.5);
      scene.add(t2);
      lightPanels.push(t2);
    }
    // supply-air grille and a sprinkler head
    const gr = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.58), grilleMat);
    gr.rotation.x = Math.PI / 2;
    gr.position.set(srandRange(-1.2, 1.2), TILE_H - 0.008, z + 1.5);
    scene.add(gr);
    const spr = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.02, 0.07, 6), railMat());
    spr.position.set(srandRange(-1.4, 1.4), TILE_H - 0.045, z - 0.9);
    scene.add(spr);
  }

  // Illuminated exit signs at both ends
  for(const [zz, ry] of [[z0 + 1.2, 0], [z1 - 1.2, Math.PI]]){
    const c = document.createElement('canvas');
    c.width = 256; c.height = 96;
    const g = c.getContext('2d');
    g.fillStyle = '#0f1a12'; g.fillRect(0, 0, 256, 96);
    g.fillStyle = '#3ddc7a';
    g.font = '800 58px Inter, Helvetica, Arial, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('EXIT', 128, 52);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.23),
      new THREE.MeshStandardMaterial({ map: t, emissive: 0x3ddc7a, emissiveMap: t, emissiveIntensity: 1.4, side: THREE.DoubleSide })
    );
    s.position.set(0, TILE_H - 0.36, zz);
    s.rotation.y = ry;
    scene.add(s);
  }
}

// ------------------------------------------------------------- department fit
/** Status lamp + chalk-free acrylic readiness board beside a department door. */
function addDepartmentFurniture(r, gdef){
  const b = roomBounds(r);
  const s = b.sign;
  const faceX = b.xInner - s * (WALL / 2 + 0.02);
  const ry = s > 0 ? -Math.PI / 2 : Math.PI / 2;
  const dw = r.door === 'wide' ? DOOR_W_WIDE : DOOR_W;

  // Over-door status lamp — a real "room in use" indicator, not a floating orb
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0x3d6f52, emissive: 0x3d6f52, emissiveIntensity: 0.35,
    roughness: 0.3, metalness: 0.1,
  });
  const lamp = box(0.05, 0.11, 0.30, faceX, DOOR_H + 0.30, b.cz, lampMat, ry);
  const hood = box(0.10, 0.03, 0.36, b.xInner - s * (WALL / 2 + 0.05), DOOR_H + 0.38, b.cz, frameMat(), ry);
  hood.castShadow = false;

  // Readiness board — a printed care-board in an acrylic holder
  const boardCanvas = document.createElement('canvas');
  boardCanvas.width = 520; boardCanvas.height = 300;
  boardCanvas._ctx = boardCanvas.getContext('2d');
  const boardTex = new THREE.CanvasTexture(boardCanvas);
  boardTex.colorSpace = THREE.SRGBColorSpace;
  boardTex.anisotropy = 8;
  const bw = 0.72, bh = bw * (300 / 520);
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(bw, bh),
    new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.45, metalness: 0.05, envMapIntensity: 0.8 })
  );
  const boardZ = b.cz - dw / 2 - 0.58;
  board.position.set(faceX, 1.46, boardZ);
  board.rotation.y = ry;
  scene.add(board);
  const holder = box(0.022, bh + 0.05, bw + 0.05, b.xInner - s * (WALL / 2 + 0.008), 1.46, boardZ, frameMat(), ry);
  holder.castShadow = false;

  return { lamp, board, boardCanvas, boardTex };
}

/**
 * The case stand: a chart on a stand beside the couch, and the thing you
 * actually interact with to start a shift's science challenge. Putting it
 * inside the room means the player walks in and looks at the case rather than
 * having a full-screen card appear the moment they touch the door handle.
 */
function addRoomCaseStand(r, gdef){
  const b = roomBounds(r);
  const s = b.sign;
  const x = b.xInner + s * 1.5;
  const z = b.cz - 1.9;

  // pedestal
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.03, 12), railMat());
  foot.position.set(x, 0.015, z);
  foot.receiveShadow = true;
  scene.add(foot);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.03, 1.05, 8), railMat());
  post.position.set(x, 0.53, z);
  post.castShadow = true;
  scene.add(post);

  // A clipboard-sized chart with the department's own colour on the header,
  // so from across the room you can tell which case you are looking at.
  const cvs = document.createElement('canvas');
  cvs.width = 384; cvs.height = 512;
  const g = cvs.getContext('2d');
  g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, 384, 512);
  g.fillStyle = gdef.color; g.fillRect(0, 0, 384, 62);
  g.fillStyle = '#ffffff';
  g.font = '800 30px Inter, Helvetica, Arial, sans-serif';
  g.textBaseline = 'middle';
  g.fillText(gdef.code, 18, 32);
  g.fillStyle = '#1b1e22';
  g.font = '700 21px Inter, Helvetica, Arial, sans-serif';
  g.fillText('Case notes', 18, 96);
  g.strokeStyle = '#d3d6d8'; g.lineWidth = 1.5;
  for(let i = 0; i < 12; i++){
    const y = 132 + i * 27;
    g.beginPath(); g.moveTo(18, y); g.lineTo(366, y); g.stroke();
    // a few filled-in lines so it does not read as blank paper
    if(i < 6){
      g.fillStyle = 'rgba(60,70,80,0.42)';
      g.fillRect(18, y - 13, 120 + Math.random() * 190, 8);
    }
  }
  g.fillStyle = gdef.color;
  g.font = '700 18px Inter, Helvetica, Arial, sans-serif';
  g.fillText('Waiting for the junior doctor', 18, 480);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.44, 0.02),
    [frameMat(), frameMat(), frameMat(), frameMat(),
     new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, envMapIntensity: 0.5 }), frameMat()]
  );
  board.position.set(x, 1.16, z);
  // The player always arrives from the door side (+z of the stand), so the
  // chart faces +z with a slight turn toward the doorway. Facing it along the
  // room's outward axis left it edge-on and reading as a bare frame.
  board.rotation.set(-0.34, s * 0.28, 0);
  board.castShadow = true;
  scene.add(board);
  softColliders.push({ x, z, r: 0.28 });

  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.3, 0.7),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hit.position.set(x, 0.85, z);
  scene.add(hit);
  interactables.push({
    mesh: hit, type: 'case', id: r.group,
    prompt: `E — Review the case in ${r.name}`,
  });
}

/**
 * Step-back-out target, set just inside the doorway. It sits nearer the camera
 * than the door plane from inside the room, and further from it in the
 * corridor, so each side of the door offers the right prompt.
 */
function addRoomExit(r){
  const b = roomBounds(r);
  const dw = r.door === 'wide' ? DOOR_W_WIDE : DOOR_W;
  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(dw, DOOR_H),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
  );
  hit.position.set(b.xInner + b.sign * 0.38, DOOR_H / 2, b.cz);
  hit.rotation.y = Math.PI / 2;
  scene.add(hit);
  interactables.push({
    mesh: hit, type: 'roomexit', id: r.group,
    prompt: 'E — Step back into the corridor',
  });
}

// ---------------------------------------------------------------- world build
export function initWorld(canvas){
  resetSeed();
  clearMaterialCache();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0f12);
  // Very light haze so the far end of a 54 m corridor recedes a little.
  scene.fog = new THREE.Fog(0xdfe4e6, 26, 96);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  buildLighting(scene, renderer);
  buildShell();

  const accentFor = id => (GROUP_DEFS.find(g => g.id === id)?.color) || '#5b6068';

  for(const r of ROOMS){
    const b = roomBounds(r);
    const opening = partitionWithDoor(r);
    const gdef = r.group ? GROUP_DEFS.find(g => g.id === r.group) : null;
    const accent = gdef ? gdef.color : '#47606f';
    addRoomSign(r, accent, gdef ? gdef.code : '');
    addRoomLight(scene, b.cx, b.cz, r.open ? 3.6 : 3.0, r.open ? 13 : 11);
    if(r.z1 - r.z0 > 8) addRoomLight(scene, b.cx, b.cz + (r.z1 - r.z0) * 0.28, 2.2, 8);

    // Cross-walls between neighbouring rooms
    wall(b.xInner, r.z0, b.xOuter, r.z0, { baseSides: [-1, 1] });

    if(opening){
      const { leaf, hit } = makeDoor(r, opening);
      if(gdef){
        const furn = addDepartmentFurniture(r, gdef);
        buildingMeshes.set(r.group, {
          mesh: leaf, doorMesh: hit, signMesh: null,
          lightMesh: furn.lamp, boardMesh: furn.board,
          boardCanvas: furn.boardCanvas, boardTex: furn.boardTex,
          pos: new THREE.Vector3(b.cx, 0, b.cz),
          entry: roomEntryPoint(r),
          angle: b.sign > 0 ? Math.PI / 2 : -Math.PI / 2,
          color: gdef.color,
          room: r,
        });
        interactables.push({
          mesh: hit, type: 'door', id: r.group,
          prompt: `E — Enter ${r.name}`,
        });
        addRoomCaseStand(r, gdef);
        addRoomExit(r);
      } else {
        // Non-department rooms: the door is scenery, the sign carries the info
        interactables.push({
          mesh: hit, type: 'info', id: r.id,
          prompt: `E — Read: ${r.name}`,
          info: ROOM_INFO[r.id] || `<b>${r.name}</b>`,
        });
      }
    } else {
      // Open frontage — put the info hot-spot on the room's own volume
      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 2.0, Math.min(4.0, r.z1 - r.z0 - 1.4)),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.position.set(b.xInner + b.sign * 0.9, 1.2, b.cz);
      scene.add(hit);
      interactables.push({
        mesh: hit, type: 'info', id: r.id,
        prompt: `E — Read: ${r.name}`,
        info: ROOM_INFO[r.id] || `<b>${r.name}</b>`,
      });
    }
    roomMeshes.set(r.id, r);
  }
  // close the north end of the last room on each side
  for(const side of ['w', 'e']){
    const last = [...ROOMS].filter(r => r.side === side).pop();
    if(last){
      const b = roomBounds(last);
      wall(b.xInner, last.z1, b.xOuter, last.z1, { baseSides: [-1, 1] });
    }
  }

  // Equipment, trolleys, wall furniture and the wayfinding stripes.
  const props = buildProps(scene);
  props.hard.forEach(b => colliders.push(b));
  props.soft.forEach(c => softColliders.push(c));

  addBladeSign(11.5, 'Waiting', 'Pharmacy');
  addBladeSign(26.5, 'Nutrition', 'Imaging');
  addBladeSign(38.5, 'Infection', 'Nurses’ Station');

  createCentralBoard();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// --------------------------------------------------------------- central board
function createCentralBoard(){
  const w = 2.6, h = 1.5;
  centralBoardCanvas = document.createElement('canvas');
  centralBoardCanvas.width = 900;
  centralBoardCanvas.height = 520;
  centralBoardTexture = new THREE.CanvasTexture(centralBoardCanvas);
  centralBoardTexture.colorSpace = THREE.SRGBColorSpace;
  centralBoardTexture.anisotropy = 8;

  // The shift board lives on the corridor wall opposite the nurses' station,
  // which is exactly where a real ward whiteboard hangs.
  const z = 40, x = -CORRIDOR.halfWidth + 0.02;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: centralBoardTexture, roughness: 0.28, metalness: 0.04, envMapIntensity: 0.9 })
  );
  mesh.position.set(x, 1.6, z);
  mesh.rotation.y = Math.PI / 2;
  mesh.userData = { type: 'board', id: 'central' };
  scene.add(mesh);
  centralBoardMesh = mesh;

  const tray = box(0.04, h + 0.09, w + 0.09, x - 0.02, 1.6, z, frameMat(), Math.PI / 2);
  tray.castShadow = false;
  // marker tray under the board
  box(0.09, 0.035, w * 0.6, x + 0.04, 1.6 - h / 2 - 0.05, z, railMat(), Math.PI / 2);

  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
  );
  hit.position.set(x + 0.03, 1.6, z);
  hit.rotation.y = Math.PI / 2;
  scene.add(hit);
  interactables.push({ mesh: hit, type: 'board', id: 'central', prompt: 'E — Read the shift board' });
}

// -------------------------------------------------------------------- waypoint
let waypointMesh = null;
function ensureWaypoint(){
  if(waypointMesh) return waypointMesh;
  const geo = new THREE.ConeGeometry(0.22, 0.44, 4);
  geo.rotateX(Math.PI);
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0x2f9e8f, emissive: 0x2f9e8f, emissiveIntensity: 1.1, roughness: 0.3,
  }));
  mesh.position.y = TILE_H - 0.75;
  mesh.visible = false;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.022, 8, 24),
    new THREE.MeshBasicMaterial({ color: 0x2f9e8f, transparent: true, opacity: 0.9 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.32;
  mesh.add(ring);
  mesh.userData.ring = ring;
  scene.add(mesh);
  waypointMesh = mesh;

  const clock = new THREE.Clock();
  (function pulse(){
    requestAnimationFrame(pulse);
    if(!waypointMesh.visible) return;
    const t = clock.getElapsedTime();
    waypointMesh.position.y = TILE_H - 0.75 + Math.sin(t * 2.0) * 0.07;
    waypointMesh.rotation.y += 0.012;
    waypointMesh.userData.ring.rotation.z += 0.02;
  })();
  return mesh;
}
export function getWaypointMesh(){ return waypointMesh || ensureWaypoint(); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
  w.position.x = x; w.position.z = z; w.visible = true;
}

// -------------------------------------------------------------- state → world
export function updateWorldFromState(){
  const state = getState();
  if(!state) return;

  const curMission = getCurrentMission(state);
  const nextIdx = nextMissionStopIndex(state);
  const nextStop = curMission && nextIdx >= 0 ? curMission.stops[nextIdx] : null;
  const wp = ensureWaypoint();
  if(nextStop && buildingMeshes.has(nextStop.group)){
    const e = buildingMeshes.get(nextStop.group);
    // hover over the corridor outside the door, where the player can see it
    wp.position.x = e.pos.x > 0 ? CORRIDOR.halfWidth - 0.5 : -CORRIDOR.halfWidth + 0.5;
    wp.position.z = e.pos.z;
    wp.visible = true;
  } else {
    wp.visible = false;
  }

  const nextGroup = nextStop?.group;
  buildingMeshes.forEach((entry, id) => {
    const gs = state.groups.find(g => g.id === id);
    if(!gs) return;
    const d = def(id);
    const complete = gs.milestone >= d.milestones.length;
    const stop = missionStopForGroup(state, id);
    const done = stop ? completedMissionStops(state).includes(stop.index) : false;
    const isNext = id === nextGroup && !done;
    const offRoute = nextStop && id !== nextGroup;

    // Over-door lamp: green ready, blue you're wanted here, amber behind,
    // red an open issue. Same language a real status light uses.
    let colour = 0x3d6f52, intensity = 0.5;
    if(done){ colour = 0x3d6f52; intensity = 0.6; }
    else if(isNext){ colour = 0x2f6f9e; intensity = 1.5; }
    else if(gs.issue){ colour = 0x9a3f36; intensity = 1.1; }
    else if(complete){ colour = 0x3d6f52; intensity = 0.6; }
    else {
      const pct = groupPct(gs);
      const expected = 30 + (state.week / 15) * 50;
      if(pct < expected - 12){ colour = 0xd4a017; intensity = 0.9; }
    }
    // An unresolved call outranks the other lamp states — it is the one thing
    // the player has to go back and put right, so it must be visible from the
    // street rather than only inside the results panel.
    const verdict = state.areaVerdict?.[gs.id];
    if(verdict === "unresolved"){ colour = 0xc0392b; }
    else if(verdict === "clear"){ colour = 0x1f8a4c; }
    entry.lightMesh.material.color.setHex(colour);
    entry.lightMesh.material.emissive.setHex(colour);
    entry.lightMesh.material.emissiveIntensity = intensity;

    // Dim the door leaf of rooms that are not this stop, without making
    // anything transparent — see-through walls read as a bug, not a hint.
    const dim = offRoute && !done;
    if(entry.mesh) entry.mesh.traverse(o => {
      if(o.isMesh && o.material && o.material.color) o.material.color.setScalar(dim ? 0.72 : 1);
    });

    drawCareBoard(entry, gs, d, state, { done, isNext, complete });
  });

  // The ward whiteboard by the nurses' station.
  if(centralBoardCanvas){
    try{
      const ctx = centralBoardCanvas.getContext('2d');
      renderCentralBoardTexture(ctx, centralBoardCanvas.width, centralBoardCanvas.height);
      centralBoardTexture.needsUpdate = true;
    }catch(e){ /* board copy is cosmetic — never let it stop the shift */ }
  }

  updateDayNight();
}

/** The printed care-board beside each department door. */
function drawCareBoard(entry, gs, d, state, flags){
  const W = 520, H = 300;
  const ctx = entry.boardCanvas._ctx;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = entry.color; ctx.fillRect(0, 0, W, 52);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 26px Inter, Helvetica, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${d.code} — ${d.name}`.slice(0, 34), 16, 27);

  const pct = Math.round(groupPct(gs));
  ctx.fillStyle = '#1b1e22';
  ctx.font = '700 22px Inter, Helvetica, Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Cases completed', 16, 96);
  ctx.font = '800 40px Inter, Helvetica, Arial, sans-serif';
  ctx.fillText(`${pct}%`, 16, 146);

  // progress bar
  ctx.fillStyle = '#e6e8ea'; ctx.fillRect(16, 166, W - 32, 18);
  ctx.fillStyle = entry.color; ctx.fillRect(16, 166, (W - 32) * (pct / 100), 18);

  ctx.font = '600 19px Inter, Helvetica, Arial, sans-serif';
  if(gs.issue){
    ctx.fillStyle = '#9a3f36';
    ctx.fillText('Needs a second look', 16, 220);
    ctx.fillStyle = '#6a4a46';
    ctx.font = '500 16px Inter, Helvetica, Arial, sans-serif';
    const short = gs.issue.length > 46 ? gs.issue.slice(0, 46) + '…' : gs.issue;
    ctx.fillText(short, 16, 246);
  } else if(flags.isNext){
    ctx.fillStyle = '#2f6f9e';
    ctx.fillText('You are expected here', 16, 220);
  } else if(flags.done || flags.complete){
    ctx.fillStyle = '#3d6f52';
    ctx.fillText('Cases handed off', 16, 220);
  } else {
    ctx.fillStyle = '#5b6068';
    ctx.fillText(`Shift ${state.week} of 15`, 16, 220);
  }
  ctx.fillStyle = '#9aa0a6';
  ctx.font = '500 15px Inter, Helvetica, Arial, sans-serif';
  ctx.fillText('Junior doctor — observe, ask, hand off', 16, 278);
  entry.boardTex.needsUpdate = true;
}

/**
 * A hospital never goes dark, but a night shift looks different: corridor
 * lighting drops to half, the colour warms, and the room troffers go off.
 */
export function updateDayNight(){
  const state = getState();
  if(!state || !scene?.userData?.key) return;
  const h = ((((state.timeHours ?? 8) % 24) + 24) % 24);
  const isNight = h < 6.5 || h >= 19.5;
  const dusk = (h >= 17.5 && h < 19.5) || (h >= 6.5 && h < 8);

  const level = isNight ? 0.42 : dusk ? 0.78 : 1.0;
  scene.userData.key.intensity = 1.35 * level;
  scene.userData.ambient.intensity = 0.95 * (isNight ? 0.55 : 1);
  if(scene.userData.hemi) scene.userData.hemi.intensity = 0.55 * (isNight ? 0.5 : 1);
  (scene.userData.fixtures || []).forEach((l, i) => {
    // every other corridor fixture is switched off overnight
    const off = isNight && i % 2 === 1;
    l.intensity = off ? 0 : (l.userData.base ??= l.intensity) * level;
  });
  scene.userData.day.intensity = isNight ? 0.05 : dusk ? 0.45 : 0.85;
  scene.userData.day.color.setHex(dusk ? 0xffd9a8 : 0xfff0d8);
  lightPanels.forEach(p => {
    if(p.material.emissiveIntensity !== undefined){
      p.material.emissiveIntensity = (p.userData.base ??= p.material.emissiveIntensity) * level;
    }
  });
  renderer.toneMappingExposure = isNight ? 1.22 : 1.0;
}

export function getBuildingPosition(id){
  const e = buildingMeshes.get(id);
  if(!e) return null;
  // aim at the corridor outside the door, not the middle of the room
  return new THREE.Vector3(e.pos.x > 0 ? 1.0 : -1.0, 0, e.pos.z);
}
export function getRoomEntry(id){
  const e = buildingMeshes.get(id);
  return e ? e.entry : null;
}
export function getCentralBoardMesh(){ return centralBoardMesh; }
export function createInteriorScene(){ /* rooms are part of the main scene now */ }
