import { getState, save, markMissionStopComplete, getNextMissionStop, removeMissionStop, completeMission, advanceTime } from './gameState.js';
import { forecastReadiness, leader, def, currentMilestone, curriculumFor, completeMilestoneIfReady, groupPct, getCurrentMission, missionStopForGroup, missionStopIndex, nextMissionStopIndex, completedMissionStops, missionComplete, isPersonStopForIdx, globalStopIndex, CHARACTER_DIVISION, getSpecialRequest, isSpecialRequestActive, getPersonIdForStop } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { CURRICULUM } from './curriculum.js';
import { GROUP_DEFS } from './divisions.js';
import { BALLPARK_CALCS, JARGON } from './curriculum.js';
import { DIAGNOSIS_PACKS } from './diagnosis.js';
import { HINT_COST, RETRY_COST, VISIT_BONUS, ISSUE_VISIT_BONUS } from './constants.js';
import { esc, fmt, clamp, seeded, shuffleSeeded } from './utils.js';

let activeChallenge = null;
let activeOrder = null;
let activeCalc = null;
let activeProtocol = null;
let activeDiagnosis = null;

function jargonMatches(text, max=12){
  const normalized=` ${String(text||'').toLowerCase()} `;
  const found=[];
  for(const item of JARGON){
    if(item.aliases.some(a=>normalized.includes(String(a).toLowerCase()))){ found.push(item); if(found.length>=max) break; }
  }
  return found;
}
function jargonHTML(text, title='Terminology — click for definition'){
  const terms=jargonMatches(text,12);
  if(!terms.length) return '';
  return `<div class="termStrip"><div class="termStripLabel">${esc(title)}</div><div class="termButtons">${terms.map(t=>`<button type="button" class="termChip" data-term="${JARGON.indexOf(t)}">${esc(t.name)}</button>`).join('')}</div><div class="termDefinition hidden"></div></div>`;
}
function storyBriefText(lesson){
  return lesson.story || lesson.progress || lesson.title;
}
function allChallengeText(lesson,ch,includeAnswer=false){
  const parts=[lesson.title,lesson.progress,lesson.takeaway,ch.title,ch.setup,ch.play,ch.task,ch.question];
  ['cards','scenarios','choices','givens'].forEach(k=>{if(Array.isArray(ch[k])) parts.push(...ch[k])});
  if(Array.isArray(ch.proposals)) ch.proposals.forEach(p=>parts.push(p.text));
  if(ch.type==='Ballpark'){
    const spec=BALLPARK_CALCS[`${activeChallenge?activeChallenge.id:''}-${lesson.day}`];
    if(spec) parts.push(spec.prompt,spec.question,...spec.labels,includeAnswer?spec.solution:'',includeAnswer?spec.explanation:'');
  }
  if(ch.type==='Diagnosis'){
    const pack=DIAGNOSIS_PACKS[ch.pack];
    if(pack){
      parts.push(pack.role,pack.hook,pack.riddle);
      Object.values(pack.readings).forEach(r=>parts.push(r.name,r.observed,r.purpose));
      Object.values(pack.hypotheses).forEach(h=>parts.push(h.label,h.choice));
      if(includeAnswer) parts.push(pack.resolve.title,...pack.resolve.paras,pack.resolve.take);
    }
  }
  if(includeAnswer) parts.push(ch.answer,ch.why);
  return parts.filter(Boolean).join(' ').toLowerCase();
}
function visitKey(id){
  const state=getState();
  return `${state.week}-${id||activeChallenge?.id}`;
}
function scientificHint(ch, lesson){
  if(ch.type==='Sequence') return `Begin with "${ch.cards[ch.order[0]]}." That step establishes the condition the later steps depend on.`;
  if(ch.type==='Protocol') return `One secure match is: "${ch.scenarios[0]}" → "${ch.choices[ch.mapping[0]]}." Use the same cause-and-effect reasoning for the remaining rows.`;
  if(ch.type==='Ballpark'){
    const spec=BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`];
    return spec?`Anchor the estimate with "${spec.labels[spec.correct[0]]}." Then choose the remaining scale that makes the displayed relationship physically sensible.`:'Start by identifying the physical scale that should dominate the estimate.';
  }
  if(ch.type==='Diagnosis'){
    const pack=DIAGNOSIS_PACKS[ch.pack];
    if(!pack) return 'Work from the whole reading panel rather than the loudest instrument.';
    // Point at the first decisive quiet reading without naming the diagnosis.
    const quiet=Object.keys(pack.readings).filter(k=>!pack.salient.includes(k));
    const key=quiet[0];
    return `The two flagged readings will not separate the finalists on their own. Start from "${pack.readings[key].name}" and ask which candidates it is incompatible with.`;
  }
  const rec=ch.recommended||{}, best=Object.keys(rec).sort((a,b)=>(rec[b]||0)-(rec[a]||0))[0];
  return `Proposal ${best||'?' } has the strongest supporting evidence. Consider how each proposal addresses the system-level question with limited resources.`;
}
function solutionText(ch){
  if(ch.type==='Sequence') return ch.order.map((i,n)=>`${n+1}. ${ch.cards[i]}`).join(' → ');
  if(ch.type==='Protocol') return ch.scenarios.map((s,i)=>`${s} → ${ch.choices[ch.mapping[i]]}`).join('; ');
  if(ch.type==='Ballpark'){ const spec=BALLPARK_CALCS[`${activeChallenge.id}-${activeChallenge.lesson.day}`]; return spec?spec.solution:ch.answer; }
  if(ch.type==='Diagnosis') return diagnosisSolutionText(DIAGNOSIS_PACKS[ch.pack]) || ch.answer;
  if(ch.recommended) return Object.entries(ch.recommended).map(([k,v])=>`Proposal ${k}: about ${v} points`).join('; ');
  return ch.answer;
}
function avatarSvgSmall(leaderId){
  const l=leader(leaderId);
  return `<div style="width:46px;height:46px;border-radius:10px;background:#315c78;color:#fff;display:grid;place-items:center;font-weight:900">${esc(l.name[0])}</div>`;
}
function personAvatarSvg(person){
  const col=person.color || '#315c78';
  return `<div style="width:46px;height:46px;border-radius:10px;background:${col};color:#fff;display:grid;place-items:center;font-weight:900">${esc(person.name[0])}</div>`;
}

function openModal(title, bodyHTML){
  const overlay=document.getElementById('overlay');
  const titleEl=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  const eyebrow=document.getElementById('modalEyebrow');
  if(!overlay||!body) return;
  titleEl.textContent=title;
  eyebrow.textContent='';
  body.innerHTML=bodyHTML;
  overlay.classList.add('show');
  // pause pointer lock
  if(document.pointerLockElement) document.exitPointerLock();
  // bind term chips
  bindTerms(body);
}
export function closeVerdict(){
  const v=document.getElementById('verdictOverlay');
  if(v) v.classList.remove('show');
}
export function closeModal(){
  const overlay=document.getElementById('overlay');
  if(overlay) overlay.classList.remove('show');
  // resume game if needed, but leave unlocked until user clicks
}
function bindTerms(container){
  container.querySelectorAll('.termChip').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const idx=+btn.dataset.term;
      const term=JARGON[idx];
      if(!term) return;
      const wrap=btn.closest('.termStrip');
      const panel=wrap?wrap.querySelector('.termDefinition'):null;
      if(!panel) return;
      const wasActive=btn.classList.contains('active');
      wrap.querySelectorAll('.termChip').forEach(x=>x.classList.remove('active'));
      if(wasActive){ panel.classList.add('hidden'); panel.innerHTML=''; return; }
      btn.classList.add('active');
      panel.innerHTML=`<b>${esc(term.name)}</b><br>${esc(term.def)}`;
      panel.classList.remove('hidden');
    });
  });
}

// ——— Order (Sequence) ———
function orderHTML(ch){
  const chosen=(activeOrder&&activeOrder.chosen||[]).map((i,n)=>`<button class="orderItem" data-remove="${n}" type="button"><b>${n+1}.</b> ${esc(ch.cards[i])}<span>remove</span></button>`).join('')||`<div class="slotGhost">1</div><div class="slotGhost">2</div><div class="slotGhost">3</div><div class="slotGhost">4</div>`;
  const bank=(activeOrder&&activeOrder.bank||[]).map(i=>`<button class="orderItem" data-add="${i}" type="button">${esc(ch.cards[i])}</button>`).join('')||'<div class="compactInstruction">All cards placed.</div>';
  return `<div class="compactInstruction">Put the four steps in order from earliest to latest.</div><div class="orderChosen orderSlots">${chosen}</div><div class="orderBank">${bank}</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn" id="orderReset" type="button">Reset</button><button class="btn primary" id="orderCheck" type="button">Check</button></div>`;
}
function bindOrder(){
  const ch=activeChallenge.ch;
  document.querySelectorAll('[data-add]').forEach(b=> b.onclick=()=>{
    const i=+b.dataset.add;
    activeOrder.bank=activeOrder.bank.filter(x=>x!==i);
    activeOrder.chosen.push(i);
    rerenderOrder();
  });
  document.querySelectorAll('[data-remove]').forEach(b=> b.onclick=()=>{
    const n=+b.dataset.remove;
    const i=activeOrder.chosen.splice(n,1)[0];
    activeOrder.bank.push(i);
    rerenderOrder();
  });
  const reset=document.getElementById('orderReset');
  if(reset) reset.onclick=()=>{
    activeOrder.bank=shuffleSeeded(ch.cards.map((_,i)=>i), activeOrder.seed ?? 0);
    activeOrder.chosen=[];
    rerenderOrder();
  };
  const check=document.getElementById('orderCheck');
  if(check) check.onclick=()=>{
    const ok=activeOrder.chosen.length===ch.order.length && activeOrder.chosen.every((v,i)=>v===ch.order[i]);
    activeChallenge.userAnswer=activeOrder.chosen.map((i,n)=>`${n+1}. ${ch.cards[i]}`).join(' → ');
    finishVisit(ok);
  };
}
function rerenderOrder(){
  const state=getState();
  const gs=state.groups.find(x=>x.id===activeChallenge.id);
  const lesson=activeChallenge.lesson;
  const ch=activeChallenge.ch;
  const person=activeChallenge.person || null;
  const body=document.getElementById('modalBody');
  if(!body) return;
  body.innerHTML = scientistPanel(gs, lesson, person) + questionContextHTML(lesson,ch) + visitAssistHTML() + orderHTML(ch);
  bindOrder(); bindVisitAssist(); bindTerms(body);
}

// ——— Protocol ———
function protocolHTML(ch){
  // The lettered choices are shuffled so that a correct match cannot be read off
  // the display order. activeProtocol.order maps display letter -> real choice index.
  const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
  const letter=j=>String.fromCharCode(65+j);
  return `<div class="compactInstruction">Match each situation to the best scientific explanation or engineering response.</div><div class="protocolGrid">${ch.scenarios.map((s,i)=>`<label class="matchRow"><span><b>${i+1}.</b> ${esc(s)}</span><select data-proto="${i}"><option value="">Select…</option>${display.map((real,j)=>`<option value="${j}">${letter(j)}. ${esc(ch.choices[real])}</option>`).join('')}</select></label>`).join('')}</div><div class="termStrip" style="margin-top:10px"><div class="termStripLabel">Choices</div><div class="answerMappings">${display.map((real,j)=>`<div><b>${letter(j)}.</b><span>${esc(ch.choices[real])}</span></div>`).join('')}</div></div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="protocolCheck" type="button">Check</button></div>`;
}
function bindProtocol(){
  const btn=document.getElementById('protocolCheck');
  if(!btn) return;
  btn.onclick=()=>{
    const ch=activeChallenge.ch;
    const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
    const picked=[...document.querySelectorAll('[data-proto]')].map(sel=> sel.value===''?-1:display[+sel.value]);
    if(picked.includes(-1)){ alert('Complete all four matches.'); return; }
    activeChallenge.userAnswer=ch.scenarios.map((sc,i)=>`${sc} → ${ch.choices[picked[i]]}`).join('; ');
    const ok=picked.every((v,i)=>v===ch.mapping[i]);
    finishVisit(ok);
  };
}

// ——— Ballpark ———
function ballparkSpec(){
  return BALLPARK_CALCS[`${activeChallenge.id}-${activeChallenge.lesson.day}`];
}
function formatCalc(v){
  if(!Number.isFinite(v)) return '—';
  const a=Math.abs(v);
  if((a>0&&a<.001)||a>=100000) return v.toExponential(2);
  return String(Math.round(v*1000)/1000);
}
function calculateBallpark(spec){
  const vals=activeCalc.chosen.map(i=>spec.values[i]);
  const [a,b,c]=vals;
  try{ return Function('a','b','c',`return (${spec.formula})`)(a,b,c); }catch(e){ return NaN; }
}
function ballparkBody(ch,spec){
  const orderVals = activeCalc.order || spec.labels.map((_,i)=>i);
  const bank=orderVals.map(i=>`<button type="button" class="numberTile ${activeCalc.chosen.includes(i)?'used':''}" data-calc-tile="${i}" ${activeCalc.chosen.includes(i)?'disabled':''}>${esc(spec.labels[i])}</button>`).join('');
  // A template may name the same slot twice (D ÷ (D+1)). Only the first appearance is
  // a control; later ones echo it, so there is one button per slot.
  const rendered=new Set();
  const equation=spec.template.replace(/\{(\d+)\}/g,(_,n)=>{
    const slot=+n, idx=activeCalc.chosen[slot], filled=Number.isInteger(idx);
    const text=filled?esc(spec.labels[idx]):'choose';
    if(rendered.has(slot)) return `<span class="calcSlot echo">${text}</span>`;
    rendered.add(slot);
    return `<button type="button" class="calcSlot ${filled?'filled':''}" data-calc-slot="${slot}">${text}</button>`;
  });
  let preview='Select the estimates.';
  if(activeCalc.chosen.length===spec.slots){
    const result=calculateBallpark(spec);
    preview=`Your estimate gives <b>${formatCalc(result)} ${esc(spec.units)}</b>.`;
  }
  return `<div class="ballparkBox"><div class="question">${esc(spec.prompt)}</div><div class="question" style="margin-top:8px;font-weight:700">${esc(spec.question)}</div><div class="numberBank">${bank}</div><div class="calcEquation">${equation}</div><div class="calcPreview ${activeCalc.chosen.length===spec.slots?'':'muted'}">${preview}</div><div class="calcActions"><button class="btn small" id="calcClear" type="button">Clear</button><button class="btn primary small" id="calcSubmit" type="button">Check estimate</button></div></div><div id="visitFeedback"></div>`;
}
function ballparkHTML(ch){
  const spec=ballparkSpec();
  const state=getState();
  activeCalc={ chosen:[], order: shuffleSeeded(spec?spec.labels.map((_,i)=>i):[], state.week*79 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge.id)*13 + activeChallenge.lesson.day) };
  if(!spec) return `<div class="ballparkBox"><div class="question">${esc(ch.task||'Estimate')}</div><div class="feedback bad"><p>This estimate has not yet been converted to the number-tile format. Use the supplied givens to produce a rounded result.</p></div></div><div id="visitFeedback"></div>`;
  return ballparkBody(ch,spec);
}
function rerenderBallpark(){
  const state=getState();
  const gs=state.groups.find(x=>x.id===activeChallenge.id);
  const lesson=activeChallenge.lesson;
  const ch=activeChallenge.ch;
  const person=activeChallenge.person || null;
  const spec=ballparkSpec();
  const body=document.getElementById('modalBody');
  if(!body) return;
  body.innerHTML = scientistPanel(gs, lesson, person) + questionContextHTML(lesson,ch) + visitAssistHTML() + ballparkBody(ch,spec);
  bindBallpark(); bindVisitAssist(); bindTerms(body);
}
function bindBallpark(){
  const spec=ballparkSpec();
  if(!spec) return;
  document.querySelectorAll('[data-calc-tile]').forEach(b=> b.onclick=()=>{
    if(activeCalc.chosen.length>=spec.slots) return;
    activeCalc.chosen.push(+b.dataset.calcTile);
    rerenderBallpark();
  });
  document.querySelectorAll('[data-calc-slot]').forEach(b=> b.onclick=()=>{
    const slot=+b.dataset.calcSlot;
    if(slot < activeCalc.chosen.length){
      activeCalc.chosen.splice(slot,1);
      rerenderBallpark();
    }
  });
  const clearBtn=document.getElementById('calcClear');
  if(clearBtn) clearBtn.onclick=()=>{ activeCalc.chosen=[]; rerenderBallpark(); };
  const submitBtn=document.getElementById('calcSubmit');
  if(submitBtn) submitBtn.onclick=()=>{
    if(activeCalc.chosen.length!==spec.slots){ alert('Choose '+spec.slots+' estimates.'); return; }
    const result=calculateBallpark(spec);
    activeChallenge.userAnswer=`${activeCalc.chosen.map(i=>spec.labels[i]).join(' → ')}; result ${formatCalc(result)} ${spec.units}`;
    // The tiles that belong in the estimate are what matters, not the order they were
    // placed in. Where order genuinely changes the value, the tolerance check catches it.
    const chosenSet=[...activeCalc.chosen].sort((a,b)=>a-b);
    const correctSet=[...spec.correct].sort((a,b)=>a-b);
    const rightTiles = chosenSet.length===correctSet.length && chosenSet.every((v,i)=> v===correctSet[i]);
    const within = Math.abs(result - spec.target) <= spec.tolerance;
    const ok = rightTiles && within;
    finishVisit(ok);
  };
}

