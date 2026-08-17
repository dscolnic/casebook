// avatars.js — the other players.
//
// The rig work is already done: `buildBody` draws a person and `stepGait` walks
// one, which is what the crowd has been using since it was extracted. A teammate
// is one more of those, driven by a position off the wire instead of by a walk
// target.
//
// Three things here are not the crowd's:
//
//   · The look is derived from the player's id by hand, NOT through `pickLook`.
//     That function draws from the world's seeded generator (`srand` in
//     materials.js), which is shared, ordered state — the crowd's placement is
//     reproducible because nothing else pulls from it between resets. An avatar
//     built when somebody joins would pull from it at an arbitrary moment and
//     move every subsequent draw, so a person walking in through the door would
//     change what the next tree looked like.
//
//   · Position is interpolated. Ten packets a second against sixty frames is a
//     visible stutter; a teammate arriving at the last known point over about a
//     tenth of a second is not.
//
//   · Nothing is drawn unless it is in the same SPACE. Interiors are built in a
//     district four kilometres along +x, so a teammate who has walked into a
//     room is at a coordinate the player outside would see as a figure standing
//     in the far distance across the terrain.
import * as THREE from 'three';
import { buildBody, stepGait, gaitAdvance, idleSway, SKIN, HAIR } from './rig.js';

let ctx = null;
let group = null;
const avatars = new Map();   // id -> { id, body, tag, target, at, phase, sway, speed, colour }

// How long an avatar takes to reach the position that just arrived, in seconds.
// Long enough to smooth ten-hertz packets, short enough that a teammate is where
// they say they are before it matters.
const LERP_TIME = 0.12;

/** A stable number from a string. Same id, same face, in every browser. */
function hash(str){
  let h = 2166136261;
  for(let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0);
}

/**
 * An appearance, from an id and a colour — no shared RNG touched.
 *
 * The top is the player's assigned colour, because that colour is what the
 * roster panel and the map use to say which teammate is which, and a jacket that
 * does not match the dot beside their name would make both useless.
 */
function lookFor(id, colour){
  const h = hash(id);
  const pick = (arr, shift) => arr[(h >> shift) % arr.length];
  return {
    outfit: { top: new THREE.Color(colour).getHex(), bottom: 0x2c3038, kind: 'adult' },
    skin: pick(SKIN, 3),
    hair: pick(HAIR, 7),
    height: 1.62 + ((h >> 11) % 24) / 100,
    shoulders: 0.94 + ((h >> 17) % 18) / 100,
    hairStyle: ((h >> 23) & 1) === 1,
    cap: false, badge: true, overcoat: false, accessory: null,
  };
}

/**
 * A name over a head.
 *
 * Depth-tested like everything else. The one thing in these games allowed to
 * draw through walls is the cone over somebody the day wants, and adding a
 * second exception would end with the rule meaning nothing — a teammate behind a
 * bulkhead is found on the roster panel, which says how far and which way.
 */
