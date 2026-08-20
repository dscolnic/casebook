// make-cardbook.mjs — the prose of a campaign, and nothing else.
//
//   node tools/make-cardbook.mjs <theme>       one game
//   node tools/make-cardbook.mjs all           every registered game
//   node tools/make-cardbook.mjs <theme> --html    leave the HTML, skip the PDF
//   node tools/make-cardbook.mjs <theme> --bare    scene and ask only
//
// Output: books/cards/<theme>-cards.pdf (and the .html it was rendered from).
//
// ## Why this exists, next to make-book.mjs
//
// `make-book.mjs` is the question book: one page per stop, every card, given,
// reading and option a format carries, plus the answer and the syllabus map. It
// is for working through the course on paper.
//
// This is the other half — *only the text a player reads*, in the order they read
// it: the opening card, then each day's plan card, the warm-up card that morning
// carries, and each stop's scene, guide, ask, verdict and takeaway. No options, no
// panels, no boards, no answer key. It exists so the writing can be read as
// writing: whether the voice holds across fifteen days, whether the scenes repeat
// themselves, whether a guide is doing the scene's job.
//
// Everything on the page is authored content read straight off the theme, after
// `normalizeContent` — the same object the game renders from, so a card that has
// drifted from its book shows here as it will show on screen.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { themeDir as resolveTheme, themeNames } from '../engine/dev/registry.mjs';
import { warmupPlan, DEFAULT_WORDS } from '../engine/core/warmups.js';
import { unlockDay } from '../engine/core/orientation.js';

const args = process.argv.slice(2);
const wanted = args.filter(a => !a.startsWith('--'));
const htmlOnly = args.includes('--html');
const bare = args.includes('--bare');
if (!wanted.length) {
  console.error('usage: node tools/make-cardbook.mjs <theme|all> [--html] [--bare]');
  process.exit(2);
}

const OUT = resolve('books/cards');
mkdirSync(OUT, { recursive: true });

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find(p => existsSync(p));

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Some content is authored as HTML (the bios, a few scenes). Keep it, escape the rest. */
const rich = (s) => (String(s ?? '').includes('<') ? String(s) : esc(s));
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
/** No manifest carries a plural, and "watchs" reads as a typo in the game's own noun. */
const plural = (n) => (/(?:ch|sh|s|x|z)$/i.test(n) ? `${n}es` : `${n}s`);

/** A labelled block of card prose. `n` is the word count printed in the margin. */
const block = (label, html, n) => (html
  ? `<div class="b"><div class="bl">${esc(label)}${n != null ? `<i>${n}w</i>` : ''}</div>`
    + `<div class="bt">${html}</div></div>`
  : '');

const para = (s) => `<p>${rich(s)}</p>`;

