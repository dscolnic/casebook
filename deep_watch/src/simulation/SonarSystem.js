/**
 * SonarSystem — what is actually in the water, and what of it you can hear.
 *
 * Contacts exist independently of the player: they have a true bearing, range,
 * course and speed, and they radiate. Whether any of that reaches the player
 * depends on the source level, spreading loss over the range, and — crucially —
 * how much noise their own boat is making. Nothing is "revealed"; a contact is
 * detectable or it is not, and the player changes that by quieting the boat.
 *
 * Content lineage: Sonar Spy (`silent_watch_hunt_mvp.html`, `nc_sonar_spy_1`).
 * Its `freqMap` harmonic families are the classification evidence, and its
 * bearing-history idea becomes a real bearing-time record. The arcade layer is
 * gone; what survives is detect → classify from an incomplete signature → use
 * bearing history → manoeuvre for geometry.
 *
 * Casebook (`casebook_static.html`, `nc_greywake_case`) enters through
 * PROCESSING CHAINS. The broadband waterfall and the auto-detect list are two
 * displays fed by one beamformer: when they agree, that is one measurement shown
 * twice. The narrowband analyser is a separate chain, and own-ship's own
 * manoeuvre is not a processing product at all. Only those corroborate.
 */

/** Harmonic families, straight from Sonar Spy's `freqMap`. */
export const FREQ_MAP = {
  Submarine: [46, 92, 138, 185],
  Merchant: [20, 41, 82, 123, 164],
  Fishing: [28, 57, 79, 109, 149],
  Biologics: [12, 31, 52],
  'Own-ship': [24, 48, 90, 120],
};

/** The displays a player can cite, and what each one is fed by. */
export const DISPLAYS = {
  broadband: { name: 'Broadband waterfall', chain: 'beamformer_A',
    note: 'Energy against bearing, off the main beamformer.' },
  autodetect: { name: 'Auto-detect list', chain: 'beamformer_A',
    note: 'Threshold detector — runs on the beamformer output.' },
  btr: { name: 'Bearing-time record', chain: 'beamformer_A',
    note: 'Bearing history, plotted from the same beamformer.' },
  narrowband: { name: 'Narrowband analyser', chain: 'analyser_B',
    note: 'Separate acquisition and FFT chain. Sees discrete lines, not energy.' },
  manoeuvre: { name: 'Own-ship manoeuvre', chain: 'geometry',
    note: 'Turn the boat and watch what the bearing does. Not a processing product at all.' },
};

export const CLASSES = ['Merchant', 'Biologics', 'Fishing', 'Submarine', 'Own-ship', 'Unknown'];

/**
 * The picture for Mission 2. Four things are audible and they are deliberately
 * unlike each other in KIND of evidence, not just in loudness:
 *  - a merchant with a full harmonic family and a steady bearing rate;
 *  - a biologic chorus with no propulsion lines at all and a wandering bearing;
 *  - an own-ship source that holds a constant relative bearing through a turn;
 *  - and one contact that is genuinely too faint to classify, which the player is
 *    supposed to leave as Unknown rather than guess.
 */
export const MISSION2_PICTURE = [
  {
    id: 'S01', truth: 'Merchant', bearing: 312, bearingRate: -0.35, range_nm: 7.2,
    sourceLevel: 152, tonalStrength: 1.0, note: 'Steady, strong, slow left drift.',
    bladeRate: 'steady 82 Hz blade line with harmonics',
  },
  {
    id: 'S02', truth: 'Biologics', bearing: 47, bearingRate: 0.9, range_nm: 1.4,
    sourceLevel: 132, tonalStrength: 0.8, note: 'Broad low chorus, bearing wanders.',
    bladeRate: 'no blade rate at all',
  },
  {
    id: 'S03', truth: 'Fishing', bearing: 158, bearingRate: 0.05, range_nm: 12.5,
    sourceLevel: 140, tonalStrength: 0.9, note: 'Faint, intermittent, one line near 57 Hz.',
    bladeRate: 'one uncertain line, no family',
  },
];

/** Transmission loss, dB. Spherical-ish spreading is enough for the reasoning. */
function spreadingLoss(range_nm) {
  const yards = Math.max(200, range_nm * 2025);
  return 20 * Math.log10(yards);
}

export class SonarSystem {
  constructor({ state, eventBus }) {
    this.state = state;
    this.bus = eventBus;
    /** @type {Array} contacts in the water */
    this.contacts = [];
    /** @type {Map<string, {id, contactId, history: Array, classifiedAs, justification}>} */
    this.tracks = new Map();
    this._elapsed = 0;
    this._lastSample = -99;
    this.ownHeadingAtStart = state.heading;
  }

  /** Put a picture in the water. */
  seed(picture) {
    this.contacts = picture.map((c) => ({ ...c, detected: false }));
    this._elapsed = 0;
    this._lastSample = -99;
    this.tracks.clear();
    this.bus.emit('sonar:pictureSeeded', { count: this.contacts.length });
  }

  reset() {
    this.contacts = [];
    this.tracks.clear();
    this._elapsed = 0;
  }

