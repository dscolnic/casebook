// crowd.js — the people on the site.
//
// THEME_CONTRACT.md listed this as one of two modules not yet extracted, and it
// was blocking real gameplay rather than only atmosphere: every third mission
// stop is a *person* stop, so with nobody to talk to a third of the campaign is
// unreachable.
//
// The version this replaces (_ref_crowd.js) imported the hospital's corridor and
// chair lists directly. Everything it needs now arrives through `init`, so the
// same code populates a ward, a mesa or a river city.
//
// Two tiers, as in both shipped builds:
//   · named people from the roster carry a full rig, a nameplate and dialogue
//   · anonymous extras carry the same rig and no interaction, which is what
//     makes a street feel worked rather than staffed by exactly the cast list
import * as THREE from 'three';
import { NOMINAL_H, pickLook, buildBody, stepGait, gaitAdvance, idleSway } from './rig.js';
import { srand, srandRange, resetSeed } from '../world/materials.js';

let ctx = null;
let group = null;
const npcs = [];
const extras = [];

/**
 * @param opts {
 *   scene, camera, interactables, softColliders,
 *   roster,           the named cast; each needs id, name, role, division
 *   outfits,          OUTFITS map from the theme
 *   roleToOutfit,     (role, rnd) -> outfit key
 *   stations,         [{ id, x, z, facing }] one per area — where its people stand
 *   extras,           how many anonymous people to add
 *   groundHeight,     the world's height function; feet go here, not at y=0
 *   blocked,          (x, z) -> boolean, so nobody is placed inside a building
 * }
 */
export function initCrowd(opts){
  if(group) return { npcs, extras };
  ctx = opts;
  resetSeed(7);
  group = new THREE.Group();
  group.name = 'crowd';
  opts.scene.add(group);

  const byStation = new Map(opts.stations.map(s => [s.id, s]));

  // ---- named people, standing near the area they belong to
  // Spread around their station on a small arc rather than a single point:
  // without separation the whole cast converges into one interpenetrating clump.
  const perStation = new Map();
  for(const person of opts.roster){
    const station = byStation.get(person.division) ?? opts.stations[0];
    if(!station) continue;
    const n = perStation.get(station.id) ?? 0;
    perStation.set(station.id, n + 1);

    // Fan out along the frontage, alternating sides, 2.2 m apart.
    const side = n % 2 ? 1 : -1;
    const rank = Math.floor(n / 2);
    const off = side * (2.2 + rank * 2.4);
    const back = rank * 1.3;
    const x = station.x + Math.cos(station.facing) * off + Math.sin(station.facing) * back;
    const z = station.z - Math.sin(station.facing) * off + Math.cos(station.facing) * back;

    const outfitKey = opts.roleToOutfit(person.role, (n2) => Math.floor(srand() * n2));
    const look = pickLook(opts.outfits[outfitKey] ?? Object.values(opts.outfits)[0]);
    const body = buildBody(look);
    const y = opts.groundHeight(x, z);
    body.position.set(x, y, z);                    // feet at ground level
    body.rotation.y = station.facing + Math.PI + srandRange(-0.3, 0.3);
    group.add(body);

    const plate = nameplate(person);
    plate.position.set(0, NOMINAL_H * 1.12, 0);
    body.add(plate);

    // A cheap invisible cylinder is the raycast target; the rig itself is many
    // small meshes and intersecting all of them per frame is not worth it.
    const hit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.8, 8),
      new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(x, y + 0.95, z);
    hit.userData.ignoreAudit = true;
    opts.scene.add(hit);

    const npc = {
      char: person, id: person.id, division: person.division,
      body, hit, plate, look,
      pos: new THREE.Vector3(x, y, z),
      home: new THREE.Vector3(x, y, z),
      target: new THREE.Vector3(x, y, z),
      facing: body.rotation.y,
      speed: srandRange(0.75, 1.15),
      phase: srand() * 6.28,
      pause: srandRange(0.5, 4),
    };
    npcs.push(npc);
    opts.softColliders.push({ x, z, r: 0.55 });
    opts.interactables.push({
      mesh: hit, type: 'npc', id: person.id,
      prompt: `E — Talk to ${person.name} — ${person.role}`,
      info: `<b>${person.name}</b> — ${person.role}<br><br>${person.bio ?? ''}`,
      char: person, npc,
    });
  }

  // ---- anonymous extras, scattered along the routes
  const spots = opts.extraSpots ?? [];
  for(let i = 0; i < (opts.extras ?? 0) && spots.length; i++){
    const s = spots[i % spots.length];
    const x = s.x + srandRange(-3.5, 3.5);
    const z = s.z + srandRange(-3.5, 3.5);
    if(opts.blocked?.(x, z)) continue;
    const look = pickLook(opts.outfits[opts.roleToOutfit('', (n) => Math.floor(srand() * n))]
                          ?? Object.values(opts.outfits)[0]);
    const body = buildBody(look);
    body.position.set(x, opts.groundHeight(x, z), z);
    body.rotation.y = srand() * 6.28;
    group.add(body);
    extras.push({ body, phase: srand() * 6.28, pos: new THREE.Vector3(x, 0, z) });
    opts.softColliders.push({ x, z, r: 0.5 });
  }

  return { npcs, extras };
}

