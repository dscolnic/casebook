// ambience.mjs — does the manifest ask for a sound, a weather and a room style
// the engine actually has?
//
//   node engine/dev/ambience.mjs <theme>
//   node engine/dev/ambience.mjs --selftest
//
// WHY. All three layers fail silent. `audio.bed: 'see'` falls through the voice
// switch to nothing and the site is quiet; `weather.kind: 'hail'` builds no
// cloud; `interiorStyle: 'modul'` falls back to the laboratory. None of them
// throws, none of them logs, and every one of them looks exactly like the
// feature not having been wired — which is the shape of defect this repo's
// measurement rule exists for. So the names are checked against the lists the
// engine itself exports, and nothing here holds a second copy of any of them.
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import { installDom } from './headless.mjs';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

/**
 * Judge one manifest against the engine's own vocabularies. Pure — takes the
 * declarations and the lists, returns findings — so the selftest can hand it a
 * made-up manifest.
 */
export function judge({ audio = null, weather = null, interiorStyle = null } = {},
                      { beds, emitters, weathers, styles }){
  const fail = [];
  if(audio !== null && audio !== undefined){
    if(audio.bed !== undefined && !beds.includes(audio.bed)){
      fail.push(`audio.bed "${audio.bed}" is not a voice the engine has (${beds.join(', ')})`);
    }
    if(audio.indoors !== undefined && !beds.includes(audio.indoors)){
      fail.push(`audio.indoors "${audio.indoors}" is not a voice the engine has (${beds.join(', ')})`);
    }
    (audio.emitters ?? []).forEach((e, i) => {
      if(!emitters.includes(e.kind)){
        fail.push(`audio.emitters[${i}] kind "${e.kind}" is not a voice the engine has (${emitters.join(', ')})`);
      }
      if(!Number.isFinite(e.x) || !Number.isFinite(e.z)){
        fail.push(`audio.emitters[${i}] (${e.kind}) has no finite x, z — it would be dropped silently`);
      }
      if(e.r !== undefined && !(e.r > 0)){
        fail.push(`audio.emitters[${i}] (${e.kind}) has radius ${e.r}; nothing is heard inside zero metres`);
      }
    });
  }
  if(weather !== null && weather !== undefined){
    if(!weathers.includes(weather.kind)){
      fail.push(`site.weather.kind "${weather.kind}" is not a kind the engine has (${weathers.join(', ')})`);
    }
    if(weather.density !== undefined && !(weather.density > 0 && weather.density <= 1)){
      fail.push(`site.weather.density ${weather.density} is outside (0, 1]`);
    }
  }
  if(interiorStyle !== null && interiorStyle !== undefined && !styles.includes(interiorStyle)){
    fail.push(`interiorStyle "${interiorStyle}" is not a style interiorBuilding has (${styles.join(', ')}) — it would fall back to "lab"`);
  }
  return fail;
}

async function vocab(){
  installDom();
  const audio = await import(pathToFileURL(resolve(gamekit, 'engine/core/audio.js')).href);
  const weather = await import(pathToFileURL(resolve(gamekit, 'engine/world/weather.js')).href);
  const rooms = await import(pathToFileURL(resolve(gamekit, 'engine/world/interiorBuilding.js')).href);
  return {
    beds: audio.AUDIO_BEDS, emitters: audio.AUDIO_EMITTERS,
    weathers: weather.WEATHER_KINDS, styles: rooms.STYLE_NAMES,
  };
}

async function run(theme){
  const dir = resolveTheme(theme);
  const manifestPath = resolve(dir, 'theme.js');
  if(!existsSync(manifestPath)){ console.log(`✓ ${theme}: no manifest here to judge`); return 0; }
  const V = await vocab();
  const manifest = (await import(pathToFileURL(manifestPath).href)).default;
  const fail = judge({
    audio: manifest.audio ?? null,
    weather: manifest.site?.weather ?? null,
    interiorStyle: manifest.interiorStyle ?? null,
  }, V);
  for(const f of fail) console.log(`✗ ${theme}: ${f}`);
  if(!fail.length){
    const a = manifest.audio ? `${manifest.audio.bed ?? 'default'} bed, ${(manifest.audio.emitters ?? []).length} emitter(s)` : 'default sound';
    const w = manifest.site?.weather ? manifest.site.weather.kind : 'clear';
    console.log(`✓ ${theme}: ${a}; weather ${w}; rooms "${manifest.interiorStyle ?? 'lab'}"`);
  }
  return fail.length;
}

// --- selftest -------------------------------------------------------------
// The equal-inputs case first: a manifest that names only things the engine has
// must score zero however it is arranged, and a manifest that names nothing at
// all must score zero too, because every layer has a default. Then one broken
// name per layer, each of which must score exactly one.
function selftest(){
  const V = { beds: ['wind', 'sea', 'hum'], emitters: ['waterfall', 'fan'], weathers: ['rain', 'dust'], styles: ['lab', 'module'] };
  const cases = [
    ['nothing declared', {}, 0],
    ['everything valid', { audio: { bed: 'sea', indoors: 'hum', emitters: [{ x: 1, z: 2, kind: 'fan', r: 20 }] },
      weather: { kind: 'rain', density: 0.5 }, interiorStyle: 'module' }, 0],
    ['same content, different order', { interiorStyle: 'module', weather: { density: 0.5, kind: 'rain' },
      audio: { emitters: [{ kind: 'fan', r: 20, z: 2, x: 1 }], indoors: 'hum', bed: 'sea' } }, 0],
    ['a bed the engine has no voice for', { audio: { bed: 'see' } }, 1],
    ['an emitter kind the engine has no voice for', { audio: { bed: 'sea', emitters: [{ x: 0, z: 0, kind: 'gulls' }] } }, 1],
    ['an emitter with no position', { audio: { emitters: [{ kind: 'fan' }] } }, 1],
    ['a weather the engine cannot draw', { weather: { kind: 'hail' } }, 1],
    ['a density the cloud would refuse', { weather: { kind: 'rain', density: 0 } }, 1],
    ['a room style that falls back silently', { interiorStyle: 'modul' }, 1],
  ];
  let bad = 0;
  for(const [name, manifest, want] of cases){
    const got = judge(manifest, V).length;
    const ok = got === want;
    if(!ok) bad++;
    console.log(`${ok ? '✓' : '✗'} ${name}: ${got} finding(s), wanted ${want}`);
  }
  return bad;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')){
  process.exit(selftest() ? 1 : 0);
}
const wanted = args.length ? args : themeNames();
let failed = 0;
for(const t of wanted) failed += await run(t);
process.exit(failed ? 1 : 0);
