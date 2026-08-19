// tourMarker.js — a big named arrow over a person or a place.
//
// TRIAL and GREET are the two formats whose subject is the site itself: where
// things are and who is where. That makes them a tour, and a tour has to name
// what it is pointing at from far enough away to be worth walking towards. The
// case beacon is the wrong size for it — it is a "there is a question in this
// room" mark, read at ten metres, with a one-line label sized for a corridor.
//
// So this is the same idea one size up: a taller arrow, a wider board, a name in
// large type and a second line under it for the role or the place.
//
// ## Two things it does that the case beacon does not
//
// **It billboards, because somebody calls `update`.** `addCaseBeacon` returns an
// object with an `update(delta, camera)` that turns its label to face the
// player, and the two world formats that place beacons never called it — so a
// gate label three hundred metres down a site was a plane seen edge-on, which is
// invisible and reads as a missing label. Anything that draws text in the world
// has to be turned every frame by somebody.
//
// **It is not drawn through walls.** The cone over a person the day wants is the
// one exception in this engine and a second one would end the rule. A marker
// behind a building is hidden by the building, which is what makes walking round
// the building mean something.

import * as THREE from 'three';

const worldTmp = new THREE.Vector3();

/** A canvas sprite: a big line, and a small one under it. */
function board(text, sub, colour){
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  const pad = 26;
  ctx.font = '700 54px Inter, system-ui, sans-serif';
  const w1 = ctx.measureText(text).width;
  ctx.font = '600 32px Inter, system-ui, sans-serif';
  const w2 = sub ? ctx.measureText(sub).width : 0;
  const w = Math.ceil(Math.max(w1, w2) + pad * 2);
  const h = sub ? 132 : 92;
  c.width = w; c.height = h;

  ctx.fillStyle = 'rgba(18,22,26,0.86)';
  ctx.beginPath();
  // Rounded, because a hard rectangle floating over somebody's head reads as a
  // debug overlay rather than as part of the game.
  const r = 18;
  ctx.moveTo(r, 0); ctx.lineTo(w - r, 0); ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(r, h); ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.fill();
  ctx.fillStyle = colour;
  ctx.fillRect(0, h - 5, w, 5);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f6f3ec';
  ctx.font = '700 54px Inter, system-ui, sans-serif';
  ctx.fillText(text, w / 2, sub ? 62 : 62);
  if(sub){
    ctx.fillStyle = '#b9c2c9';
    ctx.font = '600 32px Inter, system-ui, sans-serif';
    ctx.fillText(sub, w / 2, 104);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w / 190, h / 190),
    // Single-sided: text on a DoubleSide material renders mirrored from behind,
    // which is house rule 3 and has been paid for once already.
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  mesh.userData.ignoreAudit = true;
  return mesh;
}

/**
 * One marker. `parent` is the group the run will dispose of.
 *
 *   text    the name, large — a person or a place
 *   sub     the second line: their role, or what the place is
 *   height  how far above the ground the arrow floats
 */
export function addTourMarker(parent, { text, sub = '', colour = 0xf0b429, height = 3.1 } = {}){
  const c = new THREE.Color(colour);
  const group = new THREE.Group();
  group.userData.ignoreAudit = true;
  parent.add(group);

  const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.97,
    depthWrite: false });
  const arrow = new THREE.Group();
  arrow.position.y = height;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.44, 0.78, 4), mat);
  head.rotation.x = Math.PI;                  // point down, at whoever it is over
  head.rotation.y = Math.PI / 4;
  arrow.add(head);
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.6, 0.17), mat);
  shaft.position.y = 0.68;
  arrow.add(shaft);
  group.add(arrow);

  const label = board(text, sub, `#${c.getHexString()}`);
  label.position.y = height + 1.5;
  group.add(label);

  let t = 0;
  return {
    group,
    at(x, y, z){ group.position.set(x, y, z); },
    set visible(v){ group.visible = v; },
    get visible(){ return group.visible; },
    /** Bob the arrow and turn the board. Nobody else will do either. */
    update(delta, camera){
      if(!group.visible) return;
      t += delta;
      arrow.position.y = height + Math.sin(t * 2.1) * 0.18;
      if(camera){
        label.lookAt(camera.position.x, label.getWorldPosition(worldTmp).y, camera.position.z);
      }
    },
  };
}
