/**
 * VoyageSystem — the crossing. The thing all of this is in service of.
 *
 * The boat has to get from Harbour Point to the far side of an ocean, and on the
 * patrol clock (an hour a real minute) that is about four months of steaming.
 * That number is not decoration: at the ordered transit speed the passage takes
 * roughly 120 patrol days, and the player can watch it tick.
 *
 * The interesting part is that going faster genuinely shortens it — and every
 * knot is on the self-noise floor, which is the same currency Missions 2 and 4
 * and the command episode all spend. A submarine's transit speed is a standing
 * argument between arriving and not being heard, and this puts that argument on
 * the chart in the control room where it belongs.
 *
 * Distance made good advances on the PATROL clock, not on real seconds, so the
 * voyage moves at the same rate as the days and the crew's fatigue.
 */

/** Legs of the crossing, west to east. Distances in nautical miles. */
export const PASSAGE_LEGS = [
  { name: 'Harbour Point', to: 'Shelf Edge', nm: 420, note: 'Off soundings and clear of the coastal traffic.' },
  { name: 'Shelf Edge', to: 'Northern Basin', nm: 3100, note: 'Deep water. Nothing to hit and nowhere to hide.' },
  { name: 'Northern Basin', to: 'The Ridge', nm: 4200, note: 'Broken ground; good for us, awkward for the plot.' },
  { name: 'The Ridge', to: 'Approach Fan', nm: 3300, note: 'Traffic thickens. The sonar watch earns its keep here.' },
  { name: 'Approach Fan', to: 'Landfall', nm: 980, note: 'Shallowing water and a lot of listeners.' },
];

export const TOTAL_NM = PASSAGE_LEGS.reduce((s, l) => s + l.nm, 0);   // 12 000 nm

/** The speed the passage was planned at. 12 000 nm at 4.2 kn ≈ 119 days. */
export const PLANNED_SPEED_KN = 4.2;

export class VoyageSystem {
  constructor({ state, eventBus }) {
    this.state = state;
    this.bus = eventBus;
    this._lastLeg = -1;
  }

  get nmMadeGood() { return this.state.voyage.nmMadeGood; }
  get nmRemaining() { return Math.max(0, TOTAL_NM - this.nmMadeGood); }
  get progress01() { return Math.min(1, this.nmMadeGood / TOTAL_NM); }

  /** Which leg we are on, and how far through it. */
  currentLeg() {
    let run = 0;
    for (let i = 0; i < PASSAGE_LEGS.length; i++) {
      const leg = PASSAGE_LEGS[i];
      if (this.nmMadeGood < run + leg.nm) {
        return { index: i, ...leg, into: this.nmMadeGood - run, frac: (this.nmMadeGood - run) / leg.nm };
      }
      run += leg.nm;
    }
    const last = PASSAGE_LEGS[PASSAGE_LEGS.length - 1];
    return { index: PASSAGE_LEGS.length - 1, ...last, into: last.nm, frac: 1 };
  }

  /** Patrol days remaining at a given speed (defaults to what we are making). */
  daysRemaining(speedKn = this.state.speed) {
    const kn = Math.max(0.2, speedKn);
    return this.nmRemaining / kn / 24;
  }

  /** Days the whole passage takes at a given speed — the planning number. */
  daysTotal(speedKn = PLANNED_SPEED_KN) {
    return TOTAL_NM / Math.max(0.2, speedKn) / 24;
  }

  /**
   * What a speed costs acoustically. Shaft rpm is roughly ten times speed in
   * knots on this boat, and the noise floor takes 0.06 dB per rpm.
   */
  noiseAtSpeed(speedKn) {
    const others = this.state.noiseFloorTarget() - this.state.propulsionState.shaftRpm * 0.06;
    return others + speedKn * 10 * 0.06;
  }

  update(dt) {
    const patrolHours = dt / 60;                 // the patrol clock's rate
    const before = this.currentLeg().index;
    this.state.voyage.nmMadeGood = Math.min(TOTAL_NM,
      this.state.voyage.nmMadeGood + this.state.speed * patrolHours);
    const leg = this.currentLeg();
    if (leg.index !== before && this._lastLeg >= 0) {
      this.bus.emit('voyage:legChanged', leg);
      this.bus.emit('hud:toast', {
        concept: `Passage — ${leg.name} to ${leg.to}`,
        text: leg.note,
      });
    }
    this._lastLeg = leg.index;
    if (this.nmRemaining <= 0 && !this.state.voyage.arrived) {
      this.state.voyage.arrived = true;
      this.bus.emit('voyage:arrived', {});
      this.bus.emit('hud:toast', { concept: 'Landfall', text: 'The crossing is complete.' });
    }
  }

  reset() {
    this.state.voyage = { nmMadeGood: 0, arrived: false };
    this._lastLeg = -1;
  }
}
