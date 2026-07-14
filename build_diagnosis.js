// Build: validate every dpack_*.js and inject the passing ones into diagnosis.html.
// Usage:  node build_diagnosis.js      (idempotent; safe to re-run)
const fs = require('fs'), path = require('path');
const dir = __dirname;
const { validate, difficulty, LEVEL_NAME } = require('./validate_pack.js');

const files = fs.readdirSync(dir).filter(f => /^dpack_.*\.js$/.test(f)).sort();
console.log('=== Diagnosis build ===');
const passing = [];
for (const f of files) {
  let P;
  try { P = require(path.join(dir, f)).PACK; }
  catch (e) { console.log(`[FAIL] ${f}  — load error: ${e.message}`); continue; }
  const { ok, errors } = validate(P);
  const levels = P.rounds.map(r => difficulty(P, r).level).join('/');
  console.log(`[${ok ? 'OK ' : 'FAIL'}] ${P.id.padEnd(10)} "${P.title}"  — ${Object.keys(P.readings).length} readings · ${Object.keys(P.hypotheses).length} causes · levels ${levels}`);
  if (ok) passing.push(P); else errors.forEach(e => console.log('        ✗ ' + e));
}

const htmlPath = path.join(dir, 'diagnosis.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const START = '/*__PACKS_START__*/', END = '/*__PACKS_END__*/';
const a = html.indexOf(START), b = html.indexOf(END);
if (a < 0 || b < 0) { console.error('markers not found in diagnosis.html'); process.exit(1); }
const injected = passing.map(p => JSON.stringify(p)).join(',\n');
html = html.slice(0, a + START.length) + '\n' + injected + '\n' + html.slice(b);
fs.writeFileSync(htmlPath, html);
console.log(`\nInjected ${passing.length} pack(s) into diagnosis.html: ${passing.map(p => p.id).join(', ') || '(none)'}`);
