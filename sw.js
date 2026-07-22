/* RECKON service worker.
   NETWORK-FIRST for pages/HTML so content updates always show; falls back to
   cache only when offline. Static icons are cache-first. Bumping CACHE purges
   every older cache on activate — do this whenever behavior must refresh. */
const CACHE = 'reckon-v3';
const ASSETS = [
  './',
  './casebook.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHTML(req) {
  return req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Pages/HTML: network-first (fresh content), cache as fallback when offline.
  if (isHTML(req)) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} });
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./casebook.html')))
    );
    return;
  }

  // Everything else (icons, manifest): cache-first, fill cache on first fetch.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} });
        return res;
      });
    })
  );
});
