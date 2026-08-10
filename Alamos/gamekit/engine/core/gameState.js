import { WEEKS, WEEKLY_APPROPRIATION, DAILY_STIPEND } from './constants.js';
import { def, currentMilestone, completeMilestoneIfReady, readiness, baseWork, leader, getCurrentMission, getNextStop, missionStopDone, nextMissionStopIndex, completedMissionStops, missionComplete, missionStopForGroup, plannedWeeklySpend } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { saveState, loadState } from './save.js';
import { clamp, seeded } from './utils.js';
import { freshState } from './simulation.js';
import { GROUP_DEFS } from './divisions.js';
import { TOTAL_DAYS, TOTAL_HOURS, START_HOUR, VISIT_COST_HOURS, WALK_BASE_HOURS, AVG_WALK_DISTANCE, HOURS_PER_WEEK, timeToWeek, timeToDay, formatTime, walkCostForDistance } from './time.js';
import { budgetForRoute, MINUTES_PER_SECOND, hourOfDay } from './day.js';

let _state = null;

export function getState(){ return _state; }
export function setState(s){ _state=s; }

export function save(){ if(_state) saveState(_state); }
export function load(){ const s=loadState(); _state=s; return s; }

export function createFresh(assign){
  _state = freshState(assign);
  _state.timeHours = START_HOUR;
  _state.week = 1;
  _state.dayStarted = false;
  _state.dayEnded = false;
  _state.dayLeft = 0;
  _state.dayBudget = 0;
  _state.lastWeekProcessed = _state.week;
  _state.totalWalks = 0;
  save();
  return _state;
}

export function tryLoadSaved(){
  const s=loadState();
  // A save is only usable by the theme that wrote it. Anything else — an older
  // shape, another game's slot, a theme whose areas have been renamed — has
  // group ids the content no longer contains, and every lookup downstream
  // returns undefined at the point where it is least recoverable.
  if(s && s.status==='playing' && matchesTheme(s)){ _state=s; ensureMissionFields(); return s; }
  return null;
}
function matchesTheme(s){
  const ids = (GROUP_DEFS ?? []).map(d => d.id);
  if(!ids.length) return true;
  return Array.isArray(s.groups) && s.groups.length === ids.length
    && s.groups.every(g => ids.includes(g.id));
}
function ensureMissionFields(){
  if(!_state) return;
  repairDay();
  if(!Array.isArray(_state.missionStopsCompleted)) _state.missionStopsCompleted=[];
  if(!_state.missionResults) _state.missionResults={};
  if(!_state.hints) _state.hints={};
  if(!_state.retries) _state.retries={};
  if(!Array.isArray(_state.specialRequestsCompleted)) _state.specialRequestsCompleted=[];
}
/**
 * A saved day that cannot be true, put back to unplanned.
 *
 * `budgetForRoute` used to measure from wherever the player was standing, so a
 * day restarted from inside an interior — which lives four kilometres along +x
 * — was budgeted for a four-kilometre walk and opened with forty hours on the
 * clock. The measuring is fixed; this is for the saves that already have one,
 * because the alternative is telling somebody to clear their browser storage.
 */
