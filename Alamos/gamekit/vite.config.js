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
  // interiorFloor builds a whole floor — a spine with rooms down both sides —
  // which is what a theme whose *site* is indoors needs. Two things it is not:
  // interiorSite.js, which is the builder underneath it and exports none of the
  // contract; and interiorBuilding.js, which builds one room to walk into from
  // a town and is not a world module either. This pointed at interiorSite until
  // the first interior theme was scaffolded and failed on import.
  interior: 'engine/world/interiorFloor.js',
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
const read = (theme, f) => {
  const p = resolve(here, 'themes', theme, f);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
};

// Scoped to the site declaration, never the whole file. A bare
// /kind:\s*'(\w+)'/ over plan.js matches the first *room's* `kind: 'reception'`
// and reports a site kind that has no world module — which is what a freshly
// scaffolded interior theme did, before it had rendered a single frame.
function declaredKind(theme){
  for(const [file, re] of [
    // theme.js: site: { kind: 'interior', plan }
    ['theme.js', /\bsite:\s*\{[^}]*?\bkind:\s*'(\w+)'/],
    // site.js / plan.js: export const site = { kind: 'outdoor', … }
    ['site.js', /\bsite\s*=\s*\{[\s\S]{0,600}?\bkind:\s*'(\w+)'/],
    ['plan.js', /\bsite\s*=\s*\{[\s\S]{0,600}?\bkind:\s*'(\w+)'/],
  ]){
    const m = re.exec(read(theme, file));
    if(m) return m[1];
  }
  return 'outdoor';
}
const kind = declaredKind(THEME);
const ownWorld = (/\bworld:\s*'(themes\/[^']+)'/.exec(read(THEME, 'site.js') + read(THEME, 'plan.js')) ?? [])[1] ?? null;
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
