
self.addEventListener("install", (event) => {
    // self.skipWaiting();

    event.waitUntil(
        caches.open("cache-imagenes").then((cache) => {
            return cache.addAll(
                [
                    "/wp-content/uploads/2019/05/subheader.jpg",
                    "https://fonts.googleapis.com/icon?family=Material+Icons",
                    "/fonts/ProductSansBold.ttf",
                    "/fonts/ProductSansBoldItalic.ttf",
                    "/fonts/ProductSansItalic.ttf",
                    "/fonts/ProductSansRegular.ttf"
                ]
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    if (event.request.method != 'GET') return;
    if (event.request.url.search("api") !== -1) return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