// ——— Diagnosis ———
function diagnosisPack(ch){
  return DIAGNOSIS_PACKS[ch && ch.pack];
}
function diagnosisIsPair(pack){
  return Array.isArray(pack.compound) && pack.compound.length===2;
}
function diagnosisBody(ch, pack){
  const pair=diagnosisIsPair(pack);
  const order=(activeDiagnosis&&activeDiagnosis.order)||Object.keys(pack.hypotheses);
  const picked=(activeDiagnosis&&activeDiagnosis.picked)||[];
  const cards=order.map(key=>{
    const h=pack.hypotheses[key];
    const on=picked.includes(key);
    return `<button type="button" class="dxChoice ${on?'picked':''}" data-dx-choice="${esc(key)}"><b>${esc(h.label)}</b><span>${esc(h.choice)}</span></button>`;
  }).join('');
  // Readings stay visible in full, salient ones flagged. Nothing is hidden or unlocked.
  const rows=Object.entries(pack.readings).map(([key,r])=>{
    const hot=pack.salient.includes(key);
    return `<div class="dxReading ${hot?'salient':''}">
      <div class="dxReadingHead"><b>${esc(r.name)}</b><span class="dxZone">${esc(pack.zones[r.zone]||r.zone)}</span></div>
      <div class="dxObserved">${esc(r.observed)}</div>
      <div class="dxReference">typical: ${esc(r.reference)}</div>
      <div class="dxPurpose">${esc(r.purpose)}</div>
    </div>`;
  }).join('');
  const need = pair?'Select the two causes that together account for every reading.':'Select the one cause that fits the whole panel.';
  const count = pair?`<span class="dxCount">${picked.length} of 2 selected</span>`:'';
  return `<div class="dxBox">
    <div class="dxRole">${esc(pack.role)}</div>
    <div class="dxHook">${esc(pack.hook)}</div>
    <div class="dxRiddle">${esc(pack.riddle)}</div>
    <div class="compactInstruction">${esc(need)} The loud reading gets your attention; the right explanation fits the whole panel. ${count}</div>
    <div class="dxChoices">${cards}</div>
    <div class="dxPanelLabel">Reading panel — every instrument, including the calm ones</div>
    <div class="dxPanel">${rows}</div>
    <div id="visitFeedback"></div>
    <div class="modalActions"><button class="btn" id="dxClear" type="button">Clear</button><button class="btn primary" id="dxCheck" type="button">Submit diagnosis</button></div>
  </div>`;
}
function diagnosisHTML(ch){
  const pack=diagnosisPack(ch);
  const state=getState();
  if(!pack) return `<div class="dxBox"><div class="feedback bad"><p>Diagnosis pack "${esc(ch.pack||'')}" was not found.</p></div></div><div id="visitFeedback"></div>`;
  activeDiagnosis={
    picked: [],
    order: shuffleSeeded(Object.keys(pack.hypotheses), state.week*83 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge.id)*17 + activeChallenge.lesson.day),
  };
  return diagnosisBody(ch, pack);
}
function rerenderDiagnosis(){
  const state=getState();
  const gs=state.groups.find(x=>x.id===activeChallenge.id);
  const body=document.getElementById('modalBody');
  if(!body) return;
  const ch=activeChallenge.ch;
  body.innerHTML = scientistPanel(gs, activeChallenge.lesson, activeChallenge.person||null) + questionContextHTML(activeChallenge.lesson,ch) + visitAssistHTML() + diagnosisBody(ch, diagnosisPack(ch));
  bindDiagnosis(); bindVisitAssist(); bindTerms(body);
}
function bindDiagnosis(){
  const ch=activeChallenge.ch;
  const pack=diagnosisPack(ch);
  if(!pack) return;
  const pair=diagnosisIsPair(pack);
  const limit=pair?2:1;
  document.querySelectorAll('[data-dx-choice]').forEach(b=> b.onclick=()=>{
    const key=b.dataset.dxChoice;
    const at=activeDiagnosis.picked.indexOf(key);
    if(at>=0) activeDiagnosis.picked.splice(at,1);
    else {
      if(limit===1) activeDiagnosis.picked=[key];
      else if(activeDiagnosis.picked.length<2) activeDiagnosis.picked.push(key);
      else return;
    }
    rerenderDiagnosis();
  });
  const clear=document.getElementById('dxClear');
  if(clear) clear.onclick=()=>{ activeDiagnosis.picked=[]; rerenderDiagnosis(); };
  const check=document.getElementById('dxCheck');
  if(check) check.onclick=()=>{
    const picked=activeDiagnosis.picked;
    if(picked.length!==limit){ alert(pair?'Select two causes.':'Select one cause.'); return; }
    activeChallenge.userAnswer=picked.map(k=>pack.hypotheses[k].label).join(' + ');
    const want=(pair?pack.compound:[pack.answer]).slice().sort();
    const got=picked.slice().sort();
    const ok = want.length===got.length && want.every((v,i)=>v===got[i]);
    finishVisit(ok);
  };
}
function diagnosisSolutionText(pack){
  if(!pack) return '';
  const keys=diagnosisIsPair(pack)?pack.compound:[pack.answer];
  return keys.map(k=>pack.hypotheses[k].label).join(' + ');
}

