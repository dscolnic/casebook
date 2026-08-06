import { guideStrip } from './StationGuide.js';
import {
  NORMAL, O2_DEFICIENT, CO2_UNCOMFORTABLE, CO2_ROUTINE, CO_ALARM_PPM, OCCUPANCY,
} from '../simulation/AtmosphereSystem.js';

/**
 * AtmosphereControl — the ventilation board, and the place where an installed
 * sensor gets compared with a measurement.
 *
 * The board can only ever show what its sensors report. So this station puts the
 * two side by side: the installed reading for every compartment, and the last
 * handheld reading the player took there. Where they disagree, one of them is
 * wrong — and the player has to say WHICH, because "the panel is bad" and "the air
 * is bad" need opposite responses:
 *
 *   real degradation    fix the air: open the damper, run the fans, scrub
 *   sensor failure      fix the instrument, and do not chase a number
 *
 * Calling a sensor fault on a compartment that is genuinely going bad is the
 * dangerous error, so the board lets you make it and then shows you the
 * consequence in the air itself.
 *
 * Lineage: Casebook (`nc_greywake_case`) — an indication and its repeat are one
 * witness — and Diagnosis (`nc_flooding_diag`) for the discipline of explaining
 * every compartment, including the ones that read normal.
 */
export class AtmosphereControl {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.atmosphere = ctx.atmosphere;
    this.instruments = ctx.instruments;
    this.layout = ctx.atmosphere?.layout ?? [];
  }

  /** The most recent handheld gas reading the player took in a compartment. */
  _handheld(compartmentId) {
    const readings = (this.instruments?.lastReadings ?? [])
      .filter((r) => r.instrument === 'gas_detector' && r.compartment === compartmentId);
    return readings.length ? readings[readings.length - 1] : null;
  }

  render(container) {
    this.container = container;
    container.innerHTML = `
      <div id="atm-guide"></div>
      <div id="atm-body"></div>
      <div id="atm-msg" class="console-sub" style="margin-top:12px;"></div>`;
    this._render();
  }

  _guide() {
    const worst = this.atmosphere.worst();
    const shutDampers = this.layout.filter((c) => this.state.ventDampers[c.id] === 'shut');
    const v = this.state.ventilationRoutes;
    let doNow;
    if (!v.supply) {
      doNow = 'The supply fan is stopped. Nothing is being scrubbed anywhere — start it before you look at anything else.';
    } else if (shutDampers.length) {
      doNow = `${shutDampers.length} compartment${shutDampers.length > 1 ? 's are' : ' is'} shut off from the ventilation `
        + `(${shutDampers.map((c) => c.name).join(', ')}). Air in there is on its own: nothing scrubs it and nothing refreshes it.`;
    } else if (worst && worst.air.co2 > CO2_UNCOMFORTABLE) {
      doNow = `${worst.id.replace(/_/g, ' ')} is above ${CO2_UNCOMFORTABLE} % CO₂ with the ventilation lined up. `
        + 'Check the scrubber, and check whether that reading is real by measuring it yourself.';
    } else {
      doNow = 'Ventilation lined up and every compartment inside limits. Compare a handheld reading against the board now and then anyway.';
    }
    return guideStrip({
      what: 'Ventilation and atmosphere control. Each compartment has a damper, a sensor, and people in it breathing.',
      doNow,
      why: 'This board shows what the SENSORS report. A handheld gas detector shows what the air is doing. When those two disagree, only one of them is a measurement.',
    });
  }

  _render() {
    this.container.querySelector('#atm-guide').innerHTML = this._guide();
    const v = this.state.ventilationRoutes;

    const rows = this.layout.map((c) => {
      const truth = this.atmosphere.measure(c.id);
      const sensor = this.atmosphere.sensorReading(c.id);
      const hand = this._handheld(c.id);
      const damper = this.state.ventDampers[c.id];
      const called = this.state.atmosphereCalls?.[c.id];
      // The player only "knows" a handheld figure if they actually took one.
      const handTxt = hand
        ? `CO₂ ${hand.numeric.toFixed(2)} % <span class="console-sub">at ${hand.clock}</span>`
        : '<span class="console-sub">not measured</span>';
      const mismatch = hand && Math.abs(hand.numeric - sensor.co2) > 0.15;
      return `<tr>
        <td>${c.name}</td>
        <td>${OCCUPANCY[c.id] ?? 0}</td>
        <td style="color:${damper === 'open' ? 'var(--ok)' : 'var(--warm, #d8a24a)'}">${damper}</td>
        <td style="color:${sensor.co2 > CO2_UNCOMFORTABLE ? 'var(--danger)' : sensor.co2 > CO2_ROUTINE ? 'var(--accent-warm)' : 'var(--ok)'}">
          CO₂ ${sensor.co2.toFixed(2)} % · O₂ ${sensor.o2.toFixed(1)} %</td>
        <td class="${mismatch ? 'ev-val bad' : ''}">${handTxt}</td>
        <td>
          <button class="station-btn" data-call="real" data-comp="${c.id}">Air is bad</button>
          <button class="station-btn" data-call="sensor" data-comp="${c.id}">Sensor is bad</button>
          ${called ? `<span class="console-sub">called: ${called}</span>` : ''}
        </td>
      </tr>`;
    }).join('');

    this.container.querySelector('#atm-body').innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(4,1fr); margin-bottom:12px;">
        ${[['supply', 'Supply fan'], ['exhaust', 'Exhaust fan'], ['scrubber', 'CO₂ scrubber'], ['o2gen', 'O₂ generator']]
          .map(([id, label]) => `
          <div class="console-tile">
            <h4>${label}</h4>
            <div class="console-readout" style="color:${v[id] ? 'var(--ok)' : 'var(--danger)'}">${v[id] ? 'RUNNING' : 'STOPPED'}</div>
            <button class="station-btn ${v[id] ? 'active' : ''}" data-route="${id}">${v[id] ? 'Stop' : 'Start'}</button>
          </div>`).join('')}
      </div>
      <table class="bearing-table">
        <tr><th>Compartment</th><th>People</th><th>Damper</th><th>Installed sensor</th><th>Your handheld</th><th>Call it</th></tr>
        ${rows}
      </table>
      <div class="console-sub" style="margin-top:10px;">
        Normal air is ${NORMAL.o2} % O₂ and about ${NORMAL.co2} % CO₂. Aboard, ${CO2_ROUTINE} % CO₂ is routine;
        ${CO2_UNCOMFORTABLE} % costs you concentration; below ${O2_DEFICIENT} % O₂ is oxygen-deficient;
        ${CO_ALARM_PPM} ppm CO is an action level.
      </div>`;

    this.container.querySelectorAll('[data-route]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.dataset.route;
        this.atmosphere.setRoute(id, !this.state.ventilationRoutes[id]);
        this._msg(this.state.ventilationRoutes[id]
          ? `${id} started.`
          : `${id} stopped — everything downstream of it stops with it.`);
        this._render();
      }));

    this.container.querySelectorAll('[data-call]').forEach((b) =>
      b.addEventListener('click', () => this._call(b.dataset.comp, b.dataset.call)));
  }

  _msg(text, bad = false) {
    const el = this.container.querySelector('#atm-msg');
    if (el) el.innerHTML = `<span style="color:${bad ? 'var(--danger)' : 'var(--ok)'}">${text}</span>`;
  }

  /**
   * The call: is this compartment's problem in the air or in the instrument? The
   * board does not know — it is a sensor reading a sensor. What decides it is
   * whether the player went and measured, and the truth underneath.
   */
  _call(compartmentId, kind) {
    if (!this.state.atmosphereCalls) this.state.atmosphereCalls = {};
    const truth = this.atmosphere.measure(compartmentId);
    const sensorBad = this.atmosphere.sensorDisagrees(compartmentId);
    const airBad = truth.co2 > CO2_UNCOMFORTABLE || truth.o2 < O2_DEFICIENT || truth.co > CO_ALARM_PPM;
    const correct = kind === 'sensor' ? (sensorBad && !airBad) : (airBad);
    const hand = this._handheld(compartmentId);
    this.state.atmosphereCalls[compartmentId] = kind;

    this.bus.emit('atmosphere:called', {
      compartment: compartmentId, kind, correct, airBad, sensorBad, measured: !!hand,
    });

    const name = compartmentId.replace(/_/g, ' ');
    if (!hand) {
      this._msg(`Called without measuring ${name}. You are deciding whether the sensor is lying using only the sensor.`, true);
    } else if (correct && kind === 'sensor') {
      this._msg(`${name}: the air is fine and the sensor is not. Tag the instrument; do not chase the number.`);
    } else if (correct) {
      this._msg(`${name}: the air really is going bad. Ventilation and scrubbing — the instrument is not the problem.`);
    } else if (kind === 'sensor' && airBad) {
      this._msg(`${name}: calling this a sensor fault leaves people breathing it. Your own handheld reading says the air is out of limits.`, true);
    } else {
      this._msg(`${name}: the air here is within limits — what disagrees is the instrument, not the atmosphere.`, true);
    }
    this._render();
  }

  dispose() {}
}
