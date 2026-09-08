// audio.js — what the place sounds like.
//
// Thirty-six campaigns and not one of them made a sound. A hundred-metre
// waterfall outside the glass was silent, a propellant plant on Mars was
// silent, a storm season on a salt flat was silent, and a shut amusement park
// was exactly as silent as an open one. Sound is the cheapest immersion there
// is — no draw calls, no geometry — and it was the one layer the engine did not
// have.
//
// Nothing here loads a file. The repo ships no audio assets and this module does
// not need any: every sound is synthesised from a noise buffer and a few
// filters, the way a synthesiser makes wind, surf and rain. That keeps a theme
// to a few lines of data:
//
//   audio: {
//     bed: 'sea',                        // what the whole site sounds like
//     indoors: 'hum',                    // and what a room sounds like
//     emitters: [                        // things you can walk toward
//       { x: 0, z: -20, kind: 'transformer', r: 40, gain: 0.7 },
//       { x: 31, z: 0,  kind: 'waterfall',   r: 90, gain: 1.0 },
//     ],
//   }
//
// Beds: wind · sea · rain · hum · city · night · mars · silence.
// Emitters: waterfall · surf · machinery · transformer · generator · fan · crowd
//           · wind · water.
//
// Three rules the browser imposes and this file obeys:
//
//   · An AudioContext may only start from a user gesture. `unlockAudio()` is
//     called from the title card's button and from the first key or pointer
//     event; until then everything here is inert and costs nothing.
//   · The player must be able to turn it off, and the choice has to survive a
//     reload. `M` toggles; the state is in localStorage.
//   · A headless renderer has no speakers and may have no AudioContext at all.
//     Every entry point is wrapped, so `npm run shots` never hears about this.
//
// Positioning is cheap on purpose: gain by distance and a stereo pan from the
// bearing relative to the camera's yaw. A `PannerNode` per emitter with HRTF is
// the proper tool and is also the one thing on a tablet that costs more than the
// renderer does.

const MUTE_KEY = 'gamekit_audio_muted';

let ctx = null;
let master = null;
let unlocked = false;
let theme = null;
let spec = null;
let bedOut = null, bedIn = null;
let inside = false;

const emitters = [];
let muted = false;
let thunderBus = null;
const pendingThunder = [];

/** The theme's declaration, with the defaults every world gets. */
function resolveSpec(t, kind){
  const a = t?.audio ?? {};
  const outdoor = kind === 'outdoor';
  return {
    bed: a.bed ?? (outdoor ? 'wind' : 'hum'),
    indoors: a.indoors ?? 'hum',
    gain: a.gain ?? 1,
    emitters: (a.emitters ?? []).filter(e => Number.isFinite(e.x) && Number.isFinite(e.z)),
  };
}

