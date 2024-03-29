const CACHE = '2.4.4';
const FILES = [
    'index.html',
    'offline.html',
    './assets/index.js',
    './assets/index.css',
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
