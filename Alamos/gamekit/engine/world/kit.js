// kit.js — the generic furniture every theme was otherwise going to rewrite.
//
// THEME_CONTRACT.md § "Known work still to do" listed this file as missing, and
// the cost of its absence was that each theme's props.js repeated the same
// building shell, bench, bollard and sign. A theme should only contain what
// makes *its* place recognisable.
//
// Two rules from the contract are enforced here rather than left to callers:
//
//   · A sign is two single-sided faces, never one DoubleSide plane. Text on a
//     DoubleSide material renders mirrored to anyone approaching from behind,
//     which is how a set of arrows ended up pointing the wrong way.
//   · Nothing in here creates a light. A light per fixture is unaffordable —
//     28 of them took a floor from 118 fps to 20 — so lit surfaces are emissive
//     panels and the real lights stay with the site builder, capped at six.
import * as THREE from 'three';
import { canvasTex, mat, srand, srandRange } from './materials.js';

const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 12);

/** A unit box scaled into place. Cheaper than a fresh geometry per prop. */
export function box(scene, w, h, d, x, y, z, material, rotY = 0){
  const m = new THREE.Mesh(BOX, material);
  m.scale.set(w, h, d);
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
export function cyl(scene, r, h, x, y, z, material, rTop = r){
  // The shared unit cylinder covers the untapered case, which is nearly all of
  // them; a taper is the only reason to allocate a geometry.
  const tapered = rTop !== r;
  const m = new THREE.Mesh(tapered ? new THREE.CylinderGeometry(rTop, r, 1, 12) : CYL, material);
  m.scale.set(tapered ? 1 : r, h, tapered ? 1 : r);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}

// ------------------------------------------------------------------- surfaces
// The sky IBL is bright. At the default envMapIntensity of 1 every surface here
// renders a stop or two lighter than its albedo, and a mid-grey wall reads as
// white under a strong sun. 0.5 is the level the two shipped builds settled on.
const ENV = 0.5;

export const MATERIALS = {
  concrete: () => mat('kit.concrete', () => new THREE.MeshStandardMaterial({
    color: 0xb9b5ab, roughness: 0.94, metalness: 0, envMapIntensity: ENV })),
  panel: () => mat('kit.panel', () => new THREE.MeshStandardMaterial({
    color: 0xd6d2c6, roughness: 0.82, metalness: 0.05, envMapIntensity: ENV })),
  steel: () => mat('kit.steel', () => new THREE.MeshStandardMaterial({
    color: 0x8d949a, roughness: 0.42, metalness: 0.85, envMapIntensity: ENV })),
  paintedSteel: (hex) => mat(`kit.paint.${hex}`, () => new THREE.MeshStandardMaterial({
    color: hex, roughness: 0.55, metalness: 0.3, envMapIntensity: ENV })),
  rubber: () => mat('kit.rubber', () => new THREE.MeshStandardMaterial({
    color: 0x2c2e31, roughness: 0.97, metalness: 0, envMapIntensity: ENV })),
  glass: () => mat('kit.glass', () => new THREE.MeshStandardMaterial({
    color: 0x9fb6c2, roughness: 0.12, metalness: 0.1,
    // Windows are the one place transparency is a *material* property rather
    // than a way of dimming gameplay, which the contract forbids.
    transparent: true, opacity: 0.55 })),
  /** A lit panel. This is what replaces a point light in a ceiling fixture. */
  emissive: (hex, strength = 1.0) => mat(`kit.emit.${hex}_${strength}`, () =>
    new THREE.MeshStandardMaterial({ color: hex, emissive: hex, emissiveIntensity: strength, roughness: 0.6 })),
};

// ---------------------------------------------------------------------- signs
function signTexture(text, { bg = '#1d2733', fg = '#f4f1e8', sub = '', accent = null } = {}){
  return canvasTex(512, (g, s) => {
    g.fillStyle = bg; g.fillRect(0, 0, s, s * 0.5);
    if(accent){ g.fillStyle = accent; g.fillRect(0, 0, s, s * 0.045); }
    g.fillStyle = fg;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const size = text.length > 22 ? 40 : text.length > 14 ? 52 : 64;
    g.font = `700 ${size}px Inter, system-ui, sans-serif`;
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for(const w of words){
      const next = line ? `${line} ${w}` : w;
      if(g.measureText(next).width > s * 0.88 && line){ lines.push(line); line = w; }
      else line = next;
    }
    if(line) lines.push(line);
    const top = s * 0.25 - (lines.length - 1) * size * 0.6;
    lines.forEach((l, i) => g.fillText(l, s / 2, top + i * size * 1.2));
    if(sub){
      g.font = '500 30px Inter, system-ui, sans-serif';
      g.fillStyle = 'rgba(244,241,232,0.72)';
      g.fillText(sub, s / 2, s * 0.44);
    }
  });
}

/**
 * A readable sign, as two back-to-back single-sided faces.
 *
 * `facing` is the yaw the *front* face points along. The back face is a
 * separate mesh rotated 180°, so each side draws its own correctly-oriented
 * copy of the text. Never replace this with one DoubleSide plane.
 */
export function sign(scene, text, { x, y, z, w = 3.2, h = 1.6, facing = 0, sub = '', accent = null }){
  const tex = signTexture(text, { sub, accent });
  const geo = new THREE.PlaneGeometry(w, h);
  const group = new THREE.Group();
  for(const back of [false, true]){
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.78, side: THREE.FrontSide,
      emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.18,
    }));
    m.rotation.y = back ? Math.PI : 0;
    m.position.z = back ? -0.03 : 0.03;
    group.add(m);
  }
  group.position.set(x, y, z);
  group.rotation.y = facing;
  scene.add(group);
  return group;
}

