#!/usr/bin/env node
/* Let the iOS app talk to Clerk. TWO settings, and the first alone is not enough.
 *
 *   node scripts/clerk-native-setup.mjs --check
 *   node scripts/clerk-native-setup.mjs --add
 *
 * 1. allowed_origins must contain capacitor://localhost, or clerk-js cannot even
 *    load in the app. See below.
 * 2. the REDIRECT URL must be whitelisted, or the flow gets all the way through
 *    Google and dies on the way back. Clerk passes the security-critical nonce
 *    only to whitelisted URLs, so the callback to
 *    com.firstpersonlearn.app://sso-callback is answered
 *
 *      {"errors":[{"message":"Unauthorized request","code":"authorization_invalid"}]}
 *
 *    in the system browser, with Google having authenticated perfectly. Which is
 *    the worst place for it: the provider worked, the app is fine, and the error
 *    is a bare JSON body on Clerk's own domain.
 *
 * WHY THIS IS NEEDED, and the way it presents. A pk_live_ key is bound to the
 * instance's own domain: Clerk refuses any request whose Origin is not that
 * domain, with
 *
 *   Clerk: Production Keys are only allowed for domain "firstpersonlearn.com"
 *   The Request HTTP Origin header must be equal to or a subdomain of the
 *   requesting URL
 *
 * and a 400 from /v1/client. Inside the app the pages are loaded from the app
 * bundle, so the Origin is `capacitor://localhost` — not a subdomain of
 * anything — and every Clerk call is refused before a player sees a consent
 * screen. Nothing in the app is wrong when this happens, which is why it is
 * worth a script and a paragraph: the same build works the moment the instance
 * knows about the origin.
 *
 * The secret key is read from the environment and never written anywhere. It is
 * the sk_ that can create sessions, so it does not go in a file in this repo —
 * it lives in Replit Secrets as CLERK_SECRET_KEY.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'capacitor://localhost';
const API = 'https://api.clerk.com/v1/instance';
const REDIRECTS_API = 'https://api.clerk.com/v1/redirect_urls';

/* The redirect URL is READ OUT OF native-auth.js rather than written here.
 * It is already stated twice — there and in Info.plist as CFBundleURLTypes —
 * and a third copy in the script that whitelists it is the copy that would be
 * wrong: the symptom of a mismatch is this exact error, on Clerk's domain,
 * after a successful Google sign-in. */
function redirectFromSource() {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'native-auth.js'), 'utf8');
  const m = src.match(/var SCHEME = '([^']+)';/);
  if (!m) die('native-auth.js no longer states `var SCHEME = ...` — this script reads it from there.');
  return m[1] + '://sso-callback';
}

/* WHY IT ASKS RATHER THAN BEING TOLD.
 *
 * The environment variable still works, and on Replit or in CI it is the only
 * thing that can. But at a prompt on a terminal it went wrong three times in a
 * row, each time in a way that blamed the key: the placeholder from the
 * instructions was left in the command, then left in again, and in between a key
 * containing a $ would have been silently truncated by the shell. None of those
 * are possible when the value is read from the terminal instead — and it stays
 * out of the shell history, which for an sk_ that can mint sessions is worth
 * having on its own.
 */
