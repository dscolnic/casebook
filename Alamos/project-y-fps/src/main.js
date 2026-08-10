import * as THREE from 'three';
import { passageHTML, bindPassage } from '../../gamekit/engine/core/personQuiz.js';
import { initWorld, scene, renderer, updateWorldFromState, centralBoardMesh, getBuildingPosition,
         colliders as worldColliders, interactables as worldInteractables,
         softColliders as worldSoftColliders } from './world.js';
import { terrainHeight } from './env.js';
import { initPlayer, controls, camera, updatePlayer, getPosition, teleport, setGround, setBounds, moveState } from './player.js';
import { updateInteractions, getCurrentTarget } from './interactions.js';
import { LEADERS } from './leaders.js';
import { GROUP_DEFS } from './divisions.js';
import { MISSION_DEFS } from './missions.js';
import { getState, setState, save, load, createFresh, fundSelected, fundAllSelected, advanceWeek, visitBuildingCost, walkCost, advanceTime, getNextMissionStop, isNextBuilding, jumpToMission, completeSpecialRequest, completeMission } from './gameState.js';
import { openVisit, openPersonVisit, openSpecialRequest, closeModal } from './questionUI.js';
import { createInteriors, exposeDebug, createDay } from '../../gamekit/engine/core/app.js';
import { createDriving } from '../../gamekit/engine/world/driving.js';
import { updateHUD, updateDayClock, renderEndScreen, renderStats } from './dashboard.js';
import { readiness, forecastReadiness, forecastMoney, getCurrentMission, missionStopForGroup, completedMissionStops, nextMissionStopIndex, missionComplete, isPersonStopForIdx, CHARACTER_DIVISION, isSpecialRequestActive, getSpecialRequest } from './simulation.js';
import { esc, fmt } from './utils.js';
import { formatTime, timeToDay, TOTAL_DAYS, TOTAL_HOURS } from './time.js';
import { updateDayNight } from './world.js';
import { spawnNPCs, updateNPCs, pauseNPC, getNPCForDivision, getNPCByCharId, getNPCs } from './npcs.js';
import { getWaypointMesh, setWaypointPosition } from './world.js';
import { facingArrowHTML, renderMap } from '../../gamekit/engine/core/map.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import themeManifest from '../theme.js';
import { getPersonIdForStop } from './simulation.js';

const canvas=document.getElementById('canvas');
const promptEl=document.getElementById('prompt');
const blocker=document.getElementById('blocker');
const interiorOverlay=document.getElementById('interiorOverlay');
const interiorCard=document.getElementById('interiorCard');
// The leader-assignment screen is gone; these keep the old call sites honest
// without a null check at every one of them.
const NO_OVERLAY = { classList: { add(){}, remove(){}, contains(){ return true; }, toggle(){} }, style: {} };
const setupOverlay=document.getElementById('setupOverlay') || NO_OVERLAY;
const dashboardOverlay=document.getElementById('dashboardOverlay');
const mapOverlay=document.getElementById('mapOverlay');
const miniMapEl=document.getElementById('miniMap');
const fallbackTown=document.getElementById('fallbackTown');

// Declared up here because startGameLoop() — and therefore animate() — runs
// during module evaluation, long before the interior manager is built.
// ——— Interiors ———————————————————————————————————————————————————————
// A door opens a room. The manager is the engine's: this file had its own copy,
// which is how the same feature ends up subtly different in two games.
const interiors = createInteriors({
  // scene and camera are assigned inside initWorld/initPlayer, which run after
  // this line; the manager resolves them at first entry.
  scene: () => scene, camera: () => camera, theme: themeManifest, def: (id) => GROUP_DEFS.find(g => g.id === id),
  colliders: worldColliders, interactables: worldInteractables,
  player: { getPosition, teleport, setGround, setBounds },
  townGround: () => 0, townBounds: 105,
  onEnter: (id) => {
    // Time is charged for the walk only when this room holds the open case.
    const state = getState();
    const stop = state ? missionStopForGroup(state, id) : null;
    if(stop && stop.index === nextMissionStopIndex(state) && !isPersonStopForIdx(state, stop.index)){
      const bpos = getBuildingPosition(id);
      walkCost(bpos ? getPosition().distanceTo(bpos) : 48);
      visitBuildingCost();
      updateHUD(); updateWorldFromState(); updateDayNight();
    }
  },
});

