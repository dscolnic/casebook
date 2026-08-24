// interiorFloor.js — a whole floor, wired to the world contract.
//
// `interiorSite.js` builds the shell: a spine with rooms down both sides,
// walls, doors, signage and lighting. It has always been a *builder*, not a
// world module — it exports `buildInterior`, not `initWorld`, `stopMeshes` or
// `groundHeight` — and `vite.config.js` has been mapping `site.kind: 'interior'`
// straight at it. Nothing noticed, because the two games that are indoors are
// the two that predate this engine: Deep Watch brings its own world and the
// hospital is still its own package. The first theme scaffolded as an interior
// failed at `import`, before a frame was drawn.
//
// This is the missing layer, and it is deliberately the same shape as
// `outdoorTown.js`: take the place from `theme.site`, build it, attach the
// mission stops to the doors, and export exactly what the engine calls.
//
//   plan.rooms     -> the rooms, and a stop on every one with a `group`
//   plan.spine     -> the corridor, and where the light rig goes
//   plan.spots     -> where people stand
//   plan.board     -> optional: the display board the dashboard opens from
//
// The floor is flat and this module is the only thing allowed to say so:
// `groundHeight()` returns 0 for every (x, z), and nothing else may hold a
// second opinion about the floor. Both earlier builds had a bug from having two.
import * as THREE from 'three';
import { buildInterior, buildInteriorLighting, updateInteriorTimeOfDay } from './interiorSite.js';
import { displayBoard } from './kit.js';
import { deliveryHook } from './deliveryCase.js';
import { tuneRendererForDevice } from './materials.js';

export const colliders = [];
export const softColliders = [];
export const interactables = [];
/** groupId -> { id, name, pos, entry, door } — one per mission destination. */
export const stopMeshes = new Map();
/** The case stands, by group, so the HUD can light the ones with a call open. */
const caseStands = new Map();

/**
 * Light the marker over a room's case stand.
 *
 * The entry point knows which calls are open; this knows where the markers are.
 */
export function setCaseOpen(groupId, on){
  caseStands.get(groupId)?.beacon?.setActive(!!on);
}

export let scene = null;
export let renderer = null;

let theme = null;
let plan = null;
let built = null;
let waypointMesh = null;
let boardScreens = [];
let lightPanels = [];
let peopleStations = [];
/** groupId -> the area's readout, so a call can change the corridor. */
export const areaScreens = new Map();

/** One source of truth for floor height. Indoors it is flat. */
export function groundHeight(){ return 0; }

/**
 * The delivery board, told what is in.
 *
 * Called on every refresh rather than when a day closes: a floor game's rooms are
 * built once and never entered, so there is no arrival to hang it on, and the
 * board has to be right the moment the campaign is loaded from a save.
 */
export function setDeliveryPieces(pieces){ built?.deliveryCase?.setPieces(pieces); }

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  // A ring on the floor and a short shaft above it. Indoors the ceiling is
  // 3 m, so the outdoor 3.4 m post would go straight through it.
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

