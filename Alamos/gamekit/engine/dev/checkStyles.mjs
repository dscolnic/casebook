// checkStyles.mjs — a per-game stylesheet may override the engine's, but it
// may not quietly re-declare it.
//
// Two games shipped a 107-rule copy of the engine sheet that stopped before the
// instrument-panel rules. Everything the shared question UI drew was unstyled
// in both, and the copy also froze those games at whatever the engine looked
// like on the day it was forked. This fails the moment that starts again.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { themeNames, themeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const engine = resolve(here, '../core/styles.css');

/** Selector -> body, media blocks skipped: a media rule is a real override. */
function rules(css){
  const flat = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media[^{]*\{[\s\S]*?\}\s*\}/g, '');
  const out = new Map();
  for(const m of flat.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
    const sel = m[1].split(/\s+/).join(' ').trim();
    if(sel.startsWith('@')) continue;
    out.set(sel, m[2].split(/\s+/).join(' ').trim());
  }
  return out;
}

const base = rules(readFileSync(engine, 'utf8'));
const problems = [];
for(const name of themeNames()){
  for(const rel of ['src/styles.css', 'styles.css']){
    const path = resolve(themeDir(name), rel);
    if(!existsSync(path)) continue;
    const css = readFileSync(path, 'utf8');
    if(!/@import\s+['"].*engine\/core\/styles\.css/.test(css)){
      problems.push(`${name}: ${rel} does not @import the engine stylesheet`);
    }
    for(const [sel, body] of rules(css)){
      if(base.has(sel) && base.get(sel) === body){
        problems.push(`${name}: ${rel} re-declares "${sel}" identically to the engine — delete it`);
      }
    }
  }
}
if(problems.length){
  console.error(`\n${problems.length} stylesheet problem(s):`);
  problems.forEach(p => console.error('  ✗ ' + p));
  process.exit(1);
}
console.log('\n✓ no game stylesheet re-declares the engine\'s');
