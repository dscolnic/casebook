import * as THREE from 'three';

/**
 * CollisionSystem — lightweight custom collision for a first-person walker.
 *
 * The submarine interior is described as a set of vertical WALL SEGMENTS (in the
 * XZ plane) plus axis-aligned PROP BOXES. The player is a vertical capsule
 * approximated as a circle of `radius` in XZ. We resolve by pushing the circle
 * out of any segment/box it penetrates. This is cheap, stable in tight spaces,
 * and needs no physics engine — exactly what the spec asks for.
 *
 * Segments can be toggled active/inactive (used by closing hatches).
 */
export class CollisionSystem {
  constructor() {
    this.segments = []; // { x1, z1, x2, z2, id, active }
    this.boxes = [];    // { minX, maxX, minZ, maxZ, id }
  }

  addSegment(x1, z1, x2, z2, id = null) {
    const seg = { x1, z1, x2, z2, id, active: true };
    this.segments.push(seg);
    return seg;
  }

  addBox(minX, maxX, minZ, maxZ, id = null) {
    const box = { minX, maxX, minZ, maxZ, id };
    this.boxes.push(box);
    return box;
  }

  /** Add a box collider from a world-space Object3D bounding box (XZ footprint). */
  addBoxFromObject(obj, pad = 0.05, id = null) {
    const bb = new THREE.Box3().setFromObject(obj);
    return this.addBox(bb.min.x - pad, bb.max.x + pad, bb.min.z - pad, bb.max.z + pad, id);
  }

  setSegmentActive(id, active) {
    for (const s of this.segments) if (s.id === id) s.active = active;
  }

  clear() {
    this.segments.length = 0;
    this.boxes.length = 0;
  }

  /**
   * Given a desired XZ position, return a corrected {x, z} that does not
   * penetrate any collider by less than `radius`. Runs a few relaxation passes
   * so corners resolve cleanly.
   */
  resolve(x, z, radius) {
    let px = x, pz = z;
    for (let pass = 0; pass < 3; pass++) {
      // Segments.
      for (const s of this.segments) {
        if (!s.active) continue;
        const [cx, cz] = closestPointOnSegment(px, pz, s.x1, s.z1, s.x2, s.z2);
        const dx = px - cx, dz = pz - cz;
        const distSq = dx * dx + dz * dz;
        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq) || 1e-4;
          const push = (radius - dist);
          px += (dx / dist) * push;
          pz += (dz / dist) * push;
        }
      }
      // Boxes (expanded by radius → point-in-rounded-rect push-out).
      for (const b of this.boxes) {
        const nx = clamp(px, b.minX, b.maxX);
        const nz = clamp(pz, b.minZ, b.maxZ);
        const dx = px - nx, dz = pz - nz;
        const distSq = dx * dx + dz * dz;
        if (distSq < radius * radius) {
          if (distSq > 1e-8) {
            const dist = Math.sqrt(distSq);
            const push = radius - dist;
            px += (dx / dist) * push;
            pz += (dz / dist) * push;
          } else {
            // Center inside the box: push out along the nearest face.
            const dl = px - b.minX, dr = b.maxX - px;
            const db = pz - b.minZ, dt = b.maxZ - pz;
            const m = Math.min(dl, dr, db, dt);
            if (m === dl) px = b.minX - radius;
            else if (m === dr) px = b.maxX + radius;
            else if (m === db) pz = b.minZ - radius;
            else pz = b.maxZ + radius;
          }
        }
      }
    }
    return { x: px, z: pz };
  }
}

function closestPointOnSegment(px, pz, x1, z1, x2, z2) {
  const dx = x2 - x1, dz = z2 - z1;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-9) return [x1, z1];
  let t = ((px - x1) * dx + (pz - z1) * dz) / lenSq;
  t = clamp(t, 0, 1);
  return [x1 + t * dx, z1 + t * dz];
}

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}
