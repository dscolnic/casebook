// world.js — Mission Control, wired to the engine's world contract.
//
// The engine ships two worlds: a town, and a floor with a corridor down the
// middle. Both were wrong for this game. A control centre is one large room
// where the floor steps down toward a wall of displays and the teams sit in
// rows facing it — the geometry *is* the org chart, and putting these six teams
// behind six doors would have thrown that away and produced the hospital again.
//
// So this is the third world in the repo, after `outdoorTown` and
// `interiorFloor`, and it satisfies exactly the same contract:
// THEME_CONTRACT.md § "What the world module must provide".
//
// What makes it different to walk around in:
//   · four tiers, stepping down toward the boards. `groundHeight` is a
//     staircase in z, and it is the only vertical movement in these games;
//   · no corridor and no doors between the player and their work — every
//     console is in sight from the back of the room;
//   · the light comes from the displays. Three real lights total, and every
//     bright surface is emissive.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { site, CONSOLES, BOARDS } from './site.js';
import { openCaseGroups } from '../../engine/core/app.js';
// The beacon's label billboards toward whoever is looking at it.
import { camera } from '../../engine/core/player.js';
import { instrumentScreen } from '../../engine/world/screens.js';
import { dampEnvironment } from '../../engine/world/materials.js';
// The same marker the other games put over an open case stand. Here it hangs
// over the console: with no doors and no rooms, an open call had nothing to
// announce it from across the floor except a ring on the carpet.
import { addCaseBeacon } from '../../engine/world/caseBeacon.js';

export let scene = null;
export let renderer = null;

export const colliders = [];        // Box3[]
export const softColliders = [];    // {x,z,r}[]
export const interactables = [];    // {mesh, type, id, prompt, info?}
/** groupId -> { id, name, pos, entry, desk } — one per console cluster. */
export const stopMeshes = new Map();
/** groupId -> the console's own screen, so a call can change the room. */
export const areaScreens = new Map();

let theme = null;
let waypointMesh = null;
let peopleStations = [];
const R = site.room;
const boardScreens = [];
const consoleScreens = [];
/** groupId -> the beacon over that console, lit while its call is open. */
const beacons = new Map();

/**
 * The floor is a staircase, and this is the only description of it.
 *
 * Row 0 is at the front, nearest the boards, and lowest. Each row behind it is
 * `rowStep` higher. Anything that needs to know how high the floor is here —
 * the player, the crowd, a desk, a chair — asks this and nothing else.
 */
export function groundHeight(x, z){
  void x;
  const { rowZ, rowStep } = R;
  // Behind the last row, the floor is flat at the back of the room.
  if(z >= rowZ[rowZ.length - 1]) return (rowZ.length - 1) * rowStep;
  // In front of the first row, flat at the board wall.
  if(z <= rowZ[0]) return 0;
  for(let i = 0; i < rowZ.length - 1; i++){
    if(z >= rowZ[i] && z < rowZ[i + 1]){
      // The step itself is a short ramp rather than a lip, so walking up it
      // does not catch: a hard 0.55 m rise stops the player dead.
      const t = (z - rowZ[i]) / (rowZ[i + 1] - rowZ[i]);
      const ramp = Math.min(1, Math.max(0, (t - 0.62) / 0.28));
      return (i + ramp) * rowStep;
    }
  }
  return 0;
}

const rowY = (row) => row * R.rowStep;

// ------------------------------------------------------------------ materials
const M = {};
function buildMaterials(){
  M.wall = new THREE.MeshStandardMaterial({ color: 0x2b3038, roughness: 0.92, envMapIntensity: 0.35 });
  M.floor = new THREE.MeshStandardMaterial({ color: 0x23272d, roughness: 0.86, envMapIntensity: 0.3 });
  M.riser = new THREE.MeshStandardMaterial({ color: 0x171a1f, roughness: 0.9 });
  M.desk = new THREE.MeshStandardMaterial({ color: 0x3c4550, roughness: 0.62, metalness: 0.2, envMapIntensity: 0.5 });
  M.top = new THREE.MeshStandardMaterial({ color: 0x8f9aa2, roughness: 0.5, metalness: 0.25 });
  M.frame = new THREE.MeshStandardMaterial({ color: 0x596470, roughness: 0.45, metalness: 0.5 });
  M.glass = new THREE.MeshPhysicalMaterial({
    color: 0x9fb6c4, roughness: 0.08, metalness: 0, transmission: 0.82,
    transparent: true, opacity: 0.35, thickness: 0.04,
  });
  M.ceilingPanel = new THREE.MeshStandardMaterial({
    color: 0xdfe6ea, emissive: 0xcfe0e8, emissiveIntensity: 0.55, roughness: 0.7,
  });
}

