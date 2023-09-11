const CACHE_NAME = '1.0.0';
const urlsToCache = ['/'];

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(() => {
                return fetch(event.request);
            })
            .catch(() => {
                return caches.match('index.html');
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    caches.keys().then((cacheNames) =>
        Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        )
    );
});
