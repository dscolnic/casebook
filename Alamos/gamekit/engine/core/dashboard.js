import { getState } from './gameState.js';
import { def, currentMilestone, groupPct, readiness, forecastReadiness, forecastMoney, getCurrentMission, nextMissionStopIndex, completedMissionStops, isPersonStopForIdx, getPersonIdForStop, isSpecialRequestActive, getSpecialRequest, hasSpecialRequest } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { esc, fmt, clamp } from './utils.js';
import { GROUP_DEFS } from './divisions.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';

export function renderCentralBoardTexture(ctx, width, height){
  // Draw central board onto a canvas 2D context — mission campaign board
  const state=getState();
  if(!state) return;
  const forecast=forecastReadiness(state);
  const moneyForecast=forecastMoney(state);
  const curMission = getCurrentMission(state);
  const nextIdx = nextMissionStopIndex(state);
  const nextStop = curMission && nextIdx>=0 ? curMission.stops[nextIdx] : null;
  // Background
  ctx.fillStyle='#fffdf8';
  ctx.fillRect(0,0,width,height);
  ctx.strokeStyle='#d9d2c5';
  ctx.lineWidth=4;
  ctx.strokeRect(0,0,width,height);
  // Mission header
  const timeHours=state.timeHours ?? 8;
  const day=Math.floor(timeHours/24)+1;
  const hr=Math.floor(((timeHours%24)+24)%24);
  const isNight = hr<6 || hr>=18;
  ctx.fillStyle='#9a741d';
  ctx.font='900 11px Inter, sans-serif';
  const missionLabel = curMission ? `MISSION ${state.week} OF 15 — ${curMission.title.toUpperCase()}` : 'ALL MISSIONS COMPLETE';
  ctx.fillText(missionLabel, 24, 28);
  ctx.fillStyle='#1b1a17';
  ctx.font='900 20px Georgia, serif';
  ctx.fillText(curMission ? curMission.title : 'Campaign complete', 24, 52);
  ctx.fillStyle='#4b463d';
  ctx.font='600 11px Inter, sans-serif';
  const brief = curMission ? curMission.objective : 'All 15 missions completed — evidence chain closed.';
  // wrap brief to ~70 chars
  let bx=24, by=68;
  const words=brief.split(' '); let line='';
  ctx.font='600 11px Inter, sans-serif';
  for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width> (width-48)){ ctx.fillText(line, bx, by); by+=13; line=w; } else line=test; }
  if(line) ctx.fillText(line, bx, by);
  ctx.fillStyle='#315c78';
  ctx.font='700 10px Inter, sans-serif';
  ctx.fillText(`Day ${day}/20 — ${String(hr).padStart(2,'0')}:${String(Math.floor(((timeHours%24)-hr)*60)).padStart(2,'0')} ${isNight?'☾ Night':'☀'}   |   Director $${fmt(state.reserve)}   |   Ready ${Math.round(readiness(state))}% → ${Math.round(forecast.overall)}%`, 24, by+18);
  // Mission route strip
  let routeY=by+30;
  if(curMission){
    const done=completedMissionStops(state);
    const nextI=nextMissionStopIndex(state);
    ctx.fillStyle='#d9d2c5'; ctx.fillRect(24, routeY-8, width-48, 1);
    let rx=24;
    curMission.stops.forEach((s,i)=>{
      const isDone=done.includes(i);
      const isNext=i===nextI;
      const bg=isDone?'#3d6f52':isNext?'#315c78':'#e8e2d7';
      const fg=isDone||isNext?'#fff':'#666158';
      // pill
      const label=`${i+1}. ${s.group} — ${s.task}`;
      ctx.font='700 9px Inter, sans-serif';
      const wtxt=Math.min(170, ctx.measureText(label).width+18);
      ctx.fillStyle=bg; 
      // rounded pill
      const py=routeY-6, ph=14, r=7;
      ctx.beginPath(); ctx.moveTo(rx+r, py); ctx.arcTo(rx+wtxt, py, rx+wtxt, py+ph, r); ctx.arcTo(rx+wtxt, py+ph, rx, py+ph, r); ctx.arcTo(rx, py+ph, rx, py, r); ctx.arcTo(rx, py, rx+wtxt, py, r); ctx.fill();
      ctx.fillStyle=fg; ctx.fillText(label, rx+9, routeY+4);
      rx+=wtxt+6;
      if(i < curMission.stops.length-1){ ctx.fillStyle='#9a741d'; ctx.font='900 10px Inter, sans-serif'; ctx.fillText('→', rx, routeY+4); rx+=12; }
    });
    routeY+=18;
    ctx.fillStyle='#d9d2c5'; ctx.fillRect(24, routeY, width-48, 1);
  }
  // Table header — no individual budgets, just readiness + status
  const cols = { name: 24, now: 380, proj: 500, issue: 620 };
  ctx.fillStyle='#315c78';
  ctx.font='900 11px Inter, sans-serif';
  const headerY=routeY+16;
  ctx.fillText('DIVISION', cols.name, headerY);
  ctx.fillText('READINESS', cols.now, headerY);
  ctx.fillText('→ PROJ', cols.proj, headerY);
  ctx.fillText('STATUS', cols.issue, headerY);
  let y=headerY+24;
  state.groups.forEach(gs=>{
    const d=def(gs.id);
    const pct=Math.round(groupPct(gs));
    const projEntry=forecast.perGroup.find(p=>p.id===gs.id);
    const projPct=projEntry?Math.round(projEntry.pct):pct;
    // Row bg
    if(y%2===0){ ctx.fillStyle='#faf8f2'; ctx.fillRect(0, y-22, width, 46); }
    // Color dot
    ctx.fillStyle=d.color;
    ctx.beginPath(); ctx.arc(36, y-2, 10, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='900 10px Georgia, serif'; ctx.fillText(d.code, 32, y+3);
    // Name
    ctx.fillStyle='#1b1a17';
    ctx.font='800 16px Inter, sans-serif';
    ctx.fillText(d.name, 58, y+5);
    // Readiness bars — compact
    const barX=380, barW=140, barH=9;
    ctx.fillStyle='#e8e2d7'; ctx.fillRect(barX, y-10, barW, barH);
    ctx.fillStyle=d.color; ctx.fillRect(barX, y-10, barW * (pct/100), barH);
    if(projPct>pct){
      ctx.fillStyle=d.color+'66';
      ctx.fillRect(barX + barW*(pct/100), y-10, barW*((projPct-pct)/100), barH);
    }
    ctx.fillStyle='#1b1a17'; ctx.font='700 10px Inter, sans-serif';
    ctx.fillText(pct+'%→'+projPct+'%', barX, y+14);
    // Issue
    ctx.fillStyle=gs.issue?'#9a3f36':'#3d6f52';
    ctx.font='700 11px Inter, sans-serif';
    ctx.fillText(gs.issue?'ISSUE':'OK', 620, y+5);
    if(gs.issue){
      ctx.fillStyle='#59312d'; ctx.font='600 9px Inter, sans-serif';
      const short=gs.issue.length>32?gs.issue.slice(0,32)+'…':gs.issue;
      ctx.fillText(short, 620, y+18);
    }
    y+=46;
  });
  // Footer
  ctx.fillStyle='#666158';
  ctx.font='600 11px Inter, sans-serif';
  ctx.fillText('E — Board  |  M — Map  |  Mission route lights the next building (blue beacon)  |  Walk ~3h  |  Visit +4h', 24, height-18);
}

