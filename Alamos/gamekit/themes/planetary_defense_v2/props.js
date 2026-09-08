// props.js — what makes Cerro Alto an observatory and not a business park.
//
// The engine's `kit.js` gives generic buildings, benches, posts and signs, and
// `site.js` places them. Everything in this file is the vocabulary that only
// this game has: telescope domes with open shutters, a steerable radar dish,
// red service lamps, cable trays, and the guard rail along the drop.
//
// Rules this file obeys, each of which cost somebody hours to learn:
//   · placement helpers take (x, z, y) — ground LAST;
//   · nothing goes within ten metres of the spawn;
//   · no real lights. This is a night scene and the temptation to light it with
//     point lights is exactly how a floor went from 118 fps to 20. Everything
//     that glows here is an emissive material.
import * as THREE from 'three';
import { MATERIALS, cyl, box, post, vehicle } from '../../engine/world/kit.js';
import { flyable } from '../../engine/world/flying.js';
import { driveable } from '../../engine/world/driving.js';
import { PADS, site } from './site.js';
import { animate, blink, flicker, sway } from '../../engine/world/animators.js';

/** Red service lighting. Emissive only — never a real light. */
const RED = 0xd8321c;

function redLamp(scene, x, z, y, height = 3.6){
  const p = post(scene, x, z, y, height, 0.09, 0x33333a);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 12, 8),
    new THREE.MeshStandardMaterial({ color: RED, emissive: RED, emissiveIntensity: 1.6, roughness: 0.5 }));
  head.position.set(x, y + height, z);
  scene.add(head);
  return { soft: p, glow: head };
}

/**
 * A telescope dome: a drum, a hemisphere, and the shutter standing open with
 * the tube visible inside it.
 *
 * The shutter is the whole silhouette. A closed dome is a grain silo; an open
 * one, with a slot of darker sky and a tube pointing out of it, is unmistakably
 * a telescope even at two hundred metres in the dark.
 */
function dome(scene, x, z, y, r, opts = {}){
  const facing = opts.facing ?? 0;
  const shell = new THREE.MeshStandardMaterial({
    color: 0xb9bcc0, roughness: 0.55, metalness: 0.35, envMapIntensity: 0.45,
  });
  // Drum
  const drum = cyl(scene, r, r * 0.42, x, y + r * 0.21, z, shell);
  // Hemisphere, open at the bottom
  const cap = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), shell);
  cap.position.set(x, y + r * 0.42, z);
  cap.castShadow = true; cap.receiveShadow = true;
  scene.add(cap);

  // The shutter opening: a dark wedge cut across the cap, made by two panels
  // standing proud of it with the gap between them.
  //
  // ALL OF IT IN ONE GROUP, standing at the dome's own centre and carrying the
  // facing. The panels, the dark slot and the tube used to be three siblings
  // positioned in world space from `facing`, which made the aperture
  // unslewable: turning a dome meant recomputing three positions and a rotation
  // in step, and the first thing that gets out of step is a tube pointing at
  // the inside of its own shutter. One group turns the whole aperture at once.
  const shutter = new THREE.Group();
  shutter.position.set(x, y + r * 0.42, z);
  shutter.rotation.y = facing;
  scene.add(shutter);

  const gap = r * 0.30;
  const panel = new THREE.MeshStandardMaterial({ color: 0x8f9296, roughness: 0.6, metalness: 0.3 });
  for(const s of [-1, 1]){
    const p = new THREE.Mesh(new THREE.BoxGeometry(r * 0.5, r * 0.9, 0.28), panel);
    p.position.set(s * (gap + r * 0.25), r * 0.5, 0);
    shutter.add(p);
  }
  // The slot itself — a dark face so the opening reads as a hole rather than a
  // seam. Single-sided: text and arrows are not the only things that render
  // mirrored from behind, a dark face on DoubleSide reads as a black wall from
  // inside the dome.
  const slot = new THREE.Mesh(
    new THREE.PlaneGeometry(gap * 2, r * 1.5),
    new THREE.MeshBasicMaterial({ color: 0x07080c, side: THREE.FrontSide }));
  slot.position.set(0, r * 0.42, r * 0.99);
  shutter.add(slot);

  // The tube, leaning out of the slot.
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.17, r * 0.19, r * 1.25, 16),
    new THREE.MeshStandardMaterial({ color: 0x2f3238, roughness: 0.5, metalness: 0.5 }));
  tube.position.set(0, r * 0.62, r * 0.35);
  tube.rotation.x = -0.5;
  tube.castShadow = true;
  shutter.add(tube);

  // A red lamp on the drum, which is how these are actually lit at night.
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 10, 8),
    new THREE.MeshStandardMaterial({ color: RED, emissive: RED, emissiveIntensity: 1.5, roughness: 0.5 }));
  lamp.position.set(x + Math.cos(facing) * (r + 0.2), y + r * 0.34, z - Math.sin(facing) * (r + 0.2));
  scene.add(lamp);

  return { drum, cap, glow: lamp, shutter, soft: { x, z, r: r + 0.4 } };
}

/**
 * A dome that is working tonight turns. `sway` about Y is right rather than
 * `spin`: a dome tracks an object across the sky and then slews back at the end
 * of an exposure, so the motion is a slow oscillation about where it was
 * pointed, not a carousel. Three or four degrees a minute — enough that a
 * player who looks twice sees it has moved, and not enough to notice as motion.
 */
function slew(shutter, degrees = 3.4, seconds = 62, phase = 0){
  if(!shutter) return;
  animate(sway(shutter, 'y', (degrees * Math.PI) / 180, (Math.PI * 2) / seconds, phase));
}

/**
 * The planetary radar: a parabolic dish on an alt-azimuth mount, tipped toward
 * the horizon the way one is when it is tracking something low.
 *
 * A LatheGeometry parabola rather than a sphere section — a dish's profile is
 * the recognisable part, and a hemisphere reads as a bowl.
 */
