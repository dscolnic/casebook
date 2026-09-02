// The eleven handoff documents for the first revised bundle. Same visual system as
// the nine, different subject: these campaigns fail nothing, so the page is about
// what the ratchet is holding them to rather than what it caught.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const { FILES, NUMBERS, rows } = JSON.parse(
  readFileSync(new URL('./eleven.json', import.meta.url), 'utf8'));

const esc = (s) => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const raw = (s) => String(s);
const num = (v) => (typeof v === 'number' ? String(v) : esc(v));

const BANDS = {
  numbers: {
    label: 'Gated numbers',
    blurb: 'Not a list of days — a high-water mark per measurement. These are the only gates on this '
      + 'campaign that can actually fail, and they fail on the number moving the wrong way.',
  },
  daycards: {
    label: 'Banked day cards',
    blurb: 'Each named day owes one specific line. A day not on its list fails immediately if it '
      + 'regresses; a day on the list that now passes <em>also</em> fails, naming the line to delete '
      + '— so the file shrinks or it complains.',
  },
  closing: {
    label: 'Banked closing cards',
    blurb: 'The card between one day and the next. Two rules, and both are about whether the day '
      + 'lands: does it turn, and can a reader get through it.',
  },
};
const BAND_ORDER = ['numbers', 'daycards', 'closing'];

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