// ------------------------------------------------------------------ the floor
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const site = theme.site ?? {};
  plan = site.plan;
  if(!plan) throw new Error('interiorFloor: theme.site has no plan');
  /**
   * A plan that describes more than one build must not be built once.
   *
   * `plan.floors` is a stacked tower (`interiorTower.js`) and `plan.wings` is a
   * building in two halves; in both, `plan.rooms` is every room flattened,
   * because that is what `worldParity` and the map read. Handing that list to
   * this builder is not an error at any level below this one — it renders, and
   * what it renders is every floor's rooms on one footprint, each partition and
   * notice coincident with three others, with no way between the floors.
   *
   * Which is exactly what shipped for an afternoon, because `vite.config.js`
   * resolves a theme's own world by pattern-matching `plan.js` **as text**: one
   * `world: WORLD` instead of `world: 'themes/…'` and the theme falls back to
   * `kind: 'interior'`, silently, and lands here. So this is the backstop, and
   * it has to be loud — the symptom otherwise reads as a rendering bug.
   */
  if(plan.floors?.length){
    throw new Error(`interiorFloor: this plan declares ${plan.floors.length} floors, `
      + 'which is engine/world/interiorTower.js. Point `world:` at the theme\'s own '
      + 'world.js — as a plain string literal, which is how vite.config.js reads it.');
  }
  if(plan.wings?.length){
    throw new Error('interiorFloor: this plan declares wings, which the theme\'s own '
      + 'world module builds one at a time. Point `world:` at it.');
  }
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  tuneRendererForDevice(renderer);
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0xdfe4e6, near: 26, far: 96 };
  // Linear indoors: a corridor should fade at its far end, not end in a wall of
  // colour halfway down it.
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);

  // 1. The shell, with the theme's own fit-out hooks.
  built = buildInterior(scene, renderer, plan, {
    fitOutRoom: theme.fitOutRoom,
    fitOutSpine: theme.fitOutSpine,
    // The campaign's product, on a board in the one room that keeps it. Absent
    // for a theme with no `delivery`, and then nothing here is built.
    delivery: deliveryHook(theme),
  });
  colliders.push(...built.colliders);
  softColliders.push(...built.softColliders);
  interactables.push(...built.interactables);
  lightPanels = built.lightPanels ?? [];

  // 2. Light. Ambient, hemisphere, one key and a small number of point lights —
  //    the contract's ceiling is six real ones, and a fixture per troffer took
  //    an earlier build from 118 fps to 20.
  buildInteriorLighting(scene, renderer, plan, look.lighting ?? {});

  // 3. The mission stops, and something to press on every door.
  const groups = theme.content?.GROUPS ?? [];
  const COPY = theme.content?.COPY ?? {};
  for(const room of plan.rooms ?? []){
    const hit = built.roomDoors?.get(room.id);
    const stop = room.group ? built.stopMeshes.get(room.group) : null;
    if(stop){
      const g = groups.find(x => x.id === room.group);
      stopMeshes.set(room.group, {
        id: room.group,
        name: room.name ?? g?.name ?? room.group,
        // `pos` is what the map and the day's budget measure to; `entry` is
        // where the player ends up standing.
        pos: new THREE.Vector3(stop.pos.x, 0, stop.pos.z),
        entry: new THREE.Vector3(stop.entry.x, 0, stop.entry.z),
        door: stop.leaf, doorMesh: stop.doorMesh,
      });
      // No door interactable for a group room any more. The room is right there
      // off the corridor, so the player walks in; pressing E at the doorway used
      // to teleport them to a separately built copy of the room in the interior
      // district, which meant the thirteen rooms of this building were scenery.
      // What they press is the case stand inside.
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
      // A room with no lesson is still a place with a sign on it. Without this
      // every non-mission room on the floor is scenery you walk past.
      interactables.push({
        mesh: hit, type: 'info', id: room.id,
        prompt: `E — Read about ${room.name ?? room.id}`,
        info: COPY[room.id] ?? '',
      });
    }
  }

  // 4. The display board, if the plan puts one somewhere. Optional: a floor
  //    whose plan does not name a spot simply has no board on the wall.
  if(plan.board){
    const b = displayBoard(scene, plan.board.x, plan.board.z, 0, {
      facing: plan.board.facing ?? 0, title: plan.board.title ?? 'Status', tint: 0x3f6f8f,
    });
    softColliders.push(b.soft);
    boardScreens.push(b.screen);
    lightPanels.push(b.screen);
    interactables.push({ mesh: b.screen, type: 'board', id: 'BOARD', prompt: 'E — Open the board' });
  }

  // 5. Theme hook, for anything the fit-out hooks could not reach.
  theme.decorate?.(scene, {
    groundHeight, colliders, softColliders, interactables, lightPanels, areaScreens,
    blocked: (x, z, pad = 1) => colliders.some(c =>
      x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
  });

  // 6. Where each area's people stand: just outside their own door, facing it,
  //    so the crew reads as belonging to that room rather than to the corridor.
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
    // Colour, never opacity: a see-through door reads as a rendering bug.
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

/** Where the cast stands, and the walk-up spots for everybody else. */
export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  const spots = plan?.spots ?? {};
  const pairs = [...(spots.spine ?? []), ...(spots.open ?? [])];
  return pairs.map(([x, z]) => ({ x, z }));
}

/** Spin the objective ring, so it is findable in peripheral vision. */
export function updateWorldAnimation(t){
  // The case markers bob, so they need the frame. No camera here: this module
  // does not own one, and the beacon only uses it to face the player.
  for(const stand of caseStands.values()) stand.beacon?.update?.(1 / 60, null);
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = Math.sin(t * 2) * 0.05;
  }
  for(const s of boardScreens){
    if(s.material) s.material.emissiveIntensity = 0.5 + Math.sin(t * 1.7) * 0.06;
  }
}