const SANE_DAY_MINUTES = 900;    // fifteen hours; no honest route asks for more
function repairDay(){
  if(!_state) return;
  const bad = (_state.dayBudget ?? 0) > SANE_DAY_MINUTES
    || (_state.dayLeft ?? 0) > (_state.dayBudget ?? 0) + 1
    || !Number.isFinite(_state.dayLeft ?? 0);
  if(!bad) return;
  _state.dayStarted = false;
  _state.dayEnded = false;
  _state.dayLeft = 0;
  _state.dayBudget = 0;
  save();
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


// ————————————————————————————————————————————————————————— the day clock
//
// A mission is a day. `startDay` is called when the player accepts the plan;
// `tickDay` runs every frame from the entry point, in real time, whatever the
// player is doing. Nothing else charges time — see day.js for why.

/**
 * Open a day: budget from the route, pay the stipend, reopen the conversations.
 *
 * @param positions [{x,z}] the day's stops, from the game's own world
 * @param spawn     {x,z}
 */
export function startDay(positions, spawn){
  if(!_state) return;
  _state.dayBudget = budgetForRoute(spawn, positions);
  _state.dayLeft = _state.dayBudget;
  _state.dayStarted = true;
  _state.dayEnded = false;
  // A new day is a new set of people to talk to. Without this a player who
  // restarts a day has already spent every conversation on it and can be broke
  // with no way to earn — which is the one state the design must not have.
  _state.passages = {};
  if(!_state.stipendPaid || _state.stipendPaid !== _state.week){
    _state.reserve += DAILY_STIPEND;
    _state.stipendPaid = _state.week;
    _state.log.push({ week: _state.week, text: `Day ${_state.week} opened with a $${DAILY_STIPEND} allowance.` });
  }
  save();
  return _state.dayBudget;
}

/** True while the countdown should be running. */
export function dayRunning(){
  return !!_state && _state.status === 'playing' && _state.dayStarted && !_state.dayEnded
    && (_state.dayLeft ?? 0) > 0;
}

/**
 * Spend real seconds. Returns 'expired' on the frame the day runs out, so the
 * caller can put the day-over card up exactly once.
 *
 * `pace` scales the rate: 1 walking about, a quarter while a panel is open.
 */
export function tickDay(realSeconds, pace = 1){
  if(!dayRunning()) return null;
  if(!Number.isFinite(realSeconds) || realSeconds <= 0) return null;
  const rate = Number.isFinite(pace) && pace > 0 ? pace : 1;
  _state.dayLeft = Math.max(0, _state.dayLeft - realSeconds * MINUTES_PER_SECOND * rate);
  // The world's light follows the countdown rather than a second clock.
  _state.timeHours = hourOfDay(_state);
  if(_state.dayLeft <= 0){
    _state.dayEnded = true;
    save();
    return 'expired';
  }
  return 'running';
}

/** Start this mission again from the top: the stops reopen, the clock refills. */
export function restartDay(positions, spawn){
  if(!_state) return;
  const week = _state.week;
  _state.missionStopsCompleted = [];
  _state.missionResults = _state.missionResults || {};
  for(const key of Object.keys(_state.missionResults)){
    if(key.startsWith(`${week}-`)) delete _state.missionResults[key];
  }
  _state.retries = {};
  _state.hints = {};
  _state.attempts = {};
  _state.specialRequestsCompleted = (_state.specialRequestsCompleted || []).filter(w => w !== week);
  _state.dayStarted = false;
  _state.dayEnded = false;
  _state.log.push({ week, text: `Day ${week} restarted. The calls are open again.` });
  save();
  startDay(positions, spawn);
  return _state.dayBudget;
}

/** The player has done everything and wants the evening early. */
export function endDayNow(){
  if(!_state) return;
  _state.dayEnded = true;
  _state.dayLeft = 0;
  save();
}

export function advanceTime(hours, reason=''){
  if(!_state || _state.status!=='playing') return;
  // A caller that passes undefined — walkCost() returns a verdict, not hours —
  // used to put NaN in the clock, and NaN reached the sun angle before it
  // reached the HUD, so the first visible symptom was the whole world going
  // black. Refuse it here rather than anywhere downstream.
  if(!Number.isFinite(hours)) return;
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

// Both of these used to move the clock. They are kept because three entry
// points and two dev checkers call them, but a day is spent in real time now
// and charging a lump on arrival would bill the player twice for the same walk.
export function visitBuildingCost(){ return 'time'; }
export function walkCost(dist){
  if(_state) _state.totalWalks = (_state.totalWalks||0)+1;
  return 'time';
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
  // The next day is planned before it starts: the entry point puts the plan up
  // and calls startDay when the player accepts it.
  _state.dayStarted = false;
  _state.dayEnded = false;
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
