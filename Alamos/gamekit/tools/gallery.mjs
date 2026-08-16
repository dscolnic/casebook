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
import { GAMES } from './games.js';

// ------------------------------------------------------------------ helpers

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valueOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const only = (valueOf('--only') ?? '').split(',').map(s => s.trim()).filter(Boolean);
const pageOnly = has('--page');

/** Where a theme's directory is — eight under themes/, two beside gamekit. */
const themeDirOf = (id) => {
  const own = resolve(root, 'themes', id);
  if (existsSync(own)) return own;
  const reg = JSON.parse(readFileSync(resolve(root, 'themes.json'), 'utf8')).themes ?? {};
  return reg[id] ? resolve(root, reg[id]) : own;
};

/** The reading level the theme declares, straight out of its manifest. */
const gradeOf = (id) => {
  const f = resolve(themeDirOf(id), 'theme.js');
  if (!existsSync(f)) return null;
  const m = /audience:\s*\{[^}]*grade:\s*(\d+)/.exec(readFileSync(f, 'utf8'));
  return m ? +m[1] : null;
};

/** The role line the game itself puts under its title. */
const roleOf = (id) => {
  const f = resolve(themeDirOf(id), 'theme.js');
  if (!existsSync(f)) return '';
  const m = /subtitle:\s*'([^']*)'/.exec(readFileSync(f, 'utf8'));
  return m ? m[1].replace(/\\'/g, "'") : '';
};

/**
 * What this game calls a day. Red Sand runs on sols and Bring Them Home on
 * "Day"; a picker that says "Mission 7" when the game itself says "Sol 7" is
 * describing a different game from the one behind the card.
 */
const dayNounOf = (id) => {
  const f = resolve(themeDirOf(id), 'theme.js');
  if (!existsSync(f)) return 'Day';
  const m = /dayNoun:\s*'([^']*)'/.exec(readFileSync(f, 'utf8'));
  return m ? m[1] : 'Day';
};

/** How many days and how many stops the campaign actually runs to. */
const sizeOf = (id) => {
  const f = resolve(themeDirOf(id), 'content', 'missions.js');
  if (!existsSync(f)) return null;
  const src = readFileSync(f, 'utf8');
  const days = (src.match(/^\s{4}"title":/gm) ?? []).length;
  const stops = (src.match(/"group":/g) ?? []).length;
  return days ? { days, stops } : null;
};

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
  const out = resolve(DIST, 'shots', `${g.id}.jpg`);
  const src = g.hero ? resolve(root, 'shots', g.id, g.hero) : null;
  if (!src || !existsSync(src)) return null;
  try {
    execFileSync('sips', ['-Z', '1000', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78',
      src, '--out', out], { stdio: 'pipe' });
  } catch {
    copyFileSync(src, out.replace(/\.jpg$/, '.png'));
    return `shots/${g.id}.png`;
  }
  return `shots/${g.id}.jpg`;
}

// -------------------------------------------------------------------- page

function card(g) {
  const built = existsSync(resolve(DIST, g.id, 'index.html'));
  const shot = stageHero(g);
  const grade = gradeOf(g.id);
  const role = roleOf(g.id);
  const size = sizeOf(g.id);
  const full = SYLLABUS[g.id]?.course ?? '';
  const tag = built ? 'a' : 'div';
  const href = built ? ` href="./${g.id}/index.html"` : '';
  // `data-game` and `data-days` are what the progress script reads. The save
  // itself is never read at build time — it lives in the player's browser, and
  // the picker is served from the same origin as the games, so the page can ask
  // localStorage directly.
  return `
      <${tag} class="card${built ? '' : ' card--unbuilt'}"${href} data-field="${esc(g.field)}"
         data-game="${esc(g.id)}" data-days="${size ? size.days : ''}"
         data-daynoun="${esc(dayNounOf(g.id))}"
         style="--accent:${g.accent}">
        <div class="shot">
          ${shot ? `<img src="${shot}" alt="" loading="lazy">`
                 : `<div class="shot__none" aria-hidden="true"><span>no snapshot yet</span></div>`}
          <div class="shot__veil"></div>
          <span class="field">${esc(g.field)}</span>
          ${built ? '<span class="play" aria-hidden="true">▶</span>' : '<span class="unbuilt">not built</span>'}
          <span class="resume" hidden></span>
          <h2>${esc(g.title)}</h2>
        </div>
        <div class="body">
          <p class="course">${esc(g.course)}</p>
          <p class="place">${esc(g.place)}</p>
          <p class="meta">
            ${role ? `<span>${esc(role)}</span>` : ''}
            ${size ? `<span>${size.days} days · ${size.stops} stops</span>` : ''}
            ${grade ? `<span>reads at grade ${grade}</span>` : ''}
          </p>
          ${full ? `<p class="full">${esc(full)}</p>` : ''}
          <p class="progress" hidden></p>
        </div>
      </${tag}>`;
}

