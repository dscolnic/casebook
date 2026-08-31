// theme.js — the one place the engine reaches out to the active theme.
//
// engine/core was extracted from two games that each imported their own
// content directly ('./curriculum.js', './divisions.js', …). Rather than
// rewrite every import, those module names still exist as thin re-exports; all
// of them read from here, and this reads the theme chosen at build time.
//
// `@theme` is a Vite alias set in vite.config.js from THEME=<name>.
import theme from '@theme/theme.js';
import { normalizeContent } from '../content/normalize.js';
import { applyTypography } from './typography.js';

export default theme;
export const CONTENT = theme.content ?? {};

// Content arrives as a design document's importer left it: formats spelled
// three ways, pack references unexpanded, estimates with no spec. Repairing
// that inside each game's theme.js meant the same code in two manifests and a
// third game quietly missing it. One call, here, before anything reads it.
// The site goes in because the near/far tiers are measured from it, and the day
// shaping needs them: before the unlock day a campaign calls near ground only.
// Passing it here rather than at each call site is what keeps the tools honest —
// `tiersFor` runs once, stamps `CONTENT.TIERS`, and every checker that imports a
// theme and re-normalises reads the same answer the game did.
//
// `theme.fixtures` goes in too, so `nearFirst` (inside `shapeMissions`) can
// tell a far-GROUP call that is sited at a near place from one that genuinely
// walks far, and leave the first alone instead of trading it for whatever a
// later day happens to have. A theme with no `fixtures` block gets `{}`,
// which is exactly today's behaviour: nothing reads as sited, every far call
// is judged by its own area, same as before the placement pass existed.
export const CONTENT_REPORT = normalizeContent(CONTENT, theme.site, theme.fixtures ?? {});

// How big the text is, from `theme.audience`. Applied here rather than in an
// entry point because there are three entry points and a feature added to one
// of them reaches one game.
applyTypography(theme);
if(CONTENT_REPORT.problems.length && typeof console !== 'undefined'){
  console.warn(`[${theme.id}] content problems:\n  ` + CONTENT_REPORT.problems.join('\n  '));
}
