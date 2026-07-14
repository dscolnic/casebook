// Logic-depth difficulty for the Diagnosis format.
// The whole panel is ALWAYS visible. Difficulty = how separable the correct
// answer is from its nearest rival — the "Sudoku technique depth" axis.
//
//   L1 naked single : rivals differ on LOUD readings → one glance decides
//   L2 one line     : exactly one loud reading decides
//   L3 chained/quiet: rivals TIE on every loud reading; only quiet readings +
//                     a second-order question separate them
//   L4 two faults   : no single cause fits at all → a compound explanation
//
// Run:  node diagnosis_logic_levels.js

const READINGS = ['pressure','level','coreTemp','sump','contRad','secRad','sgLevel'];
const SALIENT  = new Set(['pressure','level']);          // the "loud" readings you notice first

// predicted signature of each hypothesis over the readings
const SIG = {
  LOCA:       {pressure:'down', level:'down', coreTemp:'up',       sump:'rise', contRad:'up',     secRad:'normal', sgLevel:'normal'},
  SGTR:       {pressure:'down', level:'down', coreTemp:'up',       sump:'dry',  contRad:'normal', secRad:'up',     sgLevel:'normal'},
  heatSink:   {pressure:'up',   level:'ok',   coreTemp:'up',       sump:'dry',  contRad:'normal', secRad:'normal', sgLevel:'dry'},
  instrument: {pressure:'ok',   level:'down', coreTemp:'settling', sump:'dry',  contRad:'normal', secRad:'normal', sgLevel:'normal'},
  normal:     {pressure:'down', level:'ok',   coreTemp:'settling', sump:'dry',  contRad:'normal', secRad:'normal', sgLevel:'normal'},
};
const NAME = {LOCA:'Loss-of-coolant accident', SGTR:'Steam-generator tube rupture',
  heatSink:'Lost heat sink', instrument:'Instrument fault', normal:'Normal post-trip transient'};

// SAME true cause (a leak / LOCA) every time. We only change WHICH confuser is
// present — and each confuser mimics the leak more closely than the last.
const SCEN = [
  { lvl:1, confuser:'a lost heat sink — looks nothing like a leak',
    obs: SIG.LOCA, pool:['LOCA','heatSink'] },
  { lvl:2, confuser:'a normal post-trip shrink — quietly similar',
    obs: SIG.LOCA, pool:['LOCA','normal'] },
  { lvl:3, confuser:'a tube rupture — ALSO a leak, sharing every loud sign',
    obs: SIG.LOCA, pool:['LOCA','SGTR'] },
  { lvl:4, confuser:'the leak is real, but the sump sensor has ALSO failed (reads dry)',
    obs: {...SIG.LOCA, sump:'dry'}, pool:['LOCA','SGTR','normal','instrument'] },
];

const score = (h,obs) => {
  let m=0,t=0; for(const r in obs){ t++; if(SIG[h][r]===obs[r]) m++; } return {m,t};
};

function analyze(sc){
  const scored = sc.pool.map(h=>({h,...score(h,sc.obs)})).sort((a,b)=>b.m-a.m);
  const best=scored[0], rival=scored[1];
  const perfect = best.m===best.t;
  const diffs = Object.keys(sc.obs).filter(r=>SIG[best.h][r]!==SIG[rival.h][r]);
  const salient = diffs.filter(r=>SALIENT.has(r));
  const quiet   = diffs.filter(r=>!SALIENT.has(r));

  let level, why;
  if(!perfect){
    const miss = Object.keys(sc.obs).filter(r=>SIG[best.h][r]!==sc.obs[r]);
    // a mismatch is a likely SENSOR fault when another reading still corroborates the answer
    const corrob = Object.keys(sc.obs).filter(r=>!miss.includes(r) && !SALIENT.has(r) && SIG[best.h][r]===sc.obs[r] && SIG[rival.h][r]!==sc.obs[r]);
    level='L4  EXPERT — two faults at once';
    why=`No single cause fits: best is ${best.h} at ${best.m}/${best.t}. It fails only on [${miss.join(', ')}], `
      + `yet [${corrob.join(', ')||'other readings'}] still corroborate a real ${best.h}. `
      + `The lone contradiction is a SECOND fault — a failed ${miss.join('/')} sensor — layered on the leak.`;
  } else if(salient.length>=2){
    level='L1  EASY — naked single';
    why=`Loud readings alone split it: ${best.h} vs ${rival.h} disagree on ${salient.join(' & ')} (both salient). One glance decides.`;
  } else if(salient.length===1){
    level='L2  MEDIUM — one clear line';
    why=`Exactly one loud reading decides: they differ on ${salient[0]}. Everything else is shared, so you must find that reading.`;
  } else {
    level='L3  HARD — chained, on quiet readings';
    why=`The loud readings TIE — ${best.h} and ${rival.h} agree on ${[...SALIENT].join(' & ')} (both are leaks). `
      + `They separate ONLY on quiet readings [${quiet.join(', ')}], which forces a second-order question: `
      + `WHERE did the coolant go — into containment (sump/cont-rad) or the steam side (sec-rad)?`;
  }
  return {scored, best, rival, diffs, salient, level, why};
}

// ---- report ----
const pad=(s,n)=>String(s).padEnd(n);
for(const sc of SCEN){
  const a=analyze(sc);
  console.log('\n' + '━'.repeat(78));
  console.log(`LOGIC LEVEL ${sc.lvl}   confuser: ${sc.confuser}`);
  console.log('─'.repeat(78));
  console.log('observed : ' + READINGS.map(r=>`${r}=${sc.obs[r]}`).join('  '));
  console.log('candidates:');
  a.scored.forEach((c,i)=>console.log(`   ${pad(NAME[c.h],32)} ${c.m}/${c.t}${i===0?'  ← best fit':''}`));
  console.log(`answer   : ${NAME[a.best.h]}     nearest rival: ${NAME[a.rival.h]}`);
  console.log(`separates on: ${a.diffs.join(', ')}   (loud: ${a.salient.join(', ')||'— none —'})`);
  console.log('→ ' + a.level);
  console.log('  ' + a.why);
}
console.log('\n' + '━'.repeat(78));
console.log('KNOB: raise the level by making the nearest rival share more LOUD readings.');
console.log('  salient-separation 2 → 1 → 0 → (no single fit).  Same panel, deeper inference.');
