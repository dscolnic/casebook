import { drawPassageMap } from '../graphics/PassageMap.js';
import { PASSAGE_LEGS, TOTAL_NM, PLANNED_SPEED_KN } from '../simulation/VoyageSystem.js';
import { guideStrip } from './StationGuide.js';

/**
 * PassageChart — the plotting board in the control room that shows the whole
 * crossing rather than the next ten miles.
 *
 * Its job is to make the size of the undertaking legible, and to put the one
 * standing decision of a transit — how fast, against how loud — in front of the
 * player as a table they can read rather than a feeling. Twelve thousand miles
 * at the planned four knots is about four months. Four knots faster is six weeks
 * saved and about two and a half decibels given away, every hour, for the whole
 * passage.
 */
export class PassageChart {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.voyage = ctx.voyage;
    this.crew = ctx.crew;
    this._raf = null;
  }

  render(container) {
    this.container = container;
    const v = this.voyage;
    const leg = v.currentLeg();

    container.innerHTML = `
      ${guideStrip({
        what: 'The passage plot: the whole crossing, where we have got to, and what it is costing.',
        doNow: `We are on leg ${leg.index + 1} of ${PASSAGE_LEGS.length}, ${Math.round(v.nmRemaining).toLocaleString()} nm still to run. `
          + 'Set a transit speed at Ship Control that you can live with acoustically.',
        why: 'Speed is the only lever that shortens a passage, and it is the same lever that makes you audible. There is no setting that is simply correct.',
      })}
      <div class="console-tile">
        <h4>Ocean Crossing</h4>
        <canvas class="passage-canvas" width="900" height="430"></canvas>
      </div>

      <div class="stat-chips">
        <div class="chip"><span class="chip-k">Distance run</span>
          <span class="chip-v">${Math.round(v.nmMadeGood).toLocaleString()} nm</span>
          <span class="chip-n">of ${TOTAL_NM.toLocaleString()} nm</span></div>
        <div class="chip"><span class="chip-k">Still to run</span>
          <span class="chip-v">${Math.round(v.nmRemaining).toLocaleString()} nm</span>
          <span class="chip-n">${leg.name} → ${leg.to}</span></div>
        <div class="chip ${v.daysRemaining() > 150 ? 'bad' : v.daysRemaining() > 60 ? 'warn' : 'good'}">
          <span class="chip-k">At this speed</span>
          <span class="chip-v">${v.daysRemaining().toFixed(0)} days</span>
          <span class="chip-n">making ${this.state.speed.toFixed(1)} kn</span></div>
        <div class="chip"><span class="chip-k">Patrol day</span>
          <span class="chip-v">${this.crew?.day ?? 1}</span>
          <span class="chip-n">clock runs an hour a minute</span></div>
      </div>

      <div class="console-tile" style="margin-top:14px;">
        <h4>What speed costs</h4>
        <table class="detect-table">
          <thead><tr><th>Speed</th><th>Whole passage</th><th>From here</th><th>Noise floor</th><th></th></tr></thead>
          <tbody>${[2, 4.2, 6, 9, 13, 18].map((kn) => {
            const noise = v.noiseAtSpeed(kn);
            const now = Math.abs(kn - this.state.speed) < 0.6;
            return `<tr class="${now ? 'selected' : ''}">
              <td class="dt-brg">${kn.toFixed(1)} kn</td>
              <td>${v.daysTotal(kn).toFixed(0)} days</td>
              <td>${v.daysRemaining(kn).toFixed(0)} days</td>
              <td class="${noise > 52 ? 'cls-warship' : noise > 47 ? 'cls-merchant' : 'cls-biologic'}">${noise.toFixed(0)} dB</td>
              <td class="console-sub">${kn === PLANNED_SPEED_KN ? 'planned transit speed'
                : noise > 52 ? 'loud — you will be heard first' : noise > 47 ? 'audible at range' : 'quiet'}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <div class="console-sub" style="margin-top:10px;">
          The passage was planned at ${PLANNED_SPEED_KN} kn — about ${v.daysTotal(PLANNED_SPEED_KN).toFixed(0)} days.
          Every row above buys days with decibels.
        </div>
      </div>

      <div class="console-tile" style="margin-top:14px;">
        <h4>Legs</h4>
        ${PASSAGE_LEGS.map((l, i) => `<div class="contact-row">
          <span>${i + 1} · <b>${l.name}</b> → ${l.to} <span class="console-sub">${l.note}</span></span>
          <span class="${i < leg.index ? 'cls-biologic' : i === leg.index ? 'cls-merchant' : 'cls-unknown'}">
            ${l.nm.toLocaleString()} nm · ${i < leg.index ? 'astern' : i === leg.index ? `${Math.round(leg.frac * 100)}% run` : 'ahead'}
          </span></div>`).join('')}
      </div>`;

    this.canvas = container.querySelector('.passage-canvas');
    this.ctx = this.canvas.getContext('2d');
    this._loop();
  }

  _loop() {
    if (this.ctx) {
      drawPassageMap(this.ctx, this.canvas.width, this.canvas.height,
        { voyage: this.voyage, state: this.state });
    }
    this._raf = requestAnimationFrame(() => this._loop());
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }
}
