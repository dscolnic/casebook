/* RECKON — self-retiring service worker.
   The old offline cache kept serving stale pages after updates. This version
   installs, deletes every cache, and UNREGISTERS itself, so browsers that had
   the old worker are cleaned up automatically and thereafter always load fresh
   from the network. No page re-registers a worker, so it does not come back. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (_) {}
    try { await self.registration.unregister(); } catch (_) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(c => { try { c.navigate(c.url); } catch (_) {} });
    } catch (_) {}
  })());
});

// While this worker is briefly active, never serve from cache — always network.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
