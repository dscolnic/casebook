import * as THREE from 'three';
import { passageHTML, bindPassage } from '../../../gamekit/engine/core/personQuiz.js';
import { initWorld, scene, renderer, updateWorldFromState, centralBoardMesh, getBuildingPosition } from './world.js';
import { initPlayer, controls, camera, updatePlayer, getPosition, teleport } from './player.js';
import { updateInteractions, getCurrentTarget } from './interactions.js';
import { LEADERS } from './leaders.js';
import { GROUP_DEFS } from './divisions.js';
import { MISSION_DEFS } from './missions.js';
import { getState, setState, save, load, createFresh, fundSelected, fundAllSelected, advanceWeek, visitBuildingCost, walkCost, advanceTime, getNextMissionStop, isNextBuilding, jumpToMission, completeSpecialRequest } from './gameState.js';
import { openVisit, openPersonVisit, openSpecialRequest, closeModal } from './questionUI.js';
import { updateHUD, renderEndScreen, renderStats } from './dashboard.js';
import { readiness, forecastReadiness, forecastMoney, getCurrentMission, missionStopForGroup, completedMissionStops, nextMissionStopIndex, missionComplete, isPersonStopForIdx, CHARACTER_DIVISION, isSpecialRequestActive, getSpecialRequest } from './simulation.js';
import { esc, fmt } from './utils.js';
import { formatTime, timeToDay, TOTAL_DAYS, TOTAL_HOURS } from './time.js';
import { updateDayNight } from './world.js';
import { spawnNPCs, updateNPCs, pauseNPC, getNPCForDivision, getNPCByCharId, getNPCs } from './npcs.js';
import { getWaypointMesh, setWaypointPosition, getRoomEntry } from './world.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { getPersonIdForStop } from './simulation.js';

window.addEventListener('error', e=>{ console.error('[Hospital]', e.message, e.error); try{ const so=document.getElementById('setupOverlay'); if(so){so.classList.add('hidden'); so.style.display='none';} }catch{} });
const canvas=document.getElementById('canvas');
const promptEl=document.getElementById('prompt');
const blocker=document.getElementById('blocker');
const interiorOverlay=document.getElementById('interiorOverlay');
const interiorCard=document.getElementById('interiorCard');
const setupOverlay=document.getElementById('setupOverlay');
const dashboardOverlay=document.getElementById('dashboardOverlay');
const mapOverlay=document.getElementById('mapOverlay');
const miniMapEl=document.getElementById('miniMap');
const fallbackTown=document.getElementById('fallbackTown');

let rafId=null;
let clock=new THREE.Clock();
let interiorMode=null; // { id, returnPos }
let isFallback=false;

// ——— Init world & player ———
try{ initWorld(canvas); }catch(e){ console.error('[Hospital] initWorld failed', e, e.stack); const el=document.getElementById('errorOverlay'); if(el){el.style.display='block'; el.textContent='[initWorld] '+e.message+'\n'+e.stack} }
try{ initPlayer(canvas, scene, renderer); }catch(e){ console.error('[Hospital] initPlayer failed', e, e.stack); const el=document.getElementById('errorOverlay'); if(el){el.style.display='block'; el.textContent='[initPlayer] '+e.message+'\n'+e.stack} }

// HUD initial
function showBlocker(show){
  if(show) blocker.classList.add('show'); else blocker.classList.remove('show');
}
showBlocker(true);

// ——— Setup overlay: assignments ———
function avatarSvg(id, size='small'){
  // reuse simple avatar from original or fallback to initial
  const colors={bethe:'#315c78',bacher:'#4b775f',kennedy:'#8a6921',parsons:'#865044',kistiakowsky:'#704f88',fermi:'#315c78',vonneumann:'#704f88'};
  const c=colors[id]||'#315c78';
  const sizePx=size==='large'?72:size==='tiny'?32:42;
  return `<div style="width:${sizePx}px;height:${sizePx}px;border-radius:10px;background:${c};color:#fff;display:grid;place-items:center;font:900 ${Math.round(sizePx*0.38)}px Georgia,serif">${esc(id[0].toUpperCase())}</div>`;
}

