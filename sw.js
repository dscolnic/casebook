/* First Person Learning — offline service worker.
 *
 * This replaces a worker that deliberately did nothing. The one before it
 * cached pages and went on serving them after a deploy, so it was rewritten to
 * delete every cache and unregister itself, and no page has registered a worker
 * since. That fix is preserved here as a rule rather than as an absence:
 *
 *   NOTHING THAT CAN CHANGE IS EVER SERVED FROM CACHE WHILE ONLINE.
 *
 * Pages, the catalogue and the shelf are network-first — the network answers, or
 * the cache does, never the other way round. Only Vite's content-hashed asset
 * files are cache-first, and those are immutable by construction: the hash in
 * the filename is the version, so a changed file is a different URL.
 *
 * Every decision lives in sw-policy.js, which scripts/test-sw.js reads too.
 * Run `npm run test:sw` after touching either.
 */
importScripts('/sw-policy.js');

const P = self.SW_POLICY;
const ORIGIN = self.location.origin;

// ---------------------------------------------------------------------------
// install — precache the shell, one entry at a time.
//
// cache.addAll() rejects the whole install if any single request fails, and a
// failed install means no worker at all. One bad icon path must not cost the
// player offline play, so each entry is fetched and judged on its own.
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(P.SHELL_CACHE);
    await Promise.allSettled(P.SHELL.map(async (path) => {
      const request = new Request(path, { credentials: 'same-origin' });
      const response = await fetch(request);
      if (!P.mayCache(request, response, ORIGIN)) {
        // Almost always the sign-in gate: install ran from a page whose session
        // had just expired. Leaving it out is right — a later navigation caches
        // it properly — and caching it would strand the shelf behind a form.
        throw new Error('not cacheable: ' + path);
      }
      await cache.put(request, response.clone());
    }));
    await self.skipWaiting();
  })());
});

// ---------------------------------------------------------------------------
// activate — drop every cache this version does not own, then take over.
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !P.CACHES.includes(k)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// ---------------------------------------------------------------------------
// fetch
async function put(request, response) {
  if (!P.mayCache(request, response, ORIGIN)) return;
  const cache = await caches.open(P.RUNTIME_CACHE);
  await cache.put(request, response.clone());
}

async function fromCache(request) {
  // ignoreSearch so a cache-busting query on an already-cached file still hits.
  return (await caches.match(request)) || (await caches.match(request, { ignoreSearch: true }));
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    await put(request, response);
    return response;
  } catch (err) {
    const hit = await fromCache(request);
    if (hit) return hit;
    if (request.mode === 'navigate') {
      const offline = await caches.match('/offline.html');
      if (offline) return offline;
    }
    // 504 rather than a thrown error: a rejected fetch inside a service worker
    // surfaces to the page as a network error with no status, which reads as the
    // app being broken rather than the connection being down.
    return new Response('Offline, and this page has not been saved for offline use.', {
      status: 504, headers: { 'Content-Type': 'text/plain' },
    });
  }
}

async function cacheFirst(request) {
  const hit = await fromCache(request);
  if (hit) return hit;
  try {
    const response = await fetch(request);
    await put(request, response);
    return response;
  } catch (err) {
    return new Response('', { status: 504 });
  }
}

async function staleRevalidate(request) {
  const hit = await fromCache(request);
  if (hit) {
    // Refresh behind the player. Not awaited on purpose — the point of this
    // strategy is that the picture is on screen before the network answers.
    fetch(request).then((response) => put(request, response)).catch(() => {});
    return hit;
  }
  return cacheFirst(request);
}

self.addEventListener('fetch', (event) => {
  const route = P.routeFor(event.request, ORIGIN);
  if (route === 'bypass') return;   // no respondWith: the browser handles it
  if (route === 'cache-first') return event.respondWith(cacheFirst(event.request));
  if (route === 'stale-revalidate') return event.respondWith(staleRevalidate(event.request));
  return event.respondWith(networkFirst(event.request));
});

// ---------------------------------------------------------------------------
// A page can ask what is held, and can ask for it all to go — which is what the
// account-deletion flow calls, because a deleted account must not leave its
// campaigns readable in a cache on the device.
self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'PURGE') {
    event.waitUntil((async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ purged: keys.length });
    })());
  }
});
