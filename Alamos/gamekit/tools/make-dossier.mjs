// make-dossier.mjs — the cream-on-dark reading dossier for one campaign: cover,
// curriculum page (equations + concepts, engine-derived), every phase's warm-up,
// level card and question cards, a closing card per phase off its `segue`, an
// appendix for any lesson the day walk never reaches, and the ending.
//
//   node tools/make-dossier.mjs <theme>
//   node tools/make-dossier.mjs <theme> --out <path>
//
// Output: books/dossier/<theme>-dossier.html (unless --out overrides it).
//
// Nothing here is hand-authored prose: every field comes straight off the
// theme's own normalized content, the same data the game itself reads —
// curriculumDelivery.mjs for the concept/equation coverage and move tiers,
// orientation.js + warmups.js for the warm-up schedule. Point this at a new
// theme and it should just work; formats this file has no bespoke renderer for
// fall back to a generic panel rather than rendering nothing.
//
// This is the second theme this was built for (the first was Planetary
// Defense, by hand, reverse-engineered from an earlier session's one-off
// build). Outbreak: Riverton needed DIAGNOSIS/CHAIN/CONTROL/ALLOCATE that
// Planetary Defense never used; Planetary Defense needed CLOUD/DEGENERACY/
// INJECT/VERIFY that Outbreak never used. Both sets are kept here. The next
// campaign will likely need a format neither used — that is what the generic
// fallback and the "renderers to add" note at the bottom are for.
import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const GK = resolve(HERE, '..');
const imp = (p) => import(pathToFileURL(resolve(GK, p)).href);

const args = process.argv.slice(2);
const THEME_ID = args.find(a => !a.startsWith('--'));
const outFlagIdx = args.indexOf('--out');
const OUT_OVERRIDE = outFlagIdx >= 0 ? args[outFlagIdx + 1] : null;

if (!THEME_ID) {
  console.error('usage: node tools/make-dossier.mjs <theme> [--out <path>]');
  process.exit(2);
}

const { themeDir } = await imp('engine/dev/registry.mjs');
const dir = themeDir(THEME_ID);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await imp('engine/content/normalize.js');
const content = theme.content;
normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
const { deliveryFor } = await imp('engine/dev/curriculumDelivery.mjs');
const { tiersFor, unlockDay } = await imp('engine/core/orientation.js');
const { warmupPlan } = await imp('engine/core/warmups.js');
const { EQUATIONS, SYLLABUS } = await imp('tools/syllabus.js');

const CURRICULUM = content.CURRICULUM ?? {};
const MISSIONS = content.MISSIONS ?? [];
const GROUPS = content.GROUPS ?? [];
const WARMUPS = content.WARMUPS ?? {};
const groupOf = (id) => GROUPS.find(g => g.id === id);

const d = deliveryFor(THEME_ID, content);
const hasSyllabus = !!SYLLABUS[THEME_ID];

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const label = (c) => (typeof c === 'string' ? c : c?.label ?? '');

const pages = d.pages;
const stopNumOf = new Map(pages.map((p, i) => [p.key, i + 1]));

// An equation is "demanded" at a day when that day's own level card shows it,
// not yet worked — normalizeContent's primeEquations already decided this per
// mission (m.equations); attribute it to that mission's first stop number.
const demandedAtByEq = new Map();
MISSIONS.forEach((m) => {
  const firstStop = (m.stops ?? [])[0];
  if (!firstStop) return;
  const firstStopNum = stopNumOf.get(`${firstStop.group}:${firstStop.lesson}`);
  for (const eq of m.equations ?? []) {
    if (eq.computed) continue;
    if (!demandedAtByEq.has(eq.e)) demandedAtByEq.set(eq.e, firstStopNum);
  }
});

const conceptsByStop = new Map();
for (const c of d.concepts) for (const n of c.stops) {
  if (!conceptsByStop.has(n)) conceptsByStop.set(n, []);
  conceptsByStop.get(n).push(c);
}
const eqComputesByStop = new Map();
const eqMentionsByStop = new Map();
d.equations.forEach((eq) => {
  for (const n of eq.computes) { if (!eqComputesByStop.has(n)) eqComputesByStop.set(n, []); eqComputesByStop.get(n).push(eq); }
  for (const n of eq.mentions) { if (!eqMentionsByStop.has(n)) eqMentionsByStop.set(n, []); eqMentionsByStop.get(n).push(eq); }
});

function curricStripHTML(stopNum) {
  const cons = conceptsByStop.get(stopNum) ?? [];
  const comp = eqComputesByStop.get(stopNum) ?? [];
  const dem = d.equations.filter(eq => demandedAtByEq.get(eq.e) === stopNum && !comp.includes(eq));
  const ment = (eqMentionsByStop.get(stopNum) ?? []).filter(eq => !comp.includes(eq) && !dem.includes(eq));
  if (!cons.length && !comp.length && !dem.length && !ment.length) return '';
  return `<div class="curricStrip">`
    + cons.map(c => `<span class="chip concept">concept ${c.n}/${d.concepts.length} &middot; ${esc(c.c)}</span>`).join('')
    + comp.map(eq => `<span class="chip eq computed"><code>${esc(eq.e)}</code> — worked here</span>`).join('')
    + dem.map(eq => `<span class="chip eq demanded"><code>${esc(eq.e)}</code> — demanded here</span>`).join('')
    + ment.map(eq => `<span class="chip eq mentioned"><code>${esc(eq.e)}</code> — mentioned only</span>`).join('')
    + `</div>`;
}

