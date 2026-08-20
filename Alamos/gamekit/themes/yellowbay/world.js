// world.js — Ardley Fab 7: two parallel wings and the glass link between them.
//
// WHY THIS THEME BRINGS ITS OWN WORLD. `engine/world/interiorFloor.js` builds
// one corridor with rooms down both sides, which is the right shape for a ward,
// a concourse or a lab spine and the wrong shape for a fab. A fab floor is two
// gowned corridors — process down one, analysis and offices down the other —
// joined by a crossing everybody uses, and the crossing is the part of the
// building people describe when they get home: its floor is glass over the
// subfab, so a wafer being carried from one wing to the other goes over the
// pumps, the abatement and six hundred metres of gas line.
//
// It is NOT a second interior builder. Each wing is built by the engine's own
// `buildInterior`, into a group this module then slides sideways, so rooms,
// doors, signage, case stands and the theme's fit-out hooks are all the shared
// code every other interior game runs. What is written here is the two offsets
// and the link.
//
// The contract this file satisfies is THEME_CONTRACT.md § "What the world
// module must provide", and the shape is `interiorFloor.js` — read that first
// if anything below looks arbitrary.
import * as THREE from 'three';
import { buildInterior, buildInteriorLighting, updateInteriorTimeOfDay } from '../../engine/world/interiorSite.js';
import { wordedSign, furnishingMaterials } from '../../engine/world/interiorKit.js';
import { displayBoard } from '../../engine/world/kit.js';
import { tuneRendererForDevice } from '../../engine/world/materials.js';

export const colliders = [];
export const softColliders = [];
export const interactables = [];
/** groupId -> { id, name, pos, entry, door } — one per mission destination. */
export const stopMeshes = new Map();
const caseStands = new Map();

export let scene = null;
export let renderer = null;

let theme = null;
let plan = null;
let waypointMesh = null;
let boardScreens = [];
let lightPanels = [];
let peopleStations = [];
export const areaScreens = new Map();

/** One source of truth for floor height. The whole floor is flat, glass included. */
export function groundHeight(){ return 0; }

export function setCaseOpen(groupId, on){
  caseStands.get(groupId)?.beacon?.setActive(!!on);
}

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.75, 0.06, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.9, roughness: 0.5 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.06;
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.7, roughness: 0.5 }));
  shaft.position.y = 0.9;
  g.add(ring, shaft);
  g.userData.ring = ring;
  scene.add(g);
  return g;
}
export function getWaypointMesh(){ return waypointMesh ?? (waypointMesh = makeWaypoint()); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
  w.position.set(x, 0, z);
  w.visible = true;
}

export function getStopPosition(id){
  const s = stopMeshes.get(id);
  return s ? s.pos : new THREE.Vector3(0, 0, 0);
}
export function getStopEntry(id){
  const s = stopMeshes.get(id);
  return s ? s.entry : new THREE.Vector3(0, 0, 0);
}

/**
 * Slide one wing's build sideways.
 *
 * `buildInterior` puts its corridor centreline on x = 0 and there is no
 * argument for anything else, so the wing is built into a group and the group
 * is moved. The meshes come with it because three.js composes the transforms;
 * everything the *engine* reads is plain numbers in world space — colliders,
 * soft colliders, stop positions, case stands — and those have to be moved by
 * hand. Forgetting one of them is a wing you can see and walk through.
 */
function slide(built, dx){
  const v = new THREE.Vector3(dx, 0, 0);
  for(const c of built.colliders) c.translate(v);
  for(const s of built.softColliders) s.x += dx;
  for(const s of built.stopMeshes.values()){ s.pos.x += dx; s.entry.x += dx; }
  for(const s of built.caseStands.values()) s.x += dx;
  return built;
}

/**
 * The link, and the reason anybody remembers this building.
 *
 * A glazed crossing at the far end of both wings, with the subfab open beneath
 * it. Each wing is built with `openEnds: { z1: true }`, so the builder leaves
 * that end wall standing either side of its corridor and the corridor's own
 * width open — the two openings this bridge lands on. What is built here is the
 * floor between them, the walls that close the crossing, and the four and a
 * half metres of plant underneath that the glass exists to show.
 *
 * The floor is glass and the player is held up by `groundHeight`, which returns
 * 0 everywhere. Nothing about walking here is special-cased; it only looks it.
 */
