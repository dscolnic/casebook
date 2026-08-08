// themeResolver.mjs — resolve the `@theme` and `@world` aliases under Node.
//
// Vite supplies these in the browser (see vite.config.js). The headless tools
// need the same names to mean the same things, so they register this hook
// instead of duplicating the engine's import graph.
import { pathToFileURL } from 'node:url';
import { resolve as resolvePath } from 'node:path';

let THEME_DIR = null;
let WORLD_FILE = null;

export function initialize(data){
  THEME_DIR = data.themeDir;
  WORLD_FILE = data.worldFile ?? null;
}

export async function resolve(specifier, context, next){
  if(specifier === '@theme' || specifier.startsWith('@theme/')){
    const rest = specifier.slice('@theme'.length).replace(/^\//, '') || 'theme.js';
    return next(pathToFileURL(resolvePath(THEME_DIR, rest)).href, context);
  }
  if(WORLD_FILE && (specifier === '@world' || specifier.startsWith('@world/'))){
    return next(pathToFileURL(WORLD_FILE).href, context);
  }
  return next(specifier, context);
}