// ------------------------------------------------------------- format blocks
//
// One function per format this has been run on. Each takes the format's own
// payload (`ch[key]`, e.g. `ch.chain`) and returns the material HTML that goes
// between the question and the why — never the answer/why themselves, which
// `stopHTML` appends the same way for every format.
function choicesHTML(choices, correct, rebuttals = []) {
  let ri = 0;
  return `<ul class="choices">${choices.map((c) => {
    const isCorrect = label(c) === correct;
    const mech = typeof c === 'object' && c.mechanism ? `<span class="choiceMech">${esc(c.mechanism)}</span>` : '';
    const reb = !isCorrect && rebuttals[ri] !== undefined ? `<span class="rebuttal">${esc(rebuttals[ri++])}</span>` : '';
    return `<li class="choice${isCorrect ? ' correct' : ''}">`
      + `<span class="choiceLabel">${esc(label(c))}</span>${mech}${reb}`
      + `${isCorrect ? '<span class="tag">answer</span>' : ''}</li>`;
  }).join('')}</ul>`;
}

function sequenceHTML(cards, order, rebuttals) {
  return `<ol class="seq">${order.map((ix, k) => `<li>`
    + `<span class="seqCard">${esc(label(cards[ix]))}</span>`
    + (rebuttals?.[k] ? `<span class="rebuttal">${esc(rebuttals[k])}</span>` : '')
    + `</li>`).join('')}</ol>`;
}

function pairsHTML(scenarios, choices, mapping, rebuttals, columns) {
  return `<div class="cols"><span>${esc(columns?.[0] ?? 'What we want')}</span>`
    + `<span>${esc(columns?.[1] ?? 'What it matches')}</span></div>`
    + `<ul class="pairs">${scenarios.map((s, i) => `<li><span class="scn">${esc(label(s))}</span>`
      + `<span class="arrow">&rarr;</span><span class="ans">${esc(label(choices[mapping[i]]))}</span>`
      + (rebuttals?.[i] ? `<span class="rebuttal">${esc(rebuttals[i])}</span>` : '') + `</li>`).join('')}</ul>`;
}

function readingsHTML(readings) {
  return `<table class="dataTable"><tr><th>zone</th><th>reading</th><th>note</th></tr>${
    readings.map(r => `<tr><td>${esc(r.zone ?? '')}</td>`
      + `<td><span class="tag${r.status === 'alarm' ? ' warn' : ''}">${esc(r.value ?? '')}</span></td>`
      + `<td>${esc(r.note ?? '')}</td></tr>`).join('')}</table>`;
}

function chainHTML(chain) {
  const links = chain.links ?? [];
  return `<ul class="chanList">${links.map(l => `<li class="${l.id === chain.governing ? 'indep' : ''}">`
    + `<b>${esc(l.label)}</b> — ${esc(l.reading ?? '')}`
    + `<span class="dep">carries: ${esc(l.transfers ?? '')}</span></li>`).join('')}</ul>`;
}