function promptForKey() {
  return new Promise((resolve) => {
    // Raw mode, because it is the thing that actually turns echo off. The
    // readline "write over the prompt on every keystroke" trick was tried first
    // and did two wrong things at once: the pasted key appeared on screen
    // anyway, and rl.question never fired, so the script hung with an unsettled
    // await and no prompt to answer.
    const stdin = process.stdin;
    const wasRaw = stdin.isRaw;
    stdin.setRawMode(true);
    stdin.setEncoding('utf8');

    let buf = '';
    const cleanup = () => {
      stdin.removeListener('data', onData);
      stdin.setRawMode(!!wasRaw);
      stdin.pause();
      process.stdout.write('\n');
    };
    const onData = (chunk) => {
      for (const c of chunk) {
        if (c === '\r' || c === '\n' || c === '\u0004') { cleanup(); return resolve(buf.trim()); }
        // Raw mode means this process owns ctrl-C.
        if (c === '\u0003') { cleanup(); process.exit(130); }
        if (c === '\u007f' || c === '\u0008') { buf = buf.slice(0, -1); continue; }
        buf += c;
      }
    };
    // Listener first, prompt second, resume last: written the other way round,
    // anything already in the pipe is consumed before there is anything to
    // receive it, and the read comes back empty.
    stdin.on('data', onData);
    process.stdout.write('Clerk secret key (paste it - it will not be shown): ');
    stdin.resume();
  });
}

let key = process.env.CLERK_SECRET_KEY;
if (!key) {
  if (!process.stdin.isTTY) {
    console.error('CLERK_SECRET_KEY is not set, and there is no terminal to ask on.\n\n'
      + 'It is the sk_live_… from the Clerk dashboard (Configure -> API keys):\n\n'
      + "  CLERK_SECRET_KEY='sk_live_…' node scripts/clerk-native-setup.mjs --check\n");
    process.exit(1);
  }
  key = await promptForKey();
}
if (!key.startsWith('sk_')) {
  console.error(`That is not a secret key: ${JSON.stringify(key.slice(0, 8))}…`);
  process.exit(1);
}
// A key is ASCII. Checked because the obvious first run is to paste the command
// from the instructions with its `sk_live_…` placeholder still in it, and an
// ellipsis is not a byte: fetch() then dies inside undici with "Cannot convert
// argument to a ByteString because the character at index 15 has a value of
// 8230", which names neither the key nor the mistake.
// WHAT IS CHECKED, AND WHAT IS DELIBERATELY NOT. Only the two things that stop
// the request from being made at all: a character that cannot go in a header,
// and a key too short to be one. The alphabet is NOT policed — an earlier
// version demanded [A-Za-z0-9] and rejected real keys, which is worse than the
// crash it was written to prevent: it tells the person their key is wrong when
// the script is.
// The two strings from this file's own instructions, and the shapes people type
// in their place. Named explicitly because "too short to be a key" is true of
// them and unhelpful: what happened is the example was run unedited.
if (/^sk_(test|live)_(YOUR|your|xxx|X{3}|REPLACE|PASTE|…|\.\.\.)/.test(key)) {
  die('That is the placeholder from the instructions, not a key.\n\n'
    + `You passed ${JSON.stringify(key)}. Replace all of it — including the sk_live_ prefix —\n`
    + 'with the value from the Clerk dashboard: Configure -> API keys -> Secret key, on\n'
    + 'the production instance (clerk.firstpersonlearn.com).\n\n'
    + 'Or run it with no CLERK_SECRET_KEY at all and paste the key when it asks.');
}

const body = key.replace(/^sk_(test|live)_/, '');
const bad = [...key].findIndex(c => c.charCodeAt(0) > 126 || c.charCodeAt(0) < 33);
if (bad >= 0) {
  die('CLERK_SECRET_KEY has a character that cannot be sent in a header.\n\n'
    + `Character ${bad + 1} is ${JSON.stringify(key[bad])}. If that is an ellipsis, the\n`
    + 'placeholder from the instructions is still in the command.');
}
if (body.length < 16) {
  die(`CLERK_SECRET_KEY is only ${key.length} characters, which is too short to be a key.\n\n`
    + 'The usual cause is the shell: a key containing $ is expanded away if the\n'
    + 'assignment is unquoted, and the part after the $ vanishes silently. Put it in\n'
    + "single quotes:\n\n"
    + "  CLERK_SECRET_KEY='sk_live_…' node scripts/clerk-native-setup.mjs --check");
}

const mode = process.argv[2] || '--check';

