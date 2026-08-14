/**
 * Stations you walk between, for a PROBE stop.
 *
 * A PROBE asks the player to find a fault from where a pattern breaks along a
 * physical chain — the stages of a dilution refrigerator, say. The panel version
 * puts the stations in a list and gives each one a Read button, which teaches the
 * inference and not the place. This puts them in the room: six posts down one
 * wall in the order the chain runs, each with a blank face until somebody stands
 * in front of it and presses E.
 *
 * What this deliberately does not do is move the decision. Reading is still free
 * and the player still chooses which stations to read and when to stop; walking
 * only makes the chain a thing with a length, so the top of it and the bottom of
 * it are not two adjacent rows.
 *
 * The stations are built from the lesson, not from the theme's `interiors` block,
 * because the chain belongs to the question. A room whose open call is not a PROBE
 * gets none, and the same room gets a different set tomorrow.
 */
import * as THREE from 'three';
import { printedSheet } from './screens.js';

const METAL = 0x8f9aa2;
const READ = 0x2f6f8f;
const UNREAD = 0xb3bec4;

/**
 * Build one post per station along the room's long wall.
 *
 * `room` is what `buildInteriorBuilding` returned: its `group` is the parent, so
 * the posts inherit the room's visibility and its position out in the interior
 * district without this having to know either.
 *
 * Returns the interactables to register, and `setRead(id)` for the caller to call
 * when a reading has been taken — including on entry, for stations read earlier
 * in the day and then walked away from.
 */
export function addProbeStations(room, probe, { colliders = [] } = {}){
  const stations = probe?.stations ?? [];
  if(!stations.length) return null;
  const group = new THREE.Group();
  room.group.add(group);

  // The lane comes from the room, which is the only thing that knows where its
  // own furniture is. Guessing a wall here put six posts through the shelving.
  const lane = room.stationLane ?? { x: -2.35, z0: -4, z1: 4, faceYaw: Math.PI / 2 };
  const span = Math.max(1.2, lane.z1 - lane.z0);
  const step = stations.length > 1 ? span / (stations.length - 1) : 0;
  const x = lane.x;
  const z0 = lane.z0;

  const faces = new Map();
  const lamps = new Map();
  const interactables = [];

  stations.forEach((s, i) => {
    const z = z0 + i * step;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.15, 10),
      new THREE.MeshStandardMaterial({ color: METAL, roughness: 0.5, metalness: 0.35 }));
    post.position.set(x, 0.575, z);
    group.add(post);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.22, 0.045, 14),
      new THREE.MeshStandardMaterial({ color: 0x5b6a72, roughness: 0.8 }));
    foot.position.set(x, 0.022, z);
    group.add(foot);

    // The face starts blank on purpose: an unread station has to look unread from
    // across the room, or the player cannot see what is left to do.
    const face = printedSheet({
      tag: `${i + 1}`, title: '', heading: s.label, body: 'Not read', accent: '#8a97a0',
      footer: 'E — take a reading',
    }, { w: 512, h: 320 });
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.325),
      new THREE.MeshStandardMaterial({ map: face.texture, roughness: 0.85 }));
    // Vertical and facing the room. An earlier version tilted it back for a
    // reader looking down, which on a plate this size only cost legibility.
    const toRoom = lane.faceYaw > 0 ? 1 : -1;
    plate.position.set(x + 0.075 * toRoom, 1.2, z);
    plate.rotation.set(0, lane.faceYaw, 0);
    group.add(plate);
    faces.set(String(s.id), face);

    // Emissive rather than a real light: six of these would be six lights, and
    // the house ceiling is six for the whole scene.
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8),
      new THREE.MeshStandardMaterial({ color: UNREAD, emissive: UNREAD, emissiveIntensity: 0.35 }));
    lamp.position.set(x + 0.09 * (lane.faceYaw > 0 ? 1 : -1), 1.36, z);
    group.add(lamp);
    lamps.set(String(s.id), lamp);

    // Tall enough to catch a level crosshair at eye height: a 1.7 m box centred at
    // 0.85 puts its top edge exactly where the ray is, and the post read as
    // unclickable while the plate was clearly in view.
    const hit = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.3, 1.0),
      new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(x + 0.35 * (lane.faceYaw > 0 ? 1 : -1), 1.15, z);
    group.add(hit);
    interactables.push({
      mesh: hit, type: 'station', id: String(s.id), station: s, group: room.id,
      prompt: `E — Read ${s.label}`,
    });
    // No collider on the post. A thin pole the player can walk through is a
    // smaller problem than a room where six invisible boxes narrow the only
    // walkable side to nothing.
  });

  const setRead = (id) => {
    const key = String(id);
    const s = stations.find(x => String(x.id) === key);
    const face = faces.get(key);
    if(!s || !face) return false;
    face.set({
      accent: '#2f6f8f',
      // One string: `printedSheet` wraps on spaces and knows nothing about
      // newlines, so a three-line reading has to be punctuated rather than broken.
      body: `Now ${s.reading} · last run ${s.expected}` + (s.load ? ` · ${s.load}` : ''),
      footer: 'Read',
    });
    const lamp = lamps.get(key);
    if(lamp){
      lamp.material.color.setHex(READ);
      lamp.material.emissive.setHex(READ);
      lamp.material.emissiveIntensity = 0.8;
    }
    return true;
  };

  return {
    group, interactables, setRead,
    /** Every station's id, in chain order. */
    ids: stations.map(s => String(s.id)),
    dispose(){
      room.group.remove(group);
      group.traverse(o => {
        o.geometry?.dispose?.();
        if(o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose?.());
      });
    },
  };
}