function renderSetup(){
  const assignGrid=document.getElementById('assignGrid');
  const roster=document.getElementById('roster');
  if(!assignGrid) return;
  const options=LEADERS.map(l=>`<option value="${l.id}">${esc(l.name)}</option>`).join('');
  assignGrid.innerHTML=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px">${GROUP_DEFS.map(d=>`<div style="border:1px solid #d9d2c5;border-radius:12px;padding:12px;background:#fff"><div style="font-size:.67rem;font-weight:900;color:${d.color};letter-spacing:.08em">${d.code} Division</div><div style="font-family:Georgia,serif;font-weight:800;margin:4px 0">${esc(d.name)}</div><div style="font-size:.72rem;color:#666158;min-height:32px">${esc(d.desc)}</div><div style="font-size:.68rem;margin-top:6px"><b>Budget $${d.budget}</b></div><select class="leaderSelect" data-group="${d.id}" style="width:100%;margin-top:8px;padding:8px;border:1px solid #d9d2c5;border-radius:8px">${options}</select><div class="leaderPreview" id="preview-${d.id}" style="margin-top:8px;padding-top:8px;border-top:1px solid #d9d2c5;min-height:58px;font-size:.72rem;color:#666158"></div></div>`).join('')}</div>`;
  GROUP_DEFS.forEach(d=>{
    const s=document.querySelector(`select[data-group="${d.id}"]`);
    if(s) s.value=d.defaultLeader;
  });
  document.querySelectorAll('.leaderSelect').forEach(s=> s.addEventListener('change', validateAssignments));
  roster.innerHTML=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px">${LEADERS.map(l=>`<div style="border:1px solid #d9d2c5;border-radius:10px;padding:10px;background:#faf8f2"><div style="display:flex;gap:8px;align-items:center"><div>${avatarSvg(l.id,'tiny')}</div><div><strong style="font-family:Georgia,serif;font-size:.86rem">${esc(l.name)}</strong><div style="font-size:.68rem;color:#666158">${esc(l.role)}</div></div></div><div style="margin-top:6px;font-size:.68rem">Science ${'★'.repeat(l.science)}${'☆'.repeat(5-l.science)}<br>Management ${'★'.repeat(l.management)}${'☆'.repeat(5-l.management)}<div style="margin-top:6px;color:#666158">${esc(l.trait)}</div></div></div>`).join('')}</div>`;

  // saved box — hospital only, validated against GROUP_DEFS
  const savedRaw=localStorage.getItem('hospitalHeroes_juniorDoctor_v1');
  const savedBox=document.getElementById('savedBox');
  if(savedRaw){
    try{
      const parsed=JSON.parse(savedRaw);
      if(parsed && parsed.status==='playing'){
        const wk=parsed.week||1;
        const rd=Math.round((function(){
          // estimate readiness quickly: average milestone progress
          if(!parsed.groups) return 0;
          let t=0; parsed.groups.forEach(g=>{ t+= (g.milestone/4)*100; }); return t/parsed.groups.length;
        })());
        savedBox.classList.remove('hidden');
        savedBox.innerHTML=`<div><b>Saved game found</b><div style="font-size:.76rem;color:#666158">Week ${wk} · ~${rd}% readiness</div></div><button class="btn blue" id="continueBtn" type="button">Continue</button>`;
        const btn=document.getElementById('continueBtn');
        if(btn) btn.onclick=()=>{
          try{
            const s=JSON.parse(savedRaw);
            const validIds=new Set(GROUP_DEFS.map(d=>d.id));
            const ok=s && Array.isArray(s.groups) && s.groups.length===GROUP_DEFS.length && s.groups.every(g=>validIds.has(g.id));
            if(!ok) throw new Error('incompatible save');
            localStorage.setItem('hospitalHeroes_juniorDoctor_v1', JSON.stringify(s));
            setState(s);
            setupOverlay.classList.add('hidden');
            showBlocker(true);
            startGameLoop();
          }catch{ localStorage.removeItem('hospitalHeroes_juniorDoctor_v1'); autoAssignAndStart(); }
        };
      } else {
        savedBox.classList.add('hidden');
      }
    }catch(e){ savedBox.classList.add('hidden'); }
  } else {
    const sb=document.getElementById('savedBox');
    if(sb) sb.classList.add('hidden');
  }
  validateAssignments();
}
function validateAssignments(){
  const sels=[...document.querySelectorAll('.leaderSelect')];
  const ids=sels.map(s=>s.value);
  const dup=ids.some((x,i)=>ids.indexOf(x)!==i);
  sels.forEach(s=>{
    const l=LEADERS.find(x=>x.id===s.value);
    const prev=document.getElementById('preview-'+s.dataset.group);
    if(prev && l) prev.innerHTML=`<div style="display:flex;gap:8px;align-items:flex-start"><div>${avatarSvg(l.id,'tiny')}</div><div><b>${esc(l.name)}</b><br><span>Science ${'★'.repeat(l.science)}${'☆'.repeat(5-l.science)}</span><br><span>Management ${'★'.repeat(l.management)}${'☆'.repeat(5-l.management)}</span></div></div>`;
  });
  const val=document.getElementById('validation');
  const btn=document.getElementById('startBtn');
  if(val) val.textContent=dup?'Each division needs a different leader.':'';
  if(btn) btn.disabled=dup;
}
function autoAssignAndStart(){
  const assign={};
  GROUP_DEFS.forEach(d=> assign[d.id]=d.defaultLeader);
  createFresh(assign);
  setupOverlay.classList.add('hidden');
  showBlocker(true);
  startGameLoop();
}
// Hospital Heroes: no opening screen — auto-enter directly into hospital
function isValidHospitalSave(s){
  if(!s || !Array.isArray(s.groups)) return false;
  if(s.groups.length!==GROUP_DEFS.length) return false;
  const valid=new Set(GROUP_DEFS.map(d=>d.id));
  return s.groups.every(g=>valid.has(g.id));
}
function enterHospital(){
  setupOverlay.classList.add('hidden');
  setupOverlay.style.display='none';
  const savedRawAlways = localStorage.getItem('hospitalHeroes_juniorDoctor_v1');
  if(savedRawAlways){
    try{
      const s=JSON.parse(savedRawAlways);
      if(!isValidHospitalSave(s)) throw new Error('incompatible save');
      setState(s);
      if(!s.timeHours) s.timeHours=8;
      if(!s.week) s.week=1;
      showBlocker(true);
      startGameLoop();
      return;
    }catch(e){
      console.warn('[Hospital] saved load failed, resetting', e);
      try{ localStorage.removeItem('hospitalHeroes_juniorDoctor_v1'); }catch{}
    }
  }
  autoAssignAndStart();
}
// hide setup immediately and render it hidden for fallback only
setupOverlay.classList.add('hidden');
setupOverlay.style.display='none';
try{ renderSetup(); }catch(e){ console.warn('[Hospital] renderSetup failed', e); }
// Fallback: if setup somehow shown, Start Shift 1 just enters
const _startBtn=document.getElementById('startBtn');
if(_startBtn) _startBtn.onclick=()=>{ try{ enterHospital(); }catch(e){ console.error('[Hospital] Start failed', e); try{ autoAssignAndStart(); }catch(e2){ console.error(e2); try{ setupOverlay.classList.add('hidden'); setupOverlay.style.display='none'; showBlocker(true); }catch{} } } };
try{
  enterHospital();
}catch(e){
  console.error('[Hospital] enterHospital failed', e, e.stack);
  try{ localStorage.removeItem('hospitalHeroes_juniorDoctor_v1'); }catch{}
  try{
    setupOverlay.classList.add('hidden'); setupOverlay.style.display='none';
    autoAssignAndStart();
  }catch(e2){
    console.error('[Hospital] autoAssign failed', e2, e2.stack);
    try{ showBlocker(true); }catch{}
  }
}

