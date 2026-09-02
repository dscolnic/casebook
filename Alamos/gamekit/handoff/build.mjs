import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CAMPAIGNS, GATES, BANDS } from './data.mjs';

const BAND_ORDER = ['mechanical', 'prose', 'curriculum'];

const esc = (s) => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Findings and gate copy carry deliberate inline markup, so they pass through.
const raw = (s) => String(s);

function page(c) {
  const byBand = {};
  for (const g of c.gates) {
    const band = GATES[g.gate].band;
    (byBand[band] ??= []).push(g);
  }
  for (const b of Object.keys(byBand)) byBand[b].sort((x, y) => y.count - x.count);

  const totalFindings = c.gates.reduce((n, g) => n + g.count, 0);
  // Two descriptions of one number drift the first time either is corrected, so the
  // summary tiles for "Gates failing" and "Findings" are derived here rather than
  // typed into the data.
  const numbers = c.numbers.map((n) => n.k === 'Findings' ? { ...n, v: String(totalFindings) }
    : n.k === 'Gates failing' ? { ...n, v: String(c.gates.length) } : n);

  // "Where to start" is derived, not written: the mechanical band first, then
  // whatever single finding closes two gates at once, then the biggest prose debt.
  const starts = [];
  const mech = byBand.mechanical ?? [];
  if (mech.length) {
    starts.push(`<strong>${mech.length} mechanical gate${mech.length === 1 ? '' : 's'}</strong> — `
      + mech.map((g) => `<code>${GATES[g.gate].name}</code>`).join(', ')
      + '. Glossary lines, captions and stale debt entries. No judgement calls.');
  }
  const stale = c.gates.flatMap((g) => g.findings.filter((f) => /STALE DEBT|delete/i.test(f)));
  if (stale.length) {
    starts.push(`<strong>${stale.length} stale debt line${stale.length === 1 ? '' : 's'}</strong> — `
      + 'a recorded gap that has since been closed fails the same gate as a new one. Deleting the '
      + 'line is the whole fix.');
  }
  const cur = byBand.curriculum ?? [];
  if (cur.length) {
    starts.push('<strong>The curriculum band next</strong> — every question stays where it is; '
      + 'what moves is the order concepts are claimed in, or a <code>takesAsRead:</code> line.');
  }
  starts.push('<strong>The prose band last, and card by card.</strong> Read '
    + '<code>alamos-accessibility</code> first — the seven defects to find in a card before '
    + 'touching its reading level, and the rule that the official term stays and gets glossed.');

  const bandSection = (band) => {
    const gates = byBand[band];
    if (!gates?.length) return '';
    const B = BANDS[band];
    return `
      <section class="band band--${band}" aria-labelledby="band-${band}">
        <header class="band__head">
          <h2 id="band-${band}">${B.label}</h2>
          <p>${raw(B.blurb)}</p>
        </header>
        <div class="gates">
          ${gates.map((g) => gateBlock(g, band)).join('')}
        </div>
      </section>`;
  };

  const gateBlock = (g, band) => {
    const G = GATES[g.gate];
    return `
      <article class="gate">
        <header class="gate__head">
          <h3><code>${G.name}</code></h3>
          <span class="tally">${g.count} finding${g.count === 1 ? '' : 's'}</span>
        </header>
        <div class="gate__def">
          <div><span class="lbl">What it checks</span><p>${raw(G.what)}</p></div>
          <div><span class="lbl">Why it exists</span><p>${raw(G.why)}</p></div>
        </div>
        <div class="gate__owed">
          <span class="lbl">What ${c.title} owes it</span>
          <ul>${g.findings.map((f) => `<li>${raw(f)}</li>`).join('')}</ul>
        </div>
        ${g.note ? `<p class="note"><span>Read this first</span>${raw(g.note)}</p>` : ''}
      </article>`;
  };

  return `<title>${esc(c.title)} Gate Handoff</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root {
    --ground: #eef1f4;
    --panel: #ffffff;
    --panel-2: #f7f9fb;
    --ink: #11151a;
    --ink-2: #39434d;
    --muted: #5f6b76;
    --rule: #d9e0e6;
    --rule-2: #eaeff3;
    --accent: #16697a;
    --mechanical: #22705a;
    --prose: #9a4f1c;
    --curriculum: #2b5f9c;
    --serif: 'Zilla Slab', 'Bitter', Georgia, serif;
    --sans: 'Source Sans 3', 'Segoe UI', system-ui, sans-serif;
    --mono: 'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground: #0f1216;
      --panel: #171b21;
      --panel-2: #1d222a;
      --ink: #e8ebee;
      --ink-2: #bcc5ce;
      --muted: #8d99a4;
      --rule: #262d36;
      --rule-2: #202730;
      --accent: #5fb3c4;
      --mechanical: #62b799;
      --prose: #d9925c;
      --curriculum: #7fb0e0;
    }
  }
  :root[data-theme="dark"] {
    --ground: #0f1216;
    --panel: #171b21;
    --panel-2: #1d222a;
    --ink: #e8ebee;
    --ink-2: #bcc5ce;
    --muted: #8d99a4;
    --rule: #262d36;
    --rule-2: #202730;
    --accent: #5fb3c4;
    --mechanical: #62b799;
    --prose: #d9925c;
    --curriculum: #7fb0e0;
  }

  * { box-sizing: border-box; }
  body {
    background: var(--ground);
    color: var(--ink);
    font: 400 17px/1.6 var(--sans);
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 62rem; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
  code { font: 500 0.9em/1.4 var(--mono); }
  a { color: var(--accent); }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  /* ——— masthead ——— */
  .mast { border-bottom: 2px solid var(--ink); padding-bottom: 1.75rem; }
  .eyebrow {
    font: 500 0.8rem/1 var(--mono);
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--accent);
    display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: baseline;
  }
  .eyebrow span:not(:first-child)::before { content: '·'; margin-right: 1rem; color: var(--muted); }
  h1 {
    font: 700 clamp(2.4rem, 6vw, 3.6rem)/1.02 var(--serif);
    letter-spacing: -0.015em;
    margin: 0.7rem 0 0.35rem;
    text-wrap: balance;
  }
  .sub { font: 400 1.05rem/1.45 var(--sans); color: var(--muted); margin: 0; }
  .sub em { font-style: italic; color: var(--ink-2); }
  .lede { font: 400 1.16rem/1.62 var(--sans); color: var(--ink-2); max-width: 44rem; margin: 1.5rem 0 0; }

  /* ——— the four figures ——— */
  .figures {
    display: grid; gap: 1px; margin: 2rem 0 0;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    background: var(--rule); border: 1px solid var(--rule);
  }
  .fig { background: var(--panel); padding: 1rem 1.1rem 1.05rem; }
  .fig b {
    display: block; font: 600 2rem/1 var(--serif);
    font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
  }
  .fig span {
    display: block; margin-top: 0.4rem; color: var(--muted);
    font: 400 0.82rem/1.3 var(--sans); text-transform: uppercase; letter-spacing: 0.05em;
  }

  /* ——— where to start ——— */
  .start { margin: 3rem 0 0; }
  .start h2, .band__head h2, .colophon h2 {
    font: 600 0.86rem/1 var(--mono);
    letter-spacing: 0.11em; text-transform: uppercase;
    color: var(--muted); margin: 0 0 1rem;
  }
  .start ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.85rem; }
  .start li {
    display: grid; grid-template-columns: 1.6rem 1fr; gap: 0.9rem;
    color: var(--ink-2); font-size: 1.02rem;
  }
  .start li::before {
    content: '→'; color: var(--accent); font: 500 1rem/1.6 var(--mono);
  }
  .start strong { color: var(--ink); font-weight: 600; }

  /* ——— bands ——— */
  .band { margin: 3.5rem 0 0; }
  .band__head { border-top: 1px solid var(--rule); padding-top: 1.5rem; }
  .band__head h2 { color: var(--band); }
  .band--mechanical { --band: var(--mechanical); }
  .band--prose { --band: var(--prose); }
  .band--curriculum { --band: var(--curriculum); }
  .band__head p { margin: 0 0 1.75rem; color: var(--muted); max-width: 44rem; font-size: 1rem; }
  .gates { display: grid; gap: 1.25rem; }

  .gate {
    background: var(--panel);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--band);
    padding: 1.35rem 1.5rem 1.5rem;
  }
  .gate__head {
    display: flex; flex-wrap: wrap; gap: 0.75rem 1rem;
    align-items: baseline; justify-content: space-between;
    padding-bottom: 0.9rem; border-bottom: 1px solid var(--rule-2);
  }
  .gate__head h3 { margin: 0; font-size: 1rem; }
  .gate__head code { font-weight: 500; font-size: 1.02rem; color: var(--ink); }
  .tally {
    font: 500 0.78rem/1 var(--mono); letter-spacing: 0.04em;
    color: var(--band); white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .gate__def {
    display: grid; gap: 1.1rem 2rem; margin: 1.1rem 0 1.35rem;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  }
  .gate__def p { margin: 0.3rem 0 0; color: var(--muted); font-size: 0.97rem; line-height: 1.55; }
  .lbl {
    font: 500 0.72rem/1 var(--mono); letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--band);
  }
  .gate__owed ul { margin: 0.6rem 0 0; padding: 0 0 0 1.1rem; display: grid; gap: 0.5rem; }
  .gate__owed li { color: var(--ink-2); font-size: 0.99rem; line-height: 1.55; }
  .gate__owed li::marker { color: var(--rule); }
  .note {
    margin: 1.25rem 0 0; padding: 0.85rem 1rem;
    background: var(--panel-2); border-left: 2px solid var(--band);
    font-size: 0.96rem; line-height: 1.55; color: var(--ink-2);
  }
  .note span {
    display: block; font: 500 0.7rem/1 var(--mono);
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--band); margin-bottom: 0.45rem;
  }

  /* ——— colophon ——— */
  .colophon { margin: 4rem 0 0; border-top: 2px solid var(--ink); padding-top: 1.5rem; }
  .colophon p { color: var(--muted); font-size: 0.96rem; max-width: 44rem; }
  .colophon pre {
    overflow-x: auto; background: var(--panel); border: 1px solid var(--rule);
    padding: 0.9rem 1rem; font: 400 0.85rem/1.7 var(--mono); color: var(--ink-2); margin: 1.1rem 0;
  }
  .colophon ul { color: var(--muted); font-size: 0.96rem; padding-left: 1.1rem; }
  .colophon li { margin-bottom: 0.4rem; }

  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>

<div class="wrap">
  <header class="mast">
    <p class="eyebrow">
      <span>THEME=${esc(c.id)}</span><span>${esc(c.stops)} stops · 15 ${esc(c.dayNoun)}</span><span>builds ${esc(c.delivery)}</span>${c.landed ? `<span>re-landed from ${esc(c.landed)}/</span>` : ''}
    </p>
    <h1>${esc(c.title)}</h1>
    <p class="sub">${raw(c.course)} · <em>${raw(c.place)}</em></p>
    <p class="lede">${raw(c.lede)}</p>
    <div class="figures">
      ${numbers.map((n) => `<div class="fig"><b>${esc(n.v)}</b><span>${esc(n.k)}</span></div>`).join('')}
    </div>
  </header>

  <section class="start" aria-labelledby="start">
    <h2 id="start">Where to start</h2>
    <ol>${starts.map((s) => `<li><span>${raw(s)}</span></li>`).join('')}</ol>
  </section>

  ${BAND_ORDER.map(bandSection).join('')}

  <section class="colophon" aria-labelledby="colophon">
    <h2 id="colophon">How these numbers were produced</h2>
    <p>Every count and every quoted line above is the gate’s own output, run against the shipped
      content of <code>${esc(c.id)}</code> on 1 September 2026, on branch
      <code>deep-watch-integration</code> after the second revised bundle landed. Reproduce any block
      with the gate named in it:</p>
    <pre>cd gamekit
node engine/dev/checkStory.mjs ${esc(c.id)}
node engine/dev/plainCards.mjs ${esc(c.id)}
node engine/dev/conceptOrder.mjs ${esc(c.id)}
npm run check ${esc(c.id)}          # all of them, this campaign only</pre>
    <p>${esc(totalFindings)} findings across ${esc(c.gates.length)} failing gates. Nothing here is
      structural: <code>${esc(c.id)}</code> passes <code>bookParity</code> — its book regenerates every
      content file it ships — and <code>smokeCampaign</code> plays it end to end with every stop
      gradeable. The revised copy was landed under instruction to overrule content gates, so this
      document is the record of what that instruction bought, not an argument against it.</p>
    <h2 style="margin-top:2.25rem">What the importer refused, and what was changed to get past it</h2>
    <p>None of these are content gates — the importer writes nothing at all while any of them
      stands, so the campaign could not ship until each was resolved. They are listed here because
      the same class has blocked every bundle so far, and an author regenerating this book from the
      same source will reintroduce them unless they are fixed upstream. The full catalogue, with
      the rule behind each, is in <strong>Bundle Pre-Flight</strong>.</p>
    <ul>${(c.importerFixes ?? ['None recorded for this campaign.']).map((f) => `<li>${raw(f)}</li>`).join('')}</ul>
    <h2 style="margin-top:2.25rem">What changed under these numbers</h2>
    <ul>
      <li>The book and <code>theme.js</code> were replaced from the revised bundle and every content
        file regenerated by <code>tools/import-book.mjs</code>.</li>
      <li>The opening card now has a five-sentence cap in <code>checkStory</code>, counted by the same
        splitter as the day blurb’s four-sentence cap — one function in
        <code>engine/dev/dayCard.mjs</code>, with a selftest that fails if the two ever disagree. The
        48 campaigns whose openings predate the cap are recorded in
        <code>engine/dev/openinglength-debt.json</code>.</li>
      <li>Where this campaign’s opening ran long it was cut to five sentences. That trade is visible in
        <code>plainCards</code>: fewer sentences carrying the same four beats means longer sentences,
        so the reading grade moved up slightly on some cards. The cap and the reading level pull
        against each other and both numbers are above.</li>
    </ul>
  </section>
</div>
`;
}

// Two outputs, because they are read in two places.
//
//   node build.mjs                     the artifact bodies, published as-is — no
//                                      <html>/<head>, because the Artifact publisher
//                                      wraps them and rejects a second skeleton.
//   node build.mjs --standalone <dir>  the same pages as complete documents, for
//                                      opening off the filesystem or mailing on.
//
// The wrapper below is the skeleton the publisher adds, so a saved copy renders the
// way the published one does rather than relying on a browser's error recovery.
const SKELETON = (body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
${body}</head>
<body></body>
</html>
`;

const args = process.argv.slice(2);
const outFlag = args.indexOf('--standalone');
const outDir = outFlag >= 0 ? args[outFlag + 1] : null;

for (const c of CAMPAIGNS) {
  const body = page(c);
  const findings = c.gates.reduce((n, g) => n + g.count, 0);
  if (outDir) {
    writeFileSync(resolve(outDir, `${c.id}-handoff.html`), SKELETON(body));
  } else {
    writeFileSync(new URL(`./${c.id}-handoff.html`, import.meta.url), body);
  }
  console.log('wrote', c.id, '—', findings, 'findings');
}
