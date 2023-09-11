const CACHE = '2.4.2';
const FILES = [
    '/index.html',
    '/assets/index.js',
    '/assets/index.css',
    '/img/favicon.ico',
    '/img/logo_512_maskable.png',
    '/img/logo_512.png',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function () {
                return fetch(event.request);
            })
            .catch(function () {
                return caches.match('index.html');
            })
    );
});

self.addEventListener('activate', function () {
    let cacheWhitelist = [CACHE];

    caches.keys().then(function (cacheNames) {
        Promise.all(
            cacheNames.map(function (cacheName) {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        );
    });
});
