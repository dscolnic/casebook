// props.js — the objects that make Kesteven House, and the city out of the glass.
//
// Anything generic (worktops, chairs, cabinets, shelving, crates, notices) comes
// from engine/world/interiorKit.js through `furnishRoom`. This file is the dozen
// or so things that are this place and nowhere else:
//
//   · **the city, from a hundred and eighty metres up**, which is the reason the
//     game is in a tower at all — every quantity this course asks about has
//     something out of the window that it is a number for;
//   · the plaza directly below, with the queue for the counter on it, which is
//     the money supply and the expectations at the same time;
//   · Vend Street running west, whose prices are two thirds of the basket;
//   · the port on the eastern horizon, where the trade figures come from;
//   · the note scales, the ledger racks, the telex bank and the board table —
//     four rooms' worth of equipment that is what this fortnight is made of.
//
// Interior hooks get the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable }
// and, from the tower, `floor` — which of the four this call is furnishing.

import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, markStructure }
  from '../../engine/world/interiorKit.js';
import { patrol } from '../../engine/world/animators.js';

// --------------------------------------------------------------- the outside
//
// How far down the plaza is. Floor 45 is the game's ground, so everything out
// there is measured from it: the tower's own forty-four floors below, and a city
// whose tallest other building comes to about a third of this one.
const PLAZA_Y = -180;
/** The plate, so the facade is built on the same line the glass is. */
const PLATE = { x: 10.6, z0: -12, z1: 14 };

/**
 * A grid of windows, most of them dark.
 *
 * At this distance a building is a silhouette plus whether the lights are on,
 * and the second half is what makes it a working city rather than a model of
 * one. One canvas, reused by every block: a texture per building would be nine
 * hundred textures.
 */
function paintWindows(base, glass, lit, seed = 1){
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 64, 64);
  // The companion, painted in the same pass off the same random stream so the
  // cells that glow are exactly the cells that were drawn lit. Two passes with
  // two seeds is how a city ends up with its lights in the wrong windows, and
  // nothing but a night screenshot would ever say so.
  const e = document.createElement('canvas');
  e.width = 64; e.height = 64;
  const ge = e.getContext('2d');
  ge.fillStyle = '#000000'; ge.fillRect(0, 0, 64, 64);
  let s = seed || 1;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  for(let row = 0; row < 8; row++){
    for(let col = 0; col < 8; col++){
      const on = rnd() > 0.86;
      g.fillStyle = on ? lit : glass;
      g.fillRect(col * 8 + 1.5, row * 8 + 2, 5, 4.5);
      if(on){
        ge.fillStyle = lit;
        ge.fillRect(col * 8 + 1.5, row * 8 + 2, 5, 4.5);
      }
    }
  }
  const wrap = (canvas) => {
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.LinearFilter;
    return t;
  };
  return { map: wrap(c), emissive: wrap(e) };
}

function windowTexture(base, glass, lit, seed = 1){
  return paintWindows(base, glass, lit, seed).map;
}

