/**
 * SettingsManager — persists graphics/audio/control settings to localStorage and
 * exposes graphics presets (low/medium/high) that the renderer and world read.
 *
 * Graphics options required by the spec: pixel ratio, shadow resolution, active
 * dynamic lights, particle density, smoke quality, draw distance, post-processing,
 * environment detail. We express those as three presets plus a few live sliders.
 */
const STORAGE_KEY = 'deepwatch.settings.v1';

export const GRAPHICS_PRESETS = {
  low: {
    label: 'Low',
    pixelRatioCap: 1,
    shadowsEnabled: false,
    shadowMapSize: 512,
    maxDynamicLights: 4,
    particleDensity: 0.4,
    smokeQuality: 0.4,
    drawDistance: 30,
    postProcessing: false,
    environmentDetail: 0.5,
  },
  medium: {
    label: 'Medium',
    pixelRatioCap: 1.5,
    shadowsEnabled: true,
    shadowMapSize: 1024,
    maxDynamicLights: 8,
    particleDensity: 0.7,
    smokeQuality: 0.7,
    drawDistance: 55,
    postProcessing: false,
    environmentDetail: 0.8,
  },
  high: {
    label: 'High',
    pixelRatioCap: 2,
    shadowsEnabled: true,
    shadowMapSize: 2048,
    maxDynamicLights: 12,
    particleDensity: 1.0,
    smokeQuality: 1.0,
    drawDistance: 90,
    postProcessing: true,
    environmentDetail: 1.0,
  },
};

const DEFAULTS = {
  graphicsPreset: 'medium',
  masterVolume: 0.8,
  mouseSensitivity: 0.0022,
  invertY: false,
  fov: 72,
  headBob: true,
};

export class SettingsManager {
  constructor(eventBus) {
    this.bus = eventBus;
    this.values = { ...DEFAULTS, ...this._load() };
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.warn('[Settings] load failed, using defaults', err);
      return {};
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values));
    } catch (err) {
      console.warn('[Settings] save failed', err);
    }
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    this.values[key] = value;
    this.save();
    this.bus?.emit('settings:changed', { key, value, values: this.values });
  }

  /** The resolved graphics preset object (never mutate the returned object). */
  get graphics() {
    return GRAPHICS_PRESETS[this.values.graphicsPreset] || GRAPHICS_PRESETS.medium;
  }
}
