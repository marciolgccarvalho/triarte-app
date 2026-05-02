const CACHE_NAME = "real-triarte-v3";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

/* INSTALL */
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", (event) => {
  // 🔥 NÃO INTERCEPTA REQUISIÇÕES NÃO-GET (evita quebrar API / módulos)
  if (event.request.method !== "GET") return;

  // 🔥 IGNORA VITE / HOT RELOAD / DEV
  if (event.request.url.includes("/@vite")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // 🔥 evita cache de erro
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          return caches.match("/index.html");
        });
    })
  );
});