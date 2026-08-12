// outdoorTown.js — assemble an outdoor site that satisfies the world contract.
//
// outdoorSite.js gives the *ground*: heightfield, paths, sky, sun, horizon and
// planting. What was still missing was the layer above it — buildings placed on
// that ground, the mission stops attached to their doors, and the exports the
// engine actually calls. Los Alamos had all of this welded into a theme file;
// this is the same thing with the place taken out and passed in.
//
// Everything specific to a setting arrives as `theme.site`:
//
//   terrain     -> configureTerrain()
//   atmosphere  -> buildSky()
//   paths       -> buildPaths(), and the graded corridors inside groundHeight
//   buildings   -> [{ id, group?, name, x, z, w, d, h, facing, colour, … }]
//   water       -> optional flat plane with a shoreline
//   horizon     -> ranks of hazed ridges
//   spawn       -> { x, z, yaw }
//
// The rule this file is careful about is the one that shipped broken twice:
// pads are registered with setPads() *before* anything asks for a height, so
// the visible surface and groundHeight() can never disagree.
import * as THREE from 'three';
import {
  configureTerrain, setPads, setPaths, groundHeight as terrainHeight,
  buildTerrain, buildPaths, buildSky, buildSunRig, buildHorizon,
  plantScrub, updateOutdoorTimeOfDay, onPath,
} from './outdoorSite.js';
import { building, sign, displayBoard, post, bench, bin, MATERIALS } from './kit.js';
import { mat } from './materials.js';

export const colliders = [];
export const softColliders = [];
export const interactables = [];
/** groupId -> { id, name, pos, entry, door, sign } — one per mission destination. */
export const stopMeshes = new Map();

export let scene = null;
export let renderer = null;

let theme = null;
let waypointMesh = null;
let boardScreens = [];
let lightPanels = [];
let peopleStations = [];
/** groupId -> the area's readout screen, so a call can change the street. */
export const areaScreens = new Map();

/** The one source of truth for floor height. Re-exported so nothing forks it. */
export function groundHeight(x, z){ return terrainHeight(x, z); }

