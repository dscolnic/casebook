/**
 * CrewTeams — the other people aboard, and the fact that you are one person.
 *
 * Command Episode 2 gives the player five things happening at once and one body
 * to do them with. The lesson is not "work faster", it is that command is mostly
 * deciding what YOU do and who does the rest — so teams here are genuinely
 * autonomous: they take time to get there, they take time to work, they can be
 * given something they are not qualified for, and they report back either way.
 *
 * A team is not a cheat code. Each one is slower than the player would be, some
 * tasks cannot start until something else is cleared, and a task nobody is
 * assigned to simply does not get done — which the boat then shows you.
 */

/** Who is aboard to be sent somewhere. */
export const TEAMS = {
  dc_party: {
    id: 'dc_party', name: 'Damage-control party', skills: ['flooding', 'debris'],
    station: 'machinery_control', speed: 1.0,
    note: 'Four hands with pumps, shoring and patches. Slower than you, and there are four of them.',
  },
  corpsman: {
    id: 'corpsman', name: 'Corpsman', skills: ['medical'],
    station: 'berthing_mess', speed: 1.2,
    note: 'The only person aboard who can treat a casualty. Nothing else they do matters as much.',
  },
  electrician: {
    id: 'electrician', name: 'Electrician\'s mate', skills: ['electrical'],
    station: 'electrical', speed: 1.0,
    note: 'Knows the distribution better than you do. Restoration is their job, not yours.',
  },
  auxiliaryman: {
    id: 'auxiliaryman', name: 'Auxiliaryman', skills: ['flooding', 'ventilation', 'debris'],
    station: 'auxiliary', speed: 0.9,
    note: 'Pumps, valves and heavy gear. Useful anywhere aft.',
  },
};

/** How long a job takes once somebody is standing in front of it, in seconds. */
const WORK_SECONDS = {
  flooding: 95,
  debris: 70,
  medical: 60,
  electrical: 55,
  ventilation: 40,
};

export class CrewTeams {
  constructor({ state, eventBus, layout }) {
    this.state = state;
    this.bus = eventBus;
    this.layout = layout;
    /** taskId -> { id, kind, compartment, title, blockedBy, done, assignedTo } */
    this.tasks = new Map();
    this.teams = new Map();
    for (const t of Object.values(TEAMS)) {
      this.teams.set(t.id, { ...t, status: 'idle', task: null, etaS: 0, at: t.station, reports: [] });
    }
    state.crewTeams = this.teams;
  }

  reset() {
    this.tasks.clear();
    for (const t of this.teams.values()) {
      Object.assign(t, { status: 'idle', task: null, etaS: 0, at: TEAMS[t.id].station, reports: [] });
    }
  }

  /** Register something that needs doing. */
  addTask({ id, kind, compartment, title, blockedBy = null, onDone = null }) {
    const task = { id, kind, compartment, title, blockedBy, onDone, done: false, assignedTo: null, progressS: 0 };
    this.tasks.set(id, task);
    this.bus.emit('teams:taskAdded', { id, kind, compartment, title });
    return task;
  }

  task(id) { return this.tasks.get(id); }
  team(id) { return this.teams.get(id); }
  get open() { return [...this.tasks.values()].filter((t) => !t.done); }
  get idle() { return [...this.teams.values()].filter((t) => t.status === 'idle'); }

  /** Is this task waiting on something else? */
  blocked(task) {
    if (!task.blockedBy) return false;
    const other = this.tasks.get(task.blockedBy);
    return !!other && !other.done;
  }

  /**
   * Send a team to a task. Refused only for things that are physically impossible
   * — no such team, already busy — and NOT for a poor choice: sending the corpsman
   * to a flooded bilge is allowed, and what happens is that they arrive, cannot do
   * it, and report back having wasted the time.
   */
  assign(teamId, taskId) {
    const team = this.teams.get(teamId);
    const task = this.tasks.get(taskId);
    if (!team || !task) return { ok: false, reason: 'unknown' };
    if (team.status !== 'idle') return { ok: false, reason: 'busy', team: team.name };
    if (task.done) return { ok: false, reason: 'done' };

    const qualified = team.skills.includes(task.kind);
    const here = this.layout.findIndex((c) => c.id === team.at);
    const there = this.layout.findIndex((c) => c.id === task.compartment);
    const travelS = Math.max(8, Math.abs(here - there) * 9 / team.speed);

    team.status = 'enroute';
    team.task = taskId;
    team.etaS = travelS;
    team.qualified = qualified;
    task.assignedTo = teamId;

    this.bus.emit('teams:assigned', {
      teamId, taskId, qualified, travelS,
      note: qualified
        ? `${team.name} on their way to ${task.compartment.replace(/_/g, ' ')} — about ${Math.round(travelS)} s to get there.`
        : `${team.name} acknowledges, but ${task.title.toLowerCase()} is not their trade. They will go and look.`,
    });
    return { ok: true, qualified, travelS };
  }

  /** Pull a team off what they are doing, e.g. because something worse happened. */
  recall(teamId) {
    const team = this.teams.get(teamId);
    if (!team || team.status === 'idle') return false;
    const task = this.tasks.get(team.task);
    if (task) task.assignedTo = null;
    Object.assign(team, { status: 'idle', task: null, etaS: 0 });
    this.bus.emit('teams:recalled', { teamId });
    return true;
  }

  update(dt) {
    for (const team of this.teams.values()) {
      if (team.status === 'idle') continue;
      const task = this.tasks.get(team.task);
      if (!task || task.done) { Object.assign(team, { status: 'idle', task: null, etaS: 0 }); continue; }

      if (team.status === 'enroute') {
        team.etaS -= dt;
        if (team.etaS > 0) continue;
        team.at = task.compartment;
        // Arrived. Three ways this can go.
        if (this.blocked(task)) {
          team.status = 'idle';
          team.task = null;
          task.assignedTo = null;
          this._report(team, `cannot get to ${task.compartment.replace(/_/g, ' ')} — the passage is still blocked.`, task);
          continue;
        }
        if (!team.qualified) {
          team.status = 'idle';
          team.task = null;
          task.assignedTo = null;
          this._report(team, `is at ${task.compartment.replace(/_/g, ' ')} but cannot work ${task.title.toLowerCase()} — wrong trade, and that is time gone.`, task);
          continue;
        }
        team.status = 'working';
        team.etaS = WORK_SECONDS[task.kind] ?? 60;
        this._report(team, `on scene at ${task.compartment.replace(/_/g, ' ')} and starting work.`, task);
        continue;
      }

      if (team.status === 'working') {
        team.etaS -= dt;
        task.progressS += dt;
        if (team.etaS > 0) continue;
        task.done = true;
        task.assignedTo = null;
        team.status = 'idle';
        team.task = null;
        task.onDone?.();
        this.bus.emit('teams:taskDone', { taskId: task.id, teamId: team.id, kind: task.kind, compartment: task.compartment });
        this._report(team, `reports ${task.title.toLowerCase()} complete.`, task);
      }
    }
  }

  _report(team, text, task) {
    const entry = { team: team.id, text: `${team.name} ${text}`, taskId: task?.id ?? null };
    team.reports.push(entry);
    this.bus.emit('teams:report', entry);
    this.bus.emit('hud:toast', { concept: 'Report', text: entry.text });
  }
}
