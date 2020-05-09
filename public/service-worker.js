
self.addEventListener("install", (event) => {

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