function page(c) {
  const listFiles = Object.entries(FILES).filter(([f]) => c.files[f]);
  const byBand = {};
  for (const [f, meta] of listFiles) (byBand[meta.band] ??= []).push([f, meta]);
  for (const b of Object.keys(byBand)) byBand[b].sort((x, y) => c.files[y[0]].length - c.files[x[0]].length);

  const totalBanked = listFiles.reduce((n, [f]) => n + c.files[f].length, 0);
  const pc = c.files['plaincards-debt.json'];
  const pq = c.files['plainquestions-debt.json'];

  const numberBlock = (file) => {
    const spec = NUMBERS[file];
    const v = c.files[file];
    if (!v) return '';
    return `
      <article class="gate">
        <header class="gate__head">
          <h3><code>${spec.label}</code></h3>
          <span class="tally">${Object.keys(v).length} banked figure${Object.keys(v).length === 1 ? '' : 's'}</span>
        </header>
        <table class="marks">
          <thead><tr><th scope="col">Measurement</th><th scope="col">Banked at</th><th scope="col">Status</th></tr></thead>
          <tbody>
            ${spec.keys.filter(([k]) => v[k] !== undefined).map(([k, label, note]) => `
              <tr>
                <td>${esc(label)} <code>${esc(k)}</code></td>
                <td class="figure">${num(v[k])}</td>
                <td class="${/GATED/.test(note) ? 'is-gated' : 'is-reported'}">${esc(note || '—')}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <p class="note"><span>How it fails</span>${raw(spec.rule)}</p>
      </article>`;
  };

  const listBlock = ([file, meta]) => {
    const days = c.files[file];
    return `
      <article class="gate">
        <header class="gate__head">
          <h3><code>${esc(meta.label)}</code> <span class="via">via ${esc(meta.gate)}</span></h3>
          <span class="tally">${days.length} ${esc(meta.owed)}</span>
        </header>
        <div class="gate__def">
          <div><span class="lbl">The rule</span><p>${raw(meta.what)}</p></div>
        </div>
        <div class="gate__owed">
          <span class="lbl">Banked</span>
          <ul class="days">${days.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        </div>
      </article>`;
  };

  const bandSection = (band) => {
    if (band === 'numbers') {
      if (!pc && !pq) return '';
      return `
      <section class="band band--numbers" aria-labelledby="band-numbers">
        <header class="band__head"><h2 id="band-numbers">${BANDS.numbers.label}</h2>
          <p>${raw(BANDS.numbers.blurb)}</p></header>
        <div class="gates">${numberBlock('plaincards-debt.json')}${numberBlock('plainquestions-debt.json')}</div>
      </section>`;
    }
    const gs = byBand[band];
    if (!gs?.length) return '';
    return `
      <section class="band band--${band}" aria-labelledby="band-${band}">
        <header class="band__head"><h2 id="band-${band}">${BANDS[band].label}</h2>
          <p>${raw(BANDS[band].blurb)}</p></header>
        <div class="gates">${gs.map(listBlock).join('')}</div>
      </section>`;
  };

  const figures = [
    { k: 'Gates failing', v: '0' },
    { k: 'Banked debt lines', v: String(totalBanked) },
    ...(pc ? [{ k: 'Cards over 6.5, banked', v: `${pc.over} / 16` }] : []),
    ...(pq ? [{ k: 'Question grade, banked', v: String(pq.grade) }] : []),
  ];

  const body = `<title>${esc(c.title)} Debt Handoff</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root {
    --ground: #eef1f4; --panel: #ffffff; --panel-2: #f7f9fb;
    --ink: #11151a; --ink-2: #39434d; --muted: #5f6b76;
    --rule: #d9e0e6; --rule-2: #eaeff3;
    --accent: #16697a;
    --numbers: #7a3f6d; --daycards: #2b5f9c; --closing: #22705a;
    --gated: #9a4f1c;
    --serif: 'Zilla Slab', 'Bitter', Georgia, serif;
    --sans: 'Source Sans 3', 'Segoe UI', system-ui, sans-serif;
    --mono: 'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground: #0f1216; --panel: #171b21; --panel-2: #1d222a;
      --ink: #e8ebee; --ink-2: #bcc5ce; --muted: #8d99a4;
      --rule: #262d36; --rule-2: #202730;
      --accent: #5fb3c4;
      --numbers: #c98cba; --daycards: #7fb0e0; --closing: #62b799;
      --gated: #d9925c;
    }
  }
  :root[data-theme="dark"] {
    --ground: #0f1216; --panel: #171b21; --panel-2: #1d222a;
    --ink: #e8ebee; --ink-2: #bcc5ce; --muted: #8d99a4;
    --rule: #262d36; --rule-2: #202730;
    --accent: #5fb3c4;
    --numbers: #c98cba; --daycards: #7fb0e0; --closing: #62b799;
    --gated: #d9925c;
  }

  * { box-sizing: border-box; }
  body { background: var(--ground); color: var(--ink); font: 400 17px/1.6 var(--sans); margin: 0;
    -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 62rem; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
  code { font: 500 0.9em/1.4 var(--mono); }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .mast { border-bottom: 2px solid var(--ink); padding-bottom: 1.75rem; }
  .eyebrow { font: 500 0.8rem/1 var(--mono); letter-spacing: 0.09em; text-transform: uppercase;
    color: var(--accent); display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: baseline; }
  .eyebrow span:not(:first-child)::before { content: '·'; margin-right: 1rem; color: var(--muted); }
  h1 { font: 700 clamp(2.4rem, 6vw, 3.6rem)/1.02 var(--serif); letter-spacing: -0.015em;
    margin: 0.7rem 0 0.35rem; text-wrap: balance; }
  .sub { font: 400 1.05rem/1.45 var(--sans); color: var(--muted); margin: 0; }
  .sub em { font-style: italic; color: var(--ink-2); }

  .clear {
    margin: 1.6rem 0 0; padding: 1.1rem 1.25rem; background: var(--panel);
    border: 1px solid var(--rule); border-left: 3px solid var(--closing);
    max-width: 46rem;
  }
  .clear b { display: block; font: 600 1.05rem/1.35 var(--serif); margin-bottom: 0.4rem; }
  .clear p { margin: 0; color: var(--ink-2); font-size: 1rem; line-height: 1.6; }
  .clear p + p { margin-top: 0.7rem; }

  .figures { display: grid; gap: 1px; margin: 2rem 0 0;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    background: var(--rule); border: 1px solid var(--rule); }
  .fig { background: var(--panel); padding: 1rem 1.1rem 1.05rem; }
  .fig b { display: block; font: 600 2rem/1 var(--serif); font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em; }
  .fig span { display: block; margin-top: 0.4rem; color: var(--muted);
    font: 400 0.82rem/1.3 var(--sans); text-transform: uppercase; letter-spacing: 0.05em; }

  .band { margin: 3.5rem 0 0; }
  .band__head { border-top: 1px solid var(--rule); padding-top: 1.5rem; }
  .band__head h2, .colophon h2 { font: 600 0.86rem/1 var(--mono); letter-spacing: 0.11em;
    text-transform: uppercase; margin: 0 0 1rem; }
  .band__head h2 { color: var(--band); }
  .colophon h2 { color: var(--muted); }
  .band--numbers { --band: var(--numbers); }
  .band--daycards { --band: var(--daycards); }
  .band--closing { --band: var(--closing); }
  .band__head p { margin: 0 0 1.75rem; color: var(--muted); max-width: 44rem; font-size: 1rem; }
  .gates { display: grid; gap: 1.25rem; }

  .gate { background: var(--panel); border: 1px solid var(--rule); border-left: 3px solid var(--band);
    padding: 1.35rem 1.5rem 1.5rem; }
  .gate__head { display: flex; flex-wrap: wrap; gap: 0.75rem 1rem; align-items: baseline;
    justify-content: space-between; padding-bottom: 0.9rem; border-bottom: 1px solid var(--rule-2); }
  .gate__head h3 { margin: 0; font-size: 1rem; }
  .gate__head code { font-weight: 500; font-size: 1.02rem; color: var(--ink); }
  .via { font: 400 0.82rem/1 var(--sans); color: var(--muted); margin-left: 0.35rem; }
  .tally { font: 500 0.78rem/1.4 var(--mono); letter-spacing: 0.03em; color: var(--band);
    font-variant-numeric: tabular-nums; text-align: right; }
  .gate__def { margin: 1.1rem 0 1.35rem; }
  .gate__def p { margin: 0.3rem 0 0; color: var(--muted); font-size: 0.97rem; line-height: 1.55;
    max-width: 44rem; }
  .lbl { font: 500 0.72rem/1 var(--mono); letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--band); }

  /* A 1px-gap grid over a tinted background leaves a phantom cell wherever the last
     row is short, so the rules are borders on the items instead. */
  .days { margin: 0.7rem 0 0; padding: 0; list-style: none;
    display: grid; gap: 0.4rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); }
  .days li { border: 1px solid var(--rule-2); padding: 0.45rem 0.7rem; color: var(--ink-2);
    font: 400 0.9rem/1.4 var(--sans); }

  .marks { width: 100%; border-collapse: collapse; margin: 1.1rem 0 0; font-size: 0.95rem; }
  .marks th { text-align: left; font: 500 0.72rem/1 var(--mono); letter-spacing: 0.09em;
    text-transform: uppercase; color: var(--muted); padding: 0 0.6rem 0.6rem 0;
    border-bottom: 1px solid var(--rule); }
  .marks td { padding: 0.55rem 0.6rem 0.55rem 0; border-bottom: 1px solid var(--rule-2);
    color: var(--ink-2); vertical-align: baseline; }
  .marks .figure { font: 500 1.05rem/1 var(--mono); font-variant-numeric: tabular-nums;
    color: var(--ink); white-space: nowrap; }
  .marks .is-gated { color: var(--gated); font: 500 0.78rem/1.3 var(--mono); letter-spacing: 0.04em; }
  .marks .is-reported { color: var(--muted); font: 400 0.78rem/1.3 var(--mono); letter-spacing: 0.04em; }
  .marks tr:last-child td { border-bottom: 0; }

  .note { margin: 1.25rem 0 0; padding: 0.85rem 1rem; background: var(--panel-2);
    border-left: 2px solid var(--band); font-size: 0.96rem; line-height: 1.55; color: var(--ink-2); }
  .note span { display: block; font: 500 0.7rem/1 var(--mono); letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--band); margin-bottom: 0.45rem; }

  .colophon { margin: 4rem 0 0; border-top: 2px solid var(--ink); padding-top: 1.5rem; }
  .colophon p { color: var(--muted); font-size: 0.96rem; max-width: 44rem; }
  .colophon pre { overflow-x: auto; background: var(--panel); border: 1px solid var(--rule);
    padding: 0.9rem 1rem; font: 400 0.85rem/1.7 var(--mono); color: var(--ink-2); margin: 1.1rem 0; }
  .colophon ul { color: var(--muted); font-size: 0.96rem; padding-left: 1.1rem; }
  .colophon li { margin-bottom: 0.4rem; }

  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>

