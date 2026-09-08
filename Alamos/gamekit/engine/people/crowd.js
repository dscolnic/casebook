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
import { pickLook, buildBody, buildExtraBody, stepGait, gaitAdvance, idleSway, poseSeated } from './rig.js';
import { srand, srandRange, resetSeed } from '../world/materials.js';
// Which people the day still wants. The crowd is the only place that knows
// where those people are standing right now, so it is the only place that can
// mark them.
import { getState } from '../core/gameState.js';
import { openStopIndices, isPersonStopForIdx, getPersonIdForStop } from '../core/simulation.js';
import { registerNPCSource } from './registry.js';

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
 *   activeLevel,      optional () -> floor id. A stacked building (see
 *                     engine/world/interiorTower.js) has four floors on one
 *                     footprint, so a person is on one of them: somebody two
 *                     floors down must not be collided with, talked to, or
 *                     walked by a `blocked` predicate that describes a floor
 *                     they are not on. Absent everywhere else, and inert.
 *   blocked,          (x, z, pad?) -> boolean. Used three ways: placing people,
 *                     choosing somewhere to walk, and every step on the way —
 *                     the last of which is why `pad` exists, since the padding
 *                     that keeps somebody from being *placed* against a wall is
 *                     wider than their shoulders.
 * }
 */
/**
 * Where the nth person at a station stands.
 *
 * Fan out along the frontage, alternating sides. The default spacing suits a
 * town square; a station may ask for less, and a submarine has to — a
 * compartment is five metres long and the third person on a 4.6 m offset stands
 * in the next one. A ROOM asks for less again: nine metres of floor with a
 * bench down one side of it.
 *
 * Extracted so that indoors and outdoors place people by the same arithmetic.
 * It was inline in `initCrowd`, and `stationIndoors` below needs exactly this —
 * a second copy would have drifted the first time either spacing was tuned.
 */
function spotFor(station, n, blocked){
  const gap = station.spread ?? 2.2;
  const rankGap = station.rankSpread ?? 2.4;
  const side = n % 2 ? 1 : -1;
  const rank = Math.floor(n / 2);
  const off = side * (gap + rank * rankGap);
  const back = rank * (station.backSpread ?? 1.3);
  let x = station.x + Math.cos(station.facing) * off + Math.sin(station.facing) * back;
  let z = station.z - Math.sin(station.facing) * off + Math.cos(station.facing) * back;
  // The station is somewhere a person can stand; a fanned-out offset from it is
  // not necessarily. Nudge along the frontage until it is, because a named
  // person placed inside the furniture stands there for the whole game — every
  // direction out is blocked, so they never get a target they can walk to.
  if(blocked){
    const found = settle(x, z, blocked, station.facing);
    x = found[0]; z = found[1];
  }
  return [x, z];
}

/**
 * How far a body has to fall to sit on a surface `surface` metres up.
 *
 * The hip pivot is at 0.88 on the nominal rig and the thigh capsule's radius is
 * 0.078, so the underside of a horizontal thigh ends at `0.88 - drop - 0.078`.
 * Setting that equal to the seat gives `drop = 0.802 - surface`.
 *
 * THE SEAT'S SURFACE IS NOT THE NUMBER IN ITS BUILDER. A kit bench is built with
 * its slab *centred* at 0.44 and 0.1 thick, so people sit at 0.49; passing 0.44
 * put every seated person 12.8 cm into the bench, which is what it looked like.
 * A seat may declare its own `surface`; 0.44 is the ordinary chair.
 */
const HIP_PIVOT = 0.88, THIGH_R = 0.078;
export function seatedDrop(surface){
  const s = Number.isFinite(surface) ? surface : 0.44;
  return Math.max(0.05, HIP_PIVOT - THIGH_R - s);
}

