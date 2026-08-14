// audit.js — a runtime check for the mistakes that cost real time twice.
//
// Every item here maps to a rule in THEME_CONTRACT.md and to a bug that was
// actually shipped and then found by eye in the Los Alamos or hospital build.
// Call `auditScene(scene, renderer, opts)` in dev and fix what it prints before
// judging how a theme looks.
import * as THREE from 'three';

const LIGHT_BUDGET = 6;

export function auditScene(scene, renderer, opts = {}){
  const findings = [];
  const add = (severity, rule, detail) => findings.push({ severity, rule, detail });

  // ---- rule 1: real-light budget
  const lights = [];
  scene.traverse(o => { if(o.isLight) lights.push(o); });
  const punctual = lights.filter(l => l.isPointLight || l.isSpotLight);
  if(punctual.length > (opts.lightBudget ?? LIGHT_BUDGET)){
    add('error', 'light-budget',
      `${punctual.length} point/spot lights (budget ${opts.lightBudget ?? LIGHT_BUDGET}). ` +
      `Each costs a fragment pass; ~28 took a floor from 118 fps to 20. ` +
      `Use emissive panels plus ambient/hemisphere/IBL instead.`);
  }
  const shadowCasters = lights.filter(l => l.castShadow);
  if(shadowCasters.length > 2){
    add('warn', 'shadow-casters',
      `${shadowCasters.length} shadow-casting lights. One directional is enough for ` +
      `contact shadows under diffuse lighting.`);
  }
  if(!scene.environment){
    add('warn', 'no-ibl', 'scene.environment is unset, so every PBR material has nothing to reflect.');
  }

  // ---- rule 2: no text on a double-sided material
  const seenMat = new Set();
  scene.traverse(o => {
    const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
    for(const m of mats){
      if(!m || seenMat.has(m)) continue;
      seenMat.add(m);
      if(m.side === THREE.DoubleSide && (m.map || m.emissiveMap)){
        add('error', 'mirrored-text',
          `A DoubleSide material carries a texture (${m.name || m.type}). Text and arrows ` +
          `render mirrored from behind — use one single-sided face per direction.`);
      }
      if(m.isMeshStandardMaterial && m.transparent && m.opacity > 0.6 && m.opacity < 1){
        add('warn', 'opacity-dimming',
          `Material ${m.name || m.type} is transparent at ${m.opacity.toFixed(2)}. ` +
          `Dimming gameplay elements with opacity reads as a bug — darken the colour.`);
      }
    }
  });

  // ---- rule 3 / 4: nothing below the floor
  //
  // Indoors the floor is y=0 and a constant is right. Outdoors it is not: the
  // ground is a heightfield, so "below the floor" has to be measured against the
  // world's own height function or every prop standing in a dip is reported.
  // Pass `groundHeight` for an outdoor site; leave it out and this behaves
  // exactly as it did.
  const floorY = opts.floorY ?? 0;
  const ground = typeof opts.groundHeight === 'function'
    ? opts.groundHeight
    : () => floorY;
  const belowTol = opts.belowTolerance ?? 0.06;
  const boxHelper = new THREE.Box3();
  const centre = new THREE.Vector3();
  let sunk = 0, sunkWorst = 0, sunkName = '';
  scene.traverse(o => {
    if(!o.isMesh || o.isInstancedMesh) return;
    if(o.userData.ignoreAudit) return;
    boxHelper.setFromObject(o);
    if(!isFinite(boxHelper.min.y)) return;
    boxHelper.getCenter(centre);
    const here = ground(centre.x, centre.z);
    if(!isFinite(here)) return;
    const depth = here - boxHelper.min.y;
    if(depth > belowTol){
      sunk++;
      if(depth > sunkWorst){ sunkWorst = depth; sunkName = o.name || o.geometry?.type || 'mesh'; }
    }
  });
  if(sunk > 0){
    add(sunkWorst > 0.15 ? 'error' : 'warn', 'below-floor',
      `${sunk} meshes dip more than ${belowTol} m below the ground (worst ${sunkWorst.toFixed(2)} m, ` +
      `${sunkName}). Usually means the height function and the visible surface disagree, ` +
      `or a rig whose feet are not at ground level.`);
  }

  // ---- rule 4: crowd sanity
  if(opts.people){
    const people = opts.people;
    let clumped = 0;
    for(let i = 0; i < people.length; i++){
      for(let j = i + 1; j < people.length; j++){
        const a = people[i].pos, b = people[j].pos;
        if(!a || !b) continue;
        const dx = a.x - b.x, dz = a.z - b.z;
        if(dx * dx + dz * dz < 0.25) clumped++;
      }
    }
    if(clumped > 0){
      add('warn', 'crowd-clump',
        `${clumped} pairs of people are within 0.5 m. Add separation, or they converge ` +
        `into one interpenetrating clump at shared destinations.`);
    }
    const alwaysOn = people.filter(p => p.plate && p.plate.visible && p.plate.material?.opacity > 0.9).length;
    if(alwaysOn > 3){
      add('warn', 'labels-always-on',
        `${alwaysOn} nameplates are fully opaque at once. Gate them on proximity *and* ` +
        `a view cone; an always-on label is the loudest "this is a game" tell.`);
    }
  }

  // ---- rule 7: the player must be able to stand up and walk
  // A prop dropped over the spawn point welds the player in place: the move is
  // blocked and both slide-along-axis fallbacks are blocked too, so the game
  // renders perfectly and simply will not walk. This shipped once.
  if(opts.spawn && opts.colliders){
    const { x, z } = opts.spawn;
    const radius = opts.playerRadius ?? 0.45;
    const height = opts.playerHeight ?? 1.7;
    const b = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(x, height / 2, z), new THREE.Vector3(radius * 2, height, radius * 2));
    const hitBox = opts.colliders.some(c => b.intersectsBox(c));
    const hitSoft = (opts.softColliders || []).some(c => {
      const dx = x - c.x, dz = z - c.z, rr = c.r + radius;
      return dx * dx + dz * dz < rr * rr;
    });
    if(hitBox || hitSoft){
      add('error', 'spawn-blocked',
        `The spawn point (${x.toFixed(2)}, ${z.toFixed(2)}) is inside ` +
        `${hitBox ? 'a collider' : 'a soft collider'}. The player will be unable to move ` +
        `at all while everything still renders correctly.`);
    }
    // A route the player cannot fit down is the same bug one step later.
    if(opts.route){
      const tight = opts.route.filter(([rx, rz]) => {
        let free = 0;
        for(let o = -1.3; o <= 1.3; o += 0.1){
          const tx = rx + o;
          const blockedBox = opts.colliders.some(c => new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(tx, height / 2, rz), new THREE.Vector3(radius * 2, height, radius * 2)
          ).intersectsBox(c));
          if(!blockedBox) free += 0.1;
        }
        return free < 0.9;
      });
      if(tight.length){
        add('error', 'route-too-narrow',
          `${tight.length} point(s) on the player's route leave under 0.9 m of walkable ` +
          `width — first at ${JSON.stringify(tight[0])}. Parked props are probably rotated ` +
          `across the corridor instead of along the wall.`);
      }
    }
  }

  // ---- budget checks that are cheap to get wrong
  const info = renderer?.info?.render;
  if(info && info.calls > (opts.drawCallBudget ?? 2500)){
    add('warn', 'draw-calls',
      `${info.calls} draw calls this frame (soft budget ${opts.drawCallBudget ?? 2500}). ` +
      `Merge static detail or use InstancedMesh.`);
  }

  return findings;
}

