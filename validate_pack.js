// Validator for Diagnosis data packs. Structural gates + DERIVED difficulty.
// Usage:  node validate_pack.js dpack_reactor.js
// Exports { validate, difficulty } for the build.

const LEVELS = ['L1','L2','L3'];                 // expected level per round index
const LEVEL_NAME = {L1:'naked single', L2:'one clear line', L3:'the loud gauges tie', L4:'two faults'};

// Derive the logic level of a round purely from the signatures.
function difficulty(P, round){
  const hyps = P.hypotheses, cands = Object.keys(hyps), ans = round.answer;
  const obs = round.observed || hyps[ans].sig;                 // observed = the answer's signature
  const keys = Object.keys(P.readings);
  const perfect = cands.some(h => keys.every(r => hyps[h].sig[r] === obs[r]));
  if(!perfect) return { level:'L4', name:LEVEL_NAME.L4, loudConsistent:[], solo:false };
  // candidates consistent with the observed LOUD readings
  const loudConsistent = cands.filter(h => P.salient.every(r => hyps[h].sig[r] === obs[r]));
  // is there a single LOUD reading whose value only the answer has?
  const solo = P.salient.some(r => cands.every(h => h === ans || hyps[h].sig[r] !== obs[r]));
  const level = solo ? 'L1' : loudConsistent.length === 1 ? 'L2' : 'L3';
  return { level, name:LEVEL_NAME[level], loudConsistent, solo };
}

function validate(P){
  const e = [];
  const need = (c,m) => { if(!c) e.push(m); };
  need(P && P.id && P.title && P.domain && P.role, 'missing id/title/domain/role');
  need(P.system && Array.isArray(P.system.parts) && P.system.soWrong, 'missing system.parts / soWrong');
  need(P.schematic && P.schematic.svg && P.schematic.viewBox, 'missing schematic');
  need(P.reassuring && P.reassuring.lab && P.reassuring.val, 'missing reassuring pole');

  const readings = P.readings || {}, rk = Object.keys(readings);
  need(rk.length >= 4, 'need >= 4 readings');
  rk.forEach(r => need(readings[r].name && readings[r].purpose && readings[r].pin, 'reading '+r+' missing name/purpose/pin'));
  need(Array.isArray(P.salient) && P.salient.length >= 1, 'need >= 1 salient reading');
  (P.salient||[]).forEach(r => need(rk.includes(r), 'salient reading not in readings: '+r));

  const hyps = P.hypotheses || {}, hk = Object.keys(hyps);
  need(hk.length >= 3, 'need >= 3 hypotheses');
  hk.forEach(h => {
    need(hyps[h].label && hyps[h].call && hyps[h].call.title && hyps[h].call.arg, 'hypothesis '+h+' missing label/call');
    rk.forEach(r => need(hyps[h].sig && (r in hyps[h].sig), 'hypothesis '+h+' signature missing reading '+r));
  });
  need(P.dismissal && hyps[P.dismissal], 'dismissal must be a hypothesis');

  const rounds = P.rounds || [];
  need(rounds.length === 3, 'need exactly 3 rounds');
  const answers = rounds.map(r => r.answer);
  need(new Set(answers).size === 3, 'the 3 answers must be distinct');
  answers.forEach(a => need(a !== P.dismissal, 'the dismissal ('+P.dismissal+') must never be a round answer'));

  rounds.forEach((rd, i) => {
    const tag = 'round '+(i+1);
    need(hyps[rd.answer], tag+' answer not a hypothesis');
    need(readings[rd.alarm], tag+' alarm not a reading');
    need(rd.poleA && rd.poleA.val, tag+' missing poleA');
    need(rd.hook && rd.riddle, tag+' missing hook/riddle');
    rk.forEach(r => need(rd.vals && (r in rd.vals), tag+' vals missing reading '+r));
    hk.filter(h => h !== rd.answer).forEach(h => need(rd.reasons && rd.reasons[h], tag+' missing reason for '+h));
    const R = rd.resolve || {};
    need(R.title && Array.isArray(R.paras) && R.why && Array.isArray(R.chain) && R.take, tag+' resolve incomplete');
    // DERIVED difficulty must match the slot
    if(hyps[rd.answer]){
      const d = difficulty(P, rd);
      need(d.level === LEVELS[i], `${tag} logic level derives to ${d.level} (${d.name}) but slot expects ${LEVELS[i]}`);
    }
  });
  return { ok: e.length === 0, errors: e };
}

module.exports = { validate, difficulty, LEVEL_NAME };

// CLI
if(require.main === module){
  const path = require('path'), f = process.argv[2];
  if(!f){ console.log('usage: node validate_pack.js <dpack_file.js>'); process.exit(1); }
  const P = require(path.resolve(f)).PACK;
  const { ok, errors } = validate(P);
  console.log(`\n${P.id}  "${P.title}"  — ${ok ? 'OK' : 'FAIL'}`);
  P.rounds.forEach((rd,i)=>{ const d=difficulty(P,rd);
    console.log(`  round ${i+1}: answer=${rd.answer.padEnd(9)} → ${d.level} (${d.name})`); });
  if(!ok) errors.forEach(x => console.log('  ✗ '+x));
}