// ------------------------------------------------------------------- the day
// A mission is a day on the Hill: the plan opens it, the countdown runs it down
// in real time whatever the player is doing, and running out means taking the
// day again.
const day = createDay({
  theme: themeManifest,
  def: (id) => GROUP_DEFS.find(g => g.id === id),
  positionOf: (id) => {
    const p = getBuildingPosition(id);
    return p ? { x: p.x, z: p.z } : null;
  },
  spawn: () => { const p = getPosition(); return { x: p.x, z: p.z }; },
  mapHTML: () => renderMap(),
  ui: {
    open(title, html, actions){
      document.getElementById('modalTitle').textContent = title;
      const eyebrow = document.getElementById('modalEyebrow');
      if(eyebrow) eyebrow.textContent = '';
      document.getElementById('modalBody').innerHTML = html
        + '<div class="modalActions">' + actions.map(a =>
            `<button class="btn ${a.primary ? 'primary' : ''}" id="${a.id}" type="button">${a.label}</button>`).join('') + '</div>';
      document.getElementById('overlay').classList.add('show');
      if(document.pointerLockElement) document.exitPointerLock();
      for(const a of actions){
        const b = document.getElementById(a.id);
        if(b) b.onclick = a.onClick;
      }
    },
    close(){ document.getElementById('overlay').classList.remove('show'); },
  },
  onDayStart: () => { updateHUD(); updateWorldFromState(); updateDayNight(); },
  onDayEnd: (outstanding) => showDayOver(outstanding),
});

function showDayOver(outstanding){
  const state = getState();
  if(outstanding > 0){
    day.ui.open('The day ran out',
      `<div class="briefBox"><p><b>${outstanding} call${outstanding === 1 ? '' : 's'} still open when the light went.</b></p>`
      + '<p>You take the same day again — the calls reopen, the clock refills, and the morning pays an allowance.</p></div>',
      [{ id: 'dayRetry', label: 'Take the day again', primary: true, onClick: () => day.restart() }]);
    return;
  }
  day.ui.open(`Day ${state.week} closed`,
    '<div class="briefBox"><p>Every call made. The divisions write it up overnight.</p></div>',
    [{ id: 'dayNext', label: 'Start the next day', primary: true, onClick: () => {
      const res = completeMission();
      document.getElementById('overlay').classList.remove('show');
      updateHUD(); updateWorldFromState(); updateDayNight();
      if(res !== 'won') day.showPlan();
    } }]);
}

window.addEventListener('projecty:restartday', () => day.restart());


// ——— Driving ———
// The motor pool's jeeps. The Hill is six hundred metres end to end, which is
// why everybody who worked there wanted one.
const driving = createDriving({
  // assigned inside initWorld/initPlayer, after this line
  camera: () => camera,
  colliders: worldColliders,
  softColliders: worldSoftColliders,
  groundHeight: terrainHeight,
  bounds: 105,
  input: () => moveState,
  player: { teleport, getPosition },
});

let rafId=null;
let clock=new THREE.Clock();
let interiorMode=null; // { id, returnPos }
let isFallback=false;

// ——— Init world & player ———
try{ initWorld(canvas); }catch(e){ console.error('[ProjectY] initWorld failed', e, e.stack); const el=document.getElementById('errorOverlay'); if(el){el.style.display='block'; el.textContent='[initWorld] '+e.message+'\n'+e.stack} }
try{ initPlayer(canvas, scene, renderer); }catch(e){ console.error('[ProjectY] initPlayer failed', e, e.stack); const el=document.getElementById('errorOverlay'); if(el){el.style.display='block'; el.textContent='[initPlayer] '+e.message+'\n'+e.stack} }

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

  // saved box
  const savedRaw=localStorage.getItem('projectY_15week_simple_money_v20') || localStorage.getItem('projectY_15week_dashboard_v21');
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
          const s=JSON.parse(savedRaw);
          // ensure key migration
          localStorage.setItem('projectY_15week_simple_money_v20', JSON.stringify(s));
          setState(s);
          setupOverlay.classList.add('hidden');
          showBlocker(true);
          startGameLoop();
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
// Auto-enter world: always skip matching screen
const savedRawAlways = localStorage.getItem('projectY_15week_simple_money_v20') || localStorage.getItem('projectY_15week_dashboard_v21');
setupOverlay.classList.add('hidden');
renderSetup();
if(savedRawAlways){
  try{
    const s=JSON.parse(savedRawAlways);
    localStorage.setItem('projectY_15week_simple_money_v20', JSON.stringify(s));
    setState(s);
    if(!s.timeHours) s.timeHours=8;
    if(!s.week) s.week=1;
    showBlocker(true);
    startGameLoop();
  }catch{
    autoAssignAndStart();
  }
} else {
  autoAssignAndStart();
}
const _setupStart=document.getElementById('startBtn');
if(_setupStart) _setupStart.onclick=()=>{
  const assign={};
  document.querySelectorAll('.leaderSelect').forEach(s=> assign[s.dataset.group]=s.value);
  const ids=Object.values(assign);
  if(ids.some((x,i)=>ids.indexOf(x)!==i)){ alert('Each division needs a different leader.'); return; }
  createFresh(assign);
  setupOverlay.classList.add('hidden');
  showBlocker(true);
  startGameLoop();
};

