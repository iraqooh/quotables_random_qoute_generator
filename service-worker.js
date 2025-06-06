const CACHE_NAME = 'quotables-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/assets/apple-touch-icon.png',
  '/assets/favicon-32x32.png',
  '/assets/favicon-16x16.png',
  '/assets/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes =>
      cacheRes || fetch(event.request).catch(() =>
        caches.match('/index.html')
      )
    )
  );
});