// ——— Science Tank ———
function tankHTML(ch){
  return `<div class="compactInstruction">Spend most of the 100 points across the proposals. The whole distribution is graded, not just your top pick: fund every proposal the evidence supports, and starve the ones it does not.</div><div class="tankGrid">${ch.proposals.map(p=>`<label class="tankProposal"><div><b>Proposal ${esc(p.label)}</b><p>${esc(p.text)}</p></div><input type="number" min="0" max="100" step="5" value="0" data-tank="${esc(p.label)}"><span>points</span></label>`).join('')}</div>${ch.research?`<details class="researchReveal"><summary>Evidence available</summary><div style="white-space:pre-wrap">${esc(ch.research)}</div></details>`:''}<div class="tankTotal">Allocated: <b id="tankTotal">0</b> / 100</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="tankCheck" type="button">Check</button></div>`;
}
function triageHTML(ch){
  const opts=(ch.choices||[]).map((c,i)=>`<button class="orderItem" data-triage="${i}" type="button"><b>${String.fromCharCode(65+i)}.</b> ${esc(c)}</button>`).join('');
  return `<div class="compactInstruction">${esc(ch.task||ch.question||'Choose who needs help first.')}</div><div class="orderBank" style="display:grid;gap:8px">${opts}</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="triageCheck" type="button" disabled>Choose</button></div>`;
}
function casebookHTML(ch){
  if(ch.proposals) return tankHTML(ch);
  const opts=(ch.choices||[]).map((c,i)=>`<div><b>${String.fromCharCode(65+i)}.</b> ${esc(c)}</div>`).join('');
  return `<div class="compactInstruction">${esc(ch.task||'Match the clues to the best explanation.')}</div><div class="protocolGrid">${(ch.scenarios||ch.cards||[]).map((s,i)=>`<label class="matchRow"><span><b>${i+1}.</b> ${esc(s)}</span><select data-casebook="${i}"><option value="">Select…</option>${(ch.choices||[]).map((c,j)=>`<option value="${j}">${String.fromCharCode(65+j)}. ${esc(c)}</option>`).join('')}</select></label>`).join('')}</div><div class="termStrip" style="margin-top:10px"><div class="termStripLabel">Choices</div><div class="answerMappings">${opts}</div></div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="casebookCheck" type="button">Check</button></div>`;
}
function bindTank(){
  const inputs=[...document.querySelectorAll('[data-tank]')];
  const update=()=>{ const el=document.getElementById('tankTotal'); if(el) el.textContent=inputs.reduce((s,x)=>s+(+x.value||0),0); };
  inputs.forEach(i=> i.addEventListener('input', update));
  const btn=document.getElementById('tankCheck');
  if(!btn) return;
  btn.onclick=()=>{
    const vals={}; inputs.forEach(i=> vals[i.dataset.tank]=+i.value||0);
    const total=Object.values(vals).reduce((a,b)=>a+b,0);
    if(total>100){ alert('The portfolio cannot exceed 100 research points.'); return; }
    const rec=activeChallenge.ch.recommended||{};
    const recSum=Object.values(rec).reduce((a,b)=>a+b,0)||1;
    const floor=Math.min(80, recSum);
    if(total<floor){ alert(`Allocate at least ${floor} of the 100 research points.`); return; }
    const maxRec=Math.max(...Object.values(rec),0);
    const recBest=Object.keys(rec).filter(k=>rec[k]===maxRec);
    const maxUser=Math.max(...Object.values(vals),0);
    const userBest=Object.keys(vals).filter(k=> vals[k]===maxUser);
    // The strongest proposal has to lead, but a proposal the evidence also supports
    // cannot be starved, and the unsupported proposals cannot be quietly funded.
    const topOk = maxUser>=35 && userBest.some(k=> recBest.includes(k));
    const unsupported = Object.entries(vals).filter(([k])=> rec[k]===undefined).reduce((s,[,v])=>s+v,0);
    const starved = Object.entries(rec).filter(([k,v])=> v/recSum>=0.25 && (vals[k]||0)<20);
    const ok = topOk && unsupported<=15 && starved.length===0;
    activeChallenge.userAnswer=Object.entries(vals).map(([k,v])=>`Proposal ${k}: ${v} points`).join('; ');
    finishVisit(ok);
  };
}

