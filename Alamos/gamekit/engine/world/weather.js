// weather.js — what is in the air between the player and the place.
//
// Ground Truth is "a storm season" on a salt flat and the sky was a static grey
// dome. Red Sand has dust in every line of its site file and none in the air.
// Nothing in the set had rain, snow, dust or a flash of lightning, because the
// outdoor world had no way to put anything between the eye and the buildings.
//
// This is one `Points` cloud that follows the player's eye. It is a box about
// forty metres across, and every particle that falls out of the bottom or
// drifts out of a side is put back in at the top or the far side, so the cloud
// is dense where the player is looking and costs the same standing still or
// driving. Two thousand points is one draw call and a few hundred microseconds
// of arithmetic a frame.
//
//   site.weather = { kind: 'rain', density: 0.6, wind: { x: 3, z: 1 } }
//   site.weather = { kind: 'dust', density: 0.5, wind: { x: -4, z: 2 } }
//   site.weather = { kind: 'snow', density: 0.3 }
//   site.weather = { kind: 'rain', density: 0.7, lightning: { every: [18, 50] } }
//
// `kind` is one of rain | drizzle | snow | dust. `density` 0..1 sets the count
// and the opacity. `wind` is metres per second. `lightning` is a random interval
// in seconds between flashes: the ambient and hemisphere lights spike and decay,
// and anything that called `onLightning` hears about it with a distance, which is
// what the audio layer needs to delay the thunder by.
//
// Indoors — the interior district at x ≈ 4000 — the cloud is hidden. A room has
// a roof, and rain falling through a ceiling tile is the one thing this must
// never do.
//
// Nothing here imports from `engine/core`. The eye comes in from the frame loop
// through the animator call, so the module owes nothing to the camera.
import * as THREE from 'three';
import { DISTRICT_X } from './interiorBuilding.js';

const KINDS = {
  // Counts are for density 1. Rain at 2,600 read as six streaks in a still;
  // at 5,200 smaller ones it reads as rain.
  rain:    { count: 5200, colour: 0xc4d2dc, size: 0.075, fall: 11, spread: 0.8, opacity: 0.6, streak: true },
  drizzle: { count: 3400, colour: 0xcdd7dc, size: 0.05, fall: 4.5, spread: 1.6, opacity: 0.42, streak: true },
  snow:    { count: 1800, colour: 0xf3f5f7, size: 0.16, fall: 1.1, spread: 2.2, opacity: 0.9, streak: false },
  dust:    { count: 2400, colour: 0xc9a07a, size: 0.6, fall: 0.25, spread: 2.5, opacity: 0.3, streak: false },
};

/** Half-extents of the box the cloud lives in, around the eye. */
const HX = 22, HZ = 22, TOP = 14, BOTTOM = -3;

