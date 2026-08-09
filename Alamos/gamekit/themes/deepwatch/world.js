// world.js — the boat, wired to the engine's world contract.
//
// `boat/` is Deep Watch's own submarine, brought across intact: one persistent
// single-deck hull running bow to stern, ten compartments divided by bulkheads
// with hatches, furnished with real fittings rather than labelled boxes. It was
// built for a different engine, and this file is the adapter — everything the
// engine touches (THEME_CONTRACT.md § "What the world module must provide") in
// the shape it expects, and nothing else.
//
// Three things the boat needed that its old host used to supply:
//
//   · a renderer, scene and camera — `Game` owned those there; here the world
//     module owns them, as outdoorTown does;
//   · an event bus and a settings object — reduced to the two stubs below,
//     because the systems that used to listen did not come across;
//   · its `interactables` are `{ object, … }` and the engine's are `{ mesh, … }`,
//     with different type names. `adaptInteractable` is that translation, and it
//     is where a station anchor becomes the door of an area of study.
import * as THREE from 'three';
import { LAYOUT, BOAT_LENGTH, HALF_W, CEIL } from './boat/SubmarineWorld.js';
import { SubmarineWorld } from './boat/SubmarineWorld.js';
import { MaterialFactory } from './boat/MaterialFactory.js';
import { CollisionSystem } from './boat/CollisionSystem.js';
import { LightingSystem } from './boat/LightingSystem.js';
import { AREA_COMPARTMENT } from './site.js';
import { instrumentScreen } from '../../engine/world/screens.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { dampEnvironment } from '../../engine/world/materials.js';

export let scene, renderer;
export const colliders = [];        // Box3[] — the engine's own collision
export const softColliders = [];    // {x,z,r}[] — none on the boat; it is all boxes
export const interactables = [];    // {mesh, type, id, prompt, info?}
/** groupId -> { id, name, pos, entry } — one per area of study. */
export const stopMeshes = new Map();

let boat = null, lighting = null, waypointMesh = null, theme = null;
let compartmentSigns = [];
/** The consoles showing a live feed: { group, screen, mesh }. */
const stationScreens = [];
let lastAnimT = 0;

/** Indoors the floor is flat, and this is the only module allowed to say so. */
export function groundHeight(){ return 0; }

// The boat's own systems expected these two. Nothing that used them came
// across, so they are honest stubs rather than a half-ported event system.
const bus = { on(){}, once(){}, off(){}, emit(){} };
const settings = {
  get: (k) => (k === 'fov' ? 68 : undefined),
  // Read by LightingSystem when it decides which lights cast shadows.
  graphics: { shadowsEnabled: true, maxDynamicLights: 4, shadowMapSize: 1024 },
};

export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // No filmic tone mapping here, unlike the outdoor games. The boat's materials
  // and its lighting states were authored against a linear pipeline; running
  // them through ACES at 0.95 exposure took every compartment two stops down and
  // turned the passage into a dark corridor with a lit doorway at the end.
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  // Inside a hull there is no sky and no distance: the fog is what makes the
  // passage read as a passage rather than a corridor with the far end missing.
  const fog = look.fog ?? { colour: 0x04080a, density: 0.012 };
  scene.background = new THREE.Color(fog.colour);
  scene.fog = new THREE.FogExp2(fog.colour, fog.density ?? 0.012);

  // Something for the metal to reflect. The deck is a dark blue-grey at 0.3
  // metalness, and with only point lights in the scene it reflected them
  // directly and read as a blue floor. An indoor IBL is what the engine's other
  // interior uses and it costs one bake.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  // `scene.environmentIntensity` does not exist in this three version — it
  // arrived in r163 — so setting it did nothing and the boat rendered with the
  // environment at full strength: every bulkhead lifted to a pale sage and the
  // compartment stopped reading as being inside a hull. dampEnvironment is the
  // repo's own answer, and it works by material.
  const materials = new MaterialFactory();
  const collision = new CollisionSystem();
  lighting = new LightingSystem(scene, bus, settings);

  boat = new SubmarineWorld({ scene, materials, collision, lighting, eventBus: bus, settings });
  // The boat's build() takes the old game's state object and reads only a few
  // fields off it for initial conditions. A quiet boat is the right start here:
  // nothing is flooding, nothing is on fire, every space is lit and rigged.
  boat.build(quietState());

  // Hatches are already open when the boat builds — `open: true`, collision
  // segment inactive — because Deep Watch opened them with the wheel and shut
  // them when a compartment flooded. Nothing here shuts one, so nothing here
  // needs to open one; the passage runs bow to stern from the first frame.

  // Matte surfaces take almost nothing from the environment; the metal fittings
  // keep theirs, which is the only reason it is here.
  dampEnvironment(scene, 0.08, 0.5);

  buildLights();
  adoptColliders(collision);
  adoptInteractables();
  wireStationScreens();
  registerStops();
  ensureWaypoint();

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
  });
}

