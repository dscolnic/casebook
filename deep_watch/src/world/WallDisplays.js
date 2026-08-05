import * as THREE from 'three';
import { BILGE_AREA, BILGE_DEPTH_CM, PANEL_THREAT_CM, VALVES } from '../simulation/FloodingSystem.js';
import { CEIL } from './SubmarineWorld.js';
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
      // The day and how long this watchstander has been up belong on the plan of
      // the day, not only in the HUD corner — the science entry explains both, and
      // an explanation of a number that is not on the screen is no use to anybody.
      const day = Math.floor(state.dayClock.hours / 24) + 1;
      label(ctx, `patrol day ${day}   ·   ${state.fatigue.hoursAwake.toFixed(1)} h awake`,
        24, 238, state.fatigue.hoursAwake >= 18 ? C.warm : C.ink, 15);
      label(ctx, `atmosphere  O₂ ${state.oxygenLevel.toFixed(1)}%   CO₂ ${state.carbonDioxideLevel.toFixed(2)}%`,
        24, 266, C.dim, 14);
      label(ctx, 'Fictional composite vessel — training use only.', 24, 306, C.dim, 12);
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
      // Load and the ground lamp: the two numbers that say whether the
      // distribution is merely alive or actually healthy. Heating goes as the
      // square of load current, and a falling ground reading means water.
      const panels = Object.values(state.electricalPanels);
      const live = panels.filter((q) => q.energized && !q.tripped).length;
      const load = 40 + live * 18 + (state.pumpStates.portablePump.on ? 26 : 0)
        + (state.pumpStates.bilgePumpFwd.on ? 14 : 0);
      const grounded = panels.some((q) => q.tripped);
      label(ctx, `bus load ${load} A`, 20, 290, load > 120 ? C.warm : C.ink, 15);
      label(ctx, `ground detector ${grounded ? 'EARTH FAULT — insulation down' : 'clear'}`,
        190, 290, grounded ? C.danger : C.ok, 15);
      const p = state.electricalPanels.fwd_power_2f;
      label(ctx, `local panels — ${p.name}: ${p.tripped ? 'TRIPPED (ground fault)' : p.energized ? 'energized' : 'secured'}`,
        20, 314, p.tripped ? C.danger : p.energized ? C.ok : C.warm, 14);
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
      // Removal capacity, so the number you subtract inflow from is on the wall
      // rather than only in the manual.
      label(ctx, `dewatering capacity — installed 60 m³/h · portable 45 m³/h`, 20, 286, C.dim, 14);
      label(ctx, 'compare with the inflow estimate before planning to pump', 20, 306, C.dim, 13);
      void flooding; void d;
    },
  },
];

/**
 * Which science-codex entry explains each panel. Kept as an explicit map rather
 * than slugged from the title, so renaming a panel's caption cannot silently
 * detach it from its explanation.
 */
