// keystones.mjs — the campaign's concept spine, and whether it actually recurs.
//
//   node tools/keystones.mjs
//
// The master brief (§3.2, §3.3, §3.5) asks for a small set of KEYSTONE concepts
// that recur three to five times in DIFFERENT ROLES, and for a matrix proving it.
// A campaign whose sixty stops carry sixty distinct concept labels cannot answer
// that question at all — nothing recurs by name even where the same idea is being
// used for the fourth time.
//
// So this maps the sixty authored labels onto the keystones they are instances of,
// and prints the matrix. It is a reading of the existing blueprint, not a rewrite
// of it: every stop keeps its mission, its format and its story role.
import { readFileSync } from 'node:fs';

/**
 * Keystone -> the authored labels that are instances of it.
 *
 * Grouped by what the player is actually DOING, not by AP unit heading. "Follow
 * the amount" covers every stop where a measured quantity is turned into moles,
 * particles or a ratio — which is the campaign's real backbone and is why it is
 * the one keystone that already recurs on its own.
 */
const KEYSTONES = {
  'Follow the amount': [
    'grams-moles-particles', 'dimensional analysis', 'atom conservation',
    'stoichiometric workflow', 'theoretical yield', 'full atom ledger',
    'coupled stoichiometry', 'whole-system inventory', 'ICE stoichiometry',
  ],
  'What runs out first': [
    'limiting reactant', 'limiting reactant under constraints',
    'electrochemistry under constraints', 'integrated constraints',
    'resource strategy',
  ],
  'Gases carry the evidence': [
    'kinetic molecular theory', 'ideal gas law', 'Dalton\'s law and composition',
    'combined gas law/model testing',
  ],
  'Structure sets behaviour': [
    'particles', 'Lewis structures', 'structure-property chain', 'VSEPR and IMF',
    'IMF/property behavior',
  ],
  'Concentration is not amount': [
    'concentration versus amount', 'molarity', 'Beer-Lambert/spectroscopy',
    'solutions/solubility', 'strong acid/base stoichiometry and pH',
  ],
  'Energy has to go somewhere': [
    'exothermic/endothermic', 'calorimetry', 'heating curves', 'energy conservation',
  ],
  'Rate is not yield': [
    'experimental rate laws', 'rate constant/units', 'temperature and rate',
    'catalysis', 'mechanisms/intermediates/RDS', 'kinetics vs equilibrium',
    'catalyst poisoning vs operating limits',
  ],
  'Equilibrium settles it': [
    'equilibrium expressions', 'Le Châtelier/Q vs K',
  ],
  'Electrons do work': [
    'redox', 'half-reactions and circuit', 'Faraday\'s law',
  ],
  'Evidence has to be independent': [
    'evidence dependency', 'multi-evidence diagnosis', 'uncertainty/robustness',
    'clue reinterpretation', 'verification/chain of custody', 'model validation',
    'residual structure', 'uncertainty and safety margin', 'evidence synthesis',
    'evidence independence', 'model generalization', 'spatial diagnosis',
    'integrated composition diagnosis', 'precommitted thresholds',
    'value of information', 'whole-campaign synthesis',
  ],
};

const stops = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const of = new Map();
for(const [k, labels] of Object.entries(KEYSTONES)) for(const l of labels) of.set(l, k);

const unmapped = stops.filter(s => !of.has(s.concept));
const byKey = new Map(Object.keys(KEYSTONES).map(k => [k, []]));
for(const s of stops){
  const k = of.get(s.concept);
  if(k) byKey.get(k).push(s);
}

console.log(`${stops.length} stops, ${Object.keys(KEYSTONES).length} keystones,`
  + ` ${unmapped.length} unmapped`);
if(unmapped.length){
  for(const s of unmapped) console.log(`  unmapped  M${s.m} S${s.n}  ${s.concept}`);
}

const ROLES = ['INTRODUCE', 'PRACTICE', 'RETRIEVE', 'COMBINE', 'APPLY', 'TRANSFER'];
console.log('\n| Keystone | stops | missions | ' + ROLES.join(' | ') + ' | gap |');
console.log('|---|---:|---|' + ROLES.map(() => '---|').join('') + '---|');
for(const [k, list] of byKey){
  const ms = [...new Set(list.map(s => s.m))].sort((a, b) => a - b);
  const cells = ROLES.map(r => list.filter(s => s.role === r).map(s => `M${s.m}`).join(' ') || '—');
  // THE GAP THE BRIEF ASKS ABOUT: does it come back after a delay, in a role
  // that is not another introduction?
  const spread = ms.length > 1 ? Math.max(...ms) - Math.min(...ms) : 0;
  const returns = list.some(s => ['RETRIEVE', 'COMBINE', 'TRANSFER'].includes(s.role));
  const gap = !returns ? 'never returns'
    : spread < 4 ? `one block (M${Math.min(...ms)}–M${Math.max(...ms)})`
    : 'ok';
  console.log(`| ${k} | ${list.length} | ${ms.map(m => 'M' + m).join(' ')} | `
    + cells.join(' | ') + ` | ${gap} |`);
}
