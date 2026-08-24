// themeFacts.js — the few things about a theme both front doors have to read.
//
// WHY IT IS ITS OWN FILE. `tools/games.js` is the catalogue and holds what a
// human wrote about each game; this is what is read back off the theme itself —
// where its directory is, what reading level it declares, what it calls a day,
// and how long the campaign actually runs. `tools/gallery.mjs` and
// `tools/sync-casebook.mjs` both need all of it and both had their own copy,
// which is `games.js`'s own reason for existing one directory over.
//
// The copies had already drifted into being wrong in the same way, which is the
// argument in its cheapest form: `sizeOf` counted every `"title"` at four
// spaces of indent in a generated `missions.js`, and the WARMUPS array below the
// MISSIONS array is written at exactly that indent. So **every card on both
// front doors overstated the length of its campaign by the number of warm-ups**
// — Blackout's fifteen days read as twenty-two, a nine-stop Quick Discovery's
// three levels read as six — and the stop count beside it was right, which is
// what made the pair look plausible. The fix is to stop reading at WARMUPS.
//
// Read as text rather than imported, deliberately: a theme's `theme.js` imports
// its world, and a world imports three.js.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Where a theme's directory is — most under themes/, a couple beside gamekit. */
export const themeDirOf = (id) => {
  const own = resolve(root, 'themes', id);
  if (existsSync(own)) return own;
  const reg = JSON.parse(readFileSync(resolve(root, 'themes.json'), 'utf8')).themes ?? {};
  return reg[id] ? resolve(root, reg[id]) : own;
};

const manifest = (id) => {
  const f = resolve(themeDirOf(id), 'theme.js');
  return existsSync(f) ? readFileSync(f, 'utf8') : '';
};

/** The reading level the theme declares, straight out of its manifest. */
export const gradeOf = (id) => {
  const m = /audience:\s*\{[^}]*grade:\s*(\d+)/.exec(manifest(id));
  return m ? +m[1] : null;
};

/** The role line the game itself puts under its title. */
export const roleOf = (id) => {
  const m = /subtitle:\s*'([^']*)'/.exec(manifest(id));
  return m ? m[1].replace(/\\'/g, "'") : '';
};

/**
 * What this game calls a day. Red Sand runs on sols, Deep Watch on watches, a
 * Quick Discovery on levels; a picker that says "Mission 7" when the game itself
 * says "Sol 7" is describing a different game from the one behind the card.
 */
export const dayNounOf = (id) => {
  const m = /dayNoun:\s*'([^']*)'/.exec(manifest(id));
  return m ? m[1] : 'Day';
};

/**
 * A day's noun in the plural, for a card.
 *
 * Fifteen themes call a day something else — Watch, Sol, Shift, Stage, Phase,
 * Level — and both front doors said "days" for every one of them. The only one
 * that needs more than an `s` is Watch.
 */
export const plural = (noun) =>
  (/(?:s|x|ch|sh)$/i.test(noun) ? `${noun}es` : `${noun}s`).toLowerCase();

/**
 * How many days and how many stops the campaign actually runs to.
 *
 * Counted off the generated content rather than by importing it. The `MISSIONS`
 * array is cut at `WARMUPS` first: both arrays are written at the same indent
 * and their entries both carry a `"title"`, so counting the whole file adds the
 * seven warm-up slots to the length of the campaign. See the note at the top.
 */
export const sizeOf = (id) => {
  const f = resolve(themeDirOf(id), 'content', 'missions.js');
  if (!existsSync(f)) return null;
  const src = readFileSync(f, 'utf8');
  const cut = src.indexOf('export const WARMUPS');
  const missions = cut === -1 ? src : src.slice(0, cut);
  const days = (missions.match(/^\s{4}"title":/gm) ?? []).length;
  const stops = (missions.match(/"group":/g) ?? []).length;
  return days ? { days, stops } : null;
};