// ------------------------------------------------------------------ sources
/** Four seconds of looped noise. `type` white | pink | brown. */
function noiseSource(type = 'white'){
  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, last = 0;
  for(let i = 0; i < len; i++){
    const w = Math.random() * 2 - 1;
    if(type === 'white') d[i] = w;
    else if(type === 'brown'){ last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    else { // pink, Paul Kellet's economy filter
      b0 = 0.99765 * b0 + w * 0.0990460;
      b1 = 0.96300 * b1 + w * 0.2965164;
      b2 = 0.57000 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.18;
    }
  }
  const src = ctx.createBufferSource();
  src.buffer = buf; src.loop = true;
  src.start();
  return src;
}

function filter(type, frequency, Q = 0.7){
  const f = ctx.createBiquadFilter();
  f.type = type; f.frequency.value = frequency; f.Q.value = Q;
  return f;
}
function gainNode(v){ const g = ctx.createGain(); g.gain.value = v; return g; }
function osc(type, frequency){
  const o = ctx.createOscillator();
  o.type = type; o.frequency.value = frequency; o.start();
  return o;
}
/** A slow sine on a parameter: `param = base + depth·sin(rate·t)`. */
function lfo(param, rate, depth){
  const o = osc('sine', rate);
  const g = gainNode(depth);
  o.connect(g); g.connect(param);
  return o;
}

/**
 * THE MUSIC IN THE LIFT, ONE SETTING PER BUILDING.
 *
 * Four soft chords going round is what an interior actually pipes through its
 * ceilings, and it is a thing an oscillator can do honestly — see the `muzak`
 * voice below for why this is synthesised rather than a file. What it should NOT
 * be is the same four chords in every game: a currency board on the forty-fifth
 * floor, a clinical trial centre and a dam control tower are three different
 * rooms to be standing in, and the tune is most of what says which.
 *
 * A theme picks one with `audio: { indoors: 'muzak:ward' }`. A bare `muzak` is
 * the lobby, so nothing that already asked for it changes.
 *
 * Each is [bass, and three chord tones]; the pad plays the upper three and the
 * bass an octave below the first. `beat` is seconds, `per` is beats to a chord,
 * so the loop is `beat × per × 4` and the melody walks rather than repeating.
 */
const TUNES = {
  // KESTEVEN HOUSE, floor 45. Fmaj7 - Dm7 - Gm7 - C7, the most ordinary
  // turnaround there is, played politely and slightly too slowly: a lift lobby
  // in a building where the money is counted. This was the first one written and
  // it is the default.
  lobby: {
    chords: [[174.61, 220.00, 261.63, 329.63],   // Fmaj7
             [146.83, 174.61, 220.00, 261.63],   // Dm7
             [196.00, 233.08, 293.66, 349.23],   // Gm7
             [130.81, 164.81, 196.00, 233.08]],  // C7
    beat: 0.75, per: 4, lp: 2400, pad: 'triangle', tune: 'triangle', lead: 0.055,
  },
  // FENWICK COORDINATING CENTRE. C - Am7 - F - G7: no seventh on the tonic and
  // no minor turn at the end, because the room is a corridor people walk down
  // carrying results they do not yet understand, and the music's job is to not
  // make that worse. Slower than the lobby, softer at the top, and the melody is
  // quieter than the chord under it.
  ward: {
    chords: [[130.81, 164.81, 196.00, 246.94],   // Cmaj7
             [110.00, 130.81, 164.81, 196.00],   // Am7
             [174.61, 220.00, 261.63, 329.63],   // Fmaj7
             [196.00, 246.94, 293.66, 349.23]],  // G7
    beat: 0.92, per: 4, lp: 1800, pad: 'sine', tune: 'sine', lead: 0.040,
  },
  // ASHFELL DAM, the control tower in the gorge. Dm7 - Bbmaj7 - F - C, minor at
  // the top and resolving downward, in THREE rather than four — a rocking count
  // rather than a walking one, which is the nearest a chord progression gets to
  // moving water without being noise. The last two attempts at this room's sound
  // were noise and a player heard the sea in both.
  spillway: {
    chords: [[146.83, 174.61, 220.00, 261.63],   // Dm7
             [116.54, 146.83, 174.61, 233.08],   // Bbmaj7
             [174.61, 220.00, 261.63, 329.63],   // Fmaj7
             [130.81, 164.81, 196.00, 246.94]],  // C
    beat: 0.62, per: 3, lp: 2100, pad: 'triangle', tune: 'sine', lead: 0.048,
  },
};

/**
 * One voice. Returns a node to connect onward and a `stop()`.
 * Every recipe here is a few lines; a theme needing something new adds one.
 */
function voice(name){
  // `muzak:ward` — the voice, then which setting of it. Everything else ignores
  // the colon it does not have.
  const [kind, setting] = String(name ?? '').split(':');
  const out = gainNode(1);
  const parts = [];
  const chain = (...nodes) => { for(let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); parts.push(...nodes); };
  switch(kind){
    case 'wind': {
      const n = noiseSource('brown');
      const bp = filter('bandpass', 420, 0.6);
      const g = gainNode(0.55);
      chain(n, bp, g, out);
      lfo(bp.frequency, 0.07, 220);
      lfo(g.gain, 0.11, 0.25);
      lfo(g.gain, 0.031, 0.18);
      break;
    }
    case 'mars': {
      // Six millibars: what wind there is comes through thin and low.
      const n = noiseSource('brown');
      const lp = filter('lowpass', 380, 0.5);
      const g = gainNode(0.5);
      chain(n, lp, g, out);
      lfo(lp.frequency, 0.05, 140);
      lfo(g.gain, 0.09, 0.22);
      break;
    }
    case 'night': {
      const n = noiseSource('brown');
      const bp = filter('bandpass', 260, 0.8);
      const g = gainNode(0.28);
      chain(n, bp, g, out);
      lfo(g.gain, 0.06, 0.12);
      break;
    }
    case 'sea': case 'surf': {
      const n = noiseSource('pink');
      const lp = filter('lowpass', 900, 0.4);
      const g = gainNode(0.5);
      chain(n, lp, g, out);
      lfo(g.gain, 0.085, 0.32);       // the swell
      lfo(g.gain, 0.21, 0.10);        // and the smaller waves on it
      lfo(lp.frequency, 0.085, 350);
      break;
    }
    case 'rain': {
      const n = noiseSource('white');
      const hp = filter('highpass', 900, 0.5);
      const lp = filter('lowpass', 5200, 0.5);
      const g = gainNode(0.32);
      chain(n, hp, lp, g, out);
      lfo(g.gain, 0.13, 0.05);
      break;
    }
    case 'hum': {
      // A building: fifty-hertz plant, and air moving through a duct.
      const o1 = osc('sine', 50), o2 = osc('sine', 100), o3 = osc('sine', 150);
      const og = gainNode(0.045);
      o1.connect(og); o2.connect(og); o3.connect(og);
      const g2 = gainNode(0.4); og.connect(g2); g2.connect(out); parts.push(o1, o2, o3, og, g2);
      const n = noiseSource('brown');
      const lp = filter('lowpass', 320, 0.4);
      const ng = gainNode(0.22);
      chain(n, lp, ng, out);
      // o2 a hair off, so the two beat against each other the way real plant does.
      o2.frequency.value = 100.3;
      break;
    }
    case 'city': {
      const n = noiseSource('pink');
      const lp = filter('lowpass', 520, 0.5);
      const g = gainNode(0.42);
      chain(n, lp, g, out);
      lfo(g.gain, 0.045, 0.14);
      lfo(lp.frequency, 0.09, 120);
      break;
    }
    case 'waterfall': case 'water': {
      const n = noiseSource('white');
      const lp = filter('lowpass', kind === 'water' ? 900 : 1500, 0.3);
      const b = noiseSource('brown');
      const blp = filter('lowpass', 160, 0.5);
      const g = gainNode(0.6), bg = gainNode(0.9);
      chain(n, lp, g, out);
      chain(b, blp, bg, out);
      lfo(g.gain, 0.3, 0.06);
      break;
    }
    case 'machinery': {
      const o = osc('sawtooth', 28);
      const lp = filter('lowpass', 210, 0.9);
      const g = gainNode(0.28);
      chain(o, lp, g, out);
      const n = noiseSource('pink');
      const bp = filter('bandpass', 800, 1.2);
      const ng = gainNode(0.12);
      chain(n, bp, ng, out);
      lfo(g.gain, 0.8, 0.05);
      break;
    }
    case 'transformer': {
      const g = gainNode(0.11);
      for(const [f, a] of [[100, 1], [200, 0.45], [300, 0.28], [400, 0.14]]){
        const o = osc('sine', f); const og = gainNode(a); o.connect(og); og.connect(g); parts.push(o, og);
      }
      g.connect(out); parts.push(g);
      break;
    }
    case 'generator': {
      const o = osc('sawtooth', 44);
      const lp = filter('lowpass', 300, 0.8);
      const g = gainNode(0.26);
      chain(o, lp, g, out);
      lfo(g.gain, 11, 0.08);          // the beat of the cylinders
      const n = noiseSource('brown');
      const ng = gainNode(0.08);
      chain(n, ng, out);
      break;
    }
    case 'fan': {
      const n = noiseSource('pink');
      const bp = filter('bandpass', 420, 0.9);
      const g = gainNode(0.3);
      chain(n, bp, g, out);
      break;
    }
    /**
     * PEOPLE TALKING, WHICH IS NOT `crowd`.
     *
     * `crowd` is pink noise through a wide band-pass with the gain swelling at
     * 0.23 Hz. That is the same shape as `sea`: noise with a slow rise and fall
     * on it. Quiet in the mix it passes for a murmur; turned up so it can
     * actually be heard, it is unmistakably surf, which is what a player
     * reported hearing on the forty-fifth floor of an office block.
     *
     * Two things make this talking instead. The low end is cut at 300 Hz — the
     * sea is a low sound and a room of voices is not — and the modulation is at
     * SYLLABLE rate rather than wave rate: three narrow bands near the speech
     * formants, each opening and closing three to six times a second, at rates
     * with no common factor so they never line up into a pulse. What is left of
     * the slow swell is one 0.11 Hz breath across the whole thing, which is a
     * room filling and emptying rather than water arriving.
     */
    case 'muzak': {
      /**
       * THE MUSIC IN THE LIFT, and the reason it is here rather than a file.
       *
       * Two attempts at a room tone failed the only test that matters — a player
       * heard the sea in both — and the reason is that every ambient voice in
       * this module is filtered noise, which is what water is. A building's
       * inside does not have to be noise at all. What an office block actually
       * pipes through its ceilings is four soft chords going round, and that is
       * a thing an oscillator can do honestly.
       *
       * Fmaj7, Dm7, Gm7, C7 — the most ordinary turnaround there is — three
       * triangle waves for the chord, a sine an octave below for the bass, and a
       * fifth triangle picking one chord tone a beat as a tune. A chord lasts
       * four beats and a beat is three quarters of a second, so the loop is
       * twelve seconds and never lands on the same melody note twice running.
       *
       * A voice normally sets itself up once and runs for ever on LFOs. This one
       * needs to know what time it is, so it returns a `tick` that `updateAudio`
       * calls; everything it schedules is queued a third of a second ahead, which
       * is what keeps it steady while the frame rate is not.
       */
      // Which building this is. An unknown name is the lobby rather than silence:
      // a misspelt tune should sound ordinary, not switch the room off.
      const T = TUNES[setting] ?? TUNES.lobby;
      const bus = gainNode(0.5);
      const lp = filter('lowpass', T.lp, 0.5);   // through a ceiling, not at you
      chain(bus, lp, out);

      const CHORDS = T.chords;
      const BEAT = T.beat, PER_CHORD = T.per;

      const pad = [0, 1, 2].map((i) => {
        const o = osc(T.pad, CHORDS[0][i + 1]);
        const g = gainNode(0.09);
        chain(o, g, bus);
        // A little movement, so three steady tones do not sit like an organ.
        lfo(o.frequency, 0.13 + i * 0.05, 0.5);
        return { o, g };
      });
      const bass = (() => {
        const o = osc('sine', CHORDS[0][0] / 2);
        const g = gainNode(0.10);
        chain(o, g, bus);
        return { o, g };
      })();
      const tune = (() => {
        const o = osc(T.tune, CHORDS[0][2] * 2);
        const g = gainNode(0);
        const bp = filter('lowpass', 3000, 0.7);
        chain(o, bp, g, bus);
        return { o, g };
      })();

      let step = 0, nextAt = 0;
      const tick = (now) => {
        if(!nextAt) nextAt = now + 0.2;
        while(nextAt < now + 0.33){
          const chord = CHORDS[Math.floor(step / PER_CHORD) % CHORDS.length];
          const beat = step % PER_CHORD;
          if(beat === 0){
            // The chord changes on the beat, with the pad dipped either side of
            // it so the change reads as a change rather than as a slide.
            for(let i = 0; i < pad.length; i++){
              pad[i].g.gain.setTargetAtTime(0.03, nextAt - 0.12, 0.05);
              pad[i].o.frequency.setValueAtTime(chord[i + 1], nextAt);
              pad[i].g.gain.setTargetAtTime(0.09, nextAt + 0.02, 0.18);
            }
            bass.o.frequency.setValueAtTime(chord[0] / 2, nextAt);
          }
          // One chord tone a beat, up an octave, plucked and let go. The pattern
          // walks so it does not repeat inside a chord.
          const note = chord[(beat * 2 + Math.floor(step / PER_CHORD)) % chord.length] * 2;
          tune.o.frequency.setValueAtTime(note, nextAt);
          tune.g.gain.cancelScheduledValues(nextAt);
          tune.g.gain.setValueAtTime(0.0001, nextAt);
          tune.g.gain.linearRampToValueAtTime(T.lead, nextAt + 0.03);
          tune.g.gain.exponentialRampToValueAtTime(0.0001, nextAt + BEAT * 0.85);
          nextAt += BEAT;
          step++;
        }
      };
      return { node: out, tick, stop(){ for(const p of parts){ try{ p.stop?.(); p.disconnect?.(); }catch{} } } };
    }
    case 'crowd': {
      const n = noiseSource('pink');
      const bp = filter('bandpass', 900, 0.5);
      const g = gainNode(0.22);
      chain(n, bp, g, out);
      lfo(g.gain, 0.23, 0.09);
      lfo(bp.frequency, 0.17, 300);
      break;
    }
    case 'silence': default:
      break;
  }
  return {
    node: out,
    stop(){ for(const p of parts){ try{ p.stop?.(); p.disconnect?.(); }catch{ /* already gone */ } } },
  };
}

/** A rumble that arrives `delay` seconds from now and lasts a few. */
function thunder(delay = 0, strength = 1){
  if(!ctx || !thunderBus) return;
  const t0 = ctx.currentTime + delay;
  const n = noiseSource('brown');
  const lp = filter('lowpass', 90 + Math.random() * 120, 0.8);
  const g = gainNode(0);
  n.connect(lp); lp.connect(g); g.connect(thunderBus);
  const peak = Math.min(1.3, 0.35 + strength * 0.9);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + 0.12 + Math.random() * 0.2);
  g.gain.exponentialRampToValueAtTime(peak * 0.4, t0 + 0.9);
  g.gain.linearRampToValueAtTime(peak * 0.55, t0 + 1.6);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 3.2 + Math.random() * 2.5);
  n.stop(t0 + 6.5);
  setTimeout(() => { try{ n.disconnect(); lp.disconnect(); g.disconnect(); }catch{ /* gone */ } }, (delay + 7) * 1000);
}