function dish(scene, x, z, y, R = 15){
  const steel = new THREE.MeshStandardMaterial({
    color: 0xc3c6c9, roughness: 0.45, metalness: 0.6, envMapIntensity: 0.5, side: THREE.DoubleSide,
  });
  const pts = [];
  for(let i = 0; i <= 16; i++){
    const t = i / 16;
    pts.push(new THREE.Vector2(t * R, (t * R) * (t * R) / (2.6 * R)));   // y = r²/(4f)
  }
  const face = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), steel);

  const rig = new THREE.Group();
  rig.add(face);
  // Feed on a quadrupod at the focus.
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.8, 10),
    new THREE.MeshStandardMaterial({ color: 0x3a3d42, roughness: 0.5, metalness: 0.5 }));
  feed.position.y = R * 0.62;
  rig.add(feed);
  for(const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]){
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, R * 0.68, 6),
      new THREE.MeshStandardMaterial({ color: 0x6f7276, roughness: 0.5, metalness: 0.6 }));
    leg.position.set(Math.cos(a) * R * 0.55, R * 0.3, Math.sin(a) * R * 0.55);
    leg.rotation.z = Math.cos(a) * -0.7;
    leg.rotation.x = Math.sin(a) * 0.7;
    rig.add(leg);
  }
  // Tipped up 40°, and turned to look off the ridge.
  rig.rotation.x = -Math.PI / 2 + 0.7;
  rig.rotation.z = 0.5;

  // The azimuth drive, as a group of its own with the dish inside it. An
  // alt-azimuth mount turns in azimuth about the vertical, and the dish already
  // spends its two rotations on elevation and on the tip toward the ridge —
  // adding a third to the same object would have crossed the two and rolled the
  // dish rather than turned it. So the yaw lives in the parent.
  const azimuth = new THREE.Group();
  azimuth.position.set(x, y + R * 0.95, z);
  azimuth.add(rig);
  scene.add(azimuth);

  // Mount: a fat cylinder and a yoke.
  cyl(scene, 2.6, R * 0.75, x, y + R * 0.37, z, MATERIALS.concrete());
  for(const s of [-1, 1]){
    box(scene, 1.0, R * 0.5, 1.0, x + s * 3.4, y + R * 0.72, z, MATERIALS.steel());
  }
  return { azimuth, soft: { x, z, r: R * 0.55 } };
}

/** A run of cable tray on short legs, which is how a mountain site is wired. */
function cableTray(scene, x0, z0, x1, z1, y, height = 0.75){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const mid = { x: (x0 + x1) / 2, z: (z0 + z1) / 2 };
  const ang = Math.atan2(x1 - x0, z1 - z0);
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, len),
    new THREE.MeshStandardMaterial({ color: 0x55585c, roughness: 0.7, metalness: 0.4 }));
  tray.position.set(mid.x, y + height, mid.z);
  tray.rotation.y = ang;
  scene.add(tray);
  const n = Math.max(2, Math.round(len / 9));
  for(let i = 0; i <= n; i++){
    const t = i / n;
    cyl(scene, 0.06, height, x0 + (x1 - x0) * t, y + height / 2, z0 + (z1 - z0) * t, MATERIALS.steel());
  }
}

/** Guard rail along the drop, which is the only thing between the road and it. */
function guardRail(scene, x, z0, z1, y){
  const n = Math.max(2, Math.round(Math.abs(z1 - z0) / 6));
  for(let i = 0; i <= n; i++){
    const z = z0 + (z1 - z0) * (i / n);
    cyl(scene, 0.07, 1.05, x, y + 0.52, z, MATERIALS.steel());
  }
  const len = Math.abs(z1 - z0);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, len),
    new THREE.MeshStandardMaterial({ color: 0x8c9095, roughness: 0.5, metalness: 0.6 }));
  rail.position.set(x, y + 1.0, (z0 + z1) / 2);
  scene.add(rail);
}

// ================================================== making the night readable
//
// Everything from here to `decorate` exists because this campaign is played
// between 19:00 and 07:00 and the engine lights a night scene with an ambient
// term, a hemisphere term and nothing else — the sun is switched off below a
// day blend of 0.005, so there is no key light and no shadow anywhere on the
// range. What a player can see at 1 a.m. is therefore exactly what emits, plus
// whatever the ambient wash lifts off the scree. The buildings emitted nothing.

/** How the interior of a working building spills out of its windows. */
const WARM_GLASS = new THREE.MeshStandardMaterial({
  color: 0x14110c, emissive: 0x9a7442, emissiveIntensity: 1.2, roughness: 0.45, metalness: 0 });
/**
 * The same thing in a room that is preserving somebody's night vision. Every
 * control room on an optical site is lit red, which is why this range looks
 * like nowhere else in the set — and why the brightness knob here is the
 * emissive COLOUR and not the intensity: `outdoorTown.updateTimeOfDay` walks
 * `lightPanels` and overwrites `emissiveIntensity` on every one of them with
 * `0.35 + 0.85 * night`, so an intensity set here lasts until the next tick.
 */
const RED_GLASS = new THREE.MeshStandardMaterial({
  color: 0x120705, emissive: 0x8c2b18, emissiveIntensity: 1.2, roughness: 0.45, metalness: 0 });
/** A lamp over a door, which is how you find a door on a mountain at night. */
const DOOR_LAMP = new THREE.MeshStandardMaterial({
  color: 0x2a0a06, emissive: 0xe0451f, emissiveIntensity: 1.2, roughness: 0.4 });
/** The patch of ground a lamp actually reaches. Painted, because it cannot be lit. */
const LAMP_POOL = new THREE.MeshStandardMaterial({
  color: 0x0d0b09, emissive: 0x4a2010, emissiveIntensity: 1.0, roughness: 1,
  transparent: true, opacity: 0.85, depthWrite: false });

/**
 * Which of the two the building's windows are, by site id. A room somebody
 * reads a screen in is red; a room somebody writes in is warm. `false` is a
 * building with no lit windows at all: the crew quarters have blackout blinds
 * — it says so on the site plan — and the maser hut has no windows to light.
 */
const WINDOW_LIGHT = {
  DISC: 'red', CHAR: 'red', RADAR: 'red', ORBIT: 'red',
  OPS: 'warm', IMPACT: 'warm', BOARD: 'warm', ARCHIVE: 'warm', TOWN: 'warm',
  DORM: false, TIME: false,
};

/**
 * Light the windows of one building from outside it.
 *
 * `kit.building` gives a flat roof a continuous glass band and a gabled one
 * punched `litWindow` panes. Neither emits: the panes start at
 * `emissiveIntensity: 0`, and the one function that raises them —
 * `kit.setWindowGlow` — is exported and called by nothing in the engine. On a
 * daytime game that is invisible. Here it meant that every building on the
 * saddle was a dark grey box standing on dark grey scree, and the only way to
 * find the Coordination Office was the waypoint ring.
 *
 * So: emissive quads a hand's width proud of the glass, in a group carrying the
 * building's own placement, and a lamp under the door canopy. No real lights —
 * the ceiling is six and the sun rig has three.
 */
