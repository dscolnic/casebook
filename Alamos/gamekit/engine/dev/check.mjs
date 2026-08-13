// check.mjs — run every check against every game.
//
//   node engine/dev/check.mjs            all registered themes
//   node engine/dev/check.mjs hospital   one of them
//
// validateContent asks whether the content agrees with itself and with the
// theme contract. smokeCampaign asks whether the engine can actually reach and
// grade every stop. They catch different things, which is why both run, and why
// this exists rather than a line in a README nobody runs.
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const wanted = process.argv[2] ? [process.argv[2]] : themeNames();
if(!wanted.length){
  console.error('no themes registered in themes.json, and none named on the command line');
  process.exit(2);
}

let failed = 0;
for(const theme of wanted){
  for(const tool of ['validateContent.mjs', 'smokeCampaign.mjs', 'probeQuestions.mjs', 'personStops.mjs',
                     'checkStory.mjs', 'checkNames.mjs', 'checkJargon.mjs', 'bookParity.mjs']){
    const res = spawnSync(process.execPath, [resolve(here, tool), theme],
      { stdio: 'inherit', cwd: resolve(here, '../..') });
    if(res.status !== 0) failed++;
  }
}
// One cross-cutting check, not per theme: no game stylesheet re-declares the
// engine's.
if(!process.argv[2]){
  for(const tool of ['checkStyles.mjs', 'worldParity.mjs']){
    const res = spawnSync(process.execPath, [resolve(here, tool)],
      { stdio: 'inherit', cwd: resolve(here, '../..') });
    if(res.status !== 0) failed++;
  }
}

console.log(failed ? `\n${failed} check(s) failed.` : `\nAll checks passed for ${wanted.length} theme(s).`);
process.exit(failed ? 1 : 0);