// ------------------------------------------------------------------- graph
function buildGraph(){
  master = gainNode(muted ? 0 : 0.55);
  // A gentle high shelf keeps the whole mix from sounding like a fan heater.
  const shelf = filter('highshelf', 3200, 0.7);
  shelf.gain.value = -6;
  master.connect(shelf); shelf.connect(ctx.destination);

  bedOut = voice(spec.bed);
  bedOut.gain = gainNode(0); bedOut.node.connect(bedOut.gain); bedOut.gain.connect(master);
  bedIn = voice(spec.indoors);
  bedIn.gain = gainNode(0); bedIn.node.connect(bedIn.gain); bedIn.gain.connect(master);

  thunderBus = gainNode(0.8);
  thunderBus.connect(master);


  for(const e of spec.emitters){
    const v = voice(e.kind);
    const g = gainNode(0);
    const pan = ctx.createStereoPanner();
    v.node.connect(g); g.connect(pan); pan.connect(master);
    emitters.push({ ...e, r: e.r ?? 50, gain: e.gain ?? 0.8, voice: v, g, pan });
  }
}

// ----------------------------------------------------------------- the API
/**
 * Read the theme's declaration and arm the gesture listeners. Builds nothing
 * until `unlockAudio()` — the browser will not start a context before a gesture
 * and a headless renderer never sends one.
 */
