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
import { tiersFor } from './orientation.js';
import { openingSols, isOpen } from './access.js';
import { sitedAt } from '../world/interiorFixtures.js';

/**
 * Far places with no lesson in them, which the map keeps out of its own scale.
 *
 * Memoised on the site: `tiersFor` walks every building and sorts them, and the
 * map's bounds are recomputed on every draw.
 */
const asideCache = new WeakMap();
const openSolsCache = new WeakMap();
/** Opening sols for this theme, memoised — `openingSols` walks every mission. */
function openSolsFor(t){
  if(!t || typeof t !== 'object') return {};
  const hit = openSolsCache.get(t);
  if(hit) return hit;
  const v = openingSols(t);
  openSolsCache.set(t, v);
  return v;
}
/** The sol the map is being drawn on. 1 before a game exists. */
function weekNow(){ return getState()?.week ?? 1; }

function farAside(site){
  if(!site || typeof site !== 'object') return new Set();
  const hit = asideCache.get(site);
  if(hit) return hit;
  const tiers = tiersFor(site);
  const areas = new Set((site.buildings ?? []).map(b => b.group).filter(Boolean));
  const out = new Set((tiers.farPlaces ?? []).filter(id => !areas.has(id)));
  asideCache.set(site, out);
  return out;
}
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

/**
 * The rooms this map draws.
 *
 * A stacked building (engine/world/interiorTower.js) has every floor on one
 * footprint, so `plan.rooms` is four plans on top of each other — two fills and
 * two labels in every rectangle, the same illegibility a spine-less plan had,
 * multiplied by the number of floors. The world stamps `plan.activeLevel()`
 * onto the plan when it builds; a plan without it is a single floor and every
 * room is drawn, which is every other interior game and the Node checkers.
 */
function planRooms(site){
  const rooms = site.plan?.rooms ?? [];
  const level = site.plan?.activeLevel?.();
  if(level == null) return rooms;
  return rooms.filter(r => r.level == null || r.level === level);
}

/**
 * World bounds that hold everything worth drawing.
 *
 * A site may state its own with `site.mapBounds`, and one with a long approach
 * should. The bounds are otherwise the union of every building, path and the
 * spawn — which is right for a town and wrong for a place reached down a
 * corridor: Wellmere's causeway is a 170 m path with nothing on it, and drawing
 * it squeezed the entire station into the top quarter of a vertical ribbon. The
 * map is how a person stop is found, so what it must show is where people are.
 */