/** The boat, at sea and in order. */
function quietState(){
  return {
    depth: 90, orderedDepth: 90, speed: 8, heading: 20,
    compartments: Object.fromEntries(LAYOUT.map(c => [c.id, { flooding: 0, fire: 0, smoke: 0 }])),
    bilge: Object.fromEntries(LAYOUT.map(c => [c.id, 0])),
    valves: {}, breakers: {}, dampers: {},
  };
}

/**
 * Light, through the boat's own system rather than beside it.
 *
 * LightingSystem pools one point light per compartment and can re-tint every
 * one of them at once — that is how the boat rigs for red — but its lights were
 * added by a CompartmentManager that did not come across. So this adds them,
 * and the light budget is spent where the contract says to spend it: shadows on
 * the four spaces the campaign actually uses, plain light everywhere else.
 *
 * A first pass lit the boat with four warm lamps of its own instead, and every
 * surface came out gold. The boat is lit at 0xdfe8ee for a reason.
 */
function buildLights(){
  const shadowed = new Set(Object.values(AREA_COMPARTMENT).slice(0, 4));
  for(const c of LAYOUT){
    settings.graphics.maxDynamicLights = shadowed.has(c.id) ? 4 : 0;
    lighting.addCompartmentLight(c.id, 0, CEIL - 0.35, c.zMid);
    // A long compartment needs a second fitting or its far end goes black.
    if(c.len > 6) lighting.addCompartmentLight(`${c.id}_aft`, 0, CEIL - 0.35, c.zMid + c.len * 0.3);
  }
  lighting.setState('normal');
  // The boat's own levels assume the flashlight its player carried, which was
  // part of the handheld viewmodel and did not come across. Without it a lit
  // compartment reads as a dark one, so the fill comes up and the point lights
  // reach further.
  lighting.ambient.color.setHex(0x3d4e5a);
  lighting.ambient.intensity = 1.15;
  lighting.hemi.color.setHex(0x5a6d7a);
  lighting.hemi.intensity = 0.75;
  for(const light of lighting.compartmentLights.values()){
    light.intensity = 2.0;
    light.distance = 22;
    light.decay = 1.3;
  }
}

/**
 * The boat's collision is a list of segments and boxes for its own resolver.
 * The engine tests Box3 intersection instead, so the segments become thin
 * boxes. A bulkhead is a wall whether it is described as a line or a slab.
 */
