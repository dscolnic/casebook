// vite.config.js — choose the theme at build time.
//
//   THEME=contamcity npm run dev
//   THEME=contamcity npm run build
//
// engine/core imports its content under fixed names ('./curriculum.js',
// './divisions.js', './world.js', …). Those are thin re-exports that all resolve
// through the two aliases set here, so the engine never names a theme and a
// theme never edits the engine.
import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// `--theme x` is accepted as well as THEME=x, because that is the form
// NEW_GAME.md documents. Vite ignores arguments it does not recognise.
const argTheme = (() => {
  const i = process.argv.indexOf('--theme');
  return i >= 0 ? process.argv[i + 1] : null;
})();
const THEME = argTheme || process.env.THEME || 'contamcity';

// site.kind -> world module. One line per world builder, not per theme; a new
// theme only appears here if it introduces a genuinely new kind of place.
const WORLDS = {
  outdoor: 'engine/world/outdoorTown.js',
  interior: 'engine/world/interiorBuilding.js',
};

// Read the kind without importing the theme (which would need a DOM). A theme
// declares it in site.js as `kind: 'outdoor'`.
import { readFileSync, existsSync } from 'node:fs';
function siteKind(theme){
  for(const f of ['site.js', 'plan.js']){
    const p = resolve(here, 'themes', theme, f);
    if(!existsSync(p)) continue;
    const m = /kind:\s*'(\w+)'/.exec(readFileSync(p, 'utf8'));
    if(m) return m[1];
  }
  return 'outdoor';
}
const kind = siteKind(THEME);
const world = WORLDS[kind];
if(!world) throw new Error(`theme "${THEME}" declares site kind "${kind}", which has no world module`);

export default defineConfig({
  resolve: {
    alias: {
      '@theme': resolve(here, 'themes', THEME),
      '@world': resolve(here, world),
    },
  },
  server: { open: true },
  build: {
    outDir: `dist/${THEME}`,
    rollupOptions: {
      output: {
        // three is 600 kB and never changes; keeping it in its own chunk means a
        // content edit does not invalidate it in the browser cache.
        manualChunks: { three: ['three'] },
      },
    },
  },
});
