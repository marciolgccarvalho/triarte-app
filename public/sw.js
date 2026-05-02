const CACHE_NAME = "real-triarte-v3"; // 🔥 ALTERE versão quando atualizar app

// Arquivos essenciais
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/images/logo/logo.webp"
];

// =========================
// INSTALL
// =========================
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// =========================
// ACTIVATE
// =========================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// =========================
// FETCH
// =========================
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 🔥 IGNORA REQUESTS NÃO-GET (evita erro silencioso)
  if (req.method !== "GET") return;

  // 🔥 HTML → NETWORK FIRST + OFFLINE FALLBACK
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // 🔥 IMAGENS → CACHE FIRST
  if (req.destination === "image") {
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
              return res;
            })
            .catch(() => caches.match("/images/logo/logo.webp")) // fallback leve
        );
      })
    );
    return;
  }

  // 🔥 JS/CSS → STALE WHILE REVALIDATE
  if (
    req.destination === "script" ||
    req.destination === "style"
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((networkRes) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, networkRes.clone());
            });
            return networkRes;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // 🔥 DEFAULT
  event.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req).catch(() => caches.match("/offline.html"))
      );
    })
  );
});