/**
 * The floor under one person.
 *
 * `ctx.groundHeight` answers for the terrain, and a person standing in an
 * interior is four kilometres out in x where the terrain means nothing — so
 * somebody moved into a room would have their feet, their raycast cylinder and
 * their wanted marker all placed at whatever the heightfield says out there.
 * `floorY` is set while they are indoors and is the answer then.
 *
 * Not `?? 0`: a room's floor is not always zero. Mission Control and the
 * theatre stand their rooms on a raised tier, and anything placed at zero there
 * is under the floor.
 */
function floorOf(n, x, z){
  return Number.isFinite(n.floorY) ? n.floorY : ctx.groundHeight(x, z);
}

export function initCrowd(opts){
  if(group) return { npcs, extras };
  ctx = opts;
  resetSeed(7);
  group = new THREE.Group();
  group.name = 'crowd';
  opts.scene.add(group);

  const byStation = new Map(opts.stations.map(s => [s.id, s]));
  // Named people are found INSIDE their area, not at its door. Off by default:
  // every game written before this meets its cast in the street, and a person
  // stop answered on the pavement is most of how they are met. See
  // `stationIndoors` and `people.indoors` in the manifest.
  const indoorOnly = opts.indoorOnly === true;

  // ---- named people, standing near the area they belong to
  // Spread around their station on a small arc rather than a single point:
  // without separation the whole cast converges into one interpenetrating clump.
  const perStation = new Map();
  for(const person of opts.roster){
    const station = byStation.get(person.division) ?? opts.stations[0];
    if(!station) continue;
    const n = perStation.get(station.id) ?? 0;
    perStation.set(station.id, n + 1);

    let [x, z] = spotFor(station, n, opts.blocked);

    const outfitKey = opts.roleToOutfit(person.role, (n2) => Math.floor(srand() * n2));
    const look = pickLook(opts.outfits[outfitKey] ?? Object.values(opts.outfits)[0]);
    const body = buildBody(look);
    // A station may name its own floor height. `groundHeight` answers for the
    // floor the *player* is on, so in a stacked building it would put the whole
    // cast on floor one and then leave them there.
    const y = Number.isFinite(station.y) ? station.y : opts.groundHeight(x, z);
    body.position.set(x, y, z);                    // feet at ground level
    body.rotation.y = station.facing + Math.PI + srandRange(-0.3, 0.3);
    // Drawn from the first frame, or not at all. `updateCrowd` sets this every
    // frame after, but the first frame comes before the first update and a cast
    // that flickers into the street and out again is worse than either.
    body.visible = !indoorOnly;
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
      level: station.level ?? null,
      body, hit, plate, look,
      pos: new THREE.Vector3(x, y, z),
      home: new THREE.Vector3(x, y, z),
      target: new THREE.Vector3(x, y, z),
      facing: body.rotation.y,
      speed: srandRange(0.75, 1.15),
      phase: srand() * 6.28,
      pause: srandRange(0.5, 4),
      // Off the street until their room is opened, where the theme asks for it.
      // `offFloor` reads this, so they lose their collider, their raycast target,
      // their nameplate and their marker with it.
      ...(indoorOnly ? { away: true } : {}),
      // Their own facing at spawn, kept so `stationIndoors(null)` can put them
      // back the way they were rather than however they last turned.
      homeFacing: body.rotation.y,
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
  //
  // Three kinds of extra, because a street where everybody is walking somewhere
  // reads as a station concourse. Some SIT, on whatever the world says can be
  // sat on — a bench, a chair the plan declared. Some stand in PAIRS, talking,
  // facing each other. The rest walk a short beat around a home point.
  const spots = opts.extraSpots ?? [];
  const total = opts.extras ?? 0;
  const newExtra = (look, x, y, z, s) => {
    // The cheap merged rig, which is what this tier is for: four meshes instead
    // of fourteen. It was building the full one, so 26 extras cost as much as 26
    // named people and the header's claim about it was simply untrue.
    const body = buildExtraBody(look);
    body.position.set(x, y, z);
    body.rotation.y = srand() * 6.28;
    group.add(body);
    const e = {
      body, phase: srand() * 6.28, level: s?.level ?? null,
      pos: new THREE.Vector3(x, y, z),
      home: new THREE.Vector3(x, y, z),
      target: new THREE.Vector3(x, y, z),
      facing: body.rotation.y,
      speed: srandRange(0.7, 1.2),
      pause: srandRange(0.5, 6),
    };
    e.soft = { x, z, r: BODY_RADIUS };
    opts.softColliders.push(e.soft);
    extras.push(e);
    return e;
  };
  const randomLook = () => pickLook(opts.outfits[opts.roleToOutfit('', (n) => Math.floor(srand() * n))]
                          ?? Object.values(opts.outfits)[0]);

  // Seated first: about a quarter of the crowd, and never more than there are
  // seats. A seat is `{ x, z, y, facing }`; the sitter faces the way it does.
  const seatList = (opts.seats ?? []).filter(s => Number.isFinite(s.x) && Number.isFinite(s.z));
  const seated = Math.min(seatList.length, Math.floor(total * 0.28));
  for(let i = 0; i < seated; i++){
    const s = seatList[i];
    const y = Number.isFinite(s.y) ? s.y : opts.groundHeight(s.x, s.z);
    const e = newExtra(randomLook(), s.x, y, s.z, s);
    e.seated = true;
    e.facing = s.facing ?? 0;
    e.body.rotation.y = e.facing;
    // The drop is computed from the seat's own surface — see `seatedDrop`. The
    // body's y is left where the pose put it and never re-grounded.
    poseSeated(e.body, seatedDrop(s.surface));
    e.soft.r = 0.3;
  }

  let placed = seated;
  for(let i = 0; placed < total && spots.length && i < total * 3; i++){
    const s = spots[i % spots.length];
    let x = s.x + srandRange(-3.5, 3.5);
    let z = s.z + srandRange(-3.5, 3.5);
    // Nudge rather than skip. Skipping quietly reduced the crowd whenever the
    // jitter landed in a wall, which is the same bug as standing in one, only
    // invisible.
    if(opts.blocked){
      const found = settle(x, z, opts.blocked);
      x = found[0]; z = found[1];
      if(opts.blocked(x, z, 0.4)) continue;
    }
    const y = Number.isFinite(s.y) ? s.y : opts.groundHeight(x, z);
    const e = newExtra(randomLook(), x, y, z, s);
    placed++;
    // Every third walker brings a partner and stops to talk to them. The pair
    // stand a pace apart, facing each other, and neither wanders off.
    if(placed % 3 === 0 && placed < total){
      const a = srand() * Math.PI * 2;
      const px = x + Math.cos(a) * 1.25, pz = z + Math.sin(a) * 1.25;
      if(!opts.blocked?.(px, pz, 0.4)){
        const py = Number.isFinite(s.y) ? s.y : opts.groundHeight(px, pz);
        const p = newExtra(randomLook(), px, py, pz, s);
        placed++;
        e.talk = p; p.talk = e;
        e.talkSide = 0; p.talkSide = 1;
        e.talkPhase = p.talkPhase = srand() * 7;
        e.facing = Math.atan2(px - x, pz - z); e.body.rotation.y = e.facing;
        p.facing = e.facing + Math.PI; p.body.rotation.y = p.facing;
      }
    }
  }

  return { npcs, extras };
}

/**
 * Two people talking. The speaker's torso turns a little as they make a point
 * and the listener nods; every few seconds they swap. The cheap rig has no
 * arms of its own, so this is done with what it has — and at ten metres a
 * torso that moves reads as a person who is talking.
 */
function converse(n, t){
  const body = n.body;
  const beat = Math.floor((t + n.talkPhase) / 3.4);
  const speaking = (beat % 2) === n.talkSide;
  const torso = body.userData.torso;
  if(torso){
    torso.rotation.y = speaking ? Math.sin(t * 3.1 + n.phase) * 0.09 : Math.sin(t * 0.8 + n.phase) * 0.03;
    torso.rotation.x = speaking ? 0.02 : Math.max(0, Math.sin(t * 2.2 + n.phase)) * 0.05;
  }
  body.position.y = floorOf(n, n.pos.x, n.pos.z) + (speaking ? Math.abs(Math.sin(t * 3.1)) * 0.008 : 0);
  body.userData.limbs?.forEach(l => {
    if(l.userData.isLeg){
      l.rotation.x = l.userData.side * 0.02;
      if(l.userData.knee) l.userData.knee.rotation.x = 0;
      if(l.userData.shoe) l.userData.shoe.rotation.x = 0;
    }
  });
}

/**
 * Somebody stationed in a room. Standing still is not standing frozen; and one
 * of them, at the bench, has their hands on the work.
 */
function stationedIdle(n, t){
  if(n.pose === 'work'){
    n.body.userData.limbs?.forEach(l => {
      if(l.userData.isArm) l.rotation.x = -1.15 + Math.sin(t * 5.5 + l.userData.side * 1.7 + n.phase) * 0.06;
      else if(l.userData.isLeg){
        l.rotation.x = 0;
        if(l.userData.knee) l.userData.knee.rotation.x = 0;
        if(l.userData.shoe) l.userData.shoe.rotation.x = 0;
      }
    });
    if(n.body.userData.torso) n.body.userData.torso.rotation.x = 0.09;
    if(n.body.userData.head) n.body.userData.head.rotation.x = 0.18;
    return;
  }
  idleSway(n.body, Math.sin(t * 0.9 + n.phase) * 0.03);
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
/**
 * The marker over the head of somebody this day's calls want.
 *
 * A person stop is answered by finding a named person in a crowd of thirty who
 * are dressed like them, and the only aids were a nameplate you have to be
 * within nine metres and looking straight at, and a dot on the map. This is the
 * third: a cone the size of a road sign, hanging over their head, bobbing.
 *
 * Two deliberate choices. It is a cone rather than a billboarded chevron, so it
 * reads the same from every angle without a per-frame rotation. And it draws
 * with `depthTest: false` — through walls, through other people — because the
 * whole point is finding somebody you cannot see. It is the one thing in these
 * games allowed to do that.
 */
const MARKER_LIFT = 2.35;              // clear of a 1.775 m rig's head
function findMarker(colour){
  const g = new THREE.Group();
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.62, 4),
    new THREE.MeshBasicMaterial({ color: colour, depthTest: false, transparent: true, opacity: 0.95 }));
  cone.rotation.x = Math.PI;           // point down, at the head
  cone.rotation.y = Math.PI / 4;       // a diamond in plan, not a square
  const halo = new THREE.Mesh(
    new THREE.ConeGeometry(0.36, 0.78, 4),
    new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: 0.35 }));
  halo.rotation.copy(cone.rotation);
  halo.position.y = 0.02;
  g.add(halo, cone);
  g.renderOrder = 9000;                // over everything, including the halo's own siblings
  g.userData.cone = cone;
  return g;
}

