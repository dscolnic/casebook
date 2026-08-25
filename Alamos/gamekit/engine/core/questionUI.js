import { getState, save, markMissionStopComplete, getNextMissionStop, removeMissionStop, advanceTime, penaliseStop, penaltyLeft } from './gameState.js';
import { forecastReadiness, leader, def, currentMilestone, curriculumFor, completeMilestoneIfReady, groupPct, getCurrentMission, missionStopForGroup, missionStopIndex, nextMissionStopIndex, openStopIndices, openStopGroups, completedMissionStops, missionComplete, isPersonStopForIdx, globalStopIndex, CHARACTER_DIVISION, getSpecialRequest, isSpecialRequestActive, getPersonIdForStop } from './simulation.js';
import { MISSION_DEFS } from './missions.js';
import { CURRICULUM } from './curriculum.js';
import { GROUP_DEFS } from './divisions.js';
import { BALLPARK_CALCS, JARGON } from './curriculum.js';
import { HINT_COST, MIN_ALLOTMENT_HOURS, RETRY_COST, RETRY_HOURS, PENALTY_MINUTES, SKIP_COST, SKIP_HOURS,
         VISIT_BONUS, ISSUE_VISIT_BONUS } from './constants.js';
import { esc, fmt, clamp, seeded, shuffleSeeded } from './utils.js';
// Co-op. Inert without `?room=`; the claim gate below is the only thing in this
// file that knows a room can exist.
import * as room from './room.js';

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
import { formatCountdown, PANEL_PACE } from './day.js';
import { renderFigure, readingsPanel, dataTable, readout, estimateScale, timeline, matchBoard,
         lineChart } from './figures.js';
// The twelve formats the six interaction documents converged on. They live in
// their own module because this file already holds the modal, the verdict, the
// hint economy and eight formats — a thirteenth branch in here is how the next
// fork starts. Everything they need from this file arrives through `ctx`.
import { INSTRUMENTS, isInstrument, methodBlock, goalBlock } from './instruments.js';
// `methodBlock` and `goalBlock` are the two lines every panel in instruments.js
// prints before it asks anything: what kind of move this is, and what counts as
// done. The four panels below — SWEEP, HOLDOUT, TALLY, PROBE — are older than
// that registry and printed neither, which is how a player reached HOLDOUT with
// two labelled data sets and no way to tell what either of them was.

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
/**
 * `list` is the running theme's glossary in a game. The standalone harness
 * (engine/dev/lessons.html) shows one stop out of each of eighteen games, so the
 * glossary a card is matched against is the *source* game's, not the one the dev
 * server happens to be serving. Passing the list rather than reading the module's
 * is the whole of what that needed — a second copy of this rule in the harness is
 * a second answer to "which words does this card name".
 */
function jargonMatches(text, max=12, list=JARGON){
  const normalized=` ${String(text||'').toLowerCase()} `;
  const hit=(a)=>{
    const w=String(a).toLowerCase().trim();
    if(w.length<2) return false;
    const e=w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return new RegExp(`(^|[^a-z0-9])${e}${w.length<=3?'([^a-z0-9]|$)':''}`).test(normalized);
  };
  const found=[];
  for(const item of (list ?? [])){
    if([item.name,...(item.aliases??[])].filter(Boolean).some(hit)){ found.push(item); if(found.length>=max) break; }
  }
  return found;
}
/**
 * The paragraph above the question: the situation, and only the situation.
 *
 * `scene` first, and it took a checker that reads the renderers to notice this
 * was the wrong way round. Both fields exist — `scene` is the 30-to-45 words of
 * situation the writing bar is about, `story` the longer form a book may also
 * carry — and the importer fills `story` from `scene` where a book writes only
 * one, so most stops have them identical and nothing showed. 121 stops write
 * both and mean different things by them, and on every one of those the player
 * was reading the long form:
 *
 *   · Every gate reads `scene ?? story` — validateContent twice, checkVoice,
 *     checkNames, probeQuestions, placeStory. All five. So the reading-level
 *     rule, the 40-word sentence rule and the GIVEAWAY probe were all being
 *     applied to a string those stops never displayed. ContamCity's grade-6
 *     edition checked 26 scenes at Flesch–Kincaid 5.8 and showed stories at
 *     12.5, one of them 2.6 against 15.1; the hospital's grade-2 reader got 4.4
 *     where 1.3 had been measured and passed.
 *   · And the drifted stories are 42 to 96 words against the scene's 27 to 38,
 *     which is not merely longer. It is the mechanism — ContamCity's ordering
 *     stop opened with "some observations leave the sample exactly as they found
 *     it … a destructive method gives the best identification and gives it
 *     once", which is the answer to the question underneath it. That is the
 *     scene-carries-the-teaching mistake this repo spent a rewrite of all seven
 *     games removing, still shipping through a field nothing was checking.
 *
 * Every one of the 1,328 stops has a scene of at least 40 characters, so nothing
 * loses its brief to this. `story` stays in the chain because the importer
 * guarantees it and a hand-written theme need not.
 */