function traceHTML(trace) {
  const byId = new Map((trace.resources ?? []).map(r => [r.id, r.label]));
  return `<ul class="chanList">${(trace.channels ?? []).map(c => `<li class="${
      (trace.independent ?? []).includes(c.id) ? 'indep' : ''}">`
    + `<b>${esc(c.label)}</b> — ${esc(c.reading ?? '')}`
    + `<span class="dep">depends on: ${(c.depends ?? []).map(id => esc(byId.get(id) ?? id)).join(', ')}</span></li>`).join('')}</ul>`;
}

function attestHTML(attest) {
  return `<ul class="chanList">${(attest.claims ?? []).map(c => `<li class="${c.backed ? 'indep' : ''}">`
    + `<b>${esc(c.label)}</b>`
    + `${c.critical ? ' <span class="tag warn">critical</span>' : ''}`
    + `${c.backed ? ' <span class="tag">independently backed</span>' : ' <span class="tag warn">unbacked</span>'}`
    + `<span class="dep">${esc(c.evidence ?? '')}</span></li>`).join('')}</ul>`;
}

function controlHTML(ctrl) {
  const vars = ctrl.variables ?? [];
  return `<ul class="chanList">${vars.map(v => `<li class="${v.id === ctrl.truth ? 'indep' : ''}">`
    + `<b>${esc(v.label)}</b>${v.id === ctrl.truth ? ' <span class="tag">causal</span>' : ' <span class="tag warn">held / control</span>'}</li>`).join('')}</ul>`;
}

function allocateHTML(alloc) {
  const items = alloc.items ?? [];
  return `<div class="tiles">${items.map(it => `<span class="tile${it.protected ? ' used' : ''}">`
    + `${esc(it.label)} — ${it.cost === 0 ? 'free' : `${it.cost} of ${alloc.pool?.amount ?? '?'} ${esc(alloc.pool?.unit ?? '')}`}</span>`).join('')}</div>`
    + (alloc.answers?.length ? `<ul class="chanList">${alloc.answers.map(a => `<li>`
      + `<b>${esc(a.question)}</b>${a.required ? ' <span class="tag">must stay answerable</span>' : ''}</li>`).join('')}</ul>` : '');
}

function triggerHTML(trig) {
  const rows = (trig.stream ?? []).map(s => `<tr><td>${esc(s.update ?? s.at ?? '')}</td><td>${esc(String(s.hoursLeft ?? ''))}</td></tr>`).join('');
  const cond = trig.conditions?.[0];
  return `<table class="dataTable"><tr><th>update</th><th>hours left</th></tr>${rows}</table>`
    + (cond ? `<p class="estFormula">Activate: ${esc(cond.label)} &middot; window ${esc(String(cond.window?.min))}&ndash;${esc(String(cond.window?.max))}${esc(trig.scale?.unit ?? '')}, needs ${esc(String(cond.leadHours))}h lead</p>` : '');
}

function holdHTML(hold) {
  const unit = hold.unit ?? '';
  return `<p class="estPrompt">Hold <b>${esc(hold.quantity ?? '')}</b> inside &plusmn;${esc(String(hold.band))}${esc(unit)} of ${esc(String(hold.hold))}, `
    + `narrowing to &plusmn;${esc(String(hold.narrowTo))}${esc(unit)}, for ${esc(String(hold.duration))}s, via the ${esc(hold.control ?? '')}.</p>`
    + `<ul class="chanList">${(hold.disturbances ?? []).map(dd => `<li>${esc(dd.label)} at t=${esc(String(dd.at))}s (${dd.amount > 0 ? '+' : ''}${esc(String(dd.amount))})</li>`).join('')}</ul>`;
}

function spotHTML(spot) {
  const rules = spot.rules ?? [];
  return `<p class="estPrompt">${rules.map(r => esc(r.say)).join(' &middot; ')}</p>`
    + `<p class="estFormula">${(spot.targets ?? []).map(t => esc(t.label)).join(', ')}</p>`;
}

function beltHTML(belt) {
  const left = (belt.items ?? []).filter(i => i.bin === 'left');
  const right = (belt.items ?? []).filter(i => i.bin === 'right');
  return `<div class="beltBox">`
    + `<div class="beltCol"><h5>${esc(belt.left?.name ?? 'Left')}</h5><ul>${left.map(i => `<li>${esc(i.name)}</li>`).join('')}</ul></div>`
    + `<div class="beltCol"><h5>${esc(belt.right?.name ?? 'Right')}</h5><ul>${right.map(i => `<li>${esc(i.name)}</li>`).join('')}</ul></div>`
    + `</div>`;
}

function cloudHTML(cloud) {
  const b = cloud.bounds ?? {};
  return `<p class="estPrompt">Centre ${esc(String(cloud.centre))}, spread &plusmn;${esc(String(cloud.spread))} `
    + `(${esc(b.label ?? '')}, ${esc(b.unit ?? '')})</p>`
    + `<ul class="chanList">${(cloud.actions ?? []).map(a => `<li><b>${esc(a.label)}</b> — `
      + `${a.effect === 'shift' ? 'shift by' : 'narrow by'} ${esc((+a.amount).toFixed(2))}</li>`).join('')}</ul>`;
}

function degeneracyHTML(deg) {
  const [ca, cb] = deg.controls ?? [];
  return `<p class="estPrompt">Two sliders — ${esc(ca?.label ?? 'a')} and ${esc(cb?.label ?? 'b')} — trade off against `
    + `one measurement, until a second, independent measurement collapses the family to one pair.</p>`
    + `<p class="estFormula">Resolved at: <b>a = ${esc(String(deg.truth?.a))}, b = ${esc(String(deg.truth?.b))}</b></p>`;
}

function injectHTML(inj) {
  const rows = (inj.configs ?? []).map(c => `<tr class="${c.id === inj.best ? 'bestRow' : ''}"><td>${esc(c.label)}</td>`
    + `<td>${esc(String(c.detections))}</td><td>${esc(String(c.metric))}</td></tr>`).join('');
  return `<p class="estPrompt"> (n=${esc(String(inj.population?.n ?? ''))}); scoring on ${esc(inj.metric?.label ?? '')}</p>`
    + `<table class="dataTable"><tr><th>strategy</th><th>detections</th><th>metric</th></tr>${rows}</table>`;
}

function verifyHTML(ver) {
  const pr = ver.prediction ?? {};
  return `<p class="estPrompt">${esc(ver.hint ?? '')}</p>`
    + `<p class="estFormula">Prediction locked before acting: <b>${esc(String(pr.min))}&ndash;${esc(String(pr.max))} ${esc(pr.unit ?? '')}</b>. Measured after: <b> </b></p>`;
}

// Anything without a bespoke renderer above. Looks for a hint and the first
// array of labelled items in the format's own payload; renders nothing extra
// (why/takeaway still carry the teaching) rather than guessing wrong.
function genericHTML(payload) {
  if (!payload || typeof payload !== 'object') return '';
  const parts = [];
  if (payload.hint) parts.push(`<p class="estPrompt">${esc(payload.hint)}</p>`);
  for (const val of Object.values(payload)) {
    if (Array.isArray(val) && val.length && typeof val[0] === 'object' && val[0]?.label) {
      parts.push(`<ul class="chanList">${val.map(v => `<li><b>${esc(v.label)}</b>${
        v.cost != null ? ` — ${esc(String(v.cost))}` : ''}</li>`).join('')}</ul>`);
      break;
    }
  }
  return parts.join('');
}

const RENDERERS = {
  DIAGNOSIS: (ch) => (ch.readings?.length ? readingsHTML(ch.readings) : '') + choicesHTML(ch.choices ?? [], ch.correctChoice, ch.rebuttals ?? []),
  CHOICE: (ch) => choicesHTML(ch.choices ?? [], ch.answer, ch.rebuttals ?? []),
  SEQUENCE: (ch) => sequenceHTML(ch.cards ?? [], ch.order ?? (ch.cards ?? []).map((_, i) => i), ch.rebuttals ?? []),
  PROTOCOL: (ch) => pairsHTML(ch.scenarios ?? [], ch.choices ?? [], ch.mapping ?? [], ch.rebuttals ?? [], ch.columns),
  VALUE: (ch) => {
    const opts = (ch.value?.options ?? []).map(o => ({ label: o.label, mechanism: o.reveals }));
    const correctOpt = (ch.value?.options ?? []).find(o => o.decisive)?.label;
    return `<p class="estPrompt">${esc(ch.value?.decision ?? '')}</p>` + choicesHTML(opts, correctOpt, []);
  },
  CHAIN: (ch) => chainHTML(ch.chain ?? {}),
  CONTROL: (ch) => controlHTML(ch.control ?? {}),
  TRACE: (ch) => traceHTML(ch.trace ?? {}),
  ATTEST: (ch) => attestHTML(ch.attest ?? {}),
  ALLOCATE: (ch) => allocateHTML(ch.allocate ?? {}),
  TRIGGER: (ch) => triggerHTML(ch.trigger ?? {}),
  HOLD: (ch) => holdHTML(ch.hold ?? {}),
  SPOT: (ch) => spotHTML(ch.spot ?? {}),
  BELT: (ch) => beltHTML(ch.belt ?? {}),
  CLOUD: (ch) => cloudHTML(ch.cloud ?? {}),
  DEGENERACY: (ch) => degeneracyHTML(ch.degeneracy ?? {}),
  INJECT: (ch) => injectHTML(ch.inject ?? {}),
  VERIFY: (ch) => verifyHTML(ch.verify ?? {}),
  BALLPARK: (ch) => (ch.relationship ? `<p class="estFormula">${esc(ch.relationship)}</p>` : ''),
};
// Formats wrapped in the boxed `.est`-family div vs. left bare (VALUE uses its
// own `.valBox`, BELT and CHOICE/SEQUENCE/PROTOCOL/DIAGNOSIS render their own
// containers already).
const BOXED = new Set(['CHAIN', 'CONTROL', 'TRACE', 'ATTEST', 'ALLOCATE', 'TRIGGER', 'HOLD', 'SPOT', 'CLOUD', 'DEGENERACY', 'INJECT', 'VERIFY', 'BALLPARK']);
const BOX_CLASS = { TRACE: 'traceBox', ATTEST: 'attestBox' };

// ------------------------------------------------------------------ a stop
function stopHTML(groupId, lessonIdx, stopNum) {
  const lesson = CURRICULUM[groupId][lessonIdx];
  const ch = lesson.game ?? {};
  const kOf = String(ch.type ?? '').toUpperCase();
  const renderer = RENDERERS[kOf];
  let body = renderer ? renderer(ch) : genericHTML(ch[kOf.toLowerCase()]);
  if (kOf === 'VALUE') {
    body = `<div class="valBox">${body}<p class="estSolution">${esc(ch.answer ?? '')}</p></div>`;
  } else if (BOXED.has(kOf) && body) {
    body = `<div class="${BOX_CLASS[kOf] ?? 'est'}">${body}<p class="estSolution">${esc(ch.answer ?? '')}</p></div>`;
  } else if (BOXED.has(kOf) && !body) {
    body = '';
  } else if (!renderer && body) {
    // an unrecognised format that the generic fallback found something for
    body = `<div class="est">${body}<p class="estSolution">${esc(ch.answer ?? '')}</p></div>`;
  }

  const con = lesson.concept;
  const conceptLine = con?.c
    ? `<p class="concept">Key concept ${esc(String(con.n))}/${esc(String(con.of ?? d.concepts.length))}: ${esc(con.c)}</p>`
    : '';

  return `<article class="card" id="stop-${stopNum}">
    <div class="cardEyebrow">
      <span class="stopNum">#${stopNum}</span>
      <span class="dot">&middot;</span>
      <span class="grp">${esc(groupId)}</span>
      <span class="dot">&middot;</span>
      <span class="place">${esc(lesson.place ?? '')}</span>
      <span class="fmt">${esc(kOf)}</span>
    </div>
    <h3 class="cardTitle">${stopNum}. ${esc(lesson.title ?? '')}</h3>
    ${conceptLine}
    <p class="scene">${esc(lesson.scene ?? '')}</p>
    <p class="guide">${esc(lesson.guide ?? '')}</p>
    <p class="question"><b>${esc(ch.question ?? ch.task ?? '')}</b></p>
    ${body}
    <p class="why">${esc(ch.why ?? '')}</p>
    <p class="takeaway">${esc(lesson.takeaway ?? '')}</p>
    ${curricStripHTML(stopNum)}
  </article>`;
}

// -------------------------------------------------------------- level card
function levelCardHTML(m, mi) {
  const objectives = (m.stops ?? []).map((s) => {
    const l = CURRICULUM[s.group]?.[s.lesson];
    return { title: s.title ?? l?.title ?? '', reason: s.reason ?? '' };
  });
  const primerTerms = (m.primerTerms ?? []).map(t => `<dt>${esc(t.name)}</dt><dd>${esc(t.def)}</dd>`).join('');
  const rest = (m.primer ?? []).filter(line => !(m.primerTerms ?? []).some(t => String(line).startsWith(t.name + ' —')));
  const eqs = (m.equations ?? []).map(eq => `<div class="planEq">
      <div class="planEqHead"><code>${esc(eq.e)}</code><span>${esc(eq.c)}</span>${
        eq.computed ? '' : '<span class="tag warn">demanded, not worked</span>'}</div>
      ${eq.v?.length ? `<p class="eqVars">${eq.v.map(([sym, mean]) => `<span><b>${esc(sym)}</b> ${esc(mean)}</span>`).join('')}</p>` : ''}
      ${eq.s ? `<p class="eqSays">${esc(eq.s)}</p>` : ''}
    </div>`).join('');
  return `<article class="card levelCard">
    <div class="cardEyebrow"><span class="grp">Level card</span><span class="dot">&middot;</span><span class="place">${esc(theme.dayNoun ?? 'Day')} ${mi + 1}</span></div>
    <h3 class="cardTitle">${esc(m.title ?? '')}</h3>
    <p class="stakeBox">${esc(m.stake ?? m.briefing ?? '')}</p>
    <h4 class="subhead">Objectives</h4>
    <ol class="objectives">${objectives.map(o => `<li><span class="objTitle">${esc(o.title)}</span>${
      o.reason ? `<span class="objReason">${esc(o.reason)}</span>` : ''}</li>`).join('')}</ol>
    ${primerTerms || rest.length ? `<h4 class="subhead">Worth knowing first</h4>
    ${primerTerms ? `<dl class="primerTerms">${primerTerms}</dl>` : ''}
    ${rest.length ? `<ul class="primerRest">${rest.map(line => `<li>${esc(line)}</li>`).join('')}</ul>` : ''}` : ''}
    ${eqs ? `<div class="planEqs">${eqs}</div>` : ''}
  </article>`;
}

function closingCardHTML(m, mi, dayNoun) {
  if (!m.segue) return '';
  return `<article class="card closingCard">
    <div class="cardEyebrow"><span class="grp">Closing card</span><span class="dot">&middot;</span><span class="place">${esc(dayNoun)} ${mi + 1} &rarr; ${mi + 2}</span></div>
    <h3 class="cardTitle">What today decided</h3>
    <p class="segueText">${esc(m.segue)}</p>
    <p class="closingNote">Printed first on the debrief card, before the generated compliment — see STORY_SPEC.md rule 11.</p>
  </article>`;
}

// ----------------------------------------------------------------- warmup
const tiers = tiersFor(theme.site);
const uDay = unlockDay(theme.site);
const plan = warmupPlan({ days: MISSIONS.length, hasFar: tiers.hasFar, unlockDay: uDay });
const planByDay = new Map(plan.map(pl => [pl.day, pl]));

function warmupHTML(day) {
  const pl = planByDay.get(day);
  if (!pl) return '';
  const key = pl.format.toLowerCase();
  const wrote = WARMUPS[pl.slot] ?? WARMUPS[key] ?? {};
  const title = wrote.title ?? '(unauthored)';
  const why = wrote.why ?? '';
  return `<div class="warmup">
    <div class="warmupEyebrow"><span class="wTag">${esc(pl.format)}</span><span class="wSlot">${esc(pl.slot)}</span>${
      pl.far ? '<span class="tag warn">far ground</span>' : ''}</div>
    <h4 class="warmupTitle">${esc(title)}</h4>
    <p class="warmupWhy">${esc(why)}</p>
  </div>`;
}

// -------------------------------------------------------------- curriculum
function curriculumPageHTML() {
  if (!hasSyllabus || !d.concepts.length) return '';
  const eqRows = d.equations.map(eq => {
    const worked = eq.computes.map(n => `<a class="stopLink" href="#stop-${n}">#${n}</a>`).join(', ');
    const demandedN = demandedAtByEq.get(eq.e);
    const demanded = demandedN ? `<a class="stopLink" href="#stop-${demandedN}">#${demandedN}</a>` : '';
    const mentioned = eq.mentions.filter(n => !eq.computes.includes(n) && n !== demandedN)
      .map(n => `<a class="stopLink" href="#stop-${n}">#${n}</a>`).join(', ');
    return `<tr><td><code>${esc(eq.e)}</code></td><td>${esc(eq.c)}</td>`
      + `<td>${worked || '<span class="tag warn">never worked</span>'}</td>`
      + `<td>${demanded || '&mdash;'}</td>`
      + `<td>${mentioned || '&mdash;'}</td></tr>`;
  }).join('');
  const conRows = d.concepts.map(c => {
    const stops = c.stops.map(n => `<a class="stopLink" href="#stop-${n}">#${n}</a>`).join(', ');
    const tierTag = c.tier ? `<span class="tag ${c.tier.toLowerCase()}">${c.tier.toLowerCase()}</span>` : '<span class="tag warn">not reached</span>';
    return `<tr class="${c.stops.length ? '' : 'unreached'}"><td>${c.n}</td><td>${esc(c.c)}${c.m ? ' <span class="tag">method</span>' : ''}</td>`
      + `<td>${tierTag}</td><td>${stops || '&mdash;'}</td></tr>`;
  }).join('');
  const computed = d.equations.filter(e => e.computes.length).length;
  const touched = d.concepts.filter(c => c.stops.length).length;
  return `<section class="day curriculumPage" id="curriculum">
    <div class="dayBand">
      <div class="dayNum">Curriculum</div>
      <h2 class="dayTitle">What the syllabus asks for</h2>
      <p class="dayStake">${computed} of ${d.equations.length} equations are worked by a question with real numbers; the rest are demanded on a level card, mentioned in prose, or not reached.
        ${touched} of ${d.concepts.length} syllabus concepts are touched by at least one stop. Stop numbers link down to the card.</p>
    </div>
    <div class="dayCards">
      ${d.equations.length ? `<article class="card">
        <h3 class="cardTitle">Equations</h3>
        <table class="dataTable curricTable"><tr><th>equation</th><th>what it's for</th><th>worked at</th><th>demanded at</th><th>mentioned only</th></tr>${eqRows}</table>
      </article>` : ''}
      <article class="card">
        <h3 class="cardTitle">Concepts (1&ndash;${d.concepts.length})</h3>
        <table class="dataTable curricTable"><tr><th>#</th><th>concept</th><th>move</th><th>stops</th></tr>${conRows}</table>
      </article>
    </div>
  </section>`;
}

