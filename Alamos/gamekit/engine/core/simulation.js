import { WEEKS, STARTING_RESERVE } from './constants.js';
import { LEADERS } from './leaders.js';
import { GROUP_DEFS } from './divisions.js';
import { CURRICULUM } from './curriculum.js';
import { MISSION_DEFS } from './missions.js';
import { HISTORIC_CHARACTERS, SPECIAL_REQUESTS as THEME_SPECIAL_REQUESTS } from './historicCharacters.js';
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
// The *current* stop for a group, not merely the first one that mentions it.
//
// This assumed at most one stop per group per mission. When a mission keeps all
// three of its stops in one area — which is the normal shape when the areas are
// fields of study rather than places — stop 2 and stop 3 both resolved back to
// stop 1, and every stop after the first reported "mission locked".
export function missionStopIndex(state, id){
  const m=getCurrentMission(state);
  if(!m) return -1;
  const done=completedMissionStops(state);
  const pending=m.stops.findIndex((s,i)=> s.group===id && !done.includes(i));
  return pending>=0 ? pending : m.stops.findIndex(s=>s.group===id);
}
/**
 * Every stop still open today, in mission order.
 *
 * The player chooses their own route now, so there is no single "next" stop —
 * all of a day's calls are open from the moment the day starts, and the plan
 * screen shows where each one is. `nextMissionStopIndex` survives as "the first
 * one still open", which is what the map's default target and a few labels
 * want, but nothing gates on it any more.
 */
export function openStopIndices(state){
  const m=getCurrentMission(state);
  if(!m) return [];
  const done=completedMissionStops(state);
  return m.stops.map((_,i)=>i).filter(i=>!done.includes(i));
}
export function openStopGroups(state){
  const m=getCurrentMission(state);
  if(!m) return new Set();
  return new Set(openStopIndices(state).map(i=>m.stops[i].group));
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
  // The day's own shape wins. `normalize.shapeMissions` marks the second call
  // on an area as a person stop so nobody walks into the same room twice, and
  // marks the first as explicitly not one — without that, the fallback below
  // would still turn every third call in the campaign into a person hunt
  // regardless of what the day looks like.
  const stop = getCurrentMission(state)?.stops?.[idx];
  if(stop && typeof stop.person === 'boolean') return stop.person;
  return globalStopIndex(state, idx) % 3 === 1;
}
// The cast is theme content, not engine content. Both of these used to be
// literal maps of one game's characters, which meant a new setting could not
// name anybody without editing the engine. They are derived from the roster
// now; a person's `division` is the group they belong to.
export const CHARACTER_DIVISION = Object.fromEntries(
  (HISTORIC_CHARACTERS || []).filter(c => c.id && c.division).map(c => [c.id, c.division]));
const FALLBACK_GROUP = () => GROUP_DEFS[0]?.id ?? null;
export function divisionForCharacter(charId){ return CHARACTER_DIVISION[charId] || FALLBACK_GROUP(); }
export const PERSONS_BY_DIVISION = (HISTORIC_CHARACTERS || []).reduce((acc, c) => {
  if(!c.id || !c.division) return acc;
  (acc[c.division] ||= []).push(c.id);
  return acc;
}, {});
export function getPersonIdForStop(state, stopIdx){
  const m=getCurrentMission(state);
  if(!m || stopIdx<0 || stopIdx>=m.stops.length) return null;
  const stop=m.stops[stopIdx];
  const list=PERSONS_BY_DIVISION[stop.group] || [];
  if(!list.length) return null;
  // Two person stops on the same area in one day must be two different people,
  // or the day sends the player back to the same shoulder twice.
  const earlier = m.stops.slice(0, stopIdx)
    .filter((s, i) => s.group === stop.group && isPersonStopForIdx(state, i)).length;
  // The day is the base, not the stop: `globalStopIndex` already grows from one
  // stop to the next, so adding `earlier` on top of it advanced twice and the
  // two could land back on the same person — with a cast of two per area, they
  // reliably did, and the objective line named one person twice.
  const base = Math.max(0, (state.week ?? 1) - 1);
  return list[(base + earlier) % list.length];
}
// An optional between-mission meeting: a named person asks for funding and
// justifies it. Content, so it comes from the theme; a theme that supplies none
// simply never triggers one.
export const SPECIAL_REQUESTS = THEME_SPECIAL_REQUESTS || {};
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
  return {version:21,status:'playing',week:1,selectedGroup:null,reserve:STARTING_RESERVE,missionStopsCompleted:[],missionResults:{},visitOutcome:null,visitBonus:{},hints:{},retries:{},groups,specialRequestsCompleted:[],log:[{week:1,text:`Mission 1 opened: ${MISSION_DEFS[0]?.title ?? 'Mission 1'}. Complete the required stops in order.`}]};
}