function storyBriefText(lesson){
  return lesson.scene || lesson.story || lesson.progress || lesson.title;
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
    const spec=calcSpec();
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
    const spec=calcSpec();
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
  // The twelve are operated, not chosen from, so the generic "Proposal ? has the
  // strongest evidence" line was nonsense on all of them. A hint on an instrument
  // says what to do with it, never what the reading is — a hint that names the
  // answer is the whole format bought for $5.
  if(isInstrument(kindOf(ch))){
    return ch[kindOf(ch).toLowerCase()]?.hint
      ?? 'Work the instrument before you commit: what it shows before you act is the'
       + ' evidence the answer has to be built from.';
  }
  const rec=ch.recommended||{}, best=Object.keys(rec).sort((a,b)=>(rec[b]||0)-(rec[a]||0))[0];
  return `Proposal ${best||'?' } has the strongest supporting evidence. Consider how each proposal addresses the system-level question with limited resources.`;
}
function solutionText(ch){
  if(kindOf(ch)==='SEQUENCE') return ch.order.map((i,n)=>`${n+1}. ${ch.cards[i]}`).join(' → ');
  if(kindOf(ch)==='PROTOCOL') return ch.scenarios.map((s,i)=>`${s} → ${ch.choices[ch.mapping[i]]}`).join('; ');
  if(kindOf(ch)==='BALLPARK'){ const spec=calcSpec(); return spec?spec.solution:ch.answer; }
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

/**
 * Whether the panel that is open stops the day's countdown dead.
 *
 * A format may declare `pausesClock`. BELT does, because it carries its own
 * pressure — a belt that speeds up while the day also runs down charges the
 * player twice for the one format that was supposed to be the fun one.
 *
 * The entry point reads this every frame through `pace()`. It is a function
 * rather than a flag on the state because the state is saved and this is not:
 * a campaign reloaded with a stale "the clock is frozen" would freeze for ever.
 *
 * **The clock now stops for every panel in every game** — `PANEL_PACE` is 0 in
 * `day.js`, which is the one number that means "how fast the day runs while
 * somebody is reading". This flag therefore changes nothing today, and is kept
 * for the case where that number is ever put back: a format that declares
 * `pausesClock` was built against a stopped clock and must keep one.
 */
let clockFrozen = false;
export function panelFreezesClock(){ return clockFrozen; }

/**
 * The world, for the one format that is graded against it.
 *
 * TRIAL hands the player back to the place they are standing in and grades the
 * order they take a set of gates in. That needs the scene, the player and the
 * spawn, none of which this file has ever imported and none of which it should:
 * `instruments.js` is loaded in Node by `instrumentGoals.mjs` and in a page with
 * no scene by `instruments.html`, so a three.js import anywhere on that path
 * breaks both. The entry point registers a handle instead, every harness
 * registers nothing, and the format renders with its button disabled.
 */
let worldHandle = null;
export function setWorldHandle(h){ worldHandle = h ?? null; }

/** Anything a panel wants torn down when it closes — a frame loop, a listener. */
let panelCleanup = [];
function runPanelCleanup(){
  for(const fn of panelCleanup.splice(0)){
    try { fn(); } catch (e) { console.error('[questionUI] panel cleanup threw', e); }
  }
}

/**
 * Whether the card on the overlay may be dismissed without answering it.
 *
 * The plan card, the warm-up card and the end-of-day card all carry their own
 * named ways out — take the run, pay to skip it, start the day, take it again —
 * and the corner X is none of them: it puts the overlay down with the decision
 * unmade, so the run is neither taken nor marked and the day's clock never
 * starts. Those cards lock. A question does not: walking away from one hands the
 * stop back and costs the answer, which is a decision the player is allowed to
 * make.
 *
 * The flag lives here because this file owns the overlay and is the only thing
 * that can honestly unlock it again — `openModal` is what puts a question up.
 */
let modalLock = false;
export function setModalLock(on){
  modalLock = !!on;
  const btn = document.getElementById('modalClose');
  if(btn) btn.hidden = modalLock;
}
export function modalLocked(){ return modalLock; }

function openModal(title, bodyHTML){
  // A question is dismissible whatever was on the overlay before it, and the
  // button has to come back with it — a hidden X left over from the plan card
  // would take the way out of every question for the rest of the session.
  setModalLock(false);
  // Whatever was up before is gone: its loop stops here, not when the next thing
  // to touch the DOM happens to notice.
  runPanelCleanup();
  clockFrozen = false;
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
  // The room's day runs at a quarter rate while anybody is reading a panel, and
  // the server is the only party that can know whether anybody is. Telling it
  // here rather than at each caller means every format is covered, including the
  // twenty in instruments.js.
  // The server applies the panel rate, because it is the only party that knows
  // whether ANYBODY is reading — so a room learns here that the day is stopped
  // rather than slowed. A server that has not been taught `frozen` ignores it
  // and keeps its own rate, which is the behaviour before this.
  room.setPanel(true, PANEL_PACE === 0);
  // bind term chips
  bindTerms(body);
}
export function closeVerdict(){
  const v=document.getElementById('verdictOverlay');
  if(v) v.classList.remove('show');
  // A TRIAL keeps the clock frozen across its suspension — the overlay is down
  // while the route is driven — so the freeze outlives the panel and has to be
  // let go here as well as in closeModal. Harmless for every other format:
  // PANEL_PACE is 0, so an unfrozen panel and a frozen one tick the same.
  clockFrozen = false;
}
export function closeModal(){
  const overlay=document.getElementById('overlay');
  if(overlay) overlay.classList.remove('show');
  // A frame loop nobody cancelled keeps drawing into a detached canvas for the
  // rest of the session, and keeps eating the arrow keys that now belong to the
  // world. Before anything else, because the rest of this can throw.
  runPanelCleanup();
  clockFrozen = false;
  room.setPanel(false);
  // Walking away from a question hands the stop back to the room. Without this
  // a player who opened a door, read the scene and left would hold that call for
  // the rest of the day and nobody could see why.
  releaseHeld();
  // resume game if needed, but leave unlocked until user clicks
}

// ---------------------------------------------------------------------- co-op
//
// One stop, one answerer. The claim is what makes the room's campaign safe to
// write last-write-wins (server/rooms.js explains why), and it is also the whole
// of the co-op UX at a stop: you either get the panel, or you are told who has it.
//
// The check is synchronous against the claim table every client already holds —
// the server broadcasts it on every change — and the ASK is asynchronous behind
// it. That covers the ordinary case with no latency at all, and the true race,
// where two people press the same door inside one round trip, is caught when the
// server says no and the panel closes itself.
let heldKey = null;

const stopKey = (stopIndex) => `${getState()?.week ?? 0}-${stopIndex}`;

/** Somebody else's name if this stop is taken, else null. */
function takenBy(stopIndex){
  if(!room.isRoom()) return null;
  const key = stopKey(stopIndex);
  const held = room.claimedBy(key);
  return held && !room.heldByMe(key) ? held.name : null;
}

/** Take the stop, and close the panel again if the server gives it to somebody else. */
function takeStop(stopIndex){
  if(!room.isRoom()) return;
  const key = stopKey(stopIndex);
  heldKey = key;
  room.claim(key).then((r) => {
    if(r.ok) return;
    if(heldKey === key) heldKey = null;
    closeModal();
    openModal('Somebody got there first',
      `<div class="briefBox">${esc(r.name || 'A teammate')} opened this call a moment before you did. `
      + `It is theirs to answer — there is other work open in the meantime.</div>`);
  });
}

function releaseHeld(){
  if(!heldKey) return;
  room.release(heldKey);
  heldKey = null;
}

function coopBusy(stopIndex, what){
  const who = takenBy(stopIndex);
  if(!who) return false;
  openModal('Somebody is on that one',
    `<div class="briefBox"><b>${esc(who)}</b> is answering ${esc(what)} right now. `
    + `The verdict comes to everyone when it lands — take one of the others in the meantime.</div>`);
  return true;
}
function bindTerms(container, list=JARGON){
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
      const term=(list ?? [])[idx];
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
  // "Earliest first" is a claim about what the answer is graded on, and for one
  // ordering item in nine it is the wrong claim. ContamCity's evidence workflow
  // is ordered by what each step costs — photograph, headspace, non-destructive
  // spectrum, destructive method — and three of its four cards say they consume
  // nothing, so a player reading "earliest" looks for a chronology that is not
  // there. The axis lives in `takeaway` and `why`, both of which arrive after
  // the answer. `axis` puts it above the slots, where it can be used.
  // The two rail captions make the same claim a second time, in the one place
  // the eye lands while dragging, so they have to move with it.
  const axis = String(ch.axis ?? '').trim();
  const ends = Array.isArray(ch.ends) && ch.ends.length === 2 ? ch.ends.map(e => String(e ?? '')) : null;
  return `<div class="compactInstruction">${axis ? esc(axis) : `Put the ${ch.cards.length} steps in order, earliest first.`}</div>`
    + `<div class="orderSplit">`
    +   `<div class="timelineTask"><div class="tlEnd">${esc(ends ? ends[0] : 'Earliest')}</div><ol class="timelineSlots">${slots}</ol><div class="tlEnd">${esc(ends ? ends[1] : 'Latest')}</div></div>`
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
  if(standalone){ standaloneRepaint(orderHTML(activeChallenge.ch)); return; }
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
/**
 * The numeric spec behind an estimate.
 *
 * Stamped onto the active challenge when the panel opens, not looked up again in
 * each of the five places that want it. The key was written out four separate
 * times — `${id}-${day}` in the panel, in the glossary sweep, in the reasoning
 * and in the verdict figure — which is four chances for one of them to disagree,
 * and the reason the harness in engine/dev/lessons.html could not show an
 * estimate from a game other than the one the dev server was serving.
 */
function calcSpec(){
  return activeChallenge?.calc ?? null;
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
/**
 * What the estimate is FOR, taken off the left of the governing relationship.
 *
 * The panel used to show the slots alone — `[choose] / [choose]` floating in a
 * box — so the row said how to combine numbers and never what the combination
 * was. The relationship was printed above it as a sentence, which is not the
 * same thing as being on the row the player is filling in. Putting the left
 * side back on the equals sign is the difference between "divide these" and
 * "degrees lost = divide these".
 *
 * Returns null when the relationship is not written as an equation, or when its
 * left side is a clause rather than a name — better nothing than a wall of text
 * wrapped around the slots.
 */
function equationLeftSide(relationship){
  const text = String(relationship ?? '').trim();
  const at = text.search(/[=≈]/);
  if(at < 1) return null;
  const lhs = text.slice(0, at).trim().replace(/^(?:first|then|so|and)\s+/i, '');
  if(!lhs || lhs.length > 42 || /[.;]/.test(lhs)) return null;
  return lhs;
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
  const lhs = equationLeftSide(spec.relationship ?? ch.relationship);
  const complete = activeCalc.chosen.length===spec.slots;
  const result = complete ? calculateBallpark(spec) : NaN;
  const preview = readout({
    label: 'YOUR ESTIMATE',
    value: complete ? formatCalc(result) : '- - -',
    units: complete ? spec.units : '',
    dim: !complete,
    note: `${activeCalc.chosen.length} of ${spec.slots} values placed`,
  });
  return `<div class="ballparkBox"><div class="question">${esc(spec.prompt)}</div><div class="question" style="margin-top:8px;font-weight:700">${esc(spec.question)}</div>${ch.relationship?`<div class="calcLaw"><span class="calcLawLabel">Governing relationship</span><span class="calcLawBody">${esc(ch.relationship)}</span></div>`:''}<div class="numberBank">${bank}</div><div class="calcEquation">${lhs?`<span class="calcLhs">${esc(lhs)}</span><span class="calcEquals">=</span>`:''}${equation}${spec.units?`<span class="calcUnits">${esc(spec.units)}</span>`:''}</div><div class="calcReadout">${preview}</div><div class="calcActions"><button class="btn small" id="calcClear" type="button">Clear</button><button class="btn primary small" id="calcSubmit" type="button">Check estimate</button></div></div><div id="visitFeedback"></div>`;
}
function ballparkHTML(ch){
  const spec=calcSpec();
  // `?? 0` because the panel also draws outside a campaign — engine/dev/lessons.html
  // mounts one stop with no state behind it, and a shuffle seed is the only thing
  // any of these three renderers wanted the week for.
  activeCalc={ chosen:[], order: shuffleSeeded(spec?spec.labels.map((_,i)=>i):[], (getState()?.week ?? 0)*79 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge.id)*13 + activeChallenge.lesson.day + runSeed()) };
  if(!spec) return `<div class="ballparkBox"><div class="question">${esc(ch.task||'Estimate')}</div><div class="feedback bad"><p>This estimate has not yet been converted to the number-tile format. Use the supplied givens to produce a rounded result.</p></div></div><div id="visitFeedback"></div>`;
  return ballparkBody(ch,spec);
}
function rerenderBallpark(){
  if(standalone){ standaloneRepaint(ballparkBody(activeChallenge.ch, calcSpec())); return; }
  const state=getState();
  const gs=state.groups.find(x=>x.id===activeChallenge.id);
  const lesson=activeChallenge.lesson;
  const ch=activeChallenge.ch;
  const person=activeChallenge.person || null;
  const spec=calcSpec();
  const body=document.getElementById('modalBody');
  if(!body) return;
  body.innerHTML = challengePrefix(gs, lesson, ch, person) + withAssist(ballparkBody(ch,spec));
  bindBallpark(); bindVisitAssist(); bindTerms(body);
}
function bindBallpark(){
  const spec=calcSpec();
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
  return `<div class="compactInstruction">Spend most of the 100 points across the proposals. The whole distribution is graded, not just your top pick: fund every proposal the evidence supports, and starve the ones it does not.</div><div class="tankGrid">${ch.proposals.map(p=>`<label class="tankProposal"><div><b>Proposal ${esc(p.label)}</b><p>${esc(p.text)}</p></div><input type="number" min="0" max="100" step="5" value="0" data-tank="${esc(p.label)}"><span>points</span></label>`).join('')}</div>${ch.research && !hasRules()?`<details class="researchReveal"><summary>Evidence available</summary><div style="white-space:pre-wrap">${esc(ch.research)}</div></details>`:''}<div class="tankTotal">Allocated: <b id="tankTotal">0</b> / 100</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="tankCheck" type="button">Check</button></div>`;
}

/**
 * SWEEP — one control, a live response, and a reading the player commits to.
 *
 * The mechanic most of the physics in these courses actually has: a resonance,
 * a decay, a calibration, a trade-off. The player drags a handle along the axis;
 * every position they visit is sampled and plotted, so the trace is something
 * they *built* rather than something the game drew for them. The feature is
 * found by looking, and the reading is committed on purpose.
 *
 * Two deliberate choices. The response is authored as sampled points rather
 * than a formula, because the printed book has to show the same curve and
 * cannot run JavaScript. And nothing marks the target: a glowing optimum turns
 * the format into a button, which is the failure mode `INTERACTION_IDEAS.md`
 * warns about in its own first rule.
 */
/**
 * Where the player is on the axis and everywhere they have been.
 *
 * Held on the panel element, not in a module variable: a module variable is one
 * sweep for the whole page, and the dev harness that draws six of them at once
 * had every panel plotting the last one's visited points. One panel per visit is
 * all the game ever shows, so this cost nothing to make right.
 */
/**
 * Bring a panel's controls into view, once, after the body exists.
 *
 * `.modalBody .modalActions` is `position:sticky; bottom:0`, so on a panel taller
 * than the modal the action row pins itself over whatever is between the current
 * scroll position and the bottom — on these four that is the slider and the
 * readouts, which is how a sweep once came to look like an empty box with a
 * button under it. It happened again the day SWEEP, HOLDOUT, TALLY and PROBE were
 * given their "what you are doing" and "what counts as done" blocks: 150 px of
 * explanation is 150 px the controls no longer had.
 *
 * `scrollIntoView({ block: 'nearest' })` is NOT enough, and that is the whole
 * reason this is a function rather than a line. An element whose bottom edge is one
 * pixel inside the scroll container is "in view" by that definition and completely
 * hidden by the bar pinned over it, so the browser scrolls by six pixels and
 * declares the job done — which is exactly what it did here, and the readouts
 * stayed invisible. The bar's own height has to come off the bottom of the box.
 *
 * Nothing happens when the panel already fits, which is most of them.
 */
/**
 * Whether the stop's own card has already said what to do.
 *
 * A stop carrying `guide` has one paragraph whose whole job is the instruction, so
 * the panel's three lines — what you are doing, the hint, what counts as done —
 * are the same sentence three more times. They stay for every stop that does not,
 * which is all but one of the 1,300 today.
 */
const briefed = () => !!String(activeChallenge?.lesson?.guide ?? '').trim();

/**
 * Whether this stop has been converted to the rules-behind-a-door shape.
 *
 * A tank stop that has been rewritten carries its evidence as the card's second
 * paragraph and its spending rules behind the Rules button, so the panel's own
 * "Evidence available" disclosure would be the same prose a second time. A stop
 * that has NOT been converted still keeps it, which is why this asks for `rules`
 * rather than for `guide`: every tank stop has a guide, and only a converted one
 * has moved the evidence up.
 */
const hasRules = () => !!String(activeChallenge?.lesson?.rules ?? '').trim();

function showControls(panel, selector){
  if(!panel) return;
  requestAnimationFrame(() => {
    const el = panel.querySelector(selector);
    if(!el) return;
    // The scroll container is `.modal` in the game and in every harness, but
    // finding it by class would tie this to one shell. Whatever actually scrolls
    // is what has to be moved.
    let box = el.parentElement;
    while(box && box !== document.body){
      const oy = getComputedStyle(box).overflowY;
      if((oy === 'auto' || oy === 'scroll') && box.scrollHeight > box.clientHeight + 1) break;
      box = box.parentElement;
    }
    if(!box || box === document.body){ el.scrollIntoView({ block: 'nearest' }); return; }
    const bar = panel.querySelector('.modalActions');
    const clear = (bar ? bar.getBoundingClientRect().height : 0) + 10;
    const over = (el.getBoundingClientRect().bottom + clear) - box.getBoundingClientRect().bottom;
    if(over > 0) box.scrollTop += over;
  });
}

const sweepState = new WeakMap();

/** Linear interpolation between the authored points, flat outside them. */
function sweepValueAt(w, x, seriesIx = 0){
  const src = (w.series ?? [])[seriesIx]?.response ?? w.response ?? [];
  const pts = [...src].sort((a, b) => a.at - b.at);
  if(!pts.length) return w.baseline ?? 0;
  if(x <= pts[0].at) return pts[0].value;
  if(x >= pts[pts.length - 1].at) return pts[pts.length - 1].value;
  for(let i = 1; i < pts.length; i++){
    if(x <= pts[i].at){
      const a = pts[i - 1], b = pts[i];
      const t = (x - a.at) / (b.at - a.at || 1);
      return a.value + (b.value - a.value) * t;
    }
  }
  return w.baseline ?? 0;
}

const SWEEP_INK = ['#2f6f8f', '#b06a2a', '#3f8f56'];

/**
 * Enough decimals to tell one position on this axis from the next.
 *
 * `fmt` rounds to one decimal place, which is right for money and wrong for
 * every sweep in the repo: a spectroscopy axis stepping 0.01 GHz displayed
 * "4.6" at four different frequencies, and a population of 0.99 displayed as
 * "1". A player cannot land inside a tolerance of 0.02 reading a number that
 * has been rounded to 0.1.
 */
const decimalsFor = (step) => {
  const s = Math.abs(step) || 1;
  if(s >= 1) return 0;
  return Math.min(4, Math.max(1, Math.ceil(-Math.log10(s))));
};
const num = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : '—');
/** The decimals a series' own readout needs, from how far its values travel. */
const seriesDecimals = (series, baseline = 0) => {
  const vals = series.flatMap(s => (s.response ?? []).map(p => p.value)).concat([baseline]);
  const spread = (Math.max(...vals) - Math.min(...vals)) || 1;
  return decimalsFor(spread / 50);
};

// Exported for `engine/dev/instruments.html`, which draws every sweep in a theme on
// one page. A sweep is the only format that cannot be judged from the book —
// whether the control, the curve and the readouts fit is a question about the
// rendered panel — and reaching one in the game means playing to the right day.
export function sweepHTML(ch){
  const w = ch.sweep ?? {};
  const series = w.series ?? [{ label: w.readout?.label ?? '', response: w.response ?? [] }];
  const a = w.axis ?? {};
  const unit = a.unit ? ' ' + esc(a.unit) : '';
  const ad = decimalsFor(a.step);
  // Every format prints its own instruction line; this one printed the axis label
  // and nothing else, so the question the stop was written around never reached
  // the player. What they saw was a slider and a criterion they had to guess.
  return `<div class="sweepAsk">${esc(ch.question || ch.task || 'Find the reading.')}</div>`
    + `<div class="sweepPanel" data-min="${a.min}" data-max="${a.max}" data-step="${a.step}">`
    + `<div class="sweepHead"><span class="sweepAxisLabel">${esc(a.label)}</span>`
    + `<b class="sweepAt">${num(w.start, ad)}${unit}</b></div>`
    + (briefed() ? '' : methodBlock('SWEEP')
       + `<div class="sweepHint">${esc(w.hint
           ?? 'Drag the slider across the range. Only the positions you visit are plotted.')}</div>`
       + goalBlock(w.goals))
    + `<svg class="sweepPlot" viewBox="0 0 320 120" role="img" aria-label="Response against ${esc(a.label)}">`
    + `<rect width="320" height="120" fill="#f7f9fa"/>`
    + series.map((x, i) =>
        `<polyline class="sweepTrace" data-series="${i}" fill="none" stroke="${SWEEP_INK[i % SWEEP_INK.length]}" stroke-width="2" points=""/>`).join('')
    // A single visited position draws no polyline at all, so the first thing the
    // player sees on an untouched panel is a blank box. The dot is the reading
    // they are standing on; it marks where they are, never where to go.
    + series.map((x, i) =>
        `<circle class="sweepDot" data-series="${i}" r="2.6" cx="-20" cy="-20" fill="${SWEEP_INK[i % SWEEP_INK.length]}"/>`).join('')
    + `<line class="sweepHandle" x1="0" y1="0" x2="0" y2="120" stroke="#c0392b" stroke-width="1.5"/>`
    + `<g class="sweepScale"></g>`
    + `</svg>`
    + `<input class="sweepRange" type="range" min="${a.min}" max="${a.max}" step="${a.step}" value="${w.start}">`
    + `<div class="sweepEnds"><span>${num(a.min, ad)}${unit}</span><span>${num(a.max, ad)}${unit}</span></div>`
    // The readouts sit side by side, not stacked. Three stacked rows put the
    // numbers — which are the whole point of the format — below the fold of a
    // modal whose actions are pinned under them.
    + `<div class="sweepReadouts">`
    + series.map((x, i) => `<div class="sweepReadout"><span style="color:${SWEEP_INK[i % SWEEP_INK.length]}">`
        + `${esc(x.label || w.readout?.label || 'Response')}</span>`
        + `<b class="sweepValue" data-series="${i}">—</b></div>`).join('')
    // The total is authored, not automatic. Two costs traded against each other
    // have a meaningful sum with a floor in it — that is the lesson of a
    // discriminator. Two different decays do not: adding an excited population to
    // a Ramsey contrast produced "1.96", a number about nothing.
    + (series.length > 1 && w.floor
        ? `<div class="sweepReadout sweepTotal"><span>${esc(w.floor)}</span>`
          + `<b class="sweepSum">—</b></div>` : '')
    + `</div>`
    + `<div class="modalActions"><button class="btn primary" id="sweepCommit" type="button">`
    + `${esc(w.commit ?? 'Mark it')}</button></div>`
    + `<div id="visitFeedback"></div></div>`;
}

/**
 * The picture the verdict needs, which the panel cannot give it.
 *
 * A sweep plots only the positions the player visited — that is the format — so
 * when the panel closes the curve they built goes with it. This reveals the whole
 * authored response with their reading marked beside the one the instrument
 * supports, which is the difference between "wrong" and "you found the small
 * feature instead of the big one".
 *
 * Exported so `engine/dev/instruments.html` can draw it for a wrong answer without
 * playing a campaign.
 */
export function sweepVerdictFigure(ch, yours, ok){
  const w = ch.sweep ?? {}, a = w.axis ?? {};
  const series = (w.series?.length ? w.series
    : [{ label: w.readout?.label ?? 'Response', response: w.response ?? [] }]);
  const ad = decimalsFor(a.step);
  const unit = a.unit ? ' ' + a.unit : '';
  const marks = [];
  if(Number.isFinite(yours) && Math.abs(yours - w.target) > w.tolerance){
    marks.push({ x: yours, label: `yours, ${num(yours, ad)}${unit}` });
  }
  marks.push({ x: w.target, label: `${num(w.target, ad)}${unit}` });
  return lineChart({
    series: series.map(s => ({ name: s.label || w.readout?.label || 'Response',
      points: (s.response ?? []).map(p => [p.at, p.value]) })),
    marks,
    xLabel: `${a.label ?? ''}${a.unit ? ` (${a.unit})` : ''}`,
    yLabel: series.length === 1 ? (series[0].label || w.readout?.label || '') : '',
    caption: ok ? 'The whole response, with the reading you committed'
                : 'The whole response — your reading, and the one it supports',
  });
}

/**
 * Both curves at last, with the frozen line on them.
 *
 * The panel shows one curve while the player is choosing and a single held-out
 * point after they freeze, on purpose — seeing the held-out curve would let them
 * fit to that too, which is the mistake the stop is about. The verdict is where
 * the argument is allowed to close: the calibration curve's spike was the best
 * thing on screen, and here is where it lands on data it has never seen.
 *
 * Exported so `engine/dev/instruments.html` can draw it without a campaign.
 */
export function holdoutVerdictFigure(ch, frozen){
  const h = ch.holdout ?? {}, a = h.axis ?? {};
  return lineChart({
    series: [
      { name: h.fitLabel ?? 'Calibration', points: (h.fit ?? []).map(p => [p.at, p.value]) },
      { name: h.testLabel ?? 'Held-out', points: (h.test ?? []).map(p => [p.at, p.value]) },
    ],
    marks: Number.isFinite(frozen)
      ? [{ x: frozen, label: `your line, ${num(frozen, decimalsFor(a.step))}${a.unit ? ' ' + a.unit : ''}` }] : [],
    xLabel: `${a.label ?? ''}${a.unit ? ` (${a.unit})` : ''}`,
    caption: 'Both sets, at last. The gap between the curves is what fitting to a sample buys you',
  });
}

/**
 * The statistic as the shots came in.
 *
 * A player who reported early sees their own number sitting on the noisy part of
 * their own trace, which is a more honest account of what went wrong than any
 * sentence about standard errors.
 */
export function tallyVerdictFigure(ch, history){
  const hist = history ?? [];
  if(hist.length < 2) return '';
  const t = ch.tally ?? {};
  return lineChart({
    // The combination's name, not the row label: what wanders here is the
    // statistic, and calling its trace "Correlation" named the wrong quantity.
    series: [{ name: t.formulaLabel ?? 'Combination', points: hist.map(p => [p.shots, p.value]) }],
    ...(Number.isFinite(t.bound)
      ? { limit: { at: t.bound, label: t.boundLabel || `bound ${t.bound}` } } : {}),
    marks: [{ x: hist[hist.length - 1].shots, label: 'reported' }],
    xLabel: 'Shots taken', yLabel: t.formulaLabel ?? '',
    caption: 'Your own statistic as the shots came in — the scatter is the sample, not the physics',
  });
}

/** Wire the handle and the commit button. */
export function bindSweep(container, ch){
  const w = ch.sweep ?? {};
  const panel = container.querySelector('.sweepPanel');
  if(!panel) return;
  const st = { at: (w.axis ?? {}).min ?? 0, visited: [], committed: false };
  sweepState.set(panel, st);
  const range = panel.querySelector('.sweepRange');
  const handle = panel.querySelector('.sweepHandle');
  const atEl = panel.querySelector('.sweepAt');
  const a = w.axis ?? {};
  const span = (a.max - a.min) || 1;
  const ad = decimalsFor(a.step);
  // The plot's y range comes from the authored points, so a small feature on a
  // large baseline is still visible.
  const series = w.series ?? [{ response: w.response ?? [] }];
  const vals = series.flatMap(x => x.response.map(p => p.value)).concat([w.baseline ?? 0]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const yRange = (hi - lo) || 1;
  const px = (x) => ((x - a.min) / span) * 320;
  const py = (v) => 114 - ((v - lo) / yRange) * 108;
  const vd = seriesDecimals(series, w.baseline ?? 0);
  // The y scale is worth two labels: without them a decay and a fraction look
  // identical, and the trace is the thing the player is reasoning from.
  const scale = panel.querySelector('.sweepScale');
  // Right-hand side: the handle starts at the left edge and the dot with it, and
  // a label there is under both of them.
  if(scale) scale.innerHTML =
    `<text x="316" y="12" text-anchor="end" class="sweepTick">${num(hi, vd)}</text>`
    + `<text x="316" y="116" text-anchor="end" class="sweepTick">${num(lo, vd)}</text>`;

  const traces = [...panel.querySelectorAll('.sweepTrace')];
  const dots = [...panel.querySelectorAll('.sweepDot')];
  const valEls = [...panel.querySelectorAll('.sweepValue')];
  const sumEl = panel.querySelector('.sweepSum');
  const draw = () => {
    const x = +range.value;
    const vs = series.map((_, i) => sweepValueAt(w, x, i));
    st.at = x;
    // Only what the player has actually visited is plotted.
    if(!st.visited.some(p => Math.abs(p.at - x) < (a.step || 0) / 2)){
      st.visited.push({ at: x, values: vs });
      st.visited.sort((p, q) => p.at - q.at);
    }
    traces.forEach((t, i) => t.setAttribute('points',
      st.visited.map(p => `${px(p.at).toFixed(1)},${py(p.values[i]).toFixed(1)}`).join(' ')));
    dots.forEach((d, i) => {
      // Clamped off the frame edge, or the dot at either end of the axis is half
      // outside the plot and reads as nothing there.
      d.setAttribute('cx', clamp(px(x), 3.5, 316.5).toFixed(1));
      d.setAttribute('cy', clamp(py(vs[i]), 3.5, 116.5).toFixed(1));
    });
    handle.setAttribute('x1', px(x).toFixed(1));
    handle.setAttribute('x2', px(x).toFixed(1));
    atEl.textContent = `${num(x, ad)}${a.unit ? ' ' + a.unit : ''}`;
    const unitOf = (i) => series[i].unit ?? w.readout?.unit ?? '';
    valEls.forEach((el, i) => {
      el.textContent = `${num(vs[i], vd)}${unitOf(i) ? ' ' + unitOf(i) : ''}`;
    });
    // The total carries a unit only where every series shares one — adding a
    // percentage to a microsecond is the author's mistake, not something to
    // paper over with a label.
    if(sumEl){
      const units = new Set(series.map((_, i) => unitOf(i)));
      const u = units.size === 1 ? [...units][0] : '';
      sumEl.textContent = `${num(vs.reduce((a2, b) => a2 + b, 0), vd)}${u ? ' ' + u : ''}`;
    }
  };
  range.addEventListener('input', draw);
  draw();
  // Deliberately NOT focused. A focused range input takes arrow, Home, End and
  // Page keys, so a stray keystroke moves the reading the player is about to
  // commit — and it moves silently. Tab still reaches it.

  // The modal's action row is `position:sticky; bottom:0`, so anything between
  // the current scroll position and that row is pinned *behind* it. On a sweep
  // that is the readouts, which is how the format came to look like an empty box
  // with a button under it.
  showControls(panel, '.sweepReadouts');

  panel.querySelector('#sweepCommit')?.addEventListener('click', () => {
    if(st.committed) return;
    // Rendered outside a visit — the dev harness — has nothing to grade.
    if(!activeChallenge) return;
    st.committed = true;
    const ok = Math.abs(st.at - w.target) <= w.tolerance;
    activeChallenge.userAnswer = `${num(st.at, ad)}${a.unit ? ' ' + a.unit : ''}`;
    activeChallenge.userValue = st.at;
    // How much of the axis they looked at, which is the difference between
    // finding a feature and landing on it.
    activeChallenge.sweptFraction = st.visited.length
      ? (Math.max(...st.visited.map(p => p.at)) - Math.min(...st.visited.map(p => p.at))) / span
      : 0;
    finishVisit(ok);
  });
}

/**
 * HOLDOUT — fit a rule on one set of data, freeze it, and test it on data it has
 * never seen.
 *
 * The most important idea in Quantum and the hardest to teach by telling: a
 * threshold chosen on a sample describes that sample better than it describes a
 * fresh one, quietly and consistently. Read as a sentence it is obvious and
 * changes nothing. Done, it is a number falling in front of you.
 *
 * The mechanic is the sweep's, with one addition that carries the whole lesson.
 * The player moves a threshold and sees its score on the CALIBRATION set — a
 * curve with a broad, honest plateau and a narrow spike a little way off it,
 * which is the noise of that particular sample and scores best of anything on
 * screen. They freeze the line. Only then does the held-out set report, at the
 * frozen position and nowhere else. Chasing the spike costs them; sitting on the
 * plateau does not. Nothing marks either.
 *
 * Graded on the held-out score, never on the calibration score, because that is
 * the entire argument.
 */
const holdoutState = new WeakMap();

export function holdoutHTML(ch){
  const h = ch.holdout ?? {};
  const a = h.axis ?? {};
  const ad = decimalsFor(a.step);
  const unit = a.unit ? ' ' + esc(a.unit) : '';
  return `<div class="sweepAsk">${esc(ch.question || ch.task || 'Fit it, freeze it, and test it.')}</div>`
    + `<div class="holdoutPanel" data-min="${a.min}" data-max="${a.max}">`
    // The two sets, each allowed a line saying what it IS. A tab reading
    // "Calibration shots" is a name, not an explanation, and the whole judgment
    // this format asks for depends on knowing that the two are separate batches of
    // the same thing. `fitNote` / `testNote` are authored per stop, because what a
    // batch is differs by game — shots, samples, patients, storm seasons.
    + `<div class="holdoutTabs">`
    + `<b class="holdoutTab on" data-set="fit">${esc(h.fitLabel ?? 'Calibration set')}`
    + (h.fitNote ? `<span class="holdoutTabNote">${esc(h.fitNote)}</span>` : '') + `</b>`
    + `<b class="holdoutTab" data-set="test">${esc(h.testLabel ?? 'Held-out set')}`
    + (h.testNote ? `<span class="holdoutTabNote">${esc(h.testNote)}</span>` : '')
    // Why the second column is empty, said in the second column. It reads as a
    // broken panel otherwise — two tabs, one of them blank, no way to click it.
    + `<span class="holdoutLock">no number until you freeze</span></b></div>`
    + `<div class="sweepHead"><span class="sweepAxisLabel">${esc(a.label)}</span>`
    + `<b class="sweepAt">${num(h.start ?? a.min, ad)}${unit}</b></div>`
    + (briefed() ? '' : methodBlock('HOLDOUT')
       + goalBlock(h.goals))
    // The hint stays either way: `afterFreeze` is written into it, so it is the
    // line that changes when the line is frozen. On a briefed stop it starts empty
    // and fills in at that moment.
    + `<div class="sweepHint" id="holdoutHint">${esc(briefed() ? '' : (h.hint
        ?? `Move the line and watch what it scores on the `
           + `${(h.fitLabel ?? 'calibration set').toLowerCase()}. `
           + `Freeze it when you are satisfied.`))}</div>`
    + `<svg class="sweepPlot" viewBox="0 0 320 120" role="img" aria-label="Score against ${esc(a.label)}">`
    + `<rect width="320" height="120" fill="#f7f9fa"/>`
    + `<polyline class="holdoutTrace" fill="none" stroke="${SWEEP_INK[0]}" stroke-width="2" points=""/>`
    + `<polyline class="holdoutTestTrace" fill="none" stroke="${SWEEP_INK[1]}" stroke-width="2"`
    + ` stroke-dasharray="3 3" points="" opacity="0"/>`
    + `<circle class="sweepDot" r="2.6" cx="-20" cy="-20" fill="${SWEEP_INK[0]}"/>`
    + `<line class="sweepHandle" x1="0" y1="0" x2="0" y2="120" stroke="#c0392b" stroke-width="1.5"/>`
    + `<g class="sweepScale"></g></svg>`
    // What the two axes are, in words. The plot carries a label along the top and
    // two bare numbers up the side, which tells somebody who already knows what is
    // plotted that it is plotted. A player asked what the 95 was.
    // The label is a tab caption written in its own case — "Tray A", "The week it
    // was fitted on" — so it cannot be dropped into the middle of a sentence. The
    // sentence points at it instead.
    + `<div class="sweepAxisNote">Up the side: the score${h.unit ? `, in ${esc(h.unit)}` : ''},`
    + ` on the set named above. Higher is better.`
    + ` Along the bottom: ${esc(a.label)}${a.unit ? `, in ${esc(a.unit)}` : ''}.</div>`
    + `<input class="sweepRange" type="range" min="${a.min}" max="${a.max}" step="${a.step}" value="${h.start ?? a.min}">`
    + `<div class="sweepEnds"><span>${num(a.min, ad)}${unit}</span><span>${num(a.max, ad)}${unit}</span></div>`
    + `<div class="sweepReadouts">`
    + `<div class="sweepReadout"><span style="color:${SWEEP_INK[0]}">${esc(h.fitLabel ?? 'Calibration set')}</span>`
    + `<b class="holdoutFitScore">—</b></div>`
    + `<div class="sweepReadout sweepTotal"><span style="color:${SWEEP_INK[1]}">${esc(h.testLabel ?? 'Held-out set')}</span>`
    + `<b class="holdoutTestScore">not yet run</b></div>`
    + `</div>`
    + `<div class="modalActions">`
    + `<button class="btn" id="holdoutFreeze" type="button">${esc(h.freeze ?? 'Freeze the line')}</button>`
    + `<button class="btn primary" id="holdoutCommit" type="button" disabled>`
    + `${esc(h.commit ?? 'Report the honest number')}</button></div>`
    + `<div id="visitFeedback"></div></div>`;
}

export function bindHoldout(container, ch){
  const h = ch.holdout ?? {};
  const panel = container.querySelector('.holdoutPanel');
  if(!panel) return;
  const a = h.axis ?? {};
  const ad = decimalsFor(a.step);
  const fit = { response: h.fit ?? [] }, test = { response: h.test ?? [] };
  const st = { at: h.start ?? a.min, visited: [], frozen: null, committed: false };
  holdoutState.set(panel, st);

  const range = panel.querySelector('.sweepRange');
  const handle = panel.querySelector('.sweepHandle');
  const dot = panel.querySelector('.sweepDot');
  const atEl = panel.querySelector('.sweepAt');
  const trace = panel.querySelector('.holdoutTrace');
  const testTrace = panel.querySelector('.holdoutTestTrace');
  const fitEl = panel.querySelector('.holdoutFitScore');
  const testEl = panel.querySelector('.holdoutTestScore');
  const hint = panel.querySelector('#holdoutHint');
  const freezeBtn = panel.querySelector('#holdoutFreeze');
  const commitBtn = panel.querySelector('#holdoutCommit');
  const tabs = [...panel.querySelectorAll('.holdoutTab')];

  const span = (a.max - a.min) || 1;
  const vals = [...fit.response, ...test.response].map(p => p.value);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const yRange = (hi - lo) || 1;
  // `lo`, not the default 0: a fidelity in the high nineties spans ten points, and
  // folding a zero into the spread said "one part in a hundred is enough" and
  // printed 95.2 as 95 — on a question whose margin is half a point.
  const vd = seriesDecimals([fit, test], lo);
  const px = (x) => ((x - a.min) / span) * 320;
  const py = (v) => 114 - ((v - lo) / yRange) * 108;
  const scale = panel.querySelector('.sweepScale');
  if(scale) scale.innerHTML =
    `<text x="316" y="12" text-anchor="end" class="sweepTick">${num(hi, vd)}</text>`
    + `<text x="316" y="116" text-anchor="end" class="sweepTick">${num(lo, vd)}</text>`;
  const scoreAt = (which, x) => sweepValueAt({ response: which.response }, x);

  const draw = () => {
    const x = +range.value;
    st.at = x;
    const v = scoreAt(fit, x);
    if(!st.visited.some(p => Math.abs(p.at - x) < (a.step || 0) / 2)){
      st.visited.push({ at: x, value: v });
      st.visited.sort((p, q) => p.at - q.at);
    }
    trace.setAttribute('points', st.visited.map(p => `${px(p.at).toFixed(1)},${py(p.value).toFixed(1)}`).join(' '));
    dot.setAttribute('cx', clamp(px(x), 3.5, 316.5).toFixed(1));
    dot.setAttribute('cy', clamp(py(v), 3.5, 116.5).toFixed(1));
    handle.setAttribute('x1', px(x).toFixed(1));
    handle.setAttribute('x2', px(x).toFixed(1));
    atEl.textContent = `${num(x, ad)}${a.unit ? ' ' + a.unit : ''}`;
    fitEl.textContent = `${num(v, vd)}${h.unit ? ' ' + h.unit : ''}`;
  };
  range.addEventListener('input', draw);
  draw();
  showControls(panel, '.sweepReadouts');

  freezeBtn.addEventListener('click', () => {
    if(st.frozen !== null) return;
    st.frozen = st.at;
    range.disabled = true;
    freezeBtn.disabled = true;
    commitBtn.disabled = false;
    tabs.forEach(t => t.classList.toggle('on', t.dataset.set === 'test'));
    panel.querySelector('.holdoutLock')?.remove();
    const v = scoreAt(test, st.frozen);
    st.testScore = v;
    testEl.textContent = `${num(v, vd)}${h.unit ? ' ' + h.unit : ''}`;
    // Only the one point. Revealing the held-out curve here would let the player
    // fit to it too, which is the mistake the stop is about.
    testTrace.setAttribute('points', `${px(st.frozen).toFixed(1)},${py(v).toFixed(1)}`);
    hint.textContent = h.afterFreeze
      ?? 'The line is frozen. That is what it scores on shots it has never seen.';
  });

  commitBtn.addEventListener('click', () => {
    if(st.committed || st.frozen === null) return;
    if(!activeChallenge) return;
    st.committed = true;
    const ok = st.testScore >= h.pass;
    activeChallenge.userAnswer = `${num(st.testScore, vd)}${h.unit ? ' ' + h.unit : ''}`
      + ` on the ${(h.testLabel ?? 'held-out set').toLowerCase()},`
      + ` from a line at ${num(st.frozen, ad)}${a.unit ? ' ' + a.unit : ''}`;
    activeChallenge.userValue = st.testScore;
    activeChallenge.holdoutFrozen = st.frozen;
    activeChallenge.holdoutFitScore = scoreAt(fit, st.frozen);
    finishVisit(ok);
  });
}

/**
 * TALLY — a statistic built out of ordinary repeated measurements.
 *
 * CHSH read as four supplied correlations is arithmetic with a spooky caption.
 * Acquired, it is what it actually is: counts in bins, a difference of
 * probabilities, and a combination that only means something once there are
 * enough shots behind it. The decision the player makes is the real one an
 * experimenter makes — when is there enough data to report the number.
 *
 * Each batch is drawn from the authored probability with the campaign's own seed,
 * so the counts scatter like counts and settle where the physics says. Committing
 * early reports a noisy statistic and is marked on the number it actually got,
 * which is the only honest way to teach this.
 */
const tallyState = new WeakMap();

export function tallyHTML(ch){
  const t = ch.tally ?? {};
  const rows = (t.settings ?? []).map((s, i) => `<tr data-row="${i}">`
    + `<td class="tallyName">${esc(s.label)}</td>`
    + `<td class="tallyCount" data-cell="same">0</td>`
    + `<td class="tallyCount" data-cell="diff">0</td>`
    + `<td class="tallyCount" data-cell="n">0</td>`
    + `<td class="tallyE">—</td>`
    + `<td class="tallySigmaCell">—</td>`
    // The measured correlation and the term it becomes are different numbers, and
    // one column tried to be both: a setting entering negatively with a negative
    // correlation printed "− −0.730", which is a puzzle rather than a readout.
    + `<td class="tallyTerm">—</td>`
    + `<td><button class="btn tallyRun" data-run="${i}" type="button">Run ${t.batch ?? 100}</button></td>`
    + `</tr>`).join('');
  return `<div class="sweepAsk">${esc(ch.question || ch.task || 'Acquire the correlations.')}</div>`
    + `<div class="tallyPanel">`
    + (briefed() ? '' : methodBlock('TALLY')
       + `<div class="sweepHint">${esc(t.hint
           ?? `Each batch is ${t.batch ?? 100} shots. A correlation is the probability the two `
              + `outcomes agree minus the probability they disagree, so it runs from −1 to +1.`)}</div>`
       + goalBlock(t.goals))
    // THE CONVERGENCE PLOT. The subject of this format is when a statistic has
    // enough data behind it, and for most of this engine's life the only picture of
    // that arrived in the verdict — after the decision it was evidence for. A
    // column of counts cannot show a number settling; a trace can, and it is the
    // same `lineChart` the verdict draws, redrawn as the batches come in. What it
    // must not carry is the target or the tolerance: the bound is the constraint
    // the answer is written against and is drawn, the answer is not.
    + `<div class="tallyPlot" id="tallyPlot"></div>`
    + `<table class="tallyTable"><thead><tr><th>Settings</th><th>Same</th><th>Different</th>`
    + `<th>Shots</th><th>${esc(t.readoutLabel ?? 'Correlation')}</th>`
    // The per-pair spread is the "where" half of the question. The trace says
    // whether the combination has settled; this says which row is still moving it,
    // which is the whole of how a finite budget should be split.
    + `<th class="tallySpreadHead">± 1&sigma;</th><th>Enters as</th><th></th></tr></thead>`
    + `<tbody>${rows}</tbody></table>`
    + `<div class="tallyCombo"><span>${esc(t.formulaLabel ?? 'Combination')}</span>`
    + `<code>${esc(t.formula ?? '')}</code><b class="tallyValue">—</b>`
    + `<em class="tallySigma">spread —</em></div>`
    // The budget, if the stop has one. Without it this format had no decision in
    // it: shots were free, the clock is stopped behind a panel, and the commit
    // button unlocked only once every pair was past a minimum that was already
    // enough — so the panel made the judgment and the player clicked until it let
    // them submit. A finite pot of batches is what turns "when is there enough
    // data" back into a question somebody has to answer.
    + (t.budget
        ? `<div class="tallyBudget"><span>Batches left</span>`
          + `<b id="tallyLeft">${t.budget}</b>`
          + `<em>${t.budget} batches of ${t.batch ?? 100} shots for the whole stop,`
          + ` across ${(t.settings ?? []).length} pairs</em></div>`
        : '')
    + `<div class="tallyNote" id="tallyNote">Every setting pair needs at least ${t.minShots ?? 400}`
    + ` shots before the combination can be reported.</div>`
    + `<div class="modalActions"><button class="btn primary" id="tallyCommit" type="button" disabled>`
    + `${esc(t.commit ?? 'Report where it settled')}</button></div>`
    + `<div id="visitFeedback"></div></div>`;
}

export function bindTally(container, ch){
  const t = ch.tally ?? {};
  const panel = container.querySelector('.tallyPanel');
  if(!panel) return;
  const settings = t.settings ?? [];
  const batch = t.batch ?? 100;
  const minShots = t.minShots ?? 400;
  // No `budget` means the old behaviour, unlimited batches, which is what every
  // harness and any book written before this expects.
  const budget = Number.isFinite(+t.budget) && +t.budget > 0 ? +t.budget : null;
  const st = { bins: settings.map(() => ({ same: 0, diff: 0 })), history: [], used: 0,
               committed: false };
  tallyState.set(panel, st);
  // The Run buttons are the controls here, and they are in the table.
  showControls(panel, '.tallyTable');
  // Seeded on the campaign's own run seed and the batch index, so a replay of the
  // same day scatters the same way and a reload cannot be used to reroll a
  // statistic into range.
  let draws = 0;
  const rng = () => seeded(runSeed() * 7919 + (draws++) * 104729 + settings.length);

  const valueEl = panel.querySelector('.tallyValue');
  const sigmaEl = panel.querySelector('.tallySigma');
  const plotEl = panel.querySelector('#tallyPlot');
  const note = panel.querySelector('#tallyNote');
  const leftEl = panel.querySelector('#tallyLeft');
  const commitBtn = panel.querySelector('#tallyCommit');
  const spent = () => (budget === null ? false : st.used >= budget);

  const eOf = (i) => {
    const b = st.bins[i], n = b.same + b.diff;
    return n ? (b.same - b.diff) / n : null;
  };
  // The spread of one pair's correlation, and of the combination, from the counts
  // the player actually has. E = (same − diff)/n is 2p̂ − 1, so var(E) = 4p̂(1 − p̂)/n
  // and the terms of a sum add in quadrature whatever their signs. This is the
  // player's OWN uncertainty rather than the authored tolerance — printing it is
  // the constraint the answer is written against, and printing the tolerance would
  // be an invitation to stop at the edge of it.
  const sigmaOf = (i) => {
    const b = st.bins[i], n = b.same + b.diff;
    if(!n) return null;
    const p = b.same / n;
    return Math.sqrt(4 * p * (1 - p) / n);
  };
  const sigmaCombined = () => {
    const vs = settings.map((_, i) => sigmaOf(i));
    if(vs.some(v => v === null)) return null;
    return Math.sqrt(vs.reduce((a, v) => a + v * v, 0));
  };
  const combined = () => {
    const es = settings.map((_, i) => eOf(i));
    if(es.some(e => e === null)) return null;
    // The sign pattern is authored per setting: a CHSH combination is three plus
    // and one minus, and which one is negative is a property of the settings.
    return es.reduce((acc, e, i) => acc + (settings[i].sign === -1 ? -e : e), 0);
  };
  // Reportable once every pair has its minimum — or once the pot is empty, whatever
  // state the pairs are in. Without that second clause a player who spent the whole
  // budget on one pair would be locked out of the panel with no way forward, which
  // is the one thing the day model promises never happens.
  const ready = () => spent()
    || settings.every((_, i) => st.bins[i].same + st.bins[i].diff >= minShots);

  // Redrawn from the history on every batch. Two points is the minimum a trace can
  // be made of, and until then the box says what will appear rather than sitting
  // blank — an empty plot on an untouched panel reads as a broken panel.
  const drawPlot = () => {
    if(!plotEl) return;
    if(st.history.length < 2){
      plotEl.innerHTML = `<p class="tallyPlotWait">The trace appears here once every pair has`
        + ` a batch behind it. Watch where it stops moving.</p>`;
      return;
    }
    plotEl.innerHTML = lineChart({
      series: [{ name: t.formulaLabel ?? 'Combination',
                 points: st.history.map(p => [p.shots, p.value]) }],
      ...(Number.isFinite(t.bound)
        ? { limit: { at: t.bound, label: t.boundLabel || `bound ${t.bound}` } } : {}),
      xLabel: 'Shots taken', yLabel: t.formulaLabel ?? '',
    }, { w: 520, h: 190 });
  };

  const refresh = () => {
    settings.forEach((s, i) => {
      const row = panel.querySelector(`tr[data-row="${i}"]`);
      const b = st.bins[i], n = b.same + b.diff;
      row.querySelector('[data-cell="same"]').textContent = b.same;
      row.querySelector('[data-cell="diff"]').textContent = b.diff;
      row.querySelector('[data-cell="n"]').textContent = n;
      const e = eOf(i);
      const signed = (v) => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(3);
      row.querySelector('.tallyE').textContent = e === null ? '—' : signed(e);
      row.querySelector('.tallyTerm').textContent = e === null ? '—'
        : signed(s.sign === -1 ? -e : e);
      const sg = sigmaOf(i);
      row.querySelector('.tallySigmaCell').textContent = sg === null ? '—' : sg.toFixed(3);
    });
    const s = combined();
    const sg = sigmaCombined();
    valueEl.textContent = s === null ? '—' : s.toFixed(3);
    if(sigmaEl) sigmaEl.textContent = sg === null ? 'spread —' : `spread ± ${sg.toFixed(3)}`;
    drawPlot();
    const short = settings.filter((_, i) => st.bins[i].same + st.bins[i].diff < minShots).length;
    commitBtn.disabled = !ready();
    if(leftEl) leftEl.textContent = String(Math.max(0, (budget ?? 0) - st.used));
    panel.querySelectorAll('.tallyRun').forEach(b => { b.disabled = spent() || st.committed; });
    note.textContent = spent()
      ? (t.spentNote ?? 'The batches are gone. Report where the trace you bought has settled.')
      : ready()
        ? (t.readyNote ?? 'Every pair has its minimum. Read the trace: report when it has stopped moving, not when it first looks right.')
        : `${short} setting pair(s) still under ${minShots} shots.`;
  };
  refresh();

  panel.querySelectorAll('.tallyRun').forEach(btn => {
    btn.addEventListener('click', () => {
      if(st.committed || spent()) return;
      st.used += 1;
      const i = +btn.dataset.run;
      const p = clamp(settings[i].pSame ?? 0.5, 0, 1);
      let same = 0;
      for(let k = 0; k < batch; k++) if(rng() < p) same++;
      st.bins[i].same += same;
      st.bins[i].diff += batch - same;
      const s = combined();
      if(s !== null){
        st.history.push({ shots: st.bins.reduce((n, b) => n + b.same + b.diff, 0), value: s,
                          sigma: sigmaCombined() });
      }
      refresh();
    });
  });

  commitBtn.addEventListener('click', () => {
    if(st.committed || !ready()) return;
    if(!activeChallenge) return;
    st.committed = true;
    const s = combined();
    const ok = Math.abs(s - t.target) <= t.tolerance;
    const shots = st.bins.map(b => b.same + b.diff);
    activeChallenge.userAnswer = `${s.toFixed(3)}, from `
      + `${shots.reduce((n, x) => n + x, 0)} shots`
      + (budget ? ` — ${st.used} of ${budget} batches, ${shots.join('/')} per pair` : '');
    activeChallenge.userValue = s;
    activeChallenge.tallyHistory = st.history;
    // What the spend was, for the verdict: an uneven split is a worse statistic for
    // the same money, and the card should be able to say so.
    activeChallenge.tallySpend = budget ? { used: st.used, budget, shots } : null;
    finishVisit(ok);
  });
}

/**
 * PROBE — readings taken one at a time along a physical chain.
 *
 * A DIAGNOSIS hands over every reading at once, which makes "work out where the
 * fault is" into "read the table". Here the stations start blank and the player
 * takes the readings they want, in whatever order, and names the stage where the
 * pattern breaks. What the panel never shows is the cause: the clamp, the loose
 * fitting, the missing anchor. That is in the verdict, because a stop where the
 * answer is visible in one station's detail is a scavenger hunt, and the point is
 * that the temperatures localise the load before anybody looks at hardware.
 *
 * How many readings they took is recorded and reported, never graded. Measuring
 * everything is not wrong; it is just slower than knowing what to measure, and
 * saying so is more use than docking marks for it.
 */
/**
 * Which of a PROBE's stations have been read, and whether they are sited.
 *
 * A sited probe's readings are taken out in the room, station by station, before
 * the player ever opens the panel — so the panel cannot own the state. Keyed by
 * area and day, which is the same key the room uses, and kept for the session: a
 * player who reads four stations, walks out to think, and comes back does not read
 * them again.
 *
 * `sited` is set by whoever built the posts. It is what tells the panel to stop
 * offering its own Read buttons, and it stays false for a theme whose entry point
 * never builds them — the panel then works on its own, which is the fallback that
 * keeps a PROBE answerable in every game rather than only in this one.
 */
const PROBE_READS = new Map();
const PROBE_SITED = new Set();
// What to tell the world when a reading is taken in the panel, so the post out in
// the room lights up too. Without it the two disagree: the panel says a station is
// read and its post still says "not read", which reads as a broken post.
const PROBE_HOOKS = new Map();
export const probeKey = (groupId, day) => `${groupId}-${day}`;
export function markProbeRead(key, id){
  if(!PROBE_READS.has(key)) PROBE_READS.set(key, new Set());
  PROBE_READS.get(key).add(String(id));
  PROBE_HOOKS.get(key)?.(String(id));
}
export function probeReadsFor(key){ return [...(PROBE_READS.get(key) ?? [])]; }
export function setProbeSited(key, on = true, onRead = null){
  if(on){ PROBE_SITED.add(key); if(onRead) PROBE_HOOKS.set(key, onRead); }
  else { PROBE_SITED.delete(key); PROBE_HOOKS.delete(key); }
}
export function probeIsSited(key){ return PROBE_SITED.has(key); }

const probeState = new WeakMap();

export function probeHTML(ch){
  const p = ch.probe ?? {};
  const rows = (p.stations ?? []).map((s, i) => `<div class="probeStation" data-station="${i}">`
    + `<button class="probeRead btn" data-read="${i}" type="button">Read</button>`
    + `<div class="probeBody"><b>${esc(s.label)}</b>`
    + `<div class="probeValues" data-values="${i}"><span class="probeBlank">not read</span></div></div>`
    + `<button class="probeName" data-name="${i}" type="button" disabled>This one</button>`
    + `</div>`).join('');
  return `<div class="sweepAsk">${esc(ch.question || ch.task || 'Find where the pattern breaks.')}</div>`
    + `<div class="probePanel">`
    + (briefed() ? '' : methodBlock('PROBE')
       + `<div class="sweepHint">${esc(p.hint ?? 'Take a reading at any station. Each one reports what it'
         + ' is at now, what it was on the last run, and what its cooling is having to do.')}</div>`
       + goalBlock(p.goals))
    + `<div class="probeChain">${rows}</div>`
    + `<div class="probeCount" id="probeCount">No readings taken.</div>`
    + `<div class="modalActions"><button class="btn primary" id="probeCommit" type="button" disabled>`
    + `${esc(p.commit ?? 'Name the stage')}</button></div>`
    + `<div id="visitFeedback"></div></div>`;
}

export function bindProbe(container, ch, opts = {}){
  const p = ch.probe ?? {};
  const panel = container.querySelector('.probePanel');
  if(!panel) return;
  const stations = p.stations ?? [];
  showControls(panel, '.probeChain');
  // The key is the area and the day, which is what the room's posts use too. In
  // the dev harness there is no active visit, so the panel keeps its own state and
  // its own Read buttons.
  const key = opts.key ?? (activeChallenge
    ? probeKey(activeChallenge.id, activeChallenge.lesson?.day) : null);
  const sited = key ? probeIsSited(key) : false;
  const st = { read: new Set(key ? probeReadsFor(key) .map(String) : []),
    named: null, committed: false, order: [], key, sited };
  probeState.set(panel, st);
  const countEl = panel.querySelector('#probeCount');
  const commitBtn = panel.querySelector('#probeCommit');

  const refresh = () => {
    const posts = st.sited ? ' Each one also has a post in the room, if you would rather walk it.' : '';
    countEl.textContent = st.read.size === 0
      ? `No readings taken.${posts}`
      : `${st.read.size} of ${stations.length} stations read`
        + (st.named === null ? '.' : `, naming ${stations[st.named].label}.`);
    commitBtn.disabled = st.named === null || st.read.size < (p.minReadings ?? 2);
  };

  // Show what a station reads. Deliberately no verdict on the reading: "normal"
  // and "high" are the player's call, which is the whole stop.
  const reveal = (i) => {
    const s = stations[i];
    const cell = panel.querySelector(`[data-values="${i}"]`);
    if(!cell) return;
    cell.innerHTML = `<span><em>now</em> ${esc(s.reading)}</span>`
      + `<span><em>last run</em> ${esc(s.expected)}</span>`
      + (s.load ? `<span><em>cooling</em> ${esc(s.load)}</span>` : '');
    const read = panel.querySelector(`[data-read="${i}"]`);
    if(read){ read.disabled = true; read.textContent = 'Read'; }
    const name = panel.querySelector(`[data-name="${i}"]`);
    if(name) name.disabled = false;
  };

  // Anything already read out in the room is on the panel the moment it opens.
  stations.forEach((s, i) => { if(st.read.has(String(s.id))) reveal(i); });

  // Every Read button works, sited or not.
  //
  // The first version of the siting disabled them and captioned them "At the
  // station", on the theory that the readings should be taken at the posts. What
  // that produced was a panel in which nothing responded to anything: the case
  // stand is the marked thing in the room, so it is opened first, and it opened
  // onto six dead buttons and a disabled commit. Walking the chain is worth
  // having, but it is not what this stop teaches — choosing what to measure and
  // when to stop is — so it does not get to be the only way through.
  panel.querySelectorAll('.probeRead').forEach(btn => {
    const i = +btn.dataset.read;
    btn.addEventListener('click', () => {
      if(st.committed) return;
      st.read.add(String(stations[i].id));
      st.order.push(i);
      if(st.key) markProbeRead(st.key, stations[i].id);
      reveal(i);
      refresh();
    });
  });

  panel.querySelectorAll('.probeName').forEach(btn => {
    btn.addEventListener('click', () => {
      if(st.committed) return;
      st.named = +btn.dataset.name;
      panel.querySelectorAll('.probeStation').forEach((row, i) =>
        row.classList.toggle('named', i === st.named));
      refresh();
    });
  });
  refresh();

  commitBtn.addEventListener('click', () => {
    if(st.committed || st.named === null) return;
    if(!activeChallenge) return;
    st.committed = true;
    const named = stations[st.named];
    const ok = String(named.id ?? named.label) === String(p.target);
    activeChallenge.userAnswer = `${named.label}, after ${st.read.size} reading(s)`;
    // Cleared so a retry, or the same room tomorrow, starts blank again.
    if(st.key) PROBE_READS.delete(st.key);
    activeChallenge.probeNamed = st.named;
    activeChallenge.probeRead = [...st.read];
    finishVisit(ok);
  });
}

/**
 * The chain as a departure from the last run, and where the player pointed.
 *
 * The obvious figure — both runs plotted as temperatures — is unreadable, and it
 * took drawing it to see why: a fridge chain spans 47 K to 42 mK, so on any linear
 * axis every stage below the second is a flat line on the floor and the separation
 * the whole stop is about is invisible. What is worth plotting is each stage
 * against what it held last time. Then unchanged is 1.0, the flat run along the
 * top of the chain is obvious, and the step is exactly where the load enters.
 */
export function probeVerdictFigure(ch, named){
  const p = ch.probe ?? {};
  const stations = p.stations ?? [];
  // "0.94 K", "42 mK", "190 mK" — a ratio needs both in the same unit, and the
  // unit is whatever each reading carries.
  const numeric = (v) => {
    const m = /(-?[\d.]+)\s*(m?)/.exec(String(v ?? ''));
    if(!m) return null;
    return +m[1] * (m[2] === 'm' ? 1e-3 : 1);
  };
  const pts = stations.map((s, i) => {
    const now = numeric(s.reading), then = numeric(s.expected);
    return (Number.isFinite(now) && Number.isFinite(then) && then > 0) ? [i + 1, now / then] : null;
  }).filter(Boolean);
  if(pts.length < 2) return '';
  const idx = Number.isInteger(named) ? named + 1 : null;
  const trueIdx = stations.findIndex(s => String(s.id ?? s.label) === String(p.target)) + 1;
  return lineChart({
    series: [{ name: 'This run ÷ last run', points: pts }],
    limit: { at: 1, label: 'unchanged' },
    marks: [
      ...(idx && idx !== trueIdx ? [{ x: idx, label: `you named ${stations[named].label}` }] : []),
      ...(trueIdx ? [{ x: trueIdx, label: stations[trueIdx - 1].label }] : []),
    ],
    xLabel: `${p.chainLabel ?? 'Stage'} (1 = warmest)`, yLabel: 'Times last run',
    caption: 'Every stage against what it held last time. The load enters where the chain leaves 1.0',
  });
}

/**
 * TRIAGE is the one choice-shaped format that never learned the object form.
 *
 * Every other renderer takes `choices` as either a string or `{ label, … }`.
 * This one interpolated the raw member, so an authored `{ label, mechanism }`
 * rendered as the literal text "[object Object]" — and `bindTriage` graded with
 * `choices.indexOf(correctChoice)`, which is -1 against objects, so every answer
 * was marked wrong. Both went unnoticed because nothing had authored a TRIAGE
 * that way until sixty of them arrived in one conversion pass.
 */
const triageLabel = (c) => (typeof c === 'string' ? c : c?.label ?? '');
function triageHTML(ch){
  const opts=(ch.choices||[]).map((c,i)=>`<button class="orderItem" data-triage="${i}" type="button"><b>${String.fromCharCode(65+i)}.</b> ${esc(triageLabel(c))}</button>`).join('');
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
  const order=shuffleSeeded(all.map((_,i)=>i),
    (getState()?.week ?? 0)*63 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*17 + 5 + runSeed());
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
  const order=shuffleSeeded(all.map((_,i)=>i),
    (getState()?.week ?? 0)*41 + GROUP_DEFS.findIndex(d=>d.id===activeChallenge?.id)*13 + 7 + runSeed());
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
 *
 * The right column is DEALT, exactly as PROTOCOL's is. It was not: `order` was
 * the identity and the explanations were drawn in the order the content carried
 * them.
 *
 * What that did NOT mean, and the first version of this comment said it did: the
 * boards were not answerable by joining row to row. All 44 authored CASEBOOKs
 * key 1→A, 2→B, 3→C, 4→D in the book — but `normalize.js` `deidentifyMapping`
 * re-lays the options at load whenever a mapping is exactly the identity, so the
 * game has never shown that board. The census that found "44 of 44 identity" was
 * taken on the content before normalisation, which is not what anybody plays.
 *
 * What it did mean is smaller and still worth fixing: the layout was fixed per
 * stop, so a player who got it wrong and retried met the identical board, where
 * PROTOCOL re-deals on a seed that includes the retry. Two formats on one board
 * behaving differently is also how the next difference goes unnoticed.
 * `activeProtocol.order` maps display position back to the real choice index, so
 * the deal is now the only thing the two share rather than the only thing they
 * did not.
 */
function casebookHTML(ch, seed=0){
  if(ch.proposals) return tankHTML(ch);
  activeProtocol={ order: shuffleSeeded((ch.choices||[]).map((_,j)=>j), seed), links:{}, selected:null };
  return `<div class="compactInstruction">${esc(ch.task||'Join each clue to what explains it.')}</div>`
    + `<div id="protoBoard">${casebookBoardHTML(ch)}</div>`
    + `<div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="casebookCheck" type="button">Check</button></div>`;
}
function casebookBoardHTML(ch){
  const links=Object.entries(activeProtocol?.links ?? {}).map(([from,to])=>({ from:+from, to }));
  const display=(activeProtocol&&activeProtocol.order)||(ch.choices||[]).map((_,j)=>j);
  return matchBoard({
    leftTitle: ch.columns?.[0], rightTitle: ch.columns?.[1],
    left: ch.scenarios||ch.cards||[],
    right: display.map(real=>(ch.choices||[])[real]),
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
  return askCardHTML({
    name: who.name,
    role: person ? (person.role || '') : `${d?.name ?? ''} lead`,
    art: person ? portraitSvg(person, d?.color) : leaderPortrait(gs),
    accent: d?.color,
  }, lesson, ch);
}
/**
 * The card above the question, from an already-resolved asker.
 *
 * Split from `askCard` for the harness in engine/dev/lessons.html, which shows a
 * stop out of each of eighteen games: the person asking, their colour and their
 * glossary all belong to the *source* game, and none of the three can be looked
 * up through `def()` and `JARGON`, which are the running theme's.
 *
 * `jargon` defaults to the running theme's, so the game path is unchanged.
 */
export function askCardHTML(who, lesson, ch, jargon=JARGON){
  const brief = storyBriefText(lesson);
  const guide = String(lesson?.guide ?? '').trim();
  // FOLD BY DEFAULT. `cardLoad` measured 841 of 1,334 stops showing more than four
  // things above the controls — the situation, the assumptions, the principle, a row
  // of syllabus equation chips, a row of glossary chips, the question, and on four
  // formats three more lines from the panel. The reading was never long (a median of
  // 75 words); it was chopped into pieces that competed, and none of them owned what
  // the player had to do. So the chips and the assumptions go behind one button on
  // every stop, authored `background` or not.
  //
  // What stays on the face of an unbriefed card is `takeaway` — "what this is
  // about". It is deliberately printed BEFORE the question rather than after, since
  // said afterwards it reads as a moral rather than as help, and folding it away
  // would take that from 1,300 stops to buy a block. A stop with a `guide` has
  // something better in that place, so there it moves inside with the rest.
  const fold = foldsCard(lesson, ch, jargon);
  return `<div class="askCard">`
    + `<div class="askWho" style="--accent:${who.accent || '#3b566b'}">${who.art ?? ''}`
    + `<div class="askName">${esc(who.name)}</div><div class="askRole">${esc(who.role ?? '')}</div></div>`
    + `<div class="askBody">`
    + `<p class="askBrief">${esc(brief)}</p>`
    // Two paragraphs, and then a door. See askMoreHTML.
    + (guide ? `<p class="askBrief askGuide">${esc(guide)}</p>` : '')
    + (!guide ? aboutRow(lesson) : '')
    // The equations this question is worked from, if any. See workedFromHTML: the
    // fold is right for context and wrong when the equation is the question.
    // The equation used to be spelled out here on the face as well, for the one
    // case where the equation IS the question (Blackout's day 1 steps 20 kV to
    // 400 kV and its four options are that arithmetic). It now appears in the
    // Background door only: an equation belongs on the day card of a question
    // that uses it, and in that question's background. Nowhere else.
    // `workedFromHTML` is kept for the moment so the Blackout case can be
    // restored in one line if the face turns out to be the right home for it.
    + ''
    // One row of doors, so the player sees at a glance everything that is one press
    // away. Three at most: how the panel is scored, what the course calls this, and
    // everything true but not urgent.
    + doorRow(askRulesHTML(lesson), askConceptHTML(lesson),
        fold ? askMoreHTML(lesson, ch, jargon, { takeaway: !!guide }) : '')
    + (fold ? '' : askContextHTML(lesson) + equationRow(lesson)
              + termsRow(allChallengeText(lesson, ch, false), jargon))
    + `</div></div>`;
}

/** The doors, side by side. Nothing at all if there are none. */
function doorRow(...doors){
  const open = doors.filter(Boolean);
  return open.length ? `<div class="askDoors">${open.join('')}</div>` : '';
}

/**
 * What the course calls this question, and what the idea is for.
 *
 * The concept is stamped per lesson at import from `tools/syllabus.js`, scored on
 * where in the stop its keywords landed and on how rare it is across the campaign
 * — a concept named in the title is what a question is about, one that appears
 * only in a distractor's label is scenery, and a concept twenty stops mention is
 * the course's background hum. The engine does not import the syllabus, for the
 * same reason it does not import `tools/` for the equations.
 *
 * What it shows is the concept's OWN takeaway, which is fixed: every stop that
 * lands on `Protection: relays, breakers and coordination` opens onto the same two
 * sentences. That is deliberate and it is the difference between this door and
 * everything else on the card. `takeaway` is the principle THIS question is an
 * instance of, written once for one stop; this is what the course says the idea is,
 * and a player who meets it on the third stop out of six should be reading the
 * sentence they have already read twice.
 *
 * It is a door and not a chip because the name alone teaches nobody anything —
 * "Reactance, impedance and phasors" printed on a card is a label on a box, and
 * the two sentences inside are the reason to open it.
 */
function askConceptHTML(lesson){
  const con = lesson?.concept;
  const t = String(con?.t ?? '').trim();
  if(!con?.c || !t) return '';
  // THE NUMBER USED TO BE PRINTED HERE, AND IT WAS A CLAIM NOBODY HAD EARNED.
  //
  // It read "Concept 19 of 32 on this course", which a player on day 1 reads as the
  // nineteenth thing they are being taught — and says so about a card that is right.
  // The syllabus list is grouped by topic, not ordered by dependency: it puts
  // transformers at 13 and Faraday's law at 17, so its index cannot mean "how far in
  // this is". The count is fine and the ordinal is not.
  //
  // What is worth saying is what the idea rests on, which `needs` now knows, and
  // whether this stop takes any of that as read rather than teaching it — the two
  // facts a player would actually use to work out where they are.
  const where = con.of ? `One of ${con.of} concepts on this course` : 'On this course';
  const asRead = new Set((lesson?.takesAsRead ?? []).map(x => x.c));
  const rests = (con.rests ?? []).map(r => asRead.has(r) ? `${r} (taken as read here)` : r);
  return `<details class="askMore askConcept"><summary>Key concept</summary>`
    + `<div class="askMoreBody">`
    + `<h4>${esc(where)}</h4>`
    + `<p class="askConceptName">${esc(con.c)}</p>`
    + `<p>${esc(t)}</p>`
    + (rests.length ? `<p class="askConceptRests">Rests on ${esc(rests.join('; '))}.</p>` : '')
    + `</div></details>`;
}

/**
 * The rules of the panel, behind a door of their own.
 *
 * SCIENCETANK is the format this was written for. Its second paragraph was the
 * spending rules — commit at least eighty of the hundred, put thirty-five or more
 * on one proposal, keep the unsupported ones under fifteen — which is how the
 * board is graded and not how the board is read. It sat where the evidence should
 * have been, so a player met the arithmetic of the allocation before meeting a
 * single fact about what they were allocating between.
 *
 * So `rules` is the door for how the panel is scored, and `guide` goes back to
 * being what the player needs in order to think: on a tank stop, the evidence.
 * The rules are not hidden — they are one press away, and they are the same every
 * time, which is exactly what makes them the wrong thing to read first.
 */
function askRulesHTML(lesson){
  const rules = String(lesson?.rules ?? '').trim();
  if(!rules) return '';
  return `<details class="askMore askRules"><summary>Rules</summary>`
    + `<div class="askMoreBody"><p>${esc(rules)}</p></div></details>`;
}

/** "What this is about", alone, for a card with no guide to say it better. */
function aboutRow(lesson){
  const takeaway = String(lesson?.takeaway ?? '').trim();
  if(!takeaway) return '';
  return `<div class="askContext"><p class="askAbout"><span>What this is about</span>`
    + ` ${esc(takeaway)}</p></div>`;
}

/**
 * Whether this card has anything to put behind the button.
 *
 * Everything except the situation, the guide and the question: the assumptions, the
 * course equations, the glossary, and — on a briefed stop — the principle. A stop
 * with none of those (a bare CHOICE with no jargon in it) shows no button.
 */
function foldsCard(lesson, ch, jargon){
  return (lesson?.background ?? []).length > 0
    || (lesson?.assumes ?? []).length > 0
    || eqsForDoor(lesson).length > 0
    || jargonMatches(allChallengeText(lesson, ch, false), 8, jargon).length > 0
    || (!!String(lesson?.guide ?? '').trim() && !!String(lesson?.takeaway ?? '').trim());
}

/**
 * The equations this card is allowed to print.
 *
 * The chip row is capped at two — `card: false` past the second, because four
 * formulas over a question is a card nobody reads. The door under it has no such
 * limit and never should have inherited one: an equation the card's own
 * arithmetic uses reached NO screen when it fell past the cap, which is the
 * fieldCoverage defect in the one field a question is worked from. Midway's day 3
 * derives a loop speed and hides `safety factor = capacity ÷ demand`; Headwater's
 * day 2 hides the drain law it integrates.
 *
 * So: `computed` (this stop's own arithmetic) and `demanded` (the options and the
 * verdict work numbers with it — stamped by the importer, see `demandsEquation`)
 * are spelled out behind the button whatever the cap did to the chip row.
 */
function eqsForDoor(lesson){
  return (lesson?.equations ?? []).filter(x => x?.e && (x.card !== false || x.computed || x.demanded));
}

/**
 * Everything that is true, useful, and not what the player needs in the next
 * thirty seconds — behind one button.
 *
 * The card had grown to six competing blocks: the situation, "takes as read",
 * "what this is about", a row of equation chips stamped on by the syllabus, a row
 * of glossary chips, and then the panel's own three lines underneath. On Quantum's
 * HOLDOUT two of the equations did not apply to the question at all, and the
 * player's report was the honest one — too much to read, and no way to tell which
 * part was the instruction.
 *
 * So a stop may instead carry two paragraphs and this: `scene` says what has
 * happened and what a word means, `guide` says what to do, and `background` is the
 * course material that would otherwise crowd them out. Nothing is deleted — the
 * assumptions, the principle, the equations and the glossary are all in here, and
 * the equations are spelled out in prose rather than left as a chip reading
 * `n_phys ≈ d²`, because a chip is only useful to somebody who already knows what
 * it says.
 *
 * A stop with no `background` renders exactly as it always did.
 */
function askMoreHTML(lesson, ch, jargon, { takeaway: withTakeaway = true } = {}){
  const paras = (lesson.background ?? []).map(p => String(p ?? '').trim()).filter(Boolean);
  const eqs = eqsForDoor(lesson);
  const terms = jargonMatches(allChallengeText(lesson, ch, false), 8, jargon);
  const assumes = (lesson?.assumes ?? []).map(a => String(a).trim()).filter(Boolean);
  const takeaway = String(lesson?.takeaway ?? '').trim();
  // The equations come first inside the door as well. They used to sit under the
  // background paragraphs, so on the stop this was written for a player opened
  // the button and read three paragraphs about distractors before reaching
  // P = IV.
  const eqBlock = eqs.length
    ? `<div class="askMoreEqs"><h4>The equations on this course</h4>`
      + eqs.map(x => {
          const vars = (x.v ?? []).map(([sym, mean]) => `<b>${esc(sym)}</b> is ${esc(mean)}`);
          return `<p class="askEq"><code>${esc(x.e)}</code>`
            + (x.c ? ` — ${esc(x.c)}` : '')
            + (vars.length ? `. In it, ${vars.join(', ')}` : '')
            + (x.s ? `. ${esc(x.s)}` : '') + `</p>`;
        }).join('') + `</div>`
    : '';
  const termBlock = terms.length
    ? `<div class="askMoreTerms"><h4>Words on this card</h4>`
      + terms.map(t => `<p class="askEq"><b>${esc(t.name)}</b> — ${esc(t.def)}</p>`).join('')
      + `</div>`
    : '';
  const shownTakeaway = withTakeaway ? takeaway : '';
  const listBlock = (assumes.length || shownTakeaway)
    ? `<div class="askMoreTerms"><h4>What this question assumes${shownTakeaway
        ? ', and what it is about' : ''}</h4>`
      + assumes.map(a => `<p class="askEq">${esc(a)}</p>`).join('')
      + (shownTakeaway ? `<p class="askEq"><b>The principle</b> — ${esc(shownTakeaway)}</p>` : '')
      + `</div>`
    : '';
  // ONE WORD. The label used to name everything inside it — "Background — where this
  // fits, the words, the equations, what it assumes" — on the argument that a label
  // promising equations to a card with none teaches a player not to press it again.
  // That argument is still right and the tail is still gone, because the door now has
  // a neighbour: two pills of five words each read as a paragraph of controls rather
  // than as two things to press, and the Key concept door was invisible beside it.
  return `<details class="askMore"><summary>Background</summary><div class="askMoreBody">`
    + eqBlock
    + paras.map(p => `<p>${esc(p)}</p>`).join('')
    + termBlock + listBlock
    + `</div></details>`;
}

/**
 * What this question takes as read, and what it is about — said before it is
 * asked rather than after it is answered.
 *
 * `assumes` is the prior knowledge the question is entitled to expect and it
 * reached the player only as a line in the printed book and, indirectly, in the
 * day's primer. Saying it here answers the question a stuck player actually has,
 * which is not "what is the answer" but "am I supposed to already know
 * something".
 *
 * `takeaway` is the principle the question is an instance of. It used to appear
 * only in the verdict, after the answer, where it reads as a moral rather than
 * as help. Measured across the ten games, only 6 per cent of takeaways share
 * enough of the keyed answer's wording to give it away — and `probeQuestions`
 * now fails those, so the ones that survive are principles rather than answers.
 */
function askContextHTML(lesson){
  const assumes = (lesson?.assumes ?? []).map(a => String(a).trim()).filter(Boolean);
  const takeaway = String(lesson?.takeaway ?? '').trim();
  if(!assumes.length && !takeaway) return '';
  return `<div class="askContext">`
    + (assumes.length
        ? `<p class="askAssumes"><span>Takes as read</span> ${esc(assumes.join(' · '))}</p>` : '')
    + (takeaway ? `<p class="askAbout"><span>What this is about</span> ${esc(takeaway)}</p>` : '')
    + `</div>`;
}

/**
 * The equations this question is worked from, on the face of the card.
 *
 * Fold-by-default put the equation row behind the Background door on every stop,
 * which is right for the syllabus context a card carries and wrong for the one
 * case where the equation IS the question. Blackout's day 1 asks what stepping
 * 20 kV to 400 kV does to current and to loss; the four options are that
 * arithmetic; and the player met a scene, a guide and two buttons. Fixing the
 * data so the chip existed changed nothing they could see: it was a press and
 * three paragraphs away.
 *
 * So an equation stamped `demanded` — the card's own options or verdict work
 * numbers with it, and the stop does not compute it itself — is printed here,
 * spelled out, above the doors. Never a bare chip: `n_phys ≈ d²` helps only
 * somebody who already knows what it says, so the caption and the symbol names
 * come with it. 43 stops of 1,262 carry one, so the card-load win survives.
 *
 * A stop that computes its own equation is untouched — its panel already shows
 * the relationship, and the estimate is worked in front of the player.
 */
function workedFromHTML(lesson){
  const eqs = (lesson?.equations ?? []).filter(x => x?.e && x.demanded && !x.computed);
  if(!eqs.length) return '';
  return `<div class="askWorked"><h4>What this one is worked from</h4>`
    + eqs.map(x => {
        const vars = (x.v ?? []).map(([sym, mean]) => `<b>${esc(sym)}</b> ${esc(mean)}`);
        return `<p class="askWorkedEq"><code>${esc(x.e)}</code>`
          + (x.c ? ` — ${esc(x.c)}` : '')
          + (vars.length ? `<span class="askWorkedVars">${vars.join(' · ')}</span>` : '')
          + `</p>`;
      }).join('')
    + `</div>`;
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
  const eqs = (lesson?.equations ?? []).filter(x => x?.e && x.card !== false);
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
function termsRow(text, list=JARGON){
  const terms = jargonMatches(text, 8, list);
  if(!terms.length) return '';
  return `<div class="termStrip inline"><div class="termButtons">${terms.map(t =>
    `<button type="button" class="termChip" data-term="${(list ?? []).indexOf(t)}">${esc(t.name)}</button>`).join('')}</div>`
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

/**
 * The reasoning behind the "Show the full reasoning" fold.
 *
 * It must not restate the blurb. Both callers print `whyText` on the verdict
 * card itself, above the fold, and this used to print it twice more — once as
 * the generic detail body and again as a trailing "Why:" line — so a CHOICE
 * verdict read the same paragraph three times in a row. What belongs here is
 * only what the card does not already say: the format's own worked answer, the
 * rebuttals, the takeaway and the solution.
 *
 * Returns '' when it has nothing of its own, and the callers drop the fold
 * rather than opening an empty one.
 */
function reasoningHTML(ch, lesson, solution, whyText, showAnswer){
  let detail='';
  // SEQUENCE and PROTOCOL are deliberately absent: `verdictFigureHTML` already
  // draws the working order and the joins that hold, marked against what the
  // player did, so a list of the same steps under the fold is the third copy of
  // one answer on one card.
  if(kindOf(ch)==='BALLPARK'){
    const spec=calcSpec();
    // The explanation is the ballpark's own whyText, already on the card.
    detail=spec?`<p>The appropriate estimates are <b>${spec.correct.map(i=>esc(spec.labels[i])).join(', ')}</b>. Inserting them into the displayed relationship gives <b>${esc(spec.solution)}</b>.</p>`:'';
  } else if(kindOf(ch)==='SCIENCETANK'){
    const rec=ch.recommended||{};
    detail=`<div class="proposalReview">${(ch.proposals||[]).map(p=>`<div><b>Proposal ${esc(p.label)}</b><span>${esc(p.text)}</span><em>${rec[p.label]!==undefined?`Recommended weight: ${rec[p.label]} points`:''}</em></div>`).join('')}</div>`;
  }
  // Why each wrong answer is wrong, where the book wrote it. Being told only
  // the right answer leaves the player's own reasoning untouched.
  if(Array.isArray(ch.rebuttals) && ch.rebuttals.length){
    detail += `<div class="rebuttals"><div class="rebuttalsLabel">Why the others do not hold</div>`
      + `<ul>${ch.rebuttals.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>`;
  }
  // The takeaway is on the card only when the book wrote no why, in which case
  // repeating it here is the same defect one field over.
  // Both callers fall back to the takeaway on the card when the book wrote no
  // `why`, so printing it here as well is the same duplication one field over.
  const takeaway=(lesson.takeaway && whyText && lesson.takeaway!==whyText)?`<div class="answerScienceLead">${esc(lesson.takeaway)}</div>`:'';
  // A wrong call already shows the solution in the compare box on the card, so
  // printing it again inside the fold is the same duplication one field over.
  const answer=(solution && showAnswer!==false)?`<p style="margin-top:8px"><b>Correct answer:</b> ${esc(solution)}</p>`:'';
  const body=`${detail}${takeaway}${answer}`;
  return body.trim();
}

/**
 * The fold, or nothing at all.
 *
 * An empty `<details>` labelled "Show the full reasoning" is worse than no
 * fold: it promises the player something and opens onto blank space.
 */
function reasoningFoldHTML(ch, lesson, solution, whyText, open, showAnswer){
  const body=reasoningHTML(ch, lesson, solution, whyText, showAnswer);
  if(!body) return '';
  return `<details class="verdictDetail"${open?' open':''}><summary>Show the full reasoning</summary>${body}</details>`;
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
    const spec=calcSpec();
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
  // A sweep plots only what the player visited, which is the point of the format
  // and leaves the verdict with nothing to show — the panel closes and the curve
  // they built goes with it. Here the whole authored response is revealed, with
  // their reading beside the one the instrument supports, so a near miss looks
  // like a near miss and a wrong feature looks like the wrong feature.
  if(kindOf(ch)==='SWEEP' && ch.sweep) return sweepVerdictFigure(ch, activeChallenge.userValue, ok);
  // Both curves at last, with the frozen line on them. The calibration curve's
  // spike is the point: it was the best thing on screen while the player was
  // choosing, and the held-out curve is where it goes.
  if(kindOf(ch)==='HOLDOUT' && ch.holdout) return holdoutVerdictFigure(ch, activeChallenge.holdoutFrozen);
  if(kindOf(ch)==='TALLY' && ch.tally) return tallyVerdictFigure(ch, activeChallenge.tallyHistory);
  if(kindOf(ch)==='PROBE' && ch.probe) return probeVerdictFigure(ch, activeChallenge.probeNamed);
  // The twelve. Each was answered on a board or a plot the panel takes away with
  // it when the modal closes, so each supplies its own verdict picture from what
  // the player actually did — `instrumentResult` is whatever its bind() recorded.
  if(isInstrument(kindOf(ch))){
    const inst = INSTRUMENTS[kindOf(ch)];
    if(ch[kindOf(ch).toLowerCase()]) return inst.verdict(ch, activeChallenge.instrumentResult ?? {});
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
    // By label, like every other format. Grading is by label throughout the
    // engine — `validateContent` asserts `choices` contains `correctChoice`
    // verbatim — and an identity `indexOf` cannot see that through an object.
    const correctIdx = (ch.choices||[]).findIndex(c =>
      triageLabel(c) === (ch.correctChoice ?? ch.answer));
    const ok = chosen===correctIdx && correctIdx>=0;
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
    // the match-board variant. `links` is keyed by DISPLAY position on the right,
    // and the column is dealt, so every index has to come back through `display`
    // before it is compared with the authored mapping — the same translation
    // bindProtocol does, and the reason grading did not have to change when the
    // deal was added.
    const clues=(ch.scenarios||ch.cards||[]);
    const display=(activeProtocol&&activeProtocol.order)||(ch.choices||[]).map((_,j)=>j);
    const picked=clues.map((_,i)=>{
      const shown=activeProtocol.links[i];
      return shown===undefined ? -1 : display[shown];
    });
    if(picked.includes(-1)){ alert('Every clue still needs an explanation.'); return; }
    activeChallenge.userAnswer=clues.map((c,i)=>`${c} → ${(ch.choices||[])[picked[i]]}`).join('; ');
    activeChallenge.userLinks=picked.map((real,i)=>({ from:i, to:display.indexOf(real), ok: real===ch.mapping[i] }));
    activeChallenge.rightLinks=(ch.mapping||[]).map((real,i)=>({ from:i, to:display.indexOf(real), ok:true }));
    activeChallenge.matchRight=display.map(real=>(ch.choices||[])[real]);
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
  // The harness. Every format's Check button arrives here, so this is the one
  // place a grade has to be intercepted — and intercepting it here is what lets
  // engine/dev/lessons.html grade a stop with the game's own renderer and the
  // game's own grading, rather than a second opinion about both.
  if(standalone){
    const { host, onGrade } = standalone;
    // Same lock the game applies: the answer is in, and reference stays live.
    host.querySelectorAll('button,select,input,textarea').forEach(b=>{
      if(!b.classList.contains('termChip') && !b.classList.contains('eqChip')) b.disabled=true;
    });
    onGrade(!!ok, { answer: activeChallenge.userAnswer, verdict: standaloneVerdictHTML(!!ok) });
    return;
  }
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
  // The stop is answered; the room can have it back. A wrong call keeps the
  // claim, because the player is being offered a second attempt at it and
  // handing the stop to somebody else mid-decision would take that away.
  if(closes) releaseHeld();

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
    // Why a right answer may not have moved the number: either the area is
    // finished, or its milestone has all the work it needs and wants money.
    areaComplete: !currentMilestone(gs),
    milestoneName: currentMilestone(gs)?.name ?? null,
    projectionBefore, projectionAfter: forecastReadiness(state).overall,
    bonus: ok ? bonus : 0,
    milestoneDone: gs.milestone > milestoneBefore,
  };
  const solution=solutionText(ch);
  const bp=kindOf(ch)==='BALLPARK'? calcSpec():null;
  const whyText=kindOf(ch)==='BALLPARK' ? (bp?.explanation || ch.why) : ch.why;
  const isLastStop = missionComplete(state);
  // Five locals used to be built here and rendered nowhere — `comparison`,
  // `routeNote`, `canRetry`, `retryButton` and `completeBtn` — left behind when
  // the campaign clock became a countdown and the verdict grew its own overlay.
  // Every one of them has a live replacement further down this function, which
  // is the only reason nothing looked broken: the wrong-answer comparison is in
  // `consequence`, the route note is the ledger's "calls still open" cell, and
  // the four priced ways out of a wrong call are the `waitOut`/`retryMoney` row.
  //
  // Worth naming rather than deleting silently, because one of them was
  // `<button class="btn primary" id="completeMissionBtn">Complete Mission N →
  // Mission N+1</button>`: markup for a primary button, with no handler bound
  // to that id anywhere in the repo. A day is ended by `dayIsYours`/`sleepNow`
  // below, which raise `projecty:sleep` for the day controller. Anything added
  // to this string has to be bound in the block that wires those two, or it is
  // a button the player can press to no effect.
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

  // A right answer that cannot move the number has to say so. Readiness is half
  // work and half money, and the work half is capped at what the current
  // milestone asks for — so a third correct call into one area used to read
  // "+0%" with no explanation, which reads as a bug or as a mark against the
  // answer. The work is banked (see `advanceMilestone`); the card now says
  // which of the two things is true.
  const gain = ledger.readinessAfter - ledger.readinessBefore;
  const readinessValue = !ok ? 'no gain'
    : gain >= 0.05 ? `+${fmt(gain)}%`
    : ledger.areaComplete ? 'area complete'
    : 'banked';
  const readinessNote = !ok || gain >= 0.05 || !ledger.milestoneName
    ? `${def(gs.id).code} now ${fmt(ledger.readinessAfter)}%`
    : ledger.areaComplete
      ? `${def(gs.id).code} is at 100% — every milestone signed off`
      : `${def(gs.id).code} has the work for "${ledger.milestoneName}" and is waiting on funding; `
        + 'this call counts towards the next one';
  const ledgerHTML =
    cell('Readiness', readinessValue, ok ? 'gain' : '', readinessNote) +
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
    : `<p class="verdictWhy"><b>This call stays open.</b> It closes for an hour and reopens on its own, or $${RETRY_COST} has it back now. The clock keeps running either way.</p>`;

  const detail = reasoningFoldHTML(ch, lesson, solution, whyText, false, ok);

  // A wrong call costs money and only money: the day is already running down
  // by itself, so charging hours as well would bill the same mistake twice.
  //
  // If neither price is affordable there is no third option, and the day starts
  // again. That is deliberate — it is the only hard consequence in the game,
  // and it is always escapable, because a new day reopens every conversation in
  // town and each one pays $3.
  const priced = (id, label, cost) =>
    '<button class="btn priced" id="' + id + '" type="button"' +
    (cost > state.reserve ? ' disabled' : '') + '>' +
    '<span>' + esc(label) + '</span><small>$' + cost + '</small></button>';
  // A wrong call is a penalty box. The free way forward is time — the call
  // closes for an hour of the day's own clock and reopens itself — and the paid
  // one is $10 to have it back now. There is always a free way forward, so the
  // only dead end left is a day with less than an hour still to run.
  //
  // The hour is the *default*, and it has to be the only free way out. There was
  // a "Decide later" close on this card as well, which closed the verdict without
  // penalising anything — so the whole penalty box was opt-in, and a player who
  // ignored the button walked straight back in and answered again for nothing.
  const hourAvailable = (state.dayLeft ?? 0) > PENALTY_MINUTES;
  const stuck = !hourAvailable && state.reserve < RETRY_COST;
  const choices = ok ? '' :
    (stuck
      ? '<div class="verdictChoice"><div class="verdictChoiceLabel">Nothing left to spend</div>'
        + '<p class="verdictWhy">$' + fmt(state.reserve) + ' in hand, and less than an hour left to '
        + 'wait it out. The day has to start again.</p>'
        + '<button class="btn primary" id="restartDayBtn" type="button">Start the day again</button></div>'
      : '<div class="verdictChoice"><div class="verdictChoiceLabel">If you cannot wait</div>'
        + priced('retryMoney', 'Answer it again now', RETRY_COST) + '</div>');
  // The last call of the day no longer ends the day. Whatever is left on the
  // countdown is the player's: walk the town, talk to people, get paid.
  // ...and the evening has to have a way out of it, or a day with three hours
  // spare is three minutes of standing still waiting for the light to go.
  //
  // On a wrong call the way out of the card *is* the hour, and it lives in this
  // sticky bar rather than up in the choice row so that the default is reachable
  // without scrolling a long verdict. `priced` is what stacks the label over the
  // cost line; without it the two spans ran together as "Come back in an hourfree".
  //
  // The close button is gone from a wrong call. The one exception is a day with
  // less than an hour left to wait out and money in hand — nobody is made to
  // spend to get out of a card.
  const showClose = ok || (!stuck && !hourAvailable);
  const actions =
    (isLastStop && ledger.closes
      ? '<button class="btn primary" id="dayIsYours" type="button">Every call made — take the rest of the day</button>'
        + '<button class="btn" id="sleepNow" type="button">Go to sleep, wake up tomorrow.</button>'
      : '') +
    (ok || stuck ? '' :
      '<button class="btn primary priced" id="waitOut" type="button"'
      + (hourAvailable ? '' : ' disabled') + '>'
      + '<span>Come back in an hour</span><small>free</small></button>') +
    (showClose
      ? '<button class="btn ' + (ok ? 'primary' : 'ghost') + '" id="visitClose" type="button">' +
        (ok ? 'Return' : 'Leave it for today') + '</button>'
      : '');

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
      // Nothing to put in it means no bar: it is sticky, ruled and padded, so an
      // empty one reads as a stripe across the bottom of the card.
      (actions ? `<div class="verdictActions">${actions}</div>` : '');
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
  bind('waitOut', () => {
    // The stop stays open and stays uncredited; what changes is that it will not
    // let anybody in until the hour has run off the day's countdown.
    penaliseStop(key, PENALTY_MINUTES);
    state.log.push({ week: state.week,
      text: `Mission ${state.week}, stop ${stopIndex + 1} closed for an hour after a wrong call.` });
    save();
    closeVerdict();
    closeModal();
    window.dispatchEvent(new CustomEvent('projecty:statechange'));
    window.dispatchEvent(new CustomEvent('projecty:visitdone'));
  });
  // Default in the keyboard sense too, not only the visual one: the hour is the
  // button Enter presses on a wrong call, and the money one has to be aimed at.
  const defaultBtn = document.getElementById('waitOut')
    || document.getElementById('restartDayBtn')
    || document.getElementById('visitClose');
  if(defaultBtn && !defaultBtn.disabled) defaultBtn.focus();
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
/**
 * The panel for a format, and the shuffle state it needs to draw.
 *
 * Split out of showChallengeForStop so that the harness in
 * engine/dev/lessons.html — one stop out of each of eighteen games, answerable,
 * graded — renders through this same dispatch rather than a second copy of it.
 * A second copy is how the passage quiz shipped working in one entry point and
 * invisible in two, and there is no reason for a harness to know the list of
 * formats at all.
 *
 * `seed` is the per-playthrough shuffle seed. The game derives it from the week,
 * the area and the retry; a harness passes whatever it likes, and the same seed
 * deals the same order twice.
 */
function challengeBodyHTML(ch, seed=0){
  let challengeHTML='';
  if(kindOf(ch)==='SEQUENCE'){
    activeOrder={ chosen:[], seed, bank: shuffleSeeded(ch.cards.map((_,i)=>i), seed) };
    challengeHTML = orderHTML(ch);
  } else if(kindOf(ch)==='PROTOCOL'){
    activeProtocol={ order: shuffleSeeded(ch.choices.map((_,j)=>j), seed) };
    challengeHTML = protocolHTML(ch);
  } else if(kindOf(ch)==='BALLPARK'){
    challengeHTML = ballparkHTML(ch);
  } else if(kindOf(ch)==='TRIAGE'){
    challengeHTML = triageHTML(ch);
  } else if(kindOf(ch)==='DIAGNOSIS'){
    challengeHTML = diagnosisHTML(ch);
  } else if(kindOf(ch)==='SWEEP'){
    challengeHTML = sweepHTML(ch);
  } else if(kindOf(ch)==='HOLDOUT'){
    challengeHTML = holdoutHTML(ch);
  } else if(kindOf(ch)==='TALLY'){
    challengeHTML = tallyHTML(ch);
  } else if(kindOf(ch)==='PROBE'){
    challengeHTML = probeHTML(ch);
  } else if(isInstrument(kindOf(ch))){
    challengeHTML = INSTRUMENTS[kindOf(ch)].html(ch);
  } else if(kindOf(ch)==='CASEBOOK'){
    challengeHTML = casebookHTML(ch, seed);
  } else if(kindOf(ch)==='CHOICE'){
    challengeHTML = choiceHTML(ch);
  } else {
    if(!ch.proposals){
      challengeHTML = `<div class="feedback bad">Challenge type "${esc(ch.type)}" is not yet implemented. The correct answer is: ${esc(ch.answer||'')}</div><div id="visitFeedback"></div><div class="modalActions"><button class="btn primary" id="visitCloseFallback" type="button">Return</button></div>`;
    } else {
      challengeHTML = tankHTML(ch);
    }
  }
  return challengeHTML;
}

/**
 * Wire the panel that `challengeBodyHTML` drew.
 *
 * `host` is the element the body was written into. Every classic format still
 * finds its own controls through `document`, which is why one panel at a time is
 * all any caller may have on the page.
 *
 * Grading goes out through `finishVisit`, in both the game and the harness — see
 * the `standalone` hook there. Nothing in here knows which it is running in.
 */
function bindChallengeBody(ch, host){
  const live = () => host ?? document.getElementById('modalBody') ?? document;
  // The sweep needs its handle wired after the body exists. Every other format
  // is bound inside its own renderer or by openModal; this one owns a live
  // control, so it binds here where the DOM is known to be in place.
  if(kindOf(ch)==='SWEEP') bindSweep(live(), ch);
  else if(kindOf(ch)==='HOLDOUT') bindHoldout(live(), ch);
  else if(kindOf(ch)==='TALLY') bindTally(live(), ch);
  else if(kindOf(ch)==='PROBE') bindProbe(live(), ch);
  // Every one of the twelve owns live controls, so it binds here where the DOM
  // is known to exist. `commit` is the whole of what they may do to the game:
  // record what the player answered, keep whatever the verdict will need, finish
  // the visit. The dev harness passes a context that does none of it.
  else if(isInstrument(kindOf(ch))){
    const inst = INSTRUMENTS[kindOf(ch)];
    // A format that runs — a belt, a needle, a flow — carries its own pressure,
    // and charging the day for it as well makes the fun one the expensive one.
    // The room is told too: the server applies the panel rate, because it is the
    // only party that knows whether anybody has a panel open, so a client that
    // freezes locally and says nothing would drift from everybody else's clock.
    // Redundant while PANEL_PACE is 0 and deliberately kept: a format that
    // declares it must go on freezing if the global rate is ever put back.
    if(inst.pausesClock){
      clockFrozen = true;
      room.setPanel(true, true);
    }
    inst.bind(live(), ch, {
      commit(ok, answerText, extra = {}){
        if(!activeChallenge) return;
        activeChallenge.userAnswer = String(answerText ?? '');
        activeChallenge.instrumentResult = extra;
        finishVisit(!!ok);
      },
      // The only teardown hook a panel has. `bind` returns nothing and always
      // has, so a format with a frame loop had nowhere to put its cancel.
      onClose(fn){ if(typeof fn === 'function') panelCleanup.push(fn); },
      // The three TRIAL needs, and nothing else uses. `world` is absent in every
      // harness on purpose; see setWorldHandle above.
      ...(worldHandle ? { world: worldHandle } : {}),
      /**
       * Hide the panel without ending the visit.
       *
       * Not `closeModal`: that releases the stop back to the room and runs the
       * panel's teardown, both of which are wrong for a player who is still
       * answering — they have gone out to drive the route and the panel is
       * coming back. The clock stays frozen across the suspension, because the
       * run has its own.
       */
      suspend(){
        const ov = document.getElementById('overlay');
        if(ov) ov.classList.remove('show');
      },
      /** Bring it back with new content, and re-bind whatever it contains. */
      resume(html){
        const body = document.getElementById('modalBody');
        if(body) body.innerHTML = html;
        const ov = document.getElementById('overlay');
        if(ov) ov.classList.add('show');
        if(document.pointerLockElement) document.exitPointerLock();
        if(body) bindTerms(body);
      },
    });
  }
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
}

function showChallengeForStop(id, stop, isRetry, person=null){
  const state=getState();
  const gs=state.groups.find(x=>x.id===id);
  const d=def(id);
  const lesson=CURRICULUM[id][stop.lesson];
  const ch=lesson.game;
  activeChallenge={ id, lesson, ch, type:ch.type, hadIssue:!!gs.issue, userAnswer:'', isRetry,
    stopIndex: stop.index, person,
    // The estimate's numbers, stamped once. See calcSpec().
    calc: BALLPARK_CALCS[`${id}-${lesson.day}`] ?? null };
  const bodyPrefix = challengePrefix(gs, lesson, ch, person);
  // One shuffle seed per format, because the two that shuffle want different
  // ones — an order dealt the same way as its own protocol board would pair the
  // two panels of a day together for the rest of the campaign.
  const seed = kindOf(ch)==='PROTOCOL'
    ? state.week*57 + GROUP_DEFS.indexOf(d)*11 + lesson.day*3 + (isRetry?101:0) + runSeed()
    : state.week*31 + GROUP_DEFS.indexOf(d)*7 + (isRetry?101:0) + runSeed();
  const challengeHTML = challengeBodyHTML(ch, seed);
  // The title is the question, not the filing reference. Who is asking and
  // which area it belongs to are both on the card underneath.
  const titlePrefix = lesson.title || ch.title || def(id).name;
  openModal(titlePrefix, bodyPrefix + withAssist(challengeHTML));
  const body=document.getElementById('modalBody');
  bindChallengeBody(ch, body);
  bindVisitAssist();
  bindTerms(body);
}

/* ============================================================ the harness ===
 *
 * One stop, mounted outside a campaign, answerable and graded.
 *
 * `engine/dev/lessons.html` shows one question of every format the engine
 * renders, each pulled from the game that authored it, and it has no state, no
 * day, no roster and no map — the eighteen games it draws from are not the theme
 * the dev server is serving. What it must not have is its own copy of any of
 * this: a harness that renders a panel its own way is a harness that passes
 * while the game is broken, which is exactly the hole `engine/dev/instruments.html`
 * was written to close for the live panels.
 *
 * So there is one hook, `standalone`, read in three places: `finishVisit`, which
 * is where every format's Check button ends up, and the two rerender paths, which
 * are the only ones that rebuild the card around a half-answered panel. Nothing
 * else in the file knows the harness exists, and with the hook null every line
 * below is dead.
 */
let standalone = null;

/**
 * Draw the card and the panel into the harness's host, and wire them.
 *
 * `who` is the resolved asker, `jargon` the source game's glossary and `calc` the
 * estimate's numbers, because all three belong to the game the stop came from and
 * none of them can be looked up here.
 */
export function mountStandalone(host, lesson, ch, opts = {}){
  const { who = {}, jargon = [], calc = null, seed = 0,
          onGrade = () => {}, onRender = () => {} } = opts;
  unmountStandalone();
  activeChallenge = { id: lesson.group ?? null, lesson, ch, type: ch.type, userAnswer: '',
                      stopIndex: 0, person: null, calc };
  standalone = { host, jargon, onGrade, onRender,
    prefix: () => askCardHTML(who, lesson, ch, jargon)
      + (kindOf(ch) === 'DIAGNOSIS' ? '' : figureBlock(lesson, ch)) };
  standaloneRepaint(challengeBodyHTML(ch, seed));
}

/** Take the panel down, running whatever teardown it registered. */
export function unmountStandalone(){
  runPanelCleanup();
  standalone = null;
}

/**
 * The card plus a freshly rendered panel body.
 *
 * The whole card, not the panel alone: SEQUENCE and BALLPARK rebuild themselves
 * on every tile placed, and in the game that redraw goes through `modalBody`,
 * which holds the ask card too. A harness that repainted only the panel would
 * lose the situation the moment the player touched anything.
 */
function standaloneRepaint(bodyHTML){
  const { host, jargon, onRender } = standalone;
  host.innerHTML = standalone.prefix() + bodyHTML;
  bindChallengeBody(activeChallenge.ch, host);
  bindTerms(host, jargon);
  onRender(host);
}

/**
 * The verdict, without the campaign half of it.
 *
 * The game's card also carries readiness, the countdown, the projection and the
 * priced ways out of a wrong call, all of which are answers about a day that is
 * running. What is left is the part that teaches: right or wrong, what the player
 * said against what the evidence supports, the picture of how wrong it was, and
 * the full reasoning.
 */
function standaloneVerdictHTML(ok){
  const ch = activeChallenge.ch, lesson = activeChallenge.lesson;
  const solution = solutionText(ch);
  const whyText = kindOf(ch) === 'BALLPARK' ? (calcSpec()?.explanation || ch.why) : ch.why;
  const consequence = ok
    ? `<p class="verdictWhy">${esc(whyText || lesson.takeaway || '')}</p>`
    : `<div class="wrongAnswerCompare"><div class="answerCompareBox user"><b>Your answer</b>`
      + `${esc(activeChallenge.userAnswer || '(no answer)')}</div>`
      + `<div class="answerCompareBox correct"><b>What the evidence supports</b>${esc(solution)}</div></div>`
      + `<p class="verdictWhy">${esc(whyText || '')}</p>`;
  return `<div class="verdictHead">`
    + `<div class="verdictKicker">${ok ? 'The call holds' : 'The call does not hold'}</div>`
    + `<h3 class="verdictTitle">${ok ? 'Correct' : 'Incorrect'}</h3></div>`
    + `<div class="verdictBody">${verdictFigureHTML(ch, lesson, ok)}${consequence}`
    + reasoningFoldHTML(ch, lesson, solution, whyText, true, ok) + `</div>`;
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
  // In a room this person may already be answering to somebody else.
  if(coopBusy(idx, npc.char?.name ? `${npc.char.name}'s call` : 'this call')) return true;
  const stop={ ...m.stops[idx], index: idx };
  takeStop(idx);
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
  // A call in the penalty box refuses to open until the hour has run off the
  // day's clock. It is not closed and it is not credited — it is exactly where
  // the player left it, and it is coming back.
  // Keyed exactly as `visitKey()` keys everything else about this visit — the
  // box and the gate have to agree or a stop stays shut for the rest of the day.
  const waiting = penaltyLeft(`${state.week}-${id}`);
  if(waiting > 0 && !isRetry){
    state.selectedGroup = id;
    save();
    const mins = Math.ceil(waiting);
    openModal('That call is closed for now',
      `<div class="briefBox">A wrong call closed this one for an hour. `
      + `${mins} minute${mins === 1 ? '' : 's'} of it left — it reopens on its own, `
      + `and there is other work in the meantime.</div>`);
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
  // Last gate, and only in a room: one answerer per stop.
  if(coopBusy(stop.index, `the ${def(id)?.name ?? 'this'} call`)) return;
  takeStop(stop.index);
  showChallengeForStop(id, stop, isRetry);
}
