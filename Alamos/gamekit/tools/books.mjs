// books.mjs — which book belongs to which theme.
//
// The books are named for the game and the themes for the directory, so
// `bring_them_home` is `bring-them-home.yml` and `projecty` is `project-y.yml`.
// Four tools each carried their own copy of that map — export-stops,
// export-copy, apply-copy, apply-conversions — and a fifth in engine/dev did it
// a different and better way: match on the separator-free spelling, so nothing
// has to be listed at all.
//
// The map was also a wall in front of editions. `planetary_defense_ms` is a
// registered theme with a book at `books/planetary-defense-ms.yml`, and every
// tool holding a hardcoded map reported that it had no book — the same failure
// the comment in export-stops already warned about for `the_trial`, which was
// registered, had a 45-stop book, and was silently skipped by `export-stops
// all`.
//
// So: match the way bookParity.mjs matches, and keep the explicit map only as a
// fallback for a name that flattens to something else entirely.
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
const BOOKS_DIR = resolve(here, '..', 'books');

const flat = (s) => String(s).replace(/[-_\s]/g, '').toLowerCase();

/** Books that do not flatten onto their theme name. Empty, so far. */
const EXPLICIT = {};

/**
 * The book file's base name for a theme, or null if it has none.
 *
 * `bookNameFor('deepwatch')` → `'deep-watch'`
 * `bookNameFor('planetary_defense_ms')` → `'planetary-defense-ms'`
 */
export function bookNameFor(theme){
  if(EXPLICIT[theme]) return EXPLICIT[theme];
  if(!existsSync(BOOKS_DIR)) return null;
  const hit = readdirSync(BOOKS_DIR).filter(f => f.endsWith('.yml'))
    .find(f => flat(f.replace(/\.yml$/, '')) === flat(theme));
  return hit ? hit.replace(/\.yml$/, '') : null;
}

/** Every theme name in the registry that has a book. */
export function themesWithBooks(registry){
  return Object.keys(registry ?? {}).filter(t => bookNameFor(t));
}