function adoptColliders(collision){
  // A hatch opening is 1.1 m wide and the engine's player is 0.9 m. Padding a
  // segment by 0.14 on each side left a 0.82 m gap, and the boat was only
  // passable dead on the centreline. 0.04 is enough to stop a player standing
  // inside a bulkhead and leaves the hatch a squeeze rather than a wall.
  const T = 0.04;
  for(const s of collision.segments ?? []){
    if(s.active === false) continue;
    const minX = Math.min(s.x1, s.x2) - T, maxX = Math.max(s.x1, s.x2) + T;
    const minZ = Math.min(s.z1, s.z2) - T, maxZ = Math.max(s.z1, s.z2) + T;
    colliders.push(new THREE.Box3(
      new THREE.Vector3(minX, 0, minZ), new THREE.Vector3(maxX, CEIL, maxZ)));
  }
  for(const b of collision.boxes ?? []){
    colliders.push(new THREE.Box3(
      new THREE.Vector3(b.minX, 0, b.minZ), new THREE.Vector3(b.maxX, CEIL, b.maxZ)));
  }
  // The hull itself, so nobody walks out through the side.
  const skin = 0.4;
  colliders.push(new THREE.Box3(new THREE.Vector3(-HALF_W - skin, 0, -skin),
                                new THREE.Vector3(-HALF_W, CEIL, BOAT_LENGTH + skin)));
  colliders.push(new THREE.Box3(new THREE.Vector3(HALF_W, 0, -skin),
                                new THREE.Vector3(HALF_W + skin, CEIL, BOAT_LENGTH + skin)));
}

/**
 * The boat's interactables, in the engine's vocabulary.
 *
 * A `station` anchor in a compartment that carries an area of study becomes
 * that area's `door` — the thing that opens the case. Everything else the boat
 * offers (valves, lockers, panels, bunks, hatches) becomes `info`, because it
 * is scenery you can read rather than a stop on the route. Nothing is dropped:
 * the boat is full of real fittings and reading them is how a player learns the
 * space.
 */
function adaptInteractable(rec){
  const mesh = rec.object ?? rec.mesh;
  if(!mesh) return null;
  const compartment = compartmentAt(mesh.position?.z ?? 0);
  const group = Object.entries(AREA_COMPARTMENT).find(([, c]) => c === compartment?.id)?.[0];
  if(rec.type === 'station' && group){
    return { mesh, type: 'door', id: group, prompt: `E — Take the watch at ${rec.prompt ?? compartment.name}` };
  }
  return {
    mesh, type: 'info', id: rec.id ?? compartment?.id ?? 'fitting',
    prompt: `E — ${rec.prompt ?? 'Look at this'}`,
    info: rec.data?.info ?? rec.prompt ?? '',
  };
}
function adoptInteractables(){
  for(const rec of boat.interactables ?? []){
    const out = adaptInteractable(rec);
    if(out) interactables.push(out);
  }
  // Every area needs a door, and three of the six sit in compartments the boat
  // never gave a manned console — damage control, atmosphere and propulsion are
  // spaces you work in rather than watch from. They get one built from the
  // boat's own console kit rather than an invisible hit box, so the thing the
  // player walks up to is a console with that area's instrument live on it.
  for(const [group, compartmentId] of Object.entries(AREA_COMPARTMENT)){
    if(interactables.some(i => i.type === 'door' && i.id === group)) continue;
    const c = LAYOUT.find(x => x.id === compartmentId);
    if(!c) continue;
    placeAreaConsole(group, c);
  }
}

/**
 * A console of the boat's own making, for an area that has none.
 *
 * Built with `boat.props.console()` so it is the same object as every other
 * console aboard — same body, same angled glass, same keyboard shelf — and
 * registered as this area's door. `wireStationScreens` finds it afterwards
 * through the same `userData.screenMesh` the boat's own consoles expose.
 */