// ——— People ———
function ensurePeople(){
  try{ spawnNPCs(26); }catch(e){ console.warn('NPC spawn failed', e); }
}
// ——— Game loop ———
function startGameLoop(){
  updateHUD();
  updateWorldFromState();
  ensurePeople();
  // position player at plaza
  teleport(new THREE.Vector3(0,1.7,14));
  if(!rafId) animate();
}

function animate(){
  rafId=requestAnimationFrame(animate);
  const delta=Math.min(0.05, clock.getDelta());
  const state=getState();
  if(!interiorMode && !dashboardOverlay.classList.contains('show') && !document.getElementById('overlay').classList.contains('show')){
    updatePlayer(delta);
    // ticking clock — constant rate, not tied to walking (week is mission index, not time-derived)
    if(state && state.status==='playing'){
      const idleRate = 0.012;
      const tick = delta * idleRate;
      if(tick>0){
        state.timeHours = Math.min(TOTAL_HOURS, state.timeHours + tick);
        if(state.timeHours>=TOTAL_HOURS) state.status='lost';
      }
    }
    // time is constant — walking no longer speeds clock
    if(state) updateDayNight();
  }
  if(!interiorMode){
    updateInteractions(promptEl);
    try{ updateNPCs(delta, getPosition()); }catch(e){}
    // waypoint: special fourth meeting takes priority, otherwise assigned person if next stop is person-type
    try{
      if(state && isSpecialRequestActive(state)){
        const req=getSpecialRequest(state.week);
        const npc=req ? getNPCByCharId(req.personId) : null;
        if(npc){
          setWaypointPosition(npc.pos.x, npc.pos.z);
          const wp=getWaypointMesh();
          if(wp) wp.visible=true;
        }
      } else {
        const nextIdx=nextMissionStopIndex(state);
        if(state && nextIdx>=0 && isPersonStopForIdx(state, nextIdx)){
          const pid=getPersonIdForStop(state, nextIdx);
          const npc=pid ? getNPCByCharId(pid) : null;
          const fallback=getCurrentMission(state)?.stops[nextIdx] ? getNPCForDivision(getCurrentMission(state).stops[nextIdx].group) : null;
          const target=npc||fallback;
          if(target){
            setWaypointPosition(target.pos.x, target.pos.z);
            const wp=getWaypointMesh();
            if(wp) wp.visible=true;
          }
        }
      }
    }catch(e){}
  } else {
    promptEl.classList.add('hidden');
  }
  updateMiniMap();
  // Running clock — update every frame for smooth ticking
  if(state){
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
    // throttle heavier HUD updates
    if(Math.random()<0.02) updateHUD();
  }
  renderer.render(scene, camera);
}

function updateMiniMap(){
  if(mapOverlay.classList.contains('hidden')) return;
  const p=getPosition();
  let dot=document.getElementById('youDot');
  if(!dot){
    dot=document.createElement('div');
    dot.id='youDot';
    dot.className='miniDot';
    dot.style.background='#d4a017';
    dot.textContent='You';
    dot.style.zIndex='5';
    miniMapEl.appendChild(dot);
  }
  const x=(p.x+55)/110*200;
  const z=(p.z+55)/110*200;
  dot.style.left=(x-7)+'px';
  dot.style.top=(z-7)+'px';
  if(!miniMapEl._built){
    GROUP_DEFS.forEach(d=>{
      const data={TRI:[100,20],RESP:[20,100],NUTR:[180,100],MOVE:[60,170],BRAIN:[140,170],DEF:[100,100]}[d.id] || [100,100];
      const bd=document.createElement('div');
      bd.className='miniDot';
      bd.style.left=(data[0]-7)+'px'; bd.style.top=(data[1]-7)+'px';
      bd.style.background=d.color;
      bd.textContent=d.code;
      bd.title=d.name;
      miniMapEl.appendChild(bd);
    });
    miniMapEl._built=true;
  }
  // NPC dot — only the target person (special fourth meeting takes priority)
  const state=getState();
  miniMapEl.querySelectorAll('.npcDot').forEach(el=>el.remove());
  const oldArr=document.getElementById('targetArrow');
  if(oldArr) oldArr.remove();
  let target=null;
  let isSpecial=false;
  if(state && isSpecialRequestActive(state)){
    const req=getSpecialRequest(state.week);
    target=req ? getNPCByCharId(req.personId) : null;
    isSpecial=true;
  } else {
    const nextIdx=state?nextMissionStopIndex(state):-1;
    const isPersonNext = state && nextIdx>=0 && isPersonStopForIdx(state, nextIdx);
    const targetPid = isPersonNext ? getPersonIdForStop(state, nextIdx) : null;
    target = targetPid ? getNPCByCharId(targetPid) : null;
    isSpecial=false;
  }
  if(target){
    try{
      const nd=document.createElement('div');
      nd.className='miniDot npcDot';
      nd.style.left=((target.pos.x+55)/110*200-7)+'px';
      nd.style.top=((target.pos.z+55)/110*200-7)+'px';
      nd.style.width='14px'; nd.style.height='14px'; nd.style.borderRadius='50%';
      nd.style.border='2px solid #fff';
      nd.style.background=isSpecial?'#9a741d':'#315c78';
      nd.style.boxShadow=`0 0 0 2px ${isSpecial?'#9a741d':'#315c78'}, 0 0 8px ${isSpecial?'#9a741d':'#315c78'}`;
      nd.style.zIndex='4';
      nd.style.fontSize='7px'; nd.style.color='#fff'; nd.style.display='grid'; nd.style.placeItems='center';
      nd.textContent='★';
      nd.title=`${target.char.name} [${target.division}] — NEXT → ${isSpecial?'Fourth meeting':'Find this person'}`;
      miniMapEl.appendChild(nd);
      const arr=document.createElement('div');
      arr.id='targetArrow';
      arr.style.position='absolute'; arr.style.pointerEvents='none';
      arr.style.fontSize='14px'; arr.style.color=isSpecial?'#9a741d':'#315c78'; arr.textContent='↓';
      arr.style.left=((target.pos.x+55)/110*200-6)+'px';
      arr.style.top=((target.pos.z+55)/110*200-18)+'px';
      miniMapEl.appendChild(arr);
    }catch(e){}
  }
}

