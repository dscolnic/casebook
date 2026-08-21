import { WEEKS, DAY_NOUN, WEEKLY_APPROPRIATION, DAILY_STIPEND } from './constants.js';
import { def, currentMilestone, completeMilestoneIfReady, readiness, baseWork, leader, getCurrentMission, getNextStop, missionStopDone, nextMissionStopIndex, completedMissionStops, missionComplete, missionStopForGroup, plannedWeeklySpend } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { saveState, saveStateLocal, loadState } from './save.js';
// Co-op. Every call is a no-op without `?room=`; see room.js.
import * as room from './room.js';
import { postResult } from './cloudSave.js';
import { clamp, seeded } from './utils.js';
import { freshState } from './simulation.js';
import { GROUP_DEFS } from './divisions.js';
import { TOTAL_DAYS, TOTAL_HOURS, START_HOUR, VISIT_COST_HOURS, WALK_BASE_HOURS, AVG_WALK_DISTANCE, HOURS_PER_WEEK, timeToWeek, timeToDay, formatTime, walkCostForDistance } from './time.js';
import { budgetForRoute, MINUTES_PER_SECOND, hourOfDay } from './day.js';

let _state = null;

/**
 * The penalty box.
 *
 * A wrong call closes its stop for an hour of the day's own countdown and then
 * reopens it. The lock is stored as the value `dayLeft` will have fallen to when
 * the box expires, so it needs no wall clock and survives a save: the day only
 * ever counts down, so `dayLeft <= until` is "the hour has passed".
 *
 * Cleared on a new day with the rest of the day state, because a box that
 * outlives its day would lock a stop nobody can reach.
 */
export function penaliseStop(key, minutes){
  if(!_state) return;
  _state.penalties = _state.penalties || {};
  _state.penalties[key] = Math.max(0, (_state.dayLeft ?? 0) - minutes);
}
/** Minutes of game time still to serve on this stop, or 0 if it is open. */
export function penaltyLeft(key){
  const until = _state?.penalties?.[key];
  if(until === undefined) return 0;
  return Math.max(0, (_state.dayLeft ?? 0) - until);
}
export function clearPenalty(key){
  if(_state?.penalties) delete _state.penalties[key];
}

export function getState(){ return _state; }
export function setState(s){ _state=s; }

export function save(){ if(_state) saveState(_state); }

// A finished campaign, won or lost, told to whatever account is behind the
// game. Inert behind a static server. The score is the fraction of every area's
// four developments that got completed, out of 100 — the one number that means
// the same thing in all fifteen games, since the areas and the milestones are
// the only structure every theme shares.
function reportCampaign(won){
  if(!_state) return;
  const groups = _state.groups ?? [];
  const done = groups.reduce((n, gs) => n + (gs.milestone || 0), 0);
  const total = groups.length * 4;
  postResult({
    won,
    score: total ? Math.round((done / total) * 100) : null,
    missions: _state.week ?? null,
    hours: _state.timeHours ?? null,
  });
}
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
  // One number per playthrough, mixed into every option shuffle in questionUI.
  // Without it the shuffles are seeded on the day number and the area alone, so
  // the fourth option is the answer on day 3 in every game anybody ever plays —
  // and a second run is a memory test rather than the same questions again.
  // Created once and saved, so re-opening a question mid-campaign does not
  // reshuffle it under the player.
  if(!Number.isFinite(_state.runSeed)) _state.runSeed = Math.floor(Math.random() * 1e9);
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
  // A penalty box belongs to the day that issued it.
  _state.penalties = {};
  _state.dayStarted = true;
  _state.dayEnded = false;
  // A new day is a new set of people to talk to. Without this a player who
  // restarts a day has already spent every conversation on it and can be broke
  // with no way to earn — which is the one state the design must not have.
  _state.passages = {};
  // The morning allowance, when there is one. DAILY_STIPEND is 0 today, and a
  // log line reading "opened with a $0 allowance" is worse than no line at all
  // — it announces a payment that did not happen. The once-per-mission guard is
  // still stamped either way, so turning the stipend back on cannot pay twice
  // for a day already opened.
  if(!_state.stipendPaid || _state.stipendPaid !== _state.week){
    _state.reserve += DAILY_STIPEND;
    _state.stipendPaid = _state.week;
    if(DAILY_STIPEND > 0){
      _state.log.push({ week: _state.week, text: `${DAY_NOUN} ${_state.week} opened with a $${DAILY_STIPEND} allowance.` });
    }
  }
  save();
  // Hand the room's clock its number. The budget is computed here because it
  // needs the map — the server has no world to measure a route through — and
  // counted down there because a browser tab cannot be trusted to keep counting.
  if(room.isRoom()) room.startClock(_state.dayBudget, _state.dayLeft);
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
 * `pace` scales the rate: 1 walking about, 0 while a panel is open.
 */