// ------------------------------------------------------------------ buildings
/**
 * A flat-roofed working building: slab, walls, parapet, a window band, a door
 * recess and a sign over the door.
 *
 * Returns everything the world contract needs from it — the collider box, the
 * door mesh to make interactable, and the point on the ground where a player
 * who walks in should stand.
 *
 * `facing` is the yaw the entrance faces, in quarter turns: 0 = +Z (south).
 */
export function building(scene, opts){
  const {
    x, z, w, d, h = 6.2, facing = 0, baseY = 0,
    colour = 0xd6d2c6, trim = 0x8d949a, accent = null,
    name = '', sub = '', windows = true,
  } = opts;
  const group = new THREE.Group();
  const wallMat = mat(`kit.wall.${colour}`, () => new THREE.MeshStandardMaterial({
    color: colour, roughness: 0.88, metalness: 0.02, envMapIntensity: ENV }));
  const trimMat = MATERIALS.paintedSteel(trim);

  // Slab, a little proud of the ground so the wall never meets bare terrain.
  box(group, w + 1.2, 0.35, d + 1.2, 0, 0.175, 0, MATERIALS.concrete());
  // Shell.
  box(group, w, h, d, 0, 0.35 + h / 2, 0, wallMat);
  // Parapet, which reads as a roof edge from the ground for one extra box.
  box(group, w + 0.5, 0.5, d + 0.5, 0, 0.35 + h + 0.25, 0, trimMat);

  if(windows){
    // One continuous band per long side rather than a mesh per window: the band
    // is a single draw call and reads identically at gameplay distance.
    const bandY = 0.35 + h * 0.62;
    for(const s of [1, -1]){
      box(group, w * 0.82, 1.5, 0.12, 0, bandY, s * (d / 2 + 0.02), MATERIALS.glass());
    }
    for(const s of [1, -1]){
      box(group, 0.12, 1.5, d * 0.7, s * (w / 2 + 0.02), bandY, 0, MATERIALS.glass());
    }
  }

  // Entrance, on the +Z face before the group is rotated.
  const doorW = 2.2, doorH = 2.6;
  box(group, doorW + 0.7, doorH + 0.5, 0.3, 0, 0.35 + (doorH + 0.5) / 2, d / 2 + 0.05, trimMat);
  const door = box(group, doorW, doorH, 0.18, 0, 0.35 + doorH / 2, d / 2 + 0.22,
    MATERIALS.paintedSteel(accent ?? 0x4a5b6e));
  door.userData.isDoor = true;
  // A shallow canopy, which is what makes an entrance read as an entrance.
  box(group, doorW + 1.6, 0.18, 1.1, 0, 0.35 + doorH + 0.45, d / 2 + 0.6, trimMat);

  if(name){
    sign(group, name, {
      x: 0, y: 0.35 + doorH + 1.5, z: d / 2 + 0.28,
      w: Math.min(w * 0.8, 6.4), h: Math.min(w * 0.8, 6.4) * 0.5,
      sub, accent: accent ? `#${accent.toString(16).padStart(6, '0')}` : null,
    });
  }

  group.position.set(x, baseY, z);
  group.rotation.y = facing;
  scene.add(group);

  // The collider is axis-aligned, so a rotated building is boxed by its extent.
  const half = facing % Math.PI === 0 ? { x: w / 2, z: d / 2 } : { x: d / 2, z: w / 2 };
  const collider = new THREE.Box3(
    new THREE.Vector3(x - half.x - 0.6, baseY, z - half.z - 0.6),
    new THREE.Vector3(x + half.x + 0.6, baseY + h + 0.5, z + half.z + 0.6));

  // Where the door is, and where a player standing at it should end up, in
  // world space. Both follow `facing`, so a rotated building still works.
  const fx = Math.sin(facing), fz = Math.cos(facing);
  const doorPos = new THREE.Vector3(x + fx * (d / 2 + 0.3), baseY + 1.4, z + fz * (d / 2 + 0.3));
  const entry = new THREE.Vector3(x + fx * (d / 2 + 3.2), baseY, z + fz * (d / 2 + 3.2));

  return { group, door, collider, doorPos, entry, size: { w, d, h } };
}

