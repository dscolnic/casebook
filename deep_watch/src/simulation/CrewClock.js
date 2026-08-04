/**
 * CrewClock — the patrol clock and the state of the person standing the watch.
 *
 * The boat's physics run in real seconds; a flooding rate has to mean something
 * you can watch. But a patrol is measured in days, and nobody wants to sit
 * through one. So there are two clocks, deliberately:
 *
 *   state.clock      the WATCH clock, real-time, used by every mission, reading,
 *                    rate and interval. Untouched by this module.
 *   state.dayClock   the PATROL clock, running an hour per real minute, used for
 *                    fatigue, sleep, and which qualification questions have been
 *                    released. Only this module advances it.
 *
 * Keeping them separate is the whole design. If the patrol clock drove the
 * physics, a 60× speed-up would make a bilge rise a metre a second and turn a
 * "sound it twice, thirty seconds apart" lesson into a keypress.
 *
 * Fatigue is the one thing the fast clock feeds back into play: go long enough
 * without sleep and the watch degrades — which is a real submarine problem and a
 * real reason to plan rest around a casualty rather than after it.
 */

/** Real seconds per patrol hour. One hour a minute. */
const SECONDS_PER_PATROL_HOUR = 60;

/** Hours awake at which the watch starts to suffer, and where it bottoms out. */
export const FATIGUE_WARN_H = 18;
export const FATIGUE_BLUR_H = 20;
export const FATIGUE_MAX_H = 32;

/** A standard rest period. */
export const SLEEP_HOURS = 6;

export class CrewClock {
  constructor({ state, eventBus, save }) {
    this.state = state;
    this.bus = eventBus;
    this.save = save;
    this._warned = 0;
    this._lastDay = 0;
  }

  /** Patrol day, counting from 1. New qualification questions release each day. */
  get day() { return Math.floor(this.state.dayClock.hours / 24) + 1; }

  /** Time of day as HH:MM on the patrol clock. */
  formatPatrolTime() {
    const h = Math.floor(this.state.dayClock.hours % 24);
    const m = Math.floor((this.state.dayClock.hours % 1) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  get hoursAwake() { return this.state.fatigue.hoursAwake; }

  /** 0 (rested) → 1 (wrecked). Drives the blur and the HUD warning. */
  get fatigue01() {
    const a = this.hoursAwake;
    if (a <= FATIGUE_BLUR_H) return 0;
    return Math.min(1, (a - FATIGUE_BLUR_H) / (FATIGUE_MAX_H - FATIGUE_BLUR_H));
  }

  /**
   * Turn in. Refused while there is an active casualty — you do not go to your
   * rack with water coming in, and the refusal is worth saying out loud.
   */
  sleep(hours = SLEEP_HOURS) {
    if (this.state.activeCasualties.length) {
      this.bus.emit('hud:toast', {
        concept: 'Not now',
        text: 'There is a casualty in progress. Nobody is turning in until the boat is safe.',
      });
      return { ok: false, reason: 'casualty' };
    }
    if (this.hoursAwake < 4) {
      this.bus.emit('hud:toast', {
        concept: 'Not tired',
        text: `You have only been up ${this.hoursAwake.toFixed(1)} hours. Rest is a resource — spend it when you need it.`,
      });
      return { ok: false, reason: 'not tired' };
    }

    const wasAwake = this.hoursAwake;
    this.state.dayClock.hours += hours;
    this.state.clock.minutes += hours * 60;      // the watch clock keeps pace
    this.state.fatigue.hoursAwake = 0;
    this.state.fatigue.lastSleepAt = this.state.dayClock.hours;
    this.save?.noteSleep(hours);
    this.bus.emit('crew:slept', { hours, wasAwake, day: this.day });
    this.bus.emit('hud:toast', {
      concept: `${hours} hours down`,
      text: wasAwake > FATIGUE_BLUR_H
        ? `You had been up ${wasAwake.toFixed(0)} hours and it showed. The watch is clear again.`
        : 'Turned in and turned out. It is a new day on the patrol.',
    });
    return { ok: true, hours };
  }

  update(dt) {
    const s = this.state;
    const hours = dt / SECONDS_PER_PATROL_HOUR;
    s.dayClock.hours += hours;
    s.fatigue.hoursAwake += hours;

    // One nudge at each threshold, not a nag every frame.
    if (this.hoursAwake >= FATIGUE_WARN_H && this._warned < 1) {
      this._warned = 1;
      this.bus.emit('hud:toast', {
        concept: 'Getting tired',
        text: `${Math.floor(this.hoursAwake)} hours awake. Get your head down in the berthing space before it starts costing you.`,
      });
    }
    if (this.hoursAwake >= FATIGUE_BLUR_H && this._warned < 2) {
      this._warned = 2;
      this.bus.emit('hud:toast', {
        concept: 'Fatigue',
        text: 'You are past the point where a watchstander is reliable. Your eyes are not focusing properly — go and sleep.',
      });
    }
    if (this.hoursAwake < 1) this._warned = 0;

    if (this.day !== this._lastDay) {
      const first = this._lastDay === 0;
      this._lastDay = this.day;
      this.bus.emit('crew:newDay', { day: this.day, first });
      if (!first) {
        this.bus.emit('hud:toast', {
          concept: `Day ${this.day}`,
          text: 'A new day on the patrol. Three more qualification questions have been posted at the desk in the berthing space.',
        });
      }
    }
  }

  reset() {
    this.state.dayClock.hours = 6;
    this.state.fatigue = { hoursAwake: 2.5, lastSleepAt: 0 };
    this._warned = 0;
    this._lastDay = 0;
  }
}