/** Prints the audit as a grouped console report. Returns the findings. */
export function reportAudit(scene, renderer, opts = {}){
  const findings = auditScene(scene, renderer, opts);
  if(!findings.length){
    console.log('%c[audit] clean', 'color:#3d6f52;font-weight:bold');
    return findings;
  }
  const errors = findings.filter(f => f.severity === 'error');
  console.groupCollapsed(
    `%c[audit] ${errors.length} error(s), ${findings.length - errors.length} warning(s)`,
    `color:${errors.length ? '#9a3f36' : '#d4a017'};font-weight:bold`);
  for(const f of findings){
    console.log(`%c${f.severity.toUpperCase()} ${f.rule}`,
      `color:${f.severity === 'error' ? '#9a3f36' : '#d4a017'};font-weight:bold`, '\n  ' + f.detail);
  }
  console.groupEnd();
  return findings;
}

// ---------------------------------------------------------------- furnishing
//
// The same measurement `engine/dev/pieceDensity.mjs` makes in node, made in the
// browser instead, for the worlds node cannot build. Deep Watch, Bring Them Home
// and the hospital construct a WebGLRenderer inside `initWorld` and bake an
// environment map through it, which is real GPU work and not worth emulating —
// so those three are measured where they actually run.
//
//   const { reportPieces } = await import('/engine/dev/audit.js');
//   reportPieces(gamekit.scene, gamekit.theme, gamekit.world);
//
// A piece is not a mesh: placements within a metre of each other in three
// dimensions are one thing, so a desk of four boxes counts once and the notice on
// the wall above it counts separately. Structure — walls, decks, hull, ceilings —
// is excluded by size.

