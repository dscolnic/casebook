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
import { pickLook, buildBody, buildExtraBody, stepGait, gaitAdvance, idleSway } from './rig.js';
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
 *   stations,         [{ id, x, z, facing, spread? }] one per area, keyed by the
 *                     area's id — that is what a person's `division` is matched against
 *   extras,           how many anonymous people to add
 *   groundHeight,     the world's height function; feet go here, not at y=0
 *   blocked,          (x, z, pad?) -> boolean. Used three ways: placing people,
 *                     choosing somewhere to walk, and every step on the way —
 *                     the last of which is why `pad` exists, since the padding
 *                     that keeps somebody from being *placed* against a wall is
 *                     wider than their shoulders.
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

    // Fan out along the frontage, alternating sides. The default spacing suits
    // a town square; a station may ask for less, and a submarine has to — a
    // compartment is five metres long and the third person on a 4.6 m offset
    // stands in the next one.
    const gap = station.spread ?? 2.2;
    const rankGap = station.rankSpread ?? 2.4;
    const side = n % 2 ? 1 : -1;
    const rank = Math.floor(n / 2);
    const off = side * (gap + rank * rankGap);
    const back = rank * (station.backSpread ?? 1.3);
    let x = station.x + Math.cos(station.facing) * off + Math.sin(station.facing) * back;
    let z = station.z - Math.sin(station.facing) * off + Math.cos(station.facing) * back;
    // The station is somewhere a person can stand; a fanned-out offset from it
    // is not necessarily. Nudge along the frontage until it is, because a
    // named person placed inside the furniture stands there for the whole game
    // — every direction out is blocked, so they never get a target they can
    // walk to.
    if(opts.blocked){
      for(const nudge of [0, 0.6, -0.6, 1.2, -1.2, 1.8, -1.8]){
        const tx = x + Math.cos(station.facing) * nudge;
        const tz = z - Math.sin(station.facing) * nudge;
        if(!opts.blocked(tx, tz, 0.4)){ x = tx; z = tz; break; }
      }
    }

    const outfitKey = opts.roleToOutfit(person.role, (n2) => Math.floor(srand() * n2));
    const look = pickLook(opts.outfits[outfitKey] ?? Object.values(opts.outfits)[0]);
    const body = buildBody(look);
    const y = opts.groundHeight(x, z);
    body.position.set(x, y, z);                    // feet at ground level
    body.rotation.y = station.facing + Math.PI + srandRange(-0.3, 0.3);
    group.add(body);

    const plate = nameplate(person);
    plate.position.set(0, PLATE_LIFT, PLATE_STANDOFF);
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
    // The collider travels with them. It used to be pushed once at spawn and
    // never moved, so the boat was full of invisible pillars where somebody had
    // stood at the start — and since the pillar was wider than the distance at
    // which a person steps aside, walking into anybody stopped you just outside
    // the range where they would have moved. Nothing ever yielded.
    npc.soft = { x, z, r: BODY_RADIUS };
    opts.softColliders.push(npc.soft);
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
    // The cheap merged rig, which is what this tier is for: four meshes instead
    // of fourteen. It was building the full one, so 26 extras cost as much as 26
    // named people and the header's claim about it was simply untrue.
    const body = buildExtraBody(look);
    const y = opts.groundHeight(x, z);
    body.position.set(x, y, z);
    body.rotation.y = srand() * 6.28;
    group.add(body);
    // Extras walk too. They had idle sway and nothing else, so half the street
    // was permanently rooted to the spot while the named cast moved around them.
    extras.push({
      body, phase: srand() * 6.28,
      pos: new THREE.Vector3(x, y, z),
      home: new THREE.Vector3(x, y, z),
      target: new THREE.Vector3(x, y, z),
      facing: body.rotation.y,
      speed: srandRange(0.7, 1.2),
      pause: srandRange(0.5, 6),
    });
    const e = extras[extras.length - 1];
    e.soft = { x, z, r: BODY_RADIUS };
    opts.softColliders.push(e.soft);
  }

  return { npcs, extras };
}

/**
 * A chest badge, drawn once into a canvas.
 *
 * It used to be a fixed 1.5 m plank floating over the head, which reads as a
 * map label on a diagram rather than as somebody wearing an ID. Sized to its
 * text instead — the canvas is measured and the plane takes the same aspect —
 * so a short name gets a small badge. Name only: the role is already in the
 * interaction prompt, and two lines are unreadable at chest scale.
 *
 * It starts invisible and fades in only when the player is both near *and*
 * looking at the person.
 *
 * This is the same badge the two older games grew in their own npcs.js. It
 * arrived here late because the engine's crowd and those two forks are still
 * separate implementations of the same thing — see the fork note in CLAUDE.md.
 */
