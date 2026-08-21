// interiorTower.js — the top floors of a tall building, stacked on one footprint.
//
// `interiorFloor.js` is one spine with rooms down both sides. `interiorLevels.js`
// is that several times over with stairs between — but stepped **along** the
// spine as well as up, because `groundHeight(x, z)` takes no floor argument and
// collision is tested in x and z with the player's y ignored. That makes a
// section through a hillside, which is what a dam on an abutment is. It is not a
// tower: nothing in it is above anything else.
//
// This is the tower. Four floor plates on the *same* (x, z) footprint, one above
// the next, joined by a lift rather than a stair — which is the only way a
// building of this shape is joined, and the reason the vertical move is a
// decision the player makes rather than a corridor they walk.
//
// ## How it can be stacked when interiorLevels could not
//
// One floor is **active** at a time.
//
//   · `groundHeight` returns the active floor's height, so it stays single
//     valued — the rule that made stacking look impossible is satisfied by
//     answering for one floor instead of by spreading the floors out.
//   · `colliders`, `softColliders` and `interactables` are the shared set plus
//     the active floor's, spliced **in place** on arrival. Every core module
//     imports these arrays by reference and reads their contents each frame, so
//     replacing the contents is enough and reassigning them would be a silent
//     no-op.
//   · Everything is still *built*, and every floor is still *drawn*. The floors
//     below you are through the glass with their lights on, which is what a
//     tower looks like from inside one, and none of it is solid because none of
//     it is yours.
//
// So the only things that need to know about floors are the four listed above,
// the crowd (a person two floors down must not be walked into) and the map (four
// plans drawn on one footprint is one illegible plan). Nothing else in the
// engine has to learn what a floor is.
//
// ## What a theme declares
//
//   plan.floors = [{ id, y, label, name, rooms: [...], seats?, spots? }, …]
//   plan.rise   = floor to floor, in metres
//   plan.spine  = { z0, z1 }   the same on every floor: it is one building
//   plan.lift   = { side: 'w'|'e', z0, z1 }   the shaft, through all of them
//   plan.rooms  = every floor's rooms flattened, each stamped with `level`
//
// `plan.rooms` is the flattened list and not the active floor's, deliberately.
// `worldParity` reads it in Node to check every mission group has somewhere to
// happen; handing it one floor's worth would report the other three floors'
// rooms as missing, and a checker that lies is worse than the defect it was
// written for. The map is filtered at *draw* time instead, through the accessor
// this module stamps onto the plan in `initWorld`.
import * as THREE from 'three';
import { buildInterior, buildInteriorLighting, updateInteriorTimeOfDay } from './interiorSite.js';
import { markStructure, markWallMounted } from './interiorKit.js';
import { tuneRendererForDevice } from './materials.js';

/** Spliced in place on every arrival. Never reassigned: see the header. */
export const colliders = [];
export const softColliders = [];
export const interactables = [];

/** groupId -> { id, name, pos, entry, level, floorLabel, … } */
export const stopMeshes = new Map();
export const areaScreens = new Map();

const caseStands = new Map();          // groupId -> { hit, beacon, floor }
const openGroups = new Set();          // which cases the day has opened

export let scene = null;
export let renderer = null;

let theme = null;
let plan = null;
let waypointMesh = null;
let lightPanels = [];
let peopleStations = [];

/** The floors, and which one the player is standing on. */
let FLOORS = [];
let ACTIVE = null;
let RISE = 4.4;

/** Always solid, on every floor: the shaft, which is the same shape all the way up. */
const SHARED = { colliders: [], soft: [], inter: [] };

/**
 * What this module has put into the three exported arrays, so a floor change can
 * take its own entries out and leave everybody else's alone.
 *
 * **These arrays are not this module's private property.** `crowd.js` pushes a
 * soft collider and an interaction per person into them, and the interiors
 * manager pushes a room's worth of colliders on first entry. Clearing them on
 * arrival — which is what the first version of this did — deletes the cast and
 * every room the player has been inside, and the symptom is people you can walk
 * through on the floor you just rode to.
 */
const INSTALLED = { colliders: [], soft: [], inter: [] };

function swapIn(arr, mine, next){
  if(mine.length){
    const drop = new Set(mine);
    let w = 0;
    for(let r = 0; r < arr.length; r++) if(!drop.has(arr[r])) arr[w++] = arr[r];
    arr.length = w;
  }
  arr.push(...next);
  return next;
}

