// interiorLevels.js — a building of several floors, wired to the world contract.
//
// `interiorFloor.js` is one spine with rooms down both sides, flat. This is that
// several times over, stacked, with a flight of stairs at each joint: a
// coordinating centre where the walk from the patient to the number is a climb,
// a dam where the galleries are at six heights inside the wall.
//
// It is deliberately thin. Everything that makes a floor — walls, doors,
// signage, case stands, the light rig, the theme's fit-out hooks — is
// `engine/world/interiorSite.js` doing exactly what it does for every other
// interior game. What is here is the stacking, the stairs and the height
// function, and nothing else.
//
// A theme opts in from its plan:
//
//   plan.levels = [{ id, y, name, spine: {z0,z1}, stairUp: {z0,z1}|null,
//                    gate?: true, rooms: [...] }, …]
//   plan.rise   = floor-to-floor, in metres
//
// and points `world:` at a three-line shim in its own directory, because
// vite.config.js resolves a theme's own world from `themes/<name>/`.
//
// ## The one thing to understand before changing it
//
// `groundHeight(x, z)` takes no level argument, and `engine/core/player.js`
// tests collision boxes in x and z while ignoring the player's own y. Both are
// true of every game on this engine and neither is worth rewriting for one
// building. So the levels are offset **along the spine as well as vertically**:
// each (x, z) belongs to exactly one floor, the height function is single
// valued, and a wall on the second floor is nowhere near the first floor's
// footprint. The building is a section rather than a tower — three storeys
// stepping back, joined by stairs, with a void at each joint to see down
// through. Stack two levels on the same footprint and the player will walk into
// the floor above's furniture.
import * as THREE from 'three';
import { buildInterior, buildInteriorLighting, updateInteriorTimeOfDay } from './interiorSite.js';
import { deliveryHook } from './deliveryCase.js';
/** The campaign's delivery board, in whichever build holds its room. */
let deliveryCase = null;
/**
 * Tell the board what is in.
 *
 * Called on every world refresh rather than on entering the room: these rooms are
 * built once and walked into, so there is no arrival event, and the board has to
 * be right the moment a saved campaign is loaded.
 */
export function setDeliveryPieces(pieces){ deliveryCase?.setPieces(pieces); }

import { markStructure } from './interiorKit.js';
import { tuneRendererForDevice } from './materials.js';

export const colliders = [];
export const softColliders = [];
export const interactables = [];
/** groupId -> { id, name, pos, entry, door } — one per mission destination. */
export const stopMeshes = new Map();
const caseStands = new Map();

export function setCaseOpen(groupId, on){
  caseStands.get(groupId)?.beacon?.setActive(!!on);
}

export let scene = null;
export let renderer = null;

let theme = null;
let plan = null;
let waypointMesh = null;
let boardScreens = [];
let lightPanels = [];
let peopleStations = [];
export const areaScreens = new Map();

/** The levels this build is using, and their floor-to-floor. From the plan. */
let LEVELS = [];
let RISE = 4.2;

/**
 * One source of truth for floor height, and it is a staircase.
 *
 * Level, then the flight above it, then the next level. Smooth through the
 * flight rather than linear, so the top and bottom are not two kinks the player
 * walks over — and so nothing has to know how many treads were drawn.
 */
export function groundHeight(x, z){
  for(const L of LEVELS){
    if(z < L.spine.z1) return L.y;
    if(L.stairUp && z < L.stairUp.z1){
      const t = (z - L.stairUp.z0) / (L.stairUp.z1 - L.stairUp.z0);
      return L.y + RISE * (t * t * (3 - 2 * t));
    }
  }
  return LEVELS.length ? LEVELS[LEVELS.length - 1].y : 0;
}

/** Which level a point is on — for a theme's own props and for the map. */
export function levelAt(z){
  for(let i = LEVELS.length - 1; i >= 0; i--) if(z >= LEVELS[i].spine.z0) return LEVELS[i];
  return LEVELS[0] ?? null;
}

/** The stair's own materials, made once. */
let STAIR_CACHE = null;
const STAIR_MATS = () => (STAIR_CACHE ??= {
  frame: new THREE.MeshStandardMaterial({ color: 0xb4b8bb, roughness: 0.42, metalness: 0.5, envMapIntensity: 0.9 }),
  rail:  new THREE.MeshStandardMaterial({ color: 0x8b9199, roughness: 0.45, metalness: 0.25, envMapIntensity: 0.9 }),
  wall:  new THREE.MeshStandardMaterial({ color: 0xe8e6e0, roughness: 0.92, envMapIntensity: 0.5 }),
  base:  new THREE.MeshStandardMaterial({ color: 0x4f565e, roughness: 0.55, envMapIntensity: 0.6 }),
});

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
  // On the floor the target is actually on. A ring drawn at y = 0 two storeys
  // below the room it marks is worse than no ring.
  w.position.set(x, groundHeight(x, z), z);
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
 * A flight of stairs, and the well it sits in.
 *
 * The steps are geometry the player never collides with — `groundHeight` is
 * what actually carries them up, smoothly, so the climb has no kinks in it and
 * a step cannot catch a foot. What the colliders do is keep them on the flight:
 * a balustrade each side, and the void wall at the top of the level below.
 */