/** A soft round blob, for smoke. One texture, ten sprites. */
function puffTexture(){
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  grad.addColorStop(0.0, 'rgba(226,224,218,0.85)');
  grad.addColorStop(0.5, 'rgba(198,196,190,0.42)');
  grad.addColorStop(1.0, 'rgba(170,168,162,0.0)');
  g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * A colour a floor. Six plates on one footprint is a building in which a player
 * who steps out of the lift has nothing to tell them where they are — the
 * corridor is the same twenty-six metres on every one of them, and the fit-out
 * pass seeds off the floor id but produces the same *kind* of room either way.
 * So each plate is painted: a dado band the length of the corridor and the
 * number panel over the lift bench in the same colour. The intention is that a
 * lift arrival reads before the sign does.
 *
 * These are the trades' own late-fifties colours, and dark ones, because a
 * corridor lit by four point lights renders a mid tone as cream.
 */
const FLOOR_TONES = [
  { label: '45', dado: 0x2c4a3b, panel: 0x3c6350, name: 'bottle green' },
  { label: '46', dado: 0x8a6a1e, panel: 0xa9862d, name: 'ochre' },
  { label: '47', dado: 0x3a4f63, panel: 0x4d6a83, name: 'slate blue' },
  { label: '48', dado: 0x5c2a26, panel: 0x7a3a33, name: 'oxblood' },
  { label: '49', dado: 0x1f5a56, panel: 0x2d7a74, name: 'teal' },
  { label: '50', dado: 0x35373a, panel: 0x8a6a34, name: 'charcoal and brass' },
];
const TONE_MATS = new Map();
function toneMats(id){
  if(!TONE_MATS.has(id)){
    const t = FLOOR_TONES[id] ?? FLOOR_TONES[0];
    TONE_MATS.set(id, {
      dado: new THREE.MeshStandardMaterial({ color: t.dado, roughness: 0.72, metalness: 0.02 }),
      panel: new THREE.MeshStandardMaterial({ color: t.panel, roughness: 0.5, metalness: 0.15,
        emissive: t.panel, emissiveIntensity: 0.12 }),
    });
  }
  return TONE_MATS.get(id);
}

/** A vertical gradient, for the one thing in this game that is not a building. */
function skyTexture(){
  const c = document.createElement('canvas');
  c.width = 4; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0.00, '#6d90b4');
  grad.addColorStop(0.45, '#a8c0d4');
  grad.addColorStop(0.78, '#cfd8dc');
  grad.addColorStop(1.00, '#c2c8c6');
  g.fillStyle = grad; g.fillRect(0, 0, 4, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * What is outside every window.
 *
 * Nothing here is lit by the interior rig — a city under a RoomEnvironment IBL
 * is a city inside a lampshade — so it is Lambert against the ambient and the
 * hemisphere, which gives roofs brighter than flanks and costs no shadow map.
 * All of it is `ignoreAudit` and `structure`: a hundred and eighty metres of
 * facade is not a fitting, and `pieceDensity` should not count a skyline.
 */
export function decorate(scene, ctx){
  if(!scene) return;
  const floors = ctx?.floors ?? [];
  const rise = ctx?.rise ?? 4.4;
  const topY = (floors[floors.length - 1]?.y ?? 13.2);

  const M = {
    sky:    new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false }),
    plaza:  new THREE.MeshLambertMaterial({ color: 0x40433f }),
    kerb:   new THREE.MeshLambertMaterial({ color: 0x74776f }),
    water:  new THREE.MeshLambertMaterial({ color: 0x46595e }),
    person: new THREE.MeshLambertMaterial({ color: 0x2b2f33 }),
    stone:  new THREE.MeshLambertMaterial({ color: 0xb2a894 }),
    crane:  new THREE.MeshLambertMaterial({ color: 0x8c5a3c }),
    // The tower's own skin, below the four floors the game is played on.
    skin:   new THREE.MeshLambertMaterial({ map: windowTexture('#8d8a80', '#43555e', '#e2d9b4', 11) }),
    spandrel: new THREE.MeshLambertMaterial({ color: 0x7f7d74 }),
    plant:  new THREE.MeshLambertMaterial({ color: 0x6e6c64 }),
    // Rule 6 again, and harder out here: a landmark is read as a silhouette
    // against a bright sky, so every one of these is two stops below the colour
    // the thing actually is. A limestone spire painted limestone renders white.
    spire:  new THREE.MeshLambertMaterial({ color: 0x6f6a5c }),
    slate:  new THREE.MeshLambertMaterial({ color: 0x3f4348 }),
    iron:   new THREE.MeshLambertMaterial({ color: 0x4a4d48 }),
    brick:  new THREE.MeshLambertMaterial({ color: 0x5e4437 }),
    hull:   new THREE.MeshLambertMaterial({ color: 0x3a3f42 }),
  };
  // Three bays across and one row a floor. At (6, 44) the windows came out
  // smaller than the mullions and the whole shaft read as a chequerboard.
  M.skin.map.repeat.set(3, 41);

  const put = (w, h, d, x, y, z, mat, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.castShadow = false; m.receiveShadow = false;
    m.userData.ignoreAudit = true;
    markStructure([m], 'scenery');
    scene.add(m);
    return m;
  };

  // ---- the sky. A dome rather than a background colour, because a flat clear
  // colour at this altitude reads as fog and the horizon is what tells the
  // player how high up they are.
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 16), M.sky);
  dome.position.y = PLAZA_Y + 200;
  dome.userData.ignoreAudit = true;
  markStructure([dome], 'sky');
  scene.add(dome);

  // ---- the tower itself, above and below the four floors that are the game.
  //
  // Forty-four floors of skin under the player's feet, and the parapet over
  // their head. Without it the four plates hang in the air and the city below is
  // seen past the edge of nothing.
  const shaftH = -PLAZA_Y;
  for(const [w, d, x, z] of [
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z0 - 0.25],
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z1 + 0.25],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, -PLATE.x - 0.25, (PLATE.z0 + PLATE.z1) / 2],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, PLATE.x + 0.25, (PLATE.z0 + PLATE.z1) / 2],
  ]){
    put(w, shaftH, d, x, PLAZA_Y + shaftH / 2, z, M.skin);
    /**
     * The slab edge and the spandrel at every one of the game's own four floors.
     *
     * Without this the top of the building is a doll's house: the curtain wall is
     * ten per cent opaque, so from outside — and from any floor looking down past
     * its own cill — the four plates are trays of furniture stacked in mid-air
     * with daylight between them. It took a screenshot from outside to see it;
     * from inside, every window looked merely hazy.
     *
     * Two bands, because a floor of a tower shows two things from outside: the
     * edge of the slab you are standing on, and the spandrel between the head of
     * your glass and the slab above.
     */
    for(const f of floors){
      put(w, 0.5, d, x, f.y + 0.1, z, M.spandrel);                          // slab edge
      put(w, rise - 3.0, d, x, f.y + 3.0 + (rise - 3.0) / 2, z, M.spandrel); // spandrel
    }
  }
  // The roof: parapet, plant room and the lift motor room over the shaft.
  put(PLATE.x * 2 + 1.2, 1.1, PLATE.z1 - PLATE.z0 + 1.2, 0, topY + 3.5, (PLATE.z0 + PLATE.z1) / 2, M.spandrel);
  put(9.0, 3.4, 7.0, -3.0, topY + 5.6, 2.6, M.plant);
  put(1.2, 6.5, 1.2, 6.0, topY + 7.2, -6.0, M.plant);

  // ---- the plaza, and the podium the tower stands on
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4600, 4600), M.plaza);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = PLAZA_Y;
  ground.userData.ignoreAudit = true;
  markStructure([ground], 'scenery');
  scene.add(ground);
  put(56, 9, 46, 0, PLAZA_Y + 4.5, 1, M.stone);          // the podium
  put(80, 0.3, 70, 0, PLAZA_Y + 0.16, 1, M.kerb);        // the paving round it
  // Vend Street's own paving, running west from the door. It is here so the queue
  // reads: a dark figure on dark asphalt from a hundred and eighty metres up is
  // three pixels of nothing, and against pale paving it is a queue.
  put(210, 0.28, 26, -140, PLAZA_Y + 0.2, 8, M.kerb);

  /**
   * The queue, on the plaza, forty-four floors down.
   *
   * A person 1.7 m tall at 180 m subtends about nine pixels at this field of
   * view, so a queue reads as a line of specks that is either long or short —
   * which is the only quantity about it that matters, and the one the counter
   * floor argues about every morning. Instanced: one draw call for the lot.
   */
  const queueN = 150;
  const queue = new THREE.InstancedMesh(new THREE.BoxGeometry(0.62, 1.75, 0.62), M.person, queueN);
  queue.userData.ignoreAudit = true;
  const tmp = new THREE.Object3D();
  /** The standing places, in order from the head of the queue. */
  const QSLOT = [];
  for(let i = 0; i < queueN; i++){
    // Out of the podium, west along Vend Street, and doubling back twice — a
    // queue that has been there since before the doors opened.
    const t = i / queueN;
    const leg = Math.floor(t * 3);
    const along = (t * 3 - leg);
    // Clear of the podium, which is 56 m across: the first thirty metres of the
    // queue was inside it.
    const x = -34 - along * 92;
    const z = 6 + leg * 3.2 + ((i * 7919) % 13) * 0.14;
    QSLOT.push([x, z]);
  }
  /**
   * And it moves. A queue that is long is one number; a queue that is long and
   * *not moving* is a different number, and it is the one the counter floor
   * argues about. Every few seconds everybody steps up one place and the head
   * of it goes — served, and off down Vend Street. From a hundred and eighty
   * metres that is not animation, it is the line breathing.
   */
  let qHead = 0, qClock = 0;
  const drawQueue = () => {
    for(let i = 0; i < queueN; i++){
      // Minus, not plus. Slot 0 is the head of the queue, so stepping *up* is
      // toward a lower index; the first version of this had the whole line
      // walking away from the counter and it looked entirely convincing.
      const [x, z] = QSLOT[(i - qHead + queueN) % queueN];
      tmp.position.set(x, PLAZA_Y + 0.9, z);
      tmp.rotation.set(0, 0, 0);
      tmp.updateMatrix();
      queue.setMatrixAt(i, tmp.matrix);
    }
    queue.instanceMatrix.needsUpdate = true;
  };
  drawQueue();
  scene.add(queue);
  ctx?.animate?.((t, dt) => {
    qClock += dt;
    if(qClock < 3.4) return;
    qClock = 0;
    qHead = (qHead + 1) % queueN;
    drawQueue();
  });

  // ---- the river, north-east, and the port on the far side of it
  put(4600, 0.6, 150, 0, PLAZA_Y + 0.3, -430, M.water);
  for(let i = 0; i < 7; i++){
    const x = -260 + i * 96;
    put(74, 11, 26, x, PLAZA_Y + 5.5, -336, M.stone);          // the quays
    put(3.0, 34, 3.0, x - 18, PLAZA_Y + 17, -344, M.crane);    // and a crane on each
    put(26, 2.2, 2.4, x - 6, PLAZA_Y + 33, -344, M.crane);
  }

  /**
   * The city: a grid of blocks with streets left in it.
   *
   * Three instanced meshes, one per stone, so the whole skyline is three draw
   * calls. The gaps are the streets and they are not decoration — Vend Street is
   * named on the price room's own basket sheet, and the player can look down it.
   */
  //
  // **Two rings, and the outer one is not decoration.** From inside a room the
  // player stands six metres back from the glass, and a 3 m window at that
  // distance only lets the eye down about eleven degrees — which from a hundred
  // and eighty metres up first meets the ground **nine hundred metres out**. A
  // city that stops at 760 m is therefore a city that is invisible from every
  // room in the building and visible only from the corridor ends, which is how
  // the first version of this looked: a flat grey field out of every window.
  // Measured off a screenshot, not reasoned about in advance.
  const RINGS = [
    { cell: 34, reach: 760, lo: 62 },
    { cell: 96, reach: 1600, lo: 760 },
  ];
  /**
   * The streets with traffic on them, declared once and used twice: the grid
   * leaves them out, and the traffic pass drives down them. Two descriptions of
   * where a street is would put cars through a building the first time either
   * was corrected.
   */
  const STREET_CLEAR = (gx, gz) => (
    (Math.abs(gz - 6) < 17 && gx < -40)                  // Vend Street, west
    || (Math.abs(gx) < 17 && gz > 40)                    // Ferrand Row, south
    || (Math.abs(gz + 150) < 15)                         // Harrow Street, east–west
    || (Math.abs(gx + 170) < 15 && gz < -40 && gz > -344) // Quay Road, down to the water
  );
  /**
   * And the ground the three landmarks and the old bank stand on. A landmark
   * placed after the grid is a landmark with a grid building inside it, which
   * from a hundred and eighty metres reads as a rendering fault rather than as
   * two buildings.
   */
  const LANDMARK_CLEAR = (gx, gz) => (
    Math.hypot(gx + 250, gz + 262) < 56                        // the gasometer and its frame
    || (Math.abs(gx - 214) < 34 && Math.abs(gz - 218) < 44)    // St Ninian's, tower and nave
    || (Math.abs(gx - 430) < 116 && Math.abs(gz + 556) < 74)   // Ashgate power station
    || (Math.abs(gx - 52) < 46 && Math.abs(gz - 214) < 34)     // the old bank on Ferrand Row
  );
  // Six buckets: three stones × two rings. The split is not cosmetic — only the
  // inner ring's materials carry an emissive map, because a lit window sixteen
  // hundred metres out through 3.2 km of fog is a texture nobody will ever see
  // and a second material to keep in step with the clock.
  const buckets = [[], [], [], [], [], []];
  RINGS.forEach((R, ring) => {
    for(let gx = -R.reach; gx <= R.reach; gx += R.cell){
      for(let gz = -R.reach; gz <= R.reach; gz += R.cell){
        const r = Math.hypot(gx, gz);
        if(r < R.lo || r > R.reach) continue;              // this ring only
        if(gz < -350 && gz > -510) continue;               // the river
        if(STREET_CLEAR(gx, gz)) continue;                 // the streets
        if(LANDMARK_CLEAR(gx, gz)) continue;               // and the three landmarks
        const n = ((gx * 73856093) ^ (gz * 19349663)) >>> 0;
        if((n % 100) < 16) continue;                       // squares and yards
        // Tall in the middle, low at the edges — and a handful of real towers in
        // the inner ring, because a city with no second-tallest building gives
        // the eye nothing to measure this one against.
        const tall = r < 320 && (n % 23) === 0;
        const h = tall ? 58 + (n % 31) : 9 + (n % 47) * (r < 300 ? 1.15 : 0.6);
        const w = R.cell * (0.5 + ((n >> 7) % 30) / 100);
        const d = R.cell * (0.5 + ((n >> 13) % 30) / 100);
        buckets[ring * 3 + (n % 3)].push(
          [w, h, d, gx + ((n >> 3) % 7) - 3, PLAZA_Y + h / 2, gz + ((n >> 9) % 7) - 3]);
      }
    }
  });
  // Darker than looks right on the canvas, which is rule 6 in a city: under ACES
  // with a bright sky a mid stone renders as white card, and the first version of
  // this skyline was nine hundred pale boxes with no depth in it at all.
  const stones = ['#6b6760', '#5c5d59', '#77705f'];
  /** The inner ring's materials, so the clock can light them. */
  const cityLit = [];
  buckets.forEach((rows, i) => {
    if(!rows.length) return;
    const ring = Math.floor(i / 3), s = i % 3;
    const tex = paintWindows(stones[s], '#3d4a52', '#e6dcb8', 17 + i * 5);
    tex.map.repeat.set(4, 6);
    const mat = new THREE.MeshLambertMaterial({ map: tex.map });
    if(ring === 0){
      tex.emissive.repeat.set(4, 6);
      mat.emissiveMap = tex.emissive;
      mat.emissive = new THREE.Color(0xfff0c8);
      // Nothing at noon. The city comes on in `cityGlow` below, off the world's
      // own clock, and a skyline glowing in daylight is the failure this starts
      // at zero to avoid.
      mat.emissiveIntensity = 0;
      cityLit.push(mat);
    }
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, rows.length);
    mesh.userData.ignoreAudit = true;
    rows.forEach(([w, h, d, x, y, z], k) => {
      tmp.position.set(x, y, z);
      tmp.scale.set(w, h, d);
      tmp.rotation.set(0, 0, 0);
      tmp.updateMatrix();
      mesh.setMatrixAt(k, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  });

  /**
   * The city lights, on the world's own clock.
   *
   * A lamp in a corridor is dimmed overnight; a window across the river is
   * *switched on*. `updateInteriorTimeOfDay` used to multiply every entry in
   * `lightPanels` by its own daylight level, which is the corridor's rule
   * applied to a city, so this theme registered a stand-in object with an
   * inverting setter to get the other one. The engine takes `night: true` now
   * — the rule lives in one place, and this is a plain registration.
   */
  if(cityLit.length && Array.isArray(ctx?.lightPanels)){
    for(const m of cityLit) ctx.lightPanels.push({ material: m, night: true });
  }

  // ---- Ferrand Row: the old central bank, low, pale and two hundred metres
  // south. The building the board would be in if this fortnight were normal.
  //
  // It stands *beside* the row and not in it. It used to sit on x = 0, which is
  // the middle of the street the grid leaves open, and the moment there were
  // cars on that street they drove through the banking hall.
  put(64, 24, 40, 52, PLAZA_Y + 12, 214, M.stone);
  put(70, 1.6, 46, 52, PLAZA_Y + 24.8, 214, M.kerb);

  /**
   * ---- Three landmarks, so the skyline has a second and a third tallest.
   *
   * The inner ring's own towers top out around ninety metres and they are all
   * boxes, so from up here the city read as one texture: nothing to measure
   * Kesteven House against and nothing to take a bearing off. These three are
   * each a different shape, at a different distance, in a different direction —
   * which is what a landmark is for.
   */
  // St Ninian's, ~300 m south-east. A square tower with a cone on it; the third
  // tallest thing in Halvern and the only pointed one.
  put(13, 34, 13, 214, PLAZA_Y + 17, 206, M.spire);
  {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(8.4, 30, 8), M.slate);
    cone.position.set(214, PLAZA_Y + 49, 206);
    cone.userData.ignoreAudit = true;
    markStructure([cone], 'scenery');
    scene.add(cone);
    put(22, 9, 40, 214, PLAZA_Y + 4.5, 232, M.spire);      // the nave, running south
  }

  // The gasometer, on the near bank. A ribbed drum: the one round thing in the
  // city, and the one the wire floor's people call "the tank".
  {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(34, 34, 38, 18, 1, true), M.iron);
    drum.position.set(-250, PLAZA_Y + 19, -262);
    drum.material.side = THREE.DoubleSide;
    drum.userData.ignoreAudit = true;
    markStructure([drum], 'scenery');
    scene.add(drum);
    // The frame it rises inside. Sixteen standards and two hoops; at this
    // distance the ribs are the whole silhouette.
    for(let i = 0; i < 16; i++){
      const a = (i / 16) * Math.PI * 2;
      put(1.6, 44, 1.6, -250 + Math.cos(a) * 36, PLAZA_Y + 22, -262 + Math.sin(a) * 36, M.iron);
    }
    for(const hy of [14, 34]){
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(36, 0.7, 6, 24), M.iron);
      hoop.rotation.x = Math.PI / 2;
      hoop.position.set(-250, PLAZA_Y + hy, -262);
      hoop.userData.ignoreAudit = true;
      markStructure([hoop], 'scenery');
      scene.add(hoop);
    }
  }

  // Ashgate power station, ~700 m north-east on the far bank, with the chimney
  // that is the second tallest thing in the city — and the only thing in it that
  // says which way the wind is blowing.
  const CHIM = { x: 470, z: -560, base: PLAZA_Y, h: 128 };
  {
    put(96, 34, 62, CHIM.x - 60, PLAZA_Y + 17, CHIM.z + 14, M.brick);   // the turbine hall
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 8.4, CHIM.h, 12), M.brick);
    stack.position.set(CHIM.x, PLAZA_Y + CHIM.h / 2, CHIM.z);
    stack.userData.ignoreAudit = true;
    markStructure([stack], 'scenery');
    scene.add(stack);

    /**
     * And it smokes. Ten soft discs that rise out of the stack, drift downwind
     * and fade, then start again from the top — the cheapest possible plume and
     * the only moving thing on that horizon.
     *
     * Downwind is south-west, because the weather comes in off the port, which
     * is north-east. That is not decoration either: the wire floor reads the
     * port for the trade figures and the plume is the same wind arriving.
     */
    const puff = puffTexture();
    const smokeMat = new THREE.SpriteMaterial({ map: puff, color: 0xb9b7b0,
      transparent: true, opacity: 0.34, depthWrite: false });
    const PUFFS = 10, LIFE = 14;
    const smoke = [];
    for(let i = 0; i < PUFFS; i++){
      const s = new THREE.Sprite(smokeMat.clone());
      s.userData.ignoreAudit = true;
      markStructure([s], 'scenery');
      scene.add(s);
      smoke.push({ s, age: (i / PUFFS) * LIFE, spin: ((i * 37) % 11) - 5 });
    }
    ctx?.animate?.((t, dt) => {
      for(const p of smoke){
        p.age += dt;
        if(p.age > LIFE) p.age -= LIFE;
        const k = p.age / LIFE;                       // 0 at the stack, 1 gone
        const size = 22 + k * 96;
        p.s.scale.set(size, size, 1);
        p.s.position.set(
          CHIM.x - k * 210 + p.spin * k * 6,
          PLAZA_Y + CHIM.h + 6 + k * 74,
          CHIM.z + k * 210 + p.spin * k * 4);
        // In at the stack, out at the end of the run. Fading only at the end
        // gives a plume with a hard head on it, which reads as a puff of steam.
        p.s.material.opacity = 0.40 * Math.min(1, k * 6) * (1 - k) * (1 - k * 0.4);
      }
    });
  }

  /**
   * ---- Traffic.
   *
   * One instanced mesh of small boxes on the four streets the grid leaves open,
   * both ways on each, wrapping when they run off the end. From a hundred and
   * eighty metres a car is under two pixels and there is nothing to be gained by
   * making it a better car — what the player sees is that the streets move and
   * the plaza queue does not, which is the whole of what this is for.
   *
   * `LANES` is derived from the same street lines the city grid was cut with, so
   * a street that moves moves in both places.
   */
  {
    const lane = (ax, az, bx, bz) => ({ ax, az, bx, bz,
      len: Math.hypot(bx - ax, bz - az), ry: Math.atan2(bx - ax, bz - az) });
    const LANES = [
      lane(-40, 2.4, -420, 2.4),   lane(-420, 9.6, -40, 9.6),      // Vend Street
      lane(44, -4.5, 430, -4.5),   lane(430, 4.5, 44, 4.5),        // Ferrand Row
      lane(-430, -153.5, 430, -153.5), lane(430, -146.5, -430, -146.5), // Harrow Street
      lane(-173.5, -50, -173.5, -338), lane(-166.5, -338, -166.5, -50), // Quay Road
    ];
    // Paving first. Vend Street already had some, for the queue, and for exactly
    // this reason: a dark car on dark asphalt from a hundred and eighty metres is
    // nothing at all, and the same car on pale paving is traffic. The three
    // streets that had none got none of the benefit.
    put(50, 0.26, 390, 0, PLAZA_Y + 0.19, 240, M.kerb);        // Ferrand Row, south
    put(880, 0.26, 30, 0, PLAZA_Y + 0.19, -150, M.kerb);       // Harrow Street, east–west
    put(30, 0.26, 300, -170, PLAZA_Y + 0.21, -194, M.kerb);    // Quay Road, down to the water
    // (two centimetres proud of Harrow Street, which it crosses. Two coplanar
    //  slabs z-fight, and from this height that reads as the street flickering.)

    const GAP = 27;
    const cars = [];
    for(const L of LANES){
      const n = Math.max(2, Math.floor(L.len / GAP));
      for(let i = 0; i < n; i++){
        cars.push({ L, s: (i + ((i * 13) % 7) / 9) * (L.len / n),
          v: 9 + ((i * 7919) % 9) });
      }
    }
    const traffic = new THREE.InstancedMesh(
      new THREE.BoxGeometry(2.0, 1.2, 4.0),
      new THREE.MeshLambertMaterial({ color: 0xffffff }), cars.length);
    traffic.userData.ignoreAudit = true;
    markStructure([traffic], 'scenery');
    // Instance colours, dark: rule 6 does not stop being true because the thing
    // is two pixels across. A pale car at this exposure is a white dot.
    const paint = [0x3a3d40, 0x2e3438, 0x4a4038, 0x39423a, 0x51494a];
    const col = new THREE.Color();
    cars.forEach((c, i) => traffic.setColorAt(i, col.setHex(paint[i % paint.length])));
    if(traffic.instanceColor) traffic.instanceColor.needsUpdate = true;
    scene.add(traffic);
    ctx?.animate?.((t, dt) => {
      for(let i = 0; i < cars.length; i++){
        const c = cars[i];
        c.s += c.v * dt;
        if(c.s > c.L.len) c.s -= c.L.len;               // off the end, on at the start
        const k = c.s / c.L.len;
        tmp.position.set(c.L.ax + (c.L.bx - c.L.ax) * k, PLAZA_Y + 0.9,
          c.L.az + (c.L.bz - c.L.az) * k);
        tmp.rotation.set(0, c.L.ry, 0);
        tmp.scale.set(1, 1, 1);
        tmp.updateMatrix();
        traffic.setMatrixAt(i, tmp.matrix);
      }
      traffic.instanceMatrix.needsUpdate = true;
    });
  }

  /**
   * ---- A barge on the river, working its length.
   *
   * The port is the current account, and the current account is a flow. One
   * barge between the quays and the bend, four metres a second, is the only
   * thing in this game that says the port is open — everything else out there
   * is a photograph.
   */
  {
    const barge = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.BoxGeometry(9.5, 3.2, 46), M.hull);
    hull.position.y = 1.6;
    barge.add(hull);
    const house = new THREE.Mesh(new THREE.BoxGeometry(7.0, 3.4, 7.5), M.spandrel);
    house.position.set(0, 4.9, 17);
    barge.add(house);
    const load = new THREE.Mesh(new THREE.BoxGeometry(8.0, 2.2, 26), M.crane);
    load.position.set(0, 4.3, -6);
    barge.add(load);
    barge.traverse(o => { o.userData.ignoreAudit = true; });
    markStructure(barge.children, 'scenery');
    barge.position.set(-760, PLAZA_Y + 0.6, -430);
    scene.add(barge);
    ctx?.animate?.(patrol(barge, [
      { x: -760, y: PLAZA_Y + 0.6, z: -430 },
      { x: 780, y: PLAZA_Y + 0.6, z: -418 },
    ], 4.2));
  }

  /**
   * ---- Cloud, coming in off the port.
   *
   * Twenty-six flat sheets at a hundred and forty metres — which is a hundred
   * and twenty above the top floor, so they pass *over* the building and are
   * seen from every window as the high layer the weather arrives on. `fog:
   * false`, because they live above the layer the fog describes and fogging
   * them turns the sky into a flat card.
   *
   * They are kept inside ±1100 m, which is inside the sky dome. A cloud outside
   * the dome is behind the sky and invisible, and there is no error for it.
   */
  {
    const cloudTex = puffTexture();
    const CLOUDS = 26, FIELD = 1100, Y = PLAZA_Y + 320;
    const sheets = [];
    for(let i = 0; i < CLOUDS; i++){
      // `>>>`, not `>>`. The hash is a full unsigned 32-bit word, and a signed
      // shift of anything past 2^31 comes back negative — so `% 60` returns a
      // number between −59 and 59 and a cloud placed with it is fifty metres
      // lower and eleven hundred metres further out than the field it is
      // supposed to be wrapped inside. Which is: a cloud that drifts away once
      // and never comes back, and no error for it. Measured, not guessed.
      const n = (i * 2654435761) >>> 0;
      const w = 210 + (n % 300);
      const mat = new THREE.MeshBasicMaterial({ map: cloudTex, color: 0xdfe3e6,
        transparent: true, opacity: 0.14 + ((n >>> 7) % 14) / 100,
        depthWrite: false, side: THREE.DoubleSide, fog: false });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * (0.6 + ((n >>> 3) % 40) / 100)), mat);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = ((n >>> 11) % 628) / 100;
      m.position.set(-FIELD + ((n >>> 5) % (FIELD * 2)), Y + ((n >>> 17) % 60) - 30,
        -FIELD + ((n >>> 13) % (FIELD * 2)));
      m.renderOrder = -1;
      m.userData.ignoreAudit = true;
      markStructure([m], 'sky');
      scene.add(m);
      sheets.push(m);
    }
    // In off the port, which is north-east: toward −x and +z, together.
    ctx?.animate?.((t, dt) => {
      for(const m of sheets){
        m.position.x -= 5.2 * dt;
        m.position.z += 5.2 * dt;
        if(m.position.x < -FIELD) m.position.x += FIELD * 2;
        if(m.position.z > FIELD) m.position.z -= FIELD * 2;
      }
    });
  }
}