// --------------------------------------------------------------------- water
function buildWater(water){
  const geo = new THREE.PlaneGeometry(water.width, water.depth, 1, 1);
  const m = new THREE.Mesh(geo, mat('town.water', () => new THREE.MeshStandardMaterial({
    color: 0x2c4a52, roughness: 0.12, metalness: 0.35, envMapIntensity: 1.0,
  })));
  m.rotation.x = -Math.PI / 2;
  m.position.set(water.cx, water.level ?? -0.6, water.cz);
  m.receiveShadow = true;
  // Water is meant to sit below the ground; it is the one thing the audit's
  // below-floor rule should not report.
  m.userData.ignoreAudit = true;
  scene.add(m);

  // A low bank, so the water plane never meets the terrain in a visible seam.
  const bank = new THREE.Mesh(
    new THREE.BoxGeometry(water.width, 1.2, 2.4),
    MATERIALS.concrete());
  bank.position.set(water.cx, (water.level ?? -0.6) + 0.3, water.cz + water.depth / 2 + 1.0);
  bank.receiveShadow = true;
  bank.userData.ignoreAudit = true;      // deliberately let into the ground
  scene.add(bank);
  colliders.push(new THREE.Box3().setFromObject(bank));
  return m;
}

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.09, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.9, roughness: 0.5 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.12;
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 3.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.7, roughness: 0.5 }));
  shaft.position.y = 1.8;
  g.add(ring, shaft);
  g.userData.ring = ring;
  scene.add(g);
  return g;
}
export function getWaypointMesh(){ return waypointMesh ?? (waypointMesh = makeWaypoint()); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
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

// ------------------------------------------------------------------ the site
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const site = theme.site;
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0xb9c4c8, near: 150, far: 460 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);

  // 1. Terrain configuration, and the pads and paths that grade it, must all be
  //    registered before the first groundHeight() call.
  configureTerrain(site.terrain ?? {});
  setPaths(site.paths ?? []);
  const pads = (site.buildings ?? []).map(b => new THREE.Box3(
    new THREE.Vector3(b.x - b.w / 2 - 2, 0, b.z - b.d / 2 - 2),
    new THREE.Vector3(b.x + b.w / 2 + 2, 0, b.z + b.d / 2 + 2)));
  setPads(pads, 5);

  // 2. Ground, water and routes.
  buildTerrain(scene);
  if(site.water) buildWater(site.water);
  buildPaths(scene, site.paths ?? []);

  // 3. Sky and light. The contract's ceiling is six real lights; buildSunRig
  //    creates three of them (ambient, sun, hemisphere) and nothing below adds
  //    another — lit surfaces are emissive instead.
  // The sky guard in buildSky needs to know how far the camera can see.
  scene.userData.cameraFar = look.far ?? 900;
  buildSky(scene, renderer, site.atmosphere ?? {});
  buildSunRig(scene, renderer, look.lighting ?? {});
  if(site.horizon) buildHorizon(scene, site.horizon);

  // 4. Buildings, and the mission stops attached to them.
  const groups = theme.content?.GROUPS ?? [];
  for(const b of site.buildings ?? []){
    const group = groups.find(g => g.id === b.group);
    const y = groundHeight(b.x, b.z);
    const built = building(scene, {
      ...b, baseY: y,
      accent: b.accent ?? (group ? parseInt(group.color.slice(1), 16) : undefined),
      sub: b.sub ?? (group ? group.name : ''),
    });
    colliders.push(built.collider);

    interactables.push({
      mesh: built.door,
      type: b.group ? 'door' : 'info',
      id: b.group ?? b.id,
      prompt: b.group ? `E — Enter ${b.name}` : `E — Read about ${b.name}`,
      info: theme.content?.COPY?.[b.id] ?? '',
    });

    if(b.group){
      stopMeshes.set(b.group, {
        id: b.group, name: b.name,
        pos: new THREE.Vector3(built.doorPos.x, y, built.doorPos.z),
        entry: new THREE.Vector3(built.entry.x, y, built.entry.z),
        door: built.door, group: built.group,
      });
    }
  }

  // 5. The central board: where the campaign state is read.
  if(site.board){
    const y = groundHeight(site.board.x, site.board.z);
    const b = displayBoard(scene, site.board.x, site.board.z, y, {
      facing: site.board.facing ?? 0, title: site.board.title ?? 'Command Board', tint: 0x3f6f8f,
    });
    softColliders.push(b.soft);
    boardScreens.push(b.screen);
    lightPanels.push(b.screen);
    interactables.push({
      mesh: b.screen, type: 'board', id: 'BOARD',
      prompt: 'E — Open the command board',
    });
  }

  // 6. Street furniture and planting. Everything here is soft-collided so the
  //    player brushes past rather than being stopped dead by a bin.
  const blocked = (x, z, pad = 2) =>
    colliders.some(c => x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad);
  for(const f of site.furniture ?? []){
    const y = groundHeight(f.x, f.z);
    if(f.kind === 'bench') softColliders.push(bench(scene, f.x, f.z, y, f.facing ?? 0));
    else if(f.kind === 'bin') softColliders.push(bin(scene, f.x, f.z, y, f.colour));
    else softColliders.push(post(scene, f.x, f.z, y, f.height ?? 1.1, f.r ?? 0.09, f.colour));
  }
  if(site.scrub !== false){
    plantScrub(scene, site.scrubCount ?? 380, {
      colour: site.scrubColour ?? 0x5f6b45,
      band: site.scrubBand ?? [24, 240],
      isBlocked: (x, z, pad) => blocked(x, z, pad ?? 2) || onPath(x, z, 2.4),
    });
  }

  // 7. Theme hook for the objects that make this place recognisable.
  theme.decorate?.(scene, {
    groundHeight, colliders, softColliders, interactables, blocked, sign, MATERIALS,
    lightPanels, areaScreens,
  });

  // 8. The people. Every third mission stop is a person stop, so this is
  //    gameplay, not decoration — without it a third of the campaign has nobody
  //    to talk to. Each area's crew stands outside its own building.
  peopleStations = [...stopMeshes.values()].map(s => ({
    id: s.id,
    x: s.entry.x, z: s.entry.z,
    // Face back toward the door, so the crew reads as standing outside it.
    facing: Math.atan2(s.pos.x - s.entry.x, s.pos.z - s.entry.z),
  }));
  // A group whose building is a long way from everything else can still have its
  // people at base camp. `peopleHome: { DISC: 'OPS' }` in the manifest stands the
  // survey crew outside the coordination office instead of on the summit their
  // telescope is on — a night crew briefs where the phones are, and a person stop
  // is a conversation, not a visit to the instrument.
  const home = theme.peopleHome ?? {};
  if(Object.keys(home).length){
    const byId = new Map(peopleStations.map(st => [st.id, st]));
    peopleStations = peopleStations.map((st) => {
      const host = byId.get(home[st.id]);
      return host ? { ...st, x: host.x, z: host.z, facing: host.facing } : st;
    });
  }

  getWaypointMesh().visible = false;
  return { scene, renderer };
}

