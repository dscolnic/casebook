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

// Where a theme's directory actually is. Eight are under `themes/`; two predate
// it and live in their own package directories beside gamekit. This used to be
// hardcoded to `themes/<name>`, which meant the two older games could only be
// served from their own package — so `npm run dev`, `engine/dev/instruments.html`
// and `npm run drive` all silently refused to load them, with a "Failed to
// resolve import @theme/theme.js" that reads like a broken checkout. The same
// map `themes.json` gives every checker now answers it here too.
const themeDirOf = (theme) => {
  const own = resolve(here, 'themes', theme);
  if(existsSync(own)) return own;
  try{
    const reg = JSON.parse(readFileSync(resolve(here, 'themes.json'), 'utf8')).themes ?? {};
    if(reg[theme]) return resolve(here, reg[theme]);
  }catch{}
  return own;
};
const THEME_DIR = themeDirOf(THEME);

// An *edition* — the same game taught at another reading level — owns a
// manifest and its content and nothing else: its site.js is a one-line
// re-export of the base theme's, and the two regexes below read source text, so
// they would find no site kind and no world at all. The marker is one line in
// the manifest, `// edition-of: <base>`, and it is the same line
// engine/dev/registry.mjs reads. See MIDDLE_SCHOOL_EDITIONS.md §2.
const EDITION_BASE = (() => {
  const p = resolve(THEME_DIR, 'theme.js');
  if(!existsSync(p)) return null;
  const m = /^\/\/\s*edition-of:\s*([\w-]+)\s*$/m.exec(readFileSync(p, 'utf8'));
  return m ? m[1] : null;
})();
// Where the *place* is declared. The content is still THEME_DIR's.
const PLACE_DIR = EDITION_BASE ? themeDirOf(EDITION_BASE) : THEME_DIR;

const read = (theme, f) => {
  const p = resolve(PLACE_DIR, f);
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
      '@theme': THEME_DIR,
      '@world': resolve(here, world),
    },
  },
  server: {
    open: true,
    // A theme outside the vite root has to be readable, or every module under it
    // 403s with no explanation.
    fs: { allow: [here, THEME_DIR, PLACE_DIR, resolve(here, '..')] },
  },
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
