// navigator is object representing the browser
if ("serviceWorker" in navigator) {
    // register service worker in home directory:
    navigator.serviceWorker
        .register("./sw.js")
        .then((reg) => console.log("service worker registered", reg))
        .catch((err) => console.log("service worker not registered", err));
}