/**
 * The nearest spot to (x, z) that is not inside something.
 *
 * Along the frontage first, because a person outside a building should stay
 * on its frontage, then rings outward. A line search along one axis was not
 * enough: it leaves anybody whose only clear direction is sideways standing in
 * the wall, and once they are in it the walker cannot get them out — every step
 * from inside a collider is itself blocked.
 */
function settle(x, z, blocked, facing = 0){
  if(!blocked(x, z, 0.4)) return [x, z];
  for(const nudge of [0.6, -0.6, 1.2, -1.2, 1.8, -1.8]){
    const tx = x + Math.cos(facing) * nudge;
    const tz = z - Math.sin(facing) * nudge;
    if(!blocked(tx, tz, 0.4)) return [tx, tz];
  }
  for(let r = 0.8; r <= 4.0; r += 0.8){
    for(let i = 0; i < 12; i++){
      const a = (i / 12) * Math.PI * 2;
      const tx = x + Math.cos(a) * r, tz = z + Math.sin(a) * r;
      if(!blocked(tx, tz, 0.4)) return [tx, tz];
    }
  }
  return [x, z];
}

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
    n.target.set(nx, floorOf(n, nx, nz), nz);
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
/**
 * Who the day still wants, refreshed a few times a second rather than per
 * frame — it walks the open stops and resolves a person for each, and none of
 * that changes between two frames.
 *
 * More than one at once is normal: a day whose repeat visit became a second
 * person stop wants two people, and they can be standing in the same room.
 */
