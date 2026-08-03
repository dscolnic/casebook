/**
 * Debrief — the after-action screen. It does three things the spec asks for:
 * reconstructs the evidence chain the player actually built, shows where the
 * score came from (including what it cost them and why), and names the concepts
 * the mission was teaching — after the experience, not before it.
 */
export class Debrief {
  constructor({ eventBus, notebook }) {
    this.bus = eventBus;
    this.notebook = notebook;
    this.el = document.getElementById('debrief');
    this.body = document.getElementById('debrief-body');
    document.getElementById('btn-debrief-notebook')?.addEventListener('click', () => {
      this.hide();
      this.notebook?.toggle(true);
    });
  }

  show(result) {
    if (!this.el) return;
    const { title, score, parts, objectives, chain } = result;
    const grade = score >= 90 ? 'Exemplary' : score >= 75 ? 'Qualified' : score >= 55 ? 'Passed, with lessons' : 'Needs another watch';
    const key = (chain || []).filter((e) => ['observation', 'hypothesis', 'estimate', 'plan'].includes(e.kind)
      || (e.kind === 'measurement' && /PSU|cm|dB|psi/.test(e.measurement)));

    this.body.innerHTML = `
      <div class="debrief-head">
        <div>
          <div class="debrief-label">Mission Debrief</div>
          <h2 style="margin:4px 0 0;">${title}</h2>
        </div>
        <div class="debrief-score">
          <div class="ds-num">${score}</div>
          <div class="ds-grade">${grade}</div>
        </div>
      </div>

      ${parts && parts.length ? `<div class="debrief-section">
        <h3>Where the score came from</h3>
        ${parts.map((p) => `<div class="score-row">
          <span class="sr-label">${p.label}</span>
          <span class="sr-bar"><i style="width:${Math.max(0, Math.min(100, (p.got / p.max) * 100))}%"></i></span>
          <span class="sr-num">${p.got}/${p.max}</span>
          <span class="sr-why">${p.why}</span>
        </div>`).join('')}
      </div>` : ''}

      <div class="debrief-section">
        <h3>The chain you built</h3>
        ${key.length ? `<ol class="debrief-chain">${key.map((e) =>
          `<li><span class="dc-where">${e.compartment}</span> ${e.measurement ? `<b>${e.measurement}</b> — ` : ''}${e.observation}</li>`).join('')}</ol>`
        : '<div class="notebook-empty">No evidence was recorded.</div>'}
      </div>

      ${objectives && objectives.length ? `<div class="debrief-section">
        <h3>What this watch was teaching</h3>
        <ul class="debrief-objectives">${objectives.map((o) => `<li>${o}</li>`).join('')}</ul>
      </div>` : ''}`;

    this.el.hidden = false;
  }

  hide() { if (this.el) this.el.hidden = true; }
}