// ------------------------------------------------------------- the interiors
/** What is on the walls, room by room. Nine parts earnest, one part the joke a
 *  real office has. Everything here has to land at walking pace. */
const WALL_TEXT = {
  COUNTER: [
    { style: 'warning', tag: 'AT THE COUNTER', heading: 'No rate is quoted from this floor', accent: '#b5502f',
      body: 'Downstairs answers questions about today. Anything about Monday goes to the board, '
        + 'in writing. A number said out loud at a counter is a number the city has heard.' },
    { style: 'list', tag: 'EVERY OPENING', heading: 'In this order', accent: '#1f3d52',
      items: [['Count', 'the float, before the doors'], ['Post', 'the daily limit where it can be read'],
        ['Log', 'the queue at the hour, not the average'], ['Wire', 'the take up at four']],
      body: 'The queue at the hour is a measurement. The average is a comfort.' },
    { style: 'chart', tag: 'TAKE-UP', heading: 'Share taking the full limit, by day', accent: '#8a6a1e',
      body: 'Nine in ten on day one. If it stays there, the limit is the policy and not the ceiling.' },
    { style: 'tally', tag: 'DAYS OPEN', heading: 'Without turning anyone away', accent: '#5b6a72', body: '' },
  ],
  NOTES: [
    { style: 'warning', tag: 'CANCELLED NOTES', heading: 'Nothing leaves this floor uncancelled', accent: '#b5502f',
      body: 'Two signatures on the weight, then the punch. An old mark that walks back out of '
        + 'this room is money supply nobody has counted.' },
    { style: 'grid', tag: 'SCALES', heading: 'Kilogram to a million marks', accent: '#8a6f4a',
      body: 'Eleven hundred notes to the kilo, mixed denominations. Weigh, do not count, and '
        + 'record which denominations the sack was.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Scale 2 reads light', accent: '#b5502f',
      body: 'Four hundred grams under, every load. Certificate is in the drawer. — T.T.' },
  ],
  PRICES: [
    { style: 'banner', tag: 'THE BASKET', heading: 'Price what people buy, not what we listed in 1954', accent: '#3f8f7a',
      body: 'Twelve of the forty-one lines are things this city no longer sells. An index of a '
        + 'city nobody lives in is an accurate number about nothing.' },
    { style: 'list', tag: 'EVERY WEDNESDAY', heading: 'Vend Street, both sides', accent: '#1f3d52',
      items: [['Same shops', 'the same shops as last week'], ['Same size', 'the tin, not the price per tin'],
        ['Note it', 'when a size changes and the price does not'], ['Sign it', 'the collector signs, not the desk']],
      body: 'A smaller tin at the same price is inflation with the label filed off.' },
    { style: 'chart', tag: 'INDEX', heading: 'Base 100, four years', accent: '#8a6a1e',
      body: 'The step in the spring is the fuel line, not the basket. Say which, every time.' },
  ],
  BANKS: [
    { style: 'banner', tag: 'THE LEDGERS', heading: 'Reserves are what is here, not what is promised', accent: '#5f7fa8',
      body: 'Eleven regional banks, one column each. The column that matters is the one that '
        + 'has to be there on the fifteenth.' },
    { style: 'chart', tag: 'MULTIPLIER', heading: 'What a reserve requirement does to deposits', accent: '#8a6a1e',
      body: 'One over the requirement, and the requirement is the only end of that we hold.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Kestrel Mutual returns are late again', accent: '#b5502f',
      body: 'Third week. Chase before the board asks, not after. — P.I.' },
  ],
  TRADE: [
    { style: 'warning', tag: 'WIRE ROOM', heading: 'Nothing quoted goes out unsigned', accent: '#b5502f',
      body: 'A rate on a telex is a rate the counterparty can hold us to. Signature and time '
        + 'on every outgoing, and the time is the time it was sent.' },
    { style: 'grid', tag: 'THE WIRES', heading: 'Six correspondents, three time zones', accent: '#4a7f8a',
      body: 'The port desk closes at four and the western wires open at five, so the hour '
        + 'between them is the only hour anybody can be told anything.' },
    { style: 'chart', tag: 'CURRENT ACCOUNT', heading: 'Goods, services and what pays for both', accent: '#8a6a1e',
      body: 'The gap is not a mistake. It is somebody buying our paper, and it stops when they stop.' },
  ],
  RATE: [
    { style: 'banner', tag: 'THE BOARD', heading: 'One rate, published once, held', accent: '#8a5c7f',
      body: 'A rate the board revisits on Tuesday is not a rate. It is a forecast, and the city '
        + 'will price the next one before we have set it.' },
    { style: 'list', tag: 'BEFORE THE VOTE', heading: 'On the table, every time', accent: '#1f3d52',
      items: [['The index', 'certified, with the basket printed'], ['The supply', 'weighed, not estimated'],
        ['The reserves', 'what can be defended for a fortnight'], ['The lag', 'when this lands, not when it is voted']],
      body: 'The last line is the one the minutes always leave out.' },
    { style: 'tally', tag: 'DAYS', heading: 'Until the old mark stops being money', accent: '#b5502f', body: '' },
  ],
  LOOKOUT: [
    { style: 'banner', tag: 'FROM THIS WINDOW', heading: 'Everything on the board is out there', accent: '#1f3d52',
      body: 'The queue on the plaza is the money supply. Vend Street is the basket. The port is '
        + 'the current account. Nothing in this building is abstract; it is only far away.' },
  ],
  PRESS: [
    { style: 'warning', tag: 'PRESS ROOM', heading: 'The board speaks once, at four', accent: '#b5502f',
      body: 'Anything said before four is a leak whatever it is true of, because the city will '
        + 'trade on it before the board has voted.' },
  ],
};