const SCIENCE_KEYS = {
  'Fwd Damage-Control Status': 'fwd_dc_status',
  'Sonar-Array Electronics': 'sonar_array_electronics',
  'Broadband Waterfall': 'broadband_waterfall',
  'Ship Control Repeater': 'ship_control_repeater',
  'Passage Plot': 'passage_plot',
  'Communications Status': 'comms_status',
  'Plan of the Day': 'plan_of_day',
  'Plant Mimic': 'plant_mimic',
  Propulsion: 'propulsion',
  Distribution: 'distribution',
  'Auxiliary & Bilge': 'auxiliary_bilge',
};

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
   * Every piece of geometry that could stand between a watchstander and a panel.
   *
   * This has to be measured from the real meshes, not from collision boxes: much
   * of the scenery is decorative and never registered a collider, and — the case
   * that actually bit — several compartments have a pipe or cable run at about
   * 1.6 m, standing 0.2–0.3 m off the bulkhead, that runs the whole length of the
   * space. That is exactly panel height, and it hides a screen completely while
   * occupying almost no floor. So collect leaf meshes with their FULL 3-D extent
   * and let the line-of-sight test decide, rather than filtering by footprint.
   */
  _collectObstacles(root) {
    const out = [];
    const box = new THREE.Box3();
    root.traverse((o) => {
      if (!o.isMesh) return;
      // Skip the panels themselves (they are added as occluders once placed).
      for (let p = o; p; p = p.parent) if (p === this.group) return;
      box.setFromObject(o);
      if (!isFinite(box.min.x)) return;
      const zSpan = box.max.z - box.min.z, xSpan = box.max.x - box.min.x;
      if (zSpan > 12 || xSpan > 4.3) return;       // the hull shell, deck and overhead
      if (box.max.y < 0.9) return;                 // below any panel we would mount
      // Indicator lamps, bolts and tags cannot hide a screen, and there are
      // thousands of them. Dropping them keeps the placement search quick — this
      // runs synchronously at start-up, so its cost is felt as load time.
      if (Math.max(xSpan, box.max.y - box.min.y, zSpan) < 0.12) return;
      out.push({
        minX: box.min.x, maxX: box.max.x,
        minY: box.min.y, maxY: box.max.y,
        minZ: box.min.z, maxZ: box.max.z,
      });
    });
    return out;
  }

  /** Slab test: does the segment from a to b enter this box before reaching b? */
  static _segmentHitsBox(a, b, box) {
    let t0 = 0, t1 = 1;
    for (const axis of ['x', 'y', 'z']) {
      const lo = box[`min${axis.toUpperCase()}`], hi = box[`max${axis.toUpperCase()}`];
      const d = b[axis] - a[axis];
      if (Math.abs(d) < 1e-9) {
        if (a[axis] < lo || a[axis] > hi) return false;
        continue;
      }
      let tA = (lo - a[axis]) / d, tB = (hi - a[axis]) / d;
      if (tA > tB) { const s = tA; tA = tB; tB = s; }
      t0 = Math.max(t0, tA);
      t1 = Math.min(t1, tB);
      if (t0 > t1) return false;
    }
    // Ignore a graze right at the panel surface (the bulkhead behind it).
    return t1 > 0.02 && t0 < 0.98;
  }

  /**
   * How much of a candidate panel a watchstander can actually see.
   *
   * Sample the panel at its centre and four inset corners, look at each of those
   * from several places a player realistically stands — down the centreline at
   * eye height, fore and aft of the panel, and from the far side of the boat —
   * and return the fraction of those sight lines that arrive unobstructed. A
   * panel scoring 1.0 is fully visible from everywhere that matters; one scoring
   * 0.3 is the thing the player has been complaining about.
   */
  _visibility(cand, occluders, c) {
    const { x, y, z, w, h, n } = cand;
    const t = { x: n.z, z: -n.x };                  // along-panel direction, in plan
    const inset = 0.22;
    const half = w / 2 - inset;
    const face = (dx, dy) => ({
      x: x + n.x * 0.06 + t.x * dx, y: y + dy, z: z + n.z * 0.06 + t.z * dx,
    });
    const targets = [face(0, 0), face(-half, h / 2 - inset), face(half, h / 2 - inset),
      face(-half, -(h / 2 - inset)), face(half, -(h / 2 - inset))];

    // Where a watchstander actually stands: down the centreline, level with the
    // panel and approaching it from either side, plus one off-axis view.
    const eye = 1.62;
    const clampZ = (v) => Math.min(c.zEnd - 0.6, Math.max(c.zStart + 0.6, v));
    const along = (d) => ({
      x: Math.abs(n.x) > 0.5 ? 0 : Math.max(-1.2, Math.min(1.2, x + t.x * d)),
      y: eye,
      z: clampZ(Math.abs(n.x) > 0.5 ? z + t.z * d : z + n.z * Math.abs(d) * 1.4),
    });
    const views = [
      { x: Math.abs(n.x) > 0.5 ? 0 : x * 0.3, y: eye, z: clampZ(Math.abs(n.x) > 0.5 ? z : z + n.z * 2.4) },
      along(-2.0),
      along(2.0),
      { x: Math.abs(n.x) > 0.5 ? n.x * (this.halfW - 0.8) : x * 0.6, y: eye,
        z: clampZ(Math.abs(n.x) > 0.5 ? z : z + n.z * 4.0) },
    ];

    let seen = 0, total = 0;
    for (const v of views) {
      for (const target of targets) {
        total++;
        if (!occluders.some((b) => WallDisplays._segmentHitsBox(v, target, b))) seen++;
      }
    }
    return seen / total;
  }

  /** Every place a panel could go in this compartment: both side walls, and the
   *  two transverse bulkheads either side of the hatch. */
  * _candidates(def, c) {
    const heights = [1.62, 1.95, 1.34];
    const widths = [def.w ?? 2.0, (def.w ?? 2.0) * 0.8, 1.35]
      .filter((v, i, a) => a.indexOf(v) === i);

    for (const w of widths) {
      const h = w * H / W;
      for (const y of heights) {
        if (y + h / 2 > CEIL - 0.1 || y - h / 2 < 0.85) continue;

        // Side walls: slide along the bulkhead.
        const halfLen = w / 2 + 0.15;
        const lo = c.zStart + halfLen + 0.35, hi = c.zEnd - halfLen - 0.35;
        for (const side of ['port', 'stbd']) {
          const sx = side === 'port' ? -1 : 1;
          const x = sx * (this.halfW - 0.16);
          for (let z = lo; z <= hi + 1e-6; z += 0.2) {
            yield { x, y, z, w, h, side, n: { x: -sx, z: 0 } };
          }
        }

        // Transverse bulkheads: the panel faces you as you come through the
        // hatch. Has to stand clear of the hatch opening, so only the outboard
        // half of the bulkhead is available.
        if (w / 2 + 0.9 > this.halfW - 0.25) continue;
        for (const [zPos, nz] of [[c.zStart + 0.14, 1], [c.zEnd - 0.14, -1]]) {
          for (const dir of [-1, 1]) {
            const xMin = 0.9 + w / 2, xMax = this.halfW - 0.25 - w / 2;
            for (let ax = xMin; ax <= xMax + 1e-6; ax += 0.2) {
              yield { x: dir * ax, y, z: zPos, w, h,
                side: nz > 0 ? 'fwd bulkhead' : 'aft bulkhead', n: { x: 0, z: nz } };
            }
          }
        }
      }
    }
  }

  /**
   * Choose where a panel goes: side, height, width and position along the
   * bulkhead, scored on how much of it can be seen. Bigger and nearer the
   * requested spot break ties, but visibility dominates — a big screen nobody can
   * read is worse than a smaller one they can.
   */
  _placeBest(def, c, allOccluders) {
    const wantZ = c.zStart + c.len * (def.zFrac ?? 0.5);
    // Only things inside this compartment can shadow a panel in it, and every
    // sight line stays inside it. Filtering first turns the search from tens of
    // millions of box tests into tens of thousands.
    const occluders = allOccluders.filter((b) =>
      b.maxZ > c.zStart - 0.6 && b.minZ < c.zEnd + 0.6);
    let best = null;

    for (const cand of this._candidates(def, c)) {
      const vis = this._visibility(cand, occluders, c);
      // Visibility dominates: a big screen nobody can read is worse than a
      // smaller one they can. Size, the requested side and the requested spot
      // only break ties between placements that are equally readable.
      const score = vis * 100
        + cand.w * 2
        + (cand.side === def.side ? 1.2 : 0)
        + (cand.y === 1.62 ? 0.5 : 0)
        - Math.min(5, Math.abs(cand.z - wantZ)) * 0.3;
      if (!best || score > best.score) best = { ...cand, vis, score };
    }

    if (!best) {
      const w = 1.35, h = w * H / W, sx = def.side === 'port' ? -1 : 1;
      best = { x: sx * (this.halfW - 0.16), y: 1.62, z: wantZ, w, h,
        side: def.side, n: { x: -sx, z: 0 }, vis: 0, score: 0 };
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

      // Where it goes is decided by what can actually be SEEN, over the whole
      // panel, from where a player stands. The x offset is fixed: the hull side
      // wall is a 0.2 m box centred on ±halfW, so its inner face is at halfW-0.1,
      // and anything mounted outboard of that is buried in the steel.
      const spot = this._placeBest(def, c, this.obstacles);
      const { w, h, x, y, z, n, side, vis } = spot;
      // A plane's normal is +Z, so this yaw turns it to face into the compartment
      // whichever surface it is hung on.
      const yaw = Math.atan2(n.x, n.z);

      // One group per panel, so the whole thing (bezel, screen, glow) is a single
      // object the interaction ray can hit and open the science entry for.
      const panel = new THREE.Group();
      panel.name = `panel_${def.title}`;
      this.group.add(panel);

      // Bezel + screen, sitting proud of the bulkhead.
      const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.07),
        new THREE.MeshStandardMaterial({ color: 0x161d22, roughness: 0.7, metalness: 0.4 }));
      bezel.position.set(x, y, z);
      bezel.rotation.y = yaw;
      panel.add(bezel);

      // Basic material — a lit screen is emissive by nature and must stay legible
      // in a dim or red-lit compartment.
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, fog: false }));
      screen.position.set(x + n.x * 0.042, y, z + n.z * 0.042);
      screen.rotation.y = yaw;
      panel.add(screen);

      // A little spill of light onto the bulkhead around it.
      const glow = new THREE.PointLight(0x2f7f8c, 0.5, 2.8, 2.0);
      glow.position.set(x + n.x * 0.4, y, z + n.z * 0.4);
      panel.add(glow);

      // A panel is furniture too. Without this, a compartment with two panels
      // puts them both on the same clear stretch of bulkhead and they z-fight.
      const tx = n.z, tz = -n.x;                    // along-panel direction
      const ex = Math.abs(tx) * w / 2 + Math.abs(n.x) * 0.12 + 0.06;
      const ez = Math.abs(tz) * w / 2 + Math.abs(n.z) * 0.12 + 0.06;
      this.obstacles.push({
        minX: x - ex, maxX: x + ex,
        minY: y - h / 2 - 0.08, maxY: y + h / 2 + 0.08,
        minZ: z - ez, maxZ: z + ez,
      });

      const d = { def, canvas, ctx, texture, screen, bezel, panel,
        science: SCIENCE_KEYS[def.title] || null, side, w, h, x, y, z, visibility: vis,
        compartment: def.compartment, index: this.layout.indexOf(c) };
      this.displays.push(d);
      this._draw(d);      // one frame immediately, so nothing is ever blank
    }
    return this.displays;
  }

  /** How visible each panel ended up, for the placement test and for debugging. */
  visibilityReport() {
    return this.displays.map((d) => ({
      title: d.def.title, compartment: d.compartment, side: d.side,
      w: +d.w.toFixed(2), y: +d.y.toFixed(2), z: +d.z.toFixed(2),
      visibility: +d.visibility.toFixed(2),
    }));
  }

  /**
   * Interaction records for the panels, so a player can press E on any screen and
   * get the physics behind what it is showing. The panels stay non-operable — you
   * still man a station to DO anything — but nothing on a bulkhead is now a wall
   * of numbers with no explanation attached.
   */
  interactableRecords() {
    return this.displays.filter((d) => d.science).map((d) => ({
      object: d.panel,
      type: 'display',
      id: `display_${d.science}`,
      prompt: `What ${d.def.title} is showing`,
      data: { display: d.science, title: d.def.title, compartment: d.compartment },
    }));
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