export function initAudio(activeTheme, { kind = 'outdoor' } = {}){
  theme = activeTheme;
  spec = resolveSpec(theme, kind);
  try{ muted = localStorage.getItem(MUTE_KEY) === '1'; }catch{ muted = false; }
  if(typeof window === 'undefined') return;
  const once = () => { unlockAudio(); };
  window.addEventListener('pointerdown', once, { once: true });
  window.addEventListener('keydown', once, { once: true });
  window.addEventListener('keydown', (ev) => {
    if(ev.code !== 'KeyM' || ev.repeat) return;
    const tag = document.activeElement?.tagName;
    if(tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    toggleMute();
  });
  document.getElementById('audioBtn')?.addEventListener('click', (ev) => {
    ev.preventDefault();
    unlockAudio();
    toggleMute();
  });
  paintButton();
}

/** Start the context. Safe to call any number of times; the first one wins. */
export function unlockAudio(){
  if(unlocked || !spec) return;
  try{
    const AC = window.AudioContext ?? window.webkitAudioContext;
    if(!AC) return;
    ctx = new AC();
    if(ctx.state === 'suspended') ctx.resume().catch(() => {});
    buildGraph();
    unlocked = true;
    paintButton();
  }catch(err){
    console.warn('[audio] no audio on this device', err);
    ctx = null;
  }
}

export function toggleMute(){ setMuted(!muted); }
export function setMuted(on){
  muted = !!on;
  try{ localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); }catch{ /* private mode */ }
  if(master && ctx) master.gain.setTargetAtTime(muted ? 0 : 0.55, ctx.currentTime, 0.08);
  paintButton();
}
export function audioMuted(){ return muted; }
export function audioRunning(){ return unlocked && !!ctx; }