/** Single-link clustering in 3D. One cluster is one piece. */
function clusterPieces(items, radius = 1.0){
  const seen = new Array(items.length).fill(false);
  let n = 0;
  for(let i = 0; i < items.length; i++){
    if(seen[i]) continue;
    n++;
    const stack = [i];
    seen[i] = true;
    while(stack.length){
      const a = items[stack.pop()];
      for(let j = 0; j < items.length; j++){
        if(seen[j]) continue;
        const b = items[j];
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        if(Math.sqrt(dx * dx + dy * dy + dz * dz) <= radius){ seen[j] = true; stack.push(j); }
      }
    }
  }
  return n;
}

/**
 * Every furnishing-sized object in the scene, wherever it sits in the graph.
 *
 * Unlike the node checker this walks the whole tree rather than the top level: a
 * hand-built world nests its props inside groups per compartment, and only the
 * leaves have positions worth bucketing.
 */
export function scenePieces(scene, { maxSpan = 6, minHeight = 0.06 } = {}){
  scene.updateMatrixWorld(true);
  const out = [];
  const bb = new THREE.Box3();
  scene.traverse((o) => {
    if(!o.isMesh || o.isLight) return;
    bb.setFromObject(o);
    if(bb.isEmpty() || !Number.isFinite(bb.min.x)) return;
    const w = bb.max.x - bb.min.x, d = bb.max.z - bb.min.z, h = bb.max.y - bb.min.y;
    if(Math.max(w, d) > maxSpan) return;                       // wall, deck, hull
    if(Math.min(w, d) > 2.5 && h < 0.35) return;               // floor or ceiling slab
    if(h < minHeight) return;                                  // a decal
    out.push({ x: (bb.min.x + bb.max.x) / 2, y: (bb.min.y + bb.max.y) / 2,
      z: (bb.min.z + bb.max.z) / 2 });
  });
  return out;
}

/**
 * How furnished each area of a running game is.
 *
 * Buckets by nearest mission stop, which every theme has and every world can
 * locate, so it works for a corridor of rooms and a submarine alike. `radius` is
 * how far from a stop still counts as that area.
 */
export function reportPieces(scene, theme, world, { radius = 7 } = {}){
  const pieces = scenePieces(scene);
  const groups = theme?.content?.GROUPS ?? [];
  const rows = [];
  const claimed = new Set();
  for(const g of groups){
    const p = world?.getStopPosition?.(g.id);
    if(!p) continue;
    const mine = pieces.filter((q, i) => {
      if(claimed.has(i)) return false;
      const near = Math.hypot(q.x - p.x, q.z - p.z) <= radius;
      if(near) claimed.add(i);
      return near;
    });
    rows.push({ name: g.name ?? g.id, pieces: clusterPieces(mine), objects: mine.length });
  }
  const loose = pieces.filter((q, i) => !claimed.has(i));
  rows.sort((a, b) => a.pieces - b.pieces);
  const pad = Math.max(8, ...rows.map(r => r.name.length));
  console.log(`%c${theme?.title ?? 'theme'} — pieces per area, thinnest first`,
    'font-weight:700');
  for(const r of rows){
    console.log(`  ${r.name.padEnd(pad)} ${String(r.pieces).padStart(3)} pieces`
      + `  (${r.objects} objects)${r.pieces < 15 ? '   ← under 15' : ''}`);
  }
  console.log(`  ${'elsewhere'.padEnd(pad)} ${String(clusterPieces(loose)).padStart(3)} pieces`
    + `  (${loose.length} objects)`);
  return rows;
}
