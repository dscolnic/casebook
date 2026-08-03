/**
 * SaveManager — campaign progress persistence in localStorage.
 *
 * Deep Watch uses its OWN namespaced key so it never collides with or corrupts
 * the existing RECKON / Navy-course progress data (which lives under different
 * keys such as `reckon.*`). Per the spec we may optionally *read* legacy keys to
 * acknowledge prior completion, but we never write to them.
 *
 * Progress shape:
 * {
 *   version, completedMissions:{id:{score,evidenceQuality,ts}},
 *   instrumentsQualified:[], compartmentsLearned:[], notebookConcepts:[],
 *   upgradeChoices:{}, submarineCondition:{}, hintUsage:{}, lastMission
 * }
 */
const STORAGE_KEY = 'deepwatch.progress.v1';

const EMPTY = {
  version: 1,
  completedMissions: {},
  instrumentsQualified: [],
  compartmentsLearned: [],
  notebookConcepts: [],
  upgradeChoices: {},
  submarineCondition: {},
  hintUsage: {},
  lastMission: null,
};

export class SaveManager {
  constructor(eventBus) {
    this.bus = eventBus;
    this.data = this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(EMPTY);
      return { ...structuredClone(EMPTY), ...JSON.parse(raw) };
    } catch (err) {
      console.warn('[Save] load failed, starting fresh', err);
      return structuredClone(EMPTY);
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      this.bus?.emit('save:written', this.data);
    } catch (err) {
      console.warn('[Save] write failed', err);
    }
  }

  hasProgress() {
    return Object.keys(this.data.completedMissions).length > 0;
  }

  markMissionComplete(id, { score = 0, evidenceQuality = 0 } = {}) {
    this.data.completedMissions[id] = { score, evidenceQuality, ts: this._now() };
    this.data.lastMission = id;
    this.save();
  }

  isMissionComplete(id) {
    return !!this.data.completedMissions[id];
  }

  learnCompartment(id) {
    if (!this.data.compartmentsLearned.includes(id)) {
      this.data.compartmentsLearned.push(id);
      this.save();
    }
  }

  qualifyInstrument(id) {
    if (!this.data.instrumentsQualified.includes(id)) {
      this.data.instrumentsQualified.push(id);
      this.save();
    }
  }

  addNotebookConcept(concept) {
    if (!this.data.notebookConcepts.includes(concept)) {
      this.data.notebookConcepts.push(concept);
      this.save();
    }
  }

  reset() {
    this.data = structuredClone(EMPTY);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    this.bus?.emit('save:reset');
  }

  /**
   * Non-destructive, read-only probe of legacy RECKON/Navy-course progress.
   * Returns a summary or null; never mutates the legacy keys.
   */
  probeLegacyReckon() {
    const found = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('reckon') || k.startsWith('nc_') || k.includes('navy_course'))) {
          found[k] = true;
        }
      }
    } catch { /* ignore */ }
    const keys = Object.keys(found);
    return keys.length ? { keys } : null;
  }

  // Date.now is fine at runtime in the browser (only workflow scripts forbid it).
  _now() {
    return Date.now();
  }
}
