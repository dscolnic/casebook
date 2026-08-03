import { GRAPHICS_PRESETS } from '../core/SettingsManager.js';

/**
 * SettingsMenu — builds the settings controls into the pause menu container:
 * graphics preset, master volume, mouse sensitivity, invert-Y, FOV, head-bob.
 * Changes persist immediately via SettingsManager and emit 'settings:changed'.
 */
export class SettingsMenu {
  constructor({ settings, container }) {
    this.settings = settings;
    this.container = container;
  }

  render() {
    const s = this.settings;
    this.container.innerHTML = `
      <div class="settings-group">
        <h3>Graphics</h3>
        <div class="settings-row">
          <label for="set-graphics">Quality preset</label>
          <select id="set-graphics">
            ${Object.entries(GRAPHICS_PRESETS).map(([k, v]) =>
              `<option value="${k}" ${s.get('graphicsPreset') === k ? 'selected' : ''}>${v.label}</option>`).join('')}
          </select>
        </div>
        <div class="settings-row">
          <label for="set-fov">Field of view</label>
          <input type="range" id="set-fov" min="60" max="90" step="1" value="${s.get('fov')}">
          <span class="value" id="val-fov">${s.get('fov')}°</span>
        </div>
      </div>
      <div class="settings-group">
        <h3>Audio</h3>
        <div class="settings-row">
          <label for="set-vol">Master volume</label>
          <input type="range" id="set-vol" min="0" max="1" step="0.05" value="${s.get('masterVolume')}">
          <span class="value" id="val-vol">${Math.round(s.get('masterVolume') * 100)}%</span>
        </div>
      </div>
      <div class="settings-group">
        <h3>Controls</h3>
        <div class="settings-row">
          <label for="set-sens">Mouse sensitivity</label>
          <input type="range" id="set-sens" min="0.0008" max="0.005" step="0.0002" value="${s.get('mouseSensitivity')}">
          <span class="value" id="val-sens">${(s.get('mouseSensitivity') * 1000).toFixed(1)}</span>
        </div>
        <div class="settings-row">
          <label for="set-invert">Invert vertical look</label>
          <input type="checkbox" id="set-invert" ${s.get('invertY') ? 'checked' : ''}>
        </div>
        <div class="settings-row">
          <label for="set-bob">Head bob</label>
          <input type="checkbox" id="set-bob" ${s.get('headBob') ? 'checked' : ''}>
        </div>
      </div>
      <div class="settings-group" style="opacity:.7;font-size:12px;">
        <div>Move <b>WASD</b> · Look <b>Mouse</b> · Interact <b>E</b> · Use tool <b>F</b> · Notebook <b>N</b> · Crouch <b>Ctrl/C</b> · Cycle tool <b>[ ]</b> · Pause <b>Esc</b></div>
      </div>`;

    const $ = (id) => this.container.querySelector(id);
    $('#set-graphics').addEventListener('change', (e) => s.set('graphicsPreset', e.target.value));
    $('#set-fov').addEventListener('input', (e) => { s.set('fov', +e.target.value); $('#val-fov').textContent = e.target.value + '°'; });
    $('#set-vol').addEventListener('input', (e) => { s.set('masterVolume', +e.target.value); $('#val-vol').textContent = Math.round(e.target.value * 100) + '%'; });
    $('#set-sens').addEventListener('input', (e) => { s.set('mouseSensitivity', +e.target.value); $('#val-sens').textContent = (e.target.value * 1000).toFixed(1); });
    $('#set-invert').addEventListener('change', (e) => s.set('invertY', e.target.checked));
    $('#set-bob').addEventListener('change', (e) => s.set('headBob', e.target.checked));
  }
}
