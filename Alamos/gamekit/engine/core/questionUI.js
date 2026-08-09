import { getState, save, markMissionStopComplete, getNextMissionStop, removeMissionStop, completeMission, advanceTime } from './gameState.js';
import { forecastReadiness, leader, def, currentMilestone, curriculumFor, completeMilestoneIfReady, groupPct, getCurrentMission, missionStopForGroup, missionStopIndex, nextMissionStopIndex, completedMissionStops, missionComplete, isPersonStopForIdx, globalStopIndex, CHARACTER_DIVISION, getSpecialRequest, isSpecialRequestActive, getPersonIdForStop } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { CURRICULUM } from './curriculum.js';
import { GROUP_DEFS } from './divisions.js';
import { BALLPARK_CALCS, JARGON } from './curriculum.js';
import { HINT_COST, MIN_ALLOTMENT_HOURS, RETRY_COST, RETRY_HOURS, SKIP_COST, SKIP_HOURS,
         VISIT_BONUS, ISSUE_VISIT_BONUS } from './constants.js';
import { esc, fmt, clamp, seeded, shuffleSeeded } from './utils.js';
import { TOTAL_HOURS } from './time.js';
import { renderFigure, readingsPanel, dataTable, readout, estimateScale, timeline, matchDiagram } from './figures.js';

let activeChallenge = null;
let activeOrder = null;
let activeCalc = null;
let activeProtocol = null;
let activeDiagnosis = null;