function placeAreaConsole(group, c){
  const d = theme.content?.GROUPS?.find(g => g.id === group);
  const colour = new THREE.Color(d?.color ?? '#2f8f8f').getHex();
  const desk = boat.props.console({ w: 1.15, screen: colour, label: d?.name ?? group });
  const x = HALF_W - 0.85;
  desk.position.set(x, 0, c.zMid);
  desk.rotation.y = -Math.PI / 2;              // face the passage
  scene.add(desk);
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(x, 0.5, c.zMid), new THREE.Vector3(0.8, 1.0, 1.3)));

  const hit = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.6, 1.4),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.set(x - 0.4, 0.9, c.zMid);
  scene.add(hit);
  interactables.push({
    mesh: hit, type: 'door', id: group,
    prompt: `E — Take the watch at the ${d?.name ?? c.name} console`,
  });
  // Recorded the way the boat records its own, so one loop wires them all.
  boat.interactables.push({
    object: desk, type: 'station', id: group,
    prompt: `Man ${d?.name ?? group}`,
    data: { station: group, name: d?.name ?? group, compartment: c.id },
  });
}

/**
 * Put the area's instrument on the consoles in its compartment.
 *
 * `props.console()` has always kept its angled glass on the group as
 * `userData.screenMesh`, with a comment saying it was there so a live feed
 * could be mapped onto it. Nothing ever mapped one, so every console in the
 * boat was a pane of coloured glass. The theme's `interiors[group].station`
 * says what that area's instrument reads, screens.js paints it, and this hangs
 * the result on the glass.
 *
 * The material is cloned per console. MaterialFactory caches `screenGlass` by
 * colour, so setting a map on the shared one would put the sonar display on
 * every console in the boat that happened to be the same shade.
 */
function wireStationScreens(){
  const compartmentOf = Object.fromEntries(
    Object.entries(AREA_COMPARTMENT).map(([g, c]) => [c, g]));

  for(const rec of boat.interactables ?? []){
    if(rec.type !== 'station') continue;
    const group = compartmentOf[rec.data?.compartment] ?? rec.data?.station;
    const spec = group ? theme.interiors?.[group]?.station : null;
    const mesh = rec.object?.userData?.screenMesh;
    if(!spec || !mesh) continue;

    // A console in a manned space carries the watch it is manned for, so the
    // title is the station's own name rather than the area's.
    const screen = instrumentScreen({ ...spec, title: rec.data?.name ?? spec.title }, { w: 512, h: 320 });
    mesh.material = mesh.material.clone();
    mesh.material.map = screen.texture;
    mesh.material.emissiveMap = screen.texture;
    mesh.material.emissive.setHex(0xffffff);
    mesh.material.emissiveIntensity = 0.85;
    mesh.material.color.setHex(0xffffff);
    mesh.material.needsUpdate = true;
    stationScreens.push({ group, screen, mesh });
  }
}

function compartmentAt(z){
  return LAYOUT.find(c => z >= c.zStart && z < c.zEnd) ?? null;
}

/**
 * One stop per area of study, at a spot in its compartment that is actually
 * standable.
 *
 * The middle of a compartment is not automatically clear: the forward equipment
 * space has a deck opening and a handling rig down the centreline, and a stop
 * placed there is a stop the player is blocked out of — the same failure as a
 * prop dropped over the spawn, which this repo has shipped twice. So the entry
 * is probed against the colliders that already exist and the first clear
 * candidate wins.
 */
function clearSpot(cx, cz, R = 0.5){
  const free = (x, z) => !colliders.some(c =>
    x + R > c.min.x && x - R < c.max.x && z + R > c.min.z && z - R < c.max.z);
  const candidates = [[0, 0], [0, 1.2], [0, -1.2], [0.9, 0], [-0.9, 0],
                      [0.9, 1.2], [-0.9, 1.2], [0, 2.2], [0, -2.2], [1.3, 0], [-1.3, 0]];
  for(const [dx, dz] of candidates){
    if(free(cx + dx, cz + dz)) return { x: cx + dx, z: cz + dz };
  }
  return { x: cx, z: cz };          // nothing clear: report it rather than hide it
}