export function updateHUD(){
  const state=getState();
  if(!state) return;
  // Running clock
  const clockEl=document.getElementById('clockStat');
  const clockSub=document.getElementById('clockSub');
  if(clockEl && clockSub){
    const h=Math.floor(((state.timeHours??8)%24+24)%24);
    const m=Math.floor((((state.timeHours??8)%24+24)%24 - h)*60);
    const pad=n=>String(n).padStart(2,'0');
    const day=Math.floor((state.timeHours??8)/24)+1;
    const daysLeft=Math.max(0, 20 - Math.floor((state.timeHours??8)/24));
    const hrsLeft=Math.max(0, 480 - Math.floor(state.timeHours??8));
    clockEl.querySelector('strong').textContent=`Day ${day}/20 — ${pad(h)}:${pad(m)}`;
    const isNight=h<6||h>=18;
    clockSub.textContent=`${daysLeft} days to delivery · ${hrsLeft}h left ${isNight?'☾ night':'☀ day'}`;
  }
  // Top mission bar
  const curMission=getCurrentMission(state);
  const done=completedMissionStops(state);
  const nextIdx=nextMissionStopIndex(state);
  const counter=document.getElementById('missionCounter');
  const title=document.getElementById('missionTitle');
  const objective=document.getElementById('missionObjective');
  const routeEl=document.getElementById('missionRoute');
  const prog=document.getElementById('missionProgress');
  const specialActive=isSpecialRequestActive(state);
  const specialReq=specialActive ? getSpecialRequest(state.week) : null;
  const specialPerson=specialReq ? HISTORIC_CHARACTERS.find(c=>c.id===specialReq.personId) : null;
  const nextStop=curMission && nextIdx>=0 ? curMission.stops[nextIdx] : null;
  const nextDef=nextStop ? def(nextStop.group) : null;
  const isPersonNext = nextStop ? isPersonStopForIdx(state, nextIdx) : false;
  const personId = isPersonNext ? getPersonIdForStop(state, nextIdx) : null;
  const person = personId ? HISTORIC_CHARACTERS.find(c=>c.id===personId) : null;
  if(counter) counter.textContent=curMission ? `MISSION ${state.week} OF 15 — ${curMission.title.toUpperCase()}` : 'ALL MISSIONS COMPLETE';
  if(title){
    if(specialActive && specialPerson && specialReq){
      title.innerHTML=`<span style="color:#9a741d">→ Fourth meeting: Find ${esc(specialPerson.name)} — ${esc(specialPerson.role)} [${esc(specialReq.division)}]</span> — ${esc(specialReq.title)} <span style="font-weight:400;color:#666158">· ${done.length}/${curMission.stops.length} done + special</span>`;
    } else if(curMission && nextStop && nextDef){
      if(isPersonNext && person){
        title.innerHTML=`<span style="color:#315c78">→ Find ${esc(person.name)} — ${esc(person.role)} [${esc(nextDef.code)}]</span> — ${esc(nextStop.task)} <span style="font-weight:400;color:#666158">· ${done.length}/${curMission.stops.length} done</span>`;
      } else {
        title.innerHTML=`<span style="color:#315c78">→ Go to ${esc(nextDef.name)} (${nextDef.code})</span> — ${esc(nextStop.task)} <span style="font-weight:400;color:#666158">· ${done.length}/${curMission.stops.length} done</span>`;
      }
    } else if(curMission){
      title.textContent=curMission.title;
    } else {
      title.textContent='Campaign complete';
    }
  }
  if(objective) objective.textContent=curMission ? (nextStop ? `Why: ${curMission.briefing.split('. ')[0]}.` : curMission.objective) : 'All 15 missions completed — evidence chain closed.';
  if(routeEl && curMission){
    let html=curMission.stops.map((s,i)=>{
      const isDone=done.includes(i);
      const isNext=i===nextIdx && !isSpecialRequestActive(state);
      const isPerson=isPersonStopForIdx(state,i);
      const pid=isPerson?getPersonIdForStop(state,i):null;
      const pchar=pid?HISTORIC_CHARACTERS.find(c=>c.id===pid):null;
      const label = isPerson && pchar ? `${s.group} · ${pchar.name.split(' ').pop()}` : s.group;
      const bg=isDone?'#3d6f52':isNext?'#315c78':'#fff';
      const fg=isDone||isNext?'#fff':'#666158';
      const border=isNext?'2px solid #315c78':'1px solid #d9d2c5';
      return `<span title="${isPerson&&pchar?esc(pchar.name):''}" style="background:${bg};color:${fg};border:${border};border-radius:999px;padding:3px 8px;font:800 .66rem Inter,sans-serif">${isDone?'✓ '+(i+1):(i+1)+'. '+esc(label)}${isNext?' → next':''}</span>`;
    }).join('<span style="color:#9a741d;font-weight:900">→</span>');
    if(hasSpecialRequest(state.week)){
      const spDone=Array.isArray(state.specialRequestsCompleted) && state.specialRequestsCompleted.includes(state.week);
      const spActive=isSpecialRequestActive(state);
      const spReq=getSpecialRequest(state.week);
      const spChar=spReq?HISTORIC_CHARACTERS.find(c=>c.id===spReq.personId):null;
      const bg=spDone?'#3d6f52':spActive?'#9a741d':'#fff';
      const fg=spDone||spActive?'#fff':'#666158';
      const border=spActive?'2px solid #9a741d':'1px solid #d9d2c5';
      html+=` <span style="color:#9a741d;font-weight:900">→</span> <span title="${spChar?esc(spChar.name):''}" style="background:${bg};color:${fg};border:${border};border-radius:999px;padding:3px 8px;font:800 .66rem Inter,sans-serif">4. ${esc(spReq?spReq.personId:'special')}${spActive?' → fourth meeting':spDone?' ✓':''}</span>`;
    }
    routeEl.innerHTML=html;
  } else if(routeEl) routeEl.innerHTML='';
  if(prog) prog.textContent=curMission ? `${done.length} / ${curMission.stops.length} stops` : '15 / 15 missions';
  // also update stats overlay if open
  const statsBody=document.getElementById('statsBody');
  if(statsBody && !document.getElementById('statsOverlay').classList.contains('hidden')){
    renderStats();
  }
  // timeline: missions (week is mission number)
  const track=document.getElementById('timelineTrack');
  const label=document.getElementById('timelineLabel');
  if(label){
    const curMission = getCurrentMission(state);
    label.textContent= curMission ? `Mission ${state.week}/15 — ${curMission.title} · ${curMission.stops.length} stops` : 'Campaign complete — 15/15 missions';
  }
  if(track){
    track.innerHTML=Array.from({length:15},(_,i)=>{
      const isPast = i < (state.week-1);
      const isCurrent = i === (state.week-1);
      return `<i class="dayDot ${isPast?'past':isCurrent?'today':''} ${i===14?'deadline':''}"></i>`;
    }).join('');
  }
  // render fallback 2D town if visible
  renderFallbackTown();
}