function bounds(site){
  if(site.mapBounds){
    const m = site.mapBounds;
    return { x0: m.x0, x1: m.x1, z0: m.z0, z1: m.z1 };
  }
  const xs = [], zs = [];
  // An interior describes itself as rooms along a plan rather than buildings on
  // terrain. Without this the map had nothing to size itself against and drew
  // an empty rectangle with the player dot in the middle of it.
  for(const r of planRooms(site)){
    const half = site.plan.halfWidth ?? 4;
    // A room may give its own footprint. A plan drawn as a corridor with rooms
    // either side cannot describe a building with a courtyard in it, and the map
    // of one showed six consoles floating in a rectangle with no building.
    if(Number.isFinite(r.x0) && Number.isFinite(r.x1)) xs.push(r.x0, r.x1);
    else xs.push(-half, half);
    zs.push(r.z0, r.z1);
  }
  for(const s of site.plan?.shapes ?? []){
    xs.push(s.x0, s.x1);
    zs.push(s.z0, s.z1);
  }
  // A FAR PLACE THAT CARRIES NO LESSON DOES NOT SET THE SCALE.
  //
  // The map auto-fits the whole site, which was the whole truth until a campaign
  // could open a building three hundred metres out that nothing sends you to.
  // Red Sand's ice cut is 338 m south; fitting to it squeezed the plant — every
  // area, every call, the entire working day — into the bottom quarter of the
  // frame, and gave the other three quarters to empty ground. A map is read
  // forty times a campaign to choose a route between six buildings, and it was
  // being scaled by the one place the route never visits.
  //
  // EVERY AREA IS STILL IN FRAME, always. Only a far place that is *not* an area
  // is dropped from the fit and drawn as an edge marker instead — Planetary
  // Defense's far ring is four real areas with stops in them, and clipping those
  // would hide where the player is being sent.
  for(const b of site.buildings ?? []){
    if(farAside(site).has(b.enter)) continue;
    xs.push(b.x - b.w / 2, b.x + b.w / 2);
    zs.push(b.z - b.d / 2, b.z + b.d / 2);
  }
  if(site.spawn){ xs.push(site.spawn.x); zs.push(site.spawn.z); }
  // PATHS ARE CLAMPED TO WHAT THE PLACES ALREADY COVER, not added to it.
  //
  // A track is drawn on the map and must not size it. Setting the ice cut aside
  // above did nothing on its own, because the 230-metre track out to it was still
  // in the fit and the map came out exactly as tall — the place was gone and the
  // road to it was still there. A road that runs off the edge of a map reads
  // correctly as a road that continues, which is also what it does on the ground.
  if(xs.length){
    const bx0 = Math.min(...xs), bx1 = Math.max(...xs);
    const bz0 = Math.min(...zs), bz1 = Math.max(...zs);
    const clampX = (v) => Math.max(bx0, Math.min(bx1, v));
    const clampZ = (v) => Math.max(bz0, Math.min(bz1, v));
    for(const p of site.paths ?? []){
      xs.push(clampX(p.cx - p.w / 2), clampX(p.cx + p.w / 2));
      zs.push(clampZ(p.cz - p.d / 2), clampZ(p.cz + p.d / 2));
    }
  } else {
    for(const p of site.paths ?? []){
      xs.push(p.cx - p.w / 2, p.cx + p.w / 2);
      zs.push(p.cz - p.d / 2, p.cz + p.d / 2);
    }
  }
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
 * A window of the world, centred on the player, for a site too spread out to
 * draw whole.
 *
 * Planetary Defense is 1.6 km across and its base camp is a 200 m cluster in the
 * middle of it, so the whole-site map drew that cluster nine pixels wide: every
 * building the player can actually walk to was one indistinguishable blob. A
 * site says `mapRadius` and gets a square window of that radius instead, with
 * everything outside it reduced to an arrow on the edge — the same trade a car
 * navigation screen makes, and for the same reason.
 *
 * The window is clamped inside the site so it never shows empty ground beyond
 * the edge of the world; on an axis the site is not much bigger than the window,
 * it stays centred on the site instead of sliding.
 */
function focusBounds(p, r, full, aspect = 1){
  const rx = aspect >= 1 ? r * aspect : r;
  const rz = aspect >= 1 ? r : r / aspect;
  const centre = (c, lo, hi, half) =>
    (hi - lo <= 2 * half ? (lo + hi) / 2 : Math.min(Math.max(c, lo + half), hi - half));
  const cx = centre(p.x, full.x0, full.x1, rx);
  const cz = centre(p.z, full.z0, full.z1, rz);
  return { x0: cx - rx, x1: cx + rx, z0: cz - rz, z1: cz + rz };
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
/**
 * Things a running world format wants drawn on the map.
 *
 * HUNT is the only caller today, and it is deliberate rather than a convenience:
 * a search where you cannot see what is left is graded on whether you happened
 * to walk down the right side of a building, and the decision worth having is
 * which of the ones you can see is worth the walk. Set to null to clear.
 *
 * `engine/world` does not import `engine/core`, so the world module is handed
 * this function by `main.js` rather than reaching for it. Same direction of
 * dependency as `ctx.world` itself.
 */
let pins = null;
export function setMapPins(list){ pins = list ?? null; }
/**
 * What a running format wants drawn, resolved at draw time.
 *
 * A function rather than a list, where the caller has one, because four of these
 * formats are about PEOPLE and people walk: a list captured when the run started
 * would draw everybody where they were standing a minute ago, which is the exact
 * lie the wanted-person marker was rewritten to stop telling.
 */
const livePins = () => {
  const v = typeof pins === 'function' ? pins() : pins;
  return Array.isArray(v) ? v : [];
};

export function renderMap(opts = {}){
  // `mini` is the corner map: same drawing, no writing. At 190 px a place name
  // is three unreadable pixels and the legend is a grey smear, and both of them
  // crowd out the only two things the corner map is for — where you are, and
  // which way the open calls lie.
  const mini = !!opts.mini;
  const site = theme.site ?? {};
  const state = getState();
  const ppos = getPosition();
  const full = bounds(site);
  const maxW = opts.maxW ?? 720;
  const maxH = opts.maxH ?? 420;
  // A submarine is fifty-five metres long and four and a half wide. Drawn with
  // north up it is a strip four compartments tall in a panel that shows two, so
  // a place much longer than it is wide is turned on its side: its length runs
  // across the map and the bow is on the left.
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
  // Only window a site that is actually bigger than the window. A theme keeps
  // its `mapRadius` when it grows or shrinks; the map decides per draw. The
  // radius is half the *short* side and the long one is opened out to the shape
  // of the panel — a square window in a 1100×600 sheet leaves half the sheet
  // blank and shows less ground for it.
  const focusR = Number.isFinite(site.mapRadius) ? site.mapRadius : 0;
  const focus = focusR > 0
    && ((full.x1 - full.x0) > focusR * 2.4 || (full.z1 - full.z0) > focusR * 2.4);
  const b = focus ? focusBounds(ppos, focusR, full, boxW / boxH) : full;
  const spanX = b.x1 - b.x0, spanZ = b.z1 - b.z0;
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
  // A SITED stop highlights the place it is actually sited at, not its own
  // area. Without this, a call sited at a near minor place — the Site Office
  // stands in for Wellmere's Crossing Hall and Field Laboratory on day 1 —
  // still lit up the far building on the map: the plan card correctly said
  // "Go to The Site Office" and the map pointed at a door sealed until day 4.
  // `callLabel` in app.js already resolves this the same way; the map just
  // never asked.
  const targetGroups = new Set();
  const wantedPeople = [];
  for(const i of open){
    if(isPersonStopForIdx(state, i)){
      const pid = getPersonIdForStop(state, i);
      const npc = pid ? npcsForEngine().find(n => n.char?.id === pid) : null;
      if(npc) wantedPeople.push(npc);
    } else {
      const stop = mission.stops[i];
      const lesson = theme.content?.CURRICULUM?.[stop.group]?.[stop.lesson];
      const sited = sitedAt(theme, stop.group, lesson);
      targetGroups.add(sited ? sited.place : stop.group);
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
  function label(cx, cy, halfW, halfH, text, { weight = 600, colour = '#2b2a27', size = 11, force = false, whole = false } = {}){
    const anchorsFor = (candidate) => {
      const tw = textW(candidate, size);
      return [
        { x: cx,             y: cy + halfH + size + 1, anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
        { x: cx,             y: cy - halfH - 4,        anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
        { x: cx + halfW + 5, y: cy + size / 3,         anchor: 'start',  x0: cx + halfW + 5, x1: cx + halfW + 5 + tw },
        { x: cx - halfW - 5, y: cy + size / 3,         anchor: 'end',    x0: cx - halfW - 5 - tw, x1: cx - halfW - 5 },
        { x: cx,             y: cy + halfH + size * 2 + 3, anchor: 'middle', x0: cx - tw / 2, x1: cx + tw / 2 },
      ];
    };
    const boxOf = (a) => ({ x0: a.x0, x1: a.x1, y0: a.y - size, y1: a.y + 3 });
    const offMap = (b) => b.x0 < 2 || b.x1 > W - 2 || b.y0 < 2 || b.y1 > H - 2;
    const draw = (a, candidate, halo) =>
      mini ? '' : `<text x="${a.x}" y="${a.y}" text-anchor="${a.anchor}" font-size="${size}" `
      + `fill="${colour}" font-weight="${weight}"`
      + (halo ? ` stroke="#efeade" stroke-width="3.2" stroke-linejoin="round" paint-order="stroke"` : '')
      + `>${esc(candidate)}</text>`;

    // `whole` is for a label whose tail is the information: an edge arrow reads
    // "Planetary Radar Control · 1.4 km", and `shorten` cuts at the separator, so
    // the shortened form was the name with the distance thrown away — the one
    // thing the arrow could not say by pointing.
    for(const candidate of whole ? [text] : [text, shorten(text)]){
      for(const a of anchorsFor(candidate)){
        const box = boxOf(a);
        if(offMap(box) || overlaps(box)) continue;
        taken.push(box);
        return draw(a, candidate, false);
      }
    }
    // Nowhere clear. For anything optional that is the right answer — a crowded
    // corner of the map is better unlabelled than illegible. For the place the
    // day is sending the player to it is not: the HUD names it ("Still open:
    // Survey Telescope"), and a map that then does not say which shape that is
    // cannot be read at all.
    //
    // So a forced label takes the anchor it collides with LEAST rather than the
    // first one, and carries a halo so it stays readable on top of whatever it
    // landed on. It claims its box too, so it is the only thing overlapping
    // anything instead of the seed of a pile.
    if(force){
      const area = (b) => {
        let a = 0;
        for(const t of taken){
          const w = Math.min(b.x1, t.x1) - Math.max(b.x0, t.x0);
          const h = Math.min(b.y1, t.y1) - Math.max(b.y0, t.y0);
          if(w > 0 && h > 0) a += w * h;
        }
        return a;
      };
      // Full text only. The shortened form is always the cheaper fit, so scoring
      // both picked it every time — and "Survey" is not what the plan card and
      // the banner call the place ("Go to Survey Telescope"). The halo is what
      // makes the long one readable where it lands.
      let best = null;
      for(const candidate of [text]){
        for(const a of anchorsFor(candidate)){
          const box = boxOf(a);
          if(offMap(box)) continue;
          const cost = area(box);
          if(!best || cost < best.cost) best = { a, candidate, box, cost };
        }
      }
      if(best){
        taken.push(best.box);
        return draw(best.a, best.candidate, true);
      }
    }
    return '';
  }
  // ---- an interior: the building itself, if the theme describes one
  //
  // `plan.shapes` is for a theme that brings its own world and whose place is not
  // a corridor with rooms off it — Mission Control is one wing of a building with
  // a ring corridor round a courtyard, and none of that can be said in rooms with
  // a `side` of 'w' or 'e'. Drawn first, so the rooms and the people sit on top.
  const SHAPE = {
    floor: { fill: '#d8d2c4', stroke: 'rgba(0,0,0,.28)', dash: '' },
    court: { fill: '#c3cbb4', stroke: 'rgba(0,0,0,.28)', dash: '' },
    wall:  { fill: '#8d867a', stroke: 'rgba(0,0,0,.35)', dash: '' },
    open:  { fill: 'none',    stroke: 'rgba(0,0,0,.45)', dash: '4 3' },
  };
  for(const s of site.plan?.shapes ?? []){
    const kind = SHAPE[s.kind] ?? SHAPE.floor;
    const x = sideways ? sx(0, s.z0) : sx(s.x0);
    const y = sideways ? sz(0, s.x0) : sz(s.z0);
    const w = sideways ? sw(s.z1 - s.z0) : sw(s.x1 - s.x0);
    const h = sideways ? sd(s.x1 - s.x0) : sd(s.z1 - s.z0);
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${s.fill ?? kind.fill}" `
       + `stroke="${kind.stroke}" stroke-width="1"`
       + (kind.dash ? ` stroke-dasharray="${kind.dash}"` : '') + `/>`;
    if(s.name){
      g += label(x + w / 2, y + h / 2, w / 2, h / 2, s.name,
                 { weight: 600, colour: '#4a463d', size: 10 });
    }
  }
  // ---- an interior: the rooms in order along the plan
  for(const r of planRooms(site)){
    const area = r.group ? def(r.group) : null;
    const isTarget = r.group && targetGroups.has(r.group);
    const half = site.plan.halfWidth ?? 4;
    const own = Number.isFinite(r.x0) && Number.isFinite(r.x1);
    // Rooms sit on a side of the corridor, and the map has to say so. Every
    // room was drawn spanning the full width, so a room on the west and a room
    // on the east covering the same stretch of corridor were painted on top of
    // one another — two fills and two labels in the same rectangle, which is
    // exactly as readable as it sounds. A plan with a spine is drawn as a plan.
    const side = r.side === 'w' ? -1 : r.side === 'e' ? 1 : 0;
    const x0 = own ? r.x0 : side === 0 ? -half : side < 0 ? -half : 0;
    const x1 = own ? r.x1 : side === 0 ? half : side < 0 ? 0 : half;
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
      if(!mini) g += `<text x="${cx}" y="${cy + (fitsRotated ? 0 : 4)}" text-anchor="middle" `
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
           + (mini ? '' : `<text x="${cx}" y="${placed.ly}" text-anchor="middle" font-size="${size}" `
           + `font-weight="${isTarget ? 800 : 600}" stroke="rgba(255,255,255,.8)" stroke-width="3" `
           + `stroke-linejoin="round" paint-order="stroke" fill="#1c1b19">${esc(name)}</text>`);
      }
    }
    // No "go here" arrow. Same reason the outdoor map's "▼ open" flag went: it is
    // a third label in the same few pixels as the room's name and the name of
    // whoever is standing in it, and the gold outline already says it.
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
  // The far places the fit set aside, drawn on the frame edge with how far out
  // they are. They are not on the map, and saying nothing about them would be
  // worse than the scale problem: a player who drives to the ice cut on the sol-4
  // lap and then cannot find it again has been told the world is smaller than it
  // is. So the map keeps its useful scale AND still points.
  const aside = farAside(site);
  for(const bl of site.buildings ?? []){
    if(!aside.has(bl.enter)) continue;
    const sx = site.spawn?.x ?? 0, sz = site.spawn?.z ?? 0;
    const metres = Math.round(Math.hypot(bl.x - sx, bl.z - sz));
    // The point on the frame the place lies through, from the middle of the map.
    const mx = (mapW) => mapW / 2;
    const cx0 = mx(W), cy0 = H / 2;
    const ex = px(bl.x, bl.z) - cx0, ey = py(bl.x, bl.z) - cy0;
    const k = Math.min(Math.abs((W / 2 - 16) / (ex || 1e-6)), Math.abs((H / 2 - 16) / (ey || 1e-6)));
    const ax = cx0 + ex * k, ay = cy0 + ey * k;
    const ang = (Math.atan2(ey, ex) * 180) / Math.PI;
    g += `<path d="M -9 -7 L 7 0 L -9 7 Z" fill="#4a453d" `
       + `transform="translate(${ax.toFixed(1)},${ay.toFixed(1)}) rotate(${ang.toFixed(1)})"/>`;
    // ON THE BIG MAP ONLY. The corner minimap is about 190 px across and reads at a
    // glance; a name and a distance on it is four words nobody can resolve sitting
    // on top of the plant. The arrow stays at both sizes, because a pointer is
    // legible at any size and is the half that says "there is more that way".
    if(W >= 320){
      const lx = ax - (ex * k) * 0.06, ly = ay - (ey * k) * 0.06;
      g += `<text x="${lx.toFixed(1)}" y="${(ly + (ey > 0 ? 17 : -9)).toFixed(1)}" text-anchor="middle" `
         + `font-size="9.5" font-weight="700" fill="#4a453d">${esc(bl.name)} · ${metres} m</text>`;
    }
  }

  // Pass one: the footprints, which are also the obstacles the labels avoid.
  const plots = [];
  for(const bl of site.buildings ?? []){
    if(aside.has(bl.enter)) continue;
    const area = bl.group ? def(bl.group) : null;
    // A minor place can be the target too, when a stop is sited there —
    // `targetGroups` holds whichever of the two the current call resolves to.
    const isTarget = !livePins().length
      && ((bl.group && targetGroups.has(bl.group)) || (bl.enter && targetGroups.has(bl.enter)));
    const fill = area ? area.color : '#9a958a';
    const r = plotRect(bl.x, bl.z, bl.w, bl.d);
    const x = r.x, y = r.y, w = r.w, h = r.h;
    // Three weights, not two. An area is solid; a MINOR place — one you can walk
    // into that carries no lesson, like the tank farm or the ice cut — sits
    // between; scenery stays faint. Before minor places existed there were only
    // two kinds of building and this drew them 0.92 and 0.55, which now reads as
    // "the ice cut is a rock": the one place on the map 338 m out was drawn the
    // same as a boulder. See gamekit/PLACEMENT_PASS.md.
    // A SEALED BUILDING IS UNLABELLED ON THE MAP TOO. Naming a place the player
    // cannot get into is the worst of both: it advertises a door that does not
    // open. The footprint stays — the building is visibly there, it is not a
    // secret — and it is drawn as faint as scenery until the sol it is needed.
    const sealedHere = !isOpen(openSolsFor(theme), bl.group || bl.enter, weekNow());
    const opacity = sealedHere ? 0.4 : area ? 0.92 : bl.enter ? 0.74 : 0.55;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" `
       + `opacity="${opacity}" stroke="${isTarget ? '#f2c14e' : bl.enter ? 'rgba(0,0,0,.4)' : 'rgba(0,0,0,.25)'}" `
       + `stroke-width="${isTarget ? 3 : 1}"/>`;
    taken.push({ x0: x, y0: y, x1: x + w, y1: y + h });
    plots.push({ bl, x, y, w, h, isTarget, area, sealed: sealedHere });
  }
  // The people first, so their names win the space: a building label can move,
  // and the name of somebody you have to find is the point of the map.
  //
  // Unless a run owns the map. While one of the world-graded formats is going
  // the only thing on it is that format's own business — the gates of a trial,
  // the people still to greet — because the open calls of the day are exactly
  // what the player must NOT be reading while they are out doing something
  // else. `wantedPeople` is emptied and the gold open-call outline is off, both
  // handled where they are drawn.
  const peopleLabels = [];
  for(const wanted of (livePins().length ? [] : wantedPeople)){
    const mx = px(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const mz = py(wanted.pos?.x ?? 0, wanted.pos?.z ?? 0);
    const colour = def(wanted.division)?.color ?? '#8a6410';
    g += heading(mx, mz, yawOf(wanted.facing ?? 0), 15, colour)
       + `<circle cx="${mx}" cy="${mz}" r="7" fill="${colour}" stroke="#fff" stroke-width="2.5"/>`
       + `<circle cx="${mx}" cy="${mz}" r="12" fill="none" stroke="${colour}" stroke-width="1.5" opacity="0.55"/>`;
    taken.push({ x0: mx - 13, y0: mz - 13, x1: mx + 13, y1: mz + 13 });
    peopleLabels.push([mx, mz, wanted.char?.name ?? 'your contact']);
  }

  // Anything a running format has put on the ground. Drawn as a diamond so it
  // reads as neither a person (circle) nor a building (rectangle), and unlabelled
  // — there are a dozen of them and they are all the same thing, which the
  // briefing has already said.
  const drawnPins = livePins();
  const pinLabels = [];
  for(const pin of drawnPins){
    const mx = px(+pin.x, +pin.z), mz = py(+pin.x, +pin.z);
    const colour = pin.colour ?? '#d8b23c';
    g += `<rect x="${mx - 5}" y="${mz - 5}" width="10" height="10" rx="1.5"`
       + ` transform="rotate(45 ${mx} ${mz})" fill="${colour}" stroke="#fff" stroke-width="2"/>`;
    taken.push({ x0: mx - 9, y0: mz - 9, x1: mx + 9, y1: mz + 9 });
    // A person's name is worth the space; a dozen identical items is not — the
    // briefing has already said what they are.
    if(pin.name) pinLabels.push([mx, mz, pin.name]);
  }
  for(const [mx, mz, name] of pinLabels) g += label(mx, mz, 11, 11, name, { weight: 800 });

  // Pass two: the labels, the ones that matter first.
  plots.sort((a, b) => (b.isTarget - a.isTarget) || (b.w * b.h - a.w * a.h));
  for(const [mx, mz, name] of peopleLabels){
    g += label(mx, mz, 13, 13, name, { weight: 800 });
  }
  for(const p of plots){
    // No "▼ open" marker. It was a third label competing for the same corner of
    // the map with the building's name and the name of the person standing there,
    // and it says nothing the gold outline round the footprint and the bold name
    // do not already say.
    // An open call's building is named come what may; everything else gives way.
    // The name is the one the HUD uses, so "Still open: Survey Telescope" and the
    // shape on the map are the same words.
    // A sealed building has no name anywhere — on the door, or here. The
    // footprint is still drawn, faint: the player can see there is a building
    // and can walk right up to it, and what they cannot do is read it or go in.
    if(p.sealed) continue;
    g += label(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, p.bl.name,
               { weight: p.isTarget ? 800 : 600, force: p.isTarget });
  }

  // The person the mission wants, where they are standing right now, and which
  // way they are facing — they walk, so a static dot would be a lie by the time
  // the player got there.
  // The player, with the direction they are actually looking.
  const pxx = px(ppos.x, ppos.z), pz = py(ppos.x, ppos.z);
  let yaw = 0;
  if(camera){
    const d = new (ppos.constructor)();
    camera.getWorldDirection(d);
    yaw = Math.atan2(d.x, d.z);
  }
  g += heading(pxx, pz, yawOf(yaw), 17, '#1c1b19')
     + `<circle cx="${pxx}" cy="${pz}" r="6" fill="#fff" stroke="#1c1b19" stroke-width="2.5"/>`;

  // ---- what the window cut off
  //
  // A windowed map hides most of the site, so everything hidden that the player
  // might want gets an arrow on the edge it lies beyond, pointing at it, with
  // how far away it is. Without this the map is a lie by omission: the base camp
  // reads as the whole world and the radar station forty minutes' flight away
  // does not exist.
  let offCount = 0;
  if(focus){
    const outside = (x, z) => x < b.x0 || x > b.x1 || z < b.z0 || z > b.z1;
    const marks = [];
    // A running format's own pins go first, because on a windowed map they are the
    // only thing the player is being asked to walk to — and until this they were
    // the one class of mark with no edge arrow at all. At Planetary Defense the far
    // lap's gates are a kilometre and a half down the ridge and `mapRadius` is
    // 170 m, so the map drew the camp, nothing else, and no way to tell there was
    // anything beyond it: a lap of ground the map denied existed.
    for(const pin of drawnPins){
      const x = +pin.x, z = +pin.z;
      if(!outside(x, z)) continue;
      marks.push({ x, z, name: pin.name ?? '', colour: pin.colour ?? '#d8b23c', rank: -1 });
    }
    for(const w of wantedPeople){
      const x = w.pos?.x ?? 0, z = w.pos?.z ?? 0;
      if(!outside(x, z)) continue;
      marks.push({ x, z, name: w.char?.name ?? 'your contact',
                   colour: def(w.division)?.color ?? '#8a6410', rank: 0 });
    }
    for(const bl of site.buildings ?? []){
      if(!outside(bl.x, bl.z)) continue;
      const area = bl.group ? def(bl.group) : null;
      const isTarget = (bl.group && targetGroups.has(bl.group)) || (bl.enter && targetGroups.has(bl.enter));
      marks.push({ x: bl.x, z: bl.z, name: bl.name ?? bl.id,
                   colour: isTarget ? '#f2c14e' : (area?.color ?? '#8d867a'),
                   rank: isTarget ? 1 : area ? 2 : 3 });
    }
    // Nearest first within a rank, and only as many as the edge can carry: on a
    // mini-map there is no room for names, so there is no room for a queue of
    // arrows either.
    const dist = (m) => Math.hypot(m.x - ppos.x, m.z - ppos.z);
    marks.sort((a, c) => (a.rank - c.rank) || (dist(a) - dist(c)));
    const inset = mini ? 9 : 15;
    for(const m of marks.slice(0, mini ? 4 : 8)){
      const tx = px(m.x, m.z), ty = py(m.x, m.z);
      const dx = tx - pxx, dy = ty - pz;
      if(!dx && !dy) continue;
      // Where the line from the player to it leaves the drawing.
      const tX = dx > 0 ? (W - inset - pxx) / dx : dx < 0 ? (inset - pxx) / dx : Infinity;
      const tY = dy > 0 ? (H - inset - pz) / dy : dy < 0 ? (inset - pz) / dy : Infinity;
      const t = Math.max(0, Math.min(tX, tY));
      if(!Number.isFinite(t)) continue;
      const ex = pxx + dx * t, ey = pz + dy * t;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const size = mini ? 6 : 8;
      // A solid head sitting on the edge, tip outward.
      const hx = ex + ux * size, hy = ey + uy * size;
      const ax = ex - ux * size - uy * size * 0.72, ay = ey - uy * size + ux * size * 0.72;
      const bx = ex - ux * size + uy * size * 0.72, by = ey - uy * size - ux * size * 0.72;
      g += `<path d="M${hx.toFixed(1)},${hy.toFixed(1)} L${ax.toFixed(1)},${ay.toFixed(1)} `
         + `L${bx.toFixed(1)},${by.toFixed(1)} Z" fill="${m.colour}" stroke="#efeade" stroke-width="1.4" `
         + `stroke-linejoin="round"/>`;
      // The head is an obstacle like any footprint: two places off the same edge
      // put their arrows a few pixels apart, and without this the second one's
      // name is drawn straight through the first one's head.
      taken.push({ x0: Math.min(hx, ax, bx), x1: Math.max(hx, ax, bx),
                   y0: Math.min(hy, ay, by), y1: Math.max(hy, ay, by) });
      const away = Math.round(dist(m));
      const text = `${m.name} · ${away >= 1000 ? (away / 1000).toFixed(1) + ' km' : away + ' m'}`;
      // Anchored back inside the drawing: the label goes where the arrow came
      // from, never past the edge it is pointing over.
      g += label(ex - ux * size * 2.2, ey - uy * size * 2.2, size, size, text,
                 { weight: m.rank <= 1 ? 800 : 600, size: 10, whole: true });
      offCount++;
    }
  }

  // A stacked building says which floor this is, because the plan alone cannot:
  // all four are the same rectangle.
  const floorNote = site.plan?.floorLabel?.()
    ? `floor ${site.plan.floorLabel()}${site.plan.floorName?.() ? ` — ${site.plan.floorName()}` : ''}`
    : null;
  const legend = [site.plan ? (sideways ? 'Bow to the left' : 'Bow at the top') : 'North is up',
                  'you are the white dot']
    .concat(floorNote ? [floorNote] : [])
    .concat(targetGroups.size ? ['gold outline is a call still open — take them in any order'] : [])
    .concat(wantedPeople.length
      ? [`ringed dots are people you owe a call: ${wantedPeople.map(w => w.char?.name ?? 'a colleague').join(', ')}`]
      : [])
    .concat(offCount
      ? [`this is the ground around you — arrows on the edge point to places off it, with the distance`]
      : []);
  return `<div class="mapWrap"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" `
       + `aria-label="Map of the site"><rect width="${W}" height="${H}" fill="#efeade"/>${g}</svg>`
       + (mini ? '' : `<div class="mapLegend">${esc(legend.join(' · '))}</div>`) + `</div>`;
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