/**
 * The challenge format, canonicalised.
 *
 * The three games spell their formats differently — the chemistry book emits
 * "Sequence", the hospital book "SEQUENCE", and one theme writes
 * "Science Tank" with a space. Comparing raw strings meant 72 of the hospital's
 * lessons matched no branch at all and rendered "challenge type SEQUENCE is not
 * yet implemented" in a shipped game. Compare through this instead.
 */
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');

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
  ['cards','scenarios','choices','givens'].forEach(k=>{
    if(Array.isArray(ch[k])) parts.push(...ch[k].map(v=> typeof v==='string' ? v : `${v.label ?? ''} ${v.mechanism ?? ''}`));
  });
  if(ch.headline) parts.push(ch.headline);
  if(Array.isArray(ch.readings)) ch.readings.forEach(r=> parts.push(r.zone, r.label, r.value, r.note));
  if(Array.isArray(ch.proposals)) ch.proposals.forEach(p=>parts.push(p.text));
  if(kindOf(ch)==='BALLPARK'){
    const spec=BALLPARK_CALCS[`${activeChallenge?activeChallenge.id:''}-${lesson.day}`];
    if(spec) parts.push(spec.prompt,spec.question,...spec.labels,includeAnswer?spec.solution:'',includeAnswer?spec.explanation:'');
  }
  if(includeAnswer) parts.push(ch.answer,ch.why);
  return parts.filter(Boolean).join(' ').toLowerCase();
}
function visitKey(id){
  const state=getState();
  return `${state.week}-${id||activeChallenge?.id}`;
}
function scientificHint(ch, lesson){
  if(kindOf(ch)==='SEQUENCE') return `Begin with "${ch.cards[ch.order[0]]}." That step establishes the condition the later steps depend on.`;
  if(kindOf(ch)==='PROTOCOL') return `One secure match is: "${ch.scenarios[0]}" → "${ch.choices[ch.mapping[0]]}." Use the same cause-and-effect reasoning for the remaining rows.`;
  if(kindOf(ch)==='BALLPARK'){
    const spec=BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`];
    return spec?`Anchor the estimate with "${spec.labels[spec.correct[0]]}." Then choose the remaining scale that makes the displayed relationship physically sensible.`:'Start by identifying the physical scale that should dominate the estimate.';
  }
  if(kindOf(ch)==='DIAGNOSIS'){
    const quiet=(ch.readings||[]).filter(r=> r.status!=='alarm');
    return quiet.length
      ? `Start from a quiet reading, not the alarm: "${quiet[0].zone} — ${quiet[0].label}: ${quiet[0].value}". Any explanation that cannot account for it is out.`
      : 'The right explanation has to fit every reading on the panel, including the calm ones.';
  }
  const rec=ch.recommended||{}, best=Object.keys(rec).sort((a,b)=>(rec[b]||0)-(rec[a]||0))[0];
  return `Proposal ${best||'?' } has the strongest supporting evidence. Consider how each proposal addresses the system-level question with limited resources.`;
}
function solutionText(ch){
  if(kindOf(ch)==='SEQUENCE') return ch.order.map((i,n)=>`${n+1}. ${ch.cards[i]}`).join(' → ');
  if(kindOf(ch)==='PROTOCOL') return ch.scenarios.map((s,i)=>`${s} → ${ch.choices[ch.mapping[i]]}`).join('; ');
  if(kindOf(ch)==='BALLPARK'){ const spec=BALLPARK_CALCS[`${activeChallenge.id}-${activeChallenge.lesson.day}`]; return spec?spec.solution:ch.answer; }
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
    // Idempotent, because several paths bind the same chips: openModal binds
    // when it writes the body, and the challenge renderers bind again after
    // wiring their own controls. Two identical listeners meant the first click
    // opened the definition and the second immediately closed it — so clicking
    // a term did visibly nothing at all.
    if(btn.dataset.termBound) return;
    btn.dataset.termBound = '1';
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
/**
 * Sequence, drawn as a timeline rather than a list.
 *
 * Every slot is on screen from the start, numbered and threaded onto one rail
 * with an arrow down it, because the format's whole lesson is that step two
 * depends on step one having happened. A bulleted list of four cards has no
 * direction in it, so the task read as "tick four boxes" and the ordering was
 * something the Check button knew about and the player did not.
 */
function orderHTML(ch){
  const chosen = (activeOrder && activeOrder.chosen) || [];
  const slots = ch.cards.map((_, n) => {
    const i = chosen[n];
    const filled = Number.isInteger(i);
    const inner = filled
      ? `<button class="tlCard" data-remove="${n}" type="button">${esc(ch.cards[i])}<span class="tlRemove">remove</span></button>`
      : `<div class="tlGhost">${n === chosen.length ? 'next step goes here' : 'empty'}</div>`;
    return `<li class="tlSlot ${filled ? 'filled' : ''}"><span class="tlNum">${n + 1}</span>${inner}</li>`;
  }).join('');
  const bank = ((activeOrder && activeOrder.bank) || []).map(i =>
    `<button class="orderItem tlBankCard" data-add="${i}" type="button">${esc(ch.cards[i])}</button>`).join('')
    || '<div class="compactInstruction">All cards placed.</div>';
  return `<div class="compactInstruction">Put the ${ch.cards.length} steps in order, earliest first.</div>`
    + `<div class="timelineTask"><div class="tlEnd">Earliest</div><ol class="timelineSlots">${slots}</ol><div class="tlEnd">Latest</div></div>`
    + `<div class="tlBankLabel">Steps to place</div><div class="orderBank">${bank}</div>`
    + `<div id="visitFeedback"></div>`
    + `<div class="modalActions"><button class="btn" id="orderReset" type="button">Reset</button><button class="btn primary" id="orderCheck" type="button">Check</button></div>`;
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
  body.innerHTML = challengePrefix(gs, lesson, ch, person) + orderHTML(ch);
  bindOrder(); bindVisitAssist(); bindTerms(body);
}

// ——— Protocol ———
function protocolHTML(ch){
  // The lettered choices are shuffled so that a correct match cannot be read off
  // the display order. activeProtocol.order maps display letter -> real choice index.
  const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
  const letter=j=>String.fromCharCode(65+j);
  return `<div class="compactInstruction">Match each situation to the best scientific explanation or engineering response. The lines redraw as you choose.</div>`
    + `<div id="protoDiagram" class="matchLive">${matchDiagram({ left: ch.scenarios, right: display.map(real=>ch.choices[real]), links: [] })}</div>`
    + `<div class="protocolGrid">${ch.scenarios.map((s,i)=>`<label class="matchRow"><span><b>${i+1}.</b> ${esc(s)}</span><select data-proto="${i}"><option value="">Select…</option>${display.map((real,j)=>`<option value="${j}">${letter(j)}. ${esc(ch.choices[real])}</option>`).join('')}</select></label>`).join('')}</div>`
    + `<div class="choiceList"><div class="choiceListLabel">Choices in full</div><div class="answerMappings">${display.map((real,j)=>`<div><b>${letter(j)}.</b><span>${esc(ch.choices[real])}</span></div>`).join('')}</div></div>`
    + `<div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="protocolCheck" type="button">Check</button></div>`;
}
/** Redraw the connector diagram from whatever the selects currently say. */
function refreshProtocolDiagram(){
  const host=document.getElementById('protoDiagram');
  if(!host||!activeChallenge) return;
  const ch=activeChallenge.ch;
  const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
  const links=[...document.querySelectorAll('[data-proto]')]
    .map((sel,i)=> sel.value===''?null:{ from:i, to:+sel.value })
    .filter(Boolean);
  host.innerHTML=matchDiagram({ left: ch.scenarios, right: display.map(real=>ch.choices[real]), links });
}
function bindProtocol(){
  document.querySelectorAll('[data-proto]').forEach(sel=> sel.addEventListener('change', refreshProtocolDiagram));
  refreshProtocolDiagram();
  const btn=document.getElementById('protocolCheck');
  if(!btn) return;
  btn.onclick=()=>{
    const ch=activeChallenge.ch;
    const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
    const picked=[...document.querySelectorAll('[data-proto]')].map(sel=> sel.value===''?-1:display[+sel.value]);
    if(picked.includes(-1)){ alert('Complete all four matches.'); return; }
    activeChallenge.userAnswer=ch.scenarios.map((sc,i)=>`${sc} → ${ch.choices[picked[i]]}`).join('; ');
    // Kept for the verdict: which join the player drew, and whether it holds.
    activeChallenge.userLinks=picked.map((real,i)=>({ from:i, to:display.indexOf(real), ok: real===ch.mapping[i] }));
    activeChallenge.rightLinks=ch.mapping.map((real,i)=>({ from:i, to:display.indexOf(real), ok:true }));
    activeChallenge.matchRight=display.map(real=>ch.choices[real]);
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
// Slot names a, b, c, … in the order the player filled them. Three was enough
// for two settings and not for the third: an ideal-gas estimate needs n, R, T
// and P, so the name list follows spec.slots rather than being fixed at three.
const CALC_NAMES='abcdefgh'.split('');
function calculateBallpark(spec){
  const vals=activeCalc.chosen.map(i=>spec.values[i]);
  const names=CALC_NAMES.slice(0, Math.max(vals.length, spec.slots||0));
  try{ return Function(...names,`return (${spec.formula})`)(...vals); }catch(e){ return NaN; }
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
  // The running value on an instrument face rather than in a sentence. No
  // target and no scale while the estimate is being built: the moment a target
  // is on screen this stops being an estimate and becomes nudging a needle.
  const complete = activeCalc.chosen.length===spec.slots;
  const result = complete ? calculateBallpark(spec) : NaN;
  const preview = readout({
    label: 'YOUR ESTIMATE',
    value: complete ? formatCalc(result) : '- - -',
    units: complete ? spec.units : '',
    dim: !complete,
    note: `${activeCalc.chosen.length} of ${spec.slots} values placed`,
  });
  return `<div class="ballparkBox"><div class="question">${esc(spec.prompt)}</div><div class="question" style="margin-top:8px;font-weight:700">${esc(spec.question)}</div>${ch.relationship?`<div class="calcLaw"><span class="calcLawLabel">Governing relationship</span><span class="calcLawBody">${esc(ch.relationship)}</span></div>`:''}<div class="numberBank">${bank}</div><div class="calcEquation">${equation}</div><div class="calcReadout">${preview}</div><div class="calcActions"><button class="btn small" id="calcClear" type="button">Clear</button><button class="btn primary small" id="calcSubmit" type="button">Check estimate</button></div></div><div id="visitFeedback"></div>`;
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
  body.innerHTML = challengePrefix(gs, lesson, ch, person) + ballparkBody(ch,spec);
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
    activeChallenge.userValue=result;   // the verdict draws it against the target
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

// ——— Science Tank ———
function tankHTML(ch){
  return `<div class="compactInstruction">Spend most of the 100 points across the proposals. The whole distribution is graded, not just your top pick: fund every proposal the evidence supports, and starve the ones it does not.</div><div class="tankGrid">${ch.proposals.map(p=>`<label class="tankProposal"><div><b>Proposal ${esc(p.label)}</b><p>${esc(p.text)}</p></div><input type="number" min="0" max="100" step="5" value="0" data-tank="${esc(p.label)}"><span>points</span></label>`).join('')}</div>${ch.research?`<details class="researchReveal"><summary>Evidence available</summary><div style="white-space:pre-wrap">${esc(ch.research)}</div></details>`:''}<div class="tankTotal">Allocated: <b id="tankTotal">0</b> / 100</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="tankCheck" type="button">Check</button></div>`;
}
function triageHTML(ch){
  const opts=(ch.choices||[]).map((c,i)=>`<button class="orderItem" data-triage="${i}" type="button"><b>${String.fromCharCode(65+i)}.</b> ${esc(c)}</button>`).join('');
  return `<div class="compactInstruction">${esc(ch.task||ch.question||'Choose who needs help first.')}</div><div class="orderBank" style="display:grid;gap:8px">${opts}</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="triageCheck" type="button" disabled>Choose</button></div>`;
}
/**
 * DIAGNOSIS — differential reasoning from an instrument panel.
 *
 * The format's whole lesson is that the loud reading gets your attention and
 * the right explanation fits the *whole* panel, so the panel has to be visible
 * while the player chooses: the figure, every zone including the quiet ones,
 * and the numbers behind both. A list of sentences cannot teach it, which is
 * what this renderer replaced.
 *
 * A candidate is { label, mechanism }; plain strings still work, so the older
 * hospital-shaped content renders unchanged.
 */
function diagnosisHTML(ch){
  const all=(ch.choices||[]).map(c=> typeof c==='string' ? { label:c, mechanism:'' } : c);
  // Display order is shuffled, and `order` maps display position back to the
  // real index. Authored packs tend to put the correct explanation first; a
  // player who notices that stops reading the panel, which is the whole game.
  const state=getState();
  const order=shuffleSeeded(all.map((_,i)=>i),
    state.week*63 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*17 + 5);
  activeDiagnosis={ order };
  const opts=order.map((real,i)=>{
    const c=all[real];
    return `<button class="candidate" data-diagnosis="${real}" type="button">`
      + `<b>${String.fromCharCode(65+i)}.</b><span class="candidateLabel">${esc(c.label)}</span>`
      + (c.mechanism?`<span class="candidateMechanism">${esc(c.mechanism)}</span>`:'')
      + `</button>`;
  }).join('');
  const headline = ch.headline
    ? `<div class="alarmLine"><span aria-hidden="true">■</span> ${esc(ch.headline)}</div>` : '';
  // An L4 panel is one no single cause fits: the answer is a pair, so the
  // candidates become a multiple choice of exactly two rather than one.
  const pairN = Array.isArray(ch.correctChoices) ? ch.correctChoices.length : 0;
  const instruction = pairN
    ? `Choose the ${pairN === 2 ? 'two' : pairN} that together account for every reading — no single cause does.`
    : (ch.play || ch.task || 'Which explanation fits every reading, not just the loudest one?');
  return headline
    + renderFigure(ch.figure)
    + readingsPanel(ch.readings)
    + dataTable(ch.figure, ch.readings)
    + `<div class="compactInstruction">${esc(instruction)}</div>`
    + `<div class="candidateBank">${opts}</div>`
    + `<div id="visitFeedback"></div>`
    + `<div class="modalActions"><button class="btn primary" id="diagnosisCheck" type="button" disabled>Check</button></div>`;
}
/**
 * CHOICE — one question, four candidates, and the reason each wrong one is wrong.
 *
 * Not every question in a book is a Protocol or a Diagnosis. The hospital book
 * asks plenty of straight comprehension questions ("which of these is a
 * measurement?"), and the importer typed them as DIAGNOSIS and CASEBOOK because
 * those were the nearest formats it knew. They then rendered as an instrument
 * panel with no instruments and a funding round with placeholder proposals.
 * This is what they always were.
 *
 * `rebuttals` — "B. Luis looks worried. — Looking worried is an observation." —
 * are carried by the content and shown in the verdict, so a wrong answer is
 * told why it is wrong rather than only what the right one was.
 */
function choiceHTML(ch){
  const all=(ch.choices||[]).map(c=> typeof c==='string' ? { label:c, mechanism:'' } : c);
  const state=getState();
  const order=shuffleSeeded(all.map((_,i)=>i),
    state.week*41 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*13 + 7);
  const opts=order.map((real,i)=>{
    const c=all[real];
    return `<button class="candidate" data-choice="${real}" type="button">`
      + `<b>${String.fromCharCode(65+i)}.</b><span class="candidateLabel">${esc(c.label)}</span>`
      + (c.mechanism?`<span class="candidateMechanism">${esc(c.mechanism)}</span>`:'')
      + `</button>`;
  }).join('');
  return `<div class="compactInstruction">${esc(ch.question||ch.task||ch.play||'Choose the best answer.')}</div>`
    + `<div class="candidateBank">${opts}</div>`
    + `<div id="visitFeedback"></div>`
    + `<div class="modalActions"><button class="btn primary" id="choiceCheck" type="button" disabled>Check</button></div>`;
}
function bindChoice(){
  const ch=activeChallenge.ch;
  let chosen=null;
  const btns=[...document.querySelectorAll('[data-choice]')];
  const check=document.getElementById('choiceCheck');
  btns.forEach(b=> b.addEventListener('click', ()=>{
    btns.forEach(x=> x.classList.remove('selected'));
    b.classList.add('selected'); chosen=+b.dataset.choice; if(check) check.disabled=false;
  }));
  if(!check) return;
  check.onclick=()=>{
    const picked=ch.choices[chosen];
    const label = typeof picked==='string' ? picked : picked.label;
    activeChallenge.userAnswer=label;
    finishVisit(label===(ch.correctChoice||ch.answer));
  };
}
function casebookHTML(ch){
  if(ch.proposals) return tankHTML(ch);
  const opts=(ch.choices||[]).map((c,i)=>`<div><b>${String.fromCharCode(65+i)}.</b> ${esc(c)}</div>`).join('');
  return `<div class="compactInstruction">${esc(ch.task||'Match the clues to the best explanation.')}</div><div class="protocolGrid">${(ch.scenarios||ch.cards||[]).map((s,i)=>`<label class="matchRow"><span><b>${i+1}.</b> ${esc(s)}</span><select data-casebook="${i}"><option value="">Select…</option>${(ch.choices||[]).map((c,j)=>`<option value="${j}">${String.fromCharCode(65+j)}. ${esc(c)}</option>`).join('')}</select></label>`).join('')}</div><div class="choiceList"><div class="choiceListLabel">Choices</div><div class="answerMappings">${opts}</div></div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="casebookCheck" type="button">Check</button></div>`;
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
    return `<div class="scientistPanel"><div style="text-align:center">${personAvatarSvg(person)}<div class="visitTag" style="margin-top:6px">${esc(person.name)}</div><div style="font-size:.68rem;color:#666158;margin-top:2px">${esc(person.role)}</div></div><div class="scientistSpeech"><div class="speechTag">Week ${getState().week} · ${esc(def(gs.id).name)} — with ${esc(person.name)}</div><h4>${esc(lesson.title)}</h4><p style="font-size:.82rem;color:#4e4a43;margin:6px 0 0">${esc(lesson.place||'')}</p></div></div>`;
  }
  const l=leader(gs.leaderId);
  return `<div class="scientistPanel"><div style="text-align:center">${avatarSvgSmall(l.id)}<div class="visitTag" style="margin-top:6px">${esc(l.name)}</div></div><div class="scientistSpeech"><div class="speechTag">Week ${getState().week} · ${esc(def(gs.id).name)}</div><h4>${esc(lesson.title)}</h4><p style="font-size:.82rem;color:#4e4a43;margin:6px 0 0">${esc(lesson.place||'')}</p></div></div>`;
}
/**
 * Why this particular stop, right now.
 *
 * The mission's stake is written once and read once, at the briefing, and by
 * the third stop nobody remembers why any of it mattered. This is the line
 * above the question that keeps it in front of the player, and it moves: it
 * knows which stop of how many this is, how the earlier ones went, and how
 * much of the clock is gone. Composed rather than authored, so it cannot fall
 * out of step with content and needs nothing written per stop — a theme that
 * *does* write one puts it on the stop as `why`, and that wins.
 */
function stopDramaHTML(){
  const state=getState();
  const m=getCurrentMission(state);
  if(!m) return '';
  const stops=m.stops ?? [];
  const idx=activeChallenge?.stopIndex ?? 0;
  const n=stops.length;
  const authored=stops[idx]?.why;

  const done=completedMissionStops(state).filter(i=>i!==idx);
  const results=state.missionResults ?? {};
  const missed=done.filter(i=> results[`${state.week}-${i}`]?.correct===false).length;

  let line;
  if(authored){
    line=authored;
  } else if(idx===0){
    line=`First call of ${n}. Nothing else in this mission moves until it is made.`;
  } else if(idx===n-1){
    line=missed
      ? `Last call of ${n}, and ${missed===1?'one earlier call did':`${missed} earlier calls did`} not hold. `
        + `Whatever the team carries out of here, this is the part they will be asked about.`
      : `Last call of ${n}. This is the one that closes the mission and goes into the handoff.`;
  } else {
    line=missed
      ? `Stop ${idx+1} of ${n}. The last call did not hold, so this one is carrying more than its share.`
      : `Stop ${idx+1} of ${n}. The first result is holding; this is what it rests on next.`;
  }

  const hours=state.timeHours ?? 0;
  const left=Math.max(0, Math.round((TOTAL_HOURS - hours) / 24));
  const clock=`Day ${Math.floor(hours/24)+1} · ${left} day${left===1?'':'s'} left`;
  return `<div class="stopDrama"><div class="stopDramaLine">${esc(line)}</div>`
    + `<div class="stopDramaClock">${esc(clock)}</div></div>`;
}
function questionContextHTML(lesson,ch){
  const text=allChallengeText(lesson,ch,false);
  // What is riding on this, in one sentence, before the question is asked. The
  // books write it for every mission and it was only ever used in the briefing,
  // where the player reads it once and forgets it.
  // Not every book writes a separate stake line. Where there is none, the
  // first sentence of the briefing is the nearest thing the author wrote.
  const m=getCurrentMission(getState());
  const stake=m ? (m.stake || String(m.briefing||'').split(/(?<=\.)\s/)[0]) : '';
  const stakeHTML=stake?`<div class="stakeLine"><span aria-hidden="true">▲</span> ${esc(stake)}</div>`:'';
  return stopDramaHTML()+stakeHTML
    +`<div class="scienceBrief storyBrief"><p>${esc(storyBriefText(lesson))}</p></div>`+jargonHTML(text);
}
/**
 * The instrument for this question, for every format.
 *
 * `figure` used to be a DIAGNOSIS-only field, which is why every other format
 * was a paragraph with buttons under it. Any lesson can carry one now — on the
 * challenge (`ch.figure`) or on the lesson — and it renders above the controls
 * with its data table, so the picture is never the only channel.
 *
 * DIAGNOSIS is excluded here because it lays out its own figure, readings and
 * table together; passing through this would draw the figure twice.
 */
function figureBlock(lesson, ch){
  const fig = ch.figure ?? lesson.figure;
  if(!fig) return '';
  return renderFigure(fig) + dataTable(Array.isArray(fig) ? fig[0] : fig, null);
}
/** Everything above the controls. One function, so the three render paths agree. */
function challengePrefix(gs, lesson, ch, person){
  return scientistPanel(gs, lesson, person)
    + questionContextHTML(lesson, ch)
    + (kindOf(ch) === 'DIAGNOSIS' ? '' : figureBlock(lesson, ch))
    + visitAssistHTML();
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
  if(kindOf(ch)==='SEQUENCE') detail=`<ol class="reasonList">${ch.order.map((idx,n)=>`<li><b>${n+1}.</b> ${esc(ch.cards[idx])}</li>`).join('')}</ol>`;
  else if(kindOf(ch)==='PROTOCOL') detail=`<div class="answerMappings">${ch.scenarios.map((s,i)=>`<div><b>${esc(s)}</b><span>${esc(ch.choices[ch.mapping[i]])}</span></div>`).join('')}</div>`;
  else if(kindOf(ch)==='BALLPARK'){
    const spec=BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`];
    detail=spec?`<p>The appropriate estimates are <b>${spec.correct.map(i=>esc(spec.labels[i])).join(', ')}</b>. Inserting them into the displayed relationship gives <b>${esc(spec.solution)}</b>. ${esc(spec.explanation)}</p>`:`<p>${esc(whyText)}</p>`;
  } else if(kindOf(ch)==='SCIENCETANK'){
    const rec=ch.recommended||{};
    detail=`<div class="proposalReview">${(ch.proposals||[]).map(p=>`<div><b>Proposal ${esc(p.label)}</b><span>${esc(p.text)}</span><em>${rec[p.label]!==undefined?`Recommended weight: ${rec[p.label]} points`:''}</em></div>`).join('')}</div>`;
  } else {
    detail=`<p>${esc(whyText)}</p>`;
  }
  // Why each wrong answer is wrong, where the book wrote it. Being told only
  // the right answer leaves the player's own reasoning untouched.
  if(Array.isArray(ch.rebuttals) && ch.rebuttals.length){
    detail += `<div class="rebuttals"><div class="rebuttalsLabel">Why the others do not hold</div>`
      + `<ul>${ch.rebuttals.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>`;
  }
  const takeaway=lesson.takeaway?`<div class="answerScienceLead">${esc(lesson.takeaway)}</div>`:'';
  return `${detail}${takeaway}<p style="margin-top:8px"><b>Correct answer:</b> ${esc(solution)}</p><p><b>Why:</b> ${esc(whyText)}</p>`;
}

