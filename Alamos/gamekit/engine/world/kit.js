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
    // Wrap first, then size to fit: a name that breaks to two lines needs a
    // smaller face, and picking the size from character count alone pushed
    // "Theory & Calculations" off the bottom of the painted panel.
    const wrap = (px) => {
      g.font = `700 ${px}px Inter, system-ui, sans-serif`;
      const out = [];
      let line = '';
      for(const w of text.split(' ')){
        const next = line ? `${line} ${w}` : w;
        if(g.measureText(next).width > s * 0.86 && line){ out.push(line); line = w; }
        else line = next;
      }
      if(line) out.push(line);
      return out;
    };
    let size = 64, lines = wrap(size);
    // The panel is the top half of the canvas; leave room for the sub-line.
    const room = s * (sub ? 0.34 : 0.44);
    while(size > 26 && lines.length * size * 1.2 > room){ size -= 4; lines = wrap(size); }
    g.font = `700 ${size}px Inter, system-ui, sans-serif`;
    const blockH = lines.length * size * 1.2;
    const top = s * 0.22 - blockH / 2 + size * 0.6;
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
    // A building is a period as much as a shape. `roof` and `siding` are what
    // let one function make both a treatment plant and a 1943 laboratory, so a
    // theme describes its town as data instead of writing geometry.
    //   roof:   'flat' (slab + parapet) | 'gable' (pitched, tar paper, eaves)
    //   siding: 'panel' | 'board' (board-and-batten) | 'stucco' | 'wood'
    //   base:   height of the plinth under it, 0 for none
    //   stoop:  put steps at the door
    roof = 'flat', siding = 'panel', base = 0, stoop = false,
    // Corner boards: the vertical trim every wood-frame building of the period
    // carried over its butt joints. Default on for board siding and off for
    // everything else — log walls interlock at the corners and never had them.
    corners = siding === 'board',
  } = opts;
  const group = new THREE.Group();
  const wallMat = siding === 'panel'
    ? mat(`kit.wall.${colour}`, () => new THREE.MeshStandardMaterial({
        color: colour, roughness: 0.88, metalness: 0.02, envMapIntensity: ENV }))
    : mat(`kit.wall.${siding}.${colour}`, () => {
        const hex = '#' + colour.toString(16).padStart(6, '0');
        const map = siding === 'board' ? boardTexture(hex, Math.max(2, w / 5))
                  : siding === 'stucco' ? stuccoTexture(hex, Math.max(1, w / 8))
                  : woodTexture(Math.max(1, w / 6));
        return new THREE.MeshStandardMaterial({
          map, roughness: 0.92, metalness: 0, envMapIntensity: ENV });
      });
  const trimMat = MATERIALS.paintedSteel(trim);
  const doorW = 2.2, doorH = 2.6;

  // The floor the walls stand on: a concrete slab, or a pier plinth for
  // anything of a period that did not pour slabs.
  const floorY = base > 0 ? plinth(group, { x: 0, z: 0 }, w, d, base) : 0.35;
  if(base <= 0) box(group, w + 1.2, 0.35, d + 1.2, 0, 0.175, 0, MATERIALS.concrete());
  // Shell.
  box(group, w, h, d, 0, floorY + h / 2, 0, wallMat);
  if(corners){
    const cornerHex = new THREE.Color(colour).multiplyScalar(0.78).getHex();
    const cornerMat = mat(`kit.corner.${cornerHex}`, () =>
      new THREE.MeshStandardMaterial({ color: cornerHex, roughness: 0.94, envMapIntensity: ENV }));
    for(const sx of [-1, 1]) for(const sz of [-1, 1]){
      box(group, 0.22, h, 0.22, sx * (w / 2 - 0.05), floorY + h / 2, sz * (d / 2 - 0.05), cornerMat);
    }
  }
  if(roof === 'gable'){
    gableRoof(group, { x: 0, z: 0 }, w, d, floorY + h, { ridgeAlongX: w >= d });
  } else {
    // Parapet, which reads as a roof edge from the ground for one extra box.
    box(group, w + 0.5, 0.5, d + 0.5, 0, floorY + h + 0.25, 0, trimMat);
  }

  // A continuous glass band is a modern idiom and reads wrong on anything of an
  // earlier period, which wants individual punched openings. 'punched' is the
  // default whenever the roof is pitched, because the two go together.
  const windowStyle = windows === false ? 'none'
    : windows === true ? (roof === 'gable' ? 'punched' : 'band')
    : windows;
  if(windowStyle === 'band'){
    // One band per long side rather than a mesh per window: a single draw call
    // that reads identically at gameplay distance.
    const bandY = floorY + h * 0.62;
    for(const s of [1, -1]){
      box(group, w * 0.82, 1.5, 0.12, 0, bandY, s * (d / 2 + 0.02), MATERIALS.glass());
    }
    for(const s of [1, -1]){
      box(group, 0.12, 1.5, d * 0.7, s * (w / 2 + 0.02), bandY, 0, MATERIALS.glass());
    }
  } else if(windowStyle === 'punched'){
    const winY = floorY + h * 0.56;
    const count = Math.max(2, Math.min(6, Math.floor(w / 3.4)));
    const pitchX = w * 0.78 / count;
    for(const face of [1, -1]){
      for(let i = 0; i < count; i++){
        const px = (i - (count - 1) / 2) * pitchX;
        // The doorway owns the middle of the entrance face.
        if(face === 1 && Math.abs(px) < doorW * 0.8) continue;
        litWindow(group, 1.0, 1.25, px, winY, face * (d / 2 + 0.03),
          { facing: face === 1 ? 0 : Math.PI, lightChance: (i % 3) ? 0.9 : 0.2 });
      }
    }
  }

  // Entrance, on the +Z face before the group is rotated.
  box(group, doorW + 0.7, doorH + 0.5, 0.3, 0, floorY + (doorH + 0.5) / 2, d / 2 + 0.05, trimMat);
  const door = box(group, doorW, doorH, 0.18, 0, floorY + doorH / 2, d / 2 + 0.22,
    MATERIALS.paintedSteel(accent ?? 0x4a5b6e));
  door.userData.isDoor = true;
  // A shallow canopy, which is what makes an entrance read as an entrance.
  box(group, doorW + 1.6, 0.18, 1.1, 0, floorY + doorH + 0.45, d / 2 + 0.6, trimMat);
  if(stoop && base > 0) steps(group, 0, d / 2, 0, doorW + 0.6, base);

  if(name){
    // The sign used to be 3.2 m tall on a 4.6 m wall: its base sat below the
    // canopy, the canopy stands in front of it, and its head overshot the eaves
    // by a metre. It read as a clipped sign, and no amount of text fitting could
    // help — the panel was behind a slab. Seat it in the band that is actually
    // clear, between the canopy top and the wall head, and size it to fit.
    const canopyTop = floorY + doorH + 0.45 + 0.09;
    const headroom = (floorY + h) - canopyTop - 0.3;
    let signW = Math.min(w * 0.72, 5.2);
    let signH = signW * 0.42;
    if(signH > headroom){ signH = Math.max(0.55, headroom); signW = signH / 0.42; }
    sign(group, name, {
      x: 0, y: canopyTop + 0.15 + signH / 2, z: d / 2 + 0.30,
      w: signW, h: signH,
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
  const wheels = [];
  for(const [sx, sz] of [[1, 1.8], [-1, 1.8], [1, -1.9], [-1, -1.9]]){
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.34, 12), MATERIALS.rubber());
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx * 1.12, 0.52, sz);
    // Laid on its side by a z-rotation, so the roll axis is x in its own frame.
    wheel.userData.spinAxis = 'x';
    wheels.push(wheel);
    g.add(wheel);
  }
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  const along = Math.abs(Math.sin(facing)) > 0.5;
  const collider = new THREE.Box3(
    new THREE.Vector3(x - (along ? 2.9 : 1.3), y, z - (along ? 1.3 : 2.9)),
    new THREE.Vector3(x + (along ? 2.9 : 1.3), y + 3.2, z + (along ? 1.3 : 2.9)));
  // The group and the wheels come back too, so a caller can hand this to
  // `world/driving.js` and let the player take it. Returning the Box3 alone is
  // what made these props: a vehicle you can only walk around.
  collider.group = g;
  collider.wheels = wheels;
  // Where the cab is, so a driver is seated in it rather than behind the load.
  // The body runs along -z, which is the direction the vehicle drives.
  collider.cabZ = isBox ? -1.6 : 0.4;
  return collider;
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

