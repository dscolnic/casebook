// theme.js — the one place the engine reaches out to the active theme.
//
// engine/core was extracted from two games that each imported their own
// content directly ('./curriculum.js', './divisions.js', …). Rather than
// rewrite every import, those module names still exist as thin re-exports; all
// of them read from here, and this reads the theme chosen at build time.
//
// `@theme` is a Vite alias set in vite.config.js from THEME=<name>.
import theme from '@theme/theme.js';

export default theme;
export const CONTENT = theme.content ?? {};
