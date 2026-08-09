// new-theme.mjs — start a fourth game.
//
//   node tools/new-theme.mjs <name> [--interior]
//
// Copies themes/_template, fills the name in, registers the theme so every
// check can see it from the first commit, and prints the list of things a
// design book cannot supply. That list is the actual cost of a new game, and
// discovering it one missing file at a time is how the last three went.
import { cpSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
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

cpSync(resolve(root, 'themes/_template'), dir, { recursive: true });

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

const kind = flags.includes('--interior') ? 'interior' : 'outdoor';
console.log(`themes/${name} created (site kind: ${kind}) and registered in themes.json

Run it:            THEME=${name} npm run dev
Check it:          npm run check ${name}

Import the book — run both with --dry, the one that reports missions is right:
  node tools/import-missionbook.mjs <book>.docx ${name} --dry
  node tools/import-designbook.mjs  <book>.docx ${name} --dry
Then re-run the right one with --map tools/${name}-map.json --verify

What a book cannot supply — these are the hours:

  content/groups.js         the areas of study. A design decision, not in the book.
  content/roster.js         the cast. Books name functions, not people.
                            EVERY entry needs a \`division\`, or a person stop
                            there is unreachable and nothing says so.
                            Bios under ~40 characters degrade the passage
                            question to a role question.
  content/ballpark-specs.js the number-tile estimates. Prose carries no arithmetic.
  content/diagnosis-packs.js optional, but a DIAGNOSIS with no panel is retyped
                            to a plain question on load.
  site.js or plan.js        the place, as data. Every group needs a building or
                            a room in it.
  interiors.js              optional: what is inside each room, and what its
                            instrument reads.
  props.js, outfits.js      the fit-out and the clothes.

Then, before you believe any of it: walk into the rooms and screenshot them.
None of the checks can see a wrong-looking scene.`);
