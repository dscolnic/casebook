// world.js — the active site builder, re-exported under the name the core
// modules already import. `@world` is a Vite alias set in vite.config.js from
// the theme's site.kind, so player.js and interactions.js do not need to know
// whether this game is indoors or out.
//
// Everything listed in THEME_CONTRACT.md § "What the world module must provide"
// passes through here.
export * from '@world';