function paintButton(){
  const b = typeof document !== 'undefined' ? document.getElementById('audioBtn') : null;
  if(!b) return;
  b.textContent = muted ? '🔇' : '🔊';
  b.title = muted ? 'Sound off — M or tap to turn on' : 'Sound on — M or tap to mute';
  b.setAttribute('aria-pressed', muted ? 'true' : 'false');
}

/**
 * Once a frame. `eye` is the player's position, `yaw` the camera's rotation
 * about y. `indoors` fades to the room bed and muffles the emitters; `ducked`
 * halves everything while a card is up.
 */
const tmp = { dx: 0, dz: 0 };
export function updateAudio(dt, eye, yaw, { indoors = false, ducked = false } = {}){
  if(!ctx || !master || !eye) return;
  const now = ctx.currentTime;
  const k = 0.25;                                  // seconds, the crossfade
  if(indoors !== inside){
    inside = indoors;
  }
  const duck = ducked ? 0.45 : 1;
  bedOut.gain.gain.setTargetAtTime((inside ? 0.12 : 1) * spec.gain * duck, now, k);
  bedIn.gain.gain.setTargetAtTime((inside ? 0.9 : 0) * spec.gain * duck, now, k);
  thunderBus.gain.setTargetAtTime((inside ? 0.35 : 0.8) * duck, now, k);

  const sy = Math.sin(yaw), cy = Math.cos(yaw);
  for(const e of emitters){
    tmp.dx = e.x - eye.x; tmp.dz = e.z - eye.z;
    const d = Math.hypot(tmp.dx, tmp.dz);
    let g = d >= e.r ? 0 : Math.pow(1 - d / e.r, 1.6) * e.gain;
    if(inside) g *= 0.12;
    e.g.gain.setTargetAtTime(g * spec.gain * duck, now, 0.12);
    // Pan from the bearing relative to the camera. Right is (cos yaw, -sin yaw).
    const pan = d > 0.5 ? (tmp.dx * cy - tmp.dz * sy) / d : 0;
    e.pan.pan.setTargetAtTime(Math.max(-0.9, Math.min(0.9, pan * 0.85)), now, 0.12);
  }
  /**
   * A voice that keeps time gets told what time it is.
   *
   * `muzak` schedules a third of a second ahead and needs a heartbeat to do it
   * from; every other voice runs on LFOs and has no `tick`, so this is a no-op
   * for all of them.
   */
  bedOut?.tick?.(now);
  bedIn?.tick?.(now);

  // Thunder queued by the weather layer, delivered when its delay is up.
  for(let i = pendingThunder.length - 1; i >= 0; i--){
    pendingThunder[i].t -= dt;
    if(pendingThunder[i].t <= 0){ thunder(0, pendingThunder[i].strength); pendingThunder.splice(i, 1); }
  }
}

