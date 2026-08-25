import { getState } from './gameState.js';
import { def, currentMilestone, groupPct, readiness, forecastReadiness, forecastMoney, getCurrentMission, nextMissionStopIndex, openStopIndices, completedMissionStops, isPersonStopForIdx, getPersonIdForStop, isSpecialRequestActive, getSpecialRequest, hasSpecialRequest } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { esc, fmt, clamp } from './utils.js';
import { formatCountdown } from './day.js';
import { GROUP_DEFS } from './divisions.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { callLabel } from './place.js';
import theme from './theme.js';
import { deliveryProgress } from './delivery.js';
import { sitedAt } from '../world/interiorFixtures.js';
import { CURRICULUM } from './curriculum.js';
import { WEEKS, HINT_COST, RETRY_COST, FUND_COST } from './constants.js';
import { PASSAGE_REWARD } from './personQuiz.js';
import { TOTAL_DAYS } from './time.js';

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
  const missionLabel = curMission ? `MISSION ${state.week} OF ${WEEKS} — ${curMission.title.toUpperCase()}` : 'ALL MISSIONS COMPLETE';
  ctx.fillText(missionLabel, 24, 28);
  ctx.fillStyle='#1b1a17';
  ctx.font='900 20px Georgia, serif';
  ctx.fillText(curMission ? curMission.title : 'Campaign complete', 24, 52);
  ctx.fillStyle='#4b463d';
  ctx.font='600 11px Inter, sans-serif';
  const brief = curMission ? curMission.objective : `All ${WEEKS} missions completed — evidence chain closed.`;
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

/**
 * The heads-up display: five readings and one instruction.
 *
 * What was here before was a full-width toolbar carrying the mission title,
 * the learning objective, a "Why:" line, a chip per stop and a fifteen-dot
 * timeline — a briefing document stapled over the top of the game. None of it
 * told the player the only two things they need while walking: where to go,
 * and how much trouble they are in.
 */
/**
 * The countdown, every frame.
 *
 * `updateHUD` does forecast arithmetic over every group and is called a couple
 * of times a second at most — which is fine for money and projection and wrong
 * for a clock. A game minute is 0.4 real seconds, so refreshing the countdown
 * at 2 Hz makes it step by one minute, then two, then one; Project Y refreshed
 * it on `Math.random() < 0.02`, so the steps were not even evenly spaced.
 *
 * This writes the countdown and nothing else, cheaply enough to call from the
 * frame loop: a string compare, and a transform on a bar that moves smoothly
 * whatever the frame rate is.
 */
let lastCountdown = '';
export function updateDayClock(){
  const state = getState();
  const el = document.getElementById('hudClock');
  if(!state || !el) return;
  const left = state.dayLeft ?? 0;
  const text = state.dayStarted ? formatCountdown(left) : '—';
  if(text !== lastCountdown){
    el.textContent = text;
    lastCountdown = text;
  }
  const frac = state.dayBudget ? left / state.dayBudget : 1;
  const cls = !state.dayStarted ? '' : frac < 0.12 ? 'urgent' : frac < 0.3 ? 'low' : '';
  if(el.className !== cls) el.className = cls;
  // The bar is the continuous part: the text can only move in whole minutes,
  // and a countdown that only moves in steps reads as a stutter.
  let bar = el.parentElement?.querySelector('.hudBarFill');
  if(!bar && el.parentElement){
    const track = document.createElement('div');
    track.className = 'hudBar';
    bar = document.createElement('div');
    bar.className = 'hudBarFill';
    track.appendChild(bar);
    el.parentElement.appendChild(track);
  }
  if(bar) bar.style.transform = `scaleX(${Math.max(0, Math.min(1, frac))})`;
}

