
self.addEventListener("install", () => {
    console.log("Nuevo service worker -> " + "v4.6.1");
});

self.addEventListener("fetch", () => {
    // Requisito para instalar app como pwa.
});
