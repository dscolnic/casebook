/**
 * sourceMappings — the machine-readable record of how each RECKON source game is
 * translated into an in-world submarine system. Mirrors docs/game_to_submarine_mapping.md.
 * Later missions read `convertedSystem`/`convertedMission` to attribute content.
 */
export const SOURCE_MAPPINGS = [
  {
    sourceFile: '../../sequence.html',
    sourceId: 'nc_sonar_path',
    originalGameType: 'Sequence',
    reasoningSkill: 'causal / physical system tracing',
    convertedSystem: 'physical_system_tracing',
    convertedMission: 'contact_in_the_noise',
    convertedInteraction: 'walk and inspect the sonar processing chain',
  },
  {
    sourceFile: '../../ballpark.html',
    sourceId: 'nc_bp_depth',
    originalGameType: 'Ballpark',
    reasoningSkill: 'order-of-magnitude estimation',
    convertedSystem: 'operational_estimation',
    convertedMission: 'forward_flooding',
    convertedInteraction: 'DC plotting board: pump capacity vs flooding inflow, flooded mass vs trim',
  },
  {
    sourceFile: '../../protocol.html',
    sourceId: 'nc_fire_protocol',
    originalGameType: 'Protocol',
    reasoningSkill: 'constraint-based tool/procedure selection',
    convertedSystem: 'physical_procedures',
    convertedMission: 'electrical_fire',
    convertedInteraction: 'equipment-locker selection + ordered isolation/suppression',
  },
  {
    sourceFile: '../../navy_course_package/diagnosis/nc_flooding_playable.html',
    sourceId: 'nc_flooding_diag',          // runtime completion id is nc_flooding
    originalGameType: 'Diagnosis',
    reasoningSkill: 'use every gauge; eliminate inconsistent faults',
    convertedSystem: 'distributed_casualty_investigation',
    convertedMission: 'forward_flooding',
    convertedInteraction: 'evidence distributed across control/engineering/compartment + handheld',
  },
  {
    sourceFile: '../../casebook_static.html',
    sourceId: 'nc_greywake_case',
    originalGameType: 'Casebook',
    reasoningSkill: 'independent corroboration vs common-mode error',
    convertedSystem: 'source_dependency_analysis',
    convertedMission: 'position_without_a_trusted_fix',
    convertedInteraction: 'navigation source-dependency view (two displays, one inertial source)',
  },
  {
    sourceFile: '../../spectrum_stack.html',
    sourceId: 'nc_spectrum_1',
    originalGameType: 'Spectrum Stack',
    reasoningSkill: 'rapid modality selection',
    convertedSystem: 'equipment_selection',
    convertedMission: 'sonar_blinded_by_the_boat',
    convertedInteraction: 'carried-tool wheel / locker selection of the right instrument',
  },
  {
    sourceFile: '../../silent_watch_hunt_mvp.html',
    sourceId: 'nc_sonar_spy_1',
    originalGameType: 'Sonar Spy',
    reasoningSkill: 'detect, classify from incomplete signature, bearing history',
    convertedSystem: 'sonar_watch',
    convertedMission: 'contact_in_the_noise',
    convertedInteraction: 'sonar consoles: waterfall, narrowband tonals (freqMap), BTR, contact list',
  },
  {
    sourceFile: '../../dead_reckoning_three_chapter_course_edition.html',
    sourceId: 'nc_dr_1',
    originalGameType: 'Dead Reckoning',
    reasoningSkill: 'set & drift, imperfect fixes, precision vs accuracy',
    convertedSystem: 'navigation_table',
    convertedMission: 'position_without_a_trusted_fix',
    convertedInteraction: 'chart table: estimated track, uncertainty ellipse, independent fix',
  },
  {
    sourceFile: '../../strait_support_navy_course_relationship_v8.html',
    sourceId: 'nc_strait_1',
    originalGameType: 'Strait Support',
    reasoningSkill: 'overlapping coverage & network connectivity',
    convertedSystem: 'tactical_and_dc_network',
    convertedMission: 'silent_running_configuration',
    convertedInteraction: 'assign DC teams/pumps/monitors so dependencies hold',
  },
  {
    sourceFile: '../../battleship.html',
    sourceId: 'nc_sonar_spy_command',
    originalGameType: 'SensorShip / Battleship',
    reasoningSkill: 'hidden information; active-vs-passive sensing; exposure vs information',
    convertedSystem: 'command_episode',
    convertedMission: 'command_episode_silent_passage',
    convertedInteraction: 'control-room passive sensing under exposure cost (EMCON, self-noise)',
  },
  {
    sourceFile: '../../sciencetank.html',
    sourceId: 'nc_naval_innovation',
    originalGameType: 'Science Tank',
    reasoningSkill: 'judgment under uncertainty; return vs cost',
    convertedSystem: 'refit_decisions',
    convertedMission: 'refit_decision',
    convertedInteraction: 'wardroom upgrade selection with cost / install time / uncertain benefit',
  },
];

export function mappingsForSystem(system) {
  return SOURCE_MAPPINGS.filter((m) => m.convertedSystem === system);
}