// -------------------------------------------------------------- appendix
//
// A lesson is "orphaned" if no mission stop ever walks to it — real for a
// theme whose day model serves a review dynamically rather than scheduling it
// as an ordinary stop. Render those as real cards (their own numbering, R1…),
// so nothing in the campaign is invisible to this dossier; say plainly when
// there are none, rather than always printing a reassuring note.
function appendixHTML() {
  const reached = new Set(pages.map(p => p.key));
  const orphans = [];
  for (const g of Object.keys(CURRICULUM)) {
    CURRICULUM[g].forEach((l, i) => { if (!reached.has(`${g}:${i}`)) orphans.push({ g, i, l }); });
  }
  if (!orphans.length) {
    return `<section class="day" id="reviews">
      <div class="dayBand">
        <div class="dayNum">Appendix</div>
        <h2 class="dayTitle">Review call-backs</h2>
        <p class="dayStake">Every lesson in this campaign, including any "— Review" callback variant, is reached by walking the day list above. Nothing here exists only as an unreachable callback.</p>
      </div>
    </section>`;
  }
  const cards = orphans.map(({ g, i, l }, k) => {
    const ch = l.game ?? {};
    const kOf = String(ch.type ?? '').toUpperCase();
    const renderer = RENDERERS[kOf];
    const body = renderer ? renderer(ch) : genericHTML(ch[kOf.toLowerCase()]);
    return `<article class="card" id="orphan-${k + 1}">
      <div class="cardEyebrow"><span class="stopNum">R${k + 1}</span><span class="dot">&middot;</span><span class="grp">${esc(g)}</span><span class="dot">&middot;</span><span class="fmt">${esc(kOf)}</span></div>
      <h3 class="cardTitle">${esc(l.title ?? '')}</h3>
      <p class="scene">${esc(l.scene ?? '')}</p>
      <p class="guide">${esc(l.guide ?? '')}</p>
      <p class="question"><b>${esc(ch.question ?? ch.task ?? '')}</b></p>
      ${body}
      <p class="why">${esc(ch.why ?? '')}</p>
      <p class="takeaway">${esc(l.takeaway ?? '')}</p>
    </article>`;
  }).join('\n');
  return `<section class="day" id="reviews">
    <div class="dayBand">
      <div class="dayNum">Appendix</div>
      <h2 class="dayTitle">Review call-backs</h2>
      <p class="dayStake">${orphans.length} lesson${orphans.length === 1 ? '' : 's'} that no mission stop walks to directly — served dynamically by the day model rather than scheduled as an ordinary stop.</p>
    </div>
    <div class="dayCards">${cards}</div>
  </section>`;
}