// ——— period building vocabulary ————————————————————————————————————
//
// `building()` above makes one thing: a flat-roofed panel box. That is right for
// a treatment plant and wrong for almost anything built before 1950, which is
// why Los Alamos could not move onto this engine — pointing it at `building()`
// would have replaced a gabled, board-sided town with a business park.
//
// These are ported from that game's world.js, which had them tuned and shipped;
// they are generalised here so any theme can use them and no theme has to
// rewrite them. A theme that wants a modern shed simply never calls them.

/** Weathered stucco. Rendered a stop darker than it looks — see the ground note. */
export function stuccoTexture(base = '#e8e0c8', repeat = 1){
  return canvasTex(512, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    for(let i = 0; i < 900; i++){
      const x = srand() * s, y = srand() * s, r = srand() * 1.8;
      g.fillStyle = srand() > 0.5 ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.08)';
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }
    g.strokeStyle = 'rgba(0,0,0,0.06)'; g.lineWidth = 1;
    for(let i = 0; i < 4; i++){
      g.beginPath(); g.moveTo(0, i * s / 4); g.lineTo(s, i * s / 4); g.stroke();
      g.beginPath(); g.moveTo(i * s / 4, 0); g.lineTo(i * s / 4, s); g.stroke();
    }
  }, repeat, repeat);
}

