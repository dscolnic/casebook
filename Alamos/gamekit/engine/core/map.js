// map.js — a top-down plan of the site, drawn from the theme's own data.
//
// An outdoor game needs one. The city is 200 m across with six areas that look
// alike from a distance, and the only navigation aid was a waypoint ring you
// can lose behind a building. Everything here is read from `theme.site`, so a
// theme that describes its place gets a map for free and never draws one.
//
// The 2-D fallback town list in dashboard.js is a different thing: a readiness
// readout, not a way of finding the treatment plant.
import theme from './theme.js';
import { getState } from './gameState.js';
import { def, getCurrentMission, nextMissionStopIndex, openStopIndices, isPersonStopForIdx,
         getPersonIdForStop } from './simulation.js';
import { getNPCs } from '../people/crowd.js';
import { getPosition, camera } from './player.js';
import { esc } from './utils.js';

const PAD = 14;

/**
 * A stubby arrow from a point, in a world yaw. Used for the player and for the
 * person they are looking for: a dot says where, an arrow says which way they
 * are about to walk, and on a map of a town that is the difference between
 * catching someone and following them.
 *
 * World +x is map +x and world +z is map +z, so a yaw measured as
 * atan2(dx, dz) turns into (sin, cos) here without a second convention.
 */
function heading(x, z, yaw, len, colour){
  const tx = x + Math.sin(yaw) * len, tz = z + Math.cos(yaw) * len;
  const back = yaw + Math.PI;
  const wing = 5.5, spread = 0.45;
  const ax = tx + Math.sin(back - spread) * wing, az = tz + Math.cos(back - spread) * wing;
  const bx = tx + Math.sin(back + spread) * wing, bz = tz + Math.cos(back + spread) * wing;
  return `<line x1="${x}" y1="${z}" x2="${tx}" y2="${tz}" stroke="${colour}" stroke-width="2.5"/>`
    + `<path d="M${tx},${tz} L${ax},${az} L${bx},${bz} Z" fill="${colour}"/>`;
}

/** World bounds that hold everything worth drawing. */
function bounds(site){
  const xs = [], zs = [];
  // An interior describes itself as rooms along a plan rather than buildings on
  // terrain. Without this the map had nothing to size itself against and drew
  // an empty rectangle with the player dot in the middle of it.
  for(const r of site.plan?.rooms ?? []){
    const half = site.plan.halfWidth ?? 4;
    xs.push(-half, half);
    zs.push(r.z0, r.z1);
  }
  for(const b of site.buildings ?? []){
    xs.push(b.x - b.w / 2, b.x + b.w / 2);
    zs.push(b.z - b.d / 2, b.z + b.d / 2);
  }
  for(const p of site.paths ?? []){
    xs.push(p.cx - p.w / 2, p.cx + p.w / 2);
    zs.push(p.cz - p.d / 2, p.cz + p.d / 2);
  }
  if(site.spawn){ xs.push(site.spawn.x); zs.push(site.spawn.z); }
  if(!xs.length) return { x0: -100, x1: 100, z0: -100, z1: 100 };
  return {
    x0: Math.min(...xs) - PAD, x1: Math.max(...xs) + PAD,
    z0: Math.min(...zs) - PAD, z1: Math.max(...zs) + PAD,
  };
}

/**
 * The map, as SVG. North (-Z) is up, which is how the site comment in site.js
 * describes the place, so the two never disagree.
 */
