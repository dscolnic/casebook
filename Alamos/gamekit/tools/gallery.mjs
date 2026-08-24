// gallery.mjs — the front door. One page, every game, click one to play it.
//
//   npm run gallery                # build every game, then write dist/index.html
//   npm run gallery -- --page      # only rewrite the page (fast, no builds)
//   npm run gallery -- --only headwater,icecore
//   npm run gallery -- --open
//
// WHY A GENERATOR RATHER THAN A CHECKED-IN index.html. The theme is chosen at
// build time — `THEME=x vite build` writes `dist/x/` — so a picker can only be
// honest about what exists after the builds have run. This does both in one
// command and marks any game whose `dist/<id>/` is missing, instead of shipping
// a page of links that 404.
//
// TWO THINGS THAT WILL BITE. Builds must use `--base ./`, or every built page
// asks for `/assets/...` at the server root and comes up blank from a
// subfolder. And the hero shots come out of `shots/<theme>/`, which is only
// populated once `npm run shots <theme>` has been run — a game with no shot
// gets a drawn placeholder rather than a broken image.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { SYLLABUS } from './syllabus.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const DIST = resolve(root, 'dist');

// ---------------------------------------------------------------- the games
//
// The catalogue lives in tools/games.js — this page and the casebook shelf
// both read it, and a second copy is how a shipped game ends up with no card.
import { GAMES, cards, LEVELS, KINDS } from './games.js';
// One description of what is read back off a theme; see tools/themeFacts.js.
import { themeDirOf, gradeOf, roleOf, dayNounOf, plural, sizeOf } from './themeFacts.js';

// ------------------------------------------------------------------ helpers

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valueOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const only = (valueOf('--only') ?? '').split(',').map(s => s.trim()).filter(Boolean);
const pageOnly = has('--page');
// One level at a time, for when only the middle-school set has changed. Thirty
// builds is ten minutes; fourteen of them is four.
const onlyLevel = valueOf('--level');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// ------------------------------------------------------------------ builds

function buildTheme(id) {
  process.stdout.write(`  building ${id} … `);
  try {
    execFileSync('npx', ['vite', 'build', '--base', './'],
      { cwd: root, env: { ...process.env, THEME: id }, stdio: 'pipe' });
    console.log('ok');
    return true;
  } catch (e) {
    console.log('FAILED');
    console.log(String(e.stdout ?? '').split('\n').slice(-6).join('\n'));
    return false;
  }
}

// ------------------------------------------------------------------- shots
//
// Converted to JPEG at card width. The PNGs are 1280×720 and up to a megabyte
// each; thirteen of them is a page nobody waits for.
function stageHero(g) {
  mkdirSync(resolve(DIST, 'shots'), { recursive: true });
  // An edition is played in the base game's place, so there is one set of
  // screenshots of it and both cards show the same one.
  const out = resolve(DIST, 'shots', `${g.shotsFrom}.jpg`);
  const src = g.hero ? resolve(root, 'shots', g.shotsFrom, g.hero) : null;
  if (!src || !existsSync(src)) return null;
  try {
    execFileSync('sips', ['-Z', '1000', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78',
      src, '--out', out], { stdio: 'pipe' });
  } catch {
    copyFileSync(src, out.replace(/\.jpg$/, '.png'));
    return `shots/${g.shotsFrom}.png`;
  }
  return `shots/${g.shotsFrom}.jpg`;
}

// -------------------------------------------------------------------- page