function buildLink(P){
  const { link, wings } = plan;
  const half = P.corridorHalfWidth;
  const depth = P.roomDepth;
  const H = P.ceilingH;
  // The crossing runs the full width between the two corridors' outer edges, so
  // stepping off either corridor is stepping straight onto it.
  const x0 = wings[0].x - half, x1 = wings[1].x + half;
  const cx = (x0 + x1) / 2, cz = (link.z0 + link.z1) / 2;
  const w = x1 - x0, d = link.z1 - link.z0;

  const put = (bw, bh, bd, x, y, z, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    scene.add(m);
    return m;
  };
  const collide = (x, z, bw, bd, h = H) => colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(x, h / 2, z), new THREE.Vector3(bw, h, bd)));

  const steel = new THREE.MeshStandardMaterial({ color: 0x9a9280, roughness: 0.45, metalness: 0.35 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xefe6cf, roughness: 0.92 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x191b1e, roughness: 0.95 });
  const pipe = new THREE.MeshStandardMaterial({ color: 0x6f7d7a, roughness: 0.5, metalness: 0.5 });
  const duct = new THREE.MeshStandardMaterial({ color: 0x8c7f66, roughness: 0.6, metalness: 0.3 });
  const strip = new THREE.MeshStandardMaterial({
    color: 0xdfe8ea, emissive: 0xdfe8ea, emissiveIntensity: 0.9, roughness: 0.2 });
  const under = new THREE.MeshStandardMaterial({
    color: 0x6f8f9a, emissive: 0x4d707c, emissiveIntensity: 0.8, roughness: 0.3 });
  // NOT the engine's `M.glass`, which is a dark metallic mirror — right for a
  // window seen from outside at dusk and completely opaque from within. A floor
  // meant to be looked *through* is barely tinted and barely opaque.
  const glass = new THREE.MeshStandardMaterial({
    color: 0xdfeaee, roughness: 0.05, metalness: 0.0,
    transparent: true, opacity: 0.16, depthWrite: false,
    envMapIntensity: 0.6, side: THREE.DoubleSide,
  });

  // ---- the subfab, four and a half metres down, which is the whole point of a
  // glass floor. Everything in it is sized to read from up here rather than
  // from beside it.
  put(w + 6, 0.4, d + 8, cx, -4.9, cz, dark);
  // Deep enough to read as a drop. At a metre and a half down the pipes look
  // like they are lying on the glass, which is a fish tank rather than a floor.
  for(const zz of [cz - 2.4, cz - 0.6, cz + 1.2, cz + 3.0]){
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, w + 4, 12), pipe);
    p.rotation.z = Math.PI / 2;
    p.position.set(cx, -2.9 - (zz - cz) * 0.16, zz);
    scene.add(p);
  }
  put(w + 4, 0.9, 0.9, cx, -3.1, cz - 3.2, duct);                 // the abatement duct
  for(const sx of [-w / 3, 0, w / 3]){
    put(2.4, 2.0, 2.4, cx + sx, -3.7, cz + 0.6, steel);            // a dry pump set
    put(0.8, 3.2, 0.8, cx + sx + 1.7, -3.1, cz + 2.6, pipe);       // and its riser
  }
  for(const zz of [cz - 3.2, cz + 3.2]) put(w - 2, 0.14, 0.34, cx, -1.35, zz, under);

  // ---- the deck: glass between two steel margins, on beams you can see.
  for(let i = 0; i <= 12; i++) put(0.12, 0.2, d - 2.0, x0 + i * w / 12, -0.08, cz, steel);
  put(w, 0.28, 0.34, cx, -0.1, cz - (d - 2.0) / 2, steel);
  put(w, 0.28, 0.34, cx, -0.1, cz + (d - 2.0) / 2, steel);
  const deck = put(w, 0.05, d - 2.0, cx, 0.025, cz, glass);
  deck.castShadow = false; deck.receiveShadow = false;
  // Nobody steps confidently off a corridor onto glass, so the first metre
  // either side of it is plate.
  put(w, 0.06, 1.0, cx, 0.03, link.z0 + 0.5, steel);
  put(w, 0.06, 1.0, cx, 0.03, link.z1 - 0.5, steel);

  // ---- the walls. The far side is solid all the way across; the near side is
  // already built by each wing except the stretch between them, which is what
  // closes the crossing into a corridor rather than a balcony.
  put(w, H, 0.18, cx, H / 2, link.z1 - 0.09, wallMat);
  collide(cx, link.z1 - 0.09, w, 0.4);
  const innerW = wings[1].x - depth - half - (wings[0].x + half + depth);
  put(innerW, H, 0.18, 0, H / 2, link.z0 + 0.09, wallMat);
  collide(0, link.z0 + 0.09, innerW, 0.4);
  // And the two ends, which are the outer face of the building.
  for(const x of [x0, x1]){
    put(0.18, H, d, x + (x === x0 ? -0.09 : 0.09), H / 2, cz, wallMat);
    collide(x + (x === x0 ? -0.09 : 0.09), cz, 0.4, d);
  }

  // ---- what is written on the crossing. The far wall is the one surface on
  // this floor everybody faces for six seconds at a time.
  const signMats = furnishingMaterials({ surface: steel, metal: steel, dark: wallMat, pale: wallMat });
  const sign = (x, text) => wordedSign({
    box: (bw, bh, bd, sx, sy, sz2, mat) => put(bw, bh, bd, sx, sy, sz2, mat),
    mats: signMats, x, z: link.z1 - 0.19, y: 1.62, faceX: false, toward: -1, wide: 1.5, text,
  });
  sign(-6.5, { style: 'warning', tag: 'NOTHING OVER THE RAIL', heading: 'The subfab is below you',
    accent: '#b5502f',
    body: 'A dropped tool goes four and a half metres onto a running pump. Carry it in the box.' });
  sign(0, { style: 'banner', tag: 'THE CROSSING', heading: 'Process one side, analysis the other',
    accent: '#7a5c16',
    body: 'Everything under the glass serves both wings: the pumps, the abatement and every gas line in the building.' });
  sign(6.5, { style: 'grid', tag: 'PARTICLE COUNT', heading: 'Best on the floor, every shift',
    accent: '#3f6f8f',
    body: 'Nothing is opened on the crossing and nobody works here, which is why it is the cleanest air in Fab 7.' });

  // ---- a soffit with two strips, and a handrail down each side of the glass.
  put(w, 0.14, d, cx, H, cz, steel);
  put(w - 2, 0.1, 0.44, cx, H - 0.12, cz - 1.7, strip);
  put(w - 2, 0.1, 0.44, cx, H - 0.12, cz + 1.7, strip);
  for(const z of [link.z0 + 1.1, link.z1 - 1.1]){
    put(w, 0.08, 0.08, cx, 1.02, z, steel);
    put(w, 0.05, 0.05, cx, 0.55, z, steel);
    for(let i = 0; i <= 8; i++) put(0.07, 1.02, 0.07, x0 + i * w / 8, 0.51, z, steel);
  }
}

