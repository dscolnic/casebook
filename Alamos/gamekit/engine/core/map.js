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
import { def, getCurrentMission, nextMissionStopIndex } from './simulation.js';
import { getPosition, camera } from './player.js';
import { esc } from './utils.js';

const PAD = 14;

/** World bounds that hold everything worth drawing. */
function bounds(site){
  const xs = [], zs = [];
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
  const W = 720, H = Math.round(W * (b.z1 - b.z0) / (b.x1 - b.x0));
  const sx = (x) => ((x - b.x0) / (b.x1 - b.x0)) * W;
  const sz = (z) => ((z - b.z0) / (b.z1 - b.z0)) * H;
  const sw = (w) => (w / (b.x1 - b.x0)) * W;
  const sd = (d) => (d / (b.z1 - b.z0)) * H;

  // Which place the mission wants next, so the map can say "here".
  const mission = getCurrentMission(state);
  const idx = mission ? nextMissionStopIndex(state) : -1;
  const targetGroup = idx >= 0 ? mission.stops[idx].group : null;

  let g = '';
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
    const isTarget = bl.group && bl.group === targetGroup;
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
         + `fill="#8a6410" font-weight="800">▼ go here</text>`;
    }
  }

  // The player, with the direction they are actually looking.
  const p = getPosition();
  const px = sx(p.x), pz = sz(p.z);
  let yaw = 0;
  if(camera){
    const d = new (p.constructor)();
    camera.getWorldDirection(d);
    yaw = Math.atan2(d.x, d.z);
  }
  const tipX = px + Math.sin(yaw) * 13, tipZ = pz + Math.cos(yaw) * 13;
  g += `<line x1="${px}" y1="${pz}" x2="${tipX}" y2="${tipZ}" stroke="#1c1b19" stroke-width="2.5"/>`
     + `<circle cx="${px}" cy="${pz}" r="6" fill="#fff" stroke="#1c1b19" stroke-width="2.5"/>`;

  return `<div class="mapWrap"><svg viewBox="0 0 ${W} ${H}" width="100%" role="img" `
       + `aria-label="Map of the site"><rect width="${W}" height="${H}" fill="#efeade"/>${g}</svg>`
       + `<div class="mapLegend">North is up · you are the white dot`
       + (targetGroup ? ` · gold outline is your next stop` : '') + `</div></div>`;
}