function nameTag(name, colour){
  const pad = 12, font = 34;
  const canvas = document.createElement('canvas');
  const g = canvas.getContext('2d');
  g.font = `600 ${font}px ui-sans-serif, system-ui, sans-serif`;
  const w = Math.ceil(g.measureText(name).width) + pad * 2;
  canvas.width = w; canvas.height = font + pad * 2;
  const c = canvas.getContext('2d');
  c.font = `600 ${font}px ui-sans-serif, system-ui, sans-serif`;
  c.fillStyle = 'rgba(12,14,18,0.72)';
  c.beginPath();
  c.roundRect(0, 0, canvas.width, canvas.height, 14);
  c.fill();
  c.fillStyle = colour;
  c.fillRect(0, canvas.height - 5, canvas.width, 5);
  c.fillStyle = '#f2f4f8';
  c.textBaseline = 'middle';
  c.fillText(name, pad, canvas.height / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  // World units, and small ones. A sprite is sized in metres, not pixels: at
  // half a metre tall the label on somebody three metres away was four metres
  // wide across the middle of the screen. A name plate is about the size of a
  // name plate.
  const H = 0.17;
  sprite.scale.set((canvas.width / canvas.height) * H, H, 1);
  return sprite;
}

/**
 * @param opts {
 *   scene,
 *   groundHeight,  (x, z) -> y. The same one the world uses; an avatar standing
 *                  at y=0 on graded terrain is an avatar buried to the knees.
 * }
 */
export function initAvatars(opts){
  if(group) return;
  ctx = opts;
  group = new THREE.Group();
  group.name = 'avatars';
  opts.scene.add(group);
}

function make(member){
  const look = lookFor(member.id, member.colour || '#6fc7d8');
  const body = buildBody(look);
  // Long names are cut rather than allowed to set the plate's width: the sprite
  // is sized from the canvas aspect, so one player called something long would
  // wear a sign wider than the compartment.
  const shown = (member.name || 'Player').slice(0, 14);
  const tag = nameTag(shown, member.colour || '#6fc7d8');
  tag.position.y = look.height + 0.22;
  body.add(tag);
  group.add(body);
  const a = {
    id: member.id, body, tag, colour: member.colour,
    at: new THREE.Vector3(), target: new THREE.Vector3(),
    yaw: 0, targetYaw: 0, phase: 0, sway: Math.random() * 6.28,
    speed: 0, space: 'out', have: false,
  };
  avatars.set(member.id, a);
  return a;
}

export function removeAvatar(id){
  const a = avatars.get(id);
  if(!a) return;
  group.remove(a.body);
  a.body.traverse((o) => { o.geometry?.dispose?.(); });
  a.tag.material.map?.dispose();
  a.tag.material.dispose();
  avatars.delete(id);
}

/**
 * Per frame.
 *
 * @param members  room.members() — each { id, name, colour, pos }
 * @param mySpace  'out', or 'int:<groupId>' when the player is in an interior
 */
export function updateAvatars(delta, members, mySpace){
  if(!group) return;
  const live = new Set();

  for(const m of members){
    if(!m.pos) continue;
    live.add(m.id);
    const a = avatars.get(m.id) ?? make(m);

    // Same room, or nothing to draw. Not a visibility trick — an avatar in
    // another space is at a coordinate that means something else entirely.
    const here = (m.pos.space || 'out') === (mySpace || 'out');
    a.body.visible = here;
    if(!here) continue;

    a.target.set(m.pos.x, m.pos.y ?? 0, m.pos.z);
    a.targetYaw = m.pos.yaw ?? 0;
    // First packet: be there, do not walk in from the origin.
    if(!a.have){ a.at.copy(a.target); a.yaw = a.targetYaw; a.have = true; }

    const before = a.at.clone();
    const k = Math.min(1, delta / LERP_TIME);
    a.at.lerp(a.target, k);
    // The angle has to take the short way round or a player turning past due
    // north spins their avatar the whole way back.
    let dy = a.targetYaw - a.yaw;
    while(dy > Math.PI) dy -= Math.PI * 2;
    while(dy < -Math.PI) dy += Math.PI * 2;
    a.yaw += dy * k;

    // Speed from the movement actually drawn, not from the packet: an avatar
    // being smoothed toward a distant point is walking, whatever the sender's
    // own flag says, and the feet have to agree with the ground going past.
    const moved = a.at.distanceTo(before);
    a.speed = delta > 0 ? moved / delta : 0;

    // Feet on the world's own floor. The sender's y is their camera height in
    // their own space and is not a floor anywhere.
    const y = ctx.groundHeight ? ctx.groundHeight(a.at.x, a.at.z) : 0;
    let lift = 0;
    if(a.speed > 0.15){
      a.phase += gaitAdvance(a.speed, delta);
      lift = stepGait(a.body, a.phase, a.speed);
    } else {
      a.sway += delta * 1.4;
      idleSway(a.body, a.sway);
    }
    a.body.position.set(a.at.x, y + lift, a.at.z);
    // The rig faces +Z; a yaw of 0 in the player's camera looks down −Z.
    a.body.rotation.y = a.yaw + Math.PI;
  }

  for(const id of [...avatars.keys()]) if(!live.has(id)) removeAvatar(id);
}

/** Everything, for a theme switch or a teardown. */
export function clearAvatars(){
  for(const id of [...avatars.keys()]) removeAvatar(id);
}