// ------------------------------------------------------------------ the floor
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const site = theme.site ?? {};
  plan = site.plan;
  if(!plan?.wings) throw new Error('yellowbay/world: theme.site.plan has no wings');
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  tuneRendererForDevice(renderer);
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0xdfe4e6, near: 26, far: 96 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);

  // 1. Each wing, built by the engine and slid into place.
  const builds = [];
  for(const wing of plan.wings){
    const g = new THREE.Group();
    g.position.x = wing.x;
    scene.add(g);
    const wingPlan = {
      metrics: wing.metrics ?? plan.metrics,
      spine: wing.spine,
      rooms: wing.rooms,
      bladeSigns: wing.bladeSigns ?? [],
      // The end the link lands on. Leaving this off builds a wall across the
      // way through and every other frame still looks right — the corridor
      // simply ends, which is what a corridor does.
      openEnds: wing.openEnds ?? {},
      glazedSide: wing.glazedSide,
      ceiling: wing.ceiling,
    };
    const built = slide(buildInterior(g, renderer, wingPlan, {
      fitOutRoom: theme.fitOutRoom,
      fitOutSpine: theme.fitOutSpine,
    }), wing.x);
    colliders.push(...built.colliders);
    softColliders.push(...built.softColliders);
    interactables.push(...built.interactables);
    lightPanels.push(...(built.lightPanels ?? []));
    builds.push({ wing, built });
  }

  // 2. The link across, and the subfab under it.
  buildLink(plan.metrics);

  // 3. Light. The rig is the shared one; what this floor changes is where the
  //    four point lights go, because the engine puts them down the middle and
  //    the middle of this building is the gap between the wings.
  const rig = buildInteriorLighting(scene, renderer, plan, look.lighting ?? {});
  const span = plan.spine.z1 - plan.spine.z0;
  rig.fixtures.forEach((l, i) => {
    const w = plan.wings[i % plan.wings.length];
    l.position.x = w.x;
    l.position.z = plan.spine.z0 + span * (Math.floor(i / plan.wings.length) + 0.5)
                 / Math.max(1, Math.ceil(rig.fixtures.length / plan.wings.length));
  });
  // The key light's shadow camera is sized for one corridor; this is two.
  rig.key.shadow.camera.left = -32;
  rig.key.shadow.camera.right = 32;
  rig.key.shadow.camera.updateProjectionMatrix();

  // 4. The mission stops, and something to press on every door.
  const groups = theme.content?.GROUPS ?? [];
  const COPY = theme.content?.COPY ?? {};
  for(const { wing, built } of builds){
    for(const room of wing.rooms){
      const hit = built.roomDoors?.get(room.id);
      const stop = room.group ? built.stopMeshes.get(room.group) : null;
      if(stop){
        const g = groups.find(x => x.id === room.group);
        stopMeshes.set(room.group, {
          id: room.group,
          name: room.name ?? g?.name ?? room.group,
          pos: new THREE.Vector3(stop.pos.x, 0, stop.pos.z),
          entry: new THREE.Vector3(stop.entry.x, 0, stop.entry.z),
          door: stop.leaf, doorMesh: stop.doorMesh,
        });
        const stand = built.caseStands?.get(room.group);
        if(stand){
          interactables.push({
            mesh: stand.hit, type: 'case', id: room.group,
            prompt: `E — Take the case in ${room.name ?? g?.name ?? room.group}`,
          });
          caseStands.set(room.group, stand);
        } else if(hit){
          interactables.push({
            mesh: hit, type: 'case', id: room.group,
            prompt: `E — Take the case in ${room.name ?? g?.name ?? room.group}`,
          });
        }
      } else if(hit){
        interactables.push({
          mesh: hit, type: 'info', id: room.id,
          prompt: `E — Read about ${room.name ?? room.id}`,
          info: COPY[room.id] ?? '',
        });
      }
    }
  }

  // 5. The display board, if the plan puts one somewhere.
  if(plan.board){
    const b = displayBoard(scene, plan.board.x, plan.board.z, 0, {
      facing: plan.board.facing ?? 0, title: plan.board.title ?? 'Status', tint: 0x3f6f8f,
    });
    softColliders.push(b.soft);
    boardScreens.push(b.screen);
    lightPanels.push(b.screen);
    interactables.push({ mesh: b.screen, type: 'board', id: 'BOARD', prompt: 'E — Open the board' });
  }

  // 6. Theme hook, for anything the fit-out hooks could not reach.
  theme.decorate?.(scene, {
    groundHeight, colliders, softColliders, interactables, lightPanels, areaScreens,
    blocked: (x, z, pad = 1) => colliders.some(c =>
      x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
  });

  // 7. Where each area's people stand: just outside their own door, facing it.
  peopleStations = [...stopMeshes.values()].map(s => ({
    id: s.id, x: s.entry.x, z: s.entry.z,
    facing: Math.atan2(s.pos.x - s.entry.x, s.pos.z - s.entry.z),
  }));

  getWaypointMesh().visible = false;
  return { scene, renderer };
}

