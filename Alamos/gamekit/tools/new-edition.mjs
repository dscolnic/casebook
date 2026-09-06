// new-edition.mjs — a parallel edition of a game that already exists.
//
//   node tools/new-edition.mjs <base> <new id>
//
// WHY A COPY AND NOT A RE-EXPORT. An edition owns its whole directory — site,
// fixtures, props, content — which is how `redsand_v5` sits beside `redsand`.
// It costs a few hundred kilobytes and it buys the only thing that matters here:
// the shipped game is untouched while the edition grows new areas, new fixtures
// and a new campaign, and the teardown is one `rm -rf` and one line out of
// themes.json. See gamekit/REWRITE_PASS.md.
//
// This writes the scaffold only. The book is imported over it afterwards.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [base, id] = process.argv.slice(2);
if(!base || !id){
  console.error('usage: node tools/new-edition.mjs <base theme> <new theme id>');
  process.exit(2);
}
const from = resolve('themes', base), to = resolve('themes', id);
if(!existsSync(from)){ console.error(`no themes/${base}`); process.exit(2); }
if(existsSync(to)){ console.error(`themes/${id} already exists`); process.exit(2); }

cpSync(from, to, { recursive: true });

// The id is the one thing that must differ, and it appears in the manifest and
// in whatever the theme names after itself.
const manifest = resolve(to, 'theme.js');
let m = readFileSync(manifest, 'utf8');
m = m.replace(new RegExp(`id: '${base}'`), `id: '${id}'`);
writeFileSync(manifest, m);

const reg = resolve('themes.json');
const themes = JSON.parse(readFileSync(reg, 'utf8'));
const key = themes.themes ? 'themes' : null;
if(key) themes[key][id] = `themes/${id}`;
else themes[id] = `themes/${id}`;
writeFileSync(reg, JSON.stringify(themes, null, 2) + '\n');

console.log(`themes/${id} created from ${base}, and registered.`);
console.log(`Next: import the book over it, then \`npm run check ${id}\`.`);
