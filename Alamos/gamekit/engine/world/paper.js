// paper.js — the two things a campaign's story is written on: a status panel
// and a pinned slip.
//
// The bibles describe their world changing in exactly two shapes. A board that
// carries a short authored state and swaps it — `ALL GREEN` becomes `LIVE
// STABLE / RECOVERY UNVERIFIED`, `LOCKED` becomes `OPEN ON FINAL RELEASE`. And
// a piece of paper somebody clips somewhere — "Ruth clips it behind the
// restricted sheet", "Nell clips each card to its packet", "Ada pins her signed
// check beside the traces". Overwind writes twelve of the second, Wildtype
// fifteen, Whiteout twenty of the first. Before this file every one of those was
// a sentence on a card and nothing in the room.
//
// Both painters return a mesh with a `set(next)` that repaints, so a state hook
// changes the text and nothing else. The text is the bible's own copy: these
// draw a line, they do not write one.
//
// Nothing here imports from `engine/core`. Colours are dark enough for house
// rule 6 — a white sheet under a bright sky IBL is a blown-out rectangle.
import * as THREE from 'three';
import { fixtureSpot } from './interiorFixtures.js';

function canvasOf(w, h){
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { c, g: c.getContext('2d'), tex };
}

function wrap(g, text, maxW){
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for(const w of words){
    const next = line ? `${line} ${w}` : w;
    if(g.measureText(next).width > maxW && line){ lines.push(line); line = w; }
    else line = next;
  }
  if(line) lines.push(line);
  return lines;
}

/** Fit a font size so `text` sits on at most `maxLines` lines of `maxW`. */
function fit(g, text, maxW, maxLines, size, family){
  for(let s = size; s >= 10; s -= 2){
    g.font = `${family} ${s}px Inter, Helvetica, Arial, sans-serif`;
    const lines = wrap(g, text, maxW);
    if(lines.length <= maxLines) return { lines, size: s };
  }
  g.font = `${family} 10px Inter, Helvetica, Arial, sans-serif`;
  return { lines: wrap(g, text, maxW).slice(0, maxLines), size: 10 };
}

/**
 * Tones the panel can take. The bibles name the state in words; the colour is
 * ours, and it is the whole reason a panel reads from across a room.
 */
const TONES = {
  plain: { bg: '#2a2f35', fg: '#e8ebe6', dim: '#9aa3ab', bar: '#465059' },
  ok:    { bg: '#1f3a2a', fg: '#dff3e2', dim: '#8fbf9c', bar: '#2f8a4c' },
  warn:  { bg: '#4a3a12', fg: '#fbeccb', dim: '#d6b86a', bar: '#c9962a' },
  alert: { bg: '#4a1a18', fg: '#fde0dc', dim: '#e08a80', bar: '#c9342a' },
  paper: { bg: '#d9d3c3', fg: '#1c1e22', dim: '#5b5f66', bar: '#7a7f86' },
};

/**
 * A status panel: a title strip, one big line, one small line, and optionally
 * the big line struck through — which is the bible's "crossed out" in every
 * campaign that has one.
 *
 *   statusPanel(parent, { x, y, z, rotY, w, h, title, big, small, tone, struck, lit })
 *
 * `lit` makes it faintly emissive for a dark room. Returns the mesh; `mesh.set({...})`
 * repaints any subset of the spec.
 */