// ---------------------------------------------------------------- the floors
/**
 * One source of truth for floor height, and on a stacked tower that means the
 * floor the player is on. There is no continuous answer to give: two rooms at
 * one (x, z) are four metres apart vertically and only one of them is under the
 * player's feet.
 */
export function groundHeight(){
  return ACTIVE ? ACTIVE.y : 0;
}

export function activeFloorId(){ return ACTIVE?.id ?? null; }

/**
 * Floor to floor, for the two systems that measure distance to something they
 * might not be on the same floor as: `engine/world/trial.js` and
 * `engine/world/worldFormats.js`.
 *
 * Undefined in every other world, and both treat that as "there is one floor" —
 * which is why nothing else changes. It has to be *asked for*: a (x, z) distance
 * test on a stacked footprint says every room in the building is within seven
 * metres, so TRIAL's six gates were all taken by walking the corridor of
 * whichever floor the player happened to be on, and GREET counted people three
 * floors down as met.
 */
export function floorRise(){ return RISE; }
export function activeFloor(){ return ACTIVE; }

/** What the lift panel lists: every floor, top first, with what is on it. */
export function floorMenu(){
  return [...FLOORS].reverse().map(f => ({
    id: f.id,
    label: f.label,
    name: f.name,
    here: f === ACTIVE,
    // **Every room, not only the ones with a call open.** The lift is the only
    // place in the building where all four floors are named at once, so it is
    // the wayfinding — and a directory that lists one room of four is a
    // directory that has to be guessed around. `open` is what the day wants.
    rooms: f.rooms.map(r => ({
      id: r.group ?? r.id, name: r.name ?? r.id,
      open: !!r.group && openGroups.has(r.group),
    })),
  }));
}

/**
 * Arrive on a floor: swap what is solid, what can be pressed, and who is real.
 * Returns where the player should be standing, for the caller to teleport to.
 */
export function setActiveFloor(id){
  const f = FLOORS.find(x => x.id === id) ?? FLOORS[0];
  if(!f) return null;
  ACTIVE = f;

  INSTALLED.colliders = swapIn(colliders, INSTALLED.colliders, [...SHARED.colliders, ...f.colliders]);
  INSTALLED.soft = swapIn(softColliders, INSTALLED.soft, [...SHARED.soft, ...f.soft]);
  INSTALLED.inter = swapIn(interactables, INSTALLED.inter, [...SHARED.inter, ...f.inter]);

  // A beacon draws through walls by design — it is the one thing allowed to —
  // so a lit case two floors down would hang in the middle of this one.
  for(const [gid, stand] of caseStands){
    stand.beacon?.setActive(openGroups.has(gid) && stand.floor === f.id);
  }
  return liftLobby(f);
}

