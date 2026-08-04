/**
 * Mission 1 — Boat Walkdown (Unit I: Qualify on the Boat).
 *
 * A minimal, non-casualty mission whose only job in this foundation build is to
 * prove the core traversal/interaction loop: walk the boat bow-to-stern, learn
 * compartment locations, open damage-control lockers, man a station, and deliver
 * a message back to Control with NO waypoint on the return leg (spatial memory).
 *
 * Primary source mechanics: Sequence (physical order of a walkdown), equipment
 * selection (lockers), spatial memory. Casualty content is intentionally absent.
 */
export const mission01Walkdown = {
  id: 'mission_01_walkdown',
  title: 'Boat Walkdown',
  unit: 1,
  startLocation: 'control_room',
  sourceGames: ['Sequence'],
  learningObjectives: [
    'Locate control, sonar, engineering, and the forward/aft escape routes.',
    'Find and open damage-control lockers.',
    'Man a machinery station and read a cooling loop.',
    'Navigate back to Control from memory, without a waypoint.',
  ],

  onStart(rt) {
    rt.toast('Qualification', 'Learn the boat. Follow each objective; the compartment name is shown top-right. Operate hatches (E on the red wheel) to pass between compartments.');
  },

  stages: [
    {
      id: 'report_control',
      target: { compartment: 'control_room' },
      label: 'Control Room',
      objective: 'Report to the Control Room. Find the helm, the command plot, and the navigation table.',
      arm: (rt) => rt.onEnter('control_room', 'Control Room located — helm, command plot, and nav table are here.')(rt),
    },
    {
      id: 'find_sonar',
      target: { compartment: 'sonar_room' },
      label: 'Sonar Room',
      objective: 'Walk forward and locate the Sonar Room (broadband, narrowband, and bearing-time consoles).',
      arm: (rt) => rt.onEnter('sonar_room', 'Sonar Room located — three watch consoles and the own-ship noise reference.')(rt),
    },
    {
      id: 'find_forward',
      target: { compartment: 'forward_equipment' },
      label: 'Forward Escape Route',
      objective: 'Continue forward to Forward Equipment & Handling. Note the escape trunk (an escape route) and the DC lockers.',
      arm: (rt) => rt.onEnter('forward_equipment', 'Forward escape trunk noted — remember this route.')(rt),
    },
    {
      id: 'open_lockers',
      target: { interactable: 'locker_forward', compartment: 'forward_equipment' },
      label: 'Damage-Control Lockers',
      objective: 'Open two damage-control lockers (look for the red lockers; press E). They hold the tools you will need later.',
      arm: (rt) => rt.onInteractCount('locker', 2, 'Two DC lockers checked — you know where the gear lives.')(rt),
    },
    {
      id: 'reach_machinery',
      target: { compartment: 'machinery_control' },
      label: 'Machinery Control',
      objective: 'Walk aft, through the boat, to the Machinery Control Room.',
      arm: (rt) => rt.onEnter('machinery_control', 'Machinery Control located.')(rt),
    },
    {
      id: 'trace_cooling',
      target: { interactable: 'engineering', compartment: 'machinery_control' },
      label: 'Cooling Loop',
      objective: 'Man the Machinery Control station and read the cooling-loop indications (temperature and flow).',
      arm: (rt) => rt.onEvent('station:opened', 'Cooling loops read — primary and secondary temperatures and flows noted.',
        (p) => p.stationId === 'engineering')(rt),
    },
    {
      id: 'reach_aux',
      target: { compartment: 'auxiliary' },
      label: 'Aft Escape Route',
      objective: 'Continue aft to Auxiliary Machinery & Bilge — the second escape route and the lower bilge access.',
      arm: (rt) => rt.onEnter('auxiliary', 'Aft bilge access and escape route noted. You have walked the boat end to end.')(rt),
    },
    {
      id: 'deliver_message',
      target: { compartment: 'control_room' },
      label: 'Deliver the Message',
      objective: 'Deliver word back to Control — from memory. No waypoint this time: retrace your route forward to the Control Room.',
      arm: (rt) => rt.onEnter('control_room', 'Message delivered. Boat walkdown complete — you are qualified to stand a watch.')(rt),
    },
  ],

  scoring: (rt) => 100,
};