function card(g) {
  // `g.build` is the theme id and the dist directory; `g.id` is the same thing
  // for a game with one edition and the suffixed name for the others.
  const built = existsSync(resolve(DIST, g.build, 'index.html'));
  const shot = stageHero(g);
  const grade = gradeOf(g.build);
  const role = roleOf(g.build);
  const size = sizeOf(g.build);
  // `reads at grade N` is the manifest's `audience.grade`, and on a university
  // card it contradicts the badge beside it: all seven declare 12, because that
  // number is the input to typography.js and to validateContent's reading-level
  // gate, not a claim about who the course is for. Raising it to 13 to make the
  // badge agree would loosen seven campaigns' prose gates in the same commit —
  // a gate going green because the ruler moved. So the card drops the weaker of
  // the two claims instead. `grades` already says Undergraduate.
  const full = SYLLABUS[g.build]?.course ?? '';
  const tag = built ? 'a' : 'div';
  const href = built ? ` href="./${g.build}/index.html"` : '';
  // `data-game` and `data-days` are what the progress script reads. The save
  // itself is never read at build time — it lives in the player's browser, and
  // the picker is served from the same origin as the games, so the page can ask
  // localStorage directly.
  return `
      <${tag} class="card${built ? '' : ' card--unbuilt'}"${href} data-field="${esc(g.field)}"
         data-level="${esc(g.level)}" data-kind="${esc(g.kind ?? 'course')}"
         data-game="${esc(g.build)}" data-days="${size ? size.days : ''}"
         data-daynoun="${esc(dayNounOf(g.id))}"
         style="--accent:${g.accent}">
        <div class="shot">
          ${shot ? `<img src="${shot}" alt="" loading="lazy">`
                 : `<div class="shot__none" aria-hidden="true"><span>no snapshot yet</span></div>`}
          <div class="shot__veil"></div>
          <span class="field">${esc(g.field)}</span>
          ${built ? '<span class="play" aria-hidden="true">▶</span>' : '<span class="unbuilt">not built</span>'}
          <span class="resume" hidden></span>
          <h3>${esc(g.title)}</h3>
        </div>
        <div class="body">
          <p class="course">${esc(g.course)}</p>
          <p class="place">${esc(g.place)}</p>
          <p class="meta">
            ${role ? `<span>${esc(role)}</span>` : ''}
            ${size ? `<span>${size.days} ${plural(dayNounOf(g.build))} · ${size.stops} stops</span>` : ''}
            ${grade && g.level !== 'university' ? `<span>reads at grade ${grade}</span>` : ''}
            ${g.grades ? `<span>${esc(g.grades)}</span>` : ''}
          </p>
          ${full ? `<p class="full">${esc(full)}</p>` : ''}
          <p class="progress" hidden></p>
        </div>
      </${tag}>`;
}