function scientistPanel(gs, lesson, person=null){
  if(person){
    return `<div class="scientistPanel"><div style="text-align:center">${personAvatarSvg(person)}<div class="visitTag" style="margin-top:6px">${esc(person.name)}</div><div style="font-size:.68rem;color:#666158;margin-top:2px">${esc(person.role)}</div></div><div class="scientistSpeech"><div class="speechTag">Week ${getState().week} · ${esc(def(gs.id).name)} — with ${esc(person.name)}</div><h4>${esc(lesson.title)}</h4><p style="font-size:.82rem;color:#4e4a43;margin:6px 0 0">${esc(lesson.takeaway||'')}</p></div></div>`;
  }
  const l=leader(gs.leaderId);
  return `<div class="scientistPanel"><div style="text-align:center">${avatarSvgSmall(l.id)}<div class="visitTag" style="margin-top:6px">${esc(l.name)}</div></div><div class="scientistSpeech"><div class="speechTag">Week ${getState().week} · ${esc(def(gs.id).name)}</div><h4>${esc(lesson.title)}</h4><p style="font-size:.82rem;color:#4e4a43;margin:6px 0 0">${esc(lesson.takeaway||'')}</p></div></div>`;
}
function questionContextHTML(lesson,ch){
  const text=allChallengeText(lesson,ch,false);
  // What is riding on this, before the question is asked. It lived only in the
  // briefing, where it is read once and forgotten.
  const m=getCurrentMission(getState());
  const stake=m?(m.stake || String(m.briefing||'').split(/(?<=\.)\s/)[0]):'';
  const stakeHTML=stake?`<div class="stakeLine"><span aria-hidden="true">▲</span> ${esc(stake)}</div>`:'';
  return stakeHTML+`<div class="scienceBrief storyBrief"><p>${esc(storyBriefText(lesson))}</p></div>`+jargonHTML(text);
}
function visitAssistHTML(){
  const state=getState();
  const key=visitKey();
  const used=!!state.hints?.[key];
  const text=used?scientificHint(activeChallenge.ch, activeChallenge.lesson):'';
  return `<div class="visitAssist"><div class="visitAssistRow"><button class="btn small" id="visitHintBtn" type="button" ${used||state.reserve<HINT_COST?'disabled':''}>Scientific hint · $${HINT_COST}</button><span class="moneyRule">Director funds: $${fmt(state.reserve)}</span></div><div id="visitHintText" class="visitHintText ${used?'':'hidden'}">${used?esc(text):''}</div></div>`;
}
function bindVisitAssist(){
  const btn=document.getElementById('visitHintBtn');
  if(!btn) return;
  btn.onclick=()=>{
    const state=getState();
    const key=visitKey();
    if(state.hints?.[key] || state.reserve<HINT_COST) return;
    state.reserve-=HINT_COST;
    state.hints=state.hints||{};
    state.hints[key]=true;
    const box=document.getElementById('visitHintText');
    if(box){
      box.textContent=scientificHint(activeChallenge.ch, activeChallenge.lesson);
      box.classList.remove('hidden');
    }
    btn.disabled=true;
    const rule=btn.parentElement.querySelector('.moneyRule');
    if(rule) rule.textContent=`Director funds: $${fmt(state.reserve)}`;
    state.log.push({week:state.week, text:`A $${HINT_COST} scientific hint was used during the ${def(activeChallenge.id).code} Division visit.`});
    if(state.log.length>100) state.log=state.log.slice(-100);
    save();
    // updateHUD will be called by main
    const ev=new CustomEvent('projecty:statechange');
    window.dispatchEvent(ev);
  };
}