function box(w, h, d, x, y, z, mat, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m);
  return m;
}
function collide(cx, cz, w, d, y, h){
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(cx, y + h / 2, cz), new THREE.Vector3(w, h, d)));
}

// ---------------------------------------------------------------- the shell
function buildRoom(){
  const { halfWidth: HW, front, back, ceiling, rowZ, rowStep } = R;

  // Floor, one slab per tier plus the flat aprons at either end.
  const tiers = [
    { z0: front, z1: rowZ[0], y: 0 },
    ...rowZ.slice(0, -1).map((z, i) => ({ z0: z, z1: rowZ[i + 1], y: rowY(i) })),
    { z0: rowZ[rowZ.length - 1], z1: back, y: rowY(rowZ.length - 1) },
  ];
  for(const t of tiers){
    const d = t.z1 - t.z0;
    const slab = box(HW * 2, 0.3, d, 0, t.y - 0.15, (t.z0 + t.z1) / 2, M.floor);
    slab.castShadow = false;
    // The riser: the vertical face of the step, darker than the tread.
    if(t.y > 0) box(HW * 2, rowStep, 0.12, 0, t.y - rowStep / 2, t.z0, M.riser);
  }

  // Walls.
  for(const s of [-1, 1]) box(0.3, ceiling, back - front, s * HW, ceiling / 2, (front + back) / 2, M.wall);
  box(HW * 2, ceiling, 0.3, 0, ceiling / 2, front, M.wall);              // board wall
  box(HW * 2, ceiling, 0.3, 0, ceiling / 2, back, M.wall);               // back wall
  collide(-HW, (front + back) / 2, 0.6, back - front, 0, ceiling);
  collide(HW, (front + back) / 2, 0.6, back - front, 0, ceiling);
  collide(0, front, HW * 2, 0.6, 0, ceiling);
  collide(0, back, HW * 2, 0.6, 0, ceiling);

  // Ceiling, with lit panels down the two aisles. Emissive only — a fixture
  // per panel is how a floor goes from 118 fps to 20.
  box(HW * 2, 0.2, back - front, 0, ceiling, (front + back) / 2, M.wall).castShadow = false;
  for(let i = 0; i < 7; i++){
    const z = front + 3 + i * ((back - front - 6) / 6);
    for(const s of [-1, 1]){
      const p = box(3.4, 0.08, 1.1, s * 8, ceiling - 0.14, z, M.ceilingPanel);
      p.castShadow = false;
    }
  }
}

/** The wall of plot boards: the only bright thing in the room. */
function buildBoards(){
  const y = 2.4;
  for(const b of BOARDS){
    const screen = instrumentScreen({
      kind: 'panel', title: b.label,
      rows: [
        { label: 'STATUS', value: 'HOLD', status: 'normal' },
        { label: 'GET', value: '000:00', status: 'normal' },
      ],
    }, { w: 512, h: 256 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(b.w, b.h), new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.85, roughness: 0.9,
    }));
    mesh.position.set(b.x, y + b.h / 2, R.front + 0.2);
    scene.add(mesh);
    // A bezel, so the boards read as hardware rather than as paint.
    box(b.w + 0.4, b.h + 0.4, 0.16, b.x, y + b.h / 2, R.front + 0.1, M.frame).castShadow = false;
    boardScreens.push({ mesh, screen });
  }
}

/**
 * One console cluster: a desk on its tier, three screens, a nameplate, and the
 * chairs. The desk is the mission stop — walking to it and pressing E is what
 * a door is in the other games.
 */