export function updateHUD(){
  const state=getState();
  if(!state) return;
  const hours=state.timeHours??8;
  const pad=n=>String(Math.floor(n)).padStart(2,'0');

  const set=(id,text,cls)=>{
    const el=document.getElementById(id);
    if(!el) return;
    el.textContent=text;
    if(cls!==undefined) el.className=cls;
  };

  // 1. the day's countdown  2. the delivery meter  3. money left
  //
  // "Calls — 2 of 3" used to sit second. #objective, immediately below this
  // strip, already names every open call in full — "Still open: Go to Reactor
  // Hall · Talk to Ingrid Sundqvist" — so the box was a count of a list the
  // player can read whole, nine pixels away.
  //
  // This used to be a running campaign clock and a count of days left. Neither
  // told the player the thing they actually need while walking: how much of
  // *today* is left, and how many calls they still owe.
  updateDayClock();

  // 3. THE DELIVERY METER, and it replaces "Mission 4 of 15".
  //
  // That box counted the game. A player reading it learns how far through a
  // fifteen-part thing they are, which is the same fact a chapter number gives
  // and carries none of the reason they are playing — and this repo had already
  // decided what the fortnight is for: `theme.delivery` is the one named thing a
  // campaign builds, a piece a day. The meter is that arithmetic said as the
  // thing at stake filling up, with the campaign's own word for it above the bar
  // (`delivery.meter`, falling back to the delivery's name).
  //
  // `got` counts pieces EARNED, not days elapsed, which is the point: a day
  // whose calls went badly still advances `state.week` and does not fill the
  // tank. So the bar can lag the calendar, and that is the reading the old box
  // could not give at any width.
  //
  // A campaign with no delivery keeps the count. The ten Quick Discoveries have
  // no `delivery` — nine stops in one sitting builds nothing over a fortnight —
  // and a meter of nothing is worse than a chapter number.
  // No figure beside it, deliberately. The bar IS the reading; "4 of 15" printed
  // next to it is the chapter number coming back in through the side door, and
  // the exact count is on the board in the room where the pieces are kept.
  const meterEl = document.getElementById('hudDeliverMeter');
  const fillEl = document.getElementById('hudDeliverFill');
  const figureEl = document.getElementById('hudMission');
  const spec = theme?.delivery;
  if(spec?.pieces?.length){
    const { got, total: pieces } = deliveryProgress(theme, state);
    set('hudDeliverLabel', spec.meter || spec.name);
    if(figureEl) figureEl.hidden = true;
    if(meterEl) meterEl.hidden = false;
    if(fillEl){
      fillEl.style.width = `${pieces ? Math.round((got / pieces) * 100) : 0}%`;
      fillEl.className = got && got >= pieces ? 'full' : '';
    }
  } else {
    const missionNo=Math.min(WEEKS, state.week||1);
    set('hudDeliverLabel', 'Mission');
    set('hudMission', `${missionNo} of ${WEEKS}`);
    if(figureEl) figureEl.hidden = false;
    if(meterEl) meterEl.hidden = true;
  }

  // 4. money left
  //
  // THE PROJECTION READING IS GONE. It printed Great / Good / Bad from
  // `forecastReadiness`, and it was the one item on this strip that was not a
  // fact the player needs in order to act: the clock says how long is left, the
  // calls say what is owed, the meter says what has been built and the funds say
  // what can be spent, and every one of those changes what you do next. A verdict
  // on the campaign changes nothing you do at half past two on sol 4 — it only
  // tells you how you are being marked, permanently, over the top of the world.
  //
  // It is still computed and still readable: `renderStats` puts the forecast on
  // the command board, which is where a player who wants the verdict can go and
  // ask for it. `forecastReadiness` keeps both of its other callers in this file.
  set('hudMoney', `$${fmt(state.reserve)}`);

  // ---- the instruction: where to go, and why it matters
  const mission=getCurrentMission(state);
  const idx=nextMissionStopIndex(state);
  const whereEl=document.getElementById('objectiveWhere');
  const whyEl=document.getElementById('objectiveWhy');
  const objEl=document.getElementById('objective');
  if(!whereEl||!whyEl) return;

  if(!mission){
    objEl?.classList.add('done');
    whereEl.textContent='Campaign complete';
    whyEl.textContent='Every mission is closed.';
  } else if(isSpecialRequestActive(state)){
    const req=getSpecialRequest(state.week);
    const person=HISTORIC_CHARACTERS.find(c=>c.id===req?.personId);
    objEl?.classList.remove('done');
    whereEl.textContent=person?`Find ${person.name}`:'Find your colleague';
    whyEl.textContent=req?.title||'';
  } else if(idx<0){
    objEl?.classList.add('done');
    whereEl.textContent='Every call is made';
    whyEl.textContent='The rest of the day is yours — talk to people, and they will sign off expenses.';
  } else {
    objEl?.classList.remove('done');
    // Every open call, not one. The player chooses the order now, so naming a
    // single "next" stop would be the game deciding for them.
    const open = openStopIndices(state);
    const label = (i) => {
      const stop = mission.stops[i];
      const personId = isPersonStopForIdx(state, i) ? getPersonIdForStop(state, i) : null;
      const person = personId ? HISTORIC_CHARACTERS.find(c => c.id === personId) : null;
      // "Go to the Survey Telescope" / "Talk to Dr. Nguyen" — an instruction, and
      // the same words the plan card and the map use. It used to print the area's
      // subject name, which is on no door and no map label.
      // The same sited-call rule as the plan card: name where the player walks.
      const lesson = CURRICULUM?.[stop.group]?.[stop.lesson];
      return callLabel(person, stop.group, sitedAt(theme, stop.group, lesson)?.place ?? null);
    };
    whereEl.textContent = open.length === 1
      ? `Still open: ${label(open[0])}`
      : `Still open: ${open.map(label).join('  ·  ')}`;
    // Not the day's briefing. It is a hundred and fifty words, it was read on
    // the plan card two minutes ago, and while walking around what the player
    // needs from this banner is where to go. The briefing is a button away —
    // `briefingBtn`, installed by createDay.
    whyEl.textContent = '';
  }

  const statsBody=document.getElementById('statsBody');
  if(statsBody && document.getElementById('statsOverlay')?.classList.contains('show')) renderStats();
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
      <div style="background:#f7f0dc;border:1px solid #dccb9f;border-radius:10px;padding:12px;text-align:center"><div style="font:900 .7rem Inter,sans-serif;color:#9a741d;letter-spacing:.08em">DIRECTOR FUNDS</div><div style="font:800 1.6rem Georgia,serif">$${fmt(state.reserve)}</div><div style="font-size:.7rem;color:#666158">Hints $${HINT_COST} · Answer again $${RETRY_COST} · Funding $${FUND_COST} per 1%</div><div style="font-size:.7rem;color:#666158;margin-top:2px">Earned by talking to people — $${PASSAGE_REWARD} each</div></div>
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
