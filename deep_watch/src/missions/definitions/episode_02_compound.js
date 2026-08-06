/**
 * Command Episode 2 — Compound Casualty (Unit II).
 *
 * Five things at once, and one of you:
 *
 *   a flooding source in the after bilge
 *   the starboard main bus tripped, so half the pumps and the lighting are gone
 *   navigation confidence degraded, because the inertial has been running unfixed
 *   an injured hand in the berthing space
 *   a passage blocked by shifted stores, aft of which is the flooding
 *
 * Nothing here is hard on its own. What is hard is that they interact — the
 * blocked passage is between the damage-control party and the water, the tripped
 * bus is why the after bilge pump is not running, and the injured man is a person
 * rather than a system. The episode is scored on the two decisions that belong to
 * whoever is in charge: the ORDER, and WHO does each one.
 *
 * The player is deliberately given more than they can do. Keeping everything for
 * yourself is allowed, and the boat shows you what it costs — water keeps rising
 * in a compartment you are not standing in.
 *
 * Source lineage: Protocol (`nc_fire_protocol`) for ordering under pressure,
 * Ballpark (`nc_bp_depth`) for judging what the flooding rate gives you time for,
 * Casebook (`nc_greywake_case`) for the degraded-navigation call.
 */

export const episode02Compound = {
  id: 'episode_02_compound',
  title: 'Compound Casualty',
  unit: 2,
  startLocation: 'control_room',
  sourceGames: ['Protocol', 'Ballpark', 'Casebook'],
  sourceIds: ['nc_fire_protocol', 'nc_bp_depth', 'nc_greywake_case'],
  learningObjectives: [
    'Triage several casualties by what each one threatens, not by which is loudest.',
    'Recognise a casualty that blocks access to another and deal with it first.',
    'Delegate: match a team\'s trade to the work, and accept that they are slower than you.',
    'Keep the decision that cannot be delegated, and make it with degraded information.',
    'Re-task when a report changes the picture.',
  ],

  onStart(rt) {
    const { state, flooding, teams, nav } = rt;
    state.depth = 58;
    state.orderedDepth = 58;
    state.speed = 5;
    state.commandPriority = null;
    teams.reset();

    // 1. Flooding, aft, moderate — survivable for a while, not forever. The
    //    cross-connect is OPEN, so this is live: the installed after bilge pump
    //    (25 m³/h, and currently dead with the bus) cannot beat it on its own.
    //    Somebody has to go aft and shut the valve, and the way aft is blocked.
    state.valveStates.sw_crossconnect = 'open';
    flooding.addSource({
      id: 'aft_sw_leak',
      compartment: 'auxiliary',
      kind: 'seawater_pipe',
      line: 'aft_sw_supply',
      nominal_m3h: 30,
      refDepth: 60,
      boundedBy: ['sw_crossconnect'],
      position: { x: 0.6, z: 52 },
    });
    state.bilgeLevels.auxiliary = 9;
    flooding.sources[0].discovered = true;

    // 2. Partial power loss: the starboard main is open, so the after bilge pump
    //    and half the lighting are dead. This is why the flooding is not already
    //    being handled by the installed plant.
    state.electricalBuses.stbdMain.energized = false;
    state.pumpStates.bilgePumpAft.on = false;

    // 3. Navigation confidence: hours since a trusted fix, on a closing shelf.
    state.navigationUncertainty = 1.8;
    state.lastTrustedFix.ageMin = 190;

    // 4. An injured hand in berthing.
    state.activeCasualties.push({ id: 'injury_1', type: 'injury', severity: 'serious', compartment: 'berthing_mess' });

    // 5. Stores have shifted in the propulsion space and blocked the passage aft.
    //    Everything aft of it — including the flooding — is behind this.
    rt.world?.setPassageBlocked?.('propulsion', true);

    teams.addTask({ id: 'task_injury', kind: 'medical', compartment: 'berthing_mess',
      title: 'Injured hand in berthing',
      onDone: () => {
        const i = state.activeCasualties.findIndex((c) => c.id === 'injury_1');
        if (i >= 0) state.activeCasualties.splice(i, 1);
        rt.flags.injuryTreated = true;
      } });
    teams.addTask({ id: 'task_debris', kind: 'debris', compartment: 'propulsion',
      title: 'Passage blocked by shifted stores',
      onDone: () => {
        rt.world?.setPassageBlocked?.('propulsion', false);
        rt.flags.passageClear = true;
      } });
    teams.addTask({ id: 'task_flood', kind: 'flooding', compartment: 'auxiliary',
      title: 'Flooding in the after bilge', blockedBy: 'task_debris',
      onDone: () => {
        state.valveStates.sw_crossconnect = 'shut';
        rt.flags.floodIsolated = true;
      } });
    teams.addTask({ id: 'task_power', kind: 'electrical', compartment: 'electrical',
      title: 'Starboard main bus tripped',
      onDone: () => {
        state.electricalBuses.stbdMain.energized = true;
        state.pumpStates.bilgePumpAft.on = true;
        rt.flags.powerRestored = true;
      } });

    const f = rt.flags;
    f.seen = new Set();
    rt.subscribe('command:priority', (p) => { f.priority = p.order; f.inversions = p.inversions; });
    rt.subscribe('teams:assigned', (p) => {
      f.assignments = (f.assignments || 0) + 1;
      if (!p.qualified) f.misassigned = (f.misassigned || 0) + 1;
    });
    rt.subscribe('teams:taskDone', (p) => { f.doneBy = { ...(f.doneBy || {}), [p.taskId]: p.teamId }; });
    rt.subscribe('nav:fixTaken', (p) => { if (p.independent) f.navFixed = true; });
    rt.subscribe('player:enteredCompartment', ({ compartment }) => { f.seen.add(compartment.id); });
    void nav;

    rt.toast('Compound casualty',
      'Flooding aft, the starboard main tripped, a man hurt in berthing, and stores have come adrift and blocked the passage. You are the senior man on your feet.');
  },

  stages: [
    {
      id: 'assess',
      target: { interactable: 'command_board', compartment: 'control_room' },
      label: 'Assess',
      objective: 'Find out what you are actually dealing with before you commit anybody: read the command board in Control, and see the blocked passage for yourself.',
      hints: [
        'The command board is on the port side of the control room, forward of the plot.',
        'Five casualties are posted. One of them is in the way of another.',
        'Walk aft as far as you can get — that will tell you more about the blockage than the board does.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'read the command board', done: (r) => !!r.flags.readBoard,
          on: ['station:opened'],
          watch: (r, changed) => r.bus.on('station:opened', ({ stationId }) => {
            if (stationId === 'command_board') { r.flags.readBoard = true; changed(); }
          }) },
        { label: 'get eyes on the blocked passage in the propulsion space',
          done: (r) => r.flags.seen.has('propulsion'), on: ['player:enteredCompartment'] },
      ], {
        note: 'Four jobs, one of you, and the flooding is behind the blockage. That last part decides the order.',
      })(rt),
    },

    {
      id: 'prioritise',
      target: { interactable: 'command_board', compartment: 'control_room' },
      label: 'Priority',
      objective: 'Commit to an order on the command board: what gets worked first, and why. Nothing on the board ranks them for you.',
      hints: [
        'People before the ship. There is one injured man and he is not going to improve on his own.',
        'Anything that blocks access to another casualty comes before the casualty it blocks.',
        'Power is what is keeping the installed bilge pump off — it matters, and it is not bleeding.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'commit a priority order for at least three casualties',
          done: (r) => Array.isArray(r.flags.priority) && r.flags.priority.length >= 3,
          on: ['command:priority'] },
      ], {
        note: 'An order committed. Now it has to survive contact with the fact that you are one person.',
      })(rt),
    },

    {
      id: 'delegate',
      target: { interactable: 'command_board', compartment: 'control_room' },
      label: 'Delegate',
      objective: 'You cannot be in four compartments. Send the corpsman to the injured man, and put teams onto the blockage and the power — matching each team\'s trade to the work.',
      hints: [
        'Assign face: each team lists the trades it can actually work.',
        'The corpsman is the only person aboard who can treat the casualty. Nothing else they do matters as much.',
        'A team sent to the wrong trade walks there, cannot help, and walks back — the time is simply gone.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'the corpsman treating the injured hand',
          done: (r) => !!r.flags.injuryTreated, on: ['teams:taskDone'] },
        { label: 'the blocked passage cleared',
          done: (r) => !!r.flags.passageClear, on: ['teams:taskDone'] },
        { label: 'the starboard main restored',
          done: (r) => !!r.flags.powerRestored, on: ['teams:taskDone'] },
      ], {
        note: 'Three jobs being worked by three teams, none of them by you. That is what the extra hands are for.',
        pollMs: 900,
      })(rt),
    },

    {
      id: 'keep_one',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'The one you keep',
      objective: 'Navigation confidence cannot be delegated — nobody else can decide what risk the boat takes. At the navigation table, get an independent fix and bring the uncertainty back under a mile.',
      hints: [
        'The inertial repeat and the plot share a source. A fix from either only shrinks the ring; it does not move the plot.',
        'A depth sounding compared with the charted contour owes nothing to the inertial.',
        'Under a mile of uncertainty is the difference between a route being safe and being probably safe.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'take a fix from a source that does not share the inertial',
          done: (r) => !!r.flags.navFixed, on: ['nav:fixTaken'] },
        { label: 'position uncertainty back under 1.0 nm',
          done: (r) => r.state.navigationUncertainty < 1.0, on: ['nav:fixTaken'] },
      ], {
        note: 'A fix that owes nothing to the drifting source, and a ring you can plan a route inside.',
        pollMs: 900,
      })(rt),
    },

    {
      id: 'finish_flooding',
      target: { interactable: 'command_board', compartment: 'control_room' },
      label: 'The water',
      objective: 'With the passage clear, deal with the flooding: send a qualified team aft, or go yourself — and get the after bilge below 6 cm.',
      hints: [
        'The damage-control party and the auxiliaryman can both work flooding.',
        'With the starboard main back, the installed after bilge pump is available again.',
        'You can also go aft and shut the cross-connect yourself. It is faster, and it means you are not in Control.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'the after flooding source isolated',
          done: (r) => !!r.flags.floodIsolated
            || r.flooding.sources.every((s) => r.flooding.isIsolated(s)),
          on: ['teams:taskDone', 'flooding:isolationChanged'] },
        { label: 'the after bilge below 6 cm',
          done: (r) => (r.state.bilgeLevels.auxiliary ?? 99) < 6,
          on: ['instrument:measured'] },
      ], {
        note: 'Water stopped and going down, in a compartment you did not have to be standing in.',
        pollMs: 900,
      })(rt),
    },

    {
      id: 'report_out',
      label: 'Account for it',
      objective: 'Report the whole thing: open the notebook (N), read the chain back, and file it.',
      hints: ['Press N, then the Mission report tab.'],
      arm: (rt) => rt.onEvent('notebook:reportSubmitted', 'Filed. Four casualties, four different answers, and one person deciding which of them was yours.')(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    let score = 0;
    const parts = [];
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    const inv = f.inversions ?? 9;
    add('Triage order', Math.max(0, 25 - inv * 8), 25,
      inv === 0 ? 'People first, then the blockage, then the water, then power.'
        : `${inv} casualt${inv > 1 ? 'ies' : 'y'} out of sequence — access and life safety come first.`);

    const mis = f.misassigned || 0;
    add('Delegation', Math.max(0, 25 - mis * 8), 25,
      mis ? `${mis} team${mis > 1 ? 's' : ''} sent to work outside their trade.` : 'Every team sent to work it could actually do.');

    add('Kept the right one', f.navFixed ? 20 : 6, 20,
      f.navFixed ? 'Took the navigation decision personally, which is the one nobody else can take.'
        : 'Navigation confidence was left degraded while you worked things others could have done.');

    add('The water', f.floodIsolated ? 20 : 5, 20,
      f.floodIsolated ? 'Flooding isolated and the compartment dewatered.' : 'The after bilge was still making water at the end.');

    add('The injured man', f.injuryTreated ? 10 : 0, 10,
      f.injuryTreated ? 'Treated by the corpsman.' : 'Never treated.');

    const hints = rt.hintsUsed || 0;
    const skipped = rt.skipped || 0;
    const penalty = Math.min(12, hints * 2 + skipped * 4);
    score -= penalty;
    parts.push({ label: 'Independence', got: -penalty, max: 0,
      why: [hints ? `${hints} hint${hints > 1 ? 's' : ''} taken` : null,
        skipped ? `${skipped} objective${skipped > 1 ? 's' : ''} skipped` : null].filter(Boolean).join('; ')
        || 'No hints taken, nothing skipped.' });

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
