#!/usr/bin/env node
/* Let the iOS app talk to Clerk.
 *
 *   CLERK_SECRET_KEY=sk_live_… node scripts/clerk-allow-origin.mjs --check
 *   CLERK_SECRET_KEY=sk_live_… node scripts/clerk-allow-origin.mjs --add
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
const ORIGIN = 'capacitor://localhost';
const API = 'https://api.clerk.com/v1/instance';

const key = process.env.CLERK_SECRET_KEY;
if (!key) {
  console.error('CLERK_SECRET_KEY is not set.\n\n'
    + 'It is the sk_live_… from the Clerk dashboard (Configure -> API keys), and it is\n'
    + 'the key that can mint sessions — so pass it for this one command rather than\n'
    + 'putting it in a file:\n\n'
    + '  CLERK_SECRET_KEY=sk_live_… node scripts/clerk-allow-origin.mjs --check\n');
  process.exit(1);
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
    + "  CLERK_SECRET_KEY='sk_live_…' node scripts/clerk-allow-origin.mjs --check");
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
console.log(`\n${ORIGIN} is ${has ? 'ALLOWED' : 'NOT allowed'} — the app ${has ? 'can' : 'cannot'} reach Clerk.`);

if (mode === '--check') {
  if (!has) console.log('\nRun again with --add to add it.');
  process.exit(has ? 0 : 1);
}

if (mode !== '--add') {
  console.error(`\nUnknown argument ${JSON.stringify(mode)}. Use --check or --add.`);
  process.exit(1);
}
if (has) { console.log('\nNothing to do.'); process.exit(0); }

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