<div class="wrap">
  <header class="mast">
    <p class="eyebrow">
      <span>THEME=${esc(c.id)}</span><span>first revised bundle</span>${c.delivery ? `<span>builds ${esc(c.delivery)}</span>` : ''}
    </p>
    <h1>${esc(c.title)}</h1>
    <p class="sub">${esc(c.course)}${c.subtitle ? ` · <em>${esc(c.subtitle)}</em>` : ''}</p>
    <div class="clear">
      <b>Nothing here is failing.</b>
      <p>${esc(c.title)} passes all 39 per-campaign gates. It is not clean, though — it is
        <em>banked</em>. ${esc(totalBanked)} debt lines and
        ${esc((pc ? Object.keys(pc).length : 0) + (pq ? Object.keys(pq).length : 0))} recorded figures
        are what the ratchet is holding it to, and the ratchet cuts both ways: a card that regresses
        fails, and a banked card that has since been fixed <em>also</em> fails, naming the line to
        delete.</p>
      <p>So this document is a backlog, not a bug list. Everything in it can be left alone
        indefinitely without a red check — and nothing in it can be half-done without one.</p>
    </div>
    <div class="figures">
      ${figures.map((n) => `<div class="fig"><b>${esc(n.v)}</b><span>${esc(n.k)}</span></div>`).join('')}
    </div>
  </header>

  ${BAND_ORDER.map(bandSection).join('')}

  <section class="colophon" aria-labelledby="colophon">
    <h2 id="colophon">Where these come from</h2>
    <p>Every line above is read straight out of the ratchet files in
      <code>gamekit/engine/dev/</code>, against the shipped content of <code>${esc(c.id)}</code> on
      1 September 2026, branch <code>deep-watch-integration</code>. Confirm the zero for yourself:</p>
    <pre>cd gamekit
