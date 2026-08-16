import { WEEKS, WEEKLY_APPROPRIATION } from './constants.js';
import { def, currentMilestone, completeMilestoneIfReady, readiness, baseWork, leader, getCurrentMission, getNextStop, missionStopDone, nextMissionStopIndex, completedMissionStops, missionComplete, missionStopForGroup, plannedWeeklySpend } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { saveState, loadState } from './save.js';
import { clamp, seeded } from './utils.js';
import { freshState } from './simulation.js';
import { TOTAL_DAYS, TOTAL_HOURS, START_HOUR, VISIT_COST_HOURS, WALK_BASE_HOURS, AVG_WALK_DISTANCE, HOURS_PER_WEEK, timeToWeek, timeToDay, formatTime, walkCostForDistance } from './time.js';

let _state = null;

export function getState(){ return _state; }
export function setState(s){ _state=s; }

export function save(){ if(_state) saveState(_state); }
export function load(){ const s=loadState(); _state=s; return s; }

export function createFresh(assign){
  _state = freshState(assign);
  _state.timeHours = START_HOUR;
  _state.week = 1;
  _state.lastWeekProcessed = _state.week;
  _state.totalWalks = 0;
  save();
  return _state;
}

export function tryLoadSaved(){
  const s=loadState();
  if(s && s.status==='playing'){ _state=s; ensureMissionFields(); return s; }
  return null;
}
function ensureMissionFields(){
  if(!_state) return;
  if(!Array.isArray(_state.missionStopsCompleted)) _state.missionStopsCompleted=[];
  if(!_state.missionResults) _state.missionResults={};
  if(!_state.hints) _state.hints={};
  if(!_state.retries) _state.retries={};
  if(!Array.isArray(_state.specialRequestsCompleted)) _state.specialRequestsCompleted=[];
}
export function completeSpecialRequest(week){
  if(!_state) return;
  if(!Array.isArray(_state.specialRequestsCompleted)) _state.specialRequestsCompleted=[];
  if(!_state.specialRequestsCompleted.includes(week)){
    _state.specialRequestsCompleted.push(week);
    _state.specialRequestsCompleted.sort((a,b)=>a-b);
    save();
  }
}

export function addReadinessPoints(groupId, points){
  if(!_state || _state.status!=='playing') return false;
  const gs=_state.groups.find(g=>g.id===groupId);
  if(!gs) return false;
  const m=currentMilestone(gs);
  if(!m) return false;
  const before = (gs.milestone + (clamp(gs.funded/m.cost,0,1)+clamp(gs.workDone/m.work,0,1))/2)/def(gs.id).milestones.length *100;
  const target = Math.min(100, before + points);
  const d=def(gs.id);
  const totalPct = target/100 * d.milestones.length;
  const newMilestone = Math.floor(totalPct);
  const frac = totalPct - newMilestone;
  if(newMilestone > gs.milestone){
    for(let i=gs.milestone; i<newMilestone && i<d.milestones.length; i++){
      gs.milestoneLog.push({week:_state.week, name:d.milestones[i].name});
    }
    gs.milestone = Math.min(newMilestone, d.milestones.length);
    if(gs.milestone < d.milestones.length){
      const cur=d.milestones[gs.milestone];
      gs.funded = cur.cost * frac;
      gs.workDone = cur.work * frac;
    } else {
      gs.funded=0; gs.workDone=0;
    }
    gs.issue=null; gs.issueSince=null;
  } else {
    const cur=d.milestones[gs.milestone];
    if(cur){
      gs.funded = cur.cost * frac;
      gs.workDone = cur.work * frac;
    }
  }
  save();
  return true;
}

export function spendReserve(amount){
  if(!_state) return false;
  if(_state.reserve < amount) return false;
  _state.reserve -= amount;
  save();
  return true;
}

