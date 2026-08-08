import { WEEKS, STARTING_RESERVE } from './constants.js';
import { LEADERS } from './leaders.js';
import { GROUP_DEFS } from './divisions.js';
import { CURRICULUM } from './curriculum.js';
import { MISSION_DEFS } from './missions.js';
import { clamp, seeded } from './utils.js';

export function leader(id){ return LEADERS.find(x=>x.id===id); }
export function def(id){ return GROUP_DEFS.find(x=>x.id===id); }
export function currentMilestone(gs){
  const d=def(gs.id);
  return d.milestones[gs.milestone] || null;
}
// Mission helpers — mirror project_y_15_missions_v21.html
export function currentMissionForWeek(week){
  return MISSION_DEFS[Math.max(0,Math.min(MISSION_DEFS.length-1,(week||1)-1))];
}
export function getCurrentMission(state){
  if(!state) return null;
  return currentMissionForWeek(state.week);
}
export function completedMissionStops(state){
  return Array.isArray(state?.missionStopsCompleted)?state.missionStopsCompleted:[];
}
export function missionStopIndex(state, id){
  const m=getCurrentMission(state);
  if(!m) return -1;
  return m.stops.findIndex(s=>s.group===id);
}
export function nextMissionStopIndex(state){
  const m=getCurrentMission(state);
  if(!m) return -1;
  const done=completedMissionStops(state);
  return m.stops.findIndex((_,i)=>!done.includes(i));
}
export function missionComplete(state){
  const m=getCurrentMission(state);
  if(!m) return false;
  const baseDone = completedMissionStops(state).length>=m.stops.length;
  if(!baseDone) return false;
  if(hasSpecialRequest(state.week)){
    const completedSpecial = Array.isArray(state.specialRequestsCompleted) ? state.specialRequestsCompleted.includes(state.week) : false;
    if(!completedSpecial) return false;
  }
  return true;
}
export function missionStopDone(state, index){
  return completedMissionStops(state).includes(index);
}
export function missionStopForGroup(state, id){
  const idx=missionStopIndex(state, id);
  if(idx<0) return null;
  const m=getCurrentMission(state);
  return {...m.stops[idx], index: idx};
}
export function latestLessonIndex(state, id){
  for(let m=Math.min((state?.week||1)-1,MISSION_DEFS.length-1);m>=0;m--){
    const stop=MISSION_DEFS[m].stops.find(x=>x.group===id);
    if(stop) return stop.lesson;
  }
  return 0;
}
export function curriculumFor(state, gs){
  const stop=missionStopForGroup(state, gs.id);
  const idx=stop?stop.lesson:latestLessonIndex(state, gs.id);
  return CURRICULUM[gs.id][clamp(idx,0,CURRICULUM[gs.id].length-1)];
}
export function challengeFor(state, gs){
  const lesson=curriculumFor(state, gs);
  return lesson.game;
}
export function globalStopIndex(state, stopIdx){
  let total=0;
  for(let i=0;i<(state.week||1)-1;i++) total+=MISSION_DEFS[i].stops.length;
  return total + (stopIdx ?? nextMissionStopIndex(state));
}
export function isPersonStop(state){
  const idx=nextMissionStopIndex(state);
  if(idx<0) return false;
  return globalStopIndex(state, idx) % 3 === 1;
}
export function isPersonStopForIdx(state, idx){
  if(idx<0) return false;
  return globalStopIndex(state, idx) % 3 === 1;
}
export const CHARACTER_DIVISION={
  patel:'TRI', reyes:'RESP', chen:'NUTR', garcia:'MOVE', kim:'BRAIN', okafor:'DEF',
  // keep legacy for fallback
  oppenheimer:'TRI', bethe:'TRI', vonneumann:'TRI', ulm:'TRI', meitner:'TRI', mayer:'TRI', fuchs:'TRI', hall:'TRI', szilard:'TRI',
  fermi:'RESP', bacher:'RESP', woods:'RESP', wu:'RESP', hinton:'RESP', graves:'RESP', lawrence:'RESP', chadwick:'RESP',
  seaborg:'NUTR', hornig:'NUTR', kitty:'NUTR', chen_legacy:'NUTR',
  groves:'MOVE', parsons:'MOVE', bradbury:'MOVE', mckibbin:'MOVE', garcia_legacy:'MOVE',
  kistiakowsky:'BRAIN', greenglass:'BRAIN', kim_legacy:'BRAIN',
  okafor_legacy:'DEF'
};
export function divisionForCharacter(charId){ return CHARACTER_DIVISION[charId] || 'TRI'; }
export const PERSONS_BY_DIVISION={
  TRI: ['patel'],
  RESP: ['reyes'],
  NUTR: ['chen'],
  MOVE: ['garcia'],
  BRAIN: ['kim'],
  DEF: ['okafor']
};
export function getPersonIdForStop(state, stopIdx){
  const m=getCurrentMission(state);
  if(!m || stopIdx<0 || stopIdx>=m.stops.length) return null;
  const stop=m.stops[stopIdx];
  const list=PERSONS_BY_DIVISION[stop.group] || [];
  if(!list.length) return null;
  const gi=globalStopIndex(state, stopIdx);
  return list[gi % list.length];
}
// Fourth person meeting every few missions — funding/assistance request with 2-paragraph justification (science / culture / life / health)
export const SPECIAL_REQUESTS={
  3: { personId:'reyes', cost:2, title:'Criticality safety interlocks for the chemistry wing', division:'NUTR',
    paragraphs:[
      'Joan Hinton, who works on critical assembly diagnostics, has flagged that the chemistry wing where plutonium solutions are handled still relies on a single administrative limit for mass and geometry. One mislabeled beaker or an extra transfer could bring fissile material close to a critical configuration. A $2 interlock — a second independent mass accounting check plus a neutron counter at the doorway — would give a layered safety case instead of trusting one person’s arithmetic.',
      'This is not just a science question. The technicians are mostly young women on 12-hour shifts, sharing thin-walled hutments, and a criticality accident would be a health and community catastrophe before it ever affected the weapon program. Hinton argues that spending now preserves both accurate chemistry yields and the lives of the people who live two blocks from the lab. As director you can approve the $2 from the $20 reserve, or defer and accept 12–24h of added risk while the lab operates on a single barrier.'
    ]},
  6: { personId:'chen', cost:3, title:'Ventilation upgrade for plutonium metallurgy', division:'NUTR',
    paragraphs:[
      'Donald Hornig’s metallurgy group is pressing plutonium ingots in a lab where the ventilation hoods were sized for uranium. Plutonium dust is alpha-active: a few micrograms lodged in a lung delivers a lifetime dose, and the hoods now run at only 60% of the face velocity needed. Hornig needs $3 for a filtered exhaust upgrade and daily nose-count swipes. The science is clear — without it, solubility measurements will drift as surface oxide builds, and the yield verification you need for Mission 5 will be unreliable.',
      'The human cost is visible around town: families share laundry where dust can travel home, the school is 400 meters downwind, and the infirmary has only 12 beds for a mesa that will soon hold 6,000 people. Hornig frames the request as both measurement fidelity and public health. Funding it keeps the phase-diagram work honest; deferring it saves $3 now but adds 12–24h while the group reworks contaminated samples and the town absorbs avoidable exposure.'
    ]},
  9: { personId:'garcia', cost:2, title:'Housing Office support for arriving families', division:'MOVE',
    paragraphs:[
      'Dorothy McKibbin, who runs the gate at 109 East Palace in Santa Fe and assigns every hutment on the Hill, reports that 40 families arriving for the implosion push are bunked in unheated Pacific huts with a single pot-belly stove. Children are studying by coal light, and the community school — staffed by scientists’ wives — has doubled to 150 pupils without extra benches or paper. A $2 allocation would finish Sundt duplex partitions, add a coal delivery, and buy school supplies.',
      'From a program view this looks like “town” rather than “physics,” but McKibbin notes the link: engineers who spent the night shoveling ash or nursing a sick child make timing errors on lens molds the next day. Fuller Lodge evening lectures and Saturday dances at the theater are not luxuries; they are the retention system for a town that cannot be resupplied quickly at 7,300 feet. Approving keeps the technical workforce functional; deferring risks 12–24h of absenteeism and rework.'
    ]},
  12: { personId:'kim', cost:3, title:'Theater and PX film for morale and timing calibration', division:'BRAIN',
    paragraphs:[
      'Norris Bradbury, who will soon oversee assembly, requests $3 to keep Theater No. 2 running three nights a week and to buy high-speed film for the P-Division imaging group that shares the same projection budget. The cultural argument and the science argument coincide. The theater is the only building where the entire mesa can hear the same colloquium — Bethe on implosion was given there in February — and where mixed crews discuss misalignments without rank. Without it, X-Division lens crews and E-Division ordnance drift into separate vocabularies.',
      'For health, the same film stock is also used to radiograph inert lens assemblies; without a steady supply, crews will test with fewer views and miss asymmetry that later shows up as jetting. At 2,200 m, with censored mail and no road out without a pass, morale directly governs precision. Funding both uses of the film sustains the shared language you built in Mission 1; deferring saves $3 but adds 12–24h as teams re-establish common timing baselines.'
    ]},
  15: { personId:'okafor', cost:2, title:'Post-Trinity health follow-up and community support', division:'NUTR',
    paragraphs:[
      'Kitty Oppenheimer, in her role coordinating housing and infirmary liaison, asks for $2 to expand the infirmary’s post-shot capacity: iodine tablets, additional nose counts, and a visiting nurse for the canyon trailers where dust settled after the test. The immediate fission yield may be known, but the delayed health picture is not. Fallout is not yet understood by the community, and families are already asking whether the pond water is safe.',
      'Even if the technical chain is complete, the town’s trust is part of the evidence chain. A complete dossier must include what was promised about return to the mesa, how samples will be tracked, and what families are told about life downwind. This is the cultural and ethical counterpart to the technical freeze you will impose in Mission 15. Approving acknowledges that responsibility persists after a device is complete; deferring saves $2 now but incurs 12–24h while rumors and incomplete records compound.'
    ]},
};
export function hasSpecialRequest(week){ return !!SPECIAL_REQUESTS[week]; }
export function getSpecialRequest(week){ return SPECIAL_REQUESTS[week] || null; }
export function isSpecialRequestActive(state){
  if(!state) return false;
  const week=state.week;
  if(!hasSpecialRequest(week)) return false;
  const m=getCurrentMission(state);
  if(!m) return false;
  const done=completedMissionStops(state).length >= m.stops.length;
  const completedSpecial = Array.isArray(state.specialRequestsCompleted) ? state.specialRequestsCompleted.includes(week) : false;
  return done && !completedSpecial;
}
export function isSpecialRequestPending(state){
  return isSpecialRequestActive(state);
}
export function getNextStop(state){
  const m=getCurrentMission(state);
  if(!m) return null;
  const idx=nextMissionStopIndex(state);
  if(idx<0) return null;
  return {...m.stops[idx], isPerson: isPersonStop(state)};
}
export function isMissionComplete(state, idx){
  const m=MISSION_DEFS[idx];
  if(!m) return false;
  // legacy compat: if week > idx+1 then complete
  if((state.week||1) > idx+1) return true;
  if(idx !== (state.week||1)-1) return false;
  return missionComplete(state);
}
export function readiness(state){
  if(!state||!state.groups) return 0;
  let total=0;
  state.groups.forEach(gs=>{
    const d=def(gs.id);
    if(gs.milestone>=d.milestones.length){ total+=1; return; }
    const m=d.milestones[gs.milestone];
    const part=(clamp(gs.funded/m.cost,0,1)+clamp(gs.workDone/m.work,0,1))/2;
    total+=(gs.milestone+part)/d.milestones.length;
  });
  return 100*total/state.groups.length;
}
export function issueProbability(gs){
  const l=leader(gs.leaderId),d=def(gs.id);
  return clamp(0.03+0.025*d.difficulty+0.01*gs.milestone-0.018*l.science,0.025,0.24);
}
export function issueRisk(gs){
  const p=issueProbability(gs);
  return p<.09?'Low':p<.15?'Moderate':'High';
}
export function groupPct(gs){
  const d=def(gs.id);
  if(gs.milestone>=d.milestones.length) return 100;
  const m=d.milestones[gs.milestone];
  const part=(clamp(gs.funded/m.cost,0,1)+clamp(gs.workDone/m.work,0,1))/2;
  return 100*(gs.milestone+part)/d.milestones.length;
}
export function fundingMultiplier(gs){ return 0.82+0.08*leader(gs.leaderId).management; }
export function baseWork(gs){
  const l=leader(gs.leaderId),d=def(gs.id);
  return 0.35+0.22*l.science+0.10*l.management-0.12*d.difficulty+0.05*gs.milestone;
}
export function totalProjectBudget(state){
  return state.groups.reduce((s,gs)=>s+(gs.budgetRemaining||0),0);
}
export function plannedWeeklySpend(gs, week){
  const m=currentMilestone(gs);
  if(!m) return 0;
  const l=leader(gs.leaderId),d=def(gs.id),durations=[3,3,4,5],stageEnds=[3,6,10,15];
  const base=m.cost/durations[Math.min(gs.milestone,3)];
  const managementFactor=Math.max(0.72,1.20-0.06*l.management);
  const issueFactor=gs.issue?1.12:1;
  const overrunFactor=week>stageEnds[Math.min(gs.milestone,3)]?1.16:1;
  const variation=0.96+0.08*seeded(week*151+GROUP_DEFS.indexOf(d)*31+gs.milestone*7);
  return Math.max(0.8,base*managementFactor*issueFactor*overrunFactor*variation);
}
export function completeMilestoneIfReady(state, gs, week){
  const d=def(gs.id),m=currentMilestone(gs);
  if(!m) return false;
  if(gs.funded+1e-6 < m.cost || gs.workDone+1e-6 < m.work) return false;
  state.log.push({week, text:`${d.code} Division completed "${m.name}."`});
  if(state.log.length>100) state.log=state.log.slice(-100);
  gs.milestoneLog.push({week, name:m.name});
  gs.milestone++; gs.funded=0; gs.workDone=0; gs.issue=null; gs.issueSince=null;
  return true;
}
export function addLog(state, text, week){
  state.log.push({week: week ?? state.week, text});
  if(state.log.length>100) state.log=state.log.slice(-100);
}
export function forecastReadiness(state){
  const clone = JSON.parse(JSON.stringify(state));
  for(let w=clone.week; w<=WEEKS; w++){
    clone.groups.forEach((gs,idx)=>{
      const m=currentMilestone(gs);
      if(!m) return;
      const fundingRatio=clamp(gs.funded/m.cost,0,1);
      const xiW=0.92+0.16*seeded(w*137+idx*29+2);
      let work=2.0*baseWork(gs)*(0.25+0.75*fundingRatio)*xiW;
      if(gs.issue) work*=0.62;
      gs.workDone+=Math.max(0.30, work);
      const d=def(gs.id);
      const cur=d.milestones[gs.milestone];
      if(cur && gs.funded+1e-6>=cur.cost && gs.workDone+1e-6>=cur.work){
        gs.milestoneLog.push({week:w, name:cur.name});
        gs.milestone++; gs.funded=0; gs.workDone=0; gs.issue=null; gs.issueSince=null;
      }
    });
  }
  const perGroup = clone.groups.map(gs=>({id:gs.id, pct: Math.min(100, groupPct(gs))}));
  const overall = readiness(clone);
  return { perGroup, overall, clone };
}
export function forecastMoney(state){
  const clone = JSON.parse(JSON.stringify(state));
  let director = clone.reserve;
  for(let w=clone.week+1; w<=WEEKS; w++) director += 5;
  return { director, perGroup: clone.groups.map(gs=>({id:gs.id, remaining: gs.budgetRemaining||0})) };
}
export function freshState(assign){
  // Start every division at 0% readiness — no head start
  const groups=GROUP_DEFS.map((d)=>{
    return {id:d.id,leaderId:assign[d.id],milestone:0,funded:0,workDone:0,issue:null,issueSince:null,budgetStart:d.budget,budgetRemaining:d.budget,topUpTotal:0,budgetExhaustedLogged:false,spentHistory:Array(WEEKS).fill(0),milestoneLog:[],startingReadiness:0};
  });
  return {version:21,status:'playing',week:1,selectedGroup:null,reserve:STARTING_RESERVE,missionStopsCompleted:[],missionResults:{},visitOutcome:null,visitBonus:{},hints:{},retries:{},groups,specialRequestsCompleted:[],log:[{week:1,text:'Mission 1 opened: Read the atomic world. Complete the required building stops in order.'}]};
}
