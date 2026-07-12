/* Casebook service worker — offline-first cache of the single-file game.
   Bump CACHE when casebook.html changes so clients pick up new content. */
const CACHE = 'casebook-v1';
const ASSETS = [
  './',
  './casebook.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        // runtime-cache same-origin GETs so first online run fills any gaps
        const copy = res.clone();
        caches.open(CACHE).then(c => { try { c.put(e.request, copy); } catch (_) {} });
        return res;
      }).catch(() => caches.match('./casebook.html'));
    })
  );
});
