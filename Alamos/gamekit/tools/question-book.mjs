// question-book.mjs — every question in a theme, as a printable document.
//
//   npm run question-book -- <theme> [out.html]
//
// For reading away from the game: reviewing the science, checking an answer
// key, handing the campaign to somebody who is not going to play it. It reads
// the theme through `normalizeContent`, so what it prints is what the engine
// serves — packs expanded, formats canonicalised, estimate specs attached.
//
// Emits HTML with print rules. To make the PDF:
//
//   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
//     --headless --disable-gpu --no-pdf-header-footer \
//     --print-to-pdf=out.pdf out.html
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { themeDir as resolveTheme } from '../engine/dev/registry.mjs';

const themeName = process.argv[2];
if(!themeName){ console.error('usage: node tools/question-book.mjs <theme> [out.html]'); process.exit(1); }
const dir = resolveTheme(themeName);
const out = process.argv[3] ?? `docs/${themeName}-questions.html`;

const { normalizeContent } = await import('../engine/content/normalize.js');
const load = async (f) => import(resolve(dir, 'content', f)).catch(() => import(resolve(dir, 'src', f)));

const cur = await load('curriculum.js');
const mis = await load('missions.js');
const rosterMod = await load('roster.js').catch(() => ({}));
let packs = {};
for(const f of ['shared.js', 'diagnosis-packs.js', 'diagnosis.js']){
  try{ const p = await load(f); packs = p.DIAGNOSIS_PACKS ?? Object.values(p).find(v => v && typeof v === 'object'); break; }catch{}
}
const theme = await import(resolve(dir, 'theme.js')).then(m => m.default ?? m).catch(() => ({}));

const content = {
  CURRICULUM: cur.CURRICULUM,
  MISSIONS: mis.MISSIONS ?? mis.MISSION_DEFS,
  BALLPARK_CALCS: cur.BALLPARK_CALCS,
  DIAGNOSIS_PACKS: packs,
  HISTORIC_CHARACTERS: rosterMod.ROSTER ?? rosterMod.HISTORIC_CHARACTERS ?? [],
};
normalizeContent(content);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Book prose carries a little HTML. Keep <p>/<em>/<b>, drop the rest. */
const rich = (s) => String(s ?? '').replace(/<(?!\/?(p|em|i|b|strong)\b)[^>]*>/g, '');
const words = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const same = (a, b) => String(a ?? '').trim() === String(b ?? '').trim();

const area = (id) => (theme.content?.GROUPS ?? []).find(g => g.id === id) ?? { id, name: id };

/**
 * The number on a tile, without the description beside it.
 *
 * Tiles read "0.01 (prevalence in the screening group)" so the player knows
 * what they are picking up. Substituted whole into the worked equation, five of
 * those produce a paragraph of monospace nobody can read as arithmetic.
 */
const quantity = (label) => String(label ?? '?').split(' (')[0].split('  ')[0].trim();

/** One answer option, marked when it is the keyed one. */
function option(label, mechanism, correct){
  return `<li class="opt${correct ? ' is-answer' : ''}">`
    + `<span class="mark">${correct ? '✔' : ''}</span>`
    + `<span class="optText">${esc(label)}`
    + (mechanism ? `<span class="mech">${esc(mechanism)}</span>` : '')
    + `</span></li>`;
}