function buildStair(level, P, M){
  const st = level.stairUp;
  if(!st) return;
  const hw = P.corridorHalfWidth;
  const y0 = level.y, y1 = level.y + RISE;
  const g = new THREE.Group();
  scene.add(g);

  const box = (w, h, d, x, y, z, material) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    g.add(m);
    return m;
  };

  // The treads. Eighteen of them across six metres, which is a real going and
  // a real rise; they are what the climb looks like, not what it is.
  const N = 18;
  for(let i = 0; i < N; i++){
    const t = (i + 0.5) / N;
    const z = st.z0 + (st.z1 - st.z0) * t;
    const y = y0 + (y1 - y0) * (t * t * (3 - 2 * t));
    // Each tread is solid down to the floor below rather than a floating slab.
    // As eighteen 140 mm plates it renders as a ladder with daylight between the
    // rungs, which is what a stair with no risers actually looks like.
    const h = y - y0 + 0.1;
    markStructure([box(hw * 2, h, (st.z1 - st.z0) / N + 0.02, 0, y - h / 2, z, M.frame)], 'floor');
  }
  // A balustrade each side, and it is the collider: the flight is the only way
  // between the floors and stepping off it sideways would be a fall.
  for(const s of [-1, 1]){
    for(let i = 0; i < N; i += 2){
      const t = (i + 1) / N;
      const z = st.z0 + (st.z1 - st.z0) * t;
      const y = y0 + (y1 - y0) * (t * t * (3 - 2 * t));
      markStructure([box(0.06, 1.0, 0.06, s * (hw - 0.08), y + 0.5, z, M.rail)], 'trim');
    }
    const rail = box(0.09, 0.09, st.z1 - st.z0, s * (hw - 0.08), (y0 + y1) / 2 + 1.0, (st.z0 + st.z1) / 2, M.rail);
    rail.rotation.x = -Math.atan2(y1 - y0, st.z1 - st.z0);
    markStructure([rail], 'trim');
    // The wall of the stair well itself, which is what stops the player walking
    // out of the side of the building at half height.
    // Floor of the level below to ceiling of the level above: anything less
    // leaves a slot under the wall that looks out of the side of the building.
    const wallH = RISE + P.tileH + 0.6;
    const wall = box(0.2, wallH, st.z1 - st.z0, s * (hw + 0.1), y0 + wallH / 2 - 0.3, (st.z0 + st.z1) / 2, M.wall);
    markStructure([wall], 'wall');
    colliders.push(new THREE.Box3().setFromObject(wall));
  }
  // The soffit over the flight, so it is a stair and not a ramp in the open.
  markStructure([box(hw * 2 + 0.4, 0.2, st.z1 - st.z0, 0, y1 + P.tileH - 0.1, (st.z0 + st.z1) / 2, M.base)], 'ceiling');

  // The void: a gallery at the head of the flight, looking back down over the
  // floor you came from. It is the only place in the building where two levels
  // are visible at once, which is worth the twelve square metres it costs.
  for(const s of [-1, 1]){
    const post = box(0.07, 1.05, 0.07, s * (hw - 0.1), y1 + 0.52, st.z1 + 0.4, M.rail);
    markStructure([post], 'trim');
  }
  markStructure([box(hw * 2, 0.08, 0.1, 0, y1 + 1.05, st.z1 + 0.4, M.rail)], 'trim');

  // The firewall, at the head of the upper flight and nowhere else.
  //
  // In a coordinating centre the blinded and unblinded sides are separated
  // administratively; here the separation is a floor, and this is the top of the
  // only stair to it. Two posts, a head, a reader on each post. It does not lock:
  // every room in these games is walkable, and what is withheld above this line
  // is the allocation, not the room.
  if(level.gate){
    const gz = st.z1 - 0.6;
    for(const s of [-1, 1]){
      const post = box(0.2, 2.3, 0.24, s * (hw - 0.12), y1 + 1.15, gz, M.base);
      markStructure([post], 'gate');
      colliders.push(new THREE.Box3().setFromObject(post));
      // The reader sits on the post, not on a wall — a post is 0.2 m of nothing
      // in every direction, and declaring it wall furniture makes the placement
      // check fire on a fitting that is exactly where it should be.
      box(0.1, 0.16, 0.12, s * (hw - 0.3), y1 + 1.15, gz, M.rail);
    }
    markStructure([box(hw * 2, 0.24, 0.22, 0, y1 + 2.4, gz, M.base)], 'gate');
  }
}

