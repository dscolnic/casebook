#!/usr/bin/env node
/* Point the app at a Clerk instance.
 *
 *   node scripts/set-clerk-key.mjs --check
 *   node scripts/set-clerk-key.mjs pk_live_xxxxxxxxxxxxxxxxxxxx
 *
 * Three files carry the key. sign-in.html and sign-out.html carry it TWICE
 * each: once as the publishable key and once as the origin the Clerk script is
 * loaded from. native-auth.js — the iOS app's sign-in — carries it ONCE and
 * derives its host the same way this script does, which is why it needs no
 * second line to keep in step.
 *
 * Five places, one fact, and the failure mode when they disagree is quiet:
 * sign-in works against production while sign-out still talks to the
 * development instance, so Clerk.signOut() runs against an instance that has no
 * session and the redirect happens anyway. It looks like signing out worked.
 *
 * That page is also where account deletion lands, so a stale key there turns an
 * irreversible action into one that appears to half-fail.
 *
 * The origin is not asked for. A publishable key is base64 of the instance's own
 * frontend host with a "$" on the end, so it is derived from the key — one input
 * cannot disagree with itself.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['sign-in.html', 'sign-out.html', 'native-auth.js'];

const KEY_ATTR = /data-clerk-publishable-key="(pk_(?:test|live)_[A-Za-z0-9+/=_-]+)"/g;
// native-auth.js is a script, not a page: the same fact, stated as a variable.
const KEY_VAR = /PUBLISHABLE_KEY = '(pk_(?:test|live)_[A-Za-z0-9+/=_-]+)'/g;
const SCRIPT_SRC = /src="https:\/\/([^"/]+)\/npm\/@clerk\/clerk-js@(\d+)\/dist\/clerk\.browser\.js"/g;

function hostFromKey(key) {
  const body = key.replace(/^pk_(test|live)_/, '');
  let decoded;
  try { decoded = Buffer.from(body, 'base64').toString('utf8'); }
  catch { throw new Error(`${key} is not base64 after its prefix`); }
  if (!decoded.endsWith('$')) {
    throw new Error(`${key} does not decode to a Clerk host (got ${JSON.stringify(decoded)})`);
  }
  const host = decoded.slice(0, -1);
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) {
    throw new Error(`${key} decodes to ${JSON.stringify(host)}, which is not a hostname`);
  }
  return host;
}

// Count occurrences without consuming the regex's lastIndex across calls.
const all = (re, s) => [...s.matchAll(new RegExp(re.source, re.flags))];

function read(file) {
  const path = resolve(ROOT, file);
  const text = readFileSync(path, 'utf8');
  const keys = [...all(KEY_ATTR, text), ...all(KEY_VAR, text)].map(m => m[1]);
  const srcs = all(SCRIPT_SRC, text).map(m => ({ host: m[1], major: m[2] }));
  // A page carries the key and the origin separately, so the two can disagree.
  // native-auth.js derives the origin from the key, so it cannot — and that is
  // the point of it having no src to rewrite, rather than a missing line.
  const derives = all(KEY_VAR, text).length > 0;
  return { path, file, text, keys, srcs, derives };
}

const arg = process.argv[2];
const files = FILES.map(read);

// --- report ---------------------------------------------------------------
if (!arg || arg === '--check') {
  let bad = 0;
  const seen = new Set();
  for (const f of files) {
    console.log(f.file);
    const wantSrcs = f.derives ? 0 : 1;
    if (f.keys.length !== 1 || f.srcs.length !== wantSrcs) {
      bad++;
      console.log(`  ! expected one key and ${wantSrcs} script src, found ${f.keys.length} and ${f.srcs.length}`);
      continue;
    }
    const key = f.keys[0];
    const env = key.startsWith('pk_live_') ? 'PRODUCTION' : 'development';
    console.log(`  key   ${key.slice(0, 12)}…  (${env})`);
    let expected = null;
    try { expected = hostFromKey(key); } catch (e) { bad++; console.log('  ! ' + e.message); }
    if (f.derives) {
      console.log(`  host  ${expected ?? '?'}   derived from the key, clerk-js@6 native`);
    } else {
      const src = f.srcs[0];
      console.log(`  host  ${src.host}   clerk-js@${src.major}`);
      if (expected && expected !== src.host) {
        bad++;
        console.log(`  ! MISMATCH — that key belongs to ${expected}, but the script loads from ${src.host}`);
      }
    }
    seen.add(key);
  }
  if (seen.size > 1) { bad++; console.log('\n! the files carry DIFFERENT keys'); }
  if (bad) { console.log(`\n${bad} problem(s).`); process.exit(1); }
  console.log(`\nAll ${files.length} files agree.` + ([...seen][0].startsWith('pk_live_')
    ? '' : ' Still on a development key — production needs a pk_live_ one.'));
  process.exit(0);
}

// --- write ----------------------------------------------------------------
const key = arg.trim();
if (!/^pk_(test|live)_/.test(key)) {
  console.error(`Not a Clerk publishable key: ${JSON.stringify(key)}\n`
    + 'It starts with pk_live_ (production) or pk_test_ (development), and is found in\n'
    + 'the Clerk dashboard under Configure -> API Keys. The SECRET key (sk_...) never\n'
    + 'goes in these files — it belongs in Replit Secrets as CLERK_SECRET_KEY.');
  process.exit(1);
}
if (/^sk_/.test(key)) { console.error('That is a SECRET key. Never put it in an HTML file.'); process.exit(1); }

let host;
try { host = hostFromKey(key); }
catch (e) { console.error(e.message); process.exit(1); }

// Refuse before writing anything, so a shape change cannot half-apply.
for (const f of files) {
  if (f.keys.length !== 1 || f.srcs.length !== (f.derives ? 0 : 1)) {
    console.error(`${f.file}: expected exactly one key and ${f.derives ? 'no' : 'one'} script src, found `
      + `${f.keys.length} and ${f.srcs.length}. Fix the file by hand — a partial `
      + `rewrite here is the mismatch this script exists to prevent.`);
    process.exit(1);
  }
}

for (const f of files) {
  const was = { key: f.keys[0], host: f.derives ? hostFromKey(f.keys[0]) : f.srcs[0].host };
  const next = f.text
    .replace(KEY_ATTR, `data-clerk-publishable-key="${key}"`)
    .replace(KEY_VAR, `PUBLISHABLE_KEY = '${key}'`)
    .replace(SCRIPT_SRC, (m, _h, major) =>
      `src="https://${host}/npm/@clerk/clerk-js@${major}/dist/clerk.browser.js"`);
  writeFileSync(f.path, next);
  console.log(`${f.file}`);
  console.log(`  key   ${was.key.slice(0, 12)}…  ->  ${key.slice(0, 12)}…`);
  console.log(`  host  ${was.host}  ->  ${host}`);
}

console.log(`\nBoth files now point at ${host} (${key.startsWith('pk_live_') ? 'PRODUCTION' : 'development'}).`);
console.log('Still to do: set CLERK_SECRET_KEY in Replit Secrets to the matching sk_ key,');
console.log('then redeploy. A publishable key from one instance and a secret key from');
console.log('another gives every API call a 401 and no clue why.');