function questionBody(g, calc){
  const kind = String(g.type).toUpperCase();
  const keyed = new Set([...(g.correctChoices ?? []), ...(g.correctChoice ? [g.correctChoice] : [])].map(String));

  // SEQUENCE and PROTOCOL carry their answer as `order` / `mapping` rather than
  // in `answer`, which the books leave empty for both. So the layout below is
  // the answer, and it is labelled as one instead of being followed by an empty
  // Answer box.
  if(kind === 'PROTOCOL'){
    const rows = (g.scenarios ?? []).map((s, i) => {
      const j = (g.mapping ?? [])[i] ?? i;
      return `<tr><td class="lhs">${esc(s)}</td><td class="arrow">→</td><td class="rhs">${esc((g.choices ?? [])[j] ?? '')}</td></tr>`;
    }).join('');
    return `<p class="alabel keyed">Correct matching</p><table class="pairs"><tbody>${rows}</tbody></table>`;
  }
  if(kind === 'SEQUENCE'){
    const order = g.order ?? (g.cards ?? []).map((_, i) => i);
    const items = order.map((idx, n) =>
      `<li><span class="step">${n + 1}</span><span>${esc((g.cards ?? [])[idx] ?? '')}</span></li>`).join('');
    return `<p class="alabel keyed">Correct order</p><ol class="seq">${items}</ol>`;
  }
  if(kind === 'BALLPARK'){
    const tiles = (calc?.labels ?? []).map((l, i) =>
      `<li class="tile${(calc.correct ?? []).includes(i) ? ' is-answer' : ''}">${esc(l)}</li>`).join('');
    return (g.relationship ? `<p class="law"><span>Governing relationship</span>${esc(g.relationship)}</p>` : '')
      + (tiles ? `<ul class="tiles">${tiles}</ul>` : '')
      + (calc?.template ? `<p class="calc">${esc(calc.template.replace(/\{(\d+)\}/g, (_, n) => quantity(calc.labels?.[calc.correct?.[+n]])))}</p>` : '');
  }
  // DIAGNOSIS, CHOICE, TRIAGE, CASEBOOK — a candidate list, sometimes with a panel.
  const readings = (g.readings ?? []).length
    ? `<table class="readings"><tbody>${g.readings.map(r =>
        `<tr><td class="zone">${esc(r.zone ?? '')}</td><td class="rlabel">${esc(r.label ?? '')}</td>`
        + `<td class="rval">${esc(r.value ?? '')}</td><td class="rnote">${esc(r.note ?? '')}</td></tr>`).join('')}</tbody></table>`
    : '';
  const opts = (g.choices ?? []).map(c =>
    option(c?.label ?? c, c?.mechanism, keyed.has(String(c?.label ?? c)))).join('');
  return readings + (opts ? `<ul class="opts">${opts}</ul>` : '');
}

// From day three, `shapeMissions` adds a fourth call revisiting a lesson taught
// earlier — spaced retrieval, and the same question a second time. A reference
// document should carry each question once, and say where it comes back.
const firstSeen = new Map();
const callbacks = new Map();
(content.MISSIONS ?? []).forEach((m, mi) => m.stops.forEach((st, si) => {
  const key = `${st.group}/${st.lesson}`;
  if(firstSeen.has(key)) callbacks.set(key, [...(callbacks.get(key) ?? []), mi + 1]);
  else firstSeen.set(key, `${mi + 1}.${si + 1}`);
}));