/**
 * A nameplate, drawn once into a canvas. It starts invisible: a plate that is
 * always on turns a street into a labelled diagram, so it fades in only when
 * the player is both near *and* looking at the person.
 */
function nameplate(person){
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(24,26,28,0.86)';
  g.roundRect(0, 0, 512, 128, 18); g.fill();
  g.fillStyle = person.color || '#8ab4c8';
  g.fillRect(0, 0, 512, 7);
  g.fillStyle = '#f4f1e8';
  g.textAlign = 'center';
  g.font = '700 46px Inter, system-ui, sans-serif';
  g.fillText(person.name, 256, 58);
  g.font = '500 30px Inter, system-ui, sans-serif';
  g.fillStyle = 'rgba(244,241,232,0.76)';
  g.fillText((person.role || '').slice(0, 42), 256, 100);
  const tex = new THREE.CanvasTexture(c);
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.375),
    // Single-sided: a plate is text, and text on a DoubleSide material renders
    // mirrored from behind. It is billboarded, so one face is all it needs.
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false,
                                  side: THREE.FrontSide }));
  plate.renderOrder = 5;
  plate.userData.ignoreAudit = true;
  return plate;
}

const toCam = new THREE.Vector3();
const camDir = new THREE.Vector3();
const step = new THREE.Vector3();

/**
 * Somewhere else to stand, near where this person belongs. People who never
 * move read as props; people who wander off read as lost. A short beat around
 * a home point is the cheapest thing that looks like working.
 */
function pickTarget(n){
  for(let tries = 0; tries < 8; tries++){
    const a = srand() * Math.PI * 2;
    const r = srandRange(1.5, 6);
    const x = n.home.x + Math.cos(a) * r, z = n.home.z + Math.sin(a) * r;
    if(ctx.blocked?.(x, z)) continue;
    n.target.set(x, ctx.groundHeight(x, z), z);
    return;
  }
  n.target.copy(n.home);
}

/** Idle motion, billboarded plates, and the near-and-looked-at fade. */
export function updateCrowd(delta, t){
  if(!ctx) return;
  const cam = ctx.camera;
  cam.getWorldDirection(camDir);
  for(const n of npcs){
    walk(n, delta, t);
    toCam.copy(cam.position).sub(n.pos);
    const dist = toCam.length();
    n.plate.lookAt(cam.position.x, n.body.position.y + NOMINAL_H * 1.12, cam.position.z);
    // Near AND looked at. Distance alone labels everyone you walk past.
    const aim = dist > 0.001 ? toCam.normalize().dot(camDir) : 0;
    const want = dist < 9 && aim < -0.86 ? 1 : 0;
    n.plate.material.opacity += (want - n.plate.material.opacity) * Math.min(1, delta * 8);
    n.plate.visible = n.plate.material.opacity > 0.02;
  }
  for(const e of extras) idleSway(e.body, Math.sin(t * 0.8 + e.phase) * 0.025);
}

/**
 * One person, one frame. The gait is driven from the distance actually covered
 * — see rig.js strideFor — so the feet do not skate, and the body turns to face
 * where it is going before the legs are asked to take it there.
 */
function walk(n, delta, t){
  if(n.pause > 0){
    n.pause -= delta;
    idleSway(n.body, Math.sin(t * 0.9 + n.phase) * 0.03);
    n.body.position.y = ctx.groundHeight(n.pos.x, n.pos.z);
    if(n.pause <= 0) pickTarget(n);
    return;
  }
  step.subVectors(n.target, n.pos); step.y = 0;
  const dist = step.length();
  if(dist < 0.25){
    n.pause = srandRange(2, 7);
    return;
  }
  step.divideScalar(dist);
  const travel = Math.min(dist, n.speed * delta);
  n.pos.x += step.x * travel;
  n.pos.z += step.z * travel;

  // Turn toward travel first — a body facing one way while sliding another is
  // the other half of why the old walk read as aimless.
  const want = Math.atan2(step.x, step.z);
  let d = want - n.facing;
  while(d > Math.PI) d -= Math.PI * 2;
  while(d < -Math.PI) d += Math.PI * 2;
  n.facing += d * Math.min(1, delta * 5);
  // Wrap, or facing accumulates for ever and eventually loses precision.
  if(n.facing > Math.PI) n.facing -= Math.PI * 2;
  else if(n.facing < -Math.PI) n.facing += Math.PI * 2;
  n.body.rotation.y = n.facing;

  n.phase += gaitAdvance(n.speed, delta);
  const bob = stepGait(n.body, n.phase, n.speed);
  n.body.position.set(n.pos.x, ctx.groundHeight(n.pos.x, n.pos.z) + bob, n.pos.z);
  n.hit.position.set(n.pos.x, n.body.position.y + 0.95, n.pos.z);
}

export function getNPCs(){ return npcs; }
export function getNPCByCharId(id){ return npcs.find(n => n.char.id === id) ?? null; }
export function getNPCForDivision(division){ return npcs.find(n => n.division === division) ?? null; }
void stepGait;   // for themes that later give the crowd routes to walk