/** Sawn timber, for log walls, poles and boardwalks. */
export function woodTexture(repeat = 1){
  return canvasTex(512, (g, s) => {
    g.fillStyle = '#6b4226'; g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(40,22,10,0.35)'; g.lineWidth = 2;
    for(let y = 0; y < s; y += 14){
      g.beginPath();
      g.moveTo(0, y + Math.sin(y * 0.02) * 6);
      g.bezierCurveTo(s * 0.33, y, s * 0.66, y + 8, s, y + Math.sin(y * 0.02 + 1) * 6);
      g.stroke();
    }
    for(let i = 0; i < 30; i++){
      g.fillStyle = 'rgba(20,12,6,0.45)';
      g.beginPath(); g.ellipse(srand() * s, srand() * s, 2 + srand() * 3, 1, 0, 0, Math.PI * 2); g.fill();
    }
  }, repeat, repeat);
}

/**
 * Tar paper, which is what almost every roof of the period actually was: laid
 * in overlapping rolls with battens over the seams. Weathered mid-grey rather
 * than fresh black — a near-black albedo just punches holes in a skyline.
 */
export function tarPaperTexture(repeatX = 1, repeatY = 1){
  return canvasTex(512, (g, s) => {
    g.fillStyle = '#575349'; g.fillRect(0, 0, s, s);
    for(let i = 0; i < 4000; i++){
      g.fillStyle = srand() > 0.5 ? 'rgba(30,28,24,0.20)' : 'rgba(160,154,140,0.20)';
      g.fillRect(srand() * s, srand() * s, 1.6, 1.6);
    }
    for(let y = 0; y < s; y += 64){
      g.fillStyle = 'rgba(30,28,24,0.26)'; g.fillRect(0, y, s, 3);
      g.fillStyle = 'rgba(168,162,148,0.20)'; g.fillRect(0, y + 3, s, 2);
    }
    for(let i = 0; i < 22; i++){
      g.fillStyle = 'rgba(112,104,90,0.30)';
      g.beginPath();
      g.ellipse(srand() * s, srand() * s, 8 + srand() * 20, 5 + srand() * 12, srand(), 0, Math.PI * 2);
      g.fill();
    }
  }, repeatX, repeatY);
}