const PLATE_H = 0.075;              // world height of the badge, in metres
const PLATE_LIFT = 1.30;            // chest height on the 1.775 m rig
const PLATE_STANDOFF = 0.26;        // how far it floats in front of the chest

function nameplate(person){
  const PAD = 22, H = 64, MAXW = 420;
  const measure = document.createElement('canvas').getContext('2d');
  let font = 34;
  const setFont = () => { measure.font = `800 ${font}px Inter, Helvetica, Arial, sans-serif`; };
  setFont();
  let name = person.name;
  // Shrink, then clip, so a long name never produces a comically wide badge.
  while(measure.measureText(name).width > MAXW && font > 22){ font -= 2; setFont(); }
  if(measure.measureText(name).width > MAXW){
    while(name.length > 6 && measure.measureText(name + '…').width > MAXW) name = name.slice(0, -1);
    name += '…';
  }
  const w = Math.ceil(measure.measureText(name).width + PAD * 2), h = H;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const r = 12;
  g.fillStyle = 'rgba(250,250,247,0.96)';
  g.beginPath();
  g.moveTo(r, 0); g.lineTo(w - r, 0); g.quadraticCurveTo(w, 0, w, r);
  g.lineTo(w, h - r); g.quadraticCurveTo(w, h, w - r, h);
  g.lineTo(r, h); g.quadraticCurveTo(0, h, 0, h - r);
  g.lineTo(0, r); g.quadraticCurveTo(0, 0, r, 0);
  g.closePath(); g.fill();
  // a thin accent edge, as a clipped ID card has. The person's own colour, so
  // a theme that codes its groups by colour still reads off the badge.
  g.fillStyle = person.color || '#25506b';
  g.fillRect(0, 0, w, 3);
  g.fillStyle = '#1b1e22';
  g.font = `800 ${font}px Inter, Helvetica, Arial, sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(name, w / 2, h / 2 + 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(PLATE_H * (w / h), PLATE_H),
    // Single-sided: a plate is text, and text on a DoubleSide material renders
    // mirrored from behind. It is billboarded, so one face is all it needs.
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false,
                                  side: THREE.FrontSide }));
  plate.renderOrder = 5;
  plate.visible = false;
  plate.userData.ignoreAudit = true;
  return plate;
}

/**
 * Sit the badge in front of the chest, on the line to the player, so it never
 * clips into the torso however the person is facing. The badge is a child of
 * the body, so the standoff has to be computed in the body's own frame — the
 * body turns as it walks and a world-space offset would swing into its back.
 */
const plateLocal = new THREE.Vector3();
const worldChest = new THREE.Vector3();
function faceChest(n, cam){
  plateLocal.set(cam.position.x, 0, cam.position.z);
  n.body.worldToLocal(plateLocal);
  plateLocal.y = 0;
  const len = Math.hypot(plateLocal.x, plateLocal.z) || 1;
  const lift = PLATE_LIFT + (n.seated ? -0.30 : 0);
  n.plate.position.set(plateLocal.x / len * PLATE_STANDOFF, lift, plateLocal.z / len * PLATE_STANDOFF);
  n.plate.lookAt(cam.position.x, n.body.getWorldPosition(worldChest).y + lift, cam.position.z);
}

const toCam = new THREE.Vector3();
const camDir = new THREE.Vector3();
const step = new THREE.Vector3();

/**
 * Somewhere else to stand, near where this person belongs. People who never
 * move read as props; people who wander off read as lost. A short beat around
 * a home point is the cheapest thing that looks like working.
 */
const WALK_PAD = 0.4;              // roughly a person's shoulders

/** Is the straight line from here to there clear? */
function pathClear(x0, z0, x1, z1){
  if(!ctx.blocked) return true;
  const dist = Math.hypot(x1 - x0, z1 - z0);
  const steps = Math.max(2, Math.ceil(dist / 0.4));
  for(let i = 1; i <= steps; i++){
    const k = i / steps;
    if(ctx.blocked(x0 + (x1 - x0) * k, z0 + (z1 - z0) * k, WALK_PAD)) return false;
  }
  return true;
}

function pickTarget(n){
  for(let tries = 0; tries < 8; tries++){
    const a = srand() * Math.PI * 2;
    const r = srandRange(1.5, 6);
    const x = n.home.x + Math.cos(a) * r, z = n.home.z + Math.sin(a) * r;
    // The destination has to be standable AND reachable in a straight line.
    // Checking only the destination is how a submarine's crew walked through
    // its bulkheads: on open ground a six-metre stroll rarely crosses a
    // building, and in a boat it crosses two.
    if(ctx.blocked?.(x, z)) continue;
    if(!pathClear(n.pos.x, n.pos.z, x, z)) continue;
    n.target.set(x, ctx.groundHeight(x, z), z);
    return;
  }
  n.target.copy(n.home);
}

/** How wide a person is, for the player walking into them. */
const BODY_RADIUS = 0.34;
/**
 * How close somebody lets you get before stepping aside. It has to be *more*
 * than the player's radius plus BODY_RADIUS, or the player is stopped by the
 * body before the person ever notices them — which is what "there is no impact"
 * looked like.
 */
const PERSONAL_SPACE = 1.0;

/**
 * Get out of the player's way.
 *
 * Walking into a crowd used to mean walking *through* it, which reads as a bug
 * everywhere and is unplayable in a submarine: a four-metre passage with two
 * people in it is a blocked passage, and the player has no way to ask them to
 * move. So they move. They step directly away where there is room, and slide
 * along the obstruction where there is not, which is what a person in a
 * corridor actually does.
 */
function yieldToPlayer(n, px, pz){
  const dx = n.pos.x - px, dz = n.pos.z - pz;
  const d = Math.hypot(dx, dz);
  if(d > PERSONAL_SPACE) return false;
  const push = PERSONAL_SPACE - d + 0.02;
  // Standing exactly on somebody gives no direction to push them in. Pick one
  // rather than doing nothing, which is what "walk straight at a person and
  // nothing happens" looked like.
  const ux = d > 1e-3 ? dx / d : 1, uz = d > 1e-3 ? dz / d : 0;
  // Straight back first, then squeeze past on either side.
  const tries = [[ux, uz], [-uz, ux], [uz, -ux]];
  for(const [ax, az] of tries){
    const nx = n.pos.x + ax * push, nz = n.pos.z + az * push;
    if(ctx.blocked?.(nx, nz, WALK_PAD)) continue;
    n.pos.x = nx; n.pos.z = nz;
    n.body.position.x = nx; n.body.position.z = nz;
    if(n.hit) n.hit.position.set(nx, n.body.position.y + 0.95, nz);
    if(n.soft){ n.soft.x = nx; n.soft.z = nz; n.soft.r = BODY_RADIUS; }
    // Do not immediately walk back into the person who just displaced you.
    n.target.set(nx, ctx.groundHeight(nx, nz), nz);
    n.pause = Math.max(n.pause, 0.6);
    return true;
  }
  // Cornered — against a bulkhead, in a doorway, boxed in by equipment. Rather
  // than wedge the player against them, they stop being solid until there is
  // room again. Being walked through is better than being a wall.
  if(n.soft) n.soft.r = 0;
  return false;
}

/** Idle motion, billboarded plates, and the near-and-looked-at fade. */
export function updateCrowd(delta, t){
  if(!ctx) return;
  const cam = ctx.camera;
  cam.getWorldDirection(camDir);
  const px = cam.position.x, pz = cam.position.z;
  for(const n of npcs){
    walk(n, delta, t);
    yieldToPlayer(n, px, pz);
    // Near AND looked at. Distance alone labels everyone you walk past.
    //
    // Flattened to the ground plane, both vectors. Measured in 3D from the feet
    // it fails exactly when the player is closest: at 1.3 m the line from a
    // person's feet up to eye height is inclined 50°, so the dot product falls
    // through the threshold and the badge fades out as you walk up to somebody.
    toCam.set(n.pos.x - px, 0, n.pos.z - pz);
    const dist = toCam.length();
    let want = 0;
    if(dist < 9){
      toCam.normalize();
      const aim = toCam.x * camDir.x + toCam.z * camDir.z;
      if(aim > 0.86) want = Math.min(1, (9 - dist) / 2.5) * Math.min(1, (aim - 0.86) / 0.06);
    }
    n.plate.material.opacity += (want - n.plate.material.opacity) * Math.min(1, delta * 8);
    n.plate.visible = n.plate.material.opacity > 0.02;
    if(n.plate.visible) faceChest(n, cam);
  }
  for(const e of extras){ walk(e, delta, t); yieldToPlayer(e, px, pz); }
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
  const nx = n.pos.x + step.x * travel, nz = n.pos.z + step.z * travel;
  // And check the step itself. A path can be clear when it is chosen and not
  // when it is walked — a hatch shuts, a target was picked before the person
  // moved — and one frame of walking into a bulkhead is one frame too many.
  if(ctx.blocked?.(nx, nz, WALK_PAD)){
    n.pause = srandRange(0.4, 1.2);
    n.target.copy(n.pos);
    return;
  }
  n.pos.x = nx;
  n.pos.z = nz;

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
  if(n.hit) n.hit.position.set(n.pos.x, n.body.position.y + 0.95, n.pos.z);
  if(n.soft){ n.soft.x = n.pos.x; n.soft.z = n.pos.z; }
}

export function getNPCs(){ return npcs; }
export function getNPCByCharId(id){ return npcs.find(n => n.char.id === id) ?? null; }
export function getNPCForDivision(division){ return npcs.find(n => n.division === division) ?? null; }
void stepGait;   // for themes that later give the crowd routes to walk