export function tickDay(realSeconds, pace = 1){
  if(!dayRunning()) return null;
  if(!Number.isFinite(realSeconds) || realSeconds <= 0) return null;
  // In a room the countdown is not ours to run. Several browsers counting the
  // same day down separately would drift apart within a minute, and the one
  // that got backgrounded would stop counting entirely — so the server owns the
  // number and this reads it. `pace` is ignored here for the same reason: the
  // server applies the panel rate, because it is the only party that knows
  // whether ANYBODY has a panel open.
  // A room whose socket is down is a room whose clock we do not own and cannot
  // read. Falling through to the local countdown below looks harmless and is
  // not: a thirty-second Wi-Fi drop near the end of a day lets this client run
  // its own copy to zero, set `dayEnded`, and publish that on reconnect —
  // ending the whole room's day from one person's router. The day is held
  // instead, and the next heartbeat snaps it back to the room's number.
  if(room.isRoom() && !room.isConnected()){
    _state.timeHours = hourOfDay(_state);
    return 'running';
  }
  if(room.isRoom() && room.isConnected()){
    _state.dayLeft = room.clockLeft();
    if(room.clockBudget()) _state.dayBudget = room.clockBudget();
    _state.timeHours = hourOfDay(_state);
    if(_state.dayLeft <= 0){
      _state.dayEnded = true;
      save();
      return 'expired';
    }
    return 'running';
  }
  // Zero is a rate, not a missing argument. This read `pace > 0 ? pace : 1`, so
  // the one value that means "stop the clock" was the one value that ran it at
  // full speed — and the caller would have looked correct while the day drained
  // four times faster behind an open panel than it did while walking. Negative
  // and non-finite still fall back, because those are mistakes.
  const rate = Number.isFinite(pace) && pace >= 0 ? pace : 1;
  if(rate === 0){
    _state.timeHours = hourOfDay(_state);
    return 'running';
  }
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
  _state.log.push({ week, text: `${DAY_NOUN} ${week} restarted. The calls are open again.` });
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
  if(room.isRoom()) room.stopClock();
}

/**
 * A campaign that arrived from the room.
 *
 * Written to the slot but NOT published back, or every write would echo around
 * the room once per player. `ensureMissionFields` runs because the blob has been
 * through JSON and a partner's engine may be a build behind this one.
 *
 * The day's clock is deliberately not taken from the blob: the server owns
 * `dayLeft`, and a state message that arrived a second after the last clock
 * heartbeat carries an older copy of it.
 */
export function applyRemoteState(next){
  if(!next) return false;
  const keepLeft = _state?.dayLeft;
  const keepBudget = _state?.dayBudget;
  _state = next;
  // ...except when the blob says the day is over. Somebody turned in, and the
  // server's clock has been stopped, so our interpolated `dayLeft` is the last
  // number a heartbeat happened to carry — keeping it leaves a HUD counting
  // hours down on a day that has ended, and nothing to press.
  if(_state.dayEnded) _state.dayLeft = 0;
  else if(Number.isFinite(keepLeft)) _state.dayLeft = keepLeft;
  if(Number.isFinite(keepBudget) && keepBudget > 0) _state.dayBudget = keepBudget;
  ensureMissionFields();
  saveStateLocal(_state);
  return true;
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
      _state.status='lost'; _state.finishedHours=_state.timeHours; save();
      reportCampaign(false);
      return 'lost';
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
    _state.status='won'; _state.finishedWeek=WEEKS; save();
    reportCampaign(true);
    return 'won';
  }
  _state.week++;
  _state.reserve+=WEEKLY_APPROPRIATION;
  _state.missionStopsCompleted=[];
  _state.selectedGroup=null;
  _state.visitOutcome=null;
  _state.log.push({week:_state.week, text:`Mission ${_state.week} opened: ${getCurrentMission(_state).title}.`
    + (WEEKLY_APPROPRIATION > 0 ? ` A new $${WEEKLY_APPROPRIATION} director allocation is available.` : '')});
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
  // A day's budget is measured from that day's own route, so a jump has to put
  // the day back in its unopened state and let the plan card open it. Without
  // this the new mission inherited the old one's countdown — and a jump made
  // from a finished day arrived with a clock already at zero.
  _state.dayStarted=false;
  _state.dayEnded=false;
  _state.log.push({week:w, text:`Jumped to Mission ${w}: ${getCurrentMission(_state)?.title || ''}`});
  if(_state.log.length>100) _state.log=_state.log.slice(-100);
  save();
  return true;
}
export function missionIndex(){ return (_state?.week||1)-1; }
export function missionStopIdx(){ return nextMissionStopIndex(_state); }
export function currentMission(){ return getCurrentMission(_state); }