let wantedIds = new Set();
let sinceWanted = 1;
// A warm-up run turns the day's own markers off. The cone over somebody's head
// means "today wants a word with you", and during a GREET or a FOLLOW it is
// pointing at a person who has nothing to do with the run — two sets of
// instructions in one street, in the one part of the day that exists to teach
// the player how to read the place. The cone is the only thing in these games
// allowed to draw through walls, so leaving it up during a run is louder than
// anything the run itself puts on screen.
let suppressWanted = false;
export function setWantedMarkers(on){ suppressWanted = !on; }
function refreshWanted(){
  const state = getState?.();
  if(!state || suppressWanted){ wantedIds = new Set(); return; }
  const next = new Set();
  try{
    for(const i of openStopIndices(state)){
      if(!isPersonStopForIdx(state, i)) continue;
      const id = getPersonIdForStop(state, i);
      if(id) next.add(id);
    }
  }catch{ /* a theme mid-load has no mission yet */ }
  wantedIds = next;
}

export function updateCrowd(delta, t){
  if(!ctx) return;
  sinceWanted += delta;
  if(sinceWanted > 0.4){ sinceWanted = 0; refreshWanted(); }
  const cam = ctx.camera;
  cam.getWorldDirection(camDir);
  const px = cam.position.x, pz = cam.position.z;
  for(const n of npcs){
    if(offFloor(n)){
      // Nothing of them is reachable from here. Two things have to go, and
      // neither is obvious:
      //
      //   · the soft collider, because it is an (x, z) cylinder with no height
      //     in it — a person on the floor below is otherwise an invisible post
      //     in the middle of this room;
      //   · the raycast target, **by layer and not by `visible`**. three.js
      //     `intersectObject` tests `object.layers` and does not look at
      //     `visible` at all (r160), so hiding the hit cylinder leaves it fully
      //     interactable: the prompt comes up and you talk to somebody two
      //     floors down through a concrete slab. `visible` is set as well, for
      //     the renderer.
      if(n.soft) n.soft.r = 0;
      if(n.hit){ n.hit.visible = false; n.hit.layers.disable(0); }
      n.plate.visible = false;
      if(n.marker) n.marker.visible = false;
      // The body goes too, but only for somebody who is somewhere else
      // entirely — see `away` above for why a floor below keeps theirs.
      if(away(n)) n.body.visible = false;
      continue;
    }
    if(!n.body.visible) n.body.visible = true;
    if(n.soft && n.soft.r === 0) n.soft.r = BODY_RADIUS;
    if(n.hit){ n.hit.visible = true; n.hit.layers.enable(0); }
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

    // The marker over the head of anybody today still owes a call to.
    const wanted = wantedIds.has(n.char?.id);
    if(wanted && !n.marker){
      n.marker = findMarker(n.char?.color ?? 0xf2c14e);
      group.add(n.marker);
    }
    if(n.marker){
      n.marker.visible = wanted;
      if(wanted){
        n.marker.position.set(n.pos.x, floorOf(n, n.pos.x, n.pos.z) + MARKER_LIFT
          + Math.sin(t * 2.2 + n.phase) * 0.09, n.pos.z);
        n.marker.rotation.y = t * 1.1;
      }
    }
  }
  for(const e of extras){
    if(offFloor(e)){ if(e.soft) e.soft.r = 0; continue; }
    if(e.soft && e.soft.r === 0) e.soft.r = BODY_RADIUS;
    walk(e, delta, t);
    yieldToPlayer(e, px, pz);
  }
}

