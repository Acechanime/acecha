/*
* Mi propio service worker we v':
* */

self.addEventListener("install", (event) => {
    // self.skipWaiting();

    event.waitUntil(
        caches.open("cache-imagenes").then((cache) => {
            console.log("Cacheando imagen.");
            return cache.addAll(
                [
                    "/wp-content/uploads/2019/05/subheader.jpg",
                    "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0",
                    "/img/tamako_mainVisual_edit.jpg",
                    "/img/k-on_cover.jpg",
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