// ——— People ———
function ensurePeople(){
  // Spawn the whole roster — 26 left one character unspawned, so any mission
  // stop that targeted them had no one to talk to.
  try{ spawnNPCs(40); }catch(e){ console.warn('NPC spawn failed', e); }
}
// ——— Game loop ———
function startGameLoop(){
  updateHUD();
  updateWorldFromState();
  ensurePeople();
  // position player at plaza
  teleport(new THREE.Vector3(0,1.7,14));
  if(!rafId) animate();

  // A handle on the running game, as gamekit and the hospital both expose. A
  // dynamic import() from the console resolves to a *second* copy of the module
  // graph with its own empty world, so without this there is no way to inspect
  // the one that is actually running.
  exposeDebug(themeManifest, { THREE, scene, renderer, camera, teleport, getPosition, getState,
                               getCurrentTarget, interiors,
                               world: { colliders: worldColliders, interactables: worldInteractables },
                               driving, day });
}

function animate(){
  rafId=requestAnimationFrame(animate);
  const delta=Math.min(0.05, clock.getDelta());
  const state=getState();
  if(!interiorMode && !dashboardOverlay.classList.contains('show') && !document.getElementById('overlay').classList.contains('show')){
    // Two things must never write the camera position in one frame. While the
    // player is in a jeep, the jeep owns it.
    if(driving.active) driving.update(delta);
    else updatePlayer(delta);
    // The old idle drip is gone: the day's own countdown is the clock now, and
    // it runs whether or not the player is standing still.
    if(false){
      const tick = 0;
      if(tick>0){
        state.timeHours = Math.min(TOTAL_HOURS, state.timeHours + tick);
        if(state.timeHours>=TOTAL_HOURS) state.status='lost';
      }
    }
    // time is constant — walking no longer speeds clock
    if(state) updateDayNight();
  }
  // The countdown runs everywhere: street, room, jeep, question panel — and is
  // written every frame. It used to ride on `Math.random() < 0.02`, which is
  // what made it look like it was stepping at random.
  if(day.tick(delta) === 'expired') day.close();
  updateDayClock();

  if(!interiorMode){
    if(driving.active){
      promptEl.textContent = 'W/S drive · A/D steer · Shift faster · E — get out';
      promptEl.classList.remove('hidden');
    } else updateInteractions(promptEl);
    try{ updateNPCs(delta, getPosition()); }catch(e){}
    interiors.update(delta);
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
  updateMiniMap(delta);
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

/**
 * The map, from the engine, not from a diagram of five dots.
 *
 * This drew the five divisions at hardcoded positions in a 200-pixel square —
 * T at the top, P on the left, and so on — which is not where any of them are.
 * The labels sat on top of each other because nothing had ever measured them,
 * and a player orienting by it was orienting by a picture of a different town.
 *
 * `renderMap` draws the real site, outlines every call still open, marks the
 * people you owe a call with the way they are facing, and places its labels
 * against the space already taken. Rebuilt a few times a second while the map
 * is open, which is often enough for a walking player and cheap enough to
 * ignore.
 */
let mapAccum = 0;
function updateMiniMap(delta = 0){
  if(mapOverlay.classList.contains('hidden')) return;
  mapAccum += delta;
  if(mapAccum < 0.25 && miniMapEl.childElementCount) return;
  mapAccum = 0;
  miniMapEl.innerHTML = renderMap();
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
    // Getting out is the same key that got you in. A raycast from the seat
    // rarely finds anything, so this cannot go through the interactables.
    if(driving.active){ driving.exit(); return; }
    const target=getCurrentTarget();
    if(!target) return;
    if(target.type==='board'){
      openDashboard();
    } else if(target.type==='door'){
      // Every door opens, mission stop or not. What changes is whether there
      // is a case on the stand inside.
      if(!interiors.enter(target.id)) enterBuilding(target.id);
    } else if(target.type==='case'){
      openVisit(target.id);
    } else if(target.type==='roomexit'){
      interiors.exit();
    } else if(target.type==='vehicle'){
      driving.enter(target.vehicle);
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
          const npcDiv = target.char.division || CHARACTER_DIVISION[target.char.id] || 'T';
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
      if(bodyEl) bodyEl.innerHTML=`<div style="display:flex;gap:12px;align-items:start"><div style="width:64px;height:64px;border-radius:50%;background:${isNpc?target.char.color:'#9a741d'};display:grid;place-items:center;color:#fff;font:900 22px Georgia,serif">${isNpc?target.char.name[0]: '▣'}</div><div style="flex:1"><div id="pyBio" style="padding:10px 12px;border-left:4px solid #9a741d;background:#f7f0dc;font-size:.88rem;line-height:1.5">${info}</div>${isNpc?`<div style="font-size:.74rem;color:#666158;margin-top:8px">They walk the town — watch their nameplate, then press E to talk. ${target.char.id==='fuchs' || target.char.id==='hall' || target.char.id==='greenglass' ? 'Their wartime choices echo post-war secrecy debates.' : target.char.id==='woods' || target.char.id==='hinton' || target.char.id==='hornig' || target.char.id==='mayer' || target.char.id==='wu' || target.char.id==='graves' ? 'Women’s work was often uncredited — this game recenters it.' : ''}</div>`: `<div style="font-size:.74rem;color:#666158;margin-top:10px">Walk the town to find Fuller Lodge, Ashley Pond, Sundt row, dorms, theater, PX, chapel — the real 1943-45 footprint was linear along Trinity Drive, not a square. Tech Area (your 5 labs) lay just south of the canyon rim.</div>`}</div></div><div style="margin-top:12px"><button class="btn primary" id="closeInfoBtn">Continue exploring</button></div>`;
      document.getElementById('overlay').classList.add('show');
      if(document.pointerLockElement) document.exitPointerLock();
      // Anyone who is not this mission's person can be asked one question about
      // what they just told you, for a dollar. Their own bio block is the
      // passage, so the gate closes that rather than drawing a second copy.
      if(isNpc && bodyEl){
        const holder=document.createElement('div');
        holder.innerHTML=passageHTML(target.char, { ownBio:false });
        bodyEl.insertBefore(holder, bodyEl.lastElementChild);
        bindPassage(bodyEl, target.char, null, { textEl: document.getElementById('pyBio') });
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
/**
 * Leaving the title card is what opens the day's plan.
 *
 * It used to be raised inside `startGameLoop`, which runs before the player has
 * read anything — so the plan opened *underneath* the opening card and was the
 * first thing they saw when they dismissed it. The order is: read why you are
 * here, then see what the day asks, then start the clock.
 */
function leaveTitleCard(){
  showBlocker(false);
  if(!getState()?.dayStarted) day.showPlan();
  else controls.lock();
}
document.getElementById('enterTownBtn').onclick=leaveTitleCard;
document.getElementById('blocker').onclick=(e)=>{ if(e.target===blocker) leaveTitleCard(); };

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
      <div style="font-size:.78rem;color:#4e4a43;margin-top:6px">${esc(d.desc)} — equipment visible: ${id==='T'?'blackboards, desks, papers':id==='P'?'counters, oscilloscopes, cables':id==='CM'?'furnaces, microscopes, molds':id==='E'?'drawings, casings, tool benches':'lens diagrams, timing circuits'}.</div>
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
  mapAccum = 1;                      // rebuild immediately on opening
  updateMiniMap(1);
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
    localStorage.removeItem('projectY_15week_simple_money_v20');
    localStorage.removeItem('projectY_15week_dashboard_v21');
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