async function instance() {
  let res;
  try {
    res = await fetch(API, { headers: { Authorization: `Bearer ${key}` } });
  } catch (e) {
    die(`Could not reach ${API}: ${e.message}`);
  }
  if (res.status === 401) {
    die('Clerk answered 401. That key is not this instance\'s secret key — check it is\n'
      + 'the PRODUCTION one (clerk.firstpersonlearn.com), not development.');
  }
  if (!res.ok) die(`GET /v1/instance answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// A stack trace here tells nobody anything: every failure this script can have
// is a wrong key, a typo or no network.
function die(message) {
  console.error(message);
  process.exit(1);
}

const inst = await instance();
const allowed = inst.allowed_origins ?? [];

console.log(`instance      ${inst.environment_type ?? '?'}  (${inst.id ?? '?'})`);
console.log(`allowed_origins`);
for (const o of allowed) console.log(`  ${o}`);
if (!allowed.length) console.log('  (none)');

const has = allowed.includes(ORIGIN);
console.log(`\n${ORIGIN} is ${has ? 'ALLOWED' : 'NOT allowed'} — clerk-js ${has ? 'can' : 'cannot'} load in the app.`);

const REDIRECT = redirectFromSource();

async function redirectUrls() {
  const res = await fetch(REDIRECTS_API, { headers: { Authorization: `Bearer ${key}` } });
  if (!res.ok) die(`GET /v1/redirect_urls answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const body = await res.json();
  // The Backend API has returned both a bare array and a paginated object over
  // its life, so both are read rather than one assumed.
  return (Array.isArray(body) ? body : body.data ?? []).map(r => r.url);
}

const redirects = await redirectUrls();
console.log(`\nredirect_urls`);
for (const u of redirects) console.log(`  ${u}`);
if (!redirects.length) console.log('  (none)');

const hasRedirect = redirects.includes(REDIRECT);
console.log(`\n${REDIRECT} is ${hasRedirect ? 'WHITELISTED' : 'NOT whitelisted'} — the sign-in `
  + `${hasRedirect ? 'can come back to the app' : 'will die on the way back from Google'}.`);
console.log('  (read from native-auth.js, so it cannot disagree with the app)');

if (mode === '--check') {
  const ok = has && hasRedirect;
  if (!ok) console.log('\nRun again with --add.');
  process.exit(ok ? 0 : 1);
}

if (mode !== '--add') {
  console.error(`\nUnknown argument ${JSON.stringify(mode)}. Use --check or --add.`);
  process.exit(1);
}
if (has && hasRedirect) { console.log('\nNothing to do.'); process.exit(0); }

if (!hasRedirect) {
  // A create, not a replace: redirect_urls is a collection of resources rather
  // than a field, so adding one cannot disturb the others.
  const res = await fetch(REDIRECTS_API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: REDIRECT }),
  });
  if (!res.ok) die(`\nPOST /v1/redirect_urls answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const after = await redirectUrls();
  console.log(`\nredirect_urls is now`);
  for (const u of after) console.log(`  ${u}`);
  if (!after.includes(REDIRECT)) die('The POST was accepted and the URL is still not there — check the dashboard.');
}

if (has) {
  console.log('\nallowed_origins already had the app origin. Done.');
  process.exit(0);
}

// PATCH replaces the list, so it is sent back with the new entry appended
// rather than on its own — sending only the new one would silently drop
// whatever else was there, which is how a working web sign-in gets broken by a
// change meant for the app.
const next = [...allowed, ORIGIN];
const res = await fetch(API, {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ allowed_origins: next }),
});
if (!res.ok) die(`\nPATCH answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
const after = (await instance()).allowed_origins ?? [];
console.log(`\nallowed_origins is now`);
for (const o of after) console.log(`  ${o}`);
console.log(after.includes(ORIGIN)
  ? '\nDone. The app can reach Clerk; sign-in has to be tried on a device.'
  : '\nThe PATCH was accepted and the origin is still not there — check the dashboard.');