/**
 * The verdict, drawn.
 *
 * A wrong answer used to be reported as two boxes of text — your string, the
 * correct string — which for an estimate meant "you said 4e-3, the answer is
 * 0.12" and no sense at all of *how* wrong that is. Each format gets the
 * picture that carries its own kind of wrongness: a log scale for a factor, a
 * rail for an order, crossed lines for a mismatch.
 */
function verdictFigureHTML(ch, lesson, ok){
  if(kindOf(ch)==='BALLPARK'){
    const spec=BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`];
    const yours=activeChallenge.userValue;
    if(spec && Number.isFinite(spec.target) && spec.target>0 && Number.isFinite(yours) && yours>0){
      const within=Math.abs(yours-spec.target)<=spec.tolerance;
      return estimateScale({ yours, target: spec.target, tolerance: spec.tolerance,
        headline: ok ? undefined : (within ? 'close on the number, but built from the wrong quantities' : undefined),
        caption: `Your estimate against the true value${spec.units?` (${spec.units})`:''}, on a log scale` });
    }
    return '';
  }
  if(kindOf(ch)==='SEQUENCE'){
    const placed=(activeOrder&&activeOrder.chosen)||[];
    return timeline({ label:'The order that works',
      steps: ch.order.map((idx,n)=>({ label: ch.cards[idx],
        status: placed[n]===idx ? 'normal' : placed.length ? 'alarm' : undefined,
        note: placed.length && placed[n]!==idx && Number.isInteger(placed[n]) ? `you put "${ch.cards[placed[n]]}" here` : '' })),
      caption:'Green where your order matched; red where it did not' });
  }
  if(kindOf(ch)==='PROTOCOL' && activeChallenge.userLinks){
    // Both readings at once: the joins that hold, and where a wrong one went
    // instead. Showing only the player's lines says "these four are wrong" and
    // leaves them to work out the right pairing from a paragraph.
    const wrong=activeChallenge.userLinks.filter(l=>!l.ok);
    return matchDiagram({ left: ch.scenarios, right: activeChallenge.matchRight||[],
      links: [...(activeChallenge.rightLinks||[]), ...wrong],
      caption: wrong.length ? 'Solid green: the joins that hold. Dashed red: where yours went instead'
                            : 'Every join holds' });
  }
  if(kindOf(ch)==='DIAGNOSIS') return renderFigure(ch.figure);
  return renderFigure(ch.figure ?? lesson.figure);
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
function bindDiagnosis(){
  const ch=activeChallenge.ch;
  const want = Array.isArray(ch.correctChoices) ? ch.correctChoices : null;
  const need = want ? want.length : 1;
  const btns=[...document.querySelectorAll('[data-diagnosis]')];
  const check=document.getElementById('diagnosisCheck');
  const chosen=new Set();
  const labelOf=(i)=>{ const c=ch.choices[i]; return typeof c==='string' ? c : c.label; };
  btns.forEach(b=> b.addEventListener('click', ()=>{
    const i=+b.dataset.diagnosis;
    if(need===1){
      chosen.clear(); chosen.add(i);
      btns.forEach(x=> x.classList.remove('selected'));
      b.classList.add('selected');
    } else {
      // Toggling, with a hard cap at the number the panel asks for: without it
      // a player can select every candidate and be right by exhaustion.
      if(chosen.has(i)){ chosen.delete(i); b.classList.remove('selected'); }
      else if(chosen.size < need){ chosen.add(i); b.classList.add('selected'); }
    }
    if(check) check.disabled = chosen.size !== need;
  }));
  if(!check) return;
  check.onclick=()=>{
    const picked=[...chosen].map(labelOf);
    activeChallenge.userAnswer=picked.join(' + ');
    const ok = want
      ? picked.length===want.length && picked.every(l=> want.includes(l))
      : picked[0]===(ch.correctChoice||ch.answer);
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
  // so the only cost of being wrong was a number the player never saw.
  //
  // The second attempt always closes it, right or wrong: the design book is
  // explicit that a mistake must never trap anyone, and that a player who has
  // read the full explanation has still learned the thing.
  state.attempts = state.attempts || {};
  const attemptKey = state.week + '-' + stopIndex;
  const attempt = (state.attempts[attemptKey] || 0) + 1;
  state.attempts[attemptKey] = attempt;
  // Only a correct call closes the stop by itself. A wrong one leaves it open
  // and lets the player choose: answer again, or take the miss and move on.
  // Both are on offer in money or in time, so this can never trap anyone —
  // which is what the old "second attempt closes it regardless" rule was for.
  const closes = ok;
  if(closes) markMissionStopComplete(stopIndex, ok);

  // What this cost, for the panel to show. Time was already being charged in
  // silence; readiness only ever appeared as a line in the log.
  const clockBefore = state.timeHours || 8;
  const projectionBefore = forecastReadiness(state).overall;
  const milestoneBefore = gs.milestone;
  // Which areas the world should show as unresolved.
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
    // The only automatic charge: the time the attempt itself took. Everything
    // beyond this is a choice the player makes and can see the price of.
    state.timeHours = Math.min(480, (state.timeHours||8) + MIN_ALLOTMENT_HOURS);
    state.log.push({week:state.week, text:`Attempt took ${MIN_ALLOTMENT_HOURS}h.`});
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
  const bp=kindOf(ch)==='BALLPARK'? BALLPARK_CALCS[`${activeChallenge.id}-${lesson.day}`]:null;
  const whyText=kindOf(ch)==='BALLPARK' ? (bp?.explanation || ch.why) : ch.why;
  // Nothing on the correct path: the block this is nested inside already prints
  // the "Correct" heading, and reasoningHTML below already prints the why. It
  // used to render a second, identical feedback box, so every correct answer
  // read "Correct / Correct" and gave its reasoning twice.
  const comparison = ok
    ? ''
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
    : `<p class="verdictWhy"><b>This stop stays open.</b> The team still needs an answer here. Answering again costs money or time; so does moving on without it. Nothing is decided until you choose.</p>`;

  const detail = `<details class="verdictDetail"><summary>Show the full reasoning</summary>` +
    reasoningHTML(ch, lesson, solution, whyText) + `</details>`;

  // A wrong call is a decision, not a punishment: two ways forward, each
  // priced in money or in time. The money buttons disable when the reserve
  // cannot cover them; the time ones never can, so a broke player is never stuck.
  const priced = (id, label, cost, hours) =>
    '<button class="btn priced" id="' + id + '" type="button"' +
    (cost > state.reserve ? ' disabled' : '') + '>' +
    '<span>' + esc(label) + '</span><small>' +
    (cost ? '$' + cost : hours + ' h') + '</small></button>';
  const group = (label, a, b) =>
    '<div class="verdictChoice"><div class="verdictChoiceLabel">' + esc(label) + '</div>' + a + b + '</div>';
  const choices = ok ? '' :
    group('Answer again',
      priced('retryMoney', 'Pay for another attempt', RETRY_COST, 0),
      priced('retryTime',  'Take the time instead',   0, RETRY_HOURS)) +
    group('Move on without it',
      priced('skipMoney',  'Buy the team past it',    SKIP_COST, 0),
      priced('skipTime',   'Lose the day instead',    0, SKIP_HOURS));
  const actions =
    (isLastStop && ledger.closes
      ? '<button class="btn primary" id="completeMissionBtn" type="button">Complete Mission ' + state.week + '</button>'
      : '') +
    '<button class="btn ' + (ok ? 'primary' : 'ghost') + '" id="visitClose" type="button">' +
    (ok ? 'Return' : 'Decide later') + '</button>';

  const card = document.getElementById('verdictCard');
  const vOverlay = document.getElementById('verdictOverlay');
  if(card && vOverlay){
    card.style.setProperty('--vc', colour);
    card.innerHTML =
      `<div class="verdictHead"><div class="verdictKicker">${esc(kicker)}</div>` +
      `<h3 class="verdictTitle">${esc(headline)}</h3>` +
      (stake ? `<p class="verdictStake">${esc(stake)}</p>` : '') + `</div>` +
      `<div class="verdictLedger">${ledgerHTML}</div>` +
      `<div class="verdictBody">${verdictFigureHTML(ch, lesson, ok)}${consequence}${worldNote}${stopNote}${detail}</div>` +
      choices +
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
  // The four ways out of a wrong call. Each spends exactly what its button
  // said it would, logs it, and then either reopens the question or closes the
  // stop as a miss.
  const spend = (money, hours, why) => {
    if(money){ state.reserve -= money; }
    if(hours){ state.timeHours = Math.min(480, (state.timeHours || 8) + hours); }
    state.log.push({ week: state.week, text: why });
  };
  const again = (money, hours) => {
    spend(money, hours, `Second attempt at Mission ${state.week}, stop ${stopIndex + 1}` +
      (money ? ` cost $${money}.` : ` cost ${hours}h.`));
    state.retries = state.retries || {};
    state.retries[key] = true;
    closeVerdict();
    removeMissionStop(stopIndex);
    save();
    openVisit(gs.id, true);
  };
  const moveOn = (money, hours) => {
    spend(money, hours, `Moved past Mission ${state.week}, stop ${stopIndex + 1} unresolved` +
      (money ? ` for $${money}.` : `, losing ${hours}h.`));
    // Credited as attempted-and-wrong: the stop closes, the readiness does not.
    markMissionStopComplete(stopIndex, false);
    save();
    closeVerdict();
    closeModal();
    window.dispatchEvent(new CustomEvent('projecty:statechange'));
    window.dispatchEvent(new CustomEvent('projecty:visitdone'));
  };
  const bind = (id, fn) => { const b = document.getElementById(id); if(b && !b.disabled) b.onclick = fn; };
  bind('retryMoney', () => again(RETRY_COST, 0));
  bind('retryTime',  () => again(0, RETRY_HOURS));
  bind('skipMoney',  () => moveOn(SKIP_COST, 0));
  bind('skipTime',   () => moveOn(0, SKIP_HOURS));

  save();
  window.dispatchEvent(new CustomEvent('projecty:statechange'));
}

function missionLessonForStop(stop){
  if(!stop) return null;
  const arr=CURRICULUM[stop.group];
  if(!arr) return null;
  return arr[Math.min(stop.lesson, arr.length-1)];
}
/**
 * You are in a room that has no case open right now.
 *
 * This used to be a refusal — "Mission locked", a paragraph about what you
 * could not do, and a door that would not let you in. Every room is walkable
 * whenever you like now; what changes with the mission is whether there is a
 * case waiting on the stand. So this card says what the room is, what is open
 * elsewhere, and gets out of the way.
 */
function renderMissionLock(id, personHint){
  const state=getState();
  const next=getNextMissionStop();
  const curMission=getCurrentMission(state);
  const nextGroup=next?def(next.group):null;
  const done=completedMissionStops(state);
  const nextIsPerson = next ? isPersonStopForIdx(state, nextMissionStopIndex(state)) : false;
  const hint = personHint ? `<div class="roomIdleHint">${esc(personHint)}</div>` : '';
  const nextText = nextIsPerson
    ? `with the <b>${nextGroup?esc(nextGroup.name):'?'}</b> person — look for the <b>[${next?next.group:''}]</b> nameplate`
    : `in <b>${nextGroup?esc(nextGroup.name):'?'}</b>${next?` — ${esc(next.task)}`:''}`;
  const body=`<div class="roomIdle">`
    + `<div class="roomIdleLead">Nothing is waiting for you here at the moment. Look around as long as you like — the instruments are live and the people will talk to you.</div>`
    + `<div class="roomIdleNext">The open case is ${nextText}${/[.?!]$/.test(nextText.replace(/<[^>]+>/g,'')) ? '' : '.'}</div>`
    + hint
    + `<div class="missionRoute" style="margin-top:12px">${(curMission?.stops||[]).map((s,i)=>{
        const isDone=done.includes(i);
        const isNext=i===nextMissionStopIndex(state);
        const isPerson=isPersonStopForIdx(state,i);
        const cls=isDone?'complete':isNext?'next':'';
        return `<div class="routeStop ${cls}"><span class="routeNum">${isDone?'✓':i+1}</span><div><b>${esc(def(s.group).code)}${isPerson?' · person':''} — ${esc(s.task)}</b><div style="font-size:.68rem;color:#666158">Lesson ${s.lesson+1}${isPerson?' · find the person, not the room':''}</div></div></div>`;
      }).join('<span class="routeArrow">→</span>')}</div>`
    + `</div>`
    + `<div class="modalActions"><button class="btn primary" id="visitCloseLock" type="button">Keep looking around</button></div>`;
  // openModal writes the title with textContent, so it must not be pre-escaped:
  // "Bones, Muscles &amp; Skin" is what the player would read otherwise.
  openModal(`${def(id).name} — no case open right now`, body);
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
  let bodyPrefix = challengePrefix(gs, lesson, ch, person);
  let challengeHTML='';
  if(kindOf(ch)==='SEQUENCE'){
    const orderSeed = state.week*31 + GROUP_DEFS.indexOf(d)*7 + (isRetry?101:0);
    activeOrder={ chosen:[], seed: orderSeed, bank: shuffleSeeded(ch.cards.map((_,i)=>i), orderSeed) };
    challengeHTML = orderHTML(ch);
  } else if(kindOf(ch)==='PROTOCOL'){
    activeProtocol={ order: shuffleSeeded(ch.choices.map((_,j)=>j), state.week*57 + GROUP_DEFS.indexOf(d)*11 + lesson.day*3 + (isRetry?101:0)) };
    challengeHTML = protocolHTML(ch);
  } else if(kindOf(ch)==='BALLPARK'){
    challengeHTML = ballparkHTML(ch);
  } else if(kindOf(ch)==='TRIAGE'){
    challengeHTML = triageHTML(ch);
  } else if(kindOf(ch)==='DIAGNOSIS'){
    challengeHTML = diagnosisHTML(ch);
  } else if(kindOf(ch)==='CASEBOOK'){
    challengeHTML = casebookHTML(ch);
  } else if(kindOf(ch)==='CHOICE'){
    challengeHTML = choiceHTML(ch);
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
  if(kindOf(ch)==='SEQUENCE') { bindOrder(); }
  else if(kindOf(ch)==='PROTOCOL') { bindProtocol(); }
  else if(kindOf(ch)==='BALLPARK') { bindBallpark(); }
  else if(kindOf(ch)==='TRIAGE') { bindTriage(); }
  else if(kindOf(ch)==='DIAGNOSIS') { bindDiagnosis(); }
  else if(kindOf(ch)==='CASEBOOK') { bindCasebook(); }
  else if(kindOf(ch)==='CHOICE') { bindChoice(); }
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
  const division=npc.division || CHARACTER_DIVISION[npc.char.id] || 'TRI';
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