/** Where the lift puts you down: in the corridor, outside the car. */
function liftLobby(f){
  const L = plan.lift ?? { side: 'w', z0: 0, z1: 3 };
  const hw = (plan.metrics?.corridorHalfWidth ?? 1.8);
  const inward = L.side === 'w' ? 1 : -1;
  return {
    x: inward * (hw * 0.45), y: f.y, z: (L.z0 + L.z1) / 2,
    // Facing down the floor, not into the doors you just came out of.
    yaw: 0,
  };
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

/**
 * The ring, on the floor the player is standing on.
 *
 * If what it is pointing at is upstairs it points at the **lift** instead,
 * because that is where the player has to walk — a ring drawn at the target's
 * own (x, z) would sit against a wall on this floor with the room it means four
 * metres above it, and the player would walk to it and find nothing.
 */
export function setWaypointPosition(x, z, level = null){
  const w = getWaypointMesh();
  if(level != null && ACTIVE && level !== ACTIVE.id){
    const l = liftLobby(ACTIVE);
    w.position.set(l.x, l.y, l.z);
  } else {
    w.position.set(x, groundHeight(), z);
  }
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
export function setCaseOpen(groupId, on){
  if(on) openGroups.add(groupId); else openGroups.delete(groupId);
  const stand = caseStands.get(groupId);
  stand?.beacon?.setActive(!!on && stand.floor === ACTIVE?.id);
}

// ---------------------------------------------------------------- the shaft
let LIFT_CACHE = null;
const LIFT_MATS = () => (LIFT_CACHE ??= {
  // A lift car is the one part of an old building that has been replaced: steel,
  // brushed, and brighter than everything around it.
  steel: new THREE.MeshStandardMaterial({ color: 0xb6bcc0, roughness: 0.34, metalness: 0.72, envMapIntensity: 1.1 }),
  dark:  new THREE.MeshStandardMaterial({ color: 0x2e3439, roughness: 0.55, metalness: 0.3 }),
  panel: new THREE.MeshStandardMaterial({ color: 0x1c2226, roughness: 0.4, metalness: 0.4 }),
  lamp:  new THREE.MeshStandardMaterial({ color: 0xe8d9a0, emissive: 0xe8c766, emissiveIntensity: 0.9, roughness: 0.5 }),
});

/**
 * The car, the opening and the call plate, on one floor.
 *
 * The car is deliberately shallow — 2.6 m of the 8 m room band — and the rest of
 * the band behind it is solid: a lift shaft has risers and a counterweight in it,
 * and a car you can walk seven metres into is a room. Everything here is built by
 * hand rather than declared as a plan room, because the builder would give it a
 * timber leaf ajar and a case stand, and a lift has neither.
 *
 * **Exported, and built into whatever `parent` is given at local y = 0**, so the
 * dev harness can build it too. `engine/dev/scenes.mjs` assembles a plan floor by
 * floor for `placement` and `pieceDensity`, and without this the reveal beside
 * the car is missing from the measured scene — which reports every notice on that
 * wall as hanging in mid-air, all of them correctly placed. A checker with its own
 * idea of where the walls are is a checker that lies.
 *
 * Returns the hit target for the interaction and the shaft's own collision boxes,
 * for the caller to install; it touches no module state.
 */
export function buildLiftShaft(parent, plan, P, buttons = 4){
  const L = plan.lift;
  if(!L) return { hit: null, boxes: [] };
  const g = new THREE.Group();
  parent.add(g);
  const M = LIFT_MATS();

  const sign = L.side === 'w' ? -1 : 1;
  const hw = P.corridorHalfWidth;
  const xInner = sign * hw;                       // the corridor face
  const carDepth = 2.6;
  const xBack = sign * (hw + carDepth);
  const cz = (L.z0 + L.z1) / 2;
  const width = L.z1 - L.z0;
  const doorW = Math.min(1.6, width - 1.0);
  const boxes = [];

  const box = (w, h, d, x, y, z, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const wallBox = (...a) => {
    const m = box(...a);
    markStructure([m], 'wall');
    m.updateWorldMatrix(true, false);
    boxes.push(new THREE.Box3().setFromObject(m));
    return m;
  };

  // ---- the reveal each side of the opening
  const revealD = (width - doorW) / 2;
  wallBox(carDepth, P.ceilingH, revealD, sign * (hw + carDepth / 2), P.ceilingH / 2, L.z0 + revealD / 2, M.dark);
  wallBox(carDepth, P.ceilingH, revealD, sign * (hw + carDepth / 2), P.ceilingH / 2, L.z1 - revealD / 2, M.dark);

  // ---- the car: back, floor, ceiling, and a light in it
  wallBox(0.16, P.ceilingH, width, xBack, P.ceilingH / 2, cz, M.steel);
  markStructure([box(carDepth, 0.04, doorW, sign * (hw + carDepth / 2), 0.02, cz, M.dark)], 'floor');
  markStructure([box(carDepth, 0.1, doorW, sign * (hw + carDepth / 2), P.ceilingH - 0.05, cz, M.steel)], 'ceiling');
  const lamp = box(carDepth - 0.5, 0.03, doorW - 0.4, sign * (hw + carDepth / 2), P.ceilingH - 0.12, cz, M.lamp);
  lamp.castShadow = false;

  // ---- the frame in the corridor wall, and the sill
  for(const sz of [-1, 1]){
    markStructure([box(0.14, P.doorH + 0.12, 0.12, xInner, (P.doorH + 0.12) / 2, cz + sz * (doorW / 2 + 0.06), M.steel)], 'frame');
  }
  markStructure([box(0.14, 0.12, doorW + 0.24, xInner, P.doorH + 0.06, cz, M.steel)], 'frame');
  markStructure([box(carDepth * 0.5, 0.03, doorW, sign * (hw + carDepth * 0.25), 0.03, cz, M.steel)], 'trim');
  // Above the frame: the floor this car is standing at. One face, because text on
  // a DoubleSide material renders mirrored from behind.
  markStructure([box(0.05, 0.34, 0.6, xInner - sign * 0.09, P.doorH + 0.42, cz, M.panel)], 'sign');

  // ---- the call plate, on the corridor face beside the opening.
  //
  // Proud of the wall line, not on it: the corridor face is at ±hw and a plate
  // centred there is half inside the plaster. Wall furniture, so `placement` fires
  // its rays at it and knows which way it is facing.
  const plateZ = cz + doorW / 2 + 0.34;
  const plate = box(0.05, 0.44, 0.2, xInner - sign * 0.035, 1.18, plateZ, M.panel);
  markWallMounted([plate], true, -sign, 'lift call plate');
  for(let i = 0; i < buttons; i++){
    const b = box(0.03, 0.05, 0.05, xInner - sign * 0.07, 1.32 - i * 0.09, plateZ, M.lamp);
    b.castShadow = false;
    markWallMounted([b], true, -sign, 'lift button');
  }

  // The thing the player presses. The whole opening, so walking into the car and
  // pressing E works as well as standing at the plate does — a lift you have to
  // aim at is a lift that reads as broken.
  const hit = new THREE.Mesh(new THREE.BoxGeometry(carDepth, 2.1, doorW + 0.7),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.set(sign * (hw + carDepth / 2), 1.05, cz);
  hit.userData.ignoreAudit = true;
  g.add(hit);

  // ---- the rest of the band behind the car: shaft, risers, and solid.
  const backW = P.roomDepth - carDepth;
  wallBox(backW, P.ceilingH, width, sign * (hw + carDepth + backW / 2), P.ceilingH / 2, cz, M.dark);
  return { hit, boxes };
}

// ------------------------------------------------------------------ the world
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const site = theme.site ?? {};
  plan = site.plan;
  if(!plan) throw new Error('interiorTower: theme.site has no plan');
  if(!plan.floors?.length) throw new Error('interiorTower: the plan declares no `floors`');
  if(plan.levels?.length){
    throw new Error('interiorTower: this plan declares `levels`, which are stepped along the '
      + 'spine — engine/world/interiorLevels.js. `floors` share one footprint.');
  }
  RISE = +plan.rise || 4.4;
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  tuneRendererForDevice(renderer);
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0xdfe4e6, near: 34, far: 130 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);

  const groups = theme.content?.GROUPS ?? [];
  const COPY = theme.content?.COPY ?? {};
  let firstBuilt = null;

  FLOORS = plan.floors.map((f, i) => ({
    ...f,
    y: Number.isFinite(f.y) ? f.y : i * RISE,
    label: String(f.label ?? f.id),
    colliders: [], soft: [], inter: [],
  }));

  // 1. Each floor, built by the engine's own builder into a group at its own
  //    height, on the same footprint as every other floor.
  for(const f of FLOORS){
    const holder = new THREE.Group();
    holder.position.y = f.y;
    scene.add(holder);

    // A reconstructed plan: anything the builder reads has to be copied in
    // explicitly, and a missing key fails silently as a floor with no windows.
    const floorPlan = {
      metrics: plan.metrics,
      spine: plan.spine,
      rooms: f.rooms,
      seats: f.seats ?? [],
      spots: f.spots ?? plan.spots,
      // A floor's own if it has them, the building's otherwise — the signs over a
      // corridor are the same on every floor of a tower unless a floor says not.
      bladeSigns: f.bladeSigns ?? plan.bladeSigns ?? [],
      glazedSide: plan.glazedSide,
      ceiling: plan.ceiling,
      soffit: plan.soffit,
      board: plan.board,
    };

    const built = buildInterior(holder, renderer, floorPlan, {
      fitOutRoom: (room, ctx) => theme.fitOutRoom?.(room, { ...ctx, floor: f }),
      fitOutSpine: (ctx) => theme.fitOutSpine?.({ ...ctx, floor: f }),
    });
    firstBuilt = firstBuilt ?? built;

    // Collision is tested in x and z with the player's y ignored, so a floor's
    // boxes need no lifting — and here that is the whole problem this module
    // exists to solve, which is why they are kept per floor rather than pooled.
    f.colliders.push(...built.colliders);
    f.soft.push(...built.softColliders);
    f.inter.push(...built.interactables);
    lightPanels.push(...(built.lightPanels ?? []));
    f.geoP = built.geo.P;

    for(const room of f.rooms){
      const hit = built.roomDoors?.get(room.id);
      const stop = room.group ? built.stopMeshes.get(room.group) : null;
      if(stop){
        const g = groups.find(x => x.id === room.group);
        const name = room.name ?? g?.name ?? room.group;
        stopMeshes.set(room.group, {
          id: room.group, name,
          level: f.id, floorLabel: f.label,
          pos: new THREE.Vector3(stop.pos.x, f.y, stop.pos.z),
          entry: new THREE.Vector3(stop.entry.x, f.y, stop.entry.z),
          door: stop.leaf, doorMesh: stop.doorMesh,
        });
        const stand = built.caseStands?.get(room.group);
        if(stand){
          f.inter.push({ mesh: stand.hit, type: 'case', id: room.group,
            prompt: `E — Take the case in ${name}` });
          caseStands.set(room.group, { ...stand, floor: f.id });
          stand.beacon?.setActive(false);
        } else if(hit){
          f.inter.push({ mesh: hit, type: 'case', id: room.group,
            prompt: `E — Take the case in ${name}` });
        }
      } else if(hit){
        f.inter.push({ mesh: hit, type: 'info', id: room.id,
          prompt: `E — Read about ${room.name ?? room.id}`,
          info: COPY[room.id] ?? '' });
      }
    }

    // 2. The lift, on this floor. It is the only way between them, and the
    //    shaft is the same shape on all four — so its colliders are taken once,
    //    into the shared set, rather than four identical boxes deep.
    const car = buildLiftShaft(holder, plan, built.geo.P, FLOORS.length);
    if(f === FLOORS[0]) SHARED.colliders.push(...car.boxes);
    if(car.hit){
      f.inter.push({ mesh: car.hit, type: 'lift', id: `lift-${f.id}`,
        prompt: `E — Lift · floor ${f.label}` });
    }
  }

  // 3. Light, once, over the whole building. Four floors inside fourteen metres
  //    of each other are one rig's worth: ambient and hemisphere reach all of
  //    them and the key's shadow camera covers the stack.
  buildInteriorLighting(scene, renderer, { spine: plan.spine, metrics: plan.metrics },
    look.lighting ?? {});

  // 4. Theme hook — the city outside the glass, which is the point of the place.
  theme.decorate?.(scene, {
    groundHeight, colliders, softColliders, interactables, lightPanels, areaScreens,
    floors: FLOORS, rise: RISE, plan,
    blocked: (x, z, pad = 1) => colliders.some(c =>
      x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
  });

  // 5. Where each area's people stand: outside their own door, facing it — and
  //    on their own floor, which is what keeps somebody two floors down from
  //    being walked into and talked to through a slab.
  peopleStations = [...stopMeshes.values()].map(s => ({
    id: s.id, x: s.entry.x, z: s.entry.z, level: s.level, y: s.entry.y,
    facing: Math.atan2(s.pos.x - s.entry.x, s.pos.z - s.entry.z),
  }));

  // 6. The map draws one floor, and this is how it knows which. Stamped rather
  //    than imported: `plan.js` cannot import this module, because this module
  //    imports the plan.
  plan.activeLevel = () => ACTIVE?.id ?? null;
  plan.floorLabel = () => ACTIVE?.label ?? '';
  plan.floorName = () => ACTIVE?.name ?? '';

  setActiveFloor(FLOORS[0].id);
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
  if(target) setWaypointPosition(target.entry.x, target.entry.z, target.level);
  else if(waypointMesh) waypointMesh.visible = false;
}

export function updateTimeOfDay(hours){
  if(!scene || !renderer) return null;
  return updateInteriorTimeOfDay(scene, renderer, hours, lightPanels);
}

export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  // Spread over the floors, because the extras are the building's own staff and
  // a tower with everybody on one floor reads as three empty ones.
  const out = [];
  for(const f of FLOORS){
    const spots = f.spots ?? plan?.spots ?? {};
    for(const [x, z] of [...(spots.spine ?? []), ...(spots.open ?? [])]){
      out.push({ x, z, level: f.id, y: f.y });
    }
  }
  return out;
}

export function updateWorldAnimation(t){
  for(const stand of caseStands.values()) stand.beacon?.update?.(1 / 60, null);
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = groundHeight() + Math.sin(t * 2) * 0.05;
  }
}