export function statusPanel(parent, opts = {}){
  const spec = { title: '', big: '', small: '', tone: 'plain', struck: false, ...opts };
  const W = 512, H = Math.round(512 * ((spec.h ?? 0.9) / (spec.w ?? 1.6)));
  const { g, tex } = canvasOf(W, H);
  const paint = () => {
    const T = TONES[spec.tone] ?? TONES.plain;
    g.fillStyle = T.bg; g.fillRect(0, 0, W, H);
    g.fillStyle = T.bar; g.fillRect(0, 0, W, Math.round(H * 0.16));
    g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillStyle = T.fg;
    g.font = `800 ${Math.round(H * 0.09)}px Inter, Helvetica, Arial, sans-serif`;
    g.fillText(String(spec.title ?? '').toUpperCase(), 18, Math.round(H * 0.08));
    // The big line, centred, fitted to two lines.
    g.textAlign = 'center';
    const { lines, size } = fit(g, spec.big, W - 48, 2, Math.round(H * 0.22), '800');
    const bigY = H * 0.5 - (lines.length - 1) * size * 0.6;
    lines.forEach((ln, i) => {
      const y = bigY + i * size * 1.2;
      g.fillStyle = T.fg;
      g.fillText(ln, W / 2, y);
      if(spec.struck){
        const tw = g.measureText(ln).width;
        g.strokeStyle = T.bar === TONES.plain.bar ? '#c9342a' : T.fg;
        g.lineWidth = Math.max(3, size * 0.12);
        g.beginPath(); g.moveTo(W / 2 - tw / 2 - 6, y + size * 0.04); g.lineTo(W / 2 + tw / 2 + 6, y - size * 0.06); g.stroke();
      }
    });
    if(spec.small){
      g.fillStyle = T.dim;
      const s = fit(g, spec.small, W - 48, 2, Math.round(H * 0.1), '600');
      s.lines.forEach((ln, i) => g.fillText(ln, W / 2, H * 0.84 + (i - (s.lines.length - 1) / 2) * s.size * 1.15));
    }
    tex.needsUpdate = true;
  };
  paint();
  const m = new THREE.Mesh(new THREE.PlaneGeometry(spec.w ?? 1.6, spec.h ?? 0.9),
    new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.55, metalness: 0.05,
      emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: spec.lit ? 0.35 : 0.08,
    }));
  m.position.set(spec.x ?? 0, spec.y ?? 1.6, spec.z ?? 0);
  m.rotation.y = spec.rotY ?? 0;
  m.userData.ignoreAudit = true;
  m.set = (next) => { Object.assign(spec, next); paint(); };
  parent.add(m);
  return m;
}

/**
 * A slip of paper, pinned or clipped, with up to three short lines on it. The
 * bibles' unit of consequence.
 *
 *   slip(parent, { x, y, z, rotY, w, h, text, sub, struck, stamp, pin, tilt, visible })
 *
 * `text` may be a string or an array of lines. `stamp` prints a small red
 * rubber-stamp word across the corner (`SUPERSEDED`, `HOLD`, `WITHDRAWN`).
 * Returns the mesh; `mesh.set({...})` repaints and may toggle `visible`.
 */