function renderFallbackTown(){
  const fallback=document.getElementById('fallbackTown');
  if(!fallback || fallback.classList.contains('hidden')) return;
  const state=getState();
  fallback.innerHTML = `<div class="townWrap" style="min-height:auto"><div class="townLabel">Fallback town map (2D)</div><div class="groupList" style="display:grid;gap:8px;margin-top:28px">${state.groups.map(gs=>{
    const d=def(gs.id);
    const pct=Math.round(groupPct(gs));
    return `<div class="groupCard" style="--c:${d.color};border-left:6px solid ${d.color}"><div style="display:flex;justify-content:space-between"><div><b>${esc(d.code)} · ${esc(d.name)}</b><div style="font-size:.72rem;color:#666">${esc(d.desc)}</div><div style="font-size:.7rem;margin-top:4px">Readiness ${pct}% · ${gs.milestone}/4 · ${gs.issue?'<span style="color:#9a3f36">Issue</span>':'<span style="color:#3d6f52">OK</span>'}</div></div><button class="btn small" data-fallback-visit="${gs.id}">Visit</button></div></div>`;
  }).join('')}</div></div>`;
  fallback.querySelectorAll('[data-fallback-visit]').forEach(btn=>{
    btn.onclick=()=>{ const id=btn.dataset.fallbackVisit; window.dispatchEvent(new CustomEvent('projecty:visit', {detail:{id}})); };
  });
}

