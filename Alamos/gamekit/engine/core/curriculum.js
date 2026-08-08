// curriculum.js — the active theme's lessons. See engine/core/theme.js.
import { CONTENT } from './theme.js';

export const CURRICULUM = CONTENT.CURRICULUM ?? {};
// Ballpark activities need numeric specs the prose cannot supply; a theme with
// no estimates supplies none and the engine renders its "not converted" panel.
export const BALLPARK_CALCS = CONTENT.BALLPARK_CALCS ?? {};
export const JARGON = CONTENT.JARGON ?? [];
