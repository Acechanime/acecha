/*
* Mi propio service worker we v':
* */

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("cache-imagenes").then((cache) => {
            console.log("Cacheando imagen.");
            return cache.addAll(
                [
                    "/img/animes/bokuben_2_portada.jpg",
                    "/wp-content/uploads/2019/05/subheader.jpg",
                    "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0"
                ]
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});