/** Board-and-batten siding: vertical boards with battens over the joints. */
export function boardTexture(base = '#8a7f6a', repeat = 1){
  return canvasTex(512, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    for(let i = 0; i < 2600; i++){
      g.fillStyle = srand() > 0.5 ? 'rgba(0,0,0,0.055)' : 'rgba(255,255,255,0.05)';
      g.fillRect(srand() * s, srand() * s, 2, 1);
    }
    for(let x = 0; x < s; x += 32){
      g.fillStyle = 'rgba(0,0,0,0.20)';        g.fillRect(x, 0, 2, s);      // joint shadow
      g.fillStyle = 'rgba(0,0,0,0.10)';        g.fillRect(x + 3, 0, 5, s);  // batten shadow
      g.fillStyle = 'rgba(255,255,255,0.045)'; g.fillRect(x + 8, 0, 3, s);  // batten highlight
    }
  }, repeat, repeat);
}

/**
 * A pitched roof: two slopes, gable-end triangles, fascia boards and a ridge
 * cap. The fascia is not decoration — the shadow line it casts under the eaves
 * is what gives the roof depth from the ground.
 *
 * `wallTop` is the height the walls reach; the roof sits on top of it.
 */
export function gableRoof(scene, { x, z }, w, d, wallTop, opts = {}){
  const alongX = opts.ridgeAlongX !== false;
  const span = alongX ? d : w;          // the direction that slopes
  const runLen = alongX ? w : d;        // the direction the ridge runs
  const overhang = opts.overhang ?? 0.55;
  const rise = opts.rise ?? span * 0.19;
  const halfSpan = span / 2 + overhang;
  const slopeLen = Math.hypot(halfSpan, rise);
  const pitch = Math.atan2(rise, halfSpan);
  const thick = 0.16;

  const tex = tarPaperTexture(Math.max(1, runLen / 5), Math.max(1, slopeLen / 4));
  const roofMat = new THREE.MeshStandardMaterial({
    // The map already carries the roofing colour; tint only when asked.
    color: opts.colour ?? 0xffffff, map: tex, roughness: 0.93, metalness: 0.02,
    envMapIntensity: ENV,
  });
  const group = new THREE.Group();
  for(const side of [-1, 1]){
    const slab = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang * 2, thick, slopeLen), roofMat);
    slab.position.set(0, rise / 2, side * (halfSpan / 2));
    // +side must tilt the outer edge DOWN. Rotation about X by a positive angle
    // drops the +z end, so the sign is +side, not -side: with -side the two
    // slabs splay upward into a V and the roof reads as collapsed. Verified by
    // rendering it, which is the only way this kind of mistake shows up.
    slab.rotation.x = side * pitch;
    slab.castShadow = true; slab.receiveShadow = true;
    group.add(slab);
  }
  const gableMat = mat(`kit.gable.${opts.gableColour ?? 0x6b5f4e}`, () =>
    new THREE.MeshStandardMaterial({ color: opts.gableColour ?? 0x6b5f4e, roughness: 0.92, envMapIntensity: ENV }));
  for(const end of [-1, 1]){
    const shape = new THREE.Shape();
    shape.moveTo(-span / 2, 0); shape.lineTo(span / 2, 0); shape.lineTo(0, rise); shape.closePath();
    const tri = new THREE.Mesh(new THREE.ShapeGeometry(shape), gableMat);
    tri.position.set(end * runLen / 2, 0, 0);
    tri.rotation.y = Math.PI / 2;
    tri.castShadow = true;
    group.add(tri);
  }
  const fascia = mat('kit.fascia', () =>
    new THREE.MeshStandardMaterial({ color: 0x53483a, roughness: 0.93, envMapIntensity: ENV }));
  for(const side of [-1, 1]){
    const f = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang * 2, 0.24, 0.1), fascia);
    f.position.set(0, -0.06, side * halfSpan);
    f.castShadow = true;
    group.add(f);
  }
  const cap = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang * 2, 0.1, 0.34), fascia);
  cap.position.set(0, rise + 0.06, 0);
  group.add(cap);

  group.position.set(x, wallTop, z);
  if(!alongX) group.rotation.y = Math.PI / 2;
  scene.add(group);
  return { group, rise, ridgeY: wallTop + rise };
}

