// plan.js — the floor plan, as data.
//
// A real hospital floor is a double-loaded corridor: one spine with rooms down
// both sides, exterior glazing at each end, and a nurses' station where the
// staff can see the whole run. Everything the world builder makes — walls,
// doorways, ceiling grid, signage, collision — is derived from this file, so
// the architecture stays consistent and is cheap to re-tune.
//
// Units are metres. +z runs north up the corridor, +x is east.

export const CORRIDOR = { halfWidth: 1.8, z0: -6, z1: 48 };
export const ROOM_DEPTH = 7.6;          // corridor wall to exterior wall
export const WALL = 0.18;               // partition thickness
export const CEILING_H = 3.0;           // slab to slab
export const TILE_H = 2.75;             // suspended ceiling grid
export const DOOR_W = 1.25;             // single leaf
export const DOOR_W_WIDE = 1.85;        // gurney-width leaf on clinical rooms
export const DOOR_H = 2.15;

export const ENVELOPE = {
  x0: -(CORRIDOR.halfWidth + ROOM_DEPTH),   // -9.4
  x1:  (CORRIDOR.halfWidth + ROOM_DEPTH),   //  9.4
  z0: CORRIDOR.z0,
  z1: CORRIDOR.z1,
};

/**
 * Rooms, listed down each side of the spine.
 *  side    'w' | 'e' — which side of the corridor
 *  z0,z1   extent along the corridor
 *  group   division id from divisions.js, when this room is a mission stop
 *  kind    drives the fit-out in props.js
 *  door    'wide' for clinical rooms that take a gurney
 *  open    true for spaces with no corridor wall (lobby, waiting, station)
 */
export const ROOMS = [
  // ---- west side, south to north
  { id:'RECEPTION', side:'w', z0:-4,  z1:4,   name:'Reception & Registration', kind:'reception', open:true },
  { id:'WAITING',   side:'w', z0:4,   z1:14,  name:'Family Waiting',           kind:'waiting',   open:true },
  { id:'RESP',      side:'w', z0:14,  z1:23,  name:'Respiratory & Cardiology', kind:'exam',      group:'RESP', door:'wide' },
  { id:'NUTR',      side:'w', z0:23,  z1:32,  name:'Nutrition & Kidney Care',  kind:'exam',      group:'NUTR' },
  { id:'DEF',       side:'w', z0:32,  z1:41,  name:'Infection & Immunology',   kind:'lab',       group:'DEF' },
  { id:'QUIET',     side:'w', z0:41,  z1:47,  name:'Quiet Room',               kind:'quiet' },

  // ---- east side, south to north
  { id:'TRI',       side:'e', z0:-4,  z1:7,   name:'Emergency & Triage',       kind:'ed',        group:'TRI', door:'wide' },
  { id:'PHARM',     side:'e', z0:7,   z1:13,  name:'Pharmacy',                 kind:'pharmacy' },
  { id:'LAB',       side:'e', z0:13,  z1:19,  name:'Clean Laboratory',         kind:'lab' },
  { id:'MOVE',      side:'e', z0:19,  z1:28,  name:'Imaging & Rehab',          kind:'imaging',   group:'MOVE', door:'wide' },
  { id:'BRAIN',     side:'e', z0:28,  z1:37,  name:'Neurology & Senses',       kind:'senses',    group:'BRAIN' },
  { id:'STATION',   side:'e', z0:37,  z1:43,  name:'Nurses’ Station',     kind:'station',   open:true },
  { id:'SUPPLY',    side:'e', z0:43,  z1:47,  name:'Clean Supply',             kind:'supply' },
];

/** Room ids that are mission destinations, in division order. */
export const ROOM_BY_GROUP = Object.fromEntries(
  ROOMS.filter(r => r.group).map(r => [r.group, r])
);

/** Inner face of a room's corridor wall, and its outer (exterior) face. */
export function roomBounds(r){
  const inner = r.side === 'w' ? -CORRIDOR.halfWidth : CORRIDOR.halfWidth;
  const outer = r.side === 'w' ? ENVELOPE.x0 : ENVELOPE.x1;
  return {
    xInner: inner,
    xOuter: outer,
    x0: Math.min(inner, outer),
    x1: Math.max(inner, outer),
    z0: r.z0, z1: r.z1,
    cx: (inner + outer) / 2,
    cz: (r.z0 + r.z1) / 2,
    sign: r.side === 'w' ? -1 : 1,     // outward direction
  };
}

/** Centre of a room's doorway, on the corridor wall. */
export function doorCentre(r){
  const b = roomBounds(r);
  return { x: b.xInner, z: b.cz, sign: b.sign };
}

/** A standing spot just inside the door, where the player ends up on entry. */
export function roomEntryPoint(r){
  const b = roomBounds(r);
  return { x: b.xInner + b.sign * 1.6, z: b.cz };
}

/**
 * Waiting-room seating: [x, z, facing]. Shared by hospitalProps.js, which
 * builds the chairs, and npcs.js, which sits people in them — so a seated
 * patient is always actually on a chair.
 */
export const WAITING_CHAIRS = [
  [-4.2, 5.4, Math.PI / 2], [-4.2, 6.6, Math.PI / 2], [-4.2, 7.8, Math.PI / 2],
  [-7.4, 5.4, -Math.PI / 2], [-7.4, 6.6, -Math.PI / 2], [-7.4, 7.8, -Math.PI / 2],
  [-5.8, 10.6, 0], [-4.6, 10.6, 0],
];