/**
 * One person, one frame. The gait is driven from the distance actually covered
 * — see rig.js strideFor — so the feet do not skate, and the body turns to face
 * where it is going before the legs are asked to take it there.
 */
/**
 * Somebody on a floor the player is not on.
 *
 * They keep their body and stay drawn — a tower whose other floors are empty
 * through the glass is a stage set — and they stop being *there*: no collider,
 * no interaction, no walking, and their feet stay at their own floor's height
 * rather than following a ground function that is answering for another floor.
 */
function offFloor(n){
  const active = ctx.activeLevel?.();
  return (active != null && n.level != null && n.level !== active) || n.away === true;
}

/**
 * Somebody who is not in this place at all.
 *
 * DIFFERENT FROM `offFloor`, and the difference is the body. Somebody two floors
 * down keeps theirs and stays drawn on purpose — the note on `offFloor` says
 * why: a tower whose other floors are empty through the glass is a stage set.
 * Somebody who is INDOORS while the player is on the street is not visible from
 * it at all, and drawing them anyway is what "I see Laila Abiola outside the
 * building and inside" was: she stood at her door as you walked up and was in
 * the room a second later.
 *
 * Set by `stationIndoors`, and only in a theme that asked for `people.indoors`.
 */
function away(n){ return n.away === true; }

