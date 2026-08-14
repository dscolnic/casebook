import { getState, save, markMissionStopComplete, getNextMissionStop, removeMissionStop, completeMission, advanceTime } from './gameState.js';
import { forecastReadiness, leader, def, currentMilestone, curriculumFor, completeMilestoneIfReady, groupPct, getCurrentMission, missionStopForGroup, missionStopIndex, nextMissionStopIndex, openStopIndices, openStopGroups, completedMissionStops, missionComplete, isPersonStopForIdx, globalStopIndex, CHARACTER_DIVISION, getSpecialRequest, isSpecialRequestActive, getPersonIdForStop } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { CURRICULUM } from './curriculum.js';
import { GROUP_DEFS } from './divisions.js';
import { BALLPARK_CALCS, JARGON } from './curriculum.js';
import { HINT_COST, MIN_ALLOTMENT_HOURS, RETRY_COST, RETRY_HOURS, SKIP_COST, SKIP_HOURS,
         VISIT_BONUS, ISSUE_VISIT_BONUS } from './constants.js';
import { esc, fmt, clamp, seeded, shuffleSeeded } from './utils.js';

/**
 * The per-playthrough component of every option shuffle.
 *
 * Each shuffle below is seeded on the day, the area and a per-format constant,
 * which makes the order stable *within* a campaign — necessary, or re-opening a
 * question would deal the options again under the player. It also made the order
 * identical in every campaign anybody ever played, so a second run tested memory
 * of where the answer sat rather than the science. `runSeed` is drawn once when
 * a campaign starts and saved with it.
 */
const runSeed = () => Number(getState()?.runSeed) || 0;
import { formatCountdown } from './day.js';
import { renderFigure, readingsPanel, dataTable, readout, estimateScale, timeline, matchBoard } from './figures.js';

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

/**
 * The glossary terms a piece of text is written in.
 *
 * Matched at a word start, not with `includes`. A substring test offered the
 * player a definition button for Ion every time a question said "solution" or
 * "region" — Riverton's glossary carries the bare alias "ion", and that is the
 * word it hides inside most often.
 *
 * A suffix is allowed, so an inflected term still gets its chip: "detonators"
 * and "hydrodynamic tests" are the term. Aliases of three characters or fewer
 * have to match a whole word, which is what keeps "ion" and "pH" honest. Same
 * rule as `primeMissions` in engine/content/normalize.js and as `make-book.mjs`,
 * deliberately: a chip the player can click is a term the card named.
 */
