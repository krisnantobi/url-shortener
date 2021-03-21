/**
 * === Service worker dalam tugas ini belum digunakan ===
 */

var CACHE_NAME = 's-short-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/api-route.js',
  '/js/utilities.js',
  '/images/logo.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['s-short-cache-v1', 's-short-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log(cacheNames)
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});