function litFacade(scene, b, baseY){
  const kind = WINDOW_LIGHT[b.id] ?? 'warm';
  const g = new THREE.Group();
  g.position.set(b.x, baseY, b.z);
  g.rotation.y = b.facing ?? 0;
  scene.add(g);

  // `kit.building` puts the slab top at 0.35 with no plinth, and none of these
  // buildings asks for one. Read from the same numbers the builder uses: a
  // second description of where a window band sits is a band that slides off
  // the wall the first time either is corrected.
  const floorY = 0.35, h = b.h ?? 6.2, w = b.w, d = b.d;
  const doorW = 2.2, doorH = 2.6;
  const gabled = (b.roof ?? 'flat') === 'gable';

  if(kind){
    const mat = kind === 'red' ? RED_GLASS : WARM_GLASS;
    // Plane geometry faces its own +z, so the -z wall's pane is turned to face
    // out. A window seen from behind is a window lighting the inside of a wall.
    const pane = (wide, tall, x, yy, z, rot) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(wide, tall), mat);
      m.position.set(x, yy, z);
      m.rotation.y = rot;
      g.add(m);
    };
    if(gabled){
      // Punched openings, on the builder's own pitch — and not every one of
      // them, because a building with every window lit is a hotel.
      const winY = floorY + h * 0.56;
      const count = Math.max(2, Math.min(6, Math.floor(w / 3.4)));
      const pitchX = (w * 0.78) / count;
      for(const face of [1, -1]){
        for(let i = 0; i < count; i++){
          const px = (i - (count - 1) / 2) * pitchX;
          if(face === 1 && Math.abs(px) < doorW * 0.8) continue;   // the doorway
          if((i + (face < 0 ? 1 : 0)) % 3 === 2) continue;         // an empty room
          pane(0.92, 1.14, px, winY, face * (d / 2 + 0.09), face === 1 ? 0 : Math.PI);
        }
      }
    } else {
      // The glass band, lit. Long sides only: the two short returns are a
      // twelve-centimetre strip and lighting them turned the building into a
      // lantern with a bright outline instead of two lit walls.
      const bandY = floorY + h * 0.62;
      for(const s of [1, -1]){
        pane(w * 0.78, 1.24, 0, bandY, s * (d / 2 + 0.09), s > 0 ? 0 : Math.PI);
      }
    }
  }

  // The door lamp, under the canopy `kit.building` hangs at doorH + 0.45. Every
  // building gets one, including the two whose windows are dark: the point of
  // it is that a door is findable, and the blackout blinds are the reason the
  // crew quarters need one most.
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), DOOR_LAMP);
  lamp.position.set(0, floorY + doorH + 0.28, d / 2 + 0.55);
  g.add(lamp);
  return g;
}

/**
 * The circle of ground a lamp reaches, as paint.
 *
 * The single most useful object in this file. Emissive geometry is visible at
 * night but it lights nothing, so a range full of lamps still had a black floor
 * and the road was findable only by the snow poles beside it. A dim emissive
 * disc lying on the ground under each lamp is the whole of what a light would
 * have done that matters here, at no cost against the six-light ceiling.
 */
function lampPool(scene, gh, x, z, r = 4.6){
  // Draped over the terrain, not laid on it. A flat disc six metres across on
  // ground that undulates by more than the six centimetres it was floating is a
  // disc half buried at one edge and hovering at the other — and this ridge
  // undulates. The circle is built in its own plane and every vertex is then
  // lifted to the height of the ground beneath it, which is the same
  // `groundHeight` everything else on the range is placed from: a second
  // opinion about where the floor is would be house rule 4 all over again.
  const geo = new THREE.CircleGeometry(r, 28);
  const p = geo.attributes.position;
  const base = gh(x, z);
  for(let i = 0; i < p.count; i++){
    const px = p.getX(i), py = p.getY(i);
    p.setXYZ(i, px, gh(x + px, z - py) - base + 0.06, -py);
  }
  p.needsUpdate = true;
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, LAMP_POOL);
  m.position.set(x, base, z);
  m.renderOrder = 1;
  m.userData.ignoreAudit = true;
  scene.add(m);
  return m;
}

/**
 * The Milky Way, as a band around a great circle.
 *
 * `atmosphere.stars` already scatters 4,200 points on a shell at 92% of the sky
 * scale, and on a 2,800 m range under a hidden sky dome that is a good black
 * sky with dots on it — which is a planetarium, not a mountain. What a dark
 * site actually looks like is one bright textured band from horizon to horizon
 * with everything else faint around it, and that band is the reason an
 * observatory is on a mountain in the first place.
 *
 * Built as a sphere band rather than a plane: a plane across the zenith is
 * right from one bearing and a rectangle in the sky from every other. It stands
 * at 900, just outside the star shell (`atmosphere.scale × 0.92` = 874) and
 * drawn BEFORE it — `renderOrder` −21 against the star field's −20 — because
 * nothing up there writes depth, so which of the two is in front is decided by
 * draw order alone and the stars have to be the ones in front.
 *
 * Both of them are centred on the ORIGIN and neither follows the eye, so on a
 * range whose `playerLimit` is 1300 the player walks outside the sky at the two
 * summits. That is an engine limit, not a theme one, and it cannot be bought
 * off by scaling the dome up: `updateSky` bakes the IBL with
 * `pmrem.fromScene(envScene, 0, 1, 900)`, and a dome whose corners pass 900 m
 * is a dome with black wedges baked into the scene's environment.
 *
 * `fog: false`, because a band at 900 m under night fog is a band that is not
 * there; `depthWrite: false` so nothing sorts against it; and it fades on the
 * same curve the star field does, read off the hemisphere light rather than
 * from a clock the props layer has no business knowing about.
 */