// ------------------------------------------------------------- state -> world
/**
 * Push game state onto the world: which stop is current, and how each area is
 * doing. Areas are tinted by *colour*, never by opacity — a see-through
 * building reads as a rendering bug, not as a hint.
 */
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  if(!state) return;
  const groups = theme?.content?.GROUPS ?? [];
  for(const [id, stop] of stopMeshes){
    const g = groups.find(x => x.id === id);
    if(!g || !stop.door?.material) continue;
    const base = new THREE.Color(g.color);
    const done = Math.min(1, (pct(id) ?? 0) / 100);
    // A finished area's door brightens toward its own colour; an untouched one
    // sits darker. Same hue throughout, and never transparent — a see-through
    // building reads as a rendering bug, not as a hint.
    stop.door.material.color.copy(base).multiplyScalar(0.5 + 0.5 * done);
  }
  // An unresolved call turns that area's readout red and holds it there until
  // the player goes back and settles it. Answering used to change nothing
  // outside the modal: you walked out into an identical town either way.
  for(const [id, screen] of areaScreens){
    const verdict = state.areaVerdict?.[id];
    if(!screen.material) continue;
    const base = screen.userData.baseTint ?? screen.material.color.getHex();
    screen.userData.baseTint = base;
    const tint = verdict === 'unresolved' ? 0xc0392b : verdict === 'clear' ? 0x1f8a4c : base;
    screen.material.color.setHex(tint);
    screen.material.emissive.setHex(tint);
  }

  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
}

export function updateTimeOfDay(hours){
  if(!scene || !renderer) return null;
  const look = theme?.look ?? {};
  const info = updateOutdoorTimeOfDay(scene, renderer, hours, {
    exposure: look.exposure, nightLift: look.nightLift,
    // The theme's own fog distances. Without these the sun rig overwrote them
    // with its own every frame, so `look.fog` set the colour and nothing else —
    // a five-kilometre site whose next summit stood in solid haze at 660 m.
    fog: look.fog,
  });
  // Emissive panels carry the night, since the light budget cannot.
  const night = info ? 1 - info.dayBlend : 0;
  for(const p of lightPanels){
    if(p.material?.emissiveIntensity !== undefined) p.material.emissiveIntensity = 0.35 + 0.85 * night;
  }
  return info;
}

/**
 * Where each area's people should stand, and the walk-up spots for extras.
 * The crowd module is fed from here rather than importing the world, which is
 * what made the previous implementation impossible to reuse.
 */
export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  const site = theme?.site ?? {};
  // Along the routes, which is where people in a working city actually are.
  return (site.paths ?? []).flatMap(p => {
    const long = p.d > p.w;
    const n = Math.max(2, Math.round((long ? p.d : p.w) / 26));
    return Array.from({ length: n }, (_, i) => {
      const t = (i + 0.5) / n - 0.5;
      return long ? { x: p.cx, z: p.cz + t * p.d } : { x: p.cx + t * p.w, z: p.cz };
    });
  });
}

/** Spin the objective ring so the marker is findable in peripheral vision. */
export function updateWorldAnimation(t){
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = groundHeight(waypointMesh.position.x, waypointMesh.position.z)
      + Math.sin(t * 2) * 0.08;
  }
  for(const s of boardScreens){
    if(s.material) s.material.emissiveIntensity = 0.5 + Math.sin(t * 1.7) * 0.06;
  }
}
