// registry.mjs — theme name -> directory, for the dev tools.
//
// Two of the three games predate themes/ and live in their own package
// directories, so every tool had a copy of the same "is there a slash in it"
// guess. themes.json is the one list; add a game there and every check can see
// it. A path is still accepted, for a theme that is not registered yet.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '../..');

let registry = {};
try{
  registry = JSON.parse(readFileSync(resolve(root, 'themes.json'), 'utf8')).themes ?? {};
}catch{ /* no registry: paths still work */ }

/** Every registered theme name, in file order. */
export function themeNames(){ return Object.keys(registry); }

/** Absolute directory for a theme name, or for a path given directly. */
export function themeDir(nameOrPath){
  if(nameOrPath.includes('/')) return resolve(process.cwd(), nameOrPath);
  if(registry[nameOrPath]) return resolve(root, registry[nameOrPath]);
  return resolve(root, 'themes', nameOrPath);
}

// ------------------------------------------------------------------ editions
//
// An *edition* is the same game taught to a different audience: same place,
// same cast, same story, a different course. `themes/redsand_ms` carries a
// manifest and generated content and nothing else — its site, props, interiors
// and outfits are the base theme's, imported across.
//
// It is a registered theme in its own right rather than a build flag, because
// the save slot is `gamekit_${theme.id}_v1` and two editions sharing an id
// share a campaign. See MIDDLE_SCHOOL_EDITIONS.md §2.
//
// The marker is one line in the edition's manifest:
//
//   // edition-of: redsand
//
// Anything that reads a theme's *content* wants `themeDir`. Anything that reads
// the *place* — site.js, plan.js, props.js, interiors.js — wants `placeDir`, or
// it reports a game with no buildings in it.
const EDITION_OF = /^\/\/\s*edition-of:\s*([\w-]+)\s*$/m;

/** The theme this one is an edition of, or null if it is not an edition. */
export function editionBase(nameOrPath){
  const f = resolve(themeDir(nameOrPath), 'theme.js');
  if(!existsSync(f)) return null;
  const m = EDITION_OF.exec(readFileSync(f, 'utf8'));
  return m ? m[1] : null;
}

/** Where this theme's *place* is built — the base theme's, for an edition. */
export function placeDir(nameOrPath){
  const base = editionBase(nameOrPath);
  return base ? themeDir(base) : themeDir(nameOrPath);
}
