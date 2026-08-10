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

/** The root size everything else is relative to. Matches index.html. */
export const BASE_PX = 15;

/**
 * Grade to scale.
 *
 * The steps are deliberately coarse. The difference that matters is between a
 * child's edition and an adult's, and a continuous function of grade invites
 * arguments about whether year 7 should be 1.09 or 1.11.
 */
export function textScaleForGrade(grade){
  if(!Number.isFinite(grade)) return 1;
  if(grade <= 5) return 1.18;      // primary: the hospital
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
  const scale = textScale(theme);
  const root = document.documentElement;
  root.style.fontSize = `${(BASE_PX * scale).toFixed(2)}px`;
  // Exposed so a stylesheet can scale something that is not in rem, and so the
  // value is visible in the inspector rather than inferred from a font size.
  root.style.setProperty('--textScale', String(scale));
  root.dataset.audienceGrade = Number.isFinite(theme?.audience?.grade)
    ? String(theme.audience.grade) : '';
  return scale;
}