/** Build one game's card book. */
async function build(themeName) {
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../engine/content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme);

  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const GROUPS = content.GROUPS ?? [];
  const WARMUPS = content.WARMUPS ?? {};
  const dayNoun = theme.dayNoun ?? 'Day';
  const stopNoun = theme.stopNoun ?? 'room';
  const site = theme.site ?? {};
  const groupOf = (id) => GROUPS.find(g => g.id === id);
  const placeOf = (id) => (site.buildings ?? []).find(b => b.group === id)?.name
    ?? (site.plan?.rooms ?? []).find(r => r.group === id)?.name ?? '';

  // The morning runs, on the days the engine actually schedules them — the same
  // function the game calls, so a one-tier site shows no far lap here either.
  const plan = warmupPlan({
    days: MISSIONS.length,
    hasFar: !!content.TIERS?.hasFar,
    unlockDay: unlockDay(site),
  });
  const runOn = new Map(plan.map(p => [p.day, p]));

  let stops = 0;
  let cardWords = 0;

  const dayHTML = (m, di) => {
    const n = di + 1;
    const run = runOn.get(n);
    const authored = run ? (WARMUPS[run.slot] ?? WARMUPS[run.format.toLowerCase()] ?? {}) : null;
    const runTitle = run
      ? (authored.title || DEFAULT_WORDS[run.slot]?.title || DEFAULT_WORDS[run.format.toLowerCase()]?.title || '')
      : '';
    const runWhy = run
      ? (authored.why || DEFAULT_WORDS[run.slot]?.why || DEFAULT_WORDS[run.format.toLowerCase()]?.why || '')
      : '';

    // The plan card, as the game composes it: the stake is the sentence the player
    // reads before accepting the day, and briefing and objective sit under it. Some
    // books write the same sentence into two of the three; print each once.
    const said = new Set();
    const once = (v) => {
      const k = String(v ?? '').trim();
      if (!k || said.has(k)) return '';
      said.add(k);
      return k;
    };
    const stake = once(m.stake);
    const briefing = once(m.briefing);
    const objective = once(m.objective);

    const stopsHTML = (m.stops ?? []).map((st, si) => {
      const lesson = CURRICULUM[st.group]?.[st.lesson];
      if (!lesson) return '';
      stops += 1;
      const ch = lesson.game ?? {};
      const where = groupOf(st.group)?.name ?? st.group;
      const place = placeOf(st.group);
      // `scene ?? story` is the chain the card itself reads. A stop that writes both
      // shows the one the player gets, which is the whole point of printing it here.
      const scene = lesson.scene ?? lesson.story ?? '';
      const ask = ch.question || ch.task || '';
      const guide = lesson.guide ?? '';
      const why = ch.why ?? '';
      const take = lesson.takeaway ?? '';
      cardWords += words(scene) + words(guide) + words(ask) + words(why) + words(take);
      const bg = Array.isArray(lesson.background) ? lesson.background.filter(Boolean) : [];
      const assumes = (lesson.assumes ?? []).filter(Boolean);
      return `<article class="stop">
        <h4><span class="ix">${n}.${si + 1}</span> ${esc(lesson.title ?? '')}
          <span class="wh">${esc(where)}${place && place !== where ? ` · ${esc(place)}` : ''}`
        + `${st.person ? ' · a person' : ` · a ${esc(stopNoun)}`}`
        + `${st.callback ? ' · callback' : ''} · ${esc(String(ch.type ?? '').toUpperCase())}</span></h4>
        ${block('Scene', para(scene), words(scene))}
        ${bare ? '' : block('Guide', para(guide), words(guide))}
        ${block('Ask', para(ask), words(ask))}
        ${bare ? '' : block('Behind the button', bg.map(para).join(''), bg.reduce((a, p) => a + words(p), 0))}
        ${bare ? '' : block('Takes as read', assumes.length
          ? `<p>${assumes.map(esc).join(' · ')}</p>` : '', null)}
        ${bare ? '' : block('Verdict', para(why), words(why))}
        ${bare ? '' : block('Takeaway', para(take), words(take))}
      </article>`;
    }).join('');

    return `<section class="day">
      <header class="dh">
        <div class="eyebrow">${esc(dayNoun)} ${n} of ${MISSIONS.length}</div>
        <h3>${esc(m.title ?? '')}</h3>
      </header>
      ${run ? `<div class="run"><div class="bl">Before the ${esc(dayNoun.toLowerCase())} — `
        + `${esc(run.format)}${authored?.title ? '' : ' (engine default words)'}</div>`
        + `<h5>${esc(runTitle)}</h5>${para(runWhy)}</div>` : ''}
      ${block('Plan card', para(stake), words(stake))}
      ${briefing ? block('Briefing', para(briefing), words(briefing)) : ''}
      ${objective ? block('What you decide', para(objective), words(objective)) : ''}
      ${stopsHTML}
      ${m.takeaway ? block(`End of the ${dayNoun.toLowerCase()}`, para(m.takeaway), words(m.takeaway)) : ''}
    </section>`;
  };

  const days = MISSIONS.map(dayHTML).join('');

  const opening = Array.isArray(theme.opening) ? theme.opening : [theme.opening].filter(Boolean);
  const ending = Array.isArray(theme.ending) ? theme.ending : [theme.ending].filter(Boolean);

  const html = `<!doctype html><meta charset="utf-8">
<title>${esc(theme.title ?? themeName)} — the cards</title>
<style>
  @page { size: A4; margin: 18mm 16mm 16mm; }
  :root { --ink:#15171a; --mid:#5b6068; --rule:#d9d6cf; --paper:#fdfcf9; --tint:#f4f1ea; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--paper); color:var(--ink);
    font:15px/1.55 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif; }
  .sheet { max-width: 42em; margin: 0 auto; padding: 3em 1.5em 6em; }
  h1 { font-size:2.1em; line-height:1.1; margin:0 0 .1em; letter-spacing:-.01em; }
  .sub { color:var(--mid); font-size:1.05em; margin:0 0 1.6em; }
  .meta { color:var(--mid); font-size:.82em; letter-spacing:.03em; text-transform:uppercase;
    border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:.6em 0; margin:0 0 2.4em; }
  .meta span + span::before { content:"·"; margin:0 .5em; }
  h2 { font-size:1.1em; text-transform:uppercase; letter-spacing:.09em; color:var(--mid);
    margin:2.6em 0 .8em; font-weight:600; }
  .day { break-before: page; margin: 0 0 2.4em; }
  .dh { border-top:2px solid var(--ink); padding-top:.5em; margin:0 0 1.1em; }
  .eyebrow { font-size:.75em; letter-spacing:.14em; text-transform:uppercase; color:var(--mid); }
  .dh h3 { font-size:1.5em; margin:.15em 0 0; }
  .run { background:var(--tint); border-radius:3px; padding:.8em 1em; margin:0 0 1.2em; }
  .run h5 { margin:.2em 0 .4em; font-size:1.02em; }
  .run p { margin:0; }
  .stop { break-inside: avoid-page; margin:1.6em 0; padding-left:1em; border-left:2px solid var(--rule); }
  .stop h4 { margin:0 0 .6em; font-size:1.08em; font-weight:600; }
  .ix { color:var(--mid); font-variant-numeric: tabular-nums; margin-right:.4em; }
  .wh { display:block; font-weight:400; font-size:.76em; letter-spacing:.06em;
    text-transform:uppercase; color:var(--mid); margin-top:.2em; }
  .b { margin:.55em 0; }
  .bl { font:600 .68em/1.4 ui-sans-serif,-apple-system,Segoe UI,sans-serif;
    letter-spacing:.12em; text-transform:uppercase; color:var(--mid); }
  .bl i { font-style:normal; opacity:.6; margin-left:.5em; letter-spacing:.04em; }
  .bt p { margin:.15em 0 .5em; }
  .bt p:last-child { margin-bottom:0; }
  footer { color:var(--mid); font-size:.8em; border-top:1px solid var(--rule);
    margin-top:3em; padding-top:.8em; }
</style>
<div class="sheet">
  <h1>${esc(theme.title ?? themeName)}</h1>
  <p class="sub">${esc(theme.subtitle ?? '')}</p>
  <p class="meta"><span>${MISSIONS.length} ${esc(plural(dayNoun.toLowerCase()))}</span>
    <span>${stops} stops</span>
    <span>grade ${esc(String(theme.audience?.grade ?? '—'))}</span>
    <span>${esc(themeName)}</span></p>
  ${opening.length ? `<h2>The opening card</h2>${opening.map(para).join('')}` : ''}
  ${days}
  ${ending.length ? `<section class="day"><h2>The closing card</h2>${ending.map(para).join('')}</section>` : ''}
  <footer>Card text only — no options, boards or answers. ${cardWords.toLocaleString()} words of card prose
    across ${stops} stops. Generated from <code>themes/${esc(themeName)}</code> by
    <code>tools/make-cardbook.mjs</code>.</footer>
</div>`;

  const htmlPath = resolve(OUT, `${themeName}-cards.html`);
  writeFileSync(htmlPath, html);
  let pdfPath = '';
  if (!htmlOnly && CHROME) {
    pdfPath = resolve(OUT, `${themeName}-cards.pdf`);
    const res = spawnSync(CHROME, [
      '--headless', '--disable-gpu', '--no-pdf-header-footer',
      `--print-to-pdf=${pdfPath}`, '--virtual-time-budget=8000',
      pathToFileURL(htmlPath).href,
    ], { encoding: 'utf8' });
    if (res.status !== 0) pdfPath = '';
  }
  console.log(`${themeName.padEnd(22)} ${String(MISSIONS.length).padStart(2)} ${plural(dayNoun.toLowerCase()).padEnd(7)} `
    + `${String(stops).padStart(3)} stops  ${String(cardWords).padStart(6)} words  `
    + `${pdfPath ? 'pdf' : 'html'}`);
}

const list = wanted[0] === 'all' ? themeNames() : wanted;
for (const t of list) {
  try { await build(t); } catch (e) { console.error(`${t}: ${e.message}`); }
}