// ------------------------------------------------------------- state -> world
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  if(!state) return;
  const groups = theme?.content?.GROUPS ?? [];
  for(const [id, stop] of stopMeshes){
    const g = groups.find(x => x.id === id);
    if(!g || !stop.door?.material) continue;
    const done = Math.min(1, (pct(id) ?? 0) / 100);
    stop.door.material.color.copy(new THREE.Color(g.color)).multiplyScalar(0.5 + 0.5 * done);
  }
  for(const [id, screen] of areaScreens){
    const verdict = state.areaVerdict?.[id];
    if(!screen.material) continue;
    const base = screen.userData.baseTint ?? screen.material.color.getHex();
    screen.userData.baseTint = base;
    const tint = verdict === 'unresolved' ? 0xc0392b : verdict === 'clear' ? 0x1f8a4c : base;
    screen.material.color.setHex(tint);
    if(screen.material.emissive) screen.material.emissive.setHex(tint);
  }

  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
}

export function updateTimeOfDay(hours){
  if(!scene || !renderer) return null;
  return updateInteriorTimeOfDay(scene, renderer, hours, lightPanels);
}

export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  const spots = plan?.spots ?? {};
  const pairs = [...(spots.spine ?? []), ...(spots.open ?? [])];
  return pairs.map(([x, z]) => ({ x, z }));
}

export function updateWorldAnimation(t){
  for(const stand of caseStands.values()) stand.beacon?.update?.(1 / 60, null);
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = Math.sin(t * 2) * 0.05;
  }
  for(const s of boardScreens){
    if(s.material) s.material.emissiveIntensity = 0.5 + Math.sin(t * 1.7) * 0.06;
  }
}