/** A soft dot or a short vertical streak, drawn once. */
function particleTexture(streak){
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const g = c.getContext('2d');
  if(streak){
    const grad = g.createLinearGradient(0, 0, 0, 32);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(13, 0, 6, 32);
  } else {
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const listeners = [];
/** Hear about every flash: `cb({ distance })`, distance in metres. */
export function onLightning(cb){ if(typeof cb === 'function') listeners.push(cb); }

let seed = 8675309;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

/**
 * Build the cloud. Returns a handle: `set(spec)` to change the weather, and
 * `update(t, dt, eye)` which the world registers as an animator.
 */
export function buildWeather(scene, spec){
  let points = null, geo = null, material = null, K = null, S = null;
  let vel = null;
  let flash = 0, nextFlash = Infinity, flashing = false, ambBase = 0, hemiBase = 0;

  function set(next){
    if(points){ scene.remove(points); geo.dispose(); material.dispose(); points = null; }
    S = next && KINDS[next.kind] ? { density: 0.5, wind: { x: 0, z: 0 }, ...next } : null;
    if(!S) return;
    K = KINDS[S.kind];
    const n = Math.max(60, Math.round(K.count * Math.max(0.05, Math.min(1, S.density))));
    const pos = new Float32Array(n * 3);
    vel = new Float32Array(n);
    for(let i = 0; i < n; i++){
      pos[i * 3] = (rnd() * 2 - 1) * HX;
      pos[i * 3 + 1] = BOTTOM + rnd() * (TOP - BOTTOM);
      pos[i * 3 + 2] = (rnd() * 2 - 1) * HZ;
      vel[i] = 0.7 + rnd() * 0.6;
    }
    geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    material = new THREE.PointsMaterial({
      color: S.colour ?? K.colour, size: K.size, sizeAttenuation: true,
      map: particleTexture(K.streak), transparent: true,
      opacity: K.opacity * (0.6 + 0.4 * Math.min(1, S.density)),
      depthWrite: false, fog: true,
    });
    points = new THREE.Points(geo, material);
    points.frustumCulled = false;
    points.userData.ignoreAudit = true;
    points.userData.structure = 'weather';
    points.renderOrder = 4;
    scene.add(points);
    const L = S.lightning;
    nextFlash = L ? (L.every?.[0] ?? 15) + rnd() * ((L.every?.[1] ?? 45) - (L.every?.[0] ?? 15)) : Infinity;
  }

  function strike(){
    flash = 1;
    const L = S?.lightning ?? {};
    nextFlash = (L.every?.[0] ?? 15) + rnd() * ((L.every?.[1] ?? 45) - (L.every?.[0] ?? 15));
    const distance = 300 + rnd() * 2600;
    for(const cb of listeners){ try{ cb({ distance }); }catch(e){ console.warn('[weather] listener', e); } }
  }

  function update(t, dt, eye){
    if(!points || !eye) return;
    // Under a roof. The interior district is four kilometres out along +x.
    const indoors = eye.x > DISTRICT_X - 500;
    points.visible = !indoors;

    if(!indoors){
      const pos = geo.attributes.position.array;
      const n = vel.length;
      const wx = (S.wind?.x ?? 0) * dt, wz = (S.wind?.z ?? 0) * dt;
      const fall = K.fall * dt;
      const jig = K.spread * dt;
      for(let i = 0; i < n; i++){
        const j = i * 3;
        let x = pos[j], y = pos[j + 1], z = pos[j + 2];
        y -= fall * vel[i];
        x += wx + Math.sin(t * 1.3 + i) * jig * 0.4;
        z += wz + Math.cos(t * 0.9 + i * 0.7) * jig * 0.4;
        // Recentre on the eye: anything that leaves the box comes back in on the
        // opposite face, so the cloud rides along with the player.
        let dx = x - eye.x, dz = z - eye.z, dy = y - eye.y;
        if(dy < BOTTOM){ dy = TOP - rnd() * 2; dx = (rnd() * 2 - 1) * HX; dz = (rnd() * 2 - 1) * HZ; }
        else if(dy > TOP){ dy = BOTTOM + 1; }
        if(dx > HX) dx -= HX * 2; else if(dx < -HX) dx += HX * 2;
        if(dz > HZ) dz -= HZ * 2; else if(dz < -HZ) dz += HZ * 2;
        pos[j] = eye.x + dx; pos[j + 1] = eye.y + dy; pos[j + 2] = eye.z + dz;
      }
      geo.attributes.position.needsUpdate = true;
    }

    // ---- lightning
    if(S.lightning){
      nextFlash -= dt;
      if(nextFlash <= 0) strike();
      const u = scene.userData;
      if(flash > 0.002 && u.ambient && u.hemi){
        if(!flashing){ flashing = true; ambBase = u.ambient.intensity; hemiBase = u.hemi.intensity; }
        // A double flicker, the way a real strike reads: the leader and the return.
        const k = flash * (0.7 + 0.3 * Math.sin(t * 60));
        u.ambient.intensity = ambBase + k * 2.6;
        u.hemi.intensity = hemiBase + k * 1.8;
        flash *= Math.exp(-dt * 11);
      } else if(flashing){
        flashing = false;
        if(u.ambient) u.ambient.intensity = ambBase;
        if(u.hemi) u.hemi.intensity = hemiBase;
      }
    }
  }

  set(spec);
  return {
    set, update,
    /** What is falling right now, or null. */
    get spec(){ return S; },
    /** Force a flash — for the dev handle and the selftest. */
    strike(){ if(S?.lightning) strike(); },
    dispose(){ set(null); },
  };
}

/** The kinds this module knows, for a checker that wants to validate a site. */
export const WEATHER_KINDS = Object.keys(KINDS);
