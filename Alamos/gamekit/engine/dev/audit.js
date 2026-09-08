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

  // ---- rule 8: two signs may not share a patch of wall
  //
  // THE DEFECT. `addStageWall` planted the beat board at the centre of the back
  // wall and `interiorBuilding.js` plants the room's instrument at the centre of
  // the back wall, so in every room of every theme with a beat script the two
  // were coplanar and overlapping — GIBBS had PLANT SUMMARY and a sort into
  // ATOM/MOLECULE/ION fighting over the same 0.9 m of height at the same depth.
  // It rendered, it exported, it built clean, and it was reported by eye: "you
  // are putting the Plant Summary and the four sample labels on same screen and
  // its glitching — these need to be separate things, only use screen for one
  // thing."
  //
  // WHY IT NEEDS THE SCENE. Nothing in the content says where a board ends up.
  // `interiorFixtures.js`, `interiorKit.js` and each theme's `props.js` all hang
  // things, from three different sets of coordinates, and the only place they
  // are all true at once is the built room. `placement.mjs` cannot see this: it
  // reads books.
  for(const clash of overlappingFaces(scene)){
    add('error', 'signs-overlap',
      `Two faces share a patch of wall: ${clash.a} and ${clash.b} overlap `
      + `${Math.round(clash.frac * 100)}% of the smaller one, ${clash.gap.toFixed(2)} m apart `
      + `on the ${clash.axis} axis. A screen shows one thing — move one of them along the wall.`);
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

/**
 * Every pair of sign-like faces that share a patch of wall.
 *
 * A "face" here is a mesh carrying a texture whose smallest dimension is much
 * smaller than its other two — a board, a screen, a notice, a mural panel. The
 * thin axis is taken as the wall normal rather than read off `userData.mount`,
 * because a mesh hung by a theme's own `props.js` may carry no mount at all and
 * a board nobody marked is exactly the board that ends up somewhere wrong.
 *
 * Near-coplanar rather than exactly coplanar: two boards 4 cm apart in depth do
 * not z-fight, they simply hide one another, and the shipped defect was 5 cm.
 *
 * Skipped: structure, anything flagged `ignoreAudit`, and anything you can see
 * through — a see-through overlay is a tint, not a second sign.
 */
export function overlappingFaces(scene, { depthTol = 0.25, minFrac = 0.05, maxSpan = 6 } = {}){
  const faces = [];
  const box = new THREE.Box3();
  scene.traverse((o) => {
    if(!o.isMesh || !o.visible) return;
    if(o.userData?.structure || o.userData?.ignoreAudit) return;
    const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
    if(!mats.some(m => m && (m.map || m.emissiveMap))) return;
    if(mats.every(m => !m || m.depthWrite === false
                       || (m.transparent && (m.opacity ?? 1) < 0.85))) return;
    box.setFromObject(o);
    if(box.isEmpty()) return;
    const size = box.getSize(new THREE.Vector3());
    const dims = [size.x, size.y, size.z];
    const thin = dims.indexOf(Math.min(...dims));
    const wide = dims.filter((_, i) => i !== thin);
    // A face, not a box: the thin axis has to be genuinely thin, or a cabinet
    // with a printed front is compared against a poster as if it were one.
    if(dims[thin] > 0.35 || dims[thin] > Math.min(...wide) * 0.5) return;
    if(Math.max(...wide) > maxSpan) return;
    const centre = box.getCenter(new THREE.Vector3());
    const normal = new THREE.Vector3();
    o.getWorldDirection(normal);
    faces.push({
      normal,
      axis: ['x', 'y', 'z'][thin],
      plane: [centre.x, centre.y, centre.z][thin],
      min: box.min.clone(), max: box.max.clone(),
      area: wide[0] * wide[1],
      // NAMED SO THE PAIR CAN BE TOLD APART. Geometry type and two coordinates
      // were not enough to act on: "PlaneGeometry x=4300.0 over PlaneGeometry
      // x=4299.1" names two things that could be any two signs in the room. The
      // texture's own dimensions are what distinguish a fit-out notice from a
      // machine screen from a mural panel, and the size in metres says which is
      // the big one.
      name: `${o.name || o.geometry?.type || 'mesh'}`
        + (() => {
          const img = (mats.find(m => m && (m.map || m.emissiveMap)) || {});
          const t = (img.map || img.emissiveMap)?.image;
          return t?.width ? ` ${t.width}×${t.height}` : '';
        })()
        + ` ${wide[0].toFixed(2)}×${wide[1].toFixed(2)}m`
        + ` ${['x', 'y', 'z'].map((k, i) => i === thin ? '' : `${k}=${centre[k].toFixed(2)}`)
              .filter(Boolean).join(' ')}`,
    });
  });

  const out = [];
  for(let i = 0; i < faces.length; i++){
    for(let j = i + 1; j < faces.length; j++){
      const a = faces[i], f = faces[j];
      if(a.axis !== f.axis) continue;
      const gap = Math.abs(a.plane - f.plane);
      if(gap > depthTol) continue;
      // The two in-plane axes.
      const keys = ['x', 'y', 'z'].filter(k => k !== a.axis);
      let overlap = 1;
      for(const k of keys){
        const o = Math.min(a.max[k], f.max[k]) - Math.max(a.min[k], f.min[k]);
        if(o <= 0){ overlap = 0; break; }
        overlap *= o;
      }
      if(!overlap) continue;

      // ---- TWO MESHES THAT ARE ONE SIGN. Both of these are how this repo is
      // built, and flagging them buried the real finding under four hundred.
      //
      // BACK TO BACK. THEME_CONTRACT forbids text on a DoubleSide material, so
      // a sign readable from both directions is two single-sided faces a few
      // centimetres apart pointing opposite ways. That is the sanctioned
      // pattern, not two signs competing.
      if(a.normal.dot(f.normal) < -0.5) continue;
      // ON ITS OWN BACKING. `interiorKit`'s notices are a printed face on a
      // backing panel: one rect wholly inside the other, a couple of
      // centimetres apart. A board hung OVER a screen is not this — the shipped
      // defect stuck out past the screen top and bottom — so containment has to
      // be near-total and the stack has to be thin.
      if(gap < 0.12){
        const inside = (p, q) => keys.every(k => p.min[k] >= q.min[k] - 0.01
                                              && p.max[k] <= q.max[k] + 0.01);
        if(inside(a, f) || inside(f, a)) continue;
      }

      const frac = overlap / Math.min(a.area, f.area);
      if(frac < minFrac) continue;
      out.push({ a: a.name, b: f.name, frac, gap, axis: a.axis });
    }
  }
  return out;
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

// --------------------------------------------------------------- selftest
//
//   node engine/dev/audit.js --selftest
//
// `overlappingFaces` is the only rule here that computes a geometric answer
// rather than counting things, so it is the only one that can be quietly wrong.
// The cases include the shipped defect itself — two textured faces 5 cm apart on
// one wall — and the two ways of being fine that a careless version would fail:
// side by side on the same wall, and stacked on different walls.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };

  const tex = () => {
    const t = new THREE.Texture();
    return new THREE.MeshStandardMaterial({ map: t });
  };
  /** A textured face on the z wall: `w` × `h` at (x, y, z). */
  const face = (name, x, y, z, w = 2, h = 1.25, mat = null) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat ?? tex());
    m.position.set(x, y, z);
    m.name = name;
    return m;
  };
  const sceneOf = (...objs) => { const s = new THREE.Scene(); for(const o of objs) s.add(o); return s; };

  check('one sign on a wall clashes with nothing',
        overlappingFaces(sceneOf(face('summary', 0, 1.85, 4.59))).length === 0);

  // THE SHIPPED DEFECT: the instrument screen and the beat board, 5 cm and one
  // wall apart, overlapping most of a metre of height.
  const shipped = overlappingFaces(sceneOf(
    face('summary', 0, 1.85, 4.59, 2, 1.25),
    face('stagewall', 0, 2.16, 4.59, 3.4, 1.17)));
  check('two faces on one patch of wall are caught', shipped.length === 1,
        'this rendered, exported and built clean for every theme with a beat script');
  check('…and the overlap is reported as most of the smaller one',
        shipped[0] && shipped[0].frac > 0.5);

  // NEAR-COPLANAR IS THE SAME DEFECT, and this is the case that exercises the
  // tolerance rather than sitting inside it. Without these two the tolerance
  // could be tightened to nothing and every case above would still pass —
  // which is what happened the first time this selftest was written.
  check('a hand’s breadth apart in depth is still one patch of wall',
        overlappingFaces(sceneOf(
          face('a', 0, 1.85, 4.59), face('b', 0, 1.95, 4.47))).length === 1,
        'they do not z-fight at 12 cm, they simply hide one another');
  check('…and 20 cm apart, which is a board hung over a screen',
        overlappingFaces(sceneOf(
          face('a', 0, 1.85, 4.59), face('b', 0, 1.95, 4.39))).length === 1);
  check('but 40 cm apart is a board and a thing standing near it',
        overlappingFaces(sceneOf(
          face('a', 0, 1.85, 4.59), face('b', 0, 1.95, 4.19))).length === 0,
        'past the tolerance it is a sightline question, not a shared wall');

  // ---- the ways of being fine
  check('side by side on the same wall is fine', overlappingFaces(sceneOf(
    face('left', -3, 1.85, 4.59), face('right', 3, 1.85, 4.59))).length === 0,
        'a wall with two boards on it is a wall with two boards on it');
  check('one above the other is fine', overlappingFaces(sceneOf(
    face('low', 0, 1.2, 4.59, 2, 0.5), face('high', 0, 2.4, 4.59, 2, 0.5))).length === 0);
  check('the same footprint on opposite walls is fine', overlappingFaces(sceneOf(
    face('back', 0, 1.85, 4.59), face('front', 0, 1.85, -4.59))).length === 0,
        'depth is what separates them, and it is well past the tolerance');

  // Two metres apart in depth is a board and a board across the room from it.
  check('a face across the room is not on this wall', overlappingFaces(sceneOf(
    face('a', 0, 1.85, 4.59), face('b', 0, 1.85, 2.0))).length === 0);

  // ---- ONE SIGN MADE OF TWO MESHES. Both patterns are how this repo builds,
  // and flagging them buried the one real finding under four hundred.
  const backToBack = (() => {
    const front = face('front', 0, 2.2, 4.59);
    const back = face('back', 0, 2.2, 4.53);
    back.rotation.y = Math.PI;                 // readable from the other side
    back.updateMatrixWorld(true);
    return overlappingFaces(sceneOf(front, back));
  })();
  check('a sign readable from both sides is one sign', backToBack.length === 0,
        'THEME_CONTRACT forbids text on a DoubleSide material, so this is the sanctioned pattern');
  check('a printed face on its own backing panel is one sign',
        overlappingFaces(sceneOf(
          face('backing', 0, 1.85, 4.59, 2.2, 1.4),
          face('print', 0, 1.85, 4.57, 2, 1.25))).length === 0,
        'interiorKit hangs every notice this way');
  // AND THE DEFECT IS NOT MASKED BY EITHER. The board overhangs the screen top
  // and bottom, so it is not contained, and both face the room.
  check('a board hung over a screen is still caught', shipped.length === 1,
        'if containment swallowed this the whole rule would be decorative');

  // ---- the exclusions
  const struct = face('wallpanel', 0, 1.85, 4.59);
  struct.userData.structure = 'wall';
  check('structure is not a sign', overlappingFaces(sceneOf(
    struct, face('summary', 0, 1.85, 4.59))).length === 0,
        'the wall is behind every board on it');
  const ghost = face('beacon', 0, 1.85, 4.59, 2, 1.25,
    new THREE.MeshBasicMaterial({ map: new THREE.Texture(), transparent: true, opacity: 0.055 }));
  check('a see-through overlay is a tint, not a second sign',
        overlappingFaces(sceneOf(ghost, face('summary', 0, 1.85, 4.59))).length === 0);
  const blank = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.25),
    new THREE.MeshStandardMaterial({ color: 0x333333 }));
  blank.position.set(0, 1.85, 4.59);
  check('an untextured panel is not a sign', overlappingFaces(sceneOf(
    blank, face('summary', 0, 1.85, 4.59))).length === 0,
        'this rule is about what two things say, not about panels touching');

  // A deep box with a printed front is a cabinet, and a poster in front of a
  // cabinet is a real finding — but the cabinet is not itself a face.
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 0.9), tex());
  cabinet.position.set(0, 1.85, 4.2);
  check('a deep cabinet is not compared as a face', overlappingFaces(sceneOf(
    cabinet, face('summary', 0, 1.85, 4.59))).length === 0,
        'its thin axis is not thin, so calling it a sign would fail every fitted room');

  // THE EQUAL-INPUTS CASE. The same clash, described twice, is one clash — and
  // the number attached to it may not move because the scene got busier.
  const twice = overlappingFaces(sceneOf(
    face('summary', 0, 1.85, 4.59, 2, 1.25),
    face('stagewall', 0, 2.16, 4.59, 3.4, 1.17),
    face('faraway', -20, 1.85, 4.59)));
  check('an unrelated third sign changes neither the count nor the number',
        twice.length === shipped.length && twice[0].frac === shipped[0].frac);

  if(fails.length){
    console.log(`\naudit --selftest: ${fails.length} case(s) failed.`);
    for(const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
  } else {
    console.log(`\naudit --selftest: ${ran} cases, two signs cannot share a patch of wall.`);
  }
}