function jargonMatches(text, max=12){
  const normalized=` ${String(text||'').toLowerCase()} `;
  const hit=(a)=>{
    const w=String(a).toLowerCase().trim();
    if(w.length<2) return false;
    const e=w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return new RegExp(`(^|[^a-z0-9])${e}${w.length<=3?'([^a-z0-9]|$)':''}`).test(normalized);
  };
  const found=[];
  for(const item of JARGON){
    if([item.name,...(item.aliases??[])].filter(Boolean).some(hit)){ found.push(item); if(found.length>=max) break; }
  }
  return found;
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
    // "Quiet" means normal, not merely un-alarmed: a pack's key readings are
    // the ones the puzzle turns on, and pointing the player at one as though it
    // were incidental is the opposite of the hint.
    const quiet=(ch.readings||[]).filter(r=> r.status==='normal');
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
/**
 * A portrait, drawn from the person's own id.
 *
 * It was a rounded square with the first letter of their name in it, which is
 * a placeholder, and it sat next to three lines of metadata that mattered to
 * nobody. The person asking is the one part of this panel that should look
 * like something: a bust in their group's colour, with skin, hair and build
 * varied by a hash of their id so the same person is the same face every time.
 *
 * Deliberately flat and geometric — the same language as the rigs walking
 * around outside, not an attempt at a photograph.
 */
const SKINS = ['#f0c9a4', '#e0ab7d', '#c78a5c', '#a2663d', '#7d4b2a', '#5c3720'];
const HAIRS = ['#2b2119', '#4a3526', '#6f5137', '#8d7a5f', '#b8b2a8', '#3a2f2a'];
function hashOf(str){
  let n = 0;
  for(const c of String(str || '?')) n = (n * 31 + c.charCodeAt(0)) >>> 0;
  return n;
}
export function portraitSvg(person, accent){
  const h = hashOf(person?.id || person?.name);
  // Unsigned shifts throughout. `hashOf` returns a full 32-bit value, and a
  // signed `>>` on anything above 2^31 goes negative — which indexes a style
  // array at -1 and puts the literal text "undefined" in the middle of the
  // portrait, for about half of all ids.
  const skin = SKINS[h % SKINS.length];
  const hair = HAIRS[(h >>> 3) % HAIRS.length];
  const col = accent || person?.color || '#3b566b';
  const style = (h >>> 6) % 4;                     // cropped, swept, tied back, bald
  const glasses = ((h >>> 9) % 4) === 0;
  const W = 132, H = 148, cx = W / 2, cy = 58;
  const rx = 25, ry = 29;
  const hairShape = [
    // cropped: a close cap that stops above the brow
    `<path d="M${cx - rx - 1} ${cy - 6} q1-27 ${rx + 1}-27 q${rx} 0 ${rx + 1} 27 q-7-13-${rx + 1}-13 q-19 0-${rx + 1} 13z" fill="${hair}"/>`,
    // swept: a side parting with a fringe across one side
    `<path d="M${cx - rx - 1} ${cy - 4} q0-29 ${rx + 2}-29 q${rx} 0 ${rx}-27 q6 30-14 32 q-16 2-24 10 q-4 4-5 14z" fill="${hair}"/>`,
    // tied back: cap plus a bun behind
    `<path d="M${cx - rx - 1} ${cy - 6} q1-27 ${rx + 1}-27 q${rx} 0 ${rx + 1} 27 q-7-13-${rx + 1}-13 q-19 0-${rx + 1} 13z" fill="${hair}"/>`
      + `<circle cx="${cx + rx + 3}" cy="${cy - 6}" r="8" fill="${hair}"/>`,
    // bald: a trim at the temples only
    `<path d="M${cx - rx - 1} ${cy + 2} q2-14 8-18 q-3 9-2 18z M${cx + rx + 1} ${cy + 2} q-2-14-8-18 q3 9 2 18z" fill="${hair}"/>`,
  ][style];
  return `<svg class="portrait" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(person?.name || 'portrait')}">`
    + `<defs><clipPath id="pc${h}"><rect x="0" y="0" width="${W}" height="${H}" rx="12"/></clipPath></defs>`
    + `<g clip-path="url(#pc${h})">`
    + `<rect width="${W}" height="${H}" fill="#efece3"/>`
    + `<circle cx="${cx}" cy="${cy + 4}" r="50" fill="${col}" opacity="0.14"/>`
    // shoulders and collar, in the group's colour: the uniform reads first
    + `<path d="M4 ${H} q0-40 34-52 l22-7 h12 l22 7 q34 12 34 52 z" fill="${col}"/>`
    + `<path d="M${cx - 15} ${H - 59} l15 21 15-21 l-7-5h-16z" fill="#f7f5ef"/>`
    + `<rect x="${cx + 21}" y="${H - 32}" width="15" height="4" rx="2" fill="#f0e2b8"/>`
    + `<rect x="${cx + 21}" y="${H - 24}" width="15" height="4" rx="2" fill="#f0e2b8"/>`
    // neck, ears, head
    + `<rect x="${cx - 10}" y="${cy + 18}" width="20" height="22" rx="8" fill="${skin}"/>`
    + `<ellipse cx="${cx - rx}" cy="${cy + 4}" rx="4" ry="6" fill="${skin}"/>`
    + `<ellipse cx="${cx + rx}" cy="${cy + 4}" rx="4" ry="6" fill="${skin}"/>`
    + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>`
    + hairShape
    + (glasses
      ? `<g fill="none" stroke="#33302b" stroke-width="1.6"><circle cx="${cx - 9}" cy="${cy + 2}" r="6.4"/>`
        + `<circle cx="${cx + 9}" cy="${cy + 2}" r="6.4"/><path d="M${cx - 2.6} ${cy + 2}h5.2"/></g>`
      : `<ellipse cx="${cx - 9}" cy="${cy + 2}" rx="2" ry="2.4" fill="#2a221c"/>`
        + `<ellipse cx="${cx + 9}" cy="${cy + 2}" rx="2" ry="2.4" fill="#2a221c"/>`)
    + `<path d="M${cx - 13} ${cy - 5} q5-3 10-1 M${cx + 3} ${cy - 6} q5-2 10 1" stroke="${hair}" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + `<path d="M${cx - 6} ${cy + 15} q6 4 12 0" stroke="#9c6549" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    + `</g></svg>`;
}
function leaderPortrait(gs){
  const l = leader(gs?.leaderId);
  return portraitSvg({ id: l?.id, name: l?.name }, def(gs?.id)?.color);
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
  bindEquations(container);
}
/** The equation buttons, same toggle behaviour as the term chips. */
function bindEquations(container){
  container.querySelectorAll('.eqChip').forEach(btn=>{
    if(btn.dataset.eqBound) return;
    btn.dataset.eqBound = '1';
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const wrap=btn.closest('.eqStrip');
      const panel=wrap?wrap.querySelector('.eqNote'):null;
      if(!panel) return;
      const wasActive=btn.classList.contains('active');
      wrap.querySelectorAll('.eqChip').forEach(x=>x.classList.remove('active'));
      if(wasActive){ panel.classList.add('hidden'); panel.innerHTML=''; return; }
      btn.classList.add('active');
      let vars=[];
      try{ vars=JSON.parse(btn.dataset.eqvars||'[]'); }catch{ vars=[]; }
      panel.innerHTML=`<b>${esc(btn.textContent)}</b>`
        + (btn.dataset.eqfor?`<br>${esc(btn.dataset.eqfor)}`:'')
        + (vars.length?`<p class="eqVars">${vars.map(([sym,mean])=>
            `<span><b>${esc(sym)}</b> ${esc(mean)}</span>`).join('')}</p>`:'')
        + (btn.dataset.eqsays?`<p class="eqSays">${esc(btn.dataset.eqsays)}</p>`:'');
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
  // Stacked, this ran the full height of the panel twice over — the ordered
  // slots, then the bank of cards below them — so on anything but a tall window
  // the player was scrolling between the card they were placing and the place
  // they were putting it. Side by side, both are on screen at once.
  return `<div class="compactInstruction">Put the ${ch.cards.length} steps in order, earliest first.</div>`
    + `<div class="orderSplit">`
    +   `<div class="timelineTask"><div class="tlEnd">Earliest</div><ol class="timelineSlots">${slots}</ol><div class="tlEnd">Latest</div></div>`
    +   `<div class="orderBankSide"><div class="tlBankLabel">Steps to place</div><div class="orderBank">${bank}</div></div>`
    + `</div>`
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
  body.innerHTML = challengePrefix(gs, lesson, ch, person) + withAssist(orderHTML(ch));
  bindOrder(); bindVisitAssist(); bindTerms(body);
}

// ——— Protocol ———
/**
 * PROTOCOL — the board is the interface.
 *
 * This used to be three renderings of one question stacked on top of each
 * other: a diagram you could not touch, a grid of `<select>` menus repeating
 * every word of it, and a "Choices in full" list repeating them again. Every
 * situation and every response was on screen three times.
 *
 * Now: tap a situation, tap a response, the join is drawn. Tap either end again
 * to break it. Nothing is printed twice, and what the player looks at is what
 * they operate.
 */
function protocolHTML(ch){
  // The lettered choices are shuffled so that a correct match cannot be read off
  // the display order. activeProtocol.order maps display letter -> real choice index.
  const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
  activeProtocol.links=activeProtocol.links??{};
  return `<div class="compactInstruction">Join each situation to the response it calls for. Tap one, then the other — tap a joined end to undo it.</div>`
    + `<div id="protoBoard">${protocolBoardHTML(ch, display)}</div>`
    + `<div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="protocolCheck" type="button">Check</button></div>`;
}
function protocolBoardHTML(ch, display){
  const links=Object.entries(activeProtocol?.links ?? {}).map(([from,to])=>({ from:+from, to }));
  return matchBoard({
    leftTitle: ch.columns?.[0], rightTitle: ch.columns?.[1],
    left: ch.scenarios,
    right: display.map(real=>ch.choices[real]),
    links,
    selected: activeProtocol?.selected ?? null,
    accent: def(activeChallenge?.id)?.color,
  });
}
/**
 * Two taps make a join.
 *
 * Tapping a node that is already joined breaks that join instead. Without it
 * the only way to correct one wrong guess is a Reset that throws away all four
 * answers, which is why the old panel needed one.
 */
function bindMatchBoard(host, model, redraw){
  host.querySelectorAll('.mbNode').forEach(node=>{
    const act=()=>{
      const side=node.dataset.side, i=+node.dataset.i;
      const joined = side==='l' ? model.links[i]!==undefined
                                : Object.values(model.links).includes(i);
      if(joined){
        if(side==='l') delete model.links[i];
        else for(const k of Object.keys(model.links)) if(model.links[k]===i) delete model.links[k];
        model.selected=null;
        redraw();
        return;
      }
      const sel=model.selected;
      if(sel && sel.side!==side){
        const from = sel.side==='l' ? sel.i : i;
        const to   = sel.side==='l' ? i : sel.i;
        // One response per situation and one situation per response: joining a
        // taken response moves it rather than stacking two lines on one box.
        for(const k of Object.keys(model.links)) if(model.links[k]===to) delete model.links[k];
        model.links[from]=to;
        model.selected=null;
      } else {
        model.selected={ side, i };
      }
      redraw();
    };
    node.addEventListener('click', act);
    node.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); act(); } });
  });
}
function bindProtocol(){
  const ch=activeChallenge.ch;
  const display=(activeProtocol&&activeProtocol.order)||ch.choices.map((_,j)=>j);
  activeProtocol.links=activeProtocol.links??{};
  const host=document.getElementById('protoBoard');
  const redraw=()=>{
    host.innerHTML=protocolBoardHTML(ch, display);
    bindMatchBoard(host, activeProtocol, redraw);
  };
  if(host) bindMatchBoard(host, activeProtocol, redraw);
  const btn=document.getElementById('protocolCheck');
  if(!btn) return;
  btn.onclick=()=>{
    const picked=ch.scenarios.map((_,i)=>{
      const shown=activeProtocol.links[i];
      return shown===undefined ? -1 : display[shown];
    });
    if(picked.includes(-1)){ alert('Every situation still needs a response.'); return; }
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
  activeCalc={ chosen:[], order: shuffleSeeded(spec?spec.labels.map((_,i)=>i):[], state.week*79 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge.id)*13 + activeChallenge.lesson.day + runSeed()) };
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
  body.innerHTML = challengePrefix(gs, lesson, ch, person) + withAssist(ballparkBody(ch,spec));
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
    state.week*63 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*17 + 5 + runSeed());
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
    state.week*41 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*13 + 7 + runSeed());
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
/**
 * CASEBOOK — clues joined to explanations, on the same board as PROTOCOL.
 *
 * It had the same three-times-over problem: a select per clue, every
 * explanation inside every select, and then a "Choices" list underneath.
 */
function casebookHTML(ch){
  if(ch.proposals) return tankHTML(ch);
  activeProtocol={ order:(ch.choices||[]).map((_,j)=>j), links:{}, selected:null };
  return `<div class="compactInstruction">${esc(ch.task||'Join each clue to what explains it.')}</div>`
    + `<div id="protoBoard">${casebookBoardHTML(ch)}</div>`
    + `<div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="casebookCheck" type="button">Check</button></div>`;
}
function casebookBoardHTML(ch){
  const links=Object.entries(activeProtocol?.links ?? {}).map(([from,to])=>({ from:+from, to }));
  return matchBoard({
    leftTitle: ch.columns?.[0], rightTitle: ch.columns?.[1],
    left: ch.scenarios||ch.cards||[],
    right: ch.choices||[],
    links,
    selected: activeProtocol?.selected ?? null,
    accent: def(activeChallenge?.id)?.color,
  });
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
    //
    // "Unsupported" has to include a proposal written `X: 0`. Books express a
    // trap two ways — by omitting it from `recommended`, and by weighting it
    // zero — and only the first used to cost anything, so a player could put
    // thirty points into "identify the chemicals by smell" and still pass.
    const topOk = maxUser>=35 && userBest.some(k=> recBest.includes(k));
    const unsupported = Object.entries(vals).filter(([k])=> !rec[k]).reduce((s,[,v])=>s+v,0);
    const starved = Object.entries(rec).filter(([k,v])=> v/recSum>=0.25 && (vals[k]||0)<20);
    const ok = topOk && unsupported<=15 && starved.length===0;
    activeChallenge.userAnswer=Object.entries(vals).map(([k,v])=>`Proposal ${k}: ${v} points`).join('; ');
    finishVisit(ok);
  };
}

/**
 * Who is asking, and what the situation is. Nothing else.
 *
 * This used to open with a week counter, a division name, the place name, a
 * line about which call of three this was, the mission's stake in a warning
 * box, the story paragraph, and a strip of glossary chips — six blocks of
 * chrome before the question. The player has all of that on the HUD and in the
 * briefing already. What they cannot get anywhere else is the person in front
 * of them and the situation, so that is what this is.
 */
function askCard(gs, lesson, ch, person){
  const d = def(gs.id);
  const who = person || leader(gs.leaderId);
  const art = person ? portraitSvg(person, d?.color) : leaderPortrait(gs);
  const role = person ? (person.role || '') : `${d?.name ?? ''} lead`;
  const brief = storyBriefText(lesson);
  return `<div class="askCard">`
    + `<div class="askWho" style="--accent:${d?.color || '#3b566b'}">${art}`
    + `<div class="askName">${esc(who.name)}</div><div class="askRole">${esc(role)}</div></div>`
    + `<div class="askBody">`
    + `<p class="askBrief">${esc(brief)}</p>`
    + equationRow(lesson)
    + termsRow(allChallengeText(lesson, ch, false))
    + `</div></div>`;
}
/**
 * The course equations this question deals with, as buttons beside the terms.
 *
 * Stamped per lesson at import from the authored list in `tools/syllabus.js`, so
 * this is not a guess about what the question is about — it is the same claim the
 * book's syllabus page audits. A question that *computes* one already shows the
 * relationship in its estimate panel; the button matters most on the ones that
 * only reason around an equation, where the algebra was previously assumed and
 * never shown.
 */
function equationRow(lesson){
  const eqs = (lesson?.equations ?? []).filter(x => x?.e);
  if(!eqs.length) return '';
  // What the equation is for rides on the button rather than being looked up: the
  // lesson is not in scope where the chips are bound, and one attribute is a
  // smaller thing to carry than module state that has to be kept in step.
  return `<div class="eqStrip"><div class="eqButtons">${eqs.map(x =>
    `<button type="button" class="eqChip" data-eqfor="${esc(x.c ?? '')}"`
    + ` data-eqsays="${esc(x.s ?? '')}"`
    + ` data-eqvars="${esc(JSON.stringify(x.v ?? []))}">${esc(x.e)}</button>`).join('')}</div>`
    + `<div class="eqNote hidden"></div></div>`;
}
/** The glossary, as one quiet line rather than a labelled box of chips. */
function termsRow(text){
  const terms = jargonMatches(text, 8);
  if(!terms.length) return '';
  return `<div class="termStrip inline"><div class="termButtons">${terms.map(t =>
    `<button type="button" class="termChip" data-term="${JARGON.indexOf(t)}">${esc(t.name)}</button>`).join('')}</div>`
    + `<div class="termDefinition hidden"></div></div>`;
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
/**
 * Everything above the controls: the person asking, the situation, the picture.
 *
 * The hint is deliberately *not* here. It used to sit between the paragraph and
 * the question as a boxed row with a price on it, which put a shop counter in
 * the middle of the reading. It goes under the controls now — see
 * `withAssist`.
 */
function challengePrefix(gs, lesson, ch, person){
  return askCard(gs, lesson, ch, person)
    + (kindOf(ch) === 'DIAGNOSIS' ? '' : figureBlock(lesson, ch));
}
/**
 * The challenge, with the hint control at the bottom of it — above the action
 * bar, which is sticky, so anything appended after it is stranded off-screen.
 */
function withAssist(html){
  const assist = visitAssistHTML();
  const at = html.lastIndexOf('<div class="modalActions"');
  if(at < 0) return html + assist;
  // Every format's Check refuses a part-finished answer — a protocol with one
  // situation unmatched, a diagnosis with one candidate picked, an estimate
  // with an empty slot — and until this there was no other control on the
  // panel. A player who opened a question and did not yet know the answer had
  // no way out of it, which is the one thing the day model promises never
  // happens. Leaving costs nothing and leaves the call open: the room is still
  // there, and so is the question.
  const withLeave = html.slice(at).replace('<div class="modalActions">',
    '<div class="modalActions"><button class="btn" id="visitLeave" type="button">Leave it for now</button>');
  return html.slice(0, at) + assist + withLeave;
}
function visitAssistHTML(){
  const state=getState();
  const key=visitKey();
  const used=!!state.hints?.[key];
  const text=used?scientificHint(activeChallenge.ch, activeChallenge.lesson):'';
  return `<div class="visitAssist"><div class="visitAssistRow"><button class="btn small" id="visitHintBtn" type="button" ${used||state.reserve<HINT_COST?'disabled':''}>Scientific hint · $${HINT_COST}</button><span class="moneyRule">Director funds: $${fmt(state.reserve)}</span></div><div id="visitHintText" class="visitHintText ${used?'':'hidden'}">${used?esc(text):''}</div></div>`;
}
function bindVisitAssist(){
  // Leaving is not answering: the stop is not marked, nothing is charged, and
  // the case is still open when the player comes back to it.
  const leave=document.getElementById('visitLeave');
  if(leave) leave.onclick=()=> closeModal();
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
  if((kindOf(ch)==='PROTOCOL' || kindOf(ch)==='CASEBOOK') && activeChallenge.userLinks){
    // Both readings at once: the joins that hold, and where a wrong one went
    // instead. Showing only the player's lines says "these four are wrong" and
    // leaves them to work out the right pairing from a paragraph.
    const wrong=activeChallenge.userLinks.filter(l=>!l.ok);
    // The same board they worked, marked up — not a second, different picture
    // of the same question in the verdict.
    const board=matchBoard({ leftTitle: ch.columns?.[0], rightTitle: ch.columns?.[1],
      left: ch.scenarios, right: activeChallenge.matchRight||[],
      links: [...(activeChallenge.rightLinks||[]), ...wrong] });
    const caption = wrong.length ? 'Solid: the joins that hold. Dashed red: where yours went instead'
                                 : 'Every join holds';
    return board + `<div class="figureCaption">${esc(caption)}</div>`;
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
  const ch0=activeChallenge.ch;
  const host=document.getElementById('protoBoard');
  if(host && !ch0.proposals){
    const redraw=()=>{ host.innerHTML=casebookBoardHTML(ch0); bindMatchBoard(host, activeProtocol, redraw); };
    bindMatchBoard(host, activeProtocol, redraw);
  }
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
    // the match-board variant
    const clues=(ch.scenarios||ch.cards||[]);
    const picked=clues.map((_,i)=> activeProtocol.links[i] ?? -1);
    if(picked.includes(-1)){ alert('Every clue still needs an explanation.'); return; }
    activeChallenge.userAnswer=clues.map((c,i)=>`${c} → ${(ch.choices||[])[picked[i]]}`).join('; ');
    activeChallenge.userLinks=picked.map((to,i)=>({ from:i, to, ok: to===ch.mapping[i] }));
    activeChallenge.rightLinks=(ch.mapping||[]).map((to,i)=>({ from:i, to, ok:true }));
    activeChallenge.matchRight=(ch.choices||[]);
    finishVisit(picked.every((v,i)=> v===ch.mapping[i]));
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
    // No time charge. The attempt already cost whatever it took to make, on
    // the day's own countdown, which has been running the whole time.
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
  const routeNote = isLastStop
    ? `<div class="readinessNote" style="background:#e6f0e9;border:1px solid #b8d0c0;border-radius:8px;padding:8px 10px">✅ Every call today is made. What is left on the clock is yours — people will sign off expenses for a conversation.</div>`
    : `<div class="readinessNote">That call is closed. ${openStopIndices(state).length} still open, in any order you like.</div>`;
  const canRetry = !ok && state.reserve>=RETRY_COST;
  const retryButton = canRetry ? `<button class="btn" id="visitRetry" type="button">Retry challenge · $${RETRY_COST}</button>` : '';
  const completeBtn = isLastStop ? `<button class="btn primary" id="completeMissionBtn" type="button">Complete Mission ${state.week} → Mission ${Math.min(15,state.week+1)}</button>` : '';
  // ——— the verdict ————————————————————————————————————————————————
  // Rendered into its own overlay above the modal. It used to be appended to
  // the bottom of the question panel, which on a Diagnosis meant scrolling
  // past a figure, six readings and five candidates to discover whether you
  // were right — the single least dramatic place it could have been put.
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
    cell('Left today', formatCountdown(state.dayLeft ?? 0),
         (state.dayLeft ?? 0) < (state.dayBudget ?? 1) * 0.2 ? 'cost' : '',
         `${openStopIndices(state).length} call${openStopIndices(state).length === 1 ? '' : 's'} still open`) +
    cell('Projection at deadline', `${fmt(ledger.projectionAfter)}%`,
         projDelta > 0.5 ? 'gain' : projDelta < -0.5 ? 'cost' : '',
         projDelta === 0 ? 'unchanged' : `${projDelta > 0 ? '+' : ''}${fmt(projDelta)} from this call`);

  // Say whether the answer was right before saying anything about the world.
  // "Evidence accepted" / "The call holds" is how the response would describe
  // it, and it is one inference away from what the player asked, which is
  // whether they got it right.
  const headline = ok ? 'Correct' : 'Incorrect';
  const kicker = ok
    ? (ledger.milestoneDone ? 'Milestone cleared' : 'The call holds')
    : 'The call does not hold';
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
        ? `<p class="verdictWhy"><b>Every call today is made.</b> The rest of the day is yours.</p>`
        : `<p class="verdictWhy">That call is closed. ${openStopIndices(state).length} still open — take them in any order.</p>`)
    : `<p class="verdictWhy"><b>This call stays open.</b> Answering again costs $${RETRY_COST}; moving on without it costs $${SKIP_COST}. The clock keeps running either way.</p>`;

  const detail = `<details class="verdictDetail"><summary>Show the full reasoning</summary>` +
    reasoningHTML(ch, lesson, solution, whyText) + `</details>`;

  // A wrong call costs money and only money: the day is already running down
  // by itself, so charging hours as well would bill the same mistake twice.
  //
  // If neither price is affordable there is no third option, and the day starts
  // again. That is deliberate — it is the only hard consequence in the game,
  // and it is always escapable, because a new day pays a stipend and reopens
  // every conversation in town.
  const priced = (id, label, cost) =>
    '<button class="btn priced" id="' + id + '" type="button"' +
    (cost > state.reserve ? ' disabled' : '') + '>' +
    '<span>' + esc(label) + '</span><small>$' + cost + '</small></button>';
  const broke = state.reserve < RETRY_COST && state.reserve < SKIP_COST;
  const choices = ok ? '' :
    (broke
      ? '<div class="verdictChoice"><div class="verdictChoiceLabel">Nothing left to pay with</div>'
        + '<p class="verdictWhy">$' + fmt(state.reserve) + ' in hand, and the cheapest way forward is $'
        + RETRY_COST + '. The day has to start again.</p>'
        + '<button class="btn primary" id="restartDayBtn" type="button">Start the day again</button></div>'
      : '<div class="verdictChoice"><div class="verdictChoiceLabel">What now</div>'
        + priced('retryMoney', 'Answer it again', RETRY_COST)
        + priced('skipMoney', 'Move on without it', SKIP_COST) + '</div>');
  // The last call of the day no longer ends the day. Whatever is left on the
  // countdown is the player's: walk the town, talk to people, get paid.
  // ...and the evening has to have a way out of it, or a day with three hours
  // spare is three minutes of standing still waiting for the light to go.
  const actions =
    (isLastStop && ledger.closes
      ? '<button class="btn primary" id="dayIsYours" type="button">Every call made — take the rest of the day</button>'
        + '<button class="btn" id="sleepNow" type="button">Go to sleep, wake up tomorrow.</button>'
      : '') +
    '<button class="btn ' + (ok ? 'primary' : 'ghost') + '" id="visitClose" type="button">' +
    (ok ? 'Return' : 'Decide later') + '</button>';

  const card = document.getElementById('verdictCard');
  const vOverlay = document.getElementById('verdictOverlay');
  if(card && vOverlay){
    card.style.setProperty('--vc', colour);
    card.innerHTML =
      `<div class="verdictHead"><div class="verdictKicker">${esc(kicker)}</div>` +
      // No mission blurb here. The verdict used to reprint the whole day card
      // under the headline — a hundred words the player read on the plan card
      // minutes ago, above the one thing they opened this panel to find out.
      `<h3 class="verdictTitle">${esc(headline)}</h3></div>` +
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
    // Reference stays live after the answer is locked. A player reading the
    // verdict is exactly who wants to check the equation or a definition.
    if(!b.classList.contains('termChip') && !b.classList.contains('eqChip')) b.disabled=true;
  });
  const closeBtn=document.getElementById('visitClose');
  if(closeBtn){ closeBtn.onclick=()=>{ closeVerdict(); closeModal(); window.dispatchEvent(new CustomEvent('projecty:statechange')); window.dispatchEvent(new CustomEvent('projecty:visitdone')); }; }
  const compBtn=document.getElementById('dayIsYours');
  if(compBtn){
    compBtn.onclick=()=>{
      closeVerdict();
      closeModal();
      window.dispatchEvent(new CustomEvent('projecty:statechange'));
      window.dispatchEvent(new CustomEvent('projecty:visitdone'));
    };
  }
  const sleepBtn=document.getElementById('sleepNow');
  if(sleepBtn){
    sleepBtn.onclick=()=>{
      // Both overlays first: the day controller puts its end-of-day card up in
      // the same overlay this modal is using, and closing afterwards would
      // close the card instead.
      closeVerdict();
      closeModal();
      window.dispatchEvent(new CustomEvent('projecty:statechange'));
      window.dispatchEvent(new CustomEvent('projecty:visitdone'));
      window.dispatchEvent(new CustomEvent('projecty:sleep'));
    };
  }
  // The four ways out of a wrong call. Each spends exactly what its button
  // said it would, logs it, and then either reopens the question or closes the
  // stop as a miss.
  const spend = (money, hours, why) => {
    if(money){ state.reserve -= money; }
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
  bind('skipMoney',  () => moveOn(SKIP_COST, 0));
  bind('restartDayBtn', () => {
    closeVerdict();
    closeModal();
    // The entry point owns the world, so it is the one that can measure the
    // route and put the plan back up.
    window.dispatchEvent(new CustomEvent('projecty:restartday'));
  });

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
    const orderSeed = state.week*31 + GROUP_DEFS.indexOf(d)*7 + (isRetry?101:0) + runSeed();
    activeOrder={ chosen:[], seed: orderSeed, bank: shuffleSeeded(ch.cards.map((_,i)=>i), orderSeed) };
    challengeHTML = orderHTML(ch);
  } else if(kindOf(ch)==='PROTOCOL'){
    activeProtocol={ order: shuffleSeeded(ch.choices.map((_,j)=>j), state.week*57 + GROUP_DEFS.indexOf(d)*11 + lesson.day*3 + (isRetry?101:0) + runSeed()) };
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
  // The title is the question, not the filing reference. Who is asking and
  // which area it belongs to are both on the card underneath.
  const titlePrefix = lesson.title || ch.title || def(id).name;
  openModal(titlePrefix, bodyPrefix + withAssist(challengeHTML));
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
/**
 * Talking to somebody the day wants: ask them their call's question.
 *
 * Any call still open, not only the first one. This was written around
 * `nextMissionStopIndex` — the first stop not yet made — so on a day with two
 * person stops the *second* person was not recognised as a call at all: their
 * marker was over their head, and walking up to them opened their passage
 * chat, until the other person had been dealt with and the index moved on. The
 * day is take-them-in-any-order everywhere else; it is here too now.
 *
 * Returns quietly when this is nobody today wants, which is the signal the
 * entry points use to fall back to the person's passage.
 */
/**
 * Open this person's mission question, if the day still wants one from them.
 *
 * Returns whether it did. The caller used to infer that by watching for the
 * overlay to gain `.show`, which is only true when the overlay was closed
 * beforehand — so any panel left flagged open turned the *next* mission person
 * into a character passage, and which person that was depended on the order the
 * player walked. Saying so directly is the whole fix.
 */
export function openPersonVisit(npc, isRetry=false){
  const state=getState();
  if(!state || !npc) return false;
  const division=npc.division || CHARACTER_DIVISION[npc.char.id] || 'TRI';
  const m=getCurrentMission(state);
  if(!m) return false;
  let idx=-1;
  for(const i of openStopIndices(state)){
    if(!isPersonStopForIdx(state, i)) continue;
    if(getPersonIdForStop(state, i) !== npc.char.id) continue;
    idx=i; break;
  }
  if(idx < 0) return false;
  const stop={ ...m.stops[idx], index: idx };
  // The person asks the same science question a room would, and the panel
  // shows them rather than the area's leader.
  showChallengeForStop(division, stop, isRetry, npc.char);
  return true;
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
  // A person stop is answered by finding the person, not by entering the room.
  if(isPersonStopForIdx(state, stop.index)){
    renderMissionLock(id, `This call is with a person — find the ${def(stop.group).name} name on the map and go to them.`);
    return;
  }
  // Any call still open today can be taken, in whatever order the player
  // decided at the plan screen. Only a call already made is refused.
  if(completedMissionStops(state).includes(stop.index) && !isRetry){
    state.selectedGroup=id;
    save();
    const left=openStopIndices(state).length;
    openModal('That call is already made',
      `<div class="briefBox">This one is credited for today.${left?` ${left} still open — the map has them.`:' Every call is made; the rest of the day is yours.'}</div>`);
    return;
  }
  showChallengeForStop(id, stop, isRetry);
}