/** Concrete pier plinth plus a skirt board — buildings never sit flush on dirt. */
export function plinth(scene, { x, z }, w, d, height = 0.5){
  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.14, height, d + 0.14),
    mat('kit.skirt', () => new THREE.MeshStandardMaterial({ color: 0x4a443c, roughness: 0.95, envMapIntensity: ENV })));
  skirt.position.set(x, height / 2, z);
  skirt.castShadow = true; skirt.receiveShadow = true;
  scene.add(skirt);
  const pierMat = mat('kit.pier', () =>
    new THREE.MeshStandardMaterial({ color: 0x8a857c, roughness: 0.94, envMapIntensity: ENV }));
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, height + 0.12, 0.5), pierMat);
    p.position.set(x + sx * (w / 2 - 0.4), (height + 0.12) / 2 - 0.06, z + sz * (d / 2 - 0.4));
    p.receiveShadow = true;
    scene.add(p);
  }
  return height;
}

/** A two-tread stoop up to a raised threshold. `angle` faces the door. */
export function steps(scene, x, z, angle, width, baseY){
  const m = mat('kit.step', () =>
    new THREE.MeshStandardMaterial({ color: 0x6b5844, roughness: 0.94, envMapIntensity: ENV }));
  for(let i = 0; i < 2; i++){
    const y = baseY * (1 - (i + 1) / 3);
    const depth = 0.42;
    const off = 0.55 + i * depth;
    const s = new THREE.Mesh(new THREE.BoxGeometry(width, Math.max(0.1, baseY / 3), depth), m);
    s.position.set(x + Math.sin(angle) * off, y + baseY / 6, z + Math.cos(angle) * off);
    s.rotation.y = angle;
    s.castShadow = true; s.receiveShadow = true;
    scene.add(s);
  }
}

/**
 * A window pane that can light up after dark. It is emissive rather than a real
 * light — a lamp per window is the 28-point-light mistake in period costume —
 * and it is tagged so a world can raise them all at dusk.
 */
export function litWindow(scene, w, h, x, y, z, opts = {}){
  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({
      color: 0x2b3138, emissive: opts.glow ?? 0xffd9a0, emissiveIntensity: 0,
      roughness: 0.25, metalness: 0.1, envMapIntensity: ENV,
    }));
  pane.position.set(x, y, z);
  pane.rotation.y = opts.facing ?? 0;
  pane.userData.litWindow = true;
  // A bare dark rectangle reads as a hole, not a window. The frame and sill are
  // what make it period: side by side with the original, the glass matched and
  // the missing casing was the whole difference.
  if(opts.frame !== false){
    const f = opts.frameColour ?? 0xe8e3d6;
    const fm = mat(`kit.winframe.${f}`, () =>
      new THREE.MeshStandardMaterial({ color: f, roughness: 0.9, envMapIntensity: ENV }));
    const t = 0.075, out = 0.012;
    const nx = Math.sin(opts.facing ?? 0) * out, nz = Math.cos(opts.facing ?? 0) * out;
    const put = (bw, bh, ox, oy) => {
      const m = new THREE.Mesh(BOX, fm);
      m.scale.set(bw, bh, 0.05);
      m.position.set(x + nx, y + oy, z + nz);
      m.rotation.y = opts.facing ?? 0;
      m.translateX(ox);
      m.castShadow = true;
      scene.add(m);
    };
    put(w + t * 2, t, 0, h / 2 + t / 2);          // head
    put(w + t * 2, t * 1.6, 0, -h / 2 - t * 0.8); // sill, heavier than the head
    put(t, h, -(w / 2 + t / 2), 0);               // jambs
    put(t, h, (w / 2 + t / 2), 0);
    put(w, t * 0.5, 0, 0);                        // one glazing bar
  }
  // Not every window in a town is occupied; a uniformly lit block reads as a
  // hotel rather than a working site.
  pane.userData.lightChance = opts.lightChance ?? 0.5;
  scene.add(pane);
  return pane;
}

/** Raise or lower every window this kit made. `night` runs 0 (day) to 1. */
export function setWindowGlow(scene, night){
  scene.traverse(o => {
    if(!o.userData?.litWindow || !o.material) return;
    const on = o.userData.lightChance > 0.5 ? 1 : 0.55;
    o.material.emissiveIntensity = night * on * 1.4;
  });
}
