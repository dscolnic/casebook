// render.mjs — one print-ready conversion plan per high-school campaign.
//
//   node render.mjs            writes plans/<theme>.html and then PDFs them
//
// Every number here is computed from intel.json. plansData.mjs holds only the
// authored judgement. Slate outcomes are derived by applying the slate to the
// real format mix, so no figure in a PDF is typed by hand.

import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { PLANS, PROTECT_DERIVE } from './plansData.mjs';

const DIR = '/Users/scolnic/code/Nuclear/Alamos/plans';
const INTEL = JSON.parse(fs.readFileSync(`${DIR}/intel.json`, 'utf8'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CORE = ['CHOICE', 'BALLPARK', 'SEQUENCE', 'PROTOCOL', 'TRIAGE', 'CASEBOOK', 'SCIENCETANK', 'DIAGNOSIS'];
const TIER = {
  SELECT: ['CHOICE', 'TRIAGE', 'CASEBOOK', 'SCIENCETANK', 'DIAGNOSIS'],
  CONSTRUCT: ['SEQUENCE', 'PROTOCOL', 'BALLPARK', 'DERIVE', 'CHAIN', 'BALANCE', 'ROUTE', 'ALLOCATE',
    'VALUE', 'ATTEST', 'TRACE', 'TRIGGER', 'DELEGATE', 'PROPAGATE', 'STRESS', 'DEGENERACY',
    'CLOUD', 'RESIDUAL', 'INJECT'],
  OPERATE: ['SWEEP', 'PROBE', 'TALLY', 'HOLDOUT', 'CONTROL', 'VERIFY', 'TRIANGULATE', 'FLY',
    'HOLD', 'TRIAL', 'BELT', 'SPOT', 'LOB', 'STACK'],
};
const TIER_OF = {};
for (const [t, fs_] of Object.entries(TIER)) for (const f of fs_) TIER_OF[f] = t;
// Book filenames do NOT follow from the theme id — three of the sixteen break the
// pattern (deep-watch, project-y, and the_trial which keeps its underscore). A
// guessed path in a work instruction is a wrong command, so they are listed.
const BOOK = {
  contamcity: 'contamcity', redsand: 'redsand', seedbank: 'seedbank',
  outbreak_riverton: 'outbreak-riverton', bring_them_home: 'bring-them-home',
  deepwatch: 'deep-watch', projecty: 'project-y', midway: 'midway',
  groundtruth: 'groundtruth', blackout: 'blackout', aftershock: 'aftershock',
  icecore: 'icecore', planetary_defense: 'planetary-defense', the_trial: 'the_trial',
  headwater: 'headwater', sightline: 'sightline',
};
const esc = (s) => String(s ?? '').replace(/&(?![a-z#]+;)/g, '&amp;').replace(/</g, '&lt;');
const eff = (mix, n) => 1 / Object.values(mix).reduce((a, v) => a + (v / n) ** 2, 0);
const tiersOf = (mix) => {
  const t = { SELECT: 0, CONSTRUCT: 0, OPERATE: 0 };
  for (const [f, c] of Object.entries(mix)) t[TIER_OF[f] ?? 'SELECT'] += c;
  return t;
};

/** Apply a slate to the real mix and report what changes. Throws on a bad target. */
function applySlate(theme, v, items) {
  const mix = { ...v.mix };
  const rows = [];
  for (const [n, to, note, expect] of items) {
    const p = v.pages[n - 1];
    if (!p) throw new Error(`${theme}: slate names stop ${n}, which does not exist (${v.stops} stops)`);
    // A SLATE ROW NAMES A STOP BY NUMBER, AND STOP NUMBERS MOVE.
    //
    // Blackout's sequencing pass swapped two pairs of stops between missions, which
    // renumbered four of them — and three slate rows here went on pointing at the
    // number while meaning the question. Stop 21 had been "the ground is not at one
    // voltage" and became the winter-peak estimate; stop 6, the target of a PROBE
    // conversion, had been rewritten into something else entirely. Every check passed,
    // because a number that exists is a number that resolves. The fourth element pins
    // the row to the title it was written against.
    if (expect && p.title !== expect) {
      throw new Error(`${theme}: slate row ${n} was written against "${expect}" and stop ${n} is now `
        + `"${p.title}" — the stops have been renumbered; re-point the row at the question it means`);
    }
    if (!TIER_OF[to]) throw new Error(`${theme}: slate target "${to}" is not a known format`);
    if (PROTECT_DERIVE.includes(theme) && p.type === 'DERIVE') {
      throw new Error(`${theme}: slate touches stop ${n}, a DERIVE, in a protected game`);
    }
    mix[p.type]--; if (!mix[p.type]) delete mix[p.type];
    mix[to] = (mix[to] || 0) + 1;
    rows.push({ n, day: p.day, group: p.group, from: p.type, to, title: p.title, note });
  }
  return { mix, rows };
}

function slateBlock(theme, v, name, sub, items) {
  const { mix, rows } = applySlate(theme, v, items);
  const before = { choice: v.mix.CHOICE || 0, eff: eff(v.mix, v.stops), t: tiersOf(v.mix) };
  const after = { choice: mix.CHOICE || 0, eff: eff(mix, v.stops), t: tiersOf(mix) };
  const arcade = rows.filter(r => ['BELT', 'TRIAL', 'HOLD', 'SPOT', 'LOB', 'STACK'].includes(r.to)).length;
  const operate = rows.filter(r => TIER_OF[r.to] === 'OPERATE').length;
  return `<div class="slate">
    <div class="sh"><h4>${name}</h4><span class="n2">${items.length} stop${items.length === 1 ? '' : 's'} · ${sub}</span></div>
    <table class="mini"><tbody>${rows.map(r => `<tr>
      <td class="n">${r.n}</td><td class="dy">d${r.day}</td><td class="gp">${esc(r.group)}</td>
      <td class="fm"><span class="was">${r.from}</span> <span class="ar">→</span> <b>${r.to}</b></td>
      <td class="ti">${esc(r.title)}${r.note ? `<span class="nt">${esc(r.note)}</span>` : ''}</td>
    </tr>`).join('')}</tbody></table>
    <div class="out">
      CHOICE <b>${before.choice} → ${after.choice}</b> (${Math.round(100 * after.choice / v.stops)}%) ·
      moves <b>${before.t.SELECT}·${before.t.CONSTRUCT}·${before.t.OPERATE} → ${after.t.SELECT}·${after.t.CONSTRUCT}·${after.t.OPERATE}</b> ·
      effective formats <b>${before.eff.toFixed(1)} → ${after.eff.toFixed(1)}</b>${operate ? ` · <b>${operate}</b> new operate stop${operate === 1 ? '' : 's'}` : ''}${arcade ? `, ${arcade} of them arcade` : ''}
    </div>
  </div>`;
}

const VERDICT = { s: ['strong', 'v-s'], m: ['medium', 'v-m'], d: ['defer', 'v-d'], r: ['reject', 'v-r'] };

function page(theme, v, plan) {
  const gaps = v.gaps;
  const suspect = gaps.filter(g => g.onInstrument).length;
  const real = gaps.length - suspect;
  const mixRows = Object.entries(v.mix).sort((a, b) => b[1] - a[1]);
  const t = v.tiers;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(v.title)} — Conversion Plan</title>
<style>
  @page { size: A4; margin: 15mm 14mm 16mm; }
  :root {
    --ink:#15171a; --ink2:#4c5158; --muted:#868b92; --rule:#dcded9; --sunk:#f2f3ef;
    --acc:${plan.accentInk || 'ACCENT'}; --acc-soft:${v.accent};
    --s:#2c7a4b; --m:#9a6f14; --d:#767b70; --r:#a4453a;
  }
  * { box-sizing:border-box; }
  body { margin:0; color:var(--ink); background:#fff;
    font-family:system-ui,-apple-system,"Segoe UI",sans-serif; font-size:9.6pt; line-height:1.5; }
  .mono,.k,code { font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; }
  code,.k { font-size:.9em; background:var(--sunk); padding:0 3px; border-radius:2px; }
  em { font-style:normal; font-weight:640; }
  strong { font-weight:680; }

  header { border-bottom:2.5pt solid var(--acc); padding-bottom:7pt; margin-bottom:12pt; }
  .eyebrow { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; letter-spacing:.16em;
    text-transform:uppercase; color:var(--acc); }
  h1 { margin:2pt 0 3pt; font-size:24pt; line-height:1.02; letter-spacing:-.02em; font-weight:660; }
  .sub { color:var(--ink2); font-size:9.6pt; max-width:150mm; }
  .place { color:var(--muted); font-size:8.4pt; font-style:italic; margin-top:2pt; }

  .facts { display:flex; gap:0; border:.6pt solid var(--rule); margin-top:8pt; }
  .fact { flex:1; padding:4pt 7pt 5pt; border-right:.6pt solid var(--rule); }
  .fact:last-child { border-right:none; }
  .fact b { display:block; font-family:ui-monospace,Menlo,monospace; font-size:14pt; font-weight:640; letter-spacing:-.02em; }
  .fact span { font-family:ui-monospace,Menlo,monospace; font-size:6.2pt; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted); }

  h2 { font-size:12pt; margin:15pt 0 4pt; font-weight:660; letter-spacing:-.01em;
    border-bottom:.6pt solid var(--ink); padding-bottom:3pt; break-after:avoid; }
  h2 .ph { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; letter-spacing:.14em;
    text-transform:uppercase; color:var(--acc); margin-right:6pt; }
  p { margin:6pt 0; max-width:170mm; }

  table { border-collapse:collapse; width:100%; font-size:8.4pt; margin:6pt 0; }
  th,td { text-align:left; padding:3pt 6pt 3pt 0; border-bottom:.5pt solid var(--rule); vertical-align:top; }
  thead th { font-family:ui-monospace,Menlo,monospace; font-size:6.4pt; letter-spacing:.08em;
    text-transform:uppercase; color:var(--muted); font-weight:500; border-bottom:.7pt solid var(--ink); }
  td.n,th.n { text-align:right; padding-right:8pt; font-variant-numeric:tabular-nums; white-space:nowrap; }
  .flag { font-family:ui-monospace,Menlo,monospace; font-size:6.4pt; letter-spacing:.06em;
    border:.5pt solid currentColor; padding:0 3pt; border-radius:2pt; white-space:nowrap; }
  .flag.sus { color:var(--m); } .flag.real { color:var(--r); }

  .mixbar { display:flex; height:9pt; border:.6pt solid var(--rule); margin:5pt 0 3pt; }
  .mixbar i { display:block; }
  .mixkey { font-family:ui-monospace,Menlo,monospace; font-size:6.6pt; color:var(--ink2);
    display:flex; flex-wrap:wrap; gap:2pt 9pt; }

  .callout { border-left:2pt solid var(--acc); background:var(--sunk); padding:6pt 9pt; margin:8pt 0;
    break-inside:avoid; }
  .callout p { margin:3pt 0; }
  .callout .tag { font-family:ui-monospace,Menlo,monospace; font-size:6.4pt; letter-spacing:.12em;
    text-transform:uppercase; color:var(--acc); display:block; margin-bottom:3pt; }
  .callout.warn { border-left-color:var(--r); }
  .callout.warn .tag { color:var(--r); }

  .card { border-left:2pt solid var(--d); padding:5pt 0 6pt 8pt; margin:7pt 0; break-inside:avoid; }
  .card.v-s { border-left-color:var(--s); } .card.v-m { border-left-color:var(--m); }
  .card.v-d { border-left-color:var(--d); } .card.v-r { border-left-color:var(--r); }
  .card .top { display:flex; align-items:baseline; gap:7pt; }
  .card h4 { margin:0; font-family:ui-monospace,Menlo,monospace; font-size:9.6pt; font-weight:660; letter-spacing:.03em; }
  .vd { font-family:ui-monospace,Menlo,monospace; font-size:6.2pt; letter-spacing:.12em;
    text-transform:uppercase; border:.5pt solid currentColor; padding:0 3pt; border-radius:2pt; }
  .v-s .vd { color:var(--s); } .v-m .vd { color:var(--m); }
  .v-d .vd { color:var(--d); } .v-r .vd { color:var(--r); }
  .card .at { margin-left:auto; color:var(--muted); font-size:7.4pt; }
  .card p { margin:3pt 0 0; font-size:9pt; }
  .card dl { margin:3pt 0 0; font-size:8pt; color:var(--ink2); }
  .card dt { font-family:ui-monospace,Menlo,monospace; font-size:6.2pt; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted); display:inline; }
  .card dd { display:inline; margin:0; }
  .card dd::after { content:""; display:block; }

  .slate { border:.6pt solid var(--rule); padding:6pt 8pt 7pt; margin:7pt 0; break-inside:avoid; }
  .slate .sh { display:flex; align-items:baseline; gap:8pt; border-bottom:.6pt solid var(--rule); padding-bottom:3pt; }
  .slate h4 { margin:0; font-size:10.5pt; font-weight:660; }
  .slate .n2 { font-family:ui-monospace,Menlo,monospace; font-size:6.6pt; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted); }
  table.mini { font-size:8pt; margin:4pt 0 5pt; }
  table.mini td { border-bottom:.4pt solid var(--sunk); padding:2pt 6pt 2pt 0; }
  table.mini .dy,.gp { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; color:var(--muted); white-space:nowrap; }
  table.mini .fm { font-family:ui-monospace,Menlo,monospace; font-size:7.2pt; white-space:nowrap; }
  table.mini .was { color:var(--muted); } .ar { color:var(--muted); }
  table.mini .ti { color:var(--ink2); }
  table.mini .nt { display:block; color:var(--muted); font-size:7.2pt; }
  .out { border-top:.6pt solid var(--rule); padding-top:4pt; font-size:7.8pt; color:var(--ink2); }
  .out b { color:var(--ink); font-variant-numeric:tabular-nums; }

  footer { margin-top:14pt; padding-top:5pt; border-top:.6pt solid var(--rule);
    color:var(--muted); font-size:7pt; }
  .avoid { break-inside:avoid; }
</style></head><body>

<header>
  <div class="eyebrow">Alamos · conversion plan · ${esc(v.field)} · grade 9–12</div>
  <h1>${esc(v.title)}</h1>
  <div class="sub">${esc(v.course)}</div>
  <div class="place">${esc(v.place)}</div>
  <div class="facts">
    <div class="fact"><b>${v.stops}</b><span>stops</span></div>
    <div class="fact"><b>${v.mix.CHOICE || 0}</b><span>choice (${Math.round(100 * (v.mix.CHOICE || 0) / v.stops)}%)</span></div>
    <div class="fact"><b>${v.eff}</b><span>effective formats</span></div>
    <div class="fact"><b>${v.computed}/${v.equations}</b><span>equations computed</span></div>
    <div class="fact"><b>${v.selectOnly.length}</b><span>select-only concepts</span></div>
    <div class="fact"><b>${t.SELECT}·${t.CONSTRUCT}·${t.OPERATE}</b><span>select·construct·operate</span></div>
  </div>
</header>

<h2><span class="ph">Reading</span>Where this campaign stands</h2>
<p>${plan.reading}</p>
${plan.protect ? `<div class="callout warn"><span class="tag">Protected — do not convert</span><p>${plan.protect}</p></div>` : ''}

<div class="avoid">
<h2><span class="ph">Now</span>The mix as it ships</h2>
<div class="mixbar">${mixRows.map(([f, c]) =>
    `<i style="flex:${c};background:${f === 'CHOICE' ? '#c9ccc4' : CORE.includes(f) ? '#e2e4de' : v.accent}"></i>`).join('')}</div>
<div class="mixkey">${mixRows.map(([f, c]) => `<span>${f} ${c}</span>`).join('')}</div>
</div>

<h2><span class="ph">Curriculum</span>What the syllabus is not getting</h2>
${gaps.length ? `<table><thead><tr><th>Equation the course owes</th><th>What it carries</th><th>Mentioned at</th><th class="n">Status</th></tr></thead><tbody>
${gaps.map(g => `<tr>
  <td class="k">${esc(g.e)}</td><td>${esc(g.c)}</td>
  <td class="mono" style="font-size:7.2pt;color:var(--ink2)">${g.at.length ? g.at.slice(0, 5).map(a => `${a.n}·${a.type}`).join('  ') : '— no stop at all'}</td>
  <td class="n"><span class="flag ${g.onInstrument ? 'sus' : 'real'}">${g.onInstrument ? 'verify first' : 'real gap'}</span></td>
</tr>`).join('')}</tbody></table>
<p style="font-size:8.4pt;color:var(--ink2)">${suspect} of ${gaps.length} sit on an instrument stop, whose
board arithmetic the coverage check cannot yet read — expect Phase 0 to clear those. <strong>${real}</strong>
${real === 1 ? 'is' : 'are'} unaffected by it.</p>`
    : `<p><strong>No equation debt.</strong> Every equation the syllabus lists is computed by a question
       somewhere in the campaign.</p>`}

${v.selectOnly.length ? `<div class="avoid">
<h2><span class="ph">Tier</span>Concepts the player only ever picks from a list</h2>
<table><thead><tr><th class="n">#</th><th>Mechanism concept</th><th class="n">Stops</th></tr></thead><tbody>
${v.selectOnly.map(c => `<tr><td class="n">${c.n}</td><td>${esc(c.c)}</td>
  <td class="n mono" style="font-size:7.2pt;color:var(--muted)">${c.stops.join(', ')}</td></tr>`).join('')}
</tbody></table>
<p style="font-size:8.4pt;color:var(--ink2)">Reported, never failed. Select-tier can be exactly right;
these are the candidates, not the defects.${v.absent.length ? ` The syllabus also lists
${v.absent.length} concept${v.absent.length === 1 ? '' : 's'} no stop touches at all —
${v.absent.map(a => `<em>${esc(a.c)}</em>`).join('; ')} — which is expected, and is a different
conversation from this one.` : ''}</p></div>` : `<div class="avoid">
<h2><span class="ph">Tier</span>Concepts the player only ever picks from a list</h2>
<p><strong>None.</strong> Every mechanism concept this campaign touches is reached at least once by a
stop that makes the player build or operate something.</p></div>`}

<h2><span class="ph">Fun</span>What this subject and this place can carry</h2>
${plan.fun.map(f => `<div class="card ${VERDICT[f.v][1]}">
  <div class="top"><h4>${f.f}</h4><span class="vd">${VERDICT[f.v][0]}</span><span class="at">${esc(f.at)}</span></div>
  <p>${f.arg}</p>
  ${f.serves ? `<dl><dt>serves</dt> <dd>${f.serves}</dd></dl>` : ''}
  ${f.needs ? `<dl><dt>needs</dt> <dd>${f.needs}</dd></dl>` : ''}
  ${f.risk ? `<dl><dt>risk</dt> <dd>${f.risk}</dd></dl>` : ''}
</div>`).join('')}

<h2><span class="ph">Slates</span>Three appetites — the campaign is zero-sum</h2>
<p style="font-size:8.8pt">No conversion adds a stop. Each changes what an existing stop <em>does</em>
while leaving what it <em>teaches</em> alone. Snapshot before, diff after:
<code>curriculumDelivery.mjs ${theme} --snapshot before.json</code>, then <code>--against before.json</code>.</p>
${slateBlock(theme, v, 'Minimum honest', 'one sitting', plan.slates.min)}
${slateBlock(theme, v, 'Balanced', 'the recommendation', plan.slates.bal)}
${slateBlock(theme, v, 'Ambitious', 'adds world work', plan.slates.amb)}

<div class="callout"><span class="tag">The order of work</span>
<p><strong>1.</strong> Phase 0 — teach the coverage check to read an instrument’s own board, and
re-baseline <code>curriculum-debt.json</code>. Rewriting a stop that already teaches the thing is the
exact failure the check exists to prevent.
<strong>2.</strong> Snapshot. <strong>3.</strong> Edit the book, never the generated content —
<code>tools/import-book.mjs books/${BOOK[theme]}.yml ${theme} --verify</code>.
<strong>4.</strong> <code>npm run traps</code>: every instrument’s trap must fire.
<strong>5.</strong> <code>npm run check ${theme}</code> and <code>npm run drive ${theme}</code>, right
answer and wrong — ask what a player who understood nothing would score before believing any pass mark.
<strong>6.</strong> <code>--against</code> the snapshot. A changed format is reported; a changed
objective fails.</p></div>

<footer>
  Counts computed from <code>themes/${theme}/content/</code> via <code>engine/dev/curriculumDelivery.mjs</code>;
  concept and equation lists authored in <code>tools/syllabus.js</code>. Format verdicts and slates are
  editorial. Run it with <code>THEME=${theme} npm run dev</code>.
</footer>
</body></html>`;
}

// ---- accent contrast: darken the catalogue accent for ink use on white
function darken(hex, f = 0.62) {
  const m = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(m.slice(i, i + 2), 16));
  return '#' + [r, g, b].map(c => Math.round(c * f).toString(16).padStart(2, '0')).join('');
}

fs.mkdirSync(DIR, { recursive: true });
const made = [];
for (const [theme, plan] of Object.entries(PLANS)) {
  const v = INTEL[theme];
  if (!v) throw new Error(`no intel for ${theme}`);
  plan.accentInk = darken(v.accent);
  const html = page(theme, v, plan);
  fs.writeFileSync(`${DIR}/${theme}.html`, html);
  made.push(theme);
}
console.log(`html: ${made.length} plan(s)`);

for (const theme of made) {
  execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${DIR}/${theme}.pdf`, `file://${DIR}/${theme}.html`],
    { stdio: 'ignore' });
  const kb = Math.round(fs.statSync(`${DIR}/${theme}.pdf`).size / 1024);
  console.log(`  ${theme.padEnd(20)} ${String(kb).padStart(4)} KB`);
}
