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
import { npcsForEngine } from '../people/registry.js';
import { getPosition, camera } from './player.js';
import { esc } from './utils.js';

const PAD = 14;

/**
 * Black or white, whichever can be read on this fill.
 *
 * Relative luminance with the usual coefficients — the eye is far more
 * sensitive to green than to blue, so a plain average picks the wrong ink on
 * anything saturated.
 */
function readableInk(fill){
  const m = /^#?([0-9a-f]{6})$/i.exec(String(fill).trim());
  if(!m) return '#1c1b19';
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => v / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? '#1c1b19' : '#ffffff';
}

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
  // Padding in world units has to be a fraction of the world. A flat 14 metres
  // is a sensible margin around a town three hundred metres across and a
  // quarter of the drawing wasted on a ward fifty metres long.
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const z0 = Math.min(...zs), z1 = Math.max(...zs);
  const padX = Math.max(1.5, Math.min(PAD, (x1 - x0) * 0.05));
  const padZ = Math.max(1.5, Math.min(PAD, (z1 - z0) * 0.05));
  return { x0: x0 - padX, x1: x1 + padX, z0: z0 - padZ, z1: z1 + padZ };
}

/**
 * The map, as SVG. North (-Z) is up, which is how the site comment in site.js
 * describes the place, so the two never disagree.
 */
/**
 * @param opts.maxW, opts.maxH  the box the map has to fit, in CSS pixels.
 *
 * The map is drawn at the size it will be *seen* at. It used to be 720 px wide
 * whatever the site was, with the height following the aspect — so a place
 * longer than it is wide came out 1791 px tall, and the stylesheet then scaled
 * it to 340 px to fit the card. Everything on it shrank with it: 11 px labels
 * rendered at two pixels, which is the "zoomed out so I cannot see it" this
 * fixes. Fitting the box here keeps text at its own size.
 */