function registerStops(){
  for(const [group, compartmentId] of Object.entries(AREA_COMPARTMENT)){
    const c = LAYOUT.find(x => x.id === compartmentId);
    if(!c) continue;
    const spot = clearSpot(0, c.zMid);
    stopMeshes.set(group, {
      id: group, name: c.name,
      pos: new THREE.Vector3(spot.x, 1.2, spot.z),
      entry: new THREE.Vector3(spot.x, 0, spot.z),
    });
  }
}
export function getStopPosition(id){ return stopMeshes.get(id)?.pos ?? new THREE.Vector3(); }
export function getStopEntry(id){ return stopMeshes.get(id)?.entry ?? new THREE.Vector3(); }

/**
 * Where the crowd stands.
 *
 * Keyed by the *area* id, not the compartment id: crowd.js matches a person's
 * `division` against a station id, and keying these by compartment sent all
 * fourteen of them to the fallback station in the bow — including two who ended
 * up outside the hull.
 *
 * The fan-out is along the passage rather than across it, and tight, because a
 * compartment is a few metres long and the boat is four and a half metres wide.
 */
export function getPeopleStations(){
  return Object.entries(AREA_COMPARTMENT).map(([group, compartmentId]) => {
    const c = LAYOUT.find(x => x.id === compartmentId);
    if(!c) return null;
    // Probed, not assumed. A fixed offset from the port side put three of the
    // crew inside the equipment along it, where they stood for the whole watch
    // because every direction out was blocked.
    const spot = clearSpot(-HALF_W + 1.15, c.zMid);
    return {
      id: group, x: spot.x, z: spot.z,
      facing: Math.PI / 2,          // frontage runs fore-and-aft
      spread: 1.5, rankSpread: 1.3, backSpread: 0.9,
    };
  }).filter(Boolean);
}

/** Spots for the anonymous extras: along the passage, clear of the fittings. */
export function getExtraSpots(){
  return LAYOUT.flatMap(c => [
    clearSpot(0, c.zStart + c.len * 0.35),
    clearSpot(0, c.zStart + c.len * 0.7),
  ]);
}

// ------------------------------------------------------------------ waypoint
function ensureWaypoint(){
  if(waypointMesh) return waypointMesh;
  const geo = new THREE.ConeGeometry(0.16, 0.34, 4);
  geo.rotateX(Math.PI);
  waypointMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0x2fd0c0, emissive: 0x2fd0c0, emissiveIntensity: 1.2, roughness: 0.3,
  }));
  waypointMesh.position.y = CEIL - 0.55;
  waypointMesh.visible = false;
  scene.add(waypointMesh);
  return waypointMesh;
}
export function getWaypointMesh(){ return waypointMesh ?? ensureWaypoint(); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
  w.position.x = x; w.position.z = z; w.visible = true;
}

// --------------------------------------------------------------- state → world
/**
 * Push the campaign onto the boat: the waypoint over the next stop, and the
 * compartment signs coloured by how ready that area is.
 */
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
  for(const sign of compartmentSigns){
    const p = pct(sign.group) / 100;
    sign.mesh.material.emissiveIntensity = 0.25 + p * 0.75;
  }
}

/**
 * Time of day means nothing under water — the boat runs on watches, not on the
 * sun — so this is the rig-for-red the boat already models: the lighting system
 * came across with its states, and the clock picks one.
 */
export function updateTimeOfDay(hours){
  if(!lighting) return;
  const night = hours < 6 || hours >= 20;
  // The boat's own states, from boat/LightingSystem.js: red for the night
  // watch, normal otherwise. There is no daylight down here to model.
  lighting.setState?.(night ? 'red' : 'normal');
}
export function updateWorldAnimation(t){
  lighting?.update?.(t);
  // The engine hands this an elapsed time; the screens want a delta, and they
  // repaint at their own rate rather than the frame rate.
  const delta = Math.max(0, Math.min(0.1, t - lastAnimT));
  lastAnimT = t;
  for(const s of stationScreens) s.screen.update(delta);
}