let stopNo = 0;
const missions = (content.MISSIONS ?? []).map((m, mi) => {
  const stops = m.stops.map((st, si) => {
    const l = content.CURRICULUM[st.group]?.[st.lesson];
    if(!l) return '';
    if(firstSeen.get(`${st.group}/${st.lesson}`) !== `${mi + 1}.${si + 1}`) return '';
    const g = l.game ?? {};
    const calc = content.BALLPARK_CALCS?.[`${st.group}-${l.day}`];
    stopNo++;
    const answer = g.correctChoices?.join('  +  ') ?? g.correctChoice ?? calc?.solution ?? g.answer;
    return `<section class="stop">
      <h3><span class="ref">${mi + 1}.${si + 1}</span> ${esc(l.title)}
        <span class="tags"><span class="tag">${esc(String(g.type).toUpperCase())}</span>
        <span class="tag alt">${esc(area(st.group).name)}</span>
        ${st.person ? '<span class="tag alt">person stop</span>' : ''}</span></h3>
      ${(callbacks.get(`${st.group}/${st.lesson}`) ?? []).length
        ? `<p class="callback">Returns as a callback on ${callbacks.get(`${st.group}/${st.lesson}`).map(d => 'day ' + d).join(', ')}</p>` : ''}
      ${l.place ? `<p class="place">${esc(l.place)}</p>` : ''}
      <div class="scene">${rich(l.scene ?? l.story ?? '')}</div>
      ${(l.assumes ?? []).length ? `<p class="assumes"><span>Assumes</span>${l.assumes.map(esc).join(' · ')}</p>` : ''}
      <p class="q">${esc(g.question ?? g.task ?? g.play ?? '')}</p>
      ${questionBody(g, calc)}
      ${String(answer ?? '').trim()
        ? `<div class="answer"><span class="alabel">Answer</span>${esc(answer)}</div>` : ''}
      ${g.why ? `<div class="why"><span class="wlabel">Why</span>${esc(g.why)}</div>` : ''}
      ${(g.rebuttals ?? []).length
        ? `<div class="rebs"><span class="wlabel">Why the others do not hold</span><ul>${g.rebuttals.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>` : ''}
      ${l.takeaway && !same(l.takeaway, g.why) ? `<p class="take">${esc(l.takeaway)}</p>` : ''}
    </section>`;
  }).join('');
  return `<article class="mission">
    <header class="mhead"><p class="mnum">Mission ${mi + 1}</p><h2>${esc(m.title)}</h2>
      ${m.objective ? `<p class="mobj">${esc(m.objective)}</p>` : ''}
      ${m.stake ? `<p class="mstake">${esc(m.stake)}</p>` : ''}</header>
    ${stops}</article>`;
}).join('');

const callbackTotal = [...callbacks.values()].reduce((a, v) => a + v.length, 0);
const counts = {};
for(const key of firstSeen.keys()){
  const [gid, idx] = key.split('/');
  const g = content.CURRICULUM[gid]?.[+idx]?.game; if(!g) continue;
  const k = String(g.type).toUpperCase(); counts[k] = (counts[k] ?? 0) + 1;
}

const title = theme.title ?? theme.name ?? themeName;
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(title)} — questions and answers</title>
<style>
  @page { size: A4; margin: 18mm 16mm 16mm; }
  :root { --ink:#1a1a18; --soft:#57544d; --rule:#d8d4ca; --key:#1c6b45; --keybg:#eef6f1; --accent:#7a3b12; }
  * { box-sizing: border-box; }
  body { margin:0; font:11.5pt/1.55 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif; color:var(--ink); }
  .sheet { max-width: 175mm; margin: 0 auto; padding: 12mm 0 18mm; }
  h1 { font-size: 26pt; line-height:1.15; margin:0 0 2mm; letter-spacing:-.01em; }
  .sub { color:var(--accent); font-size:11pt; margin:0 0 1mm; }
  .sub2 { color:var(--soft); font-size:11pt; margin:0 0 6mm; }
  .meta { display:flex; flex-wrap:wrap; gap:3mm 6mm; border-top:1px solid var(--rule);
          border-bottom:1px solid var(--rule); padding:3mm 0; margin:0 0 8mm;
          font:9.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif; color:var(--soft); }
  .meta b { color:var(--ink); font-weight:600; }
  .lede { font-size:11pt; color:var(--soft); margin:0 0 4mm; }

  .mission { break-before: page; }
  .mission:first-of-type { break-before: auto; }
  .mhead { border-left:3px solid var(--accent); padding-left:5mm; margin:0 0 7mm; break-after: avoid; }
  .mnum { font:600 9pt/1 ui-sans-serif,-apple-system,Segoe UI,sans-serif; letter-spacing:.1em;
          text-transform:uppercase; color:var(--accent); margin:0 0 2mm; }
  .mhead h2 { font-size:17pt; line-height:1.2; margin:0 0 2mm; }
  .mobj { margin:0; color:var(--soft); font-size:10.5pt; }
  .mstake { margin:1.5mm 0 0; color:var(--soft); font-size:10pt; font-style:italic; }

  /* A stop is often most of a page, so keeping the whole thing together leaves
     a mission header alone on one — fifteen times. Instead the stop may break,
     and the pieces that must not are marked individually. */
  .stop { padding:0 0 6mm; margin:0 0 6mm; border-bottom:1px solid var(--rule); }
  .stop h3, .place, .callback, .q, .assumes, .law { break-after: avoid; }
  .answer, .why, .rebs, .take, .pairs, .readings, .seq, .opts, .tiles { break-inside: avoid; }
  .mhead { break-after: avoid; }
  .stop:last-child { border-bottom:0; }
  .stop h3 { font-size:12.5pt; line-height:1.3; margin:0 0 1.5mm; }
  .ref { color:var(--accent); font-variant-numeric: tabular-nums; margin-right:1.5mm; }
  .tags { white-space:nowrap; }
  .tag { display:inline-block; font:600 7.5pt/1.5 ui-sans-serif,-apple-system,Segoe UI,sans-serif;
         letter-spacing:.06em; text-transform:uppercase; background:#efece5; color:var(--soft);
         border-radius:2px; padding:0 1.5mm; margin-left:1.5mm; vertical-align:1.5pt; }
  .tag.alt { background:transparent; border:1px solid var(--rule); }
  .place { margin:0 0 3mm; font:9.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif; color:var(--soft); }
  .callback { margin:0 0 3mm; font:600 8.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif;
              color:var(--accent); }
  .scene { margin:0 0 3mm; }
  .scene p { margin:0 0 2mm; }
  .assumes, .law { font:9.5pt/1.45 ui-sans-serif,-apple-system,Segoe UI,sans-serif; color:var(--soft);
                   margin:0 0 3mm; }
  .assumes span, .law span { display:inline-block; font-weight:600; color:var(--ink);
                             letter-spacing:.05em; text-transform:uppercase; font-size:7.5pt; margin-right:2mm; }
  .q { font-weight:600; margin:0 0 3mm; }

  ul, ol { margin:0 0 3mm; padding:0; list-style:none; }
  .opts li { display:flex; gap:2.5mm; padding:1.2mm 2mm; border-radius:2px; }
  .opt.is-answer { background:var(--keybg); }
  .mark { flex:0 0 4mm; color:var(--key); font-weight:700; }
  .optText { flex:1; }
  .opt.is-answer .optText { font-weight:600; }
  .mech { display:block; color:var(--soft); font-size:10pt; font-weight:400; }
  .seq li { display:flex; gap:2.5mm; padding:1mm 0; }
  .step { flex:0 0 5mm; height:5mm; border-radius:50%; background:var(--accent); color:#fff;
          font:600 8pt/5mm ui-sans-serif,sans-serif; text-align:center; }
  .tiles { display:flex; flex-wrap:wrap; gap:1.5mm; }
  .tiles .tile { font:9.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif; border:1px solid var(--rule);
                 border-radius:2px; padding:.8mm 2mm; color:var(--soft); }
  .tiles .tile.is-answer { border-color:var(--key); color:var(--key); font-weight:600; background:var(--keybg); }
  .calc { font:10.5pt/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--ink);
          background:#f6f4ee; border-radius:2px; padding:1.5mm 2.5mm; margin:0 0 3mm; }

  table { width:100%; border-collapse:collapse; margin:0 0 3mm; font-size:10.5pt; }
  .pairs td { padding:1.2mm 0; vertical-align:top; border-bottom:1px solid #efece5; }
  .pairs .lhs { width:47%; padding-right:3mm; }
  .pairs .arrow { width:6mm; color:var(--accent); text-align:center; }
  .pairs .rhs { color:var(--key); }
  .readings { font:9.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif; }
  .readings td { padding:1mm 2mm 1mm 0; vertical-align:top; border-bottom:1px solid #efece5; }
  .readings .zone { color:var(--soft); width:24%; }
  .readings .rlabel { width:26%; }
  .readings .rval { font-weight:600; width:22%; }
  .readings .rnote { color:var(--soft); }

  .answer { border-left:3px solid var(--key); background:var(--keybg); padding:2mm 3mm; margin:0 0 3mm; }
  .alabel, .wlabel { display:block; font:600 7.5pt/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif;
                     letter-spacing:.08em; text-transform:uppercase; color:var(--soft); margin-bottom:.8mm; }
  .alabel { color:var(--key); }
  .alabel.keyed { margin:0 0 1.5mm; }
  .why { margin:0 0 3mm; }
  .rebs ul { margin:0; }
  .rebs li { position:relative; padding-left:4mm; margin:0 0 1.2mm; color:var(--soft); font-size:10.5pt; }
  .rebs li::before { content:"✕"; position:absolute; left:0; color:#a8493a; font-size:8.5pt; top:.5mm; }
  .take { margin:2mm 0 0; padding-top:2mm; border-top:1px dotted var(--rule);
          font-size:10pt; font-style:italic; color:var(--soft); }

  @media screen { body { background:#f4f2ec; } .sheet { background:#fff; padding:16mm 14mm;
    margin:8mm auto; box-shadow:0 1px 3px rgba(0,0,0,.12); } }
</style></head><body><div class="sheet">
<h1>${esc(title)}</h1>
${theme.subtitle ? `<p class="sub">${esc(theme.subtitle)}</p>` : ''}
<p class="sub2">Every question in the campaign, with its answer.</p>
<div class="meta">
  <span><b>${content.MISSIONS.length}</b> missions</span>
  <span><b>${stopNo}</b> questions</span>
  <span><b>${callbackTotal}</b> callbacks</span>
  ${Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<span><b>${n}</b> ${k.toLowerCase()}</span>`).join('')}
  ${theme.audience?.grade ? `<span>written for <b>grade ${theme.audience.grade}</b></span>` : ''}
</div>
<p class="lede">The scene is what the player reads before answering. <em>Why</em> and the rebuttals
appear only afterwards, in the verdict — so the answer is never in the scene.</p>
${missions}
</div></body></html>`;

writeFileSync(out, html);
console.log(`${out}: ${content.MISSIONS.length} missions, ${stopNo} questions`);