function reasoningHTML(ch, lesson, solution, whyText){
  let detail='';
  if(ch.type==='Sequence') detail=`<ol class="reasonList">${ch.order.map((idx,n)=>`<li><b>${n+1}.</b> ${esc(ch.cards[idx])}</li>`).join('')}</ol>`;
  else if(ch.type==='Protocol') detail=`<div class="answerMappings">${ch.scenarios.map((s,i)=>`<div><b>${esc(s)}</b><span>${esc(ch.choices[ch.mapping[i]])}</span></div>`).join('')}</div>`;
  else if(ch.type==='Ballpark'){
    const spec=BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`];
    detail=spec?`<p>The appropriate estimates are <b>${spec.correct.map(i=>esc(spec.labels[i])).join(', ')}</b>. Inserting them into the displayed relationship gives <b>${esc(spec.solution)}</b>. ${esc(spec.explanation)}</p>`:`<p>${esc(whyText)}</p>`;
  } else if(ch.type==='Diagnosis'){
    const pack=DIAGNOSIS_PACKS[ch.pack];
    if(!pack) detail=`<p>${esc(whyText)}</p>`;
    else {
      const answers=diagnosisIsPair(pack)?pack.compound:[pack.answer];
      const rivals=Object.keys(pack.hypotheses).filter(k=>!answers.includes(k));
      // The deduction tree is shown only after an answer, per the Diagnosis spec.
      detail=`<div class="dxResolve">
        <h5>${esc(pack.resolve.title)}</h5>
        ${pack.resolve.paras.map(p=>`<p>${esc(p)}</p>`).join('')}
        <div class="dxWhy"><p><b>Why the loud readings were not enough:</b> ${esc(pack.resolve.why.loud)}</p><p><b>Which quiet readings mattered:</b> ${esc(pack.resolve.why.quiet)}</p></div>
        <div class="dxTree"><b>Deduction</b><ol>${pack.logic.map(([clue,result])=>`<li>${esc(clue)} <em>&rarr; ${esc(result)}</em></li>`).join('')}</ol></div>
        <div class="dxRivals"><b>Why the others failed</b>${rivals.map(k=>`<div><span>${esc(pack.hypotheses[k].label)}</span><em>${esc(pack.reasons[k]||'')}</em></div>`).join('')}</div>
        <div class="dxChain">${pack.resolve.chain.map(c=>`<span>${esc(c)}</span>`).join('<b>&rarr;</b>')}</div>
        <div class="answerScienceLead">${esc(pack.resolve.take)}</div>
      </div>`;
    }
  } else if(ch.type==='ScienceTank' || ch.type==='Science Tank' || ch.type==='sciencetank'){
    const rec=ch.recommended||{};
    detail=`<div class="proposalReview">${(ch.proposals||[]).map(p=>`<div><b>Proposal ${esc(p.label)}</b><span>${esc(p.text)}</span><em>${rec[p.label]!==undefined?`Recommended weight: ${rec[p.label]} points`:''}</em></div>`).join('')}</div>`;
  } else {
    detail=`<p>${esc(whyText)}</p>`;
  }
  const takeaway=lesson.takeaway?`<div class="answerScienceLead">${esc(lesson.takeaway)}</div>`:'';
  return `${detail}${takeaway}<p style="margin-top:8px"><b>Correct answer:</b> ${esc(solution)}</p><p><b>Why:</b> ${esc(whyText)}</p>`;
}

function penaltyHours(min,max){
  return min + Math.random()*(max-min);
}
function applyTimePenalty(min,max, reason){
  const hrs=penaltyHours(min,max);
  advanceTime(hrs);
  const state=getState();
  state.log.push({week:state.week, text: reason + ` — ${hrs.toFixed(1)}h penalty.`});
  if(state.log.length>100) state.log=state.log.slice(-100);
  save();
  window.dispatchEvent(new CustomEvent('projecty:statechange'));
}
function bindTriage(){
  let chosen=null;
  const btns=[...document.querySelectorAll('[data-triage]')];
  const check=document.getElementById('triageCheck');
  btns.forEach(b=> b.addEventListener('click', ()=>{
    btns.forEach(x=> x.classList.remove('selected'));
    b.classList.add('selected'); chosen=+b.dataset.triage; if(check) check.disabled=false;
  }));
  if(!check) return;
  check.onclick=()=>{
    const ch=activeChallenge.ch;
    const correctIdx = ch.choices.indexOf(ch.correctChoice);
    const ok = chosen===correctIdx;
    finishVisit(ok);
  };
}
function bindCasebook(){
  const btn=document.getElementById('casebookCheck');
  if(!btn) return;
  btn.onclick=()=>{
    const ch=activeChallenge.ch;
    if(ch.proposals){ // tank variant
      const inputs=[...document.querySelectorAll('[data-tank]')];
      const vals={}; inputs.forEach(i=> vals[i.dataset.tank]=+i.value||0);
      const total=Object.values(vals).reduce((a,b)=>a+b,0);
      if(total>100){ alert('The portfolio cannot exceed 100 research points.'); return; }
      if(total<60){ alert('Allocate most of the 100 points — at least 60 — to show your intent clearly.'); return; }
      let num=0, denom=0, exact=0;
      ch.proposals.forEach(p=>{
        const a=+(vals[p.label]||0), t=+(p.target||0);
        denom+=Math.abs(t);
        if(Math.abs(a-t)<=12) exact++;
        num+=Math.max(0, 1 - Math.abs(a-t)/Math.max(8,t||8));
      });
      const coverage=(ch.proposals.length? exact/ch.proposals.length : 0);
      const share=num/Math.max(1, ch.proposals.length);
      const ok = share>=0.62 && coverage>=0.5;
      finishVisit(ok);
      return;
    }
    // protocol mapping variant
    const sels=[...document.querySelectorAll('[data-casebook]')];
    const vals=sels.map(s=> s.value==='' ? -1 : +s.value);
    const ok = vals.every((v,i)=> v===ch.mapping[i]);
    finishVisit(ok);
  };
}
function fundingCostForStop(stopIndex, lesson){
  // deterministic 1-3 based on lesson day and global index
  const gi = globalStopIndex(getState(), stopIndex);
  const base = ((lesson?.day ?? gi) % 3) + 1; // 1..3
  return Math.min(3, Math.max(1, base));
}
function finishVisit(ok){
  const state=getState();
  const gs=state.groups.find(x=>x.id===activeChallenge.id);
  const d=def(gs.id);
  const bonus=activeChallenge.hadIssue?ISSUE_VISIT_BONUS:VISIT_BONUS;
  const ch=activeChallenge.ch, lesson=activeChallenge.lesson;
  const before=groupPct(gs);
  const key=visitKey();
  const stopIndex=activeChallenge.stopIndex;
  state.visitedGroup=gs.id;
  state.visitOutcome=ok?'correct':'wrong';

  // A wrong call no longer closes the stop. It used to be credited either way,
  // so the only cost of being wrong was a number the player never saw. The
  // second attempt always closes it: a mistake must never trap anyone.
  state.attempts = state.attempts || {};
  const attemptKey = state.week + '-' + stopIndex;
  const attempt = (state.attempts[attemptKey] || 0) + 1;
  state.attempts[attemptKey] = attempt;
  const closes = ok || attempt >= 2;
  if(closes) markMissionStopComplete(stopIndex, ok);

  const clockBefore = state.timeHours || 8;
  const projectionBefore = forecastReadiness(state).overall;
  const milestoneBefore = gs.milestone;
  state.areaVerdict = state.areaVerdict || {};
  state.areaVerdict[gs.id] = ok ? 'clear' : 'unresolved';

  if(ok){
    gs.workDone+=bonus;
    if(activeChallenge.hadIssue){ gs.issue=null; gs.issueSince=null; }
    completeMilestoneIfReady(state, gs, state.week);
    const after=groupPct(gs);
    state.log.push({week:state.week, text:`Mission ${state.week}, stop ${stopIndex+1}: ${d.code} Division increased readiness from ${fmt(before)}% to ${fmt(after)}%.`});
  } else {
    state.log.push({week:state.week, text:`Mission ${state.week}, stop ${stopIndex+1}: ${d.code} Division review completed, but no readiness bonus was earned.`});
    // 12-36h penalty for getting building/person challenge wrong
    const hrs=penaltyHours(12,36);
    state.timeHours = Math.min(480, (state.timeHours||8) + hrs);
    state.log.push({week:state.week, text:`Incorrect answer caused ${hrs.toFixed(1)}h delay.`});
  }
  if(state.log.length>100) state.log=state.log.slice(-100);
  const afterPct=groupPct(gs);
  const ledger = {
    ok, closes, attempt,
    hoursSpent: (state.timeHours || 8) - clockBefore,
    readinessBefore: before, readinessAfter: afterPct,
    projectionBefore, projectionAfter: forecastReadiness(state).overall,
    bonus: ok ? bonus : 0,
    milestoneDone: gs.milestone > milestoneBefore,
  };
  const solution=solutionText(ch);
  const bp=ch.type==='Ballpark'? BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`]:null;
  const dxPack=ch.type==='Diagnosis'? DIAGNOSIS_PACKS[ch.pack]:null;
  const whyText=ch.type==='Ballpark' ? (bp?.explanation || ch.why) : (dxPack ? dxPack.resolve.take : ch.why);
  const comparison = ok
    ? `<div class="feedback good scienceAnswer"><h4>Correct</h4><p>${esc(ch.why||lesson.takeaway||'')}</p></div>`
    : `<div class="wrongAnswerCompare"><div class="answerCompareBox user"><b>Your answer</b>${esc(activeChallenge.userAnswer||'(no answer)')}</div><div class="answerCompareBox correct"><b>Correct answer</b>${esc(solution)}</div></div>`;
  const isLastStop = missionComplete(state);
  const routeNote = isLastStop?`<div class="readinessNote" style="background:#e6f0e9;border:1px solid #b8d0c0;border-radius:8px;padding:8px 10px">✅ All ${missionComplete(state)?completedMissionStops(state).length:0} mission stops are complete. Click <b>Complete Mission ${state.week}</b> to advance to Mission ${Math.min(15,state.week+1)}.</div>`:`<div class="readinessNote">Stop ${stopIndex+1} complete. The next building on the route is now unlocked.</div>`;
  const canRetry = !ok && state.reserve>=RETRY_COST;
  const retryButton = canRetry ? `<button class="btn" id="visitRetry" type="button">Retry challenge · $${RETRY_COST}</button>` : '';
  const completeBtn = isLastStop ? `<button class="btn primary" id="completeMissionBtn" type="button">Complete Mission ${state.week} → Mission ${Math.min(15,state.week+1)}</button>` : '';
  // ——— the verdict ————————————————————————————————————————————————
  // Rendered into its own overlay above the modal. It used to be appended to
  // the bottom of the question panel, which on a Diagnosis meant scrolling
  // past a figure, six readings and five candidates to discover whether you
  // were right — the single least dramatic place it could have been put.
  const mission = getCurrentMission(state);
  const stake = mission?.stake || '';
  const pad2 = (n) => String(Math.floor(n)).padStart(2, '0');
  const clockAt = (h) => `Day ${Math.floor(h / 24) + 1}, ${pad2(h % 24)}:${pad2((h % 1) * 60)}`;
  const projDelta = ledger.projectionAfter - ledger.projectionBefore;

  const cell = (label, value, cls, note) =>
    `<div class="ledgerCell"><div class="ledgerLabel">${esc(label)}</div>` +
    `<div class="ledgerValue ${cls || ''}">${value}</div>` +
    (note ? `<div class="ledgerNote">${esc(note)}</div>` : '') + `</div>`;

  const ledgerHTML =
    cell('Readiness', ok ? `+${fmt(ledger.readinessAfter - ledger.readinessBefore)}%` : 'no gain',
         ok ? 'gain' : '', `${def(gs.id).code} now ${fmt(ledger.readinessAfter)}%`) +
    cell('Time spent', ledger.hoursSpent > 0 ? `+${ledger.hoursSpent.toFixed(0)} h` : '—',
         ledger.hoursSpent > 0 ? 'cost' : '', clockAt(state.timeHours || 8)) +
    cell('Projection at deadline', `${fmt(ledger.projectionAfter)}%`,
         projDelta > 0.5 ? 'gain' : projDelta < -0.5 ? 'cost' : '',
         projDelta === 0 ? 'unchanged' : `${projDelta > 0 ? '+' : ''}${fmt(projDelta)} from this call`);

  const headline = ok
    ? (ledger.milestoneDone ? 'Milestone cleared' : 'The call holds')
    : (ledger.closes ? 'The call does not hold' : 'The call does not hold');
  const kicker = ok ? 'Evidence accepted' : 'Evidence rejected';
  const colour = ok ? '#0ca30c' : '#c0392b';

  const consequence = ok
    ? `<p class="verdictWhy"><b>${esc(def(gs.id).name)} is clear to proceed.</b> ${esc(ch.why || lesson.takeaway || '')}</p>`
    : `<div class="wrongAnswerCompare"><div class="answerCompareBox user"><b>Your answer</b>${esc(activeChallenge.userAnswer || '(no answer)')}</div>` +
      `<div class="answerCompareBox correct"><b>What the evidence supports</b>${esc(solution)}</div></div>` +
      `<p class="verdictWhy">${esc(whyText || '')}</p>`;

  const worldNote = ok
    ? `<p class="verdictWhy">Outside, ${esc(def(gs.id).name)} has gone green.</p>`
    : `<p class="verdictWhy">Outside, ${esc(def(gs.id).name)} is showing red, and stays that way until this is settled.</p>`;

  const stopNote = ledger.closes
    ? (isLastStop
        ? `<p class="verdictWhy"><b>All ${completedMissionStops(state).length} stops are complete.</b> Take it back to command.</p>`
        : `<p class="verdictWhy">Stop ${stopIndex + 1} is closed. The next place on the route is open.</p>`)
    : `<p class="verdictWhy"><b>This stop stays open.</b> The team still needs an answer here — go back in and make the call again. The next attempt closes it either way.</p>`;

  const detail = `<details class="verdictDetail"><summary>Show the full reasoning</summary>` +
    reasoningHTML(ch, lesson, solution, whyText) + `</details>`;

  const canRetryNow = !ok && state.reserve >= RETRY_COST;
  const actions =
    (canRetryNow ? `<button class="btn" id="visitRetry" type="button">Answer again · $${RETRY_COST}</button>` : '') +
    (isLastStop && ledger.closes ? `<button class="btn primary" id="completeMissionBtn" type="button">Complete Mission ${state.week}</button>` : '') +
    `<button class="btn ${isLastStop && ledger.closes ? 'ghost' : 'primary'}" id="visitClose" type="button">Return</button>`;

  const card = document.getElementById('verdictCard');
  const vOverlay = document.getElementById('verdictOverlay');
  if(card && vOverlay){
    card.style.setProperty('--vc', colour);
    card.innerHTML =
      `<div class="verdictHead"><div class="verdictKicker">${esc(kicker)}</div>` +
      `<h3 class="verdictTitle">${esc(headline)}</h3>` +
      (stake ? `<p class="verdictStake">${esc(stake)}</p>` : '') + `</div>` +
      `<div class="verdictLedger">${ledgerHTML}</div>` +
      `<div class="verdictBody">${consequence}${worldNote}${stopNote}${detail}</div>` +
      `<div class="verdictActions">${actions}</div>`;
    vOverlay.classList.add('show');
    bindTerms(card);
    const gainEl = card.querySelector('.ledgerValue.gain');
    const gained = ledger.readinessAfter - ledger.readinessBefore;
    if(gainEl && ok && gained > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      const t0 = performance.now(), DUR = 620;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / DUR);
        const eased = 1 - Math.pow(1 - k, 3);
        gainEl.textContent = `+${fmt(gained * eased)}%`;
        if(k < 1) requestAnimationFrame(tick);
      };
      gainEl.textContent = '+0%';
      requestAnimationFrame(tick);
    }
  }
  document.getElementById('modalBody').querySelectorAll('button,select,input,textarea').forEach(b=>{
    if(!b.classList.contains('termChip')) b.disabled=true;
  });
  const closeBtn=document.getElementById('visitClose');
  if(closeBtn){ closeBtn.onclick=()=>{ closeVerdict(); closeModal(); window.dispatchEvent(new CustomEvent('projecty:statechange')); window.dispatchEvent(new CustomEvent('projecty:visitdone')); }; }
  const compBtn=document.getElementById('completeMissionBtn');
  if(compBtn){
    compBtn.onclick=()=>{
      const res=completeMission();
      closeVerdict();
      closeModal();
      window.dispatchEvent(new CustomEvent('projecty:statechange'));
      window.dispatchEvent(new CustomEvent('projecty:visitdone'));
      if(res==='won'){
        // let renderEndScreen handle
      }
    };
  }
  const retryBtn=document.getElementById('visitRetry');
  if(retryBtn){
    retryBtn.onclick=()=>{
      if(state.reserve < RETRY_COST) return;
      state.reserve-=RETRY_COST;
      state.retries=state.retries||{};
      state.retries[key]=true;
      closeVerdict();
      removeMissionStop(stopIndex);
      state.log.push({week:state.week, text:`A $${RETRY_COST} retry was used for Mission ${state.week}, stop ${stopIndex+1}.`});
      save();
      openVisit(gs.id, true);
    };
  }
  save();
  window.dispatchEvent(new CustomEvent('projecty:statechange'));
}

