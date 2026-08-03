/**
 * Notebook — the evidence notebook. Records timestamped measurements/observations
 * with compartment, instrument, and a short note. It supports the reasoning loop
 * (evidence accumulates as you measure) but does not auto-solve anything.
 *
 * Fields per entry mirror the spec: timestamp, compartment, instrument,
 * measurement, sourceDisplay, observation, confidence, mission, dependency.
 */
export class Notebook {
  constructor({ eventBus, save }) {
    this.bus = eventBus;
    this.save = save;
    this.entries = [];
    this.panel = document.getElementById('notebook');
    this.list = document.getElementById('notebook-entries');
    this.open = false;

    document.getElementById('btn-close-notebook')?.addEventListener('click', () => this.toggle(false));
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyN' && !this._typing(e)) this.toggle();
    });
    this.bus.on('notebook:concept', (c) => {
      this.save?.addNotebookConcept(c.concept);
    });
  }

  _typing(e) {
    return e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT');
  }

  record(entry) {
    const e = {
      clock: entry.clock || '—',
      compartment: entry.compartment || '—',
      instrument: entry.instrument || '',
      measurement: entry.measurement || '',
      observation: entry.observation || '',
      confidence: entry.confidence || 'unresolved',
      mission: entry.mission || null,
    };
    this.entries.push(e);
    this.bus.emit('notebook:recorded', e);
    if (this.open) this._render();
  }

  _render() {
    if (!this.entries.length) {
      this.list.innerHTML = '<div class="notebook-empty">No evidence recorded yet. Take a measurement with an instrument (F) to log it here.</div>';
      return;
    }
    this.list.innerHTML = this.entries.slice().reverse().map((e) => `
      <div class="notebook-entry">
        <div class="ne-head">${e.compartment} — ${e.clock}${e.instrument ? ' · ' + e.instrument : ''}</div>
        <div class="ne-body">${e.measurement ? `<b>${e.measurement}</b> — ` : ''}${e.observation}</div>
      </div>`).join('');
  }

  toggle(force) {
    this.open = force === undefined ? !this.open : force;
    this.panel.hidden = !this.open;
    if (this.open) this._render();
    this.bus.emit('notebook:toggled', this.open);
  }
}