// ------------------------------------------------------------------ the world
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const site = theme.site ?? {};
  plan = site.plan;
  if(!plan) throw new Error('interiorLevels: theme.site has no plan');
  LEVELS = plan.levels ?? [];
  RISE = +plan.rise || 4.2;
  if(!LEVELS.length) throw new Error('interiorLevels: the plan declares no `levels`');
  // Levels are stepped along the spine; floors are stacked on one footprint and
  // are `interiorTower.js`. Building one as the other renders, which is the whole
  // reason this refusal is here rather than a comment — see the header.
  if(plan.floors?.length){
    throw new Error('interiorLevels: this plan declares `floors`, which is stacked on one '
      + 'footprint — engine/world/interiorTower.js. `levels` are stepped along the spine.');
  }
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

  // 1. Each level, built by the engine's own builder into a group at its own
  //    height. The ends that meet a stair are left open — `plan.openEnds` —
  //    because the shell would otherwise finish in a wall the player has to
  //    walk through to reach the flight.
  for(const level of LEVELS){
    const holder = new THREE.Group();
    holder.position.y = level.y;
    scene.add(holder);

    const levelPlan = {
      metrics: plan.metrics,
      spine: level.spine,
      rooms: level.rooms,
      seats: (plan.seats ?? []).filter(([, z]) => z > level.spine.z0 && z < level.spine.z1),
      spots: plan.spots,
      bladeSigns: (plan.bladeSigns ?? []).filter(s => s.z > level.spine.z0 && s.z < level.spine.z1),
      openEnds: { z0: level.id > 0, z1: !!level.stairUp },
      // Carried through, or every floor is built with a solid wall where the
      // glazing should be. This is a *reconstructed* plan — anything the builder
      // reads has to be copied into it explicitly, and a missing key fails
      // silently as a building with no windows.
      glazedSide: plan.glazedSide,
      ceiling: plan.ceiling,
      soffit: plan.soffit,
      board: plan.board,
    };

    const built = buildInterior(holder, renderer, levelPlan, {
      fitOutRoom: theme.fitOutRoom,
      fitOutSpine: theme.fitOutSpine,
      // The delivery board goes up in whichever level holds the room that keeps
      // it; every other level is handed the same hook and matches nothing.
      delivery: deliveryHook(theme),
    });
    if(built.deliveryCase) deliveryCase = built.deliveryCase;
    firstBuilt = firstBuilt ?? built;

    // Collision is tested in x and z with the player's y ignored, so a level's
    // boxes need no lifting — and must not be lifted, or nothing on the upper
    // floors would be solid.
    colliders.push(...built.colliders);
    softColliders.push(...built.softColliders);
    interactables.push(...built.interactables);
    lightPanels.push(...(built.lightPanels ?? []));

    for(const room of level.rooms){
      const hit = built.roomDoors?.get(room.id);
      const stop = room.group ? built.stopMeshes.get(room.group) : null;
      if(stop){
        const g = groups.find(x => x.id === room.group);
        stopMeshes.set(room.group, {
          id: room.group,
          name: room.name ?? g?.name ?? room.group,
          level: level.id,
          pos: new THREE.Vector3(stop.pos.x, level.y, stop.pos.z),
          entry: new THREE.Vector3(stop.entry.x, level.y, stop.entry.z),
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

    // 2. The flight up out of this level, if it has one. `buildInterior`
    //    returns its geometry rather than its materials, so the stair has its
    //    own — four of them, matching the palette in plan.js.
    buildStair(level, built.geo.P, STAIR_MATS());
  }

  // 3. Light, once, over the whole building. Ambient and hemisphere reach every
  //    floor; the key is aimed down the middle level.
  const mid = LEVELS[Math.floor(LEVELS.length / 2)] ?? LEVELS[0];
  buildInteriorLighting(scene, renderer, { spine: mid.spine, metrics: plan.metrics },
    look.lighting ?? {});

  // 4. Theme hook, for anything the fit-out hooks could not reach.
  theme.decorate?.(scene, {
    groundHeight, colliders, softColliders, interactables, lightPanels, areaScreens,
    blocked: (x, z, pad = 1) => colliders.some(c =>
      x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
  });

  // 5. Where each area's people stand: outside their own door, facing it.
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
    waypointMesh.position.y = groundHeight(waypointMesh.position.x, waypointMesh.position.z)
      + Math.sin(t * 2) * 0.05;
  }
  for(const s of boardScreens){
    if(s.material) s.material.emissiveIntensity = 0.5 + Math.sin(t * 1.7) * 0.06;
  }
}
