// typography.js — how big the text is, decided by who is reading it.
//
// The same game will exist at several reading levels: the hospital is written
// for eight-year-olds and the chemistry game for undergraduates, and there is
// no reason the interface should be the same size for both. A nine-year-old
// reading a question panel wants noticeably larger type than an adult reading
// the same layout, and that is a property of the *edition*, not a preference
// the player should have to find in a settings sheet.
//
// So a theme declares its audience:
//
//   audience: { grade: 4 }          // scales to 1.18×
//   audience: { grade: 4, textScale: 1.25 }   // or say it outright
//
// Everything in the stylesheets that is sized in `rem` follows, because the
// scale is applied to the root font size and nothing else. Anything specified
// in `px` deliberately does not: hairlines, icon boxes and the map's own
// labels are sized against the geometry around them rather than against the
// reader.
// No import of theme.js here. This is called *from* theme.js and takes the
// manifest as an argument: importing it back would be a cycle, and a cycle
// whose timing happens to work is a cycle that breaks the first time somebody
// reorders two lines.

/**
 * The root size everything else is relative to.
 *
 * 16 is the browser default and what index.html declares; 18.4 is that at 115%,
 * which is where the type reads comfortably in a first-person game — the panels
 * are read at arm's length over a moving world, not on a document page. Every
 * edition scale below multiplies this, so the whole ladder moved with it.
 */
export const BASE_PX = 18.4;

/** What the reader chose, on top of whatever the edition says. */
const READER_KEY = 'gamekit_textScale_v1';
const READER_STEPS = [0.9, 1, 1.15, 1.3, 1.5];

export function readerScale(){
  try{
    const v = Number(localStorage.getItem(READER_KEY));
    return READER_STEPS.includes(v) ? v : 1;
  }catch{ return 1; }
}

/**
 * Grade to scale.
 *
 * The steps are deliberately coarse. The difference that matters is between a
 * child's edition and an adult's, and a continuous function of grade invites
 * arguments about whether year 7 should be 1.09 or 1.11.
 */
export function textScaleForGrade(grade){
  if(!Number.isFinite(grade)) return 1;
  if(grade <= 3) return 1.30;      // early primary: a seven-year-old reading a panel
  if(grade <= 5) return 1.18;      // upper primary
  if(grade <= 8) return 1.10;      // middle school
  if(grade <= 12) return 1.04;     // high school
  return 1;                        // undergraduate and up
}

/** What a theme's text scale actually is. */
export function textScale(theme){
  const a = theme?.audience ?? {};
  if(Number.isFinite(a.textScale)) return a.textScale;
  return textScaleForGrade(a.grade);
}

/**
 * Apply it. Safe to call more than once, and a no-op outside a browser so the
 * headless checkers can import anything that imports this.
 */
export function applyTypography(theme){
  if(typeof document === 'undefined') return 1;
  // The edition scale says who the game is written for; the reader scale is the
  // player saying the type is too small anyway. They multiply, so a grade-4
  // edition read by somebody who wants it larger still gets both.
  const scale = textScale(theme) * readerScale();
  const root = document.documentElement;
  root.style.fontSize = `${(BASE_PX * scale).toFixed(2)}px`;
  installTextSizeControl(theme);
  // Exposed so a stylesheet can scale something that is not in rem, and so the
  // value is visible in the inspector rather than inferred from a font size.
  root.style.setProperty('--textScale', String(scale));
  root.dataset.audienceGrade = Number.isFinite(theme?.audience?.grade)
    ? String(theme.audience.grade) : '';
  return scale;
}

/**
 * The reader's own size control, installed into whatever settings sheet the
 * game has.
 *
 * It lives here rather than in each index.html because there are three entry
 * points and a control added to one of them reaches one game. This runs from
 * theme.js, which every game goes through.
 */
function installTextSizeControl(theme){
  const body = document.querySelector('#settingsOverlay .sheetBody');
  if(!body || document.getElementById('setTextSize')) return;
  const current = readerScale();
  const row = document.createElement('div');
  row.className = 'settingRow';
  row.innerHTML = '<span><b>Text size</b><small>Applies to every panel, card and question.</small></span>'
    + `<div id="setTextSize" class="textSizeSteps">${READER_STEPS.map(v =>
        `<button class="btn small${v === current ? ' on' : ''}" type="button" data-scale="${v}">`
        + `${v === 1 ? 'Normal' : Math.round(v * 100) + '%'}</button>`).join('')}</div>`;
  // Above the restart row, which should stay last.
  const danger = body.querySelector('.settingRow.danger');
  body.insertBefore(row, danger ?? null);
  row.querySelectorAll('[data-scale]').forEach(b => b.onclick = () => {
    try{ localStorage.setItem(READER_KEY, b.dataset.scale); }catch{ /* private mode */ }
    row.querySelectorAll('[data-scale]').forEach(x => x.classList.toggle('on', x === b));
    document.documentElement.style.fontSize =
      `${(BASE_PX * textScale(theme) * Number(b.dataset.scale)).toFixed(2)}px`;
  });
}