export function slip(parent, opts = {}){
  const spec = { text: '', sub: '', struck: false, stamp: '', pin: true, tilt: 0, w: 0.3, h: 0.22, ...opts };
  const W = 256, H = Math.round(256 * (spec.h / spec.w));
  const { g, tex } = canvasOf(W, H);
  const paint = () => {
    g.fillStyle = spec.tone === 'card' ? '#cfc6ad' : '#e6e0d0';
    g.fillRect(0, 0, W, H);
    // A rule down the left, the way a form has one.
    g.fillStyle = 'rgba(80,60,40,0.18)'; g.fillRect(0, 0, W, 6);
    g.textBaseline = 'middle'; g.textAlign = 'left';
    const lines = Array.isArray(spec.text) ? spec.text.map(String) : wrap(g, spec.text, W - 28);
    const fitted = fit(g, lines.join(' '), W - 28, 3, Math.round(H * 0.19), '700');
    const use = Array.isArray(spec.text) ? lines.slice(0, 3) : fitted.lines;
    const size = Array.isArray(spec.text) ? Math.min(fitted.size, Math.round(H * 0.19)) : fitted.size;
    g.font = `700 ${size}px Inter, Helvetica, Arial, sans-serif`;
    g.fillStyle = '#1e2126';
    const top = H * 0.36 - (use.length - 1) * size * 0.62;
    use.forEach((ln, i) => {
      const y = top + i * size * 1.24;
      g.fillText(ln, 14, y);
      if(spec.struck){
        const tw = g.measureText(ln).width;
        g.strokeStyle = '#b8352a'; g.lineWidth = Math.max(2, size * 0.14);
        g.beginPath(); g.moveTo(12, y + size * 0.05); g.lineTo(16 + tw, y - size * 0.05); g.stroke();
      }
    });
    if(spec.sub){
      g.fillStyle = '#5a5e66';
      g.font = `500 ${Math.round(H * 0.13)}px Inter, Helvetica, Arial, sans-serif`;
      wrap(g, spec.sub, W - 28).slice(0, 2).forEach((ln, i) => g.fillText(ln, 14, H * 0.78 + i * H * 0.15));
    }
    if(spec.stamp){
      g.save();
      g.translate(W * 0.68, H * 0.72); g.rotate(-0.22);
      g.strokeStyle = 'rgba(190,40,30,0.85)'; g.lineWidth = 4;
      g.font = `900 ${Math.round(H * 0.17)}px Inter, Helvetica, Arial, sans-serif`;
      g.textAlign = 'center';
      const tw = g.measureText(spec.stamp).width;
      g.strokeRect(-tw / 2 - 10, -H * 0.12, tw + 20, H * 0.24);
      g.fillStyle = 'rgba(190,40,30,0.85)';
      g.fillText(String(spec.stamp).toUpperCase(), 0, 0);
      g.restore();
    }
    tex.needsUpdate = true;
  };
  paint();
  const group = new THREE.Group();
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(spec.w, spec.h),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0 }));
  sheet.userData.ignoreAudit = true;
  group.add(sheet);
  if(spec.pin){
    const pin = new THREE.Mesh(new THREE.SphereGeometry(spec.w * 0.05, 8, 6),
      new THREE.MeshStandardMaterial({ color: spec.pin === 'clip' ? 0x8a9096 : 0xb8352a, roughness: 0.4, metalness: 0.5 }));
    pin.position.set(spec.pin === 'clip' ? 0 : spec.w * 0.1, spec.h * 0.42, 0.012);
    if(spec.pin === 'clip') pin.scale.set(2.2, 0.8, 1);
    group.add(pin);
  }
  group.position.set(spec.x ?? 0, spec.y ?? 1.4, spec.z ?? 0);
  group.rotation.y = spec.rotY ?? 0;
  group.rotation.z = spec.tilt;
  // `flat` is accepted and ignored: a slip lay on a bench top until it turned
  // out the bench is only built on the day its call is asked (see
  // `fixturePlaces.top`), and paper floating at bench height in an empty room
  // read as a bug. Every slip is pinned to a wall now.
  group.visible = spec.visible !== false;
  group.set = (next) => {
    Object.assign(spec, next);
    if(next.visible !== undefined) group.visible = next.visible;
    if(next.tilt !== undefined) group.rotation.z = next.tilt;
    paint();
  };
  parent.add(group);
  return group;
}

/**
 * A row of numbered hooks with something hanging on each — lamp tallies, keys,
 * tags. `count` hooks along `w` metres; `hung(i)` says whether hook i carries
 * its tally. Returns `{ group, set(hungFn) }`.
 */
export function tallyRail(parent, { x, y, z, rotY = 0, w = 3, count = 12, rows = 1, tallyColour = 0xb08a3a } = {}){
  const group = new THREE.Group();
  group.position.set(x, y, z); group.rotation.y = rotY;
  const rail = new THREE.MeshStandardMaterial({ color: 0x4b4f55, roughness: 0.6, metalness: 0.5 });
  const brass = new THREE.MeshStandardMaterial({ color: tallyColour, roughness: 0.35, metalness: 0.8 });
  const tallies = [];
  const per = Math.ceil(count / rows);
  for(let r = 0; r < rows; r++){
    const bar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, 0.04), rail);
    bar.position.set(0, -r * 0.34, 0);
    group.add(bar);
    for(let i = 0; i < per && r * per + i < count; i++){
      const hx = -w / 2 + (i + 0.5) * (w / per);
      const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.07, 6), rail);
      hook.position.set(hx, -r * 0.34 - 0.05, 0.02);
      group.add(hook);
      const tally = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.006, 12), brass);
      tally.rotation.x = Math.PI / 2;
      tally.position.set(hx, -r * 0.34 - 0.13, 0.03);
      group.add(tally);
      tallies.push(tally);
    }
  }
  parent.add(group);
  return {
    group, tallies,
    set(hung){ tallies.forEach((t, i) => { t.visible = typeof hung === 'function' ? !!hung(i) : !!hung; }); },
  };
}

