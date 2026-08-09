// registry.mjs — theme name -> directory, for the dev tools.
//
// Two of the three games predate themes/ and live in their own package
// directories, so every tool had a copy of the same "is there a slash in it"
// guess. themes.json is the one list; add a game there and every check can see
// it. A path is still accepted, for a theme that is not registered yet.
import { readFileSync } from 'node:fs';
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
