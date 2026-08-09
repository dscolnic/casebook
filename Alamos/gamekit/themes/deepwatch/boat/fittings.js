// fittings.js — the boat's valves and its bilge depth.
//
// Lifted out of deep_watch/src/simulation/FloodingSystem.js, which did not come
// across: that file models water rising in real time, and this engine's loop is
// walk, answer, hand off. What the *world* needs from it is only this — the
// labelled valves it hangs on the bulkheads, and how deep a bilge is before it
// reads as flooded — so only this came.

/** How deep the bilge is, in centimetres, from deck plate to the bottom. */
export const BILGE_DEPTH_CM = 90;

export const VALVES = {
  fwd_sw_supply_inbd: {
    label: 'FWD SEAWATER SUPPLY — INBOARD',
    feeds: 'Forward seawater supply header (inboard side of the rupture).',
    dependents: ['Forward seawater service', 'Sonar-array cooling (via the supply header)'],
  },
  fwd_sw_supply_outbd: {
    label: 'FWD SEAWATER SUPPLY — OUTBOARD (HULL)',
    feeds: 'Sea connection for the forward seawater header.',
    dependents: ['Everything downstream of the forward sea suction'],
  },
  sonar_cooling_supply: {
    label: 'SONAR-ARRAY COOLING SUPPLY',
    feeds: 'Cooling water to the sonar-array electronics cabinets.',
    dependents: ['Sonar-array electronics cooling'],
  },
  trim_drain: {
    label: 'TRIM & DRAIN CROSS-OVER',
    feeds: 'Trim system / drain main.',
    dependents: ['Trim transfer'],
  },
  sw_crossconnect: {
    label: 'SEAWATER CROSS-CONNECT (AFT SUPPLY)',
    feeds: 'Cross-connects the aft seawater header forward — an alternate cooling path.',
    dependents: ['Sonar-array cooling from the aft header'],
  },
};