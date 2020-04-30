
self.addEventListener("install", () => {
    console.log("Nuevo service worker -> " + process.env.VUE_APP_VERSION_ACTUAL);
});