function walk(n, delta, t){
  if(offFloor(n)) return;
  // Sitting down. The pose is set once; the sway is the only motion.
  if(n.seated){ idleSway(n.body, Math.sin(t * 0.7 + n.phase) * 0.03, true); return; }
  // Talking to somebody. Neither of them goes anywhere.
  if(n.talk){ converse(n, t); return; }
  // Stationed in a room by `stationPeople`: still, but not frozen.
  if(n.stationed){ stationedIdle(n, t); return; }
  // Somebody a world format has taken over. FOLLOW's guide and EVADE's pursuer
  // are people who already stand in this crowd with a body, a nameplate and a
  // collider, and the run drives them directly — see worldFormats.js takeOver.
  // Building a second figure instead would mean a second look drawn from the
  // world's own seeded generator, which moves every later draw.
  if(n.scripted) return;
  // Somebody standing inside a collider cannot walk out of it: every step from
  // in there is blocked too. Check where they are, not only where they head.
  if(ctx.blocked?.(n.pos.x, n.pos.z, 0.15)){
    const [rx, rz] = settle(n.pos.x, n.pos.z, ctx.blocked, n.facing ?? 0);
    n.pos.set(rx, n.pos.y, rz);
    n.body.position.set(rx, ctx.groundHeight(rx, rz), rz);
    if(n.soft){ n.soft.x = rx; n.soft.z = rz; }
  }
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

/**
 * Move an area's people INTO a room, or send them back to their doorstep.
 *
 * THE DEFECT THIS IS FOR. Named people stand outside their own area's building,
 * because `initCrowd` places them at the outdoor stations the world hands over
 * and nothing ever put anybody inside an interior. So a room is a furnished
 * space with a lit case stand and nobody in it, and every mission beat spoken
 * by somebody indoors had nobody to be spoken by: `beats.js` projects a bubble
 * onto the speaker's chest, found nobody within four kilometres, and fell back
 * to a card in the middle of the screen. A commander who steps between two
 * technicians and locks their panels was a caption.
 *
 * `station` is the same shape the outdoor ones are — `{ x, z, y, facing }` in
 * WORLD coordinates, plus the optional spreads — so `spotFor` fans a cast out
 * along a bench exactly as it fans them along a frontage. Pass `null` to send
 * them home.
 *
 * They are marked `scripted` while they are in there, which is the flag the
 * world formats already use to mean "somebody else is driving this person":
 * `walk()` returns early on it, so nobody wanders out through a wall looking
 * for a target on the terrain outside. `floorY` is the room's floor, for the
 * reason `floorOf` gives.
 *
 * Returns how many people were moved, so a caller can tell an empty area from
 * a missing one.
 */
export function stationIndoors(division, station, opts = {}){
  return stationPeople(n => n.division === division, station, opts);
}

/**
 * The same move, for people chosen by something other than their area.
 *
 * A person stop may be SITED somewhere that is not the area the person belongs
 * to — Red Sand's mission 2 asks Sundqvist, who works in the Catalyst Bay, a
 * question at the Atmosphere Intake, because that is where the compressors are.
 * `stationIndoors` moves a whole division and could not express that: the map
 * marked her at her own building, the player walked to a door sealed until
 * mission 9, and the intake they were actually sent to was empty. Everything
 * else about the day already knew — `siteForStop` is read by the call line, the
 * access rules and the room's fixtures — and the cast was the one thing still
 * standing where the roster said rather than where the day said.
 *
 * `who` is a predicate, or a list of character ids. `from` is where in the
 * station's fan to start, so a room that stations its own people and then a
 * visitor does not stand the visitor inside somebody.
 *
 * Returns how many people were moved.
 */
export function stationPeople(who, station, { from = 0, work = null } = {}){
  if(!ctx) return 0;
  const match = typeof who === 'function'
    ? who
    : (n) => (who ?? []).includes(n.char?.id ?? n.id);
  const here = npcs.filter(match);
  let i = from;
  let workTaken = false;
  for(const n of here){
    if(!station){
      // Home is where they were placed at the start of the game, and their own
      // facing with it — not `n.facing`, which is wherever they last turned to.
      n.scripted = false;
      n.stationed = false;
      n.pose = null;
      delete n.floorY;
      // Arms back down: the work pose left them on the bench.
      n.body.userData.limbs?.forEach(l => { if(l.userData.isArm) l.rotation.x = 0; });
      if(n.body.userData.torso) n.body.userData.torso.rotation.x = 0;
      if(n.body.userData.head) n.body.userData.head.rotation.x = 0;
      put(n, n.home.x, n.home.y, n.home.z, n.homeFacing ?? n.facing);
      n.target.copy(n.home);
      // And back off the street, in a theme whose cast lives indoors. Their home
      // is their area's doorstep and they are not standing on it.
      if(ctx.indoorOnly === true){ n.away = true; n.body.visible = false; }
      continue;
    }
    if(n.homeFacing === undefined) n.homeFacing = n.facing;
    // THE FIRST ONE WORKS. A bench with nobody at it is a room that is waiting
    // for the player; a bench with somebody's hands on it is a room with a job
    // going on in it. `work` is the room's own spot — see `workSpot` in
    // interiorBuilding.js — and only one person takes it.
    const atWork = !!work && !workTaken && Number.isFinite(work.x);
    if(atWork) workTaken = true;
    const [x, z] = atWork ? [work.x, work.z] : spotFor(station, i++, ctx.blocked);
    const y = Number.isFinite(station.y) ? station.y : 0;
    n.scripted = true;
    n.stationed = true;
    n.pose = atWork ? 'work' : null;
    n.away = false;                 // in the room, so reachable again
    // AND VISIBLE HERE, not one frame later. `updateCrowd` also restores this,
    // but it runs on requestAnimationFrame — which a throttled tab never gets,
    // and which leaves a frame of an empty room even when it does. The function
    // that decides where somebody is is the one that should say whether they
    // can be seen.
    n.body.visible = true;
    n.floorY = y;
    put(n, x, y, z, atWork ? work.facing : station.facing + Math.PI);
    n.target.set(x, y, z);
  }
  return here.length;
}

/** One person, moved bodily: rig, raycast cylinder, soft collider and position. */
function put(n, x, y, z, rotY){
  n.pos.set(x, y, z);
  n.body.position.set(x, y, z);
  n.body.rotation.y = rotY;
  n.facing = rotY;
  if(n.hit) n.hit.position.set(x, y + 0.95, z);
  if(n.soft){ n.soft.x = x; n.soft.z = z; }
}

export function getNPCs(){ return npcs; }
// The engine draws the map from whichever crowd this game loaded.
registerNPCSource(getNPCs);
export function getNPCByCharId(id){ return npcs.find(n => n.char.id === id) ?? null; }
export function getNPCForDivision(division){ return npcs.find(n => n.division === division) ?? null; }
void stepGait;   // for themes that later give the crowd routes to walk
