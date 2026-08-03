/**
 * AudioEnvironment — a minimal Web Audio procedural soundscape: a low ventilation
 * hum plus a shaft/propulsion tone whose pitch tracks shaft rpm, and a filtered
 * noise bed for seawater flow. Audio must be resumed by a user gesture (start
 * button), so we build the graph lazily on `start()`.
 *
 * This is a foundation-level bed; richer per-compartment layers and evidence-
 * bearing sounds (leak beneath a deck plate, misaligned-pump tone) come later.
 */
export class AudioEnvironment {
  constructor({ settings, state, eventBus }) {
    this.settings = settings;
    this.state = state;
    this.bus = eventBus;
    this.ctx = null;
    this.nodes = {};
    this.started = false;
    this.bus.on('settings:changed', ({ key }) => {
      if (key === 'masterVolume' && this.nodes.master) {
        this.nodes.master.gain.value = this._masterGain();
      }
    });
  }

  _masterGain() {
    return 0.5 * (this.settings.get('masterVolume') ?? 0.8);
  }

  async start() {
    if (this.started) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      await this.ctx.resume();

      const master = this.ctx.createGain();
      master.gain.value = this._masterGain();
      master.connect(this.ctx.destination);

      // Ventilation hum: two detuned low oscillators through a lowpass.
      const hum = this.ctx.createGain();
      hum.gain.value = 0.18;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 220;
      for (const f of [58, 87]) {
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth'; o.frequency.value = f;
        const g = this.ctx.createGain(); g.gain.value = 0.5;
        o.connect(g); g.connect(lp); o.start();
      }
      lp.connect(hum); hum.connect(master);

      // Shaft/propulsion tone (pitch tracks rpm).
      const shaft = this.ctx.createOscillator();
      shaft.type = 'triangle'; shaft.frequency.value = 70;
      const shaftGain = this.ctx.createGain(); shaftGain.gain.value = 0.06;
      shaft.connect(shaftGain); shaftGain.connect(master); shaft.start();

      // Seawater flow: filtered white noise.
      const noiseBuf = this._noiseBuffer();
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf; noise.loop = true;
      const nbp = this.ctx.createBiquadFilter();
      nbp.type = 'bandpass'; nbp.frequency.value = 600; nbp.Q.value = 0.6;
      const noiseGain = this.ctx.createGain(); noiseGain.gain.value = 0.03;
      noise.connect(nbp); nbp.connect(noiseGain); noiseGain.connect(master); noise.start();

      this.nodes = { master, shaft, shaftGain, noiseGain, hum };
      this.started = true;
    } catch (err) {
      console.warn('[Audio] init failed (continuing silently)', err);
    }
  }

  _noiseBuffer() {
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  update() {
    if (!this.started || !this.nodes.shaft) return;
    // Shaft tone tracks rpm; self-noise raises the flow bed slightly.
    const rpm = this.state.propulsionState.shaftRpm;
    this.nodes.shaft.frequency.value = 40 + rpm * 0.8;
    const nf = (this.state.sonarNoiseFloor - 40) / 30;
    this.nodes.noiseGain.gain.value = 0.02 + Math.max(0, nf) * 0.04;
  }

  setMuted(muted) {
    if (this.nodes.master) this.nodes.master.gain.value = muted ? 0 : this._masterGain();
  }
}