// ------------------------------------------------------------------- pages
const dayNoun = theme.dayNoun ?? 'Day';
let toc = `<nav class="toc"><h2>Contents</h2><ol>`;
MISSIONS.forEach((m, mi) => { toc += `<li><a href="#day-${mi + 1}">${esc(dayNoun)} ${mi + 1} — ${esc(m.title ?? '')}</a></li>`; });
toc += `<li><a href="#reviews">Appendix — review call-backs</a></li></ol></nav>`;

let daysHTML = '';
MISSIONS.forEach((m, mi) => {
  const stopsHTML = (m.stops ?? []).map(s => stopHTML(s.group, s.lesson, stopNumOf.get(`${s.group}:${s.lesson}`))).join('\n');
  daysHTML += `<section class="day" id="day-${mi + 1}">
    ${warmupHTML(mi + 1)}
    <div class="dayBandThin"><div class="dayNum">${esc(dayNoun)} ${mi + 1}</div></div>
    <div class="dayCards">
      ${levelCardHTML(m, mi)}
      ${stopsHTML}
      ${closingCardHTML(m, mi, dayNoun)}
    </div>
  </section>`;
});

const CSS = `
:root{
  --bg:#12161d; --paper:#f6f1e3; --paper-edge:#e7dfc8; --ink:#20241f; --ink-soft:#5c5744;
  --gold:#b3862c; --gold-deep:#7c5c1c; --line:#d9d0b6; --band:#1b212b; --band-ink:#ece3cf;
  --tag-bg:#e7dcb8; --tag-ink:#5c4a1a; --warn-bg:#e6c9be; --warn-ink:#6b3020; --good:#3c6b4a;
  --warmup-bg:#221a12; --warmup-edge:#3a2c17; --level-bg:#efe8d3; --closing-bg:#e3e9de; --closing-edge:#bcccb0;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#0d0f13; --paper:#1c2029; --paper-edge:#2a2f3a; --ink:#e9e4d6; --ink-soft:#a29e8c;
    --gold:#d3a24a; --gold-deep:#a97f34; --line:#33394633; --band:#05060a; --band-ink:#e9e4d6;
    --tag-bg:#3a3320; --tag-ink:#d3b673; --warn-bg:#402521; --warn-ink:#e0a08e; --good:#7bbf93;
    --warmup-bg:#181310; --warmup-edge:#2e2318; --level-bg:#242a35; --closing-bg:#1c2620; --closing-edge:#31402f;
  }
}
:root[data-theme="dark"]{
  --bg:#0d0f13; --paper:#1c2029; --paper-edge:#2a2f3a; --ink:#e9e4d6; --ink-soft:#a29e8c;
  --gold:#d3a24a; --gold-deep:#a97f34; --line:#33394633; --band:#05060a; --band-ink:#e9e4d6;
  --tag-bg:#3a3320; --tag-ink:#d3b673; --warn-bg:#402521; --warn-ink:#e0a08e; --good:#7bbf93;
  --warmup-bg:#181310; --warmup-edge:#2e2318; --level-bg:#242a35; --closing-bg:#1c2620; --closing-edge:#31402f;
}
*{box-sizing:border-box;}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Source Serif 4",Georgia,serif;line-height:1.55;}
.cover{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px 40px;background:
  radial-gradient(ellipse at 50% -10%, color-mix(in srgb, var(--gold) 14%, transparent), transparent 60%), var(--bg);color:var(--band-ink);}
.coverEyebrow{font-family:"IBM Plex Mono",monospace;letter-spacing:.18em;text-transform:uppercase;font-size:.72rem;color:var(--gold);margin-bottom:18px;}
.coverTitle{font-family:"Fraunces",Georgia,serif;font-weight:700;font-size:clamp(2.6rem,7vw,4.6rem);margin:0;text-wrap:balance;}
.coverSub{font-family:"Fraunces",Georgia,serif;font-style:italic;font-weight:400;font-size:1.25rem;color:var(--ink-soft);margin:10px 0 40px;}
.openingWrap{max-width:760px;margin:0 auto;padding:0 20px 60px;background:var(--bg);}
.toc{max-width:720px;margin:0 auto;padding:20px 24px 56px;background:var(--bg);color:var(--band-ink);}
.toc h2{font-family:"Fraunces",serif;font-size:1.1rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--gold-deep);padding-bottom:10px;}
.toc ol{columns:2;column-gap:32px;padding:0;margin:16px 0 0;list-style:none;counter-reset:toc;}
.toc li{counter-increment:toc;font-family:"IBM Plex Mono",monospace;font-size:.86rem;margin-bottom:10px;break-inside:avoid;}
.toc a{color:var(--band-ink);text-decoration:none;border-bottom:1px dotted var(--gold-deep);}
.toc a:hover{color:var(--gold);}
.day{background:var(--bg);}
.dayBand{background:var(--band);color:var(--band-ink);padding:48px 24px 40px;text-align:center;}
.dayBandThin{background:var(--band);color:var(--band-ink);padding:20px 24px 6px;text-align:center;}
.dayNum{font-family:"IBM Plex Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-size:.78rem;}
.dayTitle{font-family:"Fraunces",serif;font-weight:700;font-size:clamp(1.7rem,4vw,2.4rem);margin:8px 0 14px;text-wrap:balance;}
.dayStake{max-width:640px;margin:0 auto;font-style:italic;color:color-mix(in srgb, var(--band-ink) 85%, transparent);font-size:1.02rem;}
.dayCards{max-width:760px;margin:0 auto;padding:16px 20px 60px;display:flex;flex-direction:column;gap:28px;}
.card{background:var(--paper);color:var(--ink);border:1px solid var(--paper-edge);border-radius:3px;padding:26px 28px 22px;box-shadow:0 1px 0 var(--paper-edge), 0 12px 30px -18px #000;position:relative;}
.card::before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:3px;background:var(--gold);border-radius:2px;}
.card.openingCard::before{background:var(--good);}
.card.levelCard{background:var(--level-bg);border-style:dashed;border-color:var(--gold-deep);}
.card.levelCard::before{background:var(--gold-deep);width:4px;}
.card.closingCard{background:var(--closing-bg);border-color:var(--closing-edge);}
.card.closingCard::before{background:var(--good);width:4px;}
.segueText{font-size:1.05rem;margin:0 0 12px;}
.closingNote{font-family:"IBM Plex Mono",monospace;font-size:.7rem;color:var(--ink-soft);letter-spacing:.02em;margin:0;}
.stakeBox{background:color-mix(in srgb, var(--gold) 12%, transparent);border-left:3px solid var(--gold);border-radius:0 4px 4px 0;padding:10px 14px;font-style:italic;margin:0 0 18px;}
.subhead{font-family:"IBM Plex Mono",monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-deep);margin:18px 0 8px;border-bottom:1px solid var(--line);padding-bottom:4px;}
.objectives{list-style:none;counter-reset:obj;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
.objectives li{counter-increment:obj;padding:8px 12px 8px 34px;position:relative;border:1px solid var(--line);border-radius:4px;}
.objectives li::before{content:counter(obj);position:absolute;left:10px;top:8px;font-family:"IBM Plex Mono",monospace;color:var(--gold-deep);font-weight:600;}
.objTitle{display:block;font-weight:600;}
.objReason{display:block;font-size:.86rem;color:var(--ink-soft);margin-top:2px;}
dl.primerTerms{margin:0 0 10px;}
dl.primerTerms dt{font-weight:700;font-family:"Fraunces",serif;}
dl.primerTerms dd{margin:0 0 8px;color:var(--ink-soft);}
ul.primerRest{margin:0 0 10px;padding-left:20px;}
.planEqs{display:flex;flex-direction:column;gap:10px;}
.planEq{border:1px solid var(--line);border-radius:4px;padding:8px 12px;}
.planEqHead{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-family:"IBM Plex Mono",monospace;flex-wrap:wrap;}
.planEqHead code{font-weight:700;font-size:.98rem;}
.planEqHead span:not(.tag){font-size:.78rem;color:var(--ink-soft);font-style:italic;}
.eqVars{display:flex;flex-wrap:wrap;gap:10px;font-size:.8rem;color:var(--ink-soft);margin:4px 0;}
.eqSays{font-size:.86rem;margin:4px 0 0;}
.cardEyebrow{font-family:"IBM Plex Mono",monospace;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);display:flex;gap:8px;align-items:center;margin-bottom:6px;}
.cardEyebrow .fmt{margin-left:auto;background:var(--tag-bg);color:var(--tag-ink);padding:2px 8px;border-radius:10px;font-size:.68rem;}
.cardEyebrow .stopNum{color:var(--gold-deep);font-weight:600;}
.cardTitle{font-family:"Fraunces",serif;font-weight:600;font-size:1.32rem;margin:0 0 10px;text-wrap:balance;}
.concept{font-size:.78rem;color:var(--gold-deep);font-style:italic;margin:0 0 12px;}
.scene{margin:0 0 10px;}
.guide{margin:0 0 12px;color:var(--ink-soft);}
.question{margin:14px 0 10px;padding:10px 14px;background:color-mix(in srgb, var(--gold) 10%, transparent);border-left:3px solid var(--gold);border-radius:0 4px 4px 0;}
.why{margin:14px 0 6px;padding-top:12px;border-top:1px dashed var(--line);}
.takeaway{font-style:italic;color:var(--gold-deep);margin:10px 0 0;}
ul.choices,ol.seq,ul.pairs{list-style:none;padding:0;margin:8px 0;display:flex;flex-direction:column;gap:10px;}
.choice,.seq li,.pairs li{padding:8px 12px;border:1px solid var(--line);border-radius:4px;background:color-mix(in srgb, var(--paper) 96%, var(--ink) 4%);}
.choice.correct{border-color:var(--good);background:color-mix(in srgb, var(--good) 10%, var(--paper));}
.choiceLabel{font-weight:600;display:block;}
.choiceMech,.dep{display:block;font-size:.86rem;color:var(--ink-soft);margin-top:2px;}
.rebuttal{display:block;font-size:.86rem;color:var(--ink-soft);margin-top:4px;font-style:italic;}
.tag{display:inline-block;margin-left:8px;background:var(--tag-bg);color:var(--tag-ink);font-family:"IBM Plex Mono",monospace;font-size:.66rem;padding:1px 7px;border-radius:9px;text-transform:uppercase;letter-spacing:.04em;}
.tag.warn{background:var(--warn-bg);color:var(--warn-ink);}
.tag.select{background:var(--tag-bg);color:var(--tag-ink);}
.tag.construct{background:color-mix(in srgb, var(--good) 14%, transparent);color:var(--good);}
.tag.operate{background:color-mix(in srgb, var(--gold) 16%, transparent);color:var(--gold-deep);}
.cols{display:flex;justify-content:space-between;font-family:"IBM Plex Mono",monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-soft);margin-bottom:6px;}
.pairs li{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;}
.arrow{color:var(--gold);}
.est,.valBox,.traceBox,.beltBox,.attestBox{margin:10px 0;}
.estPrompt{margin:0 0 8px;}
.tiles{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px;}
.tile{font-family:"IBM Plex Mono",monospace;font-size:.76rem;padding:3px 9px;border-radius:12px;border:1px solid var(--line);}
.tile.used{background:color-mix(in srgb, var(--good) 14%, var(--paper));border-color:var(--good);}
.estFormula{font-family:"IBM Plex Mono",monospace;font-size:.92rem;}
.estSolution{background:color-mix(in srgb, var(--good) 8%, transparent);border-left:3px solid var(--good);padding:8px 12px;border-radius:0 4px 4px 0;}
.chanList{list-style:none;padding:0;margin:6px 0;display:flex;flex-direction:column;gap:8px;}
.chanList li{padding:6px 10px;border:1px solid var(--line);border-radius:4px;}
.chanList li.indep{border-color:var(--good);}
.beltBox{display:flex;gap:20px;}
.beltCol{flex:1;}
.beltCol h5{margin:0 0 6px;font-family:"IBM Plex Mono",monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-soft);}
.beltCol ul{margin:0;padding-left:18px;}
table.dataTable{width:100%;border-collapse:collapse;font-family:"IBM Plex Mono",monospace;font-size:.82rem;margin:8px 0;}
table.dataTable th,table.dataTable td{border-bottom:1px solid var(--line);padding:4px 8px;text-align:left;font-variant-numeric:tabular-nums;vertical-align:top;}
table.dataTable tr.bestRow{background:color-mix(in srgb, var(--good) 10%, transparent);}
table.dataTable tr.unreached{opacity:.55;}
.curricTable{overflow-x:auto;display:block;}
.stopLink{color:var(--gold-deep);text-decoration:none;border-bottom:1px dotted var(--gold-deep);}
.stopLink:hover{color:var(--gold);}
.curricStrip{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;padding-top:12px;border-top:1px dashed var(--line);}
.chip{font-family:"IBM Plex Mono",monospace;font-size:.68rem;padding:3px 9px;border-radius:10px;border:1px solid var(--line);color:var(--ink-soft);}
.chip.concept{background:color-mix(in srgb, var(--gold) 10%, transparent);border-color:var(--gold-deep);color:var(--gold-deep);}
.chip.eq.computed{background:color-mix(in srgb, var(--good) 12%, transparent);border-color:var(--good);color:var(--good);}
.chip.eq.demanded{background:color-mix(in srgb, var(--gold) 16%, transparent);border-color:var(--gold-deep);color:var(--gold-deep);}
.chip.eq.mentioned{background:var(--warn-bg);border-color:var(--warn-ink);color:var(--warn-ink);}
.chip code{font-weight:600;}
.warmup{max-width:760px;margin:0 auto;background:var(--warmup-bg);border:1px solid var(--warmup-edge);border-radius:6px;padding:16px 20px;color:var(--band-ink);position:relative;top:18px;}
.warmupEyebrow{display:flex;gap:8px;align-items:center;font-family:"IBM Plex Mono",monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.06em;}
.wTag{background:var(--gold);color:#20180a;padding:2px 8px;border-radius:9px;font-weight:600;}
.wSlot{color:var(--gold);}
.warmupTitle{font-family:"Fraunces",serif;font-size:1.05rem;margin:8px 0 4px;}
.warmupWhy{font-size:.9rem;color:color-mix(in srgb, var(--band-ink) 80%, transparent);margin:0;}
.ending{max-width:640px;margin:0 auto;padding:60px 24px 90px;background:var(--bg);color:var(--band-ink);}
.ending h2{font-family:"Fraunces",serif;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;font-size:1rem;border-bottom:1px solid var(--gold-deep);padding-bottom:10px;}
.ending p{font-size:1.05rem;}
`;