function page(games) {
  const fields = [...new Set(games.map(g => g.field))];
  const builtCount = games.filter(g => existsSync(resolve(DIST, g.id, 'index.html'))).length;
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

  .filters{display:flex; flex-wrap:wrap; gap:8px; margin:26px 0 4px}
  .chip{
    appearance:none; cursor:pointer; border:1px solid var(--line); background:#141821;
    color:var(--dim); border-radius:999px; padding:7px 15px; font:inherit; font-size:13.5px;
    transition:border-color .16s, color .16s, background .16s, transform .12s;
  }
  .chip:hover{color:var(--ink); border-color:#39435a; transform:translateY(-1px)}
  .chip[aria-pressed="true"]{background:var(--ink); color:#0d0f13; border-color:var(--ink)}
  .chip:focus-visible{outline:2px solid #6fc7d8; outline-offset:2px}

  .grid{
    display:grid; gap:22px; margin-top:26px;
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
  .shot h2{
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
      ${games.length} first-person games on one engine. Each is a fortnight of working days:
      walk to a place, read the evidence, answer for it, hand off before the clock runs out.
      No combat, no weapons — the stakes are time, money and other people.
    </p>

    <div class="filters" role="group" aria-label="Filter by subject">
      <button class="chip" aria-pressed="true" data-f="*">All ${games.length}</button>
      ${fields.map(f => `<button class="chip" aria-pressed="false" data-f="${esc(f)}">${esc(f)}</button>`).join('\n      ')}
    </div>
  </header>

  <main class="grid" id="grid">${games.map(card).join('\n')}
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

  const chips = [...document.querySelectorAll('.chip')];
  const cards = [...document.querySelectorAll('.card')];
  const empty = document.getElementById('empty');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(o => o.setAttribute('aria-pressed', String(o === c)));
    const f = c.dataset.f;
    let shown = 0;
    cards.forEach(card => {
      const on = f === '*' || card.dataset.field === f;
      card.style.display = on ? '' : 'none';
      if (on) shown++;
    });
    empty.style.display = shown ? 'none' : 'block';
  }));
</script>
</body>
</html>
`;
}

// -------------------------------------------------------------------- main

const games = only.length ? GAMES.filter(g => only.includes(g.id)) : GAMES;

if (!pageOnly) {
  console.log(`building ${games.length} game(s) into dist/ …`);
  let ok = 0;
  for (const g of games) if (buildTheme(g.id)) ok++;
  console.log(`${ok}/${games.length} built`);
}

mkdirSync(DIST, { recursive: true });
writeFileSync(resolve(DIST, 'index.html'), page(GAMES));
const missing = GAMES.filter(g => !g.hero || !existsSync(resolve(root, 'shots', g.id, g.hero)));
console.log(`\nwrote dist/index.html — ${GAMES.length} games`);
if (missing.length) {
  console.log(`no snapshot for: ${missing.map(g => g.id).join(', ')}`);
  console.log(`  fix with: npm run shots <theme>, then set \`hero\` in tools/gallery.mjs`);
}
if (has('--open')) execFileSync('open', [resolve(DIST, 'index.html')]);