/**
 * Where to hang things around an authored fixture, in room space.
 *
 * `fixtureSpot` says where the object stands; this says where its wall is, where
 * its face is and where its top is, so a theme can pin a slip to the board the
 * bible pins it to without knowing which wall the room mirrored it onto.
 *
 *   const at = fixturePlaces(room, fixture);
 *   statusPanel(room.group, { ...at.wallPanel(1), title: 'Load board' })
 *   slip(room.group, { ...at.face(-0.35, 1.45), text: 'SUPERSEDED' })
 *   slip(room.group, { ...at.top(0.4), flat: true, text: '2 m' })
 */
export function fixturePlaces(room, fixture){
  const s = fixtureSpot(room.bounds, fixture);
  const fx = Math.sin(s.yaw), fz = Math.cos(s.yaw);     // out from the wall, into the room
  const lx = Math.cos(s.yaw), lz = -Math.sin(s.yaw);    // along the wall
  return {
    ...s,
    /** On the wall beside the object, `side` -1/1, clear of its name plate. */
    wallPanel(side = 1, y = 1.9, gap = 1.25){
      // The back wall carries the room's own instrument screens across its middle,
      // and a panel at eye height there is behind them. Above them instead.
      const yy = s.wall === 'back' ? Math.max(y, 2.85) : y;
      return { x: s.x - fx * 0.9 + lx * gap * side, y: yy, z: s.z - fz * 0.9 + lz * gap * side, rotY: s.yaw };
    },
    /** On the wall directly behind and above the object. */
    wallAbove(y = 2.75){
      return { x: s.x - fx * 0.9, y, z: s.z - fz * 0.9, rotY: s.yaw };
    },
    /**
     * On the wall behind the object, above it — NOT on the object. A fixture is
     * built only on the day a call is asked at it (`syncFixtures`), so anything
     * hung on its face or laid on its top floats in the air every other day: the
     * first render of Boomtown's advice office had "OLD-PRICE ORDER COUNT" pinned
     * to nothing. The wall is always there. `y` is remapped into the band above a
     * board's top (1.98) and clear of the name plate.
     */
    face(dx = 0, y = 1.5){
      const yy = 2.05 + (y - 1.3) * 0.45;
      return { x: s.x - fx * 0.9 + lx * dx, y: yy, z: s.z - fz * 0.9 + lz * dx, rotY: s.yaw };
    },
    /** On the wall just above where a bench top would be — same reason as `face`. */
    top(dx = 0, dz = 0, y = 1.22){
      return { x: s.x - fx * 0.9 + lx * dx, y: y + Math.max(0, -dz) * 0.3, z: s.z - fz * 0.9 + lz * dx, rotY: s.yaw };
    },
    /** A point on the floor in front of it. */
    floor(dx = 0, out = 1.1){
      return { x: s.x + fx * out + lx * dx, y: 0, z: s.z + fz * out + lz * dx, rotY: s.yaw };
    },
  };
}

/**
 * How many missions' decisions the player has accepted, read off the state.
 *
 * The bibles hang their consequences on "accepted_stop_N" and "mission_complete";
 * the engine has `state.week` (the mission the player is on) and the stops done
 * so far today. A prop keyed to mission n appears when this reaches n.
 */
export function missionsAccepted(state, theme){
  if(!state) return 0;
  if(state.status === 'won') return (theme?.content?.MISSIONS?.length ?? state.week ?? 1);
  const day = Math.max(1, state.week ?? 1);
  const m = theme?.content?.MISSIONS?.[day - 1];
  const need = m?.stops?.length ?? 4;
  const done = Array.isArray(state.missionStopsCompleted) ? state.missionStopsCompleted.length : 0;
  return day - 1 + (done >= need ? 1 : 0);
}