export function fundSelected(amount){
  if(!_state || !_state.selectedGroup) return false;
  if(_state.reserve < 1) return false;
  const gs=_state.groups.find(g=>g.id===_state.selectedGroup);
  if(!gs) return false;
  const m=currentMilestone(gs);
  if(!m) return false;
  const beforePct = (gs.milestone + (clamp(gs.funded/m.cost,0,1)+clamp(gs.workDone/m.work,0,1))/2)/def(gs.id).milestones.length*100;
  const capAt100 = Math.min(amount, 100 - beforePct);
  if(capAt100<=0) return false;
  if(_state.reserve < capAt100) return false;
  _state.reserve -= capAt100;
  addReadinessPoints(gs.id, capAt100);
  gs.topUpTotal = (gs.topUpTotal||0)+capAt100;
  _state.log.push({week:_state.week, text:`Director funds added ${capAt100}% readiness to ${def(gs.id).code} Division.`});
  if(_state.log.length>100) _state.log=_state.log.slice(-100);
  save();
  return true;
}

export function fundAllSelected(){
  if(!_state || !_state.selectedGroup) return false;
  const gs=_state.groups.find(g=>g.id===_state.selectedGroup);
  if(!gs) return false;
  const m=currentMilestone(gs);
  if(!m) return false;
  const beforePct = (gs.milestone + (clamp(gs.funded/ m.cost,0,1)+clamp(gs.workDone/m.work,0,1))/2)/def(gs.id).milestones.length*100;
  const needed = Math.ceil(100 - beforePct);
  const amount = Math.min(_state.reserve, needed);
  if(amount<=0) return false;
  return fundSelected(amount);
}

export function advanceTime(hours, reason=''){
  if(!_state || _state.status!=='playing') return;
  _state.timeHours = Math.min(TOTAL_HOURS, _state.timeHours + hours);
  // week is mission index, not time-derived in missions mode; keep time for day/night but don't auto-advance week via time
  if(reason) _state.log.push({week:_state.week, text:`${reason} — ${formatTime(_state.timeHours)} (${hours>0?'+'+hours.toFixed(1)+'h':''})`});
  if(_state.log.length>100) _state.log=_state.log.slice(-100);
  if(_state.timeHours>=TOTAL_HOURS){
    // time out but missions may still be incomplete — mark lost if not won
    if(_state.status==='playing' && _state.week < WEEKS){
      _state.status='lost'; _state.finishedHours=_state.timeHours; save(); return 'lost';
    }
  }
  save();
  return 'time';
}

export function visitBuildingCost(){
  return advanceTime(VISIT_COST_HOURS, 'Visit');
}
export function walkCost(dist){
  const h=walkCostForDistance(dist);
  _state.totalWalks = (_state.totalWalks||0)+1;
  return advanceTime(h, `Walked ${dist.toFixed(0)}m`);
}

export function advanceWeek(){
  return completeMission();
}

