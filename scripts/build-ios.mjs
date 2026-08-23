// build-ios.mjs — assemble ios_www/, the web root that ships INSIDE the app.
//
// WHY THE GAMES ARE BUNDLED AND NOT LOADED. A web view pointing at the site is
// rejected under App Store Guideline 4.2 as a thin wrapper. Offline play is the
// native capability that clears it, so every build in games/ is copied into the
// app and the network is used for two things only: signing in, and syncing a
// campaign. Pull the games out of here and the submission becomes a wrapper.
//
// WHY THE LAYOUT MIRRORS THE SITE ROOT. The shelf links a game as
// `./<id>/index.html` and the pages reference `/icon-192.png`, `/privacy.html`,
// `/api-base.js` — absolute, from the root. Inside the app the root is this
// directory, so anything not copied here is a 404 that only happens on device.
// index.html at the top is the one file that does not exist on the web: the app
// opens the root and the shelf lives at /games/.
//
// WHAT IS DELIBERATELY LEFT OUT. sw.js and the manifest: a service worker is
// the PWA's way of being offline and the bundle is the app's, and a worker
// caching capacitor://localhost responses is a second cache in front of files
// that are already local. offline.html goes with it.
import { cp, mkdir, rm, writeFile, stat, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'ios_www');

// Everything the app needs, and nothing that needs a server. A missing entry is
// a hard failure: a path can be perfectly correct and simply not be there, and
// on device the two are the same blank screen.
const COPY = [
  'games',              // the shelf, the catalogue, 29 builds, the hero shots
  'api-base.js',        // where the API is and how it authenticates
  'native-auth.js',     // signing in through the system browser
  'privacy.html',       // a reviewer opens all four of these inside the app,
  'support.html',       // and every one of them links the other three — a
  'contact.html',       // missing file is a dead link in front of the reviewer
  'terms.html',
  'legal.css',
  'room.html',          // co-op: needs the network, and its links are bundle paths
  'teacher.html',
  'manifest.webmanifest', // the shelf links it; absent, it is a 404 in the log
  'icon-180.png',
  'icon-192.png',
  'icon-512.png',
];

// The app opens the web root; the shelf is a directory down. A redirect rather
// than a copy of the shelf, because two copies of a page drift.
const INDEX = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>First Person Learning</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>html,body{margin:0;background:#0d0f13}</style>
<!-- The app opens this file; the shelf is at /games/. Written by
     scripts/build-ios.mjs — do not edit inside ios_www, which is rebuilt. -->
<script>location.replace('./games/index.html');</script>
</head>
<body></body>
</html>
`;

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const entry of COPY) {
    const from = join(ROOT, entry);
    try { await stat(from); }
    catch { throw new Error(`build-ios: ${entry} is not there — the app would 404 on it, on device only`); }
    await cp(from, join(OUT, entry), { recursive: true });
  }

  await writeFile(join(OUT, 'index.html'), INDEX);

  // The catalogue is what the shelf draws from, so an empty one is a bundle
  // that builds, installs, launches and shows nothing.
  const games = await readdir(join(OUT, 'games'));
  const builds = games.filter(n => !n.includes('.'));
  if (builds.length < 2) throw new Error(`build-ios: only ${builds.length} game build(s) in games/ — run sync-casebook in the Alamos repo first`);

  console.log(`ios_www: ${builds.length} game builds, ${COPY.length} root entries.`);
}

main().catch(e => { console.error(String(e.message || e)); process.exit(1); });