npm run check ${esc(c.id)}       # every gate, this campaign only
node engine/dev/checkStory.mjs ${esc(c.id)}    # the banked lines, printed as notes</pre>
    <p>${esc(c.title)} came in with the first revised bundle
      (<code>Alamos/revised_games_bundle/</code>, committed in <code>8eeaf5c</code>), which is why it
      is quiet: its debt was banked when it landed. The nine campaigns of the second bundle
      (<code>all_revised_games_latest/</code>) were landed under an instruction to overrule content
      gates, so their debt is failing rather than banked — 66 live failures against this
      campaign’s nought.</p>
    <h2 style="margin-top:2.25rem">Paying any of it down</h2>
    <ul>
      <li>Fix the cards, then re-bank: <code>node engine/dev/checkStory.mjs ${esc(c.id)}
        --write-debt</code> rewrites the list files. The two number files fall the same way.</li>
      <li>Read <code>alamos-accessibility</code> before touching a reading level — the seven defects
        to find in a card first, and the rule that the official term stays and gets glossed. A grade
        bought by deleting vocabulary is what <code>spw</code> is gated against.</li>
      <li>Do not delete a debt line to silence a gate. A line whose card now passes fails on its own,
        which is the mechanism working, not a false alarm.</li>
    </ul>
  </section>
</div>
`;
  return body;
}

const args = process.argv.slice(2);
const outFlag = args.indexOf('--standalone');
const outDir = outFlag >= 0 ? args[outFlag + 1] : null;

for (const c of rows) {
  const body = page(c);
  const file = `${c.id}-debt.html`;
  if (outDir) writeFileSync(resolve(outDir, file), SKELETON(body));
  else writeFileSync(new URL(`./${file}`, import.meta.url), body);
  console.log('wrote', file);
}