export function renderMap(){
  const site = theme.site ?? {};
  const state = getState();
  const b = bounds(site);
  // A submarine is fifty-five metres long and four and a half wide. Drawn with
  // north up it is a strip four compartments tall in a panel that shows two, so
  // a place much longer than it is wide is turned on its side: its length runs
  // across the map and the bow is on the left.
  const spanX = b.x1 - b.x0, spanZ = b.z1 - b.z0;
  const sideways = spanZ > spanX * 2.5;
  // A sideways plan is very wide and very short; the height is padded so the
  // rotated names and the target's marker have somewhere to go.
  const W = 720;
  const H = sideways
    ? Math.max(260, Math.round(W * spanX / spanZ))
    : Math.round(W * spanZ / spanX);
  const sx = sideways ? (x, z) => ((z - b.z0) / spanZ) * W
                      : (x) => ((x - b.x0) / spanX) * W;
  const sz = sideways ? (z, x) => ((x - b.x0) / spanX) * H
                      : (z) => ((z - b.z0) / spanZ) * H;
  const sw = (w) => (w / (sideways ? spanZ : spanX)) * W;
  const sd = (d) => (d / (sideways ? spanX : spanZ)) * H;
  /** A world point, wherever the map decided to put it. */
  const px = (x, z) => (sideways ? sx(x, z) : sx(x));
  const py = (x, z) => (sideways ? sz(z, x) : sz(z));
  /** The same yaw, in the map's frame. */
  const yawOf = (yaw) => (sideways ? Math.PI / 2 - yaw : yaw);

  // Every call still open today, so the player can pick their own order. The
  // map used to mark one "next stop", which is the game choosing the route.
  const mission = getCurrentMission(state);
  const open = mission ? openStopIndices(state) : [];
  const targetGroups = new Set();
  const wantedPeople = [];
  for(const i of open){
    if(isPersonStopForIdx(state, i)){
      const pid = getPersonIdForStop(state, i);
      const npc = pid ? (getNPCs() ?? []).find(n => n.char?.id === pid) : null;
      if(npc) wantedPeople.push(npc);
    } else {
      targetGroups.add(mission.stops[i].group);
    }
  }
  const targetGroup = null;   // kept: the old single-target checks read it

  let g = '';
  // ---- an interior: the rooms in order along the plan
  for(const r of site.plan?.rooms ?? []){
    const area = r.group ? def(r.group) : null;
    const isTarget = r.group && targetGroups.has(r.group);
    const half = site.plan.halfWidth ?? 4;
    const x = sideways ? sx(0, r.z0) : sx(-half);
    const y = sideways ? sz(0, -half) : sz(r.z0);
    const w = sideways ? sw(r.z1 - r.z0) : sw(half * 2);
    const h = sideways ? sd(half * 2) : sd(r.z1 - r.z0);
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" `
       + `fill="${area ? area.color : (r.colour ?? '#9a958a')}" opacity="${area ? 0.9 : 0.4}" `
       + `stroke="${isTarget ? '#f2c14e' : 'rgba(0,0,0,.3)'}" stroke-width="${isTarget ? 3 : 1}"/>`;
    // Sideways, a compartment is a narrow vertical band and ten names centred in
    // ten of them land on the same line as one another. The label turns to run
    // along the band instead, which is the only direction it fits.
    const cx = x + w / 2, cy = y + h / 2;
    const label = esc(r.name ?? r.id);
    g += sideways
      ? `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="10.5" fill="#1c1b19" `
        + `font-weight="${isTarget ? 800 : 600}" transform="rotate(-90 ${cx} ${cy})">${label}</text>`
      : `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" fill="#1c1b19" `
        + `font-weight="${isTarget ? 800 : 600}">${label}</text>`;
    if(isTarget){
      g += sideways
        ? `<text x="${cx}" y="${y - 8}" text-anchor="middle" font-size="10" fill="#8a6410" `
          + `font-weight="800">▼ go here</text>`
        : `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="10" fill="#8a6410" `
          + `font-weight="800">◀ go here</text>`;
    }
  }
  if(site.water){
    g += `<rect x="${sx(site.water.cx - site.water.width / 2)}" y="${sz(site.water.cz - site.water.depth / 2)}" `
       + `width="${sw(site.water.width)}" height="${sd(site.water.depth)}" fill="#2c4a52" opacity="0.55"/>`;
  }
  for(const p of site.paths ?? []){
    g += `<rect x="${sx(p.cx - p.w / 2)}" y="${sz(p.cz - p.d / 2)}" width="${sw(p.w)}" height="${sd(p.d)}" `
       + `fill="#cfc9bb"/>`;
  }
  for(const bl of site.buildings ?? []){
    const area = bl.group ? def(bl.group) : null;
    const isTarget = bl.group && targetGroups.has(bl.group);
    const fill = area ? area.color : '#9a958a';
    const x = sx(bl.x - bl.w / 2), y = sz(bl.z - bl.d / 2);
    const w = sw(bl.w), h = sd(bl.d);
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" `
       + `opacity="${area ? 0.92 : 0.55}" stroke="${isTarget ? '#f2c14e' : 'rgba(0,0,0,.25)'}" `
       + `stroke-width="${isTarget ? 3 : 1}"/>`;
    // Labels go beneath the footprint so they never sit on top of another one.
    g += `<text x="${x + w / 2}" y="${y + h + 12}" text-anchor="middle" font-size="11" `
       + `fill="#2b2a27" font-weight="${isTarget ? 800 : 600}">${esc(bl.name)}</text>`;
    if(isTarget){
      g += `<text x="${x + w / 2}" y="${y - 6}" text-anchor="middle" font-size="11" `
         + `fill="#8a6410" font-weight="800">▼ open</text>`;
    }
  }

  // The person the mission wants, where they are standing right now, and which
  // way they are facing — they walk, so a static dot would be a lie by the time
  // the player got there.
  for(const wanted of wantedPeople){
    const mx = px(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const mz = py(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const colour = def(wanted.division)?.color ?? '#8a6410';
    g += heading(mx, mz, yawOf(wanted.facing ?? 0), 15, colour)
       + `<circle cx="${mx}" cy="${mz}" r="7" fill="${colour}" stroke="#fff" stroke-width="2.5"/>`
       + `<circle cx="${mx}" cy="${mz}" r="12" fill="none" stroke="${colour}" stroke-width="1.5" opacity="0.55"/>`
       + `<text x="${mx}" y="${mz - 17}" text-anchor="middle" font-size="11" font-weight="800" `
       + `fill="#2b2a27">${esc(wanted.char?.name ?? 'your contact')}</text>`;
  }

  // The player, with the direction they are actually looking.
  const p = getPosition();
  const pxx = px(p.x, p.z), pz = py(p.x, p.z);
  let yaw = 0;
  if(camera){
    const d = new (p.constructor)();
    camera.getWorldDirection(d);
    yaw = Math.atan2(d.x, d.z);
  }
  g += heading(pxx, pz, yawOf(yaw), 17, '#1c1b19')
     + `<circle cx="${pxx}" cy="${pz}" r="6" fill="#fff" stroke="#1c1b19" stroke-width="2.5"/>`;

  const legend = [site.plan ? (sideways ? 'Bow to the left' : 'Bow at the top') : 'North is up',
                  'you are the white dot']
    .concat(targetGroups.size ? ['gold outline is a call still open — take them in any order'] : [])
    .concat(wantedPeople.length
      ? [`ringed dots are people you owe a call: ${wantedPeople.map(w => w.char?.name ?? 'a colleague').join(', ')}`]
      : []);
  return `<div class="mapWrap"><svg viewBox="0 0 ${W} ${H}" width="100%" role="img" `
       + `aria-label="Map of the site"><rect width="${W}" height="${H}" fill="#efeade"/>${g}</svg>`
       + `<div class="mapLegend">${esc(legend.join(' · '))}</div></div>`;
}

/**
 * A facing arrow for a mini-map, as a positioned SVG.
 *
 * The two older games draw their maps as absolutely-positioned divs rather than
 * one SVG, so they cannot use `heading()` above. They can use this: a triangle
 * that points down at rotation zero, turned by the world yaw. Screen +y is
 * world +z on those maps, and a clockwise CSS rotation of `yaw` takes (0,1) to
 * (sin yaw, cos yaw) — which is the same convention the 3-D code uses, so the
 * arrow and the body it belongs to always point the same way.
 */
export function facingArrowHTML(yaw, colour, size = 18){
  const deg = (yaw * 180 / Math.PI).toFixed(1);
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" `
    + `style="display:block;transform:rotate(${deg}deg)" aria-hidden="true">`
    + `<path d="M8 15.5 L3 4.5 L8 6.8 L13 4.5 Z" fill="${colour}" stroke="#ffffff" stroke-width="1.2" `
    + `stroke-linejoin="round"/></svg>`;
}
