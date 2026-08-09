import * as THREE from 'three';

/**
 * LightingSystem — global lighting states tied to submarine condition rather than
 * cinematic whim. Each compartment gets one point light (pooled, count limited by
 * the graphics preset's maxDynamicLights); a global ambient + hemisphere provides
 * cheap fill. Switching state re-tints and re-levels every light.
 */
export const LIGHTING_STATES = {
  normal:    { ambient: 0x22303a, ambientI: 0.55, point: 0xdfe8ee, pointI: 1.1, name: 'Normal' },
  dim:       { ambient: 0x1a2630, ambientI: 0.4,  point: 0xbfc9cf, pointI: 0.7, name: 'Dim' },
  red:       { ambient: 0x1a0606, ambientI: 0.35, point: 0xd1594e, pointI: 0.9, name: 'Rigged for Red' },
  emergency: { ambient: 0x0a1418, ambientI: 0.25, point: 0x6bbf73, pointI: 0.6, name: 'Emergency' },
  blackout:  { ambient: 0x04080a, ambientI: 0.08, point: 0x223035, pointI: 0.12, name: 'Blackout' },
};

export class LightingSystem {
  constructor(scene, eventBus, settings) {
    this.scene = scene;
    this.bus = eventBus;
    this.settings = settings;
    this.state = 'normal';
    this.compartmentLights = new Map(); // compartmentId -> THREE.PointLight

    this.ambient = new THREE.AmbientLight(0x22303a, 0.55);
    this.hemi = new THREE.HemisphereLight(0x2a3a44, 0x0a0f12, 0.35);
    scene.add(this.ambient, this.hemi);
  }

  addCompartmentLight(compartmentId, x, y, z) {
    const g = this.settings.graphics;
    const light = new THREE.PointLight(0xdfe8ee, 1.1, 14, 1.6);
    light.position.set(x, y, z);
    if (g.shadowsEnabled && this.compartmentLights.size < g.maxDynamicLights) {
      light.castShadow = true;
      light.shadow.mapSize.set(g.shadowMapSize, g.shadowMapSize);
      light.shadow.camera.far = 16;
      light.shadow.bias = -0.002;
    }
    this.scene.add(light);
    this.compartmentLights.set(compartmentId, light);
    return light;
  }

  setState(state) {
    if (!LIGHTING_STATES[state]) return;
    this.state = state;
    const s = LIGHTING_STATES[state];
    this.ambient.color.setHex(s.ambient);
    this.ambient.intensity = s.ambientI;
    for (const light of this.compartmentLights.values()) {
      light.color.setHex(s.point);
      light.userData.baseIntensity = s.pointI;
      light.intensity = s.pointI;
    }
    this.bus.emit('lighting:changed', { state, name: s.name });
  }

  /** Make one compartment's light flicker (electrical casualty). */
  setFlicker(compartmentId, on) {
    const light = this.compartmentLights.get(compartmentId);
    if (light) light.userData.flicker = on;
  }

  update(t) {
    for (const light of this.compartmentLights.values()) {
      if (light.userData.flicker) {
        const base = light.userData.baseIntensity ?? 1.0;
        light.intensity = base * (0.5 + 0.5 * Math.abs(Math.sin(t * 22) * Math.sin(t * 7)));
      }
    }
  }
}
