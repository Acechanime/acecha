/*
* Mi propio service worker we v':
* */

self.addEventListener("install", (event) => {
    console.log("Evento install :c");
    event.waitUntil(
        caches.open("cache-imagenes").then((cache) => {
            console.log("Cacheando imagen.");
            return cache.addAll(
                [
                    '/img/animes/bokuben_2_portada.jpg'
                ]
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    console.log("Lanzado evento fetch");
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});