/**
 * A flash happened `distance` metres away. The rumble arrives at the speed of
 * sound and is quieter the further off it was. Called by the frame loop from
 * the weather layer's `onLightning`.
 */
export function lightningAt(distance = 1000){
  if(!ctx) return;
  const delay = Math.max(0.2, distance / 340);
  const strength = Math.max(0.15, 1 - distance / 3200);
  pendingThunder.push({ t: delay, strength });
}

/** For the dev handle: what is playing, and how loud each emitter is now. */
export function audioReport(){
  return {
    running: audioRunning(), muted, inside,
    bed: spec?.bed, indoors: spec?.indoors,
    emitters: emitters.map(e => ({ kind: e.kind, x: e.x, z: e.z, gain: +e.g.gain.value.toFixed(3) })),
  };
}

/** The voice names this module knows, for a checker validating a manifest. */
// `muzak` alone is the lobby; the tuned names are the same voice with a different
// setting — see TUNES. They are listed rather than pattern-matched so
// `engine/dev/ambience.mjs` still refuses a misspelt one, which is the whole
// reason that gate exists: a wrong bed name is silence and no error.
export const AUDIO_BEDS = ['wind', 'sea', 'rain', 'hum', 'city', 'night', 'mars',
  'muzak', 'muzak:lobby', 'muzak:ward', 'muzak:spillway', 'silence'];
export const AUDIO_EMITTERS = ['waterfall', 'surf', 'water', 'machinery', 'transformer',
  'generator', 'fan', 'crowd', 'wind', 'rain', 'sea', 'hum', 'city'];