// ----------------------------------------------------------------- site props
/** A bollard, a stanchion, a sign post — anything you walk around. */
export function post(scene, x, z, y = 0, h = 1.1, r = 0.09, colour = 0xb8b2a4){
  cyl(scene, r, h, x, y + h / 2, z, MATERIALS.paintedSteel(colour));
  return { x, z, r: r + 0.25 };
}

export function bench(scene, x, z, y = 0, facing = 0){
  const g = new THREE.Group();
  const wood = mat('kit.bench', () => new THREE.MeshStandardMaterial({ color: 0x8a7050, roughness: 0.9 }));
  box(g, 1.9, 0.1, 0.5, 0, 0.44, 0, wood);
  box(g, 1.9, 0.5, 0.1, 0, 0.72, -0.22, wood);
  for(const s of [-1, 1]) box(g, 0.1, 0.44, 0.46, s * 0.8, 0.22, 0, MATERIALS.steel());
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return { x, z, r: 1.1 };
}

export function bin(scene, x, z, y = 0, colour = 0x4a5b6e){
  cyl(scene, 0.34, 0.95, x, y + 0.475, z, MATERIALS.paintedSteel(colour));
  cyl(scene, 0.37, 0.08, x, y + 0.98, z, MATERIALS.rubber());
  return { x, z, r: 0.6 };
}

/** A stacked pallet of drums or crates — industrial ground clutter. */
export function crateStack(scene, x, z, y = 0, opts = {}){
  const { rows = 2, colour = 0x9a7f52, facing = 0 } = opts;
  const g = new THREE.Group();
  const m = MATERIALS.paintedSteel(colour);
  for(let r = 0; r < rows; r++){
    for(let i = 0; i < 2; i++){
      box(g, 1.0, 0.85, 1.0, (i - 0.5) * 1.05, 0.43 + r * 0.88, 0, m);
    }
  }
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return { x, z, r: 1.5 };
}

/** A vertical process tank. The one shape that says "this is a plant". */
export function tank(scene, x, z, y = 0, { r = 2.2, h = 7, colour = 0xc9c6bd } = {}){
  const g = new THREE.Group();
  cyl(g, r, h, 0, h / 2, 0, MATERIALS.paintedSteel(colour));
  cyl(g, r + 0.12, 0.3, 0, h + 0.1, 0, MATERIALS.steel());
  cyl(g, r + 0.1, 0.25, 0, 0.5, 0, MATERIALS.steel());
  // A ladder cage, read as three thin boxes rather than modelled rungs.
  for(const o of [-0.22, 0, 0.22]) box(g, 0.06, h, 0.06, r + 0.2, h / 2, o, MATERIALS.steel());
  g.position.set(x, y, z);
  scene.add(g);
  return { x, z, r: r + 0.6 };
}

/** A run of pipework at head height, on trestles. */
export function pipeRun(scene, { x0, z0, x1, z1, y = 0, height = 3.4, r = 0.28, colour = 0x7f8a86 }){
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const g = new THREE.Group();
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), MATERIALS.paintedSteel(colour));
  pipe.rotation.x = Math.PI / 2;
  pipe.position.y = height;
  pipe.castShadow = true;
  g.add(pipe);
  const soft = [];
  const trestles = Math.max(2, Math.round(len / 9));
  for(let i = 0; i <= trestles; i++){
    const t = i / trestles;
    const pz = -len / 2 + t * len;
    box(g, 0.22, height, 0.22, 0, height / 2, pz, MATERIALS.steel());
    soft.push({ x: x0 + dx * t, z: z0 + dz * t, r: 0.5 });
  }
  g.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  g.rotation.y = ang;
  scene.add(g);
  return soft;
}