function buildConsole(spec, def){
  const y = rowY(spec.row);
  const z = R.rowZ[spec.row];
  const colour = def?.color ? new THREE.Color(def.color) : new THREE.Color(0x4d5a66);

  // Desk
  const desk = box(spec.w, 0.78, 1.5, spec.x, y + 0.39, z, M.desk);
  box(spec.w + 0.12, 0.06, 1.62, spec.x, y + 0.8, z, M.top).castShadow = false;
  collide(spec.x, z, spec.w + 0.2, 1.7, y, 0.85);

  // Screens along the back of the desk, tilted up at the player.
  const screen = instrumentScreen({
    kind: 'panel', title: spec.name,
    rows: [
      { label: 'CALL', value: 'OPEN', status: 'alarm' },
      { label: 'LAST', value: '—', status: 'normal' },
    ],
  }, { w: 384, h: 256 });
  // Kept small. At 0.42 of the desk width the INTEG screen was 4.6 m across and
  // read as a wall panel floating in the middle of the room rather than as
  // something sitting on a desk.
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.52),
    new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.7, roughness: 0.85,
    }));
  panel.position.set(spec.x, y + 1.12, z - 0.45);
  panel.rotation.x = -0.18;
  scene.add(panel);
  areaScreens.set(spec.group, panel);
  // Two blank repeaters either side, angled in. A single screen on an eight
  // metre desk reads as a desk with a television on it.
  for(const sx of [-1, 1]){
    const rep = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.44),
      new THREE.MeshStandardMaterial({
        map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
        emissiveIntensity: 0.4, roughness: 0.9,
      }));
    rep.position.set(spec.x + sx * (spec.w * 0.3), y + 1.06, z - 0.42);
    rep.rotation.set(-0.16, -sx * 0.28, 0);
    scene.add(rep);
  }
  consoleScreens.push({ panel, screen, group: spec.group, name: spec.name });

  // A coloured strip along the desk front, in the area's own colour: the one
  // place colour identifies a team, and it is never the only channel — the
  // nameplate says it too.
  const strip = box(spec.w, 0.09, 0.06, spec.x, y + 0.72, z + 0.78,
    new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.5, roughness: 0.6 }));
  strip.castShadow = false;

  // Nameplate on a small stand, readable from the aisle. Single-sided: text on
  // a DoubleSide material renders mirrored from behind.
  const plate = instrumentScreen({ kind: 'panel', title: spec.name, rows: [] }, { w: 384, h: 96 });
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.36),
    new THREE.MeshStandardMaterial({
      map: plate.texture, emissive: 0xffffff, emissiveMap: plate.texture,
      emissiveIntensity: 0.5, roughness: 0.9, side: THREE.FrontSide,
    }));
  plateMesh.position.set(spec.x, y + 1.06, z + 0.79);
  plateMesh.rotation.y = Math.PI;
  scene.add(plateMesh);

  // Chairs, so the console is somewhere people sit rather than a plinth.
  for(let i = 0; i < Math.max(2, Math.round(spec.w / 3.4)); i++){
    const cx = spec.x - spec.w / 2 + 1.6 + i * 3.0;
    box(0.62, 0.1, 0.6, cx, y + 0.46, z + 1.2, M.frame).castShadow = false;
    box(0.62, 0.7, 0.1, cx, y + 0.8, z + 1.48, M.frame).castShadow = false;
    softColliders.push({ x: cx, z: z + 1.25, r: 0.42 });
  }

  const beacon = addCaseBeacon(scene, {
    x: spec.x, z: z + 1.9, y: y + 0.02,
    colour: def?.color ?? 0xf0b429,
    label: spec.name, height: 2.15,
  });
  beacon.setActive(false);
  beacons.set(spec.group, beacon);

  // The stop. `entry` is where the player ends up standing: in the aisle behind
  // the desk, facing the boards.
  stopMeshes.set(spec.group, {
    id: spec.group, name: spec.name, desk,
    pos: new THREE.Vector3(spec.x, y, z),
    entry: new THREE.Vector3(spec.x, y, z + 2.6),
  });

  // `case`, not `door`. A door hands off to the interior manager, which builds
  // the team's room out in the district four kilometres away and teleports the
  // player into it — right in the other games, where a door is the way into a
  // place you are not yet standing in, and wrong here: the console IS the
  // workplace, and the player is already in the room.
  interactables.push({
    mesh: desk, type: 'case', id: spec.group,
    prompt: `E — Take the ${spec.name} console`,
  });

  peopleStations.push({
    id: spec.group, x: spec.x - spec.w / 2 - 1.4, z: z + 1.1,
    facing: Math.PI,                      // facing the boards, like everyone else
  });
}

/** The glass gallery across the back wall, above the last row. */
function buildGallery(){
  const { halfWidth: HW, back, ceiling } = R;
  const y = rowY(R.rowZ.length - 1) + 2.6;
  box(HW * 2 - 1, 0.25, 4.4, 0, y, back - 2.4, M.frame).castShadow = false;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(HW * 2 - 2, 1.5), M.glass);
  glass.position.set(0, y + 0.85, back - 4.6);
  scene.add(glass);
  for(let i = -4; i <= 4; i++){
    box(0.14, ceiling - y - 0.2, 0.14, i * 5, y + (ceiling - y) / 2, back - 4.6, M.frame).castShadow = false;
  }
  // The gallery floor is solid to anyone underneath it.
  collide(0, back - 2.4, HW * 2, 4.4, y, 0.3);
}

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.045, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 1.0, roughness: 0.5 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  g.add(ring);
  g.userData.ring = ring;
  scene.add(g);
  return g;
}
export function getWaypointMesh(){ return waypointMesh ?? (waypointMesh = makeWaypoint()); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
  w.position.set(x, groundHeight(x, z) + 0.02, z);
  w.visible = true;
}
export function getStopPosition(id){
  return stopMeshes.get(id)?.pos ?? new THREE.Vector3();
}
export function getStopEntry(id){
  return stopMeshes.get(id)?.entry ?? new THREE.Vector3();
}