/**
 * What is on the corridor walls, floor by floor.
 *
 * The corridor of a building whose floors are all the same plate is the one place
 * a player can be lost, so every floor's signage says which floor it is and what
 * is on it. Nine parts earnest, one part the joke a real office has.
 */
const SPINE_SIGNS = {
  0: [
    { style: 'banner', tag: 'FLOOR 45', heading: 'Counter floor — currency board', accent: '#1f3d52',
      body: 'Counter room and note room. The counters themselves are on the plaza; nothing is '
        + 'paid out on this floor and the sign downstairs says so twice.' },
    { style: 'list', tag: 'THE SIX FLOORS', heading: 'What is on each', accent: '#5b6a72',
      items: [['45', 'counter, notes'], ['46', 'prices, banks'], ['47', 'wires, port'],
        ['48', 'the board'], ['49', 'statistics'], ['50', 'the open economy']],
      body: 'The lift is the only way between them. Allow a minute a floor and rather more at four.' },
    { style: 'warning', tag: 'GOODS HOIST', heading: 'Cancelled notes only, both signatures', accent: '#b5502f',
      body: 'Nothing goes down this shaft that has not been weighed, punched and entered. What '
        + 'reaches the furnace cannot be brought back and counted again.' },
  ],
  1: [
    { style: 'banner', tag: 'FLOOR 46', heading: 'Measurement floor', accent: '#3f8f7a',
      body: 'Price room, ledger hall, calculating room. Every figure the board publishes is '
        + 'built on this floor and signed on the one above it.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Comptometer 4 is out again', accent: '#b5502f',
      body: 'Do not use it for the index. It rounds the third place down. — E.R.' },
    { style: 'list', tag: 'VEND STREET', heading: 'Collection, every Wednesday', accent: '#1f3d52',
      items: [['Same shops', 'both sides, in order'], ['Same size', 'the tin, not the price'],
        ['Note it', 'when a size changes'], ['Sign it', 'the collector signs']],
      body: 'It is four hundred metres west and visible from the price room window. There is no '
        + 'excuse for pricing it from memory.' },
  ],
  2: [
    { style: 'banner', tag: 'FLOOR 47', heading: 'Wire floor', accent: '#4a7f8a',
      body: 'Wire room, telex, port desk, press. Everything that arrives from outside Halvern '
        + 'arrives on this floor, and everything said to outside Halvern leaves from it.' },
    { style: 'warning', tag: 'OUTGOING', heading: 'Nothing quoted goes out unsigned', accent: '#b5502f',
      body: 'A rate on a wire is a rate a counterparty can hold us to. Signature and the time it '
        + 'was actually sent, on every one.' },
    { style: 'grid', tag: 'THE HOUR', heading: 'Four to five, every day', accent: '#8a6a1e',
      body: 'The port desk closes at four and the western wires open at five. That hour is the '
        + 'only one in which anybody can be told anything.' },
  ],
  3: [
    { style: 'banner', tag: 'FLOOR 48', heading: 'The board', accent: '#8a5c7f',
      body: 'Rate room, dealing desk, and the observation room at the north end, which is open '
        + 'and which everything on the board can be seen from.' },
    { style: 'warning', tag: 'BEFORE FOUR', heading: 'Nothing is said to the press', accent: '#b5502f',
      body: 'The board speaks once, at four, in writing. Anything said earlier is a leak whatever '
        + 'it is true of, because the city will trade on it before the vote.' },
    { style: 'tally', tag: 'DAYS', heading: 'Until the old mark stops being money', accent: '#b5502f', body: '' },
  ],
  // ---- 49 and 50, which the revised campaign added and which had no signage at
  // all until this pass. `SPINE_SIGNS[floor.id] ?? SPINE_SIGNS[0]` is a fallback
  // that cannot fail loudly: both new plates hung floor 45's banner in their own
  // corridor, so the two floors carrying twenty-nine of the sixty stops told a
  // player who stepped out of the lift that they were on the counter floor.
  4: [
    { style: 'banner', tag: 'FLOOR 49', heading: 'Statistics floor', accent: '#1f5a56',
      body: 'The basket table, the accounts desk and the revisions room. What is certified here '
        + 'is what the board votes on, and a figure that is revised is still a figure we published.' },
    { style: 'list', tag: 'EVERY REVISION', heading: 'Both numbers stay on the sheet', accent: '#1f3d52',
      items: [['First', 'what was published, with its date'], ['Now', 'what we would publish today'],
        ['Why', 'the one line that says what changed'], ['Sign', 'the statistician, not the desk']],
      body: 'A revision that replaces the original is not a correction. It is a second first draft.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The basket is forty-one lines, not forty', accent: '#b5502f',
      body: 'Somebody has been dropping the fuel line to make the arithmetic round. — E.R.' },
  ],
  5: [
    { style: 'banner', tag: 'FLOOR 50', heading: 'Open-economy floor', accent: '#8a6a34',
      body: 'Customs, shipping and the far end of the wires. Everything on this floor is a number '
        + 'about somebody outside Halvern deciding what our money is worth.' },
    { style: 'grid', tag: 'THE PAIRS', heading: 'Every payment has two sides', accent: '#4a7f8a',
      body: 'A cargo out and a credit in. If only one of them reaches this floor, the other one '
        + 'happened anyway and we have simply not been told.' },
    { style: 'warning', tag: 'TOP FLOOR', heading: 'The roof is not a landing', accent: '#b5502f',
      body: 'The plant room and the lift motor are above this ceiling. The hatch is locked and the '
        + 'key is with the building, not with us.' },
  ],
};