export function renderMap(opts = {}){
  const site = theme.site ?? {};
  const state = getState();
  const b = bounds(site);
  const maxW = opts.maxW ?? 720;
  const maxH = opts.maxH ?? 420;
  // A submarine is fifty-five metres long and four and a half wide. Drawn with
  // north up it is a strip four compartments tall in a panel that shows two, so
  // a place much longer than it is wide is turned on its side: its length runs
  // across the map and the bow is on the left.
  const spanX = b.x1 - b.x0, spanZ = b.z1 - b.z0;
  // Turn the plan on its side when that fits the box better. A submarine is
  // fifty-five metres long and four wide; drawn north-up it is a strip four
  // compartments tall in a panel that shows two. The test used to be a fixed
  // ratio (longer than 2.5× wide), which left a ridge 400 m long and 160 m wide
  // upright and therefore tiny. Now it is simply whichever way round shows the
  // place larger.
  // An interior draws its room names outside the plan with leader lines, so the
  // box has to leave room for two tiers of them on each side.
  const labelGutter = site.plan ? 64 : 0;
  const boxW = Math.max(120, maxW - (site.plan ? 40 : 0));
  const boxH = Math.max(120, maxH - labelGutter);
  const fitUpright = Math.min(boxW / spanX, boxH / spanZ);
  const fitSideways = Math.min(boxW / spanZ, boxH / spanX);
  const sideways = fitSideways > fitUpright * 1.02;
  const scale = sideways ? fitSideways : fitUpright;
  const W = Math.round((sideways ? spanZ : spanX) * scale);
  const H = Math.round((sideways ? spanX : spanZ) * scale) + labelGutter;
  const sx = sideways ? (x, z) => ((z - b.z0) / spanZ) * W
                      : (x) => ((x - b.x0) / spanX) * W;
  const inner = H - labelGutter;
  const top = labelGutter / 2;
  const sz = sideways ? (z, x) => top + ((x - b.x0) / spanX) * inner
                      : (z) => top + ((z - b.z0) / spanZ) * inner;
  const sw = (w) => (w / (sideways ? spanZ : spanX)) * W;
  const sd = (d) => (d / (sideways ? spanX : spanZ)) * inner;
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
      const npc = pid ? npcsForEngine().find(n => n.char?.id === pid) : null;
      if(npc) wantedPeople.push(npc);
    } else {
      targetGroups.add(mission.stops[i].group);
    }
  }
  const targetGroup = null;   // kept: the old single-target checks read it

  let g = '';
  // ---- label placement
  //
  // Every building label used to be pinned twelve pixels under its own
  // footprint. On a town of five buildings that is fine; Project Y has
  // nineteen, several of them a few metres apart, and the names landed on top
  // of each other in a pile nobody could read.
  //
  // So labels are placed in a second pass, against the boxes already taken —
  // the footprints themselves and every label placed before it. A label tries
  // below, above, right and left, then a shorter form of its own name, and is
  // dropped only if all of that fails. Targets and people are placed first, so
  // the ones that matter always win the space.
  const taken = [];
  const overlaps = (b) => taken.some(t =>
    !(b.x1 < t.x0 - 1 || b.x0 > t.x1 + 1 || b.y1 < t.y0 - 1 || b.y0 > t.y1 + 1));
  /** 11px Inter is about 0.55em average — close enough to reserve space with. */
  const textW = (t, size = 11) => String(t).length * size * 0.55;
  const shorten = (name) => {
    const cut = String(name).split(/\s+[&·—-]\s+|,\s*/)[0];
    return cut.length < String(name).length ? cut : String(name).split(/\s+/)[0];
  };
  /**
   * Put a label somewhere it can be read, or nowhere.
   * @returns svg text, or '' when there was no room for it at any anchor.
   */
  function label(cx, cy, halfW, halfH, text, { weight = 600, colour = '#2b2a27', size = 11 } = {}){
    for(const candidate of [text, shorten(text)]){
      const tw = textW(candidate, size);
      const anchors = [
        { x: cx,             y: cy + halfH + size + 1, anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
        { x: cx,             y: cy - halfH - 4,        anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
        { x: cx + halfW + 5, y: cy + size / 3,         anchor: 'start',  x0: cx + halfW + 5, x1: cx + halfW + 5 + tw },
        { x: cx - halfW - 5, y: cy + size / 3,         anchor: 'end',    x0: cx - halfW - 5 - tw, x1: cx - halfW - 5 },
        { x: cx,             y: cy + halfH + size * 2 + 3, anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
      ];
      for(const a of anchors){
        const box = { x0: a.x0, x1: a.x1, y0: a.y - size, y1: a.y + 3 };
        if(box.x0 < 2 || box.x1 > W - 2 || box.y0 < 2 || box.y1 > H - 2) continue;
        if(overlaps(box)) continue;
        taken.push(box);
        return `<text x="${a.x}" y="${a.y}" text-anchor="${a.anchor}" font-size="${size}" `
             + `fill="${colour}" font-weight="${weight}">${esc(candidate)}</text>`;
      }
    }
    return '';
  }
  // ---- an interior: the rooms in order along the plan
  for(const r of site.plan?.rooms ?? []){
    const area = r.group ? def(r.group) : null;
    const isTarget = r.group && targetGroups.has(r.group);
    const half = site.plan.halfWidth ?? 4;
    // Rooms sit on a side of the corridor, and the map has to say so. Every
    // room was drawn spanning the full width, so a room on the west and a room
    // on the east covering the same stretch of corridor were painted on top of
    // one another — two fills and two labels in the same rectangle, which is
    // exactly as readable as it sounds. A plan with a spine is drawn as a plan.
    const side = r.side === 'w' ? -1 : r.side === 'e' ? 1 : 0;
    const x0 = side === 0 ? -half : side < 0 ? -half : 0;
    const x1 = side === 0 ? half : side < 0 ? 0 : half;
    const x = sideways ? sx(0, r.z0) : sx(x0);
    const y = sideways ? sz(0, x0) : sz(r.z0);
    const w = sideways ? sw(r.z1 - r.z0) : sw(x1 - x0);
    const h = sideways ? sd(x1 - x0) : sd(r.z1 - r.z0);
    const fill = area ? area.color : (r.colour ?? '#9a958a');
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" `
       + `fill="${fill}" opacity="${area ? 0.9 : 0.4}" `
       + `stroke="${isTarget ? '#f2c14e' : 'rgba(0,0,0,.3)'}" stroke-width="${isTarget ? 3 : 1}"/>`;
    const cx = x + w / 2, cy = y + h / 2;
    const ink = readableInk(fill);
    const halo = ink === '#ffffff' ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.75)';
    const size = 10.5;
    const name = String(r.name ?? r.id);

    // A room name goes inside the room when it fits, and outside with a leader
    // line when it does not — which is how a floor plan is drawn, and the only
    // arrangement that does not either overflow into the neighbouring room or
    // truncate the name to "Nutri…". Rotated-and-clipped was worse than both.
    const along = sideways ? h : w;          // the direction the name would run
    const across = sideways ? w : h;
    const fitsRotated = sideways && textW(name, size) < along - 6 && across > size + 4;
    const fitsFlat = !sideways && textW(name, size) < w - 6 && h > size + 4;

    if(fitsRotated || fitsFlat){
      const extra = fitsRotated ? `transform="rotate(-90 ${cx} ${cy})"` : '';
      g += `<text x="${cx}" y="${cy + (fitsRotated ? 0 : 4)}" text-anchor="middle" `
         + `font-size="${size}" font-weight="${isTarget ? 800 : 600}" stroke="${halo}" `
         + `stroke-width="3" stroke-linejoin="round" paint-order="stroke" fill="${ink}" `
         + `${extra}>${esc(name)}</text>`;
      taken.push({ x0: cx - along / 2, x1: cx + along / 2, y0: cy - size, y1: cy + size });
    } else {
      // Outside, on the room's own side of the corridor: above for west, below
      // for east, stepping further out until the slot is free. The leader line
      // is what keeps the name attached to its room.
      const tw = textW(name, size);
      const up = sideways ? (side <= 0) : true;
      let placed = null;
      for(let tier = 0; tier < 4 && !placed; tier++){
        const off = 10 + tier * (size + 4);
        const ly = up ? y - off : y + h + off;
        const box = { x0: cx - tw / 2, x1: cx + tw / 2, y0: ly - size, y1: ly + 3 };
        if(!overlaps(box)){ placed = { ly, box }; }
      }
      if(placed){
        taken.push(placed.box);
        const edge = up ? y : y + h;
        g += `<line x1="${cx}" y1="${edge}" x2="${cx}" y2="${placed.ly + (up ? 3 : -size)}" `
           + `stroke="rgba(0,0,0,.35)" stroke-width="1"/>`
           + `<text x="${cx}" y="${placed.ly}" text-anchor="middle" font-size="${size}" `
           + `font-weight="${isTarget ? 800 : 600}" stroke="rgba(255,255,255,.8)" stroke-width="3" `
           + `stroke-linejoin="round" paint-order="stroke" fill="#1c1b19">${esc(name)}</text>`;
      }
    }
    if(isTarget){
      g += sideways
        ? `<text x="${cx}" y="${y - 8}" text-anchor="middle" font-size="10" fill="#8a6410" `
          + `font-weight="800">▼ go here</text>`
        : `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="10" fill="#8a6410" `
          + `font-weight="800">◀ go here</text>`;
    }
  }
  // A footprint, wherever the map decided to put it. Everything below used to
  // call `sx(x)` and `sz(z)` directly, which is correct upright and wrong the
  // moment the plan is turned on its side: the rotated `sx` takes (x, z) and
  // reads the z, so a one-argument call passed `undefined` and produced NaN.
  // The browser drops a NaN x/y to zero, which is why every building, road and
  // river piled into the top-left corner of any map drawn sideways — and why
  // the player dot and the target markers, which went through `px`/`py`, were
  // the only things in the right place.
  //
  // The extents swap with the axes too: turned sideways, a footprint's screen
  // width comes from its depth and its screen height from its width.
  const plotRect = (cx, cz, w, d) => ({
    x: px(cx - w / 2, cz - d / 2),
    y: py(cx - w / 2, cz - d / 2),
    w: sw(sideways ? d : w),
    h: sd(sideways ? w : d),
  });
  if(site.water){
    const r = plotRect(site.water.cx, site.water.cz, site.water.width, site.water.depth);
    g += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="#2c4a52" opacity="0.55"/>`;
  }
  for(const p of site.paths ?? []){
    const r = plotRect(p.cx, p.cz, p.w, p.d);
    g += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="#cfc9bb"/>`;
  }
  // Pass one: the footprints, which are also the obstacles the labels avoid.
  const plots = [];
  for(const bl of site.buildings ?? []){
    const area = bl.group ? def(bl.group) : null;
    const isTarget = bl.group && targetGroups.has(bl.group);
    const fill = area ? area.color : '#9a958a';
    const r = plotRect(bl.x, bl.z, bl.w, bl.d);
    const x = r.x, y = r.y, w = r.w, h = r.h;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" `
       + `opacity="${area ? 0.92 : 0.55}" stroke="${isTarget ? '#f2c14e' : 'rgba(0,0,0,.25)'}" `
       + `stroke-width="${isTarget ? 3 : 1}"/>`;
    taken.push({ x0: x, y0: y, x1: x + w, y1: y + h });
    plots.push({ bl, x, y, w, h, isTarget, area });
  }
  // The people first, so their names win the space: a building label can move,
  // and the name of somebody you have to find is the point of the map.
  const peopleLabels = [];
  for(const wanted of wantedPeople){
    const mx = px(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const mz = py(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const colour = def(wanted.division)?.color ?? '#8a6410';
    g += heading(mx, mz, yawOf(wanted.facing ?? 0), 15, colour)
       + `<circle cx="${mx}" cy="${mz}" r="7" fill="${colour}" stroke="#fff" stroke-width="2.5"/>`
       + `<circle cx="${mx}" cy="${mz}" r="12" fill="none" stroke="${colour}" stroke-width="1.5" opacity="0.55"/>`;
    taken.push({ x0: mx - 13, y0: mz - 13, x1: mx + 13, y1: mz + 13 });
    peopleLabels.push([mx, mz, wanted.char?.name ?? 'your contact']);
  }

  // Pass two: the labels, the ones that matter first.
  plots.sort((a, b) => (b.isTarget - a.isTarget) || (b.w * b.h - a.w * a.h));
  for(const [mx, mz, name] of peopleLabels){
    g += label(mx, mz, 13, 13, name, { weight: 800 });
  }
  for(const p of plots){
    if(p.isTarget){
      g += label(p.x + p.w / 2, p.y - p.h / 2 - 2, p.w / 2, 4, '▼ open',
                 { weight: 800, colour: '#8a6410' });
    }
    g += label(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, p.bl.name,
               { weight: p.isTarget ? 800 : 600 });
  }

  // The person the mission wants, where they are standing right now, and which
  // way they are facing — they walk, so a static dot would be a lie by the time
  // the player got there.
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
  return `<div class="mapWrap"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" `
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
