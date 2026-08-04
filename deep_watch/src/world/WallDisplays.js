import * as THREE from 'three';
import { BILGE_AREA, BILGE_DEPTH_CM, PANEL_THREAT_CM, VALVES } from '../simulation/FloodingSystem.js';
import { drawPassageMap } from '../graphics/PassageMap.js';

/**
 * WallDisplays — the large mimic panels that make each compartment legible from
 * the doorway.
 *
 * A submarine compartment is not a room full of switched-off monitors: the plant
 * is running and the boat is telling you about itself on every bulkhead. These are
 * always live. You do not click them and you cannot operate them — for that you
 * still man a station — but walking into Machinery Control shows you the plant,
 * and walking into the forward space shows you the bilge, without touching
 * anything.
 *
 * Each panel is a canvas texture on a wall-mounted plane, drawn from
 * `SubmarineState` (and `FloodingSystem`) at about 10 Hz. Only panels in or next
 * to the player's compartment are redrawn; the rest keep their last frame, which
 * costs nothing and still looks alive from down the passage.
 */

const W = 640, H = 360;          // canvas pixels
const REDRAW_HZ = 10;

const C = {
  bg: '#060c11',
  panel: '#0b141b',
  line: '#22323f',
  ink: '#d7e2ea',
  dim: '#8ea0ad',
  accent: '#3fb6c2',
  warm: '#d8a24a',
  danger: '#d1594e',
  ok: '#6bbf73',
};

// ---------------------------------------------------------------------------
// Small drawing helpers, shared so every panel reads as the same equipment family
// ---------------------------------------------------------------------------

function frame(ctx, title, subtitle) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 6, W - 12, H - 12);
  ctx.fillStyle = '#0d1a22';
  ctx.fillRect(6, 6, W - 12, 34);
  ctx.fillStyle = C.accent;
  ctx.font = 'bold 17px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(title.toUpperCase(), 18, 24);
  if (subtitle) {
    ctx.fillStyle = C.dim;
    ctx.font = '13px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(subtitle, W - 18, 24);
  }
  ctx.textAlign = 'left';
}

function label(ctx, text, x, y, color = C.dim, size = 12) {
  ctx.fillStyle = color;
  ctx.font = `${size}px "Courier New", monospace`;
  ctx.fillText(text, x, y);
}

function bigValue(ctx, text, x, y, color = C.ink, size = 40) {
  ctx.fillStyle = color;
  ctx.font = `bold ${size}px "Courier New", monospace`;
  ctx.fillText(text, x, y);
}

/** Horizontal bar with an optional red limit mark. */
function bar(ctx, x, y, w, h, frac, color, limitFrac = null) {
  ctx.fillStyle = '#101c24';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.fillStyle = color;
  ctx.fillRect(x + 2, y + 2, Math.max(0, Math.min(1, frac)) * (w - 4), h - 4);
  if (limitFrac != null) {
    const lx = x + 2 + limitFrac * (w - 4);
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, y - 3);
    ctx.lineTo(lx, y + h + 3);
    ctx.stroke();
  }
}

/** A row of state pills: [{ name, on, text }] */
function pills(ctx, rows, x, y, w) {
  rows.forEach((r, i) => {
    const yy = y + i * 24;
    ctx.fillStyle = C.dim;
    ctx.font = '13px "Courier New", monospace';
    ctx.fillText(r.name, x, yy);
    const col = r.state === 'bad' ? C.danger : r.state === 'warn' ? C.warm : C.ok;
    ctx.fillStyle = col;
    ctx.textAlign = 'right';
    ctx.fillText(r.text, x + w, yy);
    ctx.textAlign = 'left';
  });
}

