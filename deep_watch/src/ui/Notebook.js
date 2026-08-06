/**
 * Notebook — the evidence notebook. Everything the player measured or observed,
 * in the order they got it, plus the hypotheses they called, the source
 * dependencies they were warned about, and the mission report they file at the end.
 *
 * It records; it does not solve. Nothing in here tells the player what the fault
 * is — but at the end it reconstructs the chain of evidence that got them there,
 * which is the part of the reasoning worth remembering.
 *
 * Source lineage for the dependency view: Casebook (`casebook_static.html`,
 * `nc_greywake_case`) — independent corroboration versus two displays that share
 * one upstream source.
 */
export class Notebook {
  constructor({ eventBus, save }) {
    this.bus = eventBus;
    this.save = save;
    this.entries = [];
    this.dependencies = [];
    this.panel = document.getElementById('notebook');
    this.list = document.getElementById('notebook-entries');
    this.tabsEl = document.getElementById('notebook-tabs');
    this.open = false;
    this.tab = 'evidence';
    this.reportSubmitted = false;

    document.getElementById('btn-close-notebook')?.addEventListener('click', () => this.toggle(false));
    document.addEventListener('keydown', (e) => {
      if (e.code !== 'KeyN' || this._typing(e)) return;
      // Not while a console or the codex is up. Both are painted over the top of
      // this panel, so opening it underneath them looks like the key did nothing
      // and leaves an invisible, unclickable notebook stacked below.
      if (!this.open && this._blockedByOverlay()) return;
      this.toggle();
    });
    this.bus.on('notebook:concept', (c) => this.save?.addNotebookConcept(c.concept));
    this.tabsEl?.addEventListener('click', (e) => {
      const t = e.target.dataset?.ntab;
      if (t) { this.tab = t; this._render(); }
    });
  }

  /** Another full-screen panel is already up. */
  _blockedByOverlay() {
    return ['station-overlay', 'science-overlay', 'pause-menu', 'debrief', 'start-screen']
      .some((id) => document.getElementById(id) && !document.getElementById(id).hidden);
  }

  _typing(e) {
    return e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName);
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
      kind: entry.kind || 'measurement',
      tag: entry.tag || null,
      detail: entry.detail || null,
    };
    this.entries.push(e);
    this.bus.emit('notebook:recorded', e);
    if (this.open) this._render();
    return e;
  }

  /** Record a shared-source warning (two indications that are not independent). */
  addDependency(dep) {
    if (this.dependencies.some((d) => d.id === dep.id)) return;
    this.dependencies.push(dep);
    this.bus.emit('notebook:dependency', dep);
  }

  hasTag(tag) { return this.entries.some((e) => e.tag === tag); }
  taggedEntries(tag) { return this.entries.filter((e) => e.tag === tag); }

  clear() {
    this.entries.length = 0;
    this.dependencies.length = 0;
    this.reportSubmitted = false;
  }

  _render() {
    if (this.tabsEl) {
      this.tabsEl.querySelectorAll('[data-ntab]').forEach((b) =>
        b.classList.toggle('active', b.dataset.ntab === this.tab));
    }
    if (this.tab === 'evidence') return this._renderEvidence();
    if (this.tab === 'hypotheses') return this._renderKind('hypothesis', 'No hypothesis has been called yet.');
    if (this.tab === 'dependencies') return this._renderDependencies();
    return this._renderReport();
  }

  _renderEvidence() {
    const items = this.entries.filter((e) => e.kind !== 'hypothesis');
    if (!items.length) {
      this.list.innerHTML = '<div class="notebook-empty">No evidence recorded yet. Take a measurement with an instrument (F) or read a station to log it here.</div>';
      return;
    }
    this.list.innerHTML = items.slice().reverse().map((e) => this._entryHtml(e)).join('');
  }

  _renderKind(kind, empty) {
    const items = this.entries.filter((e) => e.kind === kind);
    this.list.innerHTML = items.length
      ? items.slice().reverse().map((e) => this._entryHtml(e)).join('')
      : `<div class="notebook-empty">${empty}</div>`;
  }

  _entryHtml(e) {
    return `<div class="notebook-entry ${e.kind}">
      <div class="ne-head">${e.compartment} — ${e.clock}${e.instrument ? ' · ' + e.instrument : ''}</div>
      <div class="ne-body">${e.measurement ? `<b>${e.measurement}</b> — ` : ''}${e.observation}</div>
      ${e.detail ? `<div class="ne-detail">${e.detail.join('<br>')}</div>` : ''}
    </div>`;
  }

  _renderDependencies() {
    if (!this.dependencies.length) {
      this.list.innerHTML = '<div class="notebook-empty">No shared-source warnings recorded yet. Two indications that agree are only worth two indications if they do not come from the same sensor.</div>';
      return;
    }
    this.list.innerHTML = this.dependencies.map((d) => `
      <div class="notebook-entry dependency">
        <div class="ne-head">${d.title}</div>
        <div class="dep-graph">
          ${d.displays.map((x) => `<span class="dep-node">${x}</span>`).join('')}
          <span class="dep-join">┐<br>├──</span>
          <span class="dep-source">${d.sharedSource}</span>
        </div>
        <div class="ne-body">${d.note}</div>
        ${d.independent ? `<div class="ne-detail">Independent of it: ${d.independent}</div>` : ''}
      </div>`).join('');
  }

  _renderReport() {
    const measurements = this.entries.filter((e) => e.kind === 'measurement').length;
    const chain = this.entries.filter((e) => ['measurement', 'observation', 'hypothesis', 'estimate', 'plan', 'action'].includes(e.kind));
    this.list.innerHTML = `
      <div class="report-head">
        <div><b>${measurements}</b> measurements · <b>${this.entries.filter((e) => e.kind === 'hypothesis').length}</b> hypotheses called ·
        <b>${this.dependencies.length}</b> dependency notes</div>
      </div>
      <div class="report-chain">
        ${chain.map((e) => `<div class="rc-row">
          <span class="rc-clock">${e.clock}</span>
          <span class="rc-where">${e.compartment}</span>
          <span class="rc-what">${e.measurement || e.observation}</span>
        </div>`).join('') || '<div class="notebook-empty">Nothing to reconstruct yet.</div>'}
      </div>
      <button class="primary-btn" id="btn-submit-report" ${this.reportSubmitted ? 'disabled' : ''}>
        ${this.reportSubmitted ? 'Report filed' : 'File the casualty report'}
      </button>`;
    this.list.querySelector('#btn-submit-report')?.addEventListener('click', () => {
      if (this.reportSubmitted) return;
      this.reportSubmitted = true;
      this.bus.emit('notebook:reportSubmitted', { entries: this.entries.length, chain: chain.length });
      this._render();
    });
  }

  toggle(force) {
    this.open = force === undefined ? !this.open : force;
    this.panel.hidden = !this.open;
    if (this.open) this._render();
    this.bus.emit('notebook:toggled', this.open);
  }
}