/** The one big thing each room is, before the generic furniture goes in. */
function signature(room, ctx){
  const { bounds: b, box, materials: M, soft, hard } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 1.4;
  const midX = b.cx;

  switch(room.id){
    case 'COUNTER': {
      // The counter floor does not have a counter on it — the counters are on
      // the plaza, forty-four floors down. What is here is the board they are
      // run from: a long desk facing the window, with the queue in it.
      box(0.7, 0.78, 5.4, inX, 0.39, b.cz, M.frame);
      hard(inX, b.cz, 0.9, 5.6, 0.85);
      for(const dz of [-1.8, 0, 1.8]) soft(inX + f * 0.8, b.cz + dz, 0.35);
      return true;
    }
    case 'NOTES': {
      // Three platform scales and a punch press. The money supply, by weight.
      for(const dz of [-2.6, 0, 2.6]){
        markStructure([box(1.5, 0.28, 1.5, midX, 0.14, b.cz + dz, M.rail)], 'machine');
        box(0.16, 1.15, 1.4, midX + f * 0.6, 0.72, b.cz + dz, M.frame);
        box(0.5, 0.34, 0.5, midX + f * 0.6, 1.42, b.cz + dz, M.base);
        hard(midX, b.cz + dz, 1.7, 1.7, 1.5);
      }
      return true;
    }
    case 'PRICES': {
      // The basket itself: a rack of forty-one numbered pigeonholes, one line of
      // the index each, with the week's dockets in them.
      const rx = b.xOuter - f * 1.1;
      markStructure([box(0.55, 2.1, 4.6, rx, 1.05, b.cz, M.frame)], 'rack');
      for(let i = 0; i < 7; i++){
        box(0.6, 0.03, 4.5, rx, 0.32 + i * 0.28, b.cz, M.rail);
      }
      hard(rx, b.cz, 0.7, 4.8, 2.1);
      return true;
    }
    case 'BANKS': {
      // Eleven ledger stands in a row, one per regional bank, each at reading
      // height and open. The multiplier is a column in one of them.
      for(let i = 0; i < 6; i++){
        const z = b.cz - 3.2 + i * 1.3;
        box(0.85, 1.06, 0.62, midX, 0.53, z, M.frame);
        box(0.9, 0.05, 0.66, midX, 1.1, z, M.wall);
        soft(midX, z, 0.42);
      }
      hard(midX, b.cz, 1.0, 8.0, 1.1);
      return true;
    }
    case 'TRADE':
    case 'TELEX': {
      // The telex bank: eight machines under a paper rail, each with its own
      // spool. The open economy arrives here one line at a time.
      const n = room.id === 'TRADE' ? 6 : 4;
      for(let i = 0; i < n; i++){
        const z = b.cz - (n - 1) * 0.75 + i * 1.5;
        box(0.75, 0.72, 0.6, b.xOuter - f * 1.2, 0.36, z, M.frame);
        box(0.6, 0.3, 0.5, b.xOuter - f * 1.2, 0.87, z, M.base);
        soft(b.xOuter - f * 1.2, z, 0.4);
      }
      hard(b.xOuter - f * 1.2, b.cz, 0.9, n * 1.5, 1.1);
      return true;
    }
    case 'RATE': {
      // The board table, along the glass, so the vote is taken looking at the
      // city it lands on. Eight chairs, and the chair's is the one facing in.
      const tz = b.cz;
      markStructure([box(2.5, 0.08, 6.4, b.cx, 0.76, tz, M.frame)], 'table');
      for(const [dx, dz] of [[-1.0, 0], [1.0, 0]]){
        box(0.35, 0.72, 5.4, b.cx + dx, 0.36, tz + dz, M.base);
      }
      hard(b.cx, tz, 2.7, 6.6, 0.8);
      for(let i = 0; i < 4; i++){
        for(const s of [-1, 1]){
          const cx = b.cx + s * 1.75, cz = tz - 2.4 + i * 1.6;
          box(0.5, 0.46, 0.5, cx, 0.23, cz, M.base);
          box(0.5, 0.5, 0.09, cx + s * 0.2, 0.7, cz, M.base);
          soft(cx, cz, 0.4);
        }
      }
      return true;
    }
    case 'LOOKOUT': {
      // Nothing but a rail at the glass and two benches back from it. The room
      // is the window.
      markStructure([box(0.08, 0.06, 9.0, b.xOuter - f * 0.9, 1.02, b.cz, M.rail)], 'rail');
      for(const s of [-1, 1]) box(0.08, 1.0, 0.08, b.xOuter - f * 0.9, 0.5, b.cz + s * 4.3, M.rail);
      for(const dz of [-2.2, 2.2]){
        box(0.55, 0.42, 1.9, b.cx + f * 0.4, 0.21, b.cz + dz, M.frame);
        soft(b.cx + f * 0.4, b.cz + dz, 0.5);
      }
      return true;
    }
    default:
      return false;
  }
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening, P } = ctx;
  const f = b.sign;
  const big = signature(room, ctx);

  // A cill at the glass, in every room. It is what stops the furniture pass
  // putting a filing cabinet in front of the one thing this building is for, and
  // it is what a curtain wall actually has at the floor.
  markStructure([box(0.42, 0.34, room.z1 - room.z0 - 0.6, b.xOuter - f * 0.24, 0.17, b.cz, M.base)], 'cill');

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    // **Two and a half metres clear at the glass.** The furniture pass fills the
    // deepest lane it is given, and given the full room it stood a two-metre
    // shelf unit along the curtain wall — which in this building walls off the
    // one thing every room is for. Measured off a screenshot: the window was a
    // strip of sky above a wall of cabinets.
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 2.6,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: P.wall,
    /**
     * Where there is wall to hang something on — and in this building that is
     * the question, because **three of every room's four faces are not wall**.
     * The outer face is the curtain wall; hanging a notice on it puts a board in
     * front of the city and, worse, `placement.mjs` cannot see glazing as
     * backing and fires a ray straight through it. The two cross-walls exist
     * only where a partition was actually built, which at the ends of the plate
     * is nowhere: those are glass too.
     */
    wallOk: (x, z, wallName) => {
      // The glass. Never.
      if(Math.abs(x - b.xOuter) < 0.5) return false;
      const plate = ctx.plan?.spine ?? { z0: -12, z1: 14 };
      const glazedEnd = (zz) => Math.abs(zz - plate.z0) < 0.06 || Math.abs(zz - plate.z1) < 0.06;
      if(Math.abs(z - room.z0) < 0.5 && glazedEnd(room.z0)) return false;
      if(Math.abs(z - room.z1) < 0.5 && glazedEnd(room.z1)) return false;
      // The spine wall, minus its doorway — or, for an open room, minus all of
      // it but the two nibs.
      const onSpine = Math.abs(x - b.xInner) < 0.5 || wallName === (f < 0 ? 'xHi' : 'xLo');
      if(!onSpine) return true;
      const NIB = 0.9;
      if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
      const dw = room.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - b.cz) > dw / 2 + 0.25;
    },
    kind: room.kind ?? 'workroom',
    roomName: room.name ?? room.id,
    notices: WALL_TEXT[room.id],
    seed: `changeover-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(big ? [{ x: b.cx, z: b.cz, r: 3.4 }] : []),
      ...((ctx.floor?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.9 }))),
    ],
    target: big ? 11 : 15,
  });
}

/**
 * Fit out one floor's corridor.
 *
 * `engine/world/interiorTower.js` calls this once per floor with that floor's
 * own plan, and every floor is the same twenty-six metres of corridor — so
 * anything placed from the whole building's extent is built four times in the
 * same place. `ctx.floor` says which one this is, and the floor number on the
 * wall is the only thing in the corridor that differs between them.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, soft, hard, floor } = ctx;
  const sp = plan.spine ?? { z0: -12, z1: 14 };
  const hw = P.corridorHalfWidth;
  const L = plan.lift ?? { side: 'w', z0: 0.4, z1: 4.8 };

  const fid = floor?.id ?? 0;
  const tone = toneMats(fid);

  // The lift lobby: a bench opposite the car, and the floor number over it,
  // large, because in a building where every floor is the same plate the number
  // is the only thing that says where you are.
  const lz = (L.z0 + L.z1) / 2;
  box(0.5, 0.44, 1.8, hw - 0.35, 0.22, lz, M.frame);
  soft(hw - 0.35, lz, 0.5);
  /**
   * The number panel, in this floor's own colour.
   *
   * A sign is read; a colour is *recognised*, and the difference is about a
   * second and a half at a lift door. Six plates on one footprint means the
   * corridor gives a player no other evidence at all — so the panel opposite
   * the car is painted bottle green on 45, ochre on 46, slate blue on 47,
   * oxblood on 48, teal on 49, charcoal on 50, and the same colour runs the
   * length of the dado below.
   */
  markStructure([box(0.10, 1.06, 1.06, hw - 0.06, 1.94, lz, tone.panel)], 'sign');
  markStructure([box(0.05, 0.44, 0.44, hw - 0.12, 1.94, lz, M.wall)], 'sign');   // the numerals' ground
  // A brass surround on 50, which is the top floor and the only one that has
  // ever had money spent on it.
  if(fid === FLOOR_TONES.length - 1){
    for(const dz of [-0.58, 0.58]) markStructure([box(0.11, 1.22, 0.06, hw - 0.055, 1.94, lz + dz, tone.panel)], 'sign');
    for(const dy of [-0.58, 0.58]) markStructure([box(0.11, 0.06, 1.22, hw - 0.055, 1.94 + dy, lz, tone.panel)], 'sign');
  }

  /**
   * The dado, the length of the corridor, on whichever side actually has wall.
   *
   * `solidAt` is declared below and used here as well as by the furniture pass,
   * which is the point: a band painted from the corridor's own extent runs
   * straight across every doorway and the lift opening, and hangs in mid-air in
   * front of the observation room, which is open to the corridor on floor 48.
   * One predicate, two callers.
   */
  const paintDado = () => {
    for(const side of ['w', 'e']){
      const x = (side === 'w' ? -1 : 1) * (hw - 0.05);
      let run = null;
      const flush = () => {
        if(run && run.z1 - run.z0 > 0.7){
          markStructure([box(0.09, 1.02, run.z1 - run.z0, x, 0.51, (run.z0 + run.z1) / 2, tone.dado)], 'dado');
        }
        run = null;
      };
      for(let z = sp.z0; z <= sp.z1 + 1e-6; z += 0.4){
        if(solidAt(side, z)){ run = run ?? { z0: z, z1: z }; run.z1 = z; }
        else flush();
      }
      flush();
    }
  };

  /**
   * Which side of the corridor has wall on it, at this z.
   *
   * The corridor's walls are the rooms' own partitions, so there is no wall at a
   * doorway, none across the lift opening, and none at all where a room is open
   * to the corridor. And nothing may be hung on the two ends: they are glass.
   */
  const rooms = floor?.rooms ?? [];
  const solidAt = (side, z) => {
    const r = rooms.find(x => x.side === side && z > x.z0 && z < x.z1);
    if(!r){
      // No room here. On the lift side that is the shaft, which is wall; on the
      // other side it is the gap between two rooms, which is not.
      return side === L.side && z > L.z0 && z < L.z1
        ? Math.abs(z - (L.z0 + L.z1) / 2) > 1.1
        : false;
    }
    const cz = (r.z0 + r.z1) / 2;
    if(r.open) return z < r.z0 + 0.9 || z > r.z1 - 0.9;
    const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
    return Math.abs(z - cz) > dw / 2 + 0.25;
  };

  // Now that `solidAt` exists. `paintDado` is a closure declared above and
  // called here on purpose: it is written beside the panel it matches and run
  // beside the predicate it needs.
  paintDado();

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: hw,
    z0: sp.z0 + 1.4, z1: sp.z1 - 1.4,
    wallThickness: P.wall,
    seed: `changeover-spine-${floor?.id ?? 0}`,
    every: 6,
    signEvery: 4.2,
    hard, soft,
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
    // Both ends are curtain wall, and the lift opening is a hole.
    keepClear: [
      { x: 0, z: sp.z0 + 1.6, r: 2.0 },
      { x: 0, z: sp.z1 - 1.6, r: 2.0 },
      { x: 0, z: lz, r: 1.8 },
    ],
    signs: SPINE_SIGNS[floor?.id ?? 0] ?? SPINE_SIGNS[0],
  });
}