export function completeMission(){
  if(!_state || _state.status!=='playing') return 'blocked';
  if(!missionComplete(_state)) return 'blocked';
  const mission=getCurrentMission(_state);
  const missionNumber=_state.week;
  // spend/budget/work like in original endDay
  _state.groups.forEach((gs,idx)=>{
    const d=def(gs.id),m=currentMilestone(gs);
    if(!m) return;
    const l=leader(gs.leaderId);
    const planned=plannedWeeklySpend(gs, missionNumber);
    // use budgetRemaining if available
    const spend=Math.min(gs.budgetRemaining!=null?gs.budgetRemaining:9999, planned);
    if(gs.budgetRemaining!=null){
      gs.budgetRemaining=Math.max(0,gs.budgetRemaining-spend);
      gs.spentHistory[missionNumber-1]=spend;
    }
    const effectiveFunds=spend*(0.92+0.06*l.management);
    gs.funded+=effectiveFunds;
    const fundingRatio=clamp(gs.funded/m.cost,0,1),xiW=0.92+0.16*seeded(missionNumber*137+idx*29+2);
    let work=2.0*baseWork(gs)*(0.25+0.75*fundingRatio)*xiW;
    if(gs.issue) work*=0.62;
    if(spend<=0 && gs.funded<m.cost) work*=0.28;
    gs.workDone+=Math.max(0.30, work);
    completeMilestoneIfReady(_state, gs, missionNumber);
    if(gs.budgetRemaining!=null && gs.budgetRemaining<=0 && !gs.budgetExhaustedLogged && currentMilestone(gs)){
      gs.budgetExhaustedLogged=true;
      _state.log.push({week:missionNumber, text:`${d.code} Division exhausted its project budget. Director funding can still add readiness.`});
    }
  });
  _state.groups.forEach((gs,idx)=>{
    if(gs.issue || !currentMilestone(gs)) return;
    const d=def(gs.id);
    const p = (()=>{ const l=leader(gs.leaderId); return clamp(0.03+0.025*d.difficulty+0.01*gs.milestone-0.018*l.science,0.025,0.24);})();
    const r=seeded(missionNumber*97+idx*29+gs.milestone*11);
    if(r<p){
      gs.issue=d.issuePool[Math.floor(seeded(missionNumber*43+idx*13)*d.issuePool.length)];
      gs.issueSince=missionNumber;
      _state.log.push({week:missionNumber, text:`${d.code} Division opened an issue: ${gs.issue}`});
    }
  });
  _state.log.push({week:missionNumber, text:`Mission ${missionNumber} completed: ${mission.title}. ${mission.takeaway}`});
  if(missionNumber>=WEEKS){
    _state.status='won'; _state.finishedWeek=WEEKS; save(); return 'won';
  }
  _state.week++;
  _state.reserve+=WEEKLY_APPROPRIATION;
  _state.missionStopsCompleted=[];
  _state.selectedGroup=null;
  _state.visitOutcome=null;
  _state.log.push({week:_state.week, text:`Mission ${_state.week} opened: ${getCurrentMission(_state).title}. A new $${WEEKLY_APPROPRIATION} director allocation is available.`});
  // time advance 4h for coordination
  _state.timeHours = Math.min(TOTAL_HOURS, _state.timeHours + 4);
  if(_state.log.length>100) _state.log=_state.log.slice(-100);
  save();
  return 'mission';
}

export function getNextMissionStop(){
  if(!_state) return null;
  const idx=nextMissionStopIndex(_state);
  if(idx<0) return null;
  const m=getCurrentMission(_state);
  return m.stops[idx]||null;
}
export function isNextBuilding(id){
  const s=getNextMissionStop();
  return s && s.group===id;
}
export function markMissionStopComplete(stopIndex, correct){
  if(!_state || _state.status!=='playing') return;
  if(!Array.isArray(_state.missionStopsCompleted)) _state.missionStopsCompleted=[];
  if(!_state.missionStopsCompleted.includes(stopIndex)){
    _state.missionStopsCompleted.push(stopIndex);
    _state.missionStopsCompleted.sort((a,b)=>a-b);
  }
  _state.missionResults=_state.missionResults||{};
  const m=getCurrentMission(_state);
  const gs=_state.groups.find(g=>g.id===m.stops[stopIndex].group);
  _state.missionResults[`${_state.week}-${stopIndex}`]={group:gs?gs.id:null, correct: !!correct, lesson: m.stops[stopIndex].lesson};
  save();
  // don't auto-complete mission here; user must press Complete Mission (or we auto if desired)
  // check if mission now complete and auto-grant? Keep manual per original.
}
export function removeMissionStop(stopIndex){
  if(!_state) return;
  _state.missionStopsCompleted=(_state.missionStopsCompleted||[]).filter(i=>i!==stopIndex);
  save();
}
export function jumpToMission(targetWeek){
  if(!_state || _state.status!=='playing') return false;
  const w=Math.max(1, Math.min(WEEKS, Math.floor(targetWeek)));
  if(w===_state.week) return false;
  _state.week=w;
  _state.missionStopsCompleted=[];
  // don't clear specialRequestsCompleted — preserves history across jumps
  _state.selectedGroup=null;
  _state.visitOutcome=null;
  _state.log.push({week:w, text:`Jumped to Mission ${w}: ${getCurrentMission(_state)?.title || ''}`});
  if(_state.log.length>100) _state.log=_state.log.slice(-100);
  save();
  return true;
}
export function missionIndex(){ return (_state?.week||1)-1; }
export function missionStopIdx(){ return nextMissionStopIndex(_state); }
export function currentMission(){ return getCurrentMission(_state); }