// ——— Interactions ———
window.addEventListener('keydown', (e)=>{
  if(e.code==='KeyE'){
    // if overlay open, ignore
    if(document.getElementById('overlay').classList.contains('show')) return;
    if(dashboardOverlay.classList.contains('show')) return;
    if(setupOverlay && !setupOverlay.classList.contains('hidden')) return;
    if(interiorMode){
      // interior: check for desk/leader interaction
      // For now interior card has Visit button
      return;
    }
    const target=getCurrentTarget();
    if(!target) return;
    if(target.type==='board'){
      openDashboard();
    } else if(target.type==='door'){
      walkIntoRoom(target.id);
    } else if(target.type==='case'){
      enterBuilding(target.id);
    } else if(target.type==='roomexit'){
      stepOutToCorridor(target.id);
    } else if(target.type==='info' || target.type==='npc'){
      if(target.type==='npc'){
        pauseNPC(target.char.id, 8);
        const st=getState();
        // Special fourth meeting takes priority — must match that exact person
        if(st && isSpecialRequestActive(st)){
          const req=getSpecialRequest(st.week);
          if(req && target.char.id===req.personId){
            const npcObj=getNPCByCharId(req.personId) || {char:target.char, division: req.division};
            const before=document.getElementById('overlay')?.classList.contains('show');
            const opened=openSpecialRequest(npcObj);
            const after=document.getElementById('overlay')?.classList.contains('show');
            if(opened || (after && !before)) return;
          }
          // if special active but wrong person, fall through to bio
        } else {
          const nextIdx=st?nextMissionStopIndex(st):-1;
          const isPerson = st && nextIdx>=0 && isPersonStopForIdx(st, nextIdx);
          const pid = isPerson ? getPersonIdForStop(st, nextIdx) : null;
          const expectedDiv = isPerson ? getCurrentMission(st)?.stops[nextIdx]?.group : null;
          const npcDiv = target.char.division || CHARACTER_DIVISION[target.char.id] || 'TRI';
          const isCorrectPerson = isPerson && (target.char.id===pid || npcDiv===expectedDiv);
          if(isCorrectPerson){
            const npcObj=getNPCByCharId(target.char.id) || getNPCs().find(n=>n.char.id===target.char.id);
            const before=document.getElementById('overlay')?.classList.contains('show');
            openPersonVisit(npcObj || {char:target.char, division: npcDiv});
            const after=document.getElementById('overlay')?.classList.contains('show');
            if(after && !before) return;
          }
        }
      }
      const isNpc=target.type==='npc';
      const info=target.info || 'Historic Los Alamos.';
      const titleEl=document.getElementById('modalTitle');
      const bodyEl=document.getElementById('modalBody');
      const eye=document.getElementById('modalEyebrow');
      if(titleEl) titleEl.textContent=isNpc ? target.char.name : target.id;
      if(eye) eye.textContent=isNpc ? target.char.role : 'Historic Los Alamos — 1943-45';
      if(bodyEl) bodyEl.innerHTML=`<div style="display:flex;gap:12px;align-items:start"><div style="width:64px;height:64px;border-radius:50%;background:${isNpc?target.char.color:'#9a741d'};display:grid;place-items:center;color:#fff;font:900 22px Georgia,serif">${isNpc?target.char.name[0]: '▣'}</div><div style="flex:1"><div id="hospBio" style="padding:10px 12px;border-left:4px solid #9a741d;background:#f7f0dc;font-size:.88rem;line-height:1.5">${info}</div>${isNpc?`<div style="font-size:.74rem;color:#666158;margin-top:8px">They walk the town — watch their nameplate, then press E to talk. ${target.char.id==='fuchs' || target.char.id==='hall' || target.char.id==='greenglass' ? 'Their wartime choices echo post-war secrecy debates.' : target.char.id==='woods' || target.char.id==='hinton' || target.char.id==='hornig' || target.char.id==='mayer' || target.char.id==='wu' || target.char.id==='graves' ? 'Women’s work was often uncredited — this game recenters it.' : ''}</div>`: `<div style="font-size:.74rem;color:#666158;margin-top:10px">Walk the town to find Fuller Lodge, Ashley Pond, Sundt row, dorms, theater, PX, chapel — the real 1943-45 footprint was linear along Trinity Drive, not a square. Tech Area (your 5 labs) lay just south of the canyon rim.</div>`}</div></div><div style="margin-top:12px"><button class="btn primary" id="closeInfoBtn">Continue exploring</button></div>`;
      document.getElementById('overlay').classList.add('show');
      if(document.pointerLockElement) document.exitPointerLock();
      // One question about what they just told you, worth a dollar. Their own
      // bio block is the passage, so the gate closes that rather than drawing
      // a second copy of it.
      if(isNpc && bodyEl){
        const holder=document.createElement('div');
        holder.innerHTML=passageHTML(target.char, { ownBio:false });
        bodyEl.insertBefore(holder, bodyEl.lastElementChild);
        bindPassage(bodyEl, target.char, null, { textEl: document.getElementById('hospBio') });
      }
      setTimeout(()=>{ const b=document.getElementById('closeInfoBtn'); if(b) b.onclick=()=> document.getElementById('overlay').classList.remove('show'); }, 0);
    }
  }
  if(e.code==='KeyM'){
    e.preventDefault();
    toggleMap();
  }
  if(e.code==='Tab'){
    e.preventDefault();
    toggleTab();
  }
});