function milkyWay(scene, { radius = 900, halfWidth = 0.34, tilt = 0.95, bearing = Math.PI / 4 } = {}){
  // The checks run `decorate` in plain node to collect colliders, so there is no
  // document. A missing band there is correct; a thrown error would make
  // `reachable` skip the whole theme and report nothing at all.
  if(typeof document === 'undefined') return null;
  const W = 1024, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  if(!g) return null;
  g.clearRect(0, 0, W, H);

  // A seeded scatter of soft blobs along the centre line: bright and tight in
  // the middle, wide and faint at the edges. Seeded because a sky that is a
  // different sky on every reload is a sky nobody can be told to look at.
  let seed = 20261;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
  g.globalCompositeOperation = 'lighter';
  for(let i = 0; i < 520; i++){
    const u = rnd();
    const x = u * W;
    // Thickness varies along the band, so it has a bulge and a thin end.
    const thick = 0.18 + 0.30 * (0.5 + 0.5 * Math.sin(u * Math.PI * 2 + 0.6));
    const y = H / 2 + (rnd() + rnd() + rnd() - 1.5) * H * thick;
    const r = 12 + rnd() * 74;
    const a = 0.030 + rnd() * 0.055;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(214,226,255,${a})`);
    grad.addColorStop(1, 'rgba(214,226,255,0)');
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // The dust lanes. Without them the band is a smear; with them it is the
  // Milky Way, because the dark split down the middle is the part everybody
  // recognises.
  g.globalCompositeOperation = 'destination-out';
  for(let i = 0; i < 90; i++){
    const x = rnd() * W;
    const y = H / 2 + (rnd() - 0.5) * H * 0.34;
    const r = 10 + rnd() * 52;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(0,0,0,${0.25 + rnd() * 0.45})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: 0.62, depthWrite: false,
    side: THREE.BackSide, fog: false, toneMapped: true });
  const band = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 64, 20, 0, Math.PI * 2,
      Math.PI / 2 - halfWidth, halfWidth * 2), mat);
  // Tilt first, then swing the crossing points round to the bearing the valley
  // opens on — the one direction on this range where the sky reaches the
  // horizon, and the direction the survey telescope spends its night pointing.
  band.rotation.set(0, bearing, tilt);
  band.frustumCulled = false;
  band.renderOrder = -21;
  band.userData.ignoreAudit = true;
  scene.add(band);

  // Fade with the dawn, on the star field's own curve. The props layer has no
  // clock, so the day blend is read back off the hemisphere light the sun rig
  // rewrites every tick — the one number in the scene that means "how much
  // daylight is there", and the same one the stars are faded by.
  const base = 0.62;
  animate(() => {
    const hemi = scene.userData.hemi;
    const b = hemi?.userData?.base
      ? Math.max(0, Math.min(1, (hemi.intensity / hemi.userData.base - 0.10) / 0.90))
      : 0;
    mat.opacity = Math.max(0, 1 - b * 1.6) * base;
    band.visible = mat.opacity > 0.01;
  });
  return band;
}

/**
 * Called by engine/world/outdoorTown.js once the ground, buildings and street
 * furniture exist.
 */

// --------------------------------------------------------------- landing pads
/**
 * A pad: a painted circle, a ring of low blue lights, and a white strobe on a
 * mast beside it. The strobe is the only thing on this range visible from the
 * next summit, so it is what the player navigates by.
 *
 * Nothing here is a real light. Six point lights is the engine's ceiling and
 * the sun rig takes three; these are emissive discs, which read as lights at
 * night and cost nothing.
 */
function helipad(scene, x, z, y, { r = 11 } = {}){
  const g = new THREE.Group();
  g.position.set(x, y + 0.02, z);
  scene.add(g);

  const deck = new THREE.Mesh(new THREE.CircleGeometry(r, 40),
    new THREE.MeshStandardMaterial({ color: 0x1e2126, roughness: 0.95 }));
  deck.rotation.x = -Math.PI / 2;
  deck.receiveShadow = true;
  g.add(deck);

  // The H, in paint that has been rained on for years.
  const paint = new THREE.MeshStandardMaterial({ color: 0xb9bec4, roughness: 0.85,
    emissive: 0x2a2f36, emissiveIntensity: 0.35 });
  const bar = (w, d, ox) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), paint);
    m.rotation.x = -Math.PI / 2;
    m.position.set(ox, 0.03, 0);
    g.add(m);
  };
  bar(0.9, r * 0.85, -r * 0.28);
  bar(0.9, r * 0.85, r * 0.28);
  const cross = new THREE.Mesh(new THREE.PlaneGeometry(r * 0.56, 0.9), paint);
  cross.rotation.x = -Math.PI / 2;
  cross.position.y = 0.03;
  g.add(cross);

  // Perimeter lights. Blue, low, and close together — they only resolve from
  // inside a couple of hundred metres, which is what makes the final approach
  // feel like an approach.
  const lamp = new THREE.MeshStandardMaterial({ color: 0x1b2b46, emissive: 0x2f6fd0,
    emissiveIntensity: 2.4, roughness: 0.5 });
  const lamps = [];
  for(let i = 0; i < 16; i++){
    const a = (i / 16) * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), lamp);
    m.position.set(Math.cos(a) * (r + 0.9), 0.24, Math.sin(a) * (r + 0.9));
    g.add(m);
    lamps.push(m);
  }

  // The strobe, on a mast clear of the rotor disc.
  // `post` takes its height, radius and colour POSITIONALLY. Called with an
  // options object it read the object as the height, built a cylinder of NaN
  // length, and three.js logged "Computed radius is NaN" once per pad — five
  // masts that were never drawn and five soft colliders that never existed.
  const mast = post(scene, x + r + 3.4, z, y, 7.5, 0.13, 0x33373d);
  const strobeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff,
    emissiveIntensity: 3.2, roughness: 0.3 });
  const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), strobeMat);
  strobe.position.set(x + r + 3.4, y + 7.7, z);
  strobe.userData.ignoreAudit = true;
  scene.add(strobe);

  // `post` returns the soft collider itself — {x, z, r} — not a wrapper with a
  // `soft` field, so the old `mast?.soft` was always undefined.
  return { group: g, strobe: strobeMat, lamps: lamp, soft: mast };
}

// ---------------------------------------------------------------- the aircraft
/**
 * A light utility helicopter. Modelled nose-along -z, which is the direction
 * `flying.js` flies, so no wrapper is needed.
 */
function helicopter(scene, x, z, y, { facing = 0 } = {}){
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);

  const shell = new THREE.MeshStandardMaterial({ color: 0x2c3742, roughness: 0.55, metalness: 0.35 });
  const trim = new THREE.MeshStandardMaterial({ color: 0xb4552a, roughness: 0.6 });

  // Cabin: a rounded body with the nose down the -z axis.
  const cabin = new THREE.Mesh(new THREE.SphereGeometry(1.55, 16, 12), shell);
  cabin.scale.set(1.0, 0.92, 1.65);
  cabin.position.set(0, 1.75, -0.9);
  cabin.castShadow = true;
  g.add(cabin);

  // Glass, forward and low, so the pilot is looking down at the ground.
  const glass = new THREE.Mesh(new THREE.SphereGeometry(1.42, 14, 10,
    0, Math.PI * 2, 0, Math.PI * 0.55), MATERIALS.glass());
  glass.scale.set(0.98, 0.9, 1.2);
  glass.rotation.x = Math.PI * 0.92;
  glass.position.set(0, 1.62, -2.05);
  g.add(glass);

  // Tail boom and fin. `cyl` is (scene, r, h, x, y, z, material, rTop) — called
  // as (r, rTop, h, …) it took the *material* as the z and the taper radius as the
  // material, and built a cylinder with a NaN radius: three.js logged "Computed
  // radius is NaN" and the boom and both skid rails were never drawn.
  const boom = cyl(g, 0.30, 5.4, 0, 2.05, 2.9, shell, 0.18);
  if(boom) boom.rotation.x = Math.PI / 2;
  box(g, 0.12, 1.5, 0.9, 0, 2.7, 5.2, trim);

  // Skids.
  for(const sx of [-1.15, 1.15]){
    const rail = cyl(g, 0.09, 4.4, sx, 0.22, -0.6, shell);
    if(rail) rail.rotation.x = Math.PI / 2;
    box(g, 0.12, 0.9, 0.12, sx, 0.7, -1.9, shell);
    box(g, 0.12, 0.9, 0.12, sx, 0.7, 0.7, shell);
  }

  // Rotors. Thin plates rather than blades: at 26 rad/s nobody sees geometry.
  const mainRotor = new THREE.Group();
  mainRotor.position.set(0, 3.35, -0.6);
  for(let i = 0; i < 4; i++){
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 9.2), shell);
    blade.rotation.y = (i / 4) * Math.PI * 2;
    mainRotor.add(blade);
  }
  g.add(mainRotor);
  const tailRotor = new THREE.Group();
  tailRotor.position.set(0.42, 2.7, 5.2);
  for(let i = 0; i < 3; i++){
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.9, 0.22), shell);
    blade.rotation.x = (i / 3) * Math.PI * 2;
    tailRotor.add(blade);
  }
  g.add(tailRotor);

  // Landing light: a cone of emissive geometry under the nose, switched on by
  // `flying.js` when somebody climbs in. Not a real light — the engine's budget
  // is six and the sun rig has three of them.
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xffe9c4, transparent: true,
    opacity: 0.14, depthWrite: false });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(7.5, 26, 14, 1, true), beamMat);
  beam.position.set(0, 1.2, -9);
  beam.rotation.x = -Math.PI / 2.35;
  beam.visible = false;
  beam.userData.ignoreAudit = true;
  g.add(beam);

  // Anti-collision light on the belly, always on: it is how you find the
  // machine again on a dark pad.
  const acl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0x3a0d0d, emissive: 0xd8261f, emissiveIntensity: 3.0 }));
  acl.position.set(0, 0.62, 0.4);
  g.add(acl);

  // Everything, not just the shell. The pilot's eye is inside a machine five
  // metres long: with only the cabin hidden the view was still a black disc
  // (the landing-light cone, seen from inside its own base) with the rotor and
  // the skids across the bottom of it. From the seat you see the world; from
  // outside, on the pad, you see the helicopter.
  const body = [];
  g.traverse(o => { if(o.isMesh && o !== beam) body.push(o); });
  return { group: g, rotors: { main: mainRotor, tail: tailRotor }, light: beam,
    shell: [...body, beam] };
}

export function decorate(scene, ctx){
  const { groundHeight, softColliders, lightPanels, colliders, interactables } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels.push(m); };

  // ------------------------------------------------------------ the domes
  // Each on its own summit, thirteen hundred metres apart, which is the whole
  // reason this site is shaped the way it is: two optical instruments that can
  // see each other's lights are two instruments working at half sensitivity.
  // These coordinates are DISC and CHAR in site.js. Move a dome there and it has
  // to move here, or the shell and the shutter part company.
  const d1 = dome(scene, -725, -620, y(-725, -620) + 7.0, 12.5, { facing: Math.PI * 0.15 });
  const d2 = dome(scene, 590, -510, y(590, -510) + 6.0, 9.5, { facing: -Math.PI * 0.2 });
  soft(d1.soft); soft(d2.soft);
  glow(d1.glow?.material ? d1.glow : null);
  glow(d2.glow?.material ? d2.glow : null);
  // Both are observing tonight, and they are the two objects on this range a
  // player looks at from a kilometre away. Different periods and phases, or
  // two domes a kilometre apart turn in lockstep and read as one mechanism.
  slew(d1.shutter, 3.6, 58);
  slew(d2.shutter, 2.8, 74, 1.9);

  // ------------------------------------------------------------- the dish
  // Out on the basin floor, thirty metres of it, sweeping slowly in azimuth —
  // a planetary radar tracking something that is moving relative to the stars.
  // `soft` used to be handed the whole return value rather than its `soft`
  // field, so the pushed collider was `{ soft: {x,z,r} }`: every reader looks
  // for `.x`, `.z` and `.r`, found undefined, and thirty metres of dish had no
  // collider at all.
  const radar = dish(scene, -965, 350, y(-965, 350), 15);
  soft(radar.soft);
  animate(sway(radar.azimuth, 'y', 0.34, (Math.PI * 2) / 130));

  // ------------------------------------------------------- the sky itself
  // The band the whole site exists to look at.
  milkyWay(scene);

  // -------------------------------------------------- base camp lighting
  // Red, dim, and only where people walk at night. Nothing on this range
  // spills light upward if it can be helped.
  for(let i = 0; i < 6; i++){
    const z = 96 - i * 40;
    const x = i % 2 ? 8 : -8;
    const l = redLamp(scene, x, z, y(x, z));
    soft(l.soft); glow(l.glow);
    // A service lamp on a long cable breathes a little. Barely; it is the
    // difference between a lamp and a painted dot.
    animate(flicker(l.glow.material, 1.6, 0.08, 2.3, i * 1.1));
    // And the piece of road it reaches. Six lamps down one road with no pools
    // under them is six red dots in the air over an invisible surface — which
    // is what the road was.
    lampPool(scene, groundHeight, x, z, 6.4);
  }

  // ------------------------------------------------------- lit buildings
  // Every building on the range, its windows lit and a lamp over its door.
  // See `litFacade`: nothing in the engine ever raises `kit`'s window panes, so
  // without this the saddle is eight unlit boxes on unlit scree at 1 a.m.
  for(const b of site.buildings ?? []){
    litFacade(scene, b, y(b.x, b.z));
    // The apron outside a door somebody walks up to in the dark. Base camp and
    // Valle Seco only — a pool under a door 950 m up a mountain is four
    // triangles nobody is ever within sight of.
    const near = Math.hypot(b.x, b.z) < 220 || Math.hypot(b.x - 120, b.z - 790) < 120;
    if(near){
      const f = b.facing ?? 0;
      const px = b.x + Math.sin(f) * (b.d / 2 + 2.4);
      const pz = b.z + Math.cos(f) * (b.d / 2 + 2.4);
      lampPool(scene, groundHeight, px, pz, 3.6);
    }
  }
  // FOUR entries, not two hundred. `updateTimeOfDay` walks this list on every
  // tick it runs and writes the same number into each one, so an entry per pane
  // would have it touching every window on the range to say one thing four
  // times. The loop only ever reads `p.material`, so a plain holder is a legal
  // member of it, and one holder raises every surface sharing that material.
  lightPanels.push({ material: WARM_GLASS }, { material: RED_GLASS },
    { material: DOOR_LAMP }, { material: LAMP_POOL });

  // ================================================== the ridge, past the fence
  //
  // A night site is the cheapest place in the repo to buy apparent size: at
  // night you only need lights at the right distances, and every one of these is
  // an emissive material. The six-light ceiling is untouched by all of it.

  // -------------------------------------------- the observatory on the next ridge
  // Beyond the player's 1300 m bound, on ground raised for it, with the shutter
  // open. Real ridges carry several observatories, and an unreachable working
  // dome at two kilometres says this facility is one of a set rather than the
  // only building in the world. The slit is the whole trick — a bright thin
  // vertical at that range reads instantly as a telescope that is observing.
  {
    const fx = -1980, fz = -1520;
    const fy = y(fx, fz);
    const far = dome(scene, fx, fz, fy + 9, 17, { facing: Math.PI * 0.42 });
    // Its shutter, lit from inside: not `glow`-registered, because a light panel
    // this far out contributes nothing and the list is walked every frame.
    const slitMat = new THREE.MeshStandardMaterial({
      color: 0x22303c, emissive: 0x9fc4e8, emissiveIntensity: 1.15, roughness: 0.6 });
    box(scene, 2.6, 20, 0.5, fx + 12.5, fy + 20, fz - 6.0, slitMat, Math.PI * 0.42);
    // It is observing too. Slower and wider than ours: at two kilometres only a
    // big slew reads at all, and a dome that never moves beside two that do
    // reads as a photograph of a dome.
    slew(far.shutter, 6.0, 96, 3.1);
  }

  // ------------------------------------------------- the road up, from below
  // Two headlights on the switchbacks a long way down. Nothing moves on this
  // range at night except the crew coming up, and it implies the valley, the
  // drive and other people for four emissive quads.
  {
    const hl = new THREE.MeshStandardMaterial({
      color: 0xfff4d8, emissive: 0xfff4d8, emissiveIntensity: 2.8, roughness: 0.4 });
    const spill = new THREE.MeshStandardMaterial({
      color: 0x6a6250, emissive: 0xd8c08a, emissiveIntensity: 0.6, roughness: 0.9 });
    const hx = 520, hz = 1180, hy = y(hx, hz);
    for(const dx of [-0.9, 0.9]) box(scene, 0.55, 0.4, 0.2, hx + dx, hy + 1.1, hz, hl, -0.5);
    // The cone it throws on the road ahead, as a flat lit patch.
    box(scene, 7, 0.06, 20, hx + 3.5, hy + 0.08, hz - 9, spill, -0.5);
  }

  // ------------------------------------------------------- Valle Seco, below
  // The town the whole campaign is defending, visible from the ridge as a field
  // of window lights on the valley floor. Depth and stakes in one object.
  {
    const town = new THREE.Group();
    // EIGHT materials, not two.
    //
    // A town seen across a kilometre and a half of cold air does not sit still;
    // it shimmers, and the shimmer is most of what says the lights are far
    // away rather than small. But a flicker on one shared material makes every
    // window in the valley breathe on the same beat, which is a pulsing
    // rectangle and reads as a bug. Eight materials on eight phases is enough
    // that no two neighbours agree and cheap enough that the town is still
    // ninety-six quads.
    const tints = [];
    for(let k = 0; k < 8; k++){
      const isStreet = k === 3;      // one lane of cold sodium-white among the warm
      const m = new THREE.MeshStandardMaterial({
        color: isStreet ? 0xd8e4ff : 0xffe6b0,
        emissive: isStreet ? 0xbcd0ff : 0xffd890,
        emissiveIntensity: isStreet ? 1.2 : 1.5, roughness: 0.7 });
      // Depth is small on purpose: this is air, not a failing bulb.
      animate(flicker(m, isStreet ? 1.2 : 1.5, 0.11, 0.9 + k * 0.23, k * 0.87));
      tints.push(m);
    }
    // A grid, jittered, so it reads as streets rather than a texture.
    for(let i = 0; i < 96; i++){
      const gx = (i % 12) * 26 + ((i * 37) % 11) - 150;
      const gz = Math.floor(i / 12) * 24 + ((i * 53) % 9);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), tints[(i * 5) % 8]);
      m.rotation.x = -Math.PI / 2;
      m.position.set(gx, 0.4, gz);
      town.add(m);
    }
    town.position.set(150, y(150, 1560), 1560);
    scene.add(town);
  }

  // --------------------------------------------------- the microwave relay mast
  // How the ridge's data got off the mountain before fibre. Vertical, rhythmic,
  // and the aircraft-warning strobes read from anywhere on the site — which is
  // what makes it a wayfinding landmark as well as scenery.
  {
    const mx = 96, mz = -96, mY = y(mx, mz);
    for(let i = 0; i < 4; i++){       // lattice, tapering
      const s = 1 - i * 0.18;
      for(const [ox, oz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
        cyl(scene, 0.09, 11, mx + ox * 1.5 * s, mY + 5.5 + i * 11, mz + oz * 1.5 * s,
          MATERIALS.steel());
      }
      box(scene, 3.0 * s, 0.08, 0.08, mx, mY + 11 + i * 11, mz - 1.5 * s, MATERIALS.steel());
      box(scene, 0.08, 0.08, 3.0 * s, mx + 1.5 * s, mY + 11 + i * 11, mz, MATERIALS.steel());
    }
    // Two drum antennas near the top, facing off-ridge.
    for(const [dy, ang] of [[30, 0.4], [37, -1.2]]){
      const drumMat = MATERIALS.panel();
      cyl(scene, 1.5, 1.6, mx + Math.sin(ang) * 2.2, mY + dy, mz + Math.cos(ang) * 2.2, drumMat, 1.5);
    }
    const strobe = new THREE.MeshStandardMaterial({
      color: 0xff3a24, emissive: 0xff3a24, emissiveIntensity: 3.0, roughness: 0.3 });
    // Aviation strobes blink. Three constant red spheres on a mast were a
    // decoration; three that flash together are a warning, and a landmark from
    // the next summit.
    animate(blink(strobe, 1.5, 0.14, { on: 3.4, off: 0.22 }));
    for(const dy of [22, 33, 45]){
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), strobe);
      s.position.set(mx, mY + dy, mz);
      scene.add(s);
      glow(s);
    }
    soft({ x: mx, z: mz, r: 3.0 });
  }

  // ---------------------------------------- the time and frequency standards
  // `TIME` is an area of study with no physical presence on the ridge, which is
  // odd for the group whose whole subject is a thing you can point at. A GPS
  // choke-ring monument on a concrete pier and a windowless maser hut are what
  // that group actually looks like: small, quiet, obviously precise.
  {
    const tx = 66, tz = 24;                 // beside the TIME building
    const pierX = tx + 13, pierZ = tz - 9;
    const pY = y(pierX, pierZ);
    cyl(scene, 0.55, 2.2, pierX, pY + 1.1, pierZ, MATERIALS.concrete());
    cyl(scene, 0.95, 0.16, pierX, pY + 2.3, pierZ, MATERIALS.paintedSteel(0xd8d3c8));
    cyl(scene, 0.42, 0.34, pierX, pY + 2.55, pierZ, MATERIALS.panel(), 0.30);
    soft({ x: pierX, z: pierZ, r: 1.1 });
    // The hut: no windows, one door, a conduit to the pier. A maser lives in a
    // box with a very boring temperature.
    const hx = tx + 20, hz = tz + 2, hY = y(hx, hz);
    box(scene, 5.0, 2.8, 4.2, hx, hY + 1.4, hz, MATERIALS.concrete());
    box(scene, 5.4, 0.28, 4.6, hx, hY + 2.9, hz, MATERIALS.paintedSteel(0x55585c));
    box(scene, 0.9, 2.0, 0.12, hx - 2.55, hY + 1.0, hz, MATERIALS.paintedSteel(0x3d4348));
    box(scene, 0.14, 0.14, 9.0, hx - 2.0, hY + 0.2, hz - 5.5, MATERIALS.steel());
    soft({ x: hx, z: hz, r: 3.6 });
  }

  // ------------------------------------------------- the dome nobody uses now
  // Observatories keep their old buildings. A smaller dome with its shutter
  // seized shut, used as a store, puts some history on the saddle — and a dark
  // dome is what makes the working ones read as working.
  {
    const ox = -118, oz = 34, oY = y(ox, oz);
    const old = dome(scene, ox, oz, oY + 3.2, 5.4, { facing: Math.PI * 0.8 });
    soft(old.soft);
    // Crates against it, and the shutter track rusted over rather than open.
    box(scene, 1.1, 3.6, 0.28, ox + 5.2, oY + 6.4, oz + 1.2, MATERIALS.paintedSteel(0x6b4a36));
    for(const [cx2, cz2] of [[ox + 7, oz - 4], [ox + 9, oz - 4], [ox + 7, oz - 6]]){
      box(scene, 1.6, 1.2, 1.4, cx2, y(cx2, cz2) + 0.6, cz2, MATERIALS.paintedSteel(0x5f5a4e));
      soft({ x: cx2, z: cz2, r: 1.2 });
    }
  }

  // --------------------------------------------- the snow line and the road up
  // Two things that say "this is a mountain top" rather than "this is a hill":
  // snow that starts at a height and stops, and the one road in, switchbacking
  // out of the valley the horizon now opens toward. The headlights further down
  // this file are on this road; until now the road was not there.
  {
    const snow = new THREE.MeshStandardMaterial({ color: 0x8f9aa4, roughness: 1, metalness: 0 });
    // Patches on the north slope, all above the same contour, thinning upward.
    for(let i = 0; i < 26; i++){
      const a = -Math.PI * 0.85 + (i / 26) * Math.PI * 0.7;
      const r = 240 + (i % 5) * 26;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const gy = y(x, z);
      if(gy < 6) continue;                       // the contour: nothing low down
      box(scene, 16 + (i % 4) * 9, 0.35, 11 + (i % 3) * 7, x, gy + 0.2, z, snow, a);
    }
    // The road: a pale scar in six switchback legs, dropping south-east.
    const legs = 6;
    for(let i = 0; i < legs; i++){
      const t = i / (legs - 1);
      const x = 90 + t * 150;
      const z = 120 + t * 210;
      const gy = y(x, z);
      box(scene, 62 - t * 10, 0.3, 7, x, gy + 0.16, z,
        MATERIALS.paintedSteel(0x5a544c), (i % 2 ? 1 : -1) * 0.5);
    }
  }

  // ------------------------------------------- weather mast and the snow poles
  // Observing is weather-gated — the syllabus lists observing constraints as a
  // method concept — and the poles draw the eye along the road, which is what
  // makes a road feel long.
  {
    const wx = -44, wz = -8, wY = y(wx, wz);
    cyl(scene, 0.13, 10, wx, wY + 5, wz, MATERIALS.steel());
    // Anemometer cups and a vane, small but unmistakable in silhouette.
    for(const a of [0, 2.09, 4.19]){
      const cxp = wx + Math.sin(a) * 0.62, czp = wz + Math.cos(a) * 0.62;
      cyl(scene, 0.16, 0.14, cxp, wY + 10.2, czp, MATERIALS.paintedSteel(0xd8d3c8));
      box(scene, 0.62, 0.04, 0.04, (wx + cxp) / 2, wY + 10.2, (wz + czp) / 2,
        MATERIALS.steel(), a);
    }
    box(scene, 0.06, 0.5, 1.1, wx, wY + 9.3, wz - 0.6, MATERIALS.paintedSteel(0xd8d3c8));
    soft({ x: wx, z: wz, r: 0.8 });
    // Snow poles: banded, at the road edge, out to where the road leaves the site.
    for(let i = 0; i < 22; i++){
      const px = 26, pz = -34 + i * 12;
      const pyy = y(px, pz);
      cyl(scene, 0.07, 2.4, px, pyy + 1.2, pz, MATERIALS.paintedSteel(0xd9d4c6));
      box(scene, 0.16, 0.3, 0.16, px, pyy + 2.15, pz, MATERIALS.paintedSteel(0xd8321c));
    }
  }

  // -------------------------------------------- fuel, gabions and the cattle guard
  // The infrastructure that says somebody maintains this road. Diesel for the
  // generators, rock-fall baskets where the cut is steepest, and a cattle guard
  // at the boundary because this ridge is grazed below the gate.
  {
    const fx2 = -96, fz2 = 74, fY = y(fx2, fz2);
    for(const dx of [0, 6.4]){
      cyl(scene, 2.4, 5.0, fx2 + dx, fY + 2.5, fz2, MATERIALS.panel(), 2.4);
      soft({ x: fx2 + dx, z: fz2, r: 2.8 });
    }
    box(scene, 16, 0.4, 10, fx2 + 3.2, fY + 0.2, fz2, MATERIALS.concrete());   // bund
    box(scene, 16, 0.9, 0.5, fx2 + 3.2, fY + 0.45, fz2 - 5.0, MATERIALS.concrete());
    box(scene, 16, 0.9, 0.5, fx2 + 3.2, fY + 0.45, fz2 + 5.0, MATERIALS.concrete());
    // Gabions: stacked wire baskets, stepped back, along the uphill cut.
    for(let i = 0; i < 9; i++){
      const gx2 = 44 + i * 3.1, gz2 = 96;
      const gY2 = y(gx2, gz2);
      for(let k = 0; k < 3 - (i % 2); k++){
        box(scene, 3.0, 1.0, 1.6, gx2, gY2 + 0.5 + k * 1.02, gz2 + k * 0.5,
          MATERIALS.paintedSteel(0x6e6a5f));
      }
      soft({ x: gx2, z: gz2, r: 1.8 });
    }
    // The cattle guard, in the road at the boundary: rails across a pit.
    const cgY = y(26, 150);
    box(scene, 9, 0.4, 4.2, 26, cgY - 0.2, 150, MATERIALS.concrete());
    for(let i = 0; i < 13; i++){
      box(scene, 8.6, 0.12, 0.12, 26, cgY + 0.24, 148.2 + i * 0.3, MATERIALS.steel());
    }
  }

  // ------------------------------------------------------- infrastructure
  cableTray(scene, -22, -30, -22, 60, y(-22, 20));
  cableTray(scene, 24, -40, 24, 30, y(24, 0));
  guardRail(scene, 22, -30, 90, y(22, 20));

  // --------------------------------------------------------- landing pads
  // One per site, lit. These are the navigation system: the strobes are
  // visible from the next summit and nothing else out there is.
  for(const p of PADS){
    const pad = helipad(scene, p.x, p.z, y(p.x, p.z), { r: p.r });
    glow(pad.strobe); glow(pad.lamps);
    soft(pad.soft);
    // Each pad's strobe on its own phase, so five sites never flash as one.
    animate(blink(pad.strobe, 1.0, 0.07, { on: 3.6, off: 0.12, phase: (p.x + p.z) * 0.013 }));
  }

  // --------------------------------------------------------- the site truck
  // The aircraft is not signed out until the fourth phase (`aircraftFromDay` in
  // theme.js), and the first phase already sends the player to Cerro Alto — so
  // there has to be a way across the range on the ground. There is no graded road
  // up either summit; this is a four-wheel-drive on scree, which is what the
  // people who work here actually use, and it stays useful after the aircraft
  // arrives because a 900-metre hop is not worth spinning up a rotor for.
  //
  // Parked on the road shoulder fifteen metres from the spawn — in view on the
  // first frame, because a vehicle the player has to go looking for is a vehicle
  // they walk the range without. Not closer: a prop within ten metres of the
  // spawn is how a player ends up welded in place.
  // West side of the road, not east: the campaign status board stands at (8, 62)
  // and a truck parked behind it is a truck the player never sees.
  const truck = vehicle(scene, -14, 46, y(-14, 46), { facing: 0, colour: 0x8a5a2c, box: false });
  driveable(scene, truck.group, {
    id: 'site-truck',
    label: 'site truck', kind: 'truck',
    halfWidth: 1.25, halfLength: 2.9, height: 3.0,
    // In the cab, on the left, looking out over the bonnet — not behind the load,
    // which puts the whole vehicle between the driver and the road.
    seat: { x: 0.52, y: 2.18, z: truck.cabZ },
    wheels: truck.wheels,
    // Faster than the town trucks in the other games: this is a mountain range
    // and the shortest leg on it is 780 metres.
    topSpeed: 16,
    colliders, interactables,
  });

  // ----------------------------------------------------------- the aircraft
  // Parked on the base camp pad at the start of every shift. Without this the
  // five sites are five hours of walking, which is the version of this game
  // that existed before the range did.
  const home = PADS[0];
  const heli = helicopter(scene, home.x, home.z, y(home.x, home.z), { facing: Math.PI });
  const air = flyable(scene, heli.group, {
    id: 'survey-helicopter',
    label: 'survey helicopter', kind: 'helicopter',
    rotors: heli.rotors,
    light: heli.light,
    cockpitHide: heli.shell,
    // The eye goes in the nose, ahead of the cabin shell. At z = -1.5 the
    // camera sits inside that sphere and the whole view is the inside of the
    // fuselage: a black disc filling the screen, which is exactly what the
    // first flight looked like.
    seat: { x: 0, y: 1.78, z: -2.85 },
    halfWidth: 1.7, halfLength: 5.4, height: 3.6,
    cruise: 34, ceiling: 140,
    colliders, interactables,
  });

  // The rotor turning on the pad.
  //
  // `flying.js` OWNS the rotors while somebody is aboard: its `update` assigns
  // `rotors.main.rotation.y = spin` from its own accumulator every frame, and
  // an animator adding to the same property would be two writers on one value.
  // It is not a fight only because `update` returns immediately when nobody is
  // in the seat — so this defers to it explicitly rather than relying on which
  // of the two happens to run last in the frame. Slow: a parked machine's head
  // drifts in the wind, it does not idle at flight speed.
  animate((t, dt) => {
    if(air?.active) return;
    if(heli.rotors.main) heli.rotors.main.rotation.y += dt * 0.55;
    if(heli.rotors.tail) heli.rotors.tail.rotation.x += dt * 0.9;
  });
}

export default decorate;

// The interior hooks the shared floor builder would call. This game is
// outdoors, so they are here only so the manifest can export the same three
// names whichever world it uses.
export function fitOutRoom(){}
export function fitOutSpine(){}
