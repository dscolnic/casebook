// new-theme.mjs — start a new game.
//
//   node tools/new-theme.mjs <name> [--interior]
//
// Copies themes/_template, picks the outdoor or interior manifest, imports the
// starter book over it, registers the theme so every check can see it from the
// first commit, and prints what a book cannot supply.
//
// The import is the point. A scaffold that does not run is a scaffold you have
// to debug before you have written anything, and until this did the import the
// first thing a new theme did was fail `npm run check` on placeholder content —
// with a stack trace, not a message. What comes out of this command now is a
// complete small game: three areas, four days, one worked example of every
// question format, walkable and green. Replace book.yml and re-import.
import { cpSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname, join } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');
const [name, ...flags] = process.argv.slice(2);
if(!name || name.startsWith('-')){
  console.error('usage: node tools/new-theme.mjs <name> [--interior]');
  process.exit(2);
}
const dir = resolve(root, 'themes', name);
if(existsSync(dir)){
  console.error(`themes/${name} already exists`);
  process.exit(1);
}
const interior = flags.includes('--interior');

cpSync(resolve(root, 'themes/_template'), dir, { recursive: true });

// The place, and the manifest that goes with it. `--interior` used to change
// nothing but the sentence printed at the end, so an outdoor scaffold shipped
// with an interior floor plan and no site data at all.
if(interior){
  renameSync(join(dir, 'theme.interior.js'), join(dir, 'theme.js'));
  rmSync(join(dir, 'site.js'));
} else {
  rmSync(join(dir, 'theme.interior.js'));
  rmSync(join(dir, 'plan.js'));
}

// Fill the name through every copied file, so nothing ships called "_template".
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
for(const file of walk(dir)){
  const src = readFileSync(file, 'utf8');
  const out = src.replace(/_template/g, name).replace(/__THEME__/g, name);
  if(out !== src) writeFileSync(file, out);
}

// Register it. A theme the checks cannot see is a theme nobody checks.
const regPath = resolve(root, 'themes.json');
const reg = JSON.parse(readFileSync(regPath, 'utf8'));
reg.themes[name] = `themes/${name}`;
writeFileSync(regPath, JSON.stringify(reg, null, 2) + '\n');

// Import the starter book, so the theme is playable before it is written.
try{
  execFileSync(process.execPath, [resolve(here, 'import-book.mjs'), join(dir, 'book.yml'), name],
               { stdio: 'inherit', cwd: root });
}catch{
  console.error('\nthe starter book failed to import — themes/' + name + ' is scaffolded but not playable');
  process.exit(1);
}

console.log(`
themes/${name} created (${interior ? 'interior' : 'outdoor'}), registered, and the starter book imported.

Run it:            THEME=${name} npm run dev
Check it:          npm run check ${name}

Write the real game as one book file and import it over the top:

  cp themes/${name}/book.yml books/${name}.yml     # or start from tools/BOOK_TEMPLATE.md
  node tools/import-book.mjs books/${name}.yml ${name} --verify

The book carries the areas, the cast and their bios, every mission and stop, the
estimate specs, the glossary, what is inside each room and what each place says.
It refuses to write a game that would be unplayable.

What the book cannot supply — these are the hours:

  ${interior ? 'plan.js' : 'site.js'}${interior ? '                   the place, as data: a spine with rooms off it.' : '                   the place, as data: buildings on terrain.'}
                            Every group needs somewhere to happen, or that call
                            is unreachable. \`worldParity\` is what catches it.
  props.js                  the ten or so objects that make this place itself.
                            Everything generic is in engine/world/kit.js.
  outfits.js                what people wear.
  theme.js                  title, subtitle, the opening paragraphs, the look,
                            and \`interiorStyle\`: lab, timber or steel.

Then, before you believe any of it: walk into the rooms and screenshot them.
None of the checks can see a wrong-looking scene.`);