  /**
   * An own-ship source: broadband flow or machinery noise, at a bearing that is
   * fixed RELATIVE to the boat. Built from whatever is in machineryNoiseSources.
   */
  ownShipTrack() {
    const flow = this.state.machineryNoiseSources.find((n) => n.level > 1);
    if (!flow) return null;
    const relative = flow.relativeBearing ?? 15;
    return {
      id: 'N01',
      truth: 'Own-ship',
      internal: true,
      relativeBearing: relative,
      bearing: (this.state.heading + relative) % 360,
      snr: Math.max(4, flow.level),
      note: 'Broad, continuous, no blade rate.',
      bladeRate: 'none — this is flow, not machinery under way',
    };
  }

  /** Signal excess over the current noise floor, dB. Below zero: not audible. */
  snr(contact) {
    return contact.sourceLevel - spreadingLoss(contact.range_nm) - this.state.sonarNoiseFloor;
  }

  /** Everything audible right now, own-ship sources included. */
  audible() {
    const out = [];
    for (const c of this.contacts) {
      const snr = this.snr(c);
      if (snr <= 0) continue;
      out.push({ ...c, snr, confidence: Math.max(0.1, Math.min(0.95, snr / 22)) });
    }
    const own = this.ownShipTrack();
    if (own) out.push({ ...own, confidence: 0.35 });
    return out;
  }

  /**
   * How clearly the narrowband analyser resolves a contact's harmonic family:
   * 'family' (enough lines to name the class), 'partial' (a line or two — suggestive,
   * not decisive), or 'none'.
   */
  tonalQuality(contact) {
    if (contact.internal) return 'broadband';
    const snr = this.snr(contact);
    const q = snr * (contact.tonalStrength ?? 1);
    if (q >= 11) return 'family';
    if (q >= 4) return 'partial';
    return 'none';
  }

  tonalsFor(contact) {
    const q = this.tonalQuality(contact);
    const all = FREQ_MAP[contact.truth] || [];
    if (q === 'family') return all;
    if (q === 'partial') return all.slice(1, 3);
    return [];
  }

  /** Designate a detected contact as a track the watch will hold. */
  designate(contactId) {
    if (this.tracks.has(contactId)) return this.tracks.get(contactId);
    const c = this.audible().find((x) => x.id === contactId);
    if (!c) return null;
    const track = {
      id: contactId, internal: !!c.internal, history: [],
      classifiedAs: null, justification: null, correct: null,
    };
    this.tracks.set(contactId, track);
    this._sample(true);
    this.bus.emit('sonar:trackDesignated', { id: contactId, count: this.tracks.size });
    return track;
  }

  /** Bearing history for the BTR, sampled as time passes. */
  _sample(force = false) {
    if (!force && this._elapsed - this._lastSample < 20) return;
    this._lastSample = this._elapsed;
    for (const [id, track] of this.tracks) {
      const c = this.audible().find((x) => x.id === id);
      if (!c) continue;
      track.history.push({
        t: this._elapsed,
        clock: this.state.formatClock(),
        trueBearing: c.bearing,
        relativeBearing: ((c.bearing - this.state.heading) % 360 + 360) % 360,
        ownHeading: this.state.heading,
        snr: c.snr ?? 0,
      });
      if (track.history.length > 40) track.history.shift();
    }
  }

  /**
   * Record a classification with the evidence the player is leaning on.
   * Two displays off the same processing chain are not two pieces of evidence —
   * that judgement is the whole point of the stage, so it is reported back rather
   * than silently accepted.
   */
  classify(trackId, kind, displays = []) {
    const track = this.tracks.get(trackId);
    if (!track) return { ok: false, reason: 'no such track' };
    const contact = this.audible().find((x) => x.id === trackId);
    const truth = contact?.truth ?? 'Unknown';
    const quality = contact ? this.tonalQuality(contact) : 'none';

    // "Unknown" is the right answer when the evidence cannot carry a name.
    const classifiable = contact?.internal || quality === 'family';
    const correct = kind === 'Unknown' ? !classifiable : (kind === truth && classifiable);

    const chains = new Set(displays.map((d) => DISPLAYS[d]?.chain).filter(Boolean));
    const independent = chains.size >= 2;

    track.classifiedAs = kind;
    track.justification = displays.slice();
    track.correct = correct;
    track.independent = independent;

    const result = {
      ok: true, correct, independent, truth, quality,
      chains: [...chains],
      shared: displays.length >= 2 && chains.size === 1
        ? `${displays.map((d) => DISPLAYS[d].name).join(' and ')} are both fed by ${[...chains][0].replace('_', ' ')}. That is one measurement shown twice.`
        : null,
    };
    this.bus.emit('sonar:classified', { id: trackId, kind, ...result });
    return result;
  }

  /** Tracks that carry a correct call backed by two independent chains. */
  get solidTracks() {
    return [...this.tracks.values()].filter((t) => t.correct && t.independent);
  }

  update(dt) {
    this._elapsed += dt;
    const dtMin = dt / 60;
    for (const c of this.contacts) {
      c.bearing = (c.bearing + c.bearingRate * dtMin + 360) % 360;
      const wasDetected = c.detected;
      c.detected = this.snr(c) > 0;
      if (c.detected && !wasDetected) this.bus.emit('sonar:contactGained', { id: c.id });
      if (!c.detected && wasDetected) this.bus.emit('sonar:contactLost', { id: c.id });
    }
    this._sample();
    this.state.contactTracks = this.audible().map((c) => ({
      id: c.id, bearing: c.bearing, type: c.internal ? 'Own-ship' : (this.tracks.get(c.id)?.classifiedAs ?? 'Unknown'),
      confidence: c.confidence, note: c.note,
    }));
  }
}