// Blocker enter
document.getElementById('enterTownBtn').onclick=()=>{
  showBlocker(false);
  controls.lock();
};
document.getElementById('blocker').onclick=(e)=>{
  if(e.target===blocker) { showBlocker(false); controls.lock(); }
};

// ——— Dashboard ———
function openDashboard(){
  const state=getState();
  if(!state) return;
  const body=document.getElementById('dashboardBody');
  const forecast=forecastReadiness(state);
  const moneyForecast=forecastMoney(state);
  const curMission=getCurrentMission(state);
  const done=completedMissionStops(state);
  const nextIdx=nextMissionStopIndex(state);
  const isComplete=missionComplete(state);
  // Build HTML — mission header
  let html=`<div style="margin-bottom:12px;padding:12px 14px;border-left:5px solid #9a741d;background:#f7f0dc;border-radius:10px">
    <div style="font:900 .72rem Inter,sans-serif;letter-spacing:.08em;color:#9a741d">MISSION ${state.week} OF 15${curMission?' — '+esc(curMission.title.toUpperCase()):''}</div>
    ${curMission?`<div style="font:800 1.05rem Georgia,serif;margin:2px 0">${esc(curMission.title)}</div><div style="font-size:.78rem;color:#4b463d">${esc(curMission.briefing.slice(0,220))}…</div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${curMission.stops.map((s,i)=>{
      const isDone=done.includes(i);
      const isNext=i===nextIdx;
      const bg=isDone?'#3d6f52':isNext?'#315c78':'#fff';
      const fg=isDone||isNext?'#fff':'#666158';
      return `<span style="background:${bg};color:${fg};border:1px solid #d9d2c5;border-radius:999px;padding:3px 8px;font-size:.66rem;font-weight:800">${isDone?'✓ '+(i+1):(i+1)+'. '+esc(s.group)}${isNext?' → next':''}</span>`;
    }).join('')}<span style="font-size:.7rem;color:#666158;margin-left:6px">${done.length}/${curMission.stops.length} stops complete</span></div>`:''}
    <div style="font-size:.78rem;color:#666158;margin-top:6px">Overall ${Math.round(readiness(state))}% → ${Math.round(forecast.overall)}% projected · Director $${fmt(state.reserve)} → $${fmt(moneyForecast.director)} ${isComplete?'<b style="color:#3d6f52">· Mission ready to complete</b>':`· ${curMission?curMission.stops.length - done.length:0} more stop(s) required`}</div>
  </div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
      <button class="btn small" id="dashFundOne" type="button" ${!state.selectedGroup?'disabled':''}>Fund +1% · $1</button>
      <button class="btn small" id="dashFundFive" type="button" ${!state.selectedGroup||state.reserve<5?'disabled':''}>Fund +5% · $5</button>
      <button class="btn small" id="dashFundAll" type="button" ${!state.selectedGroup?'disabled':''}>Use all funds</button>
      <button class="btn primary small" id="dashEndWeek" type="button" ${!isComplete?'disabled style="opacity:.45"':''}>${isComplete?`Complete Mission ${state.week}`:`Complete ${curMission?curMission.stops.length - done.length:0} more stop(s)`}</button>
    </div>`;
  html+=`<div style="display:grid;gap:8px">`+state.groups.map(gs=>{
    const d=GROUP_DEFS.find(x=>x.id===gs.id);
    const m=d.milestones[gs.milestone];
    const pct=Math.round((()=>{
      if(gs.milestone>=d.milestones.length) return 100;
      const mm=d.milestones[gs.milestone];
      return 100*(gs.milestone + (Math.min(1,gs.funded/mm.cost)+Math.min(1,gs.workDone/mm.work))/2)/d.milestones.length;
    })());
    const proj=forecast.perGroup.find(p=>p.id===gs.id);
    const projPct=proj?Math.round(proj.pct):pct;
    const moneyRow=moneyForecast.perGroup.find(p=>p.id===gs.id);
    const selected=state.selectedGroup===gs.id;
    return `<div style="border:1px solid #d9d2c5;border-left:6px solid ${d.color};border-radius:12px;padding:10px;background:${selected?'#f7f0dc':'#fff'};cursor:pointer" data-select="${gs.id}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
        <div style="display:flex;gap:8px;align-items:center"><div style="width:32px;height:32px;border-radius:8px;background:${d.color}22;color:${d.color};display:grid;place-items:center;font:900 .9rem Georgia,serif">${d.code}</div><div><div style="font-weight:800">${esc(d.name)}</div><div style="font-size:.72rem;color:#666158">${m?esc(m.name):'Complete'}${gs.issue?` · <span style="color:#9a3f36">Issue: ${esc(gs.issue)}</span>`:''}</div></div></div>
        <div style="text-align:right"><div style="font-size:.72rem;color:#666158">Readiness</div><div style="font:800 .95rem Inter,sans-serif">${pct}% → ${projPct}%</div><div style="font-size:.72rem;color:#666158">Budget $${fmt(gs.budgetRemaining)} → $${fmt(moneyRow.remaining)}</div></div>
      </div>
      <div style="margin-top:8px;height:8px;background:#e8e2d7;border-radius:99px;overflow:hidden;display:flex"><div style="width:${pct}%;background:${d.color}"></div><div style="width:${Math.max(0,projPct-pct)}%;background:${d.color};opacity:.35"></div></div>
      <div style="margin-top:6px;font-size:.68rem;color:#666158">Select building to direct funds · Issue risk ${(() => { const l=LEADERS.find(x=>x.id===gs.leaderId); const p=Math.min(0.24,Math.max(0.025,0.03+0.025*d.difficulty+0.01*gs.milestone-0.018*l.science)); return p<.09?'Low':p<.15?'Moderate':'High'; })()}</div>
    </div>`;
  }).join('')+`</div>`;
  html+=`<div style="margin-top:10px;padding:10px;background:#faf8f2;border:1px solid #d9d2c5;border-radius:10px;font-size:.74rem;color:#666158">Selected project: <b id="dashSelected">${state.selectedGroup?GROUP_DEFS.find(x=>x.id===state.selectedGroup).name:'None'}</b> · Click a building row to select it for funding. Hints ($2) and retries ($3) are inside visits.</div>`;
  html+=`<div style="margin-top:10px"><div style="font:800 .92rem Georgia,serif">Recent developments</div><div style="max-height:140px;overflow:auto;display:grid;gap:6px;margin-top:6px">`+state.log.slice(-12).reverse().map(e=>`<div style="font-size:.72rem;border-left:3px solid #d9d2c5;padding-left:8px;color:#666158"><b style="color:#1b1a17">Week ${e.week}</b> ${esc(e.text)}</div>`).join('')+`</div></div>`;
  body.innerHTML=html;
  dashboardOverlay.classList.add('show');
  if(controls.isLocked) controls.unlock();
  // bind
  body.querySelectorAll('[data-select]').forEach(el=>{
    el.onclick=()=>{
      const id=el.dataset.select;
      const st=getState(); st.selectedGroup=id; save(); updateHUD(); updateWorldFromState();
      // re-render to show selection
      openDashboard();
    };
  });
  const b1=document.getElementById('dashFundOne');
  if(b1) b1.onclick=()=>{ fundSelected(1); updateHUD(); updateWorldFromState(); openDashboard(); checkWin(); };
  const b5=document.getElementById('dashFundFive');
  if(b5) b5.onclick=()=>{ fundSelected(5); updateHUD(); updateWorldFromState(); openDashboard(); };
  const ball=document.getElementById('dashFundAll');
  if(ball) ball.onclick=()=>{ fundAllSelected(); updateHUD(); updateWorldFromState(); openDashboard(); checkWin(); };
  const be=document.getElementById('dashEndWeek');
  if(be){
    be.onclick=()=>{
      const res=advanceWeek();
      if(res==='blocked'){ return; }
      updateHUD(); updateWorldFromState(); updateDayNight();
      if(res==='won'){ dashboardOverlay.classList.remove('show'); renderEndScreen(); showBlocker(false); }
      else { openDashboard(); }
    };
  }
}
function closeDashboard(){
  dashboardOverlay.classList.remove('show');
}
document.getElementById('dashboardClose').onclick=closeDashboard;
dashboardOverlay.onclick=(e)=>{ if(e.target===dashboardOverlay) closeDashboard(); };

