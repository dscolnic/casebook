import { guideStrip } from './StationGuide.js';

/**
 * CommandBoard — every casualty on the boat, every team available, and the two
 * decisions that belong to whoever is in charge: what order to work them in, and
 * who does which.
 *
 * The board deliberately does not rank the casualties for the player. It shows
 * what each one threatens — the ship, the people, the mission — and lets them
 * commit to an order. It also lets them keep everything for themselves, which is
 * the mistake it exists to expose: one person can be in one compartment.
 *
 * Lineage: this is the Protocol game's ordering skill (`nc_fire_protocol`) lifted
 * from a single procedure to a whole-boat triage, with real teams and real travel
 * time doing the arguing instead of a score.
 */
export class CommandBoard {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.teams = ctx.teams;
    this.tab = 'triage';
    this.order = [];
  }

  render(container) {
    this.container = container;
    container.innerHTML = `
      <div id="cb-guide"></div>
      <div class="tab-row" style="margin-bottom:12px;">
        ${[['triage', 'Triage & priority'], ['assign', 'Assign teams'], ['reports', 'Reports']]
          .map(([id, label]) => `<button class="station-btn" data-ctab="${id}">${label}</button>`).join('')}
      </div>
      <div id="cb-body"></div>
      <div id="cb-msg" class="console-sub" style="margin-top:12px;"></div>`;
    container.querySelectorAll('[data-ctab]').forEach((b) =>
      b.addEventListener('click', () => { this.tab = b.dataset.ctab; this._render(); }));
    this._render();
    this._off = this.bus.on('teams:report', () => this._render());
  }

  _guide() {
    const open = this.teams.open;
    const idle = this.teams.idle;
    let doNow;
    if (!open.length) {
      doNow = 'Nothing outstanding on the board.';
    } else if (!this.state.commandPriority) {
      doNow = `${open.length} casualties and one of you. Set a priority order first — you cannot decide who goes where until you know what matters most.`;
    } else if (idle.length) {
      doNow = `${idle.length} team${idle.length > 1 ? 's' : ''} standing idle while ${open.length} thing${open.length > 1 ? 's are' : ' is'} outstanding. Send them.`;
    } else {
      doNow = 'Everybody is committed. Keep the one you kept for yourself moving, and watch for reports.';
    }
    return guideStrip({
      what: 'The command board: every casualty aboard, every team you can send, and who is where.',
      doNow,
      why: 'Command is choosing what YOU do and delegating the rest. A team is slower than you and takes time to get there — but there is only one of you, and five things are happening.',
    });
  }

  _render() {
    if (!this.container) return;
    this.container.querySelector('#cb-guide').innerHTML = this._guide();
    this.container.querySelectorAll('[data-ctab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.ctab === this.tab));
    const body = this.container.querySelector('#cb-body');
    if (this.tab === 'triage') this._renderTriage(body);
    else if (this.tab === 'assign') this._renderAssign(body);
    else this._renderReports(body);
  }

  _renderTriage(body) {
    const tasks = [...this.teams.tasks.values()];
    body.innerHTML = `
      <div class="console-sub" style="margin-bottom:10px;">
        Click them in the order you intend to work them, then commit. Nothing here tells you
        which is most urgent — that is the decision.
      </div>
      <table class="bearing-table">
        <tr><th>#</th><th>Casualty</th><th>Where</th><th>Threatens</th><th>State</th><th></th></tr>
        ${tasks.map((t) => {
          const idx = this.order.indexOf(t.id);
          return `<tr>
            <td>${idx >= 0 ? idx + 1 : '—'}</td>
            <td>${t.title}</td>
            <td>${t.compartment.replace(/_/g, ' ')}</td>
            <td>${THREAT[t.kind] || '—'}</td>
            <td style="color:${t.done ? 'var(--ok)' : this.teams.blocked(t) ? 'var(--danger)' : 'var(--accent-warm)'}">${
              t.done ? 'complete' : this.teams.blocked(t) ? 'cannot be reached' : t.assignedTo ? `${this.teams.team(t.assignedTo).name} on it` : 'outstanding'}</td>
            <td><button class="station-btn" data-pick="${t.id}" ${t.done ? 'disabled' : ''}>${idx >= 0 ? 'Unpick' : 'Pick next'}</button></td>
          </tr>`;
        }).join('')}
      </table>
      <button class="station-btn" id="cb-commit" style="margin-top:10px;" ${this.order.length < 3 ? 'disabled' : ''}>
        Commit this priority order</button>`;

    body.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.pick;
      const i = this.order.indexOf(id);
      if (i >= 0) this.order.splice(i, 1); else this.order.push(id);
      this._render();
    }));
    body.querySelector('#cb-commit')?.addEventListener('click', () => this._commit());
  }

  _renderAssign(body) {
    const tasks = [...this.teams.tasks.values()].filter((t) => !t.done);
    const teams = [...this.teams.teams.values()];
    body.innerHTML = `
      <div class="console-grid" style="grid-template-columns: repeat(2,1fr);">
        ${teams.map((t) => `
          <div class="console-tile">
            <h4>${t.name}</h4>
            <div class="console-sub">${t.note}</div>
            <div class="console-sub">Trades: ${t.skills.join(', ')}</div>
            <div class="ev-row"><span class="ev-key">Status</span>
              <span class="ev-val ${t.status === 'idle' ? 'warn' : 'good'}">${
                t.status === 'idle' ? `idle in ${t.at.replace(/_/g, ' ')}`
                  : `${t.status} — ${this.teams.task(t.task)?.title ?? ''} (${Math.max(0, Math.round(t.etaS))} s)`}</span></div>
            ${t.status === 'idle' ? `<div class="settings-row" style="margin-top:6px;">
              <select data-for="${t.id}">
                <option value="">— send to —</option>
                ${tasks.map((k) => `<option value="${k.id}">${k.title}</option>`).join('')}
              </select>
              <button class="station-btn" data-send="${t.id}">Send</button>
            </div>` : `<button class="station-btn" data-recall="${t.id}" style="margin-top:6px;">Recall</button>`}
          </div>`).join('')}
      </div>
      <div class="console-sub" style="margin-top:10px;">
        A team sent to the wrong trade still walks there, finds it cannot help, and walks back.
      </div>`;

    body.querySelectorAll('[data-send]').forEach((b) => b.addEventListener('click', () => {
      const teamId = b.dataset.send;
      const sel = body.querySelector(`[data-for="${teamId}"]`);
      if (!sel?.value) { this._msg('Pick a casualty to send them to.', true); return; }
      const res = this.teams.assign(teamId, sel.value);
      this._msg(res.ok
        ? `${this.teams.team(teamId).name} away.`
        : `Cannot send them: ${res.reason}.`, !res.ok);
      this._render();
    }));
    body.querySelectorAll('[data-recall]').forEach((b) => b.addEventListener('click', () => {
      this.teams.recall(b.dataset.recall);
      this._msg('Recalled. Whatever they were doing is not being done.');
      this._render();
    }));
  }

  _renderReports(body) {
    const all = [...this.teams.teams.values()].flatMap((t) => t.reports);
    body.innerHTML = all.length
      ? all.map((r) => `<div class="notebook-entry"><div class="ne-body">${r.text}</div></div>`).join('')
      : '<div class="notebook-empty">No reports yet.</div>';
  }

  _msg(text, bad = false) {
    const el = this.container.querySelector('#cb-msg');
    if (el) el.innerHTML = `<span style="color:${bad ? 'var(--danger)' : 'var(--ok)'}">${text}</span>`;
  }

  /**
   * Commit to an order. The board scores it against one rule, and says the rule
   * out loud: people first, then the ship, then the mission — and anything that
   * unblocks another casualty comes before the casualty it is blocking.
   */
  _commit() {
    const order = this.order.slice();
    const rank = (id) => {
      const t = this.teams.task(id);
      if (!t) return 99;
      if (t.kind === 'medical') return 0;
      if (t.kind === 'debris') return 1;      // clears the way to the flooding
      if (t.kind === 'flooding') return 2;
      if (t.kind === 'electrical') return 3;
      return 4;
    };
    let inversions = 0;
    for (let i = 0; i < order.length; i++) {
      for (let j = i + 1; j < order.length; j++) if (rank(order[i]) > rank(order[j])) inversions += 1;
    }
    this.state.commandPriority = order;
    this.bus.emit('command:priority', { order, inversions, sound: inversions === 0 });
    this._msg(inversions === 0
      ? 'Order committed: the injured man, then the passage that is blocking everything aft of it, then the flooding, then power. That is defensible.'
      : `Order committed with ${inversions} thing${inversions > 1 ? 's' : ''} out of sequence. People come before the ship, and whatever is blocking access comes before what it is blocking — you cannot fight flooding you cannot reach.`,
      inversions > 0);
    this._render();
  }

  dispose() { this._off?.(); }
}

const THREAT = {
  medical: 'a person',
  flooding: 'the ship',
  debris: 'access to everything aft of it',
  electrical: 'power, pumps and lighting',
  ventilation: 'the air',
};