/** Chain-link fence as a run of posts plus one translucent mesh panel. */
export function fenceRun(scene, { x0, z0, x1, z1, y = 0, height = 2.4 }){
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const g = new THREE.Group();
  const meshTex = canvasTex(128, (c, s) => {
    c.clearRect(0, 0, s, s);
    c.strokeStyle = 'rgba(150,155,158,0.9)';
    c.lineWidth = 3;
    for(let i = -s; i < s * 2; i += 14){
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i + s, s); c.stroke();
      c.beginPath(); c.moveTo(i + s, 0); c.lineTo(i, s); c.stroke();
    }
  }, Math.max(1, len / 3), 1);
  // Two single-sided faces rather than one DoubleSide plane. Chain-link happens
  // to be symmetric, but the rule has no exceptions worth remembering: a
  // textured DoubleSide material is the thing that shipped mirrored arrows, and
  // engine/dev/audit.js flags every one of them.
  const panelGeo = new THREE.PlaneGeometry(len, height);
  for(const back of [false, true]){
    const panel = new THREE.Mesh(panelGeo, new THREE.MeshStandardMaterial({
      map: meshTex, transparent: true, side: THREE.FrontSide, roughness: 0.9,
    }));
    panel.position.set(back ? -0.02 : 0.02, height / 2, 0);
    panel.rotation.y = back ? -Math.PI / 2 : Math.PI / 2;
    g.add(panel);
  }
  const posts = Math.max(2, Math.round(len / 4));
  for(let i = 0; i <= posts; i++){
    box(g, 0.1, height + 0.2, 0.1, 0, (height + 0.2) / 2, -len / 2 + (i / posts) * len, MATERIALS.steel());
  }
  g.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  g.rotation.y = ang;
  scene.add(g);
  return new THREE.Box3(
    new THREE.Vector3(Math.min(x0, x1) - 0.3, y, Math.min(z0, z1) - 0.3),
    new THREE.Vector3(Math.max(x0, x1) + 0.3, y + height, Math.max(z0, z1) + 0.3));
}

/**
 * A parked response vehicle. Parked *parallel* to whatever it stands beside —
 * rotating one 90° is what laid a truck across a corridor and blocked a route.
 */
export function vehicle(scene, x, z, y = 0, { facing = 0, colour = 0xc4442f, box: isBox = true } = {}){
  const g = new THREE.Group();
  const body = MATERIALS.paintedSteel(colour);
  box(g, 2.3, 1.0, 5.6, 0, 1.15, 0, body);
  box(g, 2.2, 1.25, 2.0, 0, 2.0, isBox ? -1.6 : 0.4, isBox ? body : MATERIALS.glass());
  if(isBox) box(g, 2.3, 1.9, 3.2, 0, 2.3, 1.2, body);
  for(const [sx, sz] of [[1, 1.8], [-1, 1.8], [1, -1.9], [-1, -1.9]]){
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.34, 12), MATERIALS.rubber());
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx * 1.12, 0.52, sz);
    g.add(wheel);
  }
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  const along = Math.abs(Math.sin(facing)) > 0.5;
  return new THREE.Box3(
    new THREE.Vector3(x - (along ? 2.9 : 1.3), y, z - (along ? 1.3 : 2.9)),
    new THREE.Vector3(x + (along ? 2.9 : 1.3), y + 3.2, z + (along ? 1.3 : 2.9)));
}

/**
 * A free-standing display board — the instrument readout or map that gives a
 * location its scientific identity. Emissive, so it reads at dusk without
 * costing a light.
 */
export function displayBoard(scene, x, z, y = 0, { facing = 0, title = '', tint = 0x3f6f8f } = {}){
  const g = new THREE.Group();
  for(const s of [-1, 1]) box(g, 0.14, 2.2, 0.14, s * 1.3, 1.1, 0, MATERIALS.steel());
  box(g, 3.0, 1.8, 0.16, 0, 2.2, 0, MATERIALS.paintedSteel(0x2b3138));
  const screen = box(g, 2.8, 1.6, 0.06, 0, 2.2, 0.12, MATERIALS.emissive(tint, 0.55));
  screen.userData.isScreen = true;
  if(title) sign(g, title, { x: 0, y: 3.35, z: 0, w: 3.0, h: 1.5 });
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return { group: g, screen, soft: { x, z, r: 1.7 } };
}

/** Scatter helper: n positions on a ring, skipping anywhere `blocked` says no. */
export function ring(cx, cz, r0, r1, n, blocked){
  const out = [];
  let guard = 0;
  while(out.length < n && guard++ < n * 40){
    const a = srand() * Math.PI * 2;
    const r = srandRange(r0, r1);
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    if(blocked && blocked(x, z)) continue;
    out.push({ x, z });
  }
  return out;
}