// ——— Building interior ———
/**
 * Walk the player through the doorway and turn them to face the case stand.
 * The rooms are real space now, so entering one is a move, not a menu — the
 * science challenge starts from the chart inside.
 */
function walkIntoRoom(id){
  const entry = getRoomEntry(id);
  if(!entry){ enterBuilding(id); return; }   // fall back to the old flow
  // face away from the corridor, i.e. into the room
  const yaw = entry.x > 0 ? Math.PI / 2 : -Math.PI / 2;
  teleport(new THREE.Vector3(entry.x, 1.7, entry.z), yaw);
}
/** Step back out of a room, facing up the corridor. */
function stepOutToCorridor(id){
  const entry = getRoomEntry(id);
  if(!entry) return;
  const x = entry.x > 0 ? 1.0 : -1.0;
  teleport(new THREE.Vector3(x, 1.7, entry.z), 0);
}
function enterBuilding(id){
  const state=getState();
  if(!state) return;
  // Skip readiness/mission screen — go straight to the question (building = like field person)
  const bpos=getBuildingPosition(id);
  const dist = bpos ? getPosition().distanceTo(bpos) : 48;
  walkCost(dist);
  visitBuildingCost();
  updateHUD(); updateWorldFromState(); updateDayNight();
  if(controls.isLocked) controls.unlock();
  openVisit(id);
}
function showInterior(id){
  const state=getState();
  const gs=state.groups.find(g=>g.id===id);
  const d=GROUP_DEFS.find(x=>x.id===id);
  const l=LEADERS.find(x=>x.id===gs.leaderId);
  const curMission=getCurrentMission(state);
  const stop=missionStopForGroup(state, id);
  const nextStop=getNextMissionStop();
  const nextIdx=nextMissionStopIndex(state);
  const doneList=completedMissionStops(state);
  const isNext = nextStop && nextStop.group===id;
  const isLocked = !!nextStop && !isNext && !!stop && !doneList.includes(stop.index);
  const isDoneStop = stop ? doneList.includes(stop.index) : false;
  const nextGroup = nextStop ? GROUP_DEFS.find(x=>x.id===nextStop.group) : null;
  const pct=Math.round((()=>{
    if(gs.milestone>=d.milestones.length) return 100;
    const m=d.milestones[gs.milestone];
    return 100*(gs.milestone+(Math.min(1,gs.funded/m.cost)+Math.min(1,gs.workDone/m.work))/2)/d.milestones.length;
  })());
  const missionLockHTML = (isLocked || (stop && !isNext && !isDoneStop)) ? `<div style="margin-top:12px;padding:10px 12px;border:1px dashed #d9d2c5;border-radius:10px;background:#faf8f2;font-size:.78rem;color:#666158"><b style="color:#9a3f36">Mission lock:</b> This building is not the next stop. Next: <b style="color:#315c78">${nextGroup?esc(nextGroup.name):'?'} — ${nextStop?esc(nextStop.task):''}</b>. Follow the blue beacon to advance <b>Mission ${state.week}: ${curMission?esc(curMission.title):''}</b>. You can still add Director funds here, but the science challenge is at the next building.</div>` : (curMission ? `<div style="margin-top:12px;padding:10px 12px;border-left:4px solid #9a741d;background:#f7f0dc;font-size:.78rem"><b>Mission ${state.week} · ${esc(curMission.title)}</b><div style="margin-top:4px;color:#4b463d">${esc(curMission.objective)}</div><div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">${curMission.stops.map((s,i)=>{
    const done=doneList.includes(i);
    const cur=i===nextIdx;
    const bg=done?'#3d6f52':cur?'#315c78':'#fff';
    const fg=done||cur?'#fff':'#666158';
    return `<span style="background:${bg};color:${fg};border:1px solid #d9d2c5;border-radius:999px;padding:3px 8px;font-size:.66rem;font-weight:800">${i+1}. ${esc(s.group)} — ${esc(s.task)}${done?' ✓':cur?' → next':''}</span>`;
  }).join('')}</div></div>` : '');
  const interiorHTML=`
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:start">
      <div style="display:flex;gap:12px;align-items:center"><div style="width:56px;height:56px;border-radius:12px;background:${d.color};color:#fff;display:grid;place-items:center;font:900 1.2rem Georgia,serif">${d.code}</div><div><h2 style="font-family:Georgia,serif;margin:0;font-size:1.25rem">${esc(d.name)}</h2><div style="font-size:.76rem;color:#666158">Led by ${esc(l.name)} · Science ${l.science}/5 · Management ${l.management}/5</div><div style="margin-top:6px"><span style="background:#f7f0dc;border:1px solid #dccb9f;border-radius:999px;padding:4px 8px;font-size:.7rem;font-weight:800">Readiness ${pct}%</span> <span style="background:#e8f0f4;border:1px solid #c8d7df;border-radius:999px;padding:4px 8px;font-size:.7rem;font-weight:800">Director $${fmt(state.reserve)}</span> ${isNext?'<span style="background:#e8f0f4;border:1px solid #315c78;border-radius:999px;padding:4px 8px;font-size:.7rem;font-weight:800;color:#315c78">● NEXT STOP</span>':''}</div></div></div>
      <button class="btn ghost small" id="exitInterior" type="button" aria-label="Exit to town" style="width:34px;height:34px;padding:0;border-radius:8px">×</button>
    </div>
    <div style="margin-top:12px;padding:10px 12px;border-left:4px solid #315c78;background:#e8f0f4;font-size:.8rem">${esc(d.desc)}</div>
    ${missionLockHTML}
    <div style="margin-top:12px;padding:12px;background:#faf8f2;border:1px solid #d9d2c5;border-radius:10px">
      <div style="font:800 .92rem Georgia,serif">Laboratory</div>
      <div style="font-size:.78rem;color:#4e4a43;margin-top:6px">${esc(d.desc)} — equipment visible: ${id==='TRI'?'triage cart, clipboard':id==='RESP'?'bed, monitor':id==='NUTR'?'table, jug, fruit':id==='MOVE'?'bench, X-ray':id==='BRAIN'?'chair, eye chart':'sink, soap'}.</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn primary" id="speakLeader" type="button" ${isLocked?'disabled style="opacity:.45;cursor:not-allowed"':''}>E — ${isLocked?'Visit locked — go to '+ (nextGroup?esc(nextGroup.code):'next') : 'Speak with '+esc(l.name)}</button>
        <button class="btn" id="fundInteriorOne" type="button">Fund +1% · $1</button>
        <button class="btn" id="fundInteriorAll" type="button">Use all funds</button>
      </div>
      <div id="interiorStatus" style="margin-top:8px;font-size:.72rem;color:#666158">${gs.issue?`<span style="color:#9a3f36;font-weight:700">Issue open:</span> ${esc(gs.issue)}`:'No open issues.'} · Readiness ${pct}% — ${gs.milestone}/4 milestones${isNext?' · <b style="color:#315c78">Mission stop — correct answer advances campaign</b>':''}</div>
    </div>
    <div style="margin-top:10px;font-size:.7rem;color:#666158">Walk to the blue beacon OR press M for map. The central board shows the mission route and takeaway when a mission completes.</div>
  `;
  interiorCard.innerHTML=interiorHTML;
  interiorOverlay.classList.add('show');
  document.getElementById('exitInterior').onclick=exitInterior;
  document.getElementById('speakLeader').onclick=()=>{
    const bpos=getBuildingPosition(id);
    const dist = bpos ? getPosition().distanceTo(bpos) : 48;
    walkCost(dist);
    visitBuildingCost();
    updateHUD(); updateWorldFromState(); updateDayNight();
    openVisit(id);
  };
  document.getElementById('fundInteriorOne').onclick=()=>{
    if(!getState().selectedGroup) { const s=getState(); s.selectedGroup=id; }
    fundSelected(1); updateHUD(); updateWorldFromState(); showInterior(id);
  };
  document.getElementById('fundInteriorAll').onclick=()=>{
    if(!getState().selectedGroup) { const s=getState(); s.selectedGroup=id; }
    fundAllSelected(); updateHUD(); updateWorldFromState(); showInterior(id);
  };
}
function exitInterior(){
  interiorOverlay.classList.remove('show');
  interiorMode=null;
  // return to previous position slightly offset from door
  // Keep current position near building door
  showBlocker(false);
  // re-lock on click
}