// ---------------------------------------------------------------- initWorld
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0x0d1116, near: 24, far: 78 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);
  scene.background = new THREE.Color(fog.colour);

  buildMaterials();

  // Environment, damped. `scene.environmentIntensity` does not exist before
  // three r163 and setting it is silent — a submarine once rendered with every
  // bulkhead lifted to pale sage that way.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(new RoomEnvironment(renderer), 0.06);
  scene.environment = rt.texture;
  pmrem.dispose();

  // Three real lights, which is the whole budget spent: a soft ambient, a
  // hemisphere, and one key from above the boards so the desks cast shadows
  // back up the room.
  const L = look.lighting ?? {};
  scene.add(new THREE.AmbientLight(0xa8bcd0, L.ambient ?? 0.42));
  scene.add(new THREE.HemisphereLight(0xc6d8e6, 0x1b2026, L.hemi ?? 0.5));
  const key = new THREE.DirectionalLight(0xdce8f2, L.key ?? 0.85);
  key.position.set(0, 14, R.front + 4);
  key.target.position.set(0, 0, R.back - 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 70;
  key.shadow.camera.left = -26; key.shadow.camera.right = 26;
  key.shadow.camera.top = 26; key.shadow.camera.bottom = -26;
  key.shadow.bias = -0.0005;
  scene.add(key, key.target);

  buildRoom();
  buildBoards();
  buildGallery();

  const groups = theme.content?.GROUPS ?? [];
  for(const c of CONSOLES) buildConsole(c, groups.find(g => g.id === c.group));

  // The status board, on the back wall by the doors.
  const statusScreen = instrumentScreen({ kind: 'panel', title: 'FLIGHT STATUS', rows: [] }, { w: 512, h: 256 });
  const status = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6),
    new THREE.MeshStandardMaterial({
      map: statusScreen.texture, emissive: 0xffffff, emissiveMap: statusScreen.texture,
      emissiveIntensity: 0.6, roughness: 0.9, side: THREE.FrontSide,
    }));
  const backY = rowY(R.rowZ.length - 1);
  status.position.set(-14, backY + 2.0, R.back - 0.2);
  status.rotation.y = Math.PI;
  scene.add(status);
  interactables.push({ mesh: status, type: 'board', id: 'BOARD', prompt: 'E — Open the flight status board' });
  boardScreens.push({ mesh: status, screen: statusScreen });

  dampEnvironment(scene, 0.45);

  getWaypointMesh().visible = false;
  return { scene, renderer };
}

// ------------------------------------------------------------- state -> world
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  if(!state) return;
  const groups = theme?.content?.GROUPS ?? [];
  for(const c of consoleScreens){
    const g = groups.find(x => x.id === c.group);
    const done = Math.round(pct(c.group) ?? 0);
    const verdict = state.areaVerdict?.[c.group];
    c.screen.set({
      title: c.name,
      status: verdict === 'unresolved' ? 'alarm' : 'normal',
      rows: [
        { label: 'CALL', value: verdict === 'unresolved' ? 'OPEN' : 'CLEAR',
          status: verdict === 'unresolved' ? 'alarm' : 'normal' },
        { label: 'READY', value: `${done} %`, status: done > 60 ? 'high' : 'normal' },
      ],
    });
    void g;
  }
  const m = state.week ?? 1;
  for(const b of boardScreens){
    b.screen.set({
      rows: [
        { label: 'SHIFT', value: `${m} / 15`, status: 'normal' },
        { label: 'CALLS OPEN', value: String(state.groups?.filter(x => state.areaVerdict?.[x.id] === 'unresolved').length ?? 0),
          status: 'normal' },
      ],
    });
  }

  // Every console with a call still open is lit, not just the next one: the day
  // is taken in any order.
  const open = openCaseGroups();
  for(const [id, b] of beacons) b.setActive(open.has(id));

  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
}

/**
 * There is no time of day in a windowless room, and that is the point: the
 * only clock in Mission Control is the mission clock. Kept because the contract
 * requires it.
 */
export function updateTimeOfDay(){ return null; }

export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  // The aisles: down each side and along the back, where controllers actually
  // stand when they are not at a console.
  const out = [];
  for(const row of R.rowZ){
    out.push({ x: -19, z: row + 1.5 }, { x: 19, z: row + 1.5 });
  }
  for(let i = -2; i <= 2; i++) out.push({ x: i * 6, z: R.back - 3 });
  return out;
}

let lastAnim = 0;
export function updateWorldAnimation(t){
  const delta = lastAnim ? Math.min(0.1, t - lastAnim) : 0.016;
  lastAnim = t;
  for(const b of beacons.values()) b.update(delta, camera);
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = groundHeight(waypointMesh.position.x, waypointMesh.position.z)
      + 0.02 + Math.sin(t * 2) * 0.04;
  }
  for(const b of boardScreens){
    if(b.mesh.material) b.mesh.material.emissiveIntensity = 0.8 + Math.sin(t * 1.3) * 0.05;
  }
}
