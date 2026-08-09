// caseBeacon.js — "the case is here", as an object in the room.
//
// A room is a bench, an instrument, some crates and a chart on a stand. The
// chart is the only thing in it that starts a question, and at a glance it
// looks exactly like the other paper in the room: people walked in, read the
// screen, and walked out again without ever finding the thing they came for.
//
// So the stand gets a marker you cannot miss from the doorway: a ring on the
// floor, a column of light, and a big arrow bobbing over it, all in the area's
// own colour. It is only lit when a case is actually open there — a beacon over
// an empty stand is worse than no beacon, because it teaches the player that
// the beacon means nothing.
//
// Everything here is unlit or emissive, so the marker costs no light out of the
// six-light budget in CLAUDE.md.
import * as THREE from 'three';

/**
 * @param parent  the group the marker belongs to — a room's own group, so it
 *                disappears with the room rather than needing its own bookkeeping
 * @param opts    { x, z, y, colour, label, height }
 */
export function addCaseBeacon(parent, opts = {}){
  const colour = new THREE.Color(opts.colour ?? 0xf0b429);
  const x = opts.x ?? 0, z = opts.z ?? 0, y = opts.y ?? 0;
  const top = opts.height ?? 2.25;

  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.userData.ignoreAudit = true;
  parent.add(group);

  // ---- the arrow: a shaft and a head, pointing down at the stand
  const arrow = new THREE.Group();
  arrow.position.y = top;
  const arrowMat = new THREE.MeshBasicMaterial({
    color: colour, transparent: true, opacity: 0.96, depthWrite: false,
  });
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.42, 4), arrowMat);
  head.rotation.x = Math.PI;                 // point down
  head.rotation.y = Math.PI / 4;             // a square head reads as an arrow, not a spike
  arrow.add(head);
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.34, 0.11), arrowMat);
  shaft.position.y = 0.36;
  arrow.add(shaft);
  group.add(arrow);

  // ---- the column: faint, wide, and behind everything, so it reads from the
  // door without hiding the chart the player is walking towards.
  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.32, top, 16, 1, true),
    new THREE.MeshBasicMaterial({
      color: colour, transparent: true, opacity: 0.055, depthWrite: false,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    }));
  column.position.y = top / 2;
  group.add(column);

  // ---- the ring on the floor, which is what you see when you are close
  // enough that the arrow is above your view.
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.42, 0.58, 40),
    new THREE.MeshBasicMaterial({
      color: colour, transparent: true, opacity: 0.42, depthWrite: false, side: THREE.DoubleSide,
    }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.012;
  group.add(ring);

  // ---- the label, billboarded. Single-sided: text on a DoubleSide material
  // renders mirrored from behind (CLAUDE.md, house rule 3).
  const label = opts.label === null ? null : makeLabel(opts.label ?? 'Case open · press E');
  if(label){
    label.position.y = top + 0.5;
    group.add(label);
  }

  let active = true;
  let t = 0;
  return {
    group,
    setActive(on){
      active = !!on;
      group.visible = active;
    },
    get active(){ return active; },
    /** Bob the arrow, breathe the ring, and keep the label facing the player. */
    update(delta, camera){
      if(!active) return;
      t += delta;
      arrow.position.y = top + Math.sin(t * 2.2) * 0.14;
      const pulse = 0.42 + Math.sin(t * 2.2) * 0.16;
      ring.material.opacity = pulse;
      ring.scale.setScalar(1 + Math.sin(t * 2.2) * 0.06);
      if(label && camera) label.lookAt(camera.position.x, label.getWorldPosition(worldTmp).y, camera.position.z);
    },
  };
}

const worldTmp = new THREE.Vector3();

function makeLabel(text){
  const pad = 26, fontPx = 42;
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `800 ${fontPx}px Inter, Helvetica, Arial, sans-serif`;
  const w = Math.ceil(measure.measureText(text).width + pad * 2), h = 78;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const r = 16;
  g.fillStyle = 'rgba(24,22,18,0.88)';
  g.beginPath();
  g.moveTo(r, 0); g.lineTo(w - r, 0); g.quadraticCurveTo(w, 0, w, r);
  g.lineTo(w, h - r); g.quadraticCurveTo(w, h, w - r, h);
  g.lineTo(r, h); g.quadraticCurveTo(0, h, 0, h - r);
  g.lineTo(0, r); g.quadraticCurveTo(0, 0, r, 0);
  g.closePath(); g.fill();
  g.fillStyle = '#fdf6e6';
  g.font = `800 ${fontPx}px Inter, Helvetica, Arial, sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const H = 0.17;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(H * (w / h), H),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.FrontSide }));
  mesh.renderOrder = 6;
  mesh.userData.ignoreAudit = true;
  return mesh;
}