interiorOverlay.onclick=(e)=>{ if(e.target===interiorOverlay) exitInterior(); };

// ——— Map & Tab ———
function toggleMap(){
  mapOverlay.classList.toggle('hidden');
  updateMiniMap();
}
document.getElementById('mapBtn').onclick=toggleMap;
document.getElementById('closeMapBtn').onclick=()=> mapOverlay.classList.add('hidden');

function toggleTab(){
  if(dashboardOverlay.classList.contains('show')){ closeDashboard(); }
  else { openDashboard(); }
}
document.getElementById('tabBtn').onclick=toggleTab;

// Settings
const settingsPanel=document.getElementById('settingsPanel');
document.getElementById('settingsBtn').onclick=()=>{
  const sel=document.getElementById('missionJumpSelect');
  if(sel){
    const st=getState();
    if(st) sel.value=String(st.week);
  }
  settingsPanel.classList.toggle('hidden');
};
document.getElementById('closeSettingsBtn').onclick=()=> settingsPanel.classList.add('hidden');
const missionJumpBtn=document.getElementById('missionJumpBtn');
if(missionJumpBtn){
  missionJumpBtn.onclick=()=>{
    const sel=document.getElementById('missionJumpSelect');
    const v=parseInt(sel?.value||'1',10);
    if(jumpToMission(v)){
      updateHUD(); updateWorldFromState(); updateDayNight();
      settingsPanel.classList.add('hidden');
    }
  };
}
document.getElementById('sensRange').oninput=(e)=>{
  // PointerLockControls sensitivity via look speed is not directly configurable; we store and apply on mousemove
  // For simplicity, adjust controls via custom factor (not needed for MVP)
};
document.getElementById('highContrast').onchange=(e)=>{
  document.body.classList.toggle('highContrast', e.target.checked);
};


