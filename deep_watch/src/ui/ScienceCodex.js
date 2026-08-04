import { SCIENCE_NOTES, resolveScienceKey, scienceIndex, scienceEntry } from '../content/scienceNotes.js';

/**
 * ScienceCodex — the "how does this actually work" panel.
 *
 * Every interactable object, every wall panel and every console has an entry in
 * scienceNotes.js, and this is the one surface that renders them. It can be opened
 * three ways, all of which land in the same place:
 *
 *   G, looking at something          → that thing's entry
 *   the Science button on a console  → that console's entry
 *   Browse all                       → the index, grouped by kind
 *
 * The simulation is frozen while it is open (the Game does not step systems in
 * mode 'science'). That is deliberate: this is a manual, not a display, and a
 * player should not be punished with a flooded compartment for reading about how
 * the sounding tape works.
 */
export class ScienceCodex {
  constructor({ eventBus, save = null }) {
    this.bus = eventBus;
    this.save = save;
    this.overlay = document.getElementById('science-overlay');
    this.bodyEl = document.getElementById('science-body');
    this.titleEl = document.getElementById('science-title');
    this.open = false;
    this.currentKey = null;
    this._history = [];
    this._lookingAt = null;   // {type,id} from the interaction prompt

    this.bus.on('interaction:prompt', (p) => { this._lookingAt = p ? { type: p.type, id: p.id } : null; });

    document.getElementById('btn-close-science')?.addEventListener('click', () => this.hide());
    document.getElementById('btn-science-index')?.addEventListener('click', () => this.showIndex());
    document.getElementById('btn-science-back')?.addEventListener('click', () => this.back());

    // Any element anywhere may ask for an entry: data-science="key".
    document.addEventListener('click', (e) => {
      const el = e.target.closest?.('[data-science]');
      if (!el) return;
      e.preventDefault();
      const key = el.getAttribute('data-science');
      if (key === 'index') this.showIndex();
      else this.show(key);
    });
  }

  /** What G would open right now, or null if there is nothing under the crosshair. */
  keyForLookedAt() {
    if (!this._lookingAt) return null;
    return resolveScienceKey(this._lookingAt.type, this._lookingAt.id);
  }

  /** True if the thing the player is looking at has an explanation. */
  get hasTarget() { return !!this.keyForLookedAt(); }

  /** Open for whatever is under the crosshair; false if nothing is. */
  showLookedAt() {
    const key = this.keyForLookedAt();
    if (!key) return false;
    this.show(key);
    return true;
  }

  show(key) {
    if (!scienceEntry(key)) return false;
    if (this.currentKey && this.currentKey !== key) this._history.push(this.currentKey);
    this._render(key);
    return true;
  }

  showIndex() {
    if (this.currentKey && this.currentKey !== 'index') this._history.push(this.currentKey);
    this._render('index');
    return true;
  }

  /** Step back to the previous entry, or close if this was the first one. */
  back() {
    const prev = this._history.pop();
    if (!prev) { this.hide(); return false; }
    this._render(prev);
    return true;
  }

  /** Paint a key without touching the history stack. */
  _render(key) {
    if (key === 'index') {
      this.titleEl.innerHTML = `<span class="sci-kind">Reference</span>How Everything Works`;
      this.bodyEl.innerHTML = this._renderIndex();
    } else {
      const entry = scienceEntry(key);
      if (!entry) return false;
      this.titleEl.innerHTML = `<span class="sci-kind">${entry.kind}</span>${entry.title}`;
      this.bodyEl.innerHTML = this._renderEntry(entry);
      this.save?.addNotebookConcept?.(`science:${key}`);
    }
    this.currentKey = key;
    this.bodyEl.scrollTop = 0;
    this._setOpen(true);
    this.bus.emit('science:opened', { key, title: this.titleEl.textContent });
    return true;
  }

  hide() {
    if (!this.open) return;
    this._setOpen(false);
    this.currentKey = null;
    this._history.length = 0;
    this.bus.emit('science:closed');
  }

  toggleLookedAt() {
    if (this.open) { this.hide(); return true; }
    return this.showLookedAt() || (this.showIndex(), true);
  }

  _setOpen(on) {
    this.open = on;
    this.overlay.hidden = !on;
    const back = document.getElementById('btn-science-back');
    if (back) back.hidden = this._history.length === 0;
  }

  _renderEntry(e) {
    const numbers = (e.numbers || []).map(([label, meaning]) => `
      <div class="sci-num">
        <span class="sn-label">${label}</span>
        <span class="sn-meaning">${meaning}</span>
      </div>`).join('');

    const math = e.math ? `
      <section class="sci-section sci-math">
        <h3>The relationship</h3>
        <div class="sci-expr">${e.math.expr}</div>
        <div class="sci-terms">${(e.math.terms || []).map(([t, d]) => `
          <div class="sci-term"><span class="st-sym">${t}</span><span class="st-def">${d}</span></div>`).join('')}
        </div>
      </section>` : '';

    const see = (e.see || []).filter((k) => SCIENCE_NOTES[k]).map((k) => `
      <button class="sci-link" data-science="${k}">${SCIENCE_NOTES[k].title}</button>`).join('');

    return `
      <p class="sci-oneline">${e.oneLine}</p>
      <section class="sci-section">
        <h3>How it works</h3>
        <p>${e.how}</p>
      </section>
      ${numbers ? `<section class="sci-section">
        <h3>What the numbers mean</h3>
        <div class="sci-numbers">${numbers}</div>
      </section>` : ''}
      ${math}
      <section class="sci-section">
        <h3>How to read it</h3>
        <p>${e.read}</p>
      </section>
      ${e.trap ? `<section class="sci-section sci-trap">
        <h3>Where people go wrong</h3>
        <p>${e.trap}</p>
      </section>` : ''}
      ${see ? `<section class="sci-section sci-see">
        <h3>Related</h3>
        <div class="sci-links">${see}</div>
      </section>` : ''}`;
  }

  _renderIndex() {
    return scienceIndex().map((group) => `
      <section class="sci-section">
        <h3>${group.kind}s</h3>
        <div class="sci-index">
          ${group.items.map((it) => `
            <button class="sci-index-row" data-science="${it.key}">
              <span class="sir-title">${it.title}</span>
              <span class="sir-line">${it.oneLine}</span>
            </button>`).join('')}
        </div>
      </section>`).join('');
  }
}
