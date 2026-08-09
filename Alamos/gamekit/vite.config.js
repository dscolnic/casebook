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
  // interiorSite builds a whole floor — a spine with rooms down both sides —
  // which is what a theme whose *site* is indoors needs. Not to be confused
  // with engine/world/interiorBuilding.js, which builds one room to walk into
  // from an outdoor town and is not a world module.
  interior: 'engine/world/interiorSite.js',
};

// Read the kind — and any world of the theme's own — without importing the
// theme, which would need a DOM. Both are declared in site.js:
//
//   kind:  'outdoor' | 'interior'      which engine world builds the place
//   world: 'themes/<name>/world.js'    the theme builds its own instead
//
// A theme brings its own world when the place already exists: Deep Watch
// arrived as a finished submarine, and rebuilding it as generated rooms would
// have thrown away the thing that made it worth converting.
import { readFileSync, existsSync } from 'node:fs';
function siteFile(theme){
  for(const f of ['site.js', 'plan.js']){
    const p = resolve(here, 'themes', theme, f);
    if(existsSync(p)) return readFileSync(p, 'utf8');
  }
  return '';
}
const declared = siteFile(THEME);
const kind = (/kind:\s*'(\w+)'/.exec(declared) ?? [])[1] ?? 'outdoor';
const ownWorld = (/\bworld:\s*'([^']+)'/.exec(declared) ?? [])[1] ?? null;
const world = ownWorld ?? WORLDS[kind];
if(!world) throw new Error(`theme "${THEME}" declares site kind "${kind}", which has no world module`);
if(ownWorld && !existsSync(resolve(here, ownWorld))){
  throw new Error(`theme "${THEME}" declares world "${ownWorld}", which does not exist`);
}

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