// Reduced motion
const rmEl=document.getElementById('reducedMotion');
if(rmEl){
  rmEl.onchange=(e)=>{
    document.documentElement.style.setProperty('--motion', e.target.checked?'none':'');
    if(e.target.checked) document.body.classList.add('reducedMotion');
    else document.body.classList.remove('reducedMotion');
  };
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) rmEl.checked=true;
}

// Stats button — single source for Director funds + readiness (removed from top toolbar)
const statsBtnEl=document.getElementById('statsBtn');
const statsOverlay=document.getElementById('statsOverlay');
function openStats(){ renderStats(); statsOverlay.classList.add('show'); if(controls.isLocked) controls.unlock(); }
function closeStats(){ statsOverlay.classList.remove('show'); }
if(statsBtnEl){ statsBtnEl.onclick=openStats; }
const statsCloseEl=document.getElementById('statsClose');
if(statsCloseEl) statsCloseEl.onclick=closeStats;
if(statsOverlay) statsOverlay.onclick=(e)=>{ if(e.target===statsOverlay) closeStats(); };

// Fallback - moved to settings; button removed from HUD
// Settings extra: move Reset + 2D Fallback into panel if present
const fallbackBtnEl=document.getElementById('fallbackBtn');
if(fallbackBtnEl){
  fallbackBtnEl.onclick=()=>{
    isFallback=!isFallback;
    if(isFallback){ fallbackTown.classList.remove('hidden'); updateHUD(); }
    else { fallbackTown.classList.add('hidden'); }
  };
}
const resetBtnEl=document.getElementById('resetBtn');
if(resetBtnEl){
  resetBtnEl.onclick=()=>{
    if(!confirm('Reset the Project Y game and erase local progress?')) return;
    localStorage.removeItem('hospitalHeroes_juniorDoctor_v1');
    localStorage.removeItem('projectY_15mission_v21');
    location.reload();
  };
}
window.addEventListener('projecty:visit', (e)=>{
  const id=e.detail.id;
  if(interiorMode) exitInterior();
  enterBuilding(id);
});

// Reset handled above via resetBtnEl guard

// Global listeners for state changes
window.addEventListener('projecty:statechange', ()=>{
  updateHUD();
  updateWorldFromState();
  checkWin();
});
window.addEventListener('projecty:visitdone', ()=>{
  // after visit, update interior if open
  if(interiorMode){
    showInterior(interiorMode.id);
  }
});

function checkWin(){
  const state=getState();
  if(!state) return;
  if(state.status==='won' || state.status==='lost'){
    renderEndScreen();
    // hide overlays
    interiorOverlay.classList.add('hidden');
    dashboardOverlay.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    // unlock
    if(controls.isLocked) controls.unlock();
    showBlocker(false);
  }
}

// Close modal handlers
document.getElementById('modalClose').onclick=()=> closeModal();
document.getElementById('overlay').onclick=(e)=>{ if(e.target===document.getElementById('overlay')) closeModal(); };
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){
    if(document.getElementById('overlay').classList.contains('show')){ closeModal(); return; }
    if(document.getElementById('statsOverlay')?.classList.contains('show')){ closeStats(); return; }
    if(dashboardOverlay.classList.contains('show')){ closeDashboard(); return; }
    if(interiorOverlay.classList.contains('show')){ exitInterior(); return; }
    if(!mapOverlay.classList.contains('hidden')){ mapOverlay.classList.add('hidden'); return; }
    if(isFallback){ fallbackTown.classList.add('hidden'); isFallback=false; return; }
  }
});

// Mobile fallback: if touch or small screen, show 2D fallback hint
if('ontouchstart' in window || window.innerWidth<900){
  // Keep 3D but offer fallback button prominently; optionally auto-show fallback
  // We do not auto-show, but ensure controls still work
}

// Handle pointer lock error
document.addEventListener('pointerlockerror', ()=>{ /* ignore */ });

// Ensure canvas focus
canvas.addEventListener('click', ()=>{
  if(!setupOverlay.classList.contains('hidden')) return;
  if(interiorOverlay.classList.contains('show')) return;
  if(document.getElementById('overlay').classList.contains('show')) return;
  if(document.getElementById('statsOverlay')?.classList.contains('show')) return;
  if(dashboardOverlay.classList.contains('show')) return;
});

// Initial HUD
updateHUD();
updateWorldFromState();