export function renderStats(){
  const state=getState();
  if(!state) return;
  const overall=Math.round(readiness(state));
  const body=document.getElementById('statsBody');
  if(!body) return;
  const forecast=forecastReadiness(state);
  body.innerHTML=`<div style="display:grid;gap:12px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:#f7f0dc;border:1px solid #dccb9f;border-radius:10px;padding:12px;text-align:center"><div style="font:900 .7rem Inter,sans-serif;color:#9a741d;letter-spacing:.08em">DIRECTOR FUNDS</div><div style="font:800 1.6rem Georgia,serif">$${fmt(state.reserve)}</div><div style="font-size:.7rem;color:#666158">Hints $2 · Retries $3 · Funding $1 per 1%</div></div>
      <div style="background:#e8f0f4;border:1px solid #c8d7df;border-radius:10px;padding:12px;text-align:center"><div style="font:900 .7rem Inter,sans-serif;color:#315c78;letter-spacing:.08em">PROGRAM READINESS</div><div style="font:800 1.6rem Georgia,serif">${overall}%</div><div style="font-size:.7rem;color:#666158">→ ${Math.round(forecast.overall)}% projected</div></div>
    </div>
    <div style="border:1px solid #d9d2c5;border-radius:10px;overflow:hidden">
      ${state.groups.map(gs=>{
        const d=def(gs.id);
        const pct=Math.round(groupPct(gs));
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-bottom:1px solid #f0ebe0;background:${pct===100?'#e6f0e9':'#fff'}"><div style="display:flex;gap:8px;align-items:center"><div style="width:28px;height:28px;border-radius:7px;background:${d.color};color:#fff;display:grid;place-items:center;font:800 .72rem Georgia,serif">${d.code}</div><div><div style="font:700 .82rem Inter,sans-serif">${esc(d.name)}</div><div style="font-size:.68rem;color:#666158">${gs.milestone}/4 milestones${gs.issue?' · <span style=color:#9a3f36>Issue</span>':''}</div></div></div><div style="font:800 .92rem Inter,sans-serif">${pct}%</div></div>`;
      }).join('')}
    </div>
    <div style="font-size:.72rem;color:#666158">Close and keep exploring — press <b>Stats</b> again anytime to recheck.</div>
  </div>`;
}
export function renderEndScreen(){
  const state=getState();
  const endScreen=document.getElementById('endScreen');
  if(!endScreen) return;
  const won=state.status==='won';
  const gameScreen=document.getElementById('gameScreen');
  if(gameScreen) gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  endScreen.innerHTML=`<div class="eyebrow">${won?'Program ready':'Deadline reached'}</div><h2>${won?`Ready in Week ${state.finishedWeek}`:'The program is incomplete'}</h2><p>${won?'All five divisions completed their four development chains. The win came from matching leaders to buildings, directing scarce funds, solving science problems, and using visits well.':'Week 15 arrived before every division completed its evidence chain. The result shows which combination of leadership, funding, unresolved issues, and integration work became the limiting path.'}</p><div class="scoreGrid">${state.groups.map(gs=>{const d=def(gs.id); return `<div class="scoreBox" style="--c:${d.color}"><strong>${d.code} · ${Math.round(groupPct(gs))}%</strong><span>${esc(d.name)}<br>${gs.milestone}/4 developments complete</span></div>`}).join('')}</div><div class="debrief"><b>Historical debrief.</b> The Manhattan Project was an extraordinary organizational and scientific undertaking, and it produced weapons used against cities. Technical completion is therefore not the end of the historical story. A fuller campaign should continue into decisions about use, scientists’ dissent and advocacy, civilian consequences, radiation and environmental legacies, secrecy, and postwar nuclear policy.</div><button class="btn primary" id="playAgain">Start a new organization</button>`;
  const btn=document.getElementById('playAgain');
  if(btn) btn.onclick=()=>{
    localStorage.removeItem('hospitalHeroes_juniorDoctor_v1');
    location.reload();
  };
}
