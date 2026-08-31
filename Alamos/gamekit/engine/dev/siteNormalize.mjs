// siteNormalize.mjs — does every checker normalise the campaign the game runs?
//
//   node engine/dev/siteNormalize.mjs [--selftest]
//
// `normalizeContent(content, site, fixtures)` stamps `TIERS`/`UNLOCK_DAY` only
// when it is handed a site, and `nearFirst` — the pass that trades a far call
// out of the opening days — returns early without them. So a checker that calls
// `normalizeContent(content)` on a theme it loaded from disk is asserting
// against a campaign the player never plays: on seven of the themes registered
// today the days differ, `aftershock` on nine of its fifteen.
//
// It shipped that way for a long time and nothing could see it, because the
// output of the wrong campaign looks exactly as clean as the output of the right
// one. `checkNames` was the one that finally showed it — it read the GREET card
// on two-tier sites, which the engine never runs, and so fifteen people across
// seven campaigns were introduced only on a card nobody is shown.
//
// This is a source check rather than a content check: it reads the checkers
// themselves. A call with one argument is the defect; a hand-built fixture that
// genuinely has no site says so by passing `null` explicitly, which is also the
// line a reader needs to understand why.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
const DIRS = ['engine/dev', 'engine/core', 'engine/content', 'tools'];

/** Every `normalizeContent(` call in `src`, with the argument count it passes. */
export function callsIn(src){
  const out = [];
  const re = /normalizeContent\s*\(/g;
  let m;
  while((m = re.exec(src))){
    // Skip the definition itself and any import of the name.
    const before = src.slice(Math.max(0, m.index - 20), m.index);
    if(/function\s+$/.test(before)) continue;
    // Walk to the matching close paren, counting only top-level commas.
    let depth = 0, commas = 0, i = m.index + m[0].length - 1;
    let inStr = null;
    for(; i < src.length; i++){
      const c = src[i];
      if(inStr){
        if(c === '\\'){ i++; continue; }
        if(c === inStr) inStr = null;
        continue;
      }
      if(c === '"' || c === "'" || c === '`'){ inStr = c; continue; }
      if(c === '(' || c === '[' || c === '{') depth++;
      else if(c === ')' || c === ']' || c === '}'){ depth--; if(depth === 0) break; }
      else if(c === ',' && depth === 1) commas++;
    }
    const line = src.slice(0, m.index).split('\n').length;
    out.push({ line, args: commas + 1 });
  }
  return out;
}

function selftest(){
  const cases = [];
  const check = (what, ok, got = '') => { console.log(`  ${ok ? '✓' : '✗'} ${what}${ok ? '' : ` — ${got}`}`); cases.push(ok); };

  const one = callsIn('normalizeContent(content);');
  check('a one-argument call is counted as one argument', one.length === 1 && one[0].args === 1, JSON.stringify(one));

  const three = callsIn('normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});');
  check('three arguments are counted as three', three.length === 1 && three[0].args === 3, JSON.stringify(three));

  // The case this parser exists for: an object literal spanning lines, with
  // commas of its own, is ONE argument and the site is the second.
  const literal = callsIn(`normalizeContent({
    CURRICULUM, MISSIONS, ROSTER,
    JARGON: [], BALLPARK_CALCS: {},
  }, manifest?.site ?? null, manifest?.fixtures ?? {});`);
  check('an object literal with commas inside it is still one argument',
    literal.length === 1 && literal[0].args === 3, JSON.stringify(literal));

  // And an explicit null is two arguments, which is what a real fixture writes.
  const nulled = callsIn('normalizeContent(fixture, null);');
  check('an explicit null site is two arguments, and passes', nulled.length === 1 && nulled[0].args === 2, JSON.stringify(nulled));

  // A comma inside a string must not be counted.
  const str = callsIn(`normalizeContent(content, site, { note: 'a, b' });`);
  check('a comma inside a string is not an argument separator', str.length === 1 && str[0].args === 3, JSON.stringify(str));

  check('the definition itself is not a call', callsIn('export function normalizeContent(content = {}, site = null){').length === 0);

  const bad = cases.filter(x => !x).length;
  console.log(bad ? `\n✗ siteNormalize selftest: ${bad} case(s) failed` : `\n✓ siteNormalize selftest: ${cases.length} cases`);
  process.exit(bad ? 1 : 0);
}

if(process.argv.includes('--selftest')) selftest();

const problems = [];
let scanned = 0, calls = 0;
for(const dir of DIRS){
  const abs = resolve(ROOT, dir);
  let names;
  try { names = readdirSync(abs); } catch { continue; }
  for(const name of names){
    if(!/\.(mjs|js)$/.test(name)) continue;
    const p = resolve(abs, name);
    const rel = relative(ROOT, p);
    if(rel === relative(ROOT, resolve(HERE, 'siteNormalize.mjs'))) continue;   // this file talks about the call
    const src = readFileSync(p, 'utf8');
    scanned++;
    for(const c of callsIn(src)){
      calls++;
      if(c.args < 2) problems.push(`${rel}:${c.line} normalises with no site — pass `
        + '`theme.site ?? null, theme.fixtures ?? {}`, or an explicit `null` if the content really has no site');
    }
  }
}

if(problems.length){
  console.log(`\n✗ ${problems.length} call(s) normalise a campaign without its site:`);
  for(const p of problems) console.log('  ✗ ' + p);
  console.log('  (without the site there are no tiers, so `nearFirst` never trades a far call out of the'
    + ' opening days and the checker reads days the game does not run)');
  process.exit(1);
}
console.log(`✓ siteNormalize: ${calls} normalizeContent call(s) across ${scanned} file(s), every one with a site or an explicit null`);