function missionLessonForStop(stop){
  if(!stop) return null;
  const arr=CURRICULUM[stop.group];
  if(!arr) return null;
  return arr[Math.min(stop.lesson, arr.length-1)];
}
function renderMissionLock(id, personHint){
  const state=getState();
  const next=getNextMissionStop();
  const curMission=getCurrentMission(state);
  const nextGroup=next?def(next.group):null;
  const done=completedMissionStops(state);
  const nextIsPerson = next ? isPersonStopForIdx(state, nextMissionStopIndex(state)) : false;
  const hint = personHint ? `<div style="margin-top:8px;padding:8px 10px;background:#e8f0f4;border:1px solid #315c78;border-radius:8px;font-size:.78rem"><b style="color:#315c78">Find a person:</b> ${esc(personHint)}</div>` : '';
  const nextText = nextIsPerson
    ? `Find <b style="color:#315c78">${nextGroup?esc(nextGroup.name):'?'} scientist</b> walking in town — look for <b>[${next?next.group:''}]</b> nameplates (blue beacon follows them).`
    : `Visit the highlighted building (blue beacon) — <b>${nextGroup?esc(nextGroup.name):'?'} (${next?next.group:'?'}) — ${next?esc(next.task):''}</b>.`;
  const body=`<div class="missionBriefing" style="border-left:6px solid #9a741d"><div class="missionCounter">Mission ${state.week} of 15 · ${curMission?esc(curMission.title):''}</div><h3 style="margin:4px 0 6px;font-family:Georgia,serif">${esc(curMission?curMission.title:'Mission route')}</h3><p style="margin:0;font-size:.82rem;color:#4b463d;max-width:760px">${esc(curMission?curMission.objective:'Follow the mission route.')}</p><div style="margin-top:10px;padding:10px 11px;background:#fff;border:1px solid #d9d2c5;border-radius:10px;font-size:.76rem;color:#666158">This building (<b>${esc(def(id).name)}</b>) is not the next stop. Next stop: ${nextText} You can still add Director funds here.</div>${hint}<div class="missionRoute" style="margin-top:10px">${(curMission?.stops||[]).map((s,i)=>{
    const isDone=done.includes(i);
    const isNext=i===nextMissionStopIndex(state);
    const isPerson=isPersonStopForIdx(state,i);
    const cls=isDone?'complete':isNext?'next':'';
    return `<div class="routeStop ${cls}"><span class="routeNum">${isDone?'✓':i+1}</span><div><b>${esc(def(s.group).code)}${isPerson?' · person':''} — ${esc(s.task)}</b><div style="font-size:.68rem;color:#666158">Lesson ${s.lesson+1}${isPerson?' · find walking scientist':''}</div></div></div>`;
  }).join('<span class="routeArrow">→</span>')}</div></div><div class="modalActions"><button class="btn primary" id="goNextMission" type="button">Go to ${nextGroup?esc(nextGroup.code):''} Division</button><button class="btn" id="visitCloseLock" type="button">Stay here</button></div>`;
  openModal(`${def(id).code} Division — Mission locked`, body);
  const go=document.getElementById('goNextMission');
  if(go) go.onclick=()=>{ closeModal(); };
  const cl=document.getElementById('visitCloseLock');
  if(cl) cl.onclick=()=> closeModal();
}
function renderPersonFundingModal(charName, division, cost, lessonTitle, onFund, onDecline){
  const state=getState();
  const canFund = state.reserve >= cost;
  const body=`<div style="padding:12px;background:#f7f0dc;border:1px solid #d9d2c5;border-radius:10px"><div style="font:800 .92rem Georgia,serif">${esc(charName)} — ${esc(def(division).name)} needs funding</div><div style="font-size:.82rem;color:#4e4a43;margin-top:6px">Task: <b>${esc(lessonTitle)}</b></div><div style="margin-top:8px;padding:8px 10px;background:#fff;border:1px solid #dccb9f;border-radius:8px;font-size:.78rem">Director Oppenheimer must decide: fund <b>$${cost}</b> from the $20 Director reserve (current $${fmt(state.reserve)})?<br><span style="color:#9a3f36">If you decline when funds are needed, the project slips <b>12–24h</b>.</span></div><div style="margin-top:10px;display:flex;gap:8px"><button class="btn primary" id="fundPersonBtn" type="button" ${canFund?'':'disabled'}>Fund $${cost} — Approve</button><button class="btn" id="declinePersonBtn" type="button">Decline — incur 12–24h delay</button></div>${!canFund?`<div style="margin-top:8px;font-size:.72rem;color:#9a3f36">Insufficient Director funds — you must decline and accept the delay.</div>`:''}</div>`;
  openModal(`${esc(charName)} — Funding decision`, body);
  const f=document.getElementById('fundPersonBtn');
  if(f) f.onclick=onFund;
  const d=document.getElementById('declinePersonBtn');
  if(d) d.onclick=onDecline;
}
function showChallengeForStop(id, stop, isRetry, person=null){
  const state=getState();
  const gs=state.groups.find(x=>x.id===id);
  const d=def(id);
  const lesson=CURRICULUM[id][stop.lesson];
  const ch=lesson.game;
  activeChallenge={ id, lesson, ch, type:ch.type, hadIssue:!!gs.issue, userAnswer:'', isRetry, stopIndex: stop.index, person };
  let bodyPrefix = scientistPanel(gs, lesson, person) + questionContextHTML(lesson, ch) + visitAssistHTML();
  let challengeHTML='';
  if(ch.type==='Sequence'){
    const orderSeed = state.week*31 + GROUP_DEFS.indexOf(d)*7 + (isRetry?101:0);
    activeOrder={ chosen:[], seed: orderSeed, bank: shuffleSeeded(ch.cards.map((_,i)=>i), orderSeed) };
    challengeHTML = orderHTML(ch);
  } else if(ch.type==='Protocol'){
    activeProtocol={ order: shuffleSeeded(ch.choices.map((_,j)=>j), state.week*57 + GROUP_DEFS.indexOf(d)*11 + lesson.day*3 + (isRetry?101:0)) };
    challengeHTML = protocolHTML(ch);
  } else if(ch.type==='Ballpark'){
    challengeHTML = ballparkHTML(ch);
  } else if(ch.type==='Diagnosis'){
    challengeHTML = diagnosisHTML(ch);
  } else if(ch.type==='TRIAGE'){
    challengeHTML = triageHTML(ch);
  } else if(ch.type==='DIAGNOSIS'){
    challengeHTML = diagnosisHTML(ch);
  } else if(ch.type==='CASEBOOK'){
    challengeHTML = casebookHTML(ch);
  } else {
    if(!ch.proposals){
      challengeHTML = `<div class="feedback bad">Challenge type "${esc(ch.type)}" is not yet implemented. The correct answer is: ${esc(ch.answer||'')}</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="visitCloseFallback" type="button">Return</button></div>`;
    } else {
      challengeHTML = tankHTML(ch);
    }
  }
  let titlePrefix;
  if(person){
    titlePrefix = `${esc(person.name)} — Field question [${d.code}]`;
  } else {
    titlePrefix = isPersonStopForIdx(state, stop.index) ? `${d.code} Division · Field question — ` : `${d.code} Division · Visit`;
  }
  openModal(titlePrefix, bodyPrefix + challengeHTML);
  const body=document.getElementById('modalBody');
  if(ch.type==='Sequence') { bindOrder(); }
  else if(ch.type==='Protocol') { bindProtocol(); }
  else if(ch.type==='Ballpark') { bindBallpark(); }
  else if(ch.type==='Diagnosis') { bindDiagnosis(); }
  else if(ch.type==='TRIAGE') { bindTriage(); }
  else if(ch.type==='DIAGNOSIS') { bindDiagnosis(); }
  else if(ch.type==='CASEBOOK') { bindCasebook(); }
  else if(ch.proposals) { bindTank(); }
  else {
    const btn=document.getElementById('visitCloseFallback');
    if(btn) btn.onclick=()=> closeModal();
  }
  bindVisitAssist();
  bindTerms(body);
}
export function openPersonVisit(npc, isRetry=false){
  const state=getState();
  if(!state || !npc) return;
  const division=npc.division || CHARACTER_DIVISION[npc.char.id] || 'T';
  const nextIdx=nextMissionStopIndex(state);
  const next=getNextMissionStop();
  const isPerson = isPersonStopForIdx(state, nextIdx);
  if(!next || !isPerson || next.group!==division){
    const expectedPid=getPersonIdForStop(state, nextIdx);
    if(!expectedPid || npc.char.id!==expectedPid) return;
  }
  const stop=missionStopForGroup(state, division);
  if(!stop || stop.index!==nextIdx){
    renderMissionLock(division, `Find ${npc.char.name} [${division}] walking near ${def(division).name}.`);
    return;
  }
  // Person asks the same science question as if it were in a building — show that person, not the division leader
  showChallengeForStop(division, stop, isRetry, npc.char);
}
function renderSpecialFundingModal(req, onFund, onDecline){
  const state=getState();
  const canFund = state.reserve >= req.cost;
  const body=`<div style="padding:12px;background:#f7f0dc;border:1px solid #d9d2c5;border-radius:10px">
    <div style="font:800 1.02rem Georgia,serif">${esc(req.title)}</div>
    <div style="font-size:.72rem;color:#666158;margin-top:4px">Mission ${getState().week} · Fourth meeting — ${esc(req.personId)} [${esc(req.division)}] · Request $${req.cost}</div>
    <div style="margin-top:10px;padding:10px 12px;background:#fff;border-left:4px solid #9a741d;border-radius:8px;font-size:.86rem;line-height:1.55">
      <p style="margin:0">${esc(req.paragraphs[0])}</p>
      <p style="margin:10px 0 0">${esc(req.paragraphs[1])}</p>
    </div>
    <div style="margin-top:10px;padding:8px 10px;background:#fff;border:1px solid #dccb9f;border-radius:8px;font-size:.78rem">Director Oppenheimer must decide: fund <b>$${req.cost}</b> from the $20 reserve (current $${fmt(state.reserve)})?<br><span style="color:#9a3f36">If you decline when the request is judged needed, the project slips <b>12–24h</b>.</span></div>
    <div style="margin-top:10px;display:flex;gap:8px"><button class="btn primary" id="fundSpecialBtn" type="button" ${canFund?'':'disabled'}>Fund $${req.cost} — Approve</button><button class="btn" id="declineSpecialBtn" type="button">Decline — incur 12–24h delay</button></div>
    ${!canFund?`<div style="margin-top:8px;font-size:.72rem;color:#9a3f36">Insufficient Director funds — you must decline and accept the delay.</div>`:''}
  </div>`;
  openModal(`${esc(req.title)}`, body);
  const f=document.getElementById('fundSpecialBtn');
  if(f) f.onclick=onFund;
  const d=document.getElementById('declineSpecialBtn');
  if(d) d.onclick=onDecline;
}
export function openSpecialRequest(npc){
  const state=getState();
  if(!state || !npc) return false;
  const week=state.week;
  const req=getSpecialRequest(week);
  if(!req || npc.char.id!==req.personId) return false;
  if(!isSpecialRequestActive(state)) return false;
  renderSpecialFundingModal(req,
    ()=>{
      const s=getState();
      if(s.reserve < req.cost) return;
      s.reserve -= req.cost;
      s.log.push({week:s.week, text:`Director funded $${req.cost} for ${npc.char.name} — ${req.title}. Reserve now $${fmt(s.reserve)}.`});
      if(!Array.isArray(s.specialRequestsCompleted)) s.specialRequestsCompleted=[];
      s.specialRequestsCompleted.push(week);
      s.specialRequestsCompleted.sort((a,b)=>a-b);
      save();
      window.dispatchEvent(new CustomEvent('projecty:statechange'));
      closeModal();
      window.dispatchEvent(new CustomEvent('projecty:visitdone'));
    },
    ()=>{
      const s=getState();
      const hrs=penaltyHours(12,24);
      s.timeHours=Math.min(480, (s.timeHours||8)+hrs);
      s.log.push({week:s.week, text:`Director declined $${req.cost} for ${npc.char.name} — 12–24h penalty applied (${hrs.toFixed(1)}h). — ${req.title}`});
      if(!Array.isArray(s.specialRequestsCompleted)) s.specialRequestsCompleted=[];
      s.specialRequestsCompleted.push(week);
      s.specialRequestsCompleted.sort((a,b)=>a-b);
      save();
      window.dispatchEvent(new CustomEvent('projecty:statechange'));
      closeModal();
      window.dispatchEvent(new CustomEvent('projecty:visitdone'));
    }
  );
  return true;
}
export function openVisit(id, isRetry=false){
  const state=getState();
  if(!state) return;
  const gs=state.groups.find(x=>x.id===id);
  const d=def(id);
  const stop=missionStopForGroup(state, id);
  const nextIdx=nextMissionStopIndex(state);
  if(!stop){
    state.selectedGroup=id;
    save();
    renderMissionLock(id);
    return;
  }
  // if next stop is a person stop, building visit is locked — must find person
  if(isPersonStopForIdx(state, nextIdx) && stop.index===nextIdx){
    const npcName=`walking ${def(stop.group).name} scientist [${stop.group}]`;
    renderMissionLock(id, `Find the ${def(stop.group).name} scientist — look for [${stop.group}] nameplates. This stop requires talking to a person, not entering the building.`);
    return;
  }
  if(stop.index!==nextIdx && !isRetry){
    state.selectedGroup=id;
    save();
    const isDone=completedMissionStops(state).includes(stop.index);
    if(isDone){
      openModal('Mission stop already complete', `<div class="briefBox">This stop is already credited for Mission ${state.week}. Next required: ${getNextMissionStop()?.group||'?'}. ${isPersonStopForIdx(state, nextMissionStopIndex(state))?'Find the walking scientist.':'Follow the blue beacon.'}</div>`);
    } else {
      renderMissionLock(id);
    }
    return;
  }
  showChallengeForStop(id, stop, isRetry);
}
