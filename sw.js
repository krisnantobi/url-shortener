// Pemberian nama key cache
const cacheName = 'static-assets-v1';

// List url/link/file mana aja yang akan dijadikan cache.
const assets = [
    '/',
    '/index.html',
    '/fullback.html',
    '/images/logo.png',
    '/js/main.js',
    '/manifest.json',
    '/css/style.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://code.jquery.com/jquery-2.1.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];

// Service worker lifecycle

// install sw di dalamnya ada add all cache dengan di wrap wait until dimana maksudnya proses install harus menunggu sampai 
// proses add cache selesai
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

// Check jika sw activate disini saya cuma log aja bahwa sw sudah activate
self.addEventListener('activate', evt => {
    console.log('activate')
});

// Fetch data yang sudah di cache.
self.addEventListener('fetch', evt => {
    evt.respondWith(
        // Ini adalah pengecekan dimana kalau ada cache maka asset ambil dari cache kalau tidak ada diambilkan dari server
        // Dan ketidak tidak ada koneksi internet maka masuk ke blok catch yang didalamnya memanggil file offline mode
        // dengan nama fullback.html
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request);
        }).catch(() => caches.match('/fullback.html'))
    )
});