/** A scrolling strip-chart kept per display in `d.history`. */
function trend(ctx, d, key, value, x, y, w, h, color, opts = {}) {
  d.history = d.history || {};
  const hist = d.history[key] = d.history[key] || [];
  hist.push(value);
  if (hist.length > w) hist.shift();
  ctx.fillStyle = '#08121a';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = C.line;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  const lo = opts.min ?? Math.min(...hist);
  const hi = opts.max ?? Math.max(...hist, lo + 1);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  hist.forEach((v, i) => {
    const px = x + i;
    const py = y + h - ((v - lo) / (hi - lo || 1)) * h;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.stroke();
  ctx.lineWidth = 1;
}

// ---------------------------------------------------------------------------
// The panels themselves
// ---------------------------------------------------------------------------

const DISPLAYS = [
  {
    compartment: 'forward_equipment', side: 'port', zFrac: 0.28,
    title: 'Fwd Damage-Control Status',
    draw(ctx, { state, flooding, d }) {
      const level = state.bilgeLevels.forward_equipment ?? 0;
      const rate = flooding?.riseRateCmPerMin('forward_equipment') ?? 0;
      const src = state.floodingSources.find((f) => f.compartment === 'forward_equipment');
      frame(ctx, 'Fwd Damage-Control Status', state.formatClock());

      label(ctx, 'FORWARD BILGE LEVEL', 20, 62);
      bigValue(ctx, `${level.toFixed(0)}`, 20, 100, level > PANEL_THREAT_CM ? C.danger : level > 8 ? C.warm : C.ok, 44);
      label(ctx, 'cm', 92, 100, C.dim, 18);
      bar(ctx, 20, 118, 280, 18, level / BILGE_DEPTH_CM,
        level > PANEL_THREAT_CM ? C.danger : C.accent, PANEL_THREAT_CM / BILGE_DEPTH_CM);
      label(ctx, `red mark = fwd power panel gland at ${PANEL_THREAT_CM} cm`, 20, 152);
      label(ctx, `${rate > 0 ? '+' : ''}${rate.toFixed(1)} cm/min`, 20, 174,
        rate > 0.05 ? C.danger : rate < -0.05 ? C.ok : C.dim, 16);
      label(ctx, `bilge plan area ${BILGE_AREA.forward_equipment} m²`, 20, 194);

      trend(ctx, d, 'level', level, 330, 56, 290, 84, C.accent, { min: 0, max: BILGE_DEPTH_CM });
      label(ctx, 'level trend', 330, 152);

      label(ctx, 'SEAWATER MANIFOLD LINEUP', 330, 178, C.dim);
      pills(ctx, Object.keys(VALVES).map((v) => ({
        name: VALVES[v].label.split('—')[0].trim().slice(0, 20),
        text: state.valveStates[v] === 'shut' ? 'SHUT' : 'OPEN',
        state: state.valveStates[v] === 'shut' ? 'warn' : 'good',
      })), 330, 200, 290);

      const panel = state.electricalPanels.fwd_power_2f;
      pills(ctx, [
        { name: 'fwd power panel 2F', text: panel.tripped ? 'TRIPPED' : panel.energized ? 'ENERGIZED' : 'SECURED',
          state: panel.tripped ? 'bad' : panel.energized ? 'good' : 'warn' },
        { name: 'source', text: !src ? 'no casualty' : src.repair?.holding ? 'SEALED' : src.isolated ? 'isolated' : 'OPEN TO SEA',
          state: !src || src.repair?.holding ? 'good' : src.isolated ? 'warn' : 'bad' },
        { name: 'portable pump', text: state.pumpStates.portablePump.on ? 'RUNNING' : 'stopped',
          state: state.pumpStates.portablePump.on ? 'good' : 'warn' },
      ], 20, 224, 280);
    },
  },
  {
    compartment: 'sonar_electronics', side: 'port', zFrac: 0.5,
    title: 'Sonar-Array Electronics',
    draw(ctx, { state, d }) {
      const t = state.compartmentTemperature.sonar_electronics ?? 26;
      const cool = state.coolingLoops.sonarArray;
      frame(ctx, 'Sonar-Array Electronics', state.formatClock());
      label(ctx, 'CABINET TEMPERATURE', 20, 62);
      bigValue(ctx, `${t.toFixed(1)}°`, 20, 106, t > 55 ? C.danger : t > 40 ? C.warm : C.ok, 46);
      bar(ctx, 20, 124, 280, 18, t / 80, t > 55 ? C.danger : t > 40 ? C.warm : C.accent, 55 / 80);
      label(ctx, 'red mark = 55 °C cabinet limit', 20, 158);
      trend(ctx, d, 'temp', t, 330, 56, 290, 100, t > 40 ? C.warm : C.accent, { min: 20, max: 70 });
      label(ctx, 'temperature trend', 330, 170);
      pills(ctx, [
        { name: 'cooling water flow', text: cool?.flow ? 'FLOWING' : 'NO FLOW', state: cool?.flow ? 'good' : 'bad' },
        { name: 'supply header', text: state.valveStates.fwd_sw_supply_inbd === 'open' ? 'fwd (open)' : 'fwd SHUT',
          state: state.valveStates.fwd_sw_supply_inbd === 'open' ? 'good' : 'warn' },
        { name: 'aft cross-connect', text: state.valveStates.sw_crossconnect === 'open' ? 'OPEN' : 'shut',
          state: state.valveStates.sw_crossconnect === 'open' ? 'good' : 'warn' },
        { name: 'array processing', text: cool?.flow ? 'nominal' : 'DERATED', state: cool?.flow ? 'good' : 'bad' },
      ], 20, 196, 280);
    },
  },
  {
    compartment: 'sonar_room', side: 'stbd', zFrac: 0.62, w: 2.2, h: 1.2,
    title: 'Broadband Waterfall',
    draw(ctx, { state, d }) {
      const x0 = 16, y0 = 46, w = W - 32, h = 232;

      // The waterfall has to survive the panel being repainted each frame, so it
      // lives on its own canvas and is blitted in. Scroll it down one row, then
      // paint the newest line at the top.
      if (!d.wf) {
        d.wf = document.createElement('canvas');
        d.wf.width = w; d.wf.height = h;
        const c0 = d.wf.getContext('2d');
        c0.fillStyle = '#04090c';
        c0.fillRect(0, 0, w, h);
      }
      const wf = d.wf.getContext('2d');
      wf.drawImage(d.wf, 0, 1);
      wf.fillStyle = '#04090c';
      wf.fillRect(0, 0, w, 1);

      const noise = Math.max(0, (state.sonarNoiseFloor - 40) / 30);
      for (let i = 0; i < w; i++) {
        if (Math.random() < 0.05 + noise * 0.16) {
          const g = 20 + Math.random() * 45;
          wf.fillStyle = `rgb(${g * 0.4},${g},${g})`;
          wf.fillRect(i, 0, 1, 1);
        }
      }
      const contacts = [
        { b: 312, c: 0.7 }, { b: 47, c: 0.55 },
        ...(state.sonarNoiseFloor < 50 ? [{ b: 158, c: 0.22 }] : []),
      ];
      for (const k of contacts) {
        const px = Math.round((k.b / 360) * w) + Math.round((Math.random() - 0.5) * 3);
        const br = 120 + k.c * 130 - noise * 60;
        wf.fillStyle = `rgb(${br * 0.4},${br},${br})`;
        wf.fillRect(px, 0, 2, 1);
      }
      // An internal flow noise smears across bearing instead of holding a line.
      if (state.machineryNoiseSources.some((n) => n.id === 'flood_flow')) {
        const px = Math.round((((state.heading + 15) % 360) / 360) * w);
        wf.fillStyle = `rgba(216,162,74,${0.45 + Math.random() * 0.3})`;
        wf.fillRect(px - 5, 0, 11, 1);
      }

      frame(ctx, 'Broadband — Bearing × Time', `floor ${Math.round(state.sonarNoiseFloor)} dB`);
      ctx.drawImage(d.wf, x0, y0);
      ctx.strokeStyle = C.line;
      ctx.strokeRect(x0 + 0.5, y0 + 0.5, w - 1, h - 1);
      ctx.fillStyle = C.dim;
      ctx.font = '11px "Courier New", monospace';
      for (let b = 0; b <= 360; b += 60) ctx.fillText(String(b).padStart(3, '0'), x0 + (b / 360) * w, y0 + h + 14);
      label(ctx, state.sonarNoiseFloor > 50
        ? 'OWN-SHIP NOISE HIGH — weak contacts masked'
        : 'own-ship quiet — weak contacts held',
        x0, H - 18, state.sonarNoiseFloor > 50 ? C.danger : C.ok, 13);
    },
  },
  {
    compartment: 'control_room', side: 'stbd', zFrac: 0.24, w: 2.2, h: 1.2,
    title: 'Ship Control Repeater',
    draw(ctx, { state, d }) {
      frame(ctx, 'Ship Control Repeater', state.formatClock());
      const effort = state.depthControlEffort();
      label(ctx, 'DEPTH', 20, 62);
      bigValue(ctx, `${state.depth.toFixed(1)}`, 20, 104, state.depth > state.orderedDepth + 1.5 ? C.warm : C.ink, 42);
      label(ctx, `m   ordered ${Math.round(state.orderedDepth)} m`, 150, 104, C.dim, 15);
      label(ctx, `rate ${state.verticalRate >= 0 ? '+' : ''}${state.verticalRate.toFixed(2)} m/min`, 20, 128);

      label(ctx, 'TRIM', 340, 62);
      bigValue(ctx, `${state.trim >= 0 ? '+' : ''}${state.trim.toFixed(2)}°`, 340, 104,
        Math.abs(state.trim) > 0.5 ? C.warm : C.ink, 42);
      label(ctx, state.trim > 0.05 ? 'bow-down' : state.trim < -0.05 ? 'bow-up' : 'even keel', 340, 128);

      label(ctx, `HEAD ${Math.round(state.heading).toString().padStart(3, '0')}°`, 20, 162, C.ink, 16);
      label(ctx, `SPEED ${state.speed.toFixed(1)} kn`, 170, 162, C.ink, 16);
      label(ctx, `WATER EMBARKED ${state.floodMass_t.toFixed(1)} t`, 340, 162,
        state.floodMass_t > 0.5 ? C.warm : C.dim, 16);

      label(ctx, 'DEPTH-CONTROL EFFORT', 20, 194);
      bar(ctx, 20, 202, 280, 20, effort / 100, effort > 45 ? C.danger : effort > 30 ? C.warm : C.ok, 0.45);
      label(ctx, `${Math.round(effort)} %`, 310, 218, C.ink, 16);

      trend(ctx, d, 'depth', state.depth, 340, 190, 280, 74, C.accent);
      label(ctx, 'depth trend', 340, 278);

      pills(ctx, [
        { name: 'planes', text: 'responding normally', state: 'good' },
        { name: 'main ballast', text: 'on plan', state: 'good' },
      ], 20, 250, 280);
    },
  },
  {
    compartment: 'control_room', side: 'port', zFrac: 0.78, w: 2.2,
    title: 'Passage Plot',
    draw(ctx, { state, voyage }) {
      if (!voyage) return;
      drawPassageMap(ctx, W, H, { voyage, state, title: 'Passage — Ocean Crossing' });
    },
  },
  {
    compartment: 'radio_room', side: 'stbd', zFrac: 0.5,
    title: 'Communications Status',
    draw(ctx, { state }) {
      const cs = state.communicationState;
      frame(ctx, 'Communications Status', state.formatClock());
      label(ctx, 'EMCON STATE', 20, 66);
      bigValue(ctx, cs.emconState, 20, 116, C.accent, 52);
      label(ctx, 'transmitting exposes the boat; receiving does not', 20, 146);
      pills(ctx, [
        { name: 'antenna', text: cs.antennaAvailable ? 'available' : 'housed', state: cs.antennaAvailable ? 'good' : 'warn' },
        { name: 'traffic pending', text: String(cs.pendingMessages), state: cs.pendingMessages ? 'warn' : 'good' },
        { name: 'depth for mast', text: state.depth < 20 ? 'at PD' : `${Math.round(state.depth)} m — too deep`,
          state: state.depth < 20 ? 'good' : 'warn' },
      ], 20, 186, W - 40);
    },
  },
  {
    compartment: 'berthing_mess', side: 'stbd', zFrac: 0.72,
    title: 'Plan of the Day',
    draw(ctx, { state }) {
      frame(ctx, 'Plan of the Day', state.formatClock());
      const rows = [
        ['0400', 'Watch relief — sonar, control, machinery'],
        ['0800', 'Trim and drain evolution'],
        ['1200', 'Damage-control drill: forward flooding'],
        ['1600', 'Atmosphere sampling, all compartments'],
        ['2000', 'Rig for reduced electrical'],
      ];
      rows.forEach((r, i) => {
        label(ctx, r[0], 24, 74 + i * 30, C.accent, 15);
        label(ctx, r[1], 84, 74 + i * 30, C.ink, 15);
      });
      label(ctx, `atmosphere  O₂ ${state.oxygenLevel.toFixed(1)}%   CO₂ ${state.carbonDioxideLevel.toFixed(2)}%`,
        24, 240, C.dim, 14);
      label(ctx, 'Fictional composite vessel — training use only.', 24, 300, C.dim, 12);
    },
  },
  {
    compartment: 'machinery_control', side: 'port', zFrac: 0.5, w: 2.2, h: 1.2,
    title: 'Plant Mimic',
    draw(ctx, { state, flooding, d }) {
      frame(ctx, 'Plant Mimic', state.formatClock());
      label(ctx, 'ELECTRICAL', 20, 62, C.accent, 13);
      pills(ctx, Object.entries(state.electricalBuses).map(([id, b]) => ({
        name: id, text: b.energized ? `${b.voltage} V ${b.source}` : 'DE-ENERGIZED',
        state: b.energized ? 'good' : 'bad',
      })), 20, 84, 270);

      label(ctx, 'COOLING', 20, 168, C.accent, 13);
      pills(ctx, Object.entries(state.coolingLoops).map(([id, c]) => ({
        name: id, text: `${c.tempC.toFixed(0)}°C  flow ${(c.flow * 100).toFixed(0)}%`,
        state: c.tempC > 55 ? 'bad' : c.tempC > 45 ? 'warn' : 'good',
      })), 20, 190, 270);

      label(ctx, 'PUMPS', 330, 62, C.accent, 13);
      pills(ctx, Object.entries(state.pumpStates).map(([id, p]) => ({
        name: id.replace(/([A-Z])/g, ' $1').toLowerCase(), text: p.on ? 'RUNNING' : 'stopped',
        state: p.on ? 'good' : 'warn',
      })), 330, 84, 290);

      label(ctx, 'SELF-NOISE FLOOR', 330, 216, C.accent, 13);
      bar(ctx, 330, 226, 290, 18, (state.sonarNoiseFloor - 40) / 25,
        state.sonarNoiseFloor > 50 ? C.danger : C.ok, (50 - 40) / 25);
      label(ctx, `${Math.round(state.sonarNoiseFloor)} dB — every running pump costs about 3 dB`, 330, 262);

      const levels = Object.entries(state.bilgeLevels).filter(([, v]) => v > 0.5);
      label(ctx, levels.length
        ? `BILGES: ${levels.map(([k, v]) => `${k.replace(/_/g, ' ')} ${v.toFixed(0)} cm`).join('   ')}`
        : 'BILGES DRY', 20, 300, levels.length ? C.warm : C.dim, 14);
      void flooding; void d;
    },
  },
  {
    compartment: 'propulsion', side: 'port', zFrac: 0.78,
    title: 'Propulsion',
    draw(ctx, { state, d }) {
      frame(ctx, 'Propulsion', state.formatClock());
      const rpm = state.propulsionState.shaftRpm;
      label(ctx, 'SHAFT', 20, 62);
      bigValue(ctx, `${Math.round(rpm)}`, 20, 108, C.ink, 46);
      label(ctx, 'rpm', 110, 108, C.dim, 18);
      bar(ctx, 20, 126, 280, 18, rpm / 180, C.accent);
      label(ctx, `mode ${state.propulsionState.mode} · ${state.propulsionState.online ? 'online' : 'OFFLINE'}`, 20, 158);
      trend(ctx, d, 'rpm', rpm, 330, 56, 290, 100, C.accent, { min: 0, max: 180 });
      label(ctx, 'shaft trend', 330, 170);
      pills(ctx, [
        { name: 'lube oil', text: 'normal', state: 'good' },
        { name: 'thrust bearing', text: `${(34 + rpm * 0.05).toFixed(0)}°C`, state: 'good' },
        { name: 'cavitation', text: state.depth < 30 && state.speed > 12 ? 'RISK' : 'none', state: state.depth < 30 && state.speed > 12 ? 'warn' : 'good' },
      ], 20, 196, 280);
    },
  },
  {
    compartment: 'electrical', side: 'port', zFrac: 0.6,
    title: 'Distribution',
    draw(ctx, { state }) {
      frame(ctx, 'Electrical Distribution', state.formatClock());
      const buses = Object.entries(state.electricalBuses);
      buses.forEach(([id, b], i) => {
        const y = 66 + i * 74;
        label(ctx, id, 20, y, C.ink, 16);
        bar(ctx, 20, y + 10, 380, 22, b.energized ? 1 : 0, b.energized ? C.ok : C.danger);
        label(ctx, b.energized ? `${b.voltage} V · ${b.source}` : 'DE-ENERGIZED', 420, y + 26,
          b.energized ? C.ok : C.danger, 15);
      });
      const p = state.electricalPanels.fwd_power_2f;
      label(ctx, `local panels — ${p.name}: ${p.tripped ? 'TRIPPED (ground fault)' : p.energized ? 'energized' : 'secured'}`,
        20, 306, p.tripped ? C.danger : p.energized ? C.ok : C.warm, 14);
    },
  },
  {
    compartment: 'auxiliary', side: 'stbd', zFrac: 0.3,
    title: 'Auxiliary & Bilge',
    draw(ctx, { state, flooding, d }) {
      const level = state.bilgeLevels.auxiliary ?? 0;
      frame(ctx, 'Auxiliary & Bilge', state.formatClock());
      label(ctx, 'AFTER BILGE LEVEL', 20, 62);
      bigValue(ctx, `${level.toFixed(0)}`, 20, 104, level > 8 ? C.warm : C.ok, 42);
      label(ctx, 'cm', 92, 104, C.dim, 18);
      bar(ctx, 20, 122, 280, 18, level / BILGE_DEPTH_CM, C.accent);
      trend(ctx, d, 'aux', level, 330, 56, 290, 90, C.accent, { min: 0, max: 40 });
      pills(ctx, [
        { name: 'after bilge pump', text: state.pumpStates.bilgePumpAft.on ? 'RUNNING' : 'stopped',
          state: state.pumpStates.bilgePumpAft.on ? 'good' : 'warn' },
        { name: 'seawater pump', text: state.pumpStates.seawaterPump.on ? 'RUNNING' : 'stopped',
          state: state.pumpStates.seawaterPump.on ? 'good' : 'warn' },
        { name: 'air compressor', text: 'standby', state: 'good' },
        { name: 'heat exchanger', text: `${(state.coolingLoops.secondary.tempC).toFixed(0)}°C`, state: 'good' },
      ], 20, 180, 280);
      void flooding; void d;
    },
  },
];

export class WallDisplays {
  constructor({ scene, materials, layout, state, flooding, halfWidth, collision, voyage }) {
    this.scene = scene;
    this.mat = materials;
    this.layout = layout;
    this.state = state;
    this.flooding = flooding;
    this.voyage = voyage;
    this.halfW = halfWidth;
    this.collision = collision;
    this.displays = [];
    this._acc = 0;
    this.group = new THREE.Group();
    this.group.name = 'WallDisplays';
    scene.add(this.group);
  }

  /**
   * Every piece of furniture tall enough to hide a panel.
   *
   * The collision boxes alone are not enough: plenty of scenery (the seawater
   * manifold block, valve stands, the plotting board) is decorative and never
   * registered a collider, and a panel placed behind one of those is invisible.
   * So measure the actual geometry, and keep only the things that could occlude:
   * tall enough to matter, short enough not to be the hull itself.
   */
  _collectObstacles(root) {
    const out = [];
    const box = new THREE.Box3();
    for (const child of root.children) {
      if (child === this.group) continue;
      box.setFromObject(child);
      if (!isFinite(box.min.x)) continue;
      const zSpan = box.max.z - box.min.z;
      const xSpan = box.max.x - box.min.x;
      if (zSpan > 6 || xSpan > 4.2) continue;      // hull shell, deck, overhead runs
      if (box.max.y < 1.1) continue;               // too low to hide a panel
      out.push({ minX: box.min.x, maxX: box.max.x, minZ: box.min.z, maxZ: box.max.z });
    }
    return out;
  }

  /** Find a length of this compartment's bulkhead that is not already occupied. */
  _clearZ(c, side, w, wantZ) {
    const halfLen = w / 2 + 0.15;
    const lo = c.zStart + halfLen + 0.4, hi = c.zEnd - halfLen - 0.4;
    if (hi <= lo) return null;
    const sx = side === 'port' ? -1 : 1;
    const inner = sx * (this.halfW - 0.95);        // how far a prop may stand off
    const xMin = Math.min(inner, sx * this.halfW), xMax = Math.max(inner, sx * this.halfW);

    const clear = (z) => !this.obstacles.some((b) =>
      b.maxX > xMin && b.minX < xMax && b.maxZ > z - halfLen && b.minZ < z + halfLen);

    let best = null, bestD = Infinity;
    for (let z = lo; z <= hi; z += 0.1) {
      if (!clear(z)) continue;
      const d = Math.abs(z - wantZ);
      if (d < bestD) { bestD = d; best = z; }
    }
    return best;
  }

  build(worldRoot) {
    this.obstacles = worldRoot ? this._collectObstacles(worldRoot) : [];

    for (const def of DISPLAYS) {
      const c = this.layout.find((x) => x.id === def.compartment);
      if (!c) continue;

      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;

      // Take the biggest panel that fits on a clear stretch of bulkhead, trying
      // the compartment's preferred side first and then the other one.
      const wantZ = c.zStart + c.len * (def.zFrac ?? 0.5);
      let w = def.w ?? 2.0, side = def.side, z = null;
      outer:
      for (const width of [w, 1.7, 1.4, 1.15]) {
        for (const s of [def.side, def.side === 'port' ? 'stbd' : 'port']) {
          const found = this._clearZ(c, s, width, wantZ);
          if (found != null) { w = width; side = s; z = found; break outer; }
        }
      }
      if (z == null) { z = wantZ; w = 1.15; }      // nowhere clear: put it where asked

      const h = w * H / W;
      const sx = side === 'port' ? -1 : 1;
      // The hull side wall is a 0.2 m box centred on ±halfW, so its inner face is
      // at halfW - 0.1. Anything mounted outboard of that is buried in the steel —
      // which is exactly what went wrong the first time these were placed.
      const x = sx * (this.halfW - 0.16);
      // Mounted high enough to clear a console but still read from the doorway.
      const y = 1.62;

      // Bezel + screen, sitting proud of the bulkhead.
      const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.07),
        new THREE.MeshStandardMaterial({ color: 0x161d22, roughness: 0.7, metalness: 0.4 }));
      bezel.position.set(x, y, z);
      bezel.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.group.add(bezel);

      // Basic material — a lit screen is emissive by nature and must stay legible
      // in a dim or red-lit compartment.
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, fog: false }));
      screen.position.set(x - sx * 0.042, y, z);
      screen.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
      this.group.add(screen);

      // A little spill of light onto the bulkhead around it.
      const glow = new THREE.PointLight(0x2f7f8c, 0.5, 2.8, 2.0);
      glow.position.set(x - sx * 0.4, y, z);
      this.group.add(glow);

      const d = { def, canvas, ctx, texture, screen, bezel, compartment: def.compartment, index: this.layout.indexOf(c) };
      this.displays.push(d);
      this._draw(d);      // one frame immediately, so nothing is ever blank
    }
    return this.displays;
  }

  _draw(d) {
    try {
      d.def.draw(d.ctx, { state: this.state, flooding: this.flooding, voyage: this.voyage, d });
      d.texture.needsUpdate = true;
    } catch (err) {
      console.warn('[WallDisplays] draw failed for', d.compartment, err);
    }
  }

  /** Redraw the panels the player can plausibly see, at a capped rate. */
  update(dt, currentCompartmentId) {
    this._acc += dt;
    if (this._acc < 1 / REDRAW_HZ) return;
    this._acc = 0;
    const here = this.layout.findIndex((c) => c.id === currentCompartmentId);
    if (here < 0) return;
    for (const d of this.displays) {
      if (Math.abs(d.index - here) <= 1) this._draw(d);
    }
  }

  /** Share a compartment's live feed onto a station console screen. */
  textureFor(compartmentId) {
    return this.displays.find((d) => d.compartment === compartmentId)?.texture ?? null;
  }
}