function page(games) {
  // Alphabetical, because the chips are also the order the shelf is grouped in
  // and insertion order of the catalogue is not an order a reader can predict.
  const fields = [...new Set(games.map(g => g.field))].sort((a, b) => a.localeCompare(b));
  const builtCount = games.filter(g => existsSync(resolve(DIST, g.build, 'index.html'))).length;
  // Only levels that have a card. A set with no elementary game should not draw
  // a control that filters everything away.
  const levels = LEVELS.filter(l => games.some(g => g.level === l.id));
  const defaultLevel = levels.some(l => l.id === 'high') ? 'high' : levels[0]?.id;
  // Kinds come before levels: the length of the session is the first thing a
  // player chooses. Only kinds with a card are drawn, for the same reason as
  // the levels above.
  const kindOf = (g) => g.kind ?? 'course';
  const kinds = KINDS.filter(k => games.some(g => kindOf(g) === k.id));
  const defaultKind = kinds.some(k => k.id === 'course') ? 'course' : kinds[0]?.id;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Alamos — pick a game</title>
<style>
  :root{
    --bg:#0d0f13; --bg2:#141821; --ink:#e9ecf2; --dim:#98a1b2; --faint:#5d6675;
    --line:#242a36; --radius:16px;
  }
  *{box-sizing:border-box}
  body{
    margin:0; background:
      radial-gradient(1100px 620px at 12% -8%, #1b2333 0%, transparent 60%),
      radial-gradient(900px 520px at 92% 4%, #201a2b 0%, transparent 58%),
      var(--bg);
    color:var(--ink);
    font:16px/1.55 ui-sans-serif,-apple-system,"Segoe UI",Inter,Roboto,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  .wrap{max-width:1320px; margin:0 auto; padding:56px 24px 96px}

  header{margin-bottom:34px}
  .kicker{
    font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.18em;
    text-transform:uppercase; color:var(--faint); margin:0 0 14px;
  }
  h1{
    margin:0 0 10px; font-size:clamp(34px,5.6vw,58px); line-height:1.02; letter-spacing:-.025em;
    font-weight:680;
  }
  h1 em{font-style:normal; background:linear-gradient(92deg,#6fc7d8,#8f6fd0 46%,#e0868f);
    -webkit-background-clip:text; background-clip:text; color:transparent}
  .lede{margin:0; max-width:64ch; color:var(--dim); font-size:17px}

  /* Kind is the outer control and reads as a heading, not a chip: it changes
     what kind of thing the page is offering, where a level only changes who it
     is written for. Underlined tabs rather than pills, so the two rows are not
     two identical-looking controls doing different jobs. */
  .kinds{display:flex; flex-wrap:wrap; gap:26px; margin:30px 0 0;
    border-bottom:1px solid var(--line)}
  .kind{
    appearance:none; cursor:pointer; border:0; background:transparent; color:var(--dim);
    padding:0 2px 12px; font:inherit; font-size:19px; font-weight:620; letter-spacing:-.01em;
    display:flex; align-items:baseline; gap:8px;
    border-bottom:2px solid transparent; margin-bottom:-1px;
    transition:color .16s, border-color .16s;
  }
  .kind small{font:11.5px/1 ui-monospace,Menlo,monospace; color:var(--faint); letter-spacing:.04em}
  .kind:hover{color:var(--ink)}
  .kind[aria-pressed="true"]{color:var(--ink); border-bottom-color:var(--ink)}
  .kind:focus-visible{outline:2px solid #6fc7d8; outline-offset:3px}
  .kindNote{margin:16px 0 0; max-width:64ch; color:var(--dim); font-size:15px}

  .levels{display:inline-flex; gap:4px; margin:20px 0 2px; padding:4px;
    border:1px solid var(--line); border-radius:999px; background:#111520}
  /* A class-level display beats the UA stylesheet's rule for [hidden], so a
     level with nothing in this kind went on drawing a control reading "0 games"
     — the hidden attribute was set and had no effect. */
  .levels[hidden], .level[hidden], .kind[hidden]{display:none}
  .level{
    appearance:none; cursor:pointer; border:0; background:transparent; color:var(--dim);
    border-radius:999px; padding:8px 18px; font:inherit; font-size:14px; line-height:1.15;
    display:flex; flex-direction:column; align-items:center; gap:2px;
    transition:background .16s, color .16s;
  }
  .level small{font-size:11px; letter-spacing:.04em; color:var(--faint)}
  .level:hover{color:var(--ink)}
  .level[aria-pressed="true"]{background:var(--ink); color:#0d0f13}
  .level[aria-pressed="true"] small{color:#4a5262}
  .level:focus-visible{outline:2px solid #6fc7d8; outline-offset:2px}

  .filters{display:flex; flex-wrap:wrap; gap:8px; margin:26px 0 4px}
  .chip{
    appearance:none; cursor:pointer; border:1px solid var(--line); background:#141821;
    color:var(--dim); border-radius:999px; padding:7px 15px; font:inherit; font-size:13.5px;
    transition:border-color .16s, color .16s, background .16s, transform .12s;
  }
  .chip:hover{color:var(--ink); border-color:#39435a; transform:translateY(-1px)}
  .chip[aria-pressed="true"]{background:var(--ink); color:#0d0f13; border-color:var(--ink)}
  .chip:focus-visible{outline:2px solid #6fc7d8; outline-offset:2px}

  /* Grouped by subject: the grid is a column of sections and each section
     carries its own card grid. The tag is sticky INSIDE its section, not on the
     grid — a sticky grid item only travels inside its own grid area, which is
     one row tall, so it would not move at all. */
  .grid{display:block; margin-top:26px}
  .group + .group{margin-top:34px}
  .group[hidden]{display:none}
  .grouptag{
    position:sticky; top:0; z-index:5; margin:0 0 14px;
    display:flex; align-items:center; gap:12px; padding:11px 0 10px;
    font:600 11.5px/1 ui-monospace,Menlo,monospace; letter-spacing:.14em;
    text-transform:uppercase; color:var(--dim);
    /* Semi-transparent over a blur rather than a flat fill: the page background
       is two fixed washes and a solid bar reads as a seam across them. */
    background:color-mix(in srgb, var(--bg) 78%, transparent);
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
  }
  .grouptag small{font:inherit; color:var(--faint); letter-spacing:.08em}
  .grouptag::after{content:''; flex:1; height:1px; background:var(--line)}
  .groupgrid{
    display:grid; gap:22px;
    grid-template-columns:repeat(auto-fill,minmax(310px,1fr));
  }

  .card{
    display:flex; flex-direction:column; text-decoration:none; color:inherit;
    background:linear-gradient(180deg,#161b25,#111520);
    border:1px solid var(--line); border-radius:var(--radius); overflow:hidden;
    transition:transform .18s cubic-bezier(.2,.7,.3,1), border-color .18s, box-shadow .18s;
  }
  .card:hover{
    transform:translateY(-4px);
    border-color:color-mix(in srgb, var(--accent) 55%, var(--line));
    box-shadow:0 16px 40px -18px color-mix(in srgb, var(--accent) 70%, transparent),
               0 2px 0 0 color-mix(in srgb, var(--accent) 35%, transparent) inset;
  }
  .card:focus-visible{outline:2px solid var(--accent); outline-offset:3px}
  .card--unbuilt{opacity:.62; cursor:default}
  .card--unbuilt:hover{transform:none; box-shadow:none}

  .shot{position:relative; aspect-ratio:16/9; background:#080a0e; overflow:hidden}
  .shot img{
    width:100%; height:100%; object-fit:cover; display:block;
    transform:scale(1.02); transition:transform .5s cubic-bezier(.2,.7,.3,1); filter:saturate(1.05);
  }
  .card:hover .shot img{transform:scale(1.09)}
  .shot__none{
    width:100%; height:100%; display:grid; place-items:center;
    background:
      repeating-linear-gradient(135deg,#12161f 0 10px,#0e121a 10px 20px);
    color:var(--faint); font:12px/1 ui-monospace,Menlo,monospace; letter-spacing:.1em;
  }
  .shot__veil{
    position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(180deg,rgba(8,10,14,.10) 0%,rgba(8,10,14,.05) 38%,rgba(8,10,14,.88) 100%);
  }
  .shot h3{
    position:absolute; left:16px; right:16px; bottom:11px; margin:0;
    font-size:21px; line-height:1.15; letter-spacing:-.015em; font-weight:640;
    text-shadow:0 2px 14px rgba(0,0,0,.75);
  }
  .field{
    position:absolute; top:12px; left:12px; z-index:1;
    font:600 10.5px/1 ui-monospace,Menlo,monospace; letter-spacing:.12em; text-transform:uppercase;
    color:#0d0f13; background:var(--accent); border-radius:999px; padding:5px 9px;
  }
  .play{
    position:absolute; top:11px; right:12px; z-index:1;
    width:28px; height:28px; border-radius:50%; display:grid; place-items:center;
    font-size:11px; color:#0d0f13; background:#e9ecf2;
    opacity:0; transform:scale(.8); transition:opacity .18s, transform .18s;
  }
  .card:hover .play, .card:focus-visible .play{opacity:1; transform:scale(1)}
  .unbuilt{
    position:absolute; top:12px; right:12px; z-index:1;
    font:600 10px/1 ui-monospace,Menlo,monospace; letter-spacing:.1em; text-transform:uppercase;
    color:var(--dim); border:1px solid var(--line); background:#0d0f13cc;
    border-radius:999px; padding:5px 8px;
  }
  /* A game already under way. Bottom-RIGHT of the shot: the title sits bottom
     left, the field chip top left and the play mark top right, and this is the
     one corner left. It was on the bottom left first and printed straight
     through the game's own name. */
  .resume{
    position:absolute; right:12px; bottom:12px; z-index:2;
    font:600 10.5px/1 ui-monospace,Menlo,monospace; letter-spacing:.08em;
    color:#0d0f13; background:#e9ecf2; border-radius:999px; padding:5px 9px;
  }
  .resume--done{background:var(--accent)}
  .card--started{outline:1px solid color-mix(in srgb, var(--accent) 55%, transparent)}
  .progress{margin:0; font:500 12px/1.45 inherit; color:var(--accent)}
  .progress__bar{
    display:block; height:3px; margin-top:6px; border-radius:2px;
    background:var(--line); overflow:hidden;
  }
  .progress__bar i{display:block; height:100%; background:var(--accent)}

  .body{padding:15px 17px 17px; display:flex; flex-direction:column; gap:8px; flex:1}
  .course{
    margin:0; font:600 13.5px/1.35 ui-sans-serif,system-ui,sans-serif;
    color:var(--accent); letter-spacing:.005em;
  }
  .place{margin:0; color:var(--dim); font-size:14.5px}
  .meta{
    margin:auto 0 0; display:flex; flex-wrap:wrap; gap:6px;
    font:11.5px/1 ui-monospace,Menlo,monospace; color:var(--faint);
  }
  .meta span{
    border:1px solid var(--line); border-radius:6px; padding:5px 7px;
    max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .full{
    margin:0; padding-top:9px; border-top:1px dashed var(--line);
    font-size:12.5px; color:var(--faint); font-style:italic;
  }

  footer{margin-top:56px; padding-top:22px; border-top:1px solid var(--line);
    color:var(--faint); font-size:13.5px}
  footer code{
    font:12.5px ui-monospace,Menlo,monospace; color:var(--dim);
    background:#141821; border:1px solid var(--line); border-radius:6px; padding:2px 6px;
  }
  .empty{color:var(--dim); padding:40px 4px; display:none}

  @media (prefers-reduced-motion:reduce){
    *{transition:none !important; animation:none !important}
  }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <p class="kicker">Alamos · mission-based learning games</p>
    <h1>Walk in, work it out, <em>hand it over.</em></h1>
    <p class="lede">
      ${games.length} first-person games on one engine. Walk to a place, read the evidence,
      answer for it, hand off. No combat, no weapons — the stakes are time, money and other
      people.
    </p>

    <div class="kinds" role="group" aria-label="Choose a kind of game">
      ${kinds.map(k => {
        const n = games.filter(g => kindOf(g) === k.id).length;
        return `<button class="kind" data-k="${k.id}" data-note="${esc(k.note)}" ` +
               `aria-pressed="${String(k.id === defaultKind)}">` +
               `${esc(k.label)}<small>${n}</small></button>`;
      }).join('\n      ')}
    </div>
    <p class="kindNote" id="kindNote"></p>

    <div class="levels" id="levels" role="group" aria-label="Choose a level">
      ${levels.map(l => {
        const n = games.filter(g => g.level === l.id).length;
        return `<button class="level" data-l="${l.id}" aria-pressed="${String(l.id === defaultLevel)}">` +
               `${esc(l.label)}<small>${n} game${n === 1 ? '' : 's'}</small></button>`;
      }).join('\n      ')}
    </div>

    <div class="filters" role="group" aria-label="Filter by subject">
      <button class="chip" aria-pressed="true" data-f="*">All</button>
      ${fields.map(f => `<button class="chip" aria-pressed="false" data-f="${esc(f)}">${esc(f)}</button>`).join('\n      ')}
    </div>
  </header>

  <main class="grid" id="grid">
    ${fields.map(f => {
      const here = games.filter(g => g.field === f);
      return `<section class="group" data-field="${esc(f)}">
      <h2 class="grouptag"><span>${esc(f)}</span><small>${here.length}</small></h2>
      <div class="groupgrid">${here.map(card).join('\n')}
      </div>
    </section>`;
    }).join('\n    ')}
  </main>
  <p class="empty" id="empty">Nothing in that subject yet.</p>

  <footer>
    <p>${builtCount} of ${games.length} built. Rebuild everything with <code>npm run gallery</code>,
       or one game on its own with <code>THEME=&lt;name&gt; npm run dev</code>.</p>
  </footer>
</div>

<script>
  // ------------------------------------------------------------- where was I
  //
  // Every game saves its campaign to localStorage under gamekit_<id>_v1, and
  // this page is served from the same origin as the games it links to — so the
  // picker can read them directly. Nothing is written here and nothing is sent
  // anywhere; a card with no save says nothing at all.
  //
  // The shape is the engine's: week is the mission number the player is on,
  // one-based, and status is 'playing' | 'won' | 'lost'.
  for (const card of document.querySelectorAll('.card[data-game]')) {
    let save = null;
    try { save = JSON.parse(localStorage.getItem('gamekit_' + card.dataset.game + '_v1') || 'null'); }
    catch (e) { save = null; }
    if (!save || typeof save.week !== 'number') continue;

    const days = Number(card.dataset.days) || 0;
    const noun = card.dataset.daynoun || 'Day';
    const done = save.status === 'won';
    const at = Math.min(save.week, days || save.week);

    const badge = card.querySelector('.resume');
    const line = card.querySelector('.progress');
    card.classList.add('card--started');
    if (badge) {
      badge.textContent = done ? 'finished' : 'resume';
      badge.classList.toggle('resume--done', done);
      badge.hidden = false;
    }
    if (line) {
      const where = done
        ? 'Finished all ' + days + ' ' + noun.toLowerCase() + 's'
        : noun + ' ' + at + (days ? ' of ' + days : '');
      const pct = days ? Math.round(((done ? days : at - 1) / days) * 100) : 0;
      line.innerHTML = where
        + (days ? '<span class="progress__bar"><i style="width:' + pct + '%"></i></span>' : '');
      line.hidden = false;
    }
  }

  // ----------------------------------------------------------- three filters
  //
  // Kind is the outer one — a fortnight of working days or one sitting — because
  // that is the first thing a player knows about how much time they have. Level
  // sits inside it: the same game exists at more than one, in the same place
  // with the same cast, and a shelf that mixed them would offer the player two
  // cards with one title and no way to tell them apart. Subject filters inside
  // the chosen level.
  //
  // Every count and every hidden control is derived from the cards on the page
  // rather than written into the markup, so a level with nothing in this kind
  // cannot draw a control that filters everything away.
  const chips = [...document.querySelectorAll('.chip')];
  const kinds = [...document.querySelectorAll('.kind')];
  const levels = [...document.querySelectorAll('.level')];
  const cards = [...document.querySelectorAll('.card')];
  const empty = document.getElementById('empty');
  const levelBar = document.getElementById('levels');
  const kindNote = document.getElementById('kindNote');

  const pressed = (list) => (list.find(b => b.getAttribute('aria-pressed') === 'true') || list[0]);
  const LEVEL_KEY = 'gamekit_gallery_level';
  const KIND_KEY = 'gamekit_gallery_kind';

  function apply() {
    const kind = pressed(kinds)?.dataset.k ?? 'course';
    const inKind = cards.filter(c => c.dataset.kind === kind);

    // A level with no card in this kind is hidden, and if the pressed one is
    // the level that just went away, fall to the first that is left — otherwise
    // switching kind shows an empty grid with a control pressed on nothing.
    let live = [];
    levels.forEach(l => {
      const n = inKind.filter(c => c.dataset.level === l.dataset.l).length;
      const small = l.querySelector('small');
      if (small) small.textContent = n + ' game' + (n === 1 ? '' : 's');
      l.hidden = !n;
      if (n) live.push(l);
    });
    // A kind with one level strands whatever was chosen — the Quick Discoveries
    // are all senior-high today, so somebody who had picked University would
    // have theirs quietly rewritten. wanted is the level actually pressed, so
    // switching back restores it rather than leaving the fallback in place.
    const back = live.find(l => l.dataset.l === wanted);
    if (back) levels.forEach(o => o.setAttribute('aria-pressed', String(o === back)));
    else if (!live.some(l => l.getAttribute('aria-pressed') === 'true')) {
      levels.forEach(o => o.setAttribute('aria-pressed', String(o === live[0])));
    }
    // One level is not a choice, so do not draw a control for it.
    if (levelBar) levelBar.hidden = live.length < 2;
    if (kindNote) kindNote.textContent = pressed(kinds)?.dataset.note ?? '';

    const level = live.length ? pressed(live)?.dataset.l : null;
    const field = pressed(chips)?.dataset.f ?? '*';
    let shown = 0;
    cards.forEach(card => {
      const on = card.dataset.kind === kind &&
                 (!level || card.dataset.level === level) &&
                 (field === '*' || card.dataset.field === field);
      card.style.display = on ? '' : 'none';
      if (on) shown++;
    });
    // A subject chip that has nothing at this level is worse than useless — it
    // looks like a broken page. Hide it and fall back to All.
    chips.forEach(c => {
      if (c.dataset.f === '*') return;
      const any = inKind.some(card => card.dataset.field === c.dataset.f &&
                                      (!level || card.dataset.level === level));
      c.hidden = !any;
      if (!any && c.getAttribute('aria-pressed') === 'true') {
        chips.forEach(o => o.setAttribute('aria-pressed', String(o.dataset.f === '*')));
      }
    });
    // A subject heading with every card under it hidden is a heading over a gap.
    // The count beside it is the visible count, not the catalogue's.
    document.querySelectorAll('.group').forEach(sec => {
      const n = [...sec.querySelectorAll('.card')].filter(c => c.style.display !== 'none').length;
      sec.hidden = !n;
      const small = sec.querySelector('.grouptag small');
      if (small) small.textContent = String(n);
    });
    empty.style.display = shown ? 'none' : 'block';
  }

  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(o => o.setAttribute('aria-pressed', String(o === c)));
    apply();
  }));
  levels.forEach(l => l.addEventListener('click', () => {
    levels.forEach(o => o.setAttribute('aria-pressed', String(o === l)));
    wanted = l.dataset.l;
    try { localStorage.setItem(LEVEL_KEY, l.dataset.l); } catch (e) {}
    apply();
  }));
  kinds.forEach(k => k.addEventListener('click', () => {
    kinds.forEach(o => o.setAttribute('aria-pressed', String(o === k)));
    try { localStorage.setItem(KIND_KEY, k.dataset.k); } catch (e) {}
    apply();
  }));

  // ?kind=quick and ?level=middle win over what this browser chose last time,
  // so a link to a shelf is that shelf for whoever opens it.
  const query = new URLSearchParams(location.search);
  // Declared before apply() runs, and read by it: the level the player chose,
  // as against the one a single-level kind forced on them.
  let wanted = null;
  const choose = (list, attr, asked, key) => {
    let want = null;
    try { want = asked || localStorage.getItem(key); } catch (e) { want = asked; }
    const target = list.find(b => b.dataset[attr] === want);
    if (target) list.forEach(o => o.setAttribute('aria-pressed', String(o === target)));
  };
  choose(kinds, 'k', query.get('kind'), KIND_KEY);
  choose(levels, 'l', query.get('level'), LEVEL_KEY);
  wanted = pressed(levels)?.dataset.l ?? null;
  apply();
</script>
</body>
</html>
`;
}

// -------------------------------------------------------------------- main

const ALL = cards();
let games = ALL;
if (only.length) games = games.filter(g => only.includes(g.id) || only.includes(g.build));
if (onlyLevel) games = games.filter(g => g.level === onlyLevel);

if (!pageOnly) {
  console.log(`building ${games.length} game(s) into dist/ …`);
  let ok = 0;
  for (const g of games) if (buildTheme(g.build)) ok++;
  console.log(`${ok}/${games.length} built`);
}

mkdirSync(DIST, { recursive: true });
// The page always lists everything, whatever was built this run: a card whose
// build is missing says so rather than disappearing.
writeFileSync(resolve(DIST, 'index.html'), page(ALL));
const missing = ALL.filter(g => !g.hero || !existsSync(resolve(root, 'shots', g.shotsFrom, g.hero)));
console.log(`\nwrote dist/index.html — ${ALL.length} cards across ${new Set(ALL.map(g => g.level)).size} level(s)`);
if (missing.length) {
  console.log(`no snapshot for: ${[...new Set(missing.map(g => g.shotsFrom))].join(', ')}`);
  console.log(`  fix with: npm run shots <theme>, then set \`hero\` in tools/gallery.mjs`);
}
if (has('--open')) execFileSync('open', [resolve(DIST, 'index.html')]);