const html = `<title>${esc(theme.title)} Dossier</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>${CSS}</style>
<div class="cover">
  <div class="coverEyebrow">${esc(theme.subtitle ?? '')}</div>
  <h1 class="coverTitle">${esc(theme.title)}</h1>
  <p class="coverSub">${esc(content.delivery?.name ?? theme.title)} — ${MISSIONS.length} ${esc(dayNoun.toLowerCase())}s, every card, every warm-up, the whole syllabus</p>
</div>
<div class="openingWrap"><article class="card openingCard">
    <div class="cardEyebrow"><span class="grp">Opening</span><span class="dot">&middot;</span><span class="place">${esc(dayNoun)} 1</span></div>
    <h3 class="cardTitle">${esc(theme.title)}</h3>
    <p class="concept">${esc(theme.subtitle ?? '')}</p>
    <p class="scene">${esc((theme.opening ?? []).join(' '))}</p>
  </article></div>
${curriculumPageHTML()}
${toc}
${daysHTML}
${appendixHTML()}
<div class="ending"><h2>How it ends</h2>
  ${(theme.ending ?? []).map(p => `<p>${esc(p)}</p>`).join('')}
</div>
`;

const OUT = OUT_OVERRIDE ?? resolve(GK, `books/dossier/${THEME_ID}-dossier.html`);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);

const formats = new Set(pages.map(p => String(CURRICULUM[p.group][p.lesson].game?.type ?? '').toUpperCase()));
const unhandled = [...formats].filter(f => !RENDERERS[f]);
console.log(`✓ ${theme.title}: ${pages.length} stops → ${OUT.replace(GK + '/', '')}`
  + (unhandled.length ? `  (no bespoke renderer for: ${unhandled.join(', ')} — used the generic fallback)` : ''));
