/* Service Worker - Price Change LMI-05
   Berfungsi sebagai syarat installability di Android/Chrome
   dan cache ringan untuk shell aplikasi.
   Catatan: konten Google Apps Script (cross-origin) sengaja TIDAK di-cache. */

var CACHE_NAME = 'price-change-v1';

var PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) {
          return k !== CACHE_NAME;
        }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // iframe Apps Script: biarkan lewat biasa

  // Navigasi halaman: network-first, fallback ke cache saat offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put('./index.html', copy); });
          return res;
        })
        .catch(function () { return caches.match('./index.html'); })
    );
    return;
  }

  // Aset lain: cache-first
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        return res;
      });
    })
